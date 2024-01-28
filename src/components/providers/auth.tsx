import { createClient, type Session } from "@supabase/supabase-js";
import { useRouter } from "next/router";
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
};

const ProfileContext = createContext<ProfileProviderType | null>(null);

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
  process.env.NEXT_PUBLIC_SUPABASE_KEY ?? "",
);

export function AuthProvider({ children }: { children: ReactNode }) {
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
    } = supabase.auth.onAuthStateChange((_event, _session) => {
      setSession(_session);
    });

    return () => subscription.unsubscribe();
  }, []);

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
