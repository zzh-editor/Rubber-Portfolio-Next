"use client";

import { useEffect, useRef } from "react";

/**
 * Pauses CSS animations on the ref'd element when it scrolls out of the
 * viewport. Adds `anim-hidden` class (display:none) when invisible to
 * also free compositor layers.
 */
export function useVisibleAnimation<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        el.style.animationPlayState = entry.isIntersecting ? "running" : "paused";
      },
      { threshold: 0 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return ref;
}
