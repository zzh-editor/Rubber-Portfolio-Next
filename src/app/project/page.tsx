"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TransitionLink from "@/components/TransitionLink";
import ProjectOverlay from "@/components/ProjectOverlay";
import { projectsPage, galleryItems } from "@/data/projects";

gsap.registerPlugin(ScrollTrigger);

type Tab = "videos" | "photos";

type OverlayItem =
  | { type: "video"; thumbnail: string; videoUrl: string; title: string }
  | { type: "image"; src: string };

export default function ProjectPage() {
  const router = useRouter();
  const sectionRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Record<number, HTMLDivElement | null>>({});
  const isFirstRender = useRef(true);
  const [activeTab, setActiveTab] = useState<Tab>("videos");
  const [overlayItem, setOverlayItem] = useState<OverlayItem | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const idStr = params.get("id");
    if (!idStr) return;
    const id = Number(idStr);
    if (!Number.isFinite(id)) return;
    const project = projectsPage.items.find((p) => p.id === id);
    if (!project) return;

    requestAnimationFrame(() => {
      const card = cardRefs.current[id];
      if (card) card.scrollIntoView({ behavior: "smooth", block: "center" });
      setOverlayItem({
        type: "video",
        thumbnail: project.imageSrc,
        videoUrl: project.videoUrl,
        title: project.title,
      });
      setTimeout(() => {
        router.replace("/project", { scroll: false });
      }, 250);
    });
  }, [router]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.batch(".project-card", {
        onEnter: (batch) => {
          gsap.set(batch, { willChange: "transform, opacity" });
          gsap.fromTo(
            batch,
            { opacity: 0, y: 40 },
            { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power3.out", onComplete: () => gsap.set(batch, { willChange: "auto" }) }
          );
        },
        start: "top 88%",
      });

      ScrollTrigger.batch(".gallery-image", {
        onEnter: (batch) => {
          gsap.set(batch, { willChange: "transform, opacity" });
          gsap.fromTo(
            batch,
            { opacity: 0, scale: 0.95 },
            { opacity: 1, scale: 1, duration: 0.5, stagger: 0.08, ease: "power2.out", onComplete: () => gsap.set(batch, { willChange: "auto" }) }
          );
        },
        start: "top 88%",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    gsap.fromTo(
      grid.children,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.4, stagger: 0.05, ease: "power2.out" }
    );

    ScrollTrigger.refresh();
  }, [activeTab]);

  return (
    <div ref={sectionRef} className="pt-24 pb-16 px-6">
      <div className="max-w-6xl mx-auto">
        <TransitionLink
          href="/"
          className="micro text-muted hover:text-accent transition-colors inline-flex items-center gap-2 mb-8"
        >
          {`<<< BACK`}
        </TransitionLink>

        <h1 className="macro text-[clamp(2rem,5vw,5rem)] mb-2">{projectsPage.title}</h1>
        <p className="micro text-muted mb-16 max-w-xl">{projectsPage.description}</p>

        <div className="flex gap-8 mb-8 border-b border-border pb-4">
          <button
            onClick={() => setActiveTab("videos")}
            className={`micro cursor-pointer transition-colors ${
              activeTab === "videos" ? "text-accent" : "text-muted hover:text-foreground"
            }`}
          >
            {`[ VIDEOS ]`}
          </button>
          <button
            onClick={() => setActiveTab("photos")}
            className={`micro cursor-pointer transition-colors ${
              activeTab === "photos" ? "text-accent" : "text-muted hover:text-foreground"
            }`}
          >
            {`[ PHOTOGRAPHY ]`}
          </button>
        </div>

        {activeTab === "videos" && (
          <div ref={gridRef} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-0 border-2 border-foreground">
            {projectsPage.items.map((project) => (
              <div
                key={project.id}
                ref={(el) => { cardRefs.current[project.id] = el; }}
                className="project-card block border-r border-b border-foreground hover:bg-accent-dim transition-colors last:border-r-0 cursor-pointer"
                style={{ opacity: 0 }}
                onClick={() =>
                  setOverlayItem({
                    type: "video",
                    thumbnail: project.imageSrc,
                    videoUrl: project.videoUrl,
                    title: project.title,
                  })
                }
              >
                <div className="aspect-video border-b border-foreground overflow-hidden">
                  <img
                    src={project.imageSrc}
                    alt={project.title}
                    className="w-full h-full object-cover transition-opacity duration-500 hover:opacity-80"
                  />
                </div>
                <div className="p-4">
                  <h3 className="macro text-sm uppercase tracking-tight leading-snug">{project.title}</h3>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "photos" && (
          <div ref={gridRef} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-0 border-2 border-foreground">
            {galleryItems.map((item) => (
              <div
                key={item.id}
                className="gallery-image block border-r border-b border-foreground hover:bg-accent-dim transition-colors last:border-r-0 cursor-pointer"
                style={{ opacity: 0 }}
                onClick={() =>
                  setOverlayItem({
                    type: "image",
                    src: item.image,
                  })
                }
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={item.image}
                    alt={`Photo ${item.id}`}
                    className="w-full h-full object-cover transition-opacity duration-500 hover:opacity-80"
                    loading="lazy"
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {overlayItem && (
        <ProjectOverlay item={overlayItem} onClose={() => setOverlayItem(null)} />
      )}
    </div>
  );
}
