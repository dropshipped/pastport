import { motion } from "framer-motion";
// @ts-ignore no type def exists.
import move from "lodash-move";
import Image from "next/image";
import { useState } from "react";

const CARDS = ["#266678", "#cb7c7a", " #36a18b", "#cda35f", "#747474"];

const CARD_OFFSET = 0;
const SCALE_FACTOR = 0.05;

export const CardStack = () => {
  const [cards, setCards] = useState(CARDS);

  const moveToEnd = (from: number) => {
    setCards(move(cards, from, cards.length - 1));
  };

  return (
    <div className="relative flex items-center justify-center">
      <ul className="relative h-[286px] w-[256px]">
        {cards.map((color, index) => {
          const canDrag = index === 0;

          return (
            <motion.li
              key={color}
              className="absolute h-[256px] w-[256px] origin-[top_center] select-none overflow-clip rounded-md shadow-small [list-style:none]"
              style={{
                top: `${1 * (cards.length - index) * (cards.length - index)}px`,
                cursor: "grab",
              }}
              animate={{
                left: index * -CARD_OFFSET,
                scale: 1 - index * SCALE_FACTOR,
                zIndex: CARDS.length - index,
              }}
              drag={canDrag ? "x" : false}
              dragConstraints={{
                left: 0,
                right: 0,
              }}
              dragElastic={1}
              onDragEnd={() => moveToEnd(index)}
              onClick={() => moveToEnd(index)}
            >
              <Image
                draggable={false}
                src={
                  "https://images.unsplash.com/photo-1534313314376-a72289b6181e?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                }
                alt="your uploaded photo"
                fill
              />
            </motion.li>
          );
        })}
      </ul>
    </div>
  );
};
