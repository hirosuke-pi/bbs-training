import { generateAnonId } from "@/utils/generate-id";
import prisma from "@/utils/prisma";
import { zValidator } from "@hono/zod-validator";
import crypto from "crypto";
import { Hono } from "hono";
import { Session } from "hono-sessions";
import { z } from "zod";
import { ThreadSessionDataTypes } from "../../schema/thread-session";

const createPostSchema = z.object({
  content: z.string().min(1).max(1000),
  username: z.union([z.literal(""), z.string().min(1).max(50).optional()]),
  email: z.union([z.literal(""), z.email().optional()]),
});

const app = new Hono<{
  Variables: {
    session: Session<ThreadSessionDataTypes>;
  };
}>().post(
  "/",
  zValidator("json", createPostSchema, (result, c) => {
    if (!result.success) {
      const issues = result.error.issues.map((i) => ({
        path: i.path.join("."),
        message: i.message,
        code: i.code,
      }));
      return c.json(
        {
          errors: issues,
        },
        400
      );
    }
  }),
  async (c) => {
    const rawId = c.req.param("id");
    const id = Number(rawId);
    if (!rawId || Number.isNaN(id)) {
      return c.json({ error: "Invalid thread id" }, 400);
    }

    const { content, username, email } = c.req.valid("json");
    const session = c.get("session");

    // 初回アクセス時にIDを発行
    if (!session.get("token")) {
      session.set("token", crypto.randomBytes(16).toString("hex"));
    }

    const anonId = generateAnonId(session.get("token") ?? "");
    console.log({ anonId });

    // 既存 AnonymousUser があれば再利用（同一 anonId 想定）
    let user = await prisma.anonymousUser.findFirst({ where: { anonId } });
    if (!user) {
      user = await prisma.anonymousUser.create({
        data: {
          anonId,
          email,
          username,
        },
      });
    }
    if (user) {
      await prisma.anonymousUser.update({
        where: { id: user.id },
        data: { email, username },
      });
    }

    const result = await prisma.post.create({
      data: {
        content,
        userId: user!.id,
        threadId: id,
      },
    });

    return c.json(
      {
        data: {
          id: result.id,
        },
      },
      201
    );
  }
);

export default app;
