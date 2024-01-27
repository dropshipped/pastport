import { Card, CardHeader, Avatar, Button } from "@nextui-org/react";

type Props = {}; // eslint-disable-line

export const TimelineSlider = ({}: Props) => {
  return (
    <div className="absolute bottom-0 w-full p-4">
      {/* <div className="relative flex h-20 items-center rounded-xl bg-red-500 p-4">
      </div> */}
      <Card className="relative flex h-20 w-full items-center justify-center rounded-xl p-4">
        <div className="h-8 w-full rounded-sm bg-foreground-600"></div>
        <div className="absolute left-[50%] h-12 w-12 -translate-x-1/2 rounded-md border border-solid border-foreground-400 bg-foreground-800"></div>
      </Card>
    </div>
  );
};
