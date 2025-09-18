import { useMutation } from "@tanstack/react-query";
import { client } from "../api/[...route]/client";

type CreateThreadParams = {
  title: string;
  content: string;
  username?: string;
  email?: string;
};

export function useCreateThreadMutation() {
  return useMutation({
    mutationFn: async (params: CreateThreadParams) => {
      const response = await client.thread.$post({
        json: params,
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
    onSuccess: ({ data }) => {
      console.log("Thread created successfully", data.threadId);
    },
  });
}
