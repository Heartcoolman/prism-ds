import type { Meta, StoryObj } from "@storybook/react";
import { Card } from "./Card";

const meta = {
  title: "Containers/Card",
  component: Card,
  parameters: { layout: "centered" },
  argTypes: {
    interactive: { control: "boolean" },
  },
  args: {
    eyebrow: "类别",
    title: "卡片标题",
    description: "一到两行的描述文字，用于补充标题、说明卡片内容的要点。",
    footer: (
      <a
        href="#"
        onClick={(e) => e.preventDefault()}
        style={{
          font: "var(--text-subhead)",
          fontWeight: 500,
          color: "var(--color-accent)",
          textDecoration: "none",
        }}
      >
        了解更多
      </a>
    ),
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => (
    <div style={{ width: 320 }}>
      <Card {...args} />
    </div>
  ),
};

export const WithMedia: Story = {
  render: () => (
    <div style={{ width: 320 }}>
      <Card
        media={<div className="prism-card__media-placeholder" />}
        eyebrow="精选"
        title="带媒体的卡片"
        description="顶部为 16:9 的媒体区域，下方承载文本与操作。"
      />
    </div>
  ),
};

export const Interactive: Story = {
  render: () => (
    <div style={{ width: 320 }}>
      <Card
        interactive
        media={<div className="prism-card__media-placeholder" />}
        eyebrow="可点击"
        title="交互卡片"
        description="悬停时整张卡片会轻微上浮并加深阴影。"
      />
    </div>
  ),
};
