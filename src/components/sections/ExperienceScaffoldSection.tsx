"use client";

import React from "react";
import Image from "next/image";
import { BouncyAccordion, type BouncyAccordionItem } from "@/components/ui/beui/bouncy-accordion";
import { ArrowUpRight } from "lucide-react";

interface WorkExperienceDetail {
  id: string;
  company: string;
  url?: string;
  favicon?: string;
  role: string;
  period: string;
  tags?: string[];
  description: string;
  highlights: {
    label: string;
    items: string[];
  }[];
  achievements?: string[];
  earlyItems?: string[];
}

const detailedExperiences: WorkExperienceDetail[] = [
  {
    id: "max-cg",
    company: "麦壳思游戏CG",
    url: "https://www.maxsacademy.com/zh",
    favicon: "/images/favicons/maxs.ico",
    role: "视频团队负责人",
    period: "2025.08 - 至今",
    tags: ["体系搭建", "团队管理", "流程设计"],
    description:
      "麦壳思游戏CG 是一家面向游戏行业的海外留学机构，业务涵盖游戏设计、3D 建模、动画制作等专业方向的留学咨询与作品集培训。在竞争激烈的游戏留学赛道，内容营销是获客的核心手段。公司需要通过高质量、标准化的视频内容快速占领市场，同时保证团队能够稳定、高效地产出。",
    highlights: [
      {
        label: "1. 制定视频生产 SOP",
        items: [
          "参数标准化：制定不同平台的视频参数规范（抖音、小红书、B站、视频号），统一分辨率、码率、帧率、色彩空间标准，建立素材命名与文件管理规则。",
          "成片流程：梳理从需求接收到成片交付的完整流程，制定排期表模板明确各环节时间节点，建立紧急需求的快速响应机制。",
        ],
      },
      {
        label: "2. 搭建直播技术与内容标准",
        items: [
          "技术方案：设计基于 OBS 的多平台直播方案，搭建直播间视觉包装（片头片尾、转场动画、字幕模板）。",
          "内容规范：制定直播后切片流程，确立直播从开播到切片制作 SOP 全流程。",
        ],
      },
      {
        label: "3. 跨部门协作机制",
        items: [
          "与运营组对接营销需求，明确目标受众与传播目标。",
          "与平面组对接品牌调性，确保视频风格统一。",
          "与教学部门对接专业内容，保证信息准确性制作课程视频。",
        ],
      },
      {
        label: "4. 团队 OKR 制定与执行",
        items: [
          "目标设定：制定季度 OKR（月均产出成片量、直播场次达标率、用户互动率提升），分解到组员个人目标。",
          "执行追踪：周例会回顾进度、调整优先级，月度复盘总结经验并持续迭代流程。",
        ],
      },
    ],
  },
  {
    id: "today-well-spent",
    company: "Today Well Spent",
    url: "https://www.todaywellspent.com/",
    favicon: "/images/favicons/todaywellspent.gif",
    role: "多媒体编辑",
    period: "2022.09 - 2024.05",
    tags: ["直播全流程", "全系产品图拍摄", "线下活动与 Campaign"],
    description:
      "Today Well Spent 是一个专为都市“忙”人打造的“身心脑”健康生活方式品牌。公司希望通过直播形式与用户建立更深度的连接，传递品牌理念，同时进行产品推广。此前公司没有任何直播经验，需要从 0 到 1 搭建完整的直播体系。",
    highlights: [
      {
        label: "1. 直播全流程",
        items: [
          "设备配置：选型摄像头、麦克风、补光灯等硬件设备，搭建基于 OBS 推流系统，设计多机位切换方案（主讲画面 + 产品特写 + 场景切换）。",
          "场景设计：设计 3 套直播场景（产品展示 + 嘉宾访谈 + 互动答疑），制作场景切换转场动画，设计实时字幕与互动弹幕展示方式。",
          "品牌视觉统一：设计直播间片头片尾动画，制作下三分屏字幕条模板，设计产品展示卡片与引导关注动画。",
          "直播间布景：规划直播间空间布局，设计背景墙与道具摆放，调试灯光方案确保画面质感。",
        ],
      },
      {
        label: "2. 全系产品图拍摄",
        items: [
          "为不同系列实体产品/联名产品拍摄符合电商平台规范的产品图和产品视频。",
          "海内外社交平台内容，拍摄符合品牌基调的生活方式配图和视频的拍摄、剪辑。",
        ],
      },
      {
        label: "3. 线下活动与 Campaign",
        items: [
          "负责线下活动的全流程跟拍，针对连续多天的线下活动，当天拍摄当天精修出图，并在活动结束后剪辑活动的回顾视频。",
          "根据品牌的节日和季节性 campaign 拍摄特定主题的产品配图与视频。",
        ],
      },
    ],
  },
  {
    id: "neon-now",
    company: "此刻霓虹",
    url: "https://www.neontech.cn/#/",
    favicon: "/images/favicons/neon.svg",
    role: "内容策划",
    period: "2024 - 2025",
    tags: ["内容策划", "文案撰写", "素材检索", "剪辑包装"],
    description:
      "此刻霓虹是一家 SaaS 公司，主要服务对象为俱乐部、Live House，同时运营官方售票平台。为扩大品牌影响力，公司在抖音等流媒体平台发布音乐类科普视频。",
    highlights: [
      {
        label: "内容策划",
        items: [
          "参与视频选题讨论，从音乐人、音乐风格、音乐产业趋势等角度切入。",
          "分析目标受众兴趣点，确保选题既有深度又有传播性。",
        ],
      },
      {
        label: "文案撰写",
        items: [
          "撰写部分视频脚本（如《椎名林檎：苹果女王的音乐旅程》）。",
          "将专业音乐知识转化为通俗易懂的语言，保持内容深度与趣味性平衡。",
        ],
      },
      {
        label: "素材检索与剪辑",
        items: [
          "全权负责视频素材检索（音乐人演出片段、MV、采访、演唱会）。",
          "完成视频剪辑与包装（节奏卡点、转场设计、字幕排版）。",
        ],
      },
    ],
  },
  {
    id: "early-career",
    company: "其它早期经历",
    role: "自由摄影师 / 咖啡师 / 摄影助理",
    period: "2017 - 2022",
    description: "早期从事摄影、咖啡行业，完成从执行到管理的原始积累。",
    highlights: [],
    earlyItems: [
      "婚礼、活动摄影与老家人文公众号「198印象」运营",
      "咖啡师，自学直火烘焙",
      "摄影工作室学徒，建立商业摄影与摄像基础",
    ],
  },
];

export function ExperienceScaffoldSection() {
  const accordionItems: BouncyAccordionItem[] = detailedExperiences.map((exp) => {
    // 渲染图标：仅当有真实 favicon 时展示且不带外线框，否则不展示任何占位图标
    const iconElement = exp.favicon ? (
      <Image
        src={exp.favicon}
        alt={exp.company}
        width={20}
        height={20}
        className="size-5 object-contain"
        unoptimized
      />
    ) : undefined;

    // 渲染标题：若有官网外链则带跳转小箭头，阻止事件冒泡保证展开手感
    const titleElement = exp.url ? (
      <span className="inline-flex items-center gap-1 group/link">
        <a
          href={exp.url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="hover:underline underline-offset-4 decoration-neutral-400 dark:decoration-neutral-500 text-neutral-900 dark:text-neutral-100 font-semibold"
        >
          {exp.company}
        </a>
        <ArrowUpRight className="size-3.5 text-neutral-400 group-hover/link:text-neutral-700 dark:group-hover/link:text-neutral-200" />
      </span>
    ) : (
      <span>{exp.company}</span>
    );

    // 渲染时间：若包含“至今”则以统一色值 #3b82f6 蓝色轻柔辉光高亮，不带外围线框
    const periodElement = exp.period.includes("至今") ? (
      <span className="font-mono">
        <span>{exp.period.replace("至今", "")}</span>
        <span className="text-[#3b82f6] font-semibold drop-shadow-[0_0_8px_rgba(59,130,246,0.65)]">
          至今
        </span>
      </span>
    ) : (
      <span className="font-mono">{exp.period}</span>
    );

    return {
      id: exp.id,
      title: titleElement,
      subtitle: exp.role,
      period: periodElement,
      icon: iconElement,
      description: (
        <div className="space-y-4 pt-2">
          {/* 公司业务背景描述 */}
          <p className="text-xs sm:text-[13.5px] leading-relaxed text-neutral-600 dark:text-neutral-400">
            {exp.description}
          </p>

          {/* 技能/领域标签 */}
          {exp.tags && exp.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {exp.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 border border-neutral-200/70 dark:border-neutral-700/60"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* 完整亮点细项 */}
          {exp.highlights.length > 0 && (
            <div className="space-y-3.5 pt-1">
              {exp.highlights.map((hl, hIdx) => (
                <div key={hIdx} className="space-y-1.5">
                  <h4 className="text-xs sm:text-[13px] font-semibold text-neutral-800 dark:text-neutral-200">
                    {hl.label}
                  </h4>
                  <ul className="space-y-1.5 pl-1">
                    {hl.items.map((item, itemIdx) => (
                      <li key={itemIdx} className="flex items-start gap-2 text-xs sm:text-[13px]">
                        <span className="text-neutral-400 select-none mt-0.5 shrink-0 leading-none">•</span>
                        <span className="leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}

          {/* 早期经历项 */}
          {exp.earlyItems && exp.earlyItems.length > 0 && (
            <ul className="space-y-1.5 pl-1 pt-1">
              {exp.earlyItems.map((eItem, eIdx) => (
                <li key={eIdx} className="flex items-start gap-2 text-xs sm:text-[13px]">
                  <span className="text-neutral-400 select-none mt-0.5 shrink-0 leading-none">•</span>
                  <span className="leading-relaxed">{eItem}</span>
                </li>
              ))}
            </ul>
          )}

          {/* 成果亮点 */}
          {exp.achievements && exp.achievements.length > 0 && (
            <div className="pt-2 border-t border-neutral-100 dark:border-neutral-800 space-y-1.5">
              {exp.achievements.map((ach, aIdx) => (
                <div key={aIdx} className="flex items-start gap-2 text-xs sm:text-[13px] text-neutral-700 dark:text-neutral-300 font-medium">
                  <span className="text-amber-500 font-bold select-none mt-0.5 shrink-0 leading-none">•</span>
                  <span className="leading-relaxed">{ach}</span>
                </div>
              ))}
            </div>
          )}
          {/* TodayWellSpent 专属入口：查看所有拍摄照片 */}
          {exp.id === "today-well-spent" && (
            <div className="pt-2">
              <button
                type="button"
                onClick={() => {
                  window.dispatchEvent(
                    new CustomEvent("open-gallery", {
                      detail: { category: "tws" },
                    })
                  );
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-xs font-medium hover:bg-neutral-800 dark:hover:bg-neutral-100 transition-all cursor-pointer shadow-2xs active:scale-95"
              >
                <span>👀 看看照片</span>
              </button>
            </div>
          )}
        </div>
      ),
    };
  });

  return (
    <section id="work" className="w-full space-y-4 pt-2">
      {/* 标题 */}
      <div>
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
          工作
        </h2>
      </div>

      {/* Bouncy Accordion 组件 */}
      <BouncyAccordion items={accordionItems} defaultValue={detailedExperiences[0]?.id} />
    </section>
  );
}
