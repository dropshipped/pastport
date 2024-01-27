import { Card, cn } from "@nextui-org/react";
import { useRef } from "react";
import { motion } from "framer-motion";
import { ChevronIcon } from "~/assets/icons";
import { useRouter } from "next/router";
import { useProfile } from "~/components/profile/profile-provider";
import { useDimensions } from "~/utils";

const drake =
  "https://us-tuna-sounds-images.voicemod.net/b76b232c-c50d-4704-912f-9991eb0e5513-1669755931690.jpg";

type Props = {}; // eslint-disable-line

export const TimelineSlider = ({}: Props) => {
  // const router = useRouter();
  // const { username, profile } = router.query;
  // const profileView = profile !== undefined;
  const { showProfile, setShowProfile } = useProfile();

  // "query": {
  //   "profile": "",
  //   "username": "asflk-register"
  // },

  const toggleProfile = async () => {
    setShowProfile((p) => !p);
    // profileView
    //   ? await router.push(`${username as string}`)
    //   : await router.push(`${username as string}?profile`);
  };

  const containerRef = useRef<HTMLDivElement>(null);
  const { height } = useDimensions(containerRef);

  return (
    <>
      <div className="absolute bottom-0 w-full p-4">
        <Card
          className={cn(
            "relative z-20 flex h-20 w-full items-center justify-center rounded-xl p-4 transition-transform",
            showProfile ? "translate-y-40" : "translate-y-0",
            // showProfile ? "bg-foreground-100" : "bg-foreground-800",
          )}
        >
          <div
            className={cn(
              "relative h-8 w-full rounded-sm bg-foreground-500",
              // "border-2 border-solid border-foreground",
            )}
          >
            {Array(21)
              .fill(0)
              .map((_, i) => (
                // TODO: RENDER LOW QUAL IMAGE IF NOT FULLY SHOWN
                <div
                  key={i}
                  className={cn(
                    "absolute h-8 w-8 bg-red-500",
                    "rounded-[4px]",
                    "border-2 border-solid border-white",
                  )}
                  style={{
                    left: `calc(${i * 5}% - ${i * (32 / 20)}px)`,
                  }}
                ></div>
              ))}
          </div>
          {/* <div
          ref={rectRef}
          style={{
            left: `${position}%`,
            transform: `translateX(-${position}%)`,
          }}
          className="absolute h-12 w-12 rounded-md border border-solid border-foreground-400 bg-foreground-800"
        ></div> */}
          <motion.div
            className="left-[calc(50% - 24px)] absolute h-12 w-12 overflow-clip rounded-md border-2 border-solid border-white bg-foreground-800"
            drag="x"
            dragConstraints={{
              left: -150,
              right: 150,
            }}
          >
            {/* eslint-disable-next-line */}
            <img
              src={drake}
              className="h-full w-full object-cover"
              draggable={false}
            />
          </motion.div>
        </Card>

        {/* <pre>{JSON.stringify(router, null, 2)}</pre> */}
        {/* {JSON.stringify(profileView)}
      <button onClick={toggleProfile}>nav</button> */}

        {/* profile component */}
      </div>
      {/* {profileView && ( */}
      <motion.nav
        initial={false}
        animate={showProfile ? "open" : "closed"}
        custom={height}
        ref={containerRef}
        className={cn(
          // "absolute top-0 z-10 h-full w-full",
          "absolute inset-y-0 left-0 w-full",
          // "bg-red-300"
        )}
      >
        <button
          className={cn(
            "absolute left-1/2 z-20 -translate-x-1/2 px-2 transition-[bottom]",
            showProfile ? "bottom-0" : "bottom-24 rotate-180",
          )}
          onClick={toggleProfile}
        >
          <ChevronIcon className="h-12 w-12" />
        </button>
        <motion.div
          className="absolute inset-y-0 left-0 w-full bg-foreground-100"
          variants={{
            open: (height = 1000) => ({
              clipPath: `circle(${height}px at 50% calc(100% - 48px))`,
              transition: {
                type: "spring",
                // stiffness: 40,
                // restDelta: 0,
              },
            }),
            closed: {
              clipPath: "circle(30px at 50% calc(100% - 48px))",
              transition: {
                delay: 0.5,
                type: "spring",
                stiffness: 400,
                damping: 40,
              },
            },
          }}
        ></motion.div>
      </motion.nav>

      {/* )} */}
    </>
  );
};
