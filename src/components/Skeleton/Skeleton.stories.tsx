import type { Meta, StoryObj } from "@storybook/react";
import { Skeleton } from "./Skeleton";

const meta = {
  title: "Feedback/Skeleton",
  component: Skeleton,
  parameters: { layout: "centered" },
  argTypes: {
    variant: { control: "inline-radio", options: ["text", "rect", "circle"] },
    lines: { control: { type: "number", min: 1, max: 6 } },
  },
  args: { variant: "text", lines: 3 },
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => (
    <div style={{ width: 280 }}>
      <Skeleton {...args} />
    </div>
  ),
};

export const Card: Story = {
  render: () => (
    <div
      style={{
        width: 280,
        display: "flex",
        flexDirection: "column",
        gap: 16,
      }}
    >
      <Skeleton variant="rect" width="100%" style={{ aspectRatio: "16 / 9" }} />
      <Skeleton variant="text" lines={2} />
    </div>
  ),
};
