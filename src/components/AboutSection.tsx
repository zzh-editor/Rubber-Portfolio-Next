"use client";

import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Flip } from "gsap/Flip";
import { skills } from "@/data/skills";
import { aboutImages } from "@/data/about-images";

gsap.registerPlugin(ScrollTrigger, Flip);

interface PicPos {
  left: number;
  top: number;
  scale: number;
}

function randomPics(): PicPos[] {
  const positions: PicPos[] = [];
  const count = aboutImages.length;
  const minDist = 24;

  const regions: [number, number, number, number][] = [
    [3, 82, 3, 22],
    [2, 18, 3, 78],
    [72, 88, 3, 78],
    [3, 82, 68, 88],
  ];

  const centerExit = { leftMin: 18, leftMax: 72, topMin: 22, topMax: 68 };

  for (let n = 0; n < count; n++) {
    const r = regions[n % regions.length];
    let left: number, top: number;
    let attempts = 0;
    do {
      left = r[0] + Math.random() * (r[1] - r[0]);
      top = r[2] + Math.random() * (r[3] - r[2]);
      attempts++;
    } while (
      attempts < 300 &&
      (positions.some(p => {
        const d = Math.sqrt((left - p.left) ** 2 + (top - p.top) ** 2);
        return d < minDist;
      }) ||
      (left > centerExit.leftMin && left < centerExit.leftMax &&
       top > centerExit.topMin && top < centerExit.topMax))
    );

    positions.push({ left, top, scale: Math.random() * 0.3 + 0.3 });
  }

  return positions;
}

const introduction = [
  { text: "张壮浩" },
  {
    text: "1998 年生于汕尾海边, 现工作于深圳。从摄影工作室学徒到视频团队负责人，用 8 年时间完成从执行到管理的跨越。",
  },
  {
    text: "一个脱离了信息茧房的人，具备极强的信息检索能力和学习能力，审美在线，在内容创作上具备一定的悟性和灵性。",
  },
  {
    text: "擅长将创意转化为可执行的标准流程，让团队产出既有质量又有效率。",
  },
];

const categoryColors: Record<string, { text: string; border: string }> = {
  "管理能力": { text: "var(--color-accent)", border: "var(--color-accent)" },
  "技术能力": { text: "var(--color-accent-green)", border: "var(--color-accent-green)" },
  "内容能力": { text: "var(--color-foreground)", border: "var(--color-foreground)" },
};

const maxItems = Math.max(...skills.categories.map((c) => c.items.length));

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeCategory, setActiveCategory] = useState("技术能力");

  const [expandedIdx, setExpandedIdx] = useState<number | null>(null);
  const [positions, setPositions] = useState<PicPos[] | null>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const thumbWrapRefs = useRef<(HTMLDivElement | null)[]>([]);
  const fullImgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    setPositions(randomPics());
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(".about-reveal", { willChange: "transform, opacity" });
      gsap.from(".about-reveal", {
        opacity: 0,
        y: 32,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
        onComplete: () => gsap.set(".about-reveal", { willChange: "auto" }),
      });
      gsap.set(".skill-block", { willChange: "transform, opacity" });
      gsap.from(".skill-block", {
        opacity: 0,
        y: 24,
        duration: 0.5,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
        onComplete: () => gsap.set(".skill-block", { willChange: "auto" }),
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!positions) return;
    const frame = frameRef.current;
    if (!frame) return;

    const imgs = frame.querySelectorAll<HTMLImageElement>(".about-thumb-img");
    const radius = 120;
    const maxScale = 1.25;
    const dur = 0.35;

    let rafId: number;
    const onMove = (e: MouseEvent) => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        rafId = 0;
        const mx = e.clientX, my = e.clientY;
        imgs.forEach((img) => {
          const r = img.getBoundingClientRect();
          const cx = r.left + r.width / 2;
          const cy = r.top + r.height / 2;
          const d = Math.hypot(mx - cx, my - cy);
          const p = gsap.utils.clamp(0, 1, gsap.utils.mapRange(0, radius, 1, 0, d));
          gsap.to(img, {
            scale: 1 + (maxScale - 1) * p,
            duration: dur,
            overwrite: "auto",
            ease: "power2.out",
          });
        });
      });
    };

    const onLeave = () => {
      if (rafId) { cancelAnimationFrame(rafId); rafId = 0; }
      imgs.forEach((img) => {
        gsap.to(img, {
          scale: 1,
          duration: dur,
          overwrite: "auto",
          ease: "power2.out",
          onComplete: () => gsap.set(img, { willChange: "auto" }),
        });
      });
    };

    gsap.set(imgs, { willChange: "transform" });
    frame.addEventListener("mousemove", onMove, { passive: true });
    frame.addEventListener("mouseleave", onLeave, { passive: true });
    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      gsap.set(imgs, { willChange: "auto" });
      frame.removeEventListener("mousemove", onMove);
      frame.removeEventListener("mouseleave", onLeave);
    };
  }, [positions]);

  useEffect(() => {
    if (!positions) return;

    aboutImages.forEach((img) => {
      const preload = new window.Image();
      preload.src = img.src;
    });

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".about-thumb-wrap",
        { opacity: 0 },
        { opacity: 1, duration: 0.4, stagger: 0.06, ease: "power2.out", delay: 0.3 }
      );
    });
    return () => ctx.revert();
  }, [positions]);

  const openImage = (index: number) => {
    if (!frameRef.current || !fullImgRef.current) return;
    const flipId = `about-img-${index}`;
    const thumbImg = frameRef.current.querySelector<HTMLImageElement>(`img[data-flip-id="${flipId}"]`);
    if (!thumbImg) return;

    fullImgRef.current.dataset.flipId = flipId;
    fullImgRef.current.src = aboutImages[index].src;

    const doFlip = () => {
      gsap.set(fullImgRef.current, { willChange: "transform, opacity" });
      const state = Flip.getState(thumbImg);
      fullImgRef.current!.classList.add("active");
      const thumbWrap = frameRef.current?.querySelector(`[data-flip-id="${flipId}"]`) as HTMLElement | null;
      if (thumbWrap) thumbWrap.classList.add("active");
      Flip.from(state, {
        targets: fullImgRef.current,
        duration: 0.55,
        absolute: true,
        ease: "power2.inOut",
        onComplete: () => gsap.set(fullImgRef.current, { willChange: "auto" }),
      });
      setExpandedIdx(index);
    };

    if (fullImgRef.current.complete && fullImgRef.current.naturalWidth > 0) {
      doFlip();
    } else {
      const handler = () => {
        fullImgRef.current?.removeEventListener("load", handler);
        doFlip();
      };
      fullImgRef.current.addEventListener("load", handler, { once: true });
    }
  };

  const closeImage = () => {
    if (expandedIdx === null) return;
    const idx = expandedIdx;
    if (!frameRef.current || !fullImgRef.current) return;
    const flipId = `about-img-${idx}`;
    const thumbImg = frameRef.current.querySelector<HTMLImageElement>(`img[data-flip-id="${flipId}"]`);
    if (!thumbImg) return;

    gsap.set(thumbImg, { willChange: "transform, opacity" });
    const state = Flip.getState(fullImgRef.current);
    fullImgRef.current.classList.remove("active");
    const thumbWrap = frameRef.current?.querySelector(`[data-flip-id="${flipId}"]`) as HTMLElement | null;
    if (thumbWrap) thumbWrap.classList.remove("active");
    Flip.from(state, {
      targets: thumbImg,
      duration: 0.55,
      absolute: true,
      ease: "power2.inOut",
      onComplete: () => {
        gsap.set(thumbImg, { willChange: "auto" });
        gsap.set(fullImgRef.current, { willChange: "auto" });
        fullImgRef.current!.src = "";
        fullImgRef.current!.dataset.flipId = "";
      },
    });
    setExpandedIdx(null);
  };

  const handleThumbClick = (i: number) => {
    if (expandedIdx !== null) {
      closeImage();
    } else {
      openImage(i);
    }
  };

  const activeCat = skills.categories.find((c) => c.title === activeCategory) ?? skills.categories[0];
  const c = categoryColors[activeCat.title] ?? categoryColors["内容能力"];

  return (
    <section id="about" ref={sectionRef} className="relative py-32 px-6">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-48 z-0"
        style={{
          background: "linear-gradient(to bottom, rgba(8,30,50,0.45) 0%, rgba(8,30,50,0.15) 40%, transparent 100%)",
        }}
        aria-hidden="true"
      />
      <div className="max-w-5xl mx-auto relative z-10">
        <div className="micro text-accent mb-8">{`>>> ABOUT`}</div>
        <div className="grid md:grid-cols-2 border-2 border-foreground">
          <div
            ref={frameRef}
            className="noise-overlay border-r border-foreground overflow-hidden relative md:min-h-[300px] min-h-[200px]"
          >
            {positions && positions.map((pos, i) => {
              const img = aboutImages[i];
              return (
                <div
                  key={img.name}
                  ref={(el) => { thumbWrapRefs.current[i] = el; }}
                  className="about-thumb-wrap"
                  data-flip-id={`about-img-${i}`}
                  style={{
                    left: `${pos.left}%`,
                    top: `${pos.top}%`,
                  }}
                  onClick={() => handleThumbClick(i)}
                >
                  <img
                    src={img.src}
                    alt=""
                    draggable={false}
                    className="about-thumb-img"
                    data-flip-id={`about-img-${i}`}
                    style={{ maxWidth: `${Math.round(100 * pos.scale)}px` }}
                  />
                </div>
              );
            })}
            <div
              className="about-full-overlay"
              onClick={closeImage}
              style={{ position: "absolute", inset: 0, zIndex: 15, pointerEvents: expandedIdx !== null ? "auto" : "none" }}
            />
            <img
              ref={fullImgRef}
              className="about-full-img"
              alt=""
              draggable={false}
              onClick={closeImage}
            />
          </div>
          <div className="p-6 md:p-8 flex flex-col gap-6">
            {introduction.map((p, i) =>
              i === 0 ? (
                <h2 key={i} className="about-reveal macro text-[clamp(2rem,5vw,4rem)]">
                  {p.text}
                </h2>
              ) : (
                <p key={i} className="about-reveal text-sm text-muted leading-relaxed">
                  {p.text}
                </p>
              )
            )}
            <div className="skill-block border-t border-foreground/30 pt-6">
              <div className="flex gap-1 mb-4">
                {skills.categories.map((cat) => {
                  const isActive = activeCategory === cat.title;
                  const catColor = categoryColors[cat.title] ?? categoryColors["内容能力"];
                  return (
                    <button
                      key={cat.title}
                      onClick={() => setActiveCategory(cat.title)}
                      className="micro px-3 py-1.5 border transition-all duration-150"
                      style={{
                        color: isActive ? catColor.text : "var(--color-muted)",
                        borderColor: isActive ? catColor.border : "var(--color-border)",
                        background: isActive ? "var(--color-accent-dim)" : "transparent",
                      }}
                    >
                      {`>> ${cat.title}`}
                    </button>
                  );
                })}
              </div>
              <div style={{ minHeight: `${maxItems * 2.5}rem` }}>
                <ul className="space-y-1.5">
                  {activeCat.items.map((item) => (
                    <li
                      key={item}
                      className="text-xs font-mono leading-relaxed pl-3 relative before:content-['//'] before:absolute before:left-0 before:text-[10px]"
                      style={{ color: c.text }}
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
