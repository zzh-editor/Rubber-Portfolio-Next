"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SocialIconLinks from "@/components/SocialIconLinks";

gsap.registerPlugin(ScrollTrigger);

export default function ConnectSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(".connect-item", { willChange: "transform, opacity" });
      gsap.from(".connect-item", {
        opacity: 0,
        y: 20,
        duration: 0.5,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
        onComplete: () => gsap.set(".connect-item", { willChange: "auto" }),
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="connect" ref={sectionRef} className="py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="micro text-accent mb-8">{`/// CONNECT`}</div>

        <div className="grid md:grid-cols-2 border-2 border-foreground">
          <div className="connect-item border-b md:border-b-0 md:border-r border-foreground p-8 flex flex-col items-center justify-center gap-6 text-center">
            <p className="micro text-muted">在各个平台上找到我</p>
            <SocialIconLinks
              size="w-9 h-9"
              className="flex items-center justify-center gap-6"
            />
          </div>

          <a
            href="/Rubber-Resume.pdf"
            download="Rubber-Resume.pdf"
            className="connect-item download-resume-btn group relative p-8 flex items-center justify-center cursor-pointer overflow-hidden"
            aria-label="下载简历 PDF"
          >
            <div className="text-center">
              <div className="macro font-black text-accent animate-pulse-resume leading-none text-[clamp(1.75rem,4vw,3.25rem)] tracking-tight">
                下载简历
              </div>
              <div className="micro text-muted mt-3 group-hover:text-accent transition-colors">
                PDF · A4 · 641 KB
              </div>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
