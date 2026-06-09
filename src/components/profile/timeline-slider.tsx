import { Card, cn } from "@nextui-org/react";
import { ChevronIcon } from "~/assets/icons";
import { PhotoCarousel } from "~/components/profile/photo-carousel";
import { useProfile } from "~/components/profile/profile-provider";
import { useRouter } from "next/router";

export const TimelineSlider = ({ photos }: { photos: string[] }) => {
  const router = useRouter();
  const {
    showProfile,
    setShowProfile,
    username,
    hideProfile,
    setHideProfile,
    setActiveTripIndex,
  } = useProfile();

  const toggleProfile = async () => {
    if (!showProfile) setHideProfile(false);
    setShowProfile((p) => !p);
    showProfile
      ? await router.push(`${username}`)
      : await router.push(`${username}?profile`);
  };

  return (
    <div className="absolute bottom-0 w-full p-4">
      <Card
        className={cn(
          "relative z-20 flex h-24 w-full items-center justify-center overflow-hidden rounded-xl px-2 py-3 transition-transform",
          showProfile ? "translate-y-40" : "translate-y-0",
        )}
      >
        <PhotoCarousel
          photos={photos}
          onCenteredIndexChange={setActiveTripIndex}
        />
      </Card>

      <button
        className={cn(
          "absolute left-1/2 z-40 -translate-x-1/2 px-2 transition-[bottom]",
          showProfile ? "bottom-4 rotate-180" : "bottom-28",
        )}
        onClick={toggleProfile}
      >
        <ChevronIcon className="z-10 h-16 w-16" />
      </button>
    </div>
  );
};
