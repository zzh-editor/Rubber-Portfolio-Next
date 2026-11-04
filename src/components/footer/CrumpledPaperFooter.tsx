"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { Download } from "lucide-react";
import { cn } from "@/lib/utils";
import { CrumpledBall3DCanvas } from "@/components/ui/crumpled-paper-reveal";

interface SocialItem {
  id: string;
  name: string;
  icon: string;
  url?: string;
  isCopy?: boolean;
  copyValue?: string;
}

const socialList: SocialItem[] = [
  {
    id: "xiaohongshu",
    name: "小红书",
    icon: "/images/social/小红书.svg",
    url: "https://xhslink.com/m/4VPfg578D0t",
  },
  {
    id: "bilibili",
    name: "Bilibili",
    icon: "/images/social/哔哩哔哩.svg",
    url: "https://space.bilibili.com/1516012",
  },
  {
    id: "instagram",
    name: "Instagram",
    icon: "/images/social/instagram.svg",
    url: "https://www.instagram.com/zzh.editor/",
  },
  {
    id: "wechat",
    name: "微信",
    icon: "/images/social/weixin_mw.svg",
    isCopy: true,
    copyValue: "Rubber_WeChat_ID",
  },
];

/**
 * Drawably 风格手绘箭头（统一高亮蓝色 #3b82f6，固定指向右下角原点）
 */
export function DrawablyHandArrow({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={cn("w-full h-full text-[#3b82f6] drop-shadow-sm select-none", className)}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M18 20 C 35 15, 65 35, 84 82"
        stroke="currentColor"
        strokeWidth="3.4"
        strokeLinecap="round"
      />
      <path
        d="M58 75 C 68 80, 78 82, 84 82"
        stroke="currentColor"
        strokeWidth="3.2"
        strokeLinecap="round"
      />
      <path
        d="M78 56 C 81 68, 83 76, 84 82"
        stroke="currentColor"
        strokeWidth="3.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function CrumpledPaperFooter() {
  const [isVisible, setIsVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [arrowTimerReady, setArrowTimerReady] = useState(false);
  const [copiedWeChat, setCopiedWeChat] = useState(false);

  // 视口滚动检测：到达开源板块时纸团滚入；向上滚动脱离开源板块时纸团滚出
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const openSourceEl = document.getElementById("opensource");
          if (!openSourceEl) {
            ticking = false;
            return;
          }

          const rect = openSourceEl.getBoundingClientRect();
          const viewportHeight = window.innerHeight;

          // 当开源板块进入视口下部（距视口顶部 < 85%）且未完全滑出上方时展现
          const shouldShow = rect.top < viewportHeight * 0.85 && rect.bottom > 80;

          setIsVisible(shouldShow);
          if (!shouldShow) {
            setIsOpen(false);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // 延迟 120ms 触发首次检测，确保入场滚动动画可被清晰看到
    const timer = setTimeout(handleScroll, 120);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timer);
    };
  }, []);

  // 纸团滚入停稳后（约 1250ms），手绘箭头平滑渐显；点击展开或向上滚动离开时箭头瞬隐
  useEffect(() => {
    if (isVisible && !isOpen) {
      const timer = setTimeout(() => {
        setArrowTimerReady(true);
      }, 1250);
      return () => {
        clearTimeout(timer);
        setArrowTimerReady(false);
      };
    }
  }, [isVisible, isOpen]);

  const arrowVisible = isVisible && !isOpen && arrowTimerReady;

  // 微信复制交互（统一 #3b82f6 高亮色）
  const handleCopyWeChat = async (val?: string) => {
    if (!val) return;
    try {
      await navigator.clipboard.writeText(val);
      setCopiedWeChat(true);
      setTimeout(() => setCopiedWeChat(false), 2400);
    } catch {
      // 容错兜底
    }
  };

  return (
    <>
      {/* 1. 全屏背景遮罩：覆盖包括右上角日夜切换按钮（z-30）在内的所有内容，压暗背景，点击收起 */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-40 bg-black/60 dark:bg-black/80 backdrop-blur-[2px] cursor-pointer"
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      {/* 2. 纸团与手绘箭头容器（拟真物理大阻尼滚动入场与顺势滚出） */}
      <motion.div
        initial={{ x: 340, rotate: 520, opacity: 0 }}
        animate={
          isVisible
            ? { x: 0, rotate: 0, opacity: 1 }
            : { x: 340, rotate: 520, opacity: 0 }
        }
        transition={
          isVisible
            ? {
                x: { duration: 1.25, ease: [0.08, 0.82, 0.17, 1] },
                rotate: { duration: 1.25, ease: [0.08, 0.82, 0.17, 1] },
                opacity: { duration: 0.4 },
              }
            : {
                x: { duration: 0.85, ease: [0.38, 0, 0.72, 0] },
                rotate: { duration: 0.85, ease: [0.38, 0, 0.72, 0] },
                opacity: { duration: 0.35 },
              }
        }
        className="fixed bottom-6 right-5 sm:right-8 z-40 select-none"
      >
        {/* Drawably 手绘指示箭头：稳稳指向放大后的纸团，点击展开瞬间或离开时渐隐 */}
        <AnimatePresence>
          {arrowVisible && !isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.7, transition: { duration: 0.1 } }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="absolute -top-14 -left-10 sm:-top-16 sm:-left-12 size-16 sm:size-20 pointer-events-none z-10"
            >
              <DrawablyHandArrow />
            </motion.div>
          )}
        </AnimatePresence>

        {/* 逼真 3D 纸团（放大尺寸，饱满可见，进来后静止不自转，仅支持点击展开，hover 绝不闪动，展开时原地淡隐，收起时原地重现不跳位） */}
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          aria-label="展开联系方式与个人信息"
          className={cn(
            "relative size-24 sm:size-32 rounded-full cursor-pointer focus:outline-none transition-all duration-300",
            isOpen
              ? "opacity-0 pointer-events-none scale-75"
              : "opacity-100 hover:scale-105 active:scale-95"
          )}
        >
          <CrumpledBall3DCanvas className="size-full filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.3)] dark:drop-shadow-[0_0_28px_rgba(255,255,255,0.22)]" />
        </button>
      </motion.div>

      {/* 3. 展开卡片：根据最新反馈优化（头像左移变大、MAIL/PHONE各一行、去掉右上角X按钮、点击卡片外部任意处收起） */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: 30, x: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 30, x: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 220 }}
            style={{ transformOrigin: "bottom right" }}
            className="fixed bottom-6 right-5 sm:right-8 z-50 w-[88vw] max-w-[340px] sm:w-[350px] rounded-2xl bg-[#faf8f5] dark:bg-[#18181b] border border-neutral-300/80 dark:border-neutral-700/80 p-5 sm:p-6 shadow-[0_20px_50px_rgba(0,0,0,0.35)] font-sans select-none"
          >
            {/* 头像 logo.png：右边缘对齐卡片内容边缘（垂直贴合图 1 蓝线），一半透出面板顶部 */}
            <div className="absolute -top-8 sm:-top-9 right-5 sm:right-6 size-16 sm:size-18 rounded-full border-2 border-[#faf8f5] dark:border-[#18181b] shadow-lg ring-1 ring-black/10 overflow-hidden bg-white z-20">
              <Image
                src="/images/logo.png"
                alt="张壮浩"
                width={72}
                height={72}
                className="size-full object-cover"
                unoptimized
              />
            </div>

            {/* 姓名与职位 */}
            <div className="pt-1">
              <h3 className="text-xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
                张壮浩
              </h3>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                视频团队负责人
              </p>
            </div>

            {/* 联系方式：MAIL 与 PHONE 各一行，左边标签右边内容（上一版本经典样式） */}
            <div className="mt-4 space-y-2.5 font-mono text-xs">
              <div className="flex items-center justify-between border-b border-neutral-200/60 dark:border-neutral-800/80 pb-2">
                <span className="text-[11px] font-semibold tracking-wider text-neutral-400 dark:text-neutral-500 uppercase select-none">
                  MAIL
                </span>
                <a
                  href="mailto:zzh.editor@gmail.com"
                  className="text-neutral-800 dark:text-neutral-200 hover:text-[#3b82f6] dark:hover:text-[#3b82f6] transition-colors font-medium tracking-tight"
                >
                  zzh.editor@gmail.com
                </a>
              </div>
              <div className="flex items-center justify-between pt-0.5">
                <span className="text-[11px] font-semibold tracking-wider text-neutral-400 dark:text-neutral-500 uppercase select-none">
                  PHONE
                </span>
                <a
                  href="tel:+8619042941411"
                  className="text-neutral-800 dark:text-neutral-200 hover:text-[#3b82f6] dark:hover:text-[#3b82f6] transition-colors font-medium tracking-tight"
                >
                  +8619042941411
                </a>
              </div>
            </div>

            {/* 4 个社交主页横向一排纯 icon（无多余边框） */}
            <div className="mt-5 flex items-center justify-around py-1">
              {socialList.map((social) => {
                if (social.isCopy) {
                  return (
                    <button
                      key={social.id}
                      type="button"
                      onClick={() => handleCopyWeChat(social.copyValue)}
                      title="点击复制微信"
                      className="p-1.5 transition-transform duration-200 hover:scale-125 active:scale-95 cursor-pointer relative"
                    >
                      <Image
                        src={social.icon}
                        alt={social.name}
                        width={24}
                        height={24}
                        className="size-6 object-contain"
                        unoptimized
                      />
                      {copiedWeChat && (
                        <span className="absolute -top-7 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded text-[10px] font-medium bg-[#3b82f6] text-white whitespace-nowrap shadow-sm pointer-events-none">
                          微信号已复制
                        </span>
                      )}
                    </button>
                  );
                }

                return (
                  <a
                    key={social.id}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={social.name}
                    className="p-1.5 transition-transform duration-200 hover:scale-125 active:scale-95 cursor-pointer"
                  >
                    <Image
                      src={social.icon}
                      alt={social.name}
                      width={24}
                      height={24}
                      className="size-6 object-contain"
                      unoptimized
                    />
                  </a>
                );
              })}
            </div>

            {/* 下载简历 (PDF) 按钮 */}
            <div className="mt-5">
              <a
                href="/Rubber-Resume.pdf"
                download="张壮浩-个人简历.pdf"
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 hover:bg-neutral-800 dark:hover:bg-neutral-100 transition-colors text-xs font-medium shadow-xs"
              >
                <Download className="size-3.5" />
                <span>下载简历 (PDF)</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
