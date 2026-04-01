"use client";

import { useLanguage } from "../language-provider";
import { getSiteStatus } from "@/lib/site-status";
import { useEffect, useState } from "react";

export function SiteFooter() {
  const { language } = useLanguage();
  const [status, setStatus] = useState({ available: true, note: "" });

  useEffect(() => {
    const fetchStatus = async () => {
      const siteStatus = await getSiteStatus();
      setStatus(siteStatus);
    };
    fetchStatus();
  }, []);

  return (
    <footer className="border-t border-white/10 bg-white/0 py-10 light:border-black/10">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="text-sm font-semibold text-white light:text-black">
            T0Craft Studio
          </div>
          <div className="mt-1 text-sm text-white/60 light:text-black/60">
            {language === "zh" 
              ? "我们把\"展示\"变成\"成交\"：交付官网与系统，让你的业务持续获客、持续增长。"
              : "We turn \"display\" into \"成交\": deliver websites and systems to help your business continuously acquire customers and grow."
            }
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span
            className="relative inline-flex h-2.5 w-2.5 rounded-full"
            style={{
              background: status.available ? "#34d399" : "#f59e0b",
              boxShadow: status.available
                ? "0 0 18px rgba(52,211,153,.75)"
                : "0 0 18px rgba(245,158,11,.55)",
            }}
            aria-hidden="true"
          />
          <div className="text-sm text-white/70 light:text-black/70">
            {status.available 
              ? (language === "zh" ? "当前可承接项目" : "Currently accepting projects") 
              : (language === "zh" ? "当前排期紧张" : "Current schedule is tight")
            }
            <span className="ml-2 text-xs text-white/50 light:text-black/50">
              · {status.note}({language === "zh" ? "24小时内回应" : "Response within 24 hours"})
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

