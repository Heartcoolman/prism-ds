import { useState } from "react";
import { ProgressBar } from "../../dist/index.js";

export default function Demo() {
  const [value, setValue] = useState(60);
  return (
    <div className="case">
      <div style={{ display: "flex", flexDirection: "column", gap: 14, width: 280 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <ProgressBar value={value} tone="accent" />
          <input
            type="range"
            min={0}
            max={100}
            value={value}
            onChange={(e) => setValue(Number(e.target.value))}
            aria-label="Progress value"
          />
        </div>
        <ProgressBar value={80} tone="success" />
        <ProgressBar value={35} tone="danger" />
        <ProgressBar indeterminate />
      </div>
    </div>
  );
}
