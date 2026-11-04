"use client";

import React from "react";
import { projectsPage } from "@/data/portfolio-data";
import { DualFilmAccordion } from "@/components/ui/opensourceui/DualFilmAccordion";

export function ProjectsScaffoldSection() {
  return (
    <section id="projects" className="w-full space-y-4 pt-2">
      {/* 标题 */}
      <div>
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
          项目
        </h2>
      </div>

      {/* 双 35mm 胶卷手风琴交互组件（视频/照片胶卷左右并排、丝滑弹簧推拉回弹、随机 6 张循环轮播、精简项目画廊灯箱） */}
      <DualFilmAccordion videoItems={projectsPage.items} />
    </section>
  );
}
