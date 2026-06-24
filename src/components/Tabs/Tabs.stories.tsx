import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Tabs } from "./Tabs";

const sampleTabs = [
  { key: "概览", label: "概览" },
  { key: "规格", label: "规格" },
  { key: "评价", label: "评价" },
  { key: "相关", label: "相关" },
];

const meta = {
  title: "Navigation/Tabs",
  component: Tabs,
  parameters: { layout: "centered" },
  argTypes: {
    fullWidth: { control: "boolean" },
  },
  args: { tabs: sampleTabs, onChange: () => {}, value: "概览", fullWidth: false },
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => {
    const [value, setValue] = useState(args.value);
    return <Tabs {...args} value={value} onChange={setValue} />;
  },
};

export const FullWidth: Story = {
  render: () => {
    const [value, setValue] = useState("规格");
    return (
      <div style={{ width: 360 }}>
        <Tabs tabs={sampleTabs} value={value} onChange={setValue} fullWidth />
      </div>
    );
  },
};
