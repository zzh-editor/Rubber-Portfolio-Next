import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import TimelineSection from "@/components/TimelineSection";
import ProjectPreviewSection from "@/components/ProjectPreviewSection";
import ConnectSection from "@/components/ConnectSection";

export default function Home() {
  return (
    <>
      <div id="scanline" aria-hidden="true" />
      <HeroSection />
      <AboutSection />
      <TimelineSection />
      <ProjectPreviewSection />
      <ConnectSection />
    </>
  );
}
