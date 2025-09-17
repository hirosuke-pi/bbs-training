import { z } from "@hono/zod-openapi";

export const GetHelloResponseSchema = z.object({
  message: z.string(),
});
