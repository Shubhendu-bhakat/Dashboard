"use client";

import { createContext, useContext, useState } from "react";

type DashboardFilterContextType = {
  year: number;
  month: string;
  setYear: (y: number) => void;
  setMonth: (m: string) => void;
};

const DashboardFilterContext = createContext<DashboardFilterContextType | null>(null);

export function DashboardFilterProvider({ children }: { children: React.ReactNode }) {
  const [year, setYear] = useState(2024);
  const [month, setMonth] = useState("All");  

  return (
    <DashboardFilterContext.Provider value={{ year, month, setYear, setMonth }}>
      {children}
    </DashboardFilterContext.Provider>
  );
}

export const useDashboardFilter = () => {
  const ctx = useContext(DashboardFilterContext);
  if (!ctx) throw new Error("useDashboardFilter must be used inside provider");
  return ctx;
};
