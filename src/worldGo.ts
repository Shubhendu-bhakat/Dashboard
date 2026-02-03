import world from "../public/world-110m.json";
import { feature } from "topojson-client";

export const worldGeo = feature(
  world as any,
  (world as any).objects.countries
);
