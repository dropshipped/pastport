import { type RefObject, useRef, useEffect } from "react";

export const useDimensions = (ref: RefObject<HTMLDivElement>) => {
  const dimensions = useRef<{
    width?: number;
    height?: number;
  }>({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    dimensions.current.width = ref?.current?.offsetWidth;
    dimensions.current.height = ref?.current?.offsetHeight;
  }, [ref]);

  return dimensions.current;
};
