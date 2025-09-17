import { getHelloRouter } from "@/api/hello/route";
import { RouteHandler } from "@hono/zod-openapi";

export const getHelloHandler: RouteHandler<typeof getHelloRouter> = async (
  c
) => {
  return c.json({ message: "hello!" }, 200);
};
