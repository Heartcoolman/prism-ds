import type { Meta, StoryObj } from "@storybook/react";
import type { ReactNode } from "react";
import { Material } from "./Material";

// A vivid backdrop so the blur/saturate material is actually visible.
const Stage = ({ children, h = 200 }: { children: ReactNode; h?: number }) => (
  <div
    style={{
      width: 360,
      height: h,
      borderRadius: 20,
      overflow: "hidden",
      position: "relative",
      background:
        "linear-gradient(135deg,#0066cc 0%,#1d8a4e 45%,#c2410c 80%,#c5283d 100%)",
      display: "grid",
      placeItems: "center",
      padding: 24,
    }}
  >
    {children}
  </div>
);

const meta = {
  title: "Materials/Material",
  component: Material,
  parameters: { layout: "centered" },
  argTypes: {
    thickness: {
      control: "inline-radio",
      options: ["ultraThin", "thin", "regular", "thick"],
    },
    progressive: { control: "boolean" },
  },
  args: { thickness: "regular" },
} satisfies Meta<typeof Material>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => (
    <Stage>
      <Material {...args} style={{ padding: 20, minWidth: 220 }}>
        <div style={{ font: "var(--text-headline)" }}>毛玻璃材质</div>
        <div style={{ font: "var(--text-footnote)", color: "var(--label-secondary)" }}>
          半透明、随层级加厚,叠加 saturate 保持背景色彩活力。
        </div>
      </Material>
    </Stage>
  ),
};

export const Thicknesses: Story = {
  render: () => (
    <Stage h={260}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        {(["ultraThin", "thin", "regular", "thick"] as const).map((t) => (
          <Material key={t} thickness={t} style={{ padding: 14, textAlign: "center" }}>
            <span style={{ font: "var(--text-subhead)", fontWeight: 600 }}>{t}</span>
          </Material>
        ))}
      </div>
    </Stage>
  ),
};

export const ProgressiveBar: Story = {
  render: () => (
    <Stage h={220}>
      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "flex-end" }}>
        <Material
          progressive
          thickness="thick"
          style={{
            width: "100%",
            height: 96,
            borderRadius: 0,
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-around",
            padding: "0 0 14px",
          }}
        >
          {["首页", "搜索", "我的"].map((l) => (
            <span key={l} style={{ font: "var(--text-footnote)", color: "var(--label-primary)" }}>
              {l}
            </span>
          ))}
        </Material>
      </div>
    </Stage>
  ),
};
