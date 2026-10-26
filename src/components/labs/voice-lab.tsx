"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import type { LabSimProps } from "@/components/labs/lab-kit";
import { LabStatus, useSolved } from "@/components/labs/lab-kit";
import { AnswerChoice, bigCheckClass } from "@/components/quiz/answer-choice";
import { MISS_LINE, choiceLetter, successLine } from "@/lib/answer-feedback";
import { vibrateFail, vibrateSuccess } from "@/lib/haptics";
import { ListenButton } from "@/components/voice/listen-button";

const CALLS = [
  {
    id: "printer",
    title: "Call 1 — angry printer user",
    transcript:
      "This printer has ruined my morning. I have a board packet in twenty minutes and every page is a gray smear. I already rebooted it twice. Don't tell me to reboot again.",
    best: "ack",
    options: [
      {
        id: "ack",
        text: "I hear you — board packet in twenty minutes, gray smear after two reboots. I'll stay on this and give you an update in five minutes while I check toner and the fuser path.",
      },
      {
        id: "argue",
        text: "Rebooting is still the right first step. You should have waited longer.",
      },
      {
        id: "jargon",
        text: "This is likely a failed primary charge roller on the EP drum. Consult the service manual section 4.2.",
      },
      {
        id: "blame",
        text: "If you used third-party toner this is on you.",
      },
    ],
  },
  {
    id: "wifi",
    title: "Call 2 — confused Wi-Fi",
    transcript:
      "My laptop says connected but I can't open the payroll site. Everyone else in the room is fine. I'm not good with computers.",
    best: "ack",
    options: [
      {
        id: "ack",
        text: "You're connected but payroll fails, others in the room work. I'll check whether you have an IP, a gateway, and DNS, then I'll tell you what I find in two minutes.",
      },
      {
        id: "argue",
        text: "If you're connected, the problem is payroll, not Wi-Fi. Try harder.",
      },
      {
        id: "jargon",
        text: "Flush the ARP cache, release DHCP, and inspect the 802.1X supplicant.",
      },
      {
        id: "blame",
        text: "You probably clicked a phishing AP. That's user error.",
      },
    ],
  },
  {
    id: "difficult",
    title: "Call 3 — “I already tried that”",
    transcript:
      "I already tried that. I already restarted. I already toggled Wi-Fi. Why do you people always ask the same questions? Just remote in.",
    best: "ack",
    options: [
      {
        id: "ack",
        text: "You've already restarted and toggled Wi-Fi — I won't repeat those. I need two facts so I can remote in safely: whether this is a domain PC, and whether anyone else is using it. Then I'll join.",
      },
      {
        id: "argue",
        text: "If you already tried that, you wouldn't be calling. Walk me through it again from scratch.",
      },
      {
        id: "jargon",
        text: "I'll dump netsh wlan show interfaces and parse the BSSID RSSI before we talk.",
      },
      {
        id: "blame",
        text: "Difficult users slow the queue. Call back when you're calmer.",
      },
    ],
  },
];

export function VoiceLab({ lab, onSolved }: LabSimProps) {
  void lab;
  const { solved, markSolved } = useSolved(onSolved);
  const [picks, setPicks] = useState<Record<string, string>>({});
  const [msg, setMsg] = useState("");
  const [revealed, setRevealed] = useState(false);
  const [ok, setOk] = useState(false);

  function check() {
    const missed = CALLS.filter((c) => picks[c.id] !== c.best);
    setRevealed(true);
    if (missed.length) {
      vibrateFail();
      setOk(false);
      setMsg(
        `${MISS_LINE} ${missed
          .map(
            (c) =>
              `${c.title}: BEST acknowledges, restates, and sets a timeline. Arguing, jargon dumps, and blame fail 4.7.`,
          )
          .join(" ")}`,
      );
      return;
    }
    vibrateSuccess();
    setOk(true);
    setMsg(`${successLine(0)} All three BEST responses selected. Audio is optional; the transcript is the lab.`);
    markSolved();
  }

  return (
    <div className="space-y-4 text-sm">
      <LabStatus
        solved={solved}
        mission="Read each transcript (always visible — a silent player is not the lab) and pick the BEST response."
      />
      <p className="text-xs text-muted-foreground">
        Press Listen on each transcript. Cloud voice is used when available;
        otherwise this device speaks. The written transcript is always the lab.
      </p>
      {CALLS.map((call) => (
        <section key={call.id} className="rounded border p-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h3 className="font-medium">{call.title}</h3>
            <ListenButton text={call.transcript} title={call.title} />
          </div>
          <p className="mt-2 rounded bg-muted/60 p-3 leading-6">{call.transcript}</p>
          <ul className="mt-3 space-y-3">
            {call.options.map((o, choiceIndex) => {
              const on = picks[call.id] === o.id;
              const isKey = o.id === call.best;
              const mark =
                revealed && isKey ? "correct" : revealed && on && !isKey ? "wrong" : undefined;
              return (
                <li key={o.id}>
                  <AnswerChoice
                    letter={choiceLetter(choiceIndex)}
                    text={o.text}
                    pressed={on}
                    mark={mark}
                    dim={revealed && !isKey && !on}
                    disabled={ok}
                    onClick={() => {
                      if (ok) return;
                      setPicks((p) => ({ ...p, [call.id]: o.id }));
                      setRevealed(false);
                      setMsg("");
                    }}
                  />
                </li>
              );
            })}
          </ul>
        </section>
      ))}
      {msg ? (
        <p
          role="status"
          data-testid="answer-feedback"
          data-state={ok ? "correct" : "wrong"}
          className={
            ok
              ? "text-base font-semibold text-emerald-700 dark:text-emerald-300"
              : "text-sm leading-6 text-red-800 dark:text-red-200"
          }
        >
          {msg}
        </p>
      ) : null}
      <Button className={bigCheckClass} onClick={check} disabled={ok}>
        Check responses
      </Button>
    </div>
  );
}
