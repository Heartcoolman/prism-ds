import type { Meta, StoryObj } from "@storybook/react";
import { Popover } from "./Popover";
import { Button } from "../Button";

const menu = (
  <ul
    style={{
      listStyle: "none",
      margin: 0,
      padding: 0,
      display: "flex",
      flexDirection: "column",
      gap: 2,
      minWidth: 140,
    }}
  >
    {["收藏", "稍后读"].map((label) => (
      <li
        key={label}
        style={{
          padding: "8px 12px",
          borderRadius: 10,
          font: "400 15px/1.45 var(--font-sans)",
          color: "var(--label-primary)",
          cursor: "pointer",
        }}
      >
        {label}
      </li>
    ))}
  </ul>
);

const meta = {
  title: "Overlays/Popover",
  component: Popover,
  parameters: { layout: "centered" },
  argTypes: {
    placement: {
      control: "inline-radio",
      options: ["top", "bottom", "left", "right"],
    },
    open: { control: "boolean" },
  },
  args: { open: true, placement: "bottom", content: menu, children: "选项" },
  render: (args) => (
    <div style={{ padding: 96 }}>
      <Popover {...args}>
        <Button variant="tinted">选项</Button>
      </Popover>
    </div>
  ),
} satisfies Meta<typeof Popover>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Placements: Story = {
  render: () => (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(2, auto)",
        gap: 96,
        padding: 96,
      }}
    >
      {(["top", "bottom", "left", "right"] as const).map((p) => (
        <Popover key={p} open placement={p} content={menu}>
          <Button variant="gray">{p}</Button>
        </Popover>
      ))}
    </div>
  ),
};
