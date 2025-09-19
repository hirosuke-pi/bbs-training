import { MermaidViewer } from "@/components/mermaid-viewer";
import { scrollToPostItem } from "@/components/post-item/scroll-to-post-item";
import { useState } from "react";
import { PostMermaidProps } from "./use-generate-mermaid";

import { LuEye, LuEyeClosed } from "react-icons/lu";
import { generateMermaid } from "./generate-mermaid";

type Props = {
  data?: PostMermaidProps;
};

export function PostMermaidViewer({ data }: Props) {
  const [isDisplayAll, setIsDisplayAll] = useState(true);

  const generatedCode = generateMermaid(data, isDisplayAll);

  const handleClickSvgElement = (event: PointerEvent) => {
    const target = event.target as HTMLElement;
    if (target && target.id.startsWith("post-node-")) {
      event.stopPropagation();
      event.preventDefault();
      const postId = target.id.replace("post-node-", "");
      const postElement = document.getElementById(`post-${postId}`);

      if (postElement) {
        scrollToPostItem(postElement, postId);
      }
    }
  };

  console.log("Mermaid code:", generatedCode.length);

  return (
    <MermaidViewer
      code={generatedCode}
      onClickSvgElement={handleClickSvgElement}
    >
      <div>
        <button
          onClick={() => {
            setIsDisplayAll((prev) => !prev);
          }}
          className="absolute top-15 right-2 z-10 p-3 shadow-md bg-white rounded-full border border-gray-200 hover:bg-gray-100 transition-colors"
        >
          {isDisplayAll ? <LuEye /> : <LuEyeClosed />}
        </button>
      </div>
    </MermaidViewer>
  );
}
