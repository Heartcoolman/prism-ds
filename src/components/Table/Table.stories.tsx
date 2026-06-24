import type { Meta, StoryObj } from "@storybook/react";
import { Table } from "./Table";

const columns = [
  { key: "name", header: "名称" },
  { key: "status", header: "状态" },
  { key: "amount", header: "金额", numeric: true },
];

const rows = [
  { name: "订阅·年付", status: "已完成", amount: "¥698.00" },
  { name: "增值服务", status: "处理中", amount: "¥128.00" },
  { name: "退款", status: "已取消", amount: "−¥30.00" },
];

const meta = {
  title: "Data/Table",
  component: Table,
  parameters: { layout: "centered" },
  args: { columns, rows },
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
