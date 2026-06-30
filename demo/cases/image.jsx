import { useState } from "react";
import { Image } from "../../dist/index.js";

const RATIOS = ["16:9", "4:3", "1:1", "3:4"];

export default function Demo() {
  const [ratio, setRatio] = useState("16:9");
  return (
    <div className="case">
      <div style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
        <div style={{ width: 200, display: "flex", flexDirection: "column", gap: 10 }}>
          <Image
            src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=480&q=80"
            alt="Mountain landscape"
            ratio={ratio}
            radius={12}
            overlay
          >
            <span style={{ color: "#fff", fontSize: 13, fontWeight: 600 }}>
              Yosemite
            </span>
          </Image>
          <div style={{ display: "flex", gap: 6 }}>
            {RATIOS.map((r) => (
              <button
                key={r}
                onClick={() => setRatio(r)}
                style={{
                  flex: 1,
                  fontSize: 12,
                  padding: "4px 0",
                  borderRadius: 6,
                  border: "1px solid var(--color-separator, #ccc)",
                  background: r === ratio ? "var(--color-accent, #0a84ff)" : "transparent",
                  color: r === ratio ? "#fff" : "inherit",
                  cursor: "pointer",
                }}
              >
                {r}
              </button>
            ))}
          </div>
        </div>
        <div style={{ width: 110 }}>
          <Image alt="Placeholder" ratio="1:1" radius={12} />
        </div>
      </div>
    </div>
  );
}
