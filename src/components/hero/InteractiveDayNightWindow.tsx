"use client";

import React, { useRef, useState, useEffect } from "react";
import { useTheme } from "@/components/ThemeProvider";
import { personalProfile } from "@/data/portfolio-data";
import {
  Sun,
  Moon,
  Volume2,
  VolumeX,
  Play,
  Pause,
  Grid,
  Maximize2,
} from "lucide-react";
import { cn } from "@/lib/utils";

export function InteractiveDayNightWindow() {
  const { theme, toggleTheme } = useTheme();
  const videoRef = useRef<HTMLVideoElement>(null);

  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [ditherEnabled, setDitherEnabled] = useState<boolean>(true);
  const [ditherDensity, setDitherDensity] = useState<"standard" | "fine">("standard");
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isReady, setIsReady] = useState<boolean>(false);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {
        // Autoplay may be restricted if unmuted, muted autoplay usually works
        setIsPlaying(false);
      });
    }
  }, []);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleSound = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const toggleDither = () => {
    setDitherEnabled((prev) => !prev);
  };

  const toggleDensity = () => {
    setDitherDensity((prev) => (prev === "standard" ? "fine" : "standard"));
  };

  const handleFullscreen = () => {
    if (!videoRef.current) return;
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    }
  };

  const isDark = theme === "dark";

  return (
    <div
      className="relative w-full my-4 select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Hidden SVG Filter for microscopic organic turbulence */}
      <svg className="absolute w-0 h-0 pointer-events-none" aria-hidden="true">
        <defs>
          <filter id="subtle-grain">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.85"
              numOctaves="3"
              stitchTiles="stitch"
            />
            <feColorMatrix type="saturate" values="0" />
            <feComponentTransfer>
              <feFuncA type="linear" slope="0.04" />
            </feComponentTransfer>
          </filter>
        </defs>
      </svg>

      {/* Outer blurred halo frame (双层毛玻璃容器) */}
      <div
        className={cn(
          "relative rounded-[28px] p-2 sm:p-3 transition-all duration-700",
          "backdrop-blur-xl",
          isDark
            ? "bg-white/[0.04] border border-white/[0.12] shadow-[0_24px_70px_-15px_rgba(0,0,0,0.7)]"
            : "bg-white/50 border border-black/[0.08] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.12)]"
        )}
      >
        {/* Ambient environmental refraction glow layer */}
        <div
          className={cn(
            "absolute -inset-0.5 rounded-[30px] opacity-75 blur-lg pointer-events-none transition-opacity duration-700 -z-10",
            isDark
              ? "bg-gradient-to-tr from-indigo-500/25 via-purple-500/10 to-cyan-500/15"
              : "bg-gradient-to-tr from-amber-300/35 via-orange-200/20 to-sky-200/25"
          )}
        />

        {/* Inner Video Container */}
        <div className="relative w-full aspect-[16/9] sm:aspect-[16/9.5] rounded-[20px] overflow-hidden bg-black/90">
          {/* Main Video Element */}
          <video
            ref={videoRef}
            playsInline
            loop
            muted={isMuted}
            autoPlay
            onCanPlay={() => setIsReady(true)}
            className="w-full h-full object-cover transition-transform duration-700"
          >
            <source src={personalProfile.assets.heroVideoWebm} type="video/webm" />
            <source src={personalProfile.assets.heroVideoMp4} type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          {/* Halftone / Dither Layer */}
          {ditherEnabled && (
            <div
              className={cn(
                "absolute inset-0 pointer-events-none mix-blend-overlay transition-opacity duration-500",
                isDark ? "text-white opacity-45" : "text-black opacity-35",
                ditherDensity === "standard" ? "dither-grid-4" : "dither-grid-3"
              )}
            />
          )}

          {/* Organic Grain Micro-Texture */}
          <div
            className="absolute inset-0 pointer-events-none mix-blend-color-dodge opacity-25"
            style={{ filter: "url(#subtle-grain)" }}
          />

          {/* Vignette & Soft Edge Mask */}
          <div className="absolute inset-0 pointer-events-none video-vignette-mask shadow-[inset_0_0_80px_rgba(0,0,0,0.65)]" />

          {/* Top Floating Mini-Bar: Time / Mode / Status */}
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-20 pointer-events-none">
            {/* Left Tag */}
            <div className="pointer-events-auto flex items-center gap-2 px-2.5 py-1 rounded-full text-[11px] font-mono backdrop-blur-md bg-black/40 text-white/90 border border-white/10 shadow-sm">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
              </span>
              <span>{isDark ? "NIGHT VIEW" : "DAYLIGHT"}</span>
              <span className="text-white/40">·</span>
              <span className="text-white/70">
                {ditherEnabled ? `DITHER ${ditherDensity.toUpperCase()}` : "RAW"}
              </span>
            </div>

            {/* Right Quick Controls */}
            <div className="pointer-events-auto flex items-center gap-1.5">
              {/* Day / Night Theme Button */}
              <button
                type="button"
                onClick={toggleTheme}
                title={isDark ? "切换为日间模式 (Day)" : "切换为夜间模式 (Night)"}
                className={cn(
                  "p-1.5 rounded-full backdrop-blur-md text-white transition-all cursor-pointer shadow-sm",
                  "bg-black/45 hover:bg-black/70 border border-white/15 hover:scale-105 active:scale-95"
                )}
              >
                {isDark ? (
                  <Moon className="w-3.5 h-3.5 text-indigo-300" />
                ) : (
                  <Sun className="w-3.5 h-3.5 text-amber-300" />
                )}
              </button>

              {/* Dither On/Off Toggle Button */}
              <button
                type="button"
                onClick={toggleDither}
                title={ditherEnabled ? "关闭半调网点" : "开启半调网点"}
                className={cn(
                  "p-1.5 rounded-full backdrop-blur-md text-white transition-all cursor-pointer shadow-sm",
                  ditherEnabled
                    ? "bg-orange-500/80 border border-orange-400/40 text-white"
                    : "bg-black/45 hover:bg-black/70 border border-white/15 text-white/60",
                  "hover:scale-105 active:scale-95"
                )}
              >
                <Grid className="w-3.5 h-3.5" />
              </button>

              {/* Dither Density switch (only visible if enabled) */}
              {ditherEnabled && (
                <button
                  type="button"
                  onClick={toggleDensity}
                  title="切换网点密度 (4px / 3px)"
                  className="px-2 py-1 rounded-full backdrop-blur-md text-[10px] font-mono text-white/90 bg-black/45 hover:bg-black/70 border border-white/15 transition-all hover:scale-105 active:scale-95 cursor-pointer"
                >
                  {ditherDensity === "standard" ? "4PX" : "3PX"}
                </button>
              )}
            </div>
          </div>

          {/* Bottom Floating Controls: Play/Pause, Sound, Fullscreen */}
          <div
            className={cn(
              "absolute bottom-3 left-3 right-3 flex items-center justify-between z-20 transition-opacity duration-300",
              isHovered || !isPlaying ? "opacity-100" : "opacity-0 sm:opacity-75"
            )}
          >
            {/* Play/Pause & Audio */}
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={togglePlay}
                title={isPlaying ? "暂停" : "播放"}
                className="p-1.5 rounded-full backdrop-blur-md text-white bg-black/50 hover:bg-black/75 border border-white/15 transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-sm"
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 ml-0.5" />}
              </button>

              <button
                type="button"
                onClick={toggleSound}
                title={isMuted ? "开启声音" : "静音"}
                className="p-1.5 rounded-full backdrop-blur-md text-white bg-black/50 hover:bg-black/75 border border-white/15 transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-sm"
              >
                {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
              </button>
            </div>

            {/* Right: Fullscreen trigger */}
            <button
              type="button"
              onClick={handleFullscreen}
              title="全屏播放"
              className="p-1.5 rounded-full backdrop-blur-md text-white/80 hover:text-white bg-black/50 hover:bg-black/75 border border-white/15 transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-sm"
            >
              <Maximize2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
