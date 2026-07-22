"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function ClicksChart({
  data,
}: {
  data: { date: string; total: number }[];
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
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(215, 30%, 18%)" />
          <XAxis
            dataKey="date"
            tick={{ fontSize: 11, fill: "hsl(215, 15%, 60%)" }}
            tickLine={false}
            axisLine={{ stroke: "hsl(215, 30%, 18%)" }}
          />
          <YAxis
            tick={{ fontSize: 11, fill: "hsl(215, 15%, 60%)" }}
            tickLine={false}
            axisLine={{ stroke: "hsl(215, 30%, 18%)" }}
            allowDecimals={false}
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
          <Line
            type="monotone"
            dataKey="total"
            stroke="hsl(212, 75%, 55%)"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4, fill: "hsl(212, 75%, 55%)" }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
