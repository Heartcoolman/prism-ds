import type { Meta, StoryObj } from "@storybook/react";
import { TextField } from "./TextField";

const meta = {
  title: "Inputs/TextField",
  component: TextField,
  parameters: { layout: "centered" },
  argTypes: {
    disabled: { control: "boolean" },
    fullWidth: { control: "boolean" },
  },
  args: {
    label: "邮箱地址",
    placeholder: "name@example.com",
    helpText: "我们不会公开你的邮箱。",
  },
} satisfies Meta<typeof TextField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Error: Story = {
  args: {
    error: "请输入有效的邮箱地址。",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};
