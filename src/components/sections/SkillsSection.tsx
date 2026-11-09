"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";

type SkillCategory = "software" | "realworld" | "others";

interface SkillItem {
  id: string;
  name: string;
  badge?: string;
  colorClass: string;
}

export function SkillsSection() {
  const [activeTab, setActiveTab] = useState<SkillCategory>("software");

  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);
  const isSyncingRef = useRef(false);

  // 左右两侧渐进模糊指示器状态
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const categories: { id: SkillCategory; label: string; count: number }[] = [
    { id: "software", label: "软件", count: 13 },
    { id: "realworld", label: "现实技能", count: 4 },
    { id: "others", label: "其它技能", count: 2 },
  ];

  /**
   * 手绘指示箭头同色系蓝色调色板 (#3b82f6)
   * 采用统一蓝色系的不同明度与饱和度阶梯，保持视觉纯净克制、不杂乱
   */
  const bluePalette = {
    // 纯正手绘箭头原色基准蓝
    arrowBlue:
      "bg-blue-500/10 text-blue-600 border-blue-400/35 hover:bg-blue-500/15 dark:bg-blue-500/15 dark:text-blue-300 dark:border-blue-500/35 dark:hover:bg-blue-500/25",
    // 浅澈天蓝（高明度、轻量感）
    skySoft:
      "bg-blue-50/80 text-blue-600 border-blue-200/70 hover:bg-blue-100/70 dark:bg-blue-950/30 dark:text-blue-300 dark:border-blue-800/40 dark:hover:bg-blue-900/40",
    // 饱满深邃蓝（中度饱和、沉稳）
    deepBlue:
      "bg-blue-100/80 text-blue-700 border-blue-300/80 hover:bg-blue-200/80 dark:bg-blue-900/40 dark:text-blue-200 dark:border-blue-700/60 dark:hover:bg-blue-900/60",
    // 浓郁对比蓝（高饱和深蓝）
    navyBlue:
      "bg-blue-50 text-blue-800 border-blue-300/90 hover:bg-blue-100/90 dark:bg-blue-950/60 dark:text-blue-100 dark:border-blue-600/60 dark:hover:bg-blue-900/70",
    // 雾化静谧蓝（低饱和灰蓝）
    slateBlue:
      "bg-slate-100/90 text-slate-700 border-blue-200/60 hover:bg-slate-200/80 dark:bg-slate-900/60 dark:text-slate-200 dark:border-blue-900/50 dark:hover:bg-slate-800/70",
    // 亮湖水蓝（高明度湖蓝）
    lakeBlue:
      "bg-sky-50 text-sky-700 border-sky-300/70 hover:bg-sky-100/80 dark:bg-sky-950/40 dark:text-sky-200 dark:border-sky-700/50 dark:hover:bg-sky-900/50",
  };

  const skillData: Record<SkillCategory, SkillItem[]> = {
    software: [
      {
        id: "ae",
        name: "Adobe After Effects",
        colorClass: bluePalette.deepBlue,
      },
      {
        id: "pr",
        name: "Adobe Premiere Pro",
        colorClass: bluePalette.arrowBlue,
      },
      {
        id: "ps",
        name: "Adobe Photoshop",
        colorClass: bluePalette.lakeBlue,
      },
      {
        id: "lr",
        name: "LightRoom",
        colorClass: bluePalette.skySoft,
      },
      {
        id: "capture-one",
        name: "Capture One",
        colorClass: bluePalette.navyBlue,
      },
      {
        id: "davinci",
        name: "DaVinci Resolve",
        colorClass: bluePalette.deepBlue,
      },
      {
        id: "fcp",
        name: "Final Cut Pro",
        colorClass: bluePalette.slateBlue,
      },
      {
        id: "agents",
        name: "各类 Agent 的使用（Opencode、Antigravity、Codex...）",
        colorClass: bluePalette.arrowBlue,
      },
      {
        id: "os",
        name: "Windows & macOS 的熟练使用",
        colorClass: bluePalette.slateBlue,
      },
      {
        id: "markdown",
        name: "Markdown",
        colorClass: bluePalette.skySoft,
      },
      {
        id: "obs",
        name: "OBS",
        colorClass: bluePalette.navyBlue,
      },
      {
        id: "cavalry",
        name: "Cavalry",
        badge: "学习中",
        colorClass: bluePalette.lakeBlue,
      },
      {
        id: "blender",
        name: "Blender",
        badge: "学习中",
        colorClass: bluePalette.deepBlue,
      },
    ],
    realworld: [
      {
        id: "slr",
        name: "单反相机",
        colorClass: bluePalette.slateBlue,
      },
      {
        id: "mirrorless",
        name: "微单相机",
        colorClass: bluePalette.arrowBlue,
      },
      {
        id: "gimbal",
        name: "稳定器",
        colorClass: bluePalette.deepBlue,
      },
      {
        id: "lighting",
        name: "摄影布光",
        colorClass: bluePalette.skySoft,
      },
    ],
    others: [
      {
        id: "coffee",
        name: "咖啡豆的烘焙和冲煮",
        colorClass: bluePalette.slateBlue,
      },
      {
        id: "driver-c1",
        name: "C1 驾驶",
        colorClass: bluePalette.arrowBlue,
      },
    ],
  };

  const currentSkills = skillData[activeTab];

  // 多项时拆分为上下两排，避免网格列宽拉伸，确保每个胶囊完全贴合自身文字宽度
  const isMultiRow = currentSkills.length > 4;
  const half = Math.ceil(currentSkills.length / 2);
  const row1 = isMultiRow ? currentSkills.slice(0, half) : currentSkills;
  const row2 = isMultiRow ? currentSkills.slice(half) : [];

  // 检测滚动边界以驱动渐进模糊显隐
  const checkScrollBounds = () => {
    const el = row1Ref.current;
    if (!el) {
      setCanScrollLeft(false);
      setCanScrollRight(false);
      return;
    }
    const hasScroll = el.scrollWidth > el.clientWidth + 2;
    if (!hasScroll) {
      setCanScrollLeft(false);
      setCanScrollRight(false);
      return;
    }
    setCanScrollLeft(el.scrollLeft > 6);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 6);
  };

  // 切换分类或窗口 resize 时重新检测滚动边界
  useEffect(() => {
    if (row1Ref.current) {
      row1Ref.current.scrollLeft = 0;
    }
    if (row2Ref.current) {
      row2Ref.current.scrollLeft = 0;
    }
    const timer = setTimeout(checkScrollBounds, 60);
    window.addEventListener("resize", checkScrollBounds);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", checkScrollBounds);
    };
  }, [activeTab]);

  // 双排同步水平滚动
  const handleScroll = (source: "row1" | "row2") => {
    if (isSyncingRef.current) return;
    isSyncingRef.current = true;
    const from = source === "row1" ? row1Ref.current : row2Ref.current;
    const to = source === "row1" ? row2Ref.current : row1Ref.current;
    if (from && to) {
      to.scrollLeft = from.scrollLeft;
    }
    checkScrollBounds();
    requestAnimationFrame(() => {
      isSyncingRef.current = false;
    });
  };

  const renderCapsule = (skill: SkillItem) => (
    <span
      key={skill.id}
      className={cn(
        "inline-flex w-auto items-center gap-1.5 px-3.5 py-1.5 rounded-full border text-xs sm:text-[13px] font-medium leading-none select-none transition-all duration-150 shadow-2xs shrink-0 whitespace-nowrap active:scale-95 cursor-default",
        skill.colorClass
      )}
    >
      <span>{skill.name}</span>
      {skill.badge && (
        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-full bg-blue-500/15 text-blue-700 dark:bg-blue-400/20 dark:text-blue-300 leading-none">
          {skill.badge}
        </span>
      )}
    </span>
  );

  return (
    <section id="skills" className="w-full space-y-4 pt-2">
      {/* 标题 */}
      <div>
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
          技能
        </h2>
      </div>

      {/* 分类切换连体胶囊导航 */}
      <div className="inline-flex items-center p-1 rounded-full bg-neutral-100 dark:bg-neutral-800/90 border border-neutral-200/80 dark:border-neutral-700/80 shrink-0 select-none">
        {categories.map((cat) => {
          const isActive = activeTab === cat.id;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveTab(cat.id)}
              className={cn(
                "relative rounded-full text-xs font-sans whitespace-nowrap transition-colors cursor-pointer select-none z-10 flex items-center gap-1.5",
                isActive
                  ? "px-4 py-1.5 font-semibold text-white dark:text-neutral-900"
                  : "px-3 py-1.5 font-medium text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white"
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="skillsCategoryPill"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  className="absolute inset-0 rounded-full bg-neutral-900 dark:bg-white shadow-sm -z-10"
                />
              )}
              <span>{cat.label}</span>
              <span
                className={cn(
                  "text-[10px] tabular-nums font-mono",
                  isActive ? "opacity-90" : "opacity-60"
                )}
              >
                ({cat.count})
              </span>
            </button>
          );
        })}
      </div>

      {/* 
        技能胶囊排布：
        1. 胶囊宽度自然贴合文本
        2. 统一手绘指示箭头同色系蓝色 (#3b82f6)
        3. 彻底隐藏内部滚动条 (no-scrollbar)
        4. 滚动容器左右两侧具有渐进式毛玻璃模糊渐隐遮罩
      */}
      <div className="pt-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 3 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -3 }}
            transition={{ duration: 0.18 }}
          >
            {isMultiRow ? (
              <div className="relative w-full overflow-hidden">
                {/* 滚动容器左侧渐进模糊遮罩 */}
                <div
                  className={cn(
                    "pointer-events-none absolute left-0 top-0 bottom-0 w-8 sm:w-12 z-20 transition-opacity duration-300",
                    "bg-gradient-to-r from-[var(--bg-page)] via-[var(--bg-page)]/80 to-transparent backdrop-blur-[1px]",
                    canScrollLeft ? "opacity-100" : "opacity-0"
                  )}
                  aria-hidden="true"
                />

                {/* 滚动容器右侧渐进模糊遮罩 */}
                <div
                  className={cn(
                    "pointer-events-none absolute right-0 top-0 bottom-0 w-8 sm:w-12 z-20 transition-opacity duration-300",
                    "bg-gradient-to-l from-[var(--bg-page)] via-[var(--bg-page)]/80 to-transparent backdrop-blur-[1px]",
                    canScrollRight ? "opacity-100" : "opacity-0"
                  )}
                  aria-hidden="true"
                />

                {/* 双排同步滚动容器 */}
                <div className="flex flex-col gap-2.5 py-1">
                  {/* 第一排 */}
                  <div
                    ref={row1Ref}
                    onScroll={() => handleScroll("row1")}
                    className="flex flex-nowrap items-center gap-2.5 overflow-x-auto no-scrollbar py-0.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                  >
                    {row1.map((skill) => renderCapsule(skill))}
                  </div>
                  {/* 第二排 */}
                  {row2.length > 0 && (
                    <div
                      ref={row2Ref}
                      onScroll={() => handleScroll("row2")}
                      className="flex flex-nowrap items-center gap-2.5 overflow-x-auto no-scrollbar py-0.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                    >
                      {row2.map((skill) => renderCapsule(skill))}
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex flex-wrap items-center gap-2.5 py-1">
                {currentSkills.map((skill) => renderCapsule(skill))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
