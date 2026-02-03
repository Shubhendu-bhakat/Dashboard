"use client";

import { createContext, useContext, useEffect, useState } from "react";

type DashboardFilterContextType = {
  year: number;
  month: string;
  setYear: (y: number) => void;
  setMonth: (m: string) => void;
};

const DashboardFilterContext = createContext<DashboardFilterContextType | null>(null);

export function DashboardFilterProvider({ children }: { children: React.ReactNode }) {
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().toLocaleString("en", { month: "short" }));  
  

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

