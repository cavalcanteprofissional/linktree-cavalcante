export default function ReferrersTable({
  data,
}: {
  data: { referrer: string; total: number }[];
}) {
  if (data.length === 0) {
    return (
      <p className="text-sm text-muted-foreground py-8 text-center">
        Nenhum referrer registrado
      </p>
    );
  }

  const maxTotal = data[0]!.total;

  return (
    <div className="space-y-2">
      {data.map((r) => (
        <div key={r.referrer} className="flex items-center gap-3">
          <span className="text-sm text-foreground w-28 truncate shrink-0">
            {r.referrer}
          </span>
          <div className="flex-1 h-5 rounded-sm bg-secondary overflow-hidden">
            <div
              className="h-full rounded-sm bg-primary/60 transition-all"
              style={{ width: `${(r.total / maxTotal) * 100}%` }}
            />
          </div>
          <span className="text-sm text-muted-foreground w-10 text-right shrink-0">
            {r.total}
          </span>
        </div>
      ))}
    </div>
  );
}
