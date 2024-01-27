import { useRouter } from "next/router";
import { MapView } from "~/components/mapview";
import { ProfileBar } from "~/components/profile/profile-bar";
import { TimelineSlider } from "~/components/profile/timeline-slider";

type Props = {}; // eslint-disable-line

const ProfilePage = ({}: Props) => {
  const router = useRouter();
  const username = router.query.username;
  console.log(username);
  return (
    <>
      <MapView />
      <ProfileBar />
      <TimelineSlider />
    </>
  );
};

export default ProfilePage;
