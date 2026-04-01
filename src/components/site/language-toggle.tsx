"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

interface LanguageToggleProps {
  className?: string;
  currentLanguage: "zh" | "en";
  onLanguageChange: (language: "zh" | "en") => void;
}

export function LanguageToggle({
  className,
  currentLanguage,
  onLanguageChange,
}: LanguageToggleProps) {
  return (
    <button
      type="button"
      onClick={() => onLanguageChange(currentLanguage === "zh" ? "en" : "zh")}
      className={cn(
        "group relative inline-flex h-10 items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 text-sm text-white/80 backdrop-blur transition hover:bg-white/10",
        "light:border-black/10 light:bg-black/5 light:text-black/80 light:hover:bg-black/10",
        className,
      )}
      aria-label={currentLanguage === "zh" ? "切换到英文" : "Switch to Chinese"}
    >
      <span className="relative">
        <span className="font-medium">{currentLanguage === "zh" ? "EN" : "中文"}</span>
        <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-current/50 transition group-hover:scale-x-100" />
      </span>
    </button>
  );
}