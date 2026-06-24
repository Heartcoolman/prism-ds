import type { Meta, StoryObj } from "@storybook/react";
import { NavBar } from "./NavBar";
import { Button } from "../Button/Button";

const meta = {
  title: "Navigation/NavBar",
  component: NavBar,
  parameters: { layout: "fullscreen" },
  argTypes: {
    large: { control: "boolean" },
  },
  args: { title: "详情" },
} satisfies Meta<typeof NavBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const WithBack: Story = {
  render: () => (
    <NavBar
      title="账户"
      onBack={() => {}}
      trailing={
        <Button variant="plain" size="small">
          编辑
        </Button>
      }
    />
  ),
};

export const LargeTitle: Story = {
  args: { large: true, title: "设置" },
};
