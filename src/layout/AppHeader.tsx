"use client";

import { ThemeToggleButton } from "@/components/common/ThemeToggleButton";
import Link from "next/link";
import { useState } from "react";
import Logo from "@/components/ecommerce/Logo";

export default function AppHeader() {
  const [isMenuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-[99999] flex w-full flex-col border-b border-gray-300 bg-white dark:border-gray-800 dark:bg-gray-900">
      <div className="flex w-full items-center justify-between gap-4 px-4 py-3 md:px-6">

        {/* Logo */}
        <Link href="/" className="flex shrink-0 items-center">
          <div className="w-28 sm:w-32 md:w-40">
            <Logo />
          </div>
        </Link>

        {/* Center title (Desktop only) */}
        <div className="absolute left-1/2 hidden -translate-x-1/2 flex-col items-center text-center lg:flex">
          <h1 className="font-semibold tracking-tight text-gray-900 dark:text-white text-base md:text-lg lg:text-xl">
            I&M Bank Data Center
          </h1>
          <p className="text-sm font-medium tracking-wide text-gray-600 dark:text-gray-400">
            Data Quality Dashboard - I&M Bank
          </p>
        </div>

        {/* Right controls */}
        <div className="flex shrink-0 items-center gap-2">

          {/* Theme toggle (desktop only) */}
          <div className="hidden lg:block">
            <ThemeToggleButton />
          </div>

          {/* Hamburger (mobile) */}
          <button
            type="button"
            onClick={() => setMenuOpen(!isMenuOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 lg:hidden"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M6.22 6.22a.75.75 0 011.06 0L12 10.94l4.72-4.72a.75.75 0 111.06 1.06L13.06 12l4.72 4.72a.75.75 0 11-1.06 1.06L12 13.06l-4.72 4.72a.75.75 0 01-1.06-1.06L10.94 12 6.22 7.28a.75.75 0 010-1.06z"
                  fill="currentColor"
                />
              </svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M3 6h18v2H3V6zm0 5h18v2H3v-2zm0 5h18v2H3v-2z"
                  fill="currentColor"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="border-t border-gray-200 bg-white px-4 py-4 dark:border-gray-800 dark:bg-gray-900 lg:hidden">
          <nav className="flex flex-col gap-4">

            {/* Title */}
            <div className="border-b border-gray-200 pb-3 dark:border-gray-800">
              <h2 className="text-base font-semibold text-gray-900 dark:text-white">
                I&M Bank Data Center
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Data Quality Dashboard - I&M Bank
              </p>
            </div>

            {/* Theme Toggle */}
            <div className="flex items-center justify-between rounded-lg bg-gray-100 px-3 py-2 dark:bg-gray-800">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Theme
              </span>
              <ThemeToggleButton />
            </div>

            {/* Navigation */}
            <Link
              href="/"
              onClick={() => setMenuOpen(false)}
              className="rounded-lg px-3 py-2 text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
            >
              Home
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
