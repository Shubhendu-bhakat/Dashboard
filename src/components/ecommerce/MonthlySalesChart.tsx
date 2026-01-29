"use client";
import { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";
import { MoreDotIcon } from "@/icons";
import { DropdownItem } from "../ui/dropdown/DropdownItem";
import { useState } from "react";
import { Dropdown } from "../ui/dropdown/Dropdown";

// Dynamically import the ReactApexChart component
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

export default function MonthlySalesChart() {
  const options: ApexOptions = {
    colors: ["#ff6b35", "#465fff"],
    chart: {
      fontFamily: "Outfit, sans-serif",
      type: "pie",
      height: 350,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      pie: {
        donut: {
          size: "0%",
        },
      },
    },
    labels: ["Errors", "Warnings"],
    dataLabels: {
      enabled: true,
      formatter: function(val: any) {
        return val.toFixed(1) + "%";
      },
      style: {
        fontSize: "13px",
        fontWeight: "bold",
        fontFamily: "Outfit",
      },
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
    },
    legend: {
      show: true,
      position: "bottom",
      horizontalAlign: "center",
      fontFamily: "Outfit",
    },
    tooltip: {
      enabled: true,
      theme: "dark",
      style: {
        fontSize: "12px",
      },
      y: {
        formatter: (val: number) => `${val}`,
      },
    },
    states: {
      hover: {
        filter: {
          type: "darken",
        },
      },
      active: {
        filter: {
          type: "darken",
        },
      },
    },
  };
  const series = [4295, 3581];
  const [isOpen, setIsOpen] = useState(false);

  function toggleDropdown() {
    setIsOpen(!isOpen);
  }

  function closeDropdown() {
    setIsOpen(false);
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-300 bg-white px-5 pt-5 shadow-theme-sm dark:border-gray-800 dark:bg-gray-800 dark:shadow-none sm:px-6 sm:pt-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white/90">
          Errors & Warnings
        </h3>

        <div className="relative inline-block">
          <button onClick={toggleDropdown} className="dropdown-toggle">
            <MoreDotIcon className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-300" />
          </button>
          <Dropdown
            isOpen={isOpen}
            onClose={closeDropdown}
            className="w-40 p-2"
          >
            <DropdownItem
              onItemClick={closeDropdown}
              className="flex w-full font-normal text-left text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
            >
              View More
            </DropdownItem>
            <DropdownItem
              onItemClick={closeDropdown}
              className="flex w-full font-normal text-left text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
            >
              Delete
            </DropdownItem>
          </Dropdown>
        </div>
      </div>

      <div className="max-w-full overflow-x-auto custom-scrollbar">
        <div className="flex justify-center items-center py-6">
          <ReactApexChart
            options={options}
            series={series}
            type="pie"
            height={350}
          />
        </div>
      </div>
    </div>
  );
}
