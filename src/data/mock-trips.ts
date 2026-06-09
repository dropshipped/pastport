import { type Trip } from "~/models/trip";

/** Demo travel history — dates aligned with local holidays and seasons. */
export const mockTrips: Trip[] = [
  {
    title: "Beijing, China",
    latitude: 39.9042,
    longitude: 116.4074,
    countryCode: "CHN",
    imageUrl:
      "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=800&auto=format&fit=crop&q=80",
    date: "Jan 22, '23",
  },
  {
    title: "Rio de Janeiro, Brazil",
    latitude: -22.9068,
    longitude: -43.1729,
    countryCode: "BRA",
    imageUrl:
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&auto=format&fit=crop&q=80",
    date: "Feb 21, '23",
  },
  {
    title: "Tokyo, Japan",
    latitude: 35.6762,
    longitude: 139.6503,
    countryCode: "JPN",
    imageUrl:
      "https://images.unsplash.com/photo-1522383225653-ed111181a951?w=800&auto=format&fit=crop&q=80",
    date: "Mar 26, '23",
  },
  {
    title: "Amsterdam, Netherlands",
    latitude: 52.3676,
    longitude: 4.9041,
    countryCode: "NLD",
    imageUrl:
      "https://images.unsplash.com/photo-1534351590666-13e3e96b5017?w=800&auto=format&fit=crop&q=80",
    date: "Apr 27, '23",
  },
  {
    title: "New York City, USA",
    latitude: 40.7128,
    longitude: -74.006,
    countryCode: "USA",
    imageUrl:
      "https://plus.unsplash.com/premium_photo-1673643157179-c2dd8ea503d7?w=800&auto=format&fit=crop&q=80",
    date: "Jul 4, '23",
  },
  {
    title: "Paris, France",
    latitude: 48.8566,
    longitude: 2.3522,
    countryCode: "FRA",
    imageUrl:
      "https://plus.unsplash.com/premium_photo-1677343985901-33e9cd84fd9b?w=800&auto=format&fit=crop&q=80",
    date: "Jul 14, '23",
  },
  {
    title: "Bali, Indonesia",
    latitude: -8.5069,
    longitude: 115.2625,
    countryCode: "IDN",
    imageUrl:
      "https://plus.unsplash.com/premium_photo-1668883188861-39974ed9ad99?w=800&auto=format&fit=crop&q=80",
    date: "Aug 12, '23",
  },
  {
    title: "Munich, Germany",
    latitude: 48.1351,
    longitude: 11.582,
    countryCode: "DEU",
    imageUrl:
      "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=800&auto=format&fit=crop&q=80",
    date: "Sep 16, '23",
  },
  {
    title: "Mexico City, Mexico",
    latitude: 19.4326,
    longitude: -99.1332,
    countryCode: "MEX",
    imageUrl:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&auto=format&fit=crop&q=80",
    date: "Nov 1, '23",
  },
  {
    title: "Sydney, Australia",
    latitude: -33.8688,
    longitude: 151.2093,
    countryCode: "AUS",
    imageUrl:
      "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=800&auto=format&fit=crop&q=80",
    date: "Dec 31, '23",
  },
];
