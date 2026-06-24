import type { Meta, StoryObj } from "@storybook/react";
import { Modal } from "./Modal";
import { Button } from "../Button";

const meta = {
  title: "Overlays/Modal",
  component: Modal,
  parameters: { layout: "centered" },
  args: {
    open: true,
    title: "开启通知？",
    children: "及时获取重要更新。",
    actions: (
      <>
        <Button variant="gray">以后</Button>
        <Button variant="filled">开启</Button>
      </>
    ),
  },
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
