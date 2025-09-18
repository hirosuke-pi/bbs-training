import { Hono } from "hono";

const app = new Hono().get("/", async (c) => {
  return c.json({
    message: "hello world!",
  });
});

export default app;
