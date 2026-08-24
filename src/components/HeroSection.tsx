"use client";

import React, { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { useHoverCapable } from "@/lib/hooks/use-hover-capable";

export interface HeroSectionProps {
  topWord?: string;
  rightWord?: string;
  bottomWord?: string;
  accentColor?: string;
  textColor?: string;
  backgroundColor?: string;
  className?: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  topWord = "creating",
  rightWord = "your",
  bottomWord = "story",
  accentColor = "#f97316",
  textColor = "#000000",
  backgroundColor = "#fafafa",
  className = "",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canHover = useHoverCapable();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const videoScaleDesktop = useTransform(scrollYProgress, [0, 0.8], [1, 1.7]);
  const videoScaleMobile = useTransform(scrollYProgress, [0, 0.8], [1, 1.35]);
  const videoScale = canHover ? videoScaleDesktop : videoScaleMobile;
  const videoBorderRadiusDesktop = useTransform(scrollYProgress, [0, 0.5], [20, 0]);
  // 移动端固定圆角，不做 borderRadius 动画（paint 开销大）
  const videoBorderRadius: number | ReturnType<typeof useTransform<number, number>> = canHover
    ? videoBorderRadiusDesktop
    : (12 as unknown as ReturnType<typeof useTransform<number, number>>);
  const textY = useTransform(scrollYProgress, [0, 0.4], [0, -120]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.35], [1, 0]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={`relative w-full ${className}`}
      style={{ background: backgroundColor }}
    >
      <section
        ref={containerRef}
        className="relative h-[200vh] min-h-[800px] w-full select-none"
        style={{ contain: "layout paint" } as React.CSSProperties}
      >
        <div
          className="sticky top-0 h-screen w-full overflow-hidden"
          style={{ contain: "layout paint", transform: "translateZ(0)" } as React.CSSProperties}
        >
          <motion.div
            className="absolute z-20 overflow-hidden"
            style={{
              top: "20%",
              bottom: "20%",
              left: "15%",
              right: "15%",
              scale: videoScale,
              borderRadius: videoBorderRadius as unknown as number,
              willChange: "transform",
              contain: "layout paint",
              transform: "translateZ(0)",
            } as unknown as React.CSSProperties}
          >
            <video
              ref={videoRef}
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
            >
              <source src="/hero.webm" type="video/webm" />
              <source src="/hero.mp4" type="video/mp4" />
            </video>
          </motion.div>

          <motion.div
            className="absolute inset-0 z-30 pointer-events-none flex flex-col justify-between"
            style={
              {
                y: textY,
                opacity: textOpacity,
                willChange: "transform, opacity",
                contain: "layout paint",
                transform: "translateZ(0)",
              } as unknown as React.CSSProperties
            }
          >
            <div className="absolute top-[3%] inset-x-0 flex justify-center">
              <span
                className="font-black tracking-tighter leading-none select-none text-center"
                style={{
                  color: accentColor,
                  fontSize: "clamp(3.5rem, 11vw, 11rem)",
                  fontFamily:
                    "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                }}
              >
                {topWord}
              </span>
            </div>

            <div className="absolute right-[5%] top-[40%] flex items-center">
              <span
                className="font-black tracking-tighter leading-none select-none"
                style={{
                  color: textColor,
                  fontSize: "clamp(3.5rem, 11vw, 11rem)",
                  fontFamily:
                    "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                }}
              >
                {rightWord}
              </span>
            </div>

            <div className="absolute bottom-[3%] inset-x-0 flex justify-center">
              <span
                className="font-normal italic leading-none select-none text-center"
                style={{
                  color: accentColor,
                  fontSize: "clamp(4rem, 14vw, 13rem)",
                  fontFamily: "Georgia, 'Times New Roman', Cambria, serif",
                }}
              >
                {bottomWord}
              </span>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HeroSection;
