import { Hono } from "hono";

// basePathで指定
export const getEchoRouter = new Hono().get("/echo/:message", (c) => {
  return c.json({
    message: `Received message: ${c.req.param("message")}`,
  });
});
