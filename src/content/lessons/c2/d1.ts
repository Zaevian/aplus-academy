import type { Lesson } from "../../schema";

export const C2_D1_LESSONS: Lesson[] = [
  {
    id: "C2-D1-O1-L1",
    objectiveId: "C2-D1-O1",
    slug: "os-types-workstation-mobile",
    title: "Workstation and mobile operating systems",
    description:
      "Match Windows, Linux, macOS, ChromeOS, iOS, iPadOS, and Android to hardware, management, and user jobs.",
    estimatedMinutes: 22,
    conceptIds: [
      "C2-D1-O1-WIN",
      "C2-D1-O1-LINUX",
      "C2-D1-O1-MAC",
      "C2-D1-O1-CHROMEOS",
    ],
    prerequisites: [],
    lastVerified: "2026-09-01",
    sources: ["c2-obj-3.0", "ms-windows", "apple-macos", "debian-ref"],
    blocks: [
      {
        type: "callout",
        id: "C2-D1-O1-L1-why",
        callout: {
          kind: "why",
          title: "Why this matters",
          body: "A ticket that starts with 'the computer' is unfinished until you know which operating system (OS) family you are touching. The installer, filesystem, management console, and even the legal right to run the OS on that hardware all change with the family.",
        },
      },
      {
        type: "reading",
        id: "C2-D1-O1-L1-r1",
        title: "Four workstation families",
        markdown: `CompTIA A+ Core 2 treats **workstation operating systems** and **mobile operating systems** as two lists. A workstation OS is what you expect on a desk or a laptop that a knowledge worker uses all day. A mobile OS is what you expect on a phone or tablet that is managed more like a personally owned or corporate-issued handheld.

**Windows** is Microsoft's client OS. Help-desk work still lives here: Active Directory or Microsoft Entra ID join, Group Policy, BitLocker, and the enormous Windows application catalog. Current A+ content covers Windows 10 and Windows 11 while they remain in mainstream support. Windows is licensed per device or per user depending on the channel; it is not tied to one hardware vendor.

**Linux** is a kernel plus a distribution (Ubuntu, Fedora, Debian, Red Hat Enterprise Linux, and many others). Technicians meet it on developer laptops, kiosks, network appliances, and a surprising number of "just a PC" roles. There is no single Linux vendor. Package managers, default filesystems, and support contracts differ by distro. The exam wants you fluent in the shared command line, not in every flavor's installer theme.

**macOS** is Apple's desktop OS. It runs on Apple hardware (Apple silicon today; Intel Macs still appear on benches). The user interface is Aqua; under it sits Darwin, a Unix-family system. You cannot legally slap macOS onto a random white-box PC for production, and Apple's management story (Apple Business Manager, MDM, FileVault) is not a copy of Active Directory.

**ChromeOS** is Google's OS for Chromebooks and some kiosk devices. The browser *is* the desktop for most users. Many devices can also run Android apps and a Linux container (Crostini). Updates are automatic until the device's Auto Update Expiration (AUE) date. Management is typically Google Admin console, not MMC.

**iOS** runs iPhones. **iPadOS** is the iPad's OS — same family, tablet-first multitasking, Apple Pencil, and staging that is no longer "just a big iPhone." **Android** is Google's (and the Open Source Android project's) mobile OS, shipped by many OEMs. Update cadence depends on the OEM and carrier, which is why two Android phones of the same age can be years apart in patch level.

Pick the family first. Then pick the edition, distro, or MDM profile.`,
      },
      {
        type: "diagram",
        id: "C2-D1-O1-L1-d1",
        component: "OsMatrixDiagram",
        title: "OS family matrix",
        caption:
          "Workstation families versus mobile families, with the filesystem you should expect by default.",
        notice:
          "Notice ChromeOS is a workstation OS on the exam, not a mobile OS. Notice iPadOS is listed separately from iOS.",
        alt: "Grid of Windows, Linux, macOS, ChromeOS, iOS, iPadOS, and Android with default filesystems and typical devices.",
      },
      {
        type: "knowledge-check",
        id: "C2-D1-O1-L1-kc1",
        questionIds: ["C2-D1-O1-WIN-Q001", "C2-D1-O1-CHROMEOS-Q001"],
      },
      {
        type: "reading",
        id: "C2-D1-O1-L1-r2",
        title: "How a technician actually chooses",
        markdown: `The exam will not ask you which OS is "best." It will hand you constraints.

- **Hardware lock-in.** macOS and iPadOS/iOS require Apple hardware. ChromeOS requires a Chromebook (or a certified cloud-ready device). Windows and most Linux distros run on standard PCs. Android phones are OEM-specific.
- **Application catalog.** A firm whose line-of-business app is a Win32 installer is a Windows shop unless they virtualize. A design team living in Final Cut is a Mac shop. A warehouse scanner fleet is often Android.
- **Identity and management.** Windows domain or Entra join. Apple Business Manager plus MDM. Google Admin for ChromeOS. Android Enterprise. Linux may be SSSD/LDAP, or it may be a herd of local sudoers files — ask before you assume.
- **User skill and support contract.** ChromeOS is hard to "break" in the Windows sense because local state is thin. That is a feature for kiosks and schools, and a limitation for CAD workstations.

Cross-OS compatibility is a daily ticket: a USB stick formatted NTFS that a Mac can read but not write without extra software; an Android APK that will not sideload onto a managed iPad; a Windows .exe that is not a Linux package. Do not tell the user to "just install it" until you have named the OS.`,
      },
      {
        type: "table",
        id: "C2-D1-O1-L1-t1",
        title: "Workstation and mobile OS at a glance",
        headers: ["OS", "Typical device", "Default filesystem", "Who manages it"],
        rows: [
          ["Windows", "PC / laptop", "NTFS", "AD / Entra / Intune / local"],
          ["Linux", "PC, server, appliance", "ext4 or XFS", "Distro tools / LDAP / local"],
          ["macOS", "Mac", "APFS", "Apple Business Manager / MDM"],
          ["ChromeOS", "Chromebook", "ext4 internally; cloud home", "Google Admin"],
          ["iOS", "iPhone", "APFS", "Apple MDM / unsupervised"],
          ["iPadOS", "iPad", "APFS", "Apple MDM / unsupervised"],
          ["Android", "Phone / tablet", "ext4 or f2fs", "Android Enterprise / OEM"],
        ],
        caption: "Filesystems are covered in the next lesson; this table is the family map.",
      },
      {
        type: "callout",
        id: "C2-D1-O1-L1-exam",
        callout: {
          kind: "exam",
          title: "Exam lens",
          body: "If the stem says Chromebook, think ChromeOS and Google Admin — not Android, even if the device can run some Android apps. If it says iPad, think iPadOS, not iOS.",
        },
      },
      {
        type: "knowledge-check",
        id: "C2-D1-O1-L1-kc2",
        questionIds: ["C2-D1-O1-MAC-Q001", "C2-D1-O1-LINUX-Q001"],
      },
      {
        type: "summary",
        id: "C2-D1-O1-L1-sum",
        bullets: [
          "Workstation OSs on V15: Windows, Linux, macOS, ChromeOS.",
          "Mobile OSs: iOS, iPadOS, Android.",
          "Choose by hardware, apps, and identity — not by brand loyalty.",
          "ChromeOS is not Android, and iPadOS is not iOS, even when they share DNA.",
        ],
      },
    ],
  },
  {
    id: "C2-D1-O1-L2",
    objectiveId: "C2-D1-O1",
    slug: "filesystems-eol-compatibility",
    title: "Filesystems, end-of-life, and cross-OS compatibility",
    description:
      "NTFS, ReFS, FAT32, ext4, XFS, APFS, and exFAT — plus vendor life-cycle limits that make an OS a liability.",
    estimatedMinutes: 24,
    conceptIds: ["C2-D1-O1-FS", "C2-D1-O1-EOL", "C2-D1-O1-WIN"],
    prerequisites: ["C2-D1-O1-L1"],
    lastVerified: "2026-09-01",
    sources: ["c2-obj-3.0", "ms-windows", "apple-macos", "debian-ref"],
    blocks: [
      {
        type: "callout",
        id: "C2-D1-O1-L2-why",
        callout: {
          kind: "why",
          title: "Why this matters",
          body: "Formatting the wrong filesystem is how a 6 GB video file 'vanishes' on a FAT32 stick and how a Mac user returns a drive that Windows 'needs to format.' End-of-life (EOL) is how a still-booting PC becomes an unpatched incident.",
        },
      },
      {
        type: "reading",
        id: "C2-D1-O1-L2-r1",
        title: "Seven filesystems the exam actually names",
        markdown: `A **filesystem** is the on-disk (or on-flash) structure that names files, stores their bytes, and enforces rules such as permissions and maximum size. You choose it when you format a volume. The OS family strongly suggests a default, but removable media is where technicians get burned.

**NTFS (New Technology File System)** is the Windows default for internal volumes. It supports access control lists (ACLs), the Encrypting File System (EFS), compression, disk quotas, journaling, and files far larger than 4 GB. If a Windows PC's C: is healthy, it is almost certainly NTFS.

**ReFS (Resilient File System)** is Microsoft's integrity-oriented filesystem. It uses checksums and is aimed at Storage Spaces, backup targets, and workstation-grade volumes — especially Windows 10/11 Pro for Workstations and Windows Server. It is **not** the everyday boot volume for a Home laptop. Do not "upgrade C: to ReFS" as a casual tweak.

**FAT32 (File Allocation Table 32)** is the compatibility veteran. The hard limit you must remember is a **4 GB maximum file size**. Windows' own format GUI often refuses to create FAT32 volumes larger than 32 GB even though the filesystem can go further with other tools. Use FAT32 for small USB sticks that must boot ancient hardware or a BIOS utility, not for a 20 GB disk image.

**exFAT (Extensible FAT)** is the right answer for large flash media that must move between Windows and macOS. It allows huge files, has no NTFS permission model, and is what you should format when a photographer hands you a 128 GB card and two different laptops.

**ext4 (fourth extended filesystem)** is the default on many Linux desktops and servers (Debian, Ubuntu, and friends). **XFS** is a high-performance Linux filesystem and the default on Red Hat Enterprise Linux family installs. Windows does not mount either without extra software.

**APFS (Apple File System)** is the macOS, iOS, and iPadOS default. It is built for flash, snapshots, cloning, and encryption. Windows does not speak APFS natively.

Cross-OS rule of thumb: internal OS volumes stay on the native filesystem. Shared flash uses **exFAT** unless you have a documented exception.`,
      },
      {
        type: "table",
        id: "C2-D1-O1-L2-t1",
        title: "Filesystem decision table",
        headers: ["Filesystem", "Home OS", "Permissions / encryption", "Exam trap"],
        rows: [
          ["NTFS", "Windows", "NTFS ACLs, EFS", "Macs read it; writes often need extra software"],
          ["ReFS", "Windows (selected SKUs)", "Integrity streams", "Not a casual C: format"],
          ["FAT32", "Everywhere (legacy)", "None worth using", "4 GB file-size cap"],
          ["exFAT", "Windows + macOS flash", "None", "Best shared USB/SD for large files"],
          ["ext4", "Linux (Debian family)", "POSIX + optional ACL", "Windows will not mount it natively"],
          ["XFS", "Linux (RHEL family)", "POSIX", "High-capacity Linux data volumes"],
          ["APFS", "Apple", "Native encryption, snapshots", "Windows will not mount it natively"],
        ],
      },
      {
        type: "knowledge-check",
        id: "C2-D1-O1-L2-kc1",
        questionIds: ["C2-D1-O1-FS-Q001", "C2-D1-O1-FS-Q002"],
      },
      {
        type: "reading",
        id: "C2-D1-O1-L2-r2",
        title: "Vendor life cycle and compatibility",
        markdown: `**End-of-life (EOL)** means the vendor has stopped shipping security updates for that version. The machine may still boot. That is irrelevant. An EOL OS is a standing vulnerability.

Windows 10 reached end of support on **14 October 2025**. Some organizations buy Extended Security Updates (ESU); that is a paid delay, not a new edition. Windows 11 continues on a modern hardware baseline (Trusted Platform Module 2.0 and Unified Extensible Firmware Interface, covered in objective 1.3). Feature updates (the big yearly/semi-annual jumps) are not the same as monthly quality/security updates. When Microsoft stops feature updates for a channel, remaining life is security-only until the EOL date.

ChromeOS devices have an **Auto Update Expiration** printed per model. After that date Google stops OS updates for that Chromebook even if the shell still looks fine. Android updates die when the OEM or carrier stops signing them — often years before the hardware fails. Apple supports fewer hardware generations than a 2012 ThinkPad crowd expects, but while a Mac or iPhone is in support the patches are complete.

**Update limitations** also include: 32-bit Windows client is gone in Windows 11 (64-bit only); a CPU not on Microsoft's Windows 11 list; a phone that cannot take a new Android major version; a Mac that cannot take the next macOS.

**Compatibility between operating systems** is not "they all open Word." Native binaries do not cross families. Workarounds are virtual machines, containers, web apps, or compatibility layers (Wine, and similar). Files cross families only when the filesystem and the application format both agree. A .docx on exFAT is easy. A 6 GB .iso on FAT32 is impossible. An APFS Time Machine volume plugged into Windows is a paperweight until you put it back in a Mac.`,
      },
      {
        type: "callout",
        id: "C2-D1-O1-L2-mistake",
        callout: {
          kind: "mistake",
          title: "Common mistake",
          body: "Formatting a shared USB drive NTFS 'because Windows likes it,' then blaming the Mac when the designer cannot copy a 8 GB project onto it. Use exFAT for that job. FAT32 would also fail the 8 GB file.",
        },
      },
      {
        type: "knowledge-check",
        id: "C2-D1-O1-L2-kc2",
        questionIds: ["C2-D1-O1-EOL-Q001"],
      },
      {
        type: "checkpoint",
        id: "C2-D1-O1-L2-cp",
        questionIds: [
          "C2-D1-O1-WIN-Q002",
          "C2-D1-O1-LINUX-Q002",
          "C2-D1-O1-MAC-Q002",
          "C2-D1-O1-CHROMEOS-Q002",
          "C2-D1-O1-FS-Q003",
          "C2-D1-O1-FS-Q004",
          "C2-D1-O1-EOL-Q002",
          "C2-D1-O1-EOL-Q003",
        ],
      },
      {
        type: "summary",
        id: "C2-D1-O1-L2-sum",
        bullets: [
          "NTFS for Windows internals; APFS for Apple; ext4/XFS for Linux; exFAT for large shared flash; FAT32 if you must, and never for files over 4 GB.",
          "ReFS is a resiliency filesystem, not the default laptop C:.",
          "EOL means no more vendor patches — bootable is not supported.",
          "Cross-OS file sharing fails on filesystem limits long before it fails on 'the OS is different.'",
        ],
      },
    ],
  },
  {
    id: "C2-D1-O2-L1",
    objectiveId: "C2-D1-O2",
    slug: "boot-methods-and-install-types",
    title: "Boot media and installation types",
    description:
      "USB, network, flash, internet, recovery, clean, upgrade, image, remote, zero-touch, and repair installs.",
    estimatedMinutes: 24,
    conceptIds: [
      "C2-D1-O2-CLEAN",
      "C2-D1-O2-IMAGE",
      "C2-D1-O2-ZEROTOUCH",
    ],
    prerequisites: ["C2-D1-O1-L2"],
    lastVerified: "2026-09-01",
    sources: ["c2-obj-3.0", "ms-windows"],
    blocks: [
      {
        type: "callout",
        id: "C2-D1-O2-L1-why",
        callout: {
          kind: "why",
          title: "Why this matters",
          body: "The same Windows ISO can be a clean wipe, an in-place upgrade, a repair, or a factory reset depending on how you start Setup. Naming the install type is how you protect user data — or deliberately destroy it.",
        },
      },
      {
        type: "reading",
        id: "C2-D1-O2-L1-r1",
        title: "How the machine boots the installer",
        markdown: `Before Windows, Linux, or macOS Setup can run, firmware has to find boot code. **Boot method** is that path.

**USB** optical-replacement media is the default field method: the Microsoft Media Creation Tool, Rufus, or \`dd\` writes an ISO to a stick, firmware boots it. **Solid-state / flash drives** in the objectives are the same idea — a bootable flash device, including some OEM recovery keys. **External / hot-swappable drives** are used when you attach a bootable SSD in a USB enclosure or boot a WinPE stick that then images from a second disk.

**Network** boot uses the **Preboot Execution Environment (PXE)**. The NIC asks for an address and a boot filename; a Windows Deployment Services (WDS), Microsoft Deployment Toolkit (MDT), or Linux PXE server answers. This is how a room of identical PCs installs without walking USB sticks.

**Internet-based** boot and recovery is newer on the A+ list: downloading the installer ISO, Windows 11 cloud download reset, and OEM cloud recovery that pulls an image from the vendor rather than a hidden partition. You still need a working NIC and enough local disk to stage files.

**Internal hard drive (partition)** is the recovery partition: Dell/HP/Lenovo keys, Windows Recovery Environment (WinRE) on the recovery partition, or macOS Recovery. **Multiboot** means more than one OS on the disk (Windows + Linux is the classic). Firmware or a boot manager (Windows Boot Manager, GRUB) presents a menu. Multiboot is not an install type; it is a layout you must plan around so you do not let Windows Setup eat the Linux bootloader.

**Third-party drivers** matter during Windows Setup when the installer cannot see the target disk — RAID controllers, some NVMe, and storage filters. Use Load driver. Guessing and installing onto the wrong disk is how you wipe the data volume.`,
      },
      {
        type: "table",
        id: "C2-D1-O2-L1-t1",
        title: "Boot methods",
        headers: ["Method", "What boots", "When you use it"],
        rows: [
          ["USB / flash", "Installer or WinPE", "One-off benches, broken internal OS"],
          ["External / hot-swap", "Enclosure or docked SSD", "Imaging from a known-good disk"],
          ["Network (PXE)", "NIC firmware + server", "Fleet imaging on a wired LAN"],
          ["Internet-based", "Cloud ISO or cloud reset", "No USB in the bag; NIC works"],
          ["Internal partition", "Recovery / WinRE", "Factory reset, startup repair"],
          ["Multiboot menu", "Boot manager", "Two OSs sharing hardware"],
        ],
      },
      {
        type: "knowledge-check",
        id: "C2-D1-O2-L1-kc1",
        questionIds: ["C2-D1-O2-CLEAN-Q001", "C2-D1-O2-IMAGE-Q001"],
      },
      {
        type: "reading",
        id: "C2-D1-O2-L1-r2",
        title: "Clean, upgrade, image, remote, zero-touch, recovery, repair",
        markdown: `A **clean install** formats (or deletes) the target partition and lays down a new OS. Applications and local files on that partition are gone. Use it for unknown malware, unknown prior admins, or a PC that will change identity. Back up first if anything on the disk still matters.

An **upgrade** (in-place) runs Setup on top of the existing OS and keeps apps, files, and most settings. It is faster, and it is how you move Windows 10 Pro to Windows 11 Pro on supported hardware. It is the wrong tool when the OS is already corrupt or compromised.

**Image deployment** applies a captured golden image (Windows Imaging Format / WIM, Ghost-style clones, or a vendor recovery image). Sysprep generalizes a Windows reference PC so machine-specific data is stripped. Imaging is how 40 identical accounting PCs stay identical.

**Remote network installation** is PXE/WDS/MDT/Autopilot-adjacent: the technician is not sitting at the USB port. **Zero-touch deployment** goes further: the box is unboxed, plugged into Ethernet (or a configured Wi-Fi bootstrap), and **Windows Autopilot** / MDM enrollment / Apple Automated Device Enrollment / Android zero-touch / ChromeOS zero-touch enrolls and configures it with little or no technician clicking. Zero-touch is a process and an identity join, not a magic ISO.

A **recovery partition** reimage is a factory-ish reset. A **repair installation** (Windows repair upgrade) runs Setup against an OS that still boots or is repairable, keeping files and apps while replacing system files. Use repair when System File Checker is not enough and you do not want a wipe.

**Feature updates** are the large Windows version jumps (21H2, 22H2, 24H2). They have a product life cycle: each feature update is supported for a published window, then you must move forward or you are on borrowed time.`,
      },
      {
        type: "callout",
        id: "C2-D1-O2-L1-tech",
        callout: {
          kind: "technician",
          title: "Technician lens",
          body: "If the user needs yesterday's desktop back this afternoon, do not start with a clean install. If the PC was a stranger's machine from surplus, do not start with an in-place upgrade.",
        },
      },
      {
        type: "knowledge-check",
        id: "C2-D1-O2-L1-kc2",
        questionIds: ["C2-D1-O2-ZEROTOUCH-Q001", "C2-D1-O2-CLEAN-Q002"],
      },
      {
        type: "summary",
        id: "C2-D1-O2-L1-sum",
        bullets: [
          "Boot method is how firmware finds Setup; install type is what Setup does to the disk.",
          "Clean wipes; upgrade keeps; image clones; repair replaces system files.",
          "Zero-touch is Autopilot/MDM enrollment, not 'a really good USB stick.'",
          "Load third-party storage drivers when Setup cannot see the disk.",
        ],
      },
    ],
  },
  {
    id: "C2-D1-O2-L2",
    objectiveId: "C2-D1-O2",
    slug: "gpt-mbr-format-upgrades",
    title: "GPT versus MBR, formatting, and upgrade checks",
    description:
      "Partition tables, filesystem format, backups, and hardware/app compatibility before you click Upgrade.",
    estimatedMinutes: 22,
    conceptIds: ["C2-D1-O2-GPT", "C2-D1-O2-MBR", "C2-D1-O2-CLEAN"],
    prerequisites: ["C2-D1-O2-L1"],
    lastVerified: "2026-09-01",
    sources: ["c2-obj-3.0", "ms-windows"],
    blocks: [
      {
        type: "callout",
        id: "C2-D1-O2-L2-why",
        callout: {
          kind: "why",
          title: "Why this matters",
          body: "A 4 TB disk on an MBR partition table wastes half its capacity. A BIOS-legacy PC forced onto a GPT boot disk will not start. This is not trivia; it is the difference between a finished install and a brick until you change firmware mode.",
        },
      },
      {
        type: "reading",
        id: "C2-D1-O2-L2-r1",
        title: "GPT and MBR",
        markdown: `A **partition table** tells firmware and the OS where volumes begin and end.

**MBR (Master Boot Record)** is the legacy scheme. The first 512-byte sector holds boot code and the partition table. Practical limits that A+ expects you to recite: a **2 TB** maximum disk (using 512-byte sectors), and **four primary partitions** — or three primary plus one extended that holds logical drives. MBR pairs historically with BIOS legacy boot.

**GPT (GUID Partition Table)** is the modern scheme. It stores a **globally unique identifier (GUID)** for the disk and for each partition, keeps a backup table at the end of the disk, and is required for a normal **UEFI** Windows install. Windows GPT allows **128 partitions**. Capacity is effectively unlimited for anything you will see on a bench (way beyond 2 TB). Windows 11's hardware rules assume UEFI, which in practice means GPT for the system disk.

You convert MBR to GPT in Disk Management, \`diskpart\`, or \`mbr2gpt.exe\` (the last can preserve data when the layout qualifies). Converting the other way is usually a wipe. Do not convert a disk that still holds the only copy of a user's files.

**Drive format** applies a filesystem to a partition: NTFS for Windows system and data, exFAT for large removable, FAT32 only when compatibility demands it, ReFS on supported SKUs for data volumes. Quick format writes a new table and does not securely erase. Full format checks for bad sectors. Neither is a substitute for a documented wipe when the disk is leaving the organization (that is Core 2 security, objective 2.9).

During Windows Setup you still pick GPT vs MBR by firmware mode: UEFI boot of the installer yields a GPT layout; legacy CSM/BIOS boot of the installer yields MBR. Mixing them is the classic "Windows failed to install" loop.`,
      },
      {
        type: "table",
        id: "C2-D1-O2-L2-t1",
        title: "MBR versus GPT",
        headers: ["", "MBR", "GPT"],
        rows: [
          ["Firmware", "BIOS / CSM legacy", "UEFI (Windows 11 expectation)"],
          ["Max disk (practical)", "2 TB", "Multi-terabyte, no 2 TB cap"],
          ["Partitions (Windows)", "4 primary (or 3 + extended)", "128"],
          ["Repair story", "Single table in sector 0", "Primary + backup table"],
          ["IDs", "Slot numbers", "GUIDs"],
        ],
      },
      {
        type: "knowledge-check",
        id: "C2-D1-O2-L2-kc1",
        questionIds: ["C2-D1-O2-GPT-Q001", "C2-D1-O2-MBR-Q001"],
      },
      {
        type: "reading",
        id: "C2-D1-O2-L2-r2",
        title: "Upgrade considerations",
        markdown: `An in-place upgrade is not a free action.

**Back up files and user preferences first.** User profiles, browser data, PST files, and the Downloads folder that everyone swears is empty. An upgrade that fails mid-driver can leave the PC unbootable until you roll back or recover.

**Application and driver support / backward compatibility.** Vendor VPN clients, printer drivers, and kernel antivirus filters are the usual breakers. Check the app's Windows 11 statement, not a forum rumor. 16-bit and many 32-bit kernel drivers are gone. Windows 11 is 64-bit only.

**Hardware compatibility.** TPM 2.0, UEFI Secure Boot, RAM, CPU generation, and GPU WDDM level for Windows 11. A perfectly good Windows 10 PC can be ineligible. Forcing unsupported hardware is out of scope for a professional install.

**Product life cycle.** Do not upgrade a PC onto a Windows feature update that is already out of support. Match edition: Home to Home, Pro to Pro. You can often upgrade Home → Pro with a key; you cannot quietly turn Home into Enterprise without the right channel.

If any of those checks fail, stop and do a clean install onto supported hardware — or stay on the supported OS you have, with a backup.`,
      },
      {
        type: "callout",
        id: "C2-D1-O2-L2-exam",
        callout: {
          kind: "exam",
          title: "Exam lens",
          body: "Disk larger than 2 TB plus old BIOS-only firmware is a hardware/firmware problem, not a format-as-NTFS problem. GPT needs UEFI. MBR is the 2 TB trap.",
        },
      },
      {
        type: "knowledge-check",
        id: "C2-D1-O2-L2-kc2",
        questionIds: ["C2-D1-O2-GPT-Q002", "C2-D1-O2-CLEAN-Q003"],
      },
      {
        type: "checkpoint",
        id: "C2-D1-O2-L2-cp",
        questionIds: [
          "C2-D1-O2-CLEAN-Q004",
          "C2-D1-O2-IMAGE-Q002",
          "C2-D1-O2-ZEROTOUCH-Q002",
          "C2-D1-O2-GPT-Q003",
          "C2-D1-O2-GPT-Q004",
          "C2-D1-O2-MBR-Q002",
          "C2-D1-O2-MBR-Q003",
          "C2-D1-O2-ZEROTOUCH-Q003",
        ],
      },
      {
        type: "summary",
        id: "C2-D1-O2-L2-sum",
        bullets: [
          "MBR: 2 TB, four primary partitions, BIOS-legacy.",
          "GPT: UEFI, 128 partitions, the Windows 11 system-disk expectation.",
          "Format chooses the filesystem; it does not replace a backup or a wipe policy.",
          "Upgrade only after backup, app/driver, and hardware checks.",
        ],
      },
    ],
  },
  {
    id: "C2-D1-O3-L1",
    objectiveId: "C2-D1-O3",
    slug: "windows-editions-matrix",
    title: "Windows 10 and 11 editions",
    description:
      "Home, Pro, Enterprise, and Pro for Workstations — domain join, RDP host, BitLocker, gpedit, and RAM limits.",
    estimatedMinutes: 24,
    conceptIds: [
      "C2-D1-O3-HOME",
      "C2-D1-O3-PRO",
      "C2-D1-O3-ENT",
      "C2-D1-O3-BITLOCKER",
      "C2-D1-O3-GPEDIT",
    ],
    prerequisites: ["C2-D1-O2-L2"],
    lastVerified: "2026-09-01",
    sources: ["c2-obj-3.0", "ms-windows", "ms-bitlocker"],
    blocks: [
      {
        type: "callout",
        id: "C2-D1-O3-L1-why",
        callout: {
          kind: "why",
          title: "Why this matters",
          body: "Buying Home because it was cheaper, then discovering the PC cannot join the domain or host Remote Desktop, is a purchasing failure you will be asked to diagnose. Editions are feature switches, not wallpaper themes.",
        },
      },
      {
        type: "reading",
        id: "C2-D1-O3-L1-r1",
        title: "What each edition is for",
        markdown: `Microsoft sells **editions** of the same Windows kernel with different management and hardware ceilings.

**Windows 10/11 Home** is the consumer SKU. It is fine for a household Microsoft account, OneDrive, and the Microsoft Store. It does **not** join an Active Directory domain. It does **not** host **Remote Desktop Protocol (RDP)** inbound (the Remote Desktop *client* can still connect *out*). It does **not** include the Local Group Policy Editor (\`gpedit.msc\`). Full **BitLocker** management is a Pro-and-up feature; some modern Home devices offer **Device Encryption**, which is not the same as being able to manage BitLocker with \`manage-bde\` and Group Policy. 64-bit Home caps RAM at **128 GB**.

**Windows 10/11 Pro** is the small-business and power-user SKU. It adds domain join, Entra ID join, RDP host, BitLocker, \`gpedit.msc\`, Hyper-V (on supported CPUs), and a **2 TB** RAM ceiling. When a stem says "join the domain" or "RDP into this PC," Home is the wrong edition.

**Windows 10 Pro for Workstations** is on the V15 list as a Windows 10 edition. It is Pro plus workstation-grade hardware: up to **four** CPU sockets, **6 TB** of RAM, **ReFS**, persistent memory (NVDIMM), and SMB Direct (RDMA). Think CAD, media, and data workstations — not a receptionist PC.

**Windows 10/11 Enterprise** is the volume-licensed corporate SKU. RAM ceiling is **6 TB** on 64-bit Windows 10/11 Enterprise. You get the Pro feature set plus enterprise controls such as AppLocker, Credential Guard, always-on VPN device tunnels, and servicing options including Long-Term Servicing Channel (LTSC) in the Enterprise family. You do not "download Enterprise" from the Home upgrade screen; it comes through volume licensing, a qualifying upgrade, or a corporate image.

**Windows 11** editions on the objective list are **Home, Pro, and Enterprise**. The same Home-versus-Pro feature split applies. Windows 11 is 64-bit only; the old 32-bit 4 GB RAM cap is a Windows 10 x86 story.

**N versions** (Home N, Pro N) ship in Europe without certain bundled media technologies (Windows Media Player and related codecs historically) because of antitrust remedies. Add the Media Feature Pack if a user needs those components. N is not "N for network" and not a security edition.`,
      },
      {
        type: "diagram",
        id: "C2-D1-O3-L1-d1",
        component: "EditionMatrixDiagram",
        title: "Edition feature matrix",
        caption:
          "Home versus Pro versus Pro for Workstations versus Enterprise for the features A+ actually tests.",
        notice:
          "Notice RDP host, domain join, BitLocker, and gpedit.msc all stop at Home. Notice Pro for Workstations is the 6 TB / ReFS / four-socket SKU on the Windows 10 list.",
        alt: "Table of Windows editions versus domain join, RDP host, BitLocker, gpedit, and RAM limits.",
      },
      {
        type: "table",
        id: "C2-D1-O3-L1-t1",
        title: "Feature differences (64-bit)",
        headers: ["Feature", "Home", "Pro", "Pro for Workstations", "Enterprise"],
        rows: [
          ["AD domain join", "No", "Yes", "Yes", "Yes"],
          ["RDP host (inbound)", "No", "Yes", "Yes", "Yes"],
          ["BitLocker (full)", "No*", "Yes", "Yes", "Yes"],
          ["gpedit.msc", "No", "Yes", "Yes", "Yes"],
          ["RAM limit", "128 GB", "2 TB", "6 TB", "6 TB"],
          ["CPU sockets", "1", "2", "4", "4"],
          ["ReFS / NVDIMM / RDMA", "No", "No", "Yes", "Server-adjacent"],
        ],
        caption:
          "*Home may offer Device Encryption on qualifying hardware; it is not full BitLocker administration.",
      },
      {
        type: "knowledge-check",
        id: "C2-D1-O3-L1-kc1",
        questionIds: ["C2-D1-O3-HOME-Q001", "C2-D1-O3-PRO-Q001"],
      },
      {
        type: "reading",
        id: "C2-D1-O3-L1-r2",
        title: "Domain, workgroup, RDP, BitLocker, gpedit",
        markdown: `A **workgroup** is a peer-to-peer name. Each PC has its own local SAM (Security Accounts Manager) database. Home can live here. A **domain** is Active Directory: a domain controller issues accounts and Group Policy. Joining it requires Pro or higher and a computer account in the directory.

**RDP availability** on the exam means *hosting* a Remote Desktop session — Settings → System → Remote Desktop, port 3389 inbound, the right local or domain group. Home is a client only.

**BitLocker** encrypts volumes using the **Trusted Platform Module (TPM)** and optional PIN/USB key protectors. Pro, Enterprise, and Pro for Workstations expose the full feature, including BitLocker To Go on removable drives. Enterprise adds advanced management (MBAM/Intune policies). Do not confuse BitLocker (full volume) with EFS (per-file on NTFS), which is a later security objective.

**gpedit.msc** is the Local Group Policy Editor: Computer Configuration and User Configuration. It is how you enforce password policy, disable USB storage, and control Windows Update on a non-domain Pro PC. On a domain PC, domain GPO wins over local. Home simply does not include the editor; hacks that copy gpedit files onto Home are out of scope and unsupported.`,
      },
      {
        type: "callout",
        id: "C2-D1-O3-L1-mistake",
        callout: {
          kind: "mistake",
          title: "Common mistake",
          body: "Telling a Home user to 'open gpedit and disable the consumer experience.' That console is not there. Upgrade to Pro or use the Settings app and MDM — do not pretend Home is Pro.",
        },
      },
      {
        type: "knowledge-check",
        id: "C2-D1-O3-L1-kc2",
        questionIds: ["C2-D1-O3-BITLOCKER-Q001", "C2-D1-O3-GPEDIT-Q001"],
      },
      {
        type: "lab",
        id: "C2-D1-O3-L1-lab",
        labId: "C2-D1-O3-EDITION-LAB",
        title: "Windows edition matching lab",
        prompt:
          "Match Home, Pro, Pro for Workstations, and Enterprise to the four purchasing tickets. Leave Home N and ChromeOS unused.",
      },
      {
        type: "summary",
        id: "C2-D1-O3-L1-sum",
        bullets: [
          "Home: no domain, no RDP host, no gpedit, no full BitLocker, 128 GB RAM.",
          "Pro: the business baseline (domain, RDP host, BitLocker, gpedit, 2 TB).",
          "Pro for Workstations: Pro plus 6 TB, four sockets, ReFS, NVDIMM, RDMA.",
          "Enterprise: volume-licensed corporate controls; 6 TB RAM.",
          "N editions omit bundled media features, not networking.",
        ],
      },
    ],
  },
  {
    id: "C2-D1-O3-L2",
    objectiveId: "C2-D1-O3",
    slug: "windows-11-tpm-uefi-upgrades",
    title: "Upgrade paths, TPM, and UEFI",
    description:
      "In-place versus clean, Windows 11 hardware baseline, and when Home cannot become what the ticket needs.",
    estimatedMinutes: 20,
    conceptIds: ["C2-D1-O3-TPMWIN", "C2-D1-O3-PRO", "C2-D1-O3-HOME"],
    prerequisites: ["C2-D1-O3-L1"],
    lastVerified: "2026-09-01",
    sources: ["c2-obj-3.0", "ms-windows", "ms-bitlocker"],
    blocks: [
      {
        type: "callout",
        id: "C2-D1-O3-L2-why",
        callout: {
          kind: "why",
          title: "Why this matters",
          body: "Windows 11 Setup will refuse a PC that has no TPM 2.0 or is booting in legacy BIOS. Forcing the install with registry bypasses is not a professional answer on the exam or on a managed fleet.",
        },
      },
      {
        type: "reading",
        id: "C2-D1-O3-L2-r1",
        title: "Windows 11 hardware requirements",
        markdown: `Microsoft's Windows 11 baseline is a support contract, not a suggestion:

- 64-bit CPU, 1 GHz or faster, two or more cores, on the supported processor list
- 4 GB RAM
- 64 GB storage
- **UEFI** firmware with **Secure Boot** capable
- **TPM 2.0** (Trusted Platform Module — a crypto chip or firmware TPM)
- DirectX 12 / WDDM 2.0 graphics
- A display that meets the minimum size and resolution

**TPM** stores cryptographic keys, including BitLocker protectors, measured boot data, and Windows Hello material. **TPM 2.0** is the Windows 11 requirement; older TPM 1.2 satisfied some Windows 10 BitLocker scenarios but is not the Win11 gate. On a desktop you enable TPM in firmware (often labeled PTT for Intel or fTPM for AMD) and then confirm in \`tpm.msc\` that the device is present and ready.

**UEFI (Unified Extensible Firmware Interface)** replaces legacy BIOS. Windows 11 expects UEFI + GPT for the system disk. Secure Boot verifies bootloader signatures so a rootkit cannot quietly replace winload.

PC Health Check and Setup itself will block ineligible devices. A technician's first move on a failed Win11 upgrade is to read the *which* requirement failed — CPU, TPM, Secure Boot, RAM — not to download a 'skip TPM' script.

**Upgrade paths:** an **in-place upgrade** keeps apps and files and is valid Home→Home, Pro→Pro, and often Home→Pro (with a Pro key or store upgrade). **Clean install** is the right path when the edition is changing in a way Setup will not allow, when you are moving from an unsupported OS, or when the disk is untrusted. You cannot in-place "Home to Enterprise" as a consumer trick; Enterprise arrives through the organization's channel.`,
      },
      {
        type: "table",
        id: "C2-D1-O3-L2-t1",
        title: "In-place versus clean",
        headers: ["", "In-place upgrade", "Clean install"],
        rows: [
          ["Apps / files", "Kept (usually)", "Gone unless you restore"],
          ["Drivers", "Migrated; can break", "Fresh, you inject what you need"],
          ["When", "Healthy, supported path", "Corrupt, wrong edition, surplus PC"],
          ["Win11 blocker", "Still enforces TPM/UEFI", "Still enforces TPM/UEFI"],
        ],
      },
      {
        type: "knowledge-check",
        id: "C2-D1-O3-L2-kc1",
        questionIds: ["C2-D1-O3-TPMWIN-Q001", "C2-D1-O3-TPMWIN-Q002"],
      },
      {
        type: "reading",
        id: "C2-D1-O3-L2-r2",
        title: "Desktop styles and the edition you already have",
        markdown: `The Start menu and Settings app look similar across Home and Pro. That is deliberate, and it fools users into thinking they already have Pro. The differences are in **what the UI will let you turn on**: Remote Desktop host, Join a domain, BitLocker in Control Panel/Settings, \`gpedit.msc\` in Run.

Enterprise images may look *less* like the consumer desktop because Group Policy and AppLocker hide Store, consumer Microsoft account prompts, and widgets. "Desktop styles / user interface" on the objective list is this management overlay, not a secret third shell.

Confirm edition with \`winver\`, Settings → System → About, or \`slmgr /dli\`. If the ticket requires domain join and About says Home, the fix is an edition upgrade or a reimage — not a registry prank.`,
      },
      {
        type: "callout",
        id: "C2-D1-O3-L2-exam",
        callout: {
          kind: "exam",
          title: "Exam lens",
          body: "TPM 2.0 and UEFI/Secure Boot are Windows 11 hardware requirements. BitLocker uses TPM but is an edition feature. Do not mix those two sentences.",
        },
      },
      {
        type: "knowledge-check",
        id: "C2-D1-O3-L2-kc2",
        questionIds: ["C2-D1-O3-ENT-Q001", "C2-D1-O3-PRO-Q002"],
      },
      {
        type: "checkpoint",
        id: "C2-D1-O3-L2-cp",
        questionIds: [
          "C2-D1-O3-HOME-Q002",
          "C2-D1-O3-PRO-Q003",
          "C2-D1-O3-ENT-Q002",
          "C2-D1-O3-BITLOCKER-Q002",
          "C2-D1-O3-GPEDIT-Q002",
          "C2-D1-O3-TPMWIN-Q003",
          "C2-D1-O3-TPMWIN-Q004",
          "C2-D1-O3-HOME-Q003",
        ],
      },
      {
        type: "summary",
        id: "C2-D1-O3-L2-sum",
        bullets: [
          "Windows 11 needs TPM 2.0, UEFI Secure Boot, 4 GB RAM, 64 GB disk, 64-bit dual-core CPU.",
          "In-place keeps apps; clean wipes; both still enforce the hardware baseline.",
          "Home cannot be Group Policy'd or domain-joined; upgrade the edition.",
          "Confirm SKU with winver / About, not with the wallpaper.",
        ],
      },
    ],
  },
  {
    id: "C2-D1-O4-L1",
    objectiveId: "C2-D1-O4",
    slug: "task-manager",
    title: "Task Manager",
    description:
      "Processes, Performance, Users, Startup, and Services — the first console on a slow or stuck Windows PC.",
    estimatedMinutes: 20,
    conceptIds: ["C2-D1-O4-TASKMGR"],
    prerequisites: ["C2-D1-O3-L2"],
    lastVerified: "2026-09-01",
    sources: ["c2-obj-3.0", "ms-windows"],
    blocks: [
      {
        type: "callout",
        id: "C2-D1-O4-L1-why",
        callout: {
          kind: "why",
          title: "Why this matters",
          body: "Reimaging a PC because 'it is slow' without opening Task Manager is how you miss a Chrome renderer eating 90 percent CPU or a user with twelve Outlook profiles open.",
        },
      },
      {
        type: "reading",
        id: "C2-D1-O4-L1-r1",
        title: "The tabs you actually use",
        markdown: `**Task Manager** (\`taskmgr.exe\`, Ctrl+Shift+Esc, or Ctrl+Alt+Del) is the live view of what Windows is doing *right now*. V15 names five areas: **Processes, Performance, Users, Startup, and Services**.

**Processes** lists apps and background processes with CPU, memory, disk, network, and GPU columns. Sort. The top of a sorted CPU column is your first theory for a spinning fan. End task is valid for a stuck user app; it is not valid as your first move against \`csrss.exe\` or your only antivirus process.

**Performance** draws live graphs for CPU, memory, disk, Ethernet/Wi-Fi, GPU, and (on laptops) often Bluetooth. This is how you see a disk at 100 percent, a NIC that never got a link, or memory that is committed to the pagefile. Open Resource Monitor from the bottom of this tab when you need handles and disk queues.

**Users** shows who is signed in — important on a shared PC or a machine with Fast User Switching. You can disconnect or sign off a session that is leaking memory in the background.

**Startup apps** (Startup) is the list of programs that launch at logon. Disable the vendor updater pile-up that adds thirty seconds to a mechanical-disk laptop. On Windows 10/11 this list also lives in Settings; Task Manager is still the technician's shortcut. Disabling is not uninstalling.

**Services** shows Windows services, their status, and a right-click to start/stop or to open the full Services MMC. A service stuck at Starting is an Event Viewer story, not a Task Manager-only story.

Additional tabs you will see in the real product: App history, Details (PID, affinity, elevated), and on newer Windows 11 builds a more Settings-like layout. The exam language still maps to those five named areas.

Use Task Manager to *identify*. Then use the matching MMC — Services, Event Viewer, Startup Settings — to *fix*.`,
      },
      {
        type: "table",
        id: "C2-D1-O4-L1-t1",
        title: "Symptom to Task Manager tab",
        headers: ["Symptom", "Tab", "Next tool if needed"],
        rows: [
          ["Fan screams, UI lags", "Processes (CPU)", "Performance → Resource Monitor"],
          ["Disk LED solid", "Processes (Disk) / Performance", "dfrgui, chkdsk, vendor SSD tool"],
          ["Slow logon", "Startup apps", "Autoruns, Settings → Apps"],
          ["Other user still running Outlook", "Users", "Switch / sign off"],
          ["Print spooler dead", "Services", "services.msc, Event Viewer"],
        ],
      },
      {
        type: "knowledge-check",
        id: "C2-D1-O4-L1-kc1",
        questionIds: ["C2-D1-O4-TASKMGR-Q001", "C2-D1-O4-TASKMGR-Q002"],
      },
      {
        type: "reading",
        id: "C2-D1-O4-L1-r2",
        title: "What Task Manager is not",
        markdown: `Task Manager will not tell you *why* a service crashed yesterday. That is **Event Viewer**. It will not initialize a disk. That is **Disk Management**. It will not show you a week of CPU history. That is **Performance Monitor**.

Ending \`explorer.exe\` and restarting it is a valid UI-refresh trick. Ending the wrong svchost hosting a critical service is a self-denial-of-service. When in doubt, note the process name and PID from Details, then search or open Resource Monitor's CPU tab and inspect the associated service.

On a remote RDP session you are looking at the *session's* processes plus system processes. A second signed-in user can still be burning CPU you only see on the Users tab.`,
      },
      {
        type: "callout",
        id: "C2-D1-O4-L1-exam",
        callout: {
          kind: "exam",
          title: "Exam lens",
          body: "Slow boot after logon → Startup apps. High CPU now → Processes. Historical trend → perfmon. Those three are different tools.",
        },
      },
      {
        type: "knowledge-check",
        id: "C2-D1-O4-L1-kc2",
        questionIds: ["C2-D1-O4-TASKMGR-Q003"],
      },
      {
        type: "summary",
        id: "C2-D1-O4-L1-sum",
        bullets: [
          "Processes = who is using CPU/RAM/disk/GPU right now.",
          "Performance = live hardware graphs; jump to Resource Monitor for depth.",
          "Startup apps = logon slowness; Services = background Windows components.",
          "Users = leftover sessions on a shared PC.",
        ],
      },
    ],
  },
  {
    id: "C2-D1-O4-L2",
    objectiveId: "C2-D1-O4",
    slug: "mmc-snap-ins",
    title: "MMC snap-ins",
    description:
      "eventvwr, diskmgmt, taskschd, devmgmt, certmgr, lusrmgr, perfmon, and gpedit — what each console is for.",
    estimatedMinutes: 24,
    conceptIds: [
      "C2-D1-O4-MMC",
      "C2-D1-O4-EVENTVWR",
      "C2-D1-O4-DISKMGMT",
    ],
    prerequisites: ["C2-D1-O4-L1"],
    lastVerified: "2026-09-01",
    sources: ["c2-obj-3.0", "ms-windows"],
    blocks: [
      {
        type: "callout",
        id: "C2-D1-O4-L2-why",
        callout: {
          kind: "why",
          title: "Why this matters",
          body: "Microsoft Management Console (MMC) is the host; snap-ins are the tools. Memorizing the .msc filenames is how you answer items that never show a Start-menu screenshot.",
        },
      },
      {
        type: "reading",
        id: "C2-D1-O4-L2-r1",
        title: "The snap-ins on the objective list",
        markdown: `**MMC** (\`mmc.exe\`) hosts snap-ins. You can build a custom console, but on the exam you will be given the well-known shortcuts.

**Event Viewer (\`eventvwr.msc\`)** is the historical record: Windows Logs (Application, Security, System) plus Applications and Services Logs. Filter by Event ID, source, and time. A service that died at 3:02 AM is an Event Viewer ticket, not a Task Manager ticket. Critical/Error/Warning are not the same severity; Information events are noise until they are not.

**Disk Management (\`diskmgmt.msc\`)** initializes new disks (GPT vs MBR), creates/formats/extends/shrinks volumes, changes drive letters and mount paths, and shows status (Online, Offline, Failed, Unallocated, Foreign for dynamic disks). It will not securely erase, and it is the wrong tool for a failing disk's SMART data (use the vendor tool or \`wmic diskdrive\` / PowerShell).

**Task Scheduler (\`taskschd.msc\`)** runs programs at logon, on a schedule, or on an event. Malware loves it; so does your weekly disk cleanup. Inspect Task Scheduler Library, especially folders that are not Microsoft's, when a browser hijacker survives every uninstall.

**Device Manager (\`devmgmt.msc\`)** is hardware-from-Windows' point of view: yellow bang (driver or resource problem), disable/enable, update or roll back driver, show hidden devices. A code 10 or 43 on a USB controller belongs here, not in Programs and Features.

**Certificate Manager (\`certmgr.msc\`)** is the *current user* certificate store (Personal, Trusted Root, and so on). Computer-wide store is \`certlm.msc\`. Importing a user S/MIME cert or troubleshooting a "Windows does not trust this CA" for *this user* starts in certmgr.

**Local Users and Groups (\`lusrmgr.msc\`)** creates local users, adds them to Administrators or Remote Desktop Users, and disables Guest. It is **not available on Home**. On Home you use Settings → Accounts and \`net user\`.

**Performance Monitor (\`perfmon.msc\`)** logs counters over time: disk queue length, memory pages/sec, processor interrupts. Use Data Collector Sets when the PC is slow "sometimes," which Task Manager cannot remember.

**Group Policy Editor (\`gpedit.msc\`)** is Pro and up, covered in 1.3. Computer Configuration versus User Configuration is the split that bites people who edit the wrong hive.`,
      },
      {
        type: "table",
        id: "C2-D1-O4-L2-t1",
        title: "Run-box to job",
        headers: [".msc", "Job"],
        rows: [
          ["eventvwr.msc", "What happened (logs, Event IDs)"],
          ["diskmgmt.msc", "Letters, GPT/MBR, volumes, status"],
          ["taskschd.msc", "Scheduled/logon tasks, persistence"],
          ["devmgmt.msc", "Drivers, yellow bangs, disable hardware"],
          ["certmgr.msc", "Current-user certificates"],
          ["lusrmgr.msc", "Local users/groups (not Home)"],
          ["perfmon.msc", "Counter logs over time"],
          ["gpedit.msc", "Local policy (Pro+)"],
        ],
      },
      {
        type: "knowledge-check",
        id: "C2-D1-O4-L2-kc1",
        questionIds: ["C2-D1-O4-EVENTVWR-Q001", "C2-D1-O4-DISKMGMT-Q001"],
      },
      {
        type: "reading",
        id: "C2-D1-O4-L2-r2",
        title: "Picking one console on purpose",
        markdown: `A well-written item gives you a symptom and four .msc names. Decode:

- "New 4 TB disk shows 2 TB" → Disk Management / partition style, not Event Viewer.
- "Yellow mark on the wireless adapter" → Device Manager.
- "Browser pops up at logon after uninstall" → Task Scheduler (and Startup in Task Manager).
- "Which local group grants RDP" → lusrmgr (Remote Desktop Users).
- "CPU spikes every night at 2 AM" → Task Scheduler first, perfmon if you need a chart.
- "Need to prove a driver failed last Thursday" → Event Viewer System log.

Do not open \`regedit\` because you enjoy pain. The snap-in exists so you do not have to.`,
      },
      {
        type: "callout",
        id: "C2-D1-O4-L2-tech",
        callout: {
          kind: "technician",
          title: "Technician lens",
          body: "If lusrmgr.msc 'is not a thing' on the PC, you are on Home. That is an edition problem, not a broken MMC.",
        },
      },
      {
        type: "knowledge-check",
        id: "C2-D1-O4-L2-kc2",
        questionIds: ["C2-D1-O4-MMC-Q001", "C2-D1-O4-MMC-Q002"],
      },
      {
        type: "summary",
        id: "C2-D1-O4-L2-sum",
        bullets: [
          "MMC hosts snap-ins; learn the .msc filenames.",
          "eventvwr = history; diskmgmt = volumes; devmgmt = drivers; taskschd = scheduled persistence.",
          "lusrmgr and gpedit are missing on Home.",
          "perfmon is for trends; Task Manager is for now.",
        ],
      },
    ],
  },
  {
    id: "C2-D1-O4-L3",
    objectiveId: "C2-D1-O4",
    slug: "additional-windows-tools",
    title: "msinfo32, resmon, msconfig, cleanmgr, dfrgui, regedit",
    description:
      "The additional tools list, plus a Windows tools lab that forces the matching console.",
    estimatedMinutes: 22,
    conceptIds: ["C2-D1-O4-MMC", "C2-D1-O4-TASKMGR", "C2-D1-O4-DISKMGMT"],
    prerequisites: ["C2-D1-O4-L2"],
    lastVerified: "2026-09-01",
    sources: ["c2-obj-3.0", "ms-windows"],
    blocks: [
      {
        type: "callout",
        id: "C2-D1-O4-L3-why",
        callout: {
          kind: "why",
          title: "Why this matters",
          body: "These six executables are still how you gather a hardware inventory, boot into Safe Boot, empty WinSxS-adjacent clutter, and — rarely — edit a registry value a vendor named in a KB article.",
        },
      },
      {
        type: "reading",
        id: "C2-D1-O4-L3-r1",
        title: "Additional tools",
        markdown: `**System Information (\`msinfo32.exe\`)** is a read-only inventory: BIOS/UEFI version, baseboard, HAL, conflicts, environment variables, and a System Summary you can export for a ticket. Use it when a vendor asks "what BIOS is this?" and the user is not in firmware.

**Resource Monitor (\`resmon.exe\`)** is Task Manager's Performance tab with teeth: per-process disk queues, associated handles, network connections, and the CPU tab that maps processes to services. Open it from Task Manager → Performance → Open Resource Monitor.

**System Configuration (\`msconfig.exe\`)** still matters for **boot options**: Safe boot, No GUI boot, boot log, and the number of processors (leave that one alone unless you are reproducing a vendor bug). The Services tab can hide Microsoft services so you see third-party ones. The Startup tab on modern Windows just launches Task Manager. Selective startup is a troubleshooting mode, not a lifestyle.

**Disk Cleanup (\`cleanmgr.exe\`)** removes temporary files, Recycle Bin contents, Delivery Optimization cache, and (as Administrator) Windows Update cleanup. Run it before you declare a 64 GB drive "too small."

**Disk Defragment (\`dfrgui.exe\`)**, labeled **Optimize Drives** in the UI, defragments HDDs and sends **TRIM** / retrim to SSDs. Do not "defrag an SSD" in the 2004 sense; let Optimize do TRIM. A spinning disk at 20 percent fragmentation is a candidate; an SSD reporting OK is not a performance emergency.

**Registry Editor (\`regedit.exe\`)** edits HKLM and HKCU. Export a key before you change it. It is not a first-line tool, it is not Group Policy, and it is how people brick logon if they delete the wrong hive. On the exam, regedit is the answer when a documented value must change and no UI exists — not when gpedit or Settings would do.`,
      },
      {
        type: "table",
        id: "C2-D1-O4-L3-t1",
        title: "Additional tools cheat sheet",
        headers: ["Tool", "Executable", "First use"],
        rows: [
          ["System Information", "msinfo32.exe", "Inventory / BIOS version"],
          ["Resource Monitor", "resmon.exe", "Which PID has the disk queued"],
          ["System Configuration", "msconfig.exe", "Safe boot / selective startup"],
          ["Disk Cleanup", "cleanmgr.exe", "Reclaim temp and update files"],
          ["Optimize Drives", "dfrgui.exe", "HDD defrag / SSD TRIM"],
          ["Registry Editor", "regedit.exe", "Documented value, last resort"],
        ],
      },
      {
        type: "knowledge-check",
        id: "C2-D1-O4-L3-kc1",
        questionIds: ["C2-D1-O4-MMC-Q003", "C2-D1-O4-TASKMGR-Q004"],
      },
      {
        type: "lab",
        id: "C2-D1-O4-L3-lab",
        labId: "C2-D1-O4-WINTOOLS-LAB",
        title: "Windows tools lab",
        prompt:
          "Run the Task Manager, Event Viewer, Device Manager, and Disk Management missions. Match each symptom to the console that actually owns it.",
      },
      {
        type: "callout",
        id: "C2-D1-O4-L3-mistake",
        callout: {
          kind: "mistake",
          title: "Common mistake",
          body: "Scheduling a daily full defrag on a laptop SSD 'for performance.' You are burning write cycles. Optimize Drives already knows the media type.",
        },
      },
      {
        type: "knowledge-check",
        id: "C2-D1-O4-L3-kc2",
        questionIds: ["C2-D1-O4-DISKMGMT-Q002"],
      },
      {
        type: "checkpoint",
        id: "C2-D1-O4-L3-cp",
        questionIds: [
          "C2-D1-O4-TASKMGR-Q005",
          "C2-D1-O4-EVENTVWR-Q002",
          "C2-D1-O4-DISKMGMT-Q003",
          "C2-D1-O4-MMC-Q004",
          "C2-D1-O4-MMC-Q005",
          "C2-D1-O4-EVENTVWR-Q003",
          "C2-D1-O4-TASKMGR-Q006",
          "C2-D1-O4-DISKMGMT-Q004",
        ],
      },
      {
        type: "summary",
        id: "C2-D1-O4-L3-sum",
        bullets: [
          "msinfo32 inventories; resmon zooms into live contention.",
          "msconfig is Safe boot and selective startup, not a startup-app editor anymore.",
          "cleanmgr reclaims space; dfrgui optimizes (TRIM on SSD).",
          "regedit is last, documented, and backed up.",
        ],
      },
    ],
  },
  {
    id: "C2-D1-O5-L1",
    objectiveId: "C2-D1-O5",
    slug: "windows-cli-nav-network",
    title: "Command prompt: navigation and network",
    description:
      "cd, dir, ipconfig, ping, netstat, nslookup, net use, tracert, and pathping in a technician's order.",
    estimatedMinutes: 26,
    conceptIds: ["C2-D1-O5-IPCONFIG", "C2-D1-O5-PING"],
    prerequisites: ["C2-D1-O4-L3"],
    lastVerified: "2026-09-01",
    sources: ["c2-obj-3.0", "ms-windows"],
    blocks: [
      {
        type: "callout",
        id: "C2-D1-O5-L1-why",
        callout: {
          kind: "why",
          title: "Why this matters",
          body: "GUI Settings lie by omission. ipconfig /all tells you whether the address is DHCP, which DNS servers were handed out, and whether the default gateway is even present. That is the start of every 'no internet' ticket.",
        },
      },
      {
        type: "reading",
        id: "C2-D1-O5-L1-r1",
        title: "Navigation, then the network ladder",
        markdown: `The Windows command prompt (\`cmd.exe\`) is what the V15 lab models. PowerShell can call the same utilities; learn the commands as written.

**cd** (change directory) moves you. \`cd \\\` goes to the current drive's root. \`cd /d D:\\Logs\` changes drive and path. **dir** lists; \`dir /a\` includes hidden/system, \`dir /s\` recurses. These two are how you confirm you are in the folder you think you are before you \`del\` anything.

Then climb the network ladder in this order, on purpose:

1. **ipconfig** — address, mask, gateway. **\`ipconfig /all\`** adds DHCP enabled yes/no, DHCP server, DNS servers, MAC, lease. **\`ipconfig /release\`** and **\`/renew\`** recycle a DHCP lease. **\`ipconfig /flushdns\`** dumps the local resolver cache after a record change.
2. **ping** — ICMP echo. Ping the loopback (\`127.0.0.1\`) to prove the stack, the gateway to prove the LAN, a public IP (not a name) to prove routing, then a name to prove DNS. \`ping -t\` until Ctrl+C, \`ping -n 5\`, \`ping -4\` / \`-6\`. A firewall that drops ICMP makes ping a hint, not a verdict.
3. **nslookup** — asks the configured DNS server to resolve a name. If ping-by-IP works and ping-by-name fails, you are here. You can also \`nslookup name 1.1.1.1\` to bypass the local DNS setting.
4. **tracert** — TTL-limited probes that print each hop. Use it when the gateway answers and the remote IP does not, to see where packets die.
5. **pathping** — a slower hybrid: traceroute, then statistics per hop (loss). Use it for "Teams is choppy" more than for "is the NIC up."
6. **netstat** — sockets. **\`netstat -ano\`** shows addresses, ports, and owning PID; **\`-b\`** (admin) shows the executable. This is how you find what is listening on 443 or who still has a session to a file server.
7. **net use** — maps and lists SMB connections. \`net use Z: \\\\filesrv\\share /user:DOMAIN\\jsmith\` and \`net use Z: /delete\`. Persistent mappings that break at logon are a \`net use\` plus credential problem, not a "Windows networking is down" problem.

Always append **/?** to a command the first time you meet it. Microsoft documents switches there.`,
      },
      {
        type: "table",
        id: "C2-D1-O5-L1-t1",
        title: "Network commands",
        headers: ["Command", "Question it answers"],
        rows: [
          ["ipconfig /all", "What address, DNS, DHCP, MAC do I have?"],
          ["ping <ip>", "Does ICMP reach that IP?"],
          ["ping <name>", "Does the name resolve *and* reply?"],
          ["nslookup", "What does DNS say, from which server?"],
          ["tracert", "Which hop is the last to answer?"],
          ["pathping", "Which hop is dropping a percentage?"],
          ["netstat -ano", "Who owns this port / session?"],
          ["net use", "Which SMB shares am I mapped to?"],
        ],
      },
      {
        type: "knowledge-check",
        id: "C2-D1-O5-L1-kc1",
        questionIds: ["C2-D1-O5-IPCONFIG-Q001", "C2-D1-O5-PING-Q001"],
      },
      {
        type: "reading",
        id: "C2-D1-O5-L1-r2",
        title: "A standard no-network script",
        markdown: `On a ticket titled "internet is down":

\`\`\`
ipconfig /all
ping 127.0.0.1
ping <default-gateway>
ping 1.1.1.1
ping intranet.company.local
nslookup intranet.company.local
\`\`\`

Interpret:

- No address / APIPA 169.254.x.x → DHCP or cable/Wi-Fi association, not DNS.
- Gateway fails → local LAN or NIC.
- Gateway works, public IP fails → routing, WAN, or firewall.
- Public IP works, name fails → DNS (client settings, or the DNS server).
- \`nslookup\` works but the browser fails → proxy, browser, or TLS interception, not ping.

Write those results in the ticket. Guessing "reset TCP/IP" as step one is how you destroy evidence.`,
      },
      {
        type: "callout",
        id: "C2-D1-O5-L1-exam",
        callout: {
          kind: "exam",
          title: "Exam lens",
          body: "FIRST after 'can't reach the file server by name' is not format C:. It is ipconfig /all then ping the IP versus the UNC hostname, then nslookup.",
        },
      },
      {
        type: "knowledge-check",
        id: "C2-D1-O5-L1-kc2",
        questionIds: ["C2-D1-O5-PING-Q002", "C2-D1-O5-IPCONFIG-Q002"],
      },
      {
        type: "summary",
        id: "C2-D1-O5-L1-sum",
        bullets: [
          "cd and dir keep you from running the right command in the wrong folder.",
          "ipconfig /all is the NIC's autobiography.",
          "Ping IP versus ping name separates routing from DNS.",
          "tracert/pathping = path; netstat = sockets; net use = SMB maps.",
        ],
      },
    ],
  },
  {
    id: "C2-D1-O5-L2",
    objectiveId: "C2-D1-O5",
    slug: "windows-cli-disk-file",
    title: "Command prompt: disk and file management",
    description:
      "chkdsk, format, diskpart, md, rmdir, and robocopy — destructive power with a confirm prompt for a reason.",
    estimatedMinutes: 22,
    conceptIds: ["C2-D1-O5-DISKPART", "C2-D1-O5-SFC"],
    prerequisites: ["C2-D1-O5-L1"],
    lastVerified: "2026-09-01",
    sources: ["c2-obj-3.0", "ms-windows"],
    blocks: [
      {
        type: "callout",
        id: "C2-D1-O5-L2-why",
        callout: {
          kind: "why",
          title: "Why this matters",
          body: "diskpart and format do not have an undo. robocopy /MIR mirrors deletions. These commands are on the exam because technicians have wiped the wrong disk with them.",
        },
      },
      {
        type: "reading",
        id: "C2-D1-O5-L2-r1",
        title: "Disk commands",
        markdown: `**chkdsk** checks a volume's filesystem metadata and, with switches, tries to repair it. **\`chkdsk C: /f\`** fixes errors (may schedule on reboot if the volume is in use). **\`chkdsk C: /r\`** implies /f and also locates bad sectors, remapping them on HDDs — slow, and not a substitute for replacing a dying disk. On healthy SSDs, /r is rarely the first move; look at SMART and Event Viewer.

**format** writes a new filesystem. \`format D: /fs:NTFS /q\` is a quick NTFS format. \`format E: /fs:exFAT\` for a camera card. Without /q you get a full format (zeroing/bad-sector check depending on OS version). format is not Disk Management's only job, but it is the CLI equivalent when you already know the letter.

**diskpart** is the scriptable partitioner. Typical flow:

\`\`\`
diskpart
list disk
select disk 1
list partition
clean
convert gpt
create partition primary
format fs=ntfs quick label=DATA
assign letter=E
exit
\`\`\`

**\`clean\`** deletes the partition table on the *selected* disk. Selecting disk 0 by accident is a career event. Always \`list disk\` and match size. \`list volume\` inside diskpart shows letters. \`inactive\` / \`active\` apply to MBR system partitions, not to GPT.

These three are how you recover a USB stick Windows insists is "not formatted," convert a data disk to GPT, and check a volume that will not run a GUI chkdsk.

Treat letters as labels, not identities. After a USB stick is replugged it may come back as F: instead of E:, and a scripted format of E: then destroys whatever inherited that letter — often an external backup. Confirm with list volume and the size column every time. chkdsk on a volume Windows mounted read-only because it was dirty is a better first move than format. If chkdsk reports bad clusters on a mechanical disk, image the data off and replace the drive; the command repaired metadata, it did not restore health. On a GPT system disk, do not clean because Setup looks weird — that is how you remove the EFI system partition and create an unbootable PC that needs recovery media.`,
      },
      {
        type: "table",
        id: "C2-D1-O5-L2-t1",
        title: "File-management commands",
        headers: ["Command", "Does", "Trap"],
        rows: [
          ["md (mkdir)", "Create a directory", "Fails if parents missing unless you create them"],
          ["rmdir (rd)", "Remove an empty directory", "/s removes the tree — gone"],
          ["robocopy", "Robust file copy", "/MIR mirrors deletions at the destination"],
          ["copy / xcopy", "Older copy tools (not on the V15 list)", "Prefer robocopy for trees"],
        ],
      },
      {
        type: "knowledge-check",
        id: "C2-D1-O5-L2-kc1",
        questionIds: ["C2-D1-O5-DISKPART-Q001", "C2-D1-O5-DISKPART-Q002"],
      },
      {
        type: "reading",
        id: "C2-D1-O5-L2-r2",
        title: "robocopy in real tickets",
        markdown: `**robocopy** (Robust File Copy) copies directory trees and retries on locked files. A technician's template:

\`robocopy C:\\Users\\jsmith\\Documents D:\\Backup\\jsmith\\Documents /E /R:2 /W:5 /LOG:C:\\temp\\robo.log\`

- \`/E\` copies empty directories (subdirs including empty).
- \`/MIR\` makes the destination a mirror — extra files on the destination are deleted. That is a weapon.
- \`/Z\` restartable mode over flaky WAN.
- \`/COPY:DAT\` or \`/COPYALL\` for data/attributes/timestamps; \`/SEC\` or \`/COPYALL\` when NTFS ACLs must follow.

Use robocopy to stage a profile, seed a file server, or evacuate a dying disk *before* you image. Do not use it as an undelete.

**md** and **rmdir** are the small tools: create \`C:\\Support\\Tickets\\8841\`, remove it when empty. \`rmdir /s /q folder\` is recursive and quiet — treat it like \`rm -rf\`.`,
      },
      {
        type: "callout",
        id: "C2-D1-O5-L2-safety",
        callout: {
          kind: "safety",
          title: "Destructive CLI",
          body: "This academy's command lab is sandboxed and cannot touch your host. On a real PC, list disk twice. The exam will still expect you to know that clean wipes the selected disk's partition table.",
        },
      },
      {
        type: "knowledge-check",
        id: "C2-D1-O5-L2-kc2",
        questionIds: ["C2-D1-O5-DISKPART-Q003"],
      },
      {
        type: "summary",
        id: "C2-D1-O5-L2-sum",
        bullets: [
          "chkdsk /f repairs; /r also hunts bad sectors.",
          "format applies a filesystem; diskpart edits the partition table.",
          "diskpart clean is irreversible without backup.",
          "robocopy copies trees; /MIR deletes extras at the destination.",
        ],
      },
    ],
  },
  {
    id: "C2-D1-O5-L3",
    objectiveId: "C2-D1-O5",
    slug: "windows-cli-info-os-lab",
    title: "Command prompt: identity, policy, SFC, and the lab",
    description:
      "hostname, net user, winver, whoami, /?, gpupdate, gpresult, and sfc — then the sandboxed CMD lab.",
    estimatedMinutes: 26,
    conceptIds: [
      "C2-D1-O5-SFC",
      "C2-D1-O5-GPUPDATE",
      "C2-D1-O5-IPCONFIG",
      "C2-D1-O5-PING",
      "C2-D1-O5-DISKPART",
    ],
    prerequisites: ["C2-D1-O5-L2"],
    lastVerified: "2026-09-01",
    sources: ["c2-obj-3.0", "ms-windows"],
    blocks: [
      {
        type: "callout",
        id: "C2-D1-O5-L3-why",
        callout: {
          kind: "why",
          title: "Why this matters",
          body: "gpresult tells you which GPO actually applied. sfc /scannow is the honest first repair for 'Windows files look wrong' before you jump to an in-place upgrade.",
        },
      },
      {
        type: "reading",
        id: "C2-D1-O5-L3-r1",
        title: "Informational and OS-management commands",
        markdown: `**hostname** prints the computer name. Use it before you join a domain or write a ticket so you are not describing PC-42 when the asset tag is LPT-088.

**whoami** prints the current user as \`domain\\user\` or \`computer\\user\`. **\`whoami /groups\`** shows group memberships — the fast answer to "why can't I open gpedit" (you are not elevated / not an admin) or "why do I have a network drive" (a group you forgot).

**winver** is the GUI version dialog (version, OS build, edition). Pair it with Settings → About. It is how you confirm 22H2 versus 24H2 without hunting.

**net user** lists local users; **\`net user jsmith\`** shows flags, last logon, group memberships; **\`net user jsmith * /add\`** creates a local account (admin). **\`net user jsmith /active:no\`** disables. On a domain PC, local \`net user\` is not the domain directory — use Active Directory Users and Computers or \`net user /domain\`.

**[command] /?** is Microsoft's built-in help. \`ipconfig /?\`, \`robocopy /?\`, \`sfc /?\`. Read it instead of inventing switches.

**gpupdate** refreshes Group Policy. **\`gpupdate /force\`** reapplies. Use it after a GPO change when the user should not wait for the next interval (90 minutes plus offset, typically).

**gpresult** reports what applied. **\`gpresult /r\`** is a console summary; **\`gpresult /h report.html\`** is the HTML RSOP-style report. If a setting "didn't apply," gpresult is FIRST — the GPO may be denied by security filtering, WMI filter, or simply not linked.

**sfc** (System File Checker) verifies protected system files. **\`sfc /scannow\`** is the switch you will type for the rest of your career. Run an elevated prompt. If SFC cannot repair, DISM (\`DISM /Online /Cleanup-Image /RestoreHealth\`) is the usual next repair, then SFC again — DISM is not on the V15 command list, so on the exam SFC is the named tool. A repair install is the step after SFC/DISM fail.`,
      },
      {
        type: "table",
        id: "C2-D1-O5-L3-t1",
        title: "Every V15 Windows CLI command",
        headers: ["Command", "Group", "One-line job"],
        rows: [
          ["cd", "Navigation", "Change directory"],
          ["dir", "Navigation", "List directory"],
          ["ipconfig", "Network", "Address / DNS / DHCP; /all /flushdns /renew"],
          ["ping", "Network", "ICMP reachability"],
          ["netstat", "Network", "Sockets and PIDs"],
          ["nslookup", "Network", "DNS query"],
          ["net use", "Network", "Map/list SMB"],
          ["tracert", "Network", "Hop path"],
          ["pathping", "Network", "Path plus per-hop loss"],
          ["chkdsk", "Disk", "Filesystem check/repair"],
          ["format", "Disk", "Write a filesystem"],
          ["diskpart", "Disk", "Partitions; clean is destructive"],
          ["md", "File", "Make directory"],
          ["rmdir", "File", "Remove directory"],
          ["robocopy", "File", "Tree copy; /MIR mirrors"],
          ["hostname", "Info", "Computer name"],
          ["net user", "Info", "Local (or /domain) user accounts"],
          ["winver", "Info", "Version / edition dialog"],
          ["whoami", "Info", "Current identity / groups"],
          ["/? ", "Info", "Built-in help for any listed command"],
          ["gpupdate", "OS mgmt", "Refresh GPO; /force"],
          ["gpresult", "OS mgmt", "Show applied GPOs"],
          ["sfc", "OS mgmt", "System File Checker; /scannow"],
        ],
        caption: "If you cannot say one sentence per row, rerun the CMD lab.",
      },
      {
        type: "knowledge-check",
        id: "C2-D1-O5-L3-kc1",
        questionIds: ["C2-D1-O5-SFC-Q001", "C2-D1-O5-GPUPDATE-Q001"],
      },
      {
        type: "lab",
        id: "C2-D1-O5-L3-lab",
        labId: "C2-D1-O5-CMD-LAB",
        title: "Sandboxed Windows command prompt",
        prompt:
          "This terminal cannot touch the host. Run ipconfig /all, ping the gateway then an IP then a name, practice nslookup, netstat, diskpart list disk, and sfc /? until the order is automatic.",
      },
      {
        type: "callout",
        id: "C2-D1-O5-L3-exam",
        callout: {
          kind: "exam",
          title: "Exam lens",
          body: "gpupdate applies policy; gpresult reports policy. sfc repairs system files; chkdsk repairs the volume's filesystem metadata. Those four get swapped constantly in distractors.",
        },
      },
      {
        type: "knowledge-check",
        id: "C2-D1-O5-L3-kc2",
        questionIds: ["C2-D1-O5-GPUPDATE-Q002", "C2-D1-O5-SFC-Q002"],
      },
      {
        type: "checkpoint",
        id: "C2-D1-O5-L3-cp",
        questionIds: [
          "C2-D1-O5-IPCONFIG-Q003",
          "C2-D1-O5-PING-Q003",
          "C2-D1-O5-DISKPART-Q004",
          "C2-D1-O5-SFC-Q003",
          "C2-D1-O5-GPUPDATE-Q003",
          "C2-D1-O5-IPCONFIG-Q004",
          "C2-D1-O5-PING-Q004",
          "C2-D1-O5-SFC-Q004",
        ],
      },
      {
        type: "summary",
        id: "C2-D1-O5-L3-sum",
        bullets: [
          "hostname / whoami / winver / net user identify the machine and the account.",
          "/? is the switch reference on a dark exam PBQ.",
          "gpupdate /force applies; gpresult /r reports.",
          "sfc /scannow repairs protected system files from an elevated prompt.",
        ],
      },
    ],
  },
  {
    id: "C2-D1-O6-L1",
    objectiveId: "C2-D1-O6",
    slug: "control-panel-utilities",
    title: "Control Panel utilities",
    description:
      "Internet Options, Devices and Printers, Programs and Features, Network and Sharing, firewall, mail, and the rest of the classic applets.",
    estimatedMinutes: 22,
    conceptIds: [
      "C2-D1-O6-FIREWALL",
      "C2-D1-O6-INDEXING",
      "C2-D1-O6-POWER",
    ],
    prerequisites: ["C2-D1-O5-L3"],
    lastVerified: "2026-09-01",
    sources: ["c2-obj-3.0", "ms-windows"],
    blocks: [
      {
        type: "callout",
        id: "C2-D1-O6-L1-why",
        callout: {
          kind: "why",
          title: "Why this matters",
          body: "Windows 11 hid Control Panel; the exam did not. Several applets still own settings the Settings app only links to — Internet Options, Mail profiles, Indexing Options, and Programs and Features for legacy uninstalls.",
        },
      },
      {
        type: "reading",
        id: "C2-D1-O6-L1-r1",
        title: "The applets that still close tickets",
        markdown: `**Control Panel** is the classic settings surface. Windows 10 and 11 push **Settings**, but V15 still lists the applets you must be able to find (search Start, or \`control\`).

**Internet Options** (\`inetcpl.cpl\`) is the old Internet Explorer engine: proxy, LAN settings, security zones, certificates, and "reset Internet Explorer settings." Chromium Edge uses its own settings for most browsing, but **IE mode**, some line-of-business apps, and the system proxy dialog still land here. If a stem says "proxy via Internet Options," do not wander into Edge flags.

**Devices and Printers** is the per-user device stage: add a printer, see default printer, troubleshoot a queue. Modern Windows also has Settings → Bluetooth & devices → Printers; the exam accepts both, and the classic view still exposes print server properties.

**Programs and Features** (\`appwiz.cpl\`) uninstalls Win32 desktop apps and, via **Turn Windows features on or off**, enables Telnet Client, Hyper-V, .NET 3.5, and similar optional components. Store apps uninstall from Settings → Apps. Know which list you are in.

**Network and Sharing Center** shows the active profile (public/private), adapter status, and the old "Change adapter settings" link to the Network Connections folder (\`ncpa.cpl\`) — still the fastest way to open a NIC's IPv4 properties.

**System** (classic) is About plus remote settings, computer name, and domain/workgroup. On Windows 11 much of this moved to Settings → System → About, but **Advanced system settings** (environment variables, performance, startup and recovery, computer name) is still the System Properties dialog (\`sysdm.cpl\`).

**Windows Defender Firewall** (\`firewall.cpl\`) enables/disables the firewall per profile and opens **Advanced settings** (\`wf.msc\`) for inbound/outbound rules. Allowing an app through the firewall is this applet, not Internet Options.

**Mail** (Microsoft Outlook profile applet, \`mlcfg32.cpl\` on many installs) creates and repairs **MAPI profiles** — a different thing from the Mail app. When Outlook asks for a profile every launch, you are here.

**Sound** (\`mmsys.cpl\`) sets default playback/recording devices and exclusive mode. "No audio" after a USB headset is often the wrong default device, not a dead driver.

**User Accounts** (\`netplwiz\` / User Accounts applet) is local users, UAC prompt level (via User Account Control settings), and the "Users must enter a user name and password" checkbox that breaks auto-logon.

**Device Manager** is also listed under Settings/Control Panel — same \`devmgmt.msc\` as objective 1.4.

**Indexing Options** controls what Windows Search crawls. A giant network redirect or an Outlook PST on a slow disk will make the PC grind; exclude the path or wait for the index. Rebuild the index when search returns nothing that File Explorer can see.

**Administrative Tools** (Windows Tools) is the folder of shortcuts to the MMCs you already learned: Event Viewer, Services, Memory Diagnostic, and the rest. It is a launch pad, not a separate product.`,
      },
      {
        type: "table",
        id: "C2-D1-O6-L1-t1",
        title: "Applet to ticket",
        headers: ["Applet", "Typical ticket"],
        rows: [
          ["Internet Options", "Proxy / IE mode / zone"],
          ["Devices and Printers", "Default printer, queue"],
          ["Programs and Features", "Uninstall Win32; Windows features"],
          ["Network and Sharing Center", "Profile, ncpa.cpl adapters"],
          ["Windows Defender Firewall", "Block/allow app or port"],
          ["Mail", "Outlook MAPI profile"],
          ["Sound", "Wrong default endpoint"],
          ["User Accounts", "UAC level, local users, auto-logon"],
          ["Indexing Options", "Search empty or disk busy"],
          ["Administrative Tools", "Jump to MMCs"],
        ],
      },
      {
        type: "knowledge-check",
        id: "C2-D1-O6-L1-kc1",
        questionIds: ["C2-D1-O6-FIREWALL-Q001", "C2-D1-O6-INDEXING-Q001"],
      },
      {
        type: "reading",
        id: "C2-D1-O6-L1-r2",
        title: "Settings did not delete Control Panel",
        markdown: `Search is how users find these on Windows 11. You should still be able to name the applet when the stem says "configure a proxy in Internet Options" or "turn off Windows Firewall for the Private profile only."

Firewall profiles follow the network type (domain/private/public). Turning the firewall off entirely is a last-ditch test, not a fix. Create a rule.

Mail vs Microsoft account vs Mail app: three different things. The Mail applet is Outlook desktop profiles. Do not reset a Microsoft account because Outlook cannot find a PST.

Indexing is not defrag. If search is stale, rebuild. If the disk is 100 percent because of \`SearchIndexer.exe\`, pause indexing or shrink the indexed set — do not disable Windows Search as a lifestyle on a knowledge-worker PC.`,
      },
      {
        type: "callout",
        id: "C2-D1-O6-L1-exam",
        callout: {
          kind: "exam",
          title: "Exam lens",
          body: "Internet Options still owns the system proxy dialog on many items. Settings → Network & internet → Proxy is the modern path. If the stem names the applet, use the applet.",
        },
      },
      {
        type: "knowledge-check",
        id: "C2-D1-O6-L1-kc2",
        questionIds: ["C2-D1-O6-FIREWALL-Q002"],
      },
      {
        type: "summary",
        id: "C2-D1-O6-L1-sum",
        bullets: [
          "Control Panel applets still own proxy, MAPI mail, indexing, and Win32 uninstall.",
          "Firewall.cpl is per-profile; wf.msc is the rule editor.",
          "Programs and Features ≠ Settings → Apps (Store).",
          "Administrative Tools is a folder of the MMCs from objective 1.4.",
        ],
      },
    ],
  },
  {
    id: "C2-D1-O6-L2",
    objectiveId: "C2-D1-O6",
    slug: "settings-explorer-power",
    title: "Settings, File Explorer Options, and Power Options",
    description:
      "Hidden files, extensions, hibernate versus sleep, Fast Startup, lid actions, and the Settings categories on the list.",
    estimatedMinutes: 22,
    conceptIds: [
      "C2-D1-O6-POWER",
      "C2-D1-O6-EXPLOREROPT",
      "C2-D1-O6-INDEXING",
    ],
    prerequisites: ["C2-D1-O6-L1"],
    lastVerified: "2026-09-01",
    sources: ["c2-obj-3.0", "ms-windows"],
    blocks: [
      {
        type: "callout",
        id: "C2-D1-O6-L2-why",
        callout: {
          kind: "why",
          title: "Why this matters",
          body: "A user who cannot see file extensions will double-click invoice.pdf.exe. A technician who does not understand Fast Startup will chase 'shutdown didn't apply my BIOS change' for an hour.",
        },
      },
      {
        type: "reading",
        id: "C2-D1-O6-L2-r1",
        title: "File Explorer Options and Power Options",
        markdown: `**File Explorer Options** (Folder Options) has three tabs the exam cares about.

**General** covers browse folders, click vs double-click, and privacy (show recently used files). **View** is the technician tab: **Show hidden files, folders, and drives**; **Hide protected operating system files** (you uncheck this only when you need to see things like \`desktop.ini\` or a rootkit's junk — then put it back); **Hide extensions for known file types** (uncheck this on every bench PC so \`budget.xlsx.exe\` cannot hide). Apply to Folders if you want the view consistent.

Those two checkboxes — hidden files and extensions — are among the highest-yield clicks in this entire domain.

**Power Options** (\`powercfg.cpl\` and Settings → System → Power):

- **Power plans** (Balanced, Power saver, High performance, and OEM plans) set display/disk/sleep timers and processor states.
- **Sleep / suspend** keeps RAM powered; resume is fast; a power loss loses unsaved work unless the platform hybrid-sleeps.
- **Hibernate** writes RAM to \`hiberfil.sys\` and powers off. Resume is slower; battery can be pulled. Hibernate must be enabled (\`powercfg /hibernate on\`) before the shutdown menu shows it.
- **Standby** in exam language is the sleep-like low-power state, especially on older docs.
- **Choose what closing the lid does** is the laptop classic: a docked laptop that sleeps when the lid closes will drop RDP and freeze CAD renders. Set "plugged in" lid action to Do nothing when that is the job.
- **Turn on fast startup** (hybrid shutdown) writes a partial hibernate of the kernel at Shutdown so the next boot is faster. Side effect: firmware/BIOS setup is often skipped, USB devices and dual-boot bootloaders misbehave, and "Shutdown" is not a full power-off. Disable Fast Startup when you are flashing BIOS, imaging, or dual-booting.
- **USB selective suspend** lets Windows power down idle USB devices. It also puts docks and some scanners to sleep until you toggle the setting or the device.

**Ease of Access** (Accessibility) is narrator, magnifier, closed captions, sticky keys — required for the job, not decoration. **Time and Language** is timezone (a surprising number of Kerberos tickets break here), display language, and input methods. **Update and Security** (Windows 10 name; Windows 11 splits Windows Update and Privacy/Security) is pause updates, delivery optimization, and the Windows Security link. **Personalization** is theme and taskbar. **Apps** is installed apps and defaults. **Privacy** is camera/mic/diagnostics. **Accounts** is Microsoft vs local, workplace Entra join, family. **Gaming** is Game Bar and Game Mode — disable Game Mode on a workstation that is not a console. **Devices** and **Network and Internet** and **System** duplicate pieces of Control Panel in the modern UI.`,
      },
      {
        type: "table",
        id: "C2-D1-O6-L2-t1",
        title: "Power states technicians mix up",
        headers: ["State", "RAM", "Power", "Use"],
        rows: [
          ["Sleep / suspend", "Kept powered", "Low", "Short pause"],
          ["Hibernate", "Copied to disk", "Off", "Travel, long pause"],
          ["Fast Startup shutdown", "Kernel session hibernated", "Off", "Faster next boot; hide BIOS"],
          ["Full shutdown (Fast Startup off)", "Cleared", "Off", "Firmware, dual-boot, imaging"],
        ],
      },
      {
        type: "knowledge-check",
        id: "C2-D1-O6-L2-kc1",
        questionIds: ["C2-D1-O6-EXPLOREROPT-Q001", "C2-D1-O6-POWER-Q001"],
      },
      {
        type: "reading",
        id: "C2-D1-O6-L2-r2",
        title: "Settings categories as a map",
        markdown: `When an item says "configure in Windows Settings," walk the category names: System (display, power, about, activation), Devices, Network & internet (proxy, VPN, metered), Personalization, Apps, Accounts, Time & language, Gaming, Accessibility, Privacy, Windows Update / Security.

Do not memorize pixel locations; they move between 10 and 11. Memorize the *job*: proxy can be Settings or Internet Options; camera permission is Privacy; default apps is Apps; workplace join is Accounts.

A practical bench checklist after imaging: show extensions, show hidden files, set lid action, disable Fast Startup if the site dual-boots or flashes firmware, confirm timezone, confirm Windows Update is not paused from the last tech's visit.`,
      },
      {
        type: "callout",
        id: "C2-D1-O6-L2-mistake",
        callout: {
          kind: "mistake",
          title: "Common mistake",
          body: "Leaving 'Hide extensions for known file types' enabled on a help-desk loaner. Phishing attachments depend on that checkbox.",
        },
      },
      {
        type: "knowledge-check",
        id: "C2-D1-O6-L2-kc2",
        questionIds: ["C2-D1-O6-POWER-Q002", "C2-D1-O6-EXPLOREROPT-Q002"],
      },
      {
        type: "checkpoint",
        id: "C2-D1-O6-L2-cp",
        questionIds: [
          "C2-D1-O6-POWER-Q003",
          "C2-D1-O6-FIREWALL-Q003",
          "C2-D1-O6-INDEXING-Q002",
          "C2-D1-O6-EXPLOREROPT-Q003",
          "C2-D1-O6-EXPLOREROPT-Q004",
          "C2-D1-O6-POWER-Q004",
          "C2-D1-O6-FIREWALL-Q004",
          "C2-D1-O6-INDEXING-Q003",
        ],
      },
      {
        type: "summary",
        id: "C2-D1-O6-L2-sum",
        bullets: [
          "Unhide extensions; show hidden files on bench PCs.",
          "Sleep keeps RAM; hibernate writes hiberfil.sys; Fast Startup is a hybrid shutdown.",
          "Lid action and USB selective suspend cause 'it died when I closed it' tickets.",
          "Settings categories map to the same jobs as Control Panel with different names.",
        ],
      },
    ],
  },
  {
    id: "C2-D1-O7-L1",
    objectiveId: "C2-D1-O7",
    slug: "workgroup-domain-shares",
    title: "Workgroup versus domain, shares, and UNC",
    description:
      "Join the right identity boundary, then map printers, file shares, and drives with UNC paths.",
    estimatedMinutes: 22,
    conceptIds: [
      "C2-D1-O7-WORKGROUP",
      "C2-D1-O7-DOMAINJOIN",
      "C2-D1-O7-UNC",
    ],
    prerequisites: ["C2-D1-O6-L2"],
    lastVerified: "2026-09-01",
    sources: ["c2-obj-3.0", "ms-windows"],
    blocks: [
      {
        type: "callout",
        id: "C2-D1-O7-L1-why",
        callout: {
          kind: "why",
          title: "Why this matters",
          body: "A workgroup PC with a duplicated local 'Administrator' password is not 'on the domain' no matter what the wallpaper says. Shares, Group Policy, and logon scripts all depend on that join.",
        },
      },
      {
        type: "reading",
        id: "C2-D1-O7-L1-r1",
        title: "Identity boundaries and shared resources",
        markdown: `A **workgroup** is a peer name (WORKGROUP by default). Each computer trusts its own local accounts. There is no central policy. Home edition lives here. Fine for a house; clumsy for a 40-person office.

A **domain-joined** PC has a computer account in Active Directory. Users sign in with domain credentials, Group Policy applies, and file servers can use Kerberos instead of a spreadsheet of local passwords. Domain join requires **Pro or higher**, DNS that can find the domain, line of sight to a domain controller (or a VPN that provides it), and rights to join (or a prestaged computer object). **Microsoft Entra ID join** (Azure AD join) is the cloud cousin: no on-prem DC, Intune often in the mix. Hybrid join is both.

**Shared resources** are folders and printers you publish. On the server (or a workstation acting as one), share the folder, set **share permissions** (Everyone = Change is the lazy default you should not ship) and **NTFS permissions** (the real ACL). Effective remote permission is the more restrictive combination of the two. Local interactive users ignore share permissions.

**Mapped drives** assign a letter (\`Z:\`) to a share so legacy apps that cannot stomach a UNC still work. Map in File Explorer, \`net use\`, a logon script, or GPO preferences. Reconnect at sign-in fails when credentials are wrong, DNS is wrong, or the VPN is not up yet — order matters.

**Printers** publish through the same SMB/spooler world or via IPP/AirPrint. Connecting to \`\\\\printsrv\\Color-4\` is the same UNC idea as a file share.

**File servers** are just computers (Windows, Linux Samba, NAS) that host shares. The client does not care if you give it a correct UNC and credentials.

**UNC (Universal Naming Convention)** is \`\\\\server\\share\\path\`. You can paste a UNC into File Explorer's address bar without mapping a letter. \`\\\\192.168.10.20\\data\` works when DNS is down; names are still what you should document.`,
      },
      {
        type: "table",
        id: "C2-D1-O7-L1-t1",
        title: "Workgroup versus domain",
        headers: ["", "Workgroup", "Domain"],
        rows: [
          ["Accounts", "Local SAM on each PC", "Directory (AD)"],
          ["Policy", "Local only / MDM", "GPO + local"],
          ["Edition", "Any, including Home", "Pro / Enterprise / PWS"],
          ["Shares", "Local creds or guest", "Kerberos / domain groups"],
          ["Scale", "House, lab of three", "The actual office"],
        ],
      },
      {
        type: "knowledge-check",
        id: "C2-D1-O7-L1-kc1",
        questionIds: ["C2-D1-O7-WORKGROUP-Q001", "C2-D1-O7-DOMAINJOIN-Q001"],
      },
      {
        type: "reading",
        id: "C2-D1-O7-L1-r2",
        title: "File Explorer network paths",
        markdown: `File Explorer → Network is the browse list (SMBv1 discovery may be off — browsing can be empty on a healthy modern LAN). Teach users the UNC or a mapped letter, not "scroll Network until you feel lucky."

Pin frequent UNCs in Quick access. If a mapped drive shows a red X, try the UNC first. If the UNC works, the map is a letter/reconnect problem. If the UNC fails, you have DNS, firewall, share permissions, or a downed server.

\`net use\` without arguments lists current maps — useful when a logon script mapped Q: and the user mapped Q: again by hand.`,
      },
      {
        type: "callout",
        id: "C2-D1-O7-L1-exam",
        callout: {
          kind: "exam",
          title: "Exam lens",
          body: "Home + 'join the domain' is an edition problem. Pro + 'cannot join' is DNS, credentials, or time skew — not an edition problem.",
        },
      },
      {
        type: "knowledge-check",
        id: "C2-D1-O7-L1-kc2",
        questionIds: ["C2-D1-O7-UNC-Q001", "C2-D1-O7-UNC-Q002"],
      },
      {
        type: "summary",
        id: "C2-D1-O7-L1-sum",
        bullets: [
          "Workgroup = local accounts; domain = AD computer object + domain users.",
          "Domain join needs Pro+, DNS, and a DC (or Entra join for cloud-only).",
          "UNC is \\\\server\\share; mapped drives are letters on top of UNC.",
          "Share + NTFS: most restrictive wins for remote users.",
        ],
      },
    ],
  },
  {
    id: "C2-D1-O7-L2",
    objectiveId: "C2-D1-O7",
    slug: "client-network-vpn-firewall-ip",
    title: "VPN, firewall profiles, proxy, metered, and client IP",
    description:
      "Establish the connection type, then set profile, proxy, metered limits, and static versus DHCP addressing.",
    estimatedMinutes: 24,
    conceptIds: [
      "C2-D1-O7-METERED",
      "C2-D1-O7-PROXY",
      "C2-D1-O7-DOMAINJOIN",
    ],
    prerequisites: ["C2-D1-O7-L1"],
    lastVerified: "2026-09-01",
    sources: ["c2-obj-3.0", "ms-windows"],
    blocks: [
      {
        type: "callout",
        id: "C2-D1-O7-L2-why",
        callout: {
          kind: "why",
          title: "Why this matters",
          body: "A correct IP on a Public firewall profile will still block file-and-printer sharing. A leftover proxy will make 'only this app fails' look like a DNS outage.",
        },
      },
      {
        type: "reading",
        id: "C2-D1-O7-L2-r1",
        title: "Connection types and the local firewall",
        markdown: `**Wired Ethernet** is still the right answer for desktops, VoIP, and anything that hates roaming. **Wireless** is 802.11 on the WLAN NIC. **WWAN / cellular** is the laptop's LTE/5G modem or a phone tether — treat it as a metered, higher-latency WAN.

A **virtual private network (VPN)** tunnels the client to a private network across the internet. After connect, the PC may get a second IP, new DNS, and routes to file servers that do not exist on the coffee-shop LAN. Split tunnel versus force-tunnel is a policy choice: split tunnel keeps local internet; force-tunnel sends everything through the concentrator (better inspection, more load). Client VPN lives in Settings → Network & internet → VPN, or a vendor client (GlobalProtect, AnyConnect, and friends). If mapped drives fail until VPN is up, the logon script raced the tunnel — use a post-connect script or GPO item-level targeting.

**Local OS firewall** (Windows Defender Firewall) has three profiles: **Domain** (detected when the DC/NLA says so), **Private** (home/work you trust), **Public** (airports, default-deny sharing). File and printer sharing, network discovery, and some management ports are off on Public on purpose. The wrong profile is why a brand-new Wi-Fi join cannot see \`\\\\nas\`. Switch Network profile in Settings, or set it in PowerShell, after you confirm the SSID deserves trust.

**Application restrictions and exceptions** are firewall rules: allow this app, or this port, on this profile. Turning the firewall off to "test" is allowed as a 30-second experiment; leaving it off is not a configuration.

**Proxy settings** send HTTP/HTTPS through a forward proxy (often for filtering). Configure per-user in Internet Options → Connections → LAN settings, or system-wide in Settings → Network & internet → Proxy, or via WPAD/GPO. A PAC file can send only some destinations to the proxy. Symptoms of a bad proxy: browser fails, \`ping\` and \`nslookup\` work. Remove a leftover \`127.0.0.1:8888\` from a debugging session before you reimage.`,
      },
      {
        type: "diagram",
        id: "C2-D1-O7-L2-d1",
        component: "Ipv4Diagram",
        title: "Client IPv4 pieces",
        caption:
          "Address, mask, gateway, and DNS are four different knobs. DHCP usually fills all four; a static that forgets DNS looks like 'the internet is down.'",
        notice:
          "Notice a valid address with a blank DNS server still pings IPs and fails names. That is not a cable problem.",
        alt: "Diagram of host IP, subnet mask, default gateway, and DNS servers on a Windows client.",
      },
      {
        type: "knowledge-check",
        id: "C2-D1-O7-L2-kc1",
        questionIds: ["C2-D1-O7-PROXY-Q001", "C2-D1-O7-METERED-Q001"],
      },
      {
        type: "reading",
        id: "C2-D1-O7-L2-r2",
        title: "Metered connections and client IP configuration",
        markdown: `A **metered connection** tells Windows this NIC costs money or quota (cellular, some hotspots, some ISPs). Windows then delays large Windows Update downloads, OneDrive may pause, and some Store apps throttle. Set it on Wi-Fi or Ethernet in Settings. A user who "never gets patches on LTE" may be metered by design — say so in the ticket instead of forcing a 4 GB feature update over a phone hotspot.

**Client network configuration** is IPv4 (and IPv6) on the adapter:

- **IP address** and **subnet mask** (same network as the gateway)
- **Default gateway** (LAN router)
- **DNS servers** (internal first on a domain)
- **Static versus dynamic (DHCP)**

DHCP is the default for clients. Static is for servers, printers, and the occasional lab PC — document it, outside the DHCP scope, and still configure DNS. Alternate configuration exists for laptops that need a static at Site A and DHCP at home, but DHCP reservation on the server is cleaner.

APIPA (\`169.254.x.x\`) means DHCP failed. That is a cable, VLAN, DHCP server, or isolation problem — not "set a static 192.168.1.10 and call it done" on a corporate LAN.

Change settings in \`ncpa.cpl\` → NIC → Properties → IPv4, or Settings → Network & internet → the adapter. Confirm with \`ipconfig /all\`.`,
      },
      {
        type: "callout",
        id: "C2-D1-O7-L2-tech",
        callout: {
          kind: "technician",
          title: "Technician lens",
          body: "Ping by IP works, browser fails: proxy, TLS inspection, or DNS-over-HTTPS in the browser fighting corporate DNS. Ping is not a browser.",
        },
      },
      {
        type: "knowledge-check",
        id: "C2-D1-O7-L2-kc2",
        questionIds: ["C2-D1-O7-PROXY-Q002", "C2-D1-O7-METERED-Q002"],
      },
      {
        type: "checkpoint",
        id: "C2-D1-O7-L2-cp",
        questionIds: [
          "C2-D1-O7-WORKGROUP-Q002",
          "C2-D1-O7-DOMAINJOIN-Q002",
          "C2-D1-O7-UNC-Q003",
          "C2-D1-O7-METERED-Q003",
          "C2-D1-O7-PROXY-Q003",
          "C2-D1-O7-DOMAINJOIN-Q003",
          "C2-D1-O7-WORKGROUP-Q003",
          "C2-D1-O7-UNC-Q004",
        ],
      },
      {
        type: "summary",
        id: "C2-D1-O7-L2-sum",
        bullets: [
          "VPN, wired, wireless, and WWAN are different connection types with different failure modes.",
          "Public vs private vs domain firewall profiles change what sharing is allowed.",
          "Proxy breaks browsers while ping still works.",
          "Metered connections throttle updates; DHCP vs static vs APIPA is ipconfig /all.",
        ],
      },
    ],
  },
  {
    id: "C2-D1-O8-L1",
    objectiveId: "C2-D1-O8",
    slug: "macos-install-settings-folders",
    title: "macOS installs, System Settings, and folders",
    description:
      ".dmg, .pkg, .app, the App Store, System Settings panes, and /Applications /Users /Library /System.",
    estimatedMinutes: 22,
    conceptIds: ["C2-D1-O8-DMG", "C2-D1-O8-KEYCHAIN"],
    prerequisites: ["C2-D1-O7-L2"],
    lastVerified: "2026-09-01",
    sources: ["c2-obj-3.0", "apple-macos"],
    blocks: [
      {
        type: "callout",
        id: "C2-D1-O8-L1-why",
        callout: {
          kind: "why",
          title: "Why this matters",
          body: "A Windows tech who double-clicks a .dmg and expects Setup.exe will stall in front of a designer. macOS installers are disk images, packages, or already-runnable app bundles.",
        },
      },
      {
        type: "reading",
        id: "C2-D1-O8-L1-r1",
        title: "How software lands on a Mac",
        markdown: `**Installation file types:**

- **\`.dmg\` (disk image)** mounts like a virtual disk. You usually drag the **\`.app\`** bundle into **\`/Applications\`**, then eject the image. Nothing is "installed" into a registry.
- **\`.pkg\`** is a package installer with a wizard, often needing admin credentials, that can write LaunchDaemons, kernel extensions (legacy), and files outside \`/Applications\`.
- **\`.app\`** is the application bundle itself — a folder that looks like a single file. If someone mailed you the .app, you still move it into \`/Applications\` and deal with Gatekeeper.
- **App Store** installs signed apps tied to an Apple ID, with updates through the Store. Corporate Apple Business Manager / Volume Purchase can assign Store apps without a personal Apple ID.

**Uninstallation:** drag the .app to Trash (and empty it), then hunt leftovers in \`~/Library/Application Support\`, \`~/Library/Preferences\`, LaunchAgents, and login items. A .pkg that dropped system-wide files may ship an uninstaller or need a vendor script. There is no Programs and Features list that always tells the truth.

**Gatekeeper and Notarization** will block unsigned downloads. System Settings → Privacy & Security offers "Open Anyway" for a known-good build. Do not teach users to disable Gatekeeper globally.

**System Settings** (System Preferences on older macOS) is the control surface:

- **Displays** — resolution, arrangement, scaling (Retina).
- **Network** (Wi-Fi / Ethernet) — IP, DNS, VPN, locations.
- **Printers & Scanners** — queues, AirPrint, driver packages.
- **Privacy & Security** — TCC prompts: camera, microphone, Full Disk Access, Files and Folders. This is why a backup tool "doesn't see" Mail.
- **Accessibility** — VoiceOver, zoom, switch control.
- **Time Machine** — backup destination; next lesson.

**Apple ID and corporate restrictions:** a personal iCloud login on a corporate Mac fights MDM. Supervised devices can block Apple ID, force FileVault, and restrict the App Store. Ask whether the Mac is ADE-enrolled before you "just sign into iCloud to transfer photos."`,
      },
      {
        type: "table",
        id: "C2-D1-O8-L1-t1",
        title: "macOS system folders",
        headers: ["Path", "Who writes it", "What lives there"],
        rows: [
          ["/Applications", "Admins / installers", "Machine-wide apps"],
          ["/Users", "macOS", "Home folders (like C:\\Users)"],
          ["/Users/<name>/Library", "The user + apps", "Preferences, app support, logs"],
          ["/Library", "Admins / pkgs", "Machine-wide support files, LaunchDaemons"],
          ["/System", "Apple (SIP)", "The OS. Do not 'clean' it"],
        ],
        caption:
          "Library is hidden in Finder by default. Option-click Go, or ~/Library from Go to Folder.",
      },
      {
        type: "knowledge-check",
        id: "C2-D1-O8-L1-kc1",
        questionIds: ["C2-D1-O8-DMG-Q001", "C2-D1-O8-DMG-Q002"],
      },
      {
        type: "reading",
        id: "C2-D1-O8-L1-r2",
        title: "Finder, Dock, Mission Control, Spotlight, Keychain",
        markdown: `**Finder** is Explorer. **Dock** is the pinned app shelf. **Mission Control** and **multiple desktops** (Spaces) are the window-management model — three-finger swipe or Control+Up. **Gestures** are trackpad language; a user who "lost a window" often has it on another Space.

**Spotlight** (Command+Space) is search plus lightweight calculator/launch. Indexing after a migration can peg CPU — similar to Windows Search.

**Keychain** (Keychain Access, and iCloud Keychain) stores passwords, certificates, and Wi-Fi secrets. A login keychain that will not unlock (password out of sync after a directory reset) produces endless password prompts. Fix by creating a new login keychain or updating the password, not by turning off FileVault in a panic.

**iCloud**, **iMessage**, **FaceTime**, and **iCloud Drive** are identity-tied. Continuity (Handoff, Universal Clipboard, iPhone cellular calls on the Mac, Sidecar) requires the same Apple ID, Bluetooth/Wi-Fi, and supported hardware. When Continuity "just stopped," check Apple ID, two-factor, and radio toggles before you reinstall macOS.

**Force Quit** (Command+Option+Esc) is Task Manager's End task. **Terminal** is the Unix shell (zsh by default on modern macOS). **Disk Utility** formats APFS/HFS+, runs First Aid, and creates disk images.`,
      },
      {
        type: "callout",
        id: "C2-D1-O8-L1-exam",
        callout: {
          kind: "exam",
          title: "Exam lens",
          body: ".dmg is the image you mount; .pkg is the installer wizard; .app is the bundle you drag to /Applications. Three different verbs.",
        },
      },
      {
        type: "knowledge-check",
        id: "C2-D1-O8-L1-kc2",
        questionIds: ["C2-D1-O8-KEYCHAIN-Q001"],
      },
      {
        type: "summary",
        id: "C2-D1-O8-L1-sum",
        bullets: [
          ".dmg mounts; drag .app to /Applications. .pkg runs a wizard. App Store is signed + Apple ID.",
          "/System is SIP-protected; user junk lives in ~/Library.",
          "Privacy & Security (TCC) blocks cameras and Full Disk Access on purpose.",
          "Keychain holds secrets; a desynced login keychain looks like a password plague.",
        ],
      },
    ],
  },
  {
    id: "C2-D1-O8-L2",
    objectiveId: "C2-D1-O8",
    slug: "macos-backup-filevault-rsr",
    title: "Time Machine, FileVault, RSR, and Continuity",
    description:
      "macOS backup, full-disk encryption, Rapid Security Response patches, and the support lab.",
    estimatedMinutes: 22,
    conceptIds: [
      "C2-D1-O8-TIMEMACHINE",
      "C2-D1-O8-FILEVAULT",
      "C2-D1-O8-RSR",
      "C2-D1-O8-KEYCHAIN",
    ],
    prerequisites: ["C2-D1-O8-L1"],
    lastVerified: "2026-09-01",
    sources: ["c2-obj-3.0", "apple-macos", "apple-filevault"],
    blocks: [
      {
        type: "callout",
        id: "C2-D1-O8-L2-why",
        callout: {
          kind: "why",
          title: "Why this matters",
          body: "Time Machine is the macOS backup story the exam expects by name. FileVault is the BitLocker analog. Rapid Security Response is how Apple ships fixes between full macOS versions.",
        },
      },
      {
        type: "reading",
        id: "C2-D1-O8-L2-r1",
        title: "Backups, encryption, and patches",
        markdown: `**Time Machine** is Apple's built-in backup. Attach a dedicated disk (APFS or HFS+ depending on macOS generation) or a network destination (Time Capsule-style SMB). Time Machine takes local snapshots and incremental backups, and it can restore files or the whole Mac from Recovery. Best practice: a disk that is *only* the backup target, encrypted, and not the user's scratch drive. Time Machine is not iCloud Drive, and iCloud Photos is not a backup of the Mac.

**FileVault** is full-disk encryption for macOS (APFS native). Enable in System Settings → Privacy & Security. Escrow the recovery key in MDM or print it into the ticket vault — without it, a forgotten password on a FileVault volume is a wipe. FileVault at rest protects a stolen Mac; it does not replace a firmware password or MDM lost-mode.

**Updates / patches** come through System Settings → General → Software Update. Install macOS updates on a Time Machine disk that is healthy.

**Rapid Security Response (RSR)** is Apple's out-of-band security patch channel. RSR delivers critical web-kit / kernel fixes **without waiting for the next 13.x/14.x minor**. The version string gains a letter (for example 13.4.1 (a)). Users can apply RSR quickly; you can also remove an RSR if it breaks a kext-era vendor tool. On the exam, RSR is not "just Software Update with a new name" — it is the *between-releases* security mechanism.

**Antivirus** on macOS is still a policy choice: XProtect/Gatekeeper/MRT are built in; enterprises add an endpoint product. "Macs don't get malware" is not a control.

**Best-practice bundle** the objective wants: backups (Time Machine or MDM backup), encryption (FileVault), current patches including RSR, and an antivirus/EDR story that matches the rest of the fleet.`,
      },
      {
        type: "table",
        id: "C2-D1-O8-L2-t1",
        title: "Windows analog (approximate)",
        headers: ["macOS", "Windows cousin", "Do not confuse with"],
        rows: [
          ["Time Machine", "File History / image backup", "iCloud Drive sync"],
          ["FileVault", "BitLocker", "Keychain (that's credentials)"],
          ["RSR", "Out-of-band security update", "A full macOS upgrade"],
          ["Disk Utility First Aid", "chkdsk", "Time Machine restore"],
          ["Force Quit", "Task Manager End task", "Shutdown"],
          ["Terminal", "cmd / zsh via WSL", "PowerShell syntax"],
        ],
      },
      {
        type: "knowledge-check",
        id: "C2-D1-O8-L2-kc1",
        questionIds: ["C2-D1-O8-TIMEMACHINE-Q001", "C2-D1-O8-FILEVAULT-Q001"],
      },
      {
        type: "lab",
        id: "C2-D1-O8-L2-lab",
        labId: "C2-D1-O8-MACOS-LAB",
        title: "macOS support lab",
        prompt:
          "Install from the correct artifact (.dmg vs .pkg), point Time Machine at a backup disk, and enable FileVault. Do not treat iCloud as the backup.",
      },
      {
        type: "callout",
        id: "C2-D1-O8-L2-mistake",
        callout: {
          kind: "mistake",
          title: "Common mistake",
          body: "Turning on iCloud Drive and declaring backups done. Sync is not a versioned backup, and it will happily sync ransomware-encrypted files.",
        },
      },
      {
        type: "knowledge-check",
        id: "C2-D1-O8-L2-kc2",
        questionIds: ["C2-D1-O8-RSR-Q001", "C2-D1-O8-FILEVAULT-Q002"],
      },
      {
        type: "checkpoint",
        id: "C2-D1-O8-L2-cp",
        questionIds: [
          "C2-D1-O8-DMG-Q003",
          "C2-D1-O8-TIMEMACHINE-Q002",
          "C2-D1-O8-FILEVAULT-Q003",
          "C2-D1-O8-KEYCHAIN-Q002",
          "C2-D1-O8-RSR-Q002",
          "C2-D1-O8-RSR-Q003",
          "C2-D1-O8-TIMEMACHINE-Q003",
          "C2-D1-O8-DMG-Q004",
        ],
      },
      {
        type: "summary",
        id: "C2-D1-O8-L2-sum",
        bullets: [
          "Time Machine is the named macOS backup; escrow destinations and test a restore.",
          "FileVault is full-disk encryption; escrow the recovery key.",
          "RSR patches security between macOS point releases.",
          "Continuity and iCloud are identity features, not backups.",
        ],
      },
    ],
  },
  {
    id: "C2-D1-O9-L1",
    objectiveId: "C2-D1-O9",
    slug: "linux-file-commands",
    title: "Linux file management commands",
    description:
      "ls, pwd, mv, cp, rm, chmod, chown, grep, and find — plus why POSIX permissions are not NTFS.",
    estimatedMinutes: 24,
    conceptIds: ["C2-D1-O9-CHMOD", "C2-D1-O9-SUDO"],
    prerequisites: ["C2-D1-O8-L2"],
    lastVerified: "2026-09-01",
    sources: ["c2-obj-3.0", "debian-ref", "man7"],
    blocks: [
      {
        type: "callout",
        id: "C2-D1-O9-L1-why",
        callout: {
          kind: "why",
          title: "Why this matters",
          body: "A Linux ticket that starts in a GUI file manager dies the moment permissions, a hidden dotfile, or a root-owned log appear. The objective list is a command list on purpose.",
        },
      },
      {
        type: "reading",
        id: "C2-D1-O9-L1-r1",
        title: "Move, see, search, and permission",
        markdown: `Linux pathing is a single tree. There are no drive letters. **pwd** prints the working directory. **ls** lists; **\`ls -l\`** long (mode, owner, size, mtime); **\`ls -a\`** includes dotfiles; **\`ls -lh\`** human sizes. Tab-complete. You are lost without pwd/ls.

**mv** moves or renames. **cp** copies; **\`cp -r\`** for directories. **rm** deletes; **\`rm -r\`** recursive; **\`rm -rf\`** recursive and silent — the famous foot-cannon. There is no Recycle Bin in the shell.

**grep** prints lines matching a pattern. \`grep -R "error" /var/log\` is a first look at a failed service. **find** locates files by name, type, or time: \`find /home -name "*.pdf"\`. grep searches *inside*; find searches *names and metadata*.

**chmod** changes the mode bits. The exam expects both symbolic and octal:

- \`rwx\` for owner, group, others — read 4, write 2, execute 1.
- \`chmod 755 script.sh\` is rwxr-xr-x (owner full, group/others read+execute).
- \`chmod 644 file.txt\` is rw-r--r--.
- \`chmod u+x tool\` adds execute for the owner.
- Execute on a directory means you can *traverse* it.

**chown** changes owner and group: \`chown alice:staff report.pdf\` or \`chown -R root:root /etc/nginx\`. Only root (via **sudo**) can give files away. A web app that cannot write its own log is often a chown/chmod ticket, not a broken package.

Windows NTFS ACLs are richer; POSIX mode bits are the A+ Linux model. Do not look for a "Read & execute" GUI on a server you SSH into.

Paths are case-sensitive on typical Linux filesystems: Reports and reports are different names. Spaces in names need quotes. A leading slash is from the root of the tree; a relative path is from pwd. Tab completion is how you avoid typos in rm. When a ticket says the file vanished, ls -a and find beat a reinstall: someone renamed it, a cron job moved it, or it is a dotfile. grep without a path reads stdin; grep pattern file reads a file; grep -R pattern dir walks a tree. Learn those three shapes and you can read logs without a GUI.`,
      },
      {
        type: "table",
        id: "C2-D1-O9-L1-t1",
        title: "File commands",
        headers: ["Command", "Job", "Dangerous switch"],
        rows: [
          ["pwd", "Where am I?", "—"],
          ["ls", "What is here?", "-a hides nothing"],
          ["mv", "Move/rename", "Overwrites without asking, depending on alias"],
          ["cp", "Copy", "-r required for directories"],
          ["rm", "Delete", "-rf"],
          ["grep", "Match text", "—"],
          ["find", "Match files", "—"],
          ["chmod", "Mode bits", "777 on a world-facing dir"],
          ["chown", "Owner:group", "-R as root on /"],
        ],
      },
      {
        type: "knowledge-check",
        id: "C2-D1-O9-L1-kc1",
        questionIds: ["C2-D1-O9-CHMOD-Q001", "C2-D1-O9-CHMOD-Q002"],
      },
      {
        type: "reading",
        id: "C2-D1-O9-L1-r2",
        title: "su, sudo, and the root account",
        markdown: `**root** is UID 0 — the Linux superuser. Direct root logins over SSH are often disabled on purpose.

**su** switches user. **\`su -\`** (or \`su - root\`) starts a login shell as that user and asks for *that user's* password (the root password, if you are going to root).

**sudo** runs one command as root (or another user) after *your* password, if you are in the sudoers file (\`/etc/sudoers\`, edit with \`visudo\`). Ubuntu-style desktops use sudo and leave the root password unset. \`sudo -i\` is an interactive root shell.

Use the least privilege that works. \`sudo nano /etc/fstab\` is appropriate. \`sudo chmod 777 /var/www\` is a confession.`,
      },
      {
        type: "diagram",
        id: "C2-D1-O9-L1-d1",
        component: "PermissionDiagram",
        title: "POSIX mode bits",
        caption: "Three triples: user, group, other — rwx as 4+2+1.",
        notice:
          "Notice execute on a directory is traverse, not 'run this folder as a program.'",
        alt: "rwx rwx rwx diagram with octal 7 5 5 example on a script.",
      },
      {
        type: "knowledge-check",
        id: "C2-D1-O9-L1-kc2",
        questionIds: ["C2-D1-O9-SUDO-Q001", "C2-D1-O9-SUDO-Q002"],
      },
      {
        type: "summary",
        id: "C2-D1-O9-L1-sum",
        bullets: [
          "pwd/ls orient; mv/cp/rm change the tree; grep reads content; find locates names.",
          "chmod 755/644 are the default instincts; 777 is not.",
          "chown needs root; sudo is per-command elevation.",
          "root is UID 0; prefer sudo over a standing root shell.",
        ],
      },
    ],
  },
  {
    id: "C2-D1-O9-L2",
    objectiveId: "C2-D1-O9",
    slug: "linux-packages-etc-systemd",
    title: "Packages, /etc files, systemd, kernel, bootloader",
    description:
      "apt versus dnf, the five named configuration files, and the OS components that boot a Linux client.",
    estimatedMinutes: 24,
    conceptIds: ["C2-D1-O9-APT", "C2-D1-O9-SYSTEMD", "C2-D1-O9-ETC"],
    prerequisites: ["C2-D1-O9-L1"],
    lastVerified: "2026-09-01",
    sources: ["c2-obj-3.0", "debian-ref", "man7"],
    blocks: [
      {
        type: "callout",
        id: "C2-D1-O9-L2-why",
        callout: {
          kind: "why",
          title: "Why this matters",
          body: "/etc is where Linux keeps machine configuration. If you can read passwd, shadow, hosts, fstab, and resolv.conf, you can diagnose a surprising fraction of client failures without a GUI.",
        },
      },
      {
        type: "reading",
        id: "C2-D1-O9-L2-r1",
        title: "The five files and the three OS parts",
        markdown: `**Package management** installs software from repositories.

- **apt** (Advanced Package Tool) is Debian/Ubuntu: \`sudo apt update\` refreshes indexes; \`sudo apt install nginx\`; \`sudo apt remove\`; \`apt search\`. The older \`apt-get\` still works.
- **dnf** is Fedora / modern RHEL family (replacing yum): \`sudo dnf install\`, \`dnf update\`, \`dnf search\`.

Do not mix them. An Ubuntu box has no dnf; a Fedora box is not apt-first.

**Common configuration files** (all under \`/etc\`):

- **\`/etc/passwd\`** — user account list: username, UID, GID, home, shell. The password field is \`x\`, meaning the hash is not here.
- **\`/etc/shadow\`** — password hashes and aging. Root-readable only. If passwd is world-readable (it should be) and shadow is not, that is by design.
- **\`/etc/hosts\`** — static name-to-IP, consulted before or beside DNS depending on \`nsswitch.conf\`. A leftover lab entry here is a classic "only this PC cannot resolve the intranet" ticket.
- **\`/etc/fstab\`** — filesystems to mount at boot: device, mountpoint, type, options. A typo here can make a desktop fail to boot or wait 90 seconds on a missing USB disk. Use \`nofail\` for removable devices.
- **\`/etc/resolv.conf\`** — DNS resolver (nameserver, search). On systemd-resolved systems this file may be a stub pointing at 127.0.0.53 — edit the real config (NetworkManager or \`resolved.conf\`) or your change vanishes.

**OS components:**

- **Kernel** — the Linux kernel (file often in \`/boot/vmlinuz-*\`) talks to hardware.
- **Bootloader** — GRUB (most desktops) or systemd-boot loads the kernel. Repair with a live USB when \`/boot\` is broken.
- **systemd** — the init/service manager on most current clients: \`systemctl status ssh\`, \`systemctl enable --now cups\`, \`journalctl -u ssh\`. Service failures are systemd + logs, not 'Linux is down.'`,
      },
      {
        type: "table",
        id: "C2-D1-O9-L2-t1",
        title: "/etc files",
        headers: ["File", "Holds", "Typical ticket"],
        rows: [
          ["/etc/passwd", "Accounts, UID, shell, home", "User cannot log in / wrong shell"],
          ["/etc/shadow", "Password hashes", "Authentication, aging"],
          ["/etc/hosts", "Static names", "One PC, wrong IP for a name"],
          ["/etc/fstab", "Boot mounts", "Stuck at boot, missing disk"],
          ["/etc/resolv.conf", "DNS resolvers", "Names fail, IPs work"],
        ],
      },
      {
        type: "knowledge-check",
        id: "C2-D1-O9-L2-kc1",
        questionIds: ["C2-D1-O9-ETC-Q001", "C2-D1-O9-APT-Q001"],
      },
      {
        type: "reading",
        id: "C2-D1-O9-L2-r2",
        title: "Filesystem tools and the editor",
        markdown: `**mount** attaches a filesystem to a directory. \`mount /dev/sdb1 /mnt/usb\` then work under \`/mnt/usb\`. \`umount\` (note the spelling) detaches. **fstab** is just the persistent mount list.

**fsck** checks and repairs a Linux filesystem (ext4, XFS has its own \`xfs_repair\`). Run it on an **unmounted** volume — never on the live root without a live environment or a systemd fsck on next boot. It is chkdsk's cousin, not a backup.

**nano** is the objective's text editor: \`sudo nano /etc/hosts\`, Ctrl+O write, Ctrl+X exit. vi/vim may be present; the exam named nano.

**cat** dumps a file to the terminal: \`cat /etc/resolv.conf\`. Combine with grep.`,
      },
      {
        type: "callout",
        id: "C2-D1-O9-L2-exam",
        callout: {
          kind: "exam",
          title: "Exam lens",
          body: "apt = Debian/Ubuntu. dnf = Fedora/RHEL family. Password hashes are in shadow, not passwd. systemd is the service manager, not the kernel.",
        },
      },
      {
        type: "knowledge-check",
        id: "C2-D1-O9-L2-kc2",
        questionIds: ["C2-D1-O9-SYSTEMD-Q001", "C2-D1-O9-ETC-Q002"],
      },
      {
        type: "summary",
        id: "C2-D1-O9-L2-sum",
        bullets: [
          "apt and dnf are distro-specific package managers.",
          "passwd vs shadow vs hosts vs fstab vs resolv.conf — five different jobs.",
          "systemd manages services; the kernel is vmlinuz; the bootloader is usually GRUB.",
          "fsck unmounted; mount/umount; nano to edit; cat to read.",
        ],
      },
    ],
  },
  {
    id: "C2-D1-O9-L3",
    objectiveId: "C2-D1-O9",
    slug: "linux-network-info-lab",
    title: "Linux network, process info, and the terminal lab",
    description:
      "ip, ping, curl, dig, traceroute, man, top, ps, du, df — then the sandboxed Linux lab.",
    estimatedMinutes: 24,
    conceptIds: [
      "C2-D1-O9-CHMOD",
      "C2-D1-O9-SUDO",
      "C2-D1-O9-APT",
      "C2-D1-O9-SYSTEMD",
      "C2-D1-O9-ETC",
    ],
    prerequisites: ["C2-D1-O9-L2"],
    lastVerified: "2026-09-01",
    sources: ["c2-obj-3.0", "debian-ref", "man7"],
    blocks: [
      {
        type: "callout",
        id: "C2-D1-O9-L3-why",
        callout: {
          kind: "why",
          title: "Why this matters",
          body: "ifconfig is legacy. The objective lists ip. Using the wrong network command is a giveaway that your notes are older than the exam.",
        },
      },
      {
        type: "reading",
        id: "C2-D1-O9-L3-r1",
        title: "Network and informational commands",
        markdown: `**ip** (from iproute2) is the modern address/link/route tool. \`ip addr\` (or \`ip a\`) shows addresses; \`ip link\` shows NICs up/down; \`ip route\` shows the default gateway. This replaces ifconfig/route on current distros.

**ping** is the same idea as Windows (ICMP). Linux ping runs until Ctrl+C unless you \`ping -c 4 host\`.

**curl** fetches a URL — headers, APIs, files. \`curl -I https://example.com\` is a quick "does HTTP work" that is not a browser. It is not ping.

**dig** queries DNS with adult output (A, MX, SOA). \`dig intranet.company.local\` is nslookup's clearer cousin. **nslookup** may exist; the objective named **dig**.

**traceroute** (or \`traceroute -n\`) maps hops; some distros ship \`tracepath\`. Same job as tracert, often UDP/ICMP depending on flags.

**man** is the manual. \`man chmod\`, \`man 5 fstab\` (section 5 is file formats). Read man pages; do not guess flags on production.

**top** is a live process view (CPU/RAM); **ps** is a snapshot (\`ps aux\`, \`ps -ef\`). **du** is disk usage of a *path* (\`du -sh /var/log\`); **df** is free space on *mounted filesystems* (\`df -h\`). Mixing du and df is a common miss: df says the disk is full; du tells you which directory did it.

Together with chmod/chown/sudo/apt/dnf and the /etc files, that is the entire 1.9 command surface.

A practical Linux no-network ladder mirrors Windows: ip addr and ip route for address and gateway, ping -c 4 to the gateway then to an IP, then dig for the name, then curl -I if the complaint is a website. resolv.conf explains a name failure that ping-by-IP does not. Stay inside the named command list on a PBQ. When CPU is high, top then ps to copy the PID; when disk is full, df -h then du -sh in the full mount. Write those results in the ticket the same way you would paste ipconfig /all on Windows. The sandbox lab cannot hurt the host; a real root shell can — prefer sudo for one command over a standing root prompt.`,
      },
      {
        type: "table",
        id: "C2-D1-O9-L3-t1",
        title: "Linux network versus Windows cousins",
        headers: ["Linux", "Windows analog"],
        rows: [
          ["ip addr / ip route", "ipconfig / route print"],
          ["ping -c 4", "ping -n 4"],
          ["dig", "nslookup"],
          ["traceroute", "tracert"],
          ["curl", "No single built-in; Invoke-WebRequest"],
          ["ps / top", "Task Manager / tasklist"],
          ["df -h / du -sh", "diskmgmt + Properties / tree size"],
          ["man", "command /?"],
        ],
      },
      {
        type: "knowledge-check",
        id: "C2-D1-O9-L3-kc1",
        questionIds: ["C2-D1-O9-APT-Q002", "C2-D1-O9-SYSTEMD-Q002"],
      },
      {
        type: "lab",
        id: "C2-D1-O9-L3-lab",
        labId: "C2-D1-O9-LINUX-LAB",
        title: "Sandboxed Linux terminal",
        prompt:
          "pwd and ls to locate yourself, cat the /etc files, chmod/chown a file, use ip/ping, and install with the package manager that matches the distro. The lab cannot touch the host.",
      },
      {
        type: "callout",
        id: "C2-D1-O9-L3-tech",
        callout: {
          kind: "technician",
          title: "Technician lens",
          body: "df -h first when 'disk full,' then du -sh * in the suspect mount. Starting with rm -rf /var is how you delete the logs you needed.",
        },
      },
      {
        type: "knowledge-check",
        id: "C2-D1-O9-L3-kc2",
        questionIds: ["C2-D1-O9-ETC-Q003", "C2-D1-O9-CHMOD-Q003"],
      },
      {
        type: "checkpoint",
        id: "C2-D1-O9-L3-cp",
        questionIds: [
          "C2-D1-O9-CHMOD-Q004",
          "C2-D1-O9-SUDO-Q003",
          "C2-D1-O9-APT-Q003",
          "C2-D1-O9-SYSTEMD-Q003",
          "C2-D1-O9-ETC-Q004",
          "C2-D1-O9-ETC-Q005",
          "C2-D1-O9-CHMOD-Q005",
          "C2-D1-O9-SUDO-Q004",
        ],
      },
      {
        type: "summary",
        id: "C2-D1-O9-L3-sum",
        bullets: [
          "ip, ping, curl, dig, traceroute are the Linux network set — not ifconfig.",
          "man explains flags; cat reads files; nano edits them.",
          "top/ps watch processes; du measures a directory; df measures a mount.",
          "The Linux lab is the PBQ practice for this objective.",
        ],
      },
    ],
  },
  {
    id: "C2-D1-O10-L1",
    objectiveId: "C2-D1-O10",
    slug: "application-install-requirements",
    title: "Application installation requirements",
    description:
      "32 vs 64-bit, GPU/VRAM, RAM, CPU, tokens, OS compatibility, distribution method, and impact.",
    estimatedMinutes: 22,
    conceptIds: [
      "C2-D1-O10-X86APP",
      "C2-D1-O10-VRAM",
      "C2-D1-O10-ISO",
      "C2-D1-O10-IMPACT",
    ],
    prerequisites: ["C2-D1-O9-L3"],
    lastVerified: "2026-09-01",
    sources: ["c2-obj-3.0", "ms-windows"],
    blocks: [
      {
        type: "callout",
        id: "C2-D1-O10-L1-why",
        callout: {
          kind: "why",
          title: "Why this matters",
          body: "Setup.exe failing with a silent exit is often 'this is a 64-bit-only build on a leftover 32-bit Windows 10' or 'the CAD suite wants 8 GB of dedicated VRAM and you have an iGPU.' Read the requirements before you run the installer.",
        },
      },
      {
        type: "reading",
        id: "C2-D1-O10-L1-r1",
        title: "System requirements that actually fail installs",
        markdown: `**32-bit versus 64-bit.** A 64-bit OS can usually run 32-bit user-mode apps (WoW64 on Windows). A 32-bit OS cannot run 64-bit apps. Windows 11 is 64-bit only. An installer named \`setup_x86.exe\` versus \`setup_x64.exe\` is not decoration. Match the app to the OS architecture, then match RAM: 32-bit processes still top out near 4 GB even on a 64-bit OS unless Large Address Aware tricks apply.

**CPU requirements** list generation, core count, instruction sets (AVX), and sometimes a specific Apple silicon versus Intel Mac split. A "1 GHz" line is a legal minimum, not a usable CAD workstation.

**RAM requirements** are idle-plus-workload. The box that says 8 GB minimum and 16 GB recommended means the 8 GB PC will page. Believe recommended when the app is a browser-with-fifty-tabs or a VM host.

**Storage** includes the install footprint *and* working space (video scratch, temp, local caches). An app that wants 4 GB on C: will still fail if C: has 3.9 GB free.

**Dedicated versus integrated graphics, and VRAM.** Integrated GPUs steal system RAM and are fine for Office. Dedicated GPUs have their own **VRAM**. 3D, CAD, and local AI runtimes publish VRAM minima. An iGPU with 128 MB carved out will not satisfy "4 GB VRAM dedicated." On laptops, confirm the app is actually using the discrete GPU (Windows Graphics settings / NVIDIA control panel) before you blame the vendor.

**External hardware tokens** are USB/smart-card keys for licensing or MFA (HASP dongles, FIDO2, smart cards). The app may install and then refuse to launch without the token, a driver, and sometimes a license server. Do not call that a failed install; call it a missing control.

**Application to OS compatibility** includes edition (some tools refuse Windows Home), version (Win11 24H2), macOS major, and Linux distro glibc. Check the vendor matrix. Compatibility mode is a last resort for ancient Win32, not for kernel drivers.`,
      },
      {
        type: "table",
        id: "C2-D1-O10-L1-t1",
        title: "Distribution methods",
        headers: ["Method", "What it is", "Watch for"],
        rows: [
          ["Physical media", "USB/DVD the vendor mailed", "Lost discs, old builds, no TLS"],
          ["Mountable ISO", "File you mount or burn", "Hash it; boot or loop-mount"],
          ["Downloadable package", "exe/msi/dmg/pkg/deb/rpm from the web", "HTTPS, hash/signature, not the first ad"],
          ["Image deployment", "App baked into the golden image / Intune", "Version drift vs the store"],
        ],
      },
      {
        type: "knowledge-check",
        id: "C2-D1-O10-L1-kc1",
        questionIds: ["C2-D1-O10-X86APP-Q001", "C2-D1-O10-VRAM-Q001"],
      },
      {
        type: "reading",
        id: "C2-D1-O10-L1-r2",
        title: "Impact considerations",
        markdown: `Installing software is a change. The objective wants you to think past Setup's progress bar.

- **Device impact** — disk, reboot, GPU driver co-installers that reset display, antivirus false positives, tokens occupying USB.
- **Network impact** — pulling a 20 GB game or SDK over a metered WWAN; license servers; CDN; peer-to-peer delivery optimization saturating a small WAN.
- **Operation impact** — reboot during business hours; add-ins that break Outlook; services that bind a port already used by the line-of-business app.
- **Business impact** — licensing (per-user vs device vs concurrent), data residency of a cloud companion app, who owns the plugin that just phoned home.

A technician who installs a "free" codec pack on a finance PC has created a supply-chain and support problem. Package from the approved catalog, or file a change.

**ISO files** are both a distribution method and a bootable installer source (objective 1.2). Hash (SHA-256) against the vendor's published digest. Mount in Explorer on Windows 8+; do not grab the ISO from a random mirror because the first Google result had a download button.`,
      },
      {
        type: "callout",
        id: "C2-D1-O10-L1-exam",
        callout: {
          kind: "exam",
          title: "Exam lens",
          body: "If the stem lists VRAM and the PC has only an iGPU, the answer is dedicated GPU / more VRAM — not 'more system RAM' unless the vendor explicitly allows shared memory, which CAD vendors usually do not.",
        },
      },
      {
        type: "knowledge-check",
        id: "C2-D1-O10-L1-kc2",
        questionIds: ["C2-D1-O10-ISO-Q001", "C2-D1-O10-IMPACT-Q001"],
      },
      {
        type: "checkpoint",
        id: "C2-D1-O10-L1-cp",
        questionIds: [
          "C2-D1-O10-X86APP-Q002",
          "C2-D1-O10-VRAM-Q002",
          "C2-D1-O10-ISO-Q002",
          "C2-D1-O10-IMPACT-Q002",
          "C2-D1-O10-IMPACT-Q003",
          "C2-D1-O10-X86APP-Q003",
          "C2-D1-O10-VRAM-Q003",
          "C2-D1-O10-ISO-Q003",
        ],
      },
      {
        type: "summary",
        id: "C2-D1-O10-L1-sum",
        bullets: [
          "Match 32/64-bit, RAM, CPU, disk, GPU/VRAM, and OS version before Setup.",
          "Hardware tokens are licensing/MFA devices, not optional jewelry.",
          "Distribute via approved media, hashed ISO, vendor download, or image — not random mirrors.",
          "Device, network, operation, and business impact are part of the install, not afterthoughts.",
        ],
      },
    ],
  },
  {
    id: "C2-D1-O11-L1",
    objectiveId: "C2-D1-O11",
    slug: "cloud-productivity-tools",
    title: "Cloud-based productivity",
    description:
      "Email, storage sync, collaboration suites, identity sync, and licensing assignment for a fictional employee.",
    estimatedMinutes: 22,
    conceptIds: [
      "C2-D1-O11-EMAILSYNC",
      "C2-D1-O11-LICENSE",
      "C2-D1-O11-COLLAB",
    ],
    prerequisites: ["C2-D1-O10-L1"],
    lastVerified: "2026-09-01",
    sources: ["c2-obj-3.0", "ms-windows", "apple-macos"],
    blocks: [
      {
        type: "callout",
        id: "C2-D1-O11-L1-why",
        callout: {
          kind: "why",
          title: "Why this matters",
          body: "A new hire who can open Word but cannot sign into mail, OneDrive, or Teams is not 'done onboarding.' Cloud productivity is identity plus license plus client configuration.",
        },
      },
      {
        type: "reading",
        id: "C2-D1-O11-L1-r1",
        title: "The suite is not the app icon",
        markdown: `Cloud productivity in A+ means the Microsoft 365 / Google Workspace / Apple iCloud class of tools, not "someone's VM in Azure." You configure **clients** and **licenses** for a person.

**Email systems** — Exchange Online, Gmail, or a host like Microsoft 365. The client may be Outlook desktop, Outlook on the web, Apple Mail, or the Mail app. You care about: protocol (Modern Auth / OAuth, not basic IMAP on a corporate tenant if policy forbids it), Autodiscover/Autoconfig, and whether the mailbox exists. A correct password with no mailbox license produces a very specific error; a wrong password produces another. Read them.

**Storage sync / folder settings** — OneDrive, Google Drive for Desktop, iCloud Drive. You choose which folders sync, Known Folder Move (Desktop/Documents/Pictures to OneDrive), Files On-Demand versus always-available, and the local cache location (do not put it on a tiny OS disk if you have a D:). Sync is not backup: it mirrors deletes and ransomware. Pause sync before huge PST copies.

**Collaboration tools** on the objective list:

- **Word processing** — Word / Google Docs / Pages
- **Spreadsheets** — Excel / Google Sheets / Numbers
- **Presentation tools** — PowerPoint / Google Slides / Keynote
- **Videoconferencing** — Teams / Meet / Zoom / FaceTime (the last is Apple identity, not a tenant license)
- **Instant messaging** — Teams, Chat, Slack, Messages

The exam will not require clicking every ribbon. It will require assigning the right **license**, signing into the right **identity**, and knowing that a meeting add-in fails when the account in Teams is not the account in Outlook.`,
      },
      {
        type: "diagram",
        id: "C2-D1-O11-L1-d1",
        component: "CloudModelsDiagram",
        title: "Identity, license, then client",
        caption:
          "A cloud productivity stack: directory identity, assigned SKU, then apps that sync mail, files, and meetings.",
        notice:
          "Notice storage sync is a client cache of a cloud store. Revoking the license tomorrow does not make last week's files a supported backup.",
        alt: "Flow from identity provider to license assignment to email, drive, and collaboration clients.",
      },
      {
        type: "knowledge-check",
        id: "C2-D1-O11-L1-kc1",
        questionIds: ["C2-D1-O11-EMAILSYNC-Q001", "C2-D1-O11-LICENSE-Q001"],
      },
      {
        type: "reading",
        id: "C2-D1-O11-L1-r2",
        title: "Identity synchronization and licensing assignment",
        markdown: `**Identity synchronization** is how on-premises Active Directory users become cloud users: **Microsoft Entra Connect** (Azure AD Connect) sync, Google Cloud Directory Sync, or a cloud-only account with no on-prem shadow. Password hash sync, pass-through authentication, and federation (AD FS) are the usual patterns. When a user can sign into the PC with a domain password but Microsoft 365 says the account does not exist, you are looking at sync (OU scoping, UPN mismatch, duplicate proxyAddresses) — not Outlook.

**Licensing assignment** is a SKU on the person (or group-based licensing): Microsoft 365 Business Basic vs Standard vs E3/E5, Google Workspace Business vs Enterprise. Mailbox, Teams, and desktop app rights are different checkboxes. Assigning a license is not installing Office; installing Office is not assigning a license. Both must be true. Unassign on offboarding or you pay forever and the ex-employee's mail keeps syncing to a phone.

Onboarding sequence that actually works:

1. Identity exists and is licensed.
2. MFA registered per policy.
3. Mail profile Autodiscovers.
4. Desktop apps signed in (same identity).
5. Drive client known-folder or chosen folders, not the entire C:.
6. Teams/Meet can schedule against the mailbox.

Document the UPN. "I signed into the personal Outlook.com in the desktop app" is the number-one false success.`,
      },
      {
        type: "table",
        id: "C2-D1-O11-L1-t1",
        title: "Symptom to layer",
        headers: ["Symptom", "Look at"],
        rows: [
          ["Cannot sign in anywhere", "Identity, MFA, password, sync"],
          ["Signs in, no mailbox", "License SKU"],
          ["Mailbox works, Word says unlicensed", "Apps license vs web-only SKU"],
          ["Files missing on second PC", "Sync folders / Files On-Demand / wrong account"],
          ["Meetings not in calendar", "Teams/Meet identity ≠ mailbox"],
          ["Personal OneDrive mixed with work", "Account picker; separate profiles"],
        ],
      },
      {
        type: "callout",
        id: "C2-D1-O11-L1-mistake",
        callout: {
          kind: "mistake",
          title: "Common mistake",
          body: "Installing Microsoft 365 Apps from a random ISO, signing into a personal Microsoft account, and declaring the corporate mailbox 'broken.' The client identity is wrong.",
        },
      },
      {
        type: "knowledge-check",
        id: "C2-D1-O11-L1-kc2",
        questionIds: ["C2-D1-O11-COLLAB-Q001", "C2-D1-O11-LICENSE-Q002"],
      },
      {
        type: "checkpoint",
        id: "C2-D1-O11-L1-cp",
        questionIds: [
          "C2-D1-O11-EMAILSYNC-Q002",
          "C2-D1-O11-EMAILSYNC-Q003",
          "C2-D1-O11-LICENSE-Q003",
          "C2-D1-O11-COLLAB-Q002",
          "C2-D1-O11-COLLAB-Q003",
          "C2-D1-O11-LICENSE-Q004",
          "C2-D1-O11-EMAILSYNC-Q004",
          "C2-D1-O11-COLLAB-Q004",
        ],
      },
      {
        type: "summary",
        id: "C2-D1-O11-L1-sum",
        bullets: [
          "Cloud productivity = identity + license + correctly signed-in clients.",
          "Email, drive sync, docs, sheets, slides, meetings, and IM are the named tool types.",
          "Sync folders and Known Folder Move are configuration, not magic; sync is not backup.",
          "Identity sync (Entra Connect and cousins) explains 'PC password works, M365 does not.'",
        ],
      },
    ],
  },
];

