import type { Lang } from '@/components/context/LanguageContext'

// Central UI string dictionary. Components call `t(lang, key)` or destructure
// `ui(lang)` to get the object for the active language.

export interface UIStrings {
  nav: {
    home: string
    research: string
    publications: string
    projects: string
    startup: string
    experience: string
    contact: string
  }
  hero: {
    ctaResearch: string
    ctaStartup: string
  }
  researchPreview: {
    title: string
    subtitle: string
    viewAll: string
  }
  paperHighlights: {
    title: string
    subtitle: string
    viewAll: string
  }
  startupHighlight: {
    title: string
    subtitle: string
    statusActive: string
    statusArchived: string
    website: string
    learnMore: string
    viewAll: string
  }
  latestNews: {
    title: string
    subtitle: string
    viewAll: string
  }
  footer: {
    builtWith: string
  }
  researchPage: {
    title: string
    subtitle: string
    relatedPubs: string
    relatedProjects: string
    viewAllPubs: string
    viewAllProjects: string
  }
  publicationsPage: {
    title: string
    subtitle: (total: number, journal: number, conference: number, preprint: number) => string
    statTotal: string
    statJournal: string
    statConference: string
    statTopTier: string
    typeJournal: string
    typeConference: string
    typePreprint: string
    featured: string
    papers: (n: number) => string
    viewScholar: string
  }
  projectsPage: {
    title: string
    subtitle: (n: number) => string
    visitProject: string
    viewResearch: string
  }
  startupPage: {
    badge: string
    heroTitle: string
    heroDesc: string
    productsTitle: string
    productsSubtitle: string
    foundedIn: string
    coreFeatures: string
    techStack: string
    visitSite: string
    capabilitiesTitle: string
    capabilitiesSubtitle: string
    timelineTitle: string
    timelineSubtitle: string
    viewFullCv: string
    contactCollab: string
    capabilities: { icon: string; title: string; desc: string; tag: string }[]
    timeline: { date: string; title: string; desc: string }[]
  }
  experiencePage: {
    title: string
    subtitle: string
    education: string
    work: string
    startupBadge: string
    viewStartup: string
    viewPubs: string
  }
  contactPage: {
    title: string
    subtitle: string
    emails: string
    platforms: string
    about: string
    admissionsTitle: string
    admissionsBody: string
  }
  social: {
    email: string
    cv: string
  }
}

const en: UIStrings = {
  nav: {
    home: 'Home',
    research: 'Research',
    publications: 'Publications',
    projects: 'Projects',
    startup: 'Startup',
    experience: 'Experience',
    contact: 'Contact',
  },
  hero: {
    ctaResearch: 'Research',
    ctaStartup: 'Startup',
  },
  researchPreview: {
    title: 'Research Directions',
    subtitle: 'From 3D reconstruction and computational imaging to real-time holographic communication',
    viewAll: 'View all research directions',
  },
  paperHighlights: {
    title: 'Selected Papers',
    subtitle: 'Representative work · spanning SIGGRAPH / ICCV / ECCV / ACM TOG',
    viewAll: 'View all publications',
  },
  startupHighlight: {
    title: 'Startup Projects',
    subtitle: 'From research to product · AI quantitative trading and blockchain digital art',
    statusActive: 'Active',
    statusArchived: 'Archived',
    website: 'Website',
    learnMore: 'Learn more',
    viewAll: 'View startup details',
  },
  latestNews: {
    title: 'Latest News',
    subtitle: 'Recent updates and milestones',
    viewAll: 'View full experience',
  },
  footer: {
    builtWith: 'Built with Next.js & Tailwind CSS.',
  },
  researchPage: {
    title: 'Research Directions',
    subtitle: 'Three directions connecting 3D reconstruction, computational imaging, and real-time holographic communication',
    relatedPubs: 'Related Publications',
    relatedProjects: 'Related Projects',
    viewAllPubs: 'View all publications',
    viewAllProjects: 'View all projects',
  },
  publicationsPage: {
    title: 'Publications',
    subtitle: (total, journal, conference, preprint) =>
      `${total} total · Journal ${journal} · Conference ${conference} · Preprint ${preprint}`,
    statTotal: 'Total',
    statJournal: 'Journal',
    statConference: 'Conference',
    statTopTier: 'Top-tier',
    typeJournal: 'Journal',
    typeConference: 'Conference',
    typePreprint: 'Preprint',
    featured: '★ Featured',
    papers: (n) => `${n} papers`,
    viewScholar: 'View full citations on Google Scholar',
  },
  projectsPage: {
    title: 'Research Projects',
    subtitle: (n) =>
      `${n} research projects spanning neural rendering, computational photography, visual tracking and machine learning`,
    visitProject: 'Visit project',
    viewResearch: 'View research directions',
  },
  startupPage: {
    badge: 'Startup · Entrepreneurship',
    heroTitle: 'Turning Computational Imaging & AI into Products',
    heroDesc:
      'From research to entrepreneurship — building products in quantitative trading and digital art with neural rendering, real-time AI systems and blockchain.',
    productsTitle: 'Startup Projects',
    productsSubtitle: 'Two ventures covering AI quantitative trading and blockchain digital art',
    foundedIn: 'Founded',
    coreFeatures: 'Core Features',
    techStack: 'Tech Stack',
    visitSite: 'Visit website',
    capabilitiesTitle: 'Technical Capabilities',
    capabilitiesSubtitle: 'Translating research capability into product capability',
    timelineTitle: 'Startup Timeline',
    timelineSubtitle: 'Entrepreneurship milestones',
    viewFullCv: 'View full CV',
    contactCollab: 'Contact for collaboration',
    capabilities: [
      { icon: 'cpu', title: 'AI Systems Engineering', desc: 'Real-time deep learning inference, low-latency signal pipelines, mainstream framework integration', tag: 'Real-time AI' },
      { icon: 'box', title: '3D Reconstruction & Rendering', desc: 'Multiview capture, neural rendering, photo-realistic 3D asset generation', tag: 'Neural Rendering' },
      { icon: 'link', title: 'Blockchain / NFT', desc: 'On-chain minting, real-scene data on-chain, end-to-end digital collectibles', tag: 'Web3' },
      { icon: 'rocket', title: 'Productization', desc: 'From research prototype to production system, crypto exchange integration', tag: 'Product' },
    ],
    timeline: [
      { date: '2018-05', title: 'Founded SigTrading', desc: 'Launched real-time AI quantitative trading system R&D for crypto exchanges' },
      { date: '2021-03', title: 'Founded Capmake', desc: 'Explored blockchain digital art, turning real-scene data into on-chain collectibles' },
      { date: '2021+', title: '3D NFT Product Line', desc: 'Fused multiview reconstruction capability within SigTrading to generate real-scene 3D NFTs' },
      { date: 'Present', title: 'Ongoing Operations', desc: 'SigTrading continues to operate, connecting AI, finance and 3D vision' },
    ],
  },
  experiencePage: {
    title: 'Academic CV',
    subtitle: 'Education and career · from Xi’an to Shenzhen, spanning academia and industry',
    education: 'Education',
    work: 'Work Experience',
    startupBadge: '★ Startup',
    viewStartup: 'View startup details',
    viewPubs: 'View publications',
  },
  contactPage: {
    title: 'Contact',
    subtitle: 'Feel free to reach out about research collaboration, startup projects or academic exchange',
    emails: 'Primary Emails',
    platforms: 'Academic Platforms',
    about: 'About',
    admissionsTitle: 'Student Recruitment',
    admissionsBody:
      'Peng Cheng Laboratory (PCL) offers scholarships for jointly-supervised Ph.D. students (4 years, 180,000 RMB/year including stipend). Research directions involve computer graphics and wireless communication. Interested applicants please contact',
  },
  social: {
    email: 'Email',
    cv: 'CV',
  },
}

const zh: UIStrings = {
  nav: {
    home: '首页',
    research: '研究方向',
    publications: '学术论文',
    projects: '科研项目',
    startup: '创业',
    experience: '经历',
    contact: '联系',
  },
  hero: {
    ctaResearch: '研究方向',
    ctaStartup: '创业项目',
  },
  researchPreview: {
    title: '研究方向',
    subtitle: '从三维重建与计算成像到实时全息通信',
    viewAll: '查看全部研究方向',
  },
  paperHighlights: {
    title: '论文精选',
    subtitle: '代表性论文 · 涵盖 SIGGRAPH / ICCV / ECCV / ACM TOG',
    viewAll: '查看全部论文',
  },
  startupHighlight: {
    title: '创业项目',
    subtitle: '科研到产品的转化 · AI 量化交易与区块链数字艺术',
    statusActive: '运营中',
    statusArchived: '已归档',
    website: '官网',
    learnMore: '了解更多',
    viewAll: '查看创业详情',
  },
  latestNews: {
    title: '最新动态',
    subtitle: '近期动态与里程碑',
    viewAll: '查看完整经历',
  },
  footer: {
    builtWith: 'Built with Next.js & Tailwind CSS.',
  },
  researchPage: {
    title: '研究方向',
    subtitle: '三个方向打通三维重建、计算成像与实时全息通信',
    relatedPubs: '相关论文',
    relatedProjects: '相关项目',
    viewAllPubs: '查看全部论文',
    viewAllProjects: '查看全部项目',
  },
  publicationsPage: {
    title: '学术论文',
    subtitle: (total, journal, conference, preprint) =>
      `共 ${total} 篇 · 期刊 ${journal} · 会议 ${conference} · 预印本 ${preprint}`,
    statTotal: '总论文数',
    statJournal: '期刊',
    statConference: '会议',
    statTopTier: '顶会顶刊',
    typeJournal: '期刊',
    typeConference: '会议',
    typePreprint: '预印本',
    featured: '★ 代表作',
    papers: (n) => `${n} 篇`,
    viewScholar: '在 Google Scholar 查看完整引用',
  },
  projectsPage: {
    title: '科研项目',
    subtitle: (n) => `共 ${n} 个科研项目，涵盖神经渲染、计算摄影、视觉追踪与机器学习`,
    visitProject: '访问项目',
    viewResearch: '查看研究方向',
  },
  startupPage: {
    badge: '创业 · Entrepreneurship',
    heroTitle: '将计算成像与 AI 转化为产品',
    heroDesc: '从科研走向创业 — 用神经渲染、实时 AI 系统与区块链技术，在量化交易与数字艺术领域构建产品。',
    productsTitle: '创业项目',
    productsSubtitle: '两个创业项目，覆盖 AI 量化交易与区块链数字艺术',
    foundedIn: '创立于',
    coreFeatures: '核心特性',
    techStack: '技术栈',
    visitSite: '访问官网',
    capabilitiesTitle: '技术能力',
    capabilitiesSubtitle: '科研能力到产品能力的转化',
    timelineTitle: '创业历程',
    timelineSubtitle: '创业历程里程碑',
    viewFullCv: '查看完整履历',
    contactCollab: '联系合作',
    capabilities: [
      { icon: 'cpu', title: 'AI 系统工程', desc: '实时深度学习推理、低延迟信号管线、主流框架集成', tag: 'Real-time AI' },
      { icon: 'box', title: '3D 重建与渲染', desc: '多视角采集、神经渲染、照片级真实 3D 资产生成', tag: 'Neural Rendering' },
      { icon: 'link', title: '区块链 / NFT', desc: '链上铸造、真实场景数据上链、数字藏品全流程', tag: 'Web3' },
      { icon: 'rocket', title: '产品化落地', desc: '从科研原型到生产系统、加密货币交易所对接', tag: 'Product' },
    ],
    timeline: [
      { date: '2018-05', title: '创立 SigTrading', desc: '启动实时 AI 量化交易系统研发，面向加密货币交易所' },
      { date: '2021-03', title: '创立 Capmake', desc: '探索区块链数字艺术，将真实场景数据转化为链上藏品' },
      { date: '2021+', title: '3D NFT 产品线', desc: '在 SigTrading 中融合多视图重建能力，生成真实场景 3D NFT' },
      { date: '至今', title: '持续运营', desc: 'SigTrading 持续运营，连接 AI、金融与 3D 视觉' },
    ],
  },
  experiencePage: {
    title: '学术履历',
    subtitle: '教育背景与职业经历 · 从西安到深圳，跨越学术界与产业界',
    education: '教育背景',
    work: '工作经历',
    startupBadge: '★ 创业经历',
    viewStartup: '查看创业详情',
    viewPubs: '查看论文成果',
  },
  contactPage: {
    title: '联系方式',
    subtitle: '欢迎就科研合作、创业项目或学术交流与我联系',
    emails: '主要邮箱',
    platforms: '学术平台',
    about: '关于',
    admissionsTitle: '招生信息',
    admissionsBody:
      '鹏城实验室（PCL）为联合培养博士生提供奖学金（4 年，每年 18 万元含生活补贴）。研究方向涉及计算机图形学与无线通信。有意者请联系',
  },
  social: {
    email: '邮箱',
    cv: '简历 CV',
  },
}

const strings: Record<Lang, UIStrings> = { en, zh }

export function ui(lang: Lang): UIStrings {
  return strings[lang]
}
