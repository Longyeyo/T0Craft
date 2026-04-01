"use client";

import * as React from "react";
import { motion } from "framer-motion";

import { GlowText } from "./glow-text";
import { cn } from "@/lib/cn";
import { CursorSpotlight } from "./cursor-spotlight";
import { TechMarquee } from "./tech-marquee";
import { useLanguage } from "@/components/language-provider";

export function Hero() {
  const { language } = useLanguage();

  return (
    <section id="home" className="relative min-h-[90vh] overflow-hidden flex items-center">
      {/* 背景特效 - 已移除顶部白色光束，保留氛围微光与纹理 */}
      <CursorSpotlight />
      
      {/* 基础背景网格线纹理 */}
      <div className="pointer-events-none absolute inset-0 opacity-30 [background:repeating-linear-gradient(to_bottom,rgba(255,255,255,.06),rgba(255,255,255,.06)_1px,transparent_1px,transparent_3px)] mix-blend-overlay" />
      
      {/* 多色氛围微光 (极简深色氛围) */}
      <div className="pointer-events-none absolute inset-0 opacity-20 mix-blend-soft-light [background:radial-gradient(circle_at_20%_30%,rgba(59,130,246,.22),transparent_45%),radial-gradient(circle_at_70%_10%,rgba(59,130,246,.18),transparent_42%),radial-gradient(circle_at_60%_80%,rgba(168,85,247,.18),transparent_48%)]" />

      {/* 内容区域 */}
      <div className="relative mx-auto w-full max-w-7xl px-6 pb-12 pt-20 sm:pt-24">
        {/* 顶部导航 */}
        <div className="flex items-center justify-between mb-12">
          <div className="text-sm font-medium tracking-wide text-white/70 light:text-black/70">
            T0Craft Studio
          </div>
        </div>

        {/* 主内容 */}
        <div className="grid gap-8 lg:grid-cols-2 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            {/* 状态标签 */}
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-white/70 backdrop-blur light:border-black/10 light:bg-black/5 light:text-black/70 mb-6">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-sky-400 shadow-[0_0_18px_rgba(59,130,246,.75)]" />
              {language === "zh" ? "需求确认中 · 24 小时内给你报价与方案" : "Requirement Confirmation · Quote and plan within 24 hours"}
            </div>

            {/* 主标题 */}
            <h1 className="text-balance text-4xl sm:text-5xl md:text-6xl font-bold leading-tight tracking-tight text-white light:text-black mb-6">
              <GlowText text={language === "zh" ? "APP/小程序/系统/官网" : "APP/Miniprogram/System/Website"} />
              <br />
              <span className="text-sky-400">{language === "zh" ? "一站式交付" : "One-stop Delivery"}</span>
            </h1>

            {/* 描述 */}
            <p className="mt-4 max-w-xl text-pretty text-base leading-7 text-white/70 sm:text-lg light:text-black/70 mb-8">
              {language === "zh" 
                ? "把你的业务目标翻译成可上线的产品：更快启动、更稳交付、更省返工，后期可持续迭代。"
                : "Translate your business goals into launchable products: faster startup, more stable delivery, less rework, and sustainable iteration."
              }
            </p>

            {/* 按钮 */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <a
                href="#contact"
                className={cn(
                  "inline-flex h-12 items-center justify-center rounded-full bg-white px-6 text-sm font-semibold text-black",
                  "transition-all hover:bg-white/90 hover:scale-105",
                  "light:bg-black light:text-white light:hover:bg-black/90",
                  "shadow-lg shadow-sky-500/20"
                )}
              >
                {language === "zh" ? "免费获取方案" : "Free Plan"}
              </a>
              <a
                href="#work"
                className={cn(
                  "inline-flex h-12 items-center justify-center rounded-full border border-white/15 bg-white/0 px-6 text-sm font-semibold text-white/80 backdrop-blur",
                  "transition-all hover:bg-white/5 hover:scale-105",
                  "light:border-black/15 light:text-black/80 light:hover:bg-black/5"
                )}
              >
                {language === "zh" ? "看客户案例" : "View Cases"}
              </a>
            </div>

            {/* 标签 */}
            <div className="flex flex-wrap gap-3 mb-8">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70 backdrop-blur light:border-black/10 light:bg-black/5 light:text-black/70">
                <span className="h-1.5 w-1.5 rounded-full bg-sky-400" aria-hidden="true" />
                {language === "zh" ? "快速定位需求" : "Quick Requirement Analysis"}
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70 backdrop-blur light:border-black/10 light:bg-black/5 light:text-black/70">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" aria-hidden="true" />
                {language === "zh" ? "按里程碑交付" : "Milestone Delivery"}
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70 backdrop-blur light:border-black/10 light:bg-black/5 light:text-black/70">
                <span className="h-1.5 w-1.5 rounded-full bg-purple-400" aria-hidden="true" />
                {language === "zh" ? "合同保障与售后" : "Contract & After-sales"}
              </span>
            </div>
          </motion.div>

          {/* 右侧卡片 */}
          <motion.div
            initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          >
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur light:border-black/10 light:bg-black/5 shadow-xl shadow-sky-500/10">
              <div className="text-sm font-semibold text-white light:text-black mb-4">
                {language === "zh" ? "你关心的结果" : "Results You Care About"}
              </div>
              <ul className="space-y-4 text-sm leading-6 text-white/70 light:text-black/70">
                <li className="flex items-start gap-3">
                  <span className="h-5 w-5 rounded-full bg-sky-400/20 flex items-center justify-center mt-0.5">
                    <span className="h-2 w-2 rounded-full bg-sky-400"></span>
                  </span>
                  <span>{language === "zh" ? "更快启动：需求梳理清楚，第一版更快上线" : "Faster Launch: Clear requirements, faster first version launch"}</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="h-5 w-5 rounded-full bg-emerald-400/20 flex items-center justify-center mt-0.5">
                    <span className="h-2 w-2 rounded-full bg-emerald-400"></span>
                  </span>
                  <span>{language === "zh" ? "更稳交付：按里程碑验收，减少返工与不确定性" : "Stable Delivery: Milestone-based acceptance, less rework and uncertainty"}</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="h-5 w-5 rounded-full bg-purple-400/20 flex items-center justify-center mt-0.5">
                    <span className="h-2 w-2 rounded-full bg-purple-400"></span>
                  </span>
                  <span>{language === "zh" ? "可持续运营：上线后有节奏地优化与迭代" : "Sustainable Operation: Rhythmic optimization and iteration after launch"}</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="h-5 w-5 rounded-full bg-amber-400/20 flex items-center justify-center mt-0.5">
                    <span className="h-2 w-2 rounded-full bg-amber-400"></span>
                  </span>
                  <span>{language === "zh" ? "更高转化：页面结构与内容更利于获客" : "Higher Conversion: Page structure and content more conducive to customer acquisition"}</span>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>

        {/* 技术标签滚动 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          className="mt-12"
        >
          <TechMarquee />
        </motion.div>
      </div>
    </section>
  );
}