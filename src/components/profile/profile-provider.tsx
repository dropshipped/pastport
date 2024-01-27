import {
  type Dispatch,
  type ReactNode,
  type SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

type ProfileProviderType = {
  showProfile: boolean;
  setShowProfile: Dispatch<SetStateAction<boolean>>;
  username: string;
  setUsername: Dispatch<SetStateAction<string>>;
};

const ProfileContext = createContext<ProfileProviderType | null>(null);

export function ProfileProvider({
  children,
  initialState,
}: {
  children: ReactNode;
  initialState: {
    showProfile: boolean;
    username: string;
  };
}) {
  const [showProfile, setShowProfile] = useState<boolean>(
    initialState.showProfile,
  );
  const [username, setUsername] = useState<string>(initialState.username);

  const value: ProfileProviderType = {
    showProfile,
    setShowProfile,
    username,
    setUsername,
  };

  return (
    <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>
  );
}

export function useProfile() {
  const context = useContext(ProfileContext);
  if (!context) throw new Error("Provider is undefined.");
  return context;
}
