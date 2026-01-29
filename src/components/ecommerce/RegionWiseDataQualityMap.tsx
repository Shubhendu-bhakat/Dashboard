"use client";

import React, { useMemo } from "react";
import { worldMill } from "@react-jvectormap/world";
import dynamic from "next/dynamic";
import {
  dashboardData,
  type RegionWiseDataQuality as RegionWiseDataQualityType,
} from "@/data/dashboard";

const VectorMap = dynamic(
  () => import("@react-jvectormap/core").then((mod) => mod.VectorMap),
  { ssr: false }
);

const DEFAULT_FILL = "#D0D5DD";
const SCORE_COLORS: Record<number, string> = {
  65: "#b91c1c", // dark red
  70: "#ea580c", // orange
  75: "#0ea5e9", // light blue
};

function interpolateColor(
  score: number,
  range: [number, number, number]
): string {
  const [low, mid, high] = range;
  if (score <= low) return SCORE_COLORS[65] ?? DEFAULT_FILL;
  if (score >= high) return SCORE_COLORS[75] ?? DEFAULT_FILL;
  if (score <= mid) {
    const t = (score - low) / (mid - low);
    return blend(SCORE_COLORS[65]!, SCORE_COLORS[70]!, t);
  }
  const t = (score - mid) / (high - mid);
  return blend(SCORE_COLORS[70]!, SCORE_COLORS[75]!, t);
}

function blend(hex1: string, hex2: string, t: number): string {
  const r1 = parseInt(hex1.slice(1, 3), 16);
  const g1 = parseInt(hex1.slice(3, 5), 16);
  const b1 = parseInt(hex1.slice(5, 7), 16);
  const r2 = parseInt(hex2.slice(1, 3), 16);
  const g2 = parseInt(hex2.slice(3, 5), 16);
  const b2 = parseInt(hex2.slice(5, 7), 16);
  const r = Math.round(r1 + (r2 - r1) * t);
  const g = Math.round(g1 + (g2 - g1) * t);
  const b = Math.round(b1 + (b2 - b1) * t);
  return `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
}

interface RegionWiseDataQualityMapProps {
  /** Optional data override. When backend is ready, pass API data here. */
  data?: RegionWiseDataQualityType;
}

export default function RegionWiseDataQualityMap({ data }: RegionWiseDataQualityMapProps) {
  const mapData = data ?? dashboardData.regionWiseDataQuality;

  const scoreByCode = useMemo(() => {
    const map: Record<string, number> = {};
    mapData.regions.forEach((r) => {
      map[r.code.toLowerCase()] = r.score;
    });
    return map;
  }, [mapData.regions]);

  const getRegionStyle = useMemo(
    () => (code: string) => {
      const score = scoreByCode[code.toLowerCase()];
      const fill =
        score != null
          ? interpolateColor(score, mapData.scoreRange)
          : DEFAULT_FILL;
      return {
        initial: {
          fill,
          fillOpacity: 1,
          stroke: "#fff",
          strokeWidth: 0.5,
        },
      };
    },
    [scoreByCode, mapData.scoreRange]
  );

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-300 bg-white shadow-theme-sm dark:border-gray-700 dark:bg-gray-800 dark:shadow-none">
      <style>
        {`
          .region-wise-map-enter {
            animation: regionMapFadeIn 0.6s ease-out forwards;
          }
          @keyframes regionMapFadeIn {
            from { opacity: 0; transform: scale(0.98); }
            to { opacity: 1; transform: scale(1); }
          }
          .region-wise-map path {
            transition: fill 0.25s ease, filter 0.2s ease;
          }
          .region-wise-map path:hover {
            filter: brightness(1.08);
          }
        `}
      </style>
      <div className="region-wise-map-enter border-b border-gray-200 px-5 pt-5 dark:border-gray-700 sm:px-6 sm:pt-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white/90">
          {mapData.title}
        </h3>
        <p className="mt-1 text-theme-sm text-gray-600 dark:text-gray-400">
          Data Quality Score by region
        </p>
      </div>
      <div className="region-wise-map relative my-4 mx-4 h-[320px] overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-900/80 sm:mx-6 md:h-[380px]">
        <VectorMap
          map={worldMill}
          backgroundColor="transparent"
          zoomOnScroll={true}
          zoomMin={1}
          zoomMax={8}
          zoomStep={0.5}
          regionStyle={getRegionStyle}
          className="h-full w-full"
          style={{ width: "100%", height: "100%" }}
          regionLabelStyle={{
            initial: { fill: "#64748b", fontWeight: 500, fontSize: "11px" },
            hover: {},
            selected: {},
          }}
        />
      </div>
      <div className="border-t border-gray-200 px-5 py-4 dark:border-gray-700 sm:px-6">
        <p className="mb-2 text-center text-theme-xs font-medium text-gray-700 dark:text-gray-400">
          Data Quality Score Range
        </p>
        <div className="mx-auto max-w-md">
          <div
            className="mb-1.5 h-3 w-full rounded-md"
            style={{
              background: `linear-gradient(to right, ${SCORE_COLORS[65]}, ${SCORE_COLORS[70]}, ${SCORE_COLORS[75]})`,
            }}
          />
          <div className="flex justify-between text-theme-xs font-medium text-gray-600 dark:text-gray-400">
            {mapData.scoreRange.map((v) => (
              <span key={v}>{v}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
