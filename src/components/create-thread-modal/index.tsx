"use client";
import * as Dialog from "@radix-ui/react-dialog";
import React, { useState } from "react";

export type CreateThreadValues = {
  title: string;
  content: string;
  email: string;
  username: string;
};

export type CreateThreadModalProps = {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onSubmit?: (values: CreateThreadValues) => Promise<void> | void;
  isSubmitting?: boolean;
  defaultValues?: Partial<CreateThreadValues>;
  children?: React.ReactNode;
};

const defaultForm: CreateThreadValues = {
  title: "",
  content: "",
  email: "",
  username: "",
};

export const CreateThreadModal: React.FC<CreateThreadModalProps> = ({
  open,
  onOpenChange,
  onSubmit,
  isSubmitting = false,
  defaultValues,
  children,
}) => {
  const [internalOpen, setInternalOpen] = useState(false);
  const isControlled = open !== undefined;
  const actualOpen = isControlled ? open : internalOpen;
  const setOpen = (v: boolean) => {
    if (!isControlled) setInternalOpen(v);
    onOpenChange?.(v);
  };

  const [form, setForm] = useState<CreateThreadValues>({
    ...defaultForm,
    ...defaultValues,
  });
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    try {
      await onSubmit?.(form);
      // 成功したら閉じて初期化
      setForm({ ...defaultForm, ...defaultValues });
      setOpen(false);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Dialog.Root open={actualOpen} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/30 backdrop-blur-sm data-[state=open]:animate-fadeIn" />
        <Dialog.Content className="fixed left-1/2 top-1/2 w-[min(100%-2rem,520px)] -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white p-6 shadow-xl focus:outline-none data-[state=open]:animate-scaleIn">
          <Dialog.Title className="text-lg font-bold">
            新しいスレッドを作成
          </Dialog.Title>
          <Dialog.Description className="mt-1 text-sm text-gray-500">
            タイトルと最初の投稿内容、任意のユーザー情報を入力してください。
          </Dialog.Description>
          <form className="mt-4 space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="mb-1 block text-sm font-medium" htmlFor="title">
                スレッドタイトル
              </label>
              <input
                id="title"
                name="title"
                required
                value={form.title}
                onChange={handleChange}
                className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-400"
                placeholder="例: 速報スレッド"
              />
            </div>
            <div>
              <label
                className="mb-1 block text-sm font-medium"
                htmlFor="content"
              >
                最初の投稿内容
              </label>
              <textarea
                id="content"
                name="content"
                required
                value={form.content}
                onChange={handleChange}
                rows={4}
                className="w-full resize-y rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-400"
                placeholder="本文を入力"
              />
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label
                  className="mb-1 block text-sm font-medium"
                  htmlFor="email"
                >
                  メールアドレス
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-400"
                  placeholder="任意"
                />
              </div>
              <div>
                <label
                  className="mb-1 block text-sm font-medium"
                  htmlFor="username"
                >
                  ユーザー名
                </label>
                <input
                  id="username"
                  name="username"
                  value={form.username}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-400"
                  placeholder="名無し"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <Dialog.Close asChild>
                <button
                  type="button"
                  className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-sky-400"
                >
                  キャンセル
                </button>
              </Dialog.Close>
              <button
                type="submit"
                disabled={isSubmitting}
                className="rounded-md bg-sky-600 px-5 py-2 text-sm font-semibold text-white shadow hover:bg-sky-700 disabled:cursor-not-allowed disabled:opacity-60 focus:outline-none focus:ring-2 focus:ring-sky-400"
              >
                {isSubmitting ? "作成中..." : "作成する"}
              </button>
            </div>
          </form>
          <Dialog.Close asChild>
            <button
              aria-label="閉じる"
              className="absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-full text-gray-500 hover:bg-gray-100 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-sky-400"
            >
              <span className="text-lg leading-none">×</span>
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default CreateThreadModal;
