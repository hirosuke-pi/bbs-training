export type PostMermaidProps = {
  title: string;
  totalPosts: number;
  createdAt: string;
  posts: {
    id: number;
    index: number;
    content: string;
    createdAt: string;
    username: string;
    anonId: string;
  }[];
};

export function userGenerateMermaid(props: PostMermaidProps): string {
  // Placeholder for future implementation
  return JSON.stringify(props);
}
