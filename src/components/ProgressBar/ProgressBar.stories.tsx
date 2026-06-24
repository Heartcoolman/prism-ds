import type { Meta, StoryObj } from "@storybook/react";
import { ProgressBar } from "./ProgressBar";

const meta = {
  title: "Feedback/ProgressBar",
  component: ProgressBar,
  parameters: { layout: "centered" },
  argTypes: {
    value: { control: { type: "range", min: 0, max: 100, step: 1 } },
    indeterminate: { control: "boolean" },
    tone: { control: "inline-radio", options: ["accent", "success", "danger"] },
  },
  args: { value: 72, indeterminate: false, tone: "accent" },
  decorators: [
    (Story) => (
      <div style={{ width: 240 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ProgressBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Indeterminate: Story = {
  args: { indeterminate: true },
};

export const Tones: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <ProgressBar value={72} tone="accent" />
      <ProgressBar value={88} tone="success" />
      <ProgressBar value={34} tone="danger" />
    </div>
  ),
};
