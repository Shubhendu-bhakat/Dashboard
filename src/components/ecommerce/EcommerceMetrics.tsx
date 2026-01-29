"use client";

import React from "react";
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

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  "check-circle": CheckCircleIcon,
  alert: AlertIcon,
  file: FileIcon,
  "box-line": BoxIconLine,
  envelope: EnvelopeIcon,
};

interface EcommerceMetricsProps {
  /** Optional data override. When backend is ready, pass API data here. */
  data?: MetricCard[];
}

export function EcommerceMetrics({ data }: EcommerceMetricsProps) {
  const metrics = data ?? dashboardData.metrics;

  return (
    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:gap-3">
      <style>
        {`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .metric-card { animation: slideUp 0.6s ease-out forwards; }
        .metric-card:nth-child(1) { animation-delay: 0.1s; }
        .metric-card:nth-child(2) { animation-delay: 0.2s; }
        .metric-card:nth-child(3) { animation-delay: 0.3s; }
        .metric-card:nth-child(4) { animation-delay: 0.4s; }
        .metric-card:nth-child(5) { animation-delay: 0.5s; }
        .metric-card:nth-child(6) { animation-delay: 0.6s; }
        .metric-card:hover { transform: translateY(-4px); }
      `}
      </style>

      {metrics.map((metric) => {
        const Icon = iconMap[metric.icon] ?? CheckCircleIcon;
        const isUp = metric.changeType === "up";
        return (
          <div
            key={metric.id}
            className={`metric-card rounded-3xl border border-gray-300 bg-gradient-to-br ${metric.gradient} p-6 transition-all duration-500 hover:shadow-2xl dark:border-gray-700 md:p-7 backdrop-blur-sm`}
          >
            <div className="flex items-center justify-center w-14 h-14 rounded-2xl shadow-lg transition-transform duration-300 hover:scale-110 bg-white/20">
              <Icon className="text-white size-7" />
            </div>
            <div className="flex items-end justify-between mt-6">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wide text-white/80">
                  {metric.label}
                </span>
                <h4 className="mt-3 text-lg font-bold text-white">{metric.value}</h4>
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
  );
}
