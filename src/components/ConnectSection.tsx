"use client";

export default function ConnectSection() {
  return (
    <section id="connect" className="py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <a
          href="/Rubber-Resume.pdf"
          download="Rubber-Resume.pdf"
          className="download-resume-btn group relative block p-8 text-center cursor-pointer overflow-hidden"
          aria-label="下载简历 PDF"
        >
          <div className="macro font-black text-accent animate-pulse-resume leading-none text-[clamp(1.75rem,4vw,3.25rem)] tracking-tight">
            下载简历
          </div>
          <div className="micro text-muted mt-3 group-hover:text-accent transition-colors">
            PDF · A4 · 641 KB
          </div>
        </a>
      </div>
    </section>
  );
}
