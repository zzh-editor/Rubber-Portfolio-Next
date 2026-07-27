"use client";

import { useRef, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { gsap } from "gsap";

type OverlayItem =
  | { type: "video"; thumbnail: string; videoUrl: string; title: string }
  | { type: "image"; src: string };

interface ProjectOverlayProps {
  item: OverlayItem;
  onClose: () => void;
}

function getEmbedUrl(url: string): string {
  const vimeo = url.match(/vimeo\.com\/(\d+)/);
  if (vimeo) return `https://player.vimeo.com/video/${vimeo[1]}`;

  const bili = url.match(/bilibili\.com\/video\/(BV\w+)/);
  if (bili) return `https://player.bilibili.com/player.html?bvid=${bili[1]}`;

  return url;
}

export default function ProjectOverlay({ item, onClose }: ProjectOverlayProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const loadingRef = useRef<HTMLDivElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [dots, setDots] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: "power2.out" }
      );
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, scale: 0.85, y: 24 },
        { opacity: 1, scale: 1, y: 0, duration: 0.4, delay: 0.1, ease: "power3.out" }
      );
    });

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (videoLoaded) return;
    const interval = setInterval(() => {
      setDots(prev => (prev + 1) % 4);
    }, 400);
    return () => clearInterval(interval);
  }, [videoLoaded]);

  const handleVideoLoad = () => {
    if (loadingRef.current) {
      gsap.to(loadingRef.current, {
        opacity: 0,
        duration: 0.4,
        ease: "power2.out",
        onComplete: () => {
          setVideoLoaded(true);
          gsap.set(loadingRef.current, { display: "none" });
        },
      });
    }
  };

  const handleClose = () => {
    const tl = gsap.timeline({
      onComplete: onClose,
    });
    tl.to(cardRef.current, {
      opacity: 0,
      scale: 0.85,
      y: 24,
      duration: 0.25,
      ease: "power2.in",
    }).to(
      overlayRef.current,
      { opacity: 0, duration: 0.2 },
      "-=0.15"
    );
  };

  return createPortal(
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/80 cursor-pointer"
      onClick={(e) => {
        if (e.target === overlayRef.current) handleClose();
      }}
    >
      {item.type === "image" ? (
        <div
          ref={cardRef}
          className="cursor-default"
          onClick={(e) => e.stopPropagation()}
        >
          <img
            src={item.src}
            alt=""
            className="max-w-[90vw] max-h-[85vh] w-auto h-auto object-contain"
          />
        </div>
      ) : (
        <div
          ref={cardRef}
          className="relative w-full max-w-5xl aspect-video cursor-default"
          onClick={(e) => e.stopPropagation()}
        >
          <div
            ref={loadingRef}
            className="absolute inset-0 z-10 flex items-center justify-center bg-black"
          >
            <span className="micro text-muted">
              {`LOADING${'.'.repeat(dots)}`}
            </span>
          </div>
          <iframe
            src={getEmbedUrl(item.videoUrl)}
            className="absolute inset-0 w-full h-full"
            allow="autoplay; fullscreen"
            allowFullScreen
            onLoad={handleVideoLoad}
          />
        </div>
      )}
    </div>,
    document.body
  );
}
