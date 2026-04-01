"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/cn";

export function GlowText({
  text,
  className,
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  const chars = React.useMemo(() => Array.from(text), [text]);

  return (
    <motion.span
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.015, delayChildren: delay } },
      }}
      className={cn("inline-block", className)}
    >
      {chars.map((ch, i) => (
        <motion.span
          key={`${ch}-${i}`}
          className="inline-block"
          variants={{
            hidden: { opacity: 0, y: 10, filter: "blur(6px)" },
            show: {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              textShadow: "0 0 18px rgba(255,255,255,.22)",
              transition: { type: "spring", damping: 18, stiffness: 240 },
            },
          }}
        >
          {ch === " " ? "\u00A0" : ch}
        </motion.span>
      ))}
    </motion.span>
  );
}

