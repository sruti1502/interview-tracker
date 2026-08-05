"use client";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";

import { Pie, Bar } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

interface Props {
  applied: number;
  interview: number;
  offer: number;
  rejected: number;
}

export default function AnalyticsChart({
  applied,
  interview,
  offer,
  rejected,
}: Props) {
  const pieData = {
    labels: [
      "Applied",
      "Interview",
      "Offer",
      "Rejected",
    ],

    datasets: [
      {
        data: [
          applied,
          interview,
          offer,
          rejected,
        ],

        backgroundColor: [
          "#FACC15",
          "#8B5CF6",
          "#22C55E",
          "#EF4444",
        ],
      },
    ],
  };

  const barData = {
    labels: [
      "Applied",
      "Interview",
      "Offer",
      "Rejected",
    ],

    datasets: [
      {
        label: "Applications",
        data: [
          applied,
          interview,
          offer,
          rejected,
        ],

        backgroundColor: [
          "#FACC15",
          "#8B5CF6",
          "#22C55E",
          "#EF4444",
        ],
      },
    ],
  };

  return (
    <div className="grid md:grid-cols-2 gap-8 mt-10">

      <div className="bg-white p-5 rounded-xl shadow border">

        <h2 className="text-xl font-bold mb-5">
          Status Distribution
        </h2>

       <div className="h-80">
  <Pie
    data={pieData}
    options={{
      maintainAspectRatio: false,
    }}
  />
</div>

      </div>

      <div className="bg-white p-5 rounded-xl shadow border">

        <h2 className="text-xl font-bold mb-5">
          Applications Overview
        </h2>

        <div className="h-80">
  <Bar
    data={barData}
    options={{
      maintainAspectRatio: false,
    }}
  />
</div>

      </div>

    </div>
  );
}