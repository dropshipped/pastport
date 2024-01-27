import Map from "react-map-gl";

import "mapbox-gl/dist/mapbox-gl.css";

const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN ?? "";

type Props = {}; // eslint-disable-line

export const MapView = ({}: Props) => {
  return (
    <Map
      mapboxAccessToken={token}
      // @ts-expect-error typedefs dont exist
      mapLib={import("mapbox-gl")}
      initialViewState={{
        longitude: -100,
        latitude: 40,
        zoom: 1.5,
      }}
      // projection={"globe"} // idk what this does
      style={{
        width: "100%",
        height: 320,
        border: "solid 1px grey",
        borderRadius: 16,
      }}
      mapStyle="mapbox://styles/mapbox/streets-v12"
    />
  );
};
