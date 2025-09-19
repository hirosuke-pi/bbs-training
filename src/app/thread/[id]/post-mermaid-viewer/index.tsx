import { MermaidViewer } from "@/components/mermaid-viewer";
import { PostMermaidProps, userGenerateMermaid } from "./use-generate-mermaid";

const mermaidTestCode = `graph TD
A[Hard edge] -->|Link text| B(Round edge)
B --> C{Decision}
C -->|One| D[Result one]
C -->|Two| E[Result two]
`;

export function PostMermaidViewer(props: PostMermaidProps) {
  const convertedCode = userGenerateMermaid(props);

  return <MermaidViewer code={mermaidTestCode} />;
}
