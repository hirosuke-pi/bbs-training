import prisma from "@/utils/prisma";
import { Hono } from "hono";

const app = new Hono().get("/", async (c) => {
  const threads = await prisma.thread.findMany({
    orderBy: { createdAt: "desc" },
    where: { deletedAt: null },
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
});

export default app;
