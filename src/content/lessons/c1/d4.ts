import type { Lesson } from "../../schema";

export const C1_D4_LESSONS: Lesson[] = [
  {
    id: "C1-D4-O1-L1",
    objectiveId: "C1-D4-O1",
    slug: "why-vms-exist",
    title: "Why virtual machines exist",
    description:
      "Host versus guest, resource allocation, and the sandbox, test/dev, legacy, and cross-platform jobs a VM actually does.",
    estimatedMinutes: 22,
    conceptIds: ["C1-D4-O1-VM", "C1-D4-O1-TYPE1", "C1-D4-O1-TYPE2"],
    prerequisites: [],
    lastVerified: "2026-09-01",
    sources: ["c1-obj-3.0", "comptia-a-v15"],
    blocks: [
      {
        type: "callout",
        id: "C1-D4-O1-L1-why",
        callout: {
          kind: "why",
          title: "Why this matters",
          body: "Help-desk tickets now include 'the VM will not start' as often as 'the PC will not boot.' If you treat a virtual machine as a magic cloud, you will mis-size RAM, blame the network for a storage problem, and tell a developer to reinstall Windows when they needed a snapshot.",
        },
      },
      {
        type: "reading",
        id: "C1-D4-O1-L1-r1",
        title: "Host, guest, and a slice of hardware",
        markdown: `A **virtual machine (VM)** is a complete computer that exists as files and scheduled time on a real computer. The real computer is the **host**. Each VM is a **guest**. The software that creates and schedules guests is the **hypervisor**.

The guest believes it has a CPU, RAM, a disk, a NIC, and firmware. Those devices are **virtual hardware**. The hypervisor maps them onto physical cores, DIMMs, storage, and NICs on the host. If the host has 32 GB of RAM and you give three guests 16 GB each, something will swap or fail to start. Over-allocation is not automatically wrong — many guests idle — but it is a choice you must be able to explain.

Virtualization exists because one physical box can do several jobs that used to need several boxes:

- **Sandboxing.** Open a suspicious attachment or test a driver inside a guest that you can revert. The host stays clean if the hypervisor and network isolation are configured correctly. A sandbox is not a substitute for malware response on a production PC.
- **Test and development.** Developers need a copy of production without touching production. Snapshots let them roll back after a failed install.
- **Legacy applications.** A 32-bit line-of-business app that will not run on a current OS can live in a guest that still runs the old OS. You still patch that guest; "legacy" is not "unmanaged."
- **Cross-platform work.** A technician on a Windows laptop can run a Linux server image, or a Mac user can run a Windows VM for a vendor tool that has no macOS build.

The guest OS still needs licensing, updates, backups, and monitoring. Virtualization changes *where* the hardware lives. It does not delete the operating system as a support object.

A VM is stored as a set of files: a virtual disk (often a \`.vmdk\`, \`.vhdx\`, or \`.qcow2\`), a configuration that names vCPU count and RAM, and optional snapshots. If those files sit on a slow USB drive, the guest will feel like a dying hard disk no matter how fast the host CPU is. Storage performance of the host is storage performance of the guest.`,
      },
      {
        type: "diagram",
        id: "C1-D4-O1-L1-d1",
        component: "HypervisorDiagram",
        title: "Host, hypervisor, and guests",
        caption:
          "Physical hardware at the bottom, hypervisor in the middle, guest operating systems on top — each with its own vCPU, RAM, and virtual disk.",
        notice:
          "Notice the guests do not share one kernel. Each guest is a full OS. That is the difference you will use later against containers.",
        alt: "Layered diagram of physical host hardware, a hypervisor, and three guest VMs with separate operating systems.",
      },
      {
        type: "knowledge-check",
        id: "C1-D4-O1-L1-kc1",
        questionIds: ["C1-D4-O1-VM-Q001"],
      },
      {
        type: "reading",
        id: "C1-D4-O1-L1-r2",
        title: "What you actually allocate",
        markdown: `When you create a guest you pick **vCPUs**, **RAM**, **virtual disks**, and **virtual NICs**. Those numbers are not free.

**CPU.** A vCPU is a scheduled slice of a physical core (or thread). Giving a file server eight vCPUs on a four-core host does not create four extra cores. It creates contention. The exam will not ask you to size a cluster, but it will ask why a guest is sluggish while the host Task Manager shows 100% CPU.

**RAM.** Memory is the first resource that makes a guest fail to power on. Dynamic memory (ballooning) can reclaim unused RAM from idle guests. It cannot invent RAM. If a guest pagefiles heavily, add RAM or reduce what that guest is trying to run — do not "optimize" by turning off the pagefile.

**Storage.** Thick-provisioned disks reserve the full virtual size on the datastore. Thin-provisioned disks grow as the guest writes. Thin provisioning saves space until several guests grow at once and the datastore fills. A full datastore pauses VMs. That ticket looks like a crash; the cause is storage accounting.

**Network.** A virtual switch is a software bridge on the host. Guests can be:

- **Bridged** — they look like additional machines on the physical LAN.
- **NAT** — they share the host's IP for outbound traffic; inbound needs port forwarding.
- **Host-only** — they talk to the host and each other, not the LAN. Useful for malware sandboxes.

A guest with no virtual NIC is not "offline because of DNS." It has no adapter. Check the hypervisor settings before you run \`ipconfig\` inside a machine that was never given a network.

**Security requirements** at A+ depth: keep hypervisor management off the user LAN, patch the hypervisor, restrict who can take snapshots of machines that hold credentials, and do not treat a snapshot as a backup of a domain controller. Snapshots are roll-back points, not an offsite copy.`,
      },
      {
        type: "table",
        id: "C1-D4-O1-L1-t1",
        title: "VM use cases versus the wrong tool",
        headers: ["Need", "VM is a fit when", "Wrong tool"],
        rows: [
          [
            "Sandbox a risky file",
            "You can isolate the guest NIC and revert a snapshot",
            "Opening the file on your daily driver 'just this once'",
          ],
          [
            "Test a Windows update",
            "The guest matches production closely enough",
            "Testing on the only domain controller",
          ],
          [
            "Run a 2012-era app",
            "The vendor still supports that OS in a VM, and you patch it",
            "Leaving a physical XP box on the LAN forever",
          ],
          [
            "Need one process, not an OS",
            "Usually a container (next lesson)",
            "A 40 GB Windows VM for a 20 MB service",
          ],
        ],
        caption:
          "Virtualization is a placement decision. Match the isolation you need to the overhead you can afford.",
      },
      {
        type: "knowledge-check",
        id: "C1-D4-O1-L1-kc2",
        questionIds: ["C1-D4-O1-VM-Q002"],
      },
      {
        type: "callout",
        id: "C1-D4-O1-L1-exam",
        callout: {
          kind: "exam",
          title: "Exam lens",
          body: "Stems that mention snapshots, vCPU, thin provision, or host-only networking are still 4.1 items. Do not jump to Core 2 backup objectives just because the word 'snapshot' appeared.",
        },
      },
      {
        type: "summary",
        id: "C1-D4-O1-L1-sum",
        bullets: [
          "A VM is a guest OS on a hypervisor; the physical box is the host.",
          "You allocate vCPU, RAM, virtual disks, and virtual NICs — over-allocation has symptoms.",
          "VMs exist for sandboxing, test/dev, legacy apps, and cross-platform work.",
          "Snapshots are not backups; a full datastore pauses guests.",
        ],
      },
    ],
  },
  {
    id: "C1-D4-O1-L2",
    objectiveId: "C1-D4-O1",
    slug: "type1-vs-type2",
    title: "Type 1 versus Type 2 hypervisors",
    description:
      "Bare-metal versus hosted hypervisors, where each belongs, and the resource and security tradeoffs the exam actually tests.",
    estimatedMinutes: 20,
    conceptIds: ["C1-D4-O1-TYPE1", "C1-D4-O1-TYPE2", "C1-D4-O1-VM"],
    prerequisites: ["C1-D4-O1-L1"],
    lastVerified: "2026-09-01",
    sources: ["c1-obj-3.0", "comptia-a-v15"],
    blocks: [
      {
        type: "callout",
        id: "C1-D4-O1-L2-why",
        callout: {
          kind: "why",
          title: "Why this matters",
          body: "If you install a Type 2 hypervisor on a laptop and then recommend the same product as the company datacenter platform, you have mixed two different products that happen to share a vendor logo.",
        },
      },
      {
        type: "reading",
        id: "C1-D4-O1-L2-r1",
        title: "Two places the hypervisor can sit",
        markdown: `Hypervisors are classified by what they sit on.

A **Type 1** (bare-metal) hypervisor installs on the hardware the way an operating system would. Examples you will hear at work: VMware ESXi, Microsoft Hyper-V Server / Hyper-V on Windows Server, Xen, KVM when used as a host OS role. There is no general-purpose desktop OS underneath it. Management happens through a separate console (vSphere Client, Hyper-V Manager, a web UI) often from another machine. Type 1 is what datacenters and serious Virtual Desktop Infrastructure (VDI) farms use because it has a smaller attack surface and less overhead: cycles go to guests, not to a host desktop that is also rendering a wallpaper.

A **Type 2** (hosted) hypervisor is an application on top of a conventional OS. Examples: VMware Workstation, Oracle VirtualBox, Microsoft Hyper-V on Windows 10/11 (client Hyper-V is still a hypervisor, but the desktop OS is the management world the user lives in), and similar products. You install it because you already have a laptop and you need a guest. The host OS still drives Wi-Fi, sleep, and the user's browser. If the host OS hangs, the guests hang.

Memory aid: **Type 1 talks to the metal. Type 2 talks to an OS that talks to the metal.**

Client Hyper-V on Windows is a common exam trap. The technology is a Type 1-style hypervisor that loads under the desktop, but the *use case* is a power-user workstation. On the exam, match **use case + installation surface**:

- Server in a rack with no local GUI, many VMs, centralized management → Type 1.
- Technician's laptop running Ubuntu in a window beside Outlook → Type 2.

Firmware and CPU features matter. Intel VT-x and AMD-V must be enabled in UEFI. If they are off, a Type 2 product will refuse to start a 64-bit guest or will crawl in emulation. Nested virtualization (a VM running a hypervisor) is a lab trick, not a default production design.

Licensing is a support issue: the hypervisor, each guest OS, and some applications are licensed separately. "It is virtual so it is free" is not a position you can take on a ticket.`,
      },
      {
        type: "diagram",
        id: "C1-D4-O1-L2-d1",
        component: "HypervisorDiagram",
        title: "Type 1 beside Type 2",
        caption:
          "Left: hardware → Type 1 hypervisor → guests. Right: hardware → host OS → Type 2 hypervisor → guests.",
        notice:
          "Notice there is no Windows desktop under the Type 1 stack. If the stem says 'installed as an application on Windows 11,' it is Type 2.",
        alt: "Side-by-side stacks comparing a bare-metal Type 1 hypervisor with a hosted Type 2 hypervisor.",
      },
      {
        type: "knowledge-check",
        id: "C1-D4-O1-L2-kc1",
        questionIds: ["C1-D4-O1-TYPE1-Q001"],
      },
      {
        type: "reading",
        id: "C1-D4-O1-L2-r2",
        title: "Requirements the ticket will actually mention",
        markdown: `**Network requirements.** Type 1 hosts usually have several physical NICs: management, VM traffic, vMotion/live-migration, and storage (iSCSI or NFS). A+ does not require you to design vMotion. It does require you to know that unplugging "the network cable" on a blade might drop management, storage, and guests at once if someone bonded the wrong ports.

**Storage requirements.** Guests live on local disks or on a **datastore** (SAN/NAS). If the SAN path fails, every VM on that datastore fails together. That is not "three unrelated OS crashes."

**Security requirements.** Treat the hypervisor like an OS: unique admin accounts, MFA if offered, patched firmware and hypervisor, lock the management interface to a VLAN, and disable unused services (SSH on ESXi if policy says so). A compromised hypervisor is every guest at once.

**Resource requirements.** Type 1 hosts are sized for the sum of running guests plus overhead. Type 2 hosts are sized for the user's work *plus* the guests. A laptop with 8 GB RAM cannot comfortably host a 6 GB Windows guest while Chrome is open. The FIRST check when a Type 2 guest is sluggish is host RAM and whether the laptop is on a power-saver plan.

**Emulation versus virtualization.** If the CPU has no virtualization extensions, some products emulate a CPU in software. That is slow and is not what production Type 1 farms do. Enable VT-x/AMD-V; do not "add more vCPUs" to fix emulation.

When a user says "Hyper-V will not start," ask which SKU. Windows Home does not include client Hyper-V. That is an edition problem, not a hypervisor bug.`,
      },
      {
        type: "table",
        id: "C1-D4-O1-L2-t1",
        title: "Type 1 versus Type 2 at A+ depth",
        headers: ["Trait", "Type 1 (bare metal)", "Type 2 (hosted)"],
        rows: [
          ["Installs on", "Hardware", "A general-purpose OS"],
          ["Typical home", "Datacenter, VDI farm, server closet", "Laptop/workstation labs"],
          ["Overhead", "Low; host is the hypervisor", "Higher; host OS shares CPU/RAM"],
          ["Management", "Remote console / appliance", "Local app window plus host OS tools"],
          ["Failure domain", "Host hardware and hypervisor", "Host OS, drivers, sleep, and hardware"],
        ],
      },
      {
        type: "knowledge-check",
        id: "C1-D4-O1-L2-kc2",
        questionIds: ["C1-D4-O1-TYPE2-Q001"],
      },
      {
        type: "callout",
        id: "C1-D4-O1-L2-mistake",
        callout: {
          kind: "mistake",
          title: "Common mistake",
          body: "Calling VirtualBox a Type 1 hypervisor because 'it is very fast on my PC' confuses performance with architecture. Type is about what the hypervisor sits on, not about how snappy a single guest feels.",
        },
      },
      {
        type: "summary",
        id: "C1-D4-O1-L2-sum",
        bullets: [
          "Type 1 is bare metal; Type 2 is an application on a host OS.",
          "Datacenter and VDI farms are Type 1; laptop labs are Type 2.",
          "Enable VT-x/AMD-V; Windows Home lacks client Hyper-V.",
          "Hypervisor compromise is every guest at once — lock down management.",
        ],
      },
    ],
  },
  {
    id: "C1-D4-O1-L3",
    objectiveId: "C1-D4-O1",
    slug: "vdi-and-containers",
    title: "VDI, containers, and isolation",
    description:
      "Virtual Desktop Infrastructure versus a local VM, containers versus VMs, and the security and resource story for each.",
    estimatedMinutes: 22,
    conceptIds: [
      "C1-D4-O1-VDI",
      "C1-D4-O1-CONTAINER",
      "C1-D4-O1-VM",
      "C1-D4-O1-TYPE1",
    ],
    prerequisites: ["C1-D4-O1-L2"],
    lastVerified: "2026-09-01",
    sources: ["c1-obj-3.0", "comptia-a-v15"],
    blocks: [
      {
        type: "callout",
        id: "C1-D4-O1-L3-why",
        callout: {
          kind: "why",
          title: "Why this matters",
          body: "A thin client that 'has no desktop' is not broken if VDI is the design. A container that 'has no Windows' is not broken if the app is a Linux process. You have to know which isolation product you are looking at.",
        },
      },
      {
        type: "reading",
        id: "C1-D4-O1-L3-r1",
        title: "Virtual Desktop Infrastructure",
        markdown: `**Virtual Desktop Infrastructure (VDI)** runs the user's desktop OS as a VM in the datacenter (or a cloud region). The user sits at a thin client, a laptop, or a browser and sees a remote session. Input and pixels travel over the network; the data stays near the servers.

Why organizations buy it:

- **Centralized data.** Laptops can be lost; the desktop disk is not on the laptop.
- **Consistent images.** One golden image, many desktops.
- **Remote work** with an internal application that should not be rewritten as SaaS.
- **Secure workstations** in kiosks, hospitals, and contractor rooms.

What VDI needs that a local VM does not: a reliable WAN/LAN path, a connection broker, display-protocol tuning (latency and bandwidth), and enough host capacity at 9:00 a.m. when everyone logs on. A VDI outage looks like "the computer is frozen" to the user. Your FIRST checks are often the path (latency, packet loss) and the broker, not the thin client's local disk — the thin client may not have a meaningful local disk.

Persistent VDI keeps each user's VM. Non-persistent VDI resets to a golden image at logoff. A user who saves files to the desktop on a non-persistent pool will "lose" files every night. That is a design issue, not a failing hard drive.

VDI is not the same as **Remote Desktop Protocol (RDP)** to a single office PC, and it is not **SaaS**. RDP to a tower under a desk is remote access to one machine. VDI is a farm of desktop VMs. SaaS is an application someone else hosts; there is no Windows 11 desktop to patch.`,
      },
      {
        type: "diagram",
        id: "C1-D4-O1-L3-d1",
        component: "HypervisorDiagram",
        title: "VDI session versus a local guest",
        caption:
          "The desktop OS runs on a Type 1 host in the datacenter; the endpoint only displays the session.",
        notice:
          "Notice the user's files live with the VM, not on the thin client. A stolen thin client is an endpoint problem, not a data-loss problem, if the design is honest.",
        alt: "Diagram of thin clients connecting through a broker to desktop VMs on a Type 1 hypervisor.",
      },
      {
        type: "knowledge-check",
        id: "C1-D4-O1-L3-kc1",
        questionIds: ["C1-D4-O1-VDI-Q001"],
      },
      {
        type: "reading",
        id: "C1-D4-O1-L3-r2",
        title: "Containers are not small VMs",
        markdown: `A **container** packages an application with its libraries and config, then runs that package on a **shared host kernel**. Docker and similar engines on Linux (and Windows containers on a Windows kernel) are the products you will hear. The container does not boot firmware, does not run its own kernel, and does not take 30 seconds to POST.

Compare isolation:

- **VM:** hardware virtualization, own kernel, strong isolation, minutes to start, gigabytes.
- **Container:** OS-level isolation (namespaces, cgroups), shared kernel, seconds to start, megabytes.

Use a VM when you need a different OS, a different kernel, or a hard security boundary (malware lab, untrusted tenant). Use a container when many copies of the same app must start quickly and share a host efficiently.

Containers are not "more secure by default." A breakout of the container engine can be a breakout to the host kernel. You still patch the host, scan images, and keep secrets out of image layers. A container with \`--privileged\` is not a sandbox.

On the exam, a stem that says "lightweight, shares the host OS, microservices" is a container. A stem that says "needs Windows 10 and Linux on the same laptop with separate kernels" is a VM. A stem that says "users in another city see a full desktop, data stays in the datacenter" is VDI.

**Resource requirements** for containers: CPU and RAM limits per container, image registry space, and overlay networks. If the host kernel panics, every container on that host dies together — they shared the kernel. That failure domain is the architectural point.`,
      },
      {
        type: "table",
        id: "C1-D4-O1-L3-t1",
        title: "VM versus container versus VDI",
        headers: ["Question", "VM", "Container", "VDI"],
        rows: [
          ["What is isolated?", "Full OS / kernel", "Process + libraries", "A desktop OS session for a human"],
          ["Starts in", "Seconds to minutes", "Milliseconds to seconds", "Login time plus display protocol"],
          ["Different OS on one host?", "Yes", "No (same kernel family)", "Guests are usually one desktop OS"],
          ["User sees", "A machine", "An app or service", "Their desktop from anywhere"],
          ["Typical fail", "Host over-commit, datastore full", "Bad image, host kernel, overlay net", "Latency, broker, morning logon storm"],
        ],
      },
      {
        type: "callout",
        id: "C1-D4-O1-L3-tech",
        callout: {
          kind: "technician",
          title: "Technician lens",
          body: "When a developer says 'it works in Docker,' ask which image tag, which host OS, and whether the published port is listening. When a nurse says 'Citrix is slow,' measure latency and packet loss before you reimage the thin client.",
        },
      },
      {
        type: "knowledge-check",
        id: "C1-D4-O1-L3-kc2",
        questionIds: ["C1-D4-O1-CONTAINER-Q001"],
      },
      {
        type: "callout",
        id: "C1-D4-O1-L3-exam",
        callout: {
          kind: "exam",
          title: "Exam lens",
          body: "Do not pick 'container' just because the word 'cloud' appeared. Containers run on laptops, on Type 1 hosts, and in the cloud. The isolation model is the clue, not the billing statement.",
        },
      },
      {
        type: "summary",
        id: "C1-D4-O1-L3-sum",
        bullets: [
          "VDI hosts the desktop in the datacenter; the endpoint is a display and keyboard.",
          "Non-persistent VDI wipes the desktop at logoff — save to a profile disk or network share.",
          "Containers share a kernel; VMs each have a kernel.",
          "Pick VMs for different OSes and hard isolation; pick containers for dense, fast app copies.",
        ],
      },
      {
        type: "checkpoint",
        id: "C1-D4-O1-L3-cp",
        questionIds: [
          "C1-D4-O1-VM-Q003",
          "C1-D4-O1-TYPE1-Q002",
          "C1-D4-O1-TYPE2-Q002",
          "C1-D4-O1-VDI-Q002",
          "C1-D4-O1-CONTAINER-Q002",
          "C1-D4-O1-VM-Q008",
          "C1-D4-O1-TYPE1-Q006",
          "C1-D4-O1-CONTAINER-Q007",
        ],
      },
    ],
  },
  {
    id: "C1-D4-O2-L1",
    objectiveId: "C1-D4-O2",
    slug: "cloud-deployment-models",
    title: "Public, private, hybrid, and community cloud",
    description:
      "Who owns the metal, who shares it, and how hybrid connectivity actually shows up on a ticket.",
    estimatedMinutes: 20,
    conceptIds: ["C1-D4-O2-HYBRID", "C1-D4-O2-MULTITENANT", "C1-D4-O2-IAAS"],
    prerequisites: ["C1-D4-O1-L3"],
    lastVerified: "2026-09-01",
    sources: ["c1-obj-3.0", "comptia-a-v15"],
    blocks: [
      {
        type: "callout",
        id: "C1-D4-O2-L1-why",
        callout: {
          kind: "why",
          title: "Why this matters",
          body: "'We moved to the cloud' is not a location. It is a contract about who owns hardware, who patches what, and whose tenants share the building. Tickets change when the answer changes.",
        },
      },
      {
        type: "reading",
        id: "C1-D4-O2-L1-r1",
        title: "Four deployment models",
        markdown: `**Cloud computing** is on-demand, network-accessible, pooled computing that you provision with a request (a portal, an API) instead of a purchase order for a server that arrives in six weeks. NIST's classic traits still match how A+ talks: on-demand self-service, broad network access, resource pooling, rapid elasticity, and measured service.

**Public cloud.** A provider (AWS, Microsoft Azure, Google Cloud, and others) owns the datacenters. Many customers share the platform. You rent capacity. You do not badge into the cage. Public does not mean "the data is on the internet unauthenticated." It means the *infrastructure* is off-premises and multi-customer.

**Private cloud.** One organization uses a cloud-style platform (self-service, pooling, metering) on infrastructure dedicated to that organization. It might sit in their datacenter or in a provider's cage that is not shared. "We have VMware in the basement" is virtualization. It becomes a private cloud when developers can provision from a catalog without a three-week hardware ticket.

**Hybrid cloud.** Workloads and identity span private and public. A company keeps a domain controller and sensitive databases on-premises and bursts VMs into Azure, or it extends Active Directory with a VPN or ExpressRoute/Direct Connect equivalent. Hybrid is a *design*, not a vendor SKU. The support implication: a login failure might be the VPN, the on-prem DC, or the cloud identity service. You isolate with evidence, not with brand loyalty.

**Community cloud.** Several organizations with a shared mission (state agencies, hospitals in a region, a research consortium) share a cloud that is not fully public. You will see this less often than public/private/hybrid, but it is still on the objective. The clue is "several orgs, same compliance community, shared platform."

None of these words tell you IaaS versus SaaS. Deployment model is *where and with whom*. Service model (next lesson) is *what layer you manage*.`,
      },
      {
        type: "diagram",
        id: "C1-D4-O2-L1-d1",
        component: "CloudModelsDiagram",
        title: "Deployment models",
        caption:
          "Public is shared provider metal. Private is dedicated. Hybrid joins them. Community is shared among a defined set of orgs.",
        notice:
          "Notice hybrid still has a network path you can break. 'The cloud is down' on a hybrid app is often the tunnel, not the region.",
        alt: "Four panels showing public, private, hybrid, and community cloud tenancy.",
      },
      {
        type: "knowledge-check",
        id: "C1-D4-O2-L1-kc1",
        questionIds: ["C1-D4-O2-HYBRID-Q001"],
      },
      {
        type: "reading",
        id: "C1-D4-O2-L1-r2",
        title: "Shared versus dedicated, and why tickets mention tenants",
        markdown: `**Multitenancy** means more than one customer (tenant) runs on the same physical hosts, with logical isolation. Public SaaS mail is multitenant. A **dedicated** host or instance is still in the provider's building but is reserved so your VMs are the only guests on that box — often for licensing or compliance, not because the public cloud is "unsafe."

**Shared resources** are the default: CPU, disk, and network are pooled. Noisy-neighbor problems are real: another tenant's burst can affect disk I/O on a crowded host. Providers mitigate with quotas and isolation; they do not promise you a silent building.

When a manager says "put it in a private cloud so it is secure," translate: private can still be misconfigured, unpatched, and reachable from the internet. Public can be well isolated. Security is controls plus shared-responsibility, not the marketing word "private."

**Availability** in cloud language is a region, an availability zone, and a service-level agreement (SLA). A+ depth: know that "two AZs" is how you survive one datacenter fire, and that an SLA is a contract — not a guarantee that your technician will never get a 2 a.m. call.

File sync (OneDrive, iCloud Drive, Google Drive, Dropbox-class tools) is often the first "cloud" a help desk actually supports. Sync is not a backup if the user deletes a file and the deletion replicates. Version history and recycle bins matter. Conflicts happen when two devices edit offline.`,
      },
      {
        type: "table",
        id: "C1-D4-O2-L1-t1",
        title: "Stem language to deployment model",
        headers: ["Stem clue", "Model", "Support implication"],
        rows: [
          ["Many customers, provider-owned DCs", "Public", "You open a provider ticket; you cannot walk to the rack"],
          ["Our datacenter, self-service catalog", "Private", "You still own power, cooling, and hardware"],
          ["On-prem database, cloud app, VPN", "Hybrid", "Trace identity and the tunnel before blaming 'Azure'"],
          ["Three hospitals, shared platform, same rules", "Community", "Change control may include the consortium"],
        ],
      },
      {
        type: "knowledge-check",
        id: "C1-D4-O2-L1-kc2",
        questionIds: ["C1-D4-O2-MULTITENANT-Q001"],
      },
      {
        type: "callout",
        id: "C1-D4-O2-L1-mistake",
        callout: {
          kind: "mistake",
          title: "Common mistake",
          body: "Calling a single ESXi host in a closet 'the public cloud' because someone vMotioned a VM. Public cloud is a provider platform with pooling and metering, not 'a virtual machine exists.'",
        },
      },
      {
        type: "summary",
        id: "C1-D4-O2-L1-sum",
        bullets: [
          "Public: provider metal, many customers. Private: dedicated to one org. Hybrid: both, plus a path. Community: shared by a defined group.",
          "Multitenancy is logical isolation on shared hardware.",
          "Hybrid outages are often identity or VPN, not 'the internet.'",
          "File sync replicates deletes; it is not automatically a backup.",
        ],
      },
    ],
  },
  {
    id: "C1-D4-O2-L2",
    objectiveId: "C1-D4-O2",
    slug: "iaas-paas-saas",
    title: "IaaS, PaaS, and SaaS",
    description:
      "Which layer you patch, which layer the provider patches, and how to match a business need to a service model.",
    estimatedMinutes: 22,
    conceptIds: ["C1-D4-O2-IAAS", "C1-D4-O2-PAAS", "C1-D4-O2-SAAS"],
    prerequisites: ["C1-D4-O2-L1"],
    lastVerified: "2026-09-01",
    sources: ["c1-obj-3.0", "comptia-a-v15"],
    blocks: [
      {
        type: "callout",
        id: "C1-D4-O2-L2-why",
        callout: {
          kind: "why",
          title: "Why this matters",
          body: "If you treat Microsoft 365 like a VM you can RDP into, you will spend a ticket looking for a hypervisor that is not yours. If you treat an IaaS VM like SaaS, you will skip Windows Update and call it the provider's problem.",
        },
      },
      {
        type: "reading",
        id: "C1-D4-O2-L2-r1",
        title: "Who manages which layer",
        markdown: `Service models answer "where does my responsibility stop?"

**Infrastructure as a Service (IaaS).** The provider rents you VMs, virtual networks, and storage. You choose the OS, patch it, join it to a domain, install the app, and configure the firewall inside the guest. Examples: an Azure Virtual Machine, an Amazon EC2 instance, a Google Compute Engine VM. Closest to "a server in someone else's rack." You still do backups of the guest unless you buy a backup service and test it.

**Platform as a Service (PaaS).** The provider manages the OS, runtime, and often the database engine. You deploy code or a packaged app. Examples: Azure App Service, Google App Engine, a managed Kubernetes *service* where you do not SSH into nodes all day, a managed SQL database. You do not RDP into PaaS to install a printer driver. If the stem says "developers push code, they do not manage Windows," it is PaaS.

**Software as a Service (SaaS).** The provider runs the application. You use a browser or a client, assign licenses, and configure the tenant (users, DLP, retention). Examples: Microsoft 365 mail and docs, Salesforce, Google Workspace, many ticketing portals. You do not patch IIS. You do reset MFA, hunt phishing, and manage sharing links.

A useful picture is a stack: facility → hardware → hypervisor → OS → runtime → application → data. IaaS hands you the stack from the OS up. PaaS hands you the app/data. SaaS hands you the data and settings.

**Shared versus dedicated** still applies inside a model. SaaS is usually multitenant. IaaS can be a shared VM host or a dedicated host SKU. PaaS is usually shared runtime with isolation boundaries.

Help-desk implication: password resets and license assignment are SaaS tickets. "The Windows VM will not boot after an update" is IaaS. "The app fails because the Python runtime changed" is often PaaS.`,
      },
      {
        type: "diagram",
        id: "C1-D4-O2-L2-d1",
        component: "CloudModelsDiagram",
        title: "IaaS, PaaS, SaaS responsibility",
        caption:
          "Shaded layers are the provider's. Unshaded layers are yours. The line moves up the stack as you go from IaaS to SaaS.",
        notice:
          "Notice data is never 'not your problem.' Even in SaaS you classify, retain, and avoid putting secrets in the wrong tenant.",
        alt: "Stacked responsibility chart for on-premises, IaaS, PaaS, and SaaS.",
      },
      {
        type: "knowledge-check",
        id: "C1-D4-O2-L2-kc1",
        questionIds: ["C1-D4-O2-IAAS-Q001"],
      },
      {
        type: "reading",
        id: "C1-D4-O2-L2-r2",
        title: "Matching the business need",
        markdown: `A company that needs **a Windows server they can group-policy** is asking for IaaS (or a private VM). A company that needs **email without Exchange servers** is asking for SaaS. A company that needs **a place to run a web app without patching Ubuntu** is asking for PaaS.

You can stack them. A SaaS product may run on the vendor's PaaS on someone else's IaaS. That is not your ticket's concern unless you are the vendor.

**Metered use** shows up as invoices for compute hours, storage GB-months, and **ingress/egress**. Ingress (data in) is often cheap or free. Egress (data out) is where surprise bills live — large backups pulled home, video, or a misconfigured NAT gateway. A+ wants you to recognize that cloud is metered, not to calculate a TCO spreadsheet.

**Elasticity** (next lesson) is why IaaS and PaaS beat a closet server for bursty load. SaaS elasticity is usually invisible: the vendor scales the app.

When a stem offers all three models, pick the one that matches the *layer the customer wants to stop managing*. Do not pick IaaS because it sounds more "IT." Over-managing is how you inherit patching you did not staff.`,
      },
      {
        type: "table",
        id: "C1-D4-O2-L2-t1",
        title: "Service model cheat sheet",
        headers: ["Model", "You manage", "Provider manages", "Typical A+ example"],
        rows: [
          ["IaaS", "OS, apps, data, guest firewall", "Hardware, hypervisor, facility", "Windows VM in Azure"],
          ["PaaS", "App code, data, some config", "OS, runtime, hardware", "App Service / managed database"],
          ["SaaS", "Users, licenses, data classification", "The application and below", "Microsoft 365 / Google Workspace"],
        ],
      },
      {
        type: "knowledge-check",
        id: "C1-D4-O2-L2-kc2",
        questionIds: ["C1-D4-O2-SAAS-Q001", "C1-D4-O2-PAAS-Q001"],
      },
      {
        type: "callout",
        id: "C1-D4-O2-L2-exam",
        callout: {
          kind: "exam",
          title: "Exam lens",
          body: "If the user only has a browser and a license portal, it is SaaS. If they RDP or SSH to a VM they built from an image, it is IaaS. If they git-push and the platform builds, it is PaaS.",
        },
      },
      {
        type: "summary",
        id: "C1-D4-O2-L2-sum",
        bullets: [
          "IaaS: you patch the OS. PaaS: you deploy the app. SaaS: you use the app.",
          "Shared-responsibility never hands your data classification to the provider.",
          "Egress is the metered surprise; ingress is usually cheap.",
          "Pick the model that matches the layer the customer should stop touching.",
        ],
      },
    ],
  },
  {
    id: "C1-D4-O2-L3",
    objectiveId: "C1-D4-O2",
    slug: "elasticity-metering-tenancy",
    title: "Elasticity, metering, and availability",
    description:
      "Scale out versus a bigger box, measured service, high availability, and the file-sync tickets that land on the help desk.",
    estimatedMinutes: 20,
    conceptIds: [
      "C1-D4-O2-ELASTIC",
      "C1-D4-O2-MULTITENANT",
      "C1-D4-O2-IAAS",
      "C1-D4-O2-SAAS",
    ],
    prerequisites: ["C1-D4-O2-L2"],
    lastVerified: "2026-09-01",
    sources: ["c1-obj-3.0", "comptia-a-v15"],
    blocks: [
      {
        type: "callout",
        id: "C1-D4-O2-L3-why",
        callout: {
          kind: "why",
          title: "Why this matters",
          body: "A closet server that is 'fine at 2 a.m. and dead at 9 a.m.' is a capacity problem. Cloud elasticity is how you buy 9 a.m. without paying for 2 a.m. If you size like a closet, you waste money or you drop the logon storm.",
        },
      },
      {
        type: "reading",
        id: "C1-D4-O2-L3-r1",
        title: "Elasticity is not a synonym for 'big'",
        markdown: `**Elasticity** is the ability to add or remove resources automatically (or quickly) as demand changes. **Scalability** is the ability to grow. People use them loosely. On the exam, elasticity is the *up and down* story: more web front ends at noon, fewer at night.

**Scale out (horizontal):** add more instances behind a load balancer. **Scale up (vertical):** give one instance a bigger SKU (more vCPU/RAM). Scale-out is how web tiers survive a sale. Scale-up is how a stubborn single-box database gets through a quarter. Neither is free; both are metered.

**Metered utilization** means you pay for what you consume: vCPU-hours, GB-months, millions of database requests, **egress** GB. A test VM left running over a holiday is a real invoice. A+ technicians should shut down lab VMs and understand that snapshots and unattached disks still bill.

**Availability** is the percentage of time a service is reachable. Providers publish SLAs (for example, 99.9%). High availability uses redundant instances and zones so one host failure is not an outage. Disaster recovery is a separate conversation (another region, backups, RTO/RPO) that Core 2 operational procedures will pick up. Here, know that "two instances in two zones" is an availability design, and "one IaaS VM with no backup" is a hope.

**Rapid elasticity** on a stem means the platform adds capacity without a hardware PO. If the company must wait for a server to ship, that is not cloud elasticity even if the server will run VMs.

File **synchronization** (OneDrive, iCloud, Drive) is elasticity of *data location*: the file appears on several devices. Teach users: the Recycle Bin / version history is how you undo a bad save; "I overwrote it" is not a datacenter outage. Known Folder Move and similar tools change where Desktop/Documents live — a "missing Documents folder" after an Intune enrollment is often sync, not a deleted partition.`,
      },
      {
        type: "diagram",
        id: "C1-D4-O2-L3-d1",
        component: "CloudModelsDiagram",
        title: "Elastic scale versus a fixed host",
        caption:
          "Demand curve rises at 09:00; instance count follows. A single closet server stays flat and then saturates.",
        notice:
          "Notice scale-out needs a load balancer and a stateless enough app. Doubling RAM on one VM is scale-up, not magic elasticity.",
        alt: "Graph of demand versus instance count for an elastic cloud service compared with a single server.",
      },
      {
        type: "knowledge-check",
        id: "C1-D4-O2-L3-kc1",
        questionIds: ["C1-D4-O2-ELASTIC-Q001"],
      },
      {
        type: "reading",
        id: "C1-D4-O2-L3-r2",
        title: "Multitenancy, noisy neighbors, and shared responsibility",
        markdown: `On a **multitenant** platform, isolation is logical: hypervisors, containers, or application tenancy. Your job is to use the isolation the provider offers — resource locks, NSGs/security groups, private endpoints, and not sharing admin credentials across tenants.

A **noisy neighbor** is another tenant (or another department on a private cloud) saturating a shared disk or NIC. Dedicated hosts and reserved capacity are the expensive answers. Quotas and throttling are the usual answers.

Shared responsibility, A+ version:

- Provider: physical security, hardware, hypervisor (IaaS), OS/runtime (PaaS), application (SaaS).
- You: identity, endpoint, data classification, guest OS (IaaS), application code (PaaS), sharing settings (SaaS).

If a SaaS tenant is wide-open because sharing was set to "anyone with the link," that is not an Azure outage. If an IaaS VM is on the public internet with RDP open to \`0.0.0.0/0\`, that is not "the cloud being insecure." It is a firewall you own.

**Ingress** is data entering the cloud. **Egress** is data leaving. Backing up a cloud file share to an on-premises NAS is an egress event. Design it on purpose.`,
      },
      {
        type: "table",
        id: "C1-D4-O2-L3-t1",
        title: "Word on the stem → meaning",
        headers: ["Word", "Means", "Not the same as"],
        rows: [
          ["Elasticity", "Capacity moves up and down with demand", "Buying one huge server"],
          ["Metered", "You pay for consumption", "Unlimited for a flat fee (unless the SKU says so)"],
          ["Availability", "The service is reachable", "Your data cannot be deleted"],
          ["Multitenant", "Logical isolation on shared metal", "Your data is public"],
          ["Egress", "Data leaving the cloud", "CPU time"],
        ],
      },
      {
        type: "callout",
        id: "C1-D4-O2-L3-tech",
        callout: {
          kind: "technician",
          title: "Technician lens",
          body: "Before you tell finance 'the cloud is down,' open the provider status page and your VPN metrics. Before you tell a user 'OneDrive ate the file,' check version history and whether they were offline.",
        },
      },
      {
        type: "knowledge-check",
        id: "C1-D4-O2-L3-kc2",
        questionIds: ["C1-D4-O2-ELASTIC-Q002", "C1-D4-O2-MULTITENANT-Q002"],
      },
      {
        type: "summary",
        id: "C1-D4-O2-L3-sum",
        bullets: [
          "Elasticity adds and removes capacity; scale-out versus scale-up are different knobs.",
          "Metered bills include idle VMs, disks, and egress.",
          "Availability uses redundancy and SLAs; it is not a backup.",
          "You still own identity, guest OS (IaaS), and sharing settings (SaaS).",
        ],
      },
      {
        type: "checkpoint",
        id: "C1-D4-O2-L3-cp",
        questionIds: [
          "C1-D4-O2-IAAS-Q002",
          "C1-D4-O2-PAAS-Q002",
          "C1-D4-O2-SAAS-Q002",
          "C1-D4-O2-HYBRID-Q002",
          "C1-D4-O2-ELASTIC-Q003",
          "C1-D4-O2-MULTITENANT-Q003",
          "C1-D4-O2-SAAS-Q006",
          "C1-D4-O2-IAAS-Q007",
        ],
      },
    ],
  },
];
