"use client";

import React from "react";
import { projectsPage } from "@/data/portfolio-data";
import { StickyNotePolaroidFrame } from "@/components/ui/opensourceui/StickyNotePolaroidFrame";
import { FadeBlurIn } from "@/components/ui/beui/motion-primitives";
import { FolderGit2 } from "lucide-react";

export function ProjectsScaffoldSection() {
  return (
    <section id="projects" className="w-full space-y-6 pt-4">
      {/* Section Header */}
      <FadeBlurIn className="flex flex-col gap-1">
        <div className="flex items-center gap-2 text-xs font-mono text-neutral-500 dark:text-neutral-400 uppercase tracking-widest">
          <FolderGit2 className="w-3.5 h-3.5 text-orange-500" />
          <span>Section 01 · Projects</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
          {projectsPage.title}
        </h2>
        <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400">
          {projectsPage.subtitle}
        </p>
      </FadeBlurIn>

      {/* Scaffold Placeholder Canvas (预留 StickyNotePolaroidFrame + beUI 插槽) */}
      <div className="relative rounded-2xl border-2 border-dashed border-neutral-200 dark:border-neutral-800 p-6 sm:p-8 bg-neutral-50/50 dark:bg-neutral-900/30">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Example 1: Polaroid Frame in Skeleton/Preview Mode */}
          <StickyNotePolaroidFrame
            skeleton
            rotation={-1.5}
            caption="巴西战舞神经科学工作坊"
            subCaption="VIMEO · 2024"
          />

          {/* Example 2: Polaroid Frame in Skeleton/Preview Mode */}
          <StickyNotePolaroidFrame
            skeleton
            rotation={1.2}
            caption="低苦艾乐队 2023 巡演 上海站"
            subCaption="BILIBILI · 2023"
          />
        </div>

        {/* Developer prompt / hint banner */}
        <div className="mt-6 pt-5 border-t border-dashed border-neutral-200 dark:border-neutral-800 text-center">
          <span className="inline-block text-xs font-mono text-neutral-400 dark:text-neutral-500 bg-neutral-100 dark:bg-neutral-800/80 px-3 py-1.5 rounded-full border border-neutral-200/60 dark:border-neutral-700/60">
            [ ProjectsScaffoldSection 预留槽：可直接映射 portfolio-data.ts 中的 projectsPage.items ]
          </span>
        </div>
      </div>
    </section>
  );
}
