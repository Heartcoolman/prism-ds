import { useState } from "react";
import { Material, Button } from "../../dist/index.js";

const thicknesses = ["ultraThin", "thin", "regular", "thick"];

export default function Demo() {
  const [thickness, setThickness] = useState("regular");
  const [progressive, setProgressive] = useState(false);

  return (
    <div className="case">
      <div
        style={{
          position: "relative",
          borderRadius: 16,
          overflow: "hidden",
          padding: 20,
          background:
            "linear-gradient(135deg, #ff6a88 0%, #6a8dff 55%, #5ce0c0 100%)",
        }}
      >
        <div style={{ color: "#fff", fontWeight: 600, fontSize: 13 }}>
          Content behind the glass
        </div>
        <div
          style={{
            color: "rgba(255,255,255,.85)",
            fontSize: 12,
            lineHeight: 1.5,
            marginTop: 4,
          }}
        >
          A vibrant gradient sits beneath the frosted surface so the backdrop
          blur and saturation are visible.
        </div>
        <Material
          thickness={thickness}
          progressive={progressive}
          style={{ marginTop: 14, padding: 14, borderRadius: 12 }}
        >
          <div style={{ fontWeight: 600, fontSize: 13 }}>{thickness} material</div>
          <div style={{ fontSize: 12, opacity: 0.7 }}>
            backdrop-blur frosted chrome
          </div>
        </Material>
      </div>

      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: 10 }}>
        {thicknesses.map((t) => (
          <Button
            key={t}
            size="small"
            variant={t === thickness ? "filled" : "tinted"}
            onClick={() => setThickness(t)}
          >
            {t}
          </Button>
        ))}
        <Button
          size="small"
          variant={progressive ? "filled" : "bordered"}
          tone="success"
          onClick={() => setProgressive((p) => !p)}
        >
          progressive
        </Button>
      </div>
    </div>
  );
}
