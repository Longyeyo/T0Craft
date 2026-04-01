"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/cn";
import { useLanguage } from "@/components/language-provider";

const steps = [
  {
    title: { zh: "01 / 需求梳理：把目标说清楚", en: "01 / Requirement Analysis: Clarify Goals" },
    body: { zh: "你提出业务目标，我们把它拆成可执行的功能清单与上线节奏，让后面少返工。", en: "You propose business goals, we break them down into actionable feature lists and launch timelines to reduce rework later." },
    rightTitle: { zh: "你会得到什么", en: "What You'll Get" },
    rightBullets: [
      { zh: "清晰的范围与优先级", en: "Clear scope and priorities" },
      { zh: "可控的里程碑计划", en: "Controllable milestone plan" },
      { zh: "沟通成本更低的方案", en: "Solutions with lower communication costs" }
    ],
  },
  {
    title: { zh: "02 / 原型确认：先对齐再开发", en: "02 / Prototype Confirmation: Align Before Development" },
    body: { zh: "关键页面与关键流程先过一遍，你确认结果，我们再进入开发，避免“改到最后崩盘”。", en: "We review key pages and processes first, you confirm the results, then we enter development to avoid last-minute changes." },
    rightTitle: { zh: "为什么这样更省时间", en: "Why This Saves Time" },
    rightBullets: [
      { zh: "需求不漏项", en: "No missing requirements" },
      { zh: "减少反复改版", en: "Reduce repeated revisions" },
      { zh: "上线节奏更稳定", en: "More stable launch rhythm" }
    ],
  },
  {
    title: { zh: "03 / 分阶段交付：你随时能看进度", en: "03 / Phased Delivery: Track Progress Anytime" },
    body: { zh: "按里程碑上线，阶段性验收。你看到的永远是可用结果，而不是“快好了但没法测”。", en: "Launch by milestones, phased acceptance. What you see is always usable results, not 'almost ready but untestable'." },
    rightTitle: { zh: "让交付更确定", en: "Make Delivery More Certain" },
    rightBullets: [
      { zh: "阶段验收与反馈机制", en: "Phased acceptance and feedback mechanism" },
      { zh: "问题快速定位与修复", en: "Quick problem identification and fix" },
      { zh: "把风险前置解决", en: "Address risks in advance" }
    ],
  },
  {
    title: { zh: "04 / 上线与运营支持：后期有节奏", en: "04 / Launch and Operation Support: Rhythmic Post-Launch" },
    body: { zh: "上线不是终点。我们提供上线后的优化与维护建议，让你持续获客、持续增长。", en: "Launch is not the end. We provide post-launch optimization and maintenance suggestions to help you continuously acquire customers and grow." },
    rightTitle: { zh: "上线后我们继续做什么", en: "What We Do After Launch" },
    rightBullets: [
      { zh: "性能与体验优化", en: "Performance and experience optimization" },
      { zh: "内容迭代建议", en: "Content iteration suggestions" },
      { zh: "持续维护与小步快跑", en: "Continuous maintenance and iterative improvements" }
    ],
  },
];

export function StickyStory() {
  const { language } = useLanguage();
  const [active, setActive] = React.useState(0);

  // 移除滚动触发，改为鼠标悬停触发

  return (
    <section className="mx-auto w-full max-w-6xl px-6 py-20">
      <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
        <div className="lg:sticky lg:top-24">
          <h2 className="text-2xl font-semibold tracking-tight text-white light:text-black">
            {language === "zh" ? "合作流程：从需求到上线，一步不跳" : "Cooperation Process: From Requirement to Launch, No Steps Skipped"}
          </h2>
          <p className="mt-2 max-w-md text-sm leading-6 text-white/70 light:text-black/70">
            {language === "zh" ? "左侧固定讲清楚每一步的产出，右侧随滚动切换你能得到的结果。" : "The left side explains each step's output, and the right side switches to show what you'll get as you scroll."}
          </p>

          <div className="mt-8 space-y-2">
            {steps.map((s, i) => (
              <div
                key={i}
                data-step={i}
                className={cn(
                  "rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur transition cursor-pointer",
                  "light:border-black/10 light:bg-black/5",
                  active === i
                    ? "border-white/25 bg-white/7 light:border-black/25 light:bg-black/7"
                    : "opacity-70 hover:opacity-100",
                )}
                onMouseEnter={() => setActive(i)}
              >
                <div className="text-sm font-semibold text-white light:text-black">
                  {s.title[language === 'zh' ? 'zh' : 'en']}
                </div>
                <div className="mt-1 text-sm leading-6 text-white/70 light:text-black/70">
                  {s.body[language === 'zh' ? 'zh' : 'en']}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur light:border-black/10 light:bg-black/5">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 10, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          >
            <div className="text-sm font-semibold text-white light:text-black">
              {steps[active].rightTitle[language === 'zh' ? 'zh' : 'en']}
            </div>
            <div className="mt-3 space-y-2">
              {steps[active].rightBullets.map((b, index) => (
                <div
                  key={index}
                  className="rounded-2xl border border-white/10 bg-white/5 p-3 text-sm text-white/70 light:border-black/10 light:bg-black/5 light:text-black/70"
                >
                  {b[language === 'zh' ? 'zh' : 'en']}
                </div>
              ))}
            </div>
          </motion.div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white/70 light:border-black/10 light:bg-black/5 light:text-black/70">
              {language === "zh" ? "我们会按期交付：每一步都有验收标准" : "We deliver on time: each step has acceptance criteria"}
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white/70 light:border-black/10 light:bg-black/5 light:text-black/70">
              {language === "zh" ? "我们会持续优化：上线后也能稳定迭代" : "We continuously optimize: stable iteration after launch"}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

