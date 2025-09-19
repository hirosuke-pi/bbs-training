import type { Meta, StoryObj } from "@storybook/react-vite";
import { Spinner } from "./index";

const meta: Meta<typeof Spinner> = {
  title: "Components/Spinner",
  component: Spinner,
  parameters: {
    layout: "centered",
  },
};
export default meta;

type Story = StoryObj<typeof Spinner>;

export const Default: Story = {};
