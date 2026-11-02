"use client";

import { useRef, useState } from "react";
import type { Lab } from "@/content/schema";
import { LabStatus } from "@/components/labs/lab-kit";

export const WIN: Record<string, string> = {
  help: "Sandboxed educational prompt. Try: ipconfig, ipconfig /all, ping 1.1.1.1, ping intranet.lab, nslookup, hostname, whoami, sfc /scannow, gpresult /r.",
  hostname: "HELP-PC-14",
  whoami: "helpdesk\\jlee",
  ipconfig:
    "IPv4 Address . . . . . . : 192.168.1.50\nSubnet Mask . . . . . . : 255.255.255.0\nDefault Gateway . . . . : 192.168.1.1\nDNS Servers . . . . . . : 192.168.1.1",
  "ipconfig /all":
    "DHCP Enabled. . . . . . : Yes\nLease Obtained. . . . . : 07:14\nDHCP Server . . . . . . : 192.168.1.1\nDNS Servers . . . . . . : 192.168.1.1",
  "ping 1.1.1.1":
    "Pinging 1.1.1.1 with 32 bytes of data:\nReply from 1.1.1.1: time=14ms\nReply from 1.1.1.1: time=13ms",
  "ping intranet.lab":
    "Ping request could not find host intranet.lab. Check the name and try again.",
  nslookup: "Default Server: router.lab\nAddress: 192.168.1.1\n*** router.lab can't find intranet.lab: Non-existent domain",
  sfc: "Beginning system scan. This is a simulated sfc /scannow — host is not scanned.",
  "sfc /scannow":
    "Beginning system scan. This is a simulated sfc /scannow — host is not scanned.\nWindows Resource Protection did not find any integrity violations.",
  gpresult: "Simulated gpresult: computer is workgroup-joined, no domain GPOs.",
  "gpresult /r": "Simulated gpresult /r: computer is workgroup-joined, no domain GPOs applied.",
};

export const LINUX: Record<string, string> = {
  help: "Sandboxed Linux. Try: pwd, ls, ls -l, cat /etc/hosts, cat /etc/resolv.conf, ip addr, ping -c 4 192.168.1.1, chmod 640 notes.txt, chown alice notes.txt, sudo chown alice:staff notes.txt, sudo whoami, man.",
  pwd: "/home/tech",
  ls: "notes.txt  ticket.md",
  "cat /etc/hosts": "127.0.0.1 localhost\n192.168.1.10 printer.lab",
  "cat /etc/resolv.conf": "nameserver 192.168.1.1",
  "ls -l": "-rw-r--r-- 1 tech staff 120 notes.txt\n-rw-r--r-- 1 tech staff 340 ticket.md",
  ip: "Usage: ip [ OPTIONS ] OBJECT { COMMAND | help } — try ip addr",
  "ip addr": "2: eth0: <UP> inet 192.168.1.50/24 brd 192.168.1.255\n(default route via 192.168.1.1 — see ip route)",
  "ip a": "2: eth0: <UP> inet 192.168.1.50/24 brd 192.168.1.255",
  "ip route": "default via 192.168.1.1 dev eth0",
  ping: "ping: usage error: Destination address required — try ping -c 4 192.168.1.1",
  "ping -c 4 192.168.1.1":
    "PING 192.168.1.1 56(84) bytes of data.\n64 bytes from 192.168.1.1: time=1 ms\n--- 4 packets transmitted, 4 received, 0% packet loss",
  "chmod 640 notes.txt": "(no output) notes.txt is now -rw-r----- : owner read/write, group read, others none.",
  "chown alice notes.txt": "chown: changing ownership of 'notes.txt': Operation not permitted — giving a file to another user needs root; try sudo.",
  "sudo chown alice:staff notes.txt": "[sudo] password for tech: (simulated)\n(no output) notes.txt is now owned by alice, group staff.",
  "sudo whoami": "[sudo] password for tech: (simulated)\nroot",
  whoami: "tech",
  man: "Use man <command> in real life. This sandbox prints short help.",
};

export function CliLab({
  lab,
  flavor,
  onSolved,
}: {
  lab: Lab;
  flavor: "windows" | "linux";
  onSolved?: () => void;
}) {
  const map = flavor === "windows" ? WIN : LINUX;
  const prompt = flavor === "windows" ? "C:\\Users\\tech>" : "tech@lab:~$";
  const [lines, setLines] = useState<string[]>([
    "Educational sandbox. It cannot execute commands on this machine or the server.",
    'Type "help".',
  ]);
  const [ranRequired, setRanRequired] = useState(false);
  const input = useRef<HTMLInputElement>(null);
  const required = flavor === "windows" ? "ipconfig" : "ls";

  function run(raw: string) {
    const cmd = raw.trim();
    if (!cmd) return;
    const key = Object.keys(map).find((k) => k.toLowerCase() === cmd.toLowerCase());
    const out = key
      ? map[key]
      : `'${cmd}' is not recognized in this sandbox. Try help.`;
    setLines((l) => [...l, `${prompt} ${cmd}`, out ?? ""]);
    if (cmd.toLowerCase() === required || cmd.toLowerCase().startsWith(`${required} `)) {
      setRanRequired(true);
      onSolved?.();
    }
  }

  void lab;
  return (
    <div className="space-y-2">
    <LabStatus
      solved={ranRequired}
      mission={`Sandbox only — it never runs on the host. Type ${required} to complete.`}
    />
    <div
      className="rounded-md bg-zinc-950 p-3 font-mono text-xs text-zinc-100"
      onClick={() => input.current?.focus()}
    >
      <pre className="max-h-56 overflow-y-auto whitespace-pre-wrap">
        {lines.join("\n")}
      </pre>
      <form
        className="mt-2 flex gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          const el = input.current;
          if (!el) return;
          run(el.value);
          el.value = "";
        }}
      >
        <span>{prompt}</span>
        <input
          ref={input}
          className="min-h-11 flex-1 bg-transparent outline-none"
          aria-label="Sandbox command"
          autoComplete="off"
        />
      </form>
    </div>
    </div>
  );
}
