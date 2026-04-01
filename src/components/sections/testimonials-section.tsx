"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { useLanguage } from "@/components/language-provider";

const quotes = [
  {
    title: { zh: "营销负责人", en: "Marketing Director" },
    desc: { 
      zh: "第一次合作就很放心。需求梳理清楚了，页面上线比预计快一截，后期内容也能持续更新。",
      en: "I felt at ease from the first cooperation. Requirements were clearly sorted out, the page went online faster than expected, and content could be continuously updated later."
    },
  },
  {
    title: { zh: "产品经理", en: "Product Manager" },
    desc: { 
      zh: "沟通成本明显下降。我们每周都有可验收的交付结果，返工次数少了很多。",
      en: "Communication costs have significantly decreased. We have deliverable results for acceptance every week, and there are much fewer reworks."
    },
  },
  {
    title: { zh: "运营主管", en: "Operations Supervisor" },
    desc: { 
      zh: "上线后不是“丢给我们自己”，而是持续优化体验与转化路径。咨询入口也更稳定了。",
      en: "After launch, it's not just 'thrown to us', but continuous optimization of experience and conversion paths. The consultation entry is also more stable."
    },
  },
  {
    title: { zh: "老板", en: "CEO" },
    desc: { 
      zh: "合同保障和里程碑验收让我安心。投入可控，效果能看见，团队协作也省心。",
      en: "Contract guarantees and milestone acceptance make me feel at ease. Investment is controllable, results are visible, and team collaboration is worry-free."
    },
  },
] as const;

export function TestimonialsSection() {
  const { language } = useLanguage();
  
  return (
    <section id="testimonials" className="mx-auto w-full max-w-7xl px-6 py-20 bg-gradient-to-b from-[#0a0a0c] to-[#070708] light:from-zinc-100 light:to-zinc-50">
      <div className="text-center mb-16">
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white light:text-black mb-4">
          {language === "zh" ? "客户评价" : "Client Testimonials"}
        </h2>
        <p className="mx-auto max-w-2xl text-base leading-6 text-white/70 light:text-black/70">
          {language === "zh" 
            ? "把不确定变确定，我们更在意“你能不能顺利上线并获得结果”，而不是只交付代码或页面。"
            : "Turn uncertainty into certainty. We care more about whether you can successfully launch and get results, rather than just delivering code or pages."
          }
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {quotes.map((q, index) => (
          <motion.div
            key={q.title.zh}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.1 }}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur light:border-black/10 light:bg-black/5 shadow-xl transition-all hover:shadow-sky-500/10"
          >
            <div className="flex items-center justify-between gap-4 mb-4">
              <div className="text-base font-semibold text-white light:text-black">
                {language === "zh" ? q.title.zh : q.title.en}
              </div>
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 text-amber-400 fill-amber-400/30" />
                ))}
              </div>
            </div>
            <p className="text-sm leading-6 text-white/70 light:text-black/70">
              {language === "zh" ? q.desc.zh : q.desc.en}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

