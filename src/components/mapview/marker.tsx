import { Marker } from "react-map-gl";
import { Card, CardFooter, Image } from "@nextui-org/react";

type Props = {
  longitude: number;
  latitude: number;
  imageUrl: string;
  date: string;
};

export function TripMarker({ longitude, latitude, imageUrl, date }: Props) {
  return (
    <Marker
      longitude={longitude}
      latitude={latitude}
      anchor="bottom"
      rotationAlignment="viewport"
    >
      <Card isFooterBlurred radius="lg" className="border-none">
        <Image
          alt={date}
          className="aspect-square object-cover"
          height={100}
          src={imageUrl}
          width={100}
        />
        <CardFooter className="absolute bottom-1 z-10 ml-1 w-[calc(100%_-_8px)] justify-center overflow-hidden rounded-large border-1 border-white/20 px-1 py-0.5 shadow-small before:rounded-xl before:bg-white/10">
          <p className="w-full truncate text-center text-2xs leading-none text-white/90">
            {date}
          </p>
        </CardFooter>
      </Card>
    </Marker>
  );
}
