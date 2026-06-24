import type { Meta, StoryObj } from "@storybook/react";
import { Textarea } from "./Textarea";

const meta = {
  title: "Inputs/Textarea",
  component: Textarea,
  parameters: { layout: "centered" },
  argTypes: {
    disabled: { control: "boolean" },
    fullWidth: { control: "boolean" },
  },
  args: {
    label: "备注",
    placeholder: "添加备注…",
    fullWidth: true,
  },
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => (
    <div style={{ width: 320 }}>
      <Textarea {...args} />
    </div>
  ),
};

export const Error: Story = {
  render: () => (
    <div style={{ width: 320 }}>
      <Textarea
        label="反馈内容"
        placeholder="请描述你遇到的问题…"
        error="内容不能为空"
        fullWidth
      />
    </div>
  ),
};
