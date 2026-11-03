"use client";

import React, { useState } from "react";
import Link from "next/link";
import { personalProfile, socialLinks } from "@/data/portfolio-data";
import {
  ArrowUpRight,
  Download,
  Check,
  Copy,
} from "lucide-react";
import { FadeBlurIn } from "@/components/ui/beui/motion-primitives";

export function HeroIntro() {
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

  const xhs = socialLinks.find((s) => s.id === "xiaohongshu");
  const bili = socialLinks.find((s) => s.id === "bilibili");
  const ins = socialLinks.find((s) => s.id === "instagram");
  const wechat = socialLinks.find((s) => s.id === "wechat");

  return (
    <FadeBlurIn
      duration={0.6}
      yOffset={8}
      className="w-full space-y-5 text-left select-text"
    >
      {/* Bio Paragraph 1: Identity & Origin */}
      <p className="text-[17px] sm:text-[19px] leading-relaxed text-neutral-800 dark:text-neutral-200">
        我是<span className="font-semibold text-neutral-900 dark:text-white mx-1">{personalProfile.name}</span>
        （{personalProfile.englishName}），一名生于 {personalProfile.birthYear} 年、来自广东{personalProfile.hometown}的
        <span className="font-medium text-neutral-900 dark:text-white mx-1">{personalProfile.role}</span>与创作者。
      </p>

      {/* Bio Paragraph 2: Journey & Competence */}
      <p className="text-[15px] sm:text-[16px] leading-relaxed text-neutral-600 dark:text-neutral-400">
        从摄影工作室学徒到视频团队负责人，用 8 年时间完成从执行到管理的跨越。一个脱离了信息茧房的人，具备极高的信息检索与学习能力，审美在线；擅长将创意转化为可执行的标准流程，让团队产出既有质量又有效率。
      </p>

      {/* Bio Paragraph 3: Current Focus & Actionable Links (kshv.me style) */}
      <p className="text-[15px] sm:text-[16px] leading-relaxed text-neutral-600 dark:text-neutral-400">
        {personalProfile.currentFocus}。欢迎在{" "}
        {xhs && (
          <Link
            href={xhs.url || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-neutral-900 dark:text-neutral-200 font-medium hover:underline underline-offset-4 decoration-neutral-400 dark:decoration-neutral-500"
          >
            {xhs.name}
            <ArrowUpRight className="w-3 h-3 ml-0.5 opacity-60 inline" />
          </Link>
        )}
        、
        {bili && (
          <Link
            href={bili.url || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-neutral-900 dark:text-neutral-200 font-medium hover:underline underline-offset-4 decoration-neutral-400 dark:decoration-neutral-500"
          >
            {bili.name}
            <ArrowUpRight className="w-3 h-3 ml-0.5 opacity-60 inline" />
          </Link>
        )}
        、
        {ins && (
          <Link
            href={ins.url || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-neutral-900 dark:text-neutral-200 font-medium hover:underline underline-offset-4 decoration-neutral-400 dark:decoration-neutral-500"
          >
            {ins.name}
            <ArrowUpRight className="w-3 h-3 ml-0.5 opacity-60 inline" />
          </Link>
        )}
        {" "}关注我的动态；微信号可点击{" "}
        {wechat && (
          <button
            type="button"
            onClick={() => handleCopyWeChat(wechat.copyValue)}
            className="inline-flex items-center text-neutral-900 dark:text-neutral-200 font-medium hover:underline underline-offset-4 decoration-neutral-400 dark:decoration-neutral-500 cursor-pointer"
            title="点击复制微信号"
          >
            {copiedWeChat ? (
              <span className="text-emerald-600 dark:text-emerald-400 inline-flex items-center gap-0.5">
                <Check className="w-3.5 h-3.5 inline" /> 已复制微信
              </span>
            ) : (
              <span className="inline-flex items-center gap-0.5">
                <Copy className="w-3 h-3 opacity-60 inline" /> 复制微信
              </span>
            )}
          </button>
        )}
        ，或直接{" "}
        <a
          href={personalProfile.assets.resumePdf.path}
          download
          className="inline-flex items-center text-neutral-900 dark:text-neutral-200 font-medium hover:underline underline-offset-4 decoration-neutral-400 dark:decoration-neutral-500"
          aria-label={personalProfile.assets.resumePdf.ariaLabel}
        >
          <Download className="w-3 h-3 ml-0.5 opacity-60 inline mr-0.5" />
          下载完整简历
        </a>
        。
      </p>
    </FadeBlurIn>
  );
}
