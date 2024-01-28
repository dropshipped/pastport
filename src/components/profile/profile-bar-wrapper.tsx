import { cn } from "@nextui-org/react";
import { ProfileBar } from "~/components/profile/profile-bar";
import { useProfile } from "~/components/profile/profile-provider";

export const ProfileBarWrapper = () => {
  const { showProfile } = useProfile();

  return (
    <div
      className={cn(
        "absolute top-0 w-full transition-[top]",
        showProfile && "-top-[92px]",
      )}
    >
      <ProfileBar />
      {/* showProfile */}
    </div>
  );
};
