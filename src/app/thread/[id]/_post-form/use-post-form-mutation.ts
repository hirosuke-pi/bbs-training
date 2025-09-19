import { client } from "@/app/api/[...route]/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function usePostFormMutation(threadId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: {
      content: string;
      username?: string;
      email?: string;
    }) => {
      const result = await client.thread[":id"].$post({
        param: { id: threadId },
        json: params,
      });
      if (!result.ok) {
        throw new Error("Network response was not ok");
      }
      return result.json();
    },
    onSuccess: () => {
      // Placeholder for future form submission logic
      console.log("Post submitted successfully");
      queryClient.invalidateQueries({ queryKey: ["getThreadItems", threadId] });
    },
    onError: (error) => {
      console.error("Error submitting post:", error);
    },
  });
}
