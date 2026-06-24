import type { Meta, StoryObj } from "@storybook/react";
import { StateView } from "./StateView";
import { Button } from "../Button";

const meta = {
  title: "Feedback/StateView",
  component: StateView,
  parameters: { layout: "centered" },
  argTypes: {
    variant: {
      control: "inline-radio",
      options: ["empty", "loading", "error", "success"],
    },
  },
  args: {
    variant: "empty",
    title: "还没有项目",
    description: "创建第一个项目开始吧。",
  },
} satisfies Meta<typeof StateView>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Empty: Story = {
  args: {
    variant: "empty",
    title: "还没有项目",
    description: "创建第一个项目开始吧。",
    action: <Button variant="filled">新建项目</Button>,
  },
};

export const Loading: Story = {
  args: {
    variant: "loading",
    title: "加载中…",
    description: "加载中…",
  },
};

export const Error: Story = {
  args: {
    variant: "error",
    title: "加载失败",
    description: "请检查网络后重试。",
    action: <Button variant="gray">重试</Button>,
  },
};

export const Success: Story = {
  args: {
    variant: "success",
    title: "提交完成",
    description: "我们会尽快与你联系。",
  },
};
