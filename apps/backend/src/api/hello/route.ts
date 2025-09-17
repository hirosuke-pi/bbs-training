import { GetHelloResponseSchema } from "@/schema/hello";
import { createRoute } from "@hono/zod-openapi";

export const getHelloRouter = createRoute({
  method: "get",
  path: "/hello",
  description: "hello取得",
  responses: {
    200: {
      description: "hello取得成功",
      content: {
        "application/json": {
          schema: GetHelloResponseSchema,
        },
      },
    },
  },
});
