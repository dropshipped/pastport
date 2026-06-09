import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useState } from "react";
import { MobileChrome } from "~/components/layout/mobile-chrome";
import { MapView } from "~/components/mapview";
import { ProfileBarWrapper } from "~/components/profile/profile-bar-wrapper";
import ProfileDrawer from "~/components/profile/profile-drawer";
import { ProfileProvider } from "~/components/profile/profile-provider";
import { TimelineSlider } from "~/components/profile/timeline-slider";
import { mockTrips } from "~/data/mock-trips";
import { type Trip } from "~/models/trip";
import { redirect } from "~/utils/redirect";

type Props = { username: string; showProfile: boolean };

const photos = mockTrips.map((trip) => trip.imageUrl);

export const getServerSideProps = (async ({ params, query, res }) => {
  const username = String(params?.username ?? "");
  const showProfile = query?.profile !== undefined;

  if (!username.startsWith("@")) redirect(res, "/404");

  // TODO: check if user exusts

  return { props: { username, showProfile } };
}) satisfies GetServerSideProps<Props>;

const ProfilePage = ({
  username,
  showProfile,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [trips, setTrips] = useState<Trip[]>(mockTrips);

  return (
    <ProfileProvider initialState={{ showProfile, username }}>
      <div className="relative h-full w-full">
        <div className="absolute inset-0">
          <MapView trips={trips} />
        </div>
        <ProfileDrawer />
        <MobileChrome>
          <ProfileBarWrapper />
          <TimelineSlider photos={photos} />
        </MobileChrome>
      </div>
    </ProfileProvider>
  );
};

export default ProfilePage;
