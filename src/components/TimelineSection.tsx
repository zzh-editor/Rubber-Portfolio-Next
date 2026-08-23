"use client";

import { useMemo } from "react";
import { MorphingTabs } from "@/components/motion/morphing-tabs";
import { workExperience } from "@/data/work-experience";

type WorkEntry = (typeof workExperience.entries)[number];

function EntryDetail({ entry }: { entry: WorkEntry }) {
  return (
    <div className="space-y-5 p-6 md:p-8">
      <div>
        <div className="micro text-accent mb-1">{entry.period}</div>
        <h3 className="macro text-lg font-black uppercase tracking-tight text-[#18181b]">
          {entry.role}
        </h3>
      </div>
      <p className="text-sm leading-relaxed text-[#52525b]">{entry.description}</p>
      {entry.highlights && (
        <div className="space-y-4">
          {entry.highlights.map((h, hi) => (
            <div key={hi}>
              <p className="micro text-accent mb-2">{h.label}</p>
              <ul className="space-y-1.5">
                {h.items.map((item, ii) => (
                  <li
                    key={ii}
                    className="text-xs text-[#3f3f46] leading-relaxed"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
      {entry.items && (
        <ul className="space-y-1.5">
          {entry.items.map((item, ii) => (
            <li
              key={ii}
              className="text-xs text-[#3f3f46] leading-relaxed"
            >
              {item}
            </li>
          ))}
        </ul>
      )}
      {entry.tags && entry.tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {entry.tags.map((tag) => (
            <span key={tag} className="micro text-accent border border-accent px-3 py-1 rounded-full">
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

export default function TimelineSection() {
  const entries = workExperience.entries;

  const tabItems = useMemo(
    () =>
      entries.map((entry) => ({
        id: entry.title,
        label: entry.title,
        content: <EntryDetail entry={entry} />,
      })),
    [entries]
  );

  return (
    <section id="timeline" className="relative py-32 px-6">
      <div className="max-w-5xl mx-auto relative z-10">
        <MorphingTabs
          items={tabItems}
          ariaLabel="工作经历"
          className="w-full"
          classNames={{
            label: "text-sm md:text-base",
            tab: "px-3 md:px-5",
          }}
        />
      </div>
    </section>
  );
}
