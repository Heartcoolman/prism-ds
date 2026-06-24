import type { Meta, StoryObj } from "@storybook/react";
import { LineChart } from "./LineChart";

const trend = [8, 10, 9, 13, 12, 16, 15, 19, 18, 22, 24, 27];

const meta = {
  title: "Data/LineChart",
  component: LineChart,
  parameters: { layout: "centered" },
  argTypes: {
    width: { control: { type: "number" } },
    height: { control: { type: "number" } },
    area: { control: "boolean" },
    strokeWidth: { control: { type: "number" } },
  },
  args: {
    data: trend,
    width: 260,
    height: 96,
    area: true,
    strokeWidth: 2,
    "aria-label": "近 12 个月销量趋势",
  },
} satisfies Meta<typeof LineChart>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const NoArea: Story = {
  args: { area: false, "aria-label": "净增用户趋势" },
};
