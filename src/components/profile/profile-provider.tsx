import {
  type Dispatch,
  type ReactNode,
  type SetStateAction,
  type RefObject,
  createContext,
  useContext,
  useState,
  useRef,
} from "react";
import { useDimensions } from "~/utils";

type ProfileProviderType = {
  showProfile: boolean;
  setShowProfile: Dispatch<SetStateAction<boolean>>;
  username: string;
  setUsername: Dispatch<SetStateAction<string>>;
  containerRef: RefObject<HTMLDivElement>;
  hideProfile: boolean;
  setHideProfile: Dispatch<SetStateAction<boolean>>;
  height?: number;
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
  const [hideProfile, setHideProfile] = useState<boolean>(!showProfile);
  const containerRef = useRef<HTMLDivElement>(null);
  const { height } = useDimensions(containerRef);

  const value: ProfileProviderType = {
    showProfile,
    setShowProfile,
    username,
    setUsername,
    containerRef,
    hideProfile,
    setHideProfile,
    height,
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
