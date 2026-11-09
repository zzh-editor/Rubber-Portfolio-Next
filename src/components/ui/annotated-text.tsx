"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";

interface AnnotatedUnderlineProps {
  children: React.ReactNode;
  className?: string;
  lineClassName?: string;
}

/**
 * 滤镜组件：提供真实手绘/糙面位移效果 (feTurbulence + feDisplacementMap)
 * 赋予 SVG 线条真实的墨水笔画手绘质感
 */
export function RoughFilters() {
  return (
    <svg className="absolute w-0 h-0 pointer-events-none -z-50" aria-hidden="true">
      <defs>
        <filter id="hd-rough-soft" x="-30%" y="-30%" width="160%" height="160%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency={0.035}
            numOctaves={2}
            seed={11}
            result="n2"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="n2"
            scale={1.8}
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </defs>
    </svg>
  );
}

/**
 * 手绘下划线组件 (基于 Opensource UI Annotated Text)
 * hover 时触发从左到右真实笔触生长动效 (stroke-dashoffset: 140 -> 0)
 */
export function AnnotatedUnderline({
  children,
  className,
  lineClassName,
}: AnnotatedUnderlineProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <span
      className={cn(
        "group relative inline-block cursor-pointer select-text font-medium text-neutral-900 dark:text-neutral-100 transition-colors",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => setIsHovered((prev) => !prev)}
    >
      <span className="relative z-10">{children}</span>
      <svg
        className={cn(
          "pointer-events-none absolute -bottom-1 left-[-1%] w-[102%] h-[8px] text-blue-500/90 dark:text-blue-400/90 overflow-visible",
          lineClassName
        )}
        viewBox="0 0 140 10"
        fill="none"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M3,6 C40,2.5 100,2.5 137,5.5"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
          filter="url(#hd-rough-soft)"
          className="transition-[stroke-dashoffset] duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:[stroke-dashoffset:0!important]"
          style={{
            strokeDasharray: 140,
            strokeDashoffset: isHovered ? 0 : 140,
          }}
        />
      </svg>
    </span>
  );
}
