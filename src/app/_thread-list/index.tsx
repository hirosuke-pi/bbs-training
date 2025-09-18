"use client";

import ThreadItem from "@/components/thread-item";
import { useThreadListQuery } from "./use-thread-list-query";

export function ThreadList() {
  const { threads } = useThreadListQuery();

  return (
    <div className="rounded-3xl p-4 sm:p-8">
      <h2 className="text-xl font-bold text-gray-900">スレッド一覧</h2>
      <hr className="mt-2 mb-4 border-gray-200" />
      <ul className="space-y-4 flex flex-wrap gap-4">
        {threads.map((thread) => (
          <li
            onClick={(e) => {
              e.preventDefault();
              console.log(thread.id);
            }}
            key={thread.id}
            className="w-full min-w-[300px] sm:w-[400px] cursor-pointer hover:scale-[1.02] transition-transform"
          >
            <ThreadItem
              totalPosts={thread.totalPosts}
              title={thread.title}
              date={thread.createdAt}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
