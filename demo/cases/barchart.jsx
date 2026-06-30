import { useState } from "react";
import { BarChart } from "../../dist/index.js";

const DATA = [
  { label: "Mon", value: 32 },
  { label: "Tue", value: 58 },
  { label: "Wed", value: 41 },
  { label: "Thu", value: 70 },
  { label: "Fri", value: 49 },
];

export default function Demo() {
  const [highlight, setHighlight] = useState(3);
  return (
    <div className="case">
      <div style={{ width: 300, display: "flex", flexDirection: "column", gap: 10 }}>
        <BarChart
          data={DATA}
          height={120}
          highlightIndex={highlight}
          showValues
        />
        <div style={{ display: "flex", gap: 6 }}>
          {DATA.map((d, i) => (
            <button
              key={i}
              onClick={() => setHighlight(i)}
              style={{
                flex: 1,
                fontSize: 12,
                padding: "4px 0",
                borderRadius: 6,
                border: "1px solid var(--color-separator, #ccc)",
                background: i === highlight ? "var(--color-accent, #0a84ff)" : "transparent",
                color: i === highlight ? "#fff" : "inherit",
                cursor: "pointer",
              }}
            >
              {d.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
