import Map, { Layer, Source } from "react-map-gl";

import "mapbox-gl/dist/mapbox-gl.css";

// eslint-disable-next-line no-restricted-imports
import { TripMarker } from "./marker";
import { useMemo } from "react";
// eslint-disable-next-line no-restricted-imports
import { countriesLayer } from "./map-style";

const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN ?? "";

type Props = {}; // eslint-disable-line

// interface HoverInfo {
//   longitude: number;
//   latitude: number;
//   countyName: string;
// }

export const MapView = ({}: Props) => {
  // const [hoverInfo, setHoverInfo] = useState<HoverInfo | null>(null);

  // const onHover = useCallback((event: MapLayerMouseEvent) => {
  //   const county = event.features && event.features[0];
  //   const hoverInfo: HoverInfo = {
  //     longitude: event.lngLat.lng,
  //     latitude: event.lngLat.lat,
  //     countyName: county?.properties?.COUNTY_NAME as string,
  //   } as HoverInfo;
  //   setHoverInfo(hoverInfo);
  //   console.log(event);
  // }, []);

  // const selectedCounty = hoverInfo?.countyName ?? "";
  const filter = useMemo(
    () => ["in", "iso_3166_1_alpha_3", "NLD", "ITA", "USA"],
    [],
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

      {/* <TripMarker/> */}

      <TripMarker
        longitude={-100}
        latitude={40}
        imageUrl={
          "https://nextui-docs-v2.vercel.app/images/hero-card-complete.jpeg"
        }
      />
    </Map>
  );
};
