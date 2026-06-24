import type { Meta, StoryObj } from "@storybook/react";
import { Switch } from "./Switch";

const meta = {
  title: "Inputs/Switch",
  component: Switch,
  parameters: { layout: "centered" },
  argTypes: {
    checked: { control: "boolean" },
    disabled: { control: "boolean" },
  },
  args: {},
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const On: Story = {
  args: { defaultChecked: true },
};

export const Disabled: Story = {
  args: { disabled: true, defaultChecked: true },
};

export const WithLabel: Story = {
  args: { label: "启用通知" },
};
