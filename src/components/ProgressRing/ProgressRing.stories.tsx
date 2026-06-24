import type { Meta, StoryObj } from "@storybook/react";
import { ProgressRing } from "./ProgressRing";

const meta = {
  title: "Data/ProgressRing",
  component: ProgressRing,
  parameters: { layout: "centered" },
  argTypes: {
    value: { control: { type: "range", min: 0, max: 100, step: 1 } },
    size: { control: { type: "number" } },
    thickness: { control: { type: "number" } },
    tone: { control: "inline-radio", options: ["accent", "success", "danger"] },
  },
  args: { value: 72, size: 96, thickness: 12, tone: "accent" },
} satisfies Meta<typeof ProgressRing>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
      <ProgressRing value={45} size={64} thickness={8} />
      <ProgressRing value={88} size={120} thickness={14} tone="success" />
    </div>
  ),
};
