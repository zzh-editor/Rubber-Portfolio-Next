"use client";

import React from "react";
import { galleryItems, personalProfile } from "@/data/portfolio-data";
import { FadeBlurIn } from "@/components/ui/beui/motion-primitives";
import { Camera } from "lucide-react";
import { StickyNotePolaroidFrame } from "@/components/ui/opensourceui/StickyNotePolaroidFrame";

export function GalleryScaffoldSection() {
  return (
    <section id="gallery" className="w-full space-y-6 pt-4">
      {/* Section Header */}
      <FadeBlurIn className="flex flex-col gap-1">
        <div className="flex items-center gap-2 text-xs font-mono text-neutral-500 dark:text-neutral-400 uppercase tracking-widest">
          <Camera className="w-3.5 h-3.5 text-orange-500" />
          <span>Section 03 · Gallery</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
          影像日常 / Polaroid Wall
        </h2>
        <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400">
          胶片记录、日常随拍与视听灵感碎片（共 {galleryItems.length} 组画廊素材与 {personalProfile.assets.aboutPhotos.length} 张个人影像）
        </p>
      </FadeBlurIn>

      {/* Scaffold Placeholder Canvas (预留 StickyNotePolaroidFrame 插槽) */}
      <div className="relative rounded-2xl border-2 border-dashed border-neutral-200 dark:border-neutral-800 p-6 sm:p-8 bg-neutral-50/50 dark:bg-neutral-900/30">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          <StickyNotePolaroidFrame
            skeleton
            rotation={-2}
            aspectRatio="square"
            caption="日常随拍 · 01"
          />
          <StickyNotePolaroidFrame
            skeleton
            rotation={1.5}
            aspectRatio="square"
            caption="胶片切片 · 02"
          />
          <StickyNotePolaroidFrame
            skeleton
            rotation={-1}
            aspectRatio="square"
            caption="光影记录 · 03"
            className="hidden sm:block"
          />
        </div>

        {/* Developer prompt / hint banner */}
        <div className="mt-6 pt-5 border-t border-dashed border-neutral-200 dark:border-neutral-800 text-center">
          <span className="inline-block text-xs font-mono text-neutral-400 dark:text-neutral-500 bg-neutral-100 dark:bg-neutral-800/80 px-3 py-1.5 rounded-full border border-neutral-200/60 dark:border-neutral-700/60">
            [ GalleryScaffoldSection 预留槽：关联 galleryItems 与 personalProfile.assets.aboutPhotos 瀑布流 / 宝丽来展示 ]
          </span>
        </div>
      </div>
    </section>
  );
}
