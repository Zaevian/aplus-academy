import type { Lesson } from "../../schema";

export const C2_D4_LESSONS: Lesson[] = [
  {
    id: "C2-D4-O1-L1",
    objectiveId: "C2-D4-O1",
    slug: "tickets-that-travel",
    title: "Tickets a stranger can follow",
    description:
      "Turn 'PC broken' into user, asset, severity, reproduction, and a resolution note that survives shift change.",
    estimatedMinutes: 22,
    conceptIds: ["C2-D4-O1-TICKET", "C2-D4-O1-SLA"],
    prerequisites: [],
    lastVerified: "2026-09-01",
    sources: ["c2-obj-3.0"],
    blocks: [
      {
        type: "callout",
        id: "C2-D4-O1-L1-why",
        callout: {
          kind: "why",
          title: "Why this matters",
          body: "A ticket is not bureaucracy. It is how the next technician, the auditor, and the SLA clock all learn what actually happened. 'PC broken' is a voicemail, not a record.",
        },
      },
      {
        type: "reading",
        id: "C2-D4-O1-L1-r1",
        title: "Fields that make a ticket usable",
        markdown: `A **ticketing system** is the help desk's memory. Minimum useful fields:

- **User and contact**: who, callback, alternate if they are in a meeting.
- **Asset**: hostname, **asset tag / ID**, serial, location. This is how you join the ticket to the **configuration management database (CMDB)** and the warranty.
- **Category**: hardware, OS, account, email, request versus incident.
- **Description in the user's words**, then **reproduction steps** in yours.
- **Severity / priority**: impact × urgency. One executive laptop is not automatically Sev-1 if a warehouse scanner outage has stopped shipping.
- **Escalation**: when it leaves tier 1, to whom, with what already tried.
- **Technician notes**: commands, error text, screenshots, times. Write for a stranger on the night shift.
- **Resolution**: what fixed it, what did not, and the **knowledge base** article to attach.

**Incident reports** are the longer form after a major outage: timeline, impact, root cause, actions. They are not a substitute for the ticket; they cite it.

**Severity** is not a mood. A printer jam for one person is low. The same jam on the only label printer at shipping during a freeze window is high. **Escalation** is a documented path, not a threat. If the SLA is about to breach, escalate with the notes already complete — an empty escalation is how you donate your remaining minutes to someone else who still has to ask the user which PC.

Close with a resolution a stranger could follow: "Cleared Print Spooler on WH-PACK-02 (asset A-4412); removed stuck job 4481; installed vendor driver 12.4; test page OK; user confirmed five labels." Not: "fixed printer."`,
      },
      {
        type: "lab",
        id: "C2-D4-O1-L1-lab",
        labId: "C2-D4-O1-TICKET-LAB",
        title: "Help-desk ticket lab",
        prompt:
          "The user said 'PC broken.' Capture user, device, category, severity, reproduction, and a next action. Close with resolution notes a night-shift technician could follow.",
      },
      {
        type: "knowledge-check",
        id: "C2-D4-O1-L1-kc1",
        questionIds: ["C2-D4-O1-TICKET-Q001"],
      },
      {
        type: "reading",
        id: "C2-D4-O1-L1-r2",
        title: "SLA is a clock, not a feeling",
        markdown: `A **service-level agreement (SLA)** states measurable targets: time to **respond**, time to **resolve** or restore, uptime, and sometimes a penalty. Priority maps to those clocks. P1 might be 15-minute response and 4-hour restore; P4 might be next business day. Your job is to set the priority honestly and to timestamp every status change. Leaving a P2 in "awaiting user" without a note is how you burn the clock and then argue with a manager.

If the user is unavailable, document the attempts. SLA pause rules (waiting on vendor, waiting on customer) only work if the ticket says so. **Knowledge base** articles that match the resolution shrink the next SLA because the next tech does not rediscover the same spooler bug.`,
      },
      {
        type: "table",
        id: "C2-D4-O1-L1-t1",
        title: "Bad ticket versus usable ticket",
        headers: ["Field", "Unusable", "Usable"],
        rows: [
          ["Title", "PC broken", "WH-PACK-02 will not print shipping labels"],
          ["User", "(blank)", "A. Chen, ext 4412, warehouse lead"],
          ["Asset", "the Dell", "A-4412 / WH-PACK-02 / S/N …"],
          ["Severity", "URGENT!!!!", "P2 — shipping line stopped, workaround: write labels"],
          ["Notes", "looked at it", "Event 61, spooler restart, driver 12.4, test page OK"],
          ["Resolution", "done", "Spooler + vendor driver; KB-1184 updated"],
        ],
      },
      {
        type: "callout",
        id: "C2-D4-O1-L1-exam",
        callout: {
          kind: "exam",
          title: "Exam lens",
          body: "The BEST ticket update is specific, timestamped, and actionable. ALL CAPS urgency is not a severity field. Closing without a resolution note fails the objective even if the PC works.",
        },
      },
      {
        type: "knowledge-check",
        id: "C2-D4-O1-L1-kc2",
        questionIds: ["C2-D4-O1-SLA-Q001"],
      },
      {
        type: "summary",
        id: "C2-D4-O1-L1-sum",
        bullets: [
          "Tickets need user, asset tag, category, severity, reproduction, notes, and resolution.",
          "Severity is impact × urgency, not who shouted.",
          "SLA measures response and restore; timestamps and 'waiting on' states keep the clock honest.",
          "Write notes for the stranger on the next shift.",
        ],
      },
    ],
  },
  {
    id: "C2-D4-O1-L2",
    objectiveId: "C2-D4-O1",
    slug: "cmdb-sop-people",
    title: "CMDB, SOP, and the people lifecycle",
    description:
      "Tie asset tags to a CMDB, follow an SOP, and run onboarding and offboarding as documented work.",
    estimatedMinutes: 20,
    conceptIds: ["C2-D4-O1-CMDB", "C2-D4-O1-SOP"],
    prerequisites: ["C2-D4-O1-L1"],
    lastVerified: "2026-09-01",
    sources: ["c2-obj-3.0"],
    blocks: [
      {
        type: "callout",
        id: "C2-D4-O1-L2-why",
        callout: {
          kind: "why",
          title: "Why this matters",
          body: "If the laptop is not in the CMDB, you cannot find the warranty, the BitLocker recovery key, or the person who still has the badge. Inventory is how support scales past one closet.",
        },
      },
      {
        type: "reading",
        id: "C2-D4-O1-L2-r1",
        title: "Assets, tags, procurement, and the CMDB",
        markdown: `An **inventory list** is a spreadsheet of devices. A **configuration management database (CMDB)** is that list plus **relationships**: this laptop is assigned to this user, sits on this VLAN, runs this image, is covered by this warranty, and depends on this access point. **Asset tags and IDs** (barcode, RFID, engraved) are how a technician in a warehouse maps a physical object to that record in thirty seconds.

**Procurement life cycle**: request, approve, purchase, receive, tag, image, assign, support, refresh, dispose (with 2.9 destruction). **Warranty and licensing** live on the asset record so you do not pay twice for the same accidental-damage policy or install a second Office license because nobody looked. **Assigned users** must change when the laptop is reissued — that is offboarding as much as it is politeness.

If a ticket arrives for "the accounting laptop" and three CMDB records match, you do not guess. You ask for the asset tag. If the tag is missing, you still record serial and user, then print a new tag. Ghost assets (in the CMDB, not on Earth) and rogue assets (on Earth, not in the CMDB) both break incident work.

The CMDB is also how you find the **BitLocker recovery key**, the warranty end date, and which image the device should be running. A "quick reimage" of the wrong CI is how you wipe the CFO's laptop because two Dells sat on the same desk. Scan the tag, then open the record, then touch the machine. That order is slower by twenty seconds and cheaper than a restore from last night's backup — if last night's backup was even assigned to this serial.`,
      },
      {
        type: "table",
        id: "C2-D4-O1-L2-t1",
        title: "Document types on the exam",
        headers: ["Document", "Job it does", "Failure mode"],
        rows: [
          ["Incident report", "Timeline and impact of a major event", "Written from memory a week later with no ticket IDs"],
          ["Standard operating procedure (SOP)", "Repeatable how-to, including custom software installs", "Tribal knowledge in one technician's head"],
          ["New-user / onboarding checklist", "Account, MFA, laptop, licenses, access", "Mailbox created, laptop never tagged"],
          ["User off-boarding checklist", "Disable account, retrieve asset, revoke tokens, wipe", "Mailbox disabled, laptop still on the guest Wi-Fi a year later"],
          ["Knowledge base article", "Searchable resolution", "Closed tickets with 'fixed it' and no article"],
        ],
      },
      {
        type: "knowledge-check",
        id: "C2-D4-O1-L2-kc1",
        questionIds: ["C2-D4-O1-CMDB-Q001"],
      },
      {
        type: "reading",
        id: "C2-D4-O1-L2-r2",
        title: "SOP, onboarding, and offboarding",
        markdown: `A **standard operating procedure (SOP)** is the approved way to do a repeatable task: image a laptop, install the custom line-of-business package, run a privileged-access request. SOPs exist so two technicians produce the same result and so auditors can see that you did. If the SOP is wrong, you change it through **change management** (4.2) — you do not silently improvise on production and leave the next hire to guess.

**Onboarding** is a checklist, not a vibe: identity in the directory, groups, MFA, laptop from the CMDB, licensed software, VPN, mailbox, and a documented owner. **Offboarding** reverses it on the last day (or immediately if the separation is unfriendly): disable or convert the account per HR, revoke tokens and MFA, retrieve the asset, wipe or reimage, remove from CMDB assignment, collect badges, and confirm mailbox retention per 4.6. Skipping offboarding is how former contractors still reach the VPN.

Licensing belongs here because the onboarding checklist is where you consume a seat, and offboarding is where you reclaim it. Warranty belongs here because a broken laptop without a tag is a delay, not a mystery.`,
      },
      {
        type: "callout",
        id: "C2-D4-O1-L2-mistake",
        callout: {
          kind: "mistake",
          title: "Common mistake",
          body: "Treating the CMDB as optional documentation you will 'update later.' Later is the outage where nobody knows which switch the warehouse AP uplinks to.",
        },
      },
      {
        type: "knowledge-check",
        id: "C2-D4-O1-L2-kc2",
        questionIds: ["C2-D4-O1-SOP-Q001"],
      },
      {
        type: "checkpoint",
        id: "C2-D4-O1-L2-cp",
        questionIds: [
          "C2-D4-O1-TICKET-Q002",
          "C2-D4-O1-TICKET-Q004",
          "C2-D4-O1-SLA-Q002",
          "C2-D4-O1-CMDB-Q002",
          "C2-D4-O1-CMDB-Q004",
          "C2-D4-O1-SOP-Q002",
          "C2-D4-O1-SOP-Q004",
        ],
      },
      {
        type: "summary",
        id: "C2-D4-O1-L2-sum",
        bullets: [
          "CMDB = inventory + relationships + assigned user + warranty + license.",
          "Asset tags map the physical object to the record.",
          "SOPs make repeatable work consistent; they change through change control.",
          "Onboarding consumes accounts and licenses; offboarding revokes and retrieves.",
        ],
      },
    ],
  },
  {
    id: "C2-D4-O2-L1",
    objectiveId: "C2-D4-O2",
    slug: "change-standard-normal-emergency",
    title: "Standard, normal, and emergency change",
    description:
      "Walk a change through purpose, risk, CAB, freeze windows, and a rollback that is more than 'undo it.'",
    estimatedMinutes: 22,
    conceptIds: ["C2-D4-O2-CAB", "C2-D4-O2-ROLLBACK", "C2-D4-O2-FREEZE", "C2-D4-O2-EMERGENCY"],
    prerequisites: ["C2-D4-O1-L2"],
    lastVerified: "2026-09-01",
    sources: ["c2-obj-3.0"],
    blocks: [
      {
        type: "callout",
        id: "C2-D4-O2-L1-why",
        callout: {
          kind: "why",
          title: "Why this matters",
          body: "Most production outages are changes that skipped a rollback plan. Change management is how you make Friday's firewall rule boring.",
        },
      },
      {
        type: "reading",
        id: "C2-D4-O2-L1-r1",
        title: "Three kinds of change",
        markdown: `**Change management** is the documented path from "we should do this" to "we did this, it worked, or we rolled it back." CompTIA expects you to distinguish:

- **Standard change**: pre-approved, low risk, well-known procedure — adding a RAM stick to a tested laptop model, creating a mailbox from the SOP, a routine monthly patch batch that already ran in the sandbox. You still **document** it; you do not invent a new CAB meeting for every mouse swap.
- **Normal change**: not pre-approved. It needs a **request**, **purpose**, **scope**, **risk analysis** (who breaks, how badly), **impact**, a **maintenance window**, **change board / CAB** approval, **peer review**, **implementation**, and **end-user acceptance**.
- **Emergency change**: the warehouse is down *now*. You may use an emergency CAB or a duty manager, implement with the best rollback you can, and **document after** — you do not skip documentation because you were in a hurry. Emergency is for outages and active exploits, not for "the VP wants a feature this afternoon."

Every non-trivial change names **owners**, takes a **backup** or snapshot, and prefers a **sandbox** first. If you cannot name the rollback, you do not have a change; you have a hope.

Write the request so a stranger on the CAB can vote. "Make VLAN" is not a request. "Add VLAN 40 for VoIP handsets on wiring closet 2, no user data plane change, rollback is delete VLAN 40 and restore the switch startup-config taken at 18:00, window Saturday 22:00–23:00, risk low-medium because a wrong ACL could also drop monitoring" is a request. The extra sentences are the job. Emergency changes still get those sentences — they just get them after the warehouse is scanning again.`,
      },
      {
        type: "table",
        id: "C2-D4-O2-L1-t1",
        title: "Change types at a glance",
        headers: ["Type", "Approval", "Example", "Rollback expectation"],
        rows: [
          ["Standard", "Pre-approved SOP", "Replace a failed disk in a known model; follow the image SOP", "SOP already includes the reverse"],
          ["Normal", "CAB / change board before implementation", "New VLAN for VoIP, firewall rule, ERP plugin", "Written, tested if possible, backup taken"],
          ["Emergency", "Emergency CAB or designated approver; paperwork catches up", "Zero-day block, restore a failed mail database at 2 a.m.", "Best available; still recorded"],
        ],
      },
      {
        type: "knowledge-check",
        id: "C2-D4-O2-L1-kc1",
        questionIds: ["C2-D4-O2-EMERGENCY-Q001"],
      },
      {
        type: "reading",
        id: "C2-D4-O2-L1-r2",
        title: "Windows, freezes, CAB, and rollback",
        markdown: `A **maintenance window** is when impact is allowed. A **change freeze** (end of quarter, holiday peak, payroll week) is when even good ideas wait unless they are emergency. Implementing a "quick" switch IOS upgrade during a freeze because you are bored is how you become the incident report.

The **change advisory board (CAB)** is the people who can see blast radius you cannot: finance, security, application owners. Bring them **risk level**, affected configuration items from the CMDB, communication plan, and rollback. **Peer review** catches the ACL that also blocks the monitoring subnet. **End-user acceptance** is the warehouse lead printing a label after you "fixed" printing — not you declaring victory from the wiring closet.

**Rollback** is a procedure: revert the firewall rule, restore the VM snapshot, boot the previous image, re-enable the old SSID. "We'll figure it out" is not rollback. Take the backup **before** the change. If the change is a standard RAM upgrade, rollback is reseat the old DIMM. If the change is a schema edit, rollback had better have been tested in the sandbox.`,
      },
      {
        type: "callout",
        id: "C2-D4-O2-L1-exam",
        callout: {
          kind: "exam",
          title: "Exam lens",
          body: "A failed production change: implement the rollback plan FIRST, then hold the post-change review. Do not start a second unapproved change to 'fix the fix' during a freeze unless it is a true emergency.",
        },
      },
      {
        type: "callout",
        id: "C2-D4-O2-L1-mistake",
        callout: {
          kind: "mistake",
          title: "Common mistake",
          body: "Calling everything an emergency so it skips CAB. That trains the organization to have no memory, and it is how standard work becomes cowboy work.",
        },
      },
      {
        type: "knowledge-check",
        id: "C2-D4-O2-L1-kc2",
        questionIds: ["C2-D4-O2-ROLLBACK-Q001"],
      },
      {
        type: "lab",
        id: "C2-D4-O2-L1-lab",
        labId: "C2-D4-O2-CHANGE-LAB",
        title: "Change management pipeline",
        prompt:
          "Freeze week is active. Classify each request as standard, normal, or emergency, then attach a written rollback — not 'we'll figure it out.' VoIP VLAN waits; ransomware block does not.",
      },
      {
        type: "checkpoint",
        id: "C2-D4-O2-L1-cp",
        questionIds: [
          "C2-D4-O2-CAB-Q001",
          "C2-D4-O2-CAB-Q003",
          "C2-D4-O2-ROLLBACK-Q002",
          "C2-D4-O2-FREEZE-Q001",
          "C2-D4-O2-FREEZE-Q003",
          "C2-D4-O2-EMERGENCY-Q002",
          "C2-D4-O2-EMERGENCY-Q004",
        ],
      },
      {
        type: "summary",
        id: "C2-D4-O2-L1-sum",
        bullets: [
          "Standard = pre-approved low risk; normal = CAB first; emergency = outage, document after.",
          "Purpose, scope, risk, impact, owners, sandbox, backup, rollback, peer review, UAT.",
          "Maintenance windows allow change; freezes block non-emergency change.",
          "Rollback is a written procedure you can actually perform.",
        ],
      },
    ],
  },
  {
    id: "C2-D4-O3-L1",
    objectiveId: "C2-D4-O3",
    slug: "backup-types-restore-math",
    title: "Full, incremental, differential, and synthetic full",
    description:
      "Count the tapes you need on restore day, and stop treating RAID as a backup.",
    estimatedMinutes: 24,
    conceptIds: ["C2-D4-O3-FULL", "C2-D4-O3-INCR", "C2-D4-O3-DIFF"],
    prerequisites: ["C2-D4-O2-L1"],
    lastVerified: "2026-09-01",
    sources: ["c2-obj-3.0"],
    blocks: [
      {
        type: "callout",
        id: "C2-D4-O3-L1-why",
        callout: {
          kind: "why",
          title: "Why this matters",
          body: "Backups are judged on restore day. If you cannot name the chain, you do not have a backup strategy — you have a folder of hope.",
        },
      },
      {
        type: "reading",
        id: "C2-D4-O3-L1-r1",
        title: "Four ways to copy the data",
        markdown: `A **full backup** copies every selected file. Restore is one set. It is the slowest to run and the simplest to restore. You still need it as the base of every other scheme.

An **incremental** backup copies files that changed **since the last backup of any type**. Monday full, Tuesday incremental, Wednesday incremental: Wednesday's incremental is only Wednesday's changes. Restore = **last full + every incremental after it, in order**. Miss one incremental and you have a hole. Incrementals are fast to run and fragile to restore.

A **differential** backup copies files that changed **since the last full**. Monday full, Tuesday differential, Wednesday differential: Wednesday's differential already contains Tuesday. Restore = **last full + the latest differential only**. Differentials grow through the week; restore is simpler than incremental.

A **synthetic full** builds a new full backup from the last full plus subsequent incrementals **without rereading the production disk**. The backup server synthesizes the full in the backup store. Production is spared another full-window hit; restore then looks like a full. You still verify the synthetic, because a corrupt incremental poisons the synthesis.

RAID is **not** a backup. RAID survives a disk failure. It does not survive ransomware, deletion, fire, or "I overwrote the invoice." Backup is a second copy with a restore story.

Say the since-when out loud before you pick tapes. "Since the last job of any type" is incremental. "Since the last full" is differential. Exam items will dress the same week in new company names; the math does not change. If the product's job is labeled differential but the log says it copied only files newer than last night's incremental, believe the log. Restore day is when marketing names stop mattering.`,
      },
      {
        type: "diagram",
        id: "C2-D4-O3-L1-d1",
        component: "BackupChainDiagram",
        title: "Restore chains",
        caption: "Incremental restore walks the whole chain. Differential restore needs the full plus the latest differential. Synthetic full presents as a full.",
        notice:
          "Notice that a failed Tuesday incremental breaks an incremental restore of Wednesday. A failed Tuesday differential does not block Wednesday's differential restore, because Wednesday's differential re-copied Tuesday's changes from source.",
        alt: "Timeline of full, incremental, and differential backups showing which sets are required for a Friday restore.",
      },
      {
        type: "knowledge-check",
        id: "C2-D4-O3-L1-kc1",
        questionIds: ["C2-D4-O3-INCR-Q001"],
      },
      {
        type: "reading",
        id: "C2-D4-O3-L1-r2",
        title: "In-place versus alternate location",
        markdown: `**Recovery** is a choice of destination. **In-place / overwrite** puts files back where they were — right when a user says "I deleted the good copy, put it back." It is also how you destroy a forensic scene and how you overwrite a newer good file with an old one if you are careless.

**Alternate location** restores to another folder, disk, or server. Use it when you are testing, when you are not sure which version is good, when ransomware still sits on the original path, or when the original host is gone. A+ expects you to pick alternate location whenever overwrite is risky.

**Backup testing** is a restore test, not a "the job is green in the console" glance. Frequency of tests should match how painful a surprise would be: a weekly file-restore sample for workstations, a scheduled bare-metal or VM-restore drill for the accounting host. An untested backup is a rumor.`,
      },
      {
        type: "table",
        id: "C2-D4-O3-L1-t1",
        title: "Restore math",
        headers: ["Scheme this week", "To restore Friday's files you need", "Typical tradeoff"],
        rows: [
          ["Daily full", "Friday's full only", "Slow backups, fastest restore"],
          ["Sunday full + daily incremental", "Sunday full + Mon + Tue + Wed + Thu + Fri incrementals", "Fast backups, longest restore chain"],
          ["Sunday full + daily differential", "Sunday full + Friday differential", "Medium backup window, short restore chain"],
          ["Sunday full + incrementals + Wednesday synthetic full", "Wednesday synthetic (or the pieces that built it) + Thu/Fri incrementals", "Shorter restore after midweek synthesis"],
        ],
      },
      {
        type: "callout",
        id: "C2-D4-O3-L1-exam",
        callout: {
          kind: "exam",
          title: "Exam lens",
          body: "The exam will ask which media you load. Incremental = full plus all later incrementals. Differential = full plus newest differential. Do not add extra tapes 'just in case' as the scored answer.",
        },
      },
      {
        type: "knowledge-check",
        id: "C2-D4-O3-L1-kc2",
        questionIds: ["C2-D4-O3-DIFF-Q001"],
      },
      {
        type: "summary",
        id: "C2-D4-O3-L1-sum",
        bullets: [
          "Full: everything; restore one set.",
          "Incremental: since last backup of any type; restore full + all later incrementals.",
          "Differential: since last full; restore full + latest differential.",
          "Synthetic full: assemble a full in the backup store without another production full.",
        ],
      },
    ],
  },
  {
    id: "C2-D4-O3-L2",
    objectiveId: "C2-D4-O3",
    slug: "gfs-321-backup-testing",
    title: "GFS, 3-2-1, and backups that survive the building",
    description:
      "Place copies on two media with one offsite, rotate grandfather-father-son, and actually test a restore.",
    estimatedMinutes: 22,
    conceptIds: ["C2-D4-O3-GFS", "C2-D4-O3-321"],
    prerequisites: ["C2-D4-O3-L1"],
    lastVerified: "2026-09-01",
    sources: ["c2-obj-3.0"],
    blocks: [
      {
        type: "callout",
        id: "C2-D4-O3-L2-why",
        callout: {
          kind: "why",
          title: "Why this matters",
          body: "Ransomware that encrypts the server and the NAS sitting next to it is why 3-2-1 exists. Onsite-only backups are a single story.",
        },
      },
      {
        type: "reading",
        id: "C2-D4-O3-L2-r1",
        title: "Rotation: onsite, offsite, GFS, 3-2-1",
        markdown: `**Onsite** backups restore fast and die with the building (fire, flood, theft, ransomware that crawled the LAN). **Offsite** backups (another building, a cloud vault, a safe-deposit box of encrypted disks) survive the building and restore slower. You want both.

**Grandfather-father-son (GFS)** is a rotation: **sons** are daily (kept a week), **fathers** are weekly (kept a month), **grandfathers** are monthly (kept a year or more). You overwrite the oldest son each day, promote a father each week, promote a grandfather each month. That gives you last night, last week, and last quarter without keeping 365 fulls.

The **3-2-1 backup rule**: **three** copies of the data (production + two backups), on **two** different media types (for example disk and tape, or disk and cloud object storage), with **one** copy offsite. Variants add immutability; A+ wants the 3-2-1 counting itself. A RAID 1 pair plus the same files on a USB disk in the same desk is two copies, one media family, zero offsite — it fails 3-2-1.

Cloud backup can be the offsite copy. It is still a backup only if you control encryption keys, test restores, and know the retention. "The files are in OneDrive" is a sync; ransomware that hits the PC can sync the encrypted files up unless versioning and recycle-bin retention are part of the plan.

Count copies before you argue with a manager. Production on the server, a disk-to-disk job on the NAS in the same rack, and nothing else is two copies, one building, one failure domain. Add a cloud vault or a tape in another site and you finally have a 3-2-1 story. Write the last successful restore test on the CI in the CMDB so 4.1 and 4.3 agree.`,
      },
      {
        type: "lab",
        id: "C2-D4-O3-L2-lab",
        labId: "C2-D4-O3-BACKUP-LAB",
        title: "Backup and restore lab",
        prompt:
          "Pick the restore chain for full/incremental/differential and a GFS calendar. Incremental needs the last full plus every incremental after it. Differential needs the last full plus the latest differential.",
      },
      {
        type: "knowledge-check",
        id: "C2-D4-O3-L2-kc1",
        questionIds: ["C2-D4-O3-GFS-Q001"],
      },
      {
        type: "reading",
        id: "C2-D4-O3-L2-r2",
        title: "Frequency and tests",
        markdown: `**Backup frequency** follows how much data you can afford to lose: recovery point objective in grown-up programs; on A+ it is "the accounting server nightly, the public kiosk weekly, the workstation before a change." Back up **before a change** (4.2) even if the nightly job is green.

**Testing** means restore a random file monthly, a whole VM quarterly, and any backup you have never restored **before** you need it. Test both in-place (lab VM) and alternate-location restores. Document the last successful test on the CMDB configuration item.

If the only copy is a NAS in the same rack as the host, you have an onsite disk-to-disk job, not a strategy. Add offsite. If the only offsite is a tech's backpack USB, you have a chain-of-custody and encryption problem as well as a strategy.`,
      },
      {
        type: "callout",
        id: "C2-D4-O3-L2-tech",
        callout: {
          kind: "technician",
          title: "Technician lens",
          body: "When ransomware hits, the BEST restore target is often an isolated alternate location, from a copy the malware could not reach (offline, immutable, or offsite), after you verify the backup itself is not encrypted.",
        },
      },
      {
        type: "callout",
        id: "C2-D4-O3-L2-mistake",
        callout: {
          kind: "mistake",
          title: "Common mistake",
          body: "Calling a cloud sync folder a 3-2-1 backup because 'the cloud is offsite.' Sync is not versioned backup unless you prove versioning, separate credentials, and a restore test.",
        },
      },
      {
        type: "knowledge-check",
        id: "C2-D4-O3-L2-kc2",
        questionIds: ["C2-D4-O3-321-Q001"],
      },
      {
        type: "checkpoint",
        id: "C2-D4-O3-L2-cp",
        questionIds: [
          "C2-D4-O3-FULL-Q002",
          "C2-D4-O3-INCR-Q002",
          "C2-D4-O3-INCR-Q004",
          "C2-D4-O3-DIFF-Q002",
          "C2-D4-O3-DIFF-Q004",
          "C2-D4-O3-GFS-Q002",
          "C2-D4-O3-321-Q002",
          "C2-D4-O3-321-Q004",
        ],
      },
      {
        type: "summary",
        id: "C2-D4-O3-L2-sum",
        bullets: [
          "GFS: daily sons, weekly fathers, monthly grandfathers.",
          "3-2-1: three copies, two media, one offsite.",
          "Onsite is fast; offsite survives the building.",
          "A backup is only real after a restore test.",
        ],
      },
    ],
  },
  {
    id: "C2-D4-O4-L1",
    objectiveId: "C2-D4-O4",
    slug: "esd-bench-safety",
    title: "ESD, grounding, lifting, and a bench you can open",
    description:
      "Strap, mat, bags, disconnect power, lift with your legs, and pick a fire extinguisher that will not kill the tech.",
    estimatedMinutes: 20,
    conceptIds: ["C2-D4-O4-ESD", "C2-D4-O4-GROUND", "C2-D4-O4-PPE", "C2-D4-O4-LIFT"],
    prerequisites: ["C2-D4-O3-L2"],
    lastVerified: "2026-09-01",
    sources: ["c2-obj-3.0"],
    blocks: [
      {
        type: "callout",
        id: "C2-D4-O4-L1-why",
        callout: {
          kind: "why",
          title: "Why this matters",
          body: "Electrostatic discharge (ESD) you cannot feel can still kill a DIMM. A Class C fire you fight with water can kill you. Safety is the first step of every hardware ticket, including software techs who swap a drive.",
        },
      },
      {
        type: "reading",
        id: "C2-D4-O4-L1-r1",
        title: "ESD is a circuit, not a bracelet fashion",
        markdown: `**Electrostatic discharge (ESD)** is a sudden charge moving through a component. You prevent it by keeping you, the bench, and the part at the **same potential**, preferably earth **ground**.

An **ESD wrist strap** connects you to ground through a resistor (typically 1 MΩ) so you drain slowly. Clip it to the **grounded mat** or a known earth point — not to the chassis of a PSU that is sitting on a wooden table unplugged from the wall, and not to the orange prong you invented. The **ESD mat** grounds the tools and the board. **Antistatic bags** (shielding bags) store parts; a pink bubble bag is a weaker dissipative bag, not a license to throw a GPU in a backpack with keys.

**Component handling**: edges, no pins, no gold fingers, no stacking bare boards. **Cable management** is safety too — a snag on a CPU lever is an expensive lesson. **Disconnect power**: unplug, then hold the case power button for several seconds to drain residual charge. Do not open a PSU or a CRT; both store lethal energy. Laptops: remove the battery if it is designed to come out; if not, disconnect the internal battery connector after the main plug.

Self-grounding (touch the metal chassis) is a weak field improvisation, not a substitute for a strap on a dry winter bench.

Make the bench safe **before** the case screws come out. Strap on, mat down, bag open, power unplugged, residual charge drained. That sequence is the objective. A P1 ticket does not waive physics: the DIMM you kill in a hurry is a second ticket, and the shock from a live PSU is a workers' compensation form. If you cannot find earth ground, you do not invent a clip onto painted metal — you move the job to a real bench.`,
      },
      {
        type: "video",
        id: "C2-D4-O4-L1-see1",
        assetId: "esd-strap",
        title: "SEE: strap on unpainted chassis metal",
        caption: "Painted metal is not a ground.",
        transcript:
          "An ESD wrist strap connects you to ground through a resistor. Clip it to unpainted chassis metal or a grounded mat. Painted metal is not a ground.",
      },
      {
        type: "table",
        id: "C2-D4-O4-L1-t1",
        title: "Bench safety map",
        headers: ["Hazard", "Control", "Wrong move"],
        rows: [
          ["ESD to RAM/motherboard", "Strap + mat + bag + humidity not desert-dry", "Work on carpet in a fleece, parts on the table"],
          ["Electric shock", "Unplug; drain residual; don't open PSU", "Service a PSU 'because it hummed'"],
          ["Toner / dust inhalation", "Air-filter mask, outdoor or ventilated blow-out", "Household vacuum on a laser printer"],
          ["Battery puncture", "Goggles, vendor process, no metal tools across terminals", "Pry a swollen pack with a screwdriver toward your face"],
          ["Heavy tower / printer", "Lift with legs, two people, no twist", "Bend at the waist because it is 'just a PC'"],
          ["Electrical fire", "CO2 or dry chemical (Class C); disconnect power", "Water on a live PDU"],
        ],
      },
      {
        type: "knowledge-check",
        id: "C2-D4-O4-L1-kc1",
        questionIds: ["C2-D4-O4-ESD-Q001"],
      },
      {
        type: "reading",
        id: "C2-D4-O4-L1-r2",
        title: "PPE, fire, lifting, regulations",
        markdown: `**Personal protective equipment (PPE)** on this exam: **safety goggles** when batteries, springs, or compressed air can throw debris; **air-filter mask** when blowing dust or working around toner. Gloves when chemicals or sharp chassis edges require them. Tie back hair and skip dangling jewelry around fans.

**Lifting**: plan the path, get a second person for servers and copiers, lift with legs, keep the load close, do not twist. A 25 kg laser printer is how technicians blow a disk (the spinal kind).

**Fire**: electrical fires are **Class C** in US labeling. Water conducts. Know where the extinguisher is before the smell of toast. **Regulations** (OSHA in the US, local equivalents elsewhere, and the employer's written safety program) are not optional flavor text — they are why the strap and the goggles are in the ticket template.

Make the bench safe **before** you open the case. That order is the whole objective.`,
      },
      {
        type: "callout",
        id: "C2-D4-O4-L1-safety",
        callout: {
          kind: "safety",
          title: "Safety",
          body: "Never defeat a ground pin to 'stop the tingle.' The tingle means the chassis is not at earth. Fix the outlet or the PSU; do not remove the third prong.",
        },
      },
      {
        type: "knowledge-check",
        id: "C2-D4-O4-L1-kc2",
        questionIds: ["C2-D4-O4-PPE-Q001"],
      },
      {
        type: "checkpoint",
        id: "C2-D4-O4-L1-cp",
        questionIds: [
          "C2-D4-O4-ESD-Q002",
          "C2-D4-O4-ESD-Q004",
          "C2-D4-O4-GROUND-Q001",
          "C2-D4-O4-GROUND-Q003",
          "C2-D4-O4-PPE-Q002",
          "C2-D4-O4-LIFT-Q001",
          "C2-D4-O4-LIFT-Q003",
        ],
      },
      {
        type: "lab",
        id: "C2-D4-O4-L1-lab",
        labId: "C2-D4-O4-SAFETY-LAB",
        title: "Safety procedures matching lab",
        prompt:
          "Match ESD, disconnect-power, PPE, and team-lift tickets. Leave open-PSU and Class-A-on-electrical unmatched.",
      },
      {
        type: "summary",
        id: "C2-D4-O4-L1-sum",
        bullets: [
          "ESD strap and mat keep you, the bench, and the part at the same grounded potential.",
          "Parts travel in antistatic bags; unplug and drain before you open a case.",
          "Do not service the inside of a PSU. Class C extinguisher for electrical fire.",
          "Lift with legs and help; goggles and masks are PPE, not optional theater.",
        ],
      },
    ],
  },
  {
    id: "C2-D4-O5-L1",
    objectiveId: "C2-D4-O5",
    slug: "environment-ups-msds",
    title: "Power, climate, and the safety data sheet",
    description:
      "Tell a brownout from a blackout, size a UPS versus a surge suppressor, and dispose of batteries and toner as the SDS says.",
    estimatedMinutes: 20,
    conceptIds: ["C2-D4-O5-MSDS", "C2-D4-O5-UPS", "C2-D4-O5-BROWNOUT", "C2-D4-O5-HUMIDITY"],
    prerequisites: ["C2-D4-O4-L1"],
    lastVerified: "2026-09-01",
    sources: ["c2-obj-3.0"],
    blocks: [
      {
        type: "callout",
        id: "C2-D4-O5-L1-why",
        callout: {
          kind: "why",
          title: "Why this matters",
          body: "A closet at 40 °C with a surge strip daisy-chained under a dripping HVAC line is an incident you scheduled. Environment and power are operational procedures, not janitorial trivia.",
        },
      },
      {
        type: "reading",
        id: "C2-D4-O5-L1-r1",
        title: "SDS, disposal, dust, and climate",
        markdown: `A **Safety Data Sheet (SDS)**, still called **MSDS** in older materials, is the manufacturer's document for a chemical: toner, isopropyl, battery electrolyte, freeze spray. It tells you hazards, PPE, first aid, and disposal. You do not invent a toner cleanup procedure when the SDS says do not use a household vacuum (fine particles, static, airborne toner).

**Battery disposal** is recycling, not the municipal trash — lithium packs fire in trucks. **Toner** goes back through the vendor or a hazardous-waste stream. **Asset disposal** of electronics follows 2.9 (wipe/destroy) plus environmental rules; they are the same job on the last day of the procurement life cycle.

**Temperature, humidity, ventilation, placement**: electronics want cool, dry-enough, moving air. Too hot: thermal shutdowns and short life. **Humidity** too low: ESD city. Humidity too high: corrosion and condensation. Do not park servers against a cold exterior wall that sweats. Do not block intake fans with cardboard "to make it quieter."

**Dust**: compressed air **upright** (so you do not spray liquid propellant), outdoors or with a filter, not into another PC's intake. A vacuum used in IT spaces should be ESD-safe and HEPA-minded; a household vacuum on toner is the wrong tool.

Walk the closet like an auditor: intake clear, UPS breathing, no cardboard on fans, no dripping HVAC, no lithium packs in the trash, SDS binder or link actually reachable. A 40 °C closet with a daisy-chained surge strip is not "a bit warm"; it is an incident you scheduled. Temperature and humidity loggers are cheap compared with a RAID of thermally throttled disks that also fail the next brownout.`,
      },
      {
        type: "video",
        id: "C2-D4-O5-L1-see1",
        assetId: "ups-brick",
        title: "SEE: PC into UPS into wall",
        caption: "LED overlay: on battery. A surge strip is not a UPS.",
        transcript:
          "The PC plugs into the UPS. The UPS plugs into the wall. On a blackout the LED shows on battery so you can shut down cleanly. A surge strip does nothing for a brownout.",
      },
      {
        type: "table",
        id: "C2-D4-O5-L1-t1",
        title: "Power events and what actually helps",
        headers: ["Event", "What it is", "Protection"],
        rows: [
          ["Surge / spike", "Voltage far above nominal for a moment", "Surge suppressor (sacrificial); UPS with surge protection"],
          ["Brownout / sag", "Voltage too low for a stretch", "UPS (battery takes over); surge strip does nothing for sags"],
          ["Blackout", "Power gone", "UPS for graceful shutdown; generator if you must stay up"],
          ["Noise / dirty power", "Line noise, switching crud", "Better UPS topology / power conditioning, not a $8 power strip"],
        ],
        caption: "A surge suppressor is not a UPS. A UPS is not a generator.",
      },
      {
        type: "knowledge-check",
        id: "C2-D4-O5-L1-kc1",
        questionIds: ["C2-D4-O5-UPS-Q001"],
      },
      {
        type: "reading",
        id: "C2-D4-O5-L1-r2",
        title: "UPS versus surge suppressor",
        markdown: `An **uninterruptible power supply (UPS)** sits between wall and load, with a battery that takes over when the line sags or dies. Use it on hosts that must shut down cleanly (hypervisors, the firewall, the PBX) and on the technician's recording workstation if a blackout would lose work. Size it for the **load and the minutes** you need, plus the network card that sends the shutdown command.

A **surge suppressor** clamps spikes and then, if it is honest, wears out. It will not run the PC during a blackout and it will not fix a brownout. Daisy-chaining strips, or plugging a UPS into a surge strip (or another UPS), is how you create a fire investigation. Wall outlet → UPS → PC. That's the chain.

Place the UPS where it can breathe, replace batteries on the vendor's calendar (they are 4.4/4.5 chemical waste when spent), and test the fail-over on a schedule. A UPS with a dead battery is a heavy surge strip that lies on the front panel.`,
      },
      {
        type: "callout",
        id: "C2-D4-O5-L1-exam",
        callout: {
          kind: "exam",
          title: "Exam lens",
          body: "Lights dim when the elevator starts and PCs reboot: brownout — UPS, not a new surge strip. Printer toner on the carpet: SDS + proper vacuum/vendor kit, not a shop-vac from the garage.",
        },
      },
      {
        type: "knowledge-check",
        id: "C2-D4-O5-L1-kc2",
        questionIds: ["C2-D4-O5-BROWNOUT-Q001"],
      },
      {
        type: "checkpoint",
        id: "C2-D4-O5-L1-cp",
        questionIds: [
          "C2-D4-O5-MSDS-Q001",
          "C2-D4-O5-MSDS-Q003",
          "C2-D4-O5-UPS-Q002",
          "C2-D4-O5-UPS-Q004",
          "C2-D4-O5-BROWNOUT-Q002",
          "C2-D4-O5-HUMIDITY-Q001",
          "C2-D4-O5-HUMIDITY-Q003",
        ],
      },
      {
        type: "lab",
        id: "C2-D4-O5-L1-lab",
        labId: "C2-D4-O5-ENV-LAB",
        title: "Environmental and power controls matching lab",
        prompt:
          "Match UPS, surge suppressor, SDS disposal, and humidity/ESD tickets. Leave daisy-chain and water-on-lithium unmatched.",
      },
      {
        type: "summary",
        id: "C2-D4-O5-L1-sum",
        bullets: [
          "SDS/MSDS dictates chemical PPE and disposal — toner and lithium are not office trash.",
          "Heat, low humidity (ESD), high humidity (corrosion), dust, and blocked vents are environmental tickets.",
          "Surge suppressor ≠ UPS. Brownout and blackout need a battery.",
          "Do not daisy-chain power strips and UPS units.",
        ],
      },
    ],
  },
  {
    id: "C2-D4-O6-L1",
    objectiveId: "C2-D4-O6",
    slug: "privacy-coc-volatility",
    title: "PII, licenses, chain of custody, and order of volatility",
    description:
      "Preserve RAM before disk, seal evidence, and keep customer data and licenses inside policy.",
    estimatedMinutes: 22,
    conceptIds: ["C2-D4-O6-COC", "C2-D4-O6-VOLATILITY", "C2-D4-O6-PII", "C2-D4-O6-EULA", "C2-D4-O6-AUP"],
    prerequisites: ["C2-D4-O5-L1"],
    lastVerified: "2026-09-01",
    sources: ["c2-obj-3.0", "cisa-phishing"],
    blocks: [
      {
        type: "callout",
        id: "C2-D4-O6-L1-why",
        callout: {
          kind: "why",
          title: "Why this matters",
          body: "If you power off a compromised PC to 'keep it safe,' you may have just deleted the only copy of the ransomware keys that lived in RAM. Incident handling is ordered on purpose.",
        },
      },
      {
        type: "reading",
        id: "C2-D4-O6-L1-r1",
        title: "Chain of custody and order of volatility",
        markdown: `When you suspect a crime, prohibited content, or a serious intrusion, you are no longer "fixing a PC." You **preserve evidence**, notify **management** (and **law enforcement** when policy says so), and stop being curious.

**Chain of custody (CoC)** is the written story of the evidence: who collected it, when, where it was, who touched it, and why. Use sealed bags, asset tags, signatures, and a copy of the drive rather than the original when policy calls for a **forensic image**. If the bag is open on your desk next to a sandwich, the chain is comedy.

**Order of volatility** (from RFC 3227 thinking, at A+ depth): collect the most perishable first.

1. CPU registers and cache  
2. Routing tables, ARP, process lists, kernel stats, **RAM**  
3. Temporary filesystems  
4. Disk  
5. Remote logging and monitoring data that may still be rotating  
6. Physical configuration, backups, archives  

Practical A+ translation: a live memory capture and a screenshot of netstat may matter more than yanking the power cord. If policy says "pull the plug on ransomware," follow policy — and still document. Do not browse the suspected prohibited images "to be sure." Escalate.

A **drive copy** (bit-for-bit image) is how you analyze without altering the original. Hash the image. Write the hash on the CoC form.

If policy says pull the plug on ransomware, you still write the time, who pulled it, and what was on the screen. You do not freelance a memory capture that the written plan forbids, and you do not ignore volatility when the plan allows live response. The order exists because RAM forgets. Disk waits. Backups wait longer. Curiosity about the images on the drive is not a step in anyone's order.`,
      },
      {
        type: "table",
        id: "C2-D4-O6-L1-t1",
        title: "Privacy, licenses, and workplace rules",
        headers: ["Thing", "What you do", "What you do not do"],
        rows: [
          ["PII / payment / health / government IDs", "Need-to-know, encrypt, retention schedule", "Paste into a ticket subject, public AI, or a screenshot Slack"],
          ["EULA / DRM / paid license", "Install what the company bought, for the assigned user", "Image one retail key onto the warehouse fleet"],
          ["Open source", "Honor the license (attribution, source, no-warranty)", "Assume 'free' means 'no rules'"],
          ["Perpetual vs subscription vs personal vs corporate", "Match the SKU to the use", "Use a personal Adobe ID as the company standard"],
          ["NDA / MNDA", "Don't discuss the client's data in the rideshare", "Brag about the incident at lunch"],
          ["AUP / splash screen", "Users acknowledged the banner; you enforce it", "Ignore crypto-mining on a lab PC because 'it's after hours'"],
        ],
      },
      {
        type: "knowledge-check",
        id: "C2-D4-O6-L1-kc1",
        questionIds: ["C2-D4-O6-VOLATILITY-Q001"],
      },
      {
        type: "reading",
        id: "C2-D4-O6-L1-r2",
        title: "Licensing, AUP, and confidential materials",
        markdown: `An **End User License Agreement (EULA)** is a contract. **Digital rights management (DRM)** is the technical lock. **Open-source** licenses are still licenses. **Perpetual** is buy-once (still limited by seats); **subscription** dies when you stop paying; **personal** is not **corporate**. Help desk installs corporate SKUs from the volume portal, not a USB of cracked installers and not the tech's personal Microsoft account.

An **acceptable use policy (AUP)** plus a **splash screen / logon banner** tells users the system is monitored and what is forbidden. When you find prohibited content, you stop, preserve, and escalate — you do not become an investigator of the content itself.

Customer materials on a desk, a printer output tray, or an unlocked desktop are **confidential**. Turn the paper over, lock the screen, pull the print job. That is the same professionalism objective as 4.7, enforced as privacy here.`,
      },
      {
        type: "callout",
        id: "C2-D4-O6-L1-exam",
        callout: {
          kind: "exam",
          title: "Exam lens",
          body: "FIRST on suspected illegal content: stop, preserve, notify management. FIRST on a live volatile incident if policy allows: capture RAM and live network state before power-off. Do not 'take a peek' to satisfy curiosity.",
        },
      },
      {
        type: "knowledge-check",
        id: "C2-D4-O6-L1-kc2",
        questionIds: ["C2-D4-O6-COC-Q001"],
      },
      {
        type: "lab",
        id: "C2-D4-O6-L1-lab",
        labId: "C2-D4-O6-PRIVACY-LAB",
        title: "Privacy, licensing, and incident matching lab",
        prompt:
          "Match chain of custody, order of volatility, PII handling, and AUP. Leave reboot-first and PII-to-Slack unmatched.",
      },
      {
        type: "checkpoint",
        id: "C2-D4-O6-L1-cp",
        questionIds: [
          "C2-D4-O6-COC-Q002",
          "C2-D4-O6-VOLATILITY-Q002",
          "C2-D4-O6-VOLATILITY-Q004",
          "C2-D4-O6-PII-Q001",
          "C2-D4-O6-PII-Q003",
          "C2-D4-O6-EULA-Q001",
          "C2-D4-O6-AUP-Q001",
        ],
      },
      {
        type: "summary",
        id: "C2-D4-O6-L1-sum",
        bullets: [
          "Chain of custody: who, when, why, sealed, hashed copies.",
          "Order of volatility: RAM and live state before disk before backups.",
          "PII, payment, health, and government identifiers are need-to-know with retention.",
          "EULA/DRM/open source/AUP/NDA are enforceable, not decorative.",
        ],
      },
    ],
  },
  {
    id: "C2-D4-O7-L1",
    objectiveId: "C2-D4-O7",
    slug: "listen-set-expectations",
    title: "Listen, restate, and set a timeline you can keep",
    description:
      "Pick BEST responses that acknowledge the human, avoid jargon, and do not promise a miracle you cannot schedule.",
    estimatedMinutes: 20,
    conceptIds: ["C2-D4-O7-LISTEN", "C2-D4-O7-DIFFICULT"],
    prerequisites: ["C2-D4-O6-L1"],
    lastVerified: "2026-09-01",
    sources: ["c2-obj-3.0"],
    blocks: [
      {
        type: "callout",
        id: "C2-D4-O7-L1-why",
        callout: {
          kind: "why",
          title: "Why this matters",
          body: "The exam will not score you for being the funniest person in the room. It will score you for the response that de-escalates, informs, and still gets the technical work done.",
        },
      },
      {
        type: "reading",
        id: "C2-D4-O7-L1-r1",
        title: "Professional, not theatrical",
        markdown: `**Professional communication** on A+ is operational: **attire** that matches the site (a warehouse is not a hoodie argument; a bank lobby is not a graphic tee argument), **punctuality**, **language** the customer can use, **listening**, **cultural sensitivity**, and **no distractions** (phone, side chat, talking over the user).

**Listening** is not silence while you type. It is letting the user finish, **restating** the problem ("so invoices from today will not print, and it started after the paper jam"), asking one useful clarifying question, and only then proposing a plan. Jargon is a tool for other technicians. "Your spooler service terminated unexpectedly" is a note. To the user: "The print queue crashed; I'm clearing it and I'll stay until a test label works."

**Set expectations** with a time you can keep: "I can be there in 40 minutes; if I need a part it will be tomorrow morning." Do not say "five minutes" when you mean "after this other P1." If you will miss the window, call before the window expires. That is punctuality.

**Avoid distractions**: headphones off, screen not on social media, do not argue politics, do not mock the user's old software. **Cultural sensitivity** includes names, pronouns the user uses, and not assuming a site's humor. You can be warm without being familiar.

The exam will offer four answers that all sound like something a competent adult might say. One lectures first. One promises a miracle. One abandons the call. The BEST restates the problem, names a next step, and gives a time you can keep. If you would not want that sentence played back to your manager, it is not the scored option.`,
      },
      {
        type: "table",
        id: "C2-D4-O7-L1-t1",
        title: "Believable BEST versus tempting misses",
        headers: ["User says", "BEST shape", "Tempting miss (still 'professional-ish')"],
        rows: [
          ["'My stupid computer deleted everything! NOW.'", "Acknowledge the stress, restate, start backup/recovery check, give a time", "Lecture them about Recycle Bin in the first sentence"],
          ["Vague: 'It's being weird.'", "Ask when it started and what 'weird' looks like, offer two examples", "Demand they use the correct vocabulary before you help"],
          ["Executive in a hallway", "Private space, short status, options with times", "A ten-minute RAID lecture"],
          ["Remote user, bad headset", "Confirm the issue in chat, share the plan in writing", "Talk faster"],
        ],
        caption: "Wrong answers on this exam are often plausible. Pick the one that listens and sets a real expectation.",
      },
      {
        type: "knowledge-check",
        id: "C2-D4-O7-L1-kc1",
        questionIds: ["C2-D4-O7-LISTEN-Q001"],
      },
      {
        type: "reading",
        id: "C2-D4-O7-L1-r2",
        title: "Difficult customers without becoming one",
        markdown: `**Difficult customers** are angry, impatient, nervous, or sure they already know the fix. You do not match volume. You **acknowledge** ("I can see this blocked shipping"), you **do not argue** about whose fault last week's ticket was, you **do not take the insult personally**, and you **do not hang up**. If they swear at you as a person, you can set a boundary: you will continue if we stay on the problem. Then you continue.

Do not overshare ("our vendor is incompetent"). Do not blame the user in the ticket subject. Do not promise a root cause you have not found. Offer **options** when you have them: "loaner laptop this afternoon, or repair tomorrow with your files restored." Options return control; lectures do not.

If the customer is technically expert, do not play dumb and do not play alpha. Meet them at their level, still document, still follow change control. If they demand you skip the backup, you explain the risk and you still take the backup.`,
      },
      {
        type: "callout",
        id: "C2-D4-O7-L1-exam",
        callout: {
          kind: "exam",
          title: "Exam lens",
          body: "BEST is rarely the option that is technically complete but socially contemptuous. It is also rarely the option that only soothes and never starts the work. You need both.",
        },
      },
      {
        type: "knowledge-check",
        id: "C2-D4-O7-L1-kc2",
        questionIds: ["C2-D4-O7-DIFFICULT-Q001"],
      },
      {
        type: "summary",
        id: "C2-D4-O7-L1-sum",
        bullets: [
          "Let them finish, restate, clarify, then plan.",
          "Set a timeline you can keep; call if you will miss it.",
          "Jargon belongs in the ticket, not as a flex.",
          "Difficult calls: acknowledge, don't argue, offer options, keep working.",
        ],
      },
    ],
  },
  {
    id: "C2-D4-O7-L2",
    objectiveId: "C2-D4-O7",
    slug: "confidential-voice-shift",
    title: "Confidential materials and the voice shift",
    description:
      "Handle papers, screens, and overheard conversations like they belong to someone who can fire you — because they do.",
    estimatedMinutes: 18,
    conceptIds: ["C2-D4-O7-CONFIDENTIAL", "C2-D4-O7-LISTEN"],
    prerequisites: ["C2-D4-O7-L1"],
    lastVerified: "2026-09-01",
    sources: ["c2-obj-3.0"],
    blocks: [
      {
        type: "callout",
        id: "C2-D4-O7-L2-why",
        callout: {
          kind: "why",
          title: "Why this matters",
          body: "Leaving a pay-stub printout on a copier is a professionalism miss and a privacy incident at the same time. The exam will offer you a chance to notice.",
        },
      },
      {
        type: "reading",
        id: "C2-D4-O7-L2-r1",
        title: "What you see on the desk is not yours",
        markdown: `**Confidential materials** live on screens, desks, printers, whiteboards, and shared drives. You lock the session when you walk away. You do not read HR folders because they were open. You do not photograph a board of passwords "so I can help later." You pull someone else's tax form off the printer and hand it to them or put it in the confidential bin — you do not post it in the ticket.

On a remote session, you ask before you open documents that are not the ticket. You do not browse the user's mail for fun. You do not mention customer A's outage to customer B. That is NDA as professionalism.

If you must take a device off-site, it is in a bag, it is encrypted, and it is in the chain of custody if it is evidence. Leaving a laptop on a car seat under a jacket is not "operational procedure."

Confidentiality is also what you overhear: salary talk, a medical appointment, a customer name on a speakerphone. You do not put it in the ticket, you do not joke about it at the next cube, and you do not use it later. Printer trays, unlocked desktops, and whiteboards of passwords are the physical version of the same rule. Cover, return, or report — do not harvest. If a user asks you to open a personal tax PDF "while you are in," decline: it is not the ticket, it is their PII, and a company remote session is the wrong place for it.`,
      },
      {
        type: "lab",
        id: "C2-D4-O7-L2-lab",
        labId: "C2-D4-O7-VOICE-LAB",
        title: "Voice help-desk shift",
        prompt:
          "Listen to (or read) the customer calls. Pick the BEST response: acknowledge, restate, set a timeline, and do not argue. Technical truth without empathy still fails this objective.",
      },
      {
        type: "knowledge-check",
        id: "C2-D4-O7-L2-kc1",
        questionIds: ["C2-D4-O7-CONFIDENTIAL-Q001"],
      },
      {
        type: "reading",
        id: "C2-D4-O7-L2-r2",
        title: "Follow-up is part of the conversation",
        markdown: `A professional close is: the user agrees the issue is done, the ticket has the resolution, and you **follow up** if you promised to. If you left them on a workaround, say when you will return. If you borrowed a loaner, say when it comes back.

Document in the ticket, not in a private chat that vanishes. If the user was difficult, describe behaviors ("user raised voice, declined backup, later agreed") not insults ("user is a jerk"). The ticket can be read in a lawsuit. Write like it will be.`,
      },
      {
        type: "callout",
        id: "C2-D4-O7-L2-mistake",
        callout: {
          kind: "mistake",
          title: "Common mistake",
          body: "Picking the answer that is technically perfect and socially contemptuous, or the answer that only apologizes and never starts the repair. The scored BEST does both.",
        },
      },
      {
        type: "knowledge-check",
        id: "C2-D4-O7-L2-kc2",
        questionIds: ["C2-D4-O7-CONFIDENTIAL-Q002"],
      },
      {
        type: "checkpoint",
        id: "C2-D4-O7-L2-cp",
        questionIds: [
          "C2-D4-O7-LISTEN-Q002",
          "C2-D4-O7-LISTEN-Q004",
          "C2-D4-O7-LISTEN-Q006",
          "C2-D4-O7-DIFFICULT-Q002",
          "C2-D4-O7-DIFFICULT-Q004",
          "C2-D4-O7-DIFFICULT-Q006",
          "C2-D4-O7-CONFIDENTIAL-Q003",
          "C2-D4-O7-CONFIDENTIAL-Q005",
        ],
      },
      {
        type: "summary",
        id: "C2-D4-O7-L2-sum",
        bullets: [
          "Screens, printers, and desks hold other people's data — treat them as such.",
          "Remote sessions: open only what the ticket needs.",
          "Follow up when you promised; write tickets as if they will be read aloud.",
          "Voice lab: BEST is acknowledge + plan, not a cartoon 'sorry' and not a scold.",
        ],
      },
    ],
  },
  {
    id: "C2-D4-O8-L1",
    objectiveId: "C2-D4-O8",
    slug: "script-types-and-risks",
    title: "Script types, use cases, and why you do not just run it",
    description:
      "Recognize .bat, .ps1, .vbs, .sh, .js, and .py — and the malware, drift, and exhaustion they can cause. This course never executes your code.",
    estimatedMinutes: 22,
    conceptIds: ["C2-D4-O8-PS1", "C2-D4-O8-BAT", "C2-D4-O8-PY", "C2-D4-O8-SCRIPTRISK"],
    prerequisites: ["C2-D4-O7-L2"],
    lastVerified: "2026-09-01",
    sources: ["c2-obj-3.0", "ms-windows", "debian-ref"],
    blocks: [
      {
        type: "callout",
        id: "C2-D4-O8-L1-why",
        callout: {
          kind: "why",
          title: "Why this matters",
          body: "A script is a fast way to map a drive for 200 users and a fast way to encrypt 200 users. A+ asks you to know which file you are holding and what it can break.",
        },
      },
      {
        type: "reading",
        id: "C2-D4-O8-L1-r1",
        title: "Six extensions, six runtimes",
        markdown: `CompTIA lists these **script file types**:

- **.bat** — Windows **batch** file, run by \`cmd.exe\`. Old logon scripts, simple copy/map/restart. Limited, still everywhere.
- **.ps1** — **PowerShell**. The Windows admin language: AD, services, CIM, remoting. Execution policy exists because \`.ps1\` is powerful.
- **.vbs** — **VBScript**, usually \`wscript.exe\` / \`cscript.exe\`. Legacy logon and installer custom actions. Still used; also still a malware favorite.
- **.sh** — Unix **shell** (bash/sh) on Linux and macOS. \`chmod +x\`, shebang line, cron.
- **.js** — **JavaScript**. In browsers it is a web page; via Node or Windows Script Host it is a local program. Context matters.
- **.py** — **Python**. Cross-platform automation, inventory, APIs. Requires an interpreter.

**Use cases**: restart a service on a schedule, map drives, install a package, kick a backup, inventory hardware, patch, create users. That is the help-desk side. You read a script before you deploy it. You test it on one PC. You put it in change management if it touches more than your lab.

This academy **does not execute learner-supplied code**. Not in the browser lab, not on a server. You will look at examples and predicted results. That is deliberate. A course that runs arbitrary \`.ps1\` from the internet is a malware dropper with a quiz at the end.

Read the extension, then the runtime, then the privileges. A \`.js\` in a browser tab is a page; the same \`.js\` double-clicked into Windows Script Host is a local program. A \`.sh\` in cron as root is a production change whether or not anyone filed 4.2 paperwork. If you cannot name the interpreter, you are not ready to run the file.`,
      },
      {
        type: "table",
        id: "C2-D4-O8-L1-t1",
        title: "Match the job to the file",
        headers: ["Need", "Likely type", "Risk to name out loud"],
        rows: [
          ["Map a drive at logon on Windows 10", ".bat or .ps1 (GPO logon)", "Wrong share path at 400-user scale"],
          ["Disable a service across a domain", ".ps1 (often WinRM)", "Outage if the filter is * instead of a group"],
          ["Linux nightly backup of /etc", ".sh in cron", "Unquoted variables deleting the wrong tree"],
          ["Parse a CSV of asset tags", ".py", "Sending that CSV to a public API"],
          ["Old MSI custom action", ".vbs", "Malware signed as 'update.vbs'"],
          ["Browser automation / webpage logic", ".js", "Running a .js from email in WSH"],
        ],
      },
      {
        type: "knowledge-check",
        id: "C2-D4-O8-L1-kc1",
        questionIds: ["C2-D4-O8-PS1-Q001"],
      },
      {
        type: "reading",
        id: "C2-D4-O8-L1-r2",
        title: "Malware, drift, crashes, exhaustion",
        markdown: `**Risks** CompTIA wants named:

- **Malware**: email \`.js\` / \`.vbs\` / \`.ps1\` as "invoice." PowerShell encoded commands, living-off-the-land. Do not disable execution policy globally to "make the script work."
- **Unexpected settings change / configuration drift**: a one-liner that sets a registry key on every PC, forever. Inventory first; target an OU; have a rollback.
- **Crashes and resource exhaustion**: a loop that never yields, a query that pulls every event from every log, a recursive copy that fills C:. Test with a small set. Watch Task Manager / \`top\`.
- **Unintended execution**: double-click, logon script, scheduled task left behind, \`curl | sh\` from a blog.

Read-only viewing, code review, and running as a least-privilege account in a sandbox are the adult controls. "Just run it as SYSTEM" is how you get a very complete outage.`,
      },
      {
        type: "callout",
        id: "C2-D4-O8-L1-notice",
        callout: {
          kind: "notice",
          title: "This course will not run your script",
          body: "There is no server-side execution of learner code. If a lab shows a script, it is a static example with a predicted result. Paste malware into a text box here and nothing happens — by design.",
        },
      },
      {
        type: "callout",
        id: "C2-D4-O8-L1-exam",
        callout: {
          kind: "exam",
          title: "Exam lens",
          body: "A user forwards update.ps1 from an unknown sender: do not run it. A known .sh in cron that fills the disk: resource exhaustion, fix the script, don't blame ext4.",
        },
      },
      {
        type: "knowledge-check",
        id: "C2-D4-O8-L1-kc2",
        questionIds: ["C2-D4-O8-SCRIPTRISK-Q001"],
      },
      {
        type: "lab",
        id: "C2-D4-O8-L1-lab",
        labId: "C2-D4-O8-SCRIPT-LAB",
        title: "Scripting basics matching lab",
        prompt:
          "Match PowerShell, batch, Python, and script-risk. Leave run-blind and rename-ps1 unmatched.",
      },
      {
        type: "checkpoint",
        id: "C2-D4-O8-L1-cp",
        questionIds: [
          "C2-D4-O8-PS1-Q002",
          "C2-D4-O8-BAT-Q001",
          "C2-D4-O8-BAT-Q003",
          "C2-D4-O8-PY-Q001",
          "C2-D4-O8-PY-Q003",
          "C2-D4-O8-SCRIPTRISK-Q002",
          "C2-D4-O8-SCRIPTRISK-Q004",
        ],
      },
      {
        type: "summary",
        id: "C2-D4-O8-L1-sum",
        bullets: [
          ".bat cmd, .ps1 PowerShell, .vbs WSH, .sh Unix shell, .js JavaScript, .py Python.",
          "Use cases: automate restart, map, install, backup, inventory, update.",
          "Risks: malware, config drift, crashes, resource exhaustion, unintended execution.",
          "Never run untrusted scripts; this academy never executes learner code.",
        ],
      },
    ],
  },
  {
    id: "C2-D4-O9-L1",
    objectiveId: "C2-D4-O9",
    slug: "remote-access-chooser",
    title: "RDP, VPN, VNC, SSH, RMM, SPICE, and WinRM",
    description:
      "Pick a remote method by OS, scale, and whether the session should ever face the internet.",
    estimatedMinutes: 22,
    conceptIds: ["C2-D4-O9-RDP", "C2-D4-O9-VNC", "C2-D4-O9-RMM", "C2-D4-O9-WINRM", "C2-D4-O9-SPICE"],
    prerequisites: ["C2-D4-O8-L1"],
    lastVerified: "2026-09-01",
    sources: ["c2-obj-3.0", "ms-windows"],
    blocks: [
      {
        type: "callout",
        id: "C2-D4-O9-L1-why",
        callout: {
          kind: "why",
          title: "Why this matters",
          body: "Remote Desktop Protocol on port 3389 hanging off a home router is a scanner's favorite. The protocol is fine; the exposure is not.",
        },
      },
      {
        type: "reading",
        id: "C2-D4-O9-L1-r1",
        title: "Methods and the security trade",
        markdown: `**Remote Desktop Protocol (RDP)** is Windows' graphical remote console (typically TCP **3389**). Use **Network Level Authentication**, lock it behind a **VPN** or Remote Desktop Gateway, and do not port-forward 3389 to a workstation. RDP can transfer files and clipboards — disable what policy does not need.

A **virtual private network (VPN)** is the encrypted tunnel *to* the network. After the VPN is up, you RDP, SSH, or use file shares as if local. VPN is not a remote-control tool by itself; it is the road.

**Virtual Network Computing (VNC)** is cross-platform screen share (RFB). Many VNC builds historically had weak authentication and no encryption. If you use VNC, wrap it in SSH or a VPN and a password that is not "vnc."

**Secure Shell (SSH)** (TCP **22**) is the Unix/network-gear remote shell, with optional tunneling and file copy (SFTP/SCP). Prefer keys over passwords. Do not expose root password SSH to the world.

**Windows Remote Management (WinRM)** is the SOAP/WS-Man channel PowerShell remoting uses (HTTP 5985, HTTPS 5986). It is how you run \`Invoke-Command\` on fifty PCs. Authenticate, prefer HTTPS, restrict who can winrm.

**Simple Protocol for Independent Computing Environments (SPICE)** is a KVM/QEMU virtualization console — the hypervisor's "sit at the VM" protocol, not a WAN help-desk tool. You will see it in Linux virtualization labs.

**Remote monitoring and management (RMM)** is an **agent** on the fleet: patch, inventory, unattended remote, scripting, alerts. It is how MSPs work at scale. The security trade is: that agent is a privileged back door — protect the RMM console like a domain admin, MFA everything, and offboard techs.

**Third-party screen share** (Quick Assist, commercial tools) is convenient for attended support, file transfer, and video. Require consent, logging, and a vendor your security team listed. Unattended access without MFA is how a stolen laptop becomes every customer's laptop.`,
      },
      {
        type: "table",
        id: "C2-D4-O9-L1-t1",
        title: "Chooser",
        headers: ["Situation", "Prefer", "Avoid"],
        rows: [
          ["Windows user, attended, on VPN", "RDP or approved screen share", "Naked 3389 on the internet"],
          ["Linux server, command line", "SSH", "Telnet, root+password on 22/tcp public"],
          ["50 Windows PCs, patch and inventory", "RMM or WinRM at scale", "One-off RDP marathons"],
          ["KVM guest console on the hypervisor", "SPICE (or vendor console)", "Installing VNC inside every guest 'because'"],
          ["Cross-platform GUI, user watching", "Vendor screen share over TLS, or VNC over VPN", "Classic unencrypted VNC on 5900/tcp"],
          ["Home user, no VPN concentrator", "Approved attended tool with logging", "DIY RDP port-forward"],
        ],
      },
      {
        type: "knowledge-check",
        id: "C2-D4-O9-L1-kc1",
        questionIds: ["C2-D4-O9-RDP-Q001"],
      },
      {
        type: "reading",
        id: "C2-D4-O9-L1-r2",
        title: "Screen share, file transfer, desktop management",
        markdown: `Attended **screen share** should show a consent prompt. **File transfer** in the same tool is useful and is also an exfil path — log it. **Video** (seeing the user's face or the room) is a privacy issue; default off.

**Desktop management** via RMM includes unattended access, patch rings, and scripts (4.8). That is still change management (4.2) when the script is new. An RMM "quick job" that restarts every server is an unapproved change with a pretty GUI.

If the user is on a hotel network, VPN first, then RDP. If the user cannot install a VPN client, an approved cloud-brokered remote tool that does not require inbound ports is the usual BEST. If a question offers "enable RDP and forward 3389 on the SOHO router," that is the distractor with the stop code waiting in next week's log.`,
      },
      {
        type: "callout",
        id: "C2-D4-O9-L1-exam",
        callout: {
          kind: "exam",
          title: "Exam lens",
          body: "RDP = Windows GUI. SSH = shell. WinRM = Windows automation. VNC = cross-platform GUI with historically weak defaults. SPICE = VM console. RMM = fleet agent. VPN = the tunnel those tools should ride.",
        },
      },
      {
        type: "knowledge-check",
        id: "C2-D4-O9-L1-kc2",
        questionIds: ["C2-D4-O9-RMM-Q001"],
      },
      {
        type: "lab",
        id: "C2-D4-O9-L1-lab",
        labId: "C2-D4-O9-REMOTE-LAB",
        title: "Remote access technologies matching lab",
        prompt:
          "Match RDP, VNC, RMM, and WinRM. Leave SPICE-as-RDP and open-3389 unmatched.",
      },
      {
        type: "checkpoint",
        id: "C2-D4-O9-L1-cp",
        questionIds: [
          "C2-D4-O9-RDP-Q002",
          "C2-D4-O9-RDP-Q004",
          "C2-D4-O9-VNC-Q001",
          "C2-D4-O9-RMM-Q002",
          "C2-D4-O9-WINRM-Q001",
          "C2-D4-O9-WINRM-Q003",
          "C2-D4-O9-SPICE-Q001",
        ],
      },
      {
        type: "summary",
        id: "C2-D4-O9-L1-sum",
        bullets: [
          "RDP 3389: Windows GUI, NLA, never naked on the internet.",
          "VPN is the tunnel; SSH is the Unix shell; WinRM is PowerShell remoting.",
          "VNC needs a wrap; SPICE is a hypervisor console; RMM is the fleet agent.",
          "Attended screen share with logging beats DIY port forwards.",
        ],
      },
    ],
  },
  {
    id: "C2-D4-O10-L1",
    objectiveId: "C2-D4-O10",
    slug: "ai-policy-public-private",
    title: "Public models, private models, and appropriate use",
    description:
      "Keep PII out of public models, use the approved internal tool when it exists, and still verify every command.",
    estimatedMinutes: 22,
    conceptIds: ["C2-D4-O10-AIPOLICY", "C2-D4-O10-PRIVATEAI"],
    prerequisites: ["C2-D4-O9-L1"],
    lastVerified: "2026-09-01",
    sources: ["c2-obj-3.0"],
    blocks: [
      {
        type: "callout",
        id: "C2-D4-O10-L1-why",
        callout: {
          kind: "why",
          title: "Why this matters",
          body: "A+ V15 scores artificial intelligence as objective 4.10. The job is not to train a model. The job is to know when a prompt is a data leak.",
        },
      },
      {
        type: "reading",
        id: "C2-D4-O10-L1-r1",
        title: "Appropriate use is a policy, not a vibe",
        markdown: `**Artificial intelligence (AI)** shows up in help-desk chat, in Office copilots, in vendors' search, and in the browser tab your coworker already opened. **Appropriate-use policy** is the employer's rule set: which tools are approved, which data may go in, whether prompts are logged, and who is accountable for the output.

**Public tools** (consumer chat sites, unapproved extensions) are other companies' computers. Prompts may be retained, used to train, viewed by vendors' staff under their terms, or leaked in a breach. **Private / internal models** (enterprise tenants with a contract, no-training clauses, data residency, SSO) are still not magic — they are a better legal and technical box.

**Data security / source / privacy**: do not paste **personally identifiable information (PII)**, health data, payment data, credentials, customer dumps, or unpublished source into a public model. Do not paste them into a private model either unless the policy says that classification is allowed. "The chatbot asked for the log" is not a classification decision.

**Plagiarism** at work looks like shipping AI text as your RCA without checking facts, or dropping AI-generated code into production as if a human reviewed it. The policy will say you remain the author of record.

Treat every prompt as a data-classification decision. If you would not put the text in an unencrypted ticket subject or a public Slack channel, you do not put it in a public model. Internal tenants with SSO and a no-training clause are the intended box for internal how-tos — and they still hallucinate. The button living inside your console does not change the destination if that feature phones a public vendor.`,
      },
      {
        type: "diagram",
        id: "C2-D4-O10-L1-d1",
        component: "AiPolicyDiagram",
        title: "Five usage patterns",
        caption: "Public + PII is a leak. Unverified commands are a live incident. Hallucinated settings waste hours. Public-doc summaries can be fine. Approved internal models are the intended path — still verify.",
        notice:
          "Notice the internal model is not a free pass. It is the only path that might be allowed for internal data, and the technician still owns accuracy.",
        alt: "Five AI scenarios: PII in a public model, a dangerous command, a hallucinated Windows setting, a public-doc summary, and an approved internal model.",
      },
      {
        type: "knowledge-check",
        id: "C2-D4-O10-L1-kc1",
        questionIds: ["C2-D4-O10-AIPOLICY-Q001"],
      },
      {
        type: "reading",
        id: "C2-D4-O10-L1-r2",
        title: "The five scenarios you will be asked to judge",
        markdown: `Memorize the shape of these five, because the exam will dress them in new stories:

1. **Employee pastes customer PII into a public model** — never appropriate. Stop, report per privacy policy, treat as a possible incident (4.6).
2. **Technician receives an AI-generated command that would delete or destroy** — do not run it. Read it. Compare to vendor docs. Run a safe equivalent in a lab. Treat \`rm -rf\`, \`Remove-Item -Recurse\`, \`diskpart clean\`, and \`mkfs\` as hostile until proven.
3. **Help-desk bot invents a Windows setting that does not exist** — hallucination. Verify on Microsoft Learn, in the actual Settings app, or on a lab PC. Do not send the user a made-up \`gpedit\` path.
4. **Employee uses AI to summarize public documentation** — usually acceptable if the source is public, the summary is checked against the source, and no internal data was uploaded. Still cite the real doc in the ticket.
5. **Approved internal model under organization policy** — this is the intended tool for internal questions. Still no extra PII beyond what policy allows, still verify commands, still do not paste secrets if the tenant is not approved for that classification.

**Application integration** (AI features inside the ticketing app, the IDE, the mail client) follows the same rules: if the feature sends data to a public model, it is a public model even though the button lives in your console.`,
      },
      {
        type: "callout",
        id: "C2-D4-O10-L1-exam",
        callout: {
          kind: "exam",
          title: "Exam lens",
          body: "BEST for a public-chatbot PII paste is stop and follow incident/privacy process — not 'ask the bot to forget.' BEST for a scary command is do not execute; verify. BEST for a useful public-doc summary is allowed-with-verification.",
        },
      },
      {
        type: "knowledge-check",
        id: "C2-D4-O10-L1-kc2",
        questionIds: ["C2-D4-O10-PRIVATEAI-Q001"],
      },
      {
        type: "summary",
        id: "C2-D4-O10-L1-sum",
        bullets: [
          "Appropriate use is written policy: approved tools, allowed data, human accountability.",
          "Public models are other people's computers — no PII, no secrets, no customer dumps.",
          "Private/internal models are for internal work the contract allows — still verify.",
          "Five patterns: PII leak, dangerous command, hallucination, public summary, approved internal use.",
        ],
      },
    ],
  },
  {
    id: "C2-D4-O10-L2",
    objectiveId: "C2-D4-O10",
    slug: "ai-hallucination-bias-verify",
    title: "Hallucinations, bias, and why the technician still verifies",
    description:
      "Treat fluent answers as drafts. Check sources, watch bias, and refuse to be the person who ran the invented command.",
    estimatedMinutes: 20,
    conceptIds: ["C2-D4-O10-HALLUCINATION", "C2-D4-O10-AIPOLICY"],
    prerequisites: ["C2-D4-O10-L1"],
    lastVerified: "2026-09-01",
    sources: ["c2-obj-3.0", "ms-windows"],
    blocks: [
      {
        type: "callout",
        id: "C2-D4-O10-L2-why",
        callout: {
          kind: "why",
          title: "Why this matters",
          body: "A model that sounds sure is still a next-word engine. Hallucination is not a rare bug; it is the default failure mode you must plan for.",
        },
      },
      {
        type: "reading",
        id: "C2-D4-O10-L2-r1",
        title: "Accuracy, hallucination, bias",
        markdown: `**Hallucination** is confident nonsense: a registry path that never existed, a \`netsh\` switch Microsoft never shipped, a citation to a KB article with a plausible number and a fake title. **Accuracy** is your job. Compare to **primary sources** — Microsoft Learn, Apple, man pages, the vendor's current KB — and to a lab PC. If the model cannot show a real URL that matches, you do not run the command.

**Bias** is systematic skew: a model that always recommends reimage, always assumes the user is on Windows, always uses examples from one region, or generates different quality of help based on names and dialect. You counteract it by using the same checklist you would for a junior tech: evidence, vendor docs, the actual error.

**Source verification**: if the answer includes a URL, open it. If it includes a setting name, search the OS. If it includes a PowerShell cmdlet, \`Get-Help\` on a lab box. AI search that cites three blogs and no vendor is a starting point, not a change plan.

Do not let a model write the **incident report** unreviewed. Do not let it invent a **rollback**. Do not let it decide **severity**. Those are 4.1 and 4.2 judgments with names on them.

If a citation looks like a KB number and the URL 404s, the number is fiction. If \`Get-Help\` on a lab box has no such switch, the \`netsh\` line is fiction. If Settings has no "System > Extra > SuperFetchBoost," the help-desk bot invented a control. Your next sentence to the user is the vendor's sentence, or nothing.`,
      },
      {
        type: "table",
        id: "C2-D4-O10-L2-t1",
        title: "Verify or refuse",
        headers: ["AI output", "Your move", "Why"],
        rows: [
          ["'Run Remove-Item -Recurse C:\\Windows\\WinSxS to speed updates'", "Refuse; this is destructive nonsense", "WinSxS is not a junk folder"],
          ["'Enable SuperFetchBoost in Settings > System > Extra'", "Search Settings / Learn; it will not exist", "Hallucinated control"],
          ["Summary of a public RFC or Microsoft page, with the URL", "Open the URL; quote the vendor in the ticket", "Acceptable use of public text"],
          ["Draft email to a user about a password expiry", "Edit; strip any invented policy; no extra PII in the prompt", "You are still the sender"],
          ["Translation of a public error message", "Check the vendor's wording", "Low risk if no tenant data went in"],
        ],
      },
      {
        type: "knowledge-check",
        id: "C2-D4-O10-L2-kc1",
        questionIds: ["C2-D4-O10-HALLUCINATION-Q001"],
      },
      {
        type: "reading",
        id: "C2-D4-O10-L2-r2",
        title: "Integration does not waive verification",
        markdown: `When AI is **integrated** into the ticketing tool, it may draft notes, suggest KB articles, or classify severity. Treat suggestions as **untrusted input**. A mis-classified P1 that the bot marked "how-to" still breaches the SLA (4.1). A suggested command still belongs in a lab first (4.8, 4.9).

If the integrated feature cannot be configured to keep data in the approved tenant, do not enable it on queues that contain PII. That is **private versus public** with a vendor checkbox instead of a website.

Your professional close on an AI-assisted ticket is the same as any other: you read the output, you checked a source, you named the source in the notes, and you did not paste the customer's national ID into a prompt to "make the summary nicer."`,
      },
      {
        type: "callout",
        id: "C2-D4-O10-L2-tech",
        callout: {
          kind: "technician",
          title: "Technician lens",
          body: "If you would not run a command from an anonymous forum without reading it, you do not run it from a chatbot. The grammar is better. The blast radius is the same.",
        },
      },
      {
        type: "knowledge-check",
        id: "C2-D4-O10-L2-kc2",
        questionIds: ["C2-D4-O10-HALLUCINATION-Q002"],
      },
      {
        type: "checkpoint",
        id: "C2-D4-O10-L2-cp",
        questionIds: [
          "C2-D4-O10-AIPOLICY-Q002",
          "C2-D4-O10-AIPOLICY-Q004",
          "C2-D4-O10-PRIVATEAI-Q002",
          "C2-D4-O10-PRIVATEAI-Q004",
          "C2-D4-O10-HALLUCINATION-Q003",
          "C2-D4-O10-HALLUCINATION-Q005",
          "C2-D4-O10-HALLUCINATION-Q007",
          "C2-D4-O10-AIPOLICY-Q006",
        ],
      },
      {
        type: "summary",
        id: "C2-D4-O10-L2-sum",
        bullets: [
          "Hallucination: fluent, cited, wrong — verify on vendor docs and a lab.",
          "Bias: same checklist for every user; do not let the model skip steps.",
          "Integrated AI is still a destination for data — classify before you enable it.",
          "The technician remains accountable for every command and every ticket sentence.",
        ],
      },
    ],
  },
];
