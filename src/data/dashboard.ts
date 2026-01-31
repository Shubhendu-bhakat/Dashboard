

export type MetricChangeType = "up" | "down";

//data to card component type definition
export interface MetricCard {
  id: string;
  label: string;
  value: string;
  change: string;
  changeType: MetricChangeType; //arrow type
  gradient: string;
  icon: string;
}

export interface PieChartData {
  title: string; //title of chart
  labels: string[]; //labels for pie segments
  series: number[]; //data values for pie segments
}

export interface BarSeriesItem {
  name: string;
  data: number[];
}

export interface BarChartData {
  title: string;
  subtitle?: string;
  categories: string[];
  series: BarSeriesItem[];
}

export interface AreaChartSeriesItem {
  name: string;
  data: number[];
}

export interface StatisticsChartData {
  title: string;
  subtitle?: string;
  categories: string[];
  series: AreaChartSeriesItem[];
}

export interface DemographicItem {
  country: string;
  code: string;
  customers: number;
  percentage: number;
  flagSrc: string;
}

/** Region-wise data quality score (choropleth). Use ISO 3166-1 alpha-2 lowercase (e.g. "tz", "ke"). */
export interface RegionDataQuality {
  code: string;
  name: string;
  score: number;
}

export interface RegionWiseDataQuality {
  title: string;
  scoreRange: [number, number, number]; // e.g. [65, 70, 75] for legend
  regions: RegionDataQuality[];
}

export interface DashboardData {
  metrics: MetricCard[];
  errorsWarningsChart: PieChartData;
  validationRecordsChart: BarChartData;
  /** Second bar chart: Country Code, Customer Id, Email Address */
  validationRecordsChart2: BarChartData;
  regionWiseDataQuality: RegionWiseDataQuality;
}
///dashboard data as demo
export const dashboardData: DashboardData = {
  metrics: [
    {
      id: "overall-dq",
      label: "Overall DQ",
      value: "05 Oct 2023",
      change: "11.01%",
      changeType: "up",
      gradient: "from-blue-900 to-indigo-900",
      icon: "check-circle",
    },
    {
      id: "accuracy",
      label: "Accuracy",
      value: "15 Nov 2023",
      change: "9.05%",
      changeType: "down",
      gradient: "from-green-900 to-emerald-900",
      icon: "alert",
    },
    {
      id: "completeness",
      label: "Completeness",
      value: "20 Dec 2023",
      change: "9.05%",
      changeType: "down",
      gradient: "from-purple-900 to-pink-900",
      icon: "file",
    },
    {
      id: "validity",
      label: "Validity",
      value: "10 Jan 2024",
      change: "9.05%",
      changeType: "down",
      gradient: "from-orange-900 to-amber-900",
      icon: "box-line",
    },
    {
      id: "data-integrity",
      label: "Data Integrity",
      value: "25 Feb 2024",
      change: "9.05%",
      changeType: "down",
      gradient: "from-rose-900 to-red-900",
      icon: "box-line",
    },
    {
      id: "total-rows",
      label: "Total Row Processed",
      value: "18 Mar 2024",
      change: "9.05%",
      changeType: "down",
      gradient: "from-cyan-900 to-blue-900",
      icon: "envelope",
    },
  ],
  errorsWarningsChart: {
    title: "Errors & Warnings",
    labels: ["Errors", "Warnings"],
    series: [4295, 3581],
  },
  validationRecordsChart: {
  title: "Warning Distributions",
  subtitle: "Monthly Data Quality Warnings by Field",
  categories: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],
  series: [
    { name: "Date Of Birth", data: [12000,15000,18000,22000,25000,28000,30000,32000,28000,25000,20000,18000] },
    { name: "Email Address", data: [18000,20000,22000,24000,26000,28000,30000,28000,26000,24000,22000,20000] },
    { name: "First Name", data: [10000,12000,14000,16000,18000,20000,22000,24000,20000,18000,16000,14000] },
    { name: "Last Name", data: [9000,11000,13000,15000,17000,19000,21000,23000,20000,18000,16000,14000] },
    { name: "Phone Number", data: [8000,10000,12000,14000,16000,18000,20000,22000,19000,17000,15000,13000] },
    { name: "Address Line 1", data: [15000,17000,19000,21000,23000,25000,27000,29000,26000,24000,22000,20000] },
    { name: "Address Line 2", data: [6000,8000,10000,12000,14000,16000,18000,20000,17000,15000,13000,11000] },
    { name: "City", data: [7000,9000,11000,13000,15000,17000,19000,21000,18000,16000,14000,12000] },
    { name: "State", data: [5000,7000,9000,11000,13000,15000,17000,19000,16000,14000,12000,10000] },
    { name: "Country", data: [4000,6000,8000,10000,12000,14000,16000,18000,16000,14000,12000,10000] },
    { name: "Postal Code", data: [6000,7000,8000,9000,10000,11000,12000,13000,12000,11000,10000,9000] },
    { name: "Customer ID", data: [11000,13000,15000,17000,19000,21000,23000,25000,22000,20000,18000,16000] },
    { name: "Account Number", data: [9000,10000,12000,14000,16000,18000,20000,22000,20000,18000,16000,14000] },
    { name: "Transaction ID", data: [14000,16000,18000,20000,22000,24000,26000,28000,25000,23000,21000,19000] },
    { name: "Transaction Date", data: [8000,10000,12000,14000,16000,18000,20000,22000,20000,18000,16000,14000] },
    { name: "Payment Method", data: [6000,8000,10000,12000,14000,16000,18000,20000,18000,16000,14000,12000] },
    { name: "Currency Code", data: [5000,6000,7000,8000,9000,10000,11000,12000,11000,10000,9000,8000] },
    { name: "Device ID", data: [4000,6000,8000,10000,12000,14000,16000,18000,16000,14000,12000,10000] },
    { name: "IP Address", data: [7000,9000,11000,13000,15000,17000,19000,21000,19000,17000,15000,13000] },
    { name: "Browser", data: [5000,7000,9000,11000,13000,15000,17000,19000,17000,15000,13000,11000] },
    { name: "Operating System", data: [6000,8000,10000,12000,14000,16000,18000,20000,18000,16000,14000,12000] },
    { name: "Login Time", data: [9000,11000,13000,15000,17000,19000,21000,23000,21000,19000,17000,15000] },
    { name: "Logout Time", data: [7000,9000,11000,13000,15000,17000,19000,21000,19000,17000,15000,13000] },
    { name: "Registration Date", data: [4000,5000,6000,7000,8000,9000,10000,11000,10000,9000,8000,7000] },
    { name: "Last Updated", data: [10000,12000,14000,16000,18000,20000,22000,24000,22000,20000,18000,16000] },
  ],
},

 validationRecordsChart2: {
  title: "Error Distributions",
  subtitle: "High Severity Data Errors by Field",
  categories: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],
  series: [
    { name: "Country Code", data: [5200,5400,5800,6200,6500,6800,7200,7500,7100,6700,6400,6000] },
    { name: "Customer ID", data: [8100,8400,8800,9200,9600,10000,10400,10800,10200,9800,9400,9000] },
    { name: "Email Address", data: [18000,20000,22000,24000,26000,28000,30000,28000,26000,24000,22000,20000] },
    { name: "Phone Number", data: [9000,11000,13000,15000,17000,19000,21000,23000,20000,18000,16000,14000] },
    { name: "Account Number", data: [7000,8000,9000,10000,11000,12000,13000,14000,13000,12000,11000,10000] },
    { name: "Postal Code", data: [4000,5000,6000,7000,8000,9000,10000,11000,10000,9000,8000,7000] },
    { name: "Address Line 1", data: [12000,14000,16000,18000,20000,22000,24000,26000,23000,21000,19000,17000] },
    { name: "City", data: [6000,7000,8000,9000,10000,11000,12000,13000,12000,11000,10000,9000] },
    { name: "State", data: [5000,6000,7000,8000,9000,10000,11000,12000,11000,10000,9000,8000] },
    { name: "Country", data: [3000,4000,5000,6000,7000,8000,9000,10000,9000,8000,7000,6000] },
    { name: "Date Of Birth", data: [10000,12000,14000,16000,18000,20000,22000,24000,21000,19000,17000,15000] },
    { name: "Registration Date", data: [2000,3000,4000,5000,6000,7000,8000,9000,8000,7000,6000,5000] },
    { name: "Transaction ID", data: [13000,15000,17000,19000,21000,23000,25000,27000,24000,22000,20000,18000] },
    { name: "Transaction Date", data: [8000,9000,10000,11000,12000,13000,14000,15000,14000,13000,12000,11000] },
    { name: "Payment Method", data: [6000,7000,8000,9000,10000,11000,12000,13000,12000,11000,10000,9000] },
    { name: "Currency Code", data: [5000,6000,7000,8000,9000,10000,11000,12000,11000,10000,9000,8000] },
    { name: "Device ID", data: [4000,5000,6000,7000,8000,9000,10000,11000,10000,9000,8000,7000] },
    { name: "IP Address", data: [7000,8000,9000,10000,11000,12000,13000,14000,13000,12000,11000,10000] },
    { name: "Browser", data: [6000,7000,8000,9000,10000,11000,12000,13000,12000,11000,10000,9000] },
    { name: "Operating System", data: [7000,8000,9000,10000,11000,12000,13000,14000,13000,12000,11000,10000] },
    { name: "Login Time", data: [9000,10000,11000,12000,13000,14000,15000,16000,15000,14000,13000,12000] },
    { name: "Logout Time", data: [7000,8000,9000,10000,11000,12000,13000,14000,13000,12000,11000,10000] },
    { name: "Session ID", data: [11000,13000,15000,17000,19000,21000,23000,25000,22000,20000,18000,16000] },
    { name: "Last Updated", data: [10000,12000,14000,16000,18000,20000,22000,24000,22000,20000,18000,16000] },
    { name: "Data Source", data: [3000,4000,5000,6000,7000,8000,9000,10000,9000,8000,7000,6000] },
  ],
},

  regionWiseDataQuality: {
    title: "Region wise data Quality",
    scoreRange: [65, 70, 75],
    regions: [
      { code: "tz", name: "Tanzania", score: 65 },
      { code: "ke", name: "Kenya", score: 75 },
      { code: "ug", name: "Uganda", score: 70 },
      { code: "cd", name: "Democratic Republic of the Congo", score: 68 },
      { code: "et", name: "Ethiopia", score: 72 },
      { code: "zw", name: "Zimbabwe", score: 66 },
      { code: "zm", name: "Zambia", score: 69 },
      { code: "mw", name: "Malawi", score: 71 },
    ],
  },
};
