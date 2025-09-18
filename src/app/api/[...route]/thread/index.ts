import { generateAnonId } from "@/utils/generate-id";
import prisma from "@/utils/prisma";
import { zValidator } from "@hono/zod-validator";
import crypto from "crypto";
import { Hono } from "hono";
import { Session } from "hono-sessions";
import { z } from "zod";
import { ThreadSessionDataTypes } from "../schema/thread-session";

const createThreadSchema = z.object({
  title: z.string().min(1).max(100),
  content: z.string().min(1).max(1000),
  username: z.union([z.literal(""), z.string().min(1).max(50).optional()]),
  email: z.union([z.literal(""), z.email().optional()]),
});

const app = new Hono<{
  Variables: {
    session: Session<ThreadSessionDataTypes>;
  };
}>()
  .get("/all", async (c) => {
    const threads = await prisma.thread.findMany({
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        title: true,
        createdAt: true,
        deletedAt: true,
        userId: true,
        _count: { select: { posts: true } },
      },
    });

    return c.json({
      data: threads.map((t) => ({
        id: t.id,
        title: t.title,
        createdAt: t.createdAt,
        deletedAt: t.deletedAt,
        userId: t.userId,
        totalPosts: t._count.posts,
      })),
    });
  })
  .post(
    "/",
    zValidator("json", createThreadSchema, (result, c) => {
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
      const { title, content, username, email } = c.req.valid("json");
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

      // スレッドと初回投稿をトランザクションで作成
      const result = await prisma.$transaction(async (tx) => {
        const thread = await tx.thread.create({
          data: {
            title,
            userId: user!.id,
          },
        });

        await tx.post.create({
          data: {
            content,
            userId: user!.id,
            threadId: thread.id,
          },
        });
        return { threadId: thread.id };
      });

      return c.json({ data: result }, 201);
    }
  );

export default app;
