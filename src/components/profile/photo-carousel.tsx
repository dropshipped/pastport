import { cn } from "@nextui-org/react";
import {
  animate,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useTransform,
  type MotionValue,
} from "framer-motion";
import {
  type PointerEvent as ReactPointerEvent,
  type WheelEvent,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";

const SPACING = 18;
const CENTER_SIZE = 48;
const MIN_OVERLAP = 6;
const MAX_SCALE = 1;
const MIN_SCALE = 0.4;
const SCALE_STEP_DECAY = 0.52;
const MIN_OPACITY = 0.3;

const mod = (n: number, m: number) => ((n % m) + m) % m;

function normalizedDistanceFromCenter(
  distance: number,
  containerWidth: number,
) {
  const halfWidth = containerWidth / 2;
  if (!halfWidth) return 0;

  const pixelDistance = Math.abs(distance) * SPACING;
  return Math.min(1, pixelDistance / halfWidth);
}

function scaleFromDistance(distance: number, containerWidth: number) {
  const step = Math.abs(distance);
  const stepFalloff = Math.exp(-step * SCALE_STEP_DECAY);
  const stepScale = MIN_SCALE + (MAX_SCALE - MIN_SCALE) * stepFalloff;

  const containerT = normalizedDistanceFromCenter(distance, containerWidth);
  const edgeScale =
    MIN_SCALE +
    (MAX_SCALE - MIN_SCALE) * Math.cos((containerT * Math.PI) / 2);

  return Math.min(stepScale, edgeScale);
}

function opacityFromDistance(distance: number, containerWidth: number) {
  const step = Math.abs(distance);
  const stepOpacity =
    MIN_OPACITY + (1 - MIN_OPACITY) * Math.exp(-step * SCALE_STEP_DECAY);

  const containerT = normalizedDistanceFromCenter(distance, containerWidth);
  const edgeOpacity =
    MIN_OPACITY +
    (1 - MIN_OPACITY) * Math.cos((containerT * Math.PI) / 2);

  return Math.min(stepOpacity, edgeOpacity);
}

function pullTowardCenter(distance: number, containerWidth: number) {
  if (Math.abs(distance) < 0.001) return 0;

  const sign = Math.sign(distance);
  const absDistance = Math.abs(distance);
  const wholeSteps = Math.floor(absDistance);
  const fractionalStep = absDistance - wholeSteps;
  let pull = 0;

  for (let step = 0; step < wholeSteps; step++) {
    const leftScale = scaleFromDistance(step, containerWidth);
    const rightScale = scaleFromDistance(step + 1, containerWidth);
    const touchDistance =
      (CENTER_SIZE * leftScale + CENTER_SIZE * rightScale) / 2 - MIN_OVERLAP;
    pull += Math.max(0, SPACING - touchDistance);
  }

  if (fractionalStep > 0) {
    const leftScale = scaleFromDistance(wholeSteps, containerWidth);
    const rightScale = scaleFromDistance(wholeSteps + 1, containerWidth);
    const touchDistance =
      (CENTER_SIZE * leftScale + CENTER_SIZE * rightScale) / 2 - MIN_OVERLAP;
    pull += Math.max(0, SPACING - touchDistance) * fractionalStep;
  }

  return -sign * pull;
}

type Props = {
  photos: string[];
  className?: string;
  onCenteredIndexChange?: (index: number) => void;
};

function wrapTrackX(x: number, cycleWidth: number, anchor: number) {
  let value = x;

  while (value > anchor) value -= cycleWidth;
  while (value <= anchor - cycleWidth) value += cycleWidth;

  return value;
}

function CarouselPhoto({
  index,
  photo,
  trackX,
  containerWidth,
}: {
  index: number;
  photo: string;
  trackX: MotionValue<number>;
  containerWidth: number;
}) {
  const itemCenter = index * SPACING;

  const distance = useTransform(trackX, (tx) => {
    return (itemCenter + tx - containerWidth / 2) / SPACING;
  });

  const scale = useTransform(distance, (d) =>
    scaleFromDistance(d, containerWidth),
  );
  const opacity = useTransform(distance, (d) =>
    opacityFromDistance(d, containerWidth),
  );
  const zIndex = useTransform(distance, (d) =>
    Math.round(30 - Math.abs(d) * 4),
  );
  const boxShadow = useTransform(distance, (d) =>
    Math.abs(d) < 0.4
      ? "0 3px 10px rgba(0,0,0,0.22)"
      : "0 1px 2px rgba(0,0,0,0.1)",
  );
  const x = useTransform(distance, (d) => {
    const pull = pullTowardCenter(d, containerWidth);
    return pull === 0 ? "-50%" : `calc(-50% + ${pull}px)`;
  });

  return (
    <motion.div
      className="pointer-events-none absolute top-1/2 overflow-hidden rounded-md border-2 border-white"
      style={{
        left: index * SPACING,
        width: CENTER_SIZE,
        height: CENTER_SIZE,
        x,
        y: "-50%",
        scale,
        opacity,
        zIndex,
        boxShadow,
        transformOrigin: "center center",
      }}
    >
      <img
        src={photo}
        alt=""
        className="h-full w-full object-cover"
        draggable={false}
      />
    </motion.div>
  );
}

export function PhotoCarousel({
  photos,
  className,
  onCenteredIndexChange,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const containerWidthRef = useRef(0);
  const anchorRef = useRef(0);
  const cycleWidthRef = useRef(0);
  const onCenteredIndexChangeRef = useRef(onCenteredIndexChange);
  const activePointerId = useRef<number | null>(null);
  const dragStart = useRef({ pointerX: 0, trackX: 0 });
  const lastMove = useRef({ pointerX: 0, time: 0 });
  const inertiaAnimation = useRef<ReturnType<typeof animate> | null>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const trackX = useMotionValue(0);

  const count = photos.length;
  const cycleWidth = count * SPACING;

  onCenteredIndexChangeRef.current = onCenteredIndexChange;

  const getCenteredPhotoIndex = () => {
    const width = containerWidthRef.current;
    if (!width || count === 0) return 0;

    const trackIndex = Math.round((width / 2 - trackX.get()) / SPACING);
    return mod(trackIndex, count);
  };

  const reportCenteredIndex = () => {
    onCenteredIndexChangeRef.current?.(getCenteredPhotoIndex());
  };

  const loopPhotos = useMemo(
    () => [...photos, ...photos, ...photos],
    [photos],
  );

  const stopInertia = () => {
    inertiaAnimation.current?.stop();
    inertiaAnimation.current = null;
  };

  const normalizeTrack = (value: number) => {
    const wrapped = wrapTrackX(
      value,
      cycleWidthRef.current,
      anchorRef.current,
    );

    if (wrapped !== value) {
      trackX.set(wrapped);
    }

    return wrapped;
  };

  const snapToCenter = () => {
    const width = containerWidthRef.current;
    const cycle = cycleWidthRef.current;
    if (!width || !cycle) return;

    const nearestIndex = Math.round((width / 2 - trackX.get()) / SPACING);
    const target = normalizeTrack(width / 2 - nearestIndex * SPACING);

    inertiaAnimation.current = animate(trackX, target, {
      type: "spring",
      stiffness: 280,
      damping: 30,
      onComplete: reportCenteredIndex,
    });
  };

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container || count === 0) return;

    const syncLayout = (resetPosition: boolean) => {
      const width = container.clientWidth;
      const anchor = width / 2 - cycleWidth;

      containerWidthRef.current = width;
      setContainerWidth(width);
      anchorRef.current = anchor;
      cycleWidthRef.current = cycleWidth;

      if (resetPosition) {
        trackX.set(anchor);
      } else {
        normalizeTrack(trackX.get());
      }
    };

    syncLayout(true);
    requestAnimationFrame(reportCenteredIndex);

    const observer = new ResizeObserver(() => syncLayout(false));
    observer.observe(container);

    return () => observer.disconnect();
  }, [count, cycleWidth, trackX]);

  useMotionValueEvent(trackX, "change", (latest) => {
    if (!cycleWidthRef.current) return;
    normalizeTrack(latest);
  });

  const handleWheel = (event: WheelEvent) => {
    event.preventDefault();
    stopInertia();

    const delta =
      Math.abs(event.deltaX) > Math.abs(event.deltaY)
        ? event.deltaX
        : event.deltaY;

    trackX.set(trackX.get() - delta);
  };

  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "mouse" && event.button !== 0) return;

    stopInertia();
    activePointerId.current = event.pointerId;
    setIsDragging(true);
    event.currentTarget.setPointerCapture(event.pointerId);

    dragStart.current = {
      pointerX: event.clientX,
      trackX: trackX.get(),
    };
    lastMove.current = {
      pointerX: event.clientX,
      time: performance.now(),
    };
  };

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (activePointerId.current !== event.pointerId) return;

    event.preventDefault();

    const delta = event.clientX - dragStart.current.pointerX;
    trackX.set(dragStart.current.trackX + delta);
    lastMove.current = {
      pointerX: event.clientX,
      time: performance.now(),
    };
  };

  const handlePointerEnd = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (activePointerId.current !== event.pointerId) return;

    activePointerId.current = null;
    setIsDragging(false);
    event.currentTarget.releasePointerCapture(event.pointerId);

    const elapsed = performance.now() - lastMove.current.time;
    const velocity =
      elapsed > 0
        ? ((event.clientX - lastMove.current.pointerX) / elapsed) * 1000
        : 0;

    if (Math.abs(velocity) > 40) {
      inertiaAnimation.current = animate(trackX, trackX.get() + velocity * 0.3, {
        type: "spring",
        velocity,
        stiffness: 90,
        damping: 22,
        mass: 0.6,
        onComplete: snapToCenter,
      });
    } else {
      snapToCenter();
    }
  };

  if (count === 0) return null;

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative h-12 w-full touch-none select-none overflow-hidden",
        isDragging ? "cursor-grabbing" : "cursor-grab",
        className,
      )}
      onWheel={handleWheel}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerEnd}
      onPointerCancel={handlePointerEnd}
    >
      {containerWidth > 0 && (
        <motion.div
          className="pointer-events-none absolute left-0 top-1/2 h-0 w-max"
          style={{ x: trackX }}
        >
          {loopPhotos.map((photo, index) => (
            <CarouselPhoto
              key={index}
              index={index}
              photo={photo}
              trackX={trackX}
              containerWidth={containerWidth}
            />
          ))}
        </motion.div>
      )}
    </div>
  );
}
