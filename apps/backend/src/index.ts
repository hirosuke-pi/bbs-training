import { Hono } from "hono";
import { cors } from "hono/cors";
import { getEchoRouter } from "./api/echo";
import { getThreadListAllRouter } from "./api/thread/all";

import type { D1Database } from "@cloudflare/workers-types";

type Bindings = {
  DB: D1Database;
};

const app = new Hono<{ Bindings: Bindings }>()
  .basePath("/api/v1")
  .route("/", getEchoRouter)
  .route("/", getThreadListAllRouter);

app.use(
  "*",
  cors({
    origin: "*",
  })
);

export type AppType = typeof app;
export default {
  port: 8080,
  fetch: app.fetch,
};
