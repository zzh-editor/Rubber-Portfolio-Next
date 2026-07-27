"use client";

import { useState } from "react";
import { socialLinks } from "@/data/social";

export default function SocialIconLinks({
  size = "w-5 h-5",
  className,
}: {
  size?: string;
  className?: string;
}) {
  const [copySuccess, setCopySuccess] = useState<string | null>(null);

  return (
    <div className={className}>
      {socialLinks.map((link) => (
        <div key={link.name} className="relative inline-flex">
          <a
            href={link.behavior === "copy" ? "#" : link.href}
            target={link.behavior === "copy" ? undefined : "_blank"}
            rel={link.behavior === "copy" ? undefined : "noopener noreferrer"}
            className={`${size} text-muted hover:text-foreground transition-colors`}
            title={link.name}
            onClick={
              link.behavior === "copy"
                ? (e) => {
                    e.preventDefault();
                    navigator.clipboard.writeText(link.copyText || "");
                    setCopySuccess(link.copyMessage || null);
                    setTimeout(() => setCopySuccess(null), 2000);
                  }
                : undefined
            }
          >
            <span
              className="block w-full h-full leading-none social-icon-wrap"
              style={{ lineHeight: 0 }}
              dangerouslySetInnerHTML={{ __html: link.svg }}
            />
          </a>
          {copySuccess && link.behavior === "copy" && (
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 whitespace-nowrap z-50 pointer-events-none">
              <div className="micro text-accent bg-background border border-accent px-2 py-1">
                {copySuccess}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
