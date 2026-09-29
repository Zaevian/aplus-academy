import type { Lesson } from "../../schema";

export const C1_D2_LESSONS: Lesson[] = [
  {
    id: "C1-D2-O1-L1",
    objectiveId: "C1-D2-O1",
    slug: "tcp-udp-first-principles",
    title: "TCP versus UDP: why a port exists",
    description:
      "How a packet is addressed, why TCP is connection-oriented, and why UDP stays connectionless — before any port number is memorized.",
    estimatedMinutes: 22,
    conceptIds: ["C1-D2-O1-TCP", "C1-D2-O1-UDP", "C1-D2-O1-PORTS"],
    prerequisites: [],
    lastVerified: "2026-09-01",
    sources: ["c1-obj-3.0", "rfc791"],
    blocks: [
      {
        type: "callout",
        id: "C1-D2-O1-L1-why",
        callout: {
          kind: "why",
          title: "Why this matters",
          body: "A blocked port is not a mysterious 'network is down' event. It is a specific service that never received its segment. If you cannot say whether that service needed a handshake, you will open the wrong hole or restart the wrong daemon.",
        },
      },
      {
        type: "reading",
        id: "C1-D2-O1-L1-r1",
        title: "Addresses on addresses",
        markdown: `A packet on an IPv4 or IPv6 network already has a **source IP** and a **destination IP**. That is enough to reach a host. It is not enough to reach a program. A Windows PC, a Linux mail server, and a phone all run many listeners at once: a browser, a file share, a name resolver, maybe Remote Desktop. The operating system needs a second number that means "this conversation belongs to that service."

That number is a **port**. Ports live in the **transport** header, not in the IP header. The pair **IP + port** is a socket. **TCP** (Transmission Control Protocol) and **UDP** (User Datagram Protocol) are the two transport protocols A+ expects you to reason about. Both use 16-bit port numbers, so the range is **0–65535**. Ports **0–1023** are the well-known system ports you will memorize from the official 2.1 list. Ports **1024–49151** are registered. Ports **49152–65535** are typically ephemeral — the client picks one for the return path of a conversation.

The exam is not asking you to recite IANA's entire registry. It is asking you to explain **why a port exists**, **which transport that service uses**, and **which job broke** when a firewall dropped that port. "The internet is down" is not a diagnosis. "TCP 443 never completes a handshake to the proxy" is.

Think of IP as the street address of a building and the port as the suite number. Delivery to 192.168.1.10 with no port is like dumping mail in the lobby and hoping the right tenant grabs it. Delivery to 192.168.1.10:445 is "the file-share service on that host." The same host can listen on 80, 443, and 3389 at the same time without mixing those conversations, because the port numbers differ.

Clients almost never use well-known ports as their **source**. Your browser connecting to a web server uses destination TCP 443 and a random high source port. Replies come back to that high port. If you read a firewall log, the well-known number is usually the **server** side of the conversation, not the laptop.

A **listening service** is a process bound to a port in a wait state. On Windows you will later see this with **netstat**; on Linux with **ss**. A+ Core 1 does not require you to master those commands — that is Core 2 CLI — but you must already understand what they would show: a socket, a transport, a state (for TCP), and a process. If nothing is listening, opening the port on the firewall does nothing. If something is listening on the wrong port, the client that was told "use 3389" still fails.`,
      },
      {
        type: "diagram",
        id: "C1-D2-O1-L1-d1",
        component: "PacketFlowDiagram",
        title: "From application to wire",
        caption:
          "Application data is wrapped in a transport header (TCP or UDP, with ports), then an IP header (addresses), then a frame for the local link.",
        notice:
          "Notice the port lives with TCP/UDP, not with the IP address. Blocking TCP 443 does not block UDP 443 unless the firewall rule says so.",
        alt: "Layered packet diagram showing application payload, TCP or UDP ports, IP addresses, and Ethernet frame.",
      },
      {
        type: "knowledge-check",
        id: "C1-D2-O1-L1-kc1",
        questionIds: ["C1-D2-O1-TCP-Q001"],
      },
      {
        type: "reading",
        id: "C1-D2-O1-L1-r2",
        title: "Reliability is a choice, not a virtue",
        markdown: `**TCP** is connection-oriented. Before useful data, the two hosts complete a **three-way handshake**: SYN, SYN-ACK, ACK. After that, TCP numbers bytes, acknowledges them, retransmits losses, and (usually) delivers a stream in order. Closing is a dance of FINs. The cost is latency and state: every conversation consumes memory on both ends and on stateful firewalls.

That is why file copies, web pages, mail, remote shells, and Remote Desktop use TCP. A missing packet in a Word document is a corrupted file. TCP would rather wait than guess.

**UDP** is connectionless. There is no handshake and no built-in retransmission. The sender emits a datagram and hopes. The application — or a protocol layered on UDP — may add its own reliability. **DHCP** (Dynamic Host Configuration Protocol) uses UDP because a host that does not yet have an IP address cannot conveniently hold a TCP conversation, and the four-packet DORA exchange is short. **DNS** (Domain Name System) queries are typically UDP because a 100-byte question should not pay for a handshake; large responses and zone transfers fall back to TCP on the same port 53.

Real-time voice and video often prefer UDP because a late packet is worse than a lost one. You cannot un-stutter a phone call by retransmitting last Tuesday's syllable. A+ will not ask you to design VoIP QoS, but it will expect you not to "fix" a DHCP failure by "allowing TCP 67."

Do not memorize "TCP = good, UDP = unreliable therefore bad." Memorize **what the application cannot live without**. If the job needs a guaranteed byte stream, it is TCP. If the job needs a cheap request/reply or can tolerate loss, it is UDP. DNS is the classic "both" protocol: UDP for ordinary queries, TCP when the answer is large or a zone is transferred.

Firewall implications follow the transport. A rule that says "allow 53" without saying TCP or UDP is sloppy. A technician who blocks UDP 53 "to stop DNS tunnels" and then wonders why name resolution died was not thinking about first principles. Stateful inspection of TCP can use handshake state; UDP "state" is a timer guessing that replies might still arrive.`,
      },
      {
        type: "diagram",
        id: "C1-D2-O1-L1-d2",
        component: "TcpUdpDiagram",
        title: "Handshake versus datagram",
        caption:
          "TCP spends a round trip on SYN/SYN-ACK/ACK before payload. UDP sends the payload immediately and does not notice loss unless the application does.",
        notice:
          "Notice DHCP Discover is UDP from port 68 to 67 and is broadcast — there is no TCP session to 'reset' when a lease fails.",
        alt: "Side-by-side of a TCP three-way handshake and a UDP one-shot datagram with ports labeled.",
      },
      {
        type: "table",
        id: "C1-D2-O1-L1-t1",
        title: "TCP versus UDP at A+ depth",
        headers: ["Trait", "TCP", "UDP"],
        rows: [
          ["Connection", "Handshake, state, orderly close", "No handshake, no connection state"],
          ["Reliability", "Acks, retransmission, ordering", "Best-effort; app may add its own"],
          ["Overhead", "Higher (headers + state)", "Lower"],
          ["Typical A+ uses", "HTTP/S, SSH, SMTP, RDP, SMB, FTP", "DHCP; DNS queries"],
          ["Firewall view", "Stateful session is obvious", "Allow replies by timeout, not by handshake"],
        ],
        caption:
          "If a stem says 'connection-oriented' it is TCP. If it says 'no handshake' or 'lease from a server that the client cannot yet address with a session,' think UDP.",
      },
      {
        type: "knowledge-check",
        id: "C1-D2-O1-L1-kc2",
        questionIds: ["C1-D2-O1-UDP-Q001"],
      },
      {
        type: "callout",
        id: "C1-D2-O1-L1-exam",
        callout: {
          kind: "exam",
          title: "Exam lens",
          body: "Stems that mention 'three-way handshake,' 'guaranteed delivery,' or 'connection-oriented' are TCP. Stems that mention DHCP leases or 'no session setup' are UDP. DNS is the trap: queries are usually UDP 53; zone transfers use TCP 53.",
        },
      },
      {
        type: "callout",
        id: "C1-D2-O1-L1-mistake",
        callout: {
          kind: "mistake",
          title: "Common mistake",
          body: "Treating a port number as a protocol. Port 53 is DNS, but DNS is not 'a TCP service' or 'a UDP service' in the abstract — it uses both. The official list will say TCP/UDP where that is true.",
        },
      },
      {
        type: "summary",
        id: "C1-D2-O1-L1-sum",
        bullets: [
          "IP finds the host; the transport port finds the service.",
          "TCP is connection-oriented with a handshake, acks, and retransmission.",
          "UDP is connectionless; DHCP uses it, and DNS queries usually do too.",
          "Well-known ports identify the server side of a conversation.",
        ],
      },
    ],
  },
  {
    id: "C1-D2-O1-L2",
    objectiveId: "C1-D2-O1",
    slug: "official-port-map-file-mail-web",
    title: "Official 2.1 ports: file, shell, mail, name, and web",
    description:
      "The CompTIA 220-1201 v3.0 port list for FTP, SSH, Telnet, SMTP, DNS, DHCP, HTTP, POP3, and IMAP — and what a block of each actually breaks.",
    estimatedMinutes: 24,
    conceptIds: [
      "C1-D2-O1-PORTS",
      "C1-D2-O1-FTP",
      "C1-D2-O1-SSH",
      "C1-D2-O1-DNS",
      "C1-D2-O1-DHCP",
      "C1-D2-O1-HTTP",
    ],
    prerequisites: ["C1-D2-O1-L1"],
    lastVerified: "2026-09-01",
    sources: ["c1-obj-3.0"],
    blocks: [
      {
        type: "callout",
        id: "C1-D2-O1-L2-why",
        callout: {
          kind: "why",
          title: "Why this matters",
          body: "Help-desk tickets say 'email is down' or 'the website won't load.' The exam maps those sentences onto one number from a short official list. Extra ports you learned on a blog are not on V15 objective 2.1.",
        },
      },
      {
        type: "reading",
        id: "C1-D2-O1-L2-r1",
        title: "Only the listed numbers",
        markdown: `Objective 2.1 is a closed list. You will be tested on **FTP 20/21**, **SSH 22**, **Telnet 23**, **SMTP 25**, **DNS 53**, **DHCP 67/68**, **HTTP 80**, **POP3 110**, **IMAP 143**, plus the directory/file/remote set in the next lesson (**NetBIOS/NetBT 137–139**, **LDAP 389**, **HTTPS 443**, **SMB/CIFS 445**, **RDP 3389**). That is the entire official set. Do not spend study time on 587, 993, 995, 636, or 161 unless a later security objective mentions them as context. This academy will mention a few of those only to stop you from confusing them with the tested number.

**FTP** (File Transfer Protocol) is TCP. **21** is the control channel (commands, user, password). **20** is the classic active-mode data channel. Production environments prefer SFTP (which rides on SSH 22) or FTPS, because FTP is cleartext. A+ still wants the numbers so you can recognize an old transfer server and so you do not confuse FTP with SMB.

**SSH** (Secure Shell) is TCP **22**. Encrypted remote terminal, and also SCP/SFTP file copy. When a stem says "replace Telnet," the answer is SSH on 22, not HTTPS.

**Telnet** is TCP **23**. Unencrypted remote terminal. You do not enable it. You recognize it as a finding: a switch still offering a cleartext admin path.

**SMTP** (Simple Mail Transfer Protocol) is TCP **25**. It **sends** mail between servers. Users who cannot *send* while they can still *receive* are in SMTP territory, not POP/IMAP. Submission in the real world often uses 587 with TLS; the A+ number remains 25.

**DNS** is **53**, UDP for ordinary queries and TCP for large answers and zone transfers. If names fail but **ping by IP** works, think DNS — not "the NIC is dead."

**DHCP** is UDP **67** (server) and **68** (client). A workstation with 169.254.x.x is shouting that 67/68 never completed, which you will treat in objective 2.6 as APIPA.

**HTTP** is TCP **80**, cleartext web. **HTTPS** (next lesson) is TCP **443**. Port 80 still exists for redirects and some internal apps.

**POP3** is TCP **110**: download mail, often delete from the server. **IMAP** is TCP **143**: leave mail on the server so phones and laptops stay in sync. "Works on the phone but the old PC 'stole' the messages" is a POP3 story.`,
      },
      {
        type: "diagram",
        id: "C1-D2-O1-L2-d1",
        component: "PortMapDiagram",
        title: "Official 2.1 port map",
        caption:
          "Every number on this map is from CompTIA's 220-1201 v3.0 list. If a number is not here, it is not a 2.1 fact.",
        notice:
          "Notice 20/21 are a pair, 67/68 are a pair, and 53 is the only name service on the list. Do not add SNMP or TFTP to your flash cards for this objective.",
        alt: "Map of official A+ ports from 20/21 through 3389 with protocol names and TCP or UDP.",
      },
      {
        type: "knowledge-check",
        id: "C1-D2-O1-L2-kc1",
        questionIds: ["C1-D2-O1-FTP-Q001"],
      },
      {
        type: "reading",
        id: "C1-D2-O1-L2-r2",
        title: "What a block actually breaks",
        markdown: `Troubleshoot from the user's sentence to the port, then confirm with a test that matches the transport.

A new firewall "hardened" overnight is the usual crime scene. If **websites fail** but **Outlook still sends**, HTTP/HTTPS are the suspects, not SMTP. If **send fails** with a timeout to smtp.company.example, look at **TCP 25** (or whatever submission the client is actually configured to use — but the exam's number is 25). If **receive fails** on a single-device mailbox that historically downloaded everything, **POP3 110**. If **three devices disagree** about read/unread, the account should have been **IMAP 143** all along.

**SSH 22** failing with "connection refused" means nothing is listening — the sshd service is down or bound to another port. "Timed out" means a filter dropped you. Telnet 23 succeeding on a production switch is not a success; it is an audit finding.

**DNS 53**: users describe this as "the internet is down" because they type names. Your first split is **ping a public IP** (8.8.8.8 is a common field habit) versus **ping a name**. IP works, name fails: resolver or port 53. Both fail: path, DHCP, or NIC.

**DHCP 67/68**: multiple users with APIPA at once means the server, relay, or VLAN helper is dead — not that every NIC failed independently. One user with APIPA is a local cable, a bad client, or a switch port in the wrong VLAN (objective 2.4).

FTP is two ports. If login works but directory listings hang, control (21) is alive and data (20, or a passive range not on the A+ list) is not. Do not "fix FTP" by opening SMB 445 unless the user actually needed a Windows share.

Write the mapping on muscle memory: **cleartext remote shell = 23**, **encrypted remote shell = 22**, **cleartext web = 80**, **send mail = 25**, **download mail = 110**, **sync mail = 143**, **names = 53**, **leases = 67/68**. The next lesson adds file sharing, directory, and Remote Desktop.`,
      },
      {
        type: "table",
        id: "C1-D2-O1-L2-t1",
        title: "File, shell, mail, name, web",
        headers: ["Port", "Protocol", "Transport", "What breaks when it is blocked"],
        rows: [
          ["20/21", "FTP", "TCP", "Legacy file transfer; 21 control, 20 active data"],
          ["22", "SSH", "TCP", "Encrypted admin shell and SFTP/SCP"],
          ["23", "Telnet", "TCP", "Cleartext admin shell — a finding, not a goal"],
          ["25", "SMTP", "TCP", "Sending mail between servers"],
          ["53", "DNS", "TCP/UDP", "Name resolution (UDP query; TCP for large/zone)"],
          ["67/68", "DHCP", "UDP", "Address leases; server 67, client 68"],
          ["80", "HTTP", "TCP", "Cleartext web"],
          ["110", "POP3", "TCP", "Download mail, often off the server"],
          ["143", "IMAP", "TCP", "Mail left on server for many devices"],
        ],
        caption: "Secure variants (FTPS, IMAPS, POP3S, SMTPS) exist in production. They are not the 2.1 numbers.",
      },
      {
        type: "knowledge-check",
        id: "C1-D2-O1-L2-kc2",
        questionIds: ["C1-D2-O1-DNS-Q001", "C1-D2-O1-DHCP-Q001"],
      },
      {
        type: "callout",
        id: "C1-D2-O1-L2-tech",
        callout: {
          kind: "technician",
          title: "Technician lens",
          body: "When a user says 'email is down,' ask send versus receive, and one device versus all devices. Send is SMTP. Receive-and-delete is POP3. Receive-and-sync is IMAP. All devices failing to resolve names is DNS, not Outlook.",
        },
      },
      {
        type: "summary",
        id: "C1-D2-O1-L2-sum",
        bullets: [
          "Study only the official 2.1 list; extra ports are not this objective.",
          "FTP 20/21, SSH 22, Telnet 23, SMTP 25, DNS 53, DHCP 67/68, HTTP 80, POP3 110, IMAP 143.",
          "DNS 53 is TCP and UDP. DHCP is UDP only. The rest in this lesson are TCP.",
          "Map the user's sentence (send, receive, names, lease, web, shell) onto one row.",
        ],
      },
    ],
  },
  {
    id: "C1-D2-O1-L3",
    objectiveId: "C1-D2-O1",
    slug: "directory-files-rdp-ports",
    title: "Official 2.1 ports: directory, Windows files, and Remote Desktop",
    description:
      "NetBIOS 137–139, LDAP 389, HTTPS 443, SMB 445, and RDP 3389 — what they do on a LAN and why exposing them to the internet is a classic incident.",
    estimatedMinutes: 20,
    conceptIds: ["C1-D2-O1-PORTS", "C1-D2-O1-HTTP", "C1-D2-O1-SMB", "C1-D2-O1-RDP"],
    prerequisites: ["C1-D2-O1-L2"],
    lastVerified: "2026-09-01",
    sources: ["c1-obj-3.0", "ms-windows"],
    blocks: [
      {
        type: "callout",
        id: "C1-D2-O1-L3-why",
        callout: {
          kind: "why",
          title: "Why this matters",
          body: "Windows file shares, directory logons, and Remote Desktop are the ports attackers scan first. You must know them well enough to keep them on the LAN and still open them when a user cannot map a drive.",
        },
      },
      {
        type: "reading",
        id: "C1-D2-O1-L3-r1",
        title: "The Windows and directory set",
        markdown: `**HTTPS** is HTTP over TLS on TCP **443**. Certificates live here. A browser warning is a troubleshooting clue: clock skew, a name mismatch, an intercepting proxy, or an actually hostile site. Users will say "the internet is broken" when only 443 is intercepted. HTTP 80 may still load a redirect page.

**LDAP** (Lightweight Directory Access Protocol) is TCP **389**. Directories — including **Active Directory** — answer queries for users, groups, and computers on this port. LDAPS in production is often 636; that number is not on the 2.1 list. If logons to domain resources fail while local logons work, directory reachability (389 among other AD ports) is in play. A+ will not make you recite every AD port; it will expect you to know LDAP is 389 and that it is a directory, not a file share.

**SMB/CIFS** (Server Message Block / Common Internet File System) is TCP **445**. This is how Windows maps drives, talks to many NAS devices, and shares printers. **Exposing 445 to the internet** is how ransomware historically walked in. On a LAN, 445 is expected. If a user cannot open \\\\fileserver\\share, 445 (and name resolution, and permissions) are the first suspects.

**NetBIOS/NetBT** (NetBIOS over TCP/IP) uses **137–139**. These are legacy name and session ports. Modern Windows prefers SMB on 445 without NetBIOS. You still see 137–139 on older LANs, on "network neighborhood" remnants, and in scans of neglected servers. Do not "open 137–139 to the world" as a fix for a mapped drive. Prefer 445 on the LAN and a VPN for remote users.

**RDP** (Remote Desktop Protocol) is TCP **3389**. It presents a Windows desktop to a remote client. Direct 3389 on the public internet is a brute-force magnet. The support pattern is: RDP **behind a VPN**, with Network Level Authentication, account lockout, and (better) a jump host. When a stem says a user cannot remote in, 3389 may be filtered, the service disabled, or the edition of Windows not a Remote Desktop *host* (Home is a client, not a host — that detail is Core 2 editions, but it bites technicians now).

These five rows plus the previous lesson are the whole of 2.1. If a practice question asks for NTP 123 or SNMP 161 as a 2.1 port item, the question is written to an older or broader list than V15.`,
      },
      {
        type: "table",
        id: "C1-D2-O1-L3-t1",
        title: "Directory, files, web-secure, remote GUI",
        headers: ["Port", "Protocol", "Transport", "LAN role / internet risk"],
        rows: [
          ["137–139", "NetBIOS/NetBT", "TCP/UDP", "Legacy Windows names/sessions; do not expose"],
          ["389", "LDAP", "TCP", "Directory queries; AD depends on it"],
          ["443", "HTTPS", "TCP", "TLS web; certificate warnings are data"],
          ["445", "SMB/CIFS", "TCP", "Windows files/printers; internet exposure is an incident"],
          ["3389", "RDP", "TCP", "Remote desktop; put it behind VPN/NLA"],
        ],
        caption: "Same rule as lesson 2: if it is not in this table or the previous one, it is not a 2.1 port.",
      },
      {
        type: "knowledge-check",
        id: "C1-D2-O1-L3-kc1",
        questionIds: ["C1-D2-O1-SMB-Q001"],
      },
      {
        type: "reading",
        id: "C1-D2-O1-L3-r2",
        title: "FIRST questions: filter, listener, or credential",
        markdown: `When a mapped drive fails, do not start by recreating the share. FIRST confirm the path: can the client **resolve** the server name (DNS 53), **reach** the host (ping or a TCP test to 445), and **authenticate**? A timeout is a path or filter. "Access denied" is a permission or account problem — the port already worked. "Network path not found" is names or 445 down.

When RDP fails, the same split applies. "Remote Desktop can't connect to the remote computer" with a long delay is often **3389 filtered**. Instant "connection refused" is often **TermService not listening**. A credential prompt that then fails is not a port problem.

HTTPS failures split three ways: no TCP 443 (filter or down site), TLS warning (certificate/clock/proxy), or application error after a padlock (the web app, not the port).

LDAP 389 blocked between a workstation and a domain controller looks like "cannot log on to the domain" or "no logon servers available." Local cached logon may still work. That is why a laptop on the wrong VLAN "works at home" (cached) and fails to change a password (needs the directory).

NetBIOS 137–139 appearing in a scan of a file server is not automatically the reason a modern Windows 11 client cannot map a drive. Check 445 first. If you are supporting a 2008-era appliance that still wants NetBIOS names, that is the exception you document, not the default you teach.

Exam stems love **BEST** on this set: the BEST way to let a home user reach a share is a **VPN**, then SMB on the LAN — not a firewall hole for 445 or 3389 to the internet.`,
      },
      {
        type: "knowledge-check",
        id: "C1-D2-O1-L3-kc2",
        questionIds: ["C1-D2-O1-RDP-Q001"],
      },
      {
        type: "callout",
        id: "C1-D2-O1-L3-exam",
        callout: {
          kind: "exam",
          title: "Exam lens",
          body: "445 is SMB. 3389 is RDP. 389 is LDAP. 443 is HTTPS. 137–139 is legacy NetBIOS. Do not swap SMB and RDP; they are the most common number mix-up after 80/443.",
        },
      },
      {
        type: "callout",
        id: "C1-D2-O1-L3-mistake",
        callout: {
          kind: "mistake",
          title: "Common mistake",
          body: "Opening 445 or 3389 on the WAN side of a SOHO router because 'the user needs files from home.' That is how you get an incident. The 2.4/2.6 answer is a VPN, then use the LAN ports.",
        },
      },
      {
        type: "lab",
        id: "C1-D2-O1-L3-lab",
        labId: "C1-D2-O1-PORTS-LAB",
        title: "Official 2.1 ports drill",
        prompt:
          "Match each ticket to the official port: send mail, names-fail, APIPA floor, encrypted shell, Windows share, and RDP timeout. Leave Telnet, HTTP, and FTP unused.",
      },
      {
        type: "checkpoint",
        id: "C1-D2-O1-L3-cp",
        questionIds: [
          "C1-D2-O1-TCP-Q002",
          "C1-D2-O1-UDP-Q002",
          "C1-D2-O1-PORTS-Q002",
          "C1-D2-O1-FTP-Q002",
          "C1-D2-O1-SSH-Q002",
          "C1-D2-O1-HTTP-Q002",
          "C1-D2-O1-SMB-Q002",
          "C1-D2-O1-RDP-Q002",
        ],
      },
      {
        type: "summary",
        id: "C1-D2-O1-L3-sum",
        bullets: [
          "HTTPS 443, LDAP 389, SMB 445, RDP 3389, NetBIOS 137–139 complete the official 2.1 list.",
          "Timeout versus connection-refused versus access-denied tells you filter versus listener versus account.",
          "Do not publish 445 or 3389 to the internet; use a VPN.",
          "If a port is not on the official list, it is not a 2.1 answer.",
        ],
      },
    ],
  },
  {
    id: "C1-D2-O2-L1",
    objectiveId: "C1-D2-O2",
    slug: "wireless-bands-80211",
    title: "2.4, 5, and 6 GHz, 802.11, and short-range radios",
    description:
      "Choose a band, channel, and 802.11 generation for range versus throughput, then place Bluetooth, NFC, and RFID in the right job.",
    estimatedMinutes: 24,
    conceptIds: [
      "C1-D2-O2-24GHZ",
      "C1-D2-O2-5GHZ",
      "C1-D2-O2-6GHZ",
      "C1-D2-O2-80211",
      "C1-D2-O2-CHANNEL",
      "C1-D2-O2-RFID",
    ],
    prerequisites: ["C1-D2-O1-L1"],
    lastVerified: "2026-09-01",
    sources: ["c1-obj-3.0", "wifi-alliance"],
    blocks: [
      {
        type: "callout",
        id: "C1-D2-O2-L1-why",
        callout: {
          kind: "why",
          title: "Why this matters",
          body: "A user who 'needs more bars' on 5 GHz may actually need 2.4 GHz for range — or 6 GHz for a clean office. Picking the wrong band looks like a bad access point when the physics were predictable.",
        },
      },
      {
        type: "reading",
        id: "C1-D2-O2-L1-r1",
        title: "Frequency is range, congestion, and wall loss",
        markdown: `Wi-Fi is radio. Lower frequency travels farther and punches through drywall better. Higher frequency offers wider channels and a less crowded neighborhood, then dies at the next wall. That is the whole 2.4 / 5 / 6 GHz story at A+ depth.

**2.4 GHz** is the oldest consumer band. It has only **three non-overlapping 20 MHz channels** in the U.S. plan that technicians actually use: **1, 6, and 11**. Everything else overlaps those. Microwaves, Bluetooth, baby monitors, and the neighbor's ISP gateway all live here. Throughput is modest. Coverage is the reason you still enable it: a warehouse, a brick house, a handheld scanner that never got a 5 GHz radio.

**5 GHz** has many more channels, optional **DFS** (Dynamic Frequency Selection) channels that must yield to radar, and shorter range. This is the default for laptops in an office. Wider channels (40/80/160 MHz) buy speed and spend spectrum — two APs both on a fat 80 MHz block will collide if they can hear each other.

**6 GHz** arrived with **Wi-Fi 6E**. It is not "5 GHz but bigger numbers." Client and AP both need 6 GHz radios. The band is much cleaner because older 802.11a/n/ac devices cannot speak it. Range is shorter still; walls hurt more. Indoor low-power rules are common. When a stem mentions a new conference room with Wi-Fi 6E laptops and an interference-heavy 2.4 GHz floor, 6 GHz is the BEST band.

**Bluetooth** is a 2.4 GHz WPAN technology for headsets, mice, and speakers. It is not Wi-Fi and it does not use 802.11 channels, but it can contribute to 2.4 GHz noise. **NFC** (Near Field Communication) is centimeters, used for tap-to-pair and payments. **RFID** (Radio-Frequency Identification) is tags and badges; it is not a LAN. Do not "fix RFID door fails" by changing Wi-Fi channels unless the stem actually shows a 2.4 GHz clash with a poorly designed reader — the usual RFID issue is a dead badge or a reader, not SSID selection.

Regulatory domain matters. Channel 12/13 on 2.4 GHz may be legal in some countries and not in the U.S. A traveling AP set to "world" can surprise you. For the exam, remember **1/6/11** as the 2.4 GHz non-overlap set you deploy on purpose.`,
      },
      {
        type: "video",
        id: "C1-D2-O2-L1-see1",
        assetId: "wifi-band-reach",
        title: "SEE: 2.4, 5, and 6 GHz reach",
        caption: "6 GHz needs Wi-Fi 6E radios. No fake dBm heatmap.",
        transcript:
          "2.4 GHz travels farthest and collides more. 5 GHz is shorter and cleaner. 6 GHz is smallest and needs Wi-Fi 6E radios on both the AP and the client.",
      },
      {
        type: "diagram",
        id: "C1-D2-O2-L1-d1",
        component: "SpectrumDiagram",
        title: "2.4, 5, and 6 GHz compared",
        caption:
          "Same transmit power, three different personalities: 2.4 GHz for reach and congestion, 5 GHz for everyday capacity, 6 GHz for clean short-range capacity on 6E clients.",
        notice:
          "Notice 6 GHz does nothing for a Wi-Fi 5 laptop. The client radio has to exist. Notice Bluetooth sharing 2.4 GHz with 802.11b/g/n.",
        alt: "Three spectrum bars labeled 2.4 GHz, 5 GHz, and 6 GHz with range, congestion, and client-requirement notes.",
      },
      {
        type: "knowledge-check",
        id: "C1-D2-O2-L1-kc1",
        questionIds: ["C1-D2-O2-24GHZ-Q001"],
      },
      {
        type: "reading",
        id: "C1-D2-O2-L1-r2",
        title: "802.11 generations and channels",
        markdown: `Match the letter to the band and a rough capability. You do not need MCS tables.

- **802.11a** — 5 GHz, up to 54 Mbps, OFDM. No 2.4 GHz.
- **802.11b** — 2.4 GHz, up to 11 Mbps, the interference magnet of the early 2000s.
- **802.11g** — 2.4 GHz, up to 54 Mbps.
- **802.11n** (Wi-Fi 4) — 2.4 and 5 GHz, MIMO, bonding.
- **802.11ac** (Wi-Fi 5) — **5 GHz only** for its distinctive speed; wave-2 MU-MIMO. A dual-band AP still serves 2.4 GHz with older PHYs.
- **802.11ax** (Wi-Fi 6) — 2.4 and 5 GHz, OFDMA, better dense-client behavior. **Wi-Fi 6E** is 802.11ax plus **6 GHz**.

When a stem says "only 5 GHz," 802.11a or 802.11ac are the classic answers. When it says "longest range through walls," 2.4 GHz (b/g/n/ax). When it says "new 6 GHz SSID," you need 6E-capable AP and clients.

**Channel width** is a trade. 20 MHz on 2.4 GHz is how you keep 1/6/11 actually non-overlapping. 80 MHz on 5 GHz is fine in a house with one AP and a disaster in a stack of apartments if every gateway picked the same block. **Co-channel interference** is two APs on the same channel sharing airtime. **Adjacent-channel interference** is overlapping widths — worse than a clean reuse of 1/6/11.

Place APs so coverage overlaps for roaming but **channel assignments do not**. That is a heat-map job: walk with a **Wi-Fi analyzer** (objective 2.8), do not guess from the office doorway. Disable auto-channel on a controller that keeps flipping during a meeting. For a single SOHO AP, auto is often acceptable; for three APs in a suite, plan 2.4 GHz as 1/6/11 and spread 5 GHz.

SSID count eats airtime with beacons. Guest versus corp is a 2.4/2.6 and Core 2 security topic; here, know that a tri-band AP is three radios, not three times the legal EIRP miracle.`,
      },
      {
        type: "diagram",
        id: "C1-D2-O2-L1-d2",
        component: "WifiHeatDiagram",
        title: "Coverage versus channel reuse",
        caption:
          "Two APs on channel 6 look strong on a heat map and still feel slow because they share one collision domain.",
        notice:
          "Notice 5 GHz cells are smaller. That is a feature: you can reuse channels more densely. Notice a 6 GHz cell that stops at the conference-room wall.",
        alt: "Floor plan heat map of 2.4 GHz bleed versus tighter 5 GHz and 6 GHz cells with channel labels.",
      },
      {
        type: "table",
        id: "C1-D2-O2-L1-t1",
        title: "802.11 at A+ recall depth",
        headers: ["Standard", "Wi-Fi name", "Bands", "Exam hook"],
        rows: [
          ["802.11a", "—", "5 GHz", "5 GHz only, 54 Mbps class"],
          ["802.11b", "—", "2.4 GHz", "11 Mbps, crowded band"],
          ["802.11g", "—", "2.4 GHz", "54 Mbps on 2.4"],
          ["802.11n", "Wi-Fi 4", "2.4 / 5 GHz", "MIMO, first common dual-band"],
          ["802.11ac", "Wi-Fi 5", "5 GHz", "High throughput; not a 6 GHz story"],
          ["802.11ax", "Wi-Fi 6 / 6E", "2.4 / 5 / 6E: +6 GHz", "Dense clients; 6E needs new radios"],
        ],
        caption: "If the stem says 6 GHz, the generation is 6E (ax in 6 GHz), not ac.",
      },
      {
        type: "lab",
        id: "C1-D2-O2-L1-lab",
        labId: "C1-D2-O2-WIFI-LAB",
        title: "Wi-Fi interference lab",
        prompt:
          "Place two APs, assign 2.4 GHz channels, then switch a client to 5 GHz and 6 GHz. Watch what happens to overlap and to a client that lacks a 6 GHz radio.",
      },
      {
        type: "knowledge-check",
        id: "C1-D2-O2-L1-kc2",
        questionIds: ["C1-D2-O2-6GHZ-Q001", "C1-D2-O2-80211-Q001"],
      },
      {
        type: "callout",
        id: "C1-D2-O2-L1-exam",
        callout: {
          kind: "exam",
          title: "Exam lens",
          body: "V15 added 6 GHz. Older dumps that never mention 6E are incomplete. 802.11ac is still 5 GHz. Non-overlapping 2.4 GHz channels are 1, 6, and 11.",
        },
      },
      {
        type: "checkpoint",
        id: "C1-D2-O2-L1-cp",
        questionIds: [
          "C1-D2-O2-24GHZ-Q002",
          "C1-D2-O2-5GHZ-Q001",
          "C1-D2-O2-6GHZ-Q002",
          "C1-D2-O2-80211-Q002",
          "C1-D2-O2-CHANNEL-Q001",
          "C1-D2-O2-RFID-Q001",
          "C1-D2-O2-CHANNEL-Q002",
          "C1-D2-O2-5GHZ-Q002",
        ],
      },
      {
        type: "summary",
        id: "C1-D2-O2-L1-sum",
        bullets: [
          "2.4 GHz: range and congestion; use channels 1, 6, 11.",
          "5 GHz: everyday capacity, shorter range, many channels.",
          "6 GHz: Wi-Fi 6E only; clean and short-range.",
          "Bluetooth, NFC, and RFID are not 802.11 LANs.",
        ],
      },
    ],
  },
  {
    id: "C1-D2-O3-L1",
    objectiveId: "C1-D2-O3",
    slug: "networked-hosts-appliances",
    title: "Networked hosts and internet appliances",
    description:
      "Place DNS, DHCP, file, print, mail, web, AAA, syslog, database, NTP, UTM, proxy, load balancer, SCADA, and IoT on a small network.",
    estimatedMinutes: 22,
    conceptIds: [
      "C1-D2-O3-DNSSRV",
      "C1-D2-O3-DHCPSRV",
      "C1-D2-O3-AAA",
      "C1-D2-O3-UTM",
      "C1-D2-O3-NTP",
      "C1-D2-O3-SCADA",
      "C1-D2-O3-IOT",
    ],
    prerequisites: ["C1-D2-O1-L2"],
    lastVerified: "2026-09-01",
    sources: ["c1-obj-3.0", "rfc1034"],
    blocks: [
      {
        type: "callout",
        id: "C1-D2-O3-L1-why",
        callout: {
          kind: "why",
          title: "Why this matters",
          body: "A+ does not ask you to architect a data center. It asks you which box answers names, which box hands out leases, and which box should never sit on the guest Wi-Fi.",
        },
      },
      {
        type: "reading",
        id: "C1-D2-O3-L1-r1",
        title: "Servers are roles, not tower colors",
        markdown: `A **host** on this objective is a system that offers a network service. It might be a VM, a cloud tenant, a tiny appliance, or a dusty tower. You care about the **role**.

A **DNS server** answers name queries. On a domain-joined LAN it is often the domain controller. On a SOHO router it is a forwarder to the ISP. If it is wrong, everything "looks offline" because humans use names. A **DHCP server** leases IPv4 addresses and options: mask, gateway, DNS. Two DHCP servers with overlapping pools on the same LAN is how you get duplicate-address chaos — unless they are deliberately split and coordinated.

**File servers** hold SMB shares. **Print servers** queue jobs; the printer itself may also be the server. **Mail servers** speak SMTP to the world and IMAP/POP to clients. **Web servers** speak HTTP/HTTPS. A **database server** answers queries from applications, not from browsers directly in a well-built app. **Syslog** collectors receive logs; if they are down, you still have a business, but you have no forensic trail. **NTP** (Network Time Protocol) servers set clocks. Kerberos, certificates, and logs all rot when time is wrong. "Random password failures after a power outage" can be NTP, not a bad DC.

**AAA** (Authentication, Authorization, Accounting) is RADIUS/TACACS+ territory: the box that says whether a user or a switch port is allowed. The AP or VPN concentrator is a client of AAA, not AAA itself.

Do not conflate the **protocol** from 2.1 with the **host** from 2.3. Port 53 is how you talk to a DNS server. The DNS server is the role you place on the diagram. A workstation is not "the DNS server" just because it has a DNS *client* cache.`,
      },
      {
        type: "table",
        id: "C1-D2-O3-L1-t1",
        title: "Roles you must be able to place",
        headers: ["Role", "Job", "What users feel when it dies"],
        rows: [
          ["DNS server", "Names → records", "Internet/apps 'down'; IP still pings"],
          ["DHCP server", "Leases + options", "APIPA, wrong gateway, no DNS option"],
          ["File / print", "SMB shares, queues", "Mapped drives and printers fail"],
          ["Mail / web / DB", "SMTP/IMAP, HTTP, queries", "One application class fails"],
          ["AAA", "Who may connect", "Wi-Fi/VPN/switch logon rejected"],
          ["NTP", "Time", "Auth, certs, log timestamps lie"],
          ["Syslog", "Log sink", "Silent now, blind later"],
        ],
        caption: "Place the role on the LAN that needs it. Guest VLANs should not reach SCADA or AAA admin planes.",
      },
      {
        type: "knowledge-check",
        id: "C1-D2-O3-L1-kc1",
        questionIds: ["C1-D2-O3-DNSSRV-Q001"],
      },
      {
        type: "reading",
        id: "C1-D2-O3-L1-r2",
        title: "Appliances, industrial networks, and IoT",
        markdown: `Internet and security appliances are hosts with a specialized job.

A **UTM** (Unified Threat Management) box combines firewall, intrusion prevention, sometimes VPN, antivirus, and content filter in one. Small offices buy them because one rack unit is cheaper than five. The trade is a single point of failure and a vendor who does many things "well enough."

A **spam gateway** sits in front of mail and drops junk before the mailbox. A **proxy** makes web requests on the client's behalf — for caching, filtering, or hiding internal IPs. An **explicit proxy** is configured in the browser; a **transparent proxy** intercepts without the client being told. A **load balancer** spreads connections across several web or app servers and can hide a dead node. If the balancer is down, all of those servers can be healthy and the site still looks dead.

**SCADA** (Supervisory Control and Data Acquisition) and ICS networks run plants, building automation, and warehouses. They are hosts, but they are not "just another VLAN for laptops." They should be isolated. Patching is slow. A technician who puts a SCADA HMI on guest Wi-Fi has created an incident, not a convenience.

**IoT** (Internet of Things) is cameras, thermostats, badges, bulbs. They are networked hosts with terrible update stories. Put them on a **segmented VLAN** (objective 2.4) with no path to HR file shares. Default passwords on a camera are a 2.3 placement problem and a Core 2 hardening problem.

Hostname versus IP: people remember names. You still document the IP of the UTM, the NTP source, and the DHCP server because when DNS is the thing that died, names will not help you find it. Use a consistent convention (fw01, dc01, ntp01) and put it in the ticket system, not on a sticky note on the rack.`,
      },
      {
        type: "callout",
        id: "C1-D2-O3-L1-tech",
        callout: {
          kind: "technician",
          title: "Technician lens",
          body: "If every app failed at once, suspect DNS, DHCP, the default gateway, or the UTM. If only mail failed, suspect the mail host or spam gateway. Blast-radius is how you pick the role.",
        },
      },
      {
        type: "knowledge-check",
        id: "C1-D2-O3-L1-kc2",
        questionIds: ["C1-D2-O3-UTM-Q001", "C1-D2-O3-SCADA-Q001"],
      },
      {
        type: "callout",
        id: "C1-D2-O3-L1-mistake",
        callout: {
          kind: "mistake",
          title: "Common mistake",
          body: "Calling the SOHO router 'the DNS server' as if it authored the company's records. It is usually a forwarder. Authoritative DNS for example.com is a different host, often at a registrar or in AD.",
        },
      },
      {
        type: "checkpoint",
        id: "C1-D2-O3-L1-cp",
        questionIds: [
          "C1-D2-O3-DNSSRV-Q002",
          "C1-D2-O3-DHCPSRV-Q001",
          "C1-D2-O3-AAA-Q001",
          "C1-D2-O3-UTM-Q002",
          "C1-D2-O3-NTP-Q001",
          "C1-D2-O3-SCADA-Q002",
          "C1-D2-O3-IOT-Q001",
          "C1-D2-O3-AAA-Q002",
        ],
      },
      {
        type: "summary",
        id: "C1-D2-O3-L1-sum",
        bullets: [
          "Place DNS, DHCP, file, print, mail, web, DB, syslog, NTP, and AAA as roles.",
          "UTM, proxy, spam gateway, and load balancer are appliances with a blast radius.",
          "SCADA stays isolated. IoT gets its own segment.",
          "When DNS is dead, you still need the IP of the box you are going to fix.",
        ],
      },
    ],
  },
  {
    id: "C1-D2-O4-L1",
    objectiveId: "C1-D2-O4",
    slug: "dns-records-email-auth",
    title: "DNS records and mailbox authentication",
    description:
      "Read A, AAAA, CNAME, MX, and TXT records, then explain SPF, DKIM, and DMARC at A+ depth — not CCNA depth.",
    estimatedMinutes: 22,
    conceptIds: ["C1-D2-O4-DNSREC", "C1-D2-O4-SPF", "C1-D2-O4-DKIM", "C1-D2-O4-DMARC"],
    prerequisites: ["C1-D2-O3-L1"],
    lastVerified: "2026-09-01",
    sources: ["c1-obj-3.0", "rfc1034"],
    blocks: [
      {
        type: "callout",
        id: "C1-D2-O4-L1-why",
        callout: {
          kind: "why",
          title: "Why this matters",
          body: "A user who cannot reach a site, and a finance team whose invoices are landing in spam, are both DNS-record problems. You do not need to be a mail administrator, but you must read the record types the exam lists.",
        },
      },
      {
        type: "reading",
        id: "C1-D2-O4-L1-r1",
        title: "Records are answers, not 'the DNS'",
        markdown: `DNS is a distributed database. A **resolver** (your PC or the router) asks a question; an **authoritative server** for that zone answers with **records**.

An **A** record maps a name to an **IPv4** address. An **AAAA** record maps a name to an **IPv6** address. If a dual-stack client has AAAA and a broken IPv6 path, the site can fail while IPv4 would have worked — a real help-desk trap.

A **CNAME** is an alias: www.example.com is a canonical name pointing at another name. CNAMEs cannot sit next to other records on the same node the way people expect; the exam-level rule is "CNAME is an alias, not an IP." You follow the alias, then look up A/AAAA.

An **MX** record names the **mail servers** for a domain, with a preference number (lower is more preferred). Pointing MX at a CNAME is a classic misconfiguration. Pointing it at an IP is also wrong — MX targets are hostnames.

A **TXT** record is a string. That sounds useless until you meet **SPF**, **DKIM**, and **DMARC**, which are published as TXT (DKIM as a selector._domainkey TXT). TXT is also used for domain-ownership proofs.

Resolution path, at A+ depth: stub resolver → recursive resolver (often the SOHO router or 1.1.1.1) → root hints → TLD → authoritative name server. Caching is why "I changed the A record and it still fails" is often TTL, not your typing. Flush the client cache after a change you control; wait out TTL when you do not.

Hostname versus FQDN: **pc01** is a label. **pc01.corp.example** is a fully qualified name. Search suffixes on DHCP make short names work at the office and fail on a guest network. That is not a broken A record; that is a suffix.`,
      },
      {
        type: "diagram",
        id: "C1-D2-O4-L1-d1",
        component: "DnsFlowDiagram",
        title: "A query for www.example.com",
        caption:
          "The recursive resolver walks root, TLD, then authoritative, caches the A/AAAA, and returns it to the client.",
        notice:
          "Notice MX is not in this web lookup. Mail delivery uses MX, not the www A record, unless someone mis-set the zone.",
        alt: "Flow of a DNS recursive lookup from client to resolver to root, TLD, and authoritative server returning an A record.",
      },
      {
        type: "knowledge-check",
        id: "C1-D2-O4-L1-kc1",
        questionIds: ["C1-D2-O4-DNSREC-Q001"],
      },
      {
        type: "reading",
        id: "C1-D2-O4-L1-r2",
        title: "SPF, DKIM, and DMARC",
        markdown: `Spam filters ask three questions about a message that claims to be from invoices@example.com.

**SPF** (Sender Policy Framework) is a TXT record listing which **servers may send** mail for the domain. A receiving server checks the connecting IP against that list. Too-tight SPF breaks a new marketing platform. Too-loose SPF (\`+all\`) is an open invitation to spoof. A+ wants the idea, not record-syntax mastery.

**DKIM** (DomainKeys Identified Mail) is a **signature**. The sender signs headers/body; the receiver fetches a public key from a TXT record and verifies. Forwarding that breaks signatures is a DKIM support ticket. SPF may fail on a legitimate forwarder; DKIM can still pass.

**DMARC** (Domain-based Message Authentication, Reporting, and Conformance) ties SPF and DKIM to the **visible From** domain and tells receivers what to do on failure: none (monitor), quarantine, or reject. It also requests reports. A company that "just enabled reject" without aligning SPF/DKIM will lose real mail. The BEST first step is usually p=none plus reports, then tighten — but if the stem says spoofed CEO mail is already landing, policy may need to move faster under change control.

These records do not encrypt mail. They authenticate **domain use**. Users still need TLS in transit (SMTP submission, HTTPS for webmail). Do not tell a user "we have DMARC so the mailbox cannot be phished." People still click.

When a stem says "customers report our mail as spoofed," read TXT/SPF/DKIM/DMARC. When it says "the website IP changed," read A/AAAA and TTL. When it says "www should be an alias of the CDN name," CNAME. When it says "mail should go to the Microsoft or Google tenant," MX.`,
      },
      {
        type: "table",
        id: "C1-D2-O4-L1-t1",
        title: "Record types on the V15 list",
        headers: ["Type", "Holds", "Typical ticket"],
        rows: [
          ["A", "IPv4 address", "Site name does not resolve to v4"],
          ["AAAA", "IPv6 address", "v6-only path or broken AAAA"],
          ["CNAME", "Alias to another name", "www should follow the CDN"],
          ["MX", "Mail server hostname + preference", "Mail not flowing to the tenant"],
          ["TXT", "Arbitrary text", "SPF/DKIM/DMARC or domain proof"],
          ["SPF / DKIM / DMARC", "Senders, signature, policy", "Spoofing or legitimate mail in spam"],
        ],
      },
      {
        type: "knowledge-check",
        id: "C1-D2-O4-L1-kc2",
        questionIds: ["C1-D2-O4-SPF-Q001", "C1-D2-O4-DMARC-Q001"],
      },
      {
        type: "callout",
        id: "C1-D2-O4-L1-exam",
        callout: {
          kind: "exam",
          title: "Exam lens",
          body: "A = IPv4, AAAA = IPv6, CNAME = alias, MX = mail, TXT = text including SPF/DKIM/DMARC. Do not put an IP in an MX. Do not say SPF encrypts mail.",
        },
      },
      {
        type: "summary",
        id: "C1-D2-O4-L1-sum",
        bullets: [
          "A and AAAA map names to addresses; CNAME aliases a name; MX finds mail hosts.",
          "TXT carries SPF, DKIM keys, and DMARC policy.",
          "SPF authorizes sending IPs; DKIM signs; DMARC sets policy and reporting.",
          "TTL and cache explain 'I changed DNS and nothing happened.'",
        ],
      },
    ],
  },
  {
    id: "C1-D2-O4-L2",
    objectiveId: "C1-D2-O4",
    slug: "dhcp-vlan-vpn",
    title: "DHCP pools, VLANs, and VPNs",
    description:
      "Read a DHCP scope with leases, reservations, and exclusions, then separate broadcast domains with VLANs and remote users with a VPN.",
    estimatedMinutes: 22,
    conceptIds: ["C1-D2-O4-DHCPPOOL", "C1-D2-O4-VLAN", "C1-D2-O4-VPN"],
    prerequisites: ["C1-D2-O4-L1"],
    lastVerified: "2026-09-01",
    sources: ["c1-obj-3.0"],
    blocks: [
      {
        type: "callout",
        id: "C1-D2-O4-L2-why",
        callout: {
          kind: "why",
          title: "Why this matters",
          body: "Wrong scope options send a floor of laptops to the wrong gateway. A missing VLAN membership looks like a 'bad NIC.' A missing VPN is how someone publishes RDP to the world.",
        },
      },
      {
        type: "reading",
        id: "C1-D2-O4-L2-r1",
        title: "Scopes, leases, reservations, exclusions",
        markdown: `A **DHCP scope** is the pool of addresses a server may lease on a subnet, plus **options**: mask, default gateway (router option), DNS servers, and sometimes domain suffix or NTP.

A **lease** is a timed loan. Half-life renewals go unicast to the original server; if the server is gone, the client eventually retries and may fall to APIPA when the lease expires. Short leases on a guest network reclaim addresses; long leases on a stable office reduce chatter.

A **reservation** maps a **MAC address** to a specific IP so a printer or a small server always gets the same number from DHCP. That is not the same as a static address typed on the device. Reservations still live in the DHCP database; if DHCP dies, the reserved host will not get a renewal. For a domain controller or a DHCP server itself, use a real static address.

An **exclusion** is a range the server will **not** hand out, typically to protect statically numbered printers, the router, and the server itself that sit inside the same subnet numbers. If you set a scope of 192.168.10.1–254 and do not exclude .1 (the gateway) or .10 (the file server), you will eventually lease those addresses to a laptop and create a duplicate.

**DORA** is the four-way UDP dance: Discover (client broadcast), Offer, Request, Acknowledge. Relays (IP helpers) forward Discover across routers because broadcasts do not cross L3. A new VLAN without a helper and without its own DHCP server is a factory of APIPA addresses.

Two DHCP servers on one L2 domain with overlapping pools is a defect. Split-scope on purpose is an operations choice; accidental consumer routers enabled on a corporate LAN are a ticket.`,
      },
      {
        type: "diagram",
        id: "C1-D2-O4-L2-d1",
        component: "DhcpPoolDiagram",
        title: "One scope, three kinds of addresses",
        caption:
          "Exclusions protect static gear. Reservations pin printers by MAC. The remaining pool floats among laptops.",
        notice:
          "Notice the gateway address is excluded, not reserved. A reservation still requires DHCP to be alive; the router must boot without asking anyone for an IP.",
        alt: "DHCP pool bar showing excluded gateway and server IPs, reserved printer IPs, and a dynamic laptop range.",
      },
      {
        type: "knowledge-check",
        id: "C1-D2-O4-L2-kc1",
        questionIds: ["C1-D2-O4-DHCPPOOL-Q001"],
      },
      {
        type: "reading",
        id: "C1-D2-O4-L2-r2",
        title: "VLANs isolate; VPNs tunnel",
        markdown: `A **VLAN** (Virtual Local Area Network) is a **logical broadcast domain** on a switch. Ports in VLAN 10 cannot talk at L2 to ports in VLAN 20 without a **router** (or a layer-3 switch) routing between them. That is how you separate voice, guests, IoT, and corp laptops without a separate physical switch for each.

Access ports belong to one VLAN. Trunk ports carry many VLANs, tagged (802.1Q) toward another switch, an AP (for multiple SSIDs), or a firewall. The most common A+ failure is an access port left in VLAN 1 while DHCP and the gateway live in VLAN 20: the PC gets APIPA or an address from the wrong server. Another failure is a native-VLAN mismatch on a trunk, which is a fun way to leak broadcasts.

A+ does not require you to configure VTP or draw spanning tree. It requires you to know **why** VLANs exist (isolation, smaller broadcasts, policy) and that **inter-VLAN traffic needs a router**.

A **VPN** (Virtual Private Network) encrypts traffic over an untrusted network, usually the internet, so a remote laptop appears to be on the corporate LAN (or on a constrained slice of it). Site-to-site VPNs join two offices. Remote-access VPNs join a user. Split tunnel sends only corp prefixes through the VPN; full tunnel sends everything, which is better for forcing web traffic through the UTM and worse for home-printer access.

VPN is the answer to "user needs SMB or RDP from a hotel." It is not "open 445 on the cable modem." Protocols and products vary (IPsec, SSL/TLS VPN, vendor clients). A+ wants the **purpose**: confidential path, authentication, and the idea that once tunneled, LAN ports from 2.1 apply inside.

Do not confuse VLAN with VPN. VLAN is a LAN segmentation tool. VPN is an encrypted path across a WAN. A guest VLAN that still uses the corp DHCP scope and the corp file server is a VLAN in name only.`,
      },
      {
        type: "diagram",
        id: "C1-D2-O4-L2-d2",
        component: "VlanDiagram",
        title: "Two VLANs and a router",
        caption:
          "PCs in VLAN 10 and cameras in VLAN 40 share a switch but not a broadcast domain. The firewall routes and filters between them.",
        notice:
          "Notice the AP trunk carries both a corp SSID and a guest SSID as two VLANs. Notice the VPN concentrator sits so remote users land in corp, not in guest.",
        alt: "Switch with colored VLAN ports, a trunk to a firewall, and a VPN tunnel from a remote laptop into the corp VLAN.",
      },
      {
        type: "knowledge-check",
        id: "C1-D2-O4-L2-kc2",
        questionIds: ["C1-D2-O4-VLAN-Q001", "C1-D2-O4-VPN-Q001"],
      },
      {
        type: "callout",
        id: "C1-D2-O4-L2-mistake",
        callout: {
          kind: "mistake",
          title: "Common mistake",
          body: "Reserving the DHCP server's own address in its scope instead of assigning a static IP. When the service starts late, it can fail to bind. Gateways and DCs get static addresses; printers often get reservations.",
        },
      },
      {
        type: "checkpoint",
        id: "C1-D2-O4-L2-cp",
        questionIds: [
          "C1-D2-O4-DNSREC-Q002",
          "C1-D2-O4-SPF-Q002",
          "C1-D2-O4-DKIM-Q001",
          "C1-D2-O4-DHCPPOOL-Q002",
          "C1-D2-O4-VLAN-Q002",
          "C1-D2-O4-VPN-Q002",
          "C1-D2-O4-DMARC-Q002",
          "C1-D2-O4-DHCPPOOL-Q003",
        ],
      },
      {
        type: "lab",
        id: "C1-D2-O4-L2-lab",
        labId: "C1-D2-O4-SERVICES-LAB",
        title: "DNS DHCP VLAN VPN matching lab",
        prompt:
          "Match DNS A/AAAA, DHCP reservation, VLAN guest isolation, and VPN remote access. Leave port-forward-as-VPN and mask-as-VLAN unmatched.",
      },
      {
        type: "summary",
        id: "C1-D2-O4-L2-sum",
        bullets: [
          "Scope + options; lease time; reservation by MAC; exclusion for static gear.",
          "DORA is UDP 67/68; relays are required across routers.",
          "VLANs split broadcast domains; a router joins them on purpose.",
          "VPN encrypts remote access; it is not a VLAN and not a WAN port-forward.",
        ],
      },
    ],
  },
  {
    id: "C1-D2-O5-L1",
    objectiveId: "C1-D2-O5",
    slug: "network-hardware-ont-poe",
    title: "Routers, switches, APs, firewalls, ONT, and PoE",
    description:
      "Distinguish the boxes in a closet: WAN handoff on a modem or ONT, router as gateway, switched LAN, APs, patch panels, NICs, MAC addresses, and Power over Ethernet.",
    estimatedMinutes: 24,
    conceptIds: [
      "C1-D2-O5-ROUTER",
      "C1-D2-O5-SWITCH",
      "C1-D2-O5-AP",
      "C1-D2-O5-FIREWALL",
      "C1-D2-O5-POE",
      "C1-D2-O5-ONT",
      "C1-D2-O5-NIC",
      "C1-D2-O5-MAC",
    ],
    prerequisites: ["C1-D2-O4-L2"],
    lastVerified: "2026-09-01",
    sources: ["c1-obj-3.0"],
    blocks: [
      {
        type: "callout",
        id: "C1-D2-O5-L1-why",
        callout: {
          kind: "why",
          title: "Why this matters",
          body: "Plugging the ISP fiber into a LAN switch port is how you take a whole office offline. Each device has one job. The closet is a sentence: ONT or modem, then firewall/router, then switch, then APs and endpoints.",
        },
      },
      {
        type: "reading",
        id: "C1-D2-O5-L1-r1",
        title: "The sentence in the rack",
        markdown: `A **router** forwards packets **between networks**. On a SOHO box it is also NAT, DHCP, and Wi-Fi. In a closet it may be a firewall appliance doing routing. The **WAN** port faces the ISP. The **LAN** side is the default gateway for PCs.

A **switch** forwards frames **inside** a network using **MAC** addresses. An **unmanaged** switch is a dumb expander: no VLAN config, no logs. A **managed** switch can VLAN, set PoE, mirror ports, and show you which MAC sat on which jack. Access ports versus trunks live here (objective 2.4).

An **access point (AP)** is a radio that bridges Wi-Fi stations onto the wired LAN. It is not a router unless the consumer "AP" is actually a gateway in disguise. In business gear, APs hang off PoE switch ports and are often controller-managed. Putting an AP's WAN/uplink into a wall jack that is a PC VLAN is fine; putting it into the ISP handoff is not.

A **firewall** filters. It may be the same box as the router. Host firewalls (Windows Defender Firewall) are Core 2. Here you care about the network firewall sitting at the edge.

A **patch panel** is not intelligence. It is a tidy punchdown so the switch can be recabled without climbing into ceilings. Ports on the panel map to wall jacks. Label both ends.

**Cable modem** (coax DOCSIS) and **DSL modem** (telephone copper) convert ISP signaling to Ethernet the router can speak. An **ONT** (Optical Network Terminal) does that job for **fiber** to the premises: light in, Ethernet (or sometimes coax) out. The ONT is the ISP's device. Swapping it for a random media converter is how you void a fiber install. Power the ONT; a "fiber outage" is sometimes a dead ONT brick on a dark closet shelf.

A **NIC** (Network Interface Card) is the host's interface — onboard or add-in, copper, fiber, or USB dongle. Every Ethernet NIC has a **MAC address**, a 48-bit burned-in identifier written as twelve hex digits. Switches learn MACs. DHCP reservations key on them. Cloning a VM without generating a new MAC can confuse a LAN. Wi-Fi NICs have MACs too; randomized MACs on phones break reservations and captive-portal memory.`,
      },
      {
        type: "diagram",
        id: "C1-D2-O5-L1-d1",
        component: "NetworkRackDiagram",
        title: "ISP handoff to endpoints",
        caption:
          "Fiber lands on the ONT. Ethernet from the ONT hits the firewall/router WAN. LAN copper hits a patch panel, then a PoE switch, then APs and PCs.",
        notice:
          "Notice the AP is not on the WAN port. Notice the patch panel sits between wall runs and the switch. Notice PoE is a switch (or injector) feature, not an ONT feature.",
        alt: "Rack diagram from ONT to firewall/router to patch panel to PoE switch to APs and PCs with MAC labels on NICs.",
      },
      {
        type: "knowledge-check",
        id: "C1-D2-O5-L1-kc1",
        questionIds: ["C1-D2-O5-ROUTER-Q001", "C1-D2-O5-ONT-Q001"],
      },
      {
        type: "reading",
        id: "C1-D2-O5-L1-r2",
        title: "PoE injectors, switches, and standards",
        markdown: `**Power over Ethernet (PoE)** sends DC power down the data cable so an AP, camera, or phone does not need a wall wart.

A **PoE switch** budgets watts per port and for the whole chassis. A **PoE injector** (midspan) sits between a non-PoE switch and one hungry device. Do not daisy-chain mystery injectors. Use the vendor's injector or a listed switch.

Standards you should recognize at A+ depth:

- **802.3af (PoE)** — about 15.4 W at the switch, ~12.95 W at the device. Enough for many phones and older APs.
- **802.3at (PoE+)** — about 30 W. Common for modern APs and PTZ-ish cameras.
- **802.3bt (PoE++)** — Type 3 ~60 W, Type 4 ~90–100 W class, for hungry APs, displays, and some thin clients.

If an AP boots then dies when radios come up, suspect **under-powered PoE**, not a "bad image." A PoE switch that shows the camera as a CD-class device on af while the datasheet wants at is your smoking gun. Cable quality and length eat watts; a marginal Cat5e run at 100 m can drop a borderline camera.

Never inject PoE into a port that already has PoE. Never use a cheap injector on a NIC that is not rated for it. Disconnecting a PoE camera "hot" is normal; disconnecting it by cutting the pair with a knife is how you short a port.

Managed-switch work for this objective: confirm the wall jack's VLAN, confirm PoE is enabled on that port, confirm the MAC of the AP appeared, then look at the controller. Unmanaged switches still pass PoE if they are PoE models, but you get no per-port story.`,
      },
      {
        type: "table",
        id: "C1-D2-O5-L1-t1",
        title: "Device versus job",
        headers: ["Device", "Forwards using", "Typical placement"],
        rows: [
          ["ONT / cable / DSL modem", "ISP PHY → Ethernet", "First box after the ISP medium"],
          ["Router / edge firewall", "IP networks, NAT, policy", "WAN in, LAN out"],
          ["Managed switch", "MAC, optional VLAN/PoE", "LAN aggregation"],
          ["Unmanaged switch", "MAC only", "Simple expansion"],
          ["AP", "Radio ↔ Ethernet bridge", "Ceiling, on LAN/PoE"],
          ["Patch panel", "None (passive)", "Between runs and switch"],
          ["NIC", "Host I/O", "Inside the PC/server/AP"],
        ],
      },
      {
        type: "lab",
        id: "C1-D2-O5-L1-lab",
        labId: "C1-D2-O5-RACK-LAB",
        title: "Network closet builder",
        prompt:
          "Connect ISP → ONT/modem → router/firewall → patch panel/switch → AP and PCs. If the AP can ping the internet only when plugged into the WAN port, you built it backwards.",
      },
      {
        type: "knowledge-check",
        id: "C1-D2-O5-L1-kc2",
        questionIds: ["C1-D2-O5-POE-Q001"],
      },
      {
        type: "callout",
        id: "C1-D2-O5-L1-exam",
        callout: {
          kind: "exam",
          title: "Exam lens",
          body: "ONT is fiber handoff. Cable modem is coax. DSL is phone copper. PoE injector versus PoE switch is 'one device' versus 'many ports.' Managed versus unmanaged is VLANs and visibility.",
        },
      },
      {
        type: "checkpoint",
        id: "C1-D2-O5-L1-cp",
        questionIds: [
          "C1-D2-O5-ROUTER-Q002",
          "C1-D2-O5-SWITCH-Q001",
          "C1-D2-O5-AP-Q001",
          "C1-D2-O5-FIREWALL-Q001",
          "C1-D2-O5-POE-Q002",
          "C1-D2-O5-ONT-Q002",
          "C1-D2-O5-NIC-Q001",
          "C1-D2-O5-MAC-Q001",
        ],
      },
      {
        type: "summary",
        id: "C1-D2-O5-L1-sum",
        bullets: [
          "ONT/modem terminate ISP media; routers join networks; switches join MACs.",
          "APs belong on the LAN, usually on PoE.",
          "Patch panels are passive. NICs own MAC addresses.",
          "Match PoE standard (af/at/bt) to the device budget.",
        ],
      },
    ],
  },
  {
    id: "C1-D2-O6-L1",
    objectiveId: "C1-D2-O6",
    slug: "ipv4-private-apipa-mask-gateway",
    title: "IPv4 public versus private, APIPA, mask, and gateway",
    description:
      "Read an IPv4 address as public or private, recognize 169.254 as APIPA, and explain why the mask and default gateway have to match the LAN you are on.",
    estimatedMinutes: 22,
    conceptIds: ["C1-D2-O6-IPV4", "C1-D2-O6-APIPA", "C1-D2-O6-MASK", "C1-D2-O6-GATEWAY"],
    prerequisites: ["C1-D2-O5-L1"],
    lastVerified: "2026-09-01",
    sources: ["c1-obj-3.0", "rfc791"],
    blocks: [
      {
        type: "callout",
        id: "C1-D2-O6-L1-why",
        callout: {
          kind: "why",
          title: "Why this matters",
          body: "Limited connectivity, a printer that 'is on the network' but not your network, and a laptop that cannot reach the internet are usually address, mask, or gateway — not a cursed NIC.",
        },
      },
      {
        type: "reading",
        id: "C1-D2-O6-L1-r1",
        title: "What the four numbers mean",
        markdown: `An **IPv4** address is 32 bits, written as four decimal octets. It is paired with a **subnet mask** that marks which bits are the **network** and which are the **host**. 192.168.1.50 with 255.255.255.0 means this host is host 50 on network 192.168.1.0/24. A host in 192.168.2.0/24 is a different LAN even if both live in the same building.

**Public** addresses are globally unique on the internet (in principle) and are assigned by ISPs. **Private** addresses from RFC 1918 are reused behind NAT:

- **10.0.0.0/8** (10.0.0.0–10.255.255.255)
- **172.16.0.0/12** (172.16.0.0–172.31.255.255)
- **192.168.0.0/16** (192.168.0.0–192.168.255.255)

A SOHO router typically NATs a 192.168.1.0/24 LAN onto one public WAN address. Two offices that both use 192.168.1.0/24 will have a miserable site-to-site VPN overlap. Pick unique private ranges on purpose.

**Loopback** 127.0.0.1 talks to yourself. **APIPA** (Automatic Private IP Addressing), 169.254.0.0/16, is what Windows (and many others) assign when DHCP fails. It is link-local: two APIPA hosts on the same L2 can often talk to each other, and **neither can reach a default gateway or the internet**. "Limited connectivity" plus 169.254 is DHCP, VLAN, or cable — not "set a public DNS and hope."

The **default gateway** is the IP of the router on **your** subnet — the first hop off this LAN. It must be in the same network as the host. A PC at 192.168.1.50/24 with gateway 192.168.0.1 will not leave the LAN. A gateway of 192.168.1.1 when the router is actually 192.168.1.254 is equally dead.

**NAT** is why private hosts reach public sites: the router rewrites the source. Inbound services need port forwarding or a VPN; they do not magically publish 192.168.1.50 to the world.`,
      },
      {
        type: "video",
        id: "C1-D2-O6-L1-see1",
        assetId: "apipa-lease",
        title: "SEE: DHCP fail then 169.254",
        caption: "Stylized terminal. One IPv4 line. Not a Windows screenshot.",
        transcript:
          "When DHCP does not answer, Windows assigns a link-local APIPA address in 169.254.0.0/16. There is no useful default gateway.",
      },
      {
        type: "diagram",
        id: "C1-D2-O6-L1-d1",
        component: "Ipv4Diagram",
        title: "Public, private, and APIPA",
        caption:
          "Same laptop, three addresses: a DHCP private address with a gateway that works, a static typo off-subnet, and APIPA after DHCP silence.",
        notice:
          "Notice APIPA has no usable default gateway. Notice 172.20.0.1 is private (in 172.16/12) while 172.32.0.1 is not. Notice 10.x is private, not 'less public than 192.168.'",
        alt: "IPv4 examples of RFC1918 ranges, a public WAN address, 127.0.0.1, and 169.254 APIPA with no internet path.",
      },
      {
        type: "knowledge-check",
        id: "C1-D2-O6-L1-kc1",
        questionIds: ["C1-D2-O6-IPV4-Q001"],
      },
      {
        type: "reading",
        id: "C1-D2-O6-L1-r2",
        title: "Mask mistakes and the FIRST test",
        markdown: `A wrong mask makes a host believe distant addresses are local (no gateway used, ARP fails) or local addresses are distant (traffic sent to the gateway unnecessarily, or dropped). /24 (255.255.255.0) is the SOHO default. /16 (255.255.0.0) on a 192.168.1.0 network that is actually /24 will confuse printers people thought were "in range."

**FIRST** when a single PC has no internet: read **ipconfig /all** (Core 2 will make you type it; conceptually do it now). Check:

1. Do I have an address? 169.254 → DHCP path. 0.0.0.0 → disconnected. A plausible private address → continue.
2. Is the mask the office mask?
3. Is the gateway on my subnet, and can I ping it?
4. Can I ping a public IP (path) versus a name (DNS)?

If the gateway pings and 8.8.8.8 pings but names fail, this is not an IP problem anymore — it is DNS (2.1/2.3/2.4). If nothing pings, do not reimage Windows.

Static addresses are appropriate for routers, servers, and sometimes printers. They must sit **outside** the DHCP pool or in an **exclusion**. Two statics the same is a duplicate. A static without a DNS option "works" for IP pings and fails for browsing.

CGNAT (carrier-grade NAT) on some ISPs means even the router's WAN address is private (100.64.0.0/10 is the shared space you may see). Port forwarding then cannot work from the internet. That is a WAN-type reality (2.7), but it shows up while you stare at the WAN status page in 2.6.

Write the four numbers you actually saw in the ticket: address, mask, gateway, DNS. "Limited connectivity" is not a diagnosis. 169.254 plus no gateway is DHCP. A 192.168 address with a 10.x gateway is a mask/gateway mismatch. A public address on a LAN NIC is a misconfiguration you must not leave in place. Those sentences are how you talk to the next technician.`,
      },
      {
        type: "table",
        id: "C1-D2-O6-L1-t1",
        title: "Address clues",
        headers: ["You see", "It means", "First move"],
        rows: [
          ["192.168 / 10 / 172.16–31", "Private RFC1918", "Normal behind NAT"],
          ["169.254.x.x", "APIPA; DHCP failed", "Cable, VLAN, DHCP server/relay"],
          ["127.0.0.1 works, LAN fails", "Stack alive, link/config bad", "NIC, cable, address"],
          ["Gateway off-subnet", "Cannot leave LAN", "Fix gateway or mask"],
          ["Public IP on a LAN NIC", "Misconfigured or bridged", "Do not leave it; use private + NAT"],
        ],
      },
      {
        type: "knowledge-check",
        id: "C1-D2-O6-L1-kc2",
        questionIds: ["C1-D2-O6-APIPA-Q001", "C1-D2-O6-GATEWAY-Q001"],
      },
      {
        type: "callout",
        id: "C1-D2-O6-L1-mistake",
        callout: {
          kind: "mistake",
          title: "Common mistake",
          body: "Calling any 172.x address private. Only 172.16.0.0 through 172.31.255.255 are. 172.8.0.1 is public. 192.169.1.1 is also public — the private is 192.168, not 192.169.",
        },
      },
      {
        type: "summary",
        id: "C1-D2-O6-L1-sum",
        bullets: [
          "Private IPv4: 10/8, 172.16/12, 192.168/16. APIPA: 169.254/16.",
          "Mask defines the LAN; gateway must sit on that LAN.",
          "APIPA means DHCP failed, not 'a special internet.'",
          "Ping gateway, then a public IP, then a name — in that order.",
        ],
      },
    ],
  },
  {
    id: "C1-D2-O6-L2",
    objectiveId: "C1-D2-O6",
    slug: "ipv6-static-dhcp-soho-router",
    title: "IPv6 ideas and a SOHO router that actually works",
    description:
      "Recognize IPv6 link-local and global addresses, choose static versus DHCP, and configure LAN IP, scope, DNS, and WAN on a small router.",
    estimatedMinutes: 22,
    conceptIds: ["C1-D2-O6-IPV6", "C1-D2-O6-STATIC", "C1-D2-O6-IPV4", "C1-D2-O6-GATEWAY"],
    prerequisites: ["C1-D2-O6-L1"],
    lastVerified: "2026-09-01",
    sources: ["c1-obj-3.0"],
    blocks: [
      {
        type: "callout",
        id: "C1-D2-O6-L2-why",
        callout: {
          kind: "why",
          title: "Why this matters",
          body: "IPv6 is on the exam and on modern OSes even when the office 'does not use IPv6.' A broken AAAA or a disabled v6 stack can still be the ticket. Static versus DHCP is how you stop printers from drifting.",
        },
      },
      {
        type: "reading",
        id: "C1-D2-O6-L2-r1",
        title: "IPv6 without a CCNA hangover",
        markdown: `**IPv6** addresses are 128 bits, written as eight hex groups. Leading zeros compress; **::** may appear **once** to hide a run of zeros. **::1** is loopback. You do not need to hand-calculate /64 subnets on A+, but you must recognize the common shapes.

**Link-local** addresses start with **fe80::/10**. Every v6 interface has one. They are the IPv6 cousin of "on this wire only." They are not routed. **Global unicast** addresses typically start with **2000::/3** (you will see 2001:, 2600:, etc.) and are the internet-routable addresses. **Unique local** addresses in **fc00::/7** (commonly **fd00::/8**) are the private-ish analog of RFC1918.

IPv6 can use **SLAAC** (Stateless Address Autoconfiguration), DHCPv6, or both. A host with a working fe80 address but no global address may still neighbor-discover on the LAN and fail to reach the internet. That is not APIPA. Do not call fe80:: an error; call it link-local.

A+ troubleshooting split still holds: if names fail, check DNS (AAAA as well as A). If a v6-only path is broken, a dual-stack client might stall on AAAA before falling back. Disabling IPv6 "to fix the internet" is a last-resort superstition, not a first step.

**Static versus dynamic**: servers, routers, and the DHCP box itself get static IPv4 (and planned IPv6). Clients get DHCP. Printers often get **reservations** so they stay in DHCP's story. A user who "set a static because Wi-Fi was slow" and copied a coworker’s address has created a duplicate. The BEST fix is DHCP plus a reservation if the device must not change, not a tribal static spreadsheet.

DNS on the client should be the **internal resolver** at work (often the DC) so internal names work. Pointing a domain-joined PC at a public resolver only will break AD names. At home, the SOHO router or a trusted public resolver is fine.`,
      },
      {
        type: "table",
        id: "C1-D2-O6-L2-t1",
        title: "IPv6 shapes you must not mix up",
        headers: ["Prefix / example", "Kind", "Routed off-LAN?"],
        rows: [
          ["::1", "Loopback", "No — it is this host"],
          ["fe80::/10", "Link-local", "No"],
          ["fd00::/8 (unique local)", "Local, like private", "Inside your sites if you route it"],
          ["2000::/3 (e.g. 2001:)", "Global unicast", "Yes, on the internet"],
        ],
        caption: "APIPA is IPv4 169.254. IPv6 link-local is fe80:: — similar isolation, different protocol.",
      },
      {
        type: "knowledge-check",
        id: "C1-D2-O6-L2-kc1",
        questionIds: ["C1-D2-O6-IPV6-Q001"],
      },
      {
        type: "reading",
        id: "C1-D2-O6-L2-r2",
        title: "The SOHO admin page",
        markdown: `A typical router UI, in the order a technician should actually touch it:

1. **Change the default password** and, if possible, the default LAN IP if every neighbor uses 192.168.0.1 or 192.168.1.1. Document the new address.
2. Set **WAN** to DHCP if the ISP hands you a dynamic public (or CGNAT) address, or static/PPPoE if they gave you credentials or a fixed IP. Do not put a private LAN address on the WAN port.
3. Set **LAN** to a private network that does not overlap a VPN destination. Example: 10.32.0.1/24 as the gateway.
4. Set the **DHCP scope** inside that LAN, **excluding** the router. Offer **DNS** (the router, or a known resolver) and the **gateway** as itself.
5. Wi-Fi: unique SSID, WPA3 if clients allow (Core 2 security deep-dive), separate guest. Radios: 2.4 for IoT/range, 5/6 for capacity (objective 2.2).
6. Turn off **UPnP** and remote admin from WAN unless a documented exception exists. Port forwards are explicit or they are surprises.

Firmware updates belong in a change window. Cloning a vendor image from a random forum does not.

When two routers are accidentally chained (ISP gateway plus your Wi-Fi router both NATing), you get **double NAT**. Gaming and some VPNs choke. BEST is bridge/passthrough on the ISP box, one router doing LAN DHCP. Two DHCP servers on one LAN — ISP gateway Wi-Fi still on, plus yours — is the APIPA/wrong-gateway festival.

Static WAN addressing: copy mask and gateway **from the ISP**, not from the LAN page. Mixing them is a classic PBQ trap.`,
      },
      {
        type: "lab",
        id: "C1-D2-O6-L2-lab",
        labId: "C1-D2-O6-ROUTER-LAB",
        title: "SOHO router simulator",
        prompt:
          "Set a private LAN, a DHCP scope that does not include the router, DNS, and confirm a client receives gateway and DNS. Then try a static client that uses the wrong mask and watch it fail to leave the LAN.",
      },
      {
        type: "knowledge-check",
        id: "C1-D2-O6-L2-kc2",
        questionIds: ["C1-D2-O6-STATIC-Q001"],
      },
      {
        type: "callout",
        id: "C1-D2-O6-L2-tech",
        callout: {
          kind: "technician",
          title: "Technician lens",
          body: "Never leave default admin on a router that faces a lobby. Never give a printer a static that sits inside the live DHCP pool. Never set WAN DNS to a typo and then blame the ISP for 'no internet' when IP pings still work.",
        },
      },
      {
        type: "checkpoint",
        id: "C1-D2-O6-L2-cp",
        questionIds: [
          "C1-D2-O6-IPV4-Q002",
          "C1-D2-O6-APIPA-Q002",
          "C1-D2-O6-MASK-Q001",
          "C1-D2-O6-GATEWAY-Q002",
          "C1-D2-O6-IPV6-Q002",
          "C1-D2-O6-STATIC-Q002",
          "C1-D2-O6-IPV4-Q003",
          "C1-D2-O6-MASK-Q002",
        ],
      },
      {
        type: "summary",
        id: "C1-D2-O6-L2-sum",
        bullets: [
          "fe80:: is IPv6 link-local; 2000::/3-ish globals are internet; fd00:: is unique local.",
          "Static for infrastructure; DHCP for clients; reservations for printers.",
          "One DHCP server per LAN, gateway in-subnet, WAN settings from the ISP.",
          "Double NAT and overlapping 192.168.1.0 VPNs are self-inflicted.",
        ],
      },
    ],
  },
  {
    id: "C1-D2-O7-L1",
    objectiveId: "C1-D2-O7",
    slug: "wan-types-lan-wan-wisp",
    title: "Internet handoffs and network types",
    description:
      "Pick fiber, cable, DSL, satellite, cellular, or WISP, and name LAN, WAN, PAN, MAN, SAN, and WLAN correctly.",
    estimatedMinutes: 20,
    conceptIds: [
      "C1-D2-O7-FIBER",
      "C1-D2-O7-CABLE",
      "C1-D2-O7-DSL",
      "C1-D2-O7-SAT",
      "C1-D2-O7-WISP",
      "C1-D2-O7-LAN",
      "C1-D2-O7-WAN",
      "C1-D2-O7-SAN",
    ],
    prerequisites: ["C1-D2-O6-L1"],
    lastVerified: "2026-09-01",
    sources: ["c1-obj-3.0"],
    blocks: [
      {
        type: "callout",
        id: "C1-D2-O7-L1-why",
        callout: {
          kind: "why",
          title: "Why this matters",
          body: "A rural clinic cannot 'just get fiber by Friday.' You recommend a WAN type that matches plant, latency, and budget — and you use LAN/WAN/SAN words the way the exam (and a manager) uses them.",
        },
      },
      {
        type: "reading",
        id: "C1-D2-O7-L1-r1",
        title: "How the internet actually arrives",
        markdown: `**Fiber** to the premises is light in glass, terminated on an **ONT**. It is the usual BEST for high symmetric bandwidth and low latency when the plant exists. You cannot wish a strand into a street that has none.

**Cable** internet is **DOCSIS** on coaxial CATV plant. Downstream is often faster than upstream. The box is a **cable modem**. Shared neighborhood nodes can feel slow in the evening. Coax already in an apartment is why cable is the default urban consumer WAN.

**DSL** (Digital Subscriber Line) rides telephone copper. Speed collapses with **distance** from the central office or cabinet. Asymmetric DSL is the common flavor. The modem is a DSL modem, often combined with a router. If the site is 20 kft of copper from the DSLAM, DSL is the wrong hero story.

**Satellite** reaches anywhere with a sky view. Geosynchronous services have **high latency** (often 600 ms+ class) that hurts VPN, VoIP, and interactive tools. Low-Earth-orbit constellations improved latency but still need a clear view and power. Rain fade is real. BEST for a cabin; not BEST for a VoIP contact center.

**Cellular** (LTE/5G) is a WAN via a phone, a hot-spot, or a fixed wireless gateway with a SIM/eSIM. Caps and radio quality matter. It is an excellent failover and a poor unmetered backup for a file server sync.

**WISP** (Wireless Internet Service Provider) is **fixed wireless** from a tower or rooftop to an antenna on the building — not the same as "we use Wi-Fi at home," and not the same as cellular. Line of sight, weather, and a professionally aimed dish or panel matter. Rural offices between cable plant and fiber laterals often live here.

Pick by: plant availability, latency need, symmetry (uploads for cloud backup), weather, and data cap. "Fastest" is not a WAN type.`,
      },
      {
        type: "table",
        id: "C1-D2-O7-L1-t1",
        title: "WAN types at A+ recommendation depth",
        headers: ["Type", "Medium", "Typical strength", "Typical weakness"],
        rows: [
          ["Fiber", "Glass + ONT", "Speed, latency, symmetry", "Must be built to the site"],
          ["Cable", "Coax + cable modem", "Wide availability, fast down", "Shared node, weaker up"],
          ["DSL", "Phone copper", "Uses existing pairs", "Distance-limited"],
          ["Satellite", "Dish to space", "Coverage", "Latency, weather, cap"],
          ["Cellular", "SIM radio", "Quick failover, mobility", "Caps, radio quality"],
          ["WISP", "Fixed terrestrial radio", "Rural where fiber/cable skip", "Line of sight, weather"],
        ],
      },
      {
        type: "knowledge-check",
        id: "C1-D2-O7-L1-kc1",
        questionIds: ["C1-D2-O7-WISP-Q001"],
      },
      {
        type: "reading",
        id: "C1-D2-O7-L1-r2",
        title: "LAN, WAN, PAN, MAN, SAN, WLAN",
        markdown: `These words describe **scope and purpose**, not a brand of switch.

A **LAN** (Local Area Network) is the office, home, or floor you control — typically a switch domain and its VLANs. A **WAN** (Wide Area Network) is the long haul between sites or to the ISP. Your cable modem link is a WAN even if the office has only one site.

A **WLAN** (Wireless LAN) is 802.11 on that LAN. It is not a WAN just because radio is involved. A **PAN** (Personal Area Network) is Bluetooth-scale: headset, watch, phone. A **MAN** (Metropolitan Area Network) is a city-sized network — campus fiber between buildings across town, or a metro provider. You will not subnet a MAN on A+; you will pick the word when the stem says "across the city."

A **SAN** (Storage Area Network) is a **block storage** network: Fibre Channel or iSCSI so servers see disks. It is not a NAS share (that is file-level on the LAN). Calling a USB drive a SAN fails the item. Calling a rack of iSCSI arrays a LAN also fails; it is a SAN even if it uses Ethernet as a transport.

Exam stems: "sync a watch" → PAN. "Office PCs and a printer" → LAN. "SSID in the warehouse" → WLAN. "Two headquarters on different continents" → WAN. "City-wide campus" → MAN. "Database cluster disks" → SAN.

Do not mix WISP (a WAN access method) with WLAN (local 802.11). A WISP customer still has a LAN behind the radio.`,
      },
      {
        type: "knowledge-check",
        id: "C1-D2-O7-L1-kc2",
        questionIds: ["C1-D2-O7-LAN-Q001", "C1-D2-O7-SAN-Q001"],
      },
      {
        type: "callout",
        id: "C1-D2-O7-L1-exam",
        callout: {
          kind: "exam",
          title: "Exam lens",
          body: "V15 lists WISP explicitly. Satellite is the latency trap. SAN is storage, not 'a big LAN.' WLAN is 802.11, not cellular.",
        },
      },
      {
        type: "callout",
        id: "C1-D2-O7-L1-mistake",
        callout: {
          kind: "mistake",
          title: "Common mistake",
          body: "Recommending satellite for a VoIP-heavy office because 'it covers everywhere.' Coverage is not latency. Recommend fiber/cable/WISP first; satellite is the last mile of last miles for interactive voice.",
        },
      },
      {
        type: "checkpoint",
        id: "C1-D2-O7-L1-cp",
        questionIds: [
          "C1-D2-O7-FIBER-Q001",
          "C1-D2-O7-CABLE-Q001",
          "C1-D2-O7-DSL-Q001",
          "C1-D2-O7-SAT-Q001",
          "C1-D2-O7-WISP-Q002",
          "C1-D2-O7-LAN-Q002",
          "C1-D2-O7-WAN-Q001",
          "C1-D2-O7-SAN-Q002",
        ],
      },
      {
        type: "summary",
        id: "C1-D2-O7-L1-sum",
        bullets: [
          "Fiber/ONT, cable/DOCSIS, DSL/distance, satellite/latency, cellular/caps, WISP/fixed wireless.",
          "LAN local, WAN long-haul, WLAN 802.11, PAN Bluetooth-scale, MAN metro, SAN block storage.",
          "WISP is not WLAN. SAN is not NAS.",
          "Recommend from plant and latency, not from a speed-test brag.",
        ],
      },
    ],
  },
  {
    id: "C1-D2-O8-L1",
    objectiveId: "C1-D2-O8",
    slug: "networking-tools",
    title: "Crimpers, punchdowns, testers, toners, and taps",
    description:
      "Choose the tool that matches the fault: terminate, punch, test, tone, loop back, analyze Wi-Fi, or tap a packet path.",
    estimatedMinutes: 20,
    conceptIds: [
      "C1-D2-O8-CRIMPER",
      "C1-D2-O8-PUNCHDOWN",
      "C1-D2-O8-TESTER",
      "C1-D2-O8-TONER",
      "C1-D2-O8-LOOPBACK",
      "C1-D2-O8-TAP",
      "C1-D2-O8-ANALYZER",
    ],
    prerequisites: ["C1-D2-O5-L1"],
    lastVerified: "2026-09-01",
    sources: ["c1-obj-3.0"],
    blocks: [
      {
        type: "callout",
        id: "C1-D2-O8-L1-why",
        callout: {
          kind: "why",
          title: "Why this matters",
          body: "The exam will not give you a toolbox photo labeled with arrows. It will give you a symptom. Grabbing a Wi-Fi analyzer for a punchdown fault wastes the ticket.",
        },
      },
      {
        type: "reading",
        id: "C1-D2-O8-L1-r1",
        title: "Copper tools first",
        markdown: `A **cable stripper** (or the stripper on a crimper) removes jacket without nicking pairs. A **crimper** seats an **RJ45** (or RJ11) plug onto a patch cord. If the exam says "make a patch cable," you need stripper + crimper + the T568A or T568B sequence (Domain 3 owns the colors; here you own the tool).

A **punchdown** tool seats conductors into a **110** (or 66, or keystone) block on a **patch panel** or jack. You do not crimp a patch panel. You punch it. The blade cuts the excess. Using a screwdriver as a punchdown is how you split a pair and fail certification.

A **cable tester** tells you whether pins map: open, short, split pair, reversed. A cheap continuity tester is not a certifier, but on A+ it is enough to prove a bad punch. Test **after** you terminate, before you blame the switch.

A **toner and probe** (fox and hound) identify **which** cable is which in a bundle. Inject tone at the jack; hunt in the closet. Labeling exists because someone skipped this once and never again. A tester that only says "straight-through OK" does not tell you which panel port is room 214.

A **loopback plug** reflects a signal to the **same NIC** so you can prove the port/firmware path without a switch. Serial loopbacks still exist for RS-232; Ethernet loopbacks are less common in the field than they are on exams, but the idea is "prove this interface, not the network." If a server NIC fails loopback, do not replace the switch.

Do not use a crimper on a punchdown block. Do not use a toner as a PoE injector. Do not unplug a production uplink to "test" when a toner would have found the drop.`,
      },
      {
        type: "video",
        id: "C1-D2-O8-L1-see1",
        assetId: "rj45-click-crimp",
        title: "SEE: RJ45 click then crimp",
        caption: "No tester LCD numbers. Labels are HTML.",
        transcript:
          "Push an RJ45 into a jack until the tab clicks. Building a patch cord uses a crimper after the conductors are in T568 order. Do not invent tester LCD numbers from a generated frame.",
      },
      {
        type: "table",
        id: "C1-D2-O8-L1-t1",
        title: "Tool versus job",
        headers: ["Tool", "You pick it when", "You do not pick it when"],
        rows: [
          ["Stripper + crimper", "Building an RJ45 patch cord", "Terminating a 110 panel"],
          ["Punchdown", "Keystone/panel conductors", "Putting a plug on a patch cord"],
          ["Cable tester", "Pinout/open/short after a terminate", "Finding which unlabeled run is which"],
          ["Toner probe", "Tracing a drop in a bundle", "Measuring Wi-Fi RSSI"],
          ["Loopback plug", "Proving a local NIC/serial port", "Certifying a 90-meter run"],
        ],
      },
      {
        type: "knowledge-check",
        id: "C1-D2-O8-L1-kc1",
        questionIds: ["C1-D2-O8-TONER-Q001"],
      },
      {
        type: "reading",
        id: "C1-D2-O8-L1-r2",
        title: "Analyzers and taps",
        markdown: `A **Wi-Fi analyzer** is software or a dedicated handset that sees SSIDs, channels, widths, RSSI, and overlap. Use it for objective 2.2 problems: everyone on channel 6, a hidden overlapping AP, a client stuck on 2.4 GHz. It will not fix a bad punchdown. Phone apps are better than guessing and worse than a calibrated unit; on A+ the point is the **job**, not the brand.

A **network tap** (test access point) is a hardware splitter that copies packets to a sniffer without configuring a switch. A **SPAN/mirror port** on a managed switch is the software cousin. Taps are what you want when you must see a conversation and cannot change the production path, or when a mirror would drop on overload. Legal and policy warning: capturing payloads on a user VLAN can be a privacy event. The exam still wants you to know the tool exists.

When do you tap versus mirror versus analyzer? Radio symptoms → Wi-Fi analyzer. "Which drop is this?" → toner. "Did I wire it correctly?" → tester. "Is this NIC even alive?" → loopback. "I need a copy of the packets between the POS system and the server" → tap or SPAN. "I need to make the cord" → crimper. "I need to terminate the panel" → punchdown.

Carry the cheap tools every day (tester, toner, crimper, punchdown). Check out the tap and the analyzer when the ticket actually needs them.

A technician who loves one tool will mis-apply it. The analyzer will not tell you that pin 3 is open. The tester will not tell you two APs are both on channel 6. The toner will not prove a NIC ASIC is dead. The loopback will not find room 214 in a bundle. Name the fault, then pick the tool — that is the entire 2.8 skill.`,
      },
      {
        type: "knowledge-check",
        id: "C1-D2-O8-L1-kc2",
        questionIds: ["C1-D2-O8-ANALYZER-Q001", "C1-D2-O8-TAP-Q001"],
      },
      {
        type: "callout",
        id: "C1-D2-O8-L1-exam",
        callout: {
          kind: "exam",
          title: "Exam lens",
          body: "FIRST tool questions map one-to-one: unlabeled bundle = toner, new patch cord = crimper, panel = punchdown, pin map = tester, local NIC = loopback, channel overlap = analyzer, packet copy = tap.",
        },
      },
      {
        type: "callout",
        id: "C1-D2-O8-L1-tech",
        callout: {
          kind: "technician",
          title: "Technician lens",
          body: "Test the cable you just punched before you escalate to 'replace the switch.' Ten seconds with a tester saves a two-hour vendor dance.",
        },
      },
      {
        type: "checkpoint",
        id: "C1-D2-O8-L1-cp",
        questionIds: [
          "C1-D2-O8-CRIMPER-Q001",
          "C1-D2-O8-PUNCHDOWN-Q001",
          "C1-D2-O8-TESTER-Q001",
          "C1-D2-O8-TONER-Q002",
          "C1-D2-O8-LOOPBACK-Q001",
          "C1-D2-O8-TAP-Q002",
          "C1-D2-O8-ANALYZER-Q002",
          "C1-D2-O8-TESTER-Q002",
        ],
      },
      {
        type: "summary",
        id: "C1-D2-O8-L1-sum",
        bullets: [
          "Crimp plugs; punch panels; test pinouts; tone unlabeled runs.",
          "Loopback proves the local interface.",
          "Wi-Fi analyzer is for spectrum and overlap, not copper faults.",
          "A tap (or SPAN) copies packets; use it with a policy brain.",
        ],
      },
    ],
  },
];
