import { ScrollShadow } from "@nextui-org/react";
import { CardStack } from "~/components/profile/card-stack";
import { ProfileBar } from "~/components/profile/profile-bar";
import { mockTrips } from "~/data/mock-trips";

const ProfileContent = () => {
  return (
    <div className="flex h-full w-full justify-center">
      <div className="relative flex h-full w-full max-w-app flex-col justify-end">
        <ProfileBar profileLayout />

        <ScrollShadow
          className="h-full w-full pt-[190px]"
          size={180}
          // offset={-200}
        >
          {mockTrips.map((trip) => (
            <div className="p-8 py-6" key={trip.title}>
              <CardStack imageUrl={trip.imageUrl} />
              <h1 className="px-8 pt-2 text-center text-xl">{trip.title}</h1>
            </div>
          ))}
        </ScrollShadow>
      </div>
    </div>
  );
};

export default ProfileContent;
