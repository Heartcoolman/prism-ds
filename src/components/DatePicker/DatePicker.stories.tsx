import type { Meta, StoryObj } from "@storybook/react";
import { DatePicker } from "./DatePicker";

const meta = {
  title: "Pickers/DatePicker",
  component: DatePicker,
  parameters: { layout: "centered" },
  args: {
    defaultMonth: new Date(2026, 5, 1),
    value: new Date(2026, 5, 24),
  },
} satisfies Meta<typeof DatePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const NoSelection: Story = {
  args: {
    defaultMonth: new Date(2026, 5, 1),
    value: null,
  },
};
