"use client";

import { useDashboardFilter } from "../ecommerce/Dashboardfilter";

const years = Array.from({ length: 2026 - 2014 + 1 }, (_, i) => 2014 + i);
const months = ["All","Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

export default function DashboardFilters() {
  const { year, month, setYear, setMonth } = useDashboardFilter();

  return (
    <div className="mb-6 flex flex-wrap items-center gap-4 rounded-2xl border border-black/10 bg-white/70 p-4 backdrop-blur-md dark:border-white/10 dark:bg-gray-900/70">
      
      {/* Year */}
      <div className="flex flex-col gap-1">
        <span className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
          Year
        </span>
        <select
          value={year}
          onChange={(e) => setYear(Number(e.target.value))}
          className="rounded-xl border border-black/10 bg-white px-4 py-2 text-sm font-medium text-gray-900 shadow-sm outline-none transition hover:border-blue-500 focus:ring-2 focus:ring-blue-500 dark:border-white/10 dark:bg-gray-800 dark:text-white"
        >
          {years.map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>
      </div>

      {/* Month */}
      <div className="flex flex-col gap-1">
        <span className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
          Month
        </span>
        <select
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          className="rounded-xl border border-black/10 bg-white px-4 py-2 text-sm font-medium text-gray-900 shadow-sm outline-none transition hover:border-blue-500 focus:ring-2 focus:ring-blue-500 dark:border-white/10 dark:bg-gray-800 dark:text-white"
        >
          {months.map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>
      </div>

      {/* Active filter badge */}
      <div className="ml-auto flex items-center gap-2 rounded-xl bg-blue-600/10 px-4 py-2 text-sm font-semibold text-blue-600 dark:bg-blue-400/10 dark:text-blue-400">
        {month === "All" ? "Full Year" : month} {year}
      </div>
    </div>
  );
}
