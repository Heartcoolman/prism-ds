import type { Meta, StoryObj } from "@storybook/react";
import { Menu } from "./Menu";

const EditIcon = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M4 20h4L18.5 9.5a2.12 2.12 0 0 0-3-3L5 17v3Z" />
    <path d="M13.5 6.5l3 3" />
  </svg>
);

const ShareIcon = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 3v12" />
    <path d="M8 7l4-4 4 4" />
    <path d="M5 13v6a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-6" />
  </svg>
);

const TrashIcon = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M4 7h16" />
    <path d="M10 11v6M14 11v6" />
    <path d="M6 7l1 13a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1l1-13" />
    <path d="M9 7V4h6v3" />
  </svg>
);

const meta = {
  title: "Navigation/Menu",
  component: Menu,
  parameters: { layout: "centered" },
  args: {
    open: true,
    items: [
      { label: "编辑", icon: EditIcon },
      { label: "分享", icon: ShareIcon },
      "separator",
      { label: "删除", icon: TrashIcon, danger: true },
    ],
  },
} satisfies Meta<typeof Menu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const PlainItems: Story = {
  args: {
    items: [
      { label: "重命名" },
      { label: "复制" },
      { label: "移动到…" },
      "separator",
      { label: "删除", danger: true },
    ],
  },
};

export const WithDisabled: Story = {
  args: {
    items: [
      { label: "撤销", icon: EditIcon },
      { label: "重做", icon: EditIcon, disabled: true },
      "separator",
      { label: "清空", danger: true, disabled: true },
    ],
  },
};
