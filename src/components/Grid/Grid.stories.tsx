import type { CSSProperties } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Grid } from "./Grid";

const cellStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: 64,
  background: "var(--fill-secondary)",
  borderRadius: "var(--radius-inner)",
  font: "var(--text-subhead)",
  color: "var(--label-secondary)",
};

function Cell({ n }: { n: number }) {
  return <div style={cellStyle}>{n}</div>;
}

const meta = {
  title: "Containers/Grid",
  component: Grid,
  parameters: { layout: "fullscreen" },
  args: {},
} satisfies Meta<typeof Grid>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: () => (
    <div style={{ padding: "var(--s-5)" }}>
      <Grid>
        {Array.from({ length: 8 }, (_, i) => (
          <Cell key={i} n={i + 1} />
        ))}
      </Grid>
    </div>
  ),
};

export const Fixed: Story = {
  render: () => (
    <div style={{ padding: "var(--s-5)" }}>
      <Grid columns={3}>
        {Array.from({ length: 6 }, (_, i) => (
          <Cell key={i} n={i + 1} />
        ))}
      </Grid>
    </div>
  ),
};
