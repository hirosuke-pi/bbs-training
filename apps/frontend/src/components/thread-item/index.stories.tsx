import type { Meta, StoryObj } from "@storybook/react-vite";
import { ThreadItem } from "./index";

const meta: Meta<typeof ThreadItem> = {
  title: "Components/ThreadItem",
  component: ThreadItem,
  args: {
    totalPost: 990,
    title: "aaaaaaaaaa実況",
    date: "2025/09/23 10:30",
    hasRemove: false,
  },
};
export default meta;

type Story = StoryObj<typeof ThreadItem>;

export const Default: Story = {};

export const HasRemove: Story = {
  args: {
    hasRemove: true,
    totalPost: 12,
    title: "テストスレッド",
    date: "2025/09/17 12:00",
  },
};

export const LongContent: Story = {
  args: {
    totalPost: 321,
    title:
      "あああああああああああああああああああああああああああああああああああああああああああああああ",
    date: "2025/09/17 13:45",
    hasRemove: true,
  },
};
