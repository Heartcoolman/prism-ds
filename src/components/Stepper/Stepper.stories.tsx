import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Stepper } from "./Stepper";

const meta = {
  title: "Inputs/Stepper",
  component: Stepper,
  parameters: { layout: "centered" },
  argTypes: {
    min: { control: "number" },
    max: { control: "number" },
    step: { control: "number" },
    disabled: { control: "boolean" },
  },
  args: { value: 2, onChange: () => {}, step: 1 },
} satisfies Meta<typeof Stepper>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => {
    const [value, setValue] = useState(args.value);
    return <Stepper {...args} value={value} onChange={setValue} />;
  },
};

export const Bounded: Story = {
  args: { value: 0, min: 0, max: 5 },
  render: (args) => {
    const [value, setValue] = useState(args.value);
    return <Stepper {...args} value={value} onChange={setValue} />;
  },
};
