"use client";

import React, { useRef, useEffect } from "react";
import { personalProfile } from "@/data/portfolio-data";

export function InteractiveDayNightWindow() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    const container = containerRef.current;
    if (!video || !container) return;

    let isIntersecting = false;
    let isGalleryOpen = false;

    const updatePlayback = () => {
      if (isIntersecting && !isGalleryOpen && !document.hidden) {
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        isIntersecting = entry.isIntersecting;
        updatePlayback();
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    const handleGalleryChange = (e: Event) => {
      const customEvent = e as CustomEvent<{ isOpen?: boolean }>;
      isGalleryOpen = !!customEvent.detail?.isOpen;
      updatePlayback();
    };

    const handleVisibilityChange = () => {
      updatePlayback();
    };

    window.addEventListener("gallery-visibility-change", handleGalleryChange);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      observer.disconnect();
      window.removeEventListener("gallery-visibility-change", handleGalleryChange);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full my-6 sm:my-8 select-none pointer-events-none flex items-center justify-center"
    >
      {/* 
        视频播放容器四周自带 Alpha 渐变遮罩：
        不依赖额外阴影/伪类图层效果，直接在容器自身衰减 Alpha 到底，
        视频内容进入外侧区域自然虚化，与背景底色无缝晕染融合，无任何生硬切边。
      */}
      <div className="relative w-full aspect-[16/9.5] sm:aspect-[16/9.2] video-container-alpha-mask">
        <video
          ref={videoRef}
          playsInline
          loop
          muted
          autoPlay
          preload="metadata"
          className="w-full h-full object-cover pointer-events-none"
        >
          <source src={personalProfile.assets.heroVideoWebm} type="video/webm" />
          <source src={personalProfile.assets.heroVideoMp4} type="video/mp4" />
        </video>
      </div>
    </div>
  );
}
