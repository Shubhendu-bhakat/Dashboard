"use client";

import { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";
import { dashboardData, type BarChartData } from "@/data/dashboard";

const ReactApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface MonthlyTargetProps {
  /** Optional data override. When backend is ready, pass API data here. */
  data?: BarChartData;
}

const LEGEND_COLORS = ["text-blue-600 dark:text-blue-400", "text-cyan-500 dark:text-cyan-400", "text-green-500 dark:text-green-400", "text-orange-600 dark:text-orange-400"];

export default function MonthlyTarget({ data }: MonthlyTargetProps) {
  const chartData = data ?? dashboardData.validationRecordsChart;

  const options: ApexOptions = {
    colors: ["#465FFF", "#3a9fd8", "#52d273", "#ff6b35"],
    chart: {
      fontFamily: "Outfit, sans-serif",
      type: "bar",
      height: 400,
      toolbar: { show: false },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "55%",
        borderRadius: 5,
        borderRadiusApplication: "end",
      },
    },
    dataLabels: { enabled: false },
    stroke: { show: true, width: 2, colors: ["transparent"] },
    xaxis: {
      title: { text: "Months" },
      categories: chartData.categories,
      axisBorder: { show: true },
      axisTicks: { show: false },
    },
    yaxis: {
      title: { text: "Total" },
      min: 0,
      max: 40000,
      tickAmount: 4,
      labels: { formatter: (val: number) => `${val / 1000}k` },
    },
    legend: { show: true, position: "top", horizontalAlign: "left", fontFamily: "Outfit" },
    grid: { yaxis: { lines: { show: true } } },
    fill: { opacity: 1 },
    tooltip: { y: { formatter: (val: number) => `${val}` } },
  };

  return (
    <div className="rounded-2xl border border-gray-300 bg-gray-100 shadow-theme-sm dark:border-gray-800 dark:bg-gray-800/50 dark:shadow-none">
      <div className="rounded-2xl border-b border-gray-200 bg-white px-5 pt-5 pb-11 dark:border-gray-700 dark:bg-gray-800 sm:px-6 sm:pt-6">
        <div className="flex justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white/90">
              {chartData.title}
            </h3>
            {chartData.subtitle && (
              <p className="mt-1 text-theme-sm font-normal text-gray-600 dark:text-gray-400">
                {chartData.subtitle}
              </p>
            )}
          </div>
        </div>
        <div className="relative max-h-[400px]">
          <ReactApexChart
            options={options}
            series={chartData.series}
            type="bar"
            height={400}
          />
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-5 px-6 py-3.5 sm:gap-8 sm:py-5">
        {chartData.series.map((s, i) => (
          <div key={s.name} className="flex items-center gap-2">
            {i > 0 && <div className="w-px h-7 bg-gray-200 dark:bg-gray-800" />}
            <div>
              <p className="mb-1 text-center text-theme-xs text-gray-600 dark:text-gray-400 sm:text-sm">
                {s.name}
              </p>
              <p className={`text-base font-semibold sm:text-lg ${LEGEND_COLORS[i] ?? ""}`}>◼</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
