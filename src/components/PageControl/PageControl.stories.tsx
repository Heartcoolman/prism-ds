import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { PageControl } from "./PageControl";

const meta = {
  title: "Navigation/PageControl",
  component: PageControl,
  parameters: { layout: "centered" },
  argTypes: {
    count: { control: { type: "number", min: 1, max: 12 } },
    index: { control: { type: "number", min: 0 } },
  },
  args: { count: 5, index: 2 },
} satisfies Meta<typeof PageControl>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Lengths: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16, alignItems: "center" }}>
      <PageControl count={3} index={0} />
      <PageControl count={5} index={2} />
      <PageControl count={8} index={5} />
    </div>
  ),
};

export const Interactive: Story = {
  render: () => {
    const [page, setPage] = useState(0);
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 16, alignItems: "center" }}>
        <div style={{ font: "var(--text-subhead)", color: "var(--label-secondary)" }}>
          第 {page + 1} 页
        </div>
        <PageControl count={6} index={page} onChange={setPage} />
      </div>
    );
  },
};
