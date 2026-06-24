import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button";

const meta = {
  title: "Inputs/Button",
  component: Button,
  parameters: { layout: "centered" },
  argTypes: {
    variant: {
      control: "inline-radio",
      options: ["filled", "tinted", "gray", "bordered", "plain"],
    },
    size: { control: "inline-radio", options: ["small", "medium", "large"] },
    tone: { control: "inline-radio", options: ["accent", "danger", "success"] },
    disabled: { control: "boolean" },
    fullWidth: { control: "boolean" },
  },
  args: { children: "下载", variant: "filled", size: "medium", tone: "accent" },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Variants: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
      <Button variant="filled">主操作</Button>
      <Button variant="tinted">着色</Button>
      <Button variant="gray">次级</Button>
      <Button variant="bordered">描边</Button>
      <Button variant="plain">文字</Button>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
      <Button size="small">Small · 28</Button>
      <Button size="medium">Medium · 44</Button>
      <Button size="large">Large · 50</Button>
    </div>
  ),
};

export const Tones: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
      <Button tone="accent">继续</Button>
      <Button tone="danger">删除</Button>
      <Button tone="success">完成</Button>
      <Button variant="tinted" tone="danger">
        移除
      </Button>
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
      <Button>默认</Button>
      <Button disabled>禁用</Button>
      <Button variant="gray" disabled>
        禁用
      </Button>
    </div>
  ),
};

export const WithIcon: Story = {
  args: {
    children: "下载",
    leadingIcon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3v12m0 0 4-4m-4 4-4-4M5 21h14" />
      </svg>
    ),
  },
};
