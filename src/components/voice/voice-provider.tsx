"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { chunkForTts } from "@/lib/spoken-text";

type VoiceSource = "api" | "device" | null;

type VoiceState = {
  playing: boolean;
  loading: boolean;
  source: VoiceSource;
  title: string | null;
  cloudAvailable: boolean | null;
  play: (text: string, title?: string) => Promise<void>;
  stop: () => void;
};

const VoiceContext = createContext<VoiceState | null>(null);

function speakDevice(text: string, onEnd: () => void) {
  if (typeof window === "undefined" || !window.speechSynthesis) {
    onEnd();
    return;
  }
  window.speechSynthesis.cancel();
  const chunks = chunkForTts(text, 1200);
  let i = 0;
  const next = () => {
    if (i >= chunks.length) {
      onEnd();
      return;
    }
    const u = new SpeechSynthesisUtterance(chunks[i]);
    i += 1;
    u.rate = 1;
    u.onend = next;
    u.onerror = next;
    window.speechSynthesis.speak(u);
  };
  next();
}

export function VoiceProvider({ children }: { children: React.ReactNode }) {
  const [playing, setPlaying] = useState(false);
  const [loading, setLoading] = useState(false);
  const [source, setSource] = useState<VoiceSource>(null);
  const [title, setTitle] = useState<string | null>(null);
  const [cloudAvailable, setCloudAvailable] = useState<boolean | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const urlsRef = useRef<string[]>([]);
  const stopRef = useRef(false);

  useEffect(() => {
    void fetch("/api/tts")
      .then((r) => r.json())
      .then((d: { cloud?: boolean }) => setCloudAvailable(Boolean(d.cloud)))
      .catch(() => setCloudAvailable(false));
  }, []);

  const stop = useCallback(() => {
    stopRef.current = true;
    audioRef.current?.pause();
    audioRef.current = null;
    urlsRef.current.forEach((u) => URL.revokeObjectURL(u));
    urlsRef.current = [];
    if (typeof window !== "undefined") window.speechSynthesis?.cancel();
    setPlaying(false);
    setLoading(false);
    setSource(null);
    setTitle(null);
  }, []);

  const play = useCallback(
    async (text: string, heading?: string) => {
      stop();
      stopRef.current = false;
      const spoken = text.trim();
      if (!spoken) return;
      setLoading(true);
      setTitle(heading ?? "Listening");
      setPlaying(true);

      const chunks = chunkForTts(spoken);
      const playDevice = () => {
        if (stopRef.current) return;
        setSource("device");
        setLoading(false);
        speakDevice(spoken, () => {
          if (!stopRef.current) stop();
        });
      };

      try {
        const first = await fetch("/api/tts", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text: chunks[0] }),
        });
        if (stopRef.current) return;
        if (first.status === 204 || !first.ok) {
          playDevice();
          return;
        }
        setSource("api");
        setCloudAvailable(true);
        setLoading(false);
        const blob = await first.blob();
        const url = URL.createObjectURL(blob);
        urlsRef.current.push(url);
        const audio = new Audio(url);
        audioRef.current = audio;
        let index = 0;
        const playNext = async () => {
          if (stopRef.current) return;
          index += 1;
          if (index >= chunks.length) {
            stop();
            return;
          }
          const res = await fetch("/api/tts", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text: chunks[index] }),
          });
          if (stopRef.current) return;
          if (!res.ok || res.status === 204) {
            playDevice();
            return;
          }
          const nextBlob = await res.blob();
          const nextUrl = URL.createObjectURL(nextBlob);
          urlsRef.current.push(nextUrl);
          const nextAudio = new Audio(nextUrl);
          audioRef.current = nextAudio;
          nextAudio.onended = () => void playNext();
          nextAudio.onerror = () => playDevice();
          await nextAudio.play();
        };
        audio.onended = () => void playNext();
        audio.onerror = () => playDevice();
        await audio.play();
      } catch {
        playDevice();
      }
    },
    [stop],
  );

  const value = useMemo(
    () => ({
      playing,
      loading,
      source,
      title,
      cloudAvailable,
      play,
      stop,
    }),
    [playing, loading, source, title, cloudAvailable, play, stop],
  );

  return (
    <VoiceContext.Provider value={value}>{children}</VoiceContext.Provider>
  );
}

export function useVoice(): VoiceState {
  const ctx = useContext(VoiceContext);
  if (!ctx) throw new Error("useVoice must be used within VoiceProvider");
  return ctx;
}
