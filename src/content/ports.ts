/** Official 220-1201 objective 2.1 port list (Exam Objectives v3.0). */
export type PortRecord = {
  ports: string;
  protocol: string;
  name: string;
  transport: "TCP" | "UDP" | "TCP/UDP";
  purpose: string;
  secure: "secure" | "insecure" | "depends";
  notes: string;
};

export const PORTS: PortRecord[] = [
  {
    ports: "20/21",
    protocol: "FTP",
    name: "File Transfer Protocol",
    transport: "TCP",
    purpose: "Transfers files between a client and an FTP server.",
    secure: "insecure",
    notes: "21 is control, 20 is data in active mode. Credentials and payload are cleartext. Prefer SFTP/FTPS in production, but A+ still tests FTP numbers.",
  },
  {
    ports: "22",
    protocol: "SSH",
    name: "Secure Shell",
    transport: "TCP",
    purpose: "Encrypted remote terminal and file copy (SCP/SFTP over SSH).",
    secure: "secure",
    notes: "Replaces Telnet for administration.",
  },
  {
    ports: "23",
    protocol: "Telnet",
    name: "Telnet",
    transport: "TCP",
    purpose: "Unencrypted remote terminal.",
    secure: "insecure",
    notes: "Still listed so you can recognize it as a finding, not a recommendation.",
  },
  {
    ports: "25",
    protocol: "SMTP",
    name: "Simple Mail Transfer Protocol",
    transport: "TCP",
    purpose: "Sends mail between mail servers (and submissions, depending on config).",
    secure: "depends",
    notes: "Submission often uses 587 with TLS; 25 is the classic A+ number.",
  },
  {
    ports: "53",
    protocol: "DNS",
    name: "Domain Name System",
    transport: "TCP/UDP",
    purpose: "Resolves names to records (A, AAAA, MX, and others).",
    secure: "depends",
    notes: "UDP for typical queries; TCP for large responses and zone transfers.",
  },
  {
    ports: "67/68",
    protocol: "DHCP",
    name: "Dynamic Host Configuration Protocol",
    transport: "UDP",
    purpose: "Leases IPv4 addresses and options (mask, gateway, DNS).",
    secure: "depends",
    notes: "Server uses 67, client uses 68.",
  },
  {
    ports: "80",
    protocol: "HTTP",
    name: "Hypertext Transfer Protocol",
    transport: "TCP",
    purpose: "Unencrypted web traffic.",
    secure: "insecure",
    notes: "Still used for redirects to HTTPS and some internal apps.",
  },
  {
    ports: "110",
    protocol: "POP3",
    name: "Post Office Protocol version 3",
    transport: "TCP",
    purpose: "Downloads mail to a client; often removes it from the server.",
    secure: "insecure",
    notes: "POP3S is 995. IMAP is usually preferred when multiple devices must stay in sync.",
  },
  {
    ports: "143",
    protocol: "IMAP",
    name: "Internet Mail Access Protocol",
    transport: "TCP",
    purpose: "Accesses mail on the server so multiple devices stay synchronized.",
    secure: "insecure",
    notes: "IMAPS is 993.",
  },
  {
    ports: "137-139",
    protocol: "NetBIOS/NetBT",
    name: "NetBIOS over TCP/IP",
    transport: "TCP/UDP",
    purpose: "Legacy Windows name service and session traffic.",
    secure: "insecure",
    notes: "Modern file sharing uses SMB on 445. These ports still appear on older LANs.",
  },
  {
    ports: "389",
    protocol: "LDAP",
    name: "Lightweight Directory Access Protocol",
    transport: "TCP",
    purpose: "Directory queries (users, groups, computers).",
    secure: "insecure",
    notes: "LDAPS commonly uses 636. Active Directory relies on LDAP.",
  },
  {
    ports: "443",
    protocol: "HTTPS",
    name: "HTTP Secure",
    transport: "TCP",
    purpose: "Web traffic protected with TLS.",
    secure: "secure",
    notes: "Certificates matter — a warning is a troubleshooting clue, not noise.",
  },
  {
    ports: "445",
    protocol: "SMB/CIFS",
    name: "Server Message Block / Common Internet File System",
    transport: "TCP",
    purpose: "Windows file and printer sharing.",
    secure: "depends",
    notes: "Exposing 445 to the internet is a classic incident. On a LAN it is expected.",
  },
  {
    ports: "3389",
    protocol: "RDP",
    name: "Remote Desktop Protocol",
    transport: "TCP",
    purpose: "Windows remote desktop sessions.",
    secure: "depends",
    notes: "Should sit behind VPN/NLA and account lockout. Direct exposure is a common finding.",
  },
];
