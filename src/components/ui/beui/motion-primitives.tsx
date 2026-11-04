"use client";

import React, { useRef, useState } from "react";
import { motion, useReducedMotion, type Transition, type HTMLMotionProps } from "motion/react";
import { cn } from "@/lib/utils";

export const springSmooth: Transition = {
  type: "spring",
  stiffness: 380,
  damping: 30,
};

export const springBouncy: Transition = {
  type: "spring",
  stiffness: 420,
  damping: 24,
};

export const springGentle: Transition = {
  type: "spring",
  stiffness: 260,
  damping: 28,
};

interface FadeBlurInProps extends HTMLMotionProps<"div"> {
  delay?: number;
  duration?: number;
  blur?: string;
  yOffset?: number;
  children: React.ReactNode;
}

export function FadeBlurIn({
  children,
  className,
  delay = 0,
  duration = 0.45,
  blur = "8px",
  yOffset = 12,
  ...props
}: FadeBlurInProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return (
      <div className={className} {...(props as React.HTMLAttributes<HTMLDivElement>)}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: yOffset, filter: `blur(${blur})` }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{
        duration,
        delay,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

interface SharedLayoutHoverPillProps {
  layoutId?: string;
  className?: string;
}

export function SharedLayoutHoverPill({
  layoutId = "shared-hover-pill",
  className,
}: SharedLayoutHoverPillProps) {
  return (
    <motion.span
      layoutId={layoutId}
      className={cn(
        "absolute inset-0 rounded-lg bg-neutral-200/60 dark:bg-neutral-800/60 -z-10",
        className
      )}
      transition={{
        type: "spring",
        stiffness: 450,
        damping: 32,
      }}
    />
  );
}

interface MotionTiltWrapperProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  maxTilt?: number;
  scale?: number;
}

export function MotionTiltWrapper({
  children,
  className,
  maxTilt = 7,
  scale = 1.02,
  ...props
}: MotionTiltWrapperProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current || shouldReduceMotion) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rX = ((y - centerY) / centerY) * -maxTilt;
    const rY = ((x - centerX) / centerX) * maxTilt;

    setRotateX(rX);
    setRotateY(rY);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
  };

  if (shouldReduceMotion) {
    return (
      <div className={className} {...(props as React.HTMLAttributes<HTMLDivElement>)}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      animate={{
        rotateX: isHovered ? rotateX : 0,
        rotateY: isHovered ? rotateY : 0,
        scale: isHovered ? scale : 1,
      }}
      transition={{
        type: "spring",
        stiffness: 320,
        damping: 24,
      }}
      style={{
        transformStyle: "preserve-3d",
      }}
      className={cn("will-change-transform", className)}
      {...props}
    >
      {children}
    </motion.div>
  );
}
