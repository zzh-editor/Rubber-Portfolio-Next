"use client";

import React, { useState } from "react";
import Link from "next/link";
import { personalProfile, socialLinks } from "@/data/portfolio-data";
import {
  ArrowUpRight,
  Download,
  Check,
  Copy,
  Mail,
  Heart,
} from "lucide-react";
import { FadeBlurIn } from "@/components/ui/beui/motion-primitives";

export function ConnectFooterSection() {
  const [copiedWeChat, setCopiedWeChat] = useState<boolean>(false);

  const handleCopyWeChat = async (copyValue?: string) => {
    if (!copyValue) return;
    try {
      await navigator.clipboard.writeText(copyValue);
      setCopiedWeChat(true);
      setTimeout(() => setCopiedWeChat(false), 2400);
    } catch {
      setCopiedWeChat(true);
      setTimeout(() => setCopiedWeChat(false), 2400);
    }
  };

  const wechatItem = socialLinks.find((s) => s.id === "wechat");
  const externalSocials = socialLinks.filter((s) => s.id !== "wechat");

  return (
    <footer id="connect" className="w-full pt-12 pb-16 border-t border-neutral-200/80 dark:border-neutral-800/80 space-y-8">
      <FadeBlurIn className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
        {/* Left: Connect Tagline */}
        <div className="space-y-1.5">
          <h3 className="text-base sm:text-lg font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
            保持联系 / Connect
          </h3>
          <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400">
            无论是内容合作、团队搭建探讨，还是日常交流，随时欢迎联系。
          </p>
        </div>

        {/* Right: Resume Download CTA */}
        <a
          href={personalProfile.assets.resumePdf.path}
          download
          className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full text-xs font-medium text-white bg-neutral-900 hover:bg-neutral-800 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-200 transition-all shadow-sm self-start sm:self-auto hover:scale-[1.02] active:scale-[0.98]"
        >
          <Download className="w-3.5 h-3.5" />
          <span>下载完整简历</span>
          <span className="text-[10px] opacity-75 font-mono ml-0.5">
            ({personalProfile.assets.resumePdf.metaLabel.split("·")[2]?.trim() || "PDF"})
          </span>
        </a>
      </FadeBlurIn>

      {/* Social Network Pills */}
      <div className="flex flex-wrap items-center gap-2.5">
        {externalSocials.map((item) => (
          <Link
            key={item.id}
            href={item.url || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-neutral-700 dark:text-neutral-300 bg-neutral-100/90 hover:bg-neutral-200/90 dark:bg-neutral-900 dark:hover:bg-neutral-800 border border-neutral-200/80 dark:border-neutral-800 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <span>{item.name}</span>
            <ArrowUpRight className="w-3 h-3 opacity-60" />
          </Link>
        ))}

        {/* WeChat Quick Copy Button */}
        {wechatItem && (
          <button
            type="button"
            onClick={() => handleCopyWeChat(wechatItem.copyValue)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-neutral-700 dark:text-neutral-300 bg-neutral-100/90 hover:bg-neutral-200/90 dark:bg-neutral-900 dark:hover:bg-neutral-800 border border-neutral-200/80 dark:border-neutral-800 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
          >
            {copiedWeChat ? (
              <>
                <Check className="w-3 h-3 text-emerald-500" />
                <span className="text-emerald-600 dark:text-emerald-400">微信号已复制 ({wechatItem.copyValue})</span>
              </>
            ) : (
              <>
                <Copy className="w-3 h-3 opacity-60" />
                <span>复制微信 ({wechatItem.copyValue})</span>
              </>
            )}
          </button>
        )}
      </div>

      {/* Bottom meta & copyright */}
      <div className="pt-6 border-t border-neutral-100 dark:border-neutral-900 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs font-mono text-neutral-400 dark:text-neutral-500">
        <div>
          © {new Date().getFullYear()} {personalProfile.name} / {personalProfile.englishName}. All rights reserved.
        </div>
        <div className="flex items-center gap-1">
          <span>Designed with simplicity & focus</span>
        </div>
      </div>
    </footer>
  );
}
