import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { SegmentedControl } from "./SegmentedControl";

const meta = {
  title: "Inputs/SegmentedControl",
  component: SegmentedControl,
  parameters: { layout: "centered" },
  argTypes: {
    size: { control: "inline-radio", options: ["small", "medium"] },
    fullWidth: { control: "boolean" },
  },
  args: {
    onChange: () => {},
    options: [
      { label: "概览", value: "overview" },
      { label: "规格", value: "specs" },
      { label: "评价", value: "reviews" },
    ],
    value: "overview",
    size: "medium",
  },
} satisfies Meta<typeof SegmentedControl>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => {
    const [value, setValue] = useState(args.value);
    return <SegmentedControl {...args} value={value} onChange={setValue} />;
  },
};

export const TwoOption: Story = {
  render: () => {
    const [view, setView] = useState("list");
    return (
      <SegmentedControl
        options={[
          { label: "列表", value: "list" },
          { label: "网格", value: "grid" },
        ]}
        value={view}
        onChange={setView}
      />
    );
  },
};
