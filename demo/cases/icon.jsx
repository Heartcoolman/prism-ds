import { useState } from "react";
import { Icon, Button } from "../../dist/index.js";

const names = [
  "home",
  "search",
  "bell",
  "heart",
  "star",
  "settings",
  "calendar",
  "camera",
  "download",
  "share",
];

const sizes = [20, 24, 32, 40];

export default function Demo() {
  const [size, setSize] = useState(32);
  const [strokeWidth, setStrokeWidth] = useState(2);

  return (
    <div className="case">
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 16,
          alignItems: "center",
          padding: "16px 4px",
          color: "var(--prism-color-accent, #0a84ff)",
        }}
      >
        {names.map((name) => (
          <Icon key={name} name={name} size={size} strokeWidth={strokeWidth} aria-label={name} />
        ))}
      </div>

      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: 6 }}>
        {sizes.map((s) => (
          <Button
            key={s}
            size="small"
            variant={s === size ? "filled" : "tinted"}
            onClick={() => setSize(s)}
          >
            {s}px
          </Button>
        ))}
        <Button
          size="small"
          variant="bordered"
          tone="accent"
          onClick={() => setStrokeWidth((w) => (w >= 2.5 ? 1.5 : w + 0.5))}
        >
          stroke {strokeWidth}
        </Button>
      </div>
    </div>
  );
}
