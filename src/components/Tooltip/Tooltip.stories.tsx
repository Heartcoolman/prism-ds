import type { Meta, StoryObj } from "@storybook/react";
import { Tooltip } from "./Tooltip";
import { Button } from "../Button/Button";

const meta = {
  title: "Overlays/Tooltip",
  component: Tooltip,
  parameters: { layout: "centered" },
  argTypes: {
    placement: {
      control: "inline-radio",
      options: ["top", "bottom", "left", "right"],
    },
    open: { control: "boolean" },
  },
  args: { label: "复制链接", children: "复制", placement: "top", open: true },
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => (
    <Tooltip {...args}>
      <Button variant="gray" size="small">
        复制
      </Button>
    </Tooltip>
  ),
};

export const Placements: Story = {
  render: () => (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        gap: 48,
        padding: 48,
        placeItems: "center",
      }}
    >
      <Tooltip label="顶部提示" placement="top" open>
        <Button variant="gray" size="small">
          上
        </Button>
      </Tooltip>
      <Tooltip label="底部提示" placement="bottom" open>
        <Button variant="gray" size="small">
          下
        </Button>
      </Tooltip>
      <Tooltip label="左侧提示" placement="left" open>
        <Button variant="gray" size="small">
          左
        </Button>
      </Tooltip>
      <Tooltip label="右侧提示" placement="right" open>
        <Button variant="gray" size="small">
          右
        </Button>
      </Tooltip>
    </div>
  ),
};

export const OnHover: Story = {
  render: () => (
    <Tooltip label="将链接复制到剪贴板" placement="top">
      <Button variant="bordered" size="small">
        悬停查看
      </Button>
    </Tooltip>
  ),
};
