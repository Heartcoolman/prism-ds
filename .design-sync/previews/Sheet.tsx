import * as React from "react";
import { Sheet } from "apple-style-ds";

// Owned preview: the Sheet panel is position:fixed, so on its own it
// contributes 0 in-flow height and the card collapses (RENDER_THIN). Wrap it
// in a sized in-flow stage; the fixed scrim/panel then fill the single-mode
// card's containing block, which now has height.
const share = ["信息", "邮件", "复制", "更多"];

export const Playground = () => (
  <div
    style={{
      position: "relative",
      width: 390,
      height: 560,
      background: "var(--bg-secondary)",
      borderRadius: 16,
      overflow: "hidden",
    }}
  >
    <Sheet open title="分享到" onClose={() => {}}>
      <div style={{ display: "flex", gap: 16, paddingTop: 8 }}>
        {share.map((label) => (
          <div
            key={label}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 8,
            }}
          >
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: 16,
                background: "var(--fill-tertiary)",
              }}
            />
            <span
              style={{
                font: "var(--text-footnote)",
                color: "var(--label-secondary)",
              }}
            >
              {label}
            </span>
          </div>
        ))}
      </div>
    </Sheet>
  </div>
);
