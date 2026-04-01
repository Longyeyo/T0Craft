"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTheme } from "next-themes";
import { cn } from "@/lib/cn";

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();
  const isLight = theme === "light";

  return (
    <button
      type="button"
      onClick={() => setTheme(isLight ? "dark" : "light")}
      className={cn(
        "group relative inline-flex h-10 items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 text-sm text-white/80 backdrop-blur transition hover:bg-white/10",
        "light:border-black/10 light:bg-black/5 light:text-black/80 light:hover:bg-black/10",
        className,
      )}
      aria-label={isLight ? "切换到深色模式" : "切换到浅色模式"}
    >
      <div className="relative h-5 w-5">
        <AnimatePresence initial={false} mode="wait">
          {isLight ? (
            <motion.div
              key="sun"
              initial={{ scale: 0.8, opacity: 0, rotate: -90 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              exit={{ scale: 0.8, opacity: 0, rotate: 90 }}
              transition={{ duration: 0.22 }}
              className="absolute inset-0"
            >
              <div className="absolute inset-0 rounded-full bg-black/70 light:bg-black/70" />
              <div className="absolute inset-[4px] rounded-full bg-white/90" />
            </motion.div>
          ) : (
            <motion.div
              key="bulb"
              initial={{ scale: 0.8, opacity: 0, rotate: 90 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              exit={{ scale: 0.8, opacity: 0, rotate: -90 }}
              transition={{ duration: 0.22 }}
              className="absolute inset-0"
            >
              <div className="absolute left-1/2 top-[2px] h-3.5 w-3.5 -translate-x-1/2 rounded-full bg-white/90 shadow-[0_0_20px_rgba(255,255,255,.35)]" />
              <div className="absolute left-1/2 top-[15px] h-2.5 w-2.5 -translate-x-1/2 rounded-[6px] bg-white/50" />
              <motion.div
                className="absolute left-1/2 top-[1px] h-4 w-4 -translate-x-1/2 rounded-full bg-white/10"
                animate={{ opacity: [0.1, 0.35, 0.12] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <span className="relative">
        <span className="font-medium">{isLight ? "Light" : "Dark"}</span>
        <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-current/50 transition group-hover:scale-x-100" />
      </span>
    </button>
  );
}

