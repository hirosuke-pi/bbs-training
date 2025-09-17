import React from "react";
import { IoMdClose } from "react-icons/io";

export type ThreadItemProps = {
  totalPost: number; // 左側の番号
  title: string; // スレッドタイトル（太字）
  date: string; // 投稿日時表示
  hasRemove?: boolean; // 削除ボタン表示
  onRemove?: () => void; // 削除ボタン押下時のコールバック
};

export const ThreadItem: React.FC<ThreadItemProps> = ({
  totalPost,
  title,
  date,
  hasRemove = false,
  onRemove,
}) => {
  return (
    <div className="relative flex items-center gap-4 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm h-30">
      {/* 左の番号バッジ */}
      <div className="flex h-20 w-20 items-center justify-center rounded-lg bg-sky-300 text-3xl font-bold text-white">
        {totalPost}
      </div>
      {/* 右側本文 */}
      <div className="flex-1">
        <h3 className="font-bold text-xl leading-tight break-words line-clamp-2">
          {title}
        </h3>
        <hr className="my-2 border-gray-200" />
        <time className="text-sm text-gray-500">{date}</time>
      </div>
      {hasRemove && (
        <button
          onClick={() => onRemove?.()}
          className="absolute right-[-12px] top-[-12px] h-8 w-8 rounded-full bg-rose-400 ring-4 ring-white flex items-center justify-center text-white text-xl hover:bg-rose-300 transition-all cursor-pointer"
        >
          <IoMdClose />
        </button>
      )}
    </div>
  );
};

export default ThreadItem;
