import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { CreateThreadModal } from "./index";

const meta: Meta<typeof CreateThreadModal> = {
  title: "Components/CreateThreadModal",
  component: CreateThreadModal,
};
export default meta;

type Story = StoryObj<typeof CreateThreadModal>;

export const Default: Story = {
  render: () => <CreateThreadModal />,
};

export const OpenControlled: Story = {
  render: () => {
    const [open, setOpen] = useState(true);
    return (
      <div className="h-[400px]">
        <CreateThreadModal
          open={open}
          onOpenChange={setOpen}
          defaultValues={{ username: "名無し", email: "" }}
          onSubmit={async (v) => {
            // 模擬送信
            await new Promise((r) => setTimeout(r, 500));
            console.log("submit", v);
          }}
        />
      </div>
    );
  },
};

export const Submitting: Story = {
  render: () => {
    return (
      <CreateThreadModal
        open
        isSubmitting
        onSubmit={() => {}}
        defaultValues={{
          title: "送信中サンプル",
          content: "本文",
          username: "名無し",
        }}
      />
    );
  },
};
