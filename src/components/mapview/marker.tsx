import { Marker } from "react-map-gl";
import { Card, CardFooter, Image } from "@nextui-org/react";

type Props = {
  longitude: number;
  latitude: number;
  imageUrl: string;
};

export function TripMarker({ longitude, latitude, imageUrl }: Props) {
  return (
    <Marker
      longitude={longitude}
      latitude={latitude}
      anchor="bottom"
      rotationAlignment="viewport"
    >
      <Card isFooterBlurred radius="lg" className="border-none">
        <Image
          alt="Woman listing to music"
          className="aspect-square object-cover"
          height={100}
          src={imageUrl}
          width={100}
        />
        <CardFooter className="absolute bottom-1 z-10 ml-1 w-[calc(100%_-_8px)] justify-between overflow-hidden rounded-large border-1 border-white/20 py-1 shadow-small before:rounded-xl before:bg-white/10">
          <p className="w-full text-center text-tiny text-white/80">
            Sep 5, 2023
          </p>
          {/* <Button
            // className="bg-black/20 text-tiny text-white"
            className="h-full w-full text-tiny text-white"
            variant="flat"
            color="default"
            radius="lg"
            size="sm"
          ></Button> */}
        </CardFooter>
      </Card>
    </Marker>
  );
}
