// import { z } from "zod";
// import { createTRPCRouter, publicProcedure } from "../trpc";

// export const locationRouter = createTRPCRouter({
//   coordinateToCountry: publicProcedure
//     .input(z.object({ lat: z.string(), lon: z.string() }))
//     .query(async ({ input }) => {
//       const { lat, lon } = input;
//       const OPEN_WEATHER_KEY = process.env.OPEN_WEATHER_KEY;
//       try {
//         const response: any = await fetch(
//           `http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=5&appid=${OPEN_WEATHER_KEY}`,
//         );
//         if (!response.ok) {
//           throw new Error("failed to fetch data");
//         }
//         const data = await response.json();
//         return data[0].country;
//       } catch (error) {
//         console.log(error);
//         throw new Error("failed to fetch data");
//       }
//     }),
// });

import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const locationRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),
  coordinateToCountry: publicProcedure
    .input(z.object({ lat: z.string(), lon: z.string() }))
    .query(async ({ input }) => {
      const { lat, lon } = input;
      const OPEN_WEATHER_KEY = process.env.OPEN_WEATHER_KEY;
      try {
        const response: any = await fetch(
          `http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=5&appid=${OPEN_WEATHER_KEY}`,
        );
        if (!response.ok) {
          throw new Error("failed to fetch data");
        }
        const data = await response.json();
        return data[0].country;
      } catch (error) {
        console.log(error);
        throw new Error("failed to fetch data");
      }
    }),
});
