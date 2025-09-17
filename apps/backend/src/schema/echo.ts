// import { z } from "@hono/zod-openapi";

import z from "zod";

// export const GetEchoParamSchema = z
//   .object({
//     message: z.string().openapi({
//       param: {
//         name: "message",
//         in: "path",
//         required: true,
//         description: "メッセージ",
//       },
//       example: "message example",
//     }),
//   })
//   .openapi("GetEchoParamSchema");

// export const GetEchoResponseSchema = z.object({
//   message: z.string(),
// });

export const schema = z.object({
  message: z.string(),
});
