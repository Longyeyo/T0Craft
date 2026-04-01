"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/cn";
import { useLanguage } from "@/components/language-provider";

type Step = "name" | "contact" | "budget" | "detail" | "done";

export function TerminalForm() {
  const { language } = useLanguage();
  const [step, setStep] = React.useState<Step>("name");
  const [loading, setLoading] = React.useState(false);
  const [err, setErr] = React.useState<string | null>(null);
  const [showQR, setShowQR] = React.useState(false);

  const [company, setCompany] = React.useState("");
  const [projectType, setProjectType] = React.useState("");
  const [features, setFeatures] = React.useState("");
  const [timeline, setTimeline] = React.useState("");
  const [contact, setContact] = React.useState("");

  const submit = async () => {
    setLoading(true);
    setErr(null);
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          name: company,
          contact,
          budget: projectType,
          detail: `需求要点：${features}\n期望上线：${timeline}`,
          source: "terminal",
        }),
      });
      if (!res.ok) throw new Error(language === "zh" ? "提交失败，请稍后再试。" : "Submission failed, please try again later.");
      setStep("done");
    } catch (e) {
      setErr(e instanceof Error ? e.message : (language === "zh" ? "提交失败" : "Submission failed"));
    } finally {
      setLoading(false);
    }
  };

  const next = () => {
    if (step === "name") return setStep("budget");
    if (step === "budget") return setStep("detail");
    if (step === "detail") return setStep("contact");
    if (step === "contact") return void submit();
  };

  return (
    <section id="contact" className="mx-auto w-full max-w-6xl px-6 py-20">
      <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
        {/* 左侧说明与高亮流光联系方式 */}
        <div className="relative">
          <h2 className="text-2xl font-semibold tracking-tight text-white light:text-black">
            {language === "zh" ? "1 分钟提交需求，24 小时内给你方案" : "Submit requirements in 1 minute, get a plan within 24 hours"}
          </h2>
          <p className="mt-2 max-w-md text-sm leading-6 text-white/70 light:text-black/70">
            {language === "zh" ? "先把\"你要什么、什么时候要\"说清楚，我们再给可执行的交付方案与报价范围。" : "First clarify \"what you want and when you want it\", then we'll provide an executable delivery plan and price range."}
          </p>

          {/* 立即沟通区域 - 极光高亮版 */}
          <div className="group relative mt-10 inline-block">
            {/* 外部霓虹扩散层：增强了颜色饱和度和模糊半径 */}
            <div className="absolute -inset-[3px] rounded-2xl bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 opacity-60 blur-md transition-all duration-500 group-hover:opacity-100 group-hover:blur-xl group-hover:scale-105" />
            
            <div 
              className="relative overflow-hidden rounded-2xl border border-white/30 bg-[#0d0d14] px-6 py-4 backdrop-blur-2xl transition light:border-black/10 light:bg-white"
              onMouseEnter={() => setShowQR(true)}
              onMouseLeave={() => setShowQR(false)}
            >
              {/* 核心流光层：加入了白色高亮节点，旋转速度稍快以增加灵动感 */}
              <div className="pointer-events-none absolute inset-0 opacity-100 transition-opacity">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 3.2, repeat: Infinity, ease: "linear" }}
                  style={{
                    // 渐变中加入了 #fff 提升视觉亮度
                    background: "conic-gradient(from 0deg, transparent 0%, #00f0ff 35%, #ffffff 50%, #ff00e5 65%, transparent 100%)",
                  }}
                  className="absolute -inset-[350%]"
                />
              </div>

              {/* 内部遮罩：间距收缩至 1px，让边框更显眼 */}
              <div className="absolute inset-[1px] rounded-[15px] bg-[#0d0d14] light:bg-white z-0" />

              {/* 文字内容：增加了微妙的文字阴影提升对比度 */}
              <div className="relative z-10">
                <div className="text-[10px] uppercase tracking-wider text-cyan-400/80 light:text-black/50 font-bold">
                  {language === "zh" ? "立刻沟通 / 微信" : "Direct Contact / WeChat"}
                </div>
                <div className="mt-1 font-mono text-xl font-bold text-white light:text-black tracking-tight drop-shadow-[0_0_12px_rgba(255,255,255,0.4)]">
                  13373406791
                </div>
              </div>
            </div>

            {/* 悬浮二维码弹窗 */}
            <AnimatePresence>
              {showQR && (
                <motion.div
                  initial={{ opacity: 0, x: 25, scale: 0.9 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: 25, scale: 0.9 }}
                  className="absolute left-[calc(100%+24px)] top-0 z-50 rounded-2xl border border-white/20 bg-white p-3 shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
                >
                  <div className="relative h-36 w-36 bg-gray-100 rounded-xl overflow-hidden ring-1 ring-black/5">
                    <img 
                      src="/wx.png" 
                      alt="WeChat QR"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <p className="mt-2.5 text-center text-[12px] font-extrabold text-slate-900">
                    {language === "zh" ? "扫码添加微信" : "Scan to Add"}
                  </p>
                  {/* 装饰箭头 */}
                  <div className="absolute -left-2 top-8 h-4 w-4 rotate-45 border-b border-l border-white/20 bg-white" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* 右侧终端交互表单 */}
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-md light:border-black/10 light:bg-black/5">
          <div className="flex items-center justify-between">
            <div className="text-xs font-mono text-white/40 light:text-black/40">
              lead@t0craft ~
            </div>
            <div className="flex gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-red-500/60" />
              <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/60" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/60" />
            </div>
          </div>

          <div className="mt-5 rounded-2xl border border-white/5 bg-black/40 p-6 font-mono text-[12px] leading-6 text-white/80 light:border-black/10 light:bg-white/70 light:text-black/80">
            <Line>{language === "zh" ? "> 初始化需求分析模块..." : "> Initializing requirements module..."}</Line>
            <Line>{language === "zh" ? "> 欢迎，请描述您的项目愿景。" : "> Welcome, please describe your project vision."}</Line>

            {step !== "done" ? (
              <>
                <Prompt label={language === "zh" ? "公司/项目名" : "Company/Project"} value={company} setValue={setCompany} active={step === "name"} />
                {step === "budget" ? (
                  <Prompt label={language === "zh" ? "交付类型 (App/小程序/Web)" : "Delivery Type"} value={projectType} setValue={setProjectType} active={step === "budget"} />
                ) : null}
                {step === "detail" ? (
                  <>
                    <Prompt label={language === "zh" ? "核心需求简述" : "Core Features"} value={features} setValue={setFeatures} active={step === "detail"} multiline />
                    <Prompt label={language === "zh" ? "期望上线节点" : "Deadline"} value={timeline} setValue={setTimeline} active={step === "detail"} />
                  </>
                ) : null}
                {step === "contact" ? (
                  <Prompt label={language === "zh" ? "联系信息 (手机/微信)" : "Contact Info"} value={contact} setValue={setContact} active={step === "contact"} />
                ) : null}

                {err && <div className="mt-4 text-red-400 bg-red-400/10 p-2 rounded-lg">{err}</div>}

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <button
                    type="button"
                    onClick={next}
                    disabled={loading}
                    className="inline-flex h-11 items-center justify-center rounded-xl bg-white px-8 text-xs font-bold text-black transition-all hover:scale-105 active:scale-95 disabled:opacity-50 light:bg-black light:text-white"
                  >
                    {step === "contact" ? (loading ? "SENDING..." : (language === "zh" ? "确认提交" : "SUBMIT")) : (language === "zh" ? "下一步" : "NEXT STEP")}
                  </button>
                  <div className="text-[10px] text-white/30 light:text-black/30 self-center uppercase tracking-widest">
                    {language === "zh" ? "24小时内极速响应" : "24h Response Guarantee"}
                  </div>
                </div>
              </>
            ) : (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-5 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                <p className="font-bold">✓ {language === "zh" ? "需求已录入系统" : "Requirements Logged"}</p>
                <p className="mt-1 opacity-80">{language === "zh" ? "我们的架构师将在 24 小时内与您联系。" : "Our architect will contact you within 24 hours."}</p>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function Line({ children }: { children: React.ReactNode }) {
  return <div className="text-white/60 light:text-black/60">{children}</div>;
}

function Prompt({ label, value, setValue, active, multiline }: any) {
  return (
    <div className="mt-5 group/field">
      <div className="text-white/30 light:text-black/40 group-focus-within/field:text-cyan-400/60 transition-colors">:: {label}</div>
      {multiline ? (
        <textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          rows={3}
          className="mt-2 w-full resize-none rounded-xl border border-white/10 bg-white/5 p-4 text-white outline-none ring-0 focus:border-cyan-500/40 transition-all light:text-black light:border-black/10"
          autoFocus={active}
        />
      ) : (
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none ring-0 focus:border-cyan-500/40 transition-all light:text-black light:border-black/10"
          autoFocus={active}
        />
      )}
    </div>
  );
}