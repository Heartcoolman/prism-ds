import type { Meta, StoryObj } from "@storybook/react";
import { Banner } from "./Banner";

const meta = {
  title: "Feedback/Banner",
  component: Banner,
  parameters: { layout: "centered" },
  argTypes: {
    tone: {
      control: "inline-radio",
      options: ["info", "success", "warning", "danger"],
    },
  },
  args: { tone: "info", title: "有新版本可用。" },
} satisfies Meta<typeof Banner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const AllTones: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 12, width: 360 }}>
      <Banner tone="warning" title="连接不稳定">
        网络信号较弱，部分内容可能加载缓慢。
      </Banner>
      <Banner tone="success" title="已同步">
        所有更改已保存到云端。
      </Banner>
      <Banner tone="danger" title="上传失败">
        文件超过大小限制，请重试。
      </Banner>
    </div>
  ),
};
