import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

export default function CpuGpuChart({ cpuData = [], gpuData = [] }) {
  if (!cpuData.length && !gpuData.length) return <p style={{ color: "#fff" }}>No CPU/GPU data available</p>;

  const formattedData = cpuData.map((c, i) => ({
    time: c.time.split(" ")[1] || c.time,
    CPU: c.usage,
    CPU_temp: c.temperature,
    GPU: gpuData[i] ? gpuData[i].usage : null,
    GPU_temp: gpuData[i] ? gpuData[i].temperature : null,
  }));

  return (
    <div style={{ backgroundColor: "#0a1f3c", padding: "20px", borderRadius: "12px" }}>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={formattedData} margin={{ top: 20, right: 50, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#2a3b5f" />
          <XAxis dataKey="time" stroke="#fff" tick={{ fill: "#fff", fontSize: 12 }} />
          <YAxis
            yAxisId="left"
            domain={[0, 100]}
            stroke="#fff"
            tick={{ fill: "#fff", fontSize: 12 }}
            label={{ value: "Usage %", angle: -90, position: "insideLeft", fill: "#fff" }}
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            stroke="#fff"
            tick={{ fill: "#fff", fontSize: 12 }}
            label={{ value: "Temp °C", angle: 90, position: "insideRight", fill: "#fff" }}
          />
          <Tooltip contentStyle={{ backgroundColor: "#1a2a4f", border: "none", color: "#fff" }} />
          <Legend wrapperStyle={{ color: "#fff" }} />
          <Line yAxisId="left" type="monotone" dataKey="CPU" stroke="#8884d8" dot={false} />
          {gpuData.length > 0 && <Line yAxisId="left" type="monotone" dataKey="GPU" stroke="#82ca9d" dot={false} />}
          <Line yAxisId="right" type="monotone" dataKey="CPU_temp" stroke="#ff7300" dot={false} strokeDasharray="5 5" />
          {gpuData.length > 0 && <Line yAxisId="right" type="monotone" dataKey="GPU_temp" stroke="#ff0000" dot={false} strokeDasharray="5 5" />}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
