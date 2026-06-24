import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { RadioGroup } from "./Radio";

const meta = {
  title: "Inputs/Radio",
  component: RadioGroup,
  parameters: { layout: "centered" },
  args: {
    name: "demo",
    value: "a",
    onChange: () => {},
    options: [
      { label: "选项 A", value: "a" },
      { label: "选项 B", value: "b" },
      { label: "选项 C", value: "c" },
    ],
  },
} satisfies Meta<typeof RadioGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => {
    const [value, setValue] = useState("a");
    return <RadioGroup {...args} value={value} onChange={setValue} />;
  },
};

export const Horizontal: Story = {
  render: (args) => {
    const [value, setValue] = useState("b");
    return (
      <RadioGroup
        {...args}
        orientation="horizontal"
        value={value}
        onChange={setValue}
      />
    );
  },
};
