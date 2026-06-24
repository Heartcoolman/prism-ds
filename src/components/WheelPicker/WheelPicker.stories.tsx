import type { Meta, StoryObj } from "@storybook/react";
import { WheelPicker } from "./WheelPicker";

const meta = {
  title: "Pickers/WheelPicker",
  component: WheelPicker,
  parameters: { layout: "centered" },
  argTypes: {
    visibleCount: { control: { type: "number", min: 3, max: 7, step: 2 } },
  },
  args: {
    visibleCount: 5,
    columns: [
      {
        key: "period",
        value: "上午",
        options: [
          { label: "上午", value: "上午" },
          { label: "下午", value: "下午" },
          { label: "晚上", value: "晚上" },
        ],
      },
      {
        key: "hour",
        value: "09",
        options: [
          { label: "08", value: "08" },
          { label: "09", value: "09" },
          { label: "10", value: "10" },
          { label: "11", value: "11" },
        ],
      },
      {
        key: "minute",
        value: "30",
        options: [
          { label: "00", value: "00" },
          { label: "15", value: "15" },
          { label: "30", value: "30" },
          { label: "45", value: "45" },
        ],
      },
    ],
  },
} satisfies Meta<typeof WheelPicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const SingleColumn: Story = {
  args: {
    columns: [
      {
        key: "weekday",
        value: "周三",
        options: [
          { label: "周一", value: "周一" },
          { label: "周二", value: "周二" },
          { label: "周三", value: "周三" },
          { label: "周四", value: "周四" },
          { label: "周五", value: "周五" },
          { label: "周六", value: "周六" },
          { label: "周日", value: "周日" },
        ],
      },
    ],
  },
};
