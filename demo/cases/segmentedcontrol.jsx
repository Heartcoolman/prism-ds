import { useState } from "react";
import { SegmentedControl } from "../../dist/index.js";

const VIEWS = [
  { label: "Day", value: "day" },
  { label: "Week", value: "week" },
  { label: "Month", value: "month" },
];

const SIZE_OPTS = [
  { label: "List", value: "list" },
  { label: "Grid", value: "grid" },
];

export default function Demo() {
  const [view, setView] = useState("week");
  const [layout, setLayout] = useState("grid");

  return (
    <div className="case" style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <SegmentedControl options={VIEWS} value={view} onChange={setView} fullWidth />
      <SegmentedControl options={SIZE_OPTS} value={layout} onChange={setLayout} size="small" />
      <div style={{ fontSize: 13, opacity: 0.6 }}>
        {view} · {layout}
      </div>
    </div>
  );
}
