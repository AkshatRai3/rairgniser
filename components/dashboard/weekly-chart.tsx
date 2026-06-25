"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";

const data = [
  { day: "Mon", value: 40 },
  { day: "Tue", value: 60 },
  { day: "Wed", value: 75 },
  { day: "Thu", value: 70 },
  { day: "Fri", value: 85 },
  { day: "Sat", value: 90 },
  { day: "Sun", value: 80 },
];

export default function WeeklyChart() {
  return (
    <div className="border rounded-2xl p-6">
      <h2 className="text-xl font-semibold mb-4">
        Weekly Completion
      </h2>

      <div className="h-72">
        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <LineChart data={data}>
            <XAxis dataKey="day" />
            <YAxis />
            <Line
              type="monotone"
              dataKey="value"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}