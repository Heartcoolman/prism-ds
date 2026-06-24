import type { Meta, StoryObj } from "@storybook/react";
import { BarChart } from "./BarChart";

const monthly = [
  { label: "一月", value: 42 },
  { label: "二月", value: 55 },
  { label: "三月", value: 48 },
  { label: "四月", value: 61 },
  { label: "五月", value: 72 },
  { label: "六月", value: 68 },
  { label: "七月", value: 80 },
];

const meta = {
  title: "Data/BarChart",
  component: BarChart,
  parameters: { layout: "centered" },
  argTypes: {
    highlightIndex: { control: "number" },
    height: { control: "number" },
    showValues: { control: "boolean" },
  },
  args: {
    data: monthly,
    highlightIndex: monthly.length - 1,
    height: 160,
    showValues: true,
  },
} satisfies Meta<typeof BarChart>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => (
    <div style={{ width: 420 }}>
      <BarChart {...args} />
    </div>
  ),
};

export const Plain: Story = {
  render: () => (
    <div style={{ width: 420 }}>
      <BarChart data={monthly} highlightIndex={-1} />
    </div>
  ),
};
