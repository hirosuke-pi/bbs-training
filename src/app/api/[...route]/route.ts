import { Hono } from "hono";
import { CookieStore, sessionMiddleware } from "hono-sessions";
import { handle } from "hono/vercel";
import hello from "./hello";
import thread from "./thread";

const app = new Hono().basePath("/api");

app.use(
  "*",
  sessionMiddleware({
    store: new CookieStore(),
    encryptionKey: process.env.SESSION_SECRET_PASSWORD,
    expireAfterSeconds: 60 * 60 * 24, // 1日有効
    autoExtendExpiration: true,
  })
);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const route = app.route("/thread", thread).route("/hello", hello);
export type HonoAppType = typeof route;

export const GET = handle(app);
export const POST = handle(app);
export const PUT = handle(app);
export const DELETE = handle(app);
