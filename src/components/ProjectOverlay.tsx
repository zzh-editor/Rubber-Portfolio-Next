"use client";

import { useRef, useEffect, useState } from "react";
import { createPortal } from "react-dom";

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
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true));
  }, []);

  const handleClose = () => {
    setVisible(false);
    setTimeout(onClose, 200);
  };

  return createPortal(
    <div
      className={`fixed inset-0 z-[99999] flex items-center justify-center bg-black/80 cursor-pointer transition-opacity duration-200 ${visible ? "opacity-100" : "opacity-0"}`}
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
    >
      {item.type === "image" ? (
        <div
          className={`cursor-default transition-all duration-200 ${visible ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-[0.85] translate-y-6"}`}
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
          className={`relative w-full max-w-5xl aspect-video cursor-default transition-all duration-200 ${visible ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-[0.85] translate-y-6"}`}
          onClick={(e) => e.stopPropagation()}
        >
          <iframe
            src={getEmbedUrl(item.videoUrl)}
            className="absolute inset-0 w-full h-full"
            allow="autoplay; fullscreen"
            allowFullScreen
          />
        </div>
      )}
    </div>,
    document.body
  );
}
