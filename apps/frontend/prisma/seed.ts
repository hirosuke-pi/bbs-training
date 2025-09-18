import { faker } from "@faker-js/faker";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const THREAD_COUNT = 3;
const POST_COUNT = 10;
const USER_COUNT = 5;

async function main() {
  // 匿名ユーザーを複数作成
  const users = [];
  for (let i = 0; i < USER_COUNT; i++) {
    const user = await prisma.anonymousUser.create({
      data: {
        email: faker.internet.email(),
        username: faker.internet.username(),
        anonId: faker.string.uuid(),
      },
    });
    users.push(user);
  }

  // スレッドを複数作成
  const threads = [];
  for (let i = 0; i < THREAD_COUNT; i++) {
    const thread = await prisma.thread.create({
      data: {
        title: faker.lorem.sentence(),
        userId: users[faker.number.int({ min: 0, max: users.length - 1 })].id,
      },
    });
    threads.push(thread);
  }

  // 投稿を複数作成
  for (let i = 0; i < POST_COUNT; i++) {
    await prisma.post.create({
      data: {
        content: faker.lorem.paragraph(),
        userId: users[faker.number.int({ min: 0, max: users.length - 1 })].id,
        threadId:
          threads[faker.number.int({ min: 0, max: threads.length - 1 })].id,
      },
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
