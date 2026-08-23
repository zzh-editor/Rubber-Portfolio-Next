"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import ProjectOverlay from "@/components/ProjectOverlay";
import { projectsPage, galleryItems } from "@/data/projects";

type Tab = "videos" | "photos";

type OverlayItem =
  | { type: "video"; thumbnail: string; videoUrl: string; title: string }
  | { type: "image"; src: string };

export default function ProjectPage() {
  const router = useRouter();
  const cardRefs = useRef<Record<number, HTMLDivElement | null>>({});
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

  return (
    <div className="pt-24 pb-16 px-6">
      <div className="max-w-6xl mx-auto">
        <a
          href="/"
          className="micro text-muted hover:text-accent transition-colors inline-flex items-center gap-2 mb-8"
        >
          {`<<< BACK`}
        </a>

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
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-0 border-2 border-foreground">
            {projectsPage.items.map((project) => (
              <div
                key={project.id}
                ref={(el) => { cardRefs.current[project.id] = el; }}
                className="project-card block border-r border-b border-foreground hover:bg-accent-dim transition-colors last:border-r-0 cursor-pointer"
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
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-0 border-2 border-foreground">
            {galleryItems.map((item) => (
              <div
                key={item.id}
                className="gallery-image block border-r border-b border-foreground hover:bg-accent-dim transition-colors last:border-r-0 cursor-pointer"
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
