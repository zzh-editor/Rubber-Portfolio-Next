"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

interface OpenSourceRepo {
  name: string;
  description: string;
  language: string;
  languageColor: string;
  url: string;
  tag: string;
}

const openSourceProjects: OpenSourceRepo[] = [
  {
    name: "video-transcribe",
    description:
      "基于 MLX-Whisper 的高精度本地音视频转录与双语字幕生成流水线，离线秒级转写，支持时间轴对齐与多格式导出。",
    language: "Python",
    languageColor: "#3572A5",
    url: "https://github.com/zzh-editor/video-transcribe",
    tag: "Whisper · MLX · CLI",
  },
  {
    name: "Media-downloader",
    description:
      "跨平台音视频媒体素材嗅探与批量下载工具，覆盖 Bilibili、YouTube、Vimeo、小红书等站点，支持高清转码与无水印解析。",
    language: "Python",
    languageColor: "#3572A5",
    url: "https://github.com/zzh-editor/Media-downloader",
    tag: "yt-dlp · FFmpeg · Automation",
  },
  {
    name: "Srt-Enhancer",
    description:
      "专为 ASR 识别字幕设计的增强清洗引擎，自动去除口癖助词、ASR 错别字校准、标点规范化与 9:16 竖屏短视频断句重排。",
    language: "Python",
    languageColor: "#89e051",
    url: "https://github.com/zzh-editor/Srt-Enhancer",
    tag: "NLP · Subtitles · Video Edit",
  },
];

export function OpenSourceSection() {
  return (
    <section id="opensource" className="w-full space-y-4 pt-2">
      {/* 标题 */}
      <div>
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
          开源
        </h2>
      </div>

      {/* 开源仓库卡片列表（3个指定项目） */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
        {openSourceProjects.map((repo) => (
          <Link
            key={repo.name}
            href={repo.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col justify-between p-4 rounded-2xl border border-neutral-200/90 dark:border-neutral-800 bg-white dark:bg-[#121212] hover:border-neutral-300 dark:hover:border-neutral-700 hover:bg-neutral-50/50 dark:hover:bg-neutral-800/40 transition-all duration-200 shadow-2xs"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between gap-1.5">
                <span className="font-mono text-sm font-semibold text-neutral-900 dark:text-neutral-100 group-hover:text-neutral-700 dark:group-hover:text-neutral-300 truncate">
                  {repo.name}
                </span>
                <ArrowUpRight className="size-3.5 text-neutral-400 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0" />
              </div>
              <p className="text-xs sm:text-[13px] leading-relaxed text-neutral-500 dark:text-neutral-400 line-clamp-3">
                {repo.description}
              </p>
            </div>

            <div className="flex items-center gap-2 pt-3 mt-3 border-t border-neutral-100 dark:border-neutral-800 text-[11px] font-mono text-neutral-500 dark:text-neutral-400">
              <span className="flex items-center gap-1.5 shrink-0">
                <span
                  className="size-2 rounded-full inline-block"
                  style={{ backgroundColor: repo.languageColor }}
                />
                {repo.language}
              </span>
              <span>·</span>
              <span className="text-neutral-400 dark:text-neutral-500 truncate">{repo.tag}</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
