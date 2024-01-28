import type { FillLayer } from "react-map-gl";

export const countriesLayer: FillLayer = {
  id: "country-boundaries",
  source: {
    type: "vector",
    url: "mapbox://mapbox.country-boundaries-v1",
  },
  "source-layer": "country_boundaries",
  type: "fill",
  paint: {
    "fill-outline-color": "rgba(109, 190, 69, 0.5)",
    "fill-color": "rgba(109, 190, 69, 0.25)",
    // "fill-opacity": 0.75,
  },
};
