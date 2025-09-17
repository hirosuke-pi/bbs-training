import { Hono } from "hono";
import { cors } from "hono/cors";
import { getEchoRouter } from "./api/echo";
import { getHelloRouter } from "./api/hello";

const app = new Hono()
  .basePath("/api/v1")
  .route("/", getHelloRouter)
  .route("/", getEchoRouter);

app.use(
  "*",
  cors({
    origin: "*",
  })
);

export type AppType = typeof app;
export default app;
