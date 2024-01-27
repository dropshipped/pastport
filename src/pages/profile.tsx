import { MapView } from "~/components/mapview";
import { ProfileBar } from "~/components/profile/profile-bar";
import { TimelineSlider } from "~/components/profile/timeline-slider";

type Props = {}; // eslint-disable-line

const ProfilePage = ({}: Props) => {
  return (
    <div className="relative flex h-full w-full items-center justify-center">
      <MapView />
      <ProfileBar />
      <TimelineSlider />
    </div>
  );
};

export default ProfilePage;
