import { createClient, type Session } from "@supabase/supabase-js";
import {
  createContext,
  useContext,
  useState,
  type ReactNode,
  type SetStateAction,
  type Dispatch,
  useEffect,
} from "react";

type ProfileProviderType = {
  session: Session | null;
  setSession: Dispatch<SetStateAction<Session | null>>;
  logout: () => Promise<void>;
  signInWithGitHub: () => Promise<void>;
  supabase: any;
};

const ProfileContext = createContext<ProfileProviderType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
    process.env.NEXT_PUBLIC_SUPABASE_KEY ?? "",
  );

  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth
      .getSession()
      .then(({ data: { session } }) => {
        setSession(session);
      })

      .catch((error) => console.error(error));

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []); // eslint-disable-line

  async function logout() {
    const { error } = await supabase.auth.signOut();
    if (error) console.error(error);
  }

  async function signInWithGitHub() {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: "http://localhost:3000/register/",
      },
    });
    console.log(data);
    if (error) console.log(error);
  }

  const value: ProfileProviderType = {
    session,
    setSession,
    logout,
    signInWithGitHub,
    supabase,
  };

  return (
    <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(ProfileContext);
  if (!context) throw new Error("Provider is undefined.");
  return context;
}
