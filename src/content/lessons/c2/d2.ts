import type { Lesson } from "../../schema";

export const C2_D2_LESSONS: Lesson[] = [
  {
    id: "C2-D2-O1-L1",
    objectiveId: "C2-D2-O1",
    slug: "physical-security-controls",
    title: "Physical security: doors, cameras, and people",
    description:
      "Place bollards, vestibules, badges, biometrics, and guards so an attacker cannot walk into the wiring closet.",
    estimatedMinutes: 22,
    conceptIds: ["C2-D2-O1-VESTIBULE"],
    prerequisites: [],
    lastVerified: "2026-09-01",
    sources: ["c2-obj-3.0"],
    blocks: [
      {
        type: "callout",
        id: "C2-D2-O1-L1-why",
        callout: {
          kind: "why",
          title: "Why this matters",
          body: "Logical controls fail if someone can unplug a camera, steal a laptop, or badge-tailgate into the server room. A+ treats physical security as the first layer, not decoration.",
        },
      },
      {
        type: "reading",
        id: "C2-D2-O1-L1-r1",
        title: "Controls you can touch",
        markdown: `Physical security is everything that stops a body, a vehicle, or a pair of hands from reaching an asset. CompTIA A+ V15 lists a specific palette. Learn what each control is for, not a slogan about "defense in depth."

**Bollards** are short posts that stop a vehicle from driving through a glass lobby or a loading dock. They do not stop a pedestrian. If the stem is a ram-raid or a car-as-weapon against a data center entrance, bollards (or planters engineered as bollards) are the answer. A camera records the crash; it does not prevent it.

An **access control vestibule** (still nicknamed a mantrap in older material) is a two-door airlock: the inner door will not open until the outer door is closed and the occupant is authorized. That design defeats **tailgating**, which is following an authorized person through a single door. A vestibule is not a waiting room with a receptionist. A receptionist plus a single card reader is still one door.

**Badge readers**, **key fobs**, **smart cards**, **physical keys**, and **mobile digital keys** all prove "something you have." A badge that only unlocks the lobby is weaker than a badge that also unlocks the wiring closet on a different ACL. Smart cards can carry certificates used for both door and workstation logon. Mobile keys live on a phone; they inherit the phone's lock and MDM (mobile device management) posture.

**Video surveillance** deters and reconstructs. It is not an alarm. **Alarm systems** and **motion sensors** create an event when a door, glass, or volume is violated after hours. **Lighting** removes the shadow an attacker needs and makes cameras useful. **Magnetometers** (walk-through or wand metal detectors) belong at high-security or event perimeters, not at every help-desk closet.

**Door locks** and **equipment locks** (cable locks, rack doors, Kensington-style laptop locks) are different jobs. A locked office with an unlocked docking station still loses the laptop. **Fences** set a legal and physical perimeter. **Security guards** add judgment: they challenge a visitor whose badge does not match a face, and they can stop tailgating that a camera only records.

**Biometrics** are "something you are": fingerprint, palm, retina, facial recognition technology (FRT), and voice. They fail when the reader is dirty, the user has a bandage, or the policy treats a biometric as a secret instead of an identifier that still needs a second factor for high-value systems. On the exam, biometrics are physical or logical depending on whether they open a door or a laptop.`,
      },
      {
        type: "table",
        id: "C2-D2-O1-L1-t1",
        title: "Match the control to the threat",
        headers: ["Control", "Stops or detects", "Does not do"],
        rows: [
          ["Bollard", "Vehicle ramming a facade", "Stop a walker or a badge clone"],
          ["Access control vestibule", "Tailgating through one door", "Encrypt the file server"],
          ["Badge / fob / smart card / mobile key", "Unauthorized people at a reader", "Stop someone using a stolen badge unless a PIN or biometric is required"],
          ["Camera + lighting", "After-the-fact evidence; some deterrence", "Lock the rack"],
          ["Equipment lock", "Grab-and-go laptop or USB console", "Stop a privileged insider with a key"],
          ["Magnetometer", "Concealed metal at a checkpoint", "Inspect a USB drop already inside"],
          ["Guard", "Judgment, challenge, visitor escort", "Scale to every closet at 3 a.m. without cameras and locks"],
        ],
        caption: "Pick the control that matches the attack in the stem, not the most expensive one.",
      },
      {
        type: "knowledge-check",
        id: "C2-D2-O1-L1-kc1",
        questionIds: ["C2-D2-O1-VESTIBULE-Q001"],
      },
      {
        type: "reading",
        id: "C2-D2-O1-L1-r2",
        title: "How technicians actually place these",
        markdown: `A small office still has a perimeter. The reception door gets a badge reader and a camera covering faces, not the keypad codes. The IDF (intermediate distribution frame) closet gets a lock that is not the same master as the janitor's closet, a door contact on the alarm panel, and a camera that sees the door — not the monitor passwords. Laptops in the bullpen get cable locks only if policy says they stay on desks; otherwise they go in lockers.

Visitor flow is a design problem. If contractors can walk from reception to the warehouse without a second reader, you do not have zones. Least privilege applies to doors the same way it applies to file shares: the warehouse badge should not open Finance.

Tailgating drills fail when staff hold the door "to be polite." Training is a control. So is a vestibule when the asset is a clinic, a payment room, or a cage. Dumpster diving is physical too: locked dumpsters and a shred-first policy belong with this objective even though destruction methods are 2.9.

When an exam stem says a thief walked in behind an employee, the missed control is a vestibule, a guard, or a door that does not stay unlocked for the next person — not a new SSID.`,
      },
      {
        type: "callout",
        id: "C2-D2-O1-L1-exam",
        callout: {
          kind: "exam",
          title: "Exam lens",
          body: "CompTIA uses 'access control vestibule,' not 'mantrap,' on V15. If the attack is a vehicle, the answer is bollards. If it is a person following someone in, it is tailgating versus a vestibule.",
        },
      },
      {
        type: "knowledge-check",
        id: "C2-D2-O1-L1-kc2",
        questionIds: ["C2-D2-O1-VESTIBULE-Q002"],
      },
      {
        type: "summary",
        id: "C2-D2-O1-L1-sum",
        bullets: [
          "Bollards stop vehicles; vestibules stop tailgating.",
          "Badges, fobs, smart cards, keys, and mobile keys are possession factors for doors.",
          "Cameras record; alarms and motion sensors interrupt; lighting makes both useful.",
          "Equipment locks and door locks protect different objects.",
          "Biometrics prove identity at a door or a laptop; they are not a password replacement by themselves on high-value systems.",
        ],
      },
    ],
  },
  {
    id: "C2-D2-O1-L2",
    objectiveId: "C2-D2-O1",
    slug: "zero-trust-mfa-saml-pam",
    title: "Zero Trust, MFA, SAML, PAM, and IAM",
    description:
      "Prove identity continuously, federate apps with SAML, and stop standing admin rights with PAM.",
    estimatedMinutes: 24,
    conceptIds: [
      "C2-D2-O1-ZEROTRUST",
      "C2-D2-O1-MFA",
      "C2-D2-O1-SAML",
      "C2-D2-O1-PAM",
      "C2-D2-O1-DLP",
      "C2-D2-O1-IAM",
    ],
    prerequisites: ["C2-D2-O1-L1"],
    lastVerified: "2026-09-01",
    sources: ["c2-obj-3.0", "cisa-phishing"],
    blocks: [
      {
        type: "callout",
        id: "C2-D2-O1-L2-why",
        callout: {
          kind: "why",
          title: "Why this matters",
          body: "A VPN plus a password is not a castle anymore. Zero Trust, multifactor authentication, and privileged access management are how a help-desk tech explains why the CEO still gets prompted and why Domain Admins should not be a daily logon.",
        },
      },
      {
        type: "reading",
        id: "C2-D2-O1-L2-r1",
        title: "Zero Trust and least privilege",
        markdown: `**Zero Trust** is a model, not a product you install from a USB stick. The working slogan is **never trust, always verify**. A request is not trusted because it came from the office VLAN, a corporate laptop, or a user who authenticated an hour ago. Each session is evaluated using identity, device health, and the sensitivity of the resource.

That is different from a flat "inside = trusted" LAN. In the old model, once you were on the VPN you could RDP (Remote Desktop Protocol) to anything that still used the same password. Zero Trust shrinks that assumption: the payroll app still asks who you are, whether the device is enrolled and patched, and whether this is a normal time and place. Microsegmentation and conditional access are how enterprises implement the idea. A+ does not ask you to design a Software-Defined Perimeter. It does ask you to pick Zero Trust when the stem is "users on the LAN should still be authenticated and authorized for each resource."

**Least privilege** is the twin idea for accounts: grant the minimum rights needed for the job, for the minimum time. A help-desk technician who needs to reset passwords should not be a Domain Admin. A kiosk should not run as a local administrator. **Access control lists (ACLs)** are the mechanism: on a file, a folder, a firewall, or a router, an ACL is the ordered list of permit/deny rules. "Everyone: Full Control" is an ACL. It is just a terrible one.

**Identity and access management (IAM)** is the program that answers two questions across many systems: who is this, and what may they do. **Directory services** (Active Directory, cloud directories) store identities, groups, and policies. IAM is bigger than a single directory: it includes joiner/mover/leaver processes, SSO, MFA, and reviews of who still has access.

**Mobile device management (MDM)** enrolls phones and tablets so you can push configuration profiles, require encryption, and wipe a lost device. **Data loss prevention (DLP)** watches sensitive data — payment cards, health records, source code — and blocks or logs it leaving by USB, email, or cloud sync. DLP is not antivirus. Antivirus looks for malware. DLP looks for data that should not travel.`,
      },
      {
        type: "table",
        id: "C2-D2-O1-L2-t1",
        title: "Authentication building blocks",
        headers: ["Idea", "What it is", "A+ trap"],
        rows: [
          ["MFA", "Two or more different factors: know / have / are", "Password + PIN is still one factor (knowledge)"],
          ["TOTP / OTP", "Time-based or one-time codes from an app or token", "SMS OTP is MFA but weaker (SIM swap, phishing)"],
          ["SSO", "One authentication event unlocks many apps", "SSO without MFA multiplies a stolen password"],
          ["SAML", "XML assertions from an identity provider to a service provider", "SAML is federation, not a Wi-Fi cipher"],
          ["PAM / JIT", "Control and time-box privileged roles", "A standing Domain Admin account is the opposite of PAM"],
          ["DLP", "Stop sensitive data leaving approved channels", "DLP does not replace EDR or backups"],
        ],
        caption: "Factors must be different types. Federation is how apps trust an identity provider.",
      },
      {
        type: "knowledge-check",
        id: "C2-D2-O1-L2-kc1",
        questionIds: ["C2-D2-O1-ZEROTRUST-Q001", "C2-D2-O1-MFA-Q001"],
      },
      {
        type: "reading",
        id: "C2-D2-O1-L2-r2",
        title: "MFA, SAML, and PAM in the ticket",
        markdown: `**Multifactor authentication (MFA)** requires at least two of: something you **know** (password, PIN), something you **have** (hardware token, phone authenticator, smart card, badge), something you **are** (biometric). V15 lists email, hardware tokens, authenticator apps, SMS, voice calls, TOTP (time-based one-time password), and OTP. Email and SMS are still "have" in the weak sense that you possess the inbox or the SIM. Phishing-resistant MFA (FIDO2/security keys, some smart cards) is stronger than a code a user can be tricked into reading aloud. On A+, if the stem says "password plus authenticator app," that is MFA. If it says "password plus mother's maiden name," that is two knowledge factors — not MFA.

**Single sign-on (SSO)** means the user authenticates once and receives access to many applications. **Security Assertion Markup Language (SAML)** is a common federation protocol: the **identity provider (IdP)** asserts "this is Alice, in Finance" to a **service provider (SP)** such as a payroll SaaS app. The SP does not store Alice's corporate password. That is the point. You will also hear OAuth and OpenID Connect in the field; A+ names SAML. Do not confuse SAML with Kerberos (a ticket protocol used heavily on Windows domains) or with RADIUS (a AAA service used for VPN and 802.1X).

**Privileged access management (PAM)** and **just-in-time (JIT)** access attack the worst account in the building: the always-on administrator. Instead of logging into Windows every morning as Domain Admin, the technician checks out a privileged role for 30 minutes, completes the change, and the rights expire. PAM vaults also rotate admin passwords and record sessions. If the exam asks how to reduce standing admin rights, PAM/JIT is the named control.

When a user cannot open an app after SSO is enabled, check group membership in the directory, the SAML claim (email versus UPN), MFA enrollment, and whether the device meets the Zero Trust policy — not the Wi-Fi passphrase.`,
      },
      {
        type: "callout",
        id: "C2-D2-O1-L2-mistake",
        callout: {
          kind: "mistake",
          title: "Common mistake",
          body: "SMS codes are MFA, but they are not strong MFA. A stem that mentions SIM swap or a fake MFA prompt is teaching you that phishing can steal the second factor if it is a typed code.",
        },
      },
      {
        type: "callout",
        id: "C2-D2-O1-L2-tech",
        callout: {
          kind: "technician",
          title: "Technician lens",
          body: "You will spend more tickets on 'MFA prompt I did not expect' and 'SSO loop' than on designing Zero Trust. Still know the model so you do not disable MFA to 'fix' a login.",
        },
      },
      {
        type: "knowledge-check",
        id: "C2-D2-O1-L2-kc2",
        questionIds: ["C2-D2-O1-SAML-Q001"],
      },
      {
        type: "checkpoint",
        id: "C2-D2-O1-L2-cp",
        questionIds: [
          "C2-D2-O1-ZEROTRUST-Q003",
          "C2-D2-O1-MFA-Q003",
          "C2-D2-O1-SAML-Q002",
          "C2-D2-O1-PAM-Q002",
          "C2-D2-O1-DLP-Q002",
          "C2-D2-O1-IAM-Q002",
          "C2-D2-O1-VESTIBULE-Q003",
          "C2-D2-O1-MFA-Q004",
        ],
      },
      {
        type: "lab",
        id: "C2-D2-O1-L2-lab",
        labId: "C2-D2-O1-AUTH-LAB",
        title: "Physical and logical controls lab",
        prompt:
          "Match vestibule, bollards, password+TOTP MFA, and PAM/JIT to the four tickets. Leave password+PIN and camera-only unused.",
      },
      {
        type: "summary",
        id: "C2-D2-O1-L2-sum",
        bullets: [
          "Zero Trust: never trust, always verify — location on the LAN is not enough.",
          "MFA needs different factor types; password + PIN is not MFA.",
          "SAML federates an identity provider to apps; that is how SSO is often built.",
          "PAM/JIT removes standing admin rights.",
          "IAM is who you are and what you may do; DLP watches data leaving; MDM governs devices.",
        ],
      },
    ],
  },
  {
    id: "C2-D2-O2-L1",
    objectiveId: "C2-D2-O2",
    slug: "windows-defender-uac-encryption-ad",
    title: "Defender, UAC, BitLocker, EFS, and Active Directory",
    description:
      "Turn on the Windows security stack a technician actually clicks: antivirus, firewall, UAC, encryption, and domain join.",
    estimatedMinutes: 22,
    conceptIds: ["C2-D2-O2-UAC", "C2-D2-O2-EFS", "C2-D2-O2-AD", "C2-D2-O2-HELLO"],
    prerequisites: ["C2-D2-O1-L2"],
    lastVerified: "2026-09-01",
    sources: ["c2-obj-3.0", "ms-windows", "ms-bitlocker"],
    blocks: [
      {
        type: "callout",
        id: "C2-D2-O2-L1-why",
        callout: {
          kind: "why",
          title: "Why this matters",
          body: "A workstation that joined a domain with BitLocker off, UAC on 'never notify,' and Defender disabled is a lab machine pretending to be a business PC.",
        },
      },
      {
        type: "reading",
        id: "C2-D2-O2-L1-r1",
        title: "Accounts, Defender, firewall, and UAC",
        markdown: `Windows still has **local accounts** and **Microsoft accounts** on a home or workgroup PC. A **standard user** can run software and keep documents. An **administrator** can install drivers, change security, and break the box. The **Guest** account is a legacy convenience that should be disabled. **Power Users** is an old group that no longer means what Windows XP implied; do not treat it as a security design.

**Microsoft Defender Antivirus** must be **on** and its **definitions updated**. Turning it off "because it slowed a game" is a finding. **Windows Defender Firewall** is a host firewall: on/off, inbound port rules, and per-application allow/block. Profiles matter — a coffee-shop network should be **Public**, not **Private**, so inbound sharing stays closed.

**User Account Control (UAC)** splits an administrator's day into a standard token and an elevated token. Everyday browsing uses the standard token. Installing software or changing a system setting prompts. **Run as administrator** is the explicit elevation for a process. Disabling UAC or clicking Yes blindly both defeat the control. A technician who needs one elevated command should elevate that command, not live in an elevated prompt all afternoon.

**Windows Hello** and **passwordless** sign-in use a device-bound PIN, fingerprint, or face. The Hello PIN is not a short copy of the Microsoft or domain password; it unlocks keys stored in the TPM (Trusted Platform Module) on that PC. **SSO** on Windows can then carry that authentication into domain resources and cloud apps.

**BitLocker** encrypts the **entire volume** (data at rest). **BitLocker To Go** encrypts removable drives. Recovery keys must be escrowed — in Active Directory, Microsoft account, or a documented paper process — or a motherboard swap becomes a data-loss event. **Encrypting File System (EFS)** encrypts **files or folders** for a specific user certificate on NTFS. EFS is not BitLocker. EFS fails for other users on the same PC (by design) and is a poor substitute for full-disk encryption of a laptop that can be stolen powered off.

**Active Directory (AD)** is the on-premises directory. **Joining a domain** puts the PC under central accounts and **Group Policy**. **Organizational units (OUs)** are folders for objects so you can apply different GPOs (Group Policy Objects). You also assign **logon scripts**, **home folders**, **folder redirection**, and **security groups**. Rights come from groups, not from one-off ACLs on every share. If a user cannot access a folder after a department move, check OU, group membership, and GPO — not NTFS first if they never got the group.`,
      },
      {
        type: "table",
        id: "C2-D2-O2-L1-t1",
        title: "Encryption and identity on Windows",
        headers: ["Feature", "Scope", "When you pick it"],
        rows: [
          ["BitLocker", "Whole volume, TPM-backed on modern PCs", "Laptop or disk that can walk out the door"],
          ["BitLocker To Go", "USB / removable volume", "Finance taking files on a stick"],
          ["EFS", "Per-file/folder, per-user certificate", "Hide a folder from other local users on NTFS — not a stolen-disk control"],
          ["Windows Hello", "Device-bound PIN / biometric", "Passwordless or PIN on a provisioned PC"],
          ["Domain join + GPO", "Central accounts and settings", "Company PC that must receive the same baseline"],
        ],
        caption: "Stolen laptop = BitLocker. 'Other users on this PC should not read my folder' = EFS. Company baseline = AD + GPO.",
      },
      {
        type: "knowledge-check",
        id: "C2-D2-O2-L1-kc1",
        questionIds: ["C2-D2-O2-UAC-Q001"],
      },
      {
        type: "reading",
        id: "C2-D2-O2-L1-r2",
        title: "Firewall rules and the domain versus a local admin",
        markdown: `A firewall that is "on" with an any/any inbound allow is not on. Lock down unused inbound ports. Allow an application only if the vendor and the change process say so. Remote support tools that punch inbound holes need a documented exception, not a forum post.

On a domain-joined PC, the technician's local administrator account is a break-glass tool, not a daily driver. Help-desk work uses a standard account plus elevation or a PAM checkout. Local Users and Groups (lusrmgr.msc) still exists on Pro/Enterprise for workgroup boxes and for local exceptions; on Home it does not.

When Defender definitions are stale, first check Windows Update and the security intelligence update, not a third-party "optimizer" that disabled the service. When BitLocker recovery appears after a firmware change, that is expected: the PCR values changed. Use the recovery key, then reseal. Never store that key in the same bag as the laptop.`,
      },
      {
        type: "callout",
        id: "C2-D2-O2-L1-exam",
        callout: {
          kind: "exam",
          title: "Exam lens",
          body: "BitLocker = volume. EFS = files for one user. UAC = elevation prompt, not a firewall. Guest disabled. Hello PIN is device-local.",
        },
      },
      {
        type: "knowledge-check",
        id: "C2-D2-O2-L1-kc2",
        questionIds: ["C2-D2-O2-EFS-Q001", "C2-D2-O2-AD-Q001"],
      },
      {
        type: "summary",
        id: "C2-D2-O2-L1-sum",
        bullets: [
          "Keep Defender and the host firewall on; update definitions.",
          "UAC and Run as administrator are elevation, not extra passwords.",
          "BitLocker (and To Go) protect disks at rest; EFS protects files for a user.",
          "AD join, OUs, GPOs, groups, home folders, and redirection are how companies scale Windows security.",
          "Windows Hello PIN/biometric is bound to the device, not a short domain password.",
        ],
      },
    ],
  },
  {
    id: "C2-D2-O2-L2",
    objectiveId: "C2-D2-O2",
    slug: "ntfs-vs-share-permissions",
    title: "NTFS versus share permissions",
    description:
      "Compute effective rights when NTFS, share ACLs, inheritance, and groups all apply.",
    estimatedMinutes: 20,
    conceptIds: ["C2-D2-O2-NTFS", "C2-D2-O2-SHAREPERM"],
    prerequisites: ["C2-D2-O2-L1"],
    lastVerified: "2026-09-01",
    sources: ["c2-obj-3.0", "ms-windows"],
    blocks: [
      {
        type: "callout",
        id: "C2-D2-O2-L2-why",
        callout: {
          kind: "why",
          title: "Why this matters",
          body: "Every A+ generation asks this. Remote users get the most restrictive combination of share + NTFS. Local users sitting at the PC ignore the share ACL entirely.",
        },
      },
      {
        type: "reading",
        id: "C2-D2-O2-L2-r1",
        title: "Two ACLs, one effective right",
        markdown: `A folder on an NTFS volume has **NTFS permissions**. Those permissions apply to everyone who uses the files — locally at the console, over the network, or via a secondary logon. **Share permissions** exist only on the **share point** and apply only to **remote** (SMB) connections.

When a user maps a drive, Windows evaluates both. The **most restrictive combination wins**. Classic teaching example: share = Change, NTFS = Read. Remote effective right is **Read**. Share = Full Control, NTFS = Modify. Remote effective is **Modify**. Share = Read, NTFS = Full Control. Remote effective is **Read**.

**Local logon ignores share permissions.** If you sit at the file server and log on, only NTFS (and any other local policy) applies. That is why a technician who "tests" a share by opening C:\\Shares\\Finance on the server console is not testing what Finance sees from a laptop.

**Allow versus deny.** An explicit **Deny** beats Allow. Nested groups make this painful: if Alice is in Accounting (Allow Modify) and in a contractors group with Deny Write, she cannot write. Prefer **do not grant** over **Deny** unless you are carving an exception.

**Inheritance.** Child folders and files inherit the parent's NTFS ACL unless you break inheritance. Breaking inheritance is how a "Public" share grows a private HR subfolder. If a new file "loses" permissions, someone copied it from a volume that did not keep ACLs, or inheritance is broken and the ACL was never set.

Practice: grant **Change** (or Full Control) on the share to a single group such as Authenticated Users or a department group, then do the real work in **NTFS**. That way you are not maintaining two detailed ACLs. The exam still expects you to compute the combination when both are listed.

Attributes (Read-only, Hidden, System, compression, encryption) are not a replacement for NTFS ACLs. Read-only on a file is a convenience flag; an NTFS Write grant can still clear it.`,
      },
      {
        type: "diagram",
        id: "C2-D2-O2-L2-d1",
        component: "PermissionDiagram",
        title: "Effective permissions",
        caption: "Remote access is limited by both the share ACL and NTFS. Local access uses NTFS only.",
        notice:
          "Notice Deny wins, and the share ACL never applies to someone logged on at the console.",
        alt: "Diagram of a remote user passing through share permissions then NTFS permissions, versus a local user hitting NTFS only.",
      },
      {
        type: "knowledge-check",
        id: "C2-D2-O2-L2-kc1",
        questionIds: ["C2-D2-O2-NTFS-Q001", "C2-D2-O2-SHAREPERM-Q001"],
      },
      {
        type: "lab",
        id: "C2-D2-O2-L2-lab",
        labId: "C2-D2-O2-ACL-LAB",
        title: "NTFS and share permissions lab",
        prompt:
          "Change group membership, NTFS, and share ACLs. Predict effective rights for a remote user and a local user before you reveal the result.",
      },
      {
        type: "callout",
        id: "C2-D2-O2-L2-mistake",
        callout: {
          kind: "mistake",
          title: "Common mistake",
          body: "Adding Full Control on the share does not override a tighter NTFS ACL. Also, 'Everyone: Full Control' on the share is common and acceptable if NTFS is correct — but only if NTFS is actually correct.",
        },
      },
      {
        type: "knowledge-check",
        id: "C2-D2-O2-L2-kc2",
        questionIds: ["C2-D2-O2-NTFS-Q002"],
      },
      {
        type: "checkpoint",
        id: "C2-D2-O2-L2-cp",
        questionIds: [
          "C2-D2-O2-NTFS-Q004",
          "C2-D2-O2-SHAREPERM-Q004",
          "C2-D2-O2-UAC-Q003",
          "C2-D2-O2-EFS-Q003",
          "C2-D2-O2-AD-Q003",
          "C2-D2-O2-HELLO-Q002",
          "C2-D2-O2-NTFS-Q005",
          "C2-D2-O2-SHAREPERM-Q005",
        ],
      },
      {
        type: "summary",
        id: "C2-D2-O2-L2-sum",
        bullets: [
          "NTFS always applies; share permissions apply only over the network.",
          "Remote effective right = most restrictive of share + NTFS.",
          "Deny beats Allow; inheritance flows down until you break it.",
          "Design: coarse share ACL, detailed NTFS ACL, rights via groups.",
        ],
      },
    ],
  },
  {
    id: "C2-D2-O3-L1",
    objectiveId: "C2-D2-O3",
    slug: "wireless-security-protocols",
    title: "WPA2, WPA3, AES, TKIP, and RADIUS",
    description:
      "Harden an access point: modern ciphers, personal versus enterprise authentication, and AAA protocols.",
    estimatedMinutes: 20,
    conceptIds: [
      "C2-D2-O3-WPA2",
      "C2-D2-O3-WPA3",
      "C2-D2-O3-AES",
      "C2-D2-O3-RADIUS",
      "C2-D2-O3-KERBEROS",
    ],
    prerequisites: ["C2-D2-O1-L2"],
    lastVerified: "2026-09-01",
    sources: ["c2-obj-3.0", "wifi-alliance"],
    blocks: [
      {
        type: "callout",
        id: "C2-D2-O3-L1-why",
        callout: {
          kind: "why",
          title: "Why this matters",
          body: "An open or WEP/TKIP guest network is still how laptops get on-path'd in a lobby. A+ wants WPA2/WPA3 with AES, and enterprise Wi-Fi that talks to RADIUS.",
        },
      },
      {
        type: "reading",
        id: "C2-D2-O3-L1-r1",
        title: "Ciphers and generations",
        markdown: `**Wi-Fi Protected Access 2 (WPA2)** and **WPA3** are the current A+ wireless security family. WEP and original WPA exist in the wild as museum pieces; if you see them on an AP, you are looking at a finding.

**AES** (Advanced Encryption Standard) is the symmetric cipher you want. WPA2's proper mode is **AES-CCMP**. **TKIP** (Temporal Key Integrity Protocol) was the WPA-era patch after WEP. It is obsolete. If a SOHO router still offers "TKIP" or "AES/TKIP mixed," set AES-only (or WPA3) and replace clients that cannot do it.

**WPA2-Personal** (WPA2-PSK) uses a **pre-shared key** — the passphrase everyone types. It is acceptable for a house or a tiny office if the passphrase is long and unique and you rotate it when staff leave. It does not scale: one shared secret, no per-user revocation.

**WPA3-Personal** improves that story with **SAE** (Simultaneous Authentication of Equals), which resists offline dictionary attacks against the passphrase better than WPA2-PSK. Prefer WPA3 when the AP and clients support it. Mixed WPA2/WPA3 mode exists for transition; a purely WPA3 BSS is stronger.

**WPA2-Enterprise** and **WPA3-Enterprise** do not share a passphrase. Each user (or each machine) authenticates with 802.1X, typically **PEAP/MSCHAPv2** or **EAP-TLS**, against a **RADIUS** server. Lose a laptop, disable that account or certificate — you do not have to change a building-wide PSK.

Open networks and "hidden SSIDs" are not security. Hiding the SSID only stops casual people from seeing the name; the SSID still appears in probe traffic. Captive-portal "guest Wi-Fi" without client isolation is a party line.`,
      },
      {
        type: "table",
        id: "C2-D2-O3-L1-t1",
        title: "Authentication behind the AP",
        headers: ["Method", "Job", "Typical use"],
        rows: [
          ["WPA2-PSK / WPA3-Personal", "Shared passphrase", "SOHO, home, tiny office"],
          ["WPA2/WPA3-Enterprise + RADIUS", "Per-user (or per-machine) 802.1X", "Company Wi-Fi"],
          ["RADIUS", "AAA: authenticate, authorize, account", "VPN, 802.1X, some switches"],
          ["TACACS+", "AAA, often device administration, Cisco-associated", "Router/switch admin logons"],
          ["Kerberos", "Ticket-based auth on Windows domains", "SSO to file/print after domain logon — not a Wi-Fi cipher"],
          ["MFA", "Second factor at the identity source", "VPN and cloud apps; can sit in front of RADIUS/IdP"],
        ],
        caption: "RADIUS is the enterprise Wi-Fi authenticator. Kerberos is the domain ticket system. Do not swap the names.",
      },
      {
        type: "knowledge-check",
        id: "C2-D2-O3-L1-kc1",
        questionIds: ["C2-D2-O3-WPA2-Q001", "C2-D2-O3-AES-Q001"],
      },
      {
        type: "reading",
        id: "C2-D2-O3-L1-r2",
        title: "RADIUS, TACACS+, Kerberos, and MFA",
        markdown: `**RADIUS** (Remote Authentication Dial-In User Service) is the AAA protocol you will configure for enterprise Wi-Fi and many VPNs. The AP or VPN concentrator is a RADIUS client. It sends credentials or EAP traffic to the RADIUS server, which checks AD, certificates, or another identity store. Accounting records who connected and when.

**TACACS+** (Terminal Access Controller Access-Control System Plus) is also AAA, historically tied to Cisco device administration. It separates authentication, authorization, and accounting more cleanly and typically encrypts the full payload. If the stem is "network engineers logging into routers," TACACS+ is the usual pick. If the stem is "employees joining corporate Wi-Fi," RADIUS is the usual pick.

**Kerberos** is the default authentication protocol inside an Active Directory domain: a ticket-granting ticket after you log on, then service tickets for file servers and other resources. It is not a Wi-Fi encryption protocol. Enterprise Wi-Fi can still use domain credentials via RADIUS, which then talks to AD (and therefore Kerberos behind the scenes). On the exam, keep the labels separate.

**Multifactor** on wireless usually means 802.1X plus a second factor at the IdP, or a certificate on the device plus a user PIN. A PSK is one shared secret, not MFA.

Hardening an AP: unique admin password, HTTPS or SSH management only from a management VLAN, current firmware, WPA3 or WPA2-AES, no WPS if you can disable it, guest network isolated from LAN, and enterprise mode when you have RADIUS.`,
      },
      {
        type: "callout",
        id: "C2-D2-O3-L1-exam",
        callout: {
          kind: "exam",
          title: "Exam lens",
          body: "TKIP = legacy, replace with AES. Personal = PSK. Enterprise = RADIUS/802.1X. TACACS+ = device admin. Kerberos = domain tickets.",
        },
      },
      {
        type: "knowledge-check",
        id: "C2-D2-O3-L1-kc2",
        questionIds: ["C2-D2-O3-WPA3-Q001", "C2-D2-O3-RADIUS-Q001"],
      },
      {
        type: "checkpoint",
        id: "C2-D2-O3-L1-cp",
        questionIds: [
          "C2-D2-O3-WPA2-Q003",
          "C2-D2-O3-WPA3-Q003",
          "C2-D2-O3-AES-Q003",
          "C2-D2-O3-RADIUS-Q003",
          "C2-D2-O3-KERBEROS-Q002",
          "C2-D2-O3-WPA3-Q004",
          "C2-D2-O3-AES-Q004",
          "C2-D2-O3-RADIUS-Q004",
        ],
      },
      {
        type: "lab",
        id: "C2-D2-O3-L1-lab",
        labId: "C2-D2-O3-WIFISEC-LAB",
        title: "Wireless security protocols matching lab",
        prompt:
          "Match WPA3-Personal, Enterprise+RADIUS, AES-only, and Kerberos SSO. Leave WEP/open and TKIP-for-speed unmatched.",
      },
      {
        type: "summary",
        id: "C2-D2-O3-L1-sum",
        bullets: [
          "Use WPA2-AES or WPA3; treat TKIP as a finding.",
          "Personal mode shares a passphrase; enterprise mode uses 802.1X and RADIUS.",
          "WPA3-Personal (SAE) resists offline PSK cracking better than WPA2-PSK.",
          "RADIUS for users/VPN/Wi-Fi; TACACS+ often for network-device admins; Kerberos for domain SSO.",
        ],
      },
    ],
  },
  {
    id: "C2-D2-O4-L1",
    objectiveId: "C2-D2-O4",
    slug: "malware-types",
    title: "Malware types: ransomware to fileless and stalkerware",
    description:
      "Name the payload from symptoms: Trojan, rootkit, ransomware, cryptominer, stalkerware, fileless, PUP.",
    estimatedMinutes: 22,
    conceptIds: ["C2-D2-O4-RANSOM", "C2-D2-O4-FILELESS", "C2-D2-O4-PUP"],
    prerequisites: ["C2-D2-O2-L1"],
    lastVerified: "2026-09-01",
    sources: ["c2-obj-3.0", "cisa-phishing"],
    blocks: [
      {
        type: "callout",
        id: "C2-D2-O4-L1-why",
        callout: {
          kind: "why",
          title: "Why this matters",
          body: "If you call everything a virus, you will pick the wrong containment. Ransomware needs isolation and backups. A cryptominer needs a process hunt. Stalkerware is an intimate-partner safety issue, not just 'adware.'",
        },
      },
      {
        type: "reading",
        id: "C2-D2-O4-L1-r1",
        title: "Name the family from behavior",
        markdown: `A **virus** infects files (or, classically, boot records) and needs a host to carry it. A **boot sector virus** lives in the boot record or EFI-adjacent startup path so it runs before the OS is fully up. A **Trojan** is malware the user was tricked into running because it pretended to be a useful installer, codec, or invoice. Trojans do not self-replicate like worms; they rely on social engineering.

A **rootkit** hides processes, files, or drivers from the OS and from naive scanners. User-mode rootkits hide in processes; kernel rootkits need a driver. If Task Manager looks clean but CPU and network are on fire, think concealment — and recovery often means **reimage**, not "delete the EXE."

**Spyware** collects activity. A **keylogger** records keystrokes (and often clipboard and screenshots) to steal passwords. **Stalkerware** is spyware marketed to monitor a partner or child without ongoing consent: hidden location, messages, microphone. On a support call, stalkerware is a safety incident. Do not "show the spouse how to hide it better." Follow policy, preserve evidence if required, and help the device owner regain control.

**Ransomware** encrypts files and demands payment. Offline backups and isolation beat negotiating. **Cryptominers** steal CPU/GPU cycles (and electricity) to mine cryptocurrency; the ticket looks like a loud fan, high CPU, and a hot laptop. **Adware** and **potentially unwanted programs (PUPs)** ride bundled installers: extra toolbars, pop-ups, browser hijacks. The user may have clicked OK. It is still unwanted.

**Fileless** malware lives in memory, WMI, registry Run keys, PowerShell, or Office macros — not a tidy bad.exe on disk. Signature AV misses more of it. That is why EDR (next lesson) watches behavior.

Symptoms you will actually see: ransomware notes and renamed files; miners with sustained CPU; stalkerware with unknown device-admin apps and location always on; Trojans with a "printer driver" the user just ran; rootkits with tools that cannot see the process; PUPs with a new search engine the user did not choose.`,
      },
      {
        type: "table",
        id: "C2-D2-O4-L1-t1",
        title: "Malware cheat sheet",
        headers: ["Type", "Primary tell", "First instinct"],
        rows: [
          ["Virus", "Infected files / boot path", "Scan from trusted media; may still reimage"],
          ["Trojan", "User ran a fake installer", "Find what they executed; isolate"],
          ["Rootkit", "Hides from OS tools", "Do not trust the OS; rescue disk or reimage"],
          ["Ransomware", "Files encrypted, ransom note", "Quarantine, do not pay as IT policy, restore from backup"],
          ["Keylogger / spyware", "Stolen credentials, odd keystroke lag", "Isolate, rotate passwords from a clean device"],
          ["Stalkerware", "Covert monitoring of a person", "Safety first; evidence; owner's consent"],
          ["Cryptominer", "CPU/GPU pegged, heat, power", "Find the miner process/task; check persistence"],
          ["Fileless", "No obvious binary; PowerShell/WMI/registry", "EDR timeline; memory/behavior, not just a file scan"],
          ["Adware / PUP", "Browser hijack, bundled junk", "Remove programs, reset browser, user education"],
        ],
        caption: "The exam will give you the tell. Match the name, then the tool.",
      },
      {
        type: "knowledge-check",
        id: "C2-D2-O4-L1-kc1",
        questionIds: ["C2-D2-O4-RANSOM-Q001", "C2-D2-O4-FILELESS-Q001"],
      },
      {
        type: "reading",
        id: "C2-D2-O4-L1-r2",
        title: "PUPs, recovery console, and reinstall",
        markdown: `PUPs sit in a gray zone: the EULA mentioned a "partner toolbar." Treat them as malware for a business PC. Uninstall from Apps, reset the browser, and check Task Scheduler. If the same junk returns, the user is reinstalling a pack or a hijacker remains in a profile.

A **recovery console** / WinRE (Windows Recovery Environment) or a bootable PE (preinstallation environment) lets you scan or replace files when the running OS is hostile. It is a method, not a product name you must license. **OS reinstallation** is the honest end-state for rootkits, ransomware you cannot decrypt, and any machine whose integrity you cannot prove.

User education belongs in prevention: do not run the invoice.exe, do not enable macros from strangers, do not sideload APKs. Education without technical controls is a poster. Technical controls without education still lose to a convincing Trojan.`,
      },
      {
        type: "callout",
        id: "C2-D2-O4-L1-tech",
        callout: {
          kind: "technician",
          title: "Technician lens",
          body: "Ask what changed: new 'codec,' USB from a conference, a crack for paid software, a lover with physical access. The payload name follows the story.",
        },
      },
      {
        type: "knowledge-check",
        id: "C2-D2-O4-L1-kc2",
        questionIds: ["C2-D2-O4-PUP-Q001"],
      },
      {
        type: "summary",
        id: "C2-D2-O4-L1-sum",
        bullets: [
          "Trojans trick; viruses infect; rootkits hide; ransomware encrypts; miners steal CPU.",
          "Fileless malware lives in memory, scripts, and legitimate tools.",
          "Stalkerware is covert personal surveillance — handle as a safety incident.",
          "PUPs and adware are still in scope; reimage when you cannot trust the OS.",
        ],
      },
    ],
  },
  {
    id: "C2-D2-O4-L2",
    objectiveId: "C2-D2-O4",
    slug: "edr-mdr-xdr-detection",
    title: "EDR, MDR, XDR, and the rest of the toolbox",
    description:
      "Tell endpoint detection from a managed service and from extended detection across email and identity.",
    estimatedMinutes: 18,
    conceptIds: ["C2-D2-O4-EDR", "C2-D2-O4-XDR"],
    prerequisites: ["C2-D2-O4-L1"],
    lastVerified: "2026-09-01",
    sources: ["c2-obj-3.0"],
    blocks: [
      {
        type: "callout",
        id: "C2-D2-O4-L2-why",
        callout: {
          kind: "why",
          title: "Why this matters",
          body: "Signature antivirus is not the whole job. A+ now expects you to know EDR, MDR, and XDR at help-desk depth — what they see, who watches them, and when you still reimage.",
        },
      },
      {
        type: "reading",
        id: "C2-D2-O4-L2-r1",
        title: "From AV to XDR",
        markdown: `**Antivirus / anti-malware** on the endpoint matches known signatures and some heuristics. It is necessary and not sufficient. **Software firewalls** on the host block unexpected inbound (and sometimes outbound) connections. An **email security gateway** filters mail before it lands in the inbox: malware, spoofing, URL rewrite, BEC-ish invoice patterns. User education and **antiphishing training** reduce the click-through that remains.

**Endpoint detection and response (EDR)** records process trees, script activity, persistence, and network connections on the PC or phone, then lets an analyst hunt and isolate. If fileless malware never wrote a known bad hash, EDR may still show PowerShell spawning from Word. Isolation (contain the host) is a typical EDR action. A help-desk tech does not need to write a YARA rule; they do need to know that an EDR isolate button is the enterprise version of unplugging the NIC.

**Managed detection and response (MDR)** is a **service**: a vendor watches your telemetry (often EDR plus logs) and helps you respond 24/7 because you do not have a SOC (security operations center). The product on the disk might still be EDR. MDR is who is staring at the console. If the stem says "we pay a vendor to watch alerts overnight," pick MDR, not a new acronym for antivirus.

**Extended detection and response (XDR)** correlates **across** email, identity, cloud, and endpoints — broader than one EDR agent. A stolen token plus a suspicious mailbox rule plus an odd process on a laptop becomes one incident instead of three tickets. XDR is not magic if you never onboarded the mailbox or the identity logs.

None of these replace backups or the malware-removal process in 2.6. They change how you detect and how fast you isolate. OS reinstallation remains the clean end when the endpoint is untrusted. A SOHO shop with Defender only still updates signatures, scans, and reimages; they just do not get a 3 a.m. analyst on retainer.`
      },
      {
        type: "table",
        id: "C2-D2-O4-L2-t1",
        title: "Who does what",
        headers: ["Tool / method", "Sees", "Does not by itself"],
        rows: [
          ["Antivirus / AM", "Known files and simple heuristics", "Hunt fileless living-off-the-land"],
          ["Host firewall", "Ports and apps on that PC", "Catch a malicious outbound HTTPS beacon you allowed"],
          ["Email gateway", "Mail-borne malware and many phish", "Stop a USB Trojan"],
          ["EDR", "Endpoint behavior, isolate host", "Cover SaaS mailbox rules unless integrated"],
          ["MDR", "Your telemetry, with humans on a retainer", "Install itself without an agent/source of logs"],
          ["XDR", "Cross-domain correlation", "Magic if you never onboarded the other products"],
          ["Recovery console / PE", "Offline scan and repair", "Prove the machine is clean after a rootkit"],
          ["Reinstall", "Known-good image", "Recover unsaved work you never backed up"],
        ],
        caption: "Pick the layer that matches the channel: mail, endpoint, or identity.",
      },
      {
        type: "knowledge-check",
        id: "C2-D2-O4-L2-kc1",
        questionIds: ["C2-D2-O4-EDR-Q001"],
      },
      {
        type: "reading",
        id: "C2-D2-O4-L2-r2",
        title: "What you do on the ticket",
        markdown: `If EDR flags a process, do not immediately "allow" it because a user wants Word back. Isolate, snapshot what you can, and follow the runbook. If you have MDR, open the vendor channel instead of deleting files at random.

If you only have Defender and a firewall, you still update signatures, scan, and decide on reimage. Education is listed in the objectives because the next invoice.exe will arrive after you leave.

A recovery console is for when Windows will not boot cleanly or you do not trust the running kernel. It is a step, not a personality.`,
      },
      {
        type: "callout",
        id: "C2-D2-O4-L2-exam",
        callout: {
          kind: "exam",
          title: "Exam lens",
          body: "EDR = endpoint telemetry and response. MDR = someone else watching. XDR = broader than the endpoint. Do not mix the acronyms.",
        },
      },
      {
        type: "knowledge-check",
        id: "C2-D2-O4-L2-kc2",
        questionIds: ["C2-D2-O4-XDR-Q001", "C2-D2-O4-EDR-Q002"],
      },
      {
        type: "checkpoint",
        id: "C2-D2-O4-L2-cp",
        questionIds: [
          "C2-D2-O4-RANSOM-Q005",
          "C2-D2-O4-FILELESS-Q005",
          "C2-D2-O4-EDR-Q004",
          "C2-D2-O4-XDR-Q004",
          "C2-D2-O4-PUP-Q004",
          "C2-D2-O4-FILELESS-Q006",
          "C2-D2-O4-EDR-Q005",
          "C2-D2-O4-RANSOM-Q006",
        ],
      },
      {
        type: "summary",
        id: "C2-D2-O4-L2-sum",
        bullets: [
          "AV/AM and host firewalls are baseline; email gateways stop a lot of mail-borne payloads.",
          "EDR records and responds on the endpoint — critical for fileless malware.",
          "MDR is a managed service watching telemetry; XDR correlates across email, identity, cloud, and endpoints.",
          "Reinstall remains valid when integrity is gone.",
        ],
      },
    ],
  },
  {
    id: "C2-D2-O5-L1",
    objectiveId: "C2-D2-O5",
    slug: "phishing-bec-evil-twin",
    title: "Phishing, BEC, QR codes, and evil twins",
    description:
      "Read the inbox, the SSID list, and the urgent wire request the way a technician who has been burned reads them.",
    estimatedMinutes: 22,
    conceptIds: ["C2-D2-O5-PHISH", "C2-D2-O5-BEC", "C2-D2-O5-EVILTWIN"],
    prerequisites: ["C2-D2-O4-L1"],
    lastVerified: "2026-09-01",
    sources: ["c2-obj-3.0", "cisa-phishing"],
    blocks: [
      {
        type: "callout",
        id: "C2-D2-O5-L1-why",
        callout: {
          kind: "why",
          title: "Why this matters",
          body: "Most malware still arrives because a human clicked, replied, or joined the wrong Wi-Fi. V15 names QR phishing and business email compromise on purpose.",
        },
      },
      {
        type: "reading",
        id: "C2-D2-O5-L1-r1",
        title: "Social engineering with a network stack",
        markdown: `**Phishing** is fraudulent messaging that wants a credential, a payment, or a payload. **Spear phishing** is targeted (your name, your vendor, your last invoice). **Whaling** spears an executive. **Vishing** is voice. **Smishing** is SMS. **QR code phishing** (sometimes called quishing) puts the malicious URL in a sticker or a PDF QR so the phone camera skips the address bar the user might have inspected on a PC.

Indicators: mismatched display name versus actual domain, urgency plus money or MFA codes, look-alike domains (rnicrosoft.com), unexpected attachments, and links that do not match the text. Hover is not enough on a phone. Check the real domain, not the friendly From.

**Business email compromise (BEC)** is fraud that hijacks or impersonates a mailbox — often a vendor or a CFO — to redirect a payment or a W-2 dump. There may be **no malware**. The "invoice" is a conversation. Controls: out-of-band verification of bank-detail changes, MFA on mail, and watching for mailbox forwarding rules.

**Impersonation** is in person or on a call: fake copier tech, fake help desk. **Shoulder surfing** is watching a PIN. **Tailgating** is following through a door (see 2.1). **Dumpster diving** is paper and drives in the bin.

An **evil twin** is a rogue AP using a trusted SSID (or a near-clone) so clients join the attacker. Captive portals that ask for Microsoft credentials are a common payload. **FIRST** action is often: do not join unknown SSIDs, forget the network, use corp EAP-TLS or a known PSK, and treat anything entered on that portal as burned.

Do not confuse evil twin with **on-path** (formerly man-in-the-middle) as a category: evil twin is a way to become on-path on wireless.`,
      },
      {
        type: "video",
        id: "C2-D2-O5-L1-see1",
        assetId: "phishing-hover",
        title: "SEE: displayed paypal.com versus real URL",
        caption:
          "HTML overlays spell paypal.com and paypa1-secure.example. Do not trust Imagine spelling.",
        transcript:
          "The friendly text can say paypal.com while the real URL is paypa1-secure.example. Trust the HTML overlay strings in this academy, not any spelling drawn inside a generated frame.",
      },
      {
        type: "table",
        id: "C2-D2-O5-L1-t1",
        title: "Name the play",
        headers: ["Play", "Channel", "Giveaway"],
        rows: [
          ["Phishing", "Email", "Link/domain/urgency; mass or generic"],
          ["Spear / whale", "Email", "Personal or executive targeting"],
          ["Smishing", "SMS", "Package-link texts, fake MFA"],
          ["Vishing", "Phone", "Help desk asking for OTP or password"],
          ["QR phishing", "Printed or in-PDF QR", "Sticker over a real poster; URL you never typed"],
          ["BEC", "Email thread / vendor change", "New bank details, secrecy, no malware required"],
          ["Evil twin", "Wi-Fi SSID", "Clone of office SSID without 802.1X you expect"],
          ["Tailgating", "Door", "Person carrying boxes 'who forgot a badge'"],
        ],
        caption: "Match channel + motive. Money plus a fake executive is BEC until proven otherwise.",
      },
      {
        type: "knowledge-check",
        id: "C2-D2-O5-L1-kc1",
        questionIds: ["C2-D2-O5-PHISH-Q001", "C2-D2-O5-BEC-Q001"],
      },
      {
        type: "lab",
        id: "C2-D2-O5-L1-lab",
        labId: "C2-D2-O5-PHISH-LAB",
        title: "Phishing and social-engineering lab",
        prompt:
          "Work the inbox, the evil-twin SSID list, and the QR/vishing scenarios. Flag the real domain, the money-plus-urgency BEC, and the cloned SSID.",
      },
      {
        type: "callout",
        id: "C2-D2-O5-L1-exam",
        callout: {
          kind: "exam",
          title: "Exam lens",
          body: "BEC is about payment or data via impersonated mail, not a crypto locker. Evil twin is a fake AP. QR phishing hides the URL in a code.",
        },
      },
      {
        type: "knowledge-check",
        id: "C2-D2-O5-L1-kc2",
        questionIds: ["C2-D2-O5-EVILTWIN-Q001"],
      },
      {
        type: "summary",
        id: "C2-D2-O5-L1-sum",
        bullets: [
          "Phishing family: email, SMS, voice, QR, spear, whale.",
          "BEC redirects money or data using impersonation — malware optional.",
          "Evil twin clones an SSID to steal credentials or become on-path.",
          "Physical classics still count: shoulder surf, tailgate, dumpster, impersonation.",
        ],
      },
    ],
  },
  {
    id: "C2-D2-O5-L2",
    objectiveId: "C2-D2-O5",
    slug: "attacks-and-vulnerabilities",
    title: "On-path, XSS, SQLi, and the holes they walk through",
    description:
      "Tell technical attacks from the vulnerabilities that make them cheap: unpatched, EOL, BYOD, missing AV.",
    estimatedMinutes: 20,
    conceptIds: ["C2-D2-O5-ONPATH", "C2-D2-O5-XSS"],
    prerequisites: ["C2-D2-O5-L1"],
    lastVerified: "2026-09-01",
    sources: ["c2-obj-3.0"],
    blocks: [
      {
        type: "callout",
        id: "C2-D2-O5-L2-why",
        callout: {
          kind: "why",
          title: "Why this matters",
          body: "You will not exploit SQL injection on the A+ exam. You will name it, name XSS, and name the unpatched or BYOD condition that made the incident boringly preventable.",
        },
      },
      {
        type: "reading",
        id: "C2-D2-O5-L2-r1",
        title: "Attacks at A+ depth",
        markdown: `A **denial of service (DoS)** makes a service unavailable. A **distributed DoS (DDoS)** uses many systems (often a botnet). Your SOHO router cannot "patch" a volumetric DDoS; the ISP or a cloud scrubber can. You can still stop a single host flooding the LAN by unplugging it.

**Spoofing** forges a source: MAC, IP, email From, caller ID. **On-path** ( CompTIA's current name for man-in-the-middle ) sits between two parties, intercepting or altering traffic. Evil twins, compromised proxies, and ARP spoofing on a flat LAN are on-path stories. HTTPS with a validated certificate is how a browser tries to detect the impostor — which is why fake cert warnings matter in 2.11.

A **brute-force** attack tries many passwords. A **dictionary** attack tries a list of likely words and mutations. Lockout, length, MFA, and not using local admin for daily work are the counters. A **zero-day** exploits a vulnerability with no patch yet. You mitigate with least privilege, segmentation, WAF/email filtering, and vendor guidance — not with "just update" if the update does not exist.

**SQL injection (SQLi)** sends database commands through an input field that was concatenated into a query. **Cross-site scripting (XSS)** injects script into a web app so another user's browser runs it (session theft, defacement). A+ wants the concept and the mitigation idea: input handling, patches, least privilege on the database account — not exploit code.

An **insider threat** already has some trust. **Supply chain / pipeline** attacks compromise a vendor, update, or library you ingest (malicious installer, poisoned package). You mitigate with trusted sources, hashes (2.11), and not skipping vendor advisories.

**Vulnerabilities** on the list are the boring ones that still win: **non-compliant** systems that violate policy, **unpatched** systems, **unprotected** systems (no AV, no firewall), **EOL** (end-of-life) software that will never get a fix, and **BYOD** (bring your own device) without MDM. Name the hole when the stem describes it.`,
      },
      {
        type: "table",
        id: "C2-D2-O5-L2-t1",
        title: "Attack versus condition",
        headers: ["If the stem shows", "Name", "Counter at A+ depth"],
        rows: [
          ["Service down from flood", "DoS / DDoS", "Isolate source; ISP/cloud for volumetric"],
          ["Traffic intercepted between client and server", "On-path", "TLS, no rogue APs, no rogue proxies"],
          ["Password spray / many tries", "Brute force / dictionary", "Lockout, MFA, long unique passwords"],
          ["Exploit with no patch yet", "Zero-day", "Vendor guidance, isolation, compensating controls"],
          ["Malicious SQL in a form", "SQLi", "Patched app, parameterized queries (concept), least privilege"],
          ["Stolen session via injected script", "XSS", "Patched app, browser updates, caution with links"],
          ["Trusted vendor update was hostile", "Supply chain", "Hash/signature checks, staged updates"],
          ["Personal phone with corp mail, no MDM", "BYOD risk", "MDM or deny corp data"],
        ],
        caption: "The vulnerability list is how you prevent the next one, not a second name for the attack.",
      },
      {
        type: "knowledge-check",
        id: "C2-D2-O5-L2-kc1",
        questionIds: ["C2-D2-O5-ONPATH-Q001", "C2-D2-O5-XSS-Q001"],
      },
      {
        type: "reading",
        id: "C2-D2-O5-L2-r2",
        title: "BYOD, EOL, and unprotected",
        markdown: `An **EOL** operating system is a vulnerability even if "it still runs the shop floor app." You can compensate with isolation, but the exam will still call it EOL. **Unpatched** is a choice; **unprotected** is missing AV or firewall. **Non-compliant** means it violates the written baseline (USB storage enabled, no encryption) even if it is patched.

BYOD without a container or MDM profile mixes personal malware, unknown patch levels, and corp mail. The counter is a profile, a company device, or blocking the data — not a stern email.

Insiders need logging, least privilege, DLP, and an offboarding checklist. Technical attacks against web apps need the app owner; your job is to recognize the class and not dump a production database "to test SQLi."`,
      },
      {
        type: "callout",
        id: "C2-D2-O5-L2-mistake",
        callout: {
          kind: "mistake",
          title: "Common mistake",
          body: "On-path is not 'the attacker is on the path to the building.' It is between two communicating parties. XSS is not SQL injection; one hits the browser, the other hits the database.",
        },
      },
      {
        type: "knowledge-check",
        id: "C2-D2-O5-L2-kc2",
        questionIds: ["C2-D2-O5-ONPATH-Q002"],
      },
      {
        type: "checkpoint",
        id: "C2-D2-O5-L2-cp",
        questionIds: [
          "C2-D2-O5-PHISH-Q006",
          "C2-D2-O5-BEC-Q004",
          "C2-D2-O5-EVILTWIN-Q004",
          "C2-D2-O5-ONPATH-Q003",
          "C2-D2-O5-XSS-Q003",
          "C2-D2-O5-PHISH-Q007",
          "C2-D2-O5-BEC-Q005",
          "C2-D2-O5-EVILTWIN-Q005",
        ],
      },
      {
        type: "summary",
        id: "C2-D2-O5-L2-sum",
        bullets: [
          "DoS/DDoS exhaust availability; spoofing forges identity; on-path intercepts.",
          "Brute force and dictionary attack passwords; MFA and lockout matter.",
          "SQLi hits the database; XSS hits other users' browsers.",
          "Zero-day, insider, and supply chain are named threats; unpatched/EOL/BYOD/unprotected are named holes.",
        ],
      },
    ],
  },
  {
    id: "C2-D2-O6-L1",
    objectiveId: "C2-D2-O6",
    slug: "soho-malware-removal-10-steps",
    title: "The 10-step SOHO malware removal process",
    description:
      "Memorize the current CompTIA order — including disable/enable System Restore on Windows Home — and know why each step exists.",
    estimatedMinutes: 24,
    conceptIds: [
      "C2-D2-O6-QUARANTINE",
      "C2-D2-O6-SYSRESTORE",
      "C2-D2-O6-REIMAGE",
    ],
    prerequisites: ["C2-D2-O4-L2"],
    lastVerified: "2026-09-01",
    sources: ["c2-obj-3.0", "ms-windows"],
    blocks: [
      {
        type: "callout",
        id: "C2-D2-O6-L1-why",
        callout: {
          kind: "why",
          title: "Why this matters",
          body: "V15 scores a 10-step SOHO process, not the older 7-step list. If you restore a point before you clean, you can restore the malware. If you skip quarantine, you clean one PC while it infects the next.",
        },
      },
      {
        type: "reading",
        id: "C2-D2-O6-L1-r1",
        title: "The official order, and why",
        markdown: `CompTIA A+ Core 2 (220-1202) V15 objective 2.6 is a **numbered procedure** for a SOHO workstation or mobile device. Use this exact sequence:

1. **Investigate and verify malware symptoms.** Confirm it is malware: ransomware note, unexpected processes, browser hijack, EDR alert, user report correlated with evidence. Do not nuke a PC because a pop-up said "call this number."
2. **Quarantine infected system.** Disconnect from the network (and from shared storage). Stop lateral movement and C2 (command and control). Quarantine is isolation, not "put the files in Defender's quarantine folder" as the whole step.
3. **Disable System Restore in Windows Home.** Restore points can contain infected files. If you leave protection on, malware can hide in a point or you might later roll back to a dirty point. V15 explicitly says **Windows Home** here because Home uses System Restore as the consumer recovery story.
4. **Remediate infected systems.** This is the work of removing the threat with appropriate tools and a plan — not yet the scheduled-task hygiene at the end.
5. **Update anti-malware software.** Stale signatures miss yesterday's dropper. Update from a clean network path or known-good media after isolation is thought through.
6. **Scan and removal techniques** (for example **safe mode**, **preinstallation environment**). Boot to a trusted environment when the live OS is lying. Safe Mode loads fewer drivers; PE/WinRE or a bootable AM disk scans from outside the infected kernel.
7. **Reimage / reinstall.** If you cannot prove cleanliness — rootkit, ransomware, repeat infection — rebuild from a known-good image. This is a first-class step on V15, not an unspoken last resort.
8. **Schedule scans and run updates.** Persistence: Task Scheduler, Windows Update, AM scheduled scans so this is not a one-time hero moment.
9. **Enable System Restore and create a restore point in Windows Home.** Turn the consumer safety net back on only after the system is clean, then take a **new** point. Enabling it earlier can freeze malware into a point.
10. **Educate the end user.** What they clicked, how to report, why the USB from the parking lot is not a keyboard. Without this, you get the same ticket on Thursday.

Enterprise EDR isolation maps to step 2. A SOHO exam item still wants this wording and this order.`,
      },
      {
        type: "diagram",
        id: "C2-D2-O6-L1-d1",
        component: "MalwareStepsDiagram",
        title: "SOHO malware removal — 10 steps",
        caption: "Verify, isolate, disable restore, remediate, update AM, scan (Safe Mode/PE), reimage if needed, schedule, re-enable restore, educate.",
        notice:
          "Notice System Restore is disabled before cleanup and enabled only after a known-clean state. Reimage is step 7, not 'instead of the process.'",
        alt: "Ordered 10-step flowchart of CompTIA SOHO malware removal including System Restore off then on for Windows Home.",
      },
      {
        type: "knowledge-check",
        id: "C2-D2-O6-L1-kc1",
        questionIds: ["C2-D2-O6-QUARANTINE-Q001", "C2-D2-O6-SYSRESTORE-Q001"],
      },
      {
        type: "lab",
        id: "C2-D2-O6-L1-lab",
        labId: "C2-D2-O6-MALWARE-LAB",
        title: "Malware removal sequence lab",
        prompt:
          "Reorder the current 10-step SOHO process, then run the infection simulation. Do not enable System Restore until after remediation and a clean scan.",
      },
      {
        type: "callout",
        id: "C2-D2-O6-L1-exam",
        callout: {
          kind: "exam",
          title: "Exam lens",
          body: "FIRST after verification is quarantine. Disable System Restore before you clean. Enable it and create a point only after the machine is clean. Educate is last.",
        },
      },
      {
        type: "knowledge-check",
        id: "C2-D2-O6-L1-kc2",
        questionIds: ["C2-D2-O6-REIMAGE-Q001"],
      },
      {
        type: "summary",
        id: "C2-D2-O6-L1-sum",
        bullets: [
          "1 verify, 2 quarantine, 3 disable System Restore (Windows Home).",
          "4 remediate, 5 update anti-malware, 6 scan/remove in Safe Mode or PE.",
          "7 reimage/reinstall when you cannot trust the OS.",
          "8 schedule scans/updates, 9 enable System Restore + new point, 10 educate.",
        ],
      },
    ],
  },
  {
    id: "C2-D2-O6-L2",
    objectiveId: "C2-D2-O6",
    slug: "when-to-reimage-and-how-to-educate",
    title: "Reimage decisions, restore points, and user education",
    description:
      "Know when step 7 is mandatory, why restore points are dangerous while dirty, and what 'educate' actually means on a ticket.",
    estimatedMinutes: 16,
    conceptIds: ["C2-D2-O6-REIMAGE", "C2-D2-O6-SYSRESTORE", "C2-D2-O6-QUARANTINE"],
    prerequisites: ["C2-D2-O6-L1"],
    lastVerified: "2026-09-01",
    sources: ["c2-obj-3.0", "ms-windows"],
    blocks: [
      {
        type: "callout",
        id: "C2-D2-O6-L2-why",
        callout: {
          kind: "why",
          title: "Why this matters",
          body: "SOHO customers want you to 'just delete the virus.' Rootkits, ransomware, and repeat infections are how you justify a reimage without sounding lazy.",
        },
      },
      {
        type: "reading",
        id: "C2-D2-O6-L2-r1",
        title: "When remediation is not enough",
        markdown: `Step 4–6 can succeed on a PUP or a simple Trojan you fully remove, with a clean scan from updated tools in Safe Mode. Step 7 is the honest answer when:

- Files are encrypted and you have no decryptor you trust.
- A rootkit or boot-sector infection makes the running OS an unreliable witness.
- The same malware returns after "removal" (persistence you cannot find, or a user replaying the installer).
- You cannot account for credentials that were logged — treat the identity as burned and the PC as untrusted until rebuilt.

Reimage means a **known-good** image or vendor recovery media, not a ghost of the infected disk. Restore user data only from **backups taken before the incident** or from data you scanned on a separate clean system. Do not copy Desktop\\invoice.exe back.

**System Restore** on Windows Home is not a backup. It snapshots system files and some settings. Malware authors have used restore points as a hiding place, and technicians have rolled a "fixed" PC back to last Tuesday's infection. That is why V15 splits disable (step 3) and enable + new point (step 9). On Pro/Enterprise you may have other recovery (reset, images, Shadow Copies policy); the exam wording you must not drop is **Windows Home**.

**Quarantine** on a mobile device may mean airplane mode, removing the work profile, or taking the phone off Wi-Fi and cellular. Do not factory-reset before you capture what policy requires, but do not leave it on the corporate SSID.

**Educate** is specific: show the actual phish, explain why the QR in the parking garage was wrong, set a password manager, turn off "run anyway," and give a report path. A lecture about "being careful" is not step 10.`,
      },
      {
        type: "table",
        id: "C2-D2-O6-L2-t1",
        title: "FIRST / NEXT traps in this process",
        headers: ["Situation", "Do not", "Do"],
        rows: [
          ["Pop-up says you are infected", "Pay the pop-up or immediately reimage", "Investigate/verify (step 1)"],
          ["Verified ransomware on a mapped drive", "Keep working 'one more file'", "Quarantine (unplug) now"],
          ["About to run a cleaner", "Leave System Restore on Home", "Disable it first (step 3)"],
          ["Stale AM definitions", "Scan with last month's signatures", "Update AM (step 5) then scan (6)"],
          ["Rootkit / unknown persistence", "Declare victory after one Defender pass", "Reimage (step 7)"],
          ["PC finally clean", "Skip restore points forever", "Enable System Restore and create a point (9), then educate (10)"],
        ],
        caption: "The capitalized FIRST/NEXT in a stem is usually pointing at the next numbered step, not a creative extra.",
      },
      {
        type: "knowledge-check",
        id: "C2-D2-O6-L2-kc1",
        questionIds: ["C2-D2-O6-REIMAGE-Q002", "C2-D2-O6-SYSRESTORE-Q002"],
      },
      {
        type: "reading",
        id: "C2-D2-O6-L2-r2",
        title: "SOHO versus a domain EDR shop",
        markdown: `In a company with EDR, "quarantine" may be a console button that cuts the NIC while you collect a timeline. The exam still wants the SOHO procedure. Do not replace step 10 with "we have phishing training annually" if this user just wired money.

Document what you found, what you ran, and whether data was exfiltrated as far as you can tell. Credential rotation happens from a **clean** device. That is part of remediation and education, not a reason to skip isolation.`,
      },
      {
        type: "callout",
        id: "C2-D2-O6-L2-mistake",
        callout: {
          kind: "mistake",
          title: "Common mistake",
          body: "Creating a restore point as your first action snapshots the infection. Updating AM after a 'clean' scan with old signatures is theatre.",
        },
      },
      {
        type: "knowledge-check",
        id: "C2-D2-O6-L2-kc2",
        questionIds: ["C2-D2-O6-QUARANTINE-Q002"],
      },
      {
        type: "checkpoint",
        id: "C2-D2-O6-L2-cp",
        questionIds: [
          "C2-D2-O6-QUARANTINE-Q006",
          "C2-D2-O6-SYSRESTORE-Q006",
          "C2-D2-O6-REIMAGE-Q006",
          "C2-D2-O6-QUARANTINE-Q007",
          "C2-D2-O6-SYSRESTORE-Q007",
          "C2-D2-O6-REIMAGE-Q007",
          "C2-D2-O6-QUARANTINE-Q008",
          "C2-D2-O6-SYSRESTORE-Q008",
        ],
      },
      {
        type: "summary",
        id: "C2-D2-O6-L2-sum",
        bullets: [
          "Reimage when you cannot prove the OS is trustworthy.",
          "Restore user data only from clean backups, never from the infected volume blindly.",
          "System Restore off while dirty, on with a new point when clean — Windows Home wording.",
          "Educate with the specific lure and a report path, then rotate credentials from a clean device.",
        ],
      },
    ],
  },
  {
    id: "C2-D2-O7-L1",
    objectiveId: "C2-D2-O7",
    slug: "workstation-hardening",
    title: "Workstation hardening",
    description:
      "Raise a weak PC: encryption, passwords, lockout, firmware passwords, AutoRun, unused services, and patching.",
    estimatedMinutes: 22,
    conceptIds: [
      "C2-D2-O7-HARDEN",
      "C2-D2-O7-AUTORUN",
      "C2-D2-O7-LOCKOUT",
      "C2-D2-O7-BIOSPW",
    ],
    prerequisites: ["C2-D2-O2-L2"],
    lastVerified: "2026-09-01",
    sources: ["c2-obj-3.0", "ms-windows", "ms-bitlocker"],
    blocks: [
      {
        type: "callout",
        id: "C2-D2-O7-L1-why",
        callout: {
          kind: "why",
          title: "Why this matters",
          body: "Objective 2.7 is the baseline you apply before the user ever gets phished. A default-admin, AutoRun-on, never-patched PC is already compromised; it is just waiting for the USB.",
        },
      },
      {
        type: "reading",
        id: "C2-D2-O7-L1-r1",
        title: "Data at rest, accounts, and firmware",
        markdown: `**Data-at-rest encryption** on a workstation is BitLocker (Windows), FileVault (Mac), or LUKS-style disk encryption on Linux. If the laptop can leave the building, the disk is not "protected by the login screen." A thief who pulls the drive skips your wallpaper.

**Password considerations** on V15: **length**, **character types**, **uniqueness**, **complexity**, and **expiration**. Length and uniqueness beat a 90-day rotate into Password2!. Expiration still appears because many SOHO policies use it; combine it with a password manager so people do not write the rotation on a monitor. Do not reuse the Microsoft account password as the local admin, the router, and the Wi-Fi PSK.

**BIOS/UEFI passwords** stop a walk-up from changing boot order, disabling Secure Boot, or booting a live USB to copy an unencrypted disk (encryption still matters). A supervisor/admin firmware password is different from the Windows password. Store it in the same vault as other break-glass secrets. Power-on passwords are rarer and painful for help desk; use them only if policy says so.

**End-user best practices:** screensaver **locks**, **log off** when walking away, physically secure laptops, protect **PII** and passwords, and **use a password manager**. A locked screen is not BitLocker, but it stops the coworker who wants to send mail as you.

**Account management:** restrict permissions (least privilege), restrict **logon hours** if the business needs that, **disable Guest**, **lockout** after failed attempts (stops casual brute force; watch for denial-of-service against the account), **timeout / screen lock**, and **account expiration** for contractors. **Change the default administrator** username/password — "Administrator / admin" is the first pair in every list.

**Disable AutoRun** (and treat AutoPlay as guilty). USB malware still uses convenient autorun-style behavior. **Disable unused services** (legacy SMBv1, unused remote listeners). **Patch** OS and applications. **Endpoint security software:** antivirus, anti-malware, and **content filtering** where the SOHO router or a browser extension provides it.

Hardening is a posture, not a single checkbox. The exam will give you a weak setting and ask which change is BEST.`,
      },
      {
        type: "table",
        id: "C2-D2-O7-L1-t1",
        title: "Weak baseline versus hardened",
        headers: ["Finding", "Risk", "Hardening move"],
        rows: [
          ["No volume encryption", "Stolen disk is readable", "BitLocker / FileVault + key escrow"],
          ["Short reused passwords", "Spray and stuff", "Length, unique, manager, MFA if available"],
          ["No firmware password", "Boot-order bypass", "UEFI admin password; Secure Boot on"],
          ["Guest enabled, default admin", "Trivial local access", "Disable Guest; rename/rotate admin"],
          ["No lockout or screen lock", "Shoulder surf and brute force", "Lockout + idle timeout"],
          ["AutoRun on, unused services on", "USB and network worms", "Disable AutoRun; stop extra listeners"],
          ["Weeks behind on patches", "Known exploits", "OS and app updates on a schedule"],
        ],
        caption: "Each row is a likely BEST answer when the stem describes that finding.",
      },
      {
        type: "knowledge-check",
        id: "C2-D2-O7-L1-kc1",
        questionIds: ["C2-D2-O7-HARDEN-Q001", "C2-D2-O7-AUTORUN-Q001"],
      },
      {
        type: "reading",
        id: "C2-D2-O7-L1-r2",
        title: "Services, AutoRun, and the help-desk defaults",
        markdown: `Unused services are not "might be useful someday." Every listener is a patch you must track. Remote Registry, leftover Telnet, and vendor remote tools from a previous tech are classic leftovers.

AutoRun/AutoPlay on removable media is how conference USB drops still work. Disable AutoRun via policy; teach users that a found USB is evidence, not a gift.

Lockout thresholds need a reset process or you will spend Friday unlocking the owner who cannot type. That is still better than an unbounded RDP guesser.

Content filtering at the workstation or the SOHO DNS (see 2.10/2.11) blocks categories; it is not a full secure web gateway. Pair it with browser hardening.

When you image a new PC, harden before you hand it over: encryption, local admin rotated, Guest off, AutoRun off, firewall on, updates current, screen lock 5–15 minutes, standard user for daily work.`,
      },
      {
        type: "callout",
        id: "C2-D2-O7-L1-exam",
        callout: {
          kind: "exam",
          title: "Exam lens",
          body: "V15 workstation hardening is 2.7 (not mobile). Mobile is 2.8. Destruction is 2.9. Do not study from a blog that swapped those numbers.",
        },
      },
      {
        type: "knowledge-check",
        id: "C2-D2-O7-L1-kc2",
        questionIds: ["C2-D2-O7-LOCKOUT-Q001", "C2-D2-O7-BIOSPW-Q001"],
      },
      {
        type: "checkpoint",
        id: "C2-D2-O7-L1-cp",
        questionIds: [
          "C2-D2-O7-HARDEN-Q004",
          "C2-D2-O7-AUTORUN-Q003",
          "C2-D2-O7-LOCKOUT-Q004",
          "C2-D2-O7-BIOSPW-Q004",
          "C2-D2-O7-HARDEN-Q005",
          "C2-D2-O7-LOCKOUT-Q005",
          "C2-D2-O7-AUTORUN-Q004",
          "C2-D2-O7-BIOSPW-Q005",
        ],
      },
      {
        type: "lab",
        id: "C2-D2-O7-L1-lab",
        labId: "C2-D2-O7-HARDEN-LAB",
        title: "Workstation hardening matching lab",
        prompt:
          "Match encryption/patch baseline, AutoRun off, lockout, and firmware password. Leave shared-admin and AutoRun-enable unmatched.",
      },
      {
        type: "summary",
        id: "C2-D2-O7-L1-sum",
        bullets: [
          "Encrypt data at rest; escrow recovery keys.",
          "Passwords: long, unique, complex; managers beat sticky notes.",
          "UEFI passwords, disable Guest, lockout, timeouts, expire contractors.",
          "Disable AutoRun and unused services; patch OS and apps; keep AV/AM and content filtering.",
        ],
      },
    ],
  },
  {
    id: "C2-D2-O8-L1",
    objectiveId: "C2-D2-O8",
    slug: "mobile-device-security",
    title: "Mobile device security",
    description:
      "Encrypt the phone, lock the screen, locate or wipe it, and apply MDM profiles for BYOD versus corporate-owned.",
    estimatedMinutes: 20,
    conceptIds: [
      "C2-D2-O8-REMOTEWIPE",
      "C2-D2-O8-SCREENLOCK",
      "C2-D2-O8-MDMPROFILE",
    ],
    prerequisites: ["C2-D2-O7-L1"],
    lastVerified: "2026-09-01",
    sources: ["c2-obj-3.0"],
    blocks: [
      {
        type: "callout",
        id: "C2-D2-O8-L1-why",
        callout: {
          kind: "why",
          title: "Why this matters",
          body: "A phone is a computer that leaves the building every day with mail, MFA, and the badge app. Screen lock without encryption is a delay. Encryption without a wipe plan is a prayer.",
        },
      },
      {
        type: "reading",
        id: "C2-D2-O8-L1-r1",
        title: "Locks, encryption, locate, wipe",
        markdown: `**Device encryption** on modern iOS and Android is on by default once a screen lock is set, but you still verify it and you still require the lock. A **screen lock** is facial recognition, **PIN**, fingerprint, **pattern**, or (legacy) **swipe**. Swipe is not a credential. Patterns are shoulder-surfable. PIN and biometrics are the business baseline. Failed-attempt limits throttle guessing and can wipe or disable the device after a policy threshold.

**Locator applications** (Find My, Find My Device) show a map, play a sound, and often can lock or wipe. They need the device online and not in a Faraday bag. **Remote wipe** is the control when the phone is gone and the data is more valuable than the glass. Corporate-owned: wipe the device. BYOD: prefer **selective wipe** of the work profile so you do not erase someone's photos without policy cover — but if the whole device was used for unrestricted corp data, a full wipe may still be required.

**Remote backup** (iCloud, Google Backup, MDM-managed backups) is how a wiped phone is not a career-ending data loss. Test restore, not just a green check.

**Configuration profiles** push Wi-Fi EAP settings, VPN, email, certificates, restriction payloads (camera, USB, screenshots). That is MDM's daily job, not only wipe.

**MDM** inventories devices, enforces encryption and lock, distributes apps, and separates **BYOD versus corporate-owned**. Corporate-owned can be fully managed. BYOD typically uses a work profile / user enrollment with a privacy boundary. **Profile security requirements** are the written bar: OS version, lock, encryption, no jailbreak/root.

Jailbreak/root and unofficial stores belong to Core 2 troubleshooting 3.3 as symptoms; here you prevent them with MDM compliance.`,
      },
      {
        type: "diagram",
        id: "C2-D2-O8-L1-d1",
        component: "PhoneSettingsDiagram",
        title: "Phone security settings",
        caption: "Lock, encryption, locator, remote wipe, and the work profile are different switches.",
        notice:
          "Notice a swipe lock does not meet a PIN policy, and a locator is useless if Location and the MDM agent were never enrolled.",
        alt: "Phone settings layout highlighting screen lock, encryption, find device, remote wipe, and MDM profile.",
      },
      {
        type: "knowledge-check",
        id: "C2-D2-O8-L1-kc1",
        questionIds: ["C2-D2-O8-SCREENLOCK-Q001", "C2-D2-O8-REMOTEWIPE-Q001"],
      },
      {
        type: "reading",
        id: "C2-D2-O8-L1-r2",
        title: "BYOD versus corporate-owned",
        markdown: `A corporate-owned phone can require a long PIN, block sideloading, and wipe at will. A BYOD phone needs a **profile**: corp apps in a container, DLP that blocks copy-out, and a selective wipe on offboarding. If the company cannot accept that privacy split, it should issue hardware.

Lost device FIRST: verify identity of the caller, then locate/lock, then wipe per policy, then rotate credentials that were on the device (mail, VPN, SSO). Do not wipe before the user confirms it is not in the sofa unless policy says time-based auto-wipe.

MFA authenticator apps on a lost phone are an identity incident, not only a hardware incident. Revoke the device in the IdP.`,
      },
      {
        type: "callout",
        id: "C2-D2-O8-L1-tech",
        callout: {
          kind: "technician",
          title: "Technician lens",
          body: "Ask whose device it is before you factory-reset. Ask whether the authenticator lived only on that phone before you wipe.",
        },
      },
      {
        type: "knowledge-check",
        id: "C2-D2-O8-L1-kc2",
        questionIds: ["C2-D2-O8-MDMPROFILE-Q001"],
      },
      {
        type: "lab",
        id: "C2-D2-O8-L1-lab",
        labId: "C2-D2-O8-MOBSEC-LAB",
        title: "Mobile device security matching lab",
        prompt:
          "Match remote wipe, screen lock, MDM profile, and device encryption. Leave swipe-only and skip-MDM unmatched.",
      },
      {
        type: "checkpoint",
        id: "C2-D2-O8-L1-cp",
        questionIds: [
          "C2-D2-O8-REMOTEWIPE-Q005",
          "C2-D2-O8-SCREENLOCK-Q005",
          "C2-D2-O8-MDMPROFILE-Q005",
          "C2-D2-O8-REMOTEWIPE-Q006",
          "C2-D2-O8-SCREENLOCK-Q006",
          "C2-D2-O8-MDMPROFILE-Q006",
          "C2-D2-O8-REMOTEWIPE-Q007",
          "C2-D2-O8-SCREENLOCK-Q007",
        ],
      },
      {
        type: "summary",
        id: "C2-D2-O8-L1-sum",
        bullets: [
          "Require a real screen lock (PIN/biometric/pattern) — not swipe — and keep encryption on.",
          "Locator finds; remote wipe kills data; backups make wipe survivable.",
          "Failed-attempt limits slow guessing.",
          "MDM profiles enforce BYOD versus corporate-owned rules.",
        ],
      },
    ],
  },
  {
    id: "C2-D2-O9-L1",
    objectiveId: "C2-D2-O9",
    slug: "data-destruction-and-disposal",
    title: "Data destruction: degauss, wipe, shred",
    description:
      "Pick drilling, shredding, degaussing, incineration, or a cryptographic wipe based on the media in your hand.",
    estimatedMinutes: 20,
    conceptIds: [
      "C2-D2-O9-DEGAUSS",
      "C2-D2-O9-WIPE",
      "C2-D2-O9-SHRED",
      "C2-D2-O9-COD",
    ],
    prerequisites: ["C2-D2-O7-L1"],
    lastVerified: "2026-09-01",
    sources: ["c2-obj-3.0", "nist-800-88"],
    blocks: [
      {
        type: "callout",
        id: "C2-D2-O9-L1-why",
        callout: {
          kind: "why",
          title: "Why this matters",
          body: "A standard format is not sanitization. Degaussing an SSD is a waste of a magnet. The exam will hand you a media type and a reuse-versus-destroy requirement.",
        },
      },
      {
        type: "reading",
        id: "C2-D2-O9-L1-r1",
        title: "Destroy versus sanitize",
        markdown: `**Physical destruction** of hard drives on V15: **drilling**, **shredding**, **degaussing**, **incineration**. These are for media that will **not** be reused as a drive. They implement a high assurance that data is gone, at the cost of the hardware and, for incineration/shred, environmental handling.

**Degaussing** applies a strong magnetic field that randomizes magnetic domains. It is for **HDD** (and magnetic tape). It **does not** reliably sanitize **SSD**, **eMMC**, or **optical** media. A degaussed HDD is usually dead as a usable disk; do not promise the customer they can keep using it. Degaussing an SSD leaves the NAND cells holding data.

**Recycling or repurposing:** **erasing/wiping**, **low-level formatting**, **standard formatting**. A **standard format** in Windows often deletes the table of contents and may do a quick format — data is recoverable with tools. A full format plus a proper **wipe** (overwrite, or **crypto-erase** / Secure Erase on SSD) is how you **reuse** a drive. **Low-level format** in vendor tools historically wrote every sector; on modern HDDs the analog LLF is a factory process. On the exam, "low-level format" still means a more thorough overwrite-style sanitization than a quick format.

**SSDs** wear-level: overwrites may not hit every cell. Prefer ATA **Secure Erase**, NVMe sanitize, or **cryptographic wipe** (destroy the encryption key, as with BitLocker then reset) plus physical destruction when policy requires high assurance. Do not degauss SSDs as your plan.

**Outsourcing:** a **third-party vendor** with a **certificate of destruction (CoD)** (or recycling) is how companies prove a chain when they cannot shred on site. You still need serial-number inventory and a chain of custody. Regulatory and **environmental** rules (e-waste, hazardous components) forbid throwing drives in the dumpster even after a wipe.

Paper and optical discs: shred (cross-cut) or incinerate per policy. Phones: MDM wipe, then factory reset is not enough for high assurance — destroy or use a certified e-waste process after crypto-erase.`,
      },
      {
        type: "video",
        id: "C2-D2-O9-L1-see1",
        assetId: "drive-shred",
        title: "SEE: Degauss, Wipe, Shred — drive goes to shred",
        caption: "Degauss is not for SSD. RAID is not destruction.",
        transcript:
          "Shredding destroys platters so the drive cannot be reused. Degaussing is for magnetic media, not SSD. Wipe is for reuse. RAID is not a destruction method.",
      },
      {
        type: "table",
        id: "C2-D2-O9-L1-t1",
        title: "Media versus method",
        headers: ["Media / goal", "Appropriate", "Wrong"],
        rows: [
          ["HDD, reuse in another PC", "Wipe / Secure Erase / full overwrite", "Quick format only; degauss (kills the drive)"],
          ["HDD, leave the building as scrap", "Shred, drill (policy), degauss, incinerate", "Delete the partition and hope"],
          ["SSD, reuse", "Crypto-erase / NVMe sanitize / vendor Secure Erase", "Degauss; a single pass of file delete"],
          ["SSD, destroy", "Shred/incinerate designed for flash; some crushers", "Degauss as the only control"],
          ["Magnetic tape", "Degauss and/or shred", "Quick format concepts from Windows"],
          ["Need proof for auditors", "CoD from a vetted vendor + serial list", "A verbal 'we tossed them'"],
        ],
        caption: "NIST SP 800-88 language is purge versus destroy. A+ names the tools in this table.",
      },
      {
        type: "knowledge-check",
        id: "C2-D2-O9-L1-kc1",
        questionIds: ["C2-D2-O9-DEGAUSS-Q001", "C2-D2-O9-WIPE-Q001"],
      },
      {
        type: "reading",
        id: "C2-D2-O9-L1-r2",
        title: "Certificates, vendors, and the dumpster",
        markdown: `If Finance needs to show a regulator that drives from a payment PC are gone, you collect serials, seal a bin, and get a **certificate of destruction**. Doing it "in the shop with a drill" can be valid if policy says so and you document it; a drill through the platters is physical destruction, not a wipe.

Environmental rules mean you cannot incinerate plastics in the parking lot. Use licensed facilities.

A stolen backup tape is a degauss/shred problem you should have solved before the theft: encrypt backups, then destruction is belt-and-suspenders.

Never donate a PC with a quick-formatted disk. Wipe or remove the disk.`,
      },
      {
        type: "callout",
        id: "C2-D2-O9-L1-exam",
        callout: {
          kind: "exam",
          title: "Exam lens",
          body: "Degauss = magnetic media. SSD = wipe/crypto-erase or physical shred, not degauss. Quick format is not sanitization. CoD is the paper trail.",
        },
      },
      {
        type: "knowledge-check",
        id: "C2-D2-O9-L1-kc2",
        questionIds: ["C2-D2-O9-SHRED-Q001", "C2-D2-O9-COD-Q001"],
      },
      {
        type: "checkpoint",
        id: "C2-D2-O9-L1-cp",
        questionIds: [
          "C2-D2-O9-DEGAUSS-Q004",
          "C2-D2-O9-WIPE-Q004",
          "C2-D2-O9-SHRED-Q004",
          "C2-D2-O9-COD-Q004",
          "C2-D2-O9-DEGAUSS-Q005",
          "C2-D2-O9-WIPE-Q005",
          "C2-D2-O9-SHRED-Q005",
          "C2-D2-O9-COD-Q005",
        ],
      },
      {
        type: "summary",
        id: "C2-D2-O9-L1-sum",
        bullets: [
          "Destroy (drill/shred/degauss/incinerate) when the drive will not be reused.",
          "Degauss HDDs and tape, not SSDs.",
          "Wipe/Secure Erase/crypto-erase to repurpose; standard/quick format is not enough.",
          "Third-party CoD plus serials satisfies auditors; follow environmental rules.",
        ],
      },
    ],
  },
  {
    id: "C2-D2-O10-L1",
    objectiveId: "C2-D2-O10",
    slug: "secure-soho-networks",
    title: "Secure SOHO wired and wireless networks",
    description:
      "Change defaults, kill UPnP unless documented, isolate guest Wi-Fi, and treat a screened subnet as not 'the whole LAN.'",
    estimatedMinutes: 22,
    conceptIds: [
      "C2-D2-O10-UPNP",
      "C2-D2-O10-SSID",
      "C2-D2-O10-PORTFWD",
      "C2-D2-O10-DMZ",
    ],
    prerequisites: ["C2-D2-O3-L1"],
    lastVerified: "2026-09-01",
    sources: ["c2-obj-3.0", "wifi-alliance"],
    blocks: [
      {
        type: "callout",
        id: "C2-D2-O10-L1-why",
        callout: {
          kind: "why",
          title: "Why this matters",
          body: "Default admin/admin, UPnP wide open, and a guest SSID bridged to the NAS is how a smart bulb becomes a path to payroll files.",
        },
      },
      {
        type: "reading",
        id: "C2-D2-O10-L1-r1",
        title: "Router settings that actually matter",
        markdown: `Change **default passwords** (and the default admin username if the firmware allows). This is the first finding on every SOHO audit. Update **firmware** before you celebrate the new PSK — bugs in the management plane are remote exploits.

**Physical placement:** the router is an asset. It does not live in an unlocked lobby or a window where someone can factory-reset it. Antenna placement is also RF: center of the coverage area, not inside a metal cabinet.

**UPnP** (Universal Plug and Play) lets LAN devices open inbound port mappings without you. Convenient for games and some NATs; dangerous because malware can punch holes too. **Disable UPnP** unless a documented exception exists.

A **screened subnet** (the modern exam language around what people still call a **DMZ**) is a network segment for services that must be reachable from untrusted networks, **screened** by a firewall from the internal LAN. Putting a NAS in "DMZ host" / exposed-host mode on a consumer router is often "forward every inbound port to this box" — that is not a screened subnet. That is a sacrifice. If you must expose a camera DVR, put it on an isolated VLAN/guest zone with no path to PCs.

**Secure management access:** HTTPS/SSH to the LAN (or a management VLAN), no remote administration from WAN unless a VPN is in front, unique cert or at least not default.

**Wireless specific:** change the **SSID** from "NETGEAR12" so you are not advertising the hardware. **Disabling SSID broadcast** is not a control; it annoys guests and does not hide the network from a scanner. Set **encryption** to WPA3 or WPA2-AES (objective 2.3). **Guest access** must be isolated from the LAN — that is the entire point.

**Firewall:** disable unused inbound ports. **Port forwarding / mapping** is an explicit hole: only the ports you need, to the internal host you intend, preferably not RDP on 3389 to the world. **IP filtering** and **content filtering** restrict destinations or categories.`,
      },
      {
        type: "table",
        id: "C2-D2-O10-L1-t1",
        title: "SOHO findings",
        headers: ["Setting", "Secure default for A+", "Why"],
        rows: [
          ["Admin password", "Unique, long, vaulted", "Bots try manufacturer defaults"],
          ["Firmware", "Current", "WAN-side router bugs are full-takeover"],
          ["UPnP", "Off unless documented", "Malware maps ports without your ticket"],
          ["Guest Wi-Fi", "On, client isolation, no LAN", "Visitors and IoT stay off file shares"],
          ["SSID broadcast", "On, but name is not the vendor default", "Hiding SSID is not security"],
          ["WAN management", "Off (use VPN)", "The admin UI should not face the internet"],
          ["DMZ host / all-ports forward", "Avoid; use a real screened subnet", "One PC becomes the internet's playground"],
          ["Port forward", "Minimal, non-default ports still need auth", "Forwarding 3389 to a desktop is a brute-force magnet"],
        ],
        caption: "Guest isolation and UPnP off will appear more often than exotic VLAN designs.",
      },
      {
        type: "knowledge-check",
        id: "C2-D2-O10-L1-kc1",
        questionIds: ["C2-D2-O10-UPNP-Q001", "C2-D2-O10-SSID-Q001"],
      },
      {
        type: "lab",
        id: "C2-D2-O10-L1-lab",
        labId: "C1-D2-O6-ROUTER-LAB",
        title: "SOHO router security lab",
        prompt:
          "Change default credentials, set WPA3, enable guest isolation, disable UPnP, and avoid a wide-open DMZ host. Confirm the LAN DHCP scope does not include the router address.",
      },
      {
        type: "callout",
        id: "C2-D2-O10-L1-mistake",
        callout: {
          kind: "mistake",
          title: "Common mistake",
          body: "Disabling SSID broadcast is not a hardening step worth taking. Putting the only PC in 'DMZ' because a game would not NAT is how ransomware arrives.",
        },
      },
      {
        type: "knowledge-check",
        id: "C2-D2-O10-L1-kc2",
        questionIds: ["C2-D2-O10-PORTFWD-Q001", "C2-D2-O10-DMZ-Q001"],
      },
      {
        type: "checkpoint",
        id: "C2-D2-O10-L1-cp",
        questionIds: [
          "C2-D2-O10-UPNP-Q004",
          "C2-D2-O10-SSID-Q004",
          "C2-D2-O10-PORTFWD-Q004",
          "C2-D2-O10-DMZ-Q004",
          "C2-D2-O10-UPNP-Q005",
          "C2-D2-O10-SSID-Q005",
          "C2-D2-O10-PORTFWD-Q005",
          "C2-D2-O10-DMZ-Q005",
        ],
      },
      {
        type: "summary",
        id: "C2-D2-O10-L1-sum",
        bullets: [
          "Change defaults, update firmware, lock physical placement, secure management.",
          "Disable UPnP unless there is a documented exception.",
          "Guest Wi-Fi isolated; changing SSID helps, hiding broadcast does not.",
          "Screened subnet ≠ consumer 'DMZ host.' Port-forward only what you must.",
        ],
      },
    ],
  },
  {
    id: "C2-D2-O11-L1",
    objectiveId: "C2-D2-O11",
    slug: "browser-security-settings",
    title: "Browser security: certificates, hashing, and secure DNS",
    description:
      "Trust downloads with hashes, read certificate warnings, and turn on private mode, blockers, and secure DNS on purpose.",
    estimatedMinutes: 20,
    conceptIds: [
      "C2-D2-O11-CERTWARN",
      "C2-D2-O11-HASH",
      "C2-D2-O11-PRIVACYMODE",
      "C2-D2-O11-SECUREDNS",
    ],
    prerequisites: ["C2-D2-O5-L1"],
    lastVerified: "2026-09-01",
    sources: ["c2-obj-3.0"],
    blocks: [
      {
        type: "callout",
        id: "C2-D2-O11-L1-why",
        callout: {
          kind: "why",
          title: "Why this matters",
          body: "The browser is the SOHO user's operating system. A ignored certificate warning or a random extension is how credentials leave.",
        },
      },
      {
        type: "reading",
        id: "C2-D2-O11-L1-r1",
        title: "Downloads, hashes, certs, and patches",
        markdown: `Install browsers and extensions only from **trusted sources** (vendor site, official store). **Untrusted sources** include random "optimizer" sites and sideloaded .crx files. **Hashing** (SHA-256 published next to a vendor ISO or installer) lets you verify the bits were not swapped in transit. You hash the file and compare; matching hashes mean integrity, not that the vendor is saintly — but they mean you got what the vendor published.

**Browser patching** is as urgent as OS patching. Drive-by exploits hit the renderer first.

**Password managers** (browser-native or dedicated) beat reused passwords. Pair them with MFA. Beware of fake manager extensions.

**Secure connections** use TLS and a **valid certificate**. A certificate warning (name mismatch, expired, untrusted CA, downgrade) is a **stop**. It can be a lab with a self-signed cert, or it can be on-path. Teach users not to click through on banking and mail. Inspect: issued-to matches the site, a known CA, dates valid.

**Settings:** **pop-up blocker** on; **clear browsing data / cache** when a hijack or a stale SSO cookie is in play (and when a shared PC changes hands); **private-browsing mode** (Incognito/InPrivate) does not store local history/cookies after the session — it does **not** anonymize you to the site, the employer proxy, or the ISP. **Sign-in / browser sync** copies passwords and history to the vendor cloud; disable or enterprise-control it on shared and high-security PCs.

**Ad blockers** reduce malvertising. **Proxy** settings must match the organization; a surprise proxy is an on-path. **Secure DNS** (DNS over HTTPS or TLS, or a configured secure resolver) encrypts DNS lookups so a coffee-shop LAN cannot as easily spoof name resolution. It is not a VPN.

**Feature management:** enable/disable plug-ins, extensions, and features (flash is gone; PDF, WebRTC, password saving still matter). Less attack surface on a kiosk.`,
      },
      {
        type: "diagram",
        id: "C2-D2-O11-L1-d1",
        component: "DnsFlowDiagram",
        title: "Why secure DNS exists",
        caption: "Plain DNS on a hostile LAN can be spoofed. DoH/DoT wraps the lookup so a coffee-shop resolver is not your only truth.",
        notice:
          "Notice secure DNS does not encrypt the rest of the site by itself — TLS on the connection still has to check out.",
        alt: "DNS lookup path with an optional encrypted DNS channel versus a spoofable local resolver.",
      },
      {
        type: "knowledge-check",
        id: "C2-D2-O11-L1-kc1",
        questionIds: ["C2-D2-O11-HASH-Q001", "C2-D2-O11-CERTWARN-Q001"],
      },
      {
        type: "table",
        id: "C2-D2-O11-L1-t1",
        title: "Browser controls",
        headers: ["Control", "Does", "Does not"],
        rows: [
          ["Hash verify", "Prove the installer matches the published digest", "Prove the software is free of bugs"],
          ["Valid cert / padlock", "Site identity + TLS to that name", "Prove the page is not phishing on the real-looking domain you typed wrong"],
          ["Private mode", "Drop local history/cookies at close", "Hide you from the site, proxy, or malware"],
          ["Clear cache/data", "Fix stale/poisoned site data; shared-PC hygiene", "Remove a PUP on disk"],
          ["Secure DNS", "Encrypt or pin DNS lookups", "Replace HTTPS or a VPN"],
          ["Ad blocker", "Cut malvertising and some trackers", "Stop a user-installed Trojan"],
          ["Sync off", "Keep passwords off the vendor cloud", "Stop an extension from reading the session"],
        ],
        caption: "Certificate warnings and hash mismatches are stop-the-line events.",
      },
      {
        type: "callout",
        id: "C2-D2-O11-L1-exam",
        callout: {
          kind: "exam",
          title: "Exam lens",
          body: "If the hash does not match, do not install. If the cert warning is unexpected, do not continue. Private browsing is local privacy, not anonymity.",
        },
      },
      {
        type: "knowledge-check",
        id: "C2-D2-O11-L1-kc2",
        questionIds: ["C2-D2-O11-PRIVACYMODE-Q001", "C2-D2-O11-SECUREDNS-Q001"],
      },
      {
        type: "checkpoint",
        id: "C2-D2-O11-L1-cp",
        questionIds: [
          "C2-D2-O11-CERTWARN-Q004",
          "C2-D2-O11-HASH-Q004",
          "C2-D2-O11-PRIVACYMODE-Q004",
          "C2-D2-O11-SECUREDNS-Q004",
          "C2-D2-O11-CERTWARN-Q005",
          "C2-D2-O11-HASH-Q005",
          "C2-D2-O11-PRIVACYMODE-Q005",
          "C2-D2-O11-SECUREDNS-Q005",
        ],
      },
      {
        type: "summary",
        id: "C2-D2-O11-L1-sum",
        bullets: [
          "Trusted sources + published hashes before you run an installer.",
          "Patch the browser; treat unexpected certificate warnings as hostile until proven otherwise.",
          "Private mode, cache clearing, pop-up blockers, ad blockers, and sync policy are user-facing controls.",
          "Secure DNS protects name lookups; a proxy must be the one you intended.",
        ],
      },
    ],
  },
];
