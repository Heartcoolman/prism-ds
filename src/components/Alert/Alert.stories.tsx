import type { Meta, StoryObj } from "@storybook/react";
import { Alert } from "./Alert";

const meta = {
  title: "Feedback/Alert",
  component: Alert,
  parameters: { layout: "centered" },
  argTypes: {
    destructive: { control: "boolean" },
    stacked: { control: "boolean" },
  },
  args: {
    open: true,
    title: "删除草稿？",
    message: "此操作无法撤销。",
    destructive: true,
    confirmLabel: "删除",
    cancelLabel: "取消",
  },
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Confirm: Story = {
  args: {
    title: "退出登录？",
    message: "你需要重新输入密码才能再次登录。",
    destructive: false,
    confirmLabel: "退出",
    cancelLabel: "取消",
  },
};

export const Stacked: Story = {
  args: {
    title: "清空回收站？",
    message: "回收站内的所有项目将被永久删除。",
    destructive: true,
    stacked: true,
    confirmLabel: "永久删除",
    cancelLabel: "取消",
  },
};

export const TitleOnly: Story = {
  args: {
    title: "确认提交此申请？",
    message: undefined,
    destructive: false,
    confirmLabel: "提交",
    cancelLabel: "取消",
  },
};
