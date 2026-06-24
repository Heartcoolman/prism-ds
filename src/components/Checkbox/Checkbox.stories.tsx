import type { Meta, StoryObj } from "@storybook/react";
import { Checkbox } from "./Checkbox";

const meta = {
  title: "Inputs/Checkbox",
  component: Checkbox,
  parameters: { layout: "centered" },
  argTypes: {
    indeterminate: { control: "boolean" },
    disabled: { control: "boolean" },
    checked: { control: "boolean" },
  },
  args: { label: "我已阅读并同意" },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Checked: Story = {
  args: { label: "订阅产品更新", defaultChecked: true },
};

export const Indeterminate: Story = {
  args: { label: "全选", indeterminate: true },
};

export const Disabled: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <Checkbox label="禁用未选中" disabled />
      <Checkbox label="禁用已选中" disabled defaultChecked />
    </div>
  ),
};
