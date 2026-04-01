"use client";

import { motion } from "framer-motion";
import { Sparkles, Rocket, ShieldCheck } from "lucide-react";
import { useLanguage } from "@/components/language-provider";

const items = [
  {
    icon: Sparkles,
    title: { zh: "转化不稳定", en: "Unstable Conversion" },
    desc: { 
      zh: "把页面结构和内容组织成“咨询路径”，让客户看得懂、愿意问、问得顺。",
      en: "Organize page structure and content into a 'consultation path' that customers can understand, are willing to ask about, and can follow smoothly."
    },
    color: "bg-sky-400"
  },
  {
    icon: Rocket,
    title: { zh: "上线周期被拖延", en: "Delayed Launch Cycle" },
    desc: { 
      zh: "需求梳理 + 原型确认 + 里程碑交付，让每一步都有验收结果，减少反复。",
      en: "Requirement analysis + prototype confirmation + milestone delivery, ensuring each step has acceptance results and reducing iterations."
    },
    color: "bg-emerald-400"
  },
  {
    icon: ShieldCheck,
    title: { zh: "上线后没人管", en: "No Post-Launch Support" },
    desc: { 
      zh: "提供上线后的优化与维护支持，让体验与数据持续变好，而不是一次性交付。",
      en: "Provide post-launch optimization and maintenance support to continuously improve experience and data, rather than one-time delivery."
    },
    color: "bg-purple-400"
  },
] as const;

export function SolutionsSection() {
  const { language } = useLanguage();

  return (
    <section id="solutions" className="mx-auto w-full max-w-7xl px-6 py-20 bg-gradient-to-b from-[#070708] to-[#0a0a0c] light:from-zinc-50 light:to-zinc-100">
      <div className="text-center mb-16">
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white light:text-black mb-4">
          {language === "zh" ? "你最关心的 3 个结果" : "3 Results You Care About Most"}
        </h2>
        <p className="mx-auto max-w-2xl text-base leading-6 text-white/70 light:text-black/70">
          {language === "zh" 
            ? "我们围绕客户的真实目标设计方案：更快启动、更稳交付、后期可持续迭代。"
            : "We design solutions around clients' real goals: faster startup, more stable delivery, and sustainable iteration."
          }
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {items.map((it, index) => (
          <motion.div
            key={it.title.zh}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.1 }}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur light:border-black/10 light:bg-black/5 shadow-xl transition-all hover:shadow-sky-500/10"
          >
            <div className={`flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 ${it.color}/20 mb-4`}>
              <it.icon className={`h-6 w-6 ${it.color}`} />
            </div>
            <h3 className="text-xl font-semibold text-white light:text-black mb-3">{language === "zh" ? it.title.zh : it.title.en}</h3>
            <p className="text-sm leading-6 text-white/70 light:text-black/70">{language === "zh" ? it.desc.zh : it.desc.en}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

