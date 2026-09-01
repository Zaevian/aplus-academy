import type { Lesson } from "../../schema";

export const C1_D5_LESSONS: Lesson[] = [
  {
    id: "C1-D5-O1-L1",
    objectiveId: "C1-D5-O1",
    slug: "post-power-blank",
    title: "POST, no power, and a blank screen",
    description:
      "First tests for beep codes, dead PSUs, and 'it turns on but I see nothing' — before you replace a motherboard.",
    estimatedMinutes: 24,
    conceptIds: ["C1-D5-O1-POST", "C1-D5-O1-NOPOWER"],
    prerequisites: [],
    lastVerified: "2026-09-01",
    sources: ["c1-obj-3.0", "comptia-a-v15"],
    blocks: [
      {
        type: "callout",
        id: "C1-D5-O1-L1-why",
        callout: {
          kind: "why",
          title: "Why this matters",
          body: "Domain 5 is 28% of Core 1. The exam will not ask you to recite a six-step method. It will ask what you do FIRST when a tower is silent, when it beeps, or when fans spin and the display stays black.",
        },
      },
      {
        type: "reading",
        id: "C1-D5-O1-L1-r1",
        title: "Separate 'no power' from 'no picture'",
        markdown: `Start with what the chassis is doing, not with a part you happen to have on the shelf.

**No power** means no fans, no lights, no disk spin, nothing. Confirm the obvious in an order that costs nothing: wall outlet (try a known-good lamp), power strip / UPS switch, the PC's rear PSU switch, the front-panel power button (a loose **PWR_SW** header is a classic "dead" machine), and the 24-pin plus CPU EPS (4/8-pin) connectors. A modular PSU with a cable that looks ATX but is from another brand can fail to start or can damage a board — use the cables that shipped with that PSU.

If the wall is live and the PSU switch is on, a **paperclip test** (jump the green PS_ON wire to ground on a 24-pin, only on a PSU that is not attached to a board if policy allows) tells you whether the PSU can spin a fan. Many shops skip paperclips and substitute a known-good PSU because modern PSUs and motherboards handshake. Either way, the FIRST action is still *external power path*, not "replace motherboard."

**Power but blank screen** is a different ticket. Fans spin, case LEDs light, you may hear a single beep (or none — many UEFI boards are silent on success). Then: confirm the display has power and the correct **input source**, reseat the video cable, try the motherboard HDMI/DisplayPort if a GPU is installed (the CPU may have no iGPU, or the BIOS may have the discrete GPU as primary), reseat RAM (try one stick in the manufacturer-preferred slot), and reseat the GPU. A board with **POST status LEDs** or a hex debug display is telling you CPU / DRAM / VGA / BOOT. Use that. Do not ignore a DRAM LED and replace the CPU.

**POST (power-on self-test)** is firmware checking CPU, RAM, video, and keyboard before handing off to the boot device. **Beep codes** are vendor-specific. AMI versus Phoenix versus a Dell chassis LED are not one universal table you must memorize. You *must* know that a repeating beep or a documented RAM beep means "check memory before you RMA the board," and that no beep plus no video with fans at full tilt often means the CPU is not posting — check power to the CPU, bent socket pins, and that the cooler is seated (a CPU that overheats in three seconds will look like a no-POST).

Crash screens (Windows bugcheck, kernel panic) after POST succeeded are OS or driver territory once you have ruled out new RAM and a GPU that dies under load. A crash *during* POST is firmware/hardware.`,
      },
      {
        type: "diagram",
        id: "C1-D5-O1-L1-d1",
        component: "MotherboardDiagram",
        title: "Power path and POST checkpoints",
        caption:
          "Wall → PSU switch → 24-pin and EPS → CPU/RAM/GPU → firmware POST → display.",
        notice:
          "Notice the display is late in the chain. A black monitor does not prove a dead PSU if the fans already spun up.",
        alt: "Motherboard outline with 24-pin, EPS, DIMM slots, GPU slot, and POST LED labels.",
      },
      {
        type: "knowledge-check",
        id: "C1-D5-O1-L1-kc1",
        questionIds: ["C1-D5-O1-NOPOWER-Q001"],
      },
      {
        type: "reading",
        id: "C1-D5-O1-L1-r2",
        title: "Beeps, codes, and the first swap",
        markdown: `A **single short beep** on many award-era BIOS chips meant success. Modern boards often beep zero times on success and light a green BOOT LED. Treat vendor docs as the source of truth; treat memory as the first suspect when the code says RAM.

**Reseat before replace.** DIMMs that walked out of the slot after a move, a GPU that is not fully in the PCIe slot, and a 24-pin that is one pin off will all imitate a dead board. Work with power disconnected, on an ESD-safe bench.

**Minimal boot** is the technician's friend: onboard video or one GPU, one RAM stick, no extra USB devices, no extra storage. If it POSTs, add parts back. If it never POSTs, swap RAM, then PSU, then try a known-good CPU only after you have a reason.

**Sluggish performance** after a successful boot is not a POST problem. It is thermal throttling, a dying disk, or a process — later in this objective and in 5.2.

**Application crashes** that are random across many apps, especially after a RAM upgrade or a move, point at memory. Run a memory diagnostic. One app crashing is that app.

Do not skip **safety**: a PSU that ticks, smells like ozone, or has a bulging case is a replace, not a paperclip toy. Internal capacitors can hold charge. You are not servicing the PSU; you are swapping the unit.`,
      },
      {
        type: "table",
        id: "C1-D5-O1-L1-t1",
        title: "Symptom → FIRST check",
        headers: ["Symptom", "FIRST", "Not first"],
        rows: [
          [
            "No lights, no fans",
            "Outlet, strip, PSU switch, 24-pin/EPS, front-panel SW",
            "New motherboard",
          ],
          [
            "Fans spin, black screen, DRAM LED",
            "Reseat/try one known-good DIMM",
            "Reinstall Windows",
          ],
          [
            "Fans spin, black screen, VGA LED",
            "Reseat GPU, try onboard output, known-good display",
            "New CPU",
          ],
          [
            "Repeating beep, vendor RAM code",
            "Reseat/replace RAM",
            "New PSU",
          ],
          [
            "Power button does nothing, PSU switch on, outlet live",
            "Front-panel header / known-good PSU",
            "Format disk",
          ],
        ],
      },
      {
        type: "lab",
        id: "C1-D5-O1-L1-lab",
        labId: "C1-D3-O5-MOBO-LAB",
        title: "Motherboard explorer (power and POST context)",
        prompt:
          "Find the 24-pin, EPS CPU power, DIMM slots, and front-panel header. A no-power ticket lives on those parts, not on the M.2 slot.",
      },
      {
        type: "knowledge-check",
        id: "C1-D5-O1-L1-kc2",
        questionIds: ["C1-D5-O1-POST-Q001"],
      },
      {
        type: "callout",
        id: "C1-D5-O1-L1-exam",
        callout: {
          kind: "exam",
          title: "Exam lens",
          body: "FIRST is almost never 'replace the motherboard.' FIRST is isolate: power path, display path, one stick of RAM, vendor POST LED.",
        },
      },
      {
        type: "summary",
        id: "C1-D5-O1-L1-sum",
        bullets: [
          "No power ≠ no video. Split the tickets.",
          "POST beeps and debug LEDs point at a subsystem; RAM is the frequent flyer.",
          "Reseat power, RAM, and GPU before you RMA a board.",
          "Minimal boot is how you stop guessing.",
        ],
      },
    ],
  },
  {
    id: "C1-D5-O1-L2",
    objectiveId: "C1-D5-O1",
    slug: "heat-caps-cmos",
    title: "Heat, capacitors, CMOS, noise, and smell",
    description:
      "Overheating shutdowns, swollen caps, wrong date/time, grinding fans, and burning smells — mapped to a next action.",
    estimatedMinutes: 22,
    conceptIds: [
      "C1-D5-O1-OVERHEAT",
      "C1-D5-O1-CAPACITOR",
      "C1-D5-O1-CMOS",
      "C1-D5-O1-POST",
    ],
    prerequisites: ["C1-D5-O1-L1"],
    lastVerified: "2026-09-01",
    sources: ["c1-obj-3.0", "comptia-a-v15"],
    blocks: [
      {
        type: "callout",
        id: "C1-D5-O1-L2-why",
        callout: {
          kind: "why",
          title: "Why this matters",
          body: "A PC that works for ten minutes and then dies is rarely 'Windows.' It is heat, a dying PSU, or RAM that fails when warm. If you reimage first, you will reimage again next week.",
        },
      },
      {
        type: "reading",
        id: "C1-D5-O1-L2-r1",
        title: "Thermal and electrical failure modes",
        markdown: `**Overheating** shows up as sluggish performance (CPU/GPU **thermal throttling**), random shutdowns, reboots under load, and a chassis that is too hot to rest a hand on. FIRST: look at the cooler. A CPU heatsink that is rocking, dried thermal paste, a fan header on SYS_FAN instead of CPU_FAN (many boards refuse to POST or throttle immediately), dust-clogged heatsinks, and a laptop sitting on a blanket are more common than a "bad CPU."

Check BIOS/UEFI temperatures and fan RPM. If CPU temp climbs through 90 °C in a minute at idle, the cooler is not coupled. If it is fine at idle and dies in a game, check GPU cooler and case airflow. Laptop shutdowns in the user's lap are often vents blocked; ask where the machine sits.

**Random shutdowns** without heat can be a PSU that droops on the 12 V rail under load, a failing wall circuit, or a crash that looks like a power loss (check Event Viewer for Kernel-Power 41 *after* you have ruled out heat — Core 2 will go deeper on logs). On Core 1, a burning smell plus shutdown is power delivery until proven otherwise.

**Burning smell / ozone / smoke:** power off, unplug, do not keep powering on "to see the error." Inspect the PSU, GPU, and board for scorch. Replace the failed assembly. Do not "just change the thermal paste" on a scorched VRM.

**Unusual noise:** grinding or squeal from a fan (replace the fan; do not oil it as a professional fix), clicking from a drive (5.2, not the motherboard), coil whine from a GPU (annoying, often not a failure), and rattling from a loose heatsink or a cable in a fan.

**Capacitor swelling:** electrolytic capacitors on older PSUs and some boards bulge at the top or leak. They are a visual diagnosis. Replace the PSU or the board; do not "recap" a customer PSU at the help desk. Modern boards use more solid caps; you will still see swell on cheap PSUs and older hardware.

**Crash screens and application crashes** that correlate with heat or with a RAM upgrade: test memory, reseat, try known-good DIMMs, check XMP/DOCP profiles that are unstable. Wrong date/time after every unplug is the **CMOS battery** (CR2032) or a firmware clock that never got NTP — next reading.`,
      },
      {
        type: "diagram",
        id: "C1-D5-O1-L2-d1",
        component: "PsuRailsDiagram",
        title: "Heat and power delivery",
        caption:
          "CPU cooler, VRM area, 12 V rail to EPS and PCIe, and the CMOS battery are separate failure points with overlapping 'it died' stories.",
        notice:
          "Notice a swollen capacitor on a PSU is a PSU replacement, not a BIOS setting. Notice a CMOS battery does not cause thermal shutdown.",
        alt: "PSU rails and motherboard power delivery with CMOS battery and capacitor callouts.",
      },
      {
        type: "knowledge-check",
        id: "C1-D5-O1-L2-kc1",
        questionIds: ["C1-D5-O1-OVERHEAT-Q001"],
      },
      {
        type: "reading",
        id: "C1-D5-O1-L2-r2",
        title: "Wrong date, CMOS, and firmware clocks",
        markdown: `If a PC **loses date and time** whenever it is unplugged, the **CMOS battery** is the FIRST suspect. UEFI settings may also reset to defaults: boot order, virtualization toggles, fan curves. Replace the CR2032 with power removed, then set firmware time or let the OS NTP-sync.

If the clock is wrong only in one OS and NTP is blocked, that is a network/policy issue, not a battery. If the clock is hours off after every sleep on a laptop, check time zone and Fast Startup before you open the chassis.

**Sluggish** plus a screaming CPU fan after a paste job you did not do: someone left the plastic pull-tab on the cooler, or they used toothpaste. Inspect.

**Intermittent** boots that fail when the room is hot and succeed in the morning: thermal, not "Windows update." Log temperatures.

Document what you measured: idle temp, load temp, which fan header, whether the CMOS lost settings, whether the smell was the PSU. The next technician needs those numbers.`,
      },
      {
        type: "table",
        id: "C1-D5-O1-L2-t1",
        title: "Heat, power, clock",
        headers: ["Symptom", "Likely subsystem", "FIRST / NEXT"],
        rows: [
          ["Shuts down under load, CPU 95 °C", "Cooler / paste / dust / header", "Reseat cooler, check CPU_FAN RPM"],
          ["Burns smell, PSU ticks", "PSU", "Unplug; replace PSU; do not paperclip a scorched unit"],
          ["Clock resets when unplugged", "CMOS battery", "Replace CR2032, confirm UEFI settings remain"],
          ["Bulging caps on PSU", "PSU", "Replace the PSU"],
          ["Random app crashes after RAM upgrade", "Memory / XMP", "Memtest; try stock JEDEC speeds"],
          ["Grinding from chassis", "Fan or HDD", "Localize with a paper tube; replace fan or see 5.2"],
        ],
      },
      {
        type: "callout",
        id: "C1-D5-O1-L2-safety",
        callout: {
          kind: "safety",
          title: "Safety",
          body: "Smoke, spark, or a hot PSU case: disconnect mains. Capacitors store charge. You replace field-replaceable units; you do not probe a live PSU primary.",
        },
      },
      {
        type: "knowledge-check",
        id: "C1-D5-O1-L2-kc2",
        questionIds: ["C1-D5-O1-CAPACITOR-Q001", "C1-D5-O1-CMOS-Q001"],
      },
      {
        type: "callout",
        id: "C1-D5-O1-L2-tech",
        callout: {
          kind: "technician",
          title: "Technician lens",
          body: "Ask how long after power-on it fails, whether it fails only in games, and whether the clock is wrong. Those three answers split heat, GPU/PSU load, and CMOS.",
        },
      },
      {
        type: "summary",
        id: "C1-D5-O1-L2-sum",
        bullets: [
          "Overheating: cooler seating, paste, dust, CPU_FAN header, laptop vents.",
          "Smell and smoke: kill power, replace the scorched FRU (usually PSU).",
          "Swollen capacitors: replace the PSU or board; do not run it.",
          "Clock/settings lost on unplug: CMOS battery.",
        ],
      },
      {
        type: "checkpoint",
        id: "C1-D5-O1-L2-cp",
        questionIds: [
          "C1-D5-O1-POST-Q002",
          "C1-D5-O1-NOPOWER-Q002",
          "C1-D5-O1-OVERHEAT-Q002",
          "C1-D5-O1-CAPACITOR-Q002",
          "C1-D5-O1-CMOS-Q002",
          "C1-D5-O1-POST-Q006",
          "C1-D5-O1-OVERHEAT-Q006",
          "C1-D5-O1-NOPOWER-Q007",
        ],
      },
    ],
  },
  {
    id: "C1-D5-O2-L1",
    objectiveId: "C1-D5-O2",
    slug: "smart-clicking-boot",
    title: "SMART, clicking disks, and missing boot devices",
    description:
      "Read drive health, mechanical failure sounds, 'boot device not found,' corruption, and slow I/O without blaming the OS first.",
    estimatedMinutes: 22,
    conceptIds: ["C1-D5-O2-SMART", "C1-D5-O2-CLICKING", "C1-D5-O2-IOPS"],
    prerequisites: ["C1-D5-O1-L2"],
    lastVerified: "2026-09-01",
    sources: ["c1-obj-3.0", "comptia-a-v15"],
    blocks: [
      {
        type: "callout",
        id: "C1-D5-O2-L1-why",
        callout: {
          kind: "why",
          title: "Why this matters",
          body: "A SMART failing flag is a replace-the-drive event with a backup first. A clicking HDD is the same. Reimaging a dying disk is how you lose the last good copy.",
        },
      },
      {
        type: "reading",
        id: "C1-D5-O2-L1-r1",
        title: "Health telemetry and mechanical death",
        markdown: `**S.M.A.R.T. (Self-Monitoring, Analysis, and Reporting Technology)** is the drive reporting on itself: reallocated sectors, pending sectors, uncorrectable counts, SSD percentage used, temperature. A firmware **SMART failure / predicted failure** in BIOS, CrystalDiskInfo-class tools, \`wmic diskdrive get status\`, or the vendor SSD tool means **backup now, replace the drive**. Clearing the SMART flag is not a repair.

SSDs rarely click. They fail as disappearing capacity, a flood of reallocated spare blocks, sudden read-only mode, or a device that is gone from the bus. NVMe drives show health in the vendor tool and in the OS storage page. A drive that vanishes when the machine is warm can be a bad M.2 seating, a thermal throttle, or a dying controller — reseat and check SMART before you reinstall Windows.

**Clicking** and **grinding** on a spinning HDD are mechanical: heads, actuator, or bearings. Power down. Do not run chkdsk in a loop "to fix the click." Image if the data is valuable and the shop has a process; otherwise replace and restore from backup. RAID is not a backup (you already heard this in 3.4; it is still true when the array is clicking).

**LED status:** a drive activity LED stuck on or a RAID controller LED that is amber is a clue. On NAS boxes, match the bay the controller names to the physical bay before you pull a disk.

**Boot device not found** after POST: firmware lost the disk, the SATA/NVMe cable or slot failed, the disk failed, or the boot order points at an empty USB stick. FIRST: look in UEFI whether the disk enumerates. If it is missing in firmware, it is not an OS problem. Reseat NVMe, swap SATA cable and port, try a known-good disk. If the disk enumerates but Windows boot files are gone, that is repair/restore — still back up first if the volume is readable.

**Corruption** (garbled files, NTFS errors, raw partition) can be filesystem damage on a healthy disk or a disk that is dying. Check SMART *before* a format. Slow **IOPS**, apps that hang on save, and a disk queue that never drains are storage until proven otherwise — Task Manager disk 100% with an HDD that used to be fine is often the disk, not "Chrome."`,
      },
      {
        type: "diagram",
        id: "C1-D5-O2-L1-d1",
        component: "RaidArrayDiagram",
        title: "Drive path from firmware to volume",
        caption:
          "Physical disk → cable/slot → controller → firmware boot order → OS volume. SMART lives on the disk; boot order lives in firmware.",
        notice:
          "Notice 'boot device not found' with the disk missing in UEFI is hardware. The same message with the disk visible is boot configuration.",
        alt: "Flow from HDD/SSD/NVMe through controller firmware to the OS, with a SMART status flag.",
      },
      {
        type: "knowledge-check",
        id: "C1-D5-O2-L1-kc1",
        questionIds: ["C1-D5-O2-SMART-Q001"],
      },
      {
        type: "reading",
        id: "C1-D5-O2-L1-r2",
        title: "Slow I/O and missing drives",
        markdown: `**Slow IOPS** on an HDD that is 95% full and heavily fragmented is expected poverty, not a unique mystery. The same symptom on an NVMe that is two years old with 100% life used is a dying or worn SSD. TRIM, free space, and a firmware update from the vendor are legitimate SSD hygiene; they do not resurrect a SMART-failing device.

A **missing drive** in Disk Management but present in UEFI can be a driver or a signature collision. A missing drive in UEFI is cable, slot, power (SATA power from a modular PSU), or the disk. USB enclosures that drop 4 TB disks are adapter problems — try another enclosure before you reimage.

Do not confuse a **failed OS** (bootmgr missing on a healthy disk) with a **failed disk** (disk not in firmware, SMART fail, click). The FIRST fork is: does firmware see the drive? If yes and SMART is healthy, you are in boot-order / boot-files territory. If no, reseat and swap the path. A degraded RAID 5 that still serves data will feel "down" because every read may reconstruct from parity — that is slow IOPS with an explanation, not a missing volume.`,
      },
      {
        type: "table",
        id: "C1-D5-O2-L1-t1",
        title: "Storage symptoms",
        headers: ["Symptom", "Means", "FIRST action"],
        rows: [
          ["SMART predicted failure", "Drive is dying", "Backup, replace, restore"],
          ["Click / grind (HDD)", "Mechanical failure", "Power down; replace; do not chkdsk-loop"],
          ["Not in UEFI device list", "Path or disk dead", "Reseat cable/NVMe; try other port"],
          ["In UEFI, not booting", "Boot files / order / OS", "Confirm boot order, then repair/restore"],
          ["Disk 100%, huge queue", "I/O starvation or dying disk", "SMART + what process; do not ignore SMART"],
        ],
      },
      {
        type: "knowledge-check",
        id: "C1-D5-O2-L1-kc2",
        questionIds: ["C1-D5-O2-CLICKING-Q001", "C1-D5-O2-IOPS-Q001"],
      },
      {
        type: "callout",
        id: "C1-D5-O2-L1-mistake",
        callout: {
          kind: "mistake",
          title: "Common mistake",
          body: "Running a full format to 'fix SMART.' Format does not remap a dying head stack. You erase the last salvageable files.",
        },
      },
      {
        type: "summary",
        id: "C1-D5-O2-L1-sum",
        bullets: [
          "SMART fail = backup and replace, not clear the flag.",
          "Clicking HDDs are mechanical; stop using them.",
          "Firmware inventory splits 'dead disk' from 'broken boot files.'",
          "Slow IOPS needs SMART plus a look at queue length — not a guess about Chrome.",
        ],
      },
    ],
  },
  {
    id: "C1-D5-O2-L2",
    objectiveId: "C1-D5-O2",
    slug: "raid-failure-console",
    title: "Degraded RAID, missing arrays, and alarms",
    description:
      "Read a RAID console: failed disk versus failed array, rebuilds, RAID 0 data loss, and why RAID is still not a backup.",
    estimatedMinutes: 22,
    conceptIds: ["C1-D5-O2-RAIDFAIL", "C1-D5-O2-SMART", "C1-D5-O2-IOPS"],
    prerequisites: ["C1-D5-O2-L1"],
    lastVerified: "2026-09-01",
    sources: ["c1-obj-3.0", "comptia-a-v15"],
    blocks: [
      {
        type: "callout",
        id: "C1-D5-O2-L2-why",
        callout: {
          kind: "why",
          title: "Why this matters",
          body: "Pulling the wrong disk from a degraded RAID 5 is how you turn a surviving array into a restore-from-backup event. The console, the bay LED, and the controller log are the map.",
        },
      },
      {
        type: "reading",
        id: "C1-D5-O2-L2-r1",
        title: "What 'RAID failed' actually means",
        markdown: `An array can be **online**, **degraded** (redundant set running without one or more members), **rebuilding**, or **failed/offline** (too many disks gone for that RAID level).

Recall from hardware domain 3.4:

- **RAID 0** stripe: any disk loss is total data loss for the volume. There is no degraded mode that still serves data.
- **RAID 1** mirror: one disk can fail; replace and rebuild.
- **RAID 5** stripe + parity: one disk can fail; a second failure during rebuild is a common disaster.
- **RAID 6** dual parity: two disks can fail.
- **RAID 10** striped mirrors: can survive one disk per mirror pair; two disks in the *same* pair kill that stripe.

**Missing array** after a power event: controllers that lose the array config (failed BBU/cache, wrong controller after a swap, foreign configuration) may show disks as JBOD. Do not initialize. Import **foreign config** if that is the vendor's documented recovery. Initialization is a wipe.

**Alarms** on a server or NAS are for a reason. Silence the beep only after you identify the bay. Hot-swap the failed disk with a matching or vendor-approved spare. A rebuild hammers every remaining disk; if they are the same age, a second failure is likely — that is why RAID is not a backup and why you watch SMART on the survivors.

**Slow IOPS** on a degraded RAID 5 is expected: every read may need parity reconstruction. Users will say "the server is down" when it is actually degraded and crawling. Tell them the truth and replace the disk.

A **failed disk** is not automatically a **failed array**. Replace the disk the controller named. If you pull a healthy disk from a degraded RAID 5, you have now pulled two, and RAID 5 is done.`,
      },
      {
        type: "diagram",
        id: "C1-D5-O2-L2-d1",
        component: "RaidArrayDiagram",
        title: "Degraded versus failed",
        caption:
          "RAID 5 with one red disk is degraded and still online. RAID 0 with one red disk is dead data. RAID 6 with one red disk is still redundant.",
        notice:
          "Notice the hot-spare sitting idle. A spare that never kicked in is a config problem, not a miracle.",
        alt: "RAID 0, 1, 5, 6, and 10 arrays with one disk marked failed and the resulting status.",
      },
      {
        type: "knowledge-check",
        id: "C1-D5-O2-L2-kc1",
        questionIds: ["C1-D5-O2-RAIDFAIL-Q001"],
      },
      {
        type: "lab",
        id: "C1-D5-O2-L2-lab",
        labId: "C1-D3-O4-RAID-LAB",
        title: "RAID builder and failure console",
        prompt:
          "Build RAID 0, 1, 5, 6, and 10. Fail one disk, then a second. Watch which arrays stay online, which go degraded, and which lose the volume. RAID is not a backup.",
      },
      {
        type: "reading",
        id: "C1-D5-O2-L2-r2",
        title: "Technician order of operations",
        markdown: `1. Identify the controller (Windows Storage Spaces, Intel RST, hardware RAID BIOS, NAS UI). Mixing tools is how people initialize the wrong volume.
2. Read status: which bay, which serial, degraded versus failed versus rebuilding.
3. Confirm backup *before* you touch disks if the array is already one failure from death.
4. Replace the failed member with a vendor-approved spare; start rebuild; do not reboot for sport.
5. Watch SMART on remaining disks — rebuilds hammer old members of the same age.
6. Document slot, serial, firmware, and that RAID is still not the backup.

**Missing drives** in an array after a cable bump on a DAS shelf are often a path issue. Reseat SAS/SATA, check the expander, then decide a disk is dead. A foreign configuration after a controller swap is import, not initialize.

Do not convert RAID levels in place to "fix" a failure. Do not run a disk optimizer on the RAID volume as a first action. Do not ignore a predictive SMART fail on a disk that is still in an online array — that is your chance to copy data *before* degraded mode. RAID 0 has no such chance: one member fails and the volume is gone.`,
      },
      {
        type: "table",
        id: "C1-D5-O2-L2-t1",
        title: "Controller message → action",
        headers: ["Console", "Meaning", "Do"],
        rows: [
          ["Degraded, disk 2 failed", "Redundancy used up (RAID 5) or reduced (RAID 6/10)", "Replace disk 2; rebuild"],
          ["Array failed / offline", "Too many disks gone", "Stop; restore from backup; do not initialize"],
          ["Foreign configuration", "Disks remember an array this controller does not", "Import, do not init"],
          ["Rebuild 3% stalled", "Likely a second disk or bad spare", "Check logs/SMART; do not pull random disks"],
          ["RAID 0 disk error", "Volume is gone", "Restore from backup"],
        ],
      },
      {
        type: "knowledge-check",
        id: "C1-D5-O2-L2-kc2",
        questionIds: ["C1-D5-O2-RAIDFAIL-Q002"],
      },
      {
        type: "callout",
        id: "C1-D5-O2-L2-exam",
        callout: {
          kind: "exam",
          title: "Exam lens",
          body: "FIRST on a chirping RAID server is identify the failed member, not pull the first disk you see. NEXT is replace and rebuild, after backup if the array is already one failure from death.",
        },
      },
      {
        type: "summary",
        id: "C1-D5-O2-L2-sum",
        bullets: [
          "Degraded ≠ failed. Know the RAID level before you pull a disk.",
          "RAID 0 has no degraded mode with data intact.",
          "Foreign config: import. Initialize: wipe.",
          "Rebuilds stress old disks; RAID is still not a backup.",
        ],
      },
      {
        type: "checkpoint",
        id: "C1-D5-O2-L2-cp",
        questionIds: [
          "C1-D5-O2-SMART-Q002",
          "C1-D5-O2-CLICKING-Q002",
          "C1-D5-O2-RAIDFAIL-Q003",
          "C1-D5-O2-IOPS-Q002",
          "C1-D5-O2-RAIDFAIL-Q006",
          "C1-D5-O2-SMART-Q006",
          "C1-D5-O2-CLICKING-Q005",
        ],
      },
    ],
  },
  {
    id: "C1-D5-O3-L1",
    objectiveId: "C1-D5-O3",
    slug: "display-projector-faults",
    title: "Displays and projectors: source to pixel",
    description:
      "Wrong input, cables, dead pixels, burn-in, color, dim bulbs, projector thermal shutdown, and audio that follows HDMI.",
    estimatedMinutes: 24,
    conceptIds: [
      "C1-D5-O3-SOURCE",
      "C1-D5-O3-BURNIN",
      "C1-D5-O3-DEADPIXEL",
      "C1-D5-O3-PROJECTOR",
    ],
    prerequisites: ["C1-D5-O2-L2"],
    lastVerified: "2026-09-01",
    sources: ["c1-obj-3.0", "comptia-a-v15"],
    blocks: [
      {
        type: "callout",
        id: "C1-D5-O3-L1-why",
        callout: {
          kind: "why",
          title: "Why this matters",
          body: "Conference-room tickets are usually input source, a cable, or a lamp hour counter — not a new projector. Treating every blank screen as a GPU failure is how you miss the HDMI-2 button.",
        },
      },
      {
        type: "reading",
        id: "C1-D5-O3-L1-r1",
        title: "Source, cable, then panel",
        markdown: `**Wrong source / input** is the FIRST check on a TV, capture bar, or projector that "has no signal." Cycle HDMI 1/2/3, DisplayPort, and the projector's search. Confirm the laptop actually sent output (Windows+P / macOS display mirroring, closed-lid clamshell with a dock). A laptop that is set to "PC screen only" is not a failed projector bulb.

**Cabling:** reseat, swap a known-good cable, try another port on the GPU and on the display. HDMI/DisplayPort handshake failures look like black screens or flashing. Adapters (USB-C to HDMI, DP to DVI) fail more often than native cables. A 4K@60 display on a cheap HDMI 1.4 cable will flash or drop to 30 Hz — that is a cable/standard mismatch, not a dying panel.

**Fuzzy / out of focus / sizing / distortion:** on a projector, use focus and keystone and throw distance; on a monitor, check resolution versus native (a 1080p image stretched on a 1440p panel looks soft). Overscan on a TV hides the taskbar. Low resolution on a GPU that just dropped driver is software; the same blur on a projector with a dirty lens is a cloth, not a driver.

**Dead pixels** are stuck off (black) or stuck on (always red/green/blue). They do not move. **Stuck pixels** sometimes recover with pixel-massage tools; dead pixels are panel lottery or warranty. **Burn-in / image retention** is a ghost of a static taskbar or a channel logo. OLED and plasma-class emissive panels, and some projectors, are at risk. LCD image retention often fades; true OLED burn-in is damage. Screen savers, pixel shifting, and hiding static UI are prevention.

**Flashing** screen: cable, refresh rate the panel hates, a dying backlight inverter on old CCFL LCDs, or a GPU under load. Isolate with another cable and another display.

**Color** wrong: color profile, a bent pin on VGA (if you still meet analog), a failing GPU, or a projector color wheel (DLP rainbow / odd tint). Try another cable and a second monitor before you RMA the GPU.

**Audio:** HDMI and DisplayPort carry audio. "Projector has picture, no sound" is often Windows outputting to the laptop speakers instead of the HDMI device, or the projector muted. It is not a lamp.

**Dim image:** brightness setting, laptop power-saver, a dying CCFL backlight, a worn projector **lamp/bulb**, or a dirty filter. Projectors log **lamp hours**. A dim, pink, or flickering projector with high hours is a lamp (and often a filter clean), not a new HDMI card.`,
      },
      {
        type: "diagram",
        id: "C1-D5-O3-L1-d1",
        component: "DisplayFaultDiagram",
        title: "Fault gallery",
        caption:
          "Wrong source, dead pixels, burn-in, dim lamp, color shift, and keystone distortion are visually different on purpose.",
        notice:
          "Notice burn-in is a stable ghost of UI chrome. Dead pixels are tiny and fixed. A dim projector is the whole image, not a corner of stuck pixels.",
        alt: "Six display/projector fault samples: no-signal, dead pixels, burn-in, dim lamp, color error, and keystone.",
      },
      {
        type: "knowledge-check",
        id: "C1-D5-O3-L1-kc1",
        questionIds: ["C1-D5-O3-SOURCE-Q001"],
      },
      {
        type: "reading",
        id: "C1-D5-O3-L1-r2",
        title: "Projectors: heat, lamps, and shutdown",
        markdown: `**Projector shutdown** after a few minutes is almost always **thermal**: blocked vents, filthy filter, failed intake fan, or a lamp house that is over-temp. FIRST: power down, let it cool, check the filter and the "do not unplug while cooling" rule. Yanking power during the cool-down cycle is how you kill the lamp and the fan logic.

A **bulb** that will not strike (no light, clicking, or a lamp error LED) is a lamp or ballast/driver. Replace with the correct lamp assembly; cheap no-name lamps fail early and can be a fire risk.

**Sizing** that will not fill the screen is throw distance and zoom, not a PC resolution problem, once you have set the PC to the projector's native resolution.

Intermittent HDMI in a ceiling-mount is often the cable in the conduit or a loose lock. Try a short known-good cable at the lectern before you open the ceiling.

Laptop **privacy screens** and low-brightness outdoor use are not projector faults. Ask whether the symptom is on the internal panel, the external, or both — that one question splits GPU/cable from the internal display (inverter/backlight/digitizer, which 5.4 will pick up for mobiles).`,
      },
      {
        type: "table",
        id: "C1-D5-O3-L1-t1",
        title: "Display ticket → FIRST",
        headers: ["Symptom", "FIRST", "Avoid"],
        rows: [
          ["No signal on projector", "Input source, Win+P, known-good cable", "New projector"],
          ["Dim projector, high lamp hours", "Lamp + filter", "New HDMI cable as the only action"],
          ["Shuts off at 8 minutes, hot air", "Filter, vents, cool-down", "Keep restarting"],
          ["One black pixel that never moves", "Dead pixel / warranty policy", "Reinstall GPU driver"],
          ["Ghost of the taskbar on OLED", "Burn-in / retention", "New HDMI cable"],
          ["Picture, no audio on HDMI display", "Windows sound output device", "New speakers first"],
        ],
      },
      {
        type: "knowledge-check",
        id: "C1-D5-O3-L1-kc2",
        questionIds: ["C1-D5-O3-PROJECTOR-Q001", "C1-D5-O3-BURNIN-Q001"],
      },
      {
        type: "callout",
        id: "C1-D5-O3-L1-exam",
        callout: {
          kind: "exam",
          title: "Exam lens",
          body: "If both an external monitor and the laptop panel fail, think GPU/cable/OS. If only the projector in room 12 fails, think source, cable, lamp, or that room's filter.",
        },
      },
      {
        type: "summary",
        id: "C1-D5-O3-L1-sum",
        bullets: [
          "Source and cable before panel or lamp.",
          "Dead pixels stay put; burn-in is a ghost of static UI; dim projectors are lamps and filters.",
          "Thermal shutdown: filter and cool-down, not a loop of power-cycles.",
          "HDMI audio is an output-device setting as often as it is hardware.",
        ],
      },
      {
        type: "checkpoint",
        id: "C1-D5-O3-L1-cp",
        questionIds: [
          "C1-D5-O3-SOURCE-Q002",
          "C1-D5-O3-BURNIN-Q002",
          "C1-D5-O3-DEADPIXEL-Q001",
          "C1-D5-O3-PROJECTOR-Q002",
          "C1-D5-O3-SOURCE-Q006",
          "C1-D5-O3-PROJECTOR-Q006",
          "C1-D5-O3-DEADPIXEL-Q005",
        ],
      },
    ],
  },
  {
    id: "C1-D5-O4-L1",
    objectiveId: "C1-D5-O4",
    slug: "battery-swell-liquid-digitizer",
    title: "Swollen batteries, liquid, digitizers, and ports",
    description:
      "Inspect phones and laptops for swell, charging faults, liquid damage, broken screens versus digitizers, and destroyed connectors.",
    estimatedMinutes: 22,
    conceptIds: ["C1-D5-O4-SWELL", "C1-D5-O4-DIGITIZER", "C1-D5-O4-LIQUID"],
    prerequisites: ["C1-D5-O3-L1"],
    lastVerified: "2026-09-01",
    sources: ["c1-obj-3.0", "comptia-a-v15"],
    blocks: [
      {
        type: "callout",
        id: "C1-D5-O4-L1-why",
        callout: {
          kind: "why",
          title: "Why this matters",
          body: "A swollen laptop battery can crack a palm rest and then a fire policy. You do not 'just push the trackpad back down.' You power off, do not charge, and treat it as a hazardous replacement.",
        },
      },
      {
        type: "reading",
        id: "C1-D5-O4-L1-r1",
        title: "Battery health versus battery emergency",
        markdown: `**Battery health** declining (80% design capacity, short runtime) is a planned replacement. **Swollen batteries** are an emergency: the pouch has off-gassed. Look for a trackpad that clicks when you did not press it, a lid that will not sit flush, a phone that rocks on a table, or a screen lifting at one corner.

FIRST: power off, disconnect power, do not puncture, do not charge, do not put it in a pocket. Replace with a vendor-correct pack; recycle the swollen cell as damaged lithium — not in general trash. On many ultrabooks the "battery" is glued; follow OEM procedure. Forcing a swollen pack is how people crack displays.

**Charging problems:** try a known-good cable and brick (USB-C PD negotiation fails on cheap cables), inspect the port for lint (phones) or a broken USB-C tongue, confirm the wall outlet, and read whether the OS says "slow charging" or "accessory not supported." A laptop that only charges when the barrel jack is held at an angle has a broken DC jack — not a new motherboard as FIRST.

**Broken screen versus digitizer:** the LCD/OLED can be smashed while touch still works, or the glass/digitizer can shatter while the image is intact. On a phone, those layers may be fused (one part). On some laptops, the inverter/backlight can die (very dim image, visible with a flashlight) while the digitizer still clicks. A flashlight test on a "black" laptop panel is a classic FIRST: if you see a faint desktop, it is backlight/inverter/LED driver, not a dead GPU.

**Digitizer** faults: touch in the wrong place, no touch with a good picture, ghost touches. Ghost touches after a swell are the battery deforming the pad. Ghost touches after a drop may be a cracked digitizer. **Cursor drift** on a laptop can be a dying pointing stick, a worn trackpad, or a user resting a wrist — test an external mouse FIRST.

**Damaged ports:** USB-C that is loose, Lightning with bent pins, a headphone jack full of pocket lint. Do not "wiggle until it charges" as a repair. Replace the board or port assembly. Data/charging only on one orientation of USB-C is a damaged receptacle.`,
      },
      {
        type: "diagram",
        id: "C1-D5-O4-L1-d1",
        component: "LaptopExplodedDiagram",
        title: "Where swell and ports live",
        caption:
          "Battery under the palm rest, display stack (panel + digitizer + camera), and the I/O board with DC jack and USB-C.",
        notice:
          "Notice a swollen cell lifts the trackpad from below. That is not a trackpad firmware update.",
        alt: "Exploded laptop showing battery, display stack, and I/O ports with callouts for swell and digitizer.",
      },
      {
        type: "knowledge-check",
        id: "C1-D5-O4-L1-kc1",
        questionIds: ["C1-D5-O4-SWELL-Q001"],
      },
      {
        type: "reading",
        id: "C1-D5-O4-L1-r2",
        title: "Liquid damage is a process, not a rice myth",
        markdown: `**Liquid damage:** power off, disconnect power, do not charge, do not "see if it still works." Rice does not help and can add starch to ports. If you are the shop: disassemble, inspect for corrosion (green/white on contacts), clean with appropriate electronics procedure, and be honest that liquid is often a board replacement. Laptops with liquid in the keyboard may still kill the motherboard hours later as residue creeps.

Phones with IP ratings are water-*resistant*, not "drop in the pool" warranties. Lightning ports full of liquid should not be charged; many phones show a liquid-detection alert — believe it.

Heat on a phone under a pillow or in a car dash is battery and throttling. Heat plus a swollen back glass is the same emergency as a laptop swell.

**Stylus** that writes offset: Bluetooth pairing, a dead stylus battery, or digitizer calibration — not a new motherboard FIRST. **App will not install** is more often storage full, MDM restriction, or a bad APK/source than a digitizer.`,
      },
      {
        type: "table",
        id: "C1-D5-O4-L1-t1",
        title: "Mobile physical faults",
        headers: ["Symptom", "Think", "FIRST"],
        rows: [
          ["Trackpad sitting proud, lid gap", "Swollen battery", "Power off; do not charge; replace pack"],
          ["Faint image, flashlight shows desktop", "Backlight / inverter", "Do not replace GPU first"],
          ["Image fine, touch dead or offset", "Digitizer", "External mouse/known-good stylus to confirm"],
          ["Liquid alert / wet port", "Liquid", "Do not charge; dry/inspect; no rice as a procedure"],
          ["Charges only if cable is held", "Port or cable", "Known-good cable, then inspect receptacle"],
        ],
      },
      {
        type: "knowledge-check",
        id: "C1-D5-O4-L1-kc2",
        questionIds: ["C1-D5-O4-DIGITIZER-Q001", "C1-D5-O4-LIQUID-Q001"],
      },
      {
        type: "callout",
        id: "C1-D5-O4-L1-safety",
        callout: {
          kind: "safety",
          title: "Safety",
          body: "Do not puncture a swollen lithium pack. Do not toss it in dumpster trash. Do not keep charging a device with liquid-detection warnings.",
        },
      },
      {
        type: "summary",
        id: "C1-D5-O4-L1-sum",
        bullets: [
          "Swell: power off, no charge, hazardous replacement.",
          "Flashlight test splits backlight from GPU/panel.",
          "Digitizer versus panel are different layers; confirm with external input.",
          "Liquid: no rice, no charging, inspect corrosion.",
        ],
      },
    ],
  },
  {
    id: "C1-D5-O4-L2",
    objectiveId: "C1-D5-O4",
    slug: "mobile-malware-performance",
    title: "Mobile malware, heat, apps, and degraded performance",
    description:
      "Separate a dying battery from malware, a bad app, MDM blocks, and a phone that is simply full and hot.",
    estimatedMinutes: 20,
    conceptIds: [
      "C1-D5-O4-MOBILEMALWARE",
      "C1-D5-O4-SWELL",
      "C1-D5-O4-DIGITIZER",
    ],
    prerequisites: ["C1-D5-O4-L1"],
    lastVerified: "2026-09-01",
    sources: ["c1-obj-3.0", "comptia-a-v15", "cisa-phishing"],
    blocks: [
      {
        type: "callout",
        id: "C1-D5-O4-L2-why",
        callout: {
          kind: "why",
          title: "Why this matters",
          body: "A phone that is slow, hot, and draining can be a bad battery, a camera app left in the background, or malware. If you wipe first every time, you will wipe evidence and you will miss the swollen cell.",
        },
      },
      {
        type: "reading",
        id: "C1-D5-O4-L2-r1",
        title: "Malware and 'it just got slow'",
        markdown: `**Mobile malware** symptoms overlap hardware: high data use, ads in the OS UI, apps the user did not install, credential prompts, overheating, and rapid drain. FIRST still includes: what changed, unknown profiles/MDM, sideloaded APKs, and whether the device is enrolled in company management.

Do not jailbreak/root as a repair. Uninstall the odd app, scan with a reputable tool if policy allows, disable unknown sources, and escalate to Core 2's malware process when it is a company device. A factory reset is a valid last step *after* backup of what you still trust; it is not FIRST if the battery is swollen or the digitizer is failing.

**Degraded performance:** storage nearly full (photos, offline maps), too many background refresh apps, an OS update pending on a device that is thermal-throttling, or a battery so worn the OS limits CPU. Check storage, battery health, and whether the device is hot. A laptop with 100% disk from indexing after a restore is not malware by itself.

**Connectivity** (Wi-Fi/Bluetooth/cellular) that dies after liquid or a drop is often an antenna cable (laptops: wires in the hinge) or a failed radio. Airplane mode toggled by a broken switch or a wet keyboard is embarrassing and common.

**App will not install:** full storage, incompatible architecture (x86 APK on ARM without translation), MDM app allow-list, or a broken Play/App Store account. **Stylus** pairing is Bluetooth plus a charged pen; some devices need the pen firmware app.

**Cursor drift** after a Windows update can be a precision-touchpad driver; try an external mouse to prove the OS still works, then roll the driver or disable the pad in firmware if it is ghosting because of swell.`,
      },
      {
        type: "diagram",
        id: "C1-D5-O4-L2-d1",
        component: "PhoneSettingsDiagram",
        title: "Settings that fake hardware faults",
        caption:
          "Battery health, storage, unknown-sources / profiles, airplane mode, and display zoom all produce tickets that sound like broken glass.",
        notice:
          "Notice an MDM profile can block camera and sideload. That is policy, not a dead webcam.",
        alt: "Phone settings panels for battery, storage, profiles, and radios.",
      },
      {
        type: "knowledge-check",
        id: "C1-D5-O4-L2-kc1",
        questionIds: ["C1-D5-O4-MOBILEMALWARE-Q001"],
      },
      {
        type: "reading",
        id: "C1-D5-O4-L2-r2",
        title: "Order that does not destroy evidence",
        markdown: `Use a physical-first order so you do not wipe a device that is actually a swollen cell or a wet port.

1. Look at the device: swell, liquid, cracked glass, port damage, heat discoloration.
2. Ask what changed: drop, pool, new charger, new APK, MDM enrollment, a case that no longer sits flat.
3. Reproduce with known-good parts: OEM brick and cable, external mouse, flashlight test on a black panel, a second stylus.
4. Only then: software — storage, battery health UI, unknown-sources, profiles, malware scan, reset.

Factory reset is a valid last step after you back up what you still trust. It is not FIRST if the battery is swollen, the port is wet, or the digitizer is cracked. Jailbreak/root is not a repair.

Heat under load with a healthy battery and no extra apps can still be a clogged laptop heatpipe (objective 5.1). Domain 5.4 owns the *device as a portable*: battery, screen stack, ports, radios, and the malware that lives there. A slow phone with 2% free storage is not malware by itself. A slow phone with ads in Settings after a sideloaded APK is not a new battery by itself.

Document IMEI/serial, MDM state, the apps you removed, and that you did not charge a wet phone. The next technician should not have to rediscover a liquid-detect alert you already saw.`,
      },
      {
        type: "table",
        id: "C1-D5-O4-L2-t1",
        title: "Slow / hot / drain",
        headers: ["Clue", "Prefer", "Not first"],
        rows: [
          ["Swollen case", "Hardware emergency", "Factory reset"],
          ["New APK from a link, ads in Settings", "Malware / sideload", "New battery only"],
          ["2% storage free", "Free space", "New motherboard"],
          ["Hot only while charging on a cheap brick", "Charger / cable PD", "New screen"],
          ["Wi-Fi dies after hinge repair", "Antenna cable", "New SSD"],
        ],
      },
      {
        type: "knowledge-check",
        id: "C1-D5-O4-L2-kc2",
        questionIds: ["C1-D5-O4-MOBILEMALWARE-Q002"],
      },
      {
        type: "callout",
        id: "C1-D5-O4-L2-exam",
        callout: {
          kind: "exam",
          title: "Exam lens",
          body: "FIRST on a physically damaged device is make it safe (power, no charge). FIRST on a malware-shaped phone is isolate and inspect apps/profiles — not 'buy a battery.'",
        },
      },
      {
        type: "summary",
        id: "C1-D5-O4-L2-sum",
        bullets: [
          "Inspect physical damage before you wipe.",
          "Malware, MDM, full storage, and a worn battery all look 'slow.'",
          "Factory reset is not FIRST on a swollen or wet device.",
          "External mouse and known-good chargers split hardware from OS.",
        ],
      },
      {
        type: "checkpoint",
        id: "C1-D5-O4-L2-cp",
        questionIds: [
          "C1-D5-O4-SWELL-Q002",
          "C1-D5-O4-DIGITIZER-Q002",
          "C1-D5-O4-LIQUID-Q002",
          "C1-D5-O4-MOBILEMALWARE-Q003",
          "C1-D5-O4-SWELL-Q006",
          "C1-D5-O4-LIQUID-Q005",
          "C1-D5-O4-DIGITIZER-Q006",
        ],
      },
    ],
  },
  {
    id: "C1-D5-O5-L1",
    objectiveId: "C1-D5-O5",
    slug: "limited-apipa-dns",
    title: "Limited connectivity, APIPA, and DNS versus the path",
    description:
      "Split a dead cable from a DHCP failure from DNS. Limited, unidentified, 169.254, and 'IP works but names do not.'",
    estimatedMinutes: 24,
    conceptIds: ["C1-D5-O5-LIMITED", "C1-D5-O5-LATENCY"],
    prerequisites: ["C1-D5-O4-L2"],
    lastVerified: "2026-09-01",
    sources: ["c1-obj-3.0", "rfc791"],
    blocks: [
      {
        type: "callout",
        id: "C1-D5-O5-L1-why",
        callout: {
          kind: "why",
          title: "Why this matters",
          body: "Windows 'limited connectivity' is a symptom, not a diagnosis. It might be a patch cable, a dead DHCP scope, or a user who set a static IP in 192.168.0.0/24 on a 10.0.0.0/24 LAN.",
        },
      },
      {
        type: "reading",
        id: "C1-D5-O5-L1-r1",
        title: "A path you can prove",
        markdown: `Work the stack with tests that change what you know.

**Physical:** link light on the NIC and switch. A NIC with no light is cable, port, or NIC — not DNS. Try another cable, another port, a USB-C dongle if the laptop jack is broken. Wi-Fi: correct SSID, signal bars, airplane mode, the right band.

**Addressing:** \`ipconfig /all\` (Windows) or \`ip addr\` / \`ifconfig\`. A **169.254.x.x** address is **APIPA (Automatic Private IP Addressing)** / IPv4 link-local. It means DHCP did not answer. The host can talk to other APIPA hosts on the same L2 segment; it cannot reach a default gateway on 192.168.1.1 because it does not have one. FIRST: is the DHCP server up, is the relay/scope full, is the cable actually on the right VLAN, did someone enable a second DHCP server? \`ipconfig /release\` and \`/renew\` after you have a reason.

A **static** address with the wrong mask or gateway looks like "limited" or "no internet." A correct address with no gateway cannot leave the subnet.

**Limited / unidentified network** on Windows often means no DHCP, failed NLA, or a portal. On a guest Wi-Fi, a **captive portal** that was not clicked looks like a broken internet. Try a browser to a never-HTTPS site or the OS connectivity check.

**DNS versus path:** ping a public IP (for example 1.1.1.1 or 8.8.8.8). If IP works and **names** fail, it is DNS (wrong server, failed resolver, split-horizon). If IP fails, it is not DNS yet — it is routing, NAT, WAN, or local stack. Ping the gateway, then a public IP, then a name. That order is the job.

**Authentication failures:** 802.1X on a switch port, a wrong Wi-Fi PSK, an expired cert on EAP-TLS, a disabled AD account. The symptom is "connected, no access" or a loop of disconnects. The RADIUS log is more useful than a new NIC.

**Intermittent internet** that tracks a time of day can be a full DHCP pool, a WAN that drops, or a parental schedule on a SOHO router.`,
      },
      {
        type: "diagram",
        id: "C1-D5-O5-L1-d1",
        component: "Ipv4Diagram",
        title: "APIPA versus a real lease",
        caption:
          "A DHCP lease has host, mask, gateway, and DNS. APIPA has 169.254.0.0/16 and no useful gateway.",
        notice:
          "Notice you cannot ping the internet from APIPA even if the Wi-Fi icon is lit. The icon is not a WAN test.",
        alt: "Two NICs: one with a DHCP lease and gateway, one with 169.254 APIPA and no gateway.",
      },
      {
        type: "knowledge-check",
        id: "C1-D5-O5-L1-kc1",
        questionIds: ["C1-D5-O5-LIMITED-Q001"],
      },
      {
        type: "reading",
        id: "C1-D5-O5-L1-r2",
        title: "Slow, limited, and the wrong DNS",
        markdown: `**Slow speeds** with a good ping can be a 100 Mbps NIC in a 1 Gbps jack (bad cable only using two pairs), a full disk, or a QoS policy. Check negotiated speed/duplex. **Duplex mismatch** (one side 100/full, the other auto that fell to 100/half) produces loss and delay that people call "slow Wi-Fi" on a wired PC.

Wrong DNS (a stale ISP resolver, or malware's resolver — Core 2) produces "the internet is down" with ping-to-IP success. Set a known resolver only if policy allows; otherwise fix the DHCP option or the domain-joined DNS suffix. \`nslookup\` tells you which server answered.

**Intermittent wireless** at one desk is interference or a weak cell (next lesson). Intermittent for a whole floor is an AP, a switch uplink, or a DHCP pool that fills at 09:00. A captive portal that was never completed looks like limited connectivity with a valid-looking Wi-Fi icon.

802.1X that fails never reaches DHCP, so you will not even get APIPA if the port is unauthorized — you get a link that goes nowhere useful. Read the RADIUS log after you confirm link.

Document: IP, mask, gateway, DNS, whether ping-IP worked, whether ping-name worked, and the APIPA yes/no. Those five facts prevent the next technician from starting at the wall jack again.`,
      },
      {
        type: "table",
        id: "C1-D5-O5-L1-t1",
        title: "Connectivity fork",
        headers: ["Evidence", "Problem class", "NEXT"],
        rows: [
          ["No link light", "Layer 1", "Cable, port, NIC"],
          ["169.254.x.x", "DHCP / isolation", "Scope, relay, VLAN, /renew after a reason"],
          ["Ping 1.1.1.1 works, names fail", "DNS", "Resolver, suffix, nslookup"],
          ["Ping gateway fails, IP looks right", "LAN path / gateway", "Switch, VLAN, gateway host"],
          ["802.1X failed auth", "Identity", "Cert, account, RADIUS — not a new cable first"],
        ],
      },
      {
        type: "lab",
        id: "C1-D5-O5-L1-lab",
        labId: "C1-D2-O6-ROUTER-LAB",
        title: "SOHO router: DHCP and DNS",
        prompt:
          "Break and fix a scope that does not include the LAN, and a DNS field that points at a dead address. Limited connectivity is often this page.",
      },
      {
        type: "knowledge-check",
        id: "C1-D5-O5-L1-kc2",
        questionIds: ["C1-D5-O5-LIMITED-Q002"],
      },
      {
        type: "callout",
        id: "C1-D5-O5-L1-exam",
        callout: {
          kind: "exam",
          title: "Exam lens",
          body: "APIPA means DHCP failed. It does not mean 'the internet cable is unplugged' by itself — though an unplugged cable can *cause* DHCP to fail. Look at link state first if the stem gives it.",
        },
      },
      {
        type: "summary",
        id: "C1-D5-O5-L1-sum",
        bullets: [
          "Link, then address, then gateway, then IP ping, then name ping.",
          "169.254 is APIPA: no DHCP lease, no useful default gateway.",
          "IP works + names fail = DNS.",
          "Limited connectivity is a Windows label, not a root cause.",
        ],
      },
    ],
  },
  {
    id: "C1-D5-O5-L2",
    objectiveId: "C1-D5-O5",
    slug: "jitter-voip-wifi-flapping",
    title: "Jitter, VoIP, Wi-Fi interference, and port flapping",
    description:
          "Why voice dies when ping looks 'fine,' how latency differs from jitter, and what a flapping switch port is telling you.",
    estimatedMinutes: 24,
    conceptIds: [
      "C1-D5-O5-JITTER",
      "C1-D5-O5-VOIP",
      "C1-D5-O5-FLAPPING",
      "C1-D5-O5-LATENCY",
      "C1-D5-O5-LIMITED",
    ],
    prerequisites: ["C1-D5-O5-L1"],
    lastVerified: "2026-09-01",
    sources: ["c1-obj-3.0", "wifi-alliance"],
    blocks: [
      {
        type: "callout",
        id: "C1-D5-O5-L2-why",
        callout: {
          kind: "why",
          title: "Why this matters",
          body: "A 200 ms ping that is stable is a delay. A 20–80–15–90 ms ping is jitter. Voice over IP hates the second one. If you only look at average ping, you will close a ticket that is still robotic.",
        },
      },
      {
        type: "reading",
        id: "C1-D5-O5-L2-r1",
        title: "Latency, jitter, and poor VoIP",
        markdown: `**Latency** is delay: how long a packet takes. Humans notice voice delay around 150 ms one-way as talk-over. Video meetings feel laggy. High latency to a nearby gateway is a LAN or Wi-Fi problem; high latency only to the internet is WAN.

**Jitter** is variation in that delay. VoIP and other real-time streams need packets in a steady rhythm. Jitter buffers on phones absorb a little; they cannot absorb wild swings. Symptoms: robotic voice, drop-outs, "can you repeat," frozen tiles while chat still works.

**Poor VoIP** FIRST checks: wired versus wireless (wire the phone if you can), QoS/DSCP not being stripped, duplex mismatch, a saturated uplink, and Wi-Fi interference. A PC downloading on the same SOHO link will wreck a call without any "network outage."

**Port flapping** is a switch port that rapidly goes up/down. Causes: bad cable, bad NIC, a loop (two ports accidentally bridged), a dying AP, or spanning-tree fighting a mis-patch. The log is a storm of up/down. FIRST: identify the port, inspect the cable, disable the port if it is taking down a VLAN, then replace cable/NIC. Do not spanning-tree-debug as your first A+ move, but do know that a loop can melt a small switch.

**High latency** on Wi-Fi with a strong signal is often interference or airtime: too many clients, a microwave, a neighbor AP on the same channel, Bluetooth on 2.4 GHz, or a DFS radar event on 5 GHz. **Slow speeds** with RSSI fine can be a client stuck on 2.4 GHz, a 20 MHz-only config, or a failing AP radio.

**Intermittent wireless** at one location: site-survey that desk. Whole building: controller/AP firmware, DHCP pool, WAN. **Authentication** that fails only on one SSID: PSK typo versus RADIUS. A corporate SSID that needs a cert will fail on a personal device that only has a PSK network saved.`,
      },
      {
        type: "diagram",
        id: "C1-D5-O5-L2-d1",
        component: "WifiHeatDiagram",
        title: "Interference and a jittery path",
        caption:
          "Overlapping 2.4 GHz cells, a microwave, and a congested uplink produce jitter even when the SSID is visible.",
        notice:
          "Notice a strong RSSI does not prove a clean airtime. Channel overlap can be loud and still 'four bars.'",
        alt: "Floor plan heat map with overlapping APs and a jitter graph next to a VoIP handset.",
      },
      {
        type: "knowledge-check",
        id: "C1-D5-O5-L2-kc1",
        questionIds: ["C1-D5-O5-JITTER-Q001", "C1-D5-O5-VOIP-Q001"],
      },
      {
        type: "lab",
        id: "C1-D5-O5-L2-lab-wifi",
        labId: "C1-D2-O2-WIFI-LAB",
        title: "Wi-Fi interference lab",
        prompt:
          "Move APs and channels until overlap drops. Intermittent wireless at one desk is often this picture, not a new laptop NIC.",
      },
      {
        type: "reading",
        id: "C1-D5-O5-L2-r2",
        title: "Tools and NEXT actions",
        markdown: `Ping with a count, traceroute, a Wi-Fi analyzer (channel, width, RSSI, noise), the switch log for flapping, and a wired test as a control. If the call is perfect on Ethernet and terrible on Wi-Fi, you are done blaming the PBX. That one experiment is worth more than a guess about codecs.

**NEXT** after you prove jitter on Wi-Fi: move the client to 5 GHz or 6 GHz, pick a cleaner channel, stop using 2.4 GHz for voice where you can, check AP CPU and client count, and pause the backup job that saturates the WAN. **NEXT** after you prove a flap: replace the patch cord, then the NIC, then the switch port. Disable the port if it is melting a small switch.

Authentication that fails on a corporate SSID while a personal PSK SSID works is 802.1X, a certificate, or an account — not a DHCP pool. Intermittent internet at 18:00 on a SOHO router is often a parental schedule, not a new ISP fiber.

Do not set a static IP to "fix jitter." Do not disable IPv6 as a superstition. Do not reboot the core switch first because one phone is robotic. Scope the blast radius to the evidence you have.`,
      },
      {
        type: "table",
        id: "C1-D5-O5-L2-t1",
        title: "Real-time versus bulk",
        headers: ["Symptom", "Metric", "Typical FIRST/NEXT"],
        rows: [
          ["Talk-over, delay", "High latency", "Where? Gateway vs WAN. Wire if Wi-Fi."],
          ["Robotic, choppy voice", "Jitter / loss", "QoS, wire the phone, stop the bulk transfer"],
          ["Port up/down in log", "Flapping", "Cable, NIC, disable port if it storms"],
          ["One desk, drops", "RSSI / overlap", "Analyzer, move AP or channel"],
          ["Auth fail on corp SSID", "802.1X / cert", "Account and cert, not DHCP scope first"],
        ],
      },
      {
        type: "knowledge-check",
        id: "C1-D5-O5-L2-kc2",
        questionIds: ["C1-D5-O5-FLAPPING-Q001", "C1-D5-O5-LATENCY-Q001"],
      },
      {
        type: "callout",
        id: "C1-D5-O5-L2-tech",
        callout: {
          kind: "technician",
          title: "Technician lens",
          body: "Always compare wired versus wireless for voice tickets. It is the cheapest controlled experiment in this domain.",
        },
      },
      {
        type: "summary",
        id: "C1-D5-O5-L2-sum",
        bullets: [
          "Latency is delay; jitter is variation; VoIP dies on jitter and loss.",
          "Port flapping: cable/NIC/loop; read the log before you reboot the stack.",
          "Strong Wi-Fi signal can still be a noisy channel.",
          "Wire the phone to split RF from the PBX and the WAN.",
        ],
      },
      {
        type: "checkpoint",
        id: "C1-D5-O5-L2-cp",
        questionIds: [
          "C1-D5-O5-LIMITED-Q003",
          "C1-D5-O5-JITTER-Q002",
          "C1-D5-O5-VOIP-Q002",
          "C1-D5-O5-FLAPPING-Q002",
          "C1-D5-O5-LATENCY-Q002",
          "C1-D5-O5-LIMITED-Q008",
          "C1-D5-O5-VOIP-Q006",
          "C1-D5-O5-FLAPPING-Q006",
        ],
      },
    ],
  },
  {
    id: "C1-D5-O6-L1",
    objectiveId: "C1-D5-O6",
    slug: "printer-output-faults",
    title: "Faded, ghosted, speckled, and garbled output",
    description:
      "Match sample pages to toner, drum, fuser, ink path, and driver/language — before you replace the whole MFD.",
    estimatedMinutes: 22,
    conceptIds: [
      "C1-D5-O6-FADED",
      "C1-D5-O6-GHOST",
      "C1-D5-O6-GARBLED",
    ],
    prerequisites: ["C1-D5-O5-L2"],
    lastVerified: "2026-09-01",
    sources: ["c1-obj-3.0", "comptia-a-v15"],
    blocks: [
      {
        type: "callout",
        id: "C1-D5-O6-L1-why",
        callout: {
          kind: "why",
          title: "Why this matters",
          body: "Output is evidence. A repeating mark every 4 cm is a drum circumference. Garbled symbols are a language/driver mismatch. If you 'clean everything,' you will still be there at 6 p.m.",
        },
      },
      {
        type: "reading",
        id: "C1-D5-O6-L1-r1",
        title: "Read the page, then pick a subsystem",
        markdown: `**Faded** laser output: empty or low toner, economy/draft mode, density set low, or a failing transfer. Shake-and-pray on a cartridge is a temporary diagnostic, not a fix. On inkjet: clogged nozzles, empty tank, or a pad that thinks the tank is full. Print a **vendor test/status page** from the panel — if the test page is fine and Windows output is not, it is driver/app. If the test page is faded, it is supplies or the engine.

**Lines and streaks:** vertical streaks on laser often mean toner cartridge, drum, or a dirty corona/charge roller. A **repeating** mark at a fixed interval matches a roller or drum circumference — measure it; vendor service docs map millimeters to a part. Horizontal banding on inkjet is often a clogged nozzle or a failing feed.

**Speckling / stray toner:** leaking cartridge, dirty interior, or a failing fuser that is not bonding toner (speckles that smear if you rub). Wipe the paper path with the approved method; do not use an office vacuum without a toner-rated filter.

**Ghosting:** a faint second copy of the page, offset down. Classic laser: drum not discharging, or a **fuser** that is not setting toner so a ghost appears on the next revolution. Ghosting that is a previous page's image often implicates drum/fuser. Do not confuse with OLED **burn-in** from 5.3; printers do not burn-in a taskbar.

**Garbled** output (symbols, wrong font, fragments of PCL/PostScript): wrong driver (PCL versus PostScript), a bad USB cable that corrupts the job, or a failing formatter. FIRST: print a config page from the panel. If the panel page is perfect, reinstall/replace the driver and the correct language. If the panel page is also garbage, it is the printer firmware/hardware.

**Orientation** and tray mistakes: the app said landscape, the tray is letter in a legal slot, or the driver duplexed a letterhead the wrong way. That is settings, not a new fuser.`,
      },
      {
        type: "diagram",
        id: "C1-D5-O6-L1-d1",
        component: "PrinterOutputDiagram",
        title: "Output gallery",
        caption:
          "Faded, repeating drum marks, ghosting, speckling, and garbled language are different pictures on purpose.",
        notice:
          "Notice garbled does not look like low toner. If you can still read the words and they are just light, it is not a PostScript mismatch.",
        alt: "Five sample printouts labeled faded, repeating marks, ghosting, speckling, and garbled control codes.",
      },
      {
        type: "knowledge-check",
        id: "C1-D5-O6-L1-kc1",
        questionIds: ["C1-D5-O6-FADED-Q001"],
      },
      {
        type: "lab",
        id: "C1-D5-O6-L1-lab",
        labId: "C1-D3-O8-PRINTER-LAB",
        title: "Printer output matcher",
        prompt:
          "Match each sample to a subsystem and a first action. Faded is often toner; repeating marks follow a circumference; garbled is language/driver.",
      },
      {
        type: "reading",
        id: "C1-D5-O6-L1-r2",
        title: "Laser versus inkjet versus thermal versus impact",
        markdown: `**Laser:** toner, drum, transfer, fuser. Heat and powder. Ghosting, repeating marks, and fuser smear live here. A status page from the panel is still a laser page — if it is pale, the engine is pale.

**Inkjet:** liquid, heads, rollers. Streaks from dry heads; feed issues from worn pickup rollers. A nozzle check is the equivalent of a laser config page. Do not send a laser fuser kit to an inkjet.

**Thermal** (receipts, labels): the **element** or dirty head produces a white line along the feed; the paper is special and must face the correct way. Faded thermal is often cheap paper or a cold/dirty head — there is no toner. Cleaning the element with the approved swab is the FIRST maintenance action.

**Impact / dot matrix:** ribbon, print head, tractor. Multipart NCR forms need impact; a laser cannot make carbon copies. Faded impact is a ribbon. A worn head punches weakly through the last ply.

Always ask which engine you are standing in front of before you "replace toner" on a receipt printer or "clean the thermal head" on a laser. The exam will name the printer type in the stem for a reason. If it does not, the output picture plus "no toner on a receipt" is enough.`,
      },
      {
        type: "table",
        id: "C1-D5-O6-L1-t1",
        title: "Output → subsystem",
        headers: ["Page looks like", "Subsystem", "FIRST"],
        rows: [
          ["Whole page pale, test page pale", "Toner / ink / density", "Supplies and density; then transfer"],
          ["Mark repeats every N mm", "Drum or a roller", "Measure interval; replace mapped part"],
          ["Faint previous-page ghost", "Drum / fuser", "Fuser kit / drum per vendor"],
          ["Random speckles, smear if rubbed", "Toner leak / fuser not setting", "Clean path; fuser"],
          ["Nonsense symbols, panel page OK", "Driver / PCL vs PS", "Correct driver"],
          ["White line on a receipt", "Thermal head / dirt", "Clean element; correct paper face"],
        ],
      },
      {
        type: "knowledge-check",
        id: "C1-D5-O6-L1-kc2",
        questionIds: ["C1-D5-O6-GHOST-Q001", "C1-D5-O6-GARBLED-Q001"],
      },
      {
        type: "callout",
        id: "C1-D5-O6-L1-exam",
        callout: {
          kind: "exam",
          title: "Exam lens",
          body: "Panel test page is the fork: engine versus driver. Memorize that fork; it wins garbled and many 'wrong font' tickets.",
        },
      },
      {
        type: "summary",
        id: "C1-D5-O6-L1-sum",
        bullets: [
          "Faded: supplies, density, then transfer/heads.",
          "Repeating marks: circumference of drum/roller.",
          "Ghosting: drum or fuser on laser.",
          "Garbled: driver/language if the config page is clean.",
        ],
      },
    ],
  },
  {
    id: "C1-D5-O6-L2",
    objectiveId: "C1-D5-O6",
    slug: "printer-jams-queues",
    title: "Jams, queues, finishing, and connectivity",
    description:
      "Paper path, multi-feeds, stuck jobs, staple/punch, tray sensors, and a frozen queue on the wrong IP.",
    estimatedMinutes: 22,
    conceptIds: ["C1-D5-O6-JAM", "C1-D5-O6-QUEUE", "C1-D5-O6-GARBLED"],
    prerequisites: ["C1-D5-O6-L1"],
    lastVerified: "2026-09-01",
    sources: ["c1-obj-3.0", "comptia-a-v15"],
    blocks: [
      {
        type: "callout",
        id: "C1-D5-O6-L2-why",
        callout: {
          kind: "why",
          title: "Why this matters",
          body: "A jam that always happens at the fuser is not a new network card. A queue that is paused on a print server is not a new fuser. Split path from job from network.",
        },
      },
      {
        type: "reading",
        id: "C1-D5-O6-L2-r1",
        title: "Paper path and the queue",
        markdown: `**Jams:** remove power if policy says so, then follow the path: tray pickup → transfer → fuser → output. Pull in the direction of travel; do not leave scraps in the fuser. Recurring jams at pickup: worn **pickup roller**, wrong paper weight, damp paper, overfilled tray. Jams at fuser: worn fuser, wrong media (labels in a laser that melt), or scraps. **Not feeding** is rollers or a tray not seated. **Multipage misfeed** is worn separation pad / corner separators, or static-clung paper.

**Tray not recognized:** sensor tab on the cassette, wrong size guides, or a tray firmware mismatch. The driver will print to tray 1 while the user filled tray 2.

**Grinding** from a printer is a gear or a jam the sensor missed. Stop; do not keep reprinting.

**Finishing** (staple, hole punch): empty staple cartridge, a punch chad box full, or a job that requested 2-staple on a finisher that is offline. The print is fine; the accessory is not.

**Queue issues:** a job stuck in **error** or **paused**, a print server that is down, "use printer offline," or a user printing to an old IP (the MFD moved). FIRST: the local queue, then the server, then ping the printer. **Frozen queue:** cancel the stuck job (sometimes you must restart the spooler — Core 2 covers \`spoolsv\`; here, know that one bad job can block a department).

**Connectivity:** USB versus Ethernet versus Wi-Fi. A printer that prints a config page but not user jobs is path/driver/queue. A printer that prints nothing, no ping, is network/power. AirPrint/IPP discovery failing after a VLAN change is multicast, not toner.`,
      },
      {
        type: "diagram",
        id: "C1-D5-O6-L2-d1",
        component: "LaserPrinterDiagram",
        title: "Laser paper path",
        caption:
          "Pickup, registration, transfer, fuser, output, and duplex loop. Jam codes name a station.",
        notice:
          "Notice the fuser is hot. Jam clearance there is a burn risk. Notice the pickup roller is the 'not feeding' part.",
        alt: "Side view of a laser printer paper path with jam locations labeled.",
      },
      {
        type: "knowledge-check",
        id: "C1-D5-O6-L2-kc1",
        questionIds: ["C1-D5-O6-JAM-Q001"],
      },
      {
        type: "lab",
        id: "C1-D5-O6-L2-lab-shift",
        labId: "C1-D5-SHIFT-LAB",
        title: "Core 1 troubleshooting shift",
        prompt:
          "Work the eight-ticket hardware/network shift. FIRST actions gather evidence or make the area safe. Replacing parts before a test is how these tickets go long.",
      },
      {
        type: "reading",
        id: "C1-D5-O6-L2-r2",
        title: "A printer ticket that is actually DNS",
        markdown: `If users print by hostname and DNS changed, jobs vanish into a dead IP. If they print by a TCP/IP port that was set statically to 192.168.1.50 and DHCP moved the MFD, the same story appears as "the printer is down" while the panel still prints a config page. That page is the live IP, hostname, firmware, and supplies. Update the port or create a DHCP reservation so the address stops drifting.

AirPrint, IPP, and Bonjour discovery fail after a VLAN change even when ping-by-IP works, because multicast does not cross Layer 3 without a helper. Do not replace toner for a discovery problem.

Garbled output after a firmware update is often a driver that no longer matches PCL versus PostScript. Install the current vendor package on a test PC before you touch the engine.

Document the jam code, tray, media type, whether the config page printed, queue state, and IP. Note fuser page count if the vendor reports it. The next technician should not have to rediscover that the fuser is at 180,000 pages or that tray 2's size tab is broken.

The Core 1 shift lab that follows mixes printer tickets with POST, RAID, and limited-connectivity tickets on purpose. FIRST is still isolate; replacing a fuser because the queue is paused is how a shift goes long.`,
      },
      {
        type: "table",
        id: "C1-D5-O6-L2-t1",
        title: "Jam and queue",
        headers: ["Symptom", "FIRST", "Then"],
        rows: [
          ["Not feeding from tray 2", "Seat tray, guides, media", "Pickup roller / pad"],
          ["Multi-feed", "Fan paper, check weight", "Separation pad"],
          ["Jam at fuser", "Clear scraps, cool-down", "Fuser kit if repeat"],
          ["Stuck job, others wait", "Cancel job / spooler", "Wrong driver or bad port"],
          ["No ping to printer", "Power, cable, IP", "Not toner"],
          ["Staple requested, stack loose", "Staple cartridge / finisher online", "New drum"],
        ],
      },
      {
        type: "knowledge-check",
        id: "C1-D5-O6-L2-kc2",
        questionIds: ["C1-D5-O6-QUEUE-Q001", "C1-D5-O6-JAM-Q002"],
      },
      {
        type: "callout",
        id: "C1-D5-O6-L2-tech",
        callout: {
          kind: "technician",
          title: "Technician lens",
          body: "Print a config page from the device before you rebuild a workstation. It tells you engine, IP, and supplies in one sheet.",
        },
      },
      {
        type: "summary",
        id: "C1-D5-O6-L2-sum",
        bullets: [
          "Jams: pickup versus fuser versus scraps; replace rollers and pads that are worn.",
          "Multi-feeds are separation pads and paper condition.",
          "Queues: paused, offline, old IP, one stuck job.",
          "Finishing faults are accessories, not drums.",
        ],
      },
      {
        type: "checkpoint",
        id: "C1-D5-O6-L2-cp",
        questionIds: [
          "C1-D5-O6-FADED-Q002",
          "C1-D5-O6-GHOST-Q002",
          "C1-D5-O6-JAM-Q003",
          "C1-D5-O6-GARBLED-Q002",
          "C1-D5-O6-QUEUE-Q002",
          "C1-D5-O6-JAM-Q006",
          "C1-D5-O6-QUEUE-Q005",
        ],
      },
    ],
  },
];
