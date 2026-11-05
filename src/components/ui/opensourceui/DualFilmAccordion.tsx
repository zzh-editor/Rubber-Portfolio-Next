"use client";

import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  useMemo,
  useTransition,
  useSyncExternalStore,
} from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, type Transition } from "motion/react";
import { Play, X, ChevronLeft, ChevronRight } from "lucide-react";
import { cn, getThumbSrc } from "@/lib/utils";
import { type ProjectItem } from "@/data/portfolio-data";
import {
  photoProjects,
  getRandomSixPhotos,
  DEFAULT_SIX_PHOTOS,
  type FilmPhotoCard,
  type PhotoProject,
} from "@/data/photography-data";

// 客户端安全快照（彻底解决 SSR/Hydration mismatch，同时保证每次刷新页面随机 6 张）
let clientRandomPhotosCache: FilmPhotoCard[] | null = null;
const emptySubscribe = () => () => {};

function useRandomSixPhotos(): FilmPhotoCard[] {
  return useSyncExternalStore(
    emptySubscribe,
    () => {
      if (!clientRandomPhotosCache) {
        clientRandomPhotosCache = getRandomSixPhotos();
      }
      return clientRandomPhotosCache;
    },
    () => DEFAULT_SIX_PHOTOS
  );
}

interface DualFilmAccordionProps {
  videoItems: ProjectItem[];
  className?: string;
}

// 一级胶囊横向手风琴弹性过渡（与工作板块 EXPAND_TRANSITION: bounce 0.32 同款参数）
const PILL_SPRING: Transition = {
  type: "spring",
  duration: 0.58,
  bounce: 0.32,
};

// 分批无限加载步长
const BATCH_SIZE = 36;

export function DualFilmAccordion({
  videoItems,
  className,
}: DualFilmAccordionProps) {
  // 当前展开的胶卷："video" 或 "photo"
  const [activeStrip, setActiveStrip] = useState<"video" | "photo">("video");

  // 胶卷随机 6 张代表作（通过 useSyncExternalStore 杜绝水合不一致）
  const randomPhotos = useRandomSixPhotos();

  // 多级画廊状态
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);

  // React Transition：胶囊高亮即刻更新（60fps 弹簧滑块），大列表更新分批执行，彻底解决卡顿
  const [, startTransition] = useTransition();

  // 一级分类："all" | "tws" | "personal"（即时状态）
  const [mainCategory, setMainCategory] = useState<"all" | "tws" | "personal">("all");
  // 二级分类（即时状态）
  const [twsSubCategory, setTwsSubCategory] = useState<string>("all");

  // 延迟状态（供计算 200+ 张照片大网格，不阻塞主线程动画）
  const [deferredMainCategory, setDeferredMainCategory] = useState<"all" | "tws" | "personal">("all");
  const [deferredTwsSubCategory, setDeferredTwsSubCategory] = useState<string>("all");

  // 流式分批渲染上限（初始首屏 24 张，滚动触底自动追加，彻底解决卡在 36 张与卡顿问题）
  const [renderLimit, setRenderLimit] = useState(BATCH_SIZE);

  // 照片墙滚动容器与流式加载触底哨兵
  const galleryScrollContainerRef = useRef<HTMLDivElement>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);

  // 移动端停留超 5s 提示手绘箭头
  const [showReturnHint, setShowReturnHint] = useState(false);

  // 用户交互时隐藏提示
  const handleUserActivity = useCallback(() => {
    setShowReturnHint(false);
  }, []);

  // 当前大图放大查看的照片在当前分类列表中的索引（null 为相册网格模式，number 为当前分类下的大图模式）
  const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null);

  // 全屏相册开启状态全局事件通知（用于让页面停止背景视频解码与 Three.js 动画循环，节省 GPU/CPU）
  useEffect(() => {
    window.dispatchEvent(
      new CustomEvent("gallery-visibility-change", {
        detail: { isOpen: isGalleryOpen },
      })
    );
    if (typeof document !== "undefined") {
      document.body.dataset.galleryOpen = isGalleryOpen ? "true" : "false";
    }
  }, [isGalleryOpen]);

  // 监听画廊打开状态以启动/清除 5 秒提示计时器（5秒内无操作则提示返回按钮）
  useEffect(() => {
    if (!isGalleryOpen) return;

    const timer = setTimeout(() => {
      setShowReturnHint(true);
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, [isGalleryOpen, activePhotoIndex]);

  // 一级胶囊切换处理（0 掉帧）
  const handleSelectMainCategory = useCallback(
    (catId: "all" | "tws" | "personal") => {
      setMainCategory(catId);
      setTwsSubCategory("all");
      setRenderLimit(BATCH_SIZE);
      galleryScrollContainerRef.current?.scrollTo({ top: 0, behavior: "instant" });
      setShowReturnHint(false);
      setActivePhotoIndex(null);
      startTransition(() => {
        setDeferredMainCategory(catId);
        setDeferredTwsSubCategory("all");
      });
    },
    [startTransition]
  );

  // 二级胶囊切换处理（0 掉帧）
  const handleSelectTwsSubCategory = useCallback(
    (subId: string) => {
      setTwsSubCategory(subId);
      setRenderLimit(BATCH_SIZE);
      galleryScrollContainerRef.current?.scrollTo({ top: 0, behavior: "instant" });
      setShowReturnHint(false);
      setActivePhotoIndex(null);
      startTransition(() => {
        setDeferredTwsSubCategory(subId);
      });
    },
    [startTransition]
  );

  // 切换胶卷展开项（依靠绝对锚定 + 容器 overflow-hidden 实现水平平滑物理裁切，绝无任何拉伸形变）
  const handleSwitchStrip = (target: "video" | "photo") => {
    if (activeStrip === target) return;
    setActiveStrip(target);
  };

  // 缩略图滚动容器引用（用于纯数学定位，消除 DOM 查询导致的 Forced Layout）
  const stripContainerRef = useRef<HTMLDivElement>(null);

  // 监听外部事件（例如工作板块 TodayWellSpent 的「👀 看看照片」按钮）
  useEffect(() => {
    const handleOpenGalleryEvent = (e: Event) => {
      const customEvent = e as CustomEvent<{ category?: "all" | "tws" | "personal" }>;
      setIsGalleryOpen(true);
      const cat = customEvent.detail?.category || "tws";
      handleSelectMainCategory(cat);
      setActivePhotoIndex(null);
    };

    window.addEventListener("open-gallery", handleOpenGalleryEvent);
    return () => {
      window.removeEventListener("open-gallery", handleOpenGalleryEvent);
    };
  }, [handleSelectMainCategory]);

  // 跑马灯无限循环列表
  const loopedVideos = [...videoItems, ...videoItems, ...videoItems];
  const loopedPhotos =
    randomPhotos.length > 0
      ? [...randomPhotos, ...randomPhotos, ...randomPhotos, ...randomPhotos]
      : [];

  // 计算当前分类下需要展示的照片列表（基于 deferred 状态，杜绝卡顿；灯箱中的图片亦与当前分类完全同步）
  const displayPhotos = useMemo(() => {
    const list: { project: PhotoProject; src: string; indexInProject: number }[] = [];

    let filteredProjects: PhotoProject[] = [];
    if (deferredMainCategory === "all") {
      filteredProjects = photoProjects;
    } else if (deferredMainCategory === "personal") {
      filteredProjects = photoProjects.filter((p) => p.group === "personal");
    } else if (deferredMainCategory === "tws") {
      if (deferredTwsSubCategory === "all") {
        filteredProjects = photoProjects.filter((p) => p.group === "tws");
      } else {
        filteredProjects = photoProjects.filter((p) => p.id === deferredTwsSubCategory);
      }
    }

    for (const proj of filteredProjects) {
      proj.photos.forEach((src, idx) => {
        list.push({ project: proj, src, indexInProject: idx });
      });
    }
    return list;
  }, [deferredMainCategory, deferredTwsSubCategory]);

  // 视口分批渲染列表（初始 24 张，触底流式无限加载）
  const visiblePhotos = useMemo(() => {
    return displayPhotos.slice(0, renderLimit);
  }, [displayPhotos, renderLimit]);

  // 哨兵触底加载监听：滚动到底部距离 300px 时自动加载下一批 24 张，全量无感流式加载
  useEffect(() => {
    if (!isGalleryOpen || activePhotoIndex !== null) return;
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setRenderLimit((prev) => {
            if (prev >= displayPhotos.length) return prev;
            return Math.min(prev + BATCH_SIZE, displayPhotos.length);
          });
        }
      },
      {
        root: galleryScrollContainerRef.current,
        rootMargin: "300px",
      }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [isGalleryOpen, activePhotoIndex, displayPhotos.length]);

  // 滚动触底流式加载（双重保险：不仅依靠 IntersectionObserver，在滚动时动态检测剩余高度，100% 灵敏追加下一批）
  const handleGalleryScroll = useCallback(
    (e: React.UIEvent<HTMLDivElement>) => {
      handleUserActivity();
      const target = e.currentTarget;
      if (target.scrollHeight - target.scrollTop - target.clientHeight < 600) {
        setRenderLimit((prev) => {
          if (prev >= displayPhotos.length) return prev;
          return Math.min(prev + BATCH_SIZE, displayPhotos.length);
        });
      }
    },
    [displayPhotos.length, handleUserActivity]
  );

  // 从主页照片胶卷点击任意图片：进入总照片墙网格（Level 2）
  const handleOpenGeneralGallery = () => {
    setIsGalleryOpen(true);
    handleSelectMainCategory("all");
    setActivePhotoIndex(null);
  };

  // 在照片墙中点击某张照片：进入基于当前分类的全量图片灯箱（Level 3）
  const handleSelectPhotoToLightbox = (indexInDisplay: number) => {
    setActivePhotoIndex(indexInDisplay);
    handleUserActivity();
  };

  // 上一张照片（当前分类内循环）
  const handlePrevPhoto = useCallback(() => {
    setActivePhotoIndex((prev) => {
      if (prev === null) return null;
      return prev === 0 ? displayPhotos.length - 1 : prev - 1;
    });
    handleUserActivity();
  }, [displayPhotos.length, handleUserActivity]);

  // 下一张照片（当前分类内循环）
  const handleNextPhoto = useCallback(() => {
    setActivePhotoIndex((prev) => {
      if (prev === null) return null;
      return prev === displayPhotos.length - 1 ? 0 : prev + 1;
    });
    handleUserActivity();
  }, [displayPhotos.length, handleUserActivity]);

  // 电影级胶带定位算法（纯数学固定间距计算，零 DOM 依赖，彻底消除 forced reflow 导致的掉帧）
  useEffect(() => {
    if (activePhotoIndex === null) return;

    const container = stripContainerRef.current;
    if (!container) return;

    const isSm = typeof window !== "undefined" && window.innerWidth >= 640;
    const itemWidth = (isSm ? 40 : 36) + 6; // size-9 (36px) / size-10 (40px) + gap-1.5 (6px)
    const targetLeft = Math.max(
      0,
      activePhotoIndex * itemWidth + (itemWidth - 6) / 2 - container.clientWidth / 2
    );

    container.scrollTo({
      left: targetLeft,
      behavior: "smooth",
    });
  }, [activePhotoIndex]);

  // 移动端灯箱触摸滑动手势支持
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      touchStartRef.current = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
      };
      handleUserActivity();
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStartRef.current || e.changedTouches.length === 0) return;
    const deltaX = e.changedTouches[0].clientX - touchStartRef.current.x;
    const deltaY = e.changedTouches[0].clientY - touchStartRef.current.y;
    touchStartRef.current = null;
    handleUserActivity();

    // 水平滑动距离 > 40px 且明显大于垂直位移
    if (Math.abs(deltaX) > 40 && Math.abs(deltaX) > Math.abs(deltaY) * 1.2) {
      if (deltaX < 0) {
        // 向左滑 -> 下一张
        handleNextPhoto();
      } else {
        // 向右滑 -> 上一张
        handlePrevPhoto();
      }
    }
  };

  // 键盘事件与一层一层后退机制（ESC 层级后退）
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isGalleryOpen) return;
      handleUserActivity();

      if (e.key === "Escape") {
        if (activePhotoIndex !== null) {
          // Level 3 -> Level 2：从大图退出到当前相册网格
          setActivePhotoIndex(null);
        } else {
          // Level 2 -> Level 1：从相册网格退出回到主页
          setIsGalleryOpen(false);
        }
      } else if (activePhotoIndex !== null) {
        // 大图模式下键盘左右箭头切图
        if (e.key === "ArrowLeft") {
          handlePrevPhoto();
        } else if (e.key === "ArrowRight") {
          handleNextPhoto();
        }
      }
    },
    [isGalleryOpen, activePhotoIndex, handlePrevPhoto, handleNextPhoto, handleUserActivity]
  );

  useEffect(() => {
    if (isGalleryOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isGalleryOpen, handleKeyDown]);

  // 当前大图对象（高清原图）
  const currentPhoto = activePhotoIndex !== null ? displayPhotos[activePhotoIndex] : null;

  return (
    <>
      {/* 
        双胶卷手风琴主体容器：
        左右两个胶卷常驻于 DOM 中，通过 layout 宽度插值实现真实推拉回弹，
        内部元素通过绝对尺寸固定，杜绝收缩时的横向非等比形变拉扁！
      */}
      <div
        className={cn(
          "w-full h-[216px] sm:h-[246px] flex items-stretch gap-2.5 sm:gap-3.5 select-none font-mono py-1 px-0.5",
          className
        )}
      >
        {/* ==================== 1. 左侧：视频胶卷 ==================== */}
        <div
          onClick={activeStrip !== "video" ? () => handleSwitchStrip("video") : undefined}
          className={cn(
            "h-full rounded-2xl select-none relative overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
            activeStrip === "video"
              ? "flex-1 min-w-[240px] bg-neutral-900 border border-neutral-800 shadow-md group cursor-default"
              : "w-14 sm:w-16 shrink-0 bg-gradient-to-b from-neutral-800 via-neutral-900 to-neutral-950 border border-neutral-700/80 cursor-pointer hover:border-neutral-500"
          )}
        >
          {/* 展开状态的 35mm 视频胶片带：完全展开后再渐显 (delay-[350ms])，避免半路展开卡片重叠闪烁 */}
          <div
            className={cn(
              "h-full w-[1400px] absolute left-0 top-0 flex flex-col justify-between py-3 pointer-events-auto",
              activeStrip === "video"
                ? "opacity-100 transition-opacity duration-250 delay-[350ms]"
                : "opacity-0 pointer-events-none transition-opacity duration-100 delay-0"
            )}
          >
            {/* 顶部齿孔条 */}
            <div className="flex items-center px-4 pb-2 overflow-hidden gap-3 border-b border-neutral-800/80 shrink-0">
              {Array.from({ length: 48 }).map((_, i) => (
                <div
                  key={`video-top-sprocket-${i}`}
                  className="h-2 w-1.5 shrink-0 rounded-xs bg-neutral-700/80 border border-neutral-600/30"
                />
              ))}
            </div>

            {/* 视频卡片无限循环滚动轨道（当全屏画廊开启时暂停 CSS 动画，节约 GPU 开销） */}
            <div className="relative w-full py-1 overflow-hidden my-auto">
              <div
                className={cn(
                  "flex gap-3.5 w-max animate-film-strip-marquee group-hover:[animation-play-state:paused]",
                  isGalleryOpen && "[animation-play-state:paused]"
                )}
              >
                {loopedVideos.map((item, idx) => (
                  <Link
                    key={`video-${item.id}-${idx}`}
                    href={item.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative block h-28 w-40 sm:h-32 sm:w-48 shrink-0 overflow-hidden rounded-xs border-2 border-neutral-800 bg-neutral-950 group/frame transition-all duration-300 hover:border-neutral-500 hover:scale-[1.02]"
                  >
                    <Image
                      src={item.imageSrc}
                      alt={item.title}
                      fill
                      sizes="(max-width: 640px) 160px, 192px"
                      className="object-cover transition-transform duration-500 group-hover/frame:scale-105"
                      decoding="async"
                    />

                    {/* 暗色浮层 */}
                    <div className="absolute inset-0 bg-black/45 opacity-0 group-hover/frame:opacity-100 transition-opacity duration-200 flex flex-col justify-between p-2">
                      <div className="self-end">
                        <span className="inline-block text-[9px] uppercase px-1.5 py-0.5 rounded-xs bg-white/20 backdrop-blur-xs text-white font-medium">
                          {item.platform}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 text-white">
                        <div className="flex size-5.5 items-center justify-center rounded-full bg-white/90 text-neutral-900 shadow-sm shrink-0">
                          <Play className="size-2.5 fill-current ml-0.5" />
                        </div>
                        <span className="text-xs font-sans font-medium line-clamp-1 drop-shadow-sm">
                          {item.title}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* 底部齿孔条 */}
            <div className="flex items-center px-4 pt-2 overflow-hidden gap-3 border-t border-neutral-800/80 shrink-0">
              {Array.from({ length: 48 }).map((_, i) => (
                <div
                  key={`video-bottom-sprocket-${i}`}
                  className="h-2 w-1.5 shrink-0 rounded-xs bg-neutral-700/80 border border-neutral-600/30"
                />
              ))}
            </div>
          </div>

          {/* 收起状态的刚性立体暗盒：严格锁死尺寸在最左侧，绝无任何拉伸形变 */}
          <div
            className={cn(
              "w-14 sm:w-16 h-full absolute left-0 top-0 flex flex-col items-center justify-between py-4 select-none pointer-events-none z-20",
              activeStrip === "video"
                ? "opacity-0 pointer-events-none transition-opacity duration-100 delay-0"
                : "opacity-100 transition-opacity duration-250 delay-[250ms]"
            )}
          >
            {/* 胶卷引带舌片（右侧微凸） */}
            <div className="absolute top-1/2 -translate-y-1/2 -right-1 w-1.5 h-9 bg-neutral-950/80 rounded-r-xs pointer-events-none" />

            {/* 顶部金属转钮 */}
            <div className="w-8 h-2 rounded-full bg-neutral-700 border border-neutral-600 shadow-inner shrink-0 flex items-center justify-center">
              <div className="w-2 h-1 rounded-full bg-neutral-900" />
            </div>

            {/* 纯净竖排大字：视频 */}
            <span className="my-auto text-sm sm:text-[15px] font-sans font-bold tracking-[0.3em] text-neutral-300 group-hover:text-white transition-colors [writing-mode:vertical-rl] select-none">
              视频
            </span>

            {/* 底部金属转钮 */}
            <div className="w-8 h-2 rounded-full bg-neutral-700 border border-neutral-600 shadow-inner shrink-0 flex items-center justify-center">
              <div className="w-2 h-1 rounded-full bg-neutral-900" />
            </div>
          </div>
        </div>

        {/* ==================== 2. 右侧：照片胶卷 ==================== */}
        <div
          onClick={activeStrip !== "photo" ? () => handleSwitchStrip("photo") : undefined}
          className={cn(
            "h-full rounded-2xl select-none relative overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
            activeStrip === "photo"
              ? "flex-1 min-w-[240px] bg-neutral-900 border border-neutral-800 shadow-md group cursor-default"
              : "w-14 sm:w-16 shrink-0 bg-gradient-to-b from-neutral-800 via-neutral-900 to-neutral-950 border border-neutral-700/80 cursor-pointer hover:border-neutral-500"
          )}
        >
          {/* 展开状态的 35mm 照片胶片带：固定右对齐 (right-0)，完全展开后再渐显 (delay-[350ms]) */}
          <div
            className={cn(
              "h-full w-[1400px] absolute right-0 top-0 flex flex-col justify-between py-3 pointer-events-auto",
              activeStrip === "photo"
                ? "opacity-100 transition-opacity duration-250 delay-[350ms]"
                : "opacity-0 pointer-events-none transition-opacity duration-100 delay-0"
            )}
          >
            {/* 顶部齿孔条 */}
            <div className="flex justify-end items-center px-4 pb-2 overflow-hidden gap-3 border-b border-neutral-800/80 shrink-0">
              {Array.from({ length: 48 }).map((_, i) => (
                <div
                  key={`photo-top-sprocket-${i}`}
                  className="h-2 w-1.5 shrink-0 rounded-xs bg-neutral-700/80 border border-neutral-600/30"
                />
              ))}
            </div>

            {/* 随机6张代表作无限循环滚动轨道（使用轻量 480px WebP 缩略图；全屏画廊开启时暂停动画） */}
            <div className="relative w-full py-1 overflow-hidden my-auto">
              <div
                className={cn(
                  "flex gap-3.5 w-max animate-film-strip-marquee group-hover:[animation-play-state:paused] justify-end",
                  isGalleryOpen && "[animation-play-state:paused]"
                )}
              >
                {loopedPhotos.map((card, idx) => (
                  <button
                    key={`photo-loop-${card.projectId}-${card.photoIndex}-${idx}`}
                    type="button"
                    onClick={handleOpenGeneralGallery}
                    className="relative block h-28 w-38 sm:h-32 sm:w-44 shrink-0 overflow-hidden rounded-xs border-2 border-neutral-800 bg-neutral-950 group/frame transition-all duration-300 hover:border-neutral-400 hover:scale-[1.02] cursor-pointer text-left"
                  >
                    <Image
                      src={getThumbSrc(card.coverSrc)}
                      alt={card.projectTitle}
                      fill
                      sizes="(max-width: 640px) 152px, 176px"
                      className="object-cover transition-transform duration-500 group-hover/frame:scale-105"
                      decoding="async"
                      onError={(e) => {
                        const t = e.currentTarget as HTMLImageElement;
                        if (t.src !== card.coverSrc) t.src = card.coverSrc;
                      }}
                    />

                    {/* 胶卷项目标签覆盖层 */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-0 group-hover/frame:opacity-100 transition-opacity duration-200 flex flex-col justify-end p-2.5">
                      <span className="text-xs font-sans font-medium text-white line-clamp-1 drop-shadow-sm">
                        {card.projectTitle}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* 底部齿孔条 */}
            <div className="flex justify-end items-center px-4 pt-2 overflow-hidden gap-3 border-t border-neutral-800/80 shrink-0">
              {Array.from({ length: 48 }).map((_, i) => (
                <div
                  key={`photo-bottom-sprocket-${i}`}
                  className="h-2 w-1.5 shrink-0 rounded-xs bg-neutral-700/80 border border-neutral-600/30"
                />
              ))}
            </div>
          </div>

          {/* 收起状态的刚性立体暗盒：严格锁死尺寸在最右侧，绝无任何拉伸形变 */}
          <div
            className={cn(
              "w-14 sm:w-16 h-full absolute right-0 top-0 flex flex-col items-center justify-between py-4 select-none pointer-events-none z-20",
              activeStrip === "photo"
                ? "opacity-0 pointer-events-none transition-opacity duration-100 delay-0"
                : "opacity-100 transition-opacity duration-250 delay-[250ms]"
            )}
          >
            {/* 胶卷引带舌片（左侧微凸） */}
            <div className="absolute top-1/2 -translate-y-1/2 -left-1 w-1.5 h-9 bg-neutral-950/80 rounded-l-xs pointer-events-none" />

            {/* 顶部金属转钮 */}
            <div className="w-8 h-2 rounded-full bg-neutral-700 border border-neutral-600 shadow-inner shrink-0 flex items-center justify-center">
              <div className="w-2 h-1 rounded-full bg-neutral-900" />
            </div>

            {/* 纯净竖排大字：照片 */}
            <span className="my-auto text-sm sm:text-[15px] font-sans font-bold tracking-[0.3em] text-neutral-300 group-hover:text-white transition-colors [writing-mode:vertical-rl] select-none">
              照片
            </span>

            {/* 底部金属转钮 */}
            <div className="w-8 h-2 rounded-full bg-neutral-700 border border-neutral-600 shadow-inner shrink-0 flex items-center justify-center">
              <div className="w-2 h-1 rounded-full bg-neutral-900" />
            </div>
          </div>
        </div>
      </div>

      {/* ==================== 3. 统一多级画廊系统（总照片墙 Level 2 / 单张大图灯箱 Level 3） ==================== */}
      <AnimatePresence>
        {isGalleryOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            style={{ willChange: "opacity" }}
            onClick={() => {
              if (activePhotoIndex !== null) {
                setActivePhotoIndex(null);
              } else {
                setIsGalleryOpen(false);
              }
            }}
            className="fixed inset-0 z-50 bg-neutral-50/[0.98] dark:bg-[#0c0c0c]/[0.98] text-neutral-900 dark:text-neutral-100 flex flex-col items-center justify-between pt-5 px-5 pb-5 sm:pt-8 sm:px-8 sm:pb-8 select-none overflow-hidden transition-colors"
          >
            {/* 
              顶部工具栏（h-9 sm:h-10，与 fixed top-5 right-5 sm:top-8 sm:right-8 的 ThemeToggle 垂直中轴线绝对水平对齐）：
              左侧标题（删掉返回按钮，纯文本展示），右侧照片数量与桌面端 X 关闭/返回按钮（与下一张按钮右对齐）
            */}
            <div
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-5xl h-9 sm:h-10 flex items-center justify-between mb-3.5 z-10 shrink-0"
            >
              {/* 左侧：标题（大图模式显示项目名称，画廊模式显示摄影作品·画廊，左侧无冗余返回按钮） */}
              <div className="flex items-center min-w-0">
                <span className="text-sm sm:text-base font-sans font-bold tracking-tight truncate max-w-[60vw] sm:max-w-xl">
                  {currentPhoto ? currentPhoto.project.title : "摄影作品 · 画廊"}
                </span>
              </div>

              {/* 右侧：照片数量统计与桌面端 X 关闭/返回按钮（与下方下一张照片按钮绝对右对齐）；移动端预留 w-9 占位让位于日夜切换按钮 */}
              <div className="flex items-center gap-3 shrink-0">
                {activePhotoIndex === null && (
                  <span className="text-xs font-mono text-neutral-500 dark:text-neutral-400 select-none hidden sm:inline">
                    {displayPhotos.length} 张照片
                  </span>
                )}
                <button
                  type="button"
                  onClick={() => {
                    if (activePhotoIndex !== null) {
                      setActivePhotoIndex(null);
                    } else {
                      setIsGalleryOpen(false);
                    }
                  }}
                  className="hidden sm:flex items-center justify-center size-10 rounded-full hover:bg-neutral-200 dark:hover:bg-neutral-800 text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors cursor-pointer"
                  aria-label={activePhotoIndex !== null ? "返回相册" : "关闭"}
                  title={activePhotoIndex !== null ? "返回相册" : "关闭"}
                >
                  <X className="size-5" />
                </button>
                {/* 移动端留白给 ThemeToggle，杜绝任何元素重叠 */}
                <div className="w-9 h-9 shrink-0 sm:hidden" />
              </div>
            </div>

            {/* 
              视图主体：
              Level 2: 总照片墙网格（一级分类：全部、TodayWellSpent、个人摄影；TWS 二级胶囊）
              Level 3: 单张大图灯箱放大查看（全量与当前分类完全同步）
            */}
            {activePhotoIndex === null ? (
              /* ==================== Level 2: 完整照片墙网格 ==================== */
              <div
                ref={galleryScrollContainerRef}
                onScroll={handleGalleryScroll}
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-5xl flex-1 overflow-y-auto my-auto py-1 flex flex-col scrollbar-none"
              >
                {/* 
                  一级分类胶囊：横向手风琴连体药丸条，使用 startTransition 彻底解决卡顿 
                */}
                <div className="inline-flex items-center p-1 rounded-full bg-neutral-100 dark:bg-neutral-800/90 border border-neutral-200/80 dark:border-neutral-700/80 shrink-0 self-start mb-2 overflow-x-auto scrollbar-none max-w-full">
                  {[
                    { id: "all" as const, label: "全部", count: 207 },
                    { id: "tws" as const, label: "TodayWellSpent", count: 197 },
                    { id: "personal" as const, label: "个人摄影", count: 10 },
                  ].map((cat) => {
                    const isActive = mainCategory === cat.id;
                    return (
                      <button
                        key={`main-cat-${cat.id}`}
                        type="button"
                        onClick={() => handleSelectMainCategory(cat.id)}
                        className={cn(
                          "relative rounded-full text-xs font-sans whitespace-nowrap transition-colors cursor-pointer select-none z-10 flex items-center gap-1.5",
                          isActive
                            ? "px-4 py-1.5 font-semibold text-white dark:text-neutral-900"
                            : "px-3 py-1.5 font-medium text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white"
                        )}
                      >
                        {isActive && (
                          <motion.div
                            layoutId="mainCategoryPill"
                            transition={PILL_SPRING}
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
                  TodayWellSpent 二级项目胶囊（与父胶囊统一为圆角 rounded-full，分两排排列） 
                */}
                <AnimatePresence>
                  {mainCategory === "tws" && (
                    <motion.div
                      initial={{ opacity: 0, height: 0, y: -4 }}
                      animate={{ opacity: 1, height: "auto", y: 0 }}
                      exit={{ opacity: 0, height: 0, y: -4 }}
                      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                      className="mb-3 shrink-0 overflow-hidden"
                    >
                      <div className="grid grid-rows-2 grid-flow-col auto-cols-max gap-1.5 overflow-x-auto scrollbar-none py-0.5 max-w-full">
                        <button
                          type="button"
                          onClick={() => handleSelectTwsSubCategory("all")}
                          className={cn(
                            "px-3 py-1 rounded-full text-xs font-sans whitespace-nowrap transition-all cursor-pointer text-left border",
                            twsSubCategory === "all"
                              ? "bg-neutral-800 text-white dark:bg-white dark:text-neutral-900 font-semibold border-transparent shadow-xs"
                              : "bg-neutral-100 dark:bg-neutral-800/80 text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white border-neutral-200/70 dark:border-neutral-700/70"
                          )}
                        >
                          全部 TWS 项目 (197)
                        </button>

                        {photoProjects
                          .filter((p) => p.group === "tws")
                          .map((p) => (
                            <button
                              key={`tws-sub-${p.id}`}
                              type="button"
                              onClick={() => handleSelectTwsSubCategory(p.id)}
                              className={cn(
                                "px-3 py-1 rounded-full text-xs font-sans whitespace-nowrap transition-all cursor-pointer text-left border",
                                twsSubCategory === p.id
                                  ? "bg-neutral-800 text-white dark:bg-white dark:text-neutral-900 font-semibold border-transparent shadow-xs"
                                  : "bg-neutral-100 dark:bg-neutral-800/80 text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white border-neutral-200/70 dark:border-neutral-700/70"
                              )}
                            >
                              {p.title} ({p.photos.length})
                            </button>
                          ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* 照片网格展示（使用 480px WebP 缩略图 + content-visibility 离屏跳过渲染 + decoding="async"） */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 pt-1">
                  {visiblePhotos.map((item, idx) => {
                    const thumbUrl = getThumbSrc(item.src);
                    return (
                      <button
                        key={`grid-photo-${item.project.id}-${item.indexInProject}-${idx}`}
                        type="button"
                        onClick={() => handleSelectPhotoToLightbox(idx)}
                        className="relative aspect-[4/3] rounded-lg overflow-hidden border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900 group transition-transform duration-300 will-change-transform hover:scale-[1.01] hover:border-neutral-400 cursor-pointer text-left shadow-2xs [content-visibility:auto] [contain-intrinsic-size:auto_280px]"
                      >
                        <Image
                          src={thumbUrl}
                          alt=""
                          fill
                          sizes="(max-width: 640px) 45vw, 220px"
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                          decoding="async"
                          loading={idx < 8 ? "eager" : "lazy"}
                          onError={(e) => {
                            const t = e.currentTarget as HTMLImageElement;
                            if (t.src !== item.src) t.src = item.src;
                          }}
                        />
                        {/* 项目名浮层 */}
                        <div className="absolute inset-x-0 bottom-0 p-1.5 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                          <span className="text-[11px] font-sans font-medium text-white truncate block drop-shadow-sm">
                            {item.project.title}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* 触底加载哨兵 */}
                <div ref={sentinelRef} className="h-10 w-full shrink-0" />
              </div>
            ) : (
              /* ==================== Level 3: 单张大图灯箱放大查看 ==================== */
              <div
                onClick={(e) => e.stopPropagation()}
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
                className="relative w-full max-w-5xl flex-1 flex items-center justify-center my-auto min-h-0"
              >
                {/* 居中大图核心区（仅大图加载高清原图） */}
                <div className="relative w-full max-w-4xl h-[66vh] max-h-[70vh] flex items-center justify-center mx-auto">
                  {currentPhoto && (
                    <Image
                      src={currentPhoto.src}
                      alt={`${currentPhoto.project.title} #${activePhotoIndex + 1}`}
                      fill
                      sizes="(max-width: 1024px) 95vw, 1000px"
                      className="object-contain drop-shadow-2xl rounded-sm select-none"
                      priority
                      decoding="async"
                    />
                  )}
                </div>

                {/* 上一张按钮（桌面端展示，左对齐 max-w-5xl 容器边缘，移动端隐藏改用滑动手势） */}
                <button
                  type="button"
                  onClick={handlePrevPhoto}
                  className="hidden sm:flex items-center justify-center size-10 rounded-full absolute left-0 top-1/2 -translate-y-1/2 hover:bg-neutral-200 dark:hover:bg-neutral-800 text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white transition-colors cursor-pointer z-20"
                  aria-label="上一张照片"
                >
                  <ChevronLeft className="size-6" />
                </button>

                {/* 下一张按钮（桌面端展示，与顶部 X 按钮严格右对齐，移动端隐藏改用滑动手势） */}
                <button
                  type="button"
                  onClick={handleNextPhoto}
                  className="hidden sm:flex items-center justify-center size-10 rounded-full absolute right-0 top-1/2 -translate-y-1/2 hover:bg-neutral-200 dark:hover:bg-neutral-800 text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white transition-colors cursor-pointer z-20"
                  aria-label="下一张照片"
                >
                  <ChevronRight className="size-6" />
                </button>

                {/* 仅在 Lightbox 模式下预加载相邻上一张与下一张的高清大图，避免一次性并发请求 */}
                {activePhotoIndex !== null && (
                  <div className="hidden pointer-events-none" aria-hidden="true">
                    {activePhotoIndex > 0 && (
                      <Image
                        src={displayPhotos[activePhotoIndex - 1].src}
                        alt=""
                        width={1}
                        height={1}
                        priority
                        decoding="async"
                      />
                    )}
                    {activePhotoIndex < displayPhotos.length - 1 && (
                      <Image
                        src={displayPhotos[activePhotoIndex + 1].src}
                        alt=""
                        width={1}
                        height={1}
                        priority
                        decoding="async"
                      />
                    )}
                  </div>
                )}
              </div>
            )}

            {/* 
              照片数量：居中显示在大图下方、胶带缩略图正上方（显示当前分类下的张数，如 4 / 207）
            */}
            {activePhotoIndex !== null && (
              <div className="w-full text-center text-xs font-mono text-neutral-500 dark:text-neutral-400 py-1 shrink-0 select-none">
                {activePhotoIndex + 1} / {displayPhotos.length}
              </div>
            )}

            {/* 
              在大图模式下，底部提供当前分类照片的横向胶带缩略图条：
              1. 虚拟切片渲染：当前索引前后各 15 张渲染轻量 WebP 缩略图，其余渲染轻量占位色块，杜绝 200+ 张图片同时挂载；
              2. 纯数学滚动定位：彻底消除 DOM 读取与 Forced Layout Thrashing！
            */}
            {activePhotoIndex !== null && (
              <div
                onClick={(e) => e.stopPropagation()}
                ref={stripContainerRef}
                className="w-full max-w-2xl overflow-x-auto py-1 shrink-0 flex items-center justify-start gap-1.5 scrollbar-none px-4 relative"
              >
                {displayPhotos.map((thumbItem, tIdx) => {
                  const isActive = tIdx === activePhotoIndex;
                  const isNear = Math.abs(tIdx - activePhotoIndex) <= 15;
                  const thumbUrl = getThumbSrc(thumbItem.src);

                  return (
                    <button
                      key={`thumb-${thumbItem.project.id}-${thumbItem.indexInProject}-${tIdx}`}
                      type="button"
                      onClick={() => {
                        setActivePhotoIndex(tIdx);
                        handleUserActivity();
                      }}
                      className={cn(
                        "relative size-9 sm:size-10 shrink-0 rounded-xs overflow-hidden transition-transform cursor-pointer",
                        isActive
                          ? "opacity-100 scale-105"
                          : "opacity-45 hover:opacity-85 border border-neutral-300 dark:border-neutral-800",
                        !isNear && "bg-neutral-200/50 dark:bg-neutral-800/50"
                      )}
                      aria-label={`查看第 ${tIdx + 1} 张照片`}
                    >
                      {isNear ? (
                        <Image
                          src={thumbUrl}
                          alt=""
                          fill
                          sizes="40px"
                          className="object-cover"
                          decoding="async"
                          loading="lazy"
                          onError={(e) => {
                            const t = e.currentTarget as HTMLImageElement;
                            if (t.src !== thumbItem.src) t.src = thumbItem.src;
                          }}
                        />
                      ) : null}
                      {/* 本地发光高亮框（锁死在当前缩略图内部，绝不可能跳出胶带范围） */}
                      {isActive && (
                        <div className="absolute inset-0 rounded-xs border-2 border-[#3b82f6] shadow-[0_0_8px_rgba(59,130,246,0.7)] pointer-events-none" />
                      )}
                    </button>
                  );
                })}
              </div>
            )}

            {/* 
              移动端专属常驻右下角悬浮返回按钮：
              1. 尺寸与样式完全复制日夜切换按钮（size-9 sm:size-10，暗色下带 border-white/15 微光细边框，杜绝黑色隐形）
              2. 垂直与日夜切换按钮严格右对齐 (right-5)
              3. 图标统一为标准的 X 图标
              4. 停留超过 5 秒提示：纯蓝色文本“点击返回”（无胶囊背景），手绘箭头精准扎向按钮顶部
            */}
            <div className="fixed bottom-6 right-5 sm:bottom-8 sm:right-8 sm:hidden z-[70] flex flex-col items-end pointer-events-auto">
              <AnimatePresence>
                {showReturnHint && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.85, y: 6 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.85, y: 6 }}
                    transition={{ duration: 0.25 }}
                    className="relative mb-2 mr-1 flex flex-col items-center select-none pointer-events-none"
                  >
                    {/* 纯蓝色文本，无胶囊背景 */}
                    <span className="text-xs font-sans font-semibold text-[#3b82f6] tracking-wide whitespace-nowrap drop-shadow-xs">
                      点击返回
                    </span>
                    {/* 手绘箭头弧线精准扎向右下角返回按钮 */}
                    <svg
                      width="36"
                      height="36"
                      viewBox="0 0 36 36"
                      fill="none"
                      className="text-[#3b82f6] mt-0.5 ml-3 select-none"
                    >
                      <path
                        d="M6 6 C 16 6, 28 14, 30 31"
                        stroke="currentColor"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                      />
                      <path
                        d="M23 26 C 27 29, 29 30, 30 31"
                        stroke="currentColor"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                      />
                      <path
                        d="M32 23 C 32 26, 31 29, 30 31"
                        stroke="currentColor"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                      />
                    </svg>
                  </motion.div>
                )}
              </AnimatePresence>

              <button
                type="button"
                onClick={() => {
                  setShowReturnHint(false);
                  if (activePhotoIndex !== null) {
                    setActivePhotoIndex(null);
                  } else {
                    setIsGalleryOpen(false);
                  }
                }}
                className={cn(
                  "relative flex items-center justify-center size-9 sm:size-10 rounded-full",
                  "border transition-all duration-300 cursor-pointer shadow-xs active:scale-95",
                  "bg-white/90 text-neutral-800 border-black/10 hover:border-black/20 hover:bg-white",
                  "dark:bg-neutral-900/90 dark:text-neutral-200 dark:border-white/15 dark:hover:border-white/30 dark:hover:bg-neutral-800"
                )}
                aria-label={activePhotoIndex !== null ? "返回相册" : "退出相册"}
                title={activePhotoIndex !== null ? "返回相册" : "退出相册"}
              >
                <X className="size-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
