import { useState, useEffect } from "react";
import type { Session } from "@supabase/supabase-js";
import { createClient } from "@supabase/supabase-js";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/router";
import { redirect } from "next/navigation";
import { api } from "~/utils/api";
import { setToken } from "~/utils/api";

// export const trpc = createTRPCNext<AppRouter>({
//   config(opts) {
//     return {
//       links: [
//         httpBatchLink({
//           url: 'http://localhost:3000/api/trpc',
//           /**
//            * Headers will be called on each request.
//            */
//           headers() {
//             return {
//               Authorization: token,
//             };
//           },
//         }),
//       ],
//     };
//   },
// });

type Props = {};

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
  process.env.NEXT_PUBLIC_SUPABASE_KEY ?? "",
);
async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error(error);
  }
}
async function signInWithGitHub() {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: "http://localhost:3000/register/",
    },
  });

  if (error) {
    console.log(error);
  }
}

const RegisterPage = ({}: Props) => {
  const router = useRouter();

  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth
      .getSession()
      .then(({ data: { session } }) => {
        console.log(session)
        setToken("Bearer: "+session!.access_token)
        setSession(session);
      })

      .catch((error) => console.error(error));

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (session) {
      console.log(session);

      // router.push('/')
    }
  }, [session]);
  const data = api.post.hello.useQuery({ text: "from tRPC" });
  console.log(data.data);

  // const User = z.object({
  //   id: z.string(),
  //   joinDate: z.date(),
  //   homeTown: z.string(),
  //   name: z.string(),
  //   username: z.string(),
  //   email: z.string(),
  //   jwtToken: z.string()
  // });

  const testUser = {
    id: "bigID",
    // joinDate: Date.now().toLocaleString(),
    homeTown: "San leandro",
    name: "bigboy",
    username: "ibrahimthespy",
    email: "gmail.com",
    jwtToken: "...", // Your JWT token here
  };

  const authTest = api.post.createUser.useMutation();
  const handleLogin = () => {
    const name = "John doe";
    authTest.mutate(testUser);
  };
  console.log(authTest)



  // console.log(data.data);

  return (
    <div className="h-full w-full">
      {!session ? (
        [
          <>
            <div>Not logged in</div>
            <Button onClick={signInWithGitHub}>Login</Button>

            <Button onClick={logout}>Logout</Button>

            <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} />
          </>,
        ]
      ) : (
        <>
          <div>Logged in!</div>
          <Button
            onClick={() => {
              handleLogin();

            }}
          >
            test auth
          </Button>

          <Button onClick={signInWithGitHub}>Login</Button>

          <Button onClick={logout}>Logout</Button>
        </>
      )}
    </div>
  );
};

export default RegisterPage;
