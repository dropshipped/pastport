import { cn } from "@nextui-org/react";
import { motion } from "framer-motion";
import React from "react";
import { useProfile } from "~/components/profile/profile-provider";
import ProfileContent from "~/components/profile/profile-content";

const ProfileDrawer = () => {
  const { showProfile, containerRef, hideProfile, setHideProfile, height } =
    useProfile();

  return (
    <motion.div
      initial={false}
      animate={showProfile ? "open" : "closed"}
      custom={height}
      ref={containerRef}
      className={cn(
        "absolute inset-y-0 left-0 z-10 w-full transition-[opacity]",
        hideProfile && "invisible opacity-0",
      )}
    >
      <motion.div
        className={cn("absolute inset-y-0 left-0 w-full bg-foreground-100")}
        onAnimationComplete={() => !showProfile && setHideProfile(true)}
        variants={{
          open: (height = 1000) => ({
            clipPath: `circle(${height - 100}px at 50% calc(100% - 48px))`,
            transition: {
              type: "spring",
              // stiffness: 40,
              // restDelta: 10,
            },
          }),
          closed: {
            clipPath: "circle(30px at 50% calc(100% - 48px))",
            transition: {
              // delay: 0.5,
              type: "spring",
              stiffness: 400,
              damping: 40,
            },
          },
        }}
      >
        <ProfileContent />
      </motion.div>
    </motion.div>
  );
};

export default ProfileDrawer;
