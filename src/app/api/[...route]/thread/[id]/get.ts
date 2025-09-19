import prisma from "@/utils/prisma";
import { Hono } from "hono";

// /api/thread/:id にマウントされるサブアプリ
const app = new Hono().get("/", async (c) => {
  const rawId = c.req.param("id");
  const id = Number(rawId);
  if (!rawId || Number.isNaN(id)) {
    return c.json({ error: "Invalid thread id" }, 400);
  }

  try {
    const thread = await prisma.thread.findUnique({
      where: { id },
      select: {
        id: true,
        title: true,
        createdAt: true,
        deletedAt: true,
        userId: true,
        posts: {
          where: { deletedAt: null },
          orderBy: { id: "asc" },
          select: {
            id: true,
            content: true,
            createdAt: true,
            user: { select: { username: true, anonId: true } },
          },
        },
      },
    });

    if (!thread) {
      return c.json({ error: "Thread not found" }, 404);
    }

    const posts = thread.posts.map((p, idx) => ({
      id: p.id,
      index: idx + 1, // 表示用連番
      content: p.content,
      createdAt: p.createdAt,
      username: p.user.username ?? "名無しさん",
      anonId: p.user.anonId,
    }));

    return c.json({
      data: {
        id: thread.id,
        title: thread.title,
        createdAt: thread.createdAt,
        userId: thread.userId,
        totalPosts: posts.length,
        posts,
      },
    });
  } catch (e) {
    console.error(e);
    return c.json({ error: "Internal Server Error" }, 500);
  }
});

export default app;
