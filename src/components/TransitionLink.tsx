"use client";

import { useRef } from "react";
import { useTransition } from "@/lib/TransitionContext";

export default function TransitionLink({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  const { startTransition } = useTransition();
  const busyRef = useRef(false);

  function handleClick(e: React.MouseEvent) {
    if (busyRef.current) return;
    busyRef.current = true;
    e.preventDefault();
    startTransition(href);
  }

  return (
    <a href={href} onClick={handleClick} className={className}>
      {children}
    </a>
  );
}
