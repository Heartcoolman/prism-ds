import type { Meta, StoryObj } from "@storybook/react";
import type { ReactNode } from "react";
import { LiquidGlass } from "./LiquidGlass";

// Liquid Glass only reads correctly over real content — give it a vivid stage.
const Stage = ({ children, h = 240 }: { children: ReactNode; h?: number }) => (
  <div
    style={{
      width: 380,
      height: h,
      borderRadius: 22,
      overflow: "hidden",
      position: "relative",
      background:
        "radial-gradient(120% 120% at 20% 10%,#3393ff 0%,#0066cc 35%,#1d8a4e 70%,#c2410c 100%)",
      display: "grid",
      placeItems: "center",
      padding: 28,
    }}
  >
    {children}
  </div>
);

const meta = {
  title: "Materials/LiquidGlass",
  component: LiquidGlass,
  parameters: { layout: "centered" },
  argTypes: { pill: { control: "boolean" } },
  args: {},
} satisfies Meta<typeof LiquidGlass>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => (
    <Stage>
      <LiquidGlass {...args} style={{ width: 260 }}>
        <div style={{ font: "var(--text-footnote)", color: "var(--label-secondary)", letterSpacing: "0.08em" }}>
          NOW PLAYING
        </div>
        <div style={{ font: "var(--text-headline)", marginTop: 4 }}>流动的玻璃</div>
        <div style={{ font: "var(--text-footnote)", color: "var(--label-secondary)", marginTop: 6 }}>
          实时折射与镜面高光,拾取背后的色彩与光线。
        </div>
      </LiquidGlass>
    </Stage>
  ),
};

export const Pill: Story = {
  render: () => (
    <Stage h={200}>
      <LiquidGlass pill style={{ display: "flex", gap: 20, alignItems: "center" }}>
        {["M6 4v16M18 4v16M9 7l8 5-8 5", "M5 12h14", "M12 5v14"].map((d, i) => (
          <svg key={i} width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d={d} />
          </svg>
        ))}
      </LiquidGlass>
    </Stage>
  ),
};

export const Controls: Story = {
  render: () => (
    <Stage h={220}>
      <LiquidGlass style={{ display: "flex", gap: 12, alignItems: "center", width: 280 }}>
        <div style={{ width: 48, height: 48, borderRadius: 12, background: "rgba(255,255,255,0.5)" }} />
        <div style={{ flex: 1 }}>
          <div style={{ font: "var(--text-subhead)", fontWeight: 600 }}>悬浮工具栏</div>
          <div style={{ font: "var(--text-footnote)", color: "var(--label-secondary)" }}>轻盈、不抢戏</div>
        </div>
      </LiquidGlass>
    </Stage>
  ),
};
