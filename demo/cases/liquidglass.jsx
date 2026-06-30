import { useState } from "react";
import { LiquidGlass, Button, Icon } from "../../dist/index.js";

export default function Demo() {
  const [pill, setPill] = useState(true);

  return (
    <div className="case">
      <div
        style={{
          position: "relative",
          borderRadius: 16,
          overflow: "hidden",
          minHeight: 150,
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "center",
          padding: 16,
          background:
            "radial-gradient(120% 120% at 20% 10%, #7c5cff 0%, #ff5c9d 45%, #ffb347 100%)",
        }}
      >
        <span
          style={{
            position: "absolute",
            top: 14,
            left: 16,
            color: "#fff",
            fontWeight: 600,
            fontSize: 13,
          }}
        >
          Floating control layer
        </span>

        <LiquidGlass
          pill={pill}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            padding: pill ? "6px 10px" : "10px 12px",
            color: "#fff",
          }}
        >
          <Button size="small" variant="plain" leadingIcon={<Icon name="play" size={16} />}>
            Play
          </Button>
          <Button size="small" variant="plain" leadingIcon={<Icon name="heart" size={16} />}>
            Like
          </Button>
          <Button size="small" variant="plain" leadingIcon={<Icon name="share" size={16} />}>
            Share
          </Button>
        </LiquidGlass>
      </div>

      <div style={{ display: "flex", gap: 6, marginTop: 10 }}>
        <Button
          size="small"
          variant={pill ? "filled" : "tinted"}
          onClick={() => setPill(true)}
        >
          pill
        </Button>
        <Button
          size="small"
          variant={!pill ? "filled" : "tinted"}
          onClick={() => setPill(false)}
        >
          rounded
        </Button>
      </div>
    </div>
  );
}
