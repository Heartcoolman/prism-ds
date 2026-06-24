import type { Meta, StoryObj } from "@storybook/react";
import { Tag } from "./Tag";

const meta = {
  title: "Data/Tag",
  component: Tag,
  parameters: { layout: "centered" },
  argTypes: {
    tone: {
      control: "inline-radio",
      options: ["gray", "accent", "success", "warning", "danger"],
    },
    selected: { control: "boolean" },
  },
  args: { children: "标签", tone: "gray" },
} satisfies Meta<typeof Tag>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
      <Tag>设计</Tag>
      <Tag>规范</Tag>
      <Tag>草稿</Tag>
    </div>
  ),
};

export const Selected: Story = {
  args: { children: "已选", tone: "accent", selected: true },
};

export const Removable: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
      <Tag onRemove={() => {}}>设计</Tag>
      <Tag tone="accent" onRemove={() => {}}>
        规范
      </Tag>
      <Tag tone="success" onRemove={() => {}}>
        已发布
      </Tag>
    </div>
  ),
};
