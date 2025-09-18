"use client";
import { cn } from "@/utils/cn";
import React from "react";
import { IoMdClose } from "react-icons/io";

export type PostItemProps = {
  index: number;
  username: string;
  content: string;
  hasRemove?: boolean;
  onRemove?: () => void;
  highlight?: boolean;
  className?: string;
  createdAt: Date | string;
  anonId: string;
};

export const PostItem: React.FC<PostItemProps> = ({
  index,
  username,
  content,
  hasRemove = false,
  onRemove,
  highlight = false,
  createdAt,
  anonId,
}) => {
  const displayName = username.trim().length > 0 ? username : "名無しさん";

  const formattedDate = createdAt
    ? new Date(createdAt).toLocaleString("ja-JP", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      })
    : null;

  return (
    <div className="relative">
      <div
        className={cn(
          "relative rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden",
          highlight ? "ring-1 ring-sky-400" : ""
        )}
      >
        {/* ヘッダー行 */}
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 px-4 py-2 text-xs tracking-wide">
          <span className="tabular-nums font-bold text-gray-700">{index}:</span>
          <span className="break-all text-gray-900 font-medium">
            {displayName}
          </span>
          <span className="text-gray-500">ID:{anonId}</span>
          <span className="text-gray-400">{formattedDate}</span>
        </div>
        <hr className="border-gray-200" />
        {/* 本文 */}
        <div className="px-4 py-3 text-base leading-relaxed whitespace-pre-wrap break-words text-gray-900">
          {content}
        </div>
      </div>
      {/* 削除ボタン */}
      {hasRemove && (
        <button
          onClick={() => onRemove?.()}
          aria-label="削除"
          className="absolute -right-3 -top-3 flex h-8 w-8 items-center justify-center rounded-full bg-rose-400 text-white text-lg shadow ring-2 ring-white hover:bg-rose-300 transition-colors cursor-pointer"
        >
          <IoMdClose />
        </button>
      )}
    </div>
  );
};

export default PostItem;
