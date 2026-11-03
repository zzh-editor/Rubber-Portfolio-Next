import React from "react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { HeroIntro } from "@/components/hero/HeroIntro";
import { InteractiveDayNightWindow } from "@/components/hero/InteractiveDayNightWindow";
import { ProjectsScaffoldSection } from "@/components/sections/ProjectsScaffoldSection";
import { ExperienceScaffoldSection } from "@/components/sections/ExperienceScaffoldSection";
import { GalleryScaffoldSection } from "@/components/sections/GalleryScaffoldSection";
import { ConnectFooterSection } from "@/components/sections/ConnectFooterSection";

export default function Home() {
  return (
    <div className="relative w-full min-h-screen">
      {/* Floating Theme Switcher on the Right (Pure, clean, fully functional) */}
      <ThemeToggle />

      <main className="max-w-2xl mx-auto px-5 sm:px-8 pt-16 sm:pt-28 pb-16 sm:pb-24 space-y-10 sm:space-y-14">
        {/* Hero Section: Personal Bio Strictly Above Video */}
        <HeroIntro />

        {/* Hero Video: Pristine Video with 8-Bit/Halftone Dither Edge Dissolve Mask */}
        <InteractiveDayNightWindow />

        {/* Future Extensions: Scaffold Sections */}
        <ProjectsScaffoldSection />
        <ExperienceScaffoldSection />
        <GalleryScaffoldSection />
        <ConnectFooterSection />
      </main>
    </div>
  );
}
