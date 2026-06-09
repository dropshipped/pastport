import Map, { Layer, Source, type MapRef } from "react-map-gl";

import "mapbox-gl/dist/mapbox-gl.css";

// eslint-disable-next-line no-restricted-imports
import { TripMarker } from "./marker";
import { useCallback, useEffect, useMemo, useRef } from "react";
// eslint-disable-next-line no-restricted-imports
import { countriesLayer } from "./map-style";
import { useProfile } from "~/components/profile/profile-provider";
import { type Trip } from "~/models/trip";

const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN ?? "";

export const MapView = ({ trips }: { trips: Trip[] }) => {
  const mapRef = useRef<MapRef>(null);
  const mapLoadedRef = useRef(false);
  const { activeTripIndex } = useProfile();

  const filter = useMemo(
    () => [
      "in",
      "iso_3166_1_alpha_3",
      ...trips.map((trip) => trip.countryCode),
    ],
    [trips],
  );

  const flyToTrip = useCallback(
    (tripIndex: number) => {
      const trip = trips[tripIndex];
      const map = mapRef.current;
      if (!trip || !map || !mapLoadedRef.current) return;

      map.flyTo({
        center: [trip.longitude, trip.latitude],
        zoom: 4.5,
        duration: 2400,
        essential: true,
        curve: 1.42,
        speed: 0.65,
      });
    },
    [trips],
  );

  useEffect(() => {
    flyToTrip(activeTripIndex);
  }, [activeTripIndex, flyToTrip]);

  return (
    <Map
      ref={mapRef}
      mapboxAccessToken={token}
      mapLib={import("mapbox-gl")}
      initialViewState={{
        longitude: -100,
        latitude: 40,
        zoom: 0,
      }}
      projection="globe"
      style={{
        width: "100%",
        height: "100%",
      }}
      interactiveLayerIds={["counties"]}
      mapStyle={"mapbox://styles/amho2/clrwiarp3008901pu0tpcb4xb"}
      onLoad={() => {
        mapLoadedRef.current = true;
        flyToTrip(activeTripIndex);
      }}
    >
      <Source
        id="admin-1"
        type="vector"
        url="mapbox://mapbox.country-boundaries-v1"
      >
        <Layer beforeId="waterway-label" {...countriesLayer} filter={filter} />
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
