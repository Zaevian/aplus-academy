"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import type { LabSimProps } from "@/components/labs/lab-kit";
import { LabStatus, useSolved } from "@/components/labs/lab-kit";

const MAIL = [
  {
    id: "bec",
    from: "ceo@apex-holdlngs.com",
    subject: "WIRE NOW — stay on this thread",
    phish: true,
    why: "BEC: urgency plus money plus a lookalike domain (holdlngs).",
  },
  {
    id: "ms",
    from: "notify@rnicrosoft.com",
    subject: "Mailbox full — reauthenticate",
    phish: true,
    why: "rnicrosoft is not microsoft. Look at the actual domain.",
  },
  {
    id: "vendor",
    from: "invoices@vendor.example",
    subject: "January statement (PDF on our portal)",
    phish: false,
    why: "Known vendor domain, no urgency+wire, no lookalike.",
  },
  {
    id: "qr",
    from: "facilities@apex.example",
    subject: "New parking QR — scan from your phone",
    phish: true,
    why: "Unexpected QR in email is a delivery path. Verify out-of-band.",
  },
];

export function PhishingLab({ lab, onSolved }: LabSimProps) {
  void lab;
  const { solved, markSolved } = useSolved(onSolved);
  const [tab, setTab] = useState<"inbox" | "twin" | "vish">("inbox");
  const [marks, setMarks] = useState<Record<string, "phish" | "legit" | "">>({});
  const [ssid, setSsid] = useState("");
  const [first, setFirst] = useState("");
  const [vish, setVish] = useState("");
  const [msg, setMsg] = useState("");

  function check() {
    const mailWrong = MAIL.filter((m) => {
      const got = marks[m.id];
      return m.phish ? got !== "phish" : got !== "legit";
    });
    if (mailWrong.length) {
      setMsg(mailWrong.map((m) => m.why).join(" "));
      setTab("inbox");
      return;
    }
    if (ssid !== "Office-WiFi-Free" || first !== "verify") {
      setMsg(
        "Evil twin is the clone SSID without the captive portal you expect (Office-WiFi-Free). FIRST: do not join to 'test' a password — verify with staff.",
      );
      setTab("twin");
      return;
    }
    if (vish !== "best") {
      setMsg(
        "Vishing: do not read an OTP to a caller claiming to be the ISP. Hang up and use the number on the bill.",
      );
      setTab("vish");
      return;
    }
    setMsg("Inbox, evil twin, and vishing handled.");
    markSolved();
  }

  return (
    <div className="space-y-3 text-sm">
      <LabStatus
        solved={solved}
        mission="Classify the inbox, pick the evil twin and a safe first action, then the BEST vishing response."
      />
      <div className="flex gap-2">
        {(["inbox", "twin", "vish"] as const).map((t) => (
          <Button
            key={t}
            size="sm"
            className="min-h-11"
            variant={tab === t ? "default" : "outline"}
            onClick={() => setTab(t)}
          >
            {t === "inbox" ? "Inbox" : t === "twin" ? "Evil twin" : "QR / vishing"}
          </Button>
        ))}
      </div>
      {tab === "inbox" ? (
        <ul className="space-y-2">
          {MAIL.map((m) => (
            <li key={m.id} className="rounded border p-2">
              <p className="font-medium">{m.subject}</p>
              <p className="text-xs text-muted-foreground">{m.from}</p>
              <div className="mt-2 flex gap-2">
                <Button
                  size="sm"
                  className="min-h-11"
                  variant={marks[m.id] === "phish" ? "default" : "outline"}
                  onClick={() => setMarks((x) => ({ ...x, [m.id]: "phish" }))}
                >
                  Phish
                </Button>
                <Button
                  size="sm"
                  className="min-h-11"
                  variant={marks[m.id] === "legit" ? "default" : "outline"}
                  onClick={() => setMarks((x) => ({ ...x, [m.id]: "legit" }))}
                >
                  Legit
                </Button>
              </div>
            </li>
          ))}
        </ul>
      ) : null}
      {tab === "twin" ? (
        <div className="space-y-2">
          <p>SSID list at the lobby. Office normally uses a splash page.</p>
          {["Office-WiFi", "Office-WiFi_Guest", "Office-WiFi-Free"].map((s) => (
            <label key={s} className="flex min-h-11 items-center gap-2">
              <input
                type="radio"
                name="ssid"
                checked={ssid === s}
                onChange={() => setSsid(s)}
              />
              {s}
            </label>
          ))}
          <p>FIRST useful action</p>
          <select
            className="min-h-11 w-full rounded-md border bg-background px-2"
            value={first}
            onChange={(e) => setFirst(e.target.value)}
          >
            <option value="">Select</option>
            <option value="join">Join and enter the password to test it</option>
            <option value="verify">Do not join — verify the SSID with staff</option>
            <option value="portal">Open a random HTTP site to force the portal</option>
          </select>
        </div>
      ) : null}
      {tab === "vish" ? (
        <div className="space-y-2">
          <p className="rounded bg-muted/60 p-2">
            Transcript: “This is your ISP fraud desk. Read me the 6-digit code we
            just texted so we can stop a charge.”
          </p>
          <select
            className="min-h-11 w-full rounded-md border bg-background px-2"
            value={vish}
            onChange={(e) => setVish(e.target.value)}
          >
            <option value="">BEST response</option>
            <option value="otp">Read the OTP — they called you</option>
            <option value="best">Hang up. Call the number on the bill. Never read an OTP.</option>
            <option value="argue">Argue about the charge on this call</option>
          </select>
        </div>
      ) : null}
      <Button size="sm" className="min-h-11" onClick={check}>
        Check social-engineering lab
      </Button>
      {msg ? <p className="text-muted-foreground">{msg}</p> : null}
    </div>
  );
}
