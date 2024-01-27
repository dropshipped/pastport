import Map from "react-map-gl";

import "mapbox-gl/dist/mapbox-gl.css";

const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN ?? "";

type Props = {}; // eslint-disable-line

export const MapView = ({}: Props) => {
  return (
    <Map
      mapboxAccessToken={token}
      mapLib={import("mapbox-gl")}
      initialViewState={{
        longitude: -100,
        latitude: 40,
        zoom: 0,
      }}
      // projection={"globe"} // idk what this does
      style={{
        width: "100%",
        height: "100%",
      }}
      mapStyle="mapbox://styles/mapbox/streets-v12"
    />
  );
};
