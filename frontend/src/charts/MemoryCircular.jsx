import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import 'react-circular-progressbar/dist/styles.css';

export default function MemoryCircular({ ram = [], virtual = [] }) {
  if (!ram.length && !virtual.length) return <p>No Memory Data</p>;

  const latestRam = ram[ram.length - 1] || { usagePercent: 0 };
  const latestVM = virtual[virtual.length - 1] || { usagePercent: 0 };

  return (
    <div style={{ display: "flex", gap: "2rem" }}>
      <div style={{ width: 120 }}>
        <h4>RAM Usage</h4>
        <CircularProgressbar
          value={latestRam.usagePercent}
          text={`${latestRam.usagePercent}%`}
          styles={buildStyles({ pathColor: "#8884d8", textColor: "#ffffffff" })}
        />
      </div>
      <div style={{ width: 120 }}>
        <h4>Virtual M.</h4>
        <CircularProgressbar
          value={latestVM.usagePercent}
          text={`${latestVM.usagePercent}%`}
          styles={buildStyles({ pathColor: "#82ca9d", textColor: "#ffffffff" })}
        />
      </div>
    </div>
  );
}
