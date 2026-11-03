"use client";

import React from "react";
import { workExperiences } from "@/data/portfolio-data";
import { FadeBlurIn } from "@/components/ui/beui/motion-primitives";
import { Briefcase } from "lucide-react";

export function ExperienceScaffoldSection() {
  return (
    <section id="experience" className="w-full space-y-6 pt-4">
      {/* Section Header */}
      <FadeBlurIn className="flex flex-col gap-1">
        <div className="flex items-center gap-2 text-xs font-mono text-neutral-500 dark:text-neutral-400 uppercase tracking-widest">
          <Briefcase className="w-3.5 h-3.5 text-orange-500" />
          <span>Section 02 · Experience</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
          工作经历
        </h2>
        <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400">
          从摄影工作室学徒到视频团队负责人，8 年内容制作与团队管理沉淀
        </p>
      </FadeBlurIn>

      {/* Scaffold Placeholder Canvas (预留 beUI Timeline 或 Bouncy Accordion 插槽) */}
      <div className="relative rounded-2xl border-2 border-dashed border-neutral-200 dark:border-neutral-800 p-6 sm:p-8 bg-neutral-50/50 dark:bg-neutral-900/30">
        <div className="space-y-4">
          {/* Skeleton representation of Timeline Cards */}
          {workExperiences.slice(0, 2).map((exp, idx) => (
            <div
              key={exp.id}
              className="p-4 rounded-xl border border-neutral-200/80 dark:border-neutral-800 bg-white/70 dark:bg-neutral-900/60 backdrop-blur-sm space-y-2 opacity-85"
            >
              <div className="flex items-center justify-between">
                <span className="font-semibold text-sm text-neutral-800 dark:text-neutral-200">
                  {exp.company} · {exp.role}
                </span>
                <span className="text-xs font-mono text-neutral-400">
                  {exp.period}
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {exp.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 rounded text-[11px] font-mono bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Developer prompt / hint banner */}
        <div className="mt-6 pt-5 border-t border-dashed border-neutral-200 dark:border-neutral-800 text-center">
          <span className="inline-block text-xs font-mono text-neutral-400 dark:text-neutral-500 bg-neutral-100 dark:bg-neutral-800/80 px-3 py-1.5 rounded-full border border-neutral-200/60 dark:border-neutral-700/60">
            [ ExperienceScaffoldSection 预留槽：已就绪 workExperiences 数据字典，待接入 beUI Timeline 或 Bouncy Accordion ]
          </span>
        </div>
      </div>
    </section>
  );
}
