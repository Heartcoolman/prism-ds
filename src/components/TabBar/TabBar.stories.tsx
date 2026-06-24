import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { TabBar } from "./TabBar";
import type { TabBarItem } from "./TabBar";

const icon = (path: string) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d={path} />
  </svg>
);

const items: TabBarItem[] = [
  { key: "首页", label: "首页", icon: icon("M3 11.5 12 4l9 7.5M5 10v10h14V10") },
  { key: "搜索", label: "搜索", icon: icon("M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14ZM20 20l-4-4") },
  { key: "通知", label: "通知", icon: icon("M18 8a6 6 0 1 0-12 0c0 7-3 8-3 8h18s-3-1-3-8M10 21a2 2 0 0 0 4 0") },
  { key: "我的", label: "我的", icon: icon("M20 21a8 8 0 0 0-16 0M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z") },
];

const meta = {
  title: "Navigation/TabBar",
  component: TabBar,
  parameters: { layout: "centered" },
  args: { items, value: "首页", onChange: () => {} },
} satisfies Meta<typeof TabBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => {
    const [value, setValue] = useState(args.value);
    return (
      <div style={{ width: 390 }}>
        <TabBar {...args} value={value} onChange={setValue} />
      </div>
    );
  },
};
