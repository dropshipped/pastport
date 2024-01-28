import { TRPCError } from "@trpc/server";
import { z } from "zod";

import {
  createTRPCRouter,
  privateProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { createTRPCContext } from "~/server/api/trpc";

const User = z.object({
  id: z.string(),
  // joinDate: z.string().datetime(),
  homeTown: z.string(),
  name: z.string(),
  username: z.string(),
  email: z.string(),
  jwtToken: z.string(),
});

export type UserType = z.infer<typeof User>;

export const postRouter = createTRPCRouter({
  // createUser: publicProcedure
  createUser: privateProcedure.input(User).mutation(({ ctx }) => {
    console.log("CONTEXT")
    console.log(ctx.token)
    const { sub } = ctx.token;
    if (!sub) {
      throw new TRPCError({ code: "UNAUTHORIZED" });
    }
    return {
      secret: "tylersauce",
    };
  }),
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  create: publicProcedure
    .input(z.object({ name: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      // simulate a slow db call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      return ctx.db.post.create({
        data: {
          name: input.name,
        },
      });
    }),
});
