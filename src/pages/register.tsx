import { useState, useEffect } from "react";
import type { Session } from "@supabase/supabase-js";
import { createClient } from "@supabase/supabase-js";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/router";
import { redirect } from "next/navigation";
type Props = {};

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
  process.env.NEXT_PUBLIC_SUPABASE_KEY ?? "",
);
async function logout(){
  const { error } = await supabase.auth.signOut()
  if (error){
    console.error(error)
  }


}
async function signInWithGitHub() {
  const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: 'http://localhost:3000/register/'
    }
  })
      
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

  useEffect(()=>{
    if (session){
      console.log(session)

      // router.push('/')
    }
  },[session])

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
                <Button onClick={()=>{
                  router.push('/')
                }}>asdas</Button>
                <Button onClick={signInWithGitHub}>Login</Button>

                <Button onClick={logout}>Logout</Button>

        </>
        
        
      )}
    </div>
  );
};

export default RegisterPage;
