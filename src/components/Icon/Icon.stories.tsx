import type { Meta, StoryObj } from "@storybook/react";
import { Icon } from "./Icon";
import { icons } from "./icons";
import type { IconName } from "./icons";

const names = Object.keys(icons) as IconName[];

const meta = {
  title: "Foundations/Icon",
  component: Icon,
  parameters: { layout: "centered" },
  argTypes: {
    name: { control: "select", options: names },
    size: { control: { type: "range", min: 16, max: 48, step: 2 } },
  },
  args: { name: "search", size: 24, strokeWidth: 2 },
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Gallery: Story = {
  render: () => (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(6, 1fr)",
        gap: 16,
        maxWidth: 520,
        color: "var(--label-primary)",
      }}
    >
      {names.map((n) => (
        <div
          key={n}
          style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}
        >
          <Icon name={n} />
          <span style={{ font: "var(--text-footnote)", color: "var(--label-tertiary)" }}>{n}</span>
        </div>
      ))}
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 16, alignItems: "center", color: "var(--color-accent)" }}>
      {[16, 20, 24, 32, 40].map((s) => (
        <Icon key={s} name="bell" size={s} />
      ))}
    </div>
  ),
};
