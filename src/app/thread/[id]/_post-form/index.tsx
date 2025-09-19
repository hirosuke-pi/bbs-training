import { postContent } from "@/atoms/post";
import * as Accordion from "@radix-ui/react-accordion";
import { useAtom } from "jotai";
import { useState } from "react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import { usePostFormMutation } from "./use-post-form-mutation";

type Props = {
  threadId: string;
};

export function PostForm({ threadId }: Props) {
  const [username, setUsername] = useState("");
  const [content, setContent] = useAtom(postContent);
  const [email, setEmail] = useState("");
  const [openItems, setOpenItems] = useState<string[]>(["postForm"]);

  const { mutate } = usePostFormMutation(threadId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate({ content, username, email });
    setContent("");
    setUsername("");
    setEmail("");
  };

  return (
    <Accordion.Root
      type="multiple"
      value={openItems}
      onValueChange={(v) => setOpenItems(v as string[])}
      className="border-t rounded-t-xl border-neutral-300 bg-white min-h-[90px]"
    >
      <Accordion.Item value="postForm" className="border-none">
        <Accordion.Header>
          <Accordion.Trigger className="cursor-pointer w-full">
            <div className="flex items-center gap-2 px-3 py-2 text-sm">
              {openItems.includes("postForm") ? <FaAngleDown /> : <FaAngleUp />}
              <span className="text-neutral-900 font-medium">投稿フォーム</span>
            </div>
          </Accordion.Trigger>
        </Accordion.Header>
        <Accordion.Content className="overflow-hidden transition data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down  h-[300px]">
          <form onSubmit={handleSubmit} className="p-3 space-y-2">
            <textarea
              className="w-full resize-y rounded-md border border-neutral-300 p-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 min-h-[120px]"
              rows={4}
              placeholder="投稿内容"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            <div className="flex flex-col gap-2 sm:flex-row">
              <input
                type="text"
                placeholder="名無しさん"
                className="sm:flex-1 rounded-md border border-neutral-300 p-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <input
                type="email"
                placeholder="メール (任意)"
                className="sm:flex-1 rounded-md border border-neutral-300 p-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="flex justify-end pt-1">
              <button
                type="submit"
                className="px-5 py-2 rounded-md bg-teal-600 text-white text-sm font-medium hover:bg-teal-700 cursor-pointer disabled:opacity-50"
                disabled={!content.trim()}
              >
                送信
              </button>
            </div>
          </form>
        </Accordion.Content>
      </Accordion.Item>
    </Accordion.Root>
  );
}
