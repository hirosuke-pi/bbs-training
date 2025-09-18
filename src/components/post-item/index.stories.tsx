import type { Meta, StoryObj } from "@storybook/react-vite";
import { PostItem } from "./index";

const meta: Meta<typeof PostItem> = {
  title: "Components/PostItem",
  component: PostItem,
  args: {
    index: 200,
    username: "名無しさん",
    content: "ああああああああ\nああああああああ\nつつつつs",
    hasRemove: false,
    createdAt: new Date().toISOString(),
    anonId: "abcd1234",
  },
};
export default meta;

type Story = StoryObj<typeof PostItem>;

export const Default: Story = {};

export const Removable: Story = {
  args: {
    hasRemove: true,
    index: 12,
    username: "テスター",
    createdAt: new Date().toISOString(),
    anonId: "rmbl0001",
  },
};

export const Highlight: Story = {
  args: {
    highlight: true,
    index: 123,
    username: "FocusUser",
    createdAt: new Date().toISOString(),
    anonId: "focus999",
  },
};

export const LongContent: Story = {
  args: {
    index: 321,
    content:
      "長文テキスト 長文テキスト 長文テキスト 長文テキスト 長文テキスト 長文テキスト 長文テキスト 長文テキスト 長文テキスト 長文テキスト 長文テキスト 長文テキスト\n改行2行目\n改行3行目",
    createdAt: new Date().toISOString(),
    anonId: "long8888",
  },
};

export const EmptyUsername: Story = {
  args: {
    username: "",
    index: 45,
    createdAt: new Date().toISOString(),
    anonId: "empty000",
  },
};
