import { useState } from "react";
import { ThemeProvider, apple, neutral, Button, Card, Badge } from "../../dist/index.js";

const presets = { apple, neutral };

export default function Demo() {
  const [preset, setPreset] = useState("apple");
  const [colorScheme, setColorScheme] = useState("light");

  return (
    <div className="case">
      <div style={{ display: "flex", gap: 6, marginBottom: 10, flexWrap: "wrap" }}>
        <Button
          size="small"
          variant={preset === "apple" ? "filled" : "tinted"}
          onClick={() => setPreset("apple")}
        >
          apple
        </Button>
        <Button
          size="small"
          variant={preset === "neutral" ? "filled" : "tinted"}
          onClick={() => setPreset("neutral")}
        >
          neutral
        </Button>
        <Button
          size="small"
          variant="bordered"
          tone="accent"
          onClick={() =>
            setColorScheme((s) => (s === "light" ? "dark" : "light"))
          }
        >
          {colorScheme}
        </Button>
      </div>

      <ThemeProvider
        theme={presets[preset]}
        colorScheme={colorScheme}
        style={{
          padding: 16,
          borderRadius: 14,
          background: "var(--prism-color-bg, #fff)",
        }}
      >
        <Card
          eyebrow="Theme"
          title={`${preset} preset`}
          description="Tokens, accent color and radii reskin every component under the provider."
          footer={
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <Button size="small" variant="filled">
                Primary
              </Button>
              <Button size="small" variant="tinted">
                Secondary
              </Button>
              <Badge count={3} />
            </div>
          }
        />
      </ThemeProvider>
    </div>
  );
}
