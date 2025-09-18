import { useQuery } from "@tanstack/react-query";
import { client } from "../api/[...route]/client";

export function useThreadListQuery() {
  const { data } = useQuery({
    queryKey: ["getThreadList"],
    queryFn: async () => {
      const response = await client.thread.all.$get();
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
  });

  return { threads: data?.data ?? [] };
}
