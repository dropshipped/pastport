import { CardStack } from "~/components/profile/card-stack";
import { ProfileBar } from "~/components/profile/profile-bar";

// type Props = {};

const ProfileContent = () => {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <ProfileBar profileLayout />
      <CardStack />
    </div>
  );
};

export default ProfileContent;
