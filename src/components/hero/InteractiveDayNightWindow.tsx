"use client";

import React, { useRef, useEffect } from "react";
import { useTheme } from "@/components/ThemeProvider";
import { personalProfile } from "@/data/portfolio-data";
import { cn } from "@/lib/utils";

export function InteractiveDayNightWindow() {
  const { theme } = useTheme();
  const videoRef = useRef<HTMLVideoElement>(null);
  const isDark = theme === "dark";

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Autoplay policy fallback
      });
    }
  }, []);

  return (
    <div className="relative w-full my-6 sm:my-8 select-none flex items-center justify-center">
      {/* 
        1. Ambient Glow Layer (Behind Video)
        - In light mode: Ethereal morning sky glow (soft azure / cyan / warm halo like kshv.me)
        - In dark mode: Deep subtle ambient indigo/dark absorption
      */}
      <div
        className={cn(
          "absolute -inset-3 sm:-inset-6 rounded-[36px] blur-2xl pointer-events-none transition-all duration-700 -z-10",
          isDark
            ? "hero-glow-dark opacity-30"
            : "hero-glow-light opacity-90 scale-105"
        )}
      />

      {/* 
        2. Outer Frame Container 
        - Perfectly clean, no internal controls or text
        - Seamlessly blends into page canvas
      */}
      <div className="relative w-full aspect-[16/9.5] sm:aspect-[16/9.2] rounded-[24px] sm:rounded-[32px] overflow-hidden">
        {/* 
          3. Core Video Element
          - 100% clean, pristine, no center filters
          - Feathered boundary mask to dissolve harsh borders
        */}
        <div className="relative w-full h-full video-feather-dissolve">
          <video
            ref={videoRef}
            playsInline
            loop
            muted
            autoPlay
            preload="auto"
            className="w-full h-full object-cover transition-opacity duration-500"
          >
            <source src={personalProfile.assets.heroVideoWebm} type="video/webm" />
            <source src={personalProfile.assets.heroVideoMp4} type="video/mp4" />
          </video>
        </div>

        {/* 
          4. 8-Bit / Halftone Dither Edge Dissolve Mask
          - Strictly transparent at the center (0% - 55%) so the video is pristine
          - Dither matrix only dissolves at the outer rim (55% - 92%)
          - In dark mode: merges video into pitch black with pixelated dither dots
          - In light mode: merges video into soft bright glow with delicate halftone dots
        */}
        <div
          className={cn(
            "absolute inset-0 pointer-events-none dither-edge-mask transition-opacity duration-700",
            isDark
              ? "dither-matrix-dense text-black opacity-85"
              : "dither-matrix-dense text-white opacity-80 mix-blend-screen"
          )}
        />

        {/* 
          5. Secondary Micro Dither Layer for authentic CRT/Gameboy raster blend
        */}
        <div
          className={cn(
            "absolute inset-0 pointer-events-none dither-edge-mask transition-opacity duration-700",
            isDark
              ? "dither-matrix-medium text-black opacity-60"
              : "dither-matrix-medium text-sky-100 opacity-50 mix-blend-overlay"
          )}
        />

        {/* 
          6. Vignette Outer Shade to soften boundary transition
        */}
        <div
          className={cn(
            "absolute inset-0 pointer-events-none transition-colors duration-700",
            isDark
              ? "shadow-[inset_0_0_60px_rgba(0,0,0,0.85)]"
              : "shadow-[inset_0_0_50px_rgba(255,255,255,0.7)]"
          )}
        />
      </div>
    </div>
  );
}
