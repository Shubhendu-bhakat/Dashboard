"use client";

import AppFooter from "@/layout/AppFooter";
import AppHeader from "@/layout/AppHeader";
import React from "react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <AppHeader />
      <main className="flex-1 bg-gray-100 p-4 dark:bg-gray-900 md:p-6">
        <div className="mx-auto max-w-(--breakpoint-2xl)">{children}</div>
      </main>
      <AppFooter />
    </div>
  );
}
