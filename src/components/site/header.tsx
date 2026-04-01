"use client";

import * as React from "react";
import { LanguageToggle } from "./language-toggle";
import { cn } from "@/lib/cn";
import { useLanguage } from "@/components/language-provider";

const links = [
  { href: "#services", label: { zh: "服务范围", en: "Services" } },
  { href: "#solutions", label: { zh: "解决方案", en: "Solutions" } },
  { href: "#work", label: { zh: "成功案例", en: "Projects" } },
  { href: "#faq", label: { zh: "常见问题", en: "FAQ" } },
] as const;

export function SiteHeader({ className }: { className?: string }) {
  const { language, setLanguage } = useLanguage();

  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b border-white/5 bg-black/40 backdrop-blur",
        "light:bg-white/60 light:border-black/5",
        className,
      )}
    >
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-3">
        <div className="flex items-center gap-3">
          <div className="relative h-9 w-9 overflow-hidden rounded-2xl border border-white/10 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,.65),transparent_55%)] shadow-[0_0_40px_rgba(59,130,246,.25)]" />
          <div className="leading-tight">
            <div className="text-sm font-semibold text-white light:text-black">T0Craft</div>
            <div className="text-xs text-white/60 light:text-black/60">
              {language === "zh" ? "把展示变成交付" : "Turn Display into Delivery"}
            </div>
          </div>
        </div>

        <nav className="hidden items-center gap-6 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-white/70 hover:text-white transition"
            >
              {l.label[language]}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="#contact"
            className="hidden rounded-full bg-white px-4 py-2 text-sm font-semibold text-black transition hover:bg-white/90 md:inline-flex"
          >
            {language === "zh" ? "获取方案" : "Get Solution"}
          </a>
          <LanguageToggle
            currentLanguage={language}
            onLanguageChange={setLanguage}
          />
        </div>
      </div>
    </header>
  );
}

