"use client";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const COLORS = [
  "#3B82F6",
  "#FACC15",
  "#22C55E",
  "#EF4444",
];

interface ChartData {
  name: string;
  value: number;
}

export default function ApplicationChart({
  data,
}: {
  data: ChartData[];
}) {
  return (
    <div
      className="w-full"
      style={{
        height: "400px",
        minHeight: "400px",
      }}
    >
      <ResponsiveContainer
        width="100%"
        height="100%"
      >
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={120}
            fill="#8884d8"
            dataKey="value"
            nameKey="name"
            label
          >
            {data.map(
              (entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={
                    COLORS[
                      index %
                        COLORS.length
                    ]
                  }
                />
              )
            )}
          </Pie>

          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}