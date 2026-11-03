import React from "react";
import { HeroIntro } from "@/components/hero/HeroIntro";
import { InteractiveDayNightWindow } from "@/components/hero/InteractiveDayNightWindow";
import { ProjectsScaffoldSection } from "@/components/sections/ProjectsScaffoldSection";
import { ExperienceScaffoldSection } from "@/components/sections/ExperienceScaffoldSection";
import { GalleryScaffoldSection } from "@/components/sections/GalleryScaffoldSection";
import { ConnectFooterSection } from "@/components/sections/ConnectFooterSection";

export default function Home() {
  return (
    <div className="w-full min-h-screen">
      <main className="max-w-2xl mx-auto px-5 sm:px-8 py-14 sm:py-24 space-y-16 sm:space-y-24">
        {/* Stage 4: Hero Top Introduction */}
        <HeroIntro />

        {/* Stage 4: Interactive Day/Night Blurred Window with Halftone Video */}
        <InteractiveDayNightWindow />

        {/* Stage 5: Scaffold Sections for Future Extensions */}
        <ProjectsScaffoldSection />
        <ExperienceScaffoldSection />
        <GalleryScaffoldSection />
        <ConnectFooterSection />
      </main>
    </div>
  );
}
