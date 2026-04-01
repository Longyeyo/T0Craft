"use client";

import { motion } from "framer-motion";
import { Smartphone, Monitor, Server, Globe } from "lucide-react";
import { useLanguage } from "@/components/language-provider";

const items = [
  {
    title: { zh: "APP开发", en: "APP Development" },
    desc: { zh: "原生与跨平台方案，满足不同场景与预算，交付可上线的成品。", en: "Native and cross-platform solutions to meet different scenarios and budgets, delivering launch-ready products." },
    icon: Smartphone,
    color: "bg-sky-400"
  },
  {
    title: { zh: "小程序开发", en: "Mini Program Development" },
    desc: { zh: "覆盖微信、支付宝、抖音等平台，快速触达用户。", en: "Covering WeChat, Alipay, Douyin and other platforms to quickly reach users." },
    icon: Monitor,
    color: "bg-emerald-400"
  },
  {
    title: { zh: "系统开发", en: "System Development" },
    desc: { zh: "企业内部系统、管理后台、数据看板等，提升运营效率。", en: "Enterprise internal systems, management backends, data dashboards, etc., to improve operational efficiency." },
    icon: Server,
    color: "bg-purple-400"
  },
  {
    title: { zh: "官网开发", en: "Official Website Development" },
    desc: { zh: "品牌官网、营销型网站、电商网站等，打造专业形象。", en: "Brand official websites, marketing websites, e-commerce websites, etc., to create a professional image." },
    icon: Globe,
    color: "bg-amber-400"
  },
] as const;

export function ServicesRangeSection() {
  const { language } = useLanguage();
  
  return (
    <section id="services" className="mx-auto w-full max-w-7xl px-6 py-20 bg-gradient-to-b from-[#0a0a0c] to-[#070708] light:from-zinc-100 light:to-zinc-50">
      <div className="text-center mb-16">
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white light:text-black mb-4">
          {language === "zh" ? "服务范围" : "Service Range"}
        </h2>
        <p className="mx-auto max-w-2xl text-base leading-6 text-white/70 light:text-black/70">
          {language === "zh" ? "从前端到后端，从设计到交付，我们提供一站式解决方案。" : "From front-end to back-end, from design to delivery, we provide one-stop solutions."}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
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
            <h3 className="text-xl font-semibold text-white light:text-black mb-3">{it.title[language as keyof typeof it.title]}</h3>
            <p className="text-sm leading-6 text-white/70 light:text-black/70">{it.desc[language as keyof typeof it.desc]}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

