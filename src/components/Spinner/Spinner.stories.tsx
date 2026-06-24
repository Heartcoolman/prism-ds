import type { Meta, StoryObj } from "@storybook/react";
import { Spinner } from "./Spinner";

const meta = {
  title: "Feedback/Spinner",
  component: Spinner,
  parameters: { layout: "centered" },
  argTypes: {
    size: { control: "inline-radio", options: ["small", "medium", "large"] },
    showLabel: { control: "boolean" },
  },
  args: { size: "medium", label: "加载中", showLabel: false },
} satisfies Meta<typeof Spinner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 32, alignItems: "center" }}>
      <Spinner size="small" />
      <Spinner size="medium" />
      <Spinner size="large" />
    </div>
  ),
};
