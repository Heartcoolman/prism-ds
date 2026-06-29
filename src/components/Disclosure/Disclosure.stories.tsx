import type { Meta, StoryObj } from "@storybook/react";
import { Disclosure } from "./Disclosure";

const meta = {
  title: "Containers/Disclosure",
  component: Disclosure,
  parameters: { layout: "centered" },
  argTypes: {
    defaultOpen: { control: "boolean" },
  },
  args: {
    title: "如何退订？",
    children: "在「设置 › 订阅」中选择当前订阅，点击退订即可。",
  },
} satisfies Meta<typeof Disclosure>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Multiple: Story = {
  render: () => (
    <div
      style={{
        width: 360,
        background: "var(--bg-elevated)",
        borderRadius: "var(--radius-card)",
        boxShadow: "var(--shadow-card)",
        overflow: "hidden",
      }}
    >
      <Disclosure title="如何退订？" defaultOpen>
        在「设置 › 订阅」中选择当前订阅，点击退订即可。
      </Disclosure>
      <div style={{ height: 1, background: "var(--separator)", marginInline: "var(--s-4)" }} />
      <Disclosure title="支持哪些支付方式？">
        支持信用卡、借记卡及主流移动支付，部分地区支持运营商代扣。
      </Disclosure>
    </div>
  ),
};
