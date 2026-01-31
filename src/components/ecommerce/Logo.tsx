"use client";

import Image from "next/image";
import { useTheme } from "@/context/ThemeContext";

export default function Logo() {
  const { theme } = useTheme();

  return (
    <div className="relative w-40 h-12">
      {theme === "dark" ? (
        <Image
          src="/images/logo-dark.png"
          alt="I&M Bank dark logo"
          fill
          className="object-contain"
          priority
        />
      ) : (
        <Image
          src="/images/logo-light.png"
          alt="I&M Bank light logo"
          fill
          className="object-contain"
          priority
        />
      )}
    </div>
  );
}
