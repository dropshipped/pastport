import * as trpcNext from '@trpc/server/adapters/next';
import * as jwt from 'jsonwebtoken';

// import { decodeAndVerifyJwtToken } from './somewhere/in/your/app/utils';

async function decodeAndVerifyJwtToken(jwtToken:string){
  const JWT_SECRET = process.env.JWT_SECRET;
  const decodedToken = jwt.verify(jwtToken, JWT_SECRET!);
  // console.log("Decoded token")
  // console.log(decodedToken)
  // console.log("JWT SECRET")
  // console.log(JWT_SECRET)
  return decodedToken;
    // return "ASD";
}

export async function createContext({
  req,
  res,
}: trpcNext.CreateNextContextOptions) {
  // Create your context based on the request object
  // Will be available as `ctx` in all your resolvers
  // This is just an example of something you might want to do in your ctx fn
  async function getUserFromHeader() {
    if (req.headers.authorization) {
      const user = await decodeAndVerifyJwtToken(
        req.headers.authorization.split(' ')[1]!,
      );
      return user;
    }
    return null;
  }
  const user = await getUserFromHeader();
  return {
    user,
  };
}
export type Context = Awaited<ReturnType<typeof createContext>>;