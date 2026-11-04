"use client";

import React, { useRef, useEffect } from "react";
import { personalProfile } from "@/data/portfolio-data";

export function InteractiveDayNightWindow() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, []);

  return (
    <div className="relative w-full my-6 sm:my-8 select-none pointer-events-none flex items-center justify-center">
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
          preload="auto"
          className="w-full h-full object-cover pointer-events-none"
        >
          <source src={personalProfile.assets.heroVideoWebm} type="video/webm" />
          <source src={personalProfile.assets.heroVideoMp4} type="video/mp4" />
        </video>
      </div>
    </div>
  );
}
