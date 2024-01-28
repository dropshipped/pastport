import { CardStack } from "~/components/profile/card-stack";
import { ProfileBar } from "~/components/profile/profile-bar";

// type Props = {};

const ProfileContent = () => {
  return (
    <div className="flex h-full w-full flex-col justify-end">
      <ProfileBar profileLayout />
      <div className="h-[calc(100%-208px)] w-full overflow-y-scroll">
        {Array(10)
          .fill(0)
          .map((type, index) => (
            <div className="p-8" key={index}>
              <h1 className="px-8 pb-4 text-xl">Fresno, California</h1>
              <CardStack />
            </div>
          ))}
      </div>
    </div>
  );
};

export default ProfileContent;
