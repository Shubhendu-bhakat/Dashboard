"use client";

import React, { useMemo, useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup
} from "react-simple-maps";
import { scaleLinear } from "d3-scale";
import { interpolateRgb } from "d3-interpolate";
import { dashboardData } from "@/data/dashboard";
import { worldGeo } from "../../worldGo";

const ISO2_TO_NUMERIC: Record<string, string> = {
  ke: "404",
  tz: "834",
  ug: "800",
  rw: "646",
  cd: "180",
  et: "231",
  zw: "716",
  zm: "894",
  mw: "454",
  ss: "728"
};

export default function RegionWiseDataQualityMap() {
  const regions = dashboardData.regionWiseDataQuality.regions;
  const [tooltip, setTooltip] = useState<string | null>(null);

  const scoreById = useMemo(() => {
    const map: Record<string, number> = {};
    regions.forEach(r => {
      const id = ISO2_TO_NUMERIC[r.code];
      if (id) map[id] = r.score;
    });
    return map;
  }, [regions]);

  const colorScale = scaleLinear<string>()
    .domain([60, 70, 80])
    .range(["#991b1b", "#f97316", "#0284c7"])
    .interpolate(interpolateRgb)
    .clamp(true);

 return (
  <div className="rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-900">
    
    {/* Header */}
    <div className="border-b border-gray-200 px-5 py-4 dark:border-gray-700">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
        Region wise data Quality
      </h3>
      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
        Data Quality Score by region
      </p>
    </div>

    {/* Map */}
    <div className="relative h-[360px] overflow-hidden bg-gray-100 dark:bg-gray-800">
      {tooltip && (
        <div className="absolute left-1/2 top-3 z-50 -translate-x-1/2 rounded-md bg-black px-3 py-1 text-xs text-white shadow-lg">
          {tooltip}
        </div>
      )}

      <ComposableMap className="h-full w-full">
        <ZoomableGroup center={[34, -3]} zoom={2.8}>
          <Geographies geography={worldGeo}>
            {({ geographies }) =>
              geographies.map(geo => {
                const id = geo.id as string;
                const score = scoreById[id];
                const fill = score ? colorScale(score) : "#e5e7eb";

                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={fill}
                    stroke="#ffffff"
                    strokeWidth={0.6}
                    style={{
                      default: { outline: "none" },
                      hover: {
                        fill,
                        filter: "brightness(1.15)",
                        outline: "none"
                      },
                      pressed: { outline: "none" }
                    }}
                    onMouseEnter={() => {
                      if (score) {
                        setTooltip(`${geo.properties.name} — DQ ${score}`);
                      }
                    }}
                    onMouseLeave={() => setTooltip(null)}
                  />
                );
              })
            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>
    </div>

    {/* Legend */}
    <div className="border-t border-gray-200 px-5 py-4 dark:border-gray-700">
      <p className="mb-2 text-center text-xs font-medium text-gray-600 dark:text-gray-400">
        Data Quality Score Range
      </p>

      <div className="mx-auto max-w-sm">
        <div
          className="h-3 w-full rounded-md"
          style={{
            background:
              "linear-gradient(to right, #7a001f, #f4a582, #053061)"
          }}
        />
        <div className="mt-1 flex justify-between text-xs font-medium text-gray-500 dark:text-gray-400">
          <span>65</span>
          <span>70</span>
          <span>75</span>
        </div>
      </div>
    </div>
  </div>
);

}
