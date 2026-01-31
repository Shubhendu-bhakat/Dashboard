import { EcommerceMetrics } from "@/components/ecommerce/Cards";
import MonthlyTarget from "@/components/ecommerce/BarGraph1&2";
import MonthlySalesChart from "@/components/ecommerce/Error&Warnings";
import RegionWiseDataQualityMap from "@/components/ecommerce/RegionWiseDataQualityMap";
import { dashboardData } from "@/data/dashboard";
import { DashboardFilterProvider } from "../../components/ecommerce/Dashboardfilter";
import DashboardFilters from "../../components/ecommerce/DashboardfilterCard";

export default function DashboardPage() {
  return (
    //provide context to filter components used in date filtering
     <DashboardFilterProvider>
    <div className="grid grid-cols-12 gap-4 md:gap-6">
        <div className="col-span-12 space-y-6 xl:col-span-7">
          {/* //filter cards based on date range */}
          <DashboardFilters /> 
           {/* //metrics cards */}
          <EcommerceMetrics />
           {/* //error & warnings  */}
          <MonthlySalesChart />          
        </div>
        <div className="col-span-12 space-y-6 xl:col-span-5">
          <DashboardFilterProvider>
            
          <MonthlyTarget data={dashboardData.validationRecordsChart} /> 
          <MonthlyTarget data={dashboardData.validationRecordsChart2} />
          </DashboardFilterProvider>
          
        </div>
        
        <div className="col-span-12">
          <RegionWiseDataQualityMap /> 
        </div>
      </div>
      </DashboardFilterProvider>
  );
}
