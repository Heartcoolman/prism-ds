import type { Meta, StoryObj } from "@storybook/react";
import { List, ListRow } from "./List";

const meta = {
  title: "Containers/List",
  component: List,
  parameters: { layout: "centered" },
  args: { inset: false },
} satisfies Meta<typeof List>;

export default meta;
type Story = StoryObj<typeof meta>;

const Frame = ({ children }: { children: React.ReactNode }) => (
  <div style={{ width: 360 }}>{children}</div>
);

export const Playground: Story = {
  render: (args) => (
    <Frame>
      <List {...args}>
        <ListRow title="无线局域网" subtitle="家庭网络" />
        <ListRow title="蓝牙" subtitle="已连接 2 台设备" />
        <ListRow title="蜂窝网络" subtitle="已开启" />
      </List>
    </Frame>
  ),
};

export const WithChevron: Story = {
  render: (args) => (
    <Frame>
      <List {...args}>
        <ListRow title="通用" trailing="iOS 18.5" chevron onClick={() => {}} />
        <ListRow title="显示与亮度" trailing="自动" chevron onClick={() => {}} />
        <ListRow title="隐私与安全性" chevron onClick={() => {}} />
      </List>
    </Frame>
  ),
};

export const WithLeading: Story = {
  render: (args) => (
    <Frame>
      <List {...args}>
        <ListRow
          leading={
            <span
              style={{
                display: "inline-flex",
                width: 32,
                height: 32,
                borderRadius: 999,
                background: "var(--tint-accent-bg)",
                color: "var(--color-accent)",
                alignItems: "center",
                justifyContent: "center",
                font: "var(--text-subhead)",
                fontWeight: 600,
              }}
            >
              李
            </span>
          }
          title="李伟"
          subtitle="个人 Apple 账户"
          chevron
          onClick={() => {}}
        />
        <ListRow
          leading={
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z" />
              <path d="m4 8 8 5 8-5" />
            </svg>
          }
          title="邮件"
          subtitle="3 封未读"
          chevron
          onClick={() => {}}
        />
        <ListRow
          leading={
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="9" />
              <path d="M12 7v5l3 2" />
            </svg>
          }
          title="屏幕使用时间"
          trailing="2 小时 14 分钟"
          chevron
          onClick={() => {}}
        />
      </List>
    </Frame>
  ),
};
