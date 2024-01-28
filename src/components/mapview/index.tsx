import Map, { Layer, type MapLayerMouseEvent, Source } from "react-map-gl";

import "mapbox-gl/dist/mapbox-gl.css";

import { countiesLayer, highlightLayer } from "./map-style";
import { useCallback, useMemo, useState } from "react";

const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN ?? "";

type Props = {}; // eslint-disable-line

interface HoverInfo {
  longitude: number;
  latitude: number;
  countyName: string;
}

export const MapView = ({}: Props) => {
  const [hoverInfo, setHoverInfo] = useState<HoverInfo | null>(null);

  const onHover = useCallback((event: MapLayerMouseEvent) => {
    const county = event.features && event.features[0];
    const hoverInfo: HoverInfo = {
      longitude: event.lngLat.lng,
      latitude: event.lngLat.lat,
      countyName: county?.properties?.COUNTY_NAME as string,
    } as HoverInfo;
    setHoverInfo(hoverInfo);
    console.log(event);
  }, []);

  const selectedCounty = hoverInfo?.countyName ?? "";
  const filter = useMemo(
    () => ["in", "COUNTY", selectedCounty],
    [selectedCounty],
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
      onMouseMove={onHover}
      interactiveLayerIds={["counties"]}
      mapStyle="mapbox://styles/mapbox/streets-v12"
    >
      <Source type="vector" url="mapbox://mapbox.82pkq93d">
        <Layer beforeId="waterway-label" {...countiesLayer} />
        <Layer beforeId="waterway-label" {...highlightLayer} filter={filter} />
      </Source>
      {/* {selectedCounty && (
        <Popup
          longitude={hoverInfo.longitude}
          latitude={hoverInfo.latitude}
          offset={[0, -10]}
          closeButton={false}
          className="county-info"
        >
          {selectedCounty}
        </Popup>
      )} */}
    </Map>
  );
};
