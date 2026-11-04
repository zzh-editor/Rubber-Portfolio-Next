// src/data/portfolio-data.ts

export interface WorkExperienceItem {
  id: string;
  company: string;
  role: string;
  period: string;
  tags: string[];
  companyIntro?: string;
  highlights: string[];
  achievement?: string;
}

export interface ProjectItem {
  id: number;
  title: string;
  imageSrc: string;
  videoUrl: string;
  platform: "vimeo" | "bilibili";
}

export interface SocialLinkItem {
  id: string;
  name: string;
  label: string;
  url?: string;
  copyValue?: string;
  copyToast?: string;
}

export const personalProfile = {
  name: "张壮浩",
  nickname: "张橡胶",
  englishName: "Rubber",
  siteTitle: "张橡胶 / Rubber — 视频团队负责人 & 创作者",
  role: "视频团队负责人",
  currentFocus: "现负责游戏留学行业视频内容体系搭建",
  tagline: "从镜头后的创作者到团队前的管理者",
  birthYear: 1998,
  hometown: "汕尾",
  heroWords: {
    topWord: "creating",
    rightWord: "your",
    bottomWord: "story",
  },
  bioParagraphs: [
    "1998 年生于汕尾，从摄影工作室学徒到视频团队负责人，用 8 年时间完成从执行到管理的跨越。",
    "一个脱离了信息茧房的人，具备极高的信息检索能力和学习能力，审美在线，在内容创作上具备一定的悟性和灵性。",
    "擅长将创意转化为可执行的标准流程，让团队产出既有质量又有效率。",
    "现负责游戏留学行业视频内容体系搭建。",
  ],
  assets: {
    logo: "/images/logo.png",
    heroVideoMp4: "/hero.mp4",
    heroVideoWebm: "/hero.webm",
    resumePdf: {
      path: "/Rubber-Resume.pdf",
      buttonText: "下载简历",
      metaLabel: "PDF · A4 · 641 KB",
      ariaLabel: "下载简历 PDF",
    },
    aboutPhotos: [],
  },
};

export const workExperiences: WorkExperienceItem[] = [
  {
    id: "max-cg",
    company: "麦克思游戏CG",
    role: "视频团队负责人",
    period: "2025.08 - 至今",
    tags: ["体系搭建", "团队管理", "流程设计"],
    companyIntro:
      "游戏行业海外留学机构，业务涵盖游戏设计、3D 建模、动画制作等专业方向的留学咨询与作品集培训。",
    highlights: [
      "制定视频生产 SOP：统一不同平台参数规范（抖音、小红书、B站、视频号），梳理从需求接收到成片交付的排期与响应机制。",
      "搭建直播技术与内容标准：设计基于 OBS 的多平台直播方案、直播间视觉包装与切片制作 SOP。",
      "建立跨部门协作机制。",
    ],
  },
  {
    id: "today-well-spent",
    company: "Today Well Spent",
    role: "多媒体编辑",
    period: "2022.09 - 2024.05",
    tags: ["直播体系搭建", "视觉包装", "技术方案设计"],
    companyIntro: "专为都市“忙人”打造的身心脑健康生活方式品牌。",
    highlights: [
      "直播技术方案设计：硬件选型、OBS 推流、多机位切换、3 套直播场景（产品展示、嘉宾访谈、互动答疑）。",
      "视觉包装：直播间片头片尾动画、字幕条模板、产品展示卡片、直播间灯光与布景调试。",
    ],
  },
  {
    id: "neon-now",
    company: "此刻霓虹",
    role: "内容策划",
    period: "2024 - 2025",
    tags: ["内容策划", "文案撰写", "素材检索", "剪辑包装"],
    companyIntro: "服务俱乐部、Live House 的 SaaS 公司，在抖音等平台开发自媒体内容。",
    highlights: ["负责短视频内容策划、文案撰写、素材检索与后期剪辑包装。"],
  },
  {
    id: "early-career",
    company: "其它早期经历",
    role: "自由摄影师 / 咖啡师 / 摄影助理",
    period: "2017 - 2022",
    tags: ["婚礼与活动摄影", "198印象", "直火烘焙", "商业摄影"],
    highlights: [
      "婚礼与活动摄影、人文公众号「198印象」运营、自学直火烘焙、商业摄影与摄像基础。",
    ],
  },
];

export const skillsMatrix = {
  management: [
    "团队管理与 OKR 制定",
    "SOP 流程设计与文档化",
    "跨部门协作与需求对接",
    "项目排期与资源调配",
  ],
  technical: [
    "视频制作（Premiere Pro / After Effects / DaVinci Resolve）",
    "摄影系统（单反/微单、相机稳定器、Capture One）",
    "直播技术（OBS 推流、多机位切换、直播间搭建）",
    "信息检索 / AI 工具应用 / C1 驾驶证 / 咖啡烘焙与冲煮",
  ],
  content: [
    "视频策划与创意",
    "直播方案设计",
    "脚本撰写与审核",
    "视觉风格把控",
  ],
};

export const projectsPage = {
  title: "项目案例",
  subtitle: "从直播体系 0-1 搭建，到视频内容标准化生产",
  description: "以下是我在不同团队与赛道中，主导参与的核心项目。",
  items: [
    {
      id: 1,
      title: "我们「偷窥」了爱人们的深度对话",
      imageSrc: "/images/thumbnails/lovers-talk.png",
      videoUrl: "https://vimeo.com/1180287591",
      platform: "vimeo",
    },
    {
      id: 3,
      title: "巴西战舞神经科学工作坊",
      imageSrc: "/images/thumbnails/capoeira.png",
      videoUrl: "https://vimeo.com/1180288148",
      platform: "vimeo",
    },
    {
      id: 4,
      title: "2024/03/23 香港",
      imageSrc: "/images/thumbnails/hk-2024.jpg",
      videoUrl: "https://www.bilibili.com/video/BV1S2421P7mv/",
      platform: "bilibili",
    },
    {
      id: 5,
      title: "Phuket, Phi Phi, Chiang Mai(2024)",
      imageSrc: "/images/thumbnails/thailand-2024.jpg",
      videoUrl: "https://www.bilibili.com/video/BV1rXg5eFEHS/",
      platform: "bilibili",
    },
    {
      id: 6,
      title: "低苦艾乐队 2023 巡演 上海站",
      imageSrc: "/images/thumbnails/dimu-ai.jpg",
      videoUrl: "https://www.bilibili.com/video/BV1aQ4y1j7aE/",
      platform: "bilibili",
    },
    {
      id: 7,
      title: "椎名林檎：苹果女王的音乐旅程",
      imageSrc: "/images/thumbnails/bilibili-1.jpg",
      videoUrl: "https://www.bilibili.com/video/BV1Pqkdy5EjV/",
      platform: "bilibili",
    },
    {
      id: 8,
      title: "塑造Afrobeats未来的那些重要音乐人",
      imageSrc: "/images/thumbnails/bilibili-2.jpg",
      videoUrl: "https://www.bilibili.com/video/BV1w7knY3EEA/",
      platform: "bilibili",
    },
    {
      id: 9,
      title: "星际牛仔中不容错过的隐藏佳作！",
      imageSrc: "/images/thumbnails/bilibili-3.jpg",
      videoUrl: "https://www.bilibili.com/video/BV1VHzzYzEp4/",
      platform: "bilibili",
    },
    {
      id: 10,
      title: "对话｜超马跑者郭瑛彤：女人强起来，就像女人一样",
      imageSrc: "/images/thumbnails/bilibili-4.jpg",
      videoUrl: "https://www.bilibili.com/video/BV1zsNuzREZE/",
      platform: "bilibili",
    },
    {
      id: 11,
      title: "A Trip to Vietnam",
      imageSrc: "/images/thumbnails/a-trip-to-vietnam.jpg",
      videoUrl: "https://www.bilibili.com/video/BV1Rcnb6oEgE/",
      platform: "bilibili",
    },
  ] satisfies ProjectItem[],
};

export const galleryItems = [
  {
    id: 1,
    image:
      "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/3bd439dd-30d3-4cf6-a7a5-460a895a6f18/7FBF636F-DF6F-473D-8E7B-8E2F9019AC55-resized-1775457450933.jpg",
  },
  {
    id: 2,
    image:
      "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/3bd439dd-30d3-4cf6-a7a5-460a895a6f18/88A6AA3E-F0BC-4055-9480-7DDE421A479C-resized-1775457450142.jpg",
  },
  {
    id: 3,
    image:
      "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/3bd439dd-30d3-4cf6-a7a5-460a895a6f18/598B0567-F0C4-4E7C-9C23-6C20F24C01A6-resized-1775457450861.jpg",
  },
  {
    id: 4,
    image:
      "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/3bd439dd-30d3-4cf6-a7a5-460a895a6f18/624C1B27-2588-43F7-8EA2-222DF652A7D6-resized-1775457450822.jpg",
  },
  {
    id: 5,
    image:
      "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/3bd439dd-30d3-4cf6-a7a5-460a895a6f18/773A8F7F-0875-4366-B6A4-B825A1661493-resized-1775457450880.jpg",
  },
  {
    id: 6,
    image:
      "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/3bd439dd-30d3-4cf6-a7a5-460a895a6f18/846D0845-602B-4B6B-A233-FAC3B4E3E207-resized-1775457450553.jpg",
  },
  {
    id: 7,
    image:
      "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/3bd439dd-30d3-4cf6-a7a5-460a895a6f18/A9BE56BA-7CA7-4F7E-B05B-E8E4867BF3C1-resized-1775457854654.jpg",
  },
  {
    id: 8,
    image:
      "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/3bd439dd-30d3-4cf6-a7a5-460a895a6f18/A99B408B-DCDC-4D21-ADA8-3B21D8D6C7BE-resized-1775457855570.jpg",
  },
  {
    id: 9,
    image:
      "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/3bd439dd-30d3-4cf6-a7a5-460a895a6f18/C8240CD8-C746-4D90-97FF-60A1D2983DB2-resized-1775457854654.jpg",
  },
  {
    id: 10,
    image:
      "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/3bd439dd-30d3-4cf6-a7a5-460a895a6f18/F62300A8-D559-43E2-B46B-F0BA6E34CE75-resized-1775457855218.jpg",
  },
];

export const socialLinks: SocialLinkItem[] = [
  {
    id: "xiaohongshu",
    name: "小红书",
    label: "小红书",
    url: "https://xhslink.com/m/4VPfg578D0t",
  },
  {
    id: "bilibili",
    name: "Bilibili",
    label: "Bilibili",
    url: "https://space.bilibili.com/1516012",
  },
  {
    id: "instagram",
    name: "Instagram",
    label: "Instagram @zhjane",
    url: "https://www.instagram.com/zhjane/",
  },
  {
    id: "wechat",
    name: "微信",
    label: "WeChat",
    copyValue: "Rubber_WeChat_ID",
    copyToast: "微信号已复制",
  },
];
