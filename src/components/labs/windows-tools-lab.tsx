"use client";

import { useEffect, useState, type ReactNode } from "react";
import type { LabSimProps } from "@/components/labs/lab-kit";
import { useSolved, LabStatus } from "@/components/labs/lab-kit";
import { Button } from "@/components/ui/button";

type Tool = "taskmgr" | "eventvwr" | "devmgmt" | "diskmgmt";
type MissionId = "cpu" | "boot" | "nic" | "disk";

const TOOLS: { id: Tool; title: string; exe: string }[] = [
  { id: "taskmgr", title: "Task Manager", exe: "taskmgr.exe" },
  { id: "eventvwr", title: "Event Viewer", exe: "eventvwr.msc" },
  { id: "devmgmt", title: "Device Manager", exe: "devmgmt.msc" },
  { id: "diskmgmt", title: "Disk Management", exe: "diskmgmt.msc" },
];

const MISSIONS: {
  id: MissionId;
  tool: Tool;
  title: string;
  ticket: string;
}[] = [
  {
    id: "cpu",
    tool: "taskmgr",
    title: "High CPU",
    ticket: "HELP-PC-14 is sluggish and the fans scream. User says it started after a 'helper' download.",
  },
  {
    id: "boot",
    tool: "eventvwr",
    title: "Boot / service failure",
    ticket: "At startup a box said a service failed to start, then the desktop appeared. Find the Error, not Information noise.",
  },
  {
    id: "nic",
    tool: "devmgmt",
    title: "Yellow-bang NIC",
    ticket: "No Ethernet. Device Manager is rumored to show a problem icon on the wired adapter.",
  },
  {
    id: "disk",
    tool: "diskmgmt",
    title: "Disk 1 offline",
    ticket: "A second disk was added for data. It does not show a drive letter. Do not format Disk 0 C:.",
  },
];

const WRONG_TOOL: Record<MissionId, Record<Tool, string>> = {
  cpu: {
    taskmgr: "",
    eventvwr:
      "Event Viewer is a historical log. It will not show live CPU. High CPU belongs in Task Manager → Processes.",
    devmgmt:
      "Device Manager lists hardware, not process CPU. The 98% usage is an executable — open Task Manager.",
    diskmgmt:
      "Disk letters and online/offline state do not explain a screaming fan. Check Task Manager Processes for a runaway task.",
  },
  boot: {
    taskmgr:
      "A boot/service failure is recorded as an Event Log Error, not a live process. Open Event Viewer → Windows Logs → System.",
    eventvwr: "",
    devmgmt:
      "A failed service at boot is an Event Viewer System Error. Device Manager is for hardware status, not SCM failures.",
    diskmgmt:
      "Unless a disk is offline, 'service failed at boot' is Event Viewer territory — System log, Error level.",
  },
  nic: {
    taskmgr:
      "A yellow-bang NIC is a device problem. Task Manager will not enable a disabled adapter or update its driver.",
    eventvwr:
      "You might see device errors in the log, but you enable or update the NIC in Device Manager.",
    devmgmt: "",
    diskmgmt:
      "Network adapters are not disks. The yellow bang is in Device Manager → Network adapters.",
  },
  disk: {
    taskmgr:
      "Capacity, online/offline, and drive letters live in Disk Management, not Task Manager.",
    eventvwr:
      "Logs may mention disk I/O, but bringing Disk 1 online or assigning a letter is Disk Management.",
    devmgmt:
      "Disk drives appear here, but offline / unallocated volumes are managed in Disk Management.",
    diskmgmt: "",
  },
};

const RIGHT_HINT: Record<MissionId, string> = {
  cpu: "Processes tab: find updater.exe at 98% CPU, select it, then End task.",
  boot: "Windows Logs → System. Select the Error about a service failing to start — skip Information noise.",
  nic: "Network adapters: the Realtek NIC has a yellow bang. Update driver or Enable device.",
  disk: "Disk 1 is Offline / unallocated. Bring it online or assign a letter. Never format Disk 0 C:.",
};

type ProcessRow = {
  name: string;
  pid: number;
  cpu: number;
  mem: string;
  runaway?: boolean;
};

const INITIAL_PROCESSES: ProcessRow[] = [
  { name: "System", pid: 4, cpu: 1, mem: "0.1 MB" },
  { name: "explorer.exe", pid: 1288, cpu: 2, mem: "84.2 MB" },
  { name: "MsMpEng.exe", pid: 2104, cpu: 1, mem: "126.0 MB" },
  { name: "updater.exe", pid: 4412, cpu: 98, mem: "41.7 MB", runaway: true },
  { name: "chrome.exe", pid: 3900, cpu: 6, mem: "312.4 MB" },
  { name: "RuntimeBroker.exe", pid: 1880, cpu: 0, mem: "18.9 MB" },
  { name: "dwm.exe", pid: 980, cpu: 1, mem: "44.0 MB" },
];

type EventLevel = "Information" | "Warning" | "Error";
type LogName = "system" | "application" | "security";

type LogEvent = {
  id: string;
  level: EventLevel;
  time: string;
  source: string;
  eventId: number;
  message: string;
  serviceFailure?: boolean;
};

const SYSTEM_EVENTS: LogEvent[] = [
  {
    id: "s1",
    level: "Information",
    time: "07:01:04",
    source: "Service Control Manager",
    eventId: 7036,
    message: "The Windows Update service entered the running state.",
  },
  {
    id: "s2",
    level: "Information",
    time: "07:01:18",
    source: "Kernel-General",
    eventId: 12,
    message: "The operating system started at system time 2026-09-01T07:01:00.000000000Z.",
  },
  {
    id: "s3",
    level: "Warning",
    time: "07:02:11",
    source: "Disk",
    eventId: 51,
    message: "An error was detected on device \\Device\\Harddisk0 during a paging operation.",
  },
  {
    id: "s4",
    level: "Error",
    time: "07:03:02",
    source: "Service Control Manager",
    eventId: 7000,
    serviceFailure: true,
    message:
      "The Netlogon service failed to start due to the following error: The service did not respond to the start or control request in a timely fashion.",
  },
  {
    id: "s5",
    level: "Information",
    time: "07:04:40",
    source: "Winlogon",
    eventId: 7001,
    message: "User HELP-PC-14\\jlee logged on.",
  },
  {
    id: "s6",
    level: "Information",
    time: "07:05:01",
    source: "Service Control Manager",
    eventId: 7036,
    message: "The Print Spooler service entered the running state.",
  },
];

const APPLICATION_EVENTS: LogEvent[] = [
  {
    id: "a1",
    level: "Information",
    time: "07:06:12",
    source: "Chrome",
    eventId: 1000,
    message: "Chrome update installer completed successfully.",
  },
  {
    id: "a2",
    level: "Warning",
    time: "07:08:44",
    source: "Outlook",
    eventId: 26,
    message: "A add-in was slow to load (ContosoSearch, 3.2 s).",
  },
  {
    id: "a3",
    level: "Error",
    time: "07:10:03",
    source: "Application Hang",
    eventId: 1002,
    message: "The program notepad.exe failed to close in a timely manner.",
  },
];

const SECURITY_EVENTS: LogEvent[] = [
  {
    id: "c1",
    level: "Information",
    time: "07:04:40",
    source: "Microsoft Windows security",
    eventId: 4624,
    message: "An account was successfully logged on: HELP-PC-14\\jlee.",
  },
  {
    id: "c2",
    level: "Information",
    time: "07:04:41",
    source: "Microsoft Windows security",
    eventId: 4672,
    message: "Special privileges assigned to new logon.",
  },
];

type DevNode = {
  id: string;
  name: string;
  category: string;
  status: "ok" | "bang" | "disabled";
  nic?: boolean;
};

const INITIAL_DEVICES: DevNode[] = [
  { id: "disp", name: "NVIDIA GeForce RTX 4060", category: "Display adapters", status: "ok" },
  { id: "kbd", name: "Standard PS/2 Keyboard", category: "Keyboards", status: "ok" },
  {
    id: "nic",
    name: "Realtek PCIe GbE Family Controller",
    category: "Network adapters",
    status: "bang",
    nic: true,
  },
  { id: "wifi", name: "Intel Wi-Fi 6 AX200", category: "Network adapters", status: "ok" },
  { id: "disk", name: "Samsung SSD 980 500GB", category: "Disk drives", status: "ok" },
  { id: "hid", name: "HID-compliant mouse", category: "Mice and other pointing devices", status: "ok" },
];

function BangIcon() {
  return (
    <svg viewBox="0 0 16 16" width="14" height="14" aria-label="Warning" className="inline-block shrink-0">
      <path fill="#e6b800" stroke="#7a5b00" strokeWidth="0.8" d="M8 1.4 15 14.2H1L8 1.4z" />
      <path fill="#1a1a1a" d="M7.4 6.1h1.2v4.2H7.4zm0 5h1.2v1.2H7.4z" />
    </svg>
  );
}

function WinWindow({
  title,
  onClose,
  children,
}: {
  title: string;
  onClose: () => void;
  children: ReactNode;
}) {
  return (
    <div className="flex min-h-[22rem] flex-col overflow-hidden rounded-md border border-zinc-400 bg-white text-zinc-900 shadow-lg dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-100">
      <div className="flex items-center justify-between bg-[#005a9e] px-2 py-1 text-white">
        <span className="text-xs font-medium">{title}</span>
        <button
          type="button"
          className="grid size-5 place-items-center rounded-sm text-xs hover:bg-red-600"
          onClick={onClose}
          aria-label={`Close ${title}`}
        >
          ×
        </button>
      </div>
      {children}
    </div>
  );
}

export function WindowsToolsLab({ lab, onSolved }: LabSimProps) {
  const { solved, markSolved } = useSolved(onSolved);
  const [tool, setTool] = useState<Tool | null>(null);
  const [done, setDone] = useState<Record<MissionId, boolean>>({
    cpu: false,
    boot: false,
    nic: false,
    disk: false,
  });
  const [focus, setFocus] = useState<MissionId>("cpu");
  const [coach, setCoach] = useState(
    "Four tickets, four MMC/admin tools. Open the tool that actually owns the symptom.",
  );

  const [tmTab, setTmTab] = useState<"processes" | "performance" | "startup">("processes");
  const [processes, setProcesses] = useState(INITIAL_PROCESSES);
  const [procSel, setProcSel] = useState<number | null>(null);

  const [logName, setLogName] = useState<LogName>("application");
  const [eventSel, setEventSel] = useState<string | null>(null);

  const [devices, setDevices] = useState(INITIAL_DEVICES);
  const [devSel, setDevSel] = useState<string | null>(null);

  const [disk1Online, setDisk1Online] = useState(false);
  const [disk1Letter, setDisk1Letter] = useState<string | null>(null);
  const [diskSel, setDiskSel] = useState<"d0" | "d1" | "c" | null>(null);

  const allDone = done.cpu && done.boot && done.nic && done.disk;

  useEffect(() => {
    if (allDone) markSolved();
  }, [allDone, markSolved]);

  function complete(id: MissionId, message: string) {
    setDone((prev) => ({ ...prev, [id]: true }));
    setCoach(message);
    const next = MISSIONS.find((m) => m.id !== id && !done[m.id]);
    if (next) setFocus(next.id);
  }

  function openTool(next: Tool) {
    setTool(next);
    const focused = MISSIONS.find((m) => m.id === focus);
    if (focused && !done[focused.id] && focused.tool !== next) {
      setCoach(WRONG_TOOL[focused.id][next]);
      return;
    }
    const pending = MISSIONS.find((m) => m.tool === next && !done[m.id]);
    if (pending) {
      setFocus(pending.id);
      setCoach(RIGHT_HINT[pending.id]);
      return;
    }
    setCoach("This console is healthy for the remaining tickets. Switch tools or pick another ticket.");
  }

  function endTask() {
    const row = processes.find((p) => p.pid === procSel);
    if (!row) {
      setCoach("Select a process, then End task.");
      return;
    }
    if (row.runaway) {
      setProcesses((list) =>
        list.map((p) => (p.runaway ? { ...p, cpu: 0, name: p.name, runaway: false } : p)),
      );
      complete("cpu", "updater.exe ended. CPU dropped. High-CPU ticket is clear.");
      return;
    }
    if (row.name === "explorer.exe") {
      setCoach("Do not kill the shell. The runaway is updater.exe at 98% CPU.");
      return;
    }
    setCoach(
      `${row.name} is not the problem. Live CPU belongs to updater.exe — End task on that process, not a random image.`,
    );
  }

  function pickEvent(ev: LogEvent) {
    setEventSel(ev.id);
    if (logName !== "system") {
      setCoach(
        logName === "application"
          ? "Application log is app chatter. Boot and service failures are Windows Logs → System."
          : "Security log is audits. The boot breadcrumb is a System Error from Service Control Manager.",
      );
      return;
    }
    if (ev.serviceFailure) {
      complete(
        "boot",
        "Netlogon failed to start (Event 7000). That Error is the boot breadcrumb — Information rows were noise.",
      );
      return;
    }
    if (ev.level === "Information") {
      setCoach("That is Information-level noise. Look for an Error about a service failing to start.");
      return;
    }
    if (ev.level === "Warning") {
      setCoach(
        "Disk warning 51 is not the boot service failure. Select the Error from Service Control Manager.",
      );
      return;
    }
    setCoach("Wrong Error. The boot ticket is a service that failed to start — Event 7000, Netlogon.");
  }

  function actOnDevice(action: "enable" | "update" | "disable" | "uninstall") {
    const node = devices.find((d) => d.id === devSel);
    if (!node) {
      setCoach("Select a device first.");
      return;
    }
    if (node.nic && node.status !== "ok") {
      if (action === "enable" || action === "update") {
        setDevices((list) =>
          list.map((d) => (d.nic ? { ...d, status: "ok" as const } : d)),
        );
        complete(
          "nic",
          action === "enable"
            ? "Realtek NIC enabled. Yellow bang cleared."
            : "Driver update applied to the Realtek NIC. Yellow bang cleared.",
        );
        return;
      }
      if (action === "disable") {
        setCoach("It is already disabled (Code 22). Enable it or update the driver.");
        return;
      }
      setCoach("Uninstalling is not the first move. Update the driver or Enable the device.");
      return;
    }
    if (action === "uninstall") {
      setCoach("Do not uninstall a healthy device on a hunch. The yellow bang is the Realtek NIC.");
      return;
    }
    setCoach(
      `${node.name} is already fine. The problem icon is on Realtek PCIe GbE Family Controller.`,
    );
  }

  function actOnDisk(action: "online" | "letter" | "format") {
    if (diskSel === null) {
      setCoach("Select Disk 0, C:, or Disk 1 first.");
      return;
    }
    if ((diskSel === "d0" || diskSel === "c") && action === "format") {
      setCoach(
        "Never format Disk 0 C: as a first move. That is the OS volume and it is healthy. Disk 1 is the offline/unallocated disk.",
      );
      return;
    }
    if (diskSel === "d0" || diskSel === "c") {
      setCoach("Disk 0 C: is online, NTFS, Healthy (Boot). Leave it. Select Disk 1.");
      return;
    }
    if (action === "format") {
      setCoach(
        "Formatting is not required for this ticket and is dangerous if you aimed at C:. Bring Disk 1 online or assign a letter.",
      );
      return;
    }
    if (action === "online") {
      if (disk1Online) {
        setCoach("Disk 1 is already online. Assign a letter if it still has no volume letter.");
        return;
      }
      setDisk1Online(true);
      complete("disk", "Disk 1 is online. Ticket clear — you can assign a letter later for convenience.");
      return;
    }
    if (!disk1Letter) {
      setDisk1Online(true);
      setDisk1Letter("E:");
      complete("disk", "Assigned E: to the data disk. Disk 1 is online with a letter.");
    }
  }

  const events =
    logName === "system" ? SYSTEM_EVENTS : logName === "application" ? APPLICATION_EVENTS : SECURITY_EVENTS;
  const cpuNow = processes.reduce((s, p) => s + p.cpu, 0);
  const categories = [...new Set(devices.map((d) => d.category))];

  return (
    <div className="space-y-3 text-sm">
      <LabStatus
        solved={solved}
        mission={`Clear all four ${lab.title} tickets using the matching Windows tool — not the nearest MMC.`}
      />
      <p className="text-xs text-muted-foreground">{lab.description}</p>

      <ul className="grid gap-2 sm:grid-cols-2">
        {MISSIONS.map((m) => (
          <li key={m.id}>
            <button
              type="button"
              onClick={() => {
                setFocus(m.id);
                setCoach(done[m.id] ? "Already cleared." : `Ticket focused. Use ${TOOLS.find((t) => t.id === m.tool)?.title}.`);
              }}
              className={`w-full rounded-md border p-2 text-left ${
                done[m.id]
                  ? "border-emerald-600/40 bg-emerald-50 dark:bg-emerald-950/30"
                  : focus === m.id
                    ? "border-sky-600 ring-1 ring-sky-600"
                    : ""
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <span className="font-medium">{m.title}</span>
                <span className="text-[11px] text-muted-foreground">{done[m.id] ? "cleared" : "open"}</span>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">{m.ticket}</p>
            </button>
          </li>
        ))}
      </ul>

      <div className="overflow-hidden rounded-lg border bg-[#1a4a7a]">
        <div className="relative min-h-[28rem] bg-gradient-to-br from-[#3a7ebd] via-[#1d5fa0] to-[#0b3a66] p-3">
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {TOOLS.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => openTool(t.id)}
                className="flex flex-col items-center gap-1 rounded-md p-2 text-white hover:bg-white/10"
              >
                <span className="grid size-10 place-items-center rounded bg-white/90 text-[10px] font-bold text-[#005a9e]">
                  {t.id === "taskmgr" ? "TM" : t.id === "eventvwr" ? "EV" : t.id === "devmgmt" ? "DM" : "DK"}
                </span>
                <span className="text-center text-[11px] leading-tight">{t.title}</span>
              </button>
            ))}
          </div>

          {tool ? (
            <div className="mt-3">
              {tool === "taskmgr" ? (
                <WinWindow title="Task Manager" onClose={() => setTool(null)}>
                  <div className="flex gap-1 border-b bg-zinc-100 px-2 py-1 text-xs dark:bg-zinc-800">
                    {(["processes", "performance", "startup"] as const).map((tab) => (
                      <button
                        key={tab}
                        type="button"
                        className={`rounded px-2 py-0.5 capitalize ${tmTab === tab ? "bg-white dark:bg-zinc-700" : ""}`}
                        onClick={() => setTmTab(tab)}
                      >
                        {tab}
                      </button>
                    ))}
                  </div>
                  {tmTab === "processes" ? (
                    <div className="flex flex-1 flex-col">
                      <table className="w-full text-left text-xs">
                        <thead className="bg-zinc-50 dark:bg-zinc-800">
                          <tr>
                            <th className="px-2 py-1 font-medium">Name</th>
                            <th className="px-2 py-1 font-medium">PID</th>
                            <th className="px-2 py-1 font-medium">CPU</th>
                            <th className="px-2 py-1 font-medium">Memory</th>
                          </tr>
                        </thead>
                        <tbody>
                          {processes.map((p) => (
                            <tr
                              key={p.pid}
                              onClick={() => setProcSel(p.pid)}
                              className={`cursor-pointer ${
                                procSel === p.pid ? "bg-sky-100 dark:bg-sky-900/40" : ""
                              } ${p.cpu >= 90 ? "text-red-700 dark:text-red-400" : ""}`}
                            >
                              <td className="px-2 py-1 font-mono">{p.name}</td>
                              <td className="px-2 py-1 font-mono">{p.pid}</td>
                              <td className="px-2 py-1 font-mono">{p.cpu}%</td>
                              <td className="px-2 py-1 font-mono">{p.mem}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      <div className="mt-auto flex items-center justify-between border-t px-2 py-2">
                        <span className="text-xs text-muted-foreground">CPU {Math.min(cpuNow, 100)}%</span>
                        <Button size="sm" onClick={endTask}>
                          End task
                        </Button>
                      </div>
                    </div>
                  ) : tmTab === "performance" ? (
                    <div className="space-y-2 p-3 text-xs">
                      <p>CPU {Math.min(cpuNow, 100)}% · {cpuNow >= 90 ? "High (runaway process)" : "Normal"}</p>
                      <div className="h-16 overflow-hidden rounded bg-zinc-100 dark:bg-zinc-800">
                        <div
                          className="h-full bg-sky-600"
                          style={{ width: `${Math.min(cpuNow, 100)}%` }}
                          aria-label={`CPU ${Math.min(cpuNow, 100)} percent`}
                        />
                      </div>
                      <p className="text-muted-foreground">
                        Performance graphs do not kill processes. Switch to Processes and End task.
                      </p>
                    </div>
                  ) : (
                    <p className="p-3 text-xs text-muted-foreground">
                      Startup apps are not the live 98% CPU. Use Processes.
                    </p>
                  )}
                </WinWindow>
              ) : null}

              {tool === "eventvwr" ? (
                <WinWindow title="Event Viewer" onClose={() => setTool(null)}>
                  <div className="grid min-h-[18rem] sm:grid-cols-[11rem_1fr]">
                    <nav className="border-b bg-zinc-50 p-2 text-xs sm:border-r sm:border-b-0 dark:bg-zinc-800">
                      <p className="mb-1 font-medium">Windows Logs</p>
                      {(["application", "security", "system"] as const).map((n) => (
                        <button
                          key={n}
                          type="button"
                          className={`block w-full rounded px-2 py-1 text-left capitalize ${
                            logName === n ? "bg-sky-100 dark:bg-sky-900/40" : ""
                          }`}
                          onClick={() => {
                            setLogName(n);
                            setEventSel(null);
                            if (n !== "system" && !done.boot) {
                              setCoach(
                                n === "application"
                                  ? "Application is the wrong log for a boot service failure. Open System."
                                  : "Security audits will not name the service that failed at boot. Open System.",
                              );
                            }
                          }}
                        >
                          {n}
                        </button>
                      ))}
                    </nav>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs">
                        <thead className="bg-zinc-50 dark:bg-zinc-800">
                          <tr>
                            <th className="px-2 py-1">Level</th>
                            <th className="px-2 py-1">Time</th>
                            <th className="px-2 py-1">Source</th>
                            <th className="px-2 py-1">ID</th>
                          </tr>
                        </thead>
                        <tbody>
                          {events.map((ev) => (
                            <tr
                              key={ev.id}
                              onClick={() => pickEvent(ev)}
                              className={`cursor-pointer ${eventSel === ev.id ? "bg-sky-100 dark:bg-sky-900/40" : ""}`}
                            >
                              <td className="px-2 py-1">
                                {ev.level === "Error" ? (
                                  <span className="font-medium text-red-700 dark:text-red-400">Error</span>
                                ) : (
                                  ev.level
                                )}
                              </td>
                              <td className="px-2 py-1 font-mono">{ev.time}</td>
                              <td className="px-2 py-1">{ev.source}</td>
                              <td className="px-2 py-1 font-mono">{ev.eventId}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      {eventSel ? (
                        <p className="border-t p-2 text-xs">
                          {events.find((e) => e.id === eventSel)?.message}
                        </p>
                      ) : (
                        <p className="border-t p-2 text-xs text-muted-foreground">Select an event to read it.</p>
                      )}
                    </div>
                  </div>
                </WinWindow>
              ) : null}

              {tool === "devmgmt" ? (
                <WinWindow title="Device Manager" onClose={() => setTool(null)}>
                  <div className="flex flex-wrap gap-1 border-b p-2">
                    <Button size="sm" variant="outline" onClick={() => actOnDevice("enable")}>
                      Enable device
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => actOnDevice("update")}>
                      Update driver
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => actOnDevice("disable")}>
                      Disable device
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => actOnDevice("uninstall")}>
                      Uninstall device
                    </Button>
                  </div>
                  <ul className="p-2 text-xs">
                    {categories.map((cat) => (
                      <li key={cat} className="mb-2">
                        <p className="font-medium">{cat}</p>
                        <ul className="ml-3">
                          {devices
                            .filter((d) => d.category === cat)
                            .map((d) => (
                              <li key={d.id}>
                                <button
                                  type="button"
                                  className={`flex w-full items-center gap-2 rounded px-2 py-1 text-left ${
                                    devSel === d.id ? "bg-sky-100 dark:bg-sky-900/40" : ""
                                  }`}
                                  onClick={() => setDevSel(d.id)}
                                >
                                  {d.status === "bang" ? <BangIcon /> : <span className="w-3.5 text-center">•</span>}
                                  <span>
                                    {d.name}
                                    {d.status === "bang" ? " (Code 22 — disabled)" : ""}
                                  </span>
                                </button>
                              </li>
                            ))}
                        </ul>
                      </li>
                    ))}
                  </ul>
                </WinWindow>
              ) : null}

              {tool === "diskmgmt" ? (
                <WinWindow title="Disk Management" onClose={() => setTool(null)}>
                  <div className="flex flex-wrap gap-1 border-b p-2">
                    <Button size="sm" variant="outline" onClick={() => actOnDisk("online")}>
                      Bring online
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => actOnDisk("letter")}>
                      Assign letter
                    </Button>
                    <Button size="sm" variant="destructive" onClick={() => actOnDisk("format")}>
                      Format
                    </Button>
                  </div>
                  <div className="space-y-3 p-3 text-xs">
                    <button
                      type="button"
                      onClick={() => setDiskSel("d0")}
                      className={`block w-full rounded border p-2 text-left ${
                        diskSel === "d0" ? "ring-1 ring-sky-600" : ""
                      }`}
                    >
                      <div className="mb-1 font-medium">Disk 0 · Online · 238 GB</div>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setDiskSel("c");
                        }}
                        className={`h-10 w-full rounded-sm bg-sky-700 px-2 text-left text-white ${
                          diskSel === "c" ? "ring-2 ring-amber-400" : ""
                        }`}
                      >
                        C: NTFS 237 GB Healthy (Boot, Page File, Crash Dump)
                      </button>
                    </button>
                    <button
                      type="button"
                      onClick={() => setDiskSel("d1")}
                      className={`block w-full rounded border p-2 text-left ${
                        diskSel === "d1" ? "ring-1 ring-sky-600" : ""
                      }`}
                    >
                      <div className="mb-1 font-medium">
                        Disk 1 · {disk1Online ? "Online" : "Offline"} · 500 GB
                      </div>
                      <div
                        className={`h-10 rounded-sm px-2 leading-10 ${
                          disk1Online ? "bg-zinc-500 text-white" : "bg-zinc-300 text-zinc-800 dark:bg-zinc-700 dark:text-zinc-100"
                        }`}
                      >
                        {disk1Letter
                          ? `${disk1Letter} NTFS 500 GB Healthy`
                          : disk1Online
                            ? "500 GB Unallocated"
                            : "500 GB Unallocated (Offline)"}
                      </div>
                    </button>
                  </div>
                </WinWindow>
              ) : null}
            </div>
          ) : (
            <p className="mt-10 text-center text-sm text-white/90">
              Desktop — HELP-PC-14. Open a tool from the icons or the taskbar.
            </p>
          )}
        </div>
        <div className="flex h-10 items-center gap-1 bg-zinc-900/90 px-2">
          <span className="rounded bg-white/10 px-2 py-1 text-[11px] text-white">Start</span>
          {TOOLS.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => openTool(t.id)}
              className={`rounded px-2 py-1 text-[11px] text-white ${
                tool === t.id ? "bg-white/20" : "hover:bg-white/10"
              }`}
            >
              {t.title}
            </button>
          ))}
          <span className="ml-auto font-mono text-[11px] text-white/80">7:14 AM</span>
        </div>
      </div>

      <p className={allDone ? "text-sm text-emerald-700 dark:text-emerald-400" : "text-sm text-muted-foreground"}>
        {coach}
      </p>
    </div>
  );
}
