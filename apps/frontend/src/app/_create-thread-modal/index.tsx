"use client";

import CreateThreadModal from "@/components/create-thread-modal";
import { useState } from "react";
import { useCreateThreadMutation } from "./use-create-thread-mutation";

export function CreateThreadModalContainer() {
  const [isOpen, setIsOpen] = useState(false);
  const mutation = useCreateThreadMutation();

  return (
    <div>
      <CreateThreadModal
        open={isOpen}
        onOpenChange={setIsOpen}
        onSubmit={mutation.mutate}
        isSubmitting={mutation.isPending}
      >
        <button
          type="button"
          aria-label="スレッドを作成"
          className="fixed bottom-6 right-6 inline-flex h-16 w-16 items-center justify-center rounded-full cursor-pointer bg-teal-500 text-3xl font-bold text-white shadow-lg ring-1 ring-black/5 transition hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-white/60"
        >
          ＋
        </button>
      </CreateThreadModal>
    </div>
  );
}
