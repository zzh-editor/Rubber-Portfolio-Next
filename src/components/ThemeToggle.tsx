"use client";

import React, { useSyncExternalStore } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";

const emptySubscribe = () => () => {};

function useMounted() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
}

export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useMounted();

  if (!mounted) {
    return (
      <div className={cn("fixed top-5 right-5 sm:top-8 sm:right-8 z-[60]", className)}>
        <div className="w-9 h-9 rounded-full bg-neutral-100 dark:bg-neutral-800 animate-pulse" />
      </div>
    );
  }

  const isDark = resolvedTheme === "dark";

  const handleToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    const nextTheme = isDark ? "light" : "dark";

    if (!document.startViewTransition) {
      setTheme(nextTheme);
      return;
    }

    const rect = e.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    document.documentElement.style.setProperty("--beui-vt-origin", `${x}px ${y}px`);
    document.documentElement.dataset.beuiVt = "circle-blur";

    const transition = document.startViewTransition(() => {
      setTheme(nextTheme);
    });

    transition.finished.finally(() => {
      delete document.documentElement.dataset.beuiVt;
    });
  };

  return (
    <aside
      aria-label="Theme Switcher"
      className={cn("fixed top-5 right-5 sm:top-8 sm:right-8 z-[60]", className)}
    >
      <button
        type="button"
        onClick={handleToggle}
        aria-label={isDark ? "切换为亮色模式" : "切换为暗色模式"}
        title={isDark ? "切换为亮色模式" : "切换为暗色模式"}
        className={cn(
          "relative flex items-center justify-center size-9 sm:size-10 rounded-full",
          "border transition-all duration-300 cursor-pointer shadow-xs",
          "hover:scale-105 active:scale-95",
          isDark
            ? "bg-neutral-900/90 text-neutral-200 border-white/15 hover:border-white/30 hover:bg-neutral-800"
            : "bg-white/90 text-neutral-800 border-black/10 hover:border-black/20 hover:bg-white"
        )}
      >
        <AnimatePresence mode="wait" initial={false}>
          {isDark ? (
            <motion.span
              key="sun"
              initial={{ rotate: -90, scale: 0.6, opacity: 0 }}
              animate={{ rotate: 0, scale: 1, opacity: 1 }}
              exit={{ rotate: 90, scale: 0.6, opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center justify-center"
            >
              <Sun className="size-4 text-amber-400" />
            </motion.span>
          ) : (
            <motion.span
              key="moon"
              initial={{ rotate: 90, scale: 0.6, opacity: 0 }}
              animate={{ rotate: 0, scale: 1, opacity: 1 }}
              exit={{ rotate: -90, scale: 0.6, opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center justify-center"
            >
              <Moon className="size-4 text-neutral-700" />
            </motion.span>
          )}
        </AnimatePresence>
      </button>
    </aside>
  );
}
