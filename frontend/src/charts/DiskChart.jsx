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

export default function DiskLineChart({ diskSnapshots = [] }) {
    if (!diskSnapshots.length) return <p style={{ color: "#fff" }}>No Disk Data Available</p>;

    const parseSize = (size) => {
        if (!size) return 0;
        const unit = size.slice(-1).toUpperCase();
        const num = parseFloat(size);
        switch (unit) {
            case "K": return num / 1024 / 1024;
            case "M": return num / 1024;
            case "G": return num;
            case "T": return num * 1024;
            default: return num;
        }
    };

    const chartData = diskSnapshots.map(snapshot => {
        const point = { time: snapshot.timestamp };
        snapshot.disks.forEach(disk => {
            const used = disk.partitions.reduce((acc, p) => acc + parseSize(p.used || "0"), 0);
            point[disk.name] = used;
        });
        return point;
    });

    const latest = diskSnapshots[diskSnapshots.length - 1];
    const diskNames = latest.disks.map(disk => disk.name);
    const diskColors = ["#ff6b6b", "#4ecdc4", "#ffa500", "#8884d8", "#a28fd0"];

    return (
        <div style={{ backgroundColor: "#0a1f3c", padding: "20px", borderRadius: "12px" }}>
            <ResponsiveContainer width="100%" height={400}>
                <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#2a3b5f" />
                    <XAxis dataKey="time" stroke="#fff" tick={{ fill: "#fff", fontSize: 12 }} />
                    <YAxis stroke="#fff" tick={{ fill: "#fff", fontSize: 12 }} unit=" GB" />
                    <Tooltip contentStyle={{ backgroundColor: "#1a2a4f", border: "none", color: "#fff" }} />
                    <Legend wrapperStyle={{ color: "#fff" }} />
                    {diskNames.map((name, idx) => (
                        <Line
                            key={name}
                            type="monotone"
                            dataKey={name}
                            stroke={diskColors[idx % diskColors.length]}
                            strokeWidth={2}
                            dot={false}
                            isAnimationActive={true}
                            animationDuration={800}
                        />
                    ))}
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}
