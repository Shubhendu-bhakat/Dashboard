"use client";

export default function AppFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-gray-300 bg-white px-4 py-4 dark:border-gray-800 dark:bg-gray-900 md:px-6">
      <div className="mx-auto max-w-(--breakpoint-2xl) text-center text-sm text-gray-700 dark:text-gray-400">
        <p>© {year} All rights reserved. Wizcon Digital Service, Kolkata.</p>
      </div>
    </footer>
  );
}
