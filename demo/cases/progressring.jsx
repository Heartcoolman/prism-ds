import { useState } from "react";
import { ProgressRing } from "../../dist/index.js";

export default function Demo() {
  const [value, setValue] = useState(64);
  return (
    <div className="case">
      <div style={{ display: "flex", flexDirection: "column", gap: 14, alignItems: "center" }}>
        <div style={{ display: "flex", gap: 18, alignItems: "center" }}>
          <ProgressRing value={value} size={84} tone="accent" />
          <ProgressRing value={100} size={64} tone="success" label="Done" />
          <ProgressRing value={28} size={64} tone="danger" />
        </div>
        <input
          type="range"
          min={0}
          max={100}
          value={value}
          onChange={(e) => setValue(Number(e.target.value))}
          aria-label="Ring value"
          style={{ width: 240 }}
        />
      </div>
    </div>
  );
}
