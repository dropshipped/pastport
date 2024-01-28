import { useState, useEffect } from "react";
import type { Session } from "@supabase/supabase-js";
import { createClient } from "@supabase/supabase-js";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/router";
import { useAuth } from "~/components/providers/auth";

type Props = {};

const RegisterPage = ({}: Props) => {
  const router = useRouter();

  const { session, logout, signInWithGitHub, supabase } = useAuth();

  useEffect(() => {
    if (session) {
      console.log(session);

      // router.push('/')
    }
  }, [session]);

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
              router.push("/");
            }}
          >
            asdas
          </Button>
          <Button onClick={signInWithGitHub}>Login</Button>

          <Button onClick={logout}>Logout</Button>
        </>
      )}
    </div>
  );
};

export default RegisterPage;
