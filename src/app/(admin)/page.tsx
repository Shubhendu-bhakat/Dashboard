
import { EcommerceMetrics } from "@/components/ecommerce/Cards";
import MonthlyTarget from "@/components/ecommerce/BarGraph1&2";
import MonthlySalesChart from "@/components/ecommerce/Error&Warnings";
import RegionWiseDataQualityMap from "@/components/ecommerce/RegionWiseDataQualityMap";
import { dashboardData } from "@/data/dashboard";
import { DashboardFilterProvider } from "../../components/ecommerce/Dashboardfilter";
import DashboardFilters from "../../components/ecommerce/DashboardfilterCard";

export default function DashboardPage() {
  return (
    <DashboardFilterProvider>

      <div className="grid grid-cols-[0.4fr_0.6fr] gap-6 items-stretch">
     {/* <div className="grid grid-cols-2 gap-6 items-stretch"> */}
        {/* LEFT COLUMN */}
        <div className="flex flex-col gap-6">
          <DashboardFilters />

          <EcommerceMetrics />

          <MonthlySalesChart />

          <RegionWiseDataQualityMap />

        </div>

        {/* RIGHT COLUMN */}
        <div className="flex flex-col gap-6">

          <MonthlyTarget data={dashboardData.validationRecordsChart} />

          <MonthlyTarget data={dashboardData.validationRecordsChart2} />

        </div>

      </div>

    </DashboardFilterProvider>
  );
}

