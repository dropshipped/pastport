import { motion } from "framer-motion";
// @ts-ignore no type def exists.
import move from "lodash-move";
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
                // cursor: canDrag ? "grab" : "auto",
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
              <img
                className="h-full object-cover"
                draggable={false}
                src={
                  "https://nextui-docs-v2.vercel.app/images/hero-card-complete.jpeg"
                }
              />
            </motion.li>
          );
        })}
      </ul>
    </div>
  );
};
