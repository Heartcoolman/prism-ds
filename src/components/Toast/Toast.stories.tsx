import type { Meta, StoryObj } from "@storybook/react";
import { Toast } from "./Toast";

const meta = {
  title: "Feedback/Toast",
  component: Toast,
  parameters: { layout: "centered" },
  argTypes: {
    variant: {
      control: "inline-radio",
      options: ["neutral", "success", "error"],
    },
    open: { control: "boolean" },
  },
  args: { message: "已保存到云端", variant: "success", open: true },
} satisfies Meta<typeof Toast>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Error: Story = {
  args: { message: "连接失败", variant: "error" },
};
