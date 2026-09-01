"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import type { LabSimProps } from "@/components/labs/lab-kit";
import { LabStatus, useSolved } from "@/components/labs/lab-kit";

const TABS = ["Status", "LAN", "DHCP", "Wi-Fi", "DNS", "Guest", "Firewall"] as const;

function isPrivate(ip: string): boolean {
  const m = /^(\d+)\.(\d+)\.(\d+)\.(\d+)$/.exec(ip.trim());
  if (!m) return false;
  const a = Number(m[1]);
  const b = Number(m[2]);
  if (a === 10) return true;
  if (a === 192 && b === 168) return true;
  if (a === 172 && b >= 16 && b <= 31) return true;
  return false;
}

function ipToInt(ip: string): number | null {
  const m = /^(\d+)\.(\d+)\.(\d+)\.(\d+)$/.exec(ip.trim());
  if (!m) return null;
  return (
    ((Number(m[1]) << 24) >>> 0) +
    (Number(m[2]) << 16) +
    (Number(m[3]) << 8) +
    Number(m[4])
  );
}

export function RouterLab({ lab, onSolved }: LabSimProps) {
  void lab;
  const { solved, markSolved } = useSolved(onSolved);
  const [tab, setTab] = useState<(typeof TABS)[number]>("Status");
  const [password, setPassword] = useState("admin");
  const [lanIp, setLanIp] = useState("192.168.0.1");
  const [dhcpStart, setDhcpStart] = useState("192.168.0.1");
  const [dhcpEnd, setDhcpEnd] = useState("192.168.0.254");
  const [wifi, setWifi] = useState("Open");
  const [dns, setDns] = useState("");
  const [guest, setGuest] = useState(false);
  const [guestIso, setGuestIso] = useState(false);
  const [upnp, setUpnp] = useState(true);
  const [msg, setMsg] = useState("");

  const checks = useMemo(() => {
    const start = ipToInt(dhcpStart);
    const end = ipToInt(dhcpEnd);
    const router = ipToInt(lanIp);
    const scopeOk =
      start !== null &&
      end !== null &&
      router !== null &&
      start > router &&
      end > start;
    return {
      password: password.length >= 8 && password !== "admin",
      lan: isPrivate(lanIp),
      dhcp: scopeOk,
      wifi: wifi === "WPA3" || wifi === "WPA2/WPA3",
      dns: dns === "1.1.1.1" || dns === "9.9.9.9" || dns === "8.8.8.8",
      guest: guest && guestIso,
      firewall: !upnp,
    };
  }, [password, lanIp, dhcpStart, dhcpEnd, wifi, dns, guest, guestIso, upnp]);

  function apply() {
    const failed = Object.entries(checks)
      .filter(([, v]) => !v)
      .map(([k]) => k);
    if (failed.length) {
      setMsg(
        `Still open: ${failed.join(", ")}. Change the default password, private LAN, DHCP that skips the router address, WPA3, DNS via DHCP, guest isolation, and disable UPnP.`,
      );
      return;
    }
    setMsg("SOHO admin UI meets the hardening mission.");
    markSolved();
  }

  return (
    <div className="space-y-3 text-sm">
      <LabStatus
        solved={solved}
        mission="Harden the fake admin UI: password, private LAN, DHCP scope, WPA3, DNS, guest isolation, UPnP off."
      />
      {password === "admin" ? (
        <p className="rounded border border-destructive/40 bg-destructive/10 p-2 text-xs">
          Default credentials admin/admin are still set. That is a finding.
        </p>
      ) : null}
      <div className="flex flex-wrap gap-1">
        {TABS.map((t) => (
          <Button
            key={t}
            size="sm"
            className="min-h-11"
            variant={tab === t ? "default" : "outline"}
            onClick={() => setTab(t)}
          >
            {t}
          </Button>
        ))}
      </div>
      {tab === "Status" ? (
        <div className="space-y-2">
          <p>LAN {lanIp} · Wi-Fi {wifi} · UPnP {upnp ? "on" : "off"} · guest {guest ? "on" : "off"}</p>
          <label className="block">
            Admin password (default is admin)
            <input
              className="mt-1 min-h-11 w-full rounded-md border px-2"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
        </div>
      ) : null}
      {tab === "LAN" ? (
        <label className="block">
          LAN IP
          <input
            className="mt-1 min-h-11 w-full rounded-md border px-2"
            value={lanIp}
            onChange={(e) => setLanIp(e.target.value)}
          />
        </label>
      ) : null}
      {tab === "DHCP" ? (
        <div className="grid gap-2 sm:grid-cols-2">
          <label>
            Scope start
            <input
              className="mt-1 min-h-11 w-full rounded-md border px-2"
              value={dhcpStart}
              onChange={(e) => setDhcpStart(e.target.value)}
            />
          </label>
          <label>
            Scope end
            <input
              className="mt-1 min-h-11 w-full rounded-md border px-2"
              value={dhcpEnd}
              onChange={(e) => setDhcpEnd(e.target.value)}
            />
          </label>
        </div>
      ) : null}
      {tab === "Wi-Fi" ? (
        <label className="block">
          Security
          <select
            className="mt-1 min-h-11 w-full rounded-md border bg-background px-2"
            value={wifi}
            onChange={(e) => setWifi(e.target.value)}
          >
            <option>Open</option>
            <option>WEP</option>
            <option>WPA</option>
            <option>WPA2</option>
            <option>WPA3</option>
            <option>WPA2/WPA3</option>
          </select>
        </label>
      ) : null}
      {tab === "DNS" ? (
        <label className="block">
          DHCP DNS option (clients inherit this)
          <input
            className="mt-1 min-h-11 w-full rounded-md border px-2"
            placeholder="1.1.1.1"
            value={dns}
            onChange={(e) => setDns(e.target.value)}
          />
        </label>
      ) : null}
      {tab === "Guest" ? (
        <div className="space-y-2">
          <label className="flex min-h-11 items-center gap-2">
            <input type="checkbox" checked={guest} onChange={(e) => setGuest(e.target.checked)} />
            Guest SSID
          </label>
          <label className="flex min-h-11 items-center gap-2">
            <input
              type="checkbox"
              checked={guestIso}
              onChange={(e) => setGuestIso(e.target.checked)}
            />
            Client isolation
          </label>
        </div>
      ) : null}
      {tab === "Firewall" ? (
        <label className="flex min-h-11 items-center gap-2">
          <input type="checkbox" checked={upnp} onChange={(e) => setUpnp(e.target.checked)} />
          UPnP enabled (disable unless a documented exception exists)
        </label>
      ) : null}
      <Button size="sm" className="min-h-11" onClick={apply}>
        Apply and verify
      </Button>
      {msg ? <p className="text-muted-foreground">{msg}</p> : null}
    </div>
  );
}
