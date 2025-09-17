import { Hono } from "hono";

// basePathで指定
export const getHelloRouter = new Hono().get("/hello", (c) => {
  return c.json({
    message: "Hello, World!",
  });
});
