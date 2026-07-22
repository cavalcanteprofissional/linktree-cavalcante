"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function LinksChart({
  data,
}: {
  data: { label: string; total: number }[];
}) {
  if (data.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 text-sm text-muted-foreground">
        Nenhum dado disponível
      </div>
    );
  }

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} layout="vertical">
          <XAxis type="number" hide />
          <YAxis
            type="category"
            dataKey="label"
            tick={{ fontSize: 12, fill: "hsl(215, 15%, 60%)" }}
            tickLine={false}
            axisLine={false}
            width={90}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(215, 40%, 10%)",
              border: "1px solid hsl(215, 30%, 18%)",
              borderRadius: "8px",
              color: "hsl(215, 25%, 95%)",
              fontSize: "13px",
            }}
          />
          <Bar
            dataKey="total"
            fill="hsl(212, 75%, 55%)"
            radius={[0, 4, 4, 0]}
            barSize={20}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
