import * as React from "react";
import { Sheet } from "@prism-ds/react";

// Owned preview: the Sheet panel is position:fixed, so on its own it
// contributes 0 in-flow height and the card collapses (RENDER_THIN). Wrap it
// in a sized in-flow stage; the fixed scrim/panel then fill the single-mode
// card's containing block, which now has height. Inner content mirrors the
// Sheet story (3 share targets with real glyphs) so the preview matches it.

const target = {
  display: "flex",
  flexDirection: "column" as const,
  alignItems: "center",
  gap: 8,
  font: "var(--text-footnote)",
  color: "var(--label-secondary)",
};

const iconWrap = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: 56,
  height: 56,
  borderRadius: "var(--radius-card)",
  background: "var(--fill-tertiary)",
  color: "var(--label-primary)",
};

const MessageIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M21 11.5a8.38 8.38 0 0 1-8.5 8.5 9 9 0 0 1-4-1L3 20l1-4.5a8.5 8.5 0 1 1 16 .5Z" />
  </svg>
);

const MailIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m4 7 8 6 8-6" />
  </svg>
);

const CopyIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="9" y="9" width="11" height="11" rx="2" />
    <path d="M5 15V5a2 2 0 0 1 2-2h10" />
  </svg>
);

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
      <div style={{ display: "flex", gap: 24, justifyContent: "flex-start" }}>
        <div style={target}>
          <span style={iconWrap}><MessageIcon /></span>
          信息
        </div>
        <div style={target}>
          <span style={iconWrap}><MailIcon /></span>
          邮件
        </div>
        <div style={target}>
          <span style={iconWrap}><CopyIcon /></span>
          复制
        </div>
      </div>
    </Sheet>
  </div>
);
