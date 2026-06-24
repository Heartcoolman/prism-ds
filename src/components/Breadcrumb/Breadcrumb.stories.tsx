import type { Meta, StoryObj } from "@storybook/react";
import { Breadcrumb } from "./Breadcrumb";

const meta = {
  title: "Navigation/Breadcrumb",
  component: Breadcrumb,
  parameters: { layout: "centered" },
  args: {
    items: [
      { label: "设计", href: "#" },
      { label: "组件", href: "#" },
      { label: "按钮" },
    ],
  },
} satisfies Meta<typeof Breadcrumb>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const WithLinks: Story = {
  args: {
    items: [
      { label: "首页", href: "#" },
      { label: "产品", href: "#" },
      { label: "Mac", href: "#" },
      { label: "MacBook Pro" },
    ],
  },
};

export const ButtonNavigation: Story = {
  args: {
    items: [
      { label: "设计" },
      { label: "组件" },
      { label: "按钮" },
    ],
    onNavigate: (index: number) => {
      // eslint-disable-next-line no-console
      console.log("navigate to", index);
    },
  },
};

export const SingleLevel: Story = {
  args: {
    items: [{ label: "概览" }],
  },
};
