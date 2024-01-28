import Map, { Layer, Source } from "react-map-gl";

import "mapbox-gl/dist/mapbox-gl.css";

// eslint-disable-next-line no-restricted-imports
import { TripMarker } from "./marker";
import { useMemo, useState } from "react";
// eslint-disable-next-line no-restricted-imports
import { countriesLayer } from "./map-style";

const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN ?? "";

type Props = {}; // eslint-disable-line

interface Trip {
  title: string;
  longitude: number;
  latitude: number;
  countryCode: string;
  imageUrl: string;
  date: string;
}

const initialTrips = [
  {
    title: "Netherlands",
    latitude: 52.132633,
    longitude: 5.291266,
    countryCode: "NLD",
    imageUrl:
      "https://plus.unsplash.com/premium_photo-1680028256635-17e7f3ebbb23?q=80&w=2938&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    date: "Jul 1, 2023",
  },
  {
    title: "Irvine",
    latitude: 33.645329,
    longitude: -117.840446,
    countryCode: "USA",
    imageUrl:
      "https://collegevine.imgix.net/9988b81c-a33b-452a-bfe7-a6a6de92f888.jpg",
    date: "Aug 7, 2024",
  },
  {
    title: "New York City",
    latitude: 40.712776,
    longitude: -74.005974,
    countryCode: "USA",
    imageUrl:
      "https://plus.unsplash.com/premium_photo-1673643157179-c2dd8ea503d7?w=1400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bmV3JTIweW9yayUyMGNpdHl8ZW58MHx8MHx8fDA%3D",
    date: "Sep 5, 2022",
  },

  {
    title: "Bali",
    latitude: -8.340539,
    longitude: 115.091949,
    countryCode: "IDN",
    imageUrl:
      "https://plus.unsplash.com/premium_photo-1668883188861-39974ed9ad99?w=1400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YmFsaXxlbnwwfHwwfHx8MA%3D%3D",
    date: "Sep 9, 20243",
  },

  {
    title: "Hong Kong",
    latitude: 22.3193,
    longitude: 114.1694,
    countryCode: "CHN",
    imageUrl:
      "https://images.unsplash.com/photo-1576788369575-4ab045b9287e?w=1400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aG9uZyUyMGtvbmd8ZW58MHx8MHx8fDA%3D",
    date: "Jul 4, 2023",
  },
];

export const MapView = ({}: Props) => {
  const [trips, setTrips] = useState<Trip[]>(initialTrips);

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
