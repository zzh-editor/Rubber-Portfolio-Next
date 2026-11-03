"use client";

import React, { useEffect, useState } from "react";
import { useTheme } from "@/components/ThemeProvider";
import { Sun, Moon } from "lucide-react";
import { cn } from "@/lib/utils";

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className={cn("fixed top-5 right-5 sm:top-8 sm:right-8 z-50", className)}>
        <div className="w-9 h-9 rounded-full bg-neutral-200/50 dark:bg-neutral-800/50 animate-pulse" />
      </div>
    );
  }

  const isDark = theme === "dark";

  return (
    <aside
      aria-label="Theme Switcher"
      className={cn("fixed top-5 right-5 sm:top-8 sm:right-8 z-50", className)}
    >
      <button
        type="button"
        onClick={toggleTheme}
        aria-label={isDark ? "切换为亮色模式" : "切换为暗色模式"}
        title={isDark ? "切换为亮色模式" : "切换为暗色模式"}
        className={cn(
          "group relative flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full",
          "backdrop-blur-xl transition-all duration-300 cursor-pointer shadow-sm hover:scale-105 active:scale-95",
          isDark
            ? "bg-neutral-900/80 text-neutral-200 border border-white/15 hover:border-white/30 hover:bg-neutral-800/90"
            : "bg-white/85 text-neutral-800 border border-black/10 hover:border-black/20 hover:bg-white"
        )}
      >
        <span className="sr-only">Toggle theme</span>
        {isDark ? (
          <Sun className="w-4 h-4 text-amber-300 transition-transform duration-300 group-hover:rotate-45" />
        ) : (
          <Moon className="w-4 h-4 text-indigo-500 transition-transform duration-300 group-hover:-rotate-12" />
        )}
      </button>
    </aside>
  );
}
