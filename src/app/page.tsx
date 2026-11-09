import React from "react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { HeroIntro } from "@/components/hero/HeroIntro";
import { InteractiveDayNightWindow } from "@/components/hero/InteractiveDayNightWindow";
import { ExperienceScaffoldSection } from "@/components/sections/ExperienceScaffoldSection";
import { ProjectsScaffoldSection } from "@/components/sections/ProjectsScaffoldSection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { CrumpledPaperFooter } from "@/components/footer/CrumpledPaperFooter";

export default function Home() {
  return (
    <div className="relative w-full min-h-screen">
      {/* 右上角 beUI View Transition 日夜切换按钮 (Circle-Blur 动效) */}
      <ThemeToggle />

      <main className="max-w-2xl mx-auto px-5 sm:px-8 pt-16 sm:pt-28 pb-20 sm:pb-32 space-y-12 sm:space-y-14">
        {/* Hero Section: Personal Bio Strictly Above Video */}
        <HeroIntro />

        {/* Hero Video: Natural Video with Zero-Line Alpha Mask */}
        <InteractiveDayNightWindow />

        {/* 1. 工作 (Bouncy Accordion) */}
        <ExperienceScaffoldSection />

        {/* 2. 项目 (35mm Film Strip) */}
        <ProjectsScaffoldSection />

        {/* 3. 技能 (Skills - Resource Links Panel) */}
        <SkillsSection />
      </main>

      {/* 滚动至底部技能板块时滚入的折痕纸团及 Contact Profile 纸张 */}
      <CrumpledPaperFooter />
    </div>
  );
}
