"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import type { LabSimProps } from "@/components/labs/lab-kit";
import { LabStatus, useSolved } from "@/components/labs/lab-kit";
import { AnswerChoice, bigCheckClass } from "@/components/quiz/answer-choice";
import { MISS_LINE, choiceLetter, successLine } from "@/lib/answer-feedback";
import { vibrateFail, vibrateSuccess } from "@/lib/haptics";
import { shuffle } from "@/lib/questions";

type Ticket = {
  id: string;
  title: string;
  body: string;
  correct: string;
  choices: { id: string; text: string; why: string }[];
};

const CORE1: Ticket[] = [
  {
    id: "post",
    title: "No POST",
    body: "Desktop is dead: no beep, no logo, fans twitch once.",
    correct: "psu",
    choices: [
      { id: "psu", text: "Confirm power: outlet, PSU switch, 24-pin and EPS seated, then minimal boot.", why: "FIRST is power and seating, not a new motherboard." },
      { id: "mobo", text: "Replace the motherboard immediately.", why: "Replacement before testing skips identification." },
      { id: "os", text: "Reinstall Windows.", why: "No POST never reaches the OS." },
      { id: "raid", text: "Rebuild RAID 0.", why: "Firmware has not started." },
    ],
  },
  {
    id: "raid",
    title: "RAID degraded",
    body: "RAID 1 array shows degraded. User wants 'the backup'.",
    correct: "spare",
    choices: [
      { id: "spare", text: "Identify the failed member, replace it, and let the mirror rebuild. RAID is not a backup.", why: "Degraded RAID 1 still serves data from the surviving disk." },
      { id: "format", text: "Format both disks to start clean.", why: "Destroys the surviving copy." },
      { id: "backup", text: "Tell the user RAID 1 is their backup so no restore is needed.", why: "RAID is availability, not a backup." },
      { id: "10", text: "Convert to RAID 10 in place.", why: "Not a FIRST action on a degraded array." },
    ],
  },
  {
    id: "limited",
    title: "Limited connectivity",
    body: "Laptop shows 169.254.x.x and a yellow bang on the NIC status.",
    correct: "dhcp",
    choices: [
      { id: "dhcp", text: "Treat APIPA as DHCP failure: check cable/SSID, then the DHCP server/scope.", why: "169.254 means no DHCP lease." },
      { id: "dns", text: "Change DNS to 8.8.8.8 first.", why: "Without a lease, DNS is not the first fork." },
      { id: "reimage", text: "Reimage the laptop.", why: "Layer 3 addressing first." },
      { id: "vpn", text: "The 169.254 address is a VPN tunnel. Ignore LAN DHCP.", why: "APIPA is link-local, not VPN." },
    ],
  },
  {
    id: "ghost",
    title: "Ghosted print",
    body: "Laser pages show a faint second copy of the letterhead.",
    correct: "fuser",
    choices: [
      { id: "fuser", text: "Ghosting often implicates drum/fuser. Do not start with a new printer.", why: "Match the symptom to the subsystem." },
      { id: "buy", text: "Buy a new printer.", why: "Not a first action." },
      { id: "paper", text: "Use thicker paper only.", why: "Ghosting is not a tray weight issue first." },
      { id: "driver", text: "Reinstall the PCL driver.", why: "Garbled text is language; a faint copy is electrophotographic." },
    ],
  },
  {
    id: "hot",
    title: "Overheating laptop",
    body: "Throttles after 10 minutes, fans scream, vents packed.",
    correct: "airflow",
    choices: [
      { id: "airflow", text: "Power down, clear vents, check the fan, then thermal paste if needed.", why: "Heat follows airflow and contact." },
      { id: "os", text: "Reset Windows first.", why: "Hardware heat is not an OS repair first." },
      { id: "cpu", text: "Replace the CPU immediately.", why: "Identification before replacement." },
      { id: "battery", text: "The battery is swelling so ignore vents.", why: "Swell is a different ticket; this one names vents." },
    ],
  },
  {
    id: "display",
    title: "No display",
    body: "Laptop lid open, power LED on, no image on internal panel. HDMI works on a monitor.",
    correct: "inverter",
    choices: [
      { id: "inverter", text: "External works: suspect lid switch, cable, backlight/inverter or panel — not the GPU first.", why: "External image proves GPU/OS path." },
      { id: "gpu", text: "Replace the GPU.", why: "External output contradicts a dead GPU." },
      { id: "windows", text: "Startup Repair.", why: "You already have an image on HDMI." },
      { id: "ram", text: "Reseat RAM only.", why: "No POST issues were described." },
    ],
  },
  {
    id: "ap",
    title: "AP interference",
    body: "Two APs in one hallway, both 2.4 GHz channel 6, users drop.",
    correct: "channel",
    choices: [
      { id: "channel", text: "Separate 2.4 channels (1/6/11) or move load to 5/6 GHz.", why: "Co-channel overlap is the evidence." },
      { id: "power", text: "Turn both APs to maximum power.", why: "Makes overlap worse." },
      { id: "ssid", text: "Hide the SSID.", why: "Does not fix RF overlap." },
      { id: "cat6", text: "Replace all patch cords with Cat 8.", why: "This is RF, not copper category first." },
    ],
  },
  {
    id: "hdd",
    title: "Slow storage",
    body: "Boot takes 8 minutes. CrystalDiskInfo shows a 5400 RPM HDD at 90% capacity.",
    correct: "ssd",
    choices: [
      { id: "ssd", text: "Free space plus an SSD upgrade path. HDD seek is the bottleneck.", why: "Symptom matches spinning rust, not malware first." },
      { id: "malware", text: "Reimage for ransomware immediately.", why: "No malware evidence in the stem." },
      { id: "dns", text: "Flush DNS.", why: "Boot time is storage, not name resolution." },
      { id: "raid0", text: "Stripe two dying HDDs for speed.", why: "RAID 0 is not a backup and not a FIRST repair here." },
    ],
  },
  {
    id: "vpn",
    title: "VPN vs LAN IP",
    body: "User can hit file shares at home on VPN but not the printer at 192.168.1.50 on the office LAN.",
    correct: "split",
    choices: [
      { id: "split", text: "Check split tunnel vs full tunnel and whether 192.168.1.0/24 is routed over the VPN.", why: "Office printer is not on the home LAN." },
      { id: "reinstall", text: "Reinstall the printer locally at home.", why: "The printer is in the office." },
      { id: "apipa", text: "The VPN assigned 169.254 so ignore routing.", why: "No APIPA was given." },
      { id: "dns2", text: "Change the home router to 8.8.8.8 only.", why: "Name resolution is not the stated miss." },
    ],
  },
  {
    id: "toner",
    title: "Faded laser",
    body: "Even fade across every page. Drum is recent.",
    correct: "toner",
    choices: [
      { id: "toner", text: "Even fade: toner/density first, not a new drum.", why: "Drum interval marks repeat; even fade is toner." },
      { id: "drum", text: "Replace the drum because fade is always the drum.", why: "Repeating marks follow the drum, even fade does not." },
      { id: "fuser", text: "Replace the fuser first.", why: "Fuser ghosts or smears, not even fade first." },
      { id: "buy2", text: "New printer.", why: "Not FIRST." },
    ],
  },
  {
    id: "swell",
    title: "Battery swell",
    body: "Laptop trackpad clicks itself. Case is proud near the pad.",
    correct: "poweroff",
    choices: [
      { id: "poweroff", text: "Power off, do not charge, treat as a damaged cell, replace the pack. Do not puncture.", why: "Swell is a safety FIRST." },
      { id: "cal", text: "Calibrate the battery in firmware.", why: "Calibration does not unswell a cell." },
      { id: "so", text: "Keep using it until it dies.", why: "Mechanical pressure and fire risk." },
      { id: "freeze", text: "Put the laptop in a freezer.", why: "Not a technician action." },
    ],
  },
  {
    id: "dhcp2",
    title: "Printer offline",
    body: "Printer had 192.168.1.40. DHCP scope moved. Now it is dark on the map.",
    correct: "lease",
    choices: [
      { id: "lease", text: "Check the new lease/reservation and the queue port, not the toner first.", why: "Addressing changed." },
      { id: "toner2", text: "Replace toner because offline means empty.", why: "Offline on the map is network, not toner." },
      { id: "reimage2", text: "Reimage a nearby PC.", why: "Wrong endpoint." },
      { id: "raid2", text: "Check RAID on the printer.", why: "SOHO printers are not RAID arrays." },
    ],
  },
];

const CORE2: Ticket[] = [
  {
    id: "hallucination",
    title: "AI 4.10 — hallucinated command",
    body: "A tech pasted a public-chatbot 'fix' that runs `rm -rf /` on a customer Linux POS. It looks confident and cites a blog.",
    correct: "verify",
    choices: [
      { id: "verify", text: "Do not run it. Treat AI output as unverified. Read the command. Use vendor docs.", why: "4.10: hallucination is fluent and wrong." },
      { id: "run", text: "Run it — the model cited a source.", why: "Citations do not make a destructive command safe." },
      { id: "paste", text: "Paste the customer database into the same chatbot for a better script.", why: "That is a 4.10 data leak." },
      { id: "ban", text: "All AI is banned so close the ticket without reading the command.", why: "4.10 teaches appropriate use plus verification, not a blanket ban." },
    ],
  },
  {
    id: "leak",
    title: "AI 4.10 — data leak prompt",
    body: "User wants to paste a CSV of SSNs into a public AI 'to make a pivot table'.",
    correct: "stop",
    choices: [
      { id: "stop", text: "Stop. PII does not go to a public model. Use local spreadsheet tools or an approved private AI.", why: "4.10 data classification." },
      { id: "ok", text: "Public AI is encrypted so SSNs are fine.", why: "TLS to a vendor is not a business associate agreement." },
      { id: "anon", text: "Change the column header from SSN to ID and paste.", why: "The values are still SSNs." },
      { id: "train", text: "Fine-tune a model on the CSV first.", why: "Worse leak, not A+ depth." },
    ],
  },
  {
    id: "bsod",
    title: "BSOD after driver",
    body: "STOP after a GPU driver update. Can boot to Safe Mode.",
    correct: "roll",
    choices: [
      { id: "roll", text: "Roll back or clean-boot the driver from Safe Mode. Capture the dump if needed.", why: "Recent change plus Safe Mode is the fork." },
      { id: "reimage", text: "Reimage immediately.", why: "Repair Windows before reimage when the image is otherwise good." },
      { id: "bios", text: "Flash BIOS first.", why: "The stem names a driver." },
      { id: "ai", text: "Ask a public AI and run whatever it replies.", why: "4.10 plus malware risk." },
    ],
  },
  {
    id: "popup",
    title: "Malware popup",
    body: "Home PC: fake AV, locked browser, System Restore is on.",
    correct: "verify",
    choices: [
      { id: "verify", text: "Verify symptoms, quarantine, then disable System Restore on Windows Home before cleaning.", why: "10-step order." },
      { id: "restore", text: "Roll System Restore first to yesterday.", why: "May restore the malware. Disable it at step 3." },
      { id: "format", text: "Format C: as step 1.", why: "Verify and quarantine come first." },
      { id: "educate", text: "Educate the user first, then investigate.", why: "Educate is step 10." },
    ],
  },
  {
    id: "redirect",
    title: "Browser redirect",
    body: "Every search goes to a lookalike engine. Cert warnings on the bank site.",
    correct: "ext",
    choices: [
      { id: "ext", text: "Inspect extensions, proxy, hosts file, then malware process — not just 'clear cache'.", why: "Redirects are often hijacks." },
      { id: "cache", text: "Clear cache only and close.", why: "Hijack survives cache." },
      { id: "ignore", text: "Click through cert warnings.", why: "Warnings are clues." },
      { id: "raid", text: "Rebuild RAID 5.", why: "Wrong domain." },
    ],
  },
  {
    id: "slowboot",
    title: "Slow boot",
    body: "Windows 11, SSD healthy, 40 startup apps, last change was a 'optimizer'.",
    correct: "msconfig",
    choices: [
      { id: "msconfig", text: "Task Manager Startup apps / Autoruns: disable the optimizer, measure again.", why: "Startup impact first." },
      { id: "hdd", text: "Replace the SSD with a 5400 HDD.", why: "Opposite of helpful." },
      { id: "restore2", text: "Enable System Restore and call it done.", why: "Does not remove the optimizer." },
      { id: "gpt", text: "Ask a public AI to rewrite the BCD.", why: "4.10 unverified change." },
    ],
  },
  {
    id: "ntfs",
    title: "Access denied",
    body: "Remote share: NTFS Modify, share Read. Local console works.",
    correct: "share",
    choices: [
      { id: "share", text: "Share ACL caps remote users. Local ignores share. Raise share or use a different path.", why: "Most restrictive combination wins remotely." },
      { id: "deny", text: "Add Deny Full on NTFS to fix it.", why: "Deny makes it worse." },
      { id: "reimage3", text: "Reimage.", why: "Permissions, not OS corruption." },
      { id: "guest", text: "Enable the Guest account.", why: "Opposite of hardening." },
    ],
  },
  {
    id: "time",
    title: "Time drift",
    body: "Laptop 12 minutes slow. Kerberos tickets fail on the domain.",
    correct: "w32",
    choices: [
      { id: "w32", text: "Fix time source (domain hierarchy / w32tm). Auth depends on it.", why: "Kerberos is time-sensitive." },
      { id: "bios2", text: "Replace CMOS battery only and ignore the domain.", why: "Domain members follow the domain clock." },
      { id: "tz", text: "Change the time zone to UTC+14 to compensate.", why: "Does not fix skew." },
      { id: "ai2", text: "Paste the event log into a public AI including usernames.", why: "4.10 leak." },
    ],
  },
  {
    id: "edu",
    title: "After malware",
    body: "Machine is clean. Step 9 restore point is done.",
    correct: "educate",
    choices: [
      { id: "educate", text: "Educate the user (step 10): what they clicked, how to report, do not re-enable the fake AV.", why: "Educate is last." },
      { id: "skip", text: "Skip education; they will learn next infection.", why: "Step 10 exists because they otherwise click again." },
      { id: "sr", text: "Disable System Restore forever.", why: "Step 9 turned it back on with a new point." },
      { id: "share2", text: "Share the malware sample on a public forum.", why: "Data handling miss." },
    ],
  },
  {
    id: "bit",
    title: "BitLocker recovery",
    body: "After a firmware change the PC asks for a 48-digit key. Data is needed today.",
    correct: "key",
    choices: [
      { id: "key", text: "Retrieve the recovery key from AD/Entra/printout. Do not format.", why: "The volume is intact." },
      { id: "format", text: "Format to skip BitLocker.", why: "Destroys the data you were asked to keep." },
      { id: "guess", text: "Brute-force the protector.", why: "Not a help-desk action." },
      { id: "ai3", text: "Upload the recovery screen to a public AI.", why: "4.10 plus possibly the key." },
    ],
  },
  {
    id: "update",
    title: "Failed quality update",
    body: "Windows Update rolls back. Event log shows a driver block.",
    correct: "block",
    choices: [
      { id: "block", text: "Read the setup log / Event Viewer, uninstall the blocking driver or skip the KB with a documented reason.", why: "Update failures leave breadcrumbs." },
      { id: "safe", text: "Leave it failing and close.", why: "Not a resolution." },
      { id: "gpt2", text: "Run an AI-generated diskpart script.", why: "Unverified destructive commands." },
      { id: "guest2", text: "Create a new local admin named Admin and hope.", why: "Does not fix the update." },
    ],
  },
  {
    id: "profile",
    title: "Temp profile",
    body: "User gets a temporary profile after a power loss. Files look empty.",
    correct: "profile",
    choices: [
      { id: "profile", text: "Sign out, fix the profile list/SID, copy data from the old NTUSER hive if intact. Do not format.", why: "Temp profile is a profile load failure." },
      { id: "format2", text: "Format C: to rebuild profiles.", why: "User data may still be in the old folder." },
      { id: "raid3", text: "Break the RAID mirror.", why: "Wrong symptom." },
      { id: "share3", text: "Give Everyone Full Control on C:\\Users.", why: "Security miss." },
    ],
  },
];

export function TicketShiftLab({ lab, onSolved }: LabSimProps) {
  const { solved, markSolved } = useSolved(onSolved);
  const core2 = lab.slug.includes("core2") || lab.id.includes("C2");
  const items = useMemo(() => {
    const pool = core2 ? CORE2 : CORE1;
    return shuffle(pool, lab.id.length / 50).slice(0, 8);
  }, [core2, lab.id]);
  const [i, setI] = useState(0);
  const [closed, setClosed] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);
  const [msg, setMsg] = useState("");
  const [verdict, setVerdict] = useState<"idle" | "correct" | "wrong">("idle");
  const [feedbackTick, setFeedbackTick] = useState(0);
  const ticket = items[i];

  function submit() {
    if (!ticket || !picked || verdict === "correct") return;
    const choice = ticket.choices.find((c) => c.id === picked);
    if (picked !== ticket.correct) {
      vibrateFail();
      setVerdict("wrong");
      setFeedbackTick((n) => n + 1);
      setMsg(
        `${MISS_LINE} Why that fails: ${choice?.why ?? ""} Correct FIRST: ${ticket.choices.find((c) => c.id === ticket.correct)?.text}`,
      );
      return;
    }
    vibrateSuccess();
    setVerdict("correct");
    setFeedbackTick((n) => n + 1);
    setMsg(successLine(closed));
  }

  function advance() {
    const nextClosed = closed + 1;
    setClosed(nextClosed);
    setPicked(null);
    setVerdict("idle");
    setMsg("");
    if (nextClosed >= 8) {
      markSolved();
      return;
    }
    setI((x) => x + 1);
  }

  if (!ticket) return null;

  return (
    <div className="space-y-3 text-sm">
      <LabStatus
        solved={solved}
        mission={
          core2
            ? "Close 8 Core 2 tickets, including AI 4.10. FIRST actions only."
            : "Close 8 Core 1 hardware/network tickets. FIRST actions only."
        }
      />
      <p className="font-medium">
        Ticket {Math.min(closed + 1, 8)} / 8 · {ticket.title}
      </p>
      <p className="rounded bg-muted/60 p-3 leading-6">{ticket.body}</p>
      <ul className="space-y-3" key={feedbackTick}>
        {ticket.choices.map((c, choiceIndex) => {
          const on = picked === c.id;
          const show = verdict !== "idle";
          const isKey = c.id === ticket.correct;
          const mark =
            show && isKey ? "correct" : show && on && !isKey ? "wrong" : undefined;
          return (
            <li key={c.id}>
              <AnswerChoice
                letter={choiceLetter(choiceIndex)}
                text={c.text}
                pressed={on}
                mark={mark}
                dim={show && !isKey && !on}
                disabled={verdict === "correct"}
                onClick={() => {
                  if (verdict === "correct") return;
                  setPicked(c.id);
                  setVerdict("idle");
                  setMsg("");
                }}
              />
            </li>
          );
        })}
      </ul>
      {verdict === "correct" ? (
        <p role="status" data-testid="answer-feedback" data-state="correct" className="text-base font-semibold text-emerald-700 dark:text-emerald-300">
          {msg}
        </p>
      ) : verdict === "wrong" ? (
        <p role="status" data-testid="answer-feedback" data-state="wrong" className="text-sm leading-6 text-red-800 dark:text-red-200">
          {msg}
        </p>
      ) : null}
      {verdict === "correct" ? (
        <Button className={bigCheckClass} onClick={advance}>
          {closed + 1 >= 8 ? "Finish shift" : "Next ticket"}
        </Button>
      ) : (
        <Button className={bigCheckClass} disabled={!picked} onClick={submit}>
          Close ticket
        </Button>
      )}
    </div>
  );
}
