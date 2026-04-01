"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/components/language-provider";

const items = [
  { zh: "24小时给方案与报价", en: "24-hour proposal and quote" },
  { zh: "按里程碑验收", en: "Milestone-based acceptance" },
  { zh: "稳定体验优先", en: "Stable experience first" },
  { zh: "可持续迭代", en: "Sustainable iteration" },
  { zh: "转化路径优化", en: "Conversion path optimization" },
  { zh: "内容随时可更新", en: "Content updatable anytime" },
  { zh: "上线提速更确定", en: "Faster and more certain launch" },
  { zh: "售后保障与跟进", en: "After-sales support and follow-up" },
  { zh: "数据看得见", en: "Visible data" },
  { zh: "沟通成本更低", en: "Lower communication costs" },
];

export function TechMarquee() {
  const { language } = useLanguage();
  // 复制一份，保证无缝循环
  const row = [...items, ...items];

  return (
    <div className="relative mt-4 overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(52,211,153,.0),rgba(52,211,153,.10),rgba(52,211,153,.0))] opacity-60" />
      <motion.div
        className="flex items-center gap-3 whitespace-nowrap px-4 py-3"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
      >
        {row.map((item, idx) => (
          <span
            // eslint-disable-next-line react/no-array-index-key
            key={`${item.zh}-${idx}`}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/20 px-3 py-1 text-xs text-white/80"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400/90 shadow-[0_0_14px_rgba(52,211,153,.55)]" />
            {language === "zh" ? item.zh : item.en}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

