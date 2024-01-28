import { ScrollShadow } from "@nextui-org/react";
import { CardStack } from "~/components/profile/card-stack";
import { ProfileBar } from "~/components/profile/profile-bar";

// type Props = {};

const ProfileContent = () => {
  return (
    <div className="flex h-full w-full flex-col justify-end ">
      <ProfileBar profileLayout />

      <ScrollShadow
        className="h-full w-full pt-[190px]"
        size={300}
        offset={-200}
      >
        {Array(10)
          .fill(0)
          .map((type, index) => (
            <div className="p-8 py-6" key={index}>
              <CardStack />
              <h1 className="px-8 pt-2 text-center text-xl">
                Fresno, California
              </h1>
            </div>
          ))}
      </ScrollShadow>
    </div>
  );
};

export default ProfileContent;
