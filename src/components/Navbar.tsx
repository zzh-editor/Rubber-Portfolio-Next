"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TransitionLink from "@/components/TransitionLink";

gsap.registerPlugin(ScrollTrigger);

const jumpLinks = [
  { href: "#about", label: "About" },
  { href: "#timeline", label: "Timeline" },
  { href: "#projects", label: "Projects" },
  { href: "#connect", label: "Connect" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLUListElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    ScrollTrigger.normalizeScroll(true);
  }, []);

  useEffect(() => {
    const menu = menuRef.current;
    const links = linksRef.current;
    const btn = btnRef.current;
    if (!menu || !links || !btn) return;

    const bars = btn.querySelectorAll<SVGLineElement>(".nav-bar");

    const tl = gsap.timeline({ paused: true });
    tlRef.current = tl;

    tl.set(menu, { display: "block" })
      .fromTo(menu, { autoAlpha: 0, scale: 0.92 }, { autoAlpha: 1, scale: 1, duration: 0.3, ease: "power2.out", transformOrigin: "top right" })
      .fromTo(links.querySelectorAll("li"), { opacity: 0, x: -12 }, { opacity: 1, x: 0, duration: 0.4, ease: "expo.out", stagger: 0.04 }, "-=0.1")
      .to(bars[0], { attr: { x1: 5, y1: 5, x2: 15, y2: 15 }, duration: 0.3, ease: "back.out(1.4)" }, "-=0.3")
      .to(bars[1], { autoAlpha: 0, duration: 0.15, ease: "power2.out" }, "-=0.3")
      .to(bars[2], { attr: { x1: 15, y1: 5, x2: 5, y2: 15 }, duration: 0.3, ease: "back.out(1.4)" }, "-=0.3")
      .addPause();

    tl.to(bars[0], { attr: { x1: 3, y1: 7, x2: 17, y2: 7 }, duration: 0.2, ease: "power3.in" })
      .to(bars[1], { autoAlpha: 1, duration: 0.15 }, "<")
      .to(bars[2], { attr: { x1: 3, y1: 13, x2: 17, y2: 13 }, duration: 0.2, ease: "power3.in" }, "<")
      .to(menu, { autoAlpha: 0, scale: 0.92, duration: 0.2, ease: "power3.in", transformOrigin: "top right" }, "<0.05")
      .set(menu, { display: "none" });

    return () => { tl.kill(); };
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        toggle();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  function toggle() {
    const tl = tlRef.current;
    if (!tl || tl.isActive()) return;

    if (!isOpen) {
      setIsOpen(true);
      tl.restart();
    } else {
      setIsOpen(false);
      tl.play();
    }
  }

  function handleLinkClick(href: string) {
    toggle();
    setTimeout(() => {
      if (window.location.pathname !== "/") {
        window.location.href = "/" + href;
        return;
      }
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    }, 400);
  }

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-[49] bg-black/40 backdrop-blur-sm"
          onClick={toggle}
        />
      )}
      <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-end px-6 py-4">
        <div ref={containerRef} className="relative inline-block">
          <button
            ref={btnRef}
            onClick={toggle}
            className="relative z-[60] w-11 h-11 flex items-center justify-center cursor-pointer bg-transparent border border-border focus-visible:outline-2 focus-visible:outline-accent/50"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-foreground">
              <line className="nav-bar" x1="3" y1="7" x2="17" y2="7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
              <line className="nav-bar" x1="3" y1="10" x2="17" y2="10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
              <line className="nav-bar" x1="3" y1="13" x2="17" y2="13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
            </svg>
          </button>

          <div
            ref={menuRef}
            className="absolute top-full right-0 mt-2 z-50 hidden"
          >
            <div className="bg-background border-2 border-foreground p-8 min-w-[260px]">
              <div className="micro text-accent mb-6 tracking-[0.15em]">{`[ NAV ]`}</div>
              <ul ref={linksRef} className="flex flex-col gap-1">
                {jumpLinks.map((link) => (
                  <li key={link.href}>
                    <button
                      onClick={() => handleLinkClick(link.href)}
                      className="w-full text-left text-xl font-bold tracking-tighter uppercase text-foreground hover:text-accent py-2 transition-colors"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>

              <div className="mt-6 pt-6 border-t border-border">
                <TransitionLink
                  href="/project"
                  className="block text-sm font-mono tracking-wider text-muted hover:text-foreground transition-colors"
                >
                  {`>>> FULL ARCHIVE`}
                </TransitionLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
