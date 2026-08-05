"use client";

import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

interface Props {
  statusData: {
    name: string;
    value: number;
  }[];

  monthlyData: {
    month: string;
    applications: number;
  }[];
}

const COLORS = [
  "#3B82F6",
  "#FACC15",
  "#A855F7",
  "#22C55E",
  "#EF4444",
];

export default function DashboardCharts({
  statusData,
  monthlyData,
}: Props) {
  return (
    <div className="grid lg:grid-cols-2 gap-8 mt-8">

      <div className="border rounded-xl shadow p-5">

        <h2 className="text-xl font-bold mb-5">
          Applications by Status
        </h2>

        <div className="w-full h-80">

          <ResponsiveContainer width="100%" height="100%">

            <PieChart>

              <Pie
                data={statusData}
                dataKey="value"
                nameKey="name"
                outerRadius={110}
                label
              >

                {statusData.map((entry, index) => (

                  <Cell
                    key={index}
                    fill={COLORS[index]}
                  />

                ))}

              </Pie>

              <Tooltip />

            </PieChart>

          </ResponsiveContainer>

        </div>

      </div>

      <div className="border rounded-xl shadow p-5">

        <h2 className="text-xl font-bold mb-5">
          Applications by Month
        </h2>

        <div className="w-full h-80">

          <ResponsiveContainer width="100%" height="100%">

            <BarChart data={monthlyData}>

              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="month" />

              <YAxis />

              <Tooltip />

              <Bar
                dataKey="applications"
                fill="#3B82F6"
              />

            </BarChart>

          </ResponsiveContainer>

        </div>

      </div>

    </div>
  );
}