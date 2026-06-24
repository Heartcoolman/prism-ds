import type { Meta, StoryObj } from "@storybook/react";
import { SearchField } from "./SearchField";

const meta = {
  title: "Inputs/SearchField",
  component: SearchField,
  parameters: { layout: "centered" },
  argTypes: {
    fullWidth: { control: "boolean" },
  },
  args: { placeholder: "搜索" },
} satisfies Meta<typeof SearchField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const WithValue: Story = {
  args: { value: "设计规范" },
};
