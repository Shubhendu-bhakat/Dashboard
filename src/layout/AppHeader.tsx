"use client";

import { ThemeToggleButton } from "@/components/common/ThemeToggleButton";
import Link from "next/link";
import Image from "next/image";
import React, { useState } from "react";

export default function AppHeader() {
  const [isMenuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-[99999] flex w-full flex-col border-b border-gray-300 bg-white dark:border-gray-800 dark:bg-gray-900">
      <div className="flex w-full items-center justify-between gap-4 px-4 py-3 md:px-6">
        <Link href="/" className="flex shrink-0 items-center gap-2">
          <Image
            width={154}
            height={32}
            className="dark:hidden"
            src="/images/logo/download.png"
            alt="Logo"
          />
          <Image
            width={154}
            height={32}
            className="hidden dark:block"
            src="/images/logo/download.png"
            alt="Logo"
          />
        </Link>

        <div className="absolute left-1/2 flex -translate-x-1/2 flex-col items-center text-center">
          <h1 className="font-semibold tracking-tight text-gray-900 dark:text-white text-theme-sm sm:text-base md:text-lg lg:text-xl">
            I&M Bank Data Center
          </h1>
          <p className="text-theme-xs font-medium tracking-wide text-gray-600 dark:text-gray-400 sm:text-theme-sm">
            Data Quality Dashboard - I&M Bank
          </p>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <ThemeToggleButton />
          <button
            type="button"
            onClick={() => setMenuOpen(!isMenuOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 lg:hidden"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                <path fillRule="evenodd" clipRule="evenodd" d="M6.22 6.22a.75.75 0 011.06 0L12 10.94l4.72-4.72a.75.75 0 111.06 1.06L13.06 12l4.72 4.72a.75.75 0 11-1.06 1.06L12 13.06l-4.72 4.72a.75.75 0 01-1.06-1.06L10.94 12 6.22 7.28a.75.75 0 010-1.06z" fill="currentColor" />
              </svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                <path fillRule="evenodd" clipRule="evenodd" d="M3 6h18v2H3V6zm0 5h18v2H3v-2zm0 5h18v2H3v-2z" fill="currentColor" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="border-t border-gray-200 bg-white px-4 py-3 dark:border-gray-800 dark:bg-gray-900 lg:hidden">
          <nav className="flex flex-col gap-2">
            <Link
              href="/"
              onClick={() => setMenuOpen(false)}
              className="rounded-lg px-3 py-2 text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
            >
              Dashboard
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
