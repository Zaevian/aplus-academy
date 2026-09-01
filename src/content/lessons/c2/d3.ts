import type { Lesson } from "../../schema";

export const C2_D3_LESSONS: Lesson[] = [
  {
    id: "C2-D3-O1-L1",
    objectiveId: "C2-D3-O1",
    slug: "windows-crash-boot",
    title: "Blue screens, boot failures, and a missing OS",
    description:
      "Read a stop code, choose Safe Mode versus WinRE, and separate a dead disk from a broken Boot Configuration Data store.",
    estimatedMinutes: 24,
    conceptIds: ["C2-D3-O1-BSOD"],
    prerequisites: [],
    lastVerified: "2026-09-01",
    sources: ["c2-obj-3.0", "ms-windows"],
    blocks: [
      {
        type: "callout",
        id: "C2-D3-O1-L1-why",
        callout: {
          kind: "why",
          title: "Why this matters",
          body: "A Windows crash is not a personality. It is a stop code, a dump file, and a recent change. If you reimage before you read those three things, you destroy the only evidence that would have made the next crash predictable.",
        },
      },
      {
        type: "reading",
        id: "C2-D3-O1-L1-r1",
        title: "Stop codes, dumps, and the first honest question",
        markdown: `A **Blue Screen of Death (BSOD)** is Windows telling you that a kernel-mode component did something the kernel will not forgive. User-mode applications can crash without taking the whole machine; a bad storage driver, a failing DIMM that corrupts a page table, or a filter driver from last week's "optimization" tool can halt the system.

Write down the **stop code** (for example \`IRQL_NOT_LESS_OR_EQUAL\`, \`MEMORY_MANAGEMENT\`, \`INACCESSIBLE_BOOT_DEVICE\`, \`CRITICAL_PROCESS_DIED\`) and any named driver on the screen. Photograph it if the machine reboots too fast. Then ask the only first question that matters: **what changed?** A Windows Update, a GPU driver, a docking-station firmware, a new USB enclosure, or a RAM upgrade is a better lead than "Windows is unstable."

After reboot, open **Event Viewer** (\`eventvwr.msc\`) and **Reliability Monitor** (\`perfmon /rel\`). Look for Kernel-Power 41 (unexpected shutdown), BugCheck entries, and Application Error clusters that started the same afternoon as the new driver. Mini-dumps live under \`C:\\Windows\\Minidump\`; a full dump is \`MEMORY.DMP\`. You are not expected to be a WinDbg expert on A+, but you are expected to know those files exist and that they are more useful than a guess.

**Safe Mode** loads a minimal driver set. If the crash disappears in Safe Mode, a third-party driver or startup service is the suspect — Device Manager, a clean-boot via \`msconfig\` or Task Manager Startup, and a driver roll-back are the next tools, not a full wipe. If it still crashes in Safe Mode, think memory, storage, or the OS image itself.

**Frequent shutdowns** are not always BSODs. A thermal shutdown may leave Event Viewer Kernel-Power events without a bugcheck. A crashing critical service can look like a reboot loop. Distinguish a planned restart (Windows Update) from an unexpected power loss. The exam loves the technician who opens Event Viewer before ordering a power supply.`,
      },
      {
        type: "diagram",
        id: "C2-D3-O1-L1-d1",
        component: "TsMethodDiagram",
        title: "Windows crash and boot path",
        caption: "Firmware → Windows Boot Manager → winload → kernel. A break at each layer looks different.",
        notice:
          "Notice that 'No OS found' is a firmware or BCD problem until a disk actually disappears in the firmware setup utility. A BSOD is a loaded kernel problem. Do not treat them as the same ticket.",
        alt: "Flow from firmware boot order through Boot Configuration Data to the running kernel, with BSOD and WinRE branches.",
      },
      {
        type: "knowledge-check",
        id: "C2-D3-O1-L1-kc1",
        questionIds: ["C2-D3-O1-BSOD-Q001"],
      },
      {
        type: "reading",
        id: "C2-D3-O1-L1-r2",
        title: "WinRE, BCD, and 'No operating system found'",
        markdown: `When Windows cannot start, you are in the **Windows Recovery Environment (WinRE)**: Startup Repair, System Restore, Uninstall Updates, Command Prompt, UEFI Firmware Settings, and Startup Settings (Safe Mode). Automatic Repair looping is a symptom, not a solution — drop to Command Prompt.

**No OS found** (or a firmware splash that never hands off) is a boot-path problem:

1. Confirm the disk still exists in the firmware setup utility. A dead NVMe, a loose SATA cable, or a RAID volume that dropped a member will never boot, and \`bootrec\` will not grow a new disk.
2. Confirm **boot order** and **UEFI versus legacy**. A GPT disk with Windows expects UEFI. A technician who "fixed" a machine by enabling CSM after a motherboard swap has created a new outage.
3. Repair the **Boot Configuration Data (BCD)** store only after the disk is visible: \`bootrec /fixmbr\`, \`bootrec /fixboot\`, \`bootrec /rebuildbcd\` (and \`bcdboot\` when rebuild is not enough). These commands repair how firmware finds Windows; they are not disk formatters.
4. **BitLocker** recovery may be required after firmware or boot-file changes. That is expected, not optional.

Startup Repair, System Restore, and uninstalling a quality update are legitimate **repair Windows** steps. **Reimage** is last among software options when the image is not trustworthy — after you have captured user data if the volume still mounts. The common mistake is formatting the OS volume because the BCD is corrupt. The data was probably fine.`,
      },
      {
        type: "table",
        id: "C2-D3-O1-L1-t1",
        title: "Symptom to first tool",
        headers: ["Symptom", "First evidence", "Typical next action"],
        rows: [
          ["BSOD with a named driver", "Stop code + Reliability Monitor", "Roll back or uninstall that driver; test Safe Mode"],
          ["BSOD MEMORY_MANAGEMENT / PAGE_FAULT", "Dump + recent RAM/pagefile change", "Memory diagnostic; reseat/replace RAM after software checks"],
          ["Automatic Repair loop", "WinRE Command Prompt", "chkdsk, sfc /scannow, DISM, then BCD repair"],
          ["No OS found, disk missing in firmware", "Firmware storage list", "Cables, NVMe seating, RAID BIOS — not bootrec yet"],
          ["No OS found, disk present", "bcdedit / bootrec output", "Rebuild BCD; confirm UEFI/GPT pairing"],
          ["Unexpected reboot, no blue screen", "Event Viewer Kernel-Power 41", "Thermal, PSU, or a crashing service — do not assume malware"],
        ],
        caption: "Gather the stop code or firmware view before you spend the disk.",
      },
      {
        type: "callout",
        id: "C2-D3-O1-L1-exam",
        callout: {
          kind: "exam",
          title: "Exam lens",
          body: "FIRST after a BSOD is usually record the stop code and recent changes, or boot Safe Mode if you need a working desktop. Reimage is a later BEST when repair is exhausted, not a FIRST.",
        },
      },
      {
        type: "callout",
        id: "C2-D3-O1-L1-mistake",
        callout: {
          kind: "mistake",
          title: "Common mistake",
          body: "Running Startup Repair ten times and then imaging, without ever opening Event Viewer or checking whether the NVMe still enumerates in firmware, is how you spend a day and still miss a loose screw in an M.2 slot.",
        },
      },
      {
        type: "knowledge-check",
        id: "C2-D3-O1-L1-kc2",
        questionIds: ["C2-D3-O1-BSOD-Q002"],
      },
      {
        type: "summary",
        id: "C2-D3-O1-L1-sum",
        bullets: [
          "A BSOD is a stop code plus a dump plus a recent change — photograph the screen.",
          "Safe Mode isolates third-party drivers; a crash that survives Safe Mode points at hardware or the core image.",
          "No OS found: prove the disk exists in firmware, then repair BCD; do not format first.",
          "WinRE (Startup Repair, restore, uninstall updates, Command Prompt) is the boot toolkit.",
        ],
      },
    ],
  },
  {
    id: "C2-D3-O1-L2",
    objectiveId: "C2-D3-O1",
    slug: "windows-performance-resources",
    title: "Performance, services, memory, and USB resources",
    description:
      "Use Task Manager, Event Viewer, and Device Manager to separate a runaway process from a starved USB controller.",
    estimatedMinutes: 22,
    conceptIds: ["C2-D3-O1-USBRES", "C2-D3-O1-BSOD"],
    prerequisites: ["C2-D3-O1-L1"],
    lastVerified: "2026-09-01",
    sources: ["c2-obj-3.0", "ms-windows", "usb-if"],
    blocks: [
      {
        type: "callout",
        id: "C2-D3-O1-L2-why",
        callout: {
          kind: "why",
          title: "Why this matters",
          body: "Degraded performance is not one problem. It is CPU, disk, memory, GPU, a hung service, or a USB controller that has run out of endpoints. The tool that names the bottleneck is Task Manager, not a registry cleaner.",
        },
      },
      {
        type: "reading",
        id: "C2-D3-O1-L2-r1",
        title: "Degraded performance is a resource conversation",
        markdown: `Open **Task Manager** (Ctrl+Shift+Esc) to the **Processes** and **Performance** tabs before you believe a user's theory. **CPU** pegged by one process is an application or malware problem. **Disk** at 100% with a failing HDD or a flood of paging is storage or RAM. **Memory** in the red with a growing working set is a leak or a machine that never had enough RAM for the workload. **GPU** at the limit is a driver or a browser with hardware acceleration gone wrong.

**Low memory warnings** mean Windows is out of commit charge — physical RAM plus page file. FIRST: identify the process in Task Manager, then close it, add RAM, or resize the page file only as a documented workaround. Do not disable the page file "for performance"; that is a forum myth that turns a slow PC into a crashing one.

**Applications crashing** belong in Event Viewer Application log (Application Error, .NET Runtime, Windows Error Reporting) and Reliability Monitor. Repair or reinstall the app, check compatibility mode for old line-of-business software, verify Visual C++ / .NET runtimes, and only then blame Windows. If several unrelated apps crash after an update, run **System File Checker** (\`sfc /scannow\`) and **DISM** restorehealth, and consider uninstalling the quality update.

**Services not starting** are \`services.msc\` plus the System log. Read the service's **Log On** account, **Dependencies**, and whether someone set Startup type to Disabled. A dependent service (for example a SQL instance waiting on a stopped RPC or network service) will fail until the parent starts. Restarting the service is a legitimate A+ step; so is setting it back to Automatic after a technician "disabled extras for speed."

**System instability** is the cluster: random app crashes, brief freezes, then a BSOD. Reliability Monitor draws that timeline. Treat the timeline as evidence, not as a vibe.`,
      },
      {
        type: "diagram",
        id: "C2-D3-O1-L2-d1",
        component: "TsMethodDiagram",
        title: "Resource isolation order",
        caption: "Task Manager names the bottleneck; Event Viewer names the failure; Device Manager names the device.",
        notice:
          "Notice USB controller resource warnings are Device Manager / USB topology problems, not 'the PC is slow so reinstall Chrome.'",
        alt: "Troubleshooting flow from Task Manager Performance tab to Event Viewer to Device Manager for USB endpoints.",
      },
      {
        type: "knowledge-check",
        id: "C2-D3-O1-L2-kc1",
        questionIds: ["C2-D3-O1-USBRES-Q001"],
      },
      {
        type: "reading",
        id: "C2-D3-O1-L2-r2",
        title: "USB controller resource warnings",
        markdown: `Windows can toast **USB controller resource** warnings when a USB host controller runs out of **endpoints** or bandwidth. This is common on compact desktops and docks that hang many USB 3 devices, webcams, DACs, and hubs off one root hub. The device may disappear, fail to start in Device Manager, or throw a message that there are not enough USB controller resources.

This is **not** a power-supply wattage story and it is **not** solved by Disk Cleanup. Practical steps:

- Move the device to a **different root hub** (front vs rear, or a port wired to another controller).
- Remove unused USB devices and daisy-chained hubs.
- Update **chipset / USB** drivers from the PC or motherboard vendor, not a random packager.
- In Device Manager, disable devices you do not need (internal card readers, unused Bluetooth dongles).
- Avoid cheap unpowered hubs that also brown-out devices; a resource warning can coexist with a power problem, but the warning itself is about controller endpoints.

If a specific USB device also BSODs the machine, treat it as a driver crash: uninstall the device, test without it, replace the cable, try another port. Uninstalling "USB controllers" and hoping Windows rebuilds them can work; it can also drop keyboards on a desktop with no PS/2 fallback. Have a plan.`,
      },
      {
        type: "lab",
        id: "C2-D3-O1-L2-lab",
        labId: "C2-D1-O4-WINTOOLS-LAB",
        title: "Windows tools on a sick desktop",
        prompt:
          "On the simulated desktop, find a pegged CPU process in Task Manager, a service start failure in Event Viewer, and a USB device that will not start in Device Manager. Name the tool before you name the fix.",
      },
      {
        type: "callout",
        id: "C2-D3-O1-L2-tech",
        callout: {
          kind: "technician",
          title: "Technician lens",
          body: "Add resources (RAM, page file, a less-loaded USB controller) only after you identify which resource is exhausted. 'Upgrade the PC' is not a diagnosis.",
        },
      },
      {
        type: "knowledge-check",
        id: "C2-D3-O1-L2-kc2",
        questionIds: ["C2-D3-O1-USBRES-Q002"],
      },
      {
        type: "summary",
        id: "C2-D3-O1-L2-sum",
        bullets: [
          "Task Manager Performance/Processes isolate CPU, disk, memory, and GPU.",
          "Low memory is commit charge; find the process before you touch the page file.",
          "Service failures are logon account, dependencies, and Disabled startup type.",
          "USB controller resource warnings mean endpoints/bandwidth on a hub — move the device or drop unused USB consumers.",
        ],
      },
    ],
  },
  {
    id: "C2-D3-O1-L3",
    objectiveId: "C2-D3-O1",
    slug: "windows-profile-time",
    title: "Slow profiles, time drift, and the Windows repair ladder",
    description:
      "Rebuild a profile without destroying data, explain Kerberos time skew, and put SFC, restore, and reimage in the right order.",
    estimatedMinutes: 22,
    conceptIds: ["C2-D3-O1-PROFILE", "C2-D3-O1-TIMEDRIFT"],
    prerequisites: ["C2-D3-O1-L2"],
    lastVerified: "2026-09-01",
    sources: ["c2-obj-3.0", "ms-windows"],
    blocks: [
      {
        type: "callout",
        id: "C2-D3-O1-L3-why",
        callout: {
          kind: "why",
          title: "Why this matters",
          body: "A five-minute logon is often a roaming profile or a bloated NTUSER.DAT, not a dying SSD. A five-minute clock error can look like a domain outage because Kerberos will not forgive it.",
        },
      },
      {
        type: "reading",
        id: "C2-D3-O1-L3-r1",
        title: "Slow profile load is a path and a size problem",
        markdown: `A **slow profile load** means Windows is applying the user profile, Group Policy, logon scripts, and mapped drives — not that Explorer is "being Windows." On a **domain** PC, a **roaming profile** copied over a WAN, **folder redirection** to a missing server, or a logon script mapping twelve dead DFS namespaces will stall at "Please wait for the Group Policy Client" or "Welcome" for minutes.

Locally, a huge Desktop, a corrupted \`NTUSER.DAT\`, or a profile that never finished unloading (Event Viewer User Profile Service, Application log) produces the same wait. **Rebuild the Windows profile** only after you copy the user's data. The A+ sequence is: log on as another local administrator, rename the old profile folder, rename the profile SID key under \`HKLM\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\ProfileList\`, have the user log on to create a fresh profile, then copy Documents, Desktop, and browser data back. Deleting the profile in System Properties > Advanced > User Profiles is the GUI version of the same idea. Never start by formatting C:.

**Time drift** has two personalities. If the clock **resets to 2012 every cold boot**, the **CMOS/RTC battery** (or a firmware clock on some boards) is dead — that is hardware, and software NTP will not survive a power-off. If the clock **slowly loses minutes while the PC stays on**, you have a **Windows Time** (\`W32Time\`) or NTP problem: workgroup PCs should talk to an Internet time server; domain members should use the domain hierarchy (\`w32tm /query /status\`, \`w32tm /resync\`). **Hyper-V / VMware time sync** fighting NTP is a classic VM ticket.

**Kerberos** tickets fail when skew exceeds about **five minutes**. Users report password failures, no network shares, and "the trust relationship" when the real issue is a clock. Dual-boot with Linux is a special case: Windows historically stores local time in the RTC; many Linux installs store UTC. The machine looks possessed after each reboot until you pick one convention.`,
      },
      {
        type: "table",
        id: "C2-D3-O1-L3-t1",
        title: "Windows OS repair ladder",
        headers: ["Step", "When it belongs", "What it is not"],
        rows: [
          ["Reboot / restart a service", "Hung process, stuck spooler, single service", "A substitute for reading Event Viewer"],
          ["Safe Mode / clean boot", "Driver or startup app suspected", "Proof the disk is healthy"],
          ["SFC and DISM", "Component store or protected files damaged", "Malware removal"],
          ["Uninstall / roll back update or driver", "Timeline matches a Patch Tuesday or GPU install", "A reason to disable Windows Update forever"],
          ["System Restore / repair install", "Image mostly good, recent change", "A backup of user documents"],
          ["Rebuild profile", "One user broken, others fine", "A domain account delete"],
          ["Reimage", "Image untrustworthy or repair exhausted", "FIRST action on a BSOD"],
        ],
        caption: "CompTIA lists reboot, services, repair, SFC, restore, profile rebuild, and reimage for a reason — they are ordered tools.",
      },
      {
        type: "knowledge-check",
        id: "C2-D3-O1-L3-kc1",
        questionIds: ["C2-D3-O1-PROFILE-Q001"],
      },
      {
        type: "reading",
        id: "C2-D3-O1-L3-r2",
        title: "Verify requirements, then add resources",
        markdown: `Two exam phrases sit next to the symptoms: **verify requirements** and **add resources**. Before you reinstall a CAD package that "crashes," confirm the vendor still supports this Windows edition, 64-bit, GPU, and RAM. Before you rebuild a profile, confirm the user is not waiting on a remote home folder that DNS cannot resolve.

Add resources when the evidence says the box is too small: RAM for low-memory warnings after you kill the leak, a different USB controller for endpoint exhaustion, disk space when Updates fail because C: has 200 MB free. Adding RAM will not fix time drift. Reimaging will not fix a CMOS battery.

Keep **user education** for the end of a confirmed malware case (Core 2 objective 2.6). For OS troubleshooting, educate only when the cause was a behavior: a docking-station unplug during sleep, a full disk of 40 GB video projects on the Desktop of a roaming profile, a user who installs every "driver booster." Document the actual cause in the ticket so the next technician does not start at reimage.`,
      },
      {
        type: "callout",
        id: "C2-D3-O1-L3-exam",
        callout: {
          kind: "exam",
          title: "Exam lens",
          body: "One user cannot log on, others can: rebuild that profile. Every user and every boot: not a profile. Clock wrong after power loss: CMOS battery. Clock wrong only on the domain: W32Time / NTP / five-minute Kerberos skew.",
        },
      },
      {
        type: "callout",
        id: "C2-D3-O1-L3-mistake",
        callout: {
          kind: "mistake",
          title: "Common mistake",
          body: "Deleting a domain user in Active Directory because the local profile is corrupt. The account is fine; the local cache is not. Opposite mistake: rebuilding a profile when Group Policy is timing out on a dead DFS share.",
        },
      },
      {
        type: "knowledge-check",
        id: "C2-D3-O1-L3-kc2",
        questionIds: ["C2-D3-O1-TIMEDRIFT-Q001"],
      },
      {
        type: "checkpoint",
        id: "C2-D3-O1-L3-cp",
        questionIds: [
          "C2-D3-O1-BSOD-Q003",
          "C2-D3-O1-BSOD-Q005",
          "C2-D3-O1-PROFILE-Q002",
          "C2-D3-O1-PROFILE-Q004",
          "C2-D3-O1-TIMEDRIFT-Q002",
          "C2-D3-O1-TIMEDRIFT-Q004",
          "C2-D3-O1-USBRES-Q003",
          "C2-D3-O1-USBRES-Q005",
        ],
      },
      {
        type: "summary",
        id: "C2-D3-O1-L3-sum",
        bullets: [
          "Slow profile: roaming path, GPO, NTUSER.DAT — rebuild after backing up that user's data.",
          "Time resets on cold boot: CMOS/RTC battery. Time drifts while running: W32Time/NTP. Five minutes breaks Kerberos.",
          "Repair ladder: reboot and services → Safe Mode → SFC/DISM → roll back → restore → profile → reimage.",
          "Verify app requirements and add resources only when a named resource is exhausted.",
        ],
      },
    ],
  },
  {
    id: "C2-D3-O2-L1",
    objectiveId: "C2-D3-O2",
    slug: "mobile-apps-updates",
    title: "Apps that will not launch, install, or update",
    description:
      "Force-stop, storage, permissions, and store accounts before you wipe a phone for a single crashing app.",
    estimatedMinutes: 20,
    conceptIds: ["C2-D3-O2-APPCRASH", "C2-D3-O2-MOBILEUPDATE"],
    prerequisites: ["C2-D3-O1-L3"],
    lastVerified: "2026-09-01",
    sources: ["c2-obj-3.0"],
    blocks: [
      {
        type: "callout",
        id: "C2-D3-O2-L1-why",
        callout: {
          kind: "why",
          title: "Why this matters",
          body: "Mobile OS troubleshooting is still isolate-then-change. One app failing is not an OS reinstall. An OS that will not patch is often storage, charge, or MDM — not a cursed handset.",
        },
      },
      {
        type: "reading",
        id: "C2-D3-O2-L1-r1",
        title: "Launch, crash, close, install",
        markdown: `When an **application fails to launch**, start with scope. If every app is fine except one, the OS is probably healthy. **Force-stop** the app (Android: App info; iOS: swipe from the app switcher), then reopen. If it still fails, **clear the cache** on Android (not the data, yet — data wipe is a reinstall of that app's state). Confirm **storage** is not exhausted; both iOS and Android refuse installs and updates when free space is gone, and they can also refuse to launch apps that need a temp file.

**Permissions** matter. A camera app that "won't open" may be launching into a blank screen because Camera and Photos are denied. A banking app may refuse to run if the user denied phone state or if the device fails a Play Integrity / jailbreak check — that last case is a security symptom (objective 3.3), not a store glitch.

**Application fails to close or crashes** in a loop: force-stop, reboot the device, update the app, then reinstall. If the crash started after an OS update, check the vendor's compatibility note; the BEST fix may be waiting for the vendor, not sideloading an old APK. Random reboots that coincide with one app still point at that app first.

**Application fails to install** is usually: not enough storage, a blocked **unofficial package** (see 3.3), a corporate **MDM** restriction, a wrong architecture (32-bit APK on a 64-bit-only build), a corrupted download, or the wrong store account. On iOS, a failed install is often Apple ID, network, or an enterprise profile. On Android, "Play Protect doesn't recognise this app" is a warning, not a suggestion to disable Play Protect.

**Slow to respond** across the whole device: storage nearly full, thermal throttling after navigation in the sun, too many background refresh / sync accounts, or an aging battery that the OS is already throttling. One slow app is cache and the app itself.`,
      },
      {
        type: "diagram",
        id: "C2-D3-O2-L1-d1",
        component: "PhoneSettingsDiagram",
        title: "App info is the workbench",
        caption: "Force stop, permissions, storage, and the update channel live on the app's settings page — not in a factory reset.",
        notice:
          "Notice that Clear Data is not the same as Clear Cache. Cache is the cheap experiment. Data is the user's login and offline files.",
        alt: "Phone settings showing an app info pane with force stop, permissions, storage, and battery usage.",
      },
      {
        type: "knowledge-check",
        id: "C2-D3-O2-L1-kc1",
        questionIds: ["C2-D3-O2-APPCRASH-Q001"],
      },
      {
        type: "reading",
        id: "C2-D3-O2-L1-r2",
        title: "OS and app updates that will not finish",
        markdown: `An **OS fails to update** for boring reasons more often than dramatic ones. The device must be **charged** (vendors commonly require ~20–50% or plugged in), on **Wi-Fi** for large images, and have **several gigabytes free**. A **VPN**, a captive portal, or a metered Wi-Fi flag can stall the download. **MDM** can defer or block OS versions that are not in the company's allowed train. A failing update that reboots into the same build is not a reason to jailbreak; it is a reason to free storage, use a different network, and try the vendor's recovery image only after those checks.

**Application fails to update** follows the same list plus store-account problems: expired payment method on a paid app, a family-sharing hold, a work profile that cannot see the personal Play Store, or a pending OS update the app now requires. Offloading unused apps (iOS) and moving media off the phone are legitimate first storage moves.

Do not factory-reset as FIRST. Reset is a valid last step for a device that will not patch and will not install anything, after backup. For a single app, reinstall the app.`,
      },
      {
        type: "table",
        id: "C2-D3-O2-L1-t1",
        title: "Mobile app symptom isolation",
        headers: ["Symptom", "Scope question", "FIRST cheap action"],
        rows: [
          ["One app will not launch", "Others launch?", "Force-stop, clear cache, check permissions"],
          ["One app crashes on open", "Started after OS or app update?", "Update or reinstall that app"],
          ["No app will install", "Storage and store account?", "Free space; confirm Apple ID / Google account"],
          ["OS update hangs at 50%", "Charge, Wi-Fi, free space, MDM?", "Plug in, Wi-Fi, delete large video, retry"],
          ["Phone generally slow", "Storage and temperature?", "Reboot, free space, check battery health settings"],
        ],
        caption: "Scope first: one app versus the whole OS.",
      },
      {
        type: "callout",
        id: "C2-D3-O2-L1-exam",
        callout: {
          kind: "exam",
          title: "Exam lens",
          body: "Factory reset is almost never FIRST for a single app. Insufficient storage is the most common 'won't install / won't update' cause after a wrong account.",
        },
      },
      {
        type: "knowledge-check",
        id: "C2-D3-O2-L1-kc2",
        questionIds: ["C2-D3-O2-MOBILEUPDATE-Q001"],
      },
      {
        type: "summary",
        id: "C2-D3-O2-L1-sum",
        bullets: [
          "One app: force-stop, cache, permissions, reinstall. Whole OS: storage, reboot, then bigger guns.",
          "Install/update failures: storage, network, store account, MDM, then corrupted package.",
          "OS updates need charge, space, and often Wi-Fi; MDM can block the version.",
          "Clear cache is reversible; clear data and factory reset are not.",
        ],
      },
    ],
  },
  {
    id: "C2-D3-O2-L2",
    objectiveId: "C2-D3-O2",
    slug: "mobile-battery-radios-rotate",
    title: "Battery software, radios, and a screen that will not rotate",
    description:
      "Treat battery drain as an app and radio problem first, then isolate Bluetooth, Wi-Fi, NFC, and rotation lock.",
    estimatedMinutes: 20,
    conceptIds: ["C2-D3-O2-AUTOROTATE", "C2-D3-O2-APPCRASH"],
    prerequisites: ["C2-D3-O2-L1"],
    lastVerified: "2026-09-01",
    sources: ["c2-obj-3.0"],
    blocks: [
      {
        type: "callout",
        id: "C2-D3-O2-L2-why",
        callout: {
          kind: "why",
          title: "Why this matters",
          body: "Users describe radios as 'the internet is broken' and sensors as 'the phone is broken.' You have to translate those sentences into Wi-Fi versus cellular, NFC versus Bluetooth, and rotation lock versus a dead accelerometer.",
        },
      },
      {
        type: "reading",
        id: "C2-D3-O2-L2-r1",
        title: "Battery life is often software",
        markdown: `Core 2 treats **battery life issues** as a software-troubleshooting item, not a soldering lab. The OS battery screen (iOS Battery; Android Battery usage) names the offender: a mapping app holding GPS, mail syncing Exchange every minute, a social app with background refresh, or a radio that never sleeps because Wi-Fi is flapping.

FIRST actions: reboot, check for an app update, restrict background activity for the greedy app, drop screen brightness / always-on display, disable unused radios (**Bluetooth**, **NFC**, **Wi-Fi** scanning, cellular if on Wi-Fi). A swollen pack or a health reading of 78% capacity is hardware — replace the battery through the vendor — but do not skip the software inventory. Many "new battery" tickets return because the same email tenant still syncs every 60 seconds.

**Random-looking drain overnight** is often an app that lost Doze / Low Power exemptions, a failing Wi-Fi access point that makes the phone hunt, or a watch that never finishes a Bluetooth sync. Airplane mode overnight is a valid isolation test: if drain stops in airplane mode, a radio or an app using a radio is the lead.

Do not skip the OS battery-health screen. A pack at 94% with one greedy app is a software ticket. A pack at 78% that is already throttling, or a pack that is swollen, is hardware — vendor replacement, not a third-party "battery saver" APK. If the phone dies at 40% displayed, calibrate by a full charge cycle once, then believe the health reading. Document the app name and percentage in the ticket so the next tech does not start at a battery swap.`,
      },
      {
        type: "reading",
        id: "C2-D3-O2-L2-r2",
        title: "Bluetooth, Wi-Fi, NFC, and autorotate",
        markdown: `**Wi-Fi** problems: confirm Airplane mode is off, the correct SSID, and that cellular is not just covering for a dead WLAN. Forget the network and rejoin after a bad captive portal. A phone with working cellular and dead Wi-Fi is not "no internet" in the 3.3 malware sense until you have toggled Wi-Fi, forgotten the SSID, and tested another AP.

**Bluetooth**: pairing mode, old device entries, and interference from USB 3 docks. Forget the accessory, reboot both ends, then pair. Headphones that connect but have no audio are often the OS routing to another output, not a dead radio.

**Near-field communication (NFC)** is short-range on purpose. Payments fail when NFC is off, the default wallet app was disabled, a thick case sits between coil and terminal, or the screen is locked in a way the wallet vendor does not allow. NFC is not Wi-Fi. Moving the phone to 2.4 GHz will not help a tap-to-pay terminal.

**Screen does not autorotate**: check **rotation lock** / Raise to Wake first — it is the number-one cause. Then accessibility settings that lock orientation, a case with magnets confusing a Hall sensor, and finally a failed accelerometer/gyroscope (hardware, after a drop). An app that does not rotate when others do is that app, not the sensor.`,
      },
      {
        type: "knowledge-check",
        id: "C2-D3-O2-L2-kc1",
        questionIds: ["C2-D3-O2-AUTOROTATE-Q001"],
      },
      {
        type: "table",
        id: "C2-D3-O2-L2-t1",
        title: "Radio and sensor isolation",
        headers: ["Complaint", "Prove this first", "Do not do this first"],
        rows: [
          ["No internet", "Airplane mode, Wi-Fi vs cellular, AP", "Factory reset"],
          ["Headphones will not pair", "Forget device, pair both ends", "Replace the phone radio"],
          ["Tap-to-pay fails", "NFC on, default wallet, case thickness", "Reset network settings immediately"],
          ["Screen stays portrait", "Rotation lock / Control Center", "Replace the digitizer"],
          ["Battery dead by noon", "Battery usage by app", "Replace battery with no usage data"],
        ],
      },
      {
        type: "callout",
        id: "C2-D3-O2-L2-tech",
        callout: {
          kind: "technician",
          title: "Technician lens",
          body: "Reset network settings is a valid NEXT after forgetting an SSID and toggling Airplane mode, because it drops VPN and APN customizations too. Warn the user before you wipe their Wi-Fi passwords.",
        },
      },
      {
        type: "callout",
        id: "C2-D3-O2-L2-mistake",
        callout: {
          kind: "mistake",
          title: "Common mistake",
          body: "Calling every connectivity failure a 'SIM issue.' If Wi-Fi works and cellular does not, then think SIM/APN/carrier. If cellular works and Wi-Fi does not, the SIM is a bystander.",
        },
      },
      {
        type: "knowledge-check",
        id: "C2-D3-O2-L2-kc2",
        questionIds: ["C2-D3-O2-AUTOROTATE-Q002"],
      },
      {
        type: "checkpoint",
        id: "C2-D3-O2-L2-cp",
        questionIds: [
          "C2-D3-O2-APPCRASH-Q002",
          "C2-D3-O2-APPCRASH-Q004",
          "C2-D3-O2-APPCRASH-Q006",
          "C2-D3-O2-MOBILEUPDATE-Q002",
          "C2-D3-O2-MOBILEUPDATE-Q004",
          "C2-D3-O2-AUTOROTATE-Q003",
          "C2-D3-O2-AUTOROTATE-Q005",
          "C2-D3-O2-AUTOROTATE-Q007",
        ],
      },
      {
        type: "summary",
        id: "C2-D3-O2-L2-sum",
        bullets: [
          "Battery: read the OS usage screen; isolate with airplane mode overnight.",
          "Wi-Fi, Bluetooth, and NFC fail for different reasons — name the radio.",
          "Autorotate: rotation lock, then app, then case magnets, then sensor hardware.",
          "Reset network settings is a later step; factory reset is last and needs a backup.",
        ],
      },
    ],
  },
  {
    id: "C2-D3-O3-L1",
    objectiveId: "C2-D3-O3",
    slug: "mobile-jailbreak-stores",
    title: "Unofficial stores, developer mode, root, and spoofed apps",
    description:
      "Recognize jailbreak and sideload risk without performing either, and tell a spoofed banking app from a tired user.",
    estimatedMinutes: 20,
    conceptIds: ["C2-D3-O3-JAILBREAK", "C2-D3-O3-SPOOFAPP"],
    prerequisites: ["C2-D3-O2-L2"],
    lastVerified: "2026-09-01",
    sources: ["c2-obj-3.0", "cisa-phishing"],
    blocks: [
      {
        type: "callout",
        id: "C2-D3-O3-L1-why",
        callout: {
          kind: "why",
          title: "Why this matters",
          body: "A help-desk tech does not need to jailbreak a phone. A help-desk tech does need to recognise the settings, icons, and stories that mean someone already did — or installed a fake bank.",
        },
      },
      {
        type: "reading",
        id: "C2-D3-O3-L1-r1",
        title: "Where the app came from is the first security question",
        markdown: `**Application source** is the fork in the road. Apple's App Store and Google Play (plus the vendor's own store on some Android OEMs) sign and scan packages. **Unofficial application stores**, sideloaded APKs from a browser, "free" modded APK sites, and random enterprise manifests are how **unauthorized and malicious applications** arrive.

Sideloading is not automatically malware — a line-of-business APK from the company's MDM is expected — but an employee who enabled **Install unknown apps** for a browser to get a "premium" camera filter has widened the attack surface. On iOS, profiles and third-party marketplaces (where the OS version allows them) are the analogous risk. Ask: who signed this, and why is it not in the official store?

**Developer mode** (Android Developer options, USB debugging; iOS Developer Mode on current versions) is a legitimate setting for programmers. It is also a red flag on a receptionist phone that has USB debugging on, an unknown computer always authorized, and Stay awake while charging. Developer mode by itself is not a crime; developer mode plus unknown sources plus a free VPN APK is a compromise pattern.

**Root access** (Android) and **jailbreak** (iOS) remove the vendor's application sandbox and integrity checks. Banking apps, MDM, and mobile payments often refuse to run — that refusal is a clue. Look for unauthorized superuser binaries, unexpected package installers, disabled Play Protect, or a user who says they "needed it for themes." You do not walk the user through a jailbreak in this course. You document it, isolate the device from corporate mail and SSO, and follow the incident process.`,
      },
      {
        type: "diagram",
        id: "C2-D3-O3-L1-d1",
        component: "PhoneSettingsDiagram",
        title: "Compromise clues in settings",
        caption: "Unknown sources, Developer options, USB debugging, and a second store app are configuration evidence.",
        notice:
          "Notice that MDM-installed apps from a company portal are an official source for that employer. A random APK site is not.",
        alt: "Phone settings highlighting developer options, unknown sources, and an unofficial store icon.",
      },
      {
        type: "knowledge-check",
        id: "C2-D3-O3-L1-kc1",
        questionIds: ["C2-D3-O3-JAILBREAK-Q001"],
      },
      {
        type: "reading",
        id: "C2-D3-O3-L1-r2",
        title: "Application spoofing",
        markdown: `**Application spoofing** is a fake app wearing a real brand: a "company VPN," a bank, a package tracker, a Microsoft 365 sign-in. The icon is close enough. The package name is not the vendor's. The permissions ask for SMS, accessibility services, or device admin — a package tracker does not need those.

Users install spoofed apps from ads, smishing links, unofficial stores, and search results that are ads. Symptoms overlap with 3.2 (won't launch the real app because the fake one stole the icon) and with 3.3 traffic spikes (the fake app is a botnet). FIRST: uninstall the impostor, change passwords from a different device, check bank/SSO logs, and scan. Do not enter credentials into the fake app "to see if it works."

MDM can block unknown sources and require a managed Google Play / Apple Business Manager channel. That is the prevention story. The troubleshooting story is recognising that a second WhatsApp, a second Authenticator, or a "security update" APK was never in the official catalog.`,
      },
      {
        type: "table",
        id: "C2-D3-O3-L1-t1",
        title: "Configuration versus compromise",
        headers: ["Finding", "Could be legitimate", "Treat as incident when"],
        rows: [
          ["Developer options on", "Company-owned test device", "USB debugging authorized to unknown PCs on a user phone"],
          ["Unknown sources / sideload", "MDM line-of-business app", "Browser-downloaded 'mod' APKs and cracked games"],
          ["Root / jailbreak tools", "Never on a corporate production phone", "Always — isolate and escalate"],
          ["Second copy of a bank app", "Almost never", "Spoof — remove, rotate credentials"],
          ["Work profile + personal Play", "Normal Android Enterprise", "Work apps installed in personal profile from APKs"],
        ],
      },
      {
        type: "callout",
        id: "C2-D3-O3-L1-exam",
        callout: {
          kind: "exam",
          title: "Exam lens",
          body: "If a banking app suddenly refuses to run and the user 'installed a theme engine,' think jailbreak/root first. If a second nearly identical app appeared after a text message, think spoofed app.",
        },
      },
      {
        type: "knowledge-check",
        id: "C2-D3-O3-L1-kc2",
        questionIds: ["C2-D3-O3-SPOOFAPP-Q001"],
      },
      {
        type: "summary",
        id: "C2-D3-O3-L1-sum",
        bullets: [
          "Official stores versus unofficial sources is the first security question.",
          "Developer mode is a clue, not a conviction; pair it with USB debugging and unknown sources.",
          "Root/jailbreak breaks sandboxing; isolate corporate data.",
          "Spoofed apps clone brands and over-ask permissions — uninstall and rotate credentials.",
        ],
      },
    ],
  },
  {
    id: "C2-D3-O3-L2",
    objectiveId: "C2-D3-O3",
    slug: "mobile-sec-symptoms",
    title: "Data-usage spikes, fake warnings, and leaked photos",
    description:
      "Match high traffic, ads, bogus antivirus prompts, and data leakage to a compromised mobile OS.",
    estimatedMinutes: 20,
    conceptIds: ["C2-D3-O3-DATAUSAGE", "C2-D3-O3-SPOOFAPP"],
    prerequisites: ["C2-D3-O3-L1"],
    lastVerified: "2026-09-01",
    sources: ["c2-obj-3.0", "cisa-phishing"],
    blocks: [
      {
        type: "callout",
        id: "C2-D3-O3-L2-why",
        callout: {
          kind: "why",
          title: "Why this matters",
          body: "A carrier SMS that says you hit the data cap can be the first visible symptom of a cryptominer, a stalkerware beacon, or a spoofed VPN. If you only raise the cap, the malware keeps the SIM.",
        },
      },
      {
        type: "reading",
        id: "C2-D3-O3-L2-r1",
        title: "Traffic, slowness, and a dead internet",
        markdown: `**High network traffic**, a **data-usage limit notification**, **degraded response time**, **limited internet**, and **no internet** sit on one spectrum. A legitimate cause is a backup of camera roll to a cloud account on cellular, a failed Wi-Fi connection that dumped a software update onto LTE, or a video call. A malicious cause is an app exfiltrating photos, a proxy that hijacks DNS, or adware clicking in the background.

FIRST: open the OS data-usage screen and sort by app. A flashlight with a gigabyte of cellular is not a flashlight. Disable cellular for that app, uninstall it, and check whether Wi-Fi still works. **Limited or no internet** after a "free VPN" install is often the VPN's broken tunnel or a local VPN profile used for ad injection. Forget the VPN profile, forget the Wi-Fi network, test another network. If every network is poisoned, think DNS/proxy malware and a wipe.

**Unexpected behavior** includes the camera LED at night, settings that re-enable themselves, new browser homepages, and language changes. **Ads** on the home screen, outside a browser, are a classic potentially unwanted program (PUP) / adware sign on Android. **Fake security warnings** ("Your iPhone is infected, call this number") are overlay scams and scareware — often a webpage, sometimes an app with accessibility overlay permission. Do not call the number. Close the tab, uninstall the app, and if the overlay persists, boot safe mode on Android and remove the device-admin app.

Keep the data-usage screenshot. It is evidence for the ticket and, if this becomes an incident, for chain of custody later. A flashlight with a gigabyte of LTE is a stronger story than "the phone felt slow." Compare Wi-Fi versus cellular columns: malware that only ramps on LTE is hiding behind the user's "I was on Wi-Fi" memory.`,
      },
      {
        type: "table",
        id: "C2-D3-O3-L2-t1",
        title: "Mobile security symptoms to action",
        headers: ["Symptom", "Likely story", "BEST next action"],
        rows: [
          ["Carrier data-cap SMS, unused phone", "App exfil / miner / update on LTE", "Identify the app in data usage; uninstall; rotate tokens"],
          ["Ads on the home screen", "Sideloaded adware", "Remove unknown sources apps; consider wipe if device admin"],
          ["Full-screen 'virus' warning with a phone number", "Scareware overlay", "Do not call; exit; remove the app; change passwords elsewhere"],
          ["Photos appear on a stranger's social account", "Leaked data / stalkerware", "Incident: isolate, wipe after evidence per policy, rotate all credentials"],
          ["Banking app works only after 'disabling Play Protect'", "Root or spoofed app", "Stop; treat as compromise"],
          ["No internet except one 'secure browser' APK", "Proxy / DNS hijack", "Uninstall; reset network; wipe if it returns"],
        ],
      },
      {
        type: "knowledge-check",
        id: "C2-D3-O3-L2-kc1",
        questionIds: ["C2-D3-O3-DATAUSAGE-Q001"],
      },
      {
        type: "reading",
        id: "C2-D3-O3-L2-r2",
        title: "Leaked data and when to wipe",
        markdown: `**Leaked data** (contacts, photos, mail, location) is an incident, not a performance ticket. Preserve what policy requires — photos of the fake app, the package name, the data-usage screenshot — then **isolate**: remove corporate MDM profiles / wipe corporate container, disable the work account, and do not plug the phone into a technician PC with USB debugging still on.

A **factory reset** is often the BEST remediation on a personal Android with unknown device-admin apps you cannot remove, or an iOS device with a jailbreak the user will not reverse. Back up **after** you are sure the backup will not restore the malware (photos yes, app list from an unofficial store no). Corporate devices follow MDM: remote wipe, then reprovision.

Tell the user which accounts to rotate from a **clean** device: Apple ID / Google, mail, banks, SSO. Objective 2.8 taught remote wipe and MDM as controls. This objective teaches you to notice that you now need them.`,
      },
      {
        type: "callout",
        id: "C2-D3-O3-L2-exam",
        callout: {
          kind: "exam",
          title: "Exam lens",
          body: "A data-usage notification plus an unofficial store is compromise until proven otherwise. A data-usage notification plus iCloud Photos on cellular with no weird apps is a setting, not malware.",
        },
      },
      {
        type: "callout",
        id: "C2-D3-O3-L2-mistake",
        callout: {
          kind: "mistake",
          title: "Common mistake",
          body: "Walking the user through the scareware phone number 'just to see.' That is a social-engineering win for the attacker and a professional-conduct miss for you.",
        },
      },
      {
        type: "knowledge-check",
        id: "C2-D3-O3-L2-kc2",
        questionIds: ["C2-D3-O3-DATAUSAGE-Q002"],
      },
      {
        type: "checkpoint",
        id: "C2-D3-O3-L2-cp",
        questionIds: [
          "C2-D3-O3-JAILBREAK-Q002",
          "C2-D3-O3-JAILBREAK-Q004",
          "C2-D3-O3-SPOOFAPP-Q002",
          "C2-D3-O3-SPOOFAPP-Q004",
          "C2-D3-O3-DATAUSAGE-Q003",
          "C2-D3-O3-DATAUSAGE-Q005",
          "C2-D3-O3-DATAUSAGE-Q007",
          "C2-D3-O3-JAILBREAK-Q006",
        ],
      },
      {
        type: "summary",
        id: "C2-D3-O3-L2-sum",
        bullets: [
          "Sort cellular data by app before you raise the carrier cap.",
          "Home-screen ads, overlay scareware, and fake VPNs are compromise symptoms.",
          "Leaked photos or mail: isolate, preserve per policy, wipe, rotate credentials from a clean device.",
          "MDM remote wipe is the corporate version of a factory reset.",
        ],
      },
    ],
  },
  {
    id: "C2-D3-O4-L1",
    objectiveId: "C2-D3-O4",
    slug: "pc-browser-redirects-certs",
    title: "Browser redirects, certificate warnings, and a poisoned path",
    description:
      "Follow a hijacked homepage, an invalid certificate, and a hosts-file redirect without blaming 'the Internet.'",
    estimatedMinutes: 22,
    conceptIds: ["C2-D3-O4-REDIRECT", "C2-D3-O4-CERTBROWSER"],
    prerequisites: ["C2-D3-O3-L2"],
    lastVerified: "2026-09-01",
    sources: ["c2-obj-3.0", "ms-windows", "cisa-phishing"],
    blocks: [
      {
        type: "callout",
        id: "C2-D3-O4-L1-why",
        callout: {
          kind: "why",
          title: "Why this matters",
          body: "A browser that opens the bank and lands on a lottery page is not a DNS 'glitch' you ignore. It is a symptom on the CompTIA PC-security list, and it is how credential theft starts.",
        },
      },
      {
        type: "reading",
        id: "C2-D3-O4-L1-r1",
        title: "Redirects, pop-ups, and a slow browser",
        markdown: `**Browser redirection** means the user types a legitimate URL or opens a bookmark and arrives somewhere else. Causes range from a hijacked **homepage / new-tab extension**, a **proxy** set in Windows or the browser, a poisoned **hosts file** (\`C:\\Windows\\System32\\drivers\\etc\\hosts\`), rogue **DNS** on the NIC or SOHO router, to full malware. FIRST: try another browser. If only one browser redirects, kill its extensions and reset its settings. If every browser and even \`ping\`/\`nslookup\` of the name go to a strange IP, you have OS or network-level hijack — not "Chrome being Chrome."

**Browser pop-ups** that survive a pop-up blocker, especially full-screen "you are infected" pages, are scareware. Close the browser from Task Manager if the page trapped the GUI. Then scan — and treat a reset of the browser profile as cheap compared with a reimage, but not as a substitute for the malware-removal process when other symptoms exist.

A **slow browser** with high CPU in Task Manager is often a crypto-miner extension or a thousand tabs. A slow browser plus redirects plus new toolbars is a PUP. Check **Programs and Features** / Installed apps for toolbars you did not approve, and check the extension list for items with publisher "unknown."

**No network** on a PC that had network yesterday can be malware that disabled the adapter, set a bogus static DNS, or enabled a third-party firewall. It can also be a driver. The security-flavored version is: other PCs on the same switch are fine, this PC's IP config looks wrong, and a hosts file maps \`google.com\` to localhost.`,
      },
      {
        type: "diagram",
        id: "C2-D3-O4-L1-d1",
        component: "MalwareStepsDiagram",
        title: "Symptoms versus the 10-step removal process",
        caption: "This domain diagnoses security symptoms. Confirmed malware still follows Core 2 objective 2.6 — including quarantine.",
        notice:
          "Notice you do not skip investigate/verify. A corporate SSL inspection appliance can cause certificate warnings without malware.",
        alt: "Diagram separating browser security symptoms from the SOHO malware-removal sequence.",
      },
      {
        type: "knowledge-check",
        id: "C2-D3-O4-L1-kc1",
        questionIds: ["C2-D3-O4-REDIRECT-Q001"],
      },
      {
        type: "reading",
        id: "C2-D3-O4-L1-r2",
        title: "Certificate warnings that deserve a pause",
        markdown: `A **certificate warning** (name mismatch, expired, untrusted issuer, revoked) means the TLS identity of the site does not chain to a trust anchor the OS likes. Legitimate reasons: the site's admin failed to renew, the clock is wrong (**time drift** from 3.1 will explode certificates), or a corporate SSL-inspection proxy presents an internal CA the PC does not have. Malicious reasons: on-path attacker, malware inserting a fake CA into the local store, or a redirect to a phishing host with a cheap cert that still does not match the name.

Do **not** click through a banking or SSO warning to "just get mail working." Compare the URL, the issuer, and the PC clock. If every HTTPS site fails and the clock is 2018, fix time first. If only one internal site fails and the company uses inspection, install the **enterprise CA** with a documented process — not a random CER from an email.

Invalid certs plus redirects plus a new trusted root in \`certmgr.msc\` is a compromise. Export the unexpected root for incident response, then remove it after quarantine, do not leave it because "it made the warning go away."`,
      },
      {
        type: "table",
        id: "C2-D3-O4-L1-t1",
        title: "Where the hijack lives",
        headers: ["If this is true", "Look here", "Not here first"],
        rows: [
          ["Only Chrome redirects", "Chrome extensions, Chrome homepage", "Reimage"],
          ["Every browser plus nslookup is wrong", "NIC DNS, hosts file, router DNS", "A single extension"],
          ["HTTPS fails everywhere, clock is 2016", "Time / CMOS / W32Time", "The CA ecosystem"],
          ["HTTPS fails only at work, home is fine", "SSL inspection CA, proxy settings", "Reinstall Windows"],
          ["New trusted root you did not install", "Malware / unwanted proxy", "Ignore and click through"],
        ],
      },
      {
        type: "callout",
        id: "C2-D3-O4-L1-exam",
        callout: {
          kind: "exam",
          title: "Exam lens",
          body: "FIRST on a one-browser redirect is disable extensions / reset that browser. FIRST on an every-app redirect is IP/DNS/hosts. Certificate warnings: check the clock before you rebuild the OS.",
        },
      },
      {
        type: "knowledge-check",
        id: "C2-D3-O4-L1-kc2",
        questionIds: ["C2-D3-O4-CERTBROWSER-Q001"],
      },
      {
        type: "summary",
        id: "C2-D3-O4-L1-sum",
        bullets: [
          "Scope redirects: one browser versus the OS versus the network.",
          "Hosts file, NIC DNS, proxy, and extensions are the four usual hijack points.",
          "Certificate warnings can be time drift, a missing enterprise CA, or an attack — do not click through SSO.",
          "Confirmed malware still uses the 10-step SOHO process from domain 2.",
        ],
      },
    ],
  },
  {
    id: "C2-D3-O4-L2",
    objectiveId: "C2-D3-O4",
    slug: "pc-fake-av-files-updates",
    title: "Fake antivirus, missing files, and updates that will not run",
    description:
      "Treat scareware as an incident, restore files from backup not from the pop-up, and notice malware that blocks Windows Update.",
    estimatedMinutes: 22,
    conceptIds: ["C2-D3-O4-FAKEAV", "C2-D3-O4-REDIRECT"],
    prerequisites: ["C2-D3-O4-L1"],
    lastVerified: "2026-09-01",
    sources: ["c2-obj-3.0", "ms-windows", "cisa-phishing"],
    blocks: [
      {
        type: "callout",
        id: "C2-D3-O4-L2-why",
        callout: {
          kind: "why",
          title: "Why this matters",
          body: "Fake antivirus pays the attacker twice: once when the user types a card number, and again when real Defender is disabled so the next payload can land.",
        },
      },
      {
        type: "reading",
        id: "C2-D3-O4-L2-r1",
        title: "False AV, desktop alerts, and unwanted notifications",
        markdown: `**False antivirus** (scareware, rogue security software) looks like Windows Security, names random files as Trojans, and demands payment or a phone call. Real Microsoft Defender uses Windows Security in Settings and does not cold-call. FIRST: disconnect or isolate if you already suspect compromise, do **not** pay, do **not** call the number on the dialog, and do **not** let the user "download the cleaner" from the same pop-up.

Uninstall the rogue app from Installed apps if it appears there. If it traps the desktop, boot **Safe Mode** or Windows **preinstallation environment (WinPE / WinRE)** and remove it, then run a current anti-malware scan — which is steps inside objective 2.6, not a new invention. Re-enable Defender if the scareware disabled it.

**Desktop alerts** and **unwanted notifications** include lock-screen ads, Windows notification spam from a sideloaded store app, and balloon tips from PUPs. Browser notification permission abuse ("news sites" that ping every two minutes) is a Settings > Notifications / browser site-permission cleanup, which may be enough if that is the only symptom. Coupled with redirects and a disabled Defender, it is malware.

**Altered or missing files**, renamed extensions, ransom notes, or a desktop wallpaper you did not set are ransomware or destructive malware until proven otherwise. Do not decrypt with a tool the pop-up sells. Isolate, preserve evidence per 4.6, restore from **backup** (4.3). Missing files after a "optimizer" that emptied Documents is still a restore-from-backup problem; the optimizer is a PUP.

Write down the exact product name on the fake AV dialog. It often appears in Programs and Features, a Run key, and a scheduled task under a slightly different spelling. If Windows Security still shows Defender on, that mismatch is your teaching moment for the user: Microsoft does not cold-call, and it does not demand a credit card over a full-screen Explorer overlay. After removal, confirm Defender is on and a definition update succeeds before you call the ticket done.`,
      },
      {
        type: "knowledge-check",
        id: "C2-D3-O4-L2-kc1",
        questionIds: ["C2-D3-O4-FAKEAV-Q001"],
      },
      {
        type: "reading",
        id: "C2-D3-O4-L2-r2",
        title: "OS update failures as a security symptom",
        markdown: `Windows Update can fail because C: is full, a feature update blocks on an incompatible driver, or BITS is broken. It can also fail because malware **blocks the update service**, poisons \`hosts\` so Windows cannot reach Microsoft, or disables the Windows Update service in \`services.msc\`. When Update fails **and** Defender is off **and** the browser redirects, you are not in a "repair Windows Update" ticket anymore — you are in malware removal, and a **reimage** is often cleaner than fighting a kernel-mode blocker.

After remediation (2.6), **schedule scans and updates** and **educate the user** about the fake AV and the bundle they clicked. If you only delete the visible toolbar, the next reboot brings it back from a Run key or a scheduled task. Check Task Scheduler, Run keys, and services for names that resemble "AntivirusPro" and "SystemOptimizer."

**No network** after a scareware install may be a disabled adapter or a static DNS of 127.0.0.1. \`ipconfig /all\` and comparing to a known-good PC on the same LAN is still the right FIRST technical step; the security interpretation comes from what you find.`,
      },
      {
        type: "lab",
        id: "C2-D3-O4-L2-lab",
        labId: "C2-D3-SHIFT-LAB",
        title: "Core 2 software-troubleshooting shift",
        prompt:
          "Work the randomized shift. Separate OS faults (profile, time, USB resources) from malware symptoms (redirects, fake AV). Treat any AI-generated command as unverified.",
      },
      {
        type: "callout",
        id: "C2-D3-O4-L2-tech",
        callout: {
          kind: "technician",
          title: "Technician lens",
          body: "If files are encrypted, your job is isolate and restore, not to bargain with the dialog. If files are merely hidden (attrib +h +s), unhiding is easy — but still scan, because that trick is old malware theater.",
        },
      },
      {
        type: "callout",
        id: "C2-D3-O4-L2-exam",
        callout: {
          kind: "exam",
          title: "Exam lens",
          body: "A pop-up that says Defender is expired, while Windows Security shows Defender on, is fake AV. Paying, calling, or installing from the pop-up is never BEST.",
        },
      },
      {
        type: "knowledge-check",
        id: "C2-D3-O4-L2-kc2",
        questionIds: ["C2-D3-O4-FAKEAV-Q002"],
      },
      {
        type: "checkpoint",
        id: "C2-D3-O4-L2-cp",
        questionIds: [
          "C2-D3-O4-REDIRECT-Q002",
          "C2-D3-O4-REDIRECT-Q004",
          "C2-D3-O4-CERTBROWSER-Q002",
          "C2-D3-O4-CERTBROWSER-Q004",
          "C2-D3-O4-FAKEAV-Q003",
          "C2-D3-O4-FAKEAV-Q005",
          "C2-D3-O4-FAKEAV-Q007",
          "C2-D3-O4-REDIRECT-Q006",
        ],
      },
      {
        type: "summary",
        id: "C2-D3-O4-L2-sum",
        bullets: [
          "Fake AV: do not pay or call; isolate; remove in Safe Mode; re-enable Defender.",
          "Missing or encrypted files: restore from backup, not from the scareware.",
          "Update failures plus Defender off plus redirects: malware, often reimage.",
          "Notifications alone can be a site permission; notifications plus hijacks are not.",
        ],
      },
    ],
  },
];
