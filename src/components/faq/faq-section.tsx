"use client";

import * as React from "react";
import { useLanguage } from "@/components/language-provider";

const faqs = [
  {
    q: { zh: "你们多久能给我方案和报价？", en: "How soon can you provide a plan and quote?" },
    a: { zh: "收到需求后，我们会在 24 小时内给出方案草案与报价范围，并安排一次快速对齐会议确认关键点。", en: "After receiving your requirements, we will provide a draft plan and quote range within 24 hours, and arrange a quick alignment meeting to confirm key points." },
  },
  {
    q: { zh: "我担心返工，怎么保证交付确定性？", en: "I'm worried about rework, how to ensure delivery certainty?" },
    a: { zh: "我们会先做原型对齐，再按里程碑验收。你看到的是可用结果，而不是“差不多”。", en: "We will first align on the prototype, then accept according to milestones. What you see is a usable result, not 'almost'." },
  },
  {
    q: { zh: "上线后还会有人跟进吗？", en: "Will there be follow-up after launch?" },
    a: { zh: "会。上线后提供优化与维护支持，包括体验修复、内容迭代建议与持续可用性保障。", en: "Yes. We provide optimization and maintenance support after launch, including experience fixes, content iteration suggestions, and continuous availability guarantees." },
  },
  {
    q: { zh: "我没有明确需求怎么办？", en: "What if I don't have clear requirements?" },
    a: { zh: "没关系。我们会用“需求拆解问题清单”带你把目标说清楚，然后反推功能与交付节奏。", en: "It's okay. We will use a 'requirement breakdown checklist' to help you clarify your goals, then reverse-engineer features and delivery timeline." },
  },
] as const;

export function FAQSection() {
  const { language } = useLanguage();
  
  return (
    <section id="faq" className="mx-auto w-full max-w-6xl px-6 py-20">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight text-white light:text-black">
          {language === "zh" ? "常见问题（你最怕踩的坑，我们先帮你避开）" : "FAQ (We'll help you avoid the pitfalls you fear most)"}
        </h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-white/70 light:text-black/70">
          {language === "zh" ? "从沟通、交付到上线运维，我们把不确定性压到最低。" : "From communication, delivery to online operation, we minimize uncertainty."}
        </p>
      </div>

      <div className="mt-10 space-y-3">
        {faqs.map((it, index) => (
          <details
            key={index}
            className="group rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur transition"
          >
            <summary className="cursor-pointer list-none text-base font-semibold text-white light:text-black">
              <span className="mr-2 inline-flex h-7 w-7 items-center justify-center rounded-full bg-white/5 text-xs text-white/80 light:bg-black/5 light:text-black/70">
                ?
              </span>
              {it.q[language as keyof typeof it.q]}
            </summary>
            <div className="mt-3 text-sm leading-6 text-white/70 light:text-black/70">{it.a[language as keyof typeof it.a]}</div>
          </details>
        ))}
      </div>
    </section>
  );
}

