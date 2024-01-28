import { createClient, type Session } from "@supabase/supabase-js";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
  type SetStateAction,
  type Dispatch,
} from "react";

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
  process.env.NEXT_PUBLIC_SUPABASE_KEY ?? "",
);

type ProfileProviderType = {
  session: Session | null;
  setSession: Dispatch<SetStateAction<Session | null>>;
  handleLogout: () => Promise<void>;
  handleOAuthLogin: (provider: "google" | "github") => Promise<void>;
};

const ProfileContext = createContext<ProfileProviderType | null>(null);

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

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) console.error(error);
  };

  const handleOAuthLogin = async (provider: "google" | "github") => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo:
          `${
            process.env.NODE_ENV == "production"
              ? "https://pastport.vercel.app/@"
              : "http://localhost:3000/@"
          }` + session?.user.email,
      },
    });
    if (error) console.log(error);
  };

  const value: ProfileProviderType = {
    session,
    setSession,
    handleLogout,
    handleOAuthLogin,
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
