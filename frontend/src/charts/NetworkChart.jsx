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

export default function NetworkDashboard({ data = [] }) {
  if (!data.length) return <p style={{ color: "#fff" }}>No Network Data Available</p>;

  const chartContainerStyle = {
    backgroundColor: "#0a1f3c",
    padding: "20px",
    borderRadius: "12px"
  };

  const cartesianGridColor = "#2a3b5f";
  const axisProps = { stroke: "#fff", tick: { fill: "#fff" } };
  const tooltipStyle = { backgroundColor: "#1a2a4f", border: "none", color: "#fff" };
  const legendStyle = { color: "#fff" };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "30px" }}>
      {/* Throughput Chart */}
      <div style={chartContainerStyle}>
        <h3 style={{ color: "#fff" }}>Network Throughput (B/s)</h3>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={cartesianGridColor} />
            <XAxis dataKey="time" {...axisProps} />
            <YAxis 
              {...axisProps}
              label={{ value: "B/s", angle: -90, position: "insideLeft", fill: "#fff" }}
              tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
            />
            <Tooltip contentStyle={tooltipStyle} formatter={(value) => `${value.toLocaleString()} B/s`} />
            <Legend wrapperStyle={legendStyle} verticalAlign="top" height={36} />
            <Line type="monotone" dataKey="incomingBps" name="Incoming" stroke="#8884d8" dot={false} />
            <Line type="monotone" dataKey="outgoingBps" name="Outgoing" stroke="#82ca9d" dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Total Bytes Chart */}
      <div style={chartContainerStyle}>
        <h3 style={{ color: "#fff" }}>Network Total Bytes</h3>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={cartesianGridColor} />
            <XAxis dataKey="time" {...axisProps} />
            <YAxis 
              {...axisProps}
              label={{ value: "Bytes", angle: -90, position: "insideLeft", fill: "#fff" }}
              tickFormatter={(value) => `${(value / 1_000_000).toFixed(1)}M`}
            />
            <Tooltip contentStyle={tooltipStyle} formatter={(value) => `${value.toLocaleString()} B`} />
            <Legend wrapperStyle={legendStyle} verticalAlign="top" height={36} />
            <Line type="monotone" dataKey="incomingTotal" name="Incoming Total" stroke="#8884d8" dot={false} />
            <Line type="monotone" dataKey="outgoingTotal" name="Outgoing Total" stroke="#82ca9d" dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
