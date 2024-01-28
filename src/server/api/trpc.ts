/**
 * YOU PROBABLY DON'T NEED TO EDIT THIS FILE, UNLESS:
 * 1. You want to modify request context (see Part 1).
 * 2. You want to create a new middleware or type of procedure (see Part 3).
 *
 * TL;DR - This is where all the tRPC server stuff is created and plugged in. The pieces you will
 * need to use are documented accordingly near the end.
 */
import { TRPCError, initTRPC } from "@trpc/server";
import { type CreateNextContextOptions } from "@trpc/server/adapters/next";
import superjson from "superjson";
import { ZodError } from "zod";
import * as jwt from "jsonwebtoken";

import { db } from "~/server/db";

/**
 * 1. CONTEXT
 *
 * This section defines the "contexts" that are available in the backend API.
 *
 * These allow you to access things when processing a request, like the database, the session, etc.
 */

type CreateContextOptions = Record<string, never>;

/**
 * This helper generates the "internals" for a tRPC context. If you need to use it, you can export
 * it from here.
 *
 * Examples of things you may need it for:
 * - testing, so we don't have to mock Next.js' req/res
 * - tRPC's `createSSGHelpers`, where we don't have req/res
 *
 * @see https://create.t3.gg/en/usage/trpc#-serverapitrpcts
 */
const createInnerTRPCContext = (_opts: CreateContextOptions) => {
  const { req, res } = _opts;
  return {
    db,
    req,
    res,
  };
};

/**
 * This is the actual context you will use in your router. It will be used to process every request
 * that goes through your tRPC endpoint.
 *
 * @see https://trpc.io/docs/context
 */
export const createTRPCContext = (_opts: CreateNextContextOptions) => {
  const { req, res } = _opts;
  return { req, res, db };
  return createInnerTRPCContext({});
};

/**
 * 2. INITIALIZATION
 *
 * This is where the tRPC API is initialized, connecting the context and transformer. We also parse
 * ZodErrors so that you get typesafety on the frontend if your procedure fails due to validation
 * errors on the backend.
 */

const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    };
  },
});

async function decodeAndVerifyJwtToken(jwtToken: string) {
  try {
    const JWT_SECRET = process.env.JWT_SECRET;
    const decodedToken: jwt.JwtPayload = jwt.verify(
      jwtToken,
      JWT_SECRET!,
    ) as jwt.JwtPayload;
    console.log("Decoded token");
    console.log(decodedToken);
    console.log("JWT SECRET");
    console.log(JWT_SECRET);
    return decodedToken;
  } catch (error) {
    throw new Error("YOur token is expired");
  }
  // return "ASD";
}

const isAuthed = t.middleware(async ({ ctx, next }) => {
  const { req, res } = ctx;
  const token = req!.headers.authorization?.split(" ")[1];
  if (!token) throw new TRPCError({ code: "UNAUTHORIZED" });

  const JWT_SECRET = process.env.JWT_SECRET;
  const decodedToken: jwt.JwtPayload = await decodeAndVerifyJwtToken(token);

  return next({
    ctx: {
      token: decodedToken,
    },
  });
});

/**
 * 3. ROUTER & PROCEDURE (THE IMPORTANT BIT)
 *
 * These are the pieces you use to build your tRPC API. You should import these a lot in the
 * "/src/server/api/routers" directory.
 */

/**
 * This is how you create new routers and sub-routers in your tRPC API.
 *
 * @see https://trpc.io/docs/router
 */
export const createTRPCRouter = t.router;

/**
 * Public (unauthenticated) procedure
 *
 * This is the base piece you use to build new queries and mutations on your tRPC API. It does not
 * guarantee that a user querying is authorized, but you can still access user session data if they
 * are logged in.
 */
export const privateProcedure = t.procedure.use(isAuthed);
export const publicProcedure = t.procedure;
