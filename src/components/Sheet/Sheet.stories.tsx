import type { Meta, StoryObj } from "@storybook/react";
import { Sheet } from "./Sheet";

const meta = {
  title: "Overlays/Sheet",
  component: Sheet,
  parameters: { layout: "fullscreen" },
  args: { open: true, title: "分享到" },
} satisfies Meta<typeof Sheet>;

export default meta;
type Story = StoryObj<typeof meta>;

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

export const Playground: Story = {
  render: (args) => (
    <Sheet {...args}>
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
  ),
};
