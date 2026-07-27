"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const [phase, setPhase] = useState<"startup" | "hero">("startup");

  const sectionRef = useRef<HTMLElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const vignetteRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  const startupRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const overlay = startupRef.current;
    const line = lineRef.current;
    if (!overlay || !line) return;

    const ctx = gsap.context(() => {
      gsap.set(overlay, { scaleY: 0.005, transformOrigin: "center center", opacity: 1 });
      gsap.set(line, { scaleX: 0, opacity: 0, transformOrigin: "center" });

      const tl = gsap.timeline({
        onComplete: () => setPhase("hero"),
      });

      tl.to(line, { scaleX: 1, opacity: 1, duration: 0.25, ease: "power2.out" })
        .to(overlay, { scaleY: 1, duration: 0.35, ease: "power2.inOut" }, "-=0.1")
        .to(overlay, { opacity: 0.6, duration: 0.04 })
        .to(overlay, { opacity: 1, duration: 0.04 })
        .to(overlay, { opacity: 0.7, duration: 0.03 })
        .to(overlay, { opacity: 1, duration: 0.05 })
        .to(overlay, { opacity: 0, duration: 0.25, ease: "power2.out" });
    });

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (phase !== "hero") return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        heroContentRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }
      );

      gsap.to(scrollRef.current, { opacity: 1, duration: 0.4, delay: 0.3 });
      gsap.to(scrollRef.current, {
        opacity: 0.3,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
        delay: 0.7,
      });
    });

    return () => ctx.revert();
  }, [phase]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
      tl.to([vignetteRef.current, glowRef.current], {
        opacity: 0,
        duration: 0.65,
      }, 0.3);
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="hero-tv min-h-[100dvh] flex flex-col items-center justify-center px-6 relative overflow-hidden"
    >
      <div
        ref={vignetteRef}
        className="absolute inset-0 z-1 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, transparent 50%, rgba(8, 30, 50, 0.65) 100%)",
        }}
      />
      <div
        ref={glowRef}
        className="absolute inset-0 z-1 pointer-events-none"
        style={{
          boxShadow: "inset 0 0 80px rgba(0, 150, 255, 0.06), inset 0 0 150px rgba(0, 100, 200, 0.03)",
        }}
      />
      <div
        ref={startupRef}
        className="absolute inset-0 z-20 pointer-events-none bg-black overflow-hidden"
      >
        <div
          ref={lineRef}
          className="absolute top-1/2 left-0 right-0 h-[2px] -translate-y-1/2 bg-white opacity-0"
          style={{
            boxShadow:
              "0 0 8px rgba(255,255,255,0.9), 0 0 30px rgba(100,200,255,0.5)",
          }}
        />
      </div>

      {phase === "hero" && (
        <div
          ref={heroContentRef}
          className="flex flex-col items-center opacity-0 relative z-10"
        >
          <h1 className="macro text-[clamp(2.5rem,8vw,8rem)] text-foreground text-center max-w-5xl leading-[1.15] tracking-[-0.04em]">
            从镜头后的创作者
            <br />
            到团队前的管理者
          </h1>
          <p className="micro text-muted mt-6 max-w-xl text-center leading-relaxed">
            现负责游戏留学行业视频内容体系搭建
          </p>
        </div>
      )}

      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none z-10"
        style={{
          background:
            "linear-gradient(to bottom, transparent 0%, rgba(0,150,255,0.07) 40%, rgba(0,100,200,0.03) 70%, transparent 100%)",
        }}
      />

      <div
        ref={scrollRef}
        className="absolute bottom-8 micro text-muted opacity-0 flex items-center gap-2 z-10"
      >
        <span>{`///`}</span>
        <span>SCROLL TO EXPLORE</span>
        <span>{`///`}</span>
      </div>
    </section>
  );
}
