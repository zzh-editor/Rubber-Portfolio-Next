"use client";

import { useState } from "react";
import { ExpandableTabs } from "@/components/motion/expandable-tabs";
import { ProjectFolder, type ProjectFolderPreview } from "@/components/motion/project-folder";
import { AnimatedToastStack, useAnimatedToastStack } from "@/components/motion/animated-toast-stack";
import ProjectOverlay from "@/components/ProjectOverlay";
import { skills } from "@/data/skills";
import { projectsPage, galleryItems } from "@/data/projects";
import { socialLinks } from "@/data/social";
import { useVisibleAnimation } from "@/lib/hooks/use-visible-animation";

const PeopleIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
    <path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1zm-7.978-1L7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002-.014.002zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4m3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0M6.936 9.28a6 6 0 0 0-1.23-.247A7 7 0 0 0 5 9c-4 0-5 3-5 4q0 1 1 1h4.216A2.24 2.24 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816M4.92 10A5.5 5.5 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275ZM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0m3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4"/>
  </svg>
);

const DiagramIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
    <path fillRule="evenodd" d="M6 3.5A1.5 1.5 0 0 1 7.5 2h1A1.5 1.5 0 0 1 10 3.5v1A1.5 1.5 0 0 1 8.5 6v1H11a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-1 0V8h-5v.5a.5.5 0 0 1-1 0v-1A.5.5 0 0 1 5 7h2.5V6A1.5 1.5 0 0 1 6 4.5zM8.5 5a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5zM3 11.5A1.5 1.5 0 0 1 4.5 10h1A1.5 1.5 0 0 1 7 11.5v1A1.5 1.5 0 0 1 5.5 14h-1A1.5 1.5 0 0 1 3 12.5zm1.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zm4.5.5a1.5 1.5 0 0 1 1.5-1.5h1a1.5 1.5 0 0 1 1.5 1.5v1a1.5 1.5 0 0 1-1.5 1.5h-1A1.5 1.5 0 0 1 9 12.5zm1.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5z"/>
  </svg>
);

const CollectionIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
    <path d="M2.5 3.5a.5.5 0 0 1 0-1h11a.5.5 0 0 1 0 1zm2-2a.5.5 0 0 1 0-1h7a.5.5 0 0 1 0 1zM0 13a1.5 1.5 0 0 0 1.5 1.5h13A1.5 1.5 0 0 0 16 13V6a1.5 1.5 0 0 0-1.5-1.5h-13A1.5 1.5 0 0 0 0 6zm1.5.5A.5.5 0 0 1 1 13V6a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-.5.5z"/>
  </svg>
);

function SendIconComponent({ breatheRef }: { breatheRef?: React.Ref<HTMLSpanElement> }) {
  return (
    <span className="contact-breathe-accent" ref={breatheRef}>
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
        <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576zm6.787-8.201L1.591 6.602l4.339 2.76z"/>
      </svg>
    </span>
  );
}

const introduction = [
  { text: "张壮浩" },
  {
    text: "1998 年生于汕尾,从摄影工作室学徒到视频团队负责人，用 8 年时间完成从执行到管理的跨越。",
  },
  {
    text: "一个脱离了信息茧房的人，具备极强的信息检索能力和学习能力，审美在线，在内容创作上具备一定的悟性和灵性。",
  },
  {
    text: "擅长将创意转化为可执行的标准流程，让团队产出既有质量又有效率。",
  },
  {
    text: "现负责游戏留学行业视频内容体系搭建。",
  },
];

type OverlayItem =
  | { type: "video"; thumbnail: string; videoUrl: string; title: string }
  | { type: "image"; src: string };

export default function AboutSection() {
  const [overlayItem, setOverlayItem] = useState<OverlayItem | null>(null);
  const { toasts, showToast, dismissToast } = useAnimatedToastStack({ defaultDuration: 2500 });
  const breatheRef = useVisibleAnimation<HTMLSpanElement>();

  const videoPreviews: ProjectFolderPreview[] = projectsPage.items.map((project) => ({
    id: `video-${project.id}`,
    content: (
      <div
        className="group block w-full h-full cursor-pointer"
        onClick={(e) => {
          e.stopPropagation();
          setOverlayItem({
            type: "video",
            thumbnail: project.imageSrc,
            videoUrl: project.videoUrl,
            title: project.title,
          });
        }}
      >
        <div className="w-full h-full overflow-hidden">
          <img
            src={project.imageSrc}
            alt={project.title}
            loading="lazy"
            className="w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-80"
          />
        </div>
      </div>
    ),
  }));

  const photoPreviews: ProjectFolderPreview[] = galleryItems.map((item) => ({
    id: `photo-${item.id}`,
    content: (
      <div
        className="group block w-full h-full cursor-pointer"
        onClick={(e) => {
          e.stopPropagation();
          setOverlayItem({ type: "image", src: item.image });
        }}
      >
        <div className="w-full h-full overflow-hidden">
          <img
            src={item.image}
            alt={`Photo ${item.id}`}
            loading="lazy"
            className="w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-80"
          />
        </div>
      </div>
    ),
  }));

  const expandableItems = [
    {
      id: "management",
      label: "管理能力",
      icon: PeopleIcon,
      content: (
        <ul className="flex flex-col gap-1.5">
          {skills.categories[0].items.map((item) => (
            <li key={item} className="text-xs text-white leading-relaxed">
              {item}
            </li>
          ))}
        </ul>
      ),
    },
    {
      id: "technical",
      label: "技术能力",
      icon: DiagramIcon,
      content: (
        <ul className="flex flex-col gap-1.5">
          {skills.categories[1].items.map((item) => (
            <li key={item} className="text-xs text-white leading-relaxed">
              {item}
            </li>
          ))}
        </ul>
      ),
    },
    {
      id: "content",
      label: "内容能力",
      icon: CollectionIcon,
      content: (
        <ul className="flex flex-col gap-1.5">
          {skills.categories[2].items.map((item) => (
            <li key={item} className="text-xs text-white leading-relaxed">
              {item}
            </li>
          ))}
        </ul>
      ),
    },
    {
      id: "contact",
      label: "联系我",
      icon: <SendIconComponent breatheRef={breatheRef} />,
      content: <ContactContent showToast={showToast} />,
    },
  ];

  return (
    <section id="about" className="relative py-32 px-6 overflow-x-clip">
      <div className="max-w-6xl mx-auto relative z-10 w-full max-w-full lg:max-w-6xl overflow-hidden">
        <div className="flex flex-col gap-6 mb-10">
          {introduction.map((p, i) =>
            i === 0 ? (
              <h2 key={i} className="macro text-[clamp(2rem,5vw,4rem)] text-[#ffffff]">
                {p.text}
              </h2>
            ) : (
              <p key={i} className="text-sm text-[#ffffffcc] leading-relaxed">
                {p.text}
              </p>
            )
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr] items-start gap-10 lg:gap-16 w-full max-w-full overflow-hidden">
          <div className="flex justify-center min-w-0">
            <ExpandableTabs
              items={expandableItems}
              defaultValue="technical"
            />
          </div>

          <div className="flex flex-row gap-3 sm:gap-6 justify-center lg:justify-end min-w-0 max-w-full overflow-hidden">
            <ProjectFolder title="VIDEO" previews={videoPreviews} />
            <ProjectFolder title="PHOTOGRAPHY" previews={photoPreviews} />
          </div>
        </div>
      </div>

      {overlayItem && (
        <ProjectOverlay item={overlayItem} onClose={() => setOverlayItem(null)} />
      )}

      <AnimatedToastStack
        toasts={toasts}
        onDismiss={dismissToast}
        position="bottom-center"
        fixed
      />
    </section>
  );
}

const ContactContent = ({ showToast }: { showToast: (input: { title: string; status?: "success" | "info" | "error" | "neutral" | "loading" }) => string }) => {
  const contactLinks = socialLinks.map((link) => ({
    ...link,
    onClick: link.behavior === "copy"
      ? (e: React.MouseEvent) => {
          e.preventDefault();
          navigator.clipboard.writeText(link.copyText || "");
          showToast({ title: "微信号已复制", status: "success" });
        }
      : undefined,
  }));

  return (
    <div className="flex flex-col items-center justify-center h-full min-h-[120px]">
      <div className="flex items-center justify-center gap-6">
        {contactLinks.map((item) => (
          <a
            key={item.name}
            href={item.behavior === "copy" ? "#" : item.href}
            target={item.behavior === "copy" ? undefined : "_blank"}
            rel={item.behavior === "copy" ? undefined : "noopener noreferrer"}
            className="w-8 h-8 text-[rgba(255,255,255,0.6)] hover:text-white transition-colors flex items-center justify-center"
            title={item.name}
            onClick={item.onClick}
          >
            <span
              className="block w-full h-full social-icon-wrap"
              dangerouslySetInnerHTML={{ __html: item.svg }}
            />
          </a>
        ))}
      </div>
    </div>
  );
};
