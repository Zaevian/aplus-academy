export default function ComparePage() {
  const tables = [
    {
      title: "TCP vs UDP",
      headers: ["", "TCP", "UDP"],
      rows: [
        ["Connection", "Handshake, stateful", "Connectionless"],
        ["Reliability", "ACK / retransmit", "None built-in"],
        ["Examples", "HTTPS, SSH, RDP", "DHCP, many real-time apps"],
      ],
    },
    {
      title: "RAID (simplified usable)",
      headers: ["Level", "Min disks", "Faults", "Not a backup?"],
      rows: [
        ["0", "2", "0", "Yes"],
        ["1", "2", "n-1 mirrors", "Yes"],
        ["5", "3", "1", "Yes"],
        ["6", "4", "2", "Yes"],
        ["10", "4", "1 per pair", "Yes"],
      ],
    },
    {
      title: "Cloud models",
      headers: ["", "You manage", "Provider manages"],
      rows: [
        ["IaaS", "OS, apps, data", "Hardware"],
        ["PaaS", "App, data", "OS/runtime"],
        ["SaaS", "Use + identity", "The app"],
      ],
    },
  ];
  return (
    <div className="mx-auto max-w-3xl space-y-8 px-4 py-8">
      <h1 className="text-2xl font-semibold">Comparison center</h1>
      {tables.map((t) => (
        <section key={t.title}>
          <h2 className="font-medium">{t.title}</h2>
          <table className="mt-2 w-full text-left text-sm">
            <thead>
              <tr className="border-b">
                {t.headers.map((h) => (
                  <th key={h} className="py-1 pr-2">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {t.rows.map((r, i) => (
                <tr key={i} className="border-b border-border/60">
                  {r.map((c) => (
                    <td key={c} className="py-1.5 pr-2">
                      {c}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      ))}
    </div>
  );
}
