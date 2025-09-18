import prisma from "@/utils/prisma";
import { Hono } from "hono";

// basePathで指定
export const getThreadListAllRouter = new Hono().get(
  "/thread/all",
  async (c) => {
    const data = await prisma.thread.findMany({
      orderBy: { createdAt: "desc" },
    });
    console.log(data);

    return c.json({
      data,
    });
  }
);
