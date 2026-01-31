"use client";

import React, { useState } from "react";
import Badge from "../ui/badge/Badge";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  BoxIconLine,
  CheckCircleIcon,
  AlertIcon,
  FileIcon,
  EnvelopeIcon,
} from "@/icons";
import { dashboardData, type MetricCard } from "@/data/dashboard";
import { useDashboardFilter } from "../ecommerce/Dashboardfilter";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  "check-circle": CheckCircleIcon,
  alert: AlertIcon,
  file: FileIcon,
  "box-line": BoxIconLine,
  envelope: EnvelopeIcon,
};

interface EcommerceMetricsProps {
  data?: MetricCard[];
}

export function EcommerceMetrics({ data }: EcommerceMetricsProps) {
  const { year, month } = useDashboardFilter();
  const metrics = data ?? dashboardData.metrics;
  const [activeId, setActiveId] = useState<string | null>(null);

  const mappedMetrics = metrics.map((metric) => {
    const date = new Date(metric.value);
    const matchYear = date.getFullYear() === year;
    const matchMonth =
      month === "All" ||
      date.toLocaleString("en", { month: "short" }) === month;

    if (matchYear && matchMonth) return metric;

    return {
      ...metric,
      value: "0",
      change: "0%",
      changeType: "down",
    };
  });

  return (
    <div className="relative rounded-3xl p-3 bg-[linear-gradient(to_right,rgba(0,0,0,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.05)_1px,transparent_1px)] bg-[size:40px_40px] dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] animate-grid">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {mappedMetrics.map((metric) => {
          const Icon = iconMap[metric.icon] ?? CheckCircleIcon;
          const isUp = metric.changeType === "up";
          const isActive = activeId === metric.id;

          return (
            <div
              key={metric.id}
              onMouseEnter={() => setActiveId(metric.id)}
              onMouseLeave={() => setActiveId(null)}
              className={`metric-card relative rounded-3xl border 
                ${
                  isActive
                    ? "border-white/40 dark:border-white/30"
                    : "border-black/10 dark:border-white/10"
                }
                bg-gradient-to-br ${metric.gradient} p-6 md:p-7 backdrop-blur-xl
                shadow-[0_0_0_1px_rgba(255,255,255,0.08)_inset]
                dark:shadow-[0_0_0_1px_rgba(0,0,0,0.6)_inset]
                transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl group`}
            >
              <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition bg-white/10 blur-2xl" />

              <div className="relative z-10 flex items-center justify-center w-14 h-14 rounded-2xl bg-white/20 shadow-lg transition-transform duration-300 group-hover:scale-110">
                <Icon className="text-white size-7" />
              </div>

              <div className="relative z-10 mt-4 h-px w-full bg-white/20 dark:bg-black/30" />

              <div className="relative z-10 flex items-end justify-between mt-6">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wide text-white/80">
                    {metric.label}
                  </span>
                  <h4 className="mt-3 text-lg font-bold text-white">
                    {metric.value}
                  </h4>
                </div>

                {isUp ? (
                  <Badge color="success">
                    <ArrowUpIcon />
                    {metric.change}
                  </Badge>
                ) : (
                  <Badge color="error">
                    <ArrowDownIcon className="text-error-500" />
                    {metric.change}
                  </Badge>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <style>
        {`
          @keyframes slideUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .metric-card { animation: slideUp 0.6s ease-out forwards; }

          @keyframes gridMove {
            0% { background-position: 0 0; }
            100% { background-position: 40px 40px; }
          }
          .animate-grid {
            animation: gridMove 12s linear infinite;
          }
        `}
      </style>
    </div>
  );
}
