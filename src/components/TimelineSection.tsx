"use client";

import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { workExperience } from "@/data/work-experience";

gsap.registerPlugin(ScrollTrigger);

export default function TimelineSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const panelsRef = useRef<HTMLDivElement>(null);
  const entries = workExperience.entries;

  const [activeIndex, setActiveIndex] = useState<number | null>(0);
  const [hintShown, setHintShown] = useState(true);
  const detailRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px)", () => {
        const items = listRef.current?.querySelectorAll<HTMLElement>(".pin-item");
        const panels = panelsRef.current?.querySelectorAll<HTMLElement>(".pin-panel");
        if (!items || !panels || items.length === 0) return;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom bottom",
            pin: pinRef.current,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });

        const total = items.length;
        const seg = 1 / total;
        const fade = 0.04;

        items.forEach((item, i) => {
          const enter = seg * i;

          if (i > 0) {
            tl.to(items[i - 1], { opacity: 0.3, duration: fade }, enter - fade);
            tl.to(panels[i - 1], { opacity: 0, y: 16, yPercent: -50, duration: fade }, enter - fade);
          }

          tl.to(item, { opacity: 1, duration: fade }, enter);

          if (i > 0) {
            tl.fromTo(
              panels[i],
              { opacity: 0, y: 16, yPercent: -50 },
              { opacity: 1, y: 0, yPercent: -50, duration: fade },
              enter
            );
          } else {
            tl.fromTo(panels[i], { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: fade }, enter);
          }
        });

        const line = sectionRef.current?.querySelector<HTMLElement>(".timeline-line");
        if (line) {
          for (let i = 0; i < total; i++) {
            tl.fromTo(
              line,
              { scaleY: i * 0.25 },
              { scaleY: (i + 1) * 0.25, duration: seg, ease: "none" },
              i * seg
            );
          }
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    entries.forEach((_, i) => {
      const el = detailRefs.current[i];
      if (!el) return;
      if (activeIndex === i) {
        const maxH = window.innerHeight * 0.6;
        gsap.to(el, {
          maxHeight: maxH,
          opacity: 1,
          duration: 0.35,
          ease: "power2.out",
          onStart: () => { el.style.overflowY = "auto"; },
        });
      } else {
        gsap.to(el, {
          maxHeight: 0,
          opacity: 0,
          duration: 0.25,
          ease: "power2.in",
          onComplete: () => { el.style.overflowY = "hidden"; },
        });
      }
    });
  }, [activeIndex, entries]);

  return (
    <section id="timeline" ref={sectionRef} className="relative md:h-[calc(400vh+200px)]">
      <div ref={pinRef} className="md:sticky md:top-0 md:left-0 md:w-full md:h-screen flex bg-background overflow-x-hidden md:overflow-hidden">
        <div className="max-w-5xl mx-auto w-full h-full flex flex-col md:flex-row relative">
          <div className="w-full md:w-[35%] flex flex-col md:justify-center gap-0 px-6 md:px-12 py-12 md:py-0 md:overflow-y-auto">
            <div ref={listRef} className="flex flex-col">
              {hintShown && (
                <div className="micro text-muted text-center pb-4 md:hidden">
                  {"// 点击展开"}
                </div>
              )}
              {entries.map((entry, i) => (
                <div key={entry.title}>
                  <div
                    className={`hidden md:block pin-item py-6 ${i === 0 ? "opacity-100" : "opacity-30"}`}
                  >
                    <div className="micro text-accent mb-1">{entry.period}</div>
                    <h3 className="macro text-lg font-black uppercase tracking-tight">{entry.title}</h3>
                    <p className="micro text-muted mt-1">{entry.role}</p>
                  </div>

                  <button
                    onClick={() => { setHintShown(false); setActiveIndex(activeIndex === i ? null : i); }}
                    className="md:hidden w-full py-4 border-b border-border flex items-center justify-between"
                    style={{ opacity: activeIndex === i ? 1 : 0.6 }}
                  >
                    <div className="text-left">
                      <div className="micro text-accent mb-1">{entry.period}</div>
                      <h3 className="macro text-base font-black uppercase tracking-tight">{entry.title}</h3>
                      <p className="micro text-muted mt-1">{entry.role}</p>
                    </div>
                    <span className="micro text-muted ml-4 shrink-0">{activeIndex === i ? "[-]" : "[+]"}</span>
                  </button>

                  <div
                    ref={(el) => { detailRefs.current[i] = el; }}
                    className="md:hidden overflow-hidden"
                    style={{ height: 0, opacity: 0 }}
                  >
                    <div className="pb-6 pt-4 border-t border-border">
                      <p className="text-sm text-muted leading-relaxed mb-4">{entry.description}</p>
                      {entry.highlights && (
                        <div className="space-y-4">
                          {entry.highlights.map((h, hi) => (
                            <div key={hi}>
                              <p className="micro text-accent mb-2">{`>> ${h.label}`}</p>
                              <ul className="space-y-1.5">
                                {h.items.map((item, ii) => (
                                  <li key={ii} className="text-xs text-muted leading-relaxed font-mono tracking-wider">
                                    {`// ${item}`}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      )}
                      {entry.items && (
                        <ul className="space-y-1.5">
                          {entry.items.map((item, ii) => (
                            <li key={ii} className="text-xs text-muted leading-relaxed font-mono tracking-wider">
                              {`// ${item}`}
                            </li>
                          ))}
                        </ul>
                      )}
                      {entry.tags && entry.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-4">
                          {entry.tags.map((tag) => (
                            <span key={tag} className="micro text-accent border border-accent px-2 py-0.5">
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="hidden md:block absolute left-[35%] top-0 bottom-0 w-0.5 bg-foreground origin-top timeline-line" />

          <div className="hidden md:flex w-[65%] relative px-6 md:px-12 py-12 md:py-0">
            <div ref={panelsRef} className="w-full max-w-xl h-full flex flex-col justify-center">
              {entries.map((entry, i) => (
                <div
                  key={entry.title}
                  className={`pin-panel w-full ${i === 0 ? "opacity-100" : "opacity-0"} ${i > 0 ? "md:absolute md:top-1/2 md:-translate-y-1/2" : ""}`}
                >
                  <p className="text-sm text-muted leading-relaxed mb-6">{entry.description}</p>
                  {entry.highlights && (
                    <div className="space-y-4">
                      {entry.highlights.map((h, hi) => (
                        <div key={hi}>
                          <p className="micro text-accent mb-2">{`>> ${h.label}`}</p>
                          <ul className="space-y-1.5">
                            {h.items.map((item, ii) => (
                              <li key={ii} className="text-xs text-muted leading-relaxed font-mono tracking-wider">
                                {`// ${item}`}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  )}
                  {entry.items && (
                    <ul className="space-y-1.5">
                      {entry.items.map((item, ii) => (
                        <li key={ii} className="text-xs text-muted leading-relaxed font-mono tracking-wider">
                          {`// ${item}`}
                        </li>
                      ))}
                    </ul>
                  )}
                  {entry.tags && entry.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-6">
                      {entry.tags.map((tag) => (
                        <span key={tag} className="micro text-accent border border-accent px-2 py-0.5">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
