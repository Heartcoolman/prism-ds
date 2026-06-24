import type { Meta, StoryObj } from "@storybook/react";
import { Select } from "./Select";

const meta = {
  title: "Inputs/Select",
  component: Select,
  parameters: { layout: "centered" },
  argTypes: {
    disabled: { control: "boolean" },
    fullWidth: { control: "boolean" },
  },
  args: {
    label: "语言",
    fullWidth: false,
    children: (
      <>
        <option value="zh-Hans">中文（简体）</option>
        <option value="en">English</option>
        <option value="ja">日本語</option>
      </>
    ),
  },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Error: Story = {
  args: {
    error: "请选择一种语言",
    defaultValue: "",
    children: (
      <>
        <option value="" disabled>
          请选择
        </option>
        <option value="zh-Hans">中文（简体）</option>
        <option value="en">English</option>
        <option value="ja">日本語</option>
      </>
    ),
  },
};
