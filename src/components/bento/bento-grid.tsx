"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/cn";
import { useLanguage } from "@/components/language-provider";

type WorkItem = {
  id: string;
  title: { zh: string; en: string };
  desc: { zh: string; en: string };
  tags: { zh: string; en: string }[];
  highlight?: { zh: string; en: string };
};

const demo: WorkItem[] = [
  {
    id: "ai-landing",
    title: { zh: "获客落地页（可持续运营）", en: "Lead Generation Landing Page (Sustainable Operation)" },
    desc: { zh: "把“想法”变成能转化的页面结构，并让内容随时可更新、可复盘。", en: "Turn \"ideas\" into conversion-focused page structures, with content that can be updated and reviewed at any time." },
    tags: [{ zh: "转化设计", en: "Conversion Design" }, { zh: "内容管理", en: "Content Management" }, { zh: "SEO / OG", en: "SEO / OG" }],
    highlight: { zh: "从访问到咨询的路径更短、更清晰", en: "Shorter, clearer path from visit to consultation" },
  },
  {
    id: "saas-site",
    title: { zh: "品牌官网（更像产品而不是网页）", en: "Brand Official Website (More Like a Product Than a Webpage)" },
    desc: { zh: "用视觉与信息层级统一叙事，让客户看完就知道你能解决什么。", en: "Unify storytelling with visual and information hierarchy, so customers know what you can solve after viewing." },
    tags: [{ zh: "品牌形象", en: "Brand Image" }, { zh: "交互体验", en: "Interactive Experience" }, { zh: "快速上线", en: "Quick Launch" }],
  },
  {
    id: "web3",
    title: { zh: "企业展示站（可信背书）", en: "Enterprise Showcase Site (Credible Endorsement)" },
    desc: { zh: "把案例、数据与合规信息组合成客户愿意相信的证据链。", en: "Combine cases, data and compliance information into a chain of evidence that customers are willing to believe." },
    tags: [{ zh: "可信内容", en: "Credible Content" }, { zh: "案例展示", en: "Case Showcase" }, { zh: "分享预览", en: "Share Preview" }],
  },
  {
    id: "lowcode",
    title: { zh: "解决方案页（把需求变订单）", en: "Solution Page (Turn Requirements into Orders)" },
    desc: { zh: "把复杂服务拆成可理解步骤，减少沟通成本，加快签约节奏。", en: "Break down complex services into understandable steps, reduce communication costs, and accelerate signing process." },
    tags: [{ zh: "方案叙事", en: "Solution Narrative" }, { zh: "流程清晰", en: "Clear Process" }, { zh: "提单效率", en: "Order Efficiency" }],
  },
];

function SpotlightCard({
  item,
  onOpen,
  language,
}: {
  item: WorkItem;
  onOpen: (id: string) => void;
  language: string;
}) {
  const ref = React.useRef<HTMLButtonElement | null>(null);
  const glowRef = React.useRef<HTMLDivElement | null>(null);

  return (
    <motion.button
      ref={ref}
      layoutId={`card-${item.id}`}
      onClick={() => onOpen(item.id)}
      onMouseMove={(e) => {
        const r = ref.current?.getBoundingClientRect();
        if (!r) return;

        const x = e.clientX - r.left;
        const y = e.clientY - r.top;

        // spotlight glow follows the cursor
        if (glowRef.current) {
          glowRef.current.style.background = `radial-gradient(280px circle at ${x}px ${y}px, rgba(255,255,255,.16), transparent 60%)`;
        }

        // 3D tilt
        const nx = (x / r.width - 0.5) * 2; // -1..1
        const ny = (y / r.height - 0.5) * 2; // -1..1
        if (ref.current) {
          ref.current.style.transform = `perspective(900px) rotateX(${( -ny * 6 ).toFixed(
            2,
          )}deg) rotateY(${( nx * 8 ).toFixed(2)}deg) translateY(-1px)`;
        }
      }}
      onMouseEnter={() => {
        if (ref.current) {
          ref.current.style.willChange = "transform";
        }
      }}
      onMouseLeave={() => {
        if (ref.current) {
          ref.current.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0)";
        }
      }}
      className={cn(
        "group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 text-left backdrop-blur transition",
        "hover:border-white/20 hover:bg-white/7",
        "light:border-black/10 light:bg-black/5 light:hover:border-black/20 light:hover:bg-black/7",
      )}
    >
      <div
        ref={glowRef}
        className="pointer-events-none absolute -inset-px opacity-0 transition group-hover:opacity-100"
        aria-hidden="true"
      />

      <div className="relative">
        <div className="text-lg font-semibold text-white light:text-black">
          {item.title[language as keyof typeof item.title]}
        </div>
        <div className="mt-2 text-sm leading-6 text-white/70 light:text-black/70">
          {item.desc[language as keyof typeof item.desc]}
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {item.tags.map((t, index) => (
            <span
              key={index}
              className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-white/70 light:border-black/10 light:bg-black/5 light:text-black/70"
            >
              {t[language as keyof typeof t]}
            </span>
          ))}
        </div>
      </div>
    </motion.button>
  );
}

export function BentoGrid() {
  const { language } = useLanguage();
  const [open, setOpen] = React.useState<string | null>(null);
  const item = demo.find((d) => d.id === open) ?? null;

  return (
    <section id="work" className="mx-auto w-full max-w-6xl px-6 py-20">
      <div className="flex items-end justify-between gap-6">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-white light:text-black">
            {language === "zh" ? "成功案例：客户交付后，发生了什么" : "Success Cases: What Happened After Client Delivery"}
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-white/70 light:text-black/70">
            {language === "zh" ? "不是堆功能，而是围绕\"转化、体验、交付确定性\"做设计与工程协同。" : "It's not about stacking features, but about designing and engineering collaboration around \"conversion, experience, and delivery certainty\"."}
          </p>
        </div>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-6">
        <div className="lg:col-span-3">
          <SpotlightCard item={demo[0]} onOpen={setOpen} language={language} />
        </div>
        <div className="lg:col-span-3">
          <SpotlightCard item={demo[1]} onOpen={setOpen} language={language} />
        </div>
        <div className="lg:col-span-2">
          <SpotlightCard item={demo[2]} onOpen={setOpen} language={language} />
        </div>
        <div className="lg:col-span-4">
          <SpotlightCard item={demo[3]} onOpen={setOpen} language={language} />
        </div>
      </div>

      <AnimatePresence>
        {item ? (
          <motion.div
            className="fixed inset-0 z-50 grid place-items-center bg-black/60 p-6 backdrop-blur"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(null)}
          >
            <motion.div
              layoutId={`card-${item.id}`}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-2xl overflow-hidden rounded-3xl border border-white/10 bg-[#0b0b0c] p-7 text-white shadow-[0_40px_140px_rgba(0,0,0,.65)] light:border-black/10 light:bg-white light:text-black"
            >
              <div className="flex items-start justify-between gap-6">
                <div>
                  <div className="text-xl font-semibold">{item.title[language as keyof typeof item.title]}</div>
                  <div className="mt-2 text-sm leading-6 text-white/70 light:text-black/70">
                    {item.desc[language as keyof typeof item.desc]}
                  </div>
                </div>
                <button
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/80 hover:bg-white/10 light:border-black/10 light:bg-black/5 light:text-black/80 light:hover:bg-black/10"
                  onClick={() => setOpen(null)}
                >
                  {language === "zh" ? "关闭" : "Close"}
                </button>
              </div>

              {item.highlight ? (
                <div className="mt-6 rounded-2xl border border-sky-400/20 bg-sky-400/5 p-4 text-sm text-sky-200 light:border-sky-600/20 light:bg-sky-600/5 light:text-sky-800">
                  {item.highlight[language as keyof typeof item.highlight]}
                </div>
              ) : null}

              <div className="mt-6 flex flex-wrap gap-2">
                {item.tags.map((t, index) => (
                  <span
                    key={index}
                    className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-white/70 light:border-black/10 light:bg-black/5 light:text-black/70"
                  >
                    {t[language as keyof typeof t]}
                  </span>
                ))}
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white/70 light:border-black/10 light:bg-black/5 light:text-black/70">
                  {language === "zh" ? "客户痛点：内容更新慢、页面信息不清晰、咨询入口不稳定。" : "Client pain points: slow content updates, unclear page information, unstable consultation entry."}
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white/70 light:border-black/10 light:bg-black/5 light:text-black/70">
                  {language === "zh" ? "我们的结果：结构可复用、页面更清楚、提交更顺畅。" : "Our results: reusable structure, clearer pages, smoother submission."}
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}

