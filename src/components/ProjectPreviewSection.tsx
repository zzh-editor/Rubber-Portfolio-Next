"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTransition } from "@/lib/TransitionContext";
import TransitionLink from "@/components/TransitionLink";
import { projectsPage } from "@/data/projects";

gsap.registerPlugin(ScrollTrigger);

export default function ProjectPreviewSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const { startTransition } = useTransition();

  const allItems = [...projectsPage.items, ...projectsPage.items, ...projectsPage.items];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const wrapper = wrapperRef.current;
      if (!wrapper || projectsPage.items.length === 0) return;

      const images = wrapper.querySelectorAll("img");
      let loaded = 0;

      const startMarquee = () => {
        const setWidth = Math.round(wrapper.scrollWidth / 3);
        if (setWidth <= 0) return;

        gsap.set(wrapper, { x: -setWidth });

        const tween = gsap.to(wrapper, {
          x: -setWidth * 2,
          duration: projectsPage.items.length * 3,
          ease: "none",
          repeat: -1,
        });

        wrapper.addEventListener("mouseenter", () => tween.pause(), { passive: true });
        wrapper.addEventListener("mouseleave", () => tween.resume(), { passive: true });
      };

      if (images.length === 0) {
        startMarquee();
      } else {
        images.forEach((img) => {
          if (img.complete) {
            loaded++;
            if (loaded === images.length) startMarquee();
          } else {
            img.addEventListener("load", () => {
              loaded++;
              if (loaded === images.length) startMarquee();
            }, { once: true });
          }
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="projects" ref={sectionRef} className="py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="micro text-accent mb-8">{`[ PROJECTS ]`}</div>

        <div className="border-2 border-foreground overflow-hidden">
          <div ref={wrapperRef} className="flex">
            {allItems.map((project, i) => (
              <div
                key={`${project.id}-${i}`}
                className="project-card flex-shrink-0 w-[75vw] md:w-1/3 border-r border-foreground last:border-r-0 cursor-pointer hover:bg-accent-dim transition-colors"
                onClick={() => startTransition(`/project?id=${project.id}`)}
              >
                <div className="noise-overlay aspect-video border-b border-foreground overflow-hidden">
                  <img
                    src={project.imageSrc}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="macro text-sm uppercase tracking-tight">{project.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 border-2 border-foreground">
          <TransitionLink
            href="/project"
            className="block micro text-center text-muted hover:text-foreground py-3 transition-colors"
          >
            {`>>> VIEW ALL PROJECTS >>>`}
          </TransitionLink>
        </div>
      </div>
    </section>
  );
}
