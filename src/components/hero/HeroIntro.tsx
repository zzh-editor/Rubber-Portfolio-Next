"use client";

import React from "react";

export function HeroIntro() {
  return (
    <div className="w-full text-left select-text space-y-4">
      {/* 问候与姓名 */}
      <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
        👋 你好，我是张壮浩
      </h1>

      {/* 经历与目前状态 */}
      <div className="space-y-4 pt-1">
        <div className="text-[15px] sm:text-[16px] leading-relaxed text-neutral-600 dark:text-neutral-400 font-normal space-y-1">
          <p>从摄影工作室学徒到视频团队负责人，用 8 年时间完成从执行到管理的跨越，</p>
          <p>一个脱离了信息茧房的人，具备极高的信息检索与学习能力，审美在线；</p>
          <p>擅长将创意转化为可执行的标准流程，让团队产出既有质量又有效率。</p>
        </div>
        <p className="text-[15px] sm:text-[16px] leading-relaxed text-neutral-600 dark:text-neutral-400 font-normal">
          目前为游戏留学行业视频团队负责人。
        </p>
      </div>
    </div>
  );
}
