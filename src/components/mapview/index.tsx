import Map, { Layer, Source } from "react-map-gl";

import "mapbox-gl/dist/mapbox-gl.css";

// eslint-disable-next-line no-restricted-imports
import { TripMarker } from "./marker";
import { useMemo, useState } from "react";
// eslint-disable-next-line no-restricted-imports
import { countriesLayer } from "./map-style";

const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN ?? "";

interface Trip {
  title: string;
  longitude: number;
  latitude: number;
  countryCode: string;
  imageUrl: string;
  date: string;
}

export const MapView = ({ trips }: { trips: Trip[] }) => {
  // const [trips, setTrips] = useState<Trip[]>(initialTrips);
  // const [focused, setFocused] = useState<Trip>(trips[1]);

  const filter = useMemo(
    () => [
      "in",
      "iso_3166_1_alpha_3",
      ...trips.map((trip) => trip.countryCode),
    ],
    [trips],
  );

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
      // onMouseMove={onHover}
      interactiveLayerIds={["counties"]}
      mapStyle={"mapbox://styles/amho2/clrwiarp3008901pu0tpcb4xb"}
    >
      <Source
        id="admin-1"
        type="vector"
        url="mapbox://mapbox.country-boundaries-v1"
      >
        <Layer beforeId="waterway-label" {...countriesLayer} filter={filter} />
        {/* <Layer beforeId="waterway-label" {...highlightLayer} filter={filter} /> */}
      </Source>

      {trips.map((trip, i) => {
        return (
          <TripMarker
            key={i}
            latitude={trip.latitude}
            longitude={trip.longitude}
            date={trip.date}
            imageUrl={trip.imageUrl}
          />
        );
      })}
    </Map>
  );
};
