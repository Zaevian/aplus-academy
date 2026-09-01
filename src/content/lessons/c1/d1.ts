import type { Lesson } from "../../schema";

export const C1_D1_LESSONS: Lesson[] = [
  {
    id: "C1-D1-O1-L1",
    objectiveId: "C1-D1-O1",
    slug: "laptop-battery-keyboard",
    title: "Laptop serviceability, batteries, and keyboards",
    description:
      "Open a laptop without creating a fire or a second ticket: FRUs versus soldered parts, lithium-ion health, swelling, and keyboard/top-case replacement.",
    estimatedMinutes: 22,
    conceptIds: ["C1-D1-O1-BATTERY", "C1-D1-O1-KEYBOARD"],
    prerequisites: ["FND-D0-O5-L1"],
    lastVerified: "2026-09-01",
    sources: ["c1-obj-3.0", "comptia-a-v15"],
    blocks: [
      {
        type: "callout",
        id: "C1-D1-O1-L1-why",
        callout: {
          kind: "why",
          title: "Why this matters",
          body: "A laptop is not a small desktop. The same symptom (won't power on, keys skip, runtime collapsed) can be a $40 battery, a $12 keycap, or a glued sandwich you are not supposed to open. Objective 1.1 is about monitoring the hardware you have and replacing only what the chassis actually lets you replace.",
        },
      },
      {
        type: "reading",
        id: "C1-D1-O1-L1-r1",
        title: "Read the chassis before you unscrew it",
        markdown: `A modern notebook is a layered sandwich: bottom cover, a battery that often occupies a third of the floor, a motherboard with almost no expansion slots, and a display assembly that hides cameras, microphones, and Wi-Fi antennas. **Field-replaceable units (FRUs)** are the parts a vendor expects a technician to swap with a service manual: battery, keyboard or top case, SODIMM, 2.5-inch or M.2 storage, wireless card, and sometimes the display. **Customer-replaceable units (CRUs)** are the subset documented for the owner, often a door-accessible drive or an external battery on older models. Everything else — soldered **LPDDR** memory, a system-on-chip, a glued display — is not an A+ "replace the part" job. You identify the limit, you do not invent a teardown.

Manufacturer procedures beat generic videos. Lenovo, Dell, HP, and Apple publish sequences that name screw lengths, connector directions, and whether the internal battery connector must come off before the SSD. Many ultrabooks hide screws under rubber feet. Some use pentalobe or Torx. Some glue the battery. If you lever a **lithium-ion (Li-ion)** pack with a metal tool, you can puncture a cell. That is a fire, not a clever shortcut.

Power discipline is part of replacement, not a nicety. Shut the OS down. Unplug the AC adapter. If the service manual shows an internal battery connector, disconnect it and wait a few seconds for residual charge to bleed. Many "I installed an SSD and it still will not boot" tickets are actually "the battery connector is sitting on top of the board, not in it." Use an electrostatic discharge (ESD) strap to unpainted chassis ground. Do not work on a bedspread.

**Monitoring** the battery is the other half of 1.1. Windows reports design capacity versus full charge capacity under Settings and in manufacturer utilities; macOS shows cycle count and condition in System Settings. A pack that holds 40% of design capacity is worn, not "calibrated wrong." Rapid shutdowns at 20% remaining, a chassis that no longer sits flat, or a trackpad that clicks by itself because the case is bowing are swelling signs. A swollen pack is a safety event: power down, do not charge, do not puncture, isolate the device, and replace the pack through the vendor's process. Do not "vent" it. Do not keep using it because the user has a meeting.`,
      },
      {
        type: "diagram",
        id: "C1-D1-O1-L1-d1",
        component: "LaptopExplodedDiagram",
        title: "Exploded laptop — rotate and identify",
        caption:
          "Bottom cover, battery, SODIMM or soldered memory, M.2 or 2.5-inch storage, WLAN card with pigtails, and a display assembly that carries camera, microphone, and antennas.",
        notice:
          "Notice the Wi-Fi antennas are not on the wireless card. They live in the display bezel and only connect to the card with two (sometimes three) coaxial pigtails. Notice many ultrabooks have no SODIMM slots at all.",
        alt: "Rotatable exploded laptop showing battery, memory, storage, wireless card, keyboard top case, and display assembly with antenna paths in the bezel.",
      },
      {
        type: "knowledge-check",
        id: "C1-D1-O1-L1-kc1",
        questionIds: ["C1-D1-O1-BATTERY-Q001"],
      },
      {
        type: "reading",
        id: "C1-D1-O1-L1-r2",
        title: "Keyboards, ribbons, and the top case",
        markdown: `Laptop keyboards fail from spills, worn scissor or butterfly mechanisms, and ribbon cables that fold in the wrong place after a hurried reassembly. On older business notebooks the keyboard lifts after a few clips or screws and a single **flat-flex cable** to the board. On most consumer ultrabooks the keys are part of a **top-case assembly**: keyboard, palm rest, and often the trackpad, sold as one FRU. If three keys in a column die, you do not order those three keycaps from a bin; you order the assembly the vendor lists.

The ribbon has a direction and a locking bar. Seat it fully, close the bar, and confirm the cable is not creased under the palm rest. A keyboard that types garbage after a battery job almost always means the ribbon is half-seated or inverted, not a "bad board."

**Function (Fn) keys** are firmware and embedded-controller behavior, not a second keyboard. They toggle backlight, volume, airplane mode, and display output. If Fn shortcuts died but ordinary letters work, look at an Fn-lock key, a manufacturer utility, or a spilled function row — not at RAM. External USB keyboards are a valid workaround while you wait for a top case; they are not a diagnosis.

Spills: disconnect power, remove the battery if the procedure allows, invert the unit, and do not power it on to "see if it still works." Sugary liquid welds membranes. The honest repair is a top-case swap after the board is inspected for corrosion. The dishonest repair is a can of compressed air and a prayer.

Trackpads live in this same conversation. Many are part of the top case. A cursor that drifts after a battery swell is often mechanical pressure from the pack, not a haunted pointing device. Fix the safety problem first.`,
      },
      {
        type: "table",
        id: "C1-D1-O1-L1-t1",
        title: "Battery and keyboard: symptom to first honest action",
        headers: ["Symptom", "Do not start here", "Start here"],
        rows: [
          [
            "Runtime collapsed, design capacity far below spec",
            "Reset SMC/EC as the whole fix",
            "Read battery health; schedule a pack replacement",
          ],
          [
            "Chassis bowed, trackpad clicking itself, lid not flush",
            "Keep charging overnight",
            "Treat as swell: power off, isolate, replace the pack",
          ],
          [
            "One column of keys dead after a reassembly",
            "Reimage Windows",
            "Reseat the keyboard ribbon and locking bar",
          ],
          [
            "Fn brightness keys dead; letters still type",
            "Replace the motherboard",
            "Fn-lock, vendor hotkey utility, then the function row",
          ],
          [
            "Laptop will not power on after an SSD swap",
            "Assume a dead CPU",
            "Confirm the internal battery connector is actually seated",
          ],
        ],
        caption:
          "1.1 is a scenario objective. The exam wants the replacement that matches the chassis, not a desktop habit.",
      },
      {
        type: "knowledge-check",
        id: "C1-D1-O1-L1-kc2",
        questionIds: ["C1-D1-O1-KEYBOARD-Q001"],
      },
      {
        type: "callout",
        id: "C1-D1-O1-L1-exam",
        callout: {
          kind: "exam",
          title: "Exam lens",
          body: "If the stem mentions a swollen battery, the FIRST action is safety (power down, stop charging, do not puncture), not 'run a calibration cycle.' If RAM is soldered, the BEST upgrade path is not 'install SODIMM anyway.'",
        },
      },
      {
        type: "callout",
        id: "C1-D1-O1-L1-mistake",
        callout: {
          kind: "mistake",
          title: "Common mistake",
          body: "The coin-cell on the motherboard is not the laptop battery. A wrong clock after a week unplugged is a CMOS/RTC problem (Core 1 hardware/troubleshooting), not a Li-ion pack you replace through the bottom cover.",
        },
      },
      {
        type: "summary",
        id: "C1-D1-O1-L1-sum",
        bullets: [
          "FRU versus soldered is a serviceability question, not a wish.",
          "Li-ion swelling is a safety stop: power off, do not puncture, replace the pack.",
          "Monitor health (design vs full charge, cycle count) before you guess.",
          "Keyboards are often a top-case FRU; ribbons have a lock bar and an orientation.",
        ],
      },
    ],
  },
  {
    id: "C1-D1-O1-L2",
    objectiveId: "C1-D1-O1",
    slug: "laptop-memory-storage-wlan",
    title: "Laptop RAM, storage, and wireless cards",
    description:
      "SODIMM versus DIMM, DDR generation matching, 2.5-inch and M.2 storage, and Mini-PCIe / M.2 WLAN-WWAN cards with their antenna pigtails.",
    estimatedMinutes: 24,
    conceptIds: [
      "C1-D1-O1-SODIMM",
      "C1-D1-O1-STORAGE",
      "C1-D1-O1-WLAN",
      "C1-D1-O1-ANTENNA",
    ],
    prerequisites: ["C1-D1-O1-L1"],
    lastVerified: "2026-09-01",
    sources: ["c1-obj-3.0", "comptia-a-v15"],
    blocks: [
      {
        type: "callout",
        id: "C1-D1-O1-L2-why",
        callout: {
          kind: "why",
          title: "Why this matters",
          body: "Installing a desktop DIMM in a notebook, a SATA M.2 drive in an NVMe-only slot, or a WLAN card with the antenna leads left in the hinge are three ways to turn a 20-minute FRU job into a no-boot or no-Wi-Fi ticket.",
        },
      },
      {
        type: "reading",
        id: "C1-D1-O1-L2-r1",
        title: "SODIMM is not a short DIMM you force in",
        markdown: `Notebook memory, when it is socketed at all, uses **small-outline dual in-line memory modules (SODIMMs)**. A SODIMM is about 67.6 mm long. A desktop **DIMM** is about 133 mm. The notch position also differs by **DDR** generation. DDR4 SODIMM will not seat in a DDR5 SODIMM slot, and neither will seat in a desktop DIMM slot. Forcing the stick is how you break the clips and the module.

Replacement technique is consistent across vendors once the cover is off: power down, disconnect the internal battery if required, discharge, ground yourself, open the clips, lift the module to about 45 degrees, and pull. Install at that same angle until the notches line up, then press down until both clips catch. Do not touch the gold contacts. Match **generation, speed bin, and voltage**. Mixing a single stick into a dual-channel board still works in most firmware, but you give up the channel pairing the vendor designed.

The trap is **soldered memory**. Thin-and-light and Apple-silicon notebooks often use **LPDDR** packages on the board. Task Manager or About This Mac showing 16 GB does not imply a slot. If the service manual shows no SODIMM, the BEST "upgrade" is a different model, not a dremel. Some boards have one soldered bank and one slot; read the board, do not assume two doors.

Symptoms that actually point at RAM: failure to POST after a memory change, beep codes or LED blink patterns the vendor maps to memory, or intermittent crashes that vanish when you reseat or isolate to one known-good stick. Symptoms that do not: a slow browser with 32 GB installed, which is storage or network until proven otherwise.

Core 1 Domain 3 will go deeper on ECC, channels, and DDR numbering. For 1.1, the scored skill is: identify SODIMM versus DIMM, respect the generation notch, and know when the laptop simply has no socket.`,
      },
      {
        type: "video",
        id: "C1-D1-O1-L2-see1",
        assetId: "sodimm-angle",
        title: "SEE: SODIMM at an angle, DIMM for scale",
        caption: "Do not force a desktop DIMM into a laptop slot.",
        transcript:
          "A SODIMM starts at an angle, then presses flat until the clips catch. A desktop DIMM is about twice as long and does not belong in a laptop slot.",
      },
      {
        type: "diagram",
        id: "C1-D1-O1-L2-d1",
        component: "DimmVsSodimmDiagram",
        title: "DIMM versus SODIMM",
        caption:
          "Same DDR family idea, different length, different notch, different chassis. Desktop DIMM does not belong in a laptop slot.",
        notice:
          "Notice the notch is not in the same place across DDR4 and DDR5. A stick that 'almost' fits is the wrong generation, not a tight tolerance.",
        alt: "Side-by-side DIMM and SODIMM modules with length callouts and DDR generation notches marked.",
      },
      {
        type: "knowledge-check",
        id: "C1-D1-O1-L2-kc1",
        questionIds: ["C1-D1-O1-SODIMM-Q001"],
      },
      {
        type: "reading",
        id: "C1-D1-O1-L2-r2",
        title: "Storage caddies, M.2 keys, and the wireless card",
        markdown: `Laptop storage is either a **2.5-inch SATA** caddy (**hard disk drive** or **solid-state drive**) or an **M.2** module. 2.5-inch drives use a SATA data and power edge. They are still common in budget and older business notebooks. Clone or image **before** you pull a drive that holds the only copy of the OS; replacement without migration is a new install, not a repair.

**M.2** names a form factor, not a protocol. The common 2280 length (22 mm wide, 80 mm long) can be **SATA** or **NVMe** over PCI Express. The module **key** (notch) and the slot key must match. An M-key NVMe module in a B-keyed SATA-only slot will not work. Some boards have two M.2 slots with different wiring: one NVMe, one SATA or WWAN. Read the silkscreen and the manual. NVMe drives can run hot; many vendors place a thermal pad or shield. Put it back.

**Wireless cards** are separate FRUs. Older laptops use Mini-PCIe. Current ones use M.2 2230 **WLAN** (Wi-Fi plus Bluetooth) or **WWAN** (cellular) cards. The card is usually one screw and two or three **coaxial pigtail** connectors labeled MAIN / AUX (and sometimes MIMO 3). Those pigtails are the other end of antennas that live in the **display bezel**, not on the card. Disconnect them straight off the gold U.FL/MHF connectors — do not yank the cable out of the hinge. If you reassemble without them, the OS may still show a Wi-Fi adapter with excellent drivers and a terrible or missing signal.

After a display replacement, "Wi-Fi is gone" is an antenna story until you prove otherwise. After a card swap, "no networks found" can be a missing pigtail, a disabled radio in firmware, or airplane mode — not a new motherboard.

Some older business firmware **whitelists** WLAN cards. A perfectly good Intel card can be rejected because the vendor did not certify that PCI ID. That is a firmware policy, not a dead radio.`,
      },
      {
        type: "table",
        id: "C1-D1-O1-L2-t1",
        title: "Laptop storage and radio FRUs",
        headers: ["Part", "How you recognize it", "Replacement trap"],
        rows: [
          [
            "2.5-inch HDD/SSD",
            "Caddy, SATA edge, 7 mm or 9.5 mm height",
            "Wrong thickness; skipping the clone so the user loses the OS",
          ],
          [
            "M.2 NVMe",
            "2280 (typical), M-key, single screw at the end",
            "Installing SATA M.2 in an NVMe-only slot or omitting the thermal pad",
          ],
          [
            "M.2 SATA",
            "B-key or B+M, still 2280 in many laptops",
            "Assuming every M.2 slot is NVMe",
          ],
          [
            "WLAN card",
            "M.2 2230 or Mini-PCIe, two antenna leads",
            "Leaving MAIN/AUX disconnected in the hinge",
          ],
          [
            "WWAN card",
            "Extra M.2 slot, often with its own antennas and a SIM path",
            "Putting a WLAN card in the WWAN slot and wondering why LTE is missing",
          ],
        ],
        caption:
          "Protocol, keying, and antenna leads matter more than the brand printed on the sticker.",
      },
      {
        type: "knowledge-check",
        id: "C1-D1-O1-L2-kc2",
        questionIds: ["C1-D1-O1-STORAGE-Q001"],
      },
      {
        type: "callout",
        id: "C1-D1-O1-L2-tech",
        callout: {
          kind: "technician",
          title: "Technician lens",
          body: "Photograph the antenna colors before you pull them. Vendors are not consistent about which color is MAIN. A 30-second photo beats a 30-minute 'weak Wi-Fi after we were in there' ticket.",
        },
      },
      {
        type: "summary",
        id: "C1-D1-O1-L2-sum",
        bullets: [
          "SODIMM ≠ DIMM; DDR generations do not cross-fit.",
          "Soldered LPDDR means no memory upgrade.",
          "M.2 is a shape; SATA and NVMe are protocols with keys.",
          "WLAN/WWAN cards take antenna pigtails that originate in the display bezel.",
        ],
      },
    ],
  },
  {
    id: "C1-D1-O1-L3",
    objectiveId: "C1-D1-O1",
    slug: "laptop-privacy-antennas-camera",
    title: "Antennas, camera, microphone, and privacy hardware",
    description:
      "Why Wi-Fi dies after a screen swap, how webcam and mic modules sit in the bezel, and how biometrics plus near-field scanners are replaced without breaking the privacy story.",
    estimatedMinutes: 20,
    conceptIds: [
      "C1-D1-O1-ANTENNA",
      "C1-D1-O1-BIOMETRIC",
      "C1-D1-O1-WEBCAM",
    ],
    prerequisites: ["C1-D1-O1-L2"],
    lastVerified: "2026-09-01",
    sources: ["c1-obj-3.0", "comptia-a-v15"],
    blocks: [
      {
        type: "callout",
        id: "C1-D1-O1-L3-why",
        callout: {
          kind: "why",
          title: "Why this matters",
          body: "The display assembly is a radio, a camera, and a microphone that happen to also show pixels. If you treat a lid swap as 'just the panel,' you will return a laptop that cannot join Wi-Fi, cannot Hello-enroll, and still has the old webcam cable pinched in the hinge.",
        },
      },
      {
        type: "reading",
        id: "C1-D1-O1-L3-r1",
        title: "Antennas live in the lid",
        markdown: `Wi-Fi and Bluetooth need copper (or printed) **antennas** with a clear path. In a clamshell laptop those antennas are almost always in the **display bezel**, up high, away from the metal palm rest. Two thin coaxial cables run through the **hinge** down to the WLAN card. A third cable may exist for MIMO or for WWAN. They are easy to pinch, easy to forget, and easy to tear if you open the lid past the service stop while they are still clipped to the board.

Replacement technique: when the display assembly comes off, disconnect the camera/mic cable and the antenna pigtails as the manual shows, then free the hinge screws. On reassembly, route the cables through the same channels and tape points. A cable that crosses a hinge tooth will fail in a week as the user opens the lid. After the job, confirm the OS sees the WLAN device **and** that it lists nearby SSIDs at a plausible signal. An adapter present with −90 dBm next to the AP is a disconnected MAIN lead.

The **camera / webcam** is a small module at the top bezel, often sharing a cable with one or more **microphones**. Privacy shutters — physical sliding covers — are a hardware control the OS cannot override, which is the point. If the camera is missing after a bezel job, the module cable is unseated or the shutter is closed; do not start with a Windows reinstall. If the mic is silent on the laptop but works on a USB headset, the bezel array or its cable is the suspect, not "the sound driver" as a first move.

Microphones also pick up chassis noise if they are left rattling. Seat the module, replace the foam if the vendor included it, and keep tape off the ports.

None of this is the same as a failed **digitizer** or LCD, which Domain 3 and 5 treat as display faults. 1.1 cares that you know the camera, mic, and antennas are FRUs that ride in the lid.`,
      },
      {
        type: "video",
        id: "C1-D1-O1-L3-see1",
        assetId: "privacy-shutter",
        title: "SEE: privacy shutter and webcam LED",
        caption: "Hardware cover. The OS cannot override it.",
        transcript:
          "A privacy shutter is a physical cover the operating system cannot override. When the shutter is open the webcam LED can light. When the shutter closes, the LED goes off.",
      },
      {
        type: "diagram",
        id: "C1-D1-O1-L3-d1",
        component: "PrivacyShutterDiagram",
        title: "Webcam shutter",
        caption: "LED on, shutter closes, LED off.",
        notice: "Closed shutter is not a missing driver.",
        alt: "Laptop webcam with a sliding privacy shutter and LED.",
      },
      {
        type: "table",
        id: "C1-D1-O1-L3-t1",
        title: "Lid-resident parts",
        headers: ["Part", "Where it lives", "Failure after a lid job"],
        rows: [
          [
            "WLAN/WWAN antennas",
            "Left and right (or top) display bezel",
            "No SSIDs or extremely weak signal; adapter still present",
          ],
          [
            "Webcam",
            "Top center bezel",
            "Device missing in OS, or black image with shutter closed",
          ],
          [
            "Microphone array",
            "Beside the camera or in the chassis near the keyboard",
            "Built-in mic silent; USB headset works",
          ],
          [
            "IR camera (Hello)",
            "Beside or instead of the RGB webcam",
            "Face enrollment fails; fingerprint may still work",
          ],
        ],
        caption:
          "Test radios and cameras after every display assembly, not only after a dedicated 'antenna' ticket.",
      },
      {
        type: "knowledge-check",
        id: "C1-D1-O1-L3-kc1",
        questionIds: ["C1-D1-O1-ANTENNA-Q001"],
      },
      {
        type: "reading",
        id: "C1-D1-O1-L3-r2",
        title: "Biometrics and near-field scanners",
        markdown: `**Physical privacy and security components** on the 1.1 list are the hardware factors: **biometrics** and **near-field scanner** features.

Biometrics on laptops are usually a **fingerprint reader** (a window in the palm rest, a key, or the power button) and/or an **infrared (IR)** camera for face sign-in. They are sensors plus firmware plus an OS template store. Replacing the reader means seating its cable (often another tiny flex) and then **re-enrolling** the user. Templates do not always survive a module swap. If Hello or Touch ID fails after a palm-rest replacement, enroll again before you declare the board dead.

A fingerprint reader that never lights and never appears in Device Manager is a cable or a missing module. A reader that appears but rejects every finger after a board swap may need the vendor's pairing / match-on-host process. Do not send biometric images off-site as a "backup."

**Near-field communication (NFC)** scanners on business laptops sit near the palm rest or under a printed target. They read employee badges, support tap-to-pair, and sometimes land in the same "privacy/security hardware" bucket as biometrics on the exam. Range is centimeters. If badge tap stops working after a top-case swap, the NFC antenna foil in the palm rest was omitted or folded. That foil is easy to throw away with the old case.

Privacy also includes what you do not add. Tape over a camera is a user workaround; a shutter is a FRU feature. A microphone LED that will not light can be policy (MDM in 1.3) rather than hardware — but 1.1 still expects you to know the physical module exists and is replaceable when the chassis design says so.

When the stem says "near-field scanner," think NFC hardware, not a copier's automatic document feeder and not a fingerprint reader.`,
      },
      {
        type: "knowledge-check",
        id: "C1-D1-O1-L3-kc2",
        questionIds: ["C1-D1-O1-BIOMETRIC-Q001"],
      },
      {
        type: "callout",
        id: "C1-D1-O1-L3-exam",
        callout: {
          kind: "exam",
          title: "Exam lens",
          body: "A screen replacement followed by missing Wi-Fi is an antenna-pigtail item until the stem gives you a reason to replace the WLAN card. Face-unlock failure after a bezel swap is the IR camera cable or re-enrollment, not 'reset the BIOS password.'",
        },
      },
      {
        type: "callout",
        id: "C1-D1-O1-L3-safety",
        callout: {
          kind: "safety",
          title: "Hinge cables",
          body: "Do not open a clamshell past 180 degrees to 'get a better look' while display cables are still attached. You will tear the camera cable and both antenna leads in one motion.",
        },
      },
      {
        type: "checkpoint",
        id: "C1-D1-O1-L3-cp",
        questionIds: [
          "C1-D1-O1-BATTERY-Q002",
          "C1-D1-O1-KEYBOARD-Q002",
          "C1-D1-O1-SODIMM-Q002",
          "C1-D1-O1-STORAGE-Q002",
          "C1-D1-O1-WLAN-Q001",
          "C1-D1-O1-ANTENNA-Q002",
          "C1-D1-O1-WEBCAM-Q001",
          "C1-D1-O1-BIOMETRIC-Q002",
        ],
      },
      {
        type: "summary",
        id: "C1-D1-O1-L3-sum",
        bullets: [
          "Antennas are in the bezel; the card is only the radio.",
          "Webcam and microphones ride in the lid on a fragile hinge cable.",
          "Fingerprint and IR face sensors need reseating and often re-enrollment.",
          "Near-field scanners are NFC hardware, often a foil antenna in the palm rest.",
        ],
      },
    ],
  },
  {
    id: "C1-D1-O2-L1",
    objectiveId: "C1-D1-O2",
    slug: "mobile-connectors-wireless",
    title: "USB, Lightning, NFC, Bluetooth, and tethering",
    description:
      "Match connector families and short-range radios to the job: USB shapes versus speeds, Lightning, NFC tap, Bluetooth pairing, and hotspot versus tether.",
    estimatedMinutes: 22,
    conceptIds: [
      "C1-D1-O2-USB",
      "C1-D1-O2-LIGHTNING",
      "C1-D1-O2-NFC",
      "C1-D1-O2-BT",
    ],
    prerequisites: ["C1-D1-O1-L3"],
    lastVerified: "2026-09-01",
    sources: ["c1-obj-3.0", "comptia-a-v15", "usb-if"],
    blocks: [
      {
        type: "callout",
        id: "C1-D1-O2-L1-why",
        callout: {
          kind: "why",
          title: "Why this matters",
          body: "Users point at a hole and say 'USB.' That hole might be USB-A, USB-C carrying only USB 2.0, USB-C with DisplayPort Alt Mode, Lightning, or a charging-only port. Objective 1.2 is compare-and-contrast: pick the connection that actually does the job.",
        },
      },
      {
        type: "reading",
        id: "C1-D1-O2-L1-r1",
        title: "Connector shape is not a speed grade",
        markdown: `**Universal Serial Bus (USB)** is a family. The exam lists **USB / USB-C / microUSB / miniUSB** because those are the shapes you will see on phones, tablets, cameras, and accessories.

**USB Type-A** is the rectangular host connector on older laptops and chargers. **USB Type-C** is the small oval, reversible plug now common on phones and notebooks. **Micro-USB** is the tapered phone connector from the 2010s. **Mini-USB** is slightly larger, still on some cameras, radios, and older GPS units. Mini is not micro. Forcing one into the other breaks the receptacle.

Shape does not equal version. USB 2.0 High Speed is 480 Mbps and still appears on USB-C cables and ports. USB 3.x SuperSpeed starts at 5 Gbps and uses extra pins; a blue Type-A insert is a hint, not a law. USB4 and Thunderbolt 3/4 also use the USB-C shell. **USB-C is a connector. Thunderbolt is a protocol that can ride on that connector.** A USB-C charging brick may supply power only. A USB-C port on a dock may carry USB data, video (**DisplayPort Alt Mode**), and power delivery at once — or it may be a cheap 2.0 port painted oval.

Power delivery is its own negotiation. A phone that charges slowly on a laptop's USB-A port is not "broken"; that port may be 5 V / 0.5 A. USB Power Delivery on USB-C can charge a notebook if both ends and the cable are PD-capable.

Cables lie. A USB-C cable can be USB 2.0-only, SuperSpeed, or a digitally marked Thunderbolt cable. If a 4K display flickers on a dock, suspect the cable and the port's Alt Mode support before the GPU.

For A+, identify the plug, state what it can carry in this scenario, and do not upgrade a micro-USB phone by wishing it were USB-C.`,
      },
      {
        type: "diagram",
        id: "C1-D1-O2-L1-d1",
        component: "ConnectorGallery",
        title: "Mobile connector gallery",
        caption:
          "USB-A, USB-C, micro-USB, mini-USB, and Lightning — identify by shape, then ask what protocols that port actually implements.",
        notice:
          "Notice Lightning is an Apple 8-pin, not USB-C. Notice mini-USB and micro-USB are not interchangeable. Notice USB-C does not guarantee Thunderbolt or even USB 3 speeds.",
        alt: "Gallery of USB-A, USB-C, micro-USB, mini-USB, and Lightning plugs with labels for reversibility and typical uses.",
      },
      {
        type: "knowledge-check",
        id: "C1-D1-O2-L1-kc1",
        questionIds: ["C1-D1-O2-USB-Q001"],
      },
      {
        type: "reading",
        id: "C1-D1-O2-L1-r2",
        title: "Lightning, NFC, Bluetooth, tether, hotspot",
        markdown: `**Lightning** is Apple's 8-pin reversible connector used on iPhone and accessory generations before the USB-C switch. It carries USB data and charging. It is not USB-C even though both are reversible. **Made for iPhone (MFi)** authentication is why some third-party Lightning cables charge but will not sync, or show a warning. On the exam, Lightning means Apple 8-pin, not a thunderbolt icon and not USB-C.

**Near-field communication (NFC)** is a radio with a range of about four centimeters. Tap-to-pay, tap-to-pair, and badge reads are NFC jobs. It is not Bluetooth. Bluetooth is a **personal area network** with a typical Class 2 range around 10 meters. NFC can bootstrap a Bluetooth pairing (tap, then the longer-range session takes over), which is why the two appear in the same objective and still must not be treated as synonyms.

**Bluetooth** accessories (headsets, speakers, styluses, keyboards) need a pairing sequence you will rehearse in 1.3: enable the radio, make the accessory discoverable, find it, enter a PIN if asked, test. For 1.2, know that Bluetooth is the cordless accessory bus, it shares 2.4 GHz with some Wi-Fi, and a paired device can still fail because the profile (audio, HID, file transfer) was never granted.

**Tethering** and **hotspot** both share a phone's cellular data with another device. USB tethering is a cable: the phone becomes a network adapter for one host, often the most reliable and the least radio-noisy. Bluetooth tethering is slower and still one-to-few. A **Wi-Fi hotspot** turns the phone into an access point that several devices can join. All three count against the **cellular data cap**. Hotspot is not "free Wi-Fi." Enable it only when the user understands the meter.

If the stem wants one laptop online from a phone with the most stable link and least battery drama, USB tethering is often BEST. If several laptops need the phone, hotspot is the tool.`,
      },
      {
        type: "table",
        id: "C1-D1-O2-L1-t1",
        title: "Connection methods at A+ depth",
        headers: ["Method", "Range / medium", "Typical job"],
        rows: [
          ["USB-A / USB-C / micro / mini", "Cable", "Charge, data, sometimes video and PD"],
          ["Lightning", "Apple 8-pin cable", "Charge and sync Apple devices that still use it"],
          ["NFC", "Centimeters, tap", "Pay, badge, kick off pairing"],
          ["Bluetooth", "About 10 m PAN", "Headsets, mice, speakers, some tethering"],
          ["USB tethering", "Cable to one host", "Share cellular as a NIC"],
          ["Wi-Fi hotspot", "Phone as AP", "Share cellular with one or more Wi-Fi clients"],
        ],
        caption: "Pick by job, not by which logo the user recognized.",
      },
      {
        type: "knowledge-check",
        id: "C1-D1-O2-L1-kc2",
        questionIds: ["C1-D1-O2-NFC-Q001"],
      },
      {
        type: "callout",
        id: "C1-D1-O2-L1-mistake",
        callout: {
          kind: "mistake",
          title: "Common mistake",
          body: "USB-C ≠ USB 3, and USB-C ≠ Thunderbolt. NFC ≠ Bluetooth. Lightning ≠ USB-C. Mini-USB ≠ micro-USB. Those five confusions write most of the bad 1.2 answers.",
        },
      },
      {
        type: "summary",
        id: "C1-D1-O2-L1-sum",
        bullets: [
          "Name the plug, then name the protocols that port actually speaks.",
          "Lightning is Apple 8-pin; USB-C is USB-IF oval.",
          "NFC is tap-range; Bluetooth is a PAN.",
          "Tethering (often USB) versus hotspot (phone as AP); both burn cellular data.",
        ],
      },
    ],
  },
  {
    id: "C1-D1-O2-L2",
    objectiveId: "C1-D1-O2",
    slug: "docks-accessories-pointing",
    title: "Docks, port replicators, and mobile accessories",
    description:
      "Docking station versus port replicator, then stylus, headsets, speakers, webcams, trackpads, drawing pads, and TrackPoints.",
    estimatedMinutes: 20,
    conceptIds: ["C1-D1-O2-DOCK", "C1-D1-O2-REPLICATOR", "C1-D1-O2-BT"],
    prerequisites: ["C1-D1-O2-L1"],
    lastVerified: "2026-09-01",
    sources: ["c1-obj-3.0", "comptia-a-v15", "usb-if"],
    blocks: [
      {
        type: "callout",
        id: "C1-D1-O2-L2-why",
        callout: {
          kind: "why",
          title: "Why this matters",
          body: "A user who buys a $30 USB hub and calls it a dock will not charge the laptop, will not drive two 4K displays, and will still open a ticket titled 'dock broken.' You need the vendor distinction, not the marketing one.",
        },
      },
      {
        type: "reading",
        id: "C1-D1-O2-L2-r1",
        title: "Docking station versus port replicator",
        markdown: `A **docking station** is meant to be the desk: one connection (proprietary slice, barrel plus USB, or a single USB-C / Thunderbolt cable) that supplies **power at the laptop's required wattage**, extra USB, wired Ethernet, video to one or more external displays, audio, and sometimes a lock or a slot that physically holds the notebook. Firmware and vendor drivers may expose extra features (MAC address passthrough, wake-on-LAN from the dock NIC, DisplayLink or GPU-backed multi-monitor). When the user undocks, they take one cable off and leave the monitors and dongles behind.

A **port replicator** is the smaller idea: duplicate ports so the user is not stacking dongles. It may be USB-A or USB-C. It often **does not charge** the laptop, or charges only at phone-level power. It typically has no proprietary mechanical dock, no WOL story, and weaker video (one display, or DisplayLink that loads the CPU). On the exam, if the stem emphasizes charging, mechanical latching, full video, and Ethernet as a desk replacement, the answer is docking station. If the stem emphasizes extra ports without power or vendor lock-in, the answer is port replicator.

USB-C / Thunderbolt docks blur the line because one cable can do power, data, and video. Still apply the test: does this unit meet the laptop's PD budget and the display count in the scenario? A 45 W PD hub under a 140 W workstation notebook is a replicator pretending to be a dock. The laptop will drain while "docked."

Drivers matter. DisplayLink docks need software. Thunderbolt docks may need an authorize prompt in Windows or macOS. A brand-new dock that does everything except the two HDMI ports is often an authorization or cable problem, not a failed GPU.

Physical security: some docks include a noble-wedge slot or a latch. That is a dock feature. A plastic USB hub has none of it.`,
      },
      {
        type: "table",
        id: "C1-D1-O2-L2-t1",
        title: "Dock versus replicator",
        headers: ["Question", "Docking station", "Port replicator"],
        rows: [
          [
            "Charges the laptop at full adapter wattage?",
            "Expected, with a dedicated power brick",
            "Often no, or only low-wattage PD",
          ],
          [
            "Mechanical hold / vendor connector?",
            "Common on business docks",
            "Rare; hangs off USB",
          ],
          [
            "Multi-display + Ethernet + audio as a desk?",
            "Yes, that is the point",
            "Limited; maybe one display",
          ],
          [
            "Wake-on-LAN, MAC passthrough, manageability?",
            "Often, with vendor software",
            "Typically none",
          ],
          [
            "Exam shorthand",
            "Replace the desk",
            "Multiply the ports",
          ],
        ],
        caption: "Marketing will call both 'docks.' The objectives do not.",
      },
      {
        type: "knowledge-check",
        id: "C1-D1-O2-L2-kc1",
        questionIds: ["C1-D1-O2-DOCK-Q001"],
      },
      {
        type: "reading",
        id: "C1-D1-O2-L2-r2",
        title: "Styluses, audio, cameras, and pointing devices",
        markdown: `**Accessories** on the 1.2 list are the add-ons you match to a job.

A **stylus** (active pen) talks to a digitizer in a tablet or convertible. Some need Bluetooth pairing for buttons and pressure extras; the drawing surface still works as a passive digitizer if Bluetooth is off. Spare tips wear out. If the pen draws offset, you calibrate the digitizer; you do not replace the WLAN card. Drawing **pads** are external digitizer tablets for artists — USB or Bluetooth — and are not the laptop's built-in trackpad.

**Headsets** may be 3.5 mm analog (CTIA vs OMTP pinouts still bite on older phones), USB, or Bluetooth. A Bluetooth headset that pairs but has no audio is a profile problem (Hands-Free versus stereo / A2DP) or an OS default-device problem. **Speakers** follow the same buses. If the laptop speakers work and the Bluetooth speaker does not, stop replacing audio drivers for the built-in codec.

An external **webcam** is USB. It is the workaround when the bezel camera fails and the user has a meeting in ten minutes. It is also a privacy choice: a coverable desk camera instead of the lid module. On video calls, the OS may still default to the broken internal camera until you switch devices.

**Trackpads** are the built-in capacitive pointer; external USB/Bluetooth trackpads exist for presentations. **TrackPoints** (the rubber nub between G, H, and B on many ThinkPads) are a separate pointing stick with their own caps and a separate failure mode from the trackpad. Users who say "the mouse nub is dead but the pad works" are describing two devices. Replace or reseat the pointing-stick assembly, not the entire input stack by reflex.

Match the accessory to the constraint: warehouse gloves → not a fingerprint-only workflow; quiet office → headset with a mute; artist → stylus plus digitizer, not a drawing app on a phone with a finger.`,
      },
      {
        type: "knowledge-check",
        id: "C1-D1-O2-L2-kc2",
        questionIds: ["C1-D1-O2-REPLICATOR-Q001"],
      },
      {
        type: "callout",
        id: "C1-D1-O2-L2-exam",
        callout: {
          kind: "exam",
          title: "Exam lens",
          body: "If the laptop still loses charge while connected to a 'dock,' the unit is not meeting PD/wattage — treat it as a replicator (or a wrong brick), not as a battery calibration. If two pointing devices disagree, they are two FRUs.",
        },
      },
      {
        type: "callout",
        id: "C1-D1-O2-L2-tech",
        callout: {
          kind: "technician",
          title: "Technician lens",
          body: "Ask how many displays, whether the laptop must charge, and whether Ethernet is required before you order hardware. Those three answers separate a Thunderbolt dock from a four-port hub.",
        },
      },
      {
        type: "checkpoint",
        id: "C1-D1-O2-L2-cp",
        questionIds: [
          "C1-D1-O2-USB-Q002",
          "C1-D1-O2-USB-Q003",
          "C1-D1-O2-LIGHTNING-Q001",
          "C1-D1-O2-NFC-Q002",
          "C1-D1-O2-BT-Q001",
          "C1-D1-O2-DOCK-Q002",
          "C1-D1-O2-REPLICATOR-Q002",
          "C1-D1-O2-BT-Q002",
        ],
      },
      {
        type: "summary",
        id: "C1-D1-O2-L2-sum",
        bullets: [
          "Docks replace the desk (power, video, Ethernet, often a latch).",
          "Port replicators multiply ports and often skip charging.",
          "Styluses need a digitizer; Bluetooth only adds extra buttons.",
          "Headsets, speakers, webcams, trackpads, drawing pads, and TrackPoints are separate devices with separate buses.",
        ],
      },
    ],
  },
  {
    id: "C1-D1-O3-L1",
    objectiveId: "C1-D1-O3",
    slug: "cellular-sim-esim-hotspot",
    title: "Cellular, Wi-Fi, SIM/eSIM, hotspot, and data caps",
    description:
      "Enable and disable radios on purpose: 3G/4G/5G, Wi-Fi versus cellular, physical SIM versus eSIM, hotspots, and the meter that makes all of it expensive.",
    estimatedMinutes: 22,
    conceptIds: ["C1-D1-O3-CELLULAR", "C1-D1-O3-ESIM", "C1-D1-O3-DATACAP"],
    prerequisites: ["C1-D1-O2-L2"],
    lastVerified: "2026-09-01",
    sources: ["c1-obj-3.0", "comptia-a-v15"],
    blocks: [
      {
        type: "callout",
        id: "C1-D1-O3-L1-why",
        callout: {
          kind: "why",
          title: "Why this matters",
          body: "A phone with 'no internet' might have Wi-Fi off, cellular data off, airplane mode on, a missing SIM profile, or a cap that already throttled the line. 1.3 is configuration: you enable the right radio and you respect the meter.",
        },
      },
      {
        type: "reading",
        id: "C1-D1-O3-L1-r1",
        title: "Radios you can turn off independently",
        markdown: `A smartphone is several radios in one slab. **Wi-Fi**, **cellular** (the wide-area data network), **Bluetooth**, **NFC**, and **GPS** each have an enable switch. **Airplane mode** is the master "shut the transmitters up" control; many phones still let you re-enable Wi-Fi and Bluetooth afterward for the in-flight network. If the user cannot browse, do not start with a new eSIM. Look at the toggles.

Cellular generations on the objective list are **3G / 4G / 5G**. **3G** (UMTS/HSPA and cousins) is shut down in many countries; a 3G-only handset on a sunset network has no data even with a valid SIM. **4G LTE** remains the workhorse. **5G** includes sub-6 GHz (range similar to good LTE) and, in some cities, **mmWave** (very fast, very short, blocked by a hand or a window). The status icon does not prove throughput. Preferred-network settings that pin a phone to 3G "for battery" can strand it. Unless a carrier engineer told you otherwise, leave automatic 5G/LTE selection on.

**Wi-Fi** is the LAN radio. For mail and sync it is usually cheaper and more stable than cellular. Corporate phones may be forced onto a specific SSID by MDM. A phone that shows full cellular bars and still cannot load intranet sites may be on LTE with no VPN, not "broken Wi-Fi."

A **hotspot** (USB, Bluetooth, or Wi-Fi as in 1.2) is the phone pretending to be an access point or a NIC, using the **cellular** pipe. Enabling hotspot on a metered plan is a billing event. Some carriers disable hotspot unless the plan includes tethering. If hotspot will not start, it can be plan policy, not a radio failure.

Monitor **signal, generation, and roaming**. Roaming can be data-off by default. International users who "have bars" but no mail often have roaming data disabled — which is correct until they accept the cost.`,
      },
      {
        type: "diagram",
        id: "C1-D1-O3-L1-d1",
        component: "PhoneSettingsDiagram",
        title: "Phone radios and identity",
        caption:
          "Airplane mode, Wi-Fi, cellular data, hotspot, SIM/eSIM profiles, and the data-cap / metered warnings live in settings, not under the camera bezel.",
        notice:
          "Notice cellular data can be off while Wi-Fi is on. Notice an eSIM profile is not a second physical tray. Notice hotspot uses the cellular pipe and the cap.",
        alt: "Smartphone settings map showing airplane mode, Wi-Fi, cellular, hotspot, SIM and eSIM, location, and data-cap controls.",
      },
      {
        type: "knowledge-check",
        id: "C1-D1-O3-L1-kc1",
        questionIds: ["C1-D1-O3-CELLULAR-Q001"],
      },
      {
        type: "reading",
        id: "C1-D1-O3-L1-r2",
        title: "SIM, eSIM, and the data cap",
        markdown: `The **Subscriber Identity Module (SIM)** is how the carrier identifies the line. A **physical SIM** today is usually **nano-SIM** in a tray. Pop the tray with the tool, note the notched corner, and do not insert it upside down. Swapping a known-good SIM into a suspect phone (or the suspect SIM into a known-good phone) is the classic isolate-the-line test. If the problem follows the SIM, it is account, provisioning, or the SIM itself. If it stays with the handset, it is radio, firmware, or settings.

An **eSIM** is an embedded profile you download — QR code, carrier app, or MDM push — onto a chip that is already in the phone. There is no tray to "seat." Dual-SIM phones often combine one physical SIM and one eSIM, or two eSIM profiles with one active for data. Transferring a line from a broken phone means the carrier must release or move the eSIM; stealing the old handset's tray does nothing if the line was eSIM-only.

Activation pitfalls: leftover profiles, a phone locked to another carrier, and a user who scanned the QR twice and consumed the one-time code. Deleting an eSIM is not the same as turning cellular off; it removes the line from that device.

**Data caps** are plan limits. When the cap hits, the carrier may throttle, charge overage, or cut data. OS **metered** flags (Windows) and iOS Low Data Mode / Android data warnings exist so background **sync** (next lesson) does not finish the month on Tuesday. Hotspot traffic usually counts against the same cap, sometimes from a smaller hotspot bucket. The BEST prevention is: prefer Wi-Fi, disable background cellular for huge apps, and tell the user what the hotspot is costing.

Never "fix" a cap by recommending a VPN as if it created free bytes. Encryption does not mint data.`,
      },
      {
        type: "table",
        id: "C1-D1-O3-L1-t1",
        title: "Physical SIM versus eSIM",
        headers: ["", "Physical SIM", "eSIM"],
        rows: [
          ["What you hold", "Nano card in a tray", "Downloaded profile on an embedded chip"],
          ["Move to a new phone", "Move the card (if unlocked)", "Carrier QR / app / MDM transfer"],
          ["Field test", "Swap SIM between two handsets", "Cannot 'swap the chip'; test with another profile or device"],
          ["Dual-SIM typical mix", "Tray + eSIM", "Two profiles, one or both eSIM"],
          ["User-deletable?", "Remove the card", "Delete the profile — that drops the line on this device"],
        ],
        caption: "V15 names SIM/eSIM explicitly. Treat them as identity, not as 'the 5G antenna.'",
      },
      {
        type: "knowledge-check",
        id: "C1-D1-O3-L1-kc2",
        questionIds: ["C1-D1-O3-ESIM-Q001"],
      },
      {
        type: "callout",
        id: "C1-D1-O3-L1-exam",
        callout: {
          kind: "exam",
          title: "Exam lens",
          body: "No service after a phone swap plus an eSIM-only line means provision the eSIM, not 'seat the SIM harder.' A hotspot that dies at 5 GB is a cap or plan policy, not a WLAN card in the laptop.",
        },
      },
      {
        type: "summary",
        id: "C1-D1-O3-L1-sum",
        bullets: [
          "Airplane mode, Wi-Fi, and cellular data are separate switches.",
          "3G is often dead; 4G LTE and 5G are the current pair.",
          "SIM is a card; eSIM is a downloaded profile.",
          "Hotspot and background sync consume the data cap.",
        ],
      },
    ],
  },
  {
    id: "C1-D1-O3-L2",
    objectiveId: "C1-D1-O3",
    slug: "bluetooth-location-sync",
    title: "Bluetooth pairing, location services, and synchronization",
    description:
      "Walk the official pairing sequence, separate GPS from cellular location, and set up mail/contacts/calendar sync without blowing a data cap.",
    estimatedMinutes: 22,
    conceptIds: ["C1-D1-O3-GPS", "C1-D1-O3-SYNC", "C1-D1-O3-CELLULAR"],
    prerequisites: ["C1-D1-O3-L1"],
    lastVerified: "2026-09-01",
    sources: ["c1-obj-3.0", "comptia-a-v15"],
    blocks: [
      {
        type: "callout",
        id: "C1-D1-O3-L2-why",
        callout: {
          kind: "why",
          title: "Why this matters",
          body: "Pairing a headset and configuring corporate mail are both 1.3 scenarios. If you skip a step (discoverable mode, PIN, test) or sync mail over cellular on a 1 GB plan, you created the next ticket.",
        },
      },
      {
        type: "reading",
        id: "C1-D1-O3-L2-r1",
        title: "The Bluetooth pairing sequence is ordered",
        markdown: `CompTIA writes the **Bluetooth** steps in order because skipping one is how you get "it is connected but it is not connected."

1. **Enable Bluetooth** on the phone or laptop. Airplane mode may have killed it even if the user "already paired last year."
2. **Enable pairing** on the accessory — discoverable / pairing mode. Many headsets need a held button until an LED flashes. If the accessory is not advertising, the phone cannot find it.
3. **Find a device for pairing** in the OS scanner. Confirm the name; conference rooms are full of identically named speakers.
4. **Enter the PIN** if asked. Common defaults are 0000 or 1234, or a six-digit passkey you compare on both screens. Do not type the Wi-Fi password into a Bluetooth prompt.
5. **Test connectivity.** Play audio, move the mouse, or transfer a file using the profile you actually need. Pairing without a successful profile is not a finish.

Then the failures that look like pairing but are not: battery dead in the accessory, another phone still holding the only connection, HID and audio both trying to own a cheap dongle, 2.4 GHz interference, and an OS privacy toggle that blocked the accessory after an update. Unpair, reboot both ends, pair again is a valid NEXT after you already confirmed discoverable mode. Starting over with a new laptop is not FIRST.

Bluetooth is a PAN. It is the wrong tool for filling a warehouse with coverage — that is Wi-Fi. It is the right tool for a headset, a stylus extra button, a speaker, and some car kits.`,
      },
      {
        type: "table",
        id: "C1-D1-O3-L2-t1",
        title: "Official Bluetooth pairing order",
        headers: ["Step", "What you do", "If you skip it"],
        rows: [
          ["1", "Enable Bluetooth on the host", "Scanner is empty; user blames the headset"],
          ["2", "Enable pairing / discoverable on the accessory", "Host never sees the device"],
          ["3", "Find the device in the list", "You pair the wrong speaker in the room"],
          ["4", "Enter the PIN / confirm the passkey", "Pairing request sits until it times out"],
          ["5", "Test connectivity on the needed profile", "Shows 'connected' with no audio or no pointer"],
        ],
        caption: "Memorize the verbs. The exam will scramble them.",
      },
      {
        type: "knowledge-check",
        id: "C1-D1-O3-L2-kc1",
        questionIds: ["C1-D1-O3-CELLULAR-Q002"],
      },
      {
        type: "reading",
        id: "C1-D1-O3-L2-r2",
        title: "GPS versus cellular location, then sync",
        markdown: `**Location services** are not one radio.

**Global Positioning System (GPS)** (and related GNSS: GLONASS, Galileo, BeiDou) uses satellites. It is accurate outdoors, weak indoors, and does not need a cellular plan. A warehouse phone can still get a GPS fix near a window with airplane mode on, if the location toggle and GPS radio are enabled.

**Cellular location** estimates position from tower IDs and timing. It works indoors better than GPS, is less precise, and needs the cellular radio. Phones also use Wi-Fi BSSID databases. The OS fuses these. When MDM needs to **locate a lost device**, it will use whatever the policy left on. If the user disabled location entirely, Find My / locator apps cannot magic a pin.

Privacy: location is a permission. Maps, cameras, and weather will beg for it. Corporate policy may require location for the work profile only. Turning location off is a valid user choice unless MDM enforces it.

**Synchronization** is the other half of 1.3 application support. Users need **mail, contacts, and calendars** on the phone that match the server. In current shops that means **Microsoft 365** (Exchange Online), **Google Workspace**, or **iCloud**, configured as accounts — not as "download Outlook tomorrow." Use the vendor's account path so the device respects modern authentication and **multifactor**. IMAP is acceptable for mail-only; **POP3** that deletes off the server is how you hide mail from the desktop. Two-way sync is the default for contacts and calendars; confirm that before a user "clears duplicates" and wipes the company directory.

Sync over cellular eats the **data cap**, especially photo libraries and mail with huge attachments. Set heavy libraries to Wi-Fi only. A sync conflict (two edits) is not malware.

Account setup includes the server hostname only when you are on a leftover on-prem Exchange path. For 365 and Google, the OS discovers endpoints after a successful sign-in. If mail fails with a valid password, think MDM restrictions, app protection, or modern-auth / 2FA — not "the IMAP port on the phone is 23."`,
      },
      {
        type: "knowledge-check",
        id: "C1-D1-O3-L2-kc2",
        questionIds: ["C1-D1-O3-GPS-Q001"],
      },
      {
        type: "callout",
        id: "C1-D1-O3-L2-mistake",
        callout: {
          kind: "mistake",
          title: "Common mistake",
          body: "GPS does not require a SIM. Cellular location does not require a view of the sky. Sync is not a backup: deleting a contact on a two-way account deletes it on the server.",
        },
      },
      {
        type: "callout",
        id: "C1-D1-O3-L2-tech",
        callout: {
          kind: "technician",
          title: "Technician lens",
          body: "When a headset 'is connected' with silence, test by playing a tone and checking the OS audio output device. When mail is missing on one of three devices, look at the account type (IMAP vs POP vs Exchange) before you rebuild the phone.",
        },
      },
      {
        type: "summary",
        id: "C1-D1-O3-L2-sum",
        bullets: [
          "Bluetooth: enable radio → pairing mode → find → PIN → test.",
          "GPS is satellites; cellular location is towers; the OS may fuse both.",
          "Mail/contacts/calendar sync through 365, Google, or iCloud accounts.",
          "Two-way sync deletes everywhere; heavy sync belongs on Wi-Fi.",
        ],
      },
    ],
  },
  {
    id: "C1-D1-O3-L3",
    objectiveId: "C1-D1-O3",
    slug: "mdm-byod-policy",
    title: "MDM, BYOD versus corporate-owned, and policy",
    description:
      "Enroll a device, push the work profile, enforce passcodes and apps, and choose remote wipe versus selective wipe without destroying someone's photos.",
    estimatedMinutes: 22,
    conceptIds: ["C1-D1-O3-MDM", "C1-D1-O3-BYOD", "C1-D1-O3-SYNC"],
    prerequisites: ["C1-D1-O3-L2"],
    lastVerified: "2026-09-01",
    sources: ["c1-obj-3.0", "comptia-a-v15"],
    blocks: [
      {
        type: "callout",
        id: "C1-D1-O3-L3-why",
        callout: {
          kind: "why",
          title: "Why this matters",
          body: "Without mobile device management, corporate mail on a personal phone is a copy of the company on a device you cannot lock, find, or wipe. With MDM used carelessly, you wipe a BYOD user's family photos. 1.3 expects you to know the difference.",
        },
      },
      {
        type: "reading",
        id: "C1-D1-O3-L3-r1",
        title: "What MDM actually enforces",
        markdown: `**Mobile device management (MDM)** is software that enrolls phones and tablets into a policy engine (Intune, a vendor MDM, or similar). After enrollment the tenant can inventory the device, push **configuration profiles**, require encryption and a passcode, deploy **corporate applications**, configure **corporate email**, require **multifactor authentication**, and, when the device is lost or the employee leaves, **locate**, **remotely back up** (where licensed), or **remotely wipe**.

Enrollment is the gate. Until the device is enrolled, you have a consumer phone that happens to have a work mailbox. Users enroll via company portal, a QR, Apple Business Manager / Android Zero Touch, or a token. Supervised / fully managed mode is stronger than a work profile.

Policies you will see in scenarios:

- Passcode complexity, idle lock, and **failed login** limits (wipe or lock after N tries).
- Camera or USB disabled in high-security areas.
- **Trusted versus untrusted sources** — block sideloading and unknown stores.
- App allow-lists and required **business apps** (the managed mail client, VPN, authenticator).
- Location on for the locator feature.
- Encryption on; jailbreak / root detection that marks the device noncompliant.

**Remote wipe** has two depths. A **full wipe** returns the device to factory state. A **selective wipe** (work profile / corporate container) removes company mail, apps, and tokens and leaves personal photos. The BEST wipe is the one that matches ownership and legal policy, not the most dramatic button.

MDM is not antivirus by itself, and it is not a backup you skip testing. It is policy plus reachability. A phone in airplane mode in a river cannot be wiped until it next checks in — which is why passcode and encryption still matter when the network does not.`,
      },
      {
        type: "table",
        id: "C1-D1-O3-L3-t1",
        title: "MDM actions versus ownership",
        headers: ["Action", "Corporate-owned", "BYOD (personal)"],
        rows: [
          [
            "Full device wipe",
            "Normal at offboarding or loss",
            "Usually excessive; prefer selective wipe",
          ],
          [
            "Selective / work-profile wipe",
            "Optional",
            "The default offboarding tool",
          ],
          [
            "Force encryption, PIN, Hello",
            "Yes",
            "Yes, often only on the work container plus a device PIN",
          ],
          [
            "Require corporate apps / block stores",
            "Full control",
            "Work profile only; personal apps stay",
          ],
          [
            "Locate device",
            "Yes, with policy disclosure",
            "Often work-hours / work-profile only, or declined",
          ],
          [
            "Install a personal game",
            "May be blocked",
            "Allowed outside the work profile",
          ],
        ],
        caption:
          "BYOD means the human owns the hardware. Corporate-owned means the company does. MDM can manage both; the wipe and privacy story changes.",
      },
      {
        type: "knowledge-check",
        id: "C1-D1-O3-L3-kc1",
        questionIds: ["C1-D1-O3-MDM-Q001"],
      },
      {
        type: "reading",
        id: "C1-D1-O3-L3-r2",
        title: "BYOD, corporate-owned, and business apps",
        markdown: `**Bring your own device (BYOD)** is a personal phone or tablet used for work. The company does not buy the handset. Risk goes up: mixed apps, untrusted stores, family members, and no hardware inventory unless MDM enrolls it. The usual mitigation is a **work profile** (Android) or managed Apple ID / app-protection policies (iOS) so corporate mail lives in a container. If the user leaves, you wipe the container, not the baby's photos.

**Corporate-owned** devices (sometimes COPE — corporate owned, personally enabled — or fully managed) are assets. You can require a specific model, lock the bootloader story, push Wi-Fi and VPN profiles, and full-wipe at offboarding. Lost corporate phones get locator plus wipe as a standard playbook.

Policy enforcement is not optional flavoring. If the tenant says "mail only in the managed Outlook app," then the native Mail app that the user prefers is noncompliant even if it "works." If the tenant blocks unknown sources, sideloading the "same" APK from a browser is a finding, not a workaround you teach.

**Business apps** are the managed catalog: mail, authenticator, VPN, files client, line-of-business apps. They install from the MDM, not from a random store. Updates can be forced. If a required app is missing, the device may be blocked from mail until it becomes compliant. That is not a network outage.

When a scenario says the CEO's personal iPhone cannot get corporate mail after a policy change, FIRST read the compliance blade: passcode missing, OS too old, jailbreak flagged, or enrollment expired. Replacing the phone is not FIRST. When a scenario says an employee is terminated, NEXT is to revoke tokens and wipe according to ownership — corporate full wipe, BYOD selective wipe — and to document it.

Core 2 will return to mobile security (locks, remote wipe, encryption) in more depth. 1.3 is the Core 1 job: get the device on the network, enrolled, syncing the right accounts, and inside policy.`,
      },
      {
        type: "knowledge-check",
        id: "C1-D1-O3-L3-kc2",
        questionIds: ["C1-D1-O3-BYOD-Q001"],
      },
      {
        type: "callout",
        id: "C1-D1-O3-L3-exam",
        callout: {
          kind: "exam",
          title: "Exam lens",
          body: "BEST wipe follows ownership. FIRST step on 'cannot get corporate mail' is enrollment/compliance, not a new SIM. Jailbroken BYOD that still syncs is a policy miss, not a success.",
        },
      },
      {
        type: "callout",
        id: "C1-D1-O3-L3-tech",
        callout: {
          kind: "technician",
          title: "Technician lens",
          body: "Say out loud to the user what MDM will be able to see and wipe before they enroll a personal phone. Surprise full-wipes are how help desk ends up on the evening news.",
        },
      },
      {
        type: "checkpoint",
        id: "C1-D1-O3-L3-cp",
        questionIds: [
          "C1-D1-O3-CELLULAR-Q003",
          "C1-D1-O3-ESIM-Q002",
          "C1-D1-O3-DATACAP-Q001",
          "C1-D1-O3-GPS-Q002",
          "C1-D1-O3-SYNC-Q001",
          "C1-D1-O3-MDM-Q002",
          "C1-D1-O3-BYOD-Q002",
          "C1-D1-O3-MDM-Q003",
        ],
      },
      {
        type: "summary",
        id: "C1-D1-O3-L3-sum",
        bullets: [
          "MDM enrolls devices, pushes profiles, apps, mail, and restrictions.",
          "Full wipe versus selective wipe is an ownership decision.",
          "BYOD uses a work container; corporate-owned can be fully managed.",
          "Business apps and compliance gates are policy, not optional cosmetics.",
        ],
      },
    ],
  },
];
