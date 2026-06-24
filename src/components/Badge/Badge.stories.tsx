import type { Meta, StoryObj } from "@storybook/react";
import { Badge } from "./Badge";

const meta = {
  title: "Feedback/Badge",
  component: Badge,
  parameters: { layout: "centered" },
  argTypes: {
    tone: { control: "inline-radio", options: ["danger", "accent", "gray"] },
    dot: { control: "boolean" },
    count: { control: "number" },
    max: { control: "number" },
  },
  args: { count: 3, tone: "danger", max: 99 },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Dot: Story = {
  args: { dot: true, count: undefined },
};

const BellIcon = (
  <svg
    width="28"
    height="28"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
  </svg>
);

export const OnIcon: Story = {
  render: () => (
    <span style={{ color: "var(--label-primary)" }}>
      <Badge count={5}>{BellIcon}</Badge>
    </span>
  ),
};

export const Overflow: Story = {
  args: { count: 128, max: 99 },
};
