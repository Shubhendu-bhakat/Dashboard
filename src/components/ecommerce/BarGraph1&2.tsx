"use client";

import { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";
import { useMemo, useState } from "react";
import { dashboardData, type BarChartData } from "@/data/dashboard";
import { FunnelIcon } from "@heroicons/react/24/outline";


const ReactApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface MonthlyTargetProps {
  data?: BarChartData;
}

const LEGEND_COLORS = [
  "text-blue-600 dark:text-blue-400",
  "text-cyan-500 dark:text-cyan-400",
  "text-green-500 dark:text-green-400",
  "text-orange-600 dark:text-orange-400",
];

export default function MonthlyTarget({ data }: MonthlyTargetProps) {
  const chartData = data ?? dashboardData.validationRecordsChart;

  const [selectedField, setSelectedField] = useState<string>("ALL");
  const [topN, setTopN] = useState<number>(5);
  const [open, setOpen] = useState(false);

  // Rank fields by total errors/warnings
  const rankedSeries = useMemo(() => {
    return [...chartData.series].sort((a, b) => {
      const sumA = a.data.reduce((x, y) => x + y, 0);
      const sumB = b.data.reduce((x, y) => x + y, 0);
      return sumB - sumA;
    });
  }, [chartData.series]);

  // Apply field + top-N filter
  const filteredSeries = useMemo(() => {
    if (selectedField !== "ALL") {
      return rankedSeries.filter((s) => s.name === selectedField);
    }
    return rankedSeries.slice(0, topN);
  }, [rankedSeries, selectedField, topN]);

  // Trend on first visible series
  const mainSeries = filteredSeries[0];
  const current = mainSeries?.data.at(-1) || 0;
  const previous = mainSeries?.data.at(-2) || 0;
  const diff = current - previous;
  const percent = previous ? ((diff / previous) * 100).toFixed(1) : "0";
  const isUp = diff >= 0;

  const options: ApexOptions = {
    colors: ["#465FFF", "#3A9FD8", "#52D273", "#FF6B35"],
    chart: {
      fontFamily: "Outfit, sans-serif",
      type: "bar",
      height: 400,
      toolbar: { show: false },
      animations: { enabled: true, speed: 1000 },
    },
    plotOptions: {
      bar: { columnWidth: "50%", borderRadius: 8, borderRadiusApplication: "end" },
    },
    dataLabels: { enabled: false },
    xaxis: { categories: chartData.categories },
    yaxis: {
      labels: {
        formatter: (val) => `${val / 1000}k`,
      },
    },
    tooltip: {
      shared: true,
      intersect: false,
      theme: "dark",
    },
    legend: { show: false },
  };

  return (
    <div className="rounded-2xl border border-gray-300 bg-gray-100 dark:border-gray-800 dark:bg-gray-900">

     {/* Mobile header */}
<div className="mb-3 flex items-center justify-between sm:hidden">
  <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
    Filters
  </h3>
  <button
    onClick={() => setOpen(!open)}
    className="rounded-lg border border-black/10 p-2 dark:border-white/10"
  >
    <FunnelIcon className="h-5 w-5 text-gray-700 dark:text-gray-300" />
  </button>
</div>

{/* Filter panel */}
<div className={`${open ? "block" : "hidden"} sm:block`}>
  <div className="mb-5 max-w-full overflow-hidden rounded-2xl border border-black/10 bg-white/80 p-4 backdrop-blur-md dark:border-white/10 dark:bg-gray-900/80">

    <div className="grid grid-cols-1 gap-4 sm:grid-cols-[220px_140px_1fr]">

      {/* Field Selector */}
      <div className="flex flex-col gap-1">
        <span className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
          Field
        </span>
        <select
          value={selectedField}
          onChange={(e) => setSelectedField(e.target.value)}
          className="h-10 w-full rounded-xl border border-black/10 bg-white px-3 text-sm font-medium text-gray-900 shadow-sm outline-none transition
          hover:border-blue-500 focus:ring-2 focus:ring-blue-500
          dark:border-white/10 dark:bg-gray-800 dark:text-white"
        >
          <option value="ALL">All Fields</option>
          {chartData.series.map((s) => (
            <option key={s.name} value={s.name}>
              {s.name}
            </option>
          ))}
        </select>
      </div>

      {/* Top-N Selector */}
      <div className="flex flex-col gap-1">
        <span className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
          Show
        </span>
        <select
          value={topN}
          onChange={(e) => setTopN(Number(e.target.value))}
          disabled={selectedField !== "ALL"}
          className={`h-10 w-full rounded-xl border px-3 text-sm font-medium shadow-sm outline-none transition
            ${selectedField !== "ALL"
              ? "cursor-not-allowed opacity-50"
              : "hover:border-blue-500 focus:ring-2 focus:ring-blue-500"}
            border-black/10 bg-white text-gray-900
            dark:border-white/10 dark:bg-gray-800 dark:text-white`}
        >
          <option value={5}>Top 5</option>
          <option value={10}>Top 10</option>
          <option value={20}>Top 20</option>
          <option value={48}>All</option>
        </select>
      </div>

      {/* Active Filter Badge */}
      {/* Active Filter Badge */}
<div className="flex items-end justify-end">
  <div
    title={selectedField === "ALL" ? `Top ${topN} fields` : selectedField}
    className="
      h-10 w-full sm:w-[260px] truncate rounded-xl
      border border-blue-600/40
      bg-blue-100 px-4
      flex items-center justify-center
      text-sm font-semibold text-blue-900
      shadow-sm

      dark:border-blue-400/30
      dark:bg-blue-400/10
      dark:text-blue-300
    "
  >
    {selectedField === "ALL"
      ? `Top ${topN} fields`
      : selectedField}
  </div>
</div>


    </div>
  </div>
</div>



      {/* Title & Trend */}
      <div className="px-5 pt-2">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          {chartData.title}
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {Math.abs(Number(percent))}% {isUp ? "▲" : "▼"} vs last month
        </p>
      </div>

      {/* Chart */}
      <div className="p-4">
        <ReactApexChart
          options={options}
          series={filteredSeries}
          type="bar"
          height={400}
        />
      </div>

      {/* Legend */}
      <div className="flex flex-wrap justify-center gap-4 p-4">
        {filteredSeries.map((s, i) => (
          <div key={s.name} className="flex items-center gap-2">
            <span className={`text-xl ${LEGEND_COLORS[i]}`}>●</span>
            <span className="text-sm dark:text-gray-300">{s.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
