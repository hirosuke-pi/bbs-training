import { client } from "@/app/api/[...route]/client";
import { useQuery } from "@tanstack/react-query";

export function useThreadItemQuery(threadId: string) {
  const { data, isPending } = useQuery({
    queryKey: ["getThreadItems", threadId],
    queryFn: async () => {
      const response = await client.thread[":id"].$get({
        param: { id: threadId },
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      return data.data;
    },
  });
  return { data: data, isPending };
}
