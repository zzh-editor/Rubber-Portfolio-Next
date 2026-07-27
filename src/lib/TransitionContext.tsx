"use client";

import { createContext, useContext, useRef, useEffect, useCallback } from "react";
import { gsap } from "gsap";

const SLIT = "M 0,50 L 100,50 L 100,50 L 0,50 Z";
const FULL = "M 0,0 L 100,0 L 100,100 L 0,100 Z";

type TransitionContextType = {
  startTransition: (href: string) => void;
};

const TransitionContext = createContext<TransitionContextType>({
  startTransition: () => {},
});

export const useTransition = () => useContext(TransitionContext);

export default function TransitionProvider({ children }: { children: React.ReactNode }) {
  const pathRef = useRef<SVGPathElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  const startTransition = useCallback((href: string) => {
    const path = pathRef.current;
    if (!path) { window.location.href = href; return; }

    tlRef.current?.kill();

    gsap.set(path, { autoAlpha: 1 });
    gsap.to(path, {
      attr: { d: FULL },
      duration: 0.5,
      ease: "power4.inOut",
      onComplete: () => {
        sessionStorage.setItem("pt", "1");
        window.location.href = href;
      },
    });
  }, []);

  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;

    const isTransition = sessionStorage.getItem("pt");
    sessionStorage.removeItem("pt");

    if (isTransition) {
      gsap.set(path, { attr: { d: FULL }, autoAlpha: 1 });
      gsap.to(path, {
        attr: { d: SLIT },
        duration: 0.5,
        ease: "power4.inOut",
        onComplete: () => {
          gsap.set(path, { autoAlpha: 0 });
        },
      });
    }
  }, []);

  return (
    <TransitionContext.Provider value={{ startTransition }}>
      <svg
        className="fixed inset-0 w-full h-full z-[100]"
        style={{ pointerEvents: "none", opacity: 0, visibility: "hidden" }}
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <path ref={pathRef} d={SLIT} fill="#0c0c0c" />
      </svg>
      {children}
    </TransitionContext.Provider>
  );
}
