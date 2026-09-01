"use client";

import { useRef, useState } from "react";
import type { Lab } from "@/content/schema";

const WIN: Record<string, string> = {
  help: "Sandboxed educational prompt. Try: ipconfig, ping 1.1.1.1, ping intranet.lab, nslookup, hostname, whoami, sfc, gpresult.",
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
  gpresult: "Simulated gpresult: computer is workgroup-joined, no domain GPOs.",
};

const LINUX: Record<string, string> = {
  help: "Sandboxed Linux. Try: pwd, ls, cat /etc/hosts, ip, ping, man, chmod, sudo.",
  pwd: "/home/tech",
  ls: "notes.txt  ticket.md",
  "cat /etc/hosts": "127.0.0.1 localhost\n192.168.1.10 printer.lab",
  "cat /etc/resolv.conf": "nameserver 192.168.1.1",
  ip: "eth0  192.168.1.50/24  gw 192.168.1.1",
  ping: "PING 192.168.1.1: 64 bytes time=1 ms",
  whoami: "tech",
  man: "Use man <command> in real life. This sandbox prints short help.",
};

export function CliLab({
  flavor,
}: {
  lab: Lab;
  flavor: "windows" | "linux";
}) {
  const map = flavor === "windows" ? WIN : LINUX;
  const prompt = flavor === "windows" ? "C:\\Users\\tech>" : "tech@lab:~$";
  const [lines, setLines] = useState<string[]>([
    "Educational sandbox. It cannot execute commands on this machine or the server.",
    'Type "help".',
  ]);
  const input = useRef<HTMLInputElement>(null);

  function run(raw: string) {
    const cmd = raw.trim();
    if (!cmd) return;
    const key = Object.keys(map).find((k) => k.toLowerCase() === cmd.toLowerCase());
    const out = key
      ? map[key]
      : `'${cmd}' is not recognized in this sandbox. Try help.`;
    setLines((l) => [...l, `${prompt} ${cmd}`, out ?? ""]);
  }

  return (
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
          className="flex-1 bg-transparent outline-none"
          aria-label="Sandbox command"
          autoComplete="off"
        />
      </form>
    </div>
  );
}
