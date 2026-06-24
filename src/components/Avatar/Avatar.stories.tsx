import type { Meta, StoryObj } from "@storybook/react";
import { Avatar, AvatarGroup } from "./Avatar";

const meta = {
  title: "Data/Avatar",
  component: Avatar,
  parameters: { layout: "centered" },
  argTypes: {
    size: { control: "inline-radio", options: ["small", "medium", "large"] },
    status: { control: "inline-radio", options: ["online", "none"] },
  },
  args: { name: "林轩", size: "medium", status: "none" },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Image: Story = {
  args: {
    name: "林轩",
    src: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&h=200&fit=crop",
    status: "online",
  },
};

export const Group: Story = {
  render: () => (
    <AvatarGroup max={4}>
      <Avatar name="林轩" />
      <Avatar name="陈思" />
      <Avatar name="王磊" />
      <Avatar name="赵敏" />
      <Avatar name="周强" />
    </AvatarGroup>
  ),
};
