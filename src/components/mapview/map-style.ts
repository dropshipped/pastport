import type { FillLayer } from "react-map-gl";

// export const countiesLayer: FillLayer = {
//   id: "counties",
//   type: "fill",
//   "source-layer": "original",
//   paint: {
//     "fill-outline-color": "rgba(0,0,0,0.1)",
//     "fill-color": "rgba(0,0,0,0.1)",
//   },
// };
// // Highlighted county polygons
// export const highlightLayer: FillLayer = {
//   id: "counties-highlighted",
//   type: "fill",
//   source: "counties",
//   "source-layer": "original",
//   paint: {
//     "fill-outline-color": "#484896",
//     "fill-color": "#6e599f",
//     "fill-opacity": 0.75,
//   },
// };

// const worldviewFilter = [
//   "any",
//   ["==", "all", ["get", "worldview"]],
//   ["in", "US", ["get", "worldview"]],
// ];
// export const countiesLayer: FillLayer = {
//   id: "admin-1-fill",
//   type: "fill",
//   // source: "origi",
//   "source-layer": "counties",
//   // filter: worldviewFilter,
//   paint: {
//     "fill-outline-color": "rgba(60, 192, 133, 0.5)",
//     "fill-color": "rgba(60, 192, 133, 0.5)",
//   },
// };

// // Highlighted county polygons
// export const highlightLayer: FillLayer = {
//   id: "counties-highlighted",
//   type: "fill",
//   source: "counties",
//   "source-layer": "original",
//   paint: {
//     "fill-outline-color": "rgba(60, 192, 133, 1)",
//     "fill-color": "rgba(60, 192, 133, 1)",
//     "fill-opacity": 0.75,
//   },
// };

export const countriesLayer: FillLayer = {
  id: "country-boundaries",
  source: {
    type: "vector",
    url: "mapbox://mapbox.country-boundaries-v1",
  },
  "source-layer": "country_boundaries",
  type: "fill",
  paint: {
    "fill-outline-color": "rgba(60, 192, 133, 0.5)",
    "fill-color": "rgba(60, 192, 133, 0.25)",
    // "fill-opacity": 0.75,
  },
};
