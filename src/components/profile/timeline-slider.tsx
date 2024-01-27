import { Card, cn } from "@nextui-org/react";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const drake =
  "https://us-tuna-sounds-images.voicemod.net/b76b232c-c50d-4704-912f-9991eb0e5513-1669755931690.jpg";

type Props = {}; // eslint-disable-line

export const TimelineSlider = ({}: Props) => {
  const [position, setPosition] = useState<number>(50);
  const [lastX, setLastX] = useState(0);
  const rectRef = useRef<HTMLDivElement>(null);

  function moved(event: MouseEvent) {
    console.log(event);
    // if (!buttonPressed(event)) {
    //   removeEventListener("mousemove", moved);
    // } else {
    //   const dist = event.pageX - lastX;
    //   const newPosition = Math.max(10, rectRef.current!.offsetWidth + dist);
    //   rectRef.current!.style.left = newPosition + "px";
    //   // rectRef.current!.style.transform = "translateX(-" + newPosition + "px);";
    //   setLastX(event.pageX);
    // }
  }

  useEffect(() => {
    const downHandler = (event: MouseEvent) => {
      console.log(event);

      if (event.which == 1) {
        // setLastX(event.pageX);
        addEventListener("mousemove", moved);
        event.preventDefault(); // Prevent selection
      }
    };

    const upHandler = () => {
      removeEventListener("mousemove", moved);
    };

    rectRef.current?.addEventListener("mousedown", downHandler);
    rectRef.current?.addEventListener("mouseup", upHandler);

    return () => {
      removeEventListener("mousedown", downHandler);
      removeEventListener("mouseup", upHandler);
    };
  }, []);

  const currentIndex = 10;

  return (
    <div className="absolute bottom-0 w-full p-4">
      <Card className="relative flex h-20 w-full items-center justify-center rounded-xl p-4">
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
                  "border-2 border-solid border-foreground",
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
          className="left-[calc(50% - 24px)] absolute h-12 w-12 overflow-clip rounded-md border border-solid border-foreground-400 bg-foreground-800"
          drag="x"
          dragConstraints={{
            left: -150,
            right: 150,
          }}
        >
          <img
            src={drake}
            className="h-full w-full object-cover"
            draggable={false}
          />
        </motion.div>
      </Card>
    </div>
  );
};
