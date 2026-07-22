function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function RecentClicks({
  data,
}: {
  data: { label: string | null; clicked_at: string; referrer: string | null }[];
}) {
  if (data.length === 0) {
    return (
      <p className="text-sm text-muted-foreground py-8 text-center">
        Nenhum clique registrado
      </p>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-muted-foreground text-xs uppercase tracking-wider">
            <th className="pb-2 pr-4">Link</th>
            <th className="pb-2 pr-4">Data</th>
            <th className="pb-2">Referrer</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {data.map((c) => (
            <tr key={`${c.clicked_at}-${c.label}`} className="text-foreground">
              <td className="py-2 pr-4">{c.label ?? "—"}</td>
              <td className="py-2 pr-4 text-muted-foreground">
                {formatDate(c.clicked_at)}
              </td>
              <td className="py-2 text-muted-foreground">
                {c.referrer || "direct"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
