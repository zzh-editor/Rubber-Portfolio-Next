"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  personalProfile,
  socialLinks,
} from "@/data/portfolio-data";
import {
  ArrowUpRight,
  Download,
  Check,
  Copy,
  MapPin,
  Clock,
} from "lucide-react";
import { FadeBlurIn } from "@/components/ui/beui/motion-primitives";

export function HeroIntro() {
  const [currentTime, setCurrentTime] = useState<string>("");
  const [copiedWeChat, setCopiedWeChat] = useState<boolean>(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Format: 19:48:02 CST
      const timeStr = now.toLocaleTimeString("en-GB", {
        timeZone: "Asia/Shanghai",
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
      setCurrentTime(timeStr);
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleCopyWeChat = async (copyValue?: string) => {
    if (!copyValue) return;
    try {
      await navigator.clipboard.writeText(copyValue);
      setCopiedWeChat(true);
      setTimeout(() => setCopiedWeChat(false), 2400);
    } catch {
      // Fallback
      setCopiedWeChat(true);
      setTimeout(() => setCopiedWeChat(false), 2400);
    }
  };

  const wechatItem = socialLinks.find((s) => s.id === "wechat");
  const externalSocials = socialLinks.filter((s) => s.id !== "wechat");

  return (
    <FadeBlurIn duration={0.5} yOffset={10} className="w-full space-y-7">
      {/* Top Header: Avatar + Identity + Live Location/Status */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        {/* Left: Avatar & Name */}
        <div className="flex items-center gap-3.5">
          <div className="relative w-12 h-12 rounded-2xl overflow-hidden border border-neutral-200/90 dark:border-neutral-800 shadow-sm bg-neutral-100 dark:bg-neutral-900 shrink-0">
            <Image
              src={personalProfile.assets.logo}
              alt={personalProfile.name}
              fill
              sizes="48px"
              className="object-cover"
              priority
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg sm:text-xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
                {personalProfile.name}
              </h1>
              <span className="text-xs font-mono px-2 py-0.5 rounded-md bg-neutral-100 dark:bg-neutral-800/80 text-neutral-600 dark:text-neutral-300 border border-neutral-200/60 dark:border-neutral-700/60">
                {personalProfile.englishName}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 font-medium">
              {personalProfile.role} · {personalProfile.currentFocus}
            </p>
          </div>
        </div>

        {/* Right: Live Location & Pulsing Time Badge (kshv.me style) */}
        <div className="inline-flex items-center gap-2 self-start sm:self-auto px-3 py-1.5 rounded-full text-xs font-mono bg-neutral-100/90 dark:bg-neutral-900/90 border border-neutral-200/70 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="flex items-center gap-1">
            <MapPin className="w-3 h-3 text-neutral-400" />
            {personalProfile.hometown} / CHINA
          </span>
          <span className="text-neutral-300 dark:text-neutral-700">·</span>
          <span className="flex items-center gap-1 font-mono-numbers">
            <Clock className="w-3 h-3 text-neutral-400" />
            {currentTime ? `${currentTime} GMT+8` : "GMT+8"}
          </span>
        </div>
      </div>

      {/* Bio Paragraphs */}
      <div className="space-y-3 text-[15px] sm:text-[16px] leading-relaxed text-neutral-600 dark:text-neutral-400">
        {personalProfile.bioParagraphs.map((paragraph, idx) => (
          <p key={idx} className="transition-colors">
            {paragraph}
          </p>
        ))}
      </div>

      {/* Social Links & Resume Capsule Buttons */}
      <div className="pt-2 flex flex-wrap items-center gap-2.5">
        {externalSocials.map((item) => (
          <Link
            key={item.id}
            href={item.url || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium text-neutral-700 dark:text-neutral-300 bg-neutral-100/80 hover:bg-neutral-200/80 dark:bg-neutral-900/80 dark:hover:bg-neutral-800/80 border border-neutral-200/80 dark:border-neutral-800 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            {item.name}
            <ArrowUpRight className="w-3 h-3 opacity-60" />
          </Link>
        ))}

        {/* WeChat Quick Copy Button */}
        {wechatItem && (
          <button
            type="button"
            onClick={() => handleCopyWeChat(wechatItem.copyValue)}
            className="relative inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-neutral-700 dark:text-neutral-300 bg-neutral-100/80 hover:bg-neutral-200/80 dark:bg-neutral-900/80 dark:hover:bg-neutral-800/80 border border-neutral-200/80 dark:border-neutral-800 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
            title="点击复制微信号"
          >
            {copiedWeChat ? (
              <>
                <Check className="w-3 h-3 text-emerald-500" />
                <span className="text-emerald-600 dark:text-emerald-400">微信号已复制</span>
              </>
            ) : (
              <>
                <Copy className="w-3 h-3 opacity-60" />
                <span>微信</span>
              </>
            )}
          </button>
        )}

        {/* Resume Download Pill */}
        <a
          href={personalProfile.assets.resumePdf.path}
          download
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium text-white bg-neutral-900 hover:bg-neutral-800 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-200 border border-transparent transition-all shadow-sm hover:scale-[1.02] active:scale-[0.98]"
          aria-label={personalProfile.assets.resumePdf.ariaLabel}
        >
          <Download className="w-3.5 h-3.5" />
          <span>{personalProfile.assets.resumePdf.buttonText}</span>
          <span className="text-[10px] opacity-75 font-mono ml-0.5">
            ({personalProfile.assets.resumePdf.metaLabel.split("·")[2]?.trim() || "PDF"})
          </span>
        </a>
      </div>
    </FadeBlurIn>
  );
}
