import type { Meta, StoryObj } from "@storybook/react";
import { Image } from "./Image";

const meta = {
  title: "Containers/Image",
  component: Image,
  parameters: { layout: "centered" },
  argTypes: {
    ratio: { control: "inline-radio", options: ["16:9", "4:3", "1:1", "3:4"] },
    overlay: { control: "boolean" },
  },
  args: { ratio: "16:9", overlay: false },
} satisfies Meta<typeof Image>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => (
    <div style={{ width: 360 }}>
      <Image {...args} />
    </div>
  ),
};

export const WithOverlay: Story = {
  render: () => (
    <div style={{ width: 360 }}>
      <Image
        ratio="16:9"
        overlay
        src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=720&q=80"
        alt="山间晨雾"
      >
        <div style={{ color: "#ffffff", font: "var(--text-headline)" }}>
          山间晨雾
        </div>
        <div style={{ color: "#ffffff", font: "var(--text-footnote)", opacity: 0.85 }}>
          清晨六点 · 风景摄影
        </div>
      </Image>
    </div>
  ),
};

export const Ratios: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
      <div style={{ width: 200 }}>
        <Image ratio="16:9" />
      </div>
      <div style={{ width: 140 }}>
        <Image ratio="1:1" />
      </div>
      <div style={{ width: 140 }}>
        <Image ratio="3:4" />
      </div>
    </div>
  ),
};
