import type { Meta, StoryObj } from "@storybook/react";
import { Slider } from "./Slider";

const meta = {
  title: "Inputs/Slider",
  component: Slider,
  parameters: { layout: "centered" },
  argTypes: {
    showValue: { control: "boolean" },
    disabled: { control: "boolean" },
  },
  args: { min: 0, max: 100, defaultValue: 60 },
  decorators: [
    (Story) => (
      <div style={{ width: 280 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Slider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const WithValue: Story = {
  args: { label: "音量", showValue: true, min: 0, max: 100, defaultValue: 60 },
};
