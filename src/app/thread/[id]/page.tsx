"use client";

import PostItem from "@/components/post-item";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useRef } from "react";
import { FaArrowLeft } from "react-icons/fa";
import ThreadPageLayout from "./_layout";
import { PostForm } from "./_post-form";
import { PostMermaidViewer } from "./post-mermaid-viewer";
import { useThreadItemQuery } from "./use-thread-item-query";

export default function ThreadPage() {
  const { id } = useParams<{ id: string }>();
  const { data } = useThreadItemQuery(id);
  const scrollRef = useRef<HTMLDivElement>(null);

  // 投稿一覧が更新されるたびに最下部へ自動スクロール
  useEffect(() => {
    if (!data?.posts || data.posts.length === 0) return;
    const el = scrollRef.current;
    if (!el) return;

    el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [data?.posts]);

  return (
    <ThreadPageLayout
      renderHeader={() => (
        <Link href="/" className="py-2 hover:opacity-80">
          <div className="flex items-center gap-4">
            <div>
              <FaArrowLeft />
            </div>
            <h1 className="font-semibold truncate pr-4 text-xl">
              森林ちゃんねる
            </h1>
          </div>
        </Link>
      )}
      renderNavigation={() => (
        <div className="flex flex-col border-l border-neutral-300 bg-neutral-50 h-screen">
          <div
            ref={scrollRef}
            className="flex-1 px-3 space-y-3 overflow-scroll"
          >
            <div className="sticky top-0 z-10 -mx-3 px-3 bg-neutral-50 pb-2 pt-3">
              <div className="flex items-center gap-2">
                <h2
                  className="flex-1 text-sm font-semibold text-neutral-900 px-1 truncate"
                  title={data?.title}
                >
                  {data?.title}
                </h2>
              </div>
              <hr className="mt-2 border-neutral-300" />
            </div>
            <ul className="flex flex-col gap-3">
              {data?.posts.map((p) => (
                <li key={p.index}>
                  <PostItem {...p} />
                </li>
              ))}
            </ul>
            <div id="bottom-anchor" />
          </div>
          <PostForm threadId={id} />
        </div>
      )}
      renderFooter={() => (
        <div className="bg-white border-t border-neutral-200 items-center justify-between px-4 text-xs md:text-sm hidden md:flex h-12 w-full">
          <h1 className="font-semibold truncate pr-4 text-xl">{data?.title}</h1>
          <time className="text-neutral-500">
            {new Date().toLocaleDateString("ja-JP", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
            })}
          </time>
        </div>
      )}
    >
      <PostMermaidViewer data={data} />
    </ThreadPageLayout>
  );
}
