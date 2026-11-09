"use client";

import React from "react";
import { AnnotatedUnderline, RoughFilters } from "@/components/ui/annotated-text";

export function HeroIntro() {
  return (
    <div className="w-full text-left select-text space-y-4">
      {/* 注入手绘下划线滤镜 */}
      <RoughFilters />

      {/* 问候与姓名 */}
      <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
        👋 你好，我是张壮浩
      </h1>

      {/* 经历与目前状态 */}
      <div className="space-y-4 pt-1">
        <div className="text-[15px] sm:text-[16px] leading-relaxed text-neutral-600 dark:text-neutral-400 font-normal space-y-1">
          <p>
            从摄影工作室学徒到
            <AnnotatedUnderline>视频团队负责人</AnnotatedUnderline>
            ，用 8 年时间完成从执行到管理的跨越，
          </p>
          <p>
            一个脱离了信息茧房的人，具备极高的
            <AnnotatedUnderline>信息检索与学习能力</AnnotatedUnderline>
            ，审美在线；
          </p>
          <p>
            擅长将创意转化为可执行的标准流程，让团队产出
            <AnnotatedUnderline>既有质量又有效率</AnnotatedUnderline>
            。
          </p>
        </div>
        <p className="text-[15px] sm:text-[16px] leading-relaxed text-neutral-600 dark:text-neutral-400 font-normal">
          目前为游戏留学行业
          <AnnotatedUnderline>视频团队负责人</AnnotatedUnderline>
          。
        </p>
      </div>
    </div>
  );
}
