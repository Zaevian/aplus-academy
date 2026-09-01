"use client";

import { useEffect, useState } from "react";
import { TechnicalDiagram } from "@/components/diagrams/registry";
import { ListenButton } from "@/components/voice/listen-button";
import { useAcademy } from "@/components/academy-provider";
import { getMediaAsset, publicMediaSrc } from "@/lib/media";


export function VideoBlock({
  assetId,
  title,
  transcript,
  caption,
}: {
  assetId: string;
  title: string;
  transcript: string;
  caption: string;
}) {
  const asset = getMediaAsset(assetId);
  const fallback = asset?.fallback ?? "";
  const overlays = asset?.overlayLabels ?? [];
  const src = publicMediaSrc(assetId);
  const { settings } = useAcademy();
  const showTranscripts = settings?.showTranscripts ?? true;
  const [fileState, setFileState] = useState<"checking" | "ready" | "missing">(
    "checking",
  );

  useEffect(() => {
    let gone = false;
    fetch(src, { method: "HEAD" })
      .then((res) => {
        if (gone) return;
        setFileState(res.ok ? "ready" : "missing");
      })
      .catch(() => {
        if (!gone) setFileState("missing");
      });
    return () => {
      gone = true;
    };
  }, [src]);

  const spoken = `${title}. ${caption}. ${transcript}`;

  return (
    <section className="space-y-2 rounded-lg border p-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-sm font-semibold">{title}</h2>
        <ListenButton text={spoken} title={title} label="Listen" />
      </div>
      {fileState === "ready" ? (
        <div className="relative overflow-hidden rounded-md bg-zinc-950">
          <video
            src={src}
            className="aspect-video w-full"
            controls
            playsInline
            muted
            loop
            autoPlay={false}
            onError={() => setFileState("missing")}
          />
          {overlays.length ? (
            <div className="pointer-events-none absolute inset-x-0 bottom-8 flex flex-wrap justify-center gap-2">
              {overlays.map((label) => (
                <span
                  key={label}
                  className="rounded bg-background/90 px-2 py-1 text-xs font-medium"
                >
                  {label}
                </span>
              ))}
            </div>
          ) : null}
        </div>
      ) : (
        <div>
          {fileState === "checking" ? (
            <p className="text-xs text-muted-foreground">Checking for a stored clip…</p>
          ) : (
            <p className="text-xs text-muted-foreground">
              No stored photoreal clip. Labels below are HTML/SVG — not generated
              video text.
            </p>
          )}
          {fallback ? (
            <TechnicalDiagram
              component={fallback}
              title={title}
              caption={caption}
              notice="Code labels are the source of truth. A missing mp4 is not an error in guest mode."
              alt={asset?.alt ?? title}
            />
          ) : null}
        </div>
      )}
      <p className="text-sm text-muted-foreground">{caption}</p>
      {showTranscripts ? (
        <p className="rounded-md bg-muted/50 px-3 py-2 text-sm leading-6">
          <span className="font-medium">Transcript. </span>
          {transcript}
        </p>
      ) : (
        <details className="text-sm">
          <summary className="cursor-pointer text-muted-foreground">Show transcript</summary>
          <p className="mt-2 leading-6">{transcript}</p>
        </details>
      )}
    </section>
  );
}
