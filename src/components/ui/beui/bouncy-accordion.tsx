"use client";
// beui.dev/components/motion/bouncy-accordion

import {
  motion,
  useReducedMotion,
  type Transition,
} from "motion/react";
import { ChevronDown } from "lucide-react";
import {
  useCallback,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { EASE_OUT } from "@/lib/ease";
import { cn } from "@/lib/utils";

export type BouncyAccordionItem = {
  id: string;
  title: ReactNode;
  subtitle?: ReactNode;
  period?: ReactNode;
  description?: ReactNode;
  icon?: ReactNode;
  disabled?: boolean;
};

export type BouncyAccordionClassNames = {
  root?: string;
  item?: string;
  trigger?: string;
  icon?: string;
  title?: string;
  chevron?: string;
  content?: string;
  description?: string;
};

export interface BouncyAccordionProps {
  items: BouncyAccordionItem[];
  value?: string | null;
  defaultValue?: string | null;
  onValueChange?: (value: string | null) => void;
  collapsible?: boolean;
  className?: string;
  classNames?: BouncyAccordionClassNames;
}

// Rows, cards and scale-corrected text share a transition so their edges
// stay joined. A close or switch uses the faster non-overshooting spring;
// opening from all-closed keeps the weighted bounce.
const EXPAND_TRANSITION: Transition = {
  type: "spring",
  duration: 0.58,
  bounce: 0.32,
};

const COLLAPSE_TRANSITION: Transition = {
  type: "spring",
  duration: 0.46,
  bounce: 0,
};

const DESCRIPTION_TRANSITION: Transition = {
  duration: 0.18,
  ease: EASE_OUT,
};

const CHEVRON_TRANSITION: Transition = {
  type: "spring",
  duration: 0.42,
  bounce: 0.28,
};

function useControllableAccordionValue({
  value,
  defaultValue,
  onValueChange,
}: {
  value?: string | null;
  defaultValue?: string | null;
  onValueChange?: (value: string | null) => void;
}) {
  const [internalValue, setInternalValue] = useState(defaultValue ?? null);
  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internalValue;

  const setValue = useCallback(
    (next: string | null) => {
      if (!isControlled) {
        setInternalValue(next);
      }
      onValueChange?.(next);
    },
    [isControlled, onValueChange]
  );

  return [currentValue, setValue] as const;
}

function BouncyAccordionRow({
  item,
  open,
  startsGroup,
  endsGroup,
  separatedFromPrevious,
  contentId,
  triggerId,
  reduce,
  layoutTransition,
  layoutDependency,
  classNames,
  onToggle,
}: {
  item: BouncyAccordionItem;
  open: boolean;
  startsGroup: boolean;
  endsGroup: boolean;
  separatedFromPrevious: boolean;
  contentId: string;
  triggerId: string;
  reduce: boolean | null;
  layoutTransition: Transition;
  layoutDependency: string | null;
  classNames?: BouncyAccordionClassNames;
  onToggle: () => void;
}) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState(0);

  useLayoutEffect(() => {
    const node = contentRef.current;
    if (!node) return;

    const updateHeight = () => {
      setContentHeight(node.offsetHeight);
    };

    updateHeight();

    const observer = new ResizeObserver(updateHeight);
    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <motion.div
      layout={reduce ? false : "position"}
      layoutDependency={layoutDependency}
      initial={false}
      style={{ marginTop: separatedFromPrevious ? 12 : 0 }}
      transition={{ layout: layoutTransition }}
      className="relative"
    >
      <motion.div
        data-state={open ? "open" : "closed"}
        layout={!reduce}
        layoutDependency={layoutDependency}
        initial={false}
        animate={{
          borderTopLeftRadius: startsGroup ? 24 : 0,
          borderTopRightRadius: startsGroup ? 24 : 0,
          borderBottomLeftRadius: endsGroup ? 24 : 0,
          borderBottomRightRadius: endsGroup ? 24 : 0,
        }}
        transition={reduce ? { duration: 0 } : layoutTransition}
        style={{ originY: 0 }}
        className={cn(
          "overflow-hidden bg-neutral-100/90 dark:bg-[#18181b] text-neutral-900 dark:text-neutral-100 border border-neutral-200/70 dark:border-neutral-800/80 transition-colors",
          item.disabled && "opacity-50",
          classNames?.item
        )}
      >
        <motion.button
          id={triggerId}
          type="button"
          disabled={item.disabled}
          aria-expanded={open}
          aria-controls={contentId}
          onClick={onToggle}
          layout={reduce ? false : "position"}
          layoutDependency={layoutDependency}
          transition={{ layout: layoutTransition }}
          style={{ originY: 0 }}
          className={cn(
            "flex min-h-[58px] w-full items-center justify-between gap-3 px-5 py-4 text-left outline-none transition-colors cursor-pointer select-none",
            "hover:bg-neutral-200/50 dark:hover:bg-neutral-800/50",
            classNames?.trigger
          )}
        >
          <div className="flex items-center gap-3.5 min-w-0 flex-1">
            {item.icon ? (
              <span
                className={cn(
                  "grid size-6 shrink-0 place-items-center",
                  classNames?.icon
                )}
              >
                {item.icon}
              </span>
            ) : null}
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center justify-between gap-2 mr-2">
                <span
                  className={cn(
                    "text-[15px] sm:text-base font-semibold text-neutral-900 dark:text-neutral-100 tracking-tight",
                    classNames?.title
                  )}
                >
                  {item.title}
                </span>
                {item.period ? (
                  <span className="text-xs font-mono text-neutral-400 dark:text-neutral-500 shrink-0">
                    {item.period}
                  </span>
                ) : null}
              </div>
              {item.subtitle ? (
                <p className="text-xs sm:text-[13px] text-neutral-500 dark:text-neutral-400 mt-0.5">
                  {item.subtitle}
                </p>
              ) : null}
            </div>
          </div>

          <motion.span
            aria-hidden
            animate={{ rotate: open ? 180 : 0 }}
            transition={reduce ? { duration: 0 } : CHEVRON_TRANSITION}
            className={cn(
              "grid size-6 shrink-0 place-items-center text-neutral-400 shrink-0",
              classNames?.chevron
            )}
          >
            <ChevronDown className="size-4" />
          </motion.span>
        </motion.button>

        <section
          id={contentId}
          aria-labelledby={triggerId}
          aria-hidden={!open}
          inert={!open}
          style={{ height: open && item.description ? contentHeight || "auto" : 0 }}
          className={cn("overflow-hidden", classNames?.content)}
        >
          <motion.div
            ref={contentRef}
            // The card clips this full-size layout node. Correcting only the
            // card scale avoids a one-pixel clip and its extreme text scale.
            layout={reduce ? false : "position"}
            layoutDependency={layoutDependency}
            initial={false}
            animate={{ opacity: open ? 1 : 0 }}
            transition={{
              opacity: reduce ? { duration: 0 } : DESCRIPTION_TRANSITION,
              layout: layoutTransition,
            }}
            style={{ originY: 0 }}
            className="px-5 pb-5 pt-1"
          >
            <div
              className={cn(
                "text-[15px] leading-relaxed text-neutral-600 dark:text-neutral-400",
                classNames?.description
              )}
            >
              {item.description}
            </div>
          </motion.div>
        </section>
      </motion.div>
    </motion.div>
  );
}

export function BouncyAccordion({
  items,
  value,
  defaultValue = null,
  onValueChange,
  collapsible = true,
  className,
  classNames,
}: BouncyAccordionProps) {
  const reduce = useReducedMotion();
  const baseId = useId();
  const [activeValue, setActiveValue] = useControllableAccordionValue({
    value,
    defaultValue,
    onValueChange,
  });
  const activeIndex = items.findIndex((item) => item.id === activeValue);
  const [prevActiveValue, setPrevActiveValue] = useState(activeValue);
  const layoutTransition =
    activeValue === null || prevActiveValue !== null
      ? COLLAPSE_TRANSITION
      : EXPAND_TRANSITION;

  if (prevActiveValue !== activeValue) {
    setPrevActiveValue(activeValue);
  }

  const toggleItem = useCallback(
    (id: string) => {
      if (activeValue === id) {
        if (collapsible) {
          setActiveValue(null);
        }
        return;
      }
      setActiveValue(id);
    },
    [activeValue, collapsible, setActiveValue]
  );

  return (
    <div className={cn("w-full space-y-0", className, classNames?.root)}>
      {items.map((item, index) => {
        const open = activeValue === item.id;
        const previousIsOpen = activeIndex === index - 1;
        const nextIsOpen = activeIndex === index + 1;
        const startsGroup = open || index === 0 || previousIsOpen;
        const endsGroup = open || index === items.length - 1 || nextIsOpen;
        const separatedFromPrevious = index > 0 && (open || previousIsOpen);
        const contentId = `${baseId}-${item.id}-content`;
        const triggerId = `${baseId}-${item.id}-trigger`;

        return (
          <BouncyAccordionRow
            key={item.id}
            item={item}
            open={open}
            startsGroup={startsGroup}
            endsGroup={endsGroup}
            separatedFromPrevious={separatedFromPrevious}
            contentId={contentId}
            triggerId={triggerId}
            reduce={reduce}
            layoutTransition={layoutTransition}
            layoutDependency={activeValue}
            classNames={classNames}
            onToggle={() => toggleItem(item.id)}
          />
        );
      })}
    </div>
  );
}
