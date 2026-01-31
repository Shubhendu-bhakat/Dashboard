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
    <div className="relative rounded-2xl p-2 bg-[linear-gradient(to_right,rgba(0,0,0,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.04)_1px,transparent_1px)] bg-[size:40px_40px] dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)]">

      {/* Compact Grid */}
      <div className="grid grid-cols-2 gap-2 md:grid-cols-3 xl:grid-cols-3">
        {mappedMetrics.map((metric) => {
          const Icon = iconMap[metric.icon] ?? CheckCircleIcon;
          const isUp = metric.changeType === "up";
          const isActive = activeId === metric.id;

          return (
            <div
              key={metric.id}
              onMouseEnter={() => setActiveId(metric.id)}
              onMouseLeave={() => setActiveId(null)}
              className={`relative rounded-2xl border 
                ${
                  isActive
                    ? "border-white/40 dark:border-white/30"
                    : "border-black/10 dark:border-white/10"
                }
                bg-gradient-to-br ${metric.gradient}
                p-4 backdrop-blur-xl
                transition-all duration-300 hover:-translate-y-1 hover:shadow-xl`}
            >
              {/* Icon */}
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-white/20 shadow-md mb-2">
                <Icon className="text-white size-5" />
              </div>

              {/* Divider */}
              <div className="h-px w-full bg-white/20 dark:bg-black/30 mb-2" />

              {/* Content */}
              <div className="flex items-end justify-between">
                <div>
                  <span className="text-[11px] font-semibold uppercase tracking-wide text-white/80">
                    {metric.label}
                  </span>
                  <h4 className="mt-1 text-base font-bold text-white">
                    {metric.value}
                  </h4>
                </div>

                {isUp ? (
                  <Badge color="success" className="scale-90">
                    <ArrowUpIcon />
                    {metric.change}
                  </Badge>
                ) : (
                  <Badge color="error" className="scale-90">
                    <ArrowDownIcon />
                    {metric.change}
                  </Badge>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
