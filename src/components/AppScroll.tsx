"use client";

import { type ReactNode } from "react";
import { SmoothScroll } from "@/components/motion/smooth-scroll";

export default function AppScroll({ children }: { children: ReactNode }) {
  return (
    <SmoothScroll root>
      {children}
    </SmoothScroll>
  );
}
