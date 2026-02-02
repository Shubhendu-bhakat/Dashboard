"use client";

import Image from "next/image";
import { useTheme } from "@/context/ThemeContext";
import { useMemo } from "react";

export default function Logo() {
  const { theme } = useTheme();

  const logoSrc = useMemo(
    () => (theme === "dark" ? "/images/logo-dark.png" : "/images/logo-light.png"),
    [theme]
  );

  return (
    <div className="relative w-40 h-12 contain-paint">
      <Image
        src={logoSrc}
        alt="I&M Bank logo"
        fill
        sizes="160px"
        priority
        className="object-contain"
      />
    </div>
  );
}
