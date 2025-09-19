"use client";
import reactStringReplace from "react-string-replace";
import { scrollToPostItem } from "./scroll-to-post-item";

const urlRegExp = /(https?:\/\/\S+)/g;
const replyRegExp = />>([0-9]+)/g; // レス番号参照

export const ContentWithLinks = ({ content }: { content: string }) => {
  return reactStringReplace(
    reactStringReplace(content, urlRegExp, (match, i) => (
      <a
        key={`url-${i}`}
        href={match}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 underline break-all"
      >
        {match}
      </a>
    )),
    replyRegExp,
    (match, i) => {
      const targetIndex = match;
      return (
        <a
          key={`ref-${i}-${targetIndex}`}
          href={`#post-${targetIndex}`}
          className="text-teal-600 hover:underline"
          onClick={(e) => {
            e.preventDefault();
            const postElement = document.getElementById(`post-${targetIndex}`);
            if (postElement) {
              scrollToPostItem(postElement, targetIndex);
            }
          }}
        >
          {`>>${targetIndex}`}
        </a>
      );
    }
  );
};
