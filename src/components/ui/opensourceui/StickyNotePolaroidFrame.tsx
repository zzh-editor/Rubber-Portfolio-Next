"use client";

import React from "react";
import Image from "next/image";
import { cn } from "@/lib/cn";

export interface StickyNotePolaroidFrameProps {
  imageSrc?: string;
  imageAlt?: string;
  caption?: string;
  subCaption?: string;
  tapeColor?: string;
  tapePosition?: "top-center" | "top-left" | "top-right";
  rotation?: number; // e.g. -2, 1, 3 degrees
  skeleton?: boolean;
  className?: string;
  aspectRatio?: "square" | "video" | "portrait";
  onClick?: () => void;
}

export function StickyNotePolaroidFrame({
  imageSrc,
  imageAlt = "Polaroid snapshot",
  caption,
  subCaption,
  tapeColor = "bg-amber-100/70 dark:bg-amber-300/30",
  tapePosition = "top-center",
  rotation = 0,
  skeleton = false,
  className,
  aspectRatio = "video",
  onClick,
}: StickyNotePolaroidFrameProps) {
  const tapePositionClasses = {
    "top-center": "-top-3 left-1/2 -translate-x-1/2 -rotate-1",
    "top-left": "-top-3 left-6 -rotate-6",
    "top-right": "-top-3 right-6 rotate-6",
  };

  const aspectClasses = {
    square: "aspect-square",
    video: "aspect-[16/10]",
    portrait: "aspect-[4/5]",
  };

  return (
    <div
      onClick={onClick}
      style={{ transform: `rotate(${rotation}deg)` }}
      className={cn(
        "group relative p-3 pb-5 transition-transform duration-300 hover:rotate-0 hover:scale-[1.02]",
        "bg-white dark:bg-[#181818] border border-neutral-200/90 dark:border-neutral-800 shadow-md hover:shadow-xl rounded-sm",
        className
      )}
    >
      {/* Semi-transparent tape sticker */}
      <div
        className={cn(
          "absolute h-6 w-16 backdrop-blur-[2px] shadow-sm z-10 pointer-events-none border border-black/5 dark:border-white/10",
          tapeColor,
          tapePositionClasses[tapePosition]
        )}
      />

      {/* Frame content */}
      <div
        className={cn(
          "relative w-full overflow-hidden bg-neutral-100 dark:bg-neutral-900",
          aspectClasses[aspectRatio]
        )}
      >
        {skeleton ? (
          <div className="w-full h-full animate-pulse bg-gradient-to-tr from-neutral-200/60 to-neutral-300/60 dark:from-neutral-800/80 dark:to-neutral-700/60 flex items-center justify-center">
            <span className="text-xs text-neutral-400 font-mono tracking-wider">
              [ SLOT RESERVED ]
            </span>
          </div>
        ) : imageSrc ? (
          <div className="relative w-full h-full">
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              sizes="(max-width: 768px) 100vw, 600px"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        ) : null}
      </div>

      {/* Polaroid bottom caption */}
      <div className="mt-3 px-1 flex flex-col">
        {skeleton ? (
          <div className="space-y-1.5 pt-1">
            <div className="h-3 w-3/4 rounded bg-neutral-200 dark:bg-neutral-800 animate-pulse" />
            <div className="h-2 w-1/2 rounded bg-neutral-200/60 dark:bg-neutral-800/60 animate-pulse" />
          </div>
        ) : (
          <>
            {caption && (
              <span className="text-[13px] font-medium text-neutral-800 dark:text-neutral-200 line-clamp-1">
                {caption}
              </span>
            )}
            {subCaption && (
              <span className="text-[11px] text-neutral-500 dark:text-neutral-400 line-clamp-1 font-mono mt-0.5">
                {subCaption}
              </span>
            )}
          </>
        )}
      </div>
    </div>
  );
}
