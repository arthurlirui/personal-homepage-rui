// 独立项目数据 — 来源: resume-academic/content/home/experience.md (SigTrading/Capmake) + Studio 系列

export interface Startup {
  id: string
  name: string
  role: string
  founded: string
  status: 'active' | 'archived'
  website?: string
  tagline: string
  taglineZh: string
  description: string
  descriptionZh: string
  highlights: string[]
  highlightsZh: string[]
  techStack: string[]
  features: { title: string; desc: string }[]
  featuresZh: { title: string; desc: string }[]
  metrics?: { label: string; labelEn: string; value: string; valueEn: string }[]
  accent: string // tailwind color class for icon bg
  icon: 'trending-up' | 'palette' | 'box' | 'cpu' | 'file-text' | 'book-open' | 'globe' | 'sparkles'
  parentId?: string // if set, this is a sub-project of the given parent
}

export const startups: Startup[] = [
  {
    id: 'sigtrading',
    name: 'SigTrading',
    role: 'Founder',
    founded: '2018-05',
    status: 'active',
    website: 'https://www.algotech.cc',
    tagline: 'Real-time AI trading system for crypto exchanges',
    taglineZh: '面向加密货币交易所的实时 AI 量化交易系统',
    description:
      'SigTrading builds a real-time AI trading platform that supports mainstream deep learning frameworks, ticker-based trading algorithms running on crypto exchanges, and 3D NFT design from real-world multiview data.',
    descriptionZh:
      'SigTrading 打造实时 AI 交易平台，支持主流深度学习框架，设计基于行情的加密货币交易算法，并基于真实多视角数据设计 3D NFT。系统融合计算成像与金融工程，将科研中的多视图重建与神经渲染能力转化为数字资产。',
    highlights: [
      'Real-time AI trading system supporting mainstream deep learning frameworks',
      'Ticker-based trading algorithms deployed on crypto exchanges',
      '3D NFT generation from real-world multiview capture',
    ],
    highlightsZh: [
      '实时 AI 交易系统，支持主流深度学习框架',
      '基于行情（ticker）的加密货币交易算法',
      '从真实多视角数据生成 3D NFT',
    ],
    techStack: ['Deep Learning', 'PyTorch', 'Real-time System', 'Crypto Exchange API', '3D Reconstruction', 'NFT / Blockchain'],
    features: [
      { title: 'AI Trading Engine', desc: 'Real-time inference supporting mainstream DL frameworks, low-latency signal-to-order pipeline.' },
      { title: 'Ticker-based Algorithms', desc: 'Market-microstructure-aware strategies running natively on crypto exchanges.' },
      { title: '3D NFT from Real Scenes', desc: 'Turn real-world multiview captures into photo-realistic 3D NFT assets via neural rendering.' },
    ],
    featuresZh: [
      { title: 'AI 交易引擎', desc: '支持主流深度学习框架的实时推理，低延迟的信号到下单管线。' },
      { title: '行情驱动算法', desc: '感知市场微观结构的策略，原生运行于加密货币交易所。' },
      { title: '真实场景 3D NFT', desc: '将真实世界多视角采集转化为照片级真实 3D NFT 资产（神经渲染）。' },
    ],
    metrics: [
      { label: '成立', labelEn: 'Founded', value: '2018', valueEn: '2018' },
      { label: '状态', labelEn: 'Status', value: '运营中', valueEn: 'Active' },
      { label: '方向', labelEn: 'Focus', value: 'AI × 金融 × 3D', valueEn: 'AI × Finance × 3D' },
    ],
    accent: 'bg-accent-subtle text-accent',
    icon: 'trending-up',
  },
  {
    id: 'capmake',
    name: 'Capmake',
    role: 'Founder',
    founded: '2021-03',
    status: 'archived',
    website: 'https://www.capmake.com',
    tagline: 'Digital art on blockchain, especially from real scene data',
    taglineZh: '基于区块链的数字艺术，尤其来自真实场景数据',
    description:
      'Capmake creates digital art on the blockchain, especially from real scene data — bridging computational photography and on-chain digital collectibles.',
    descriptionZh:
      'Capmake 在区块链上创作数字艺术，尤其基于真实场景数据——连接计算摄影与链上数字藏品，探索"从真实世界到链上艺术"的创作范式。',
    highlights: [
      'Blockchain-based digital art creation',
      'Real scene data as artistic source material',
      'Bridges computational photography and on-chain collectibles',
    ],
    highlightsZh: [
      '基于区块链的数字艺术创作',
      '以真实场景数据作为艺术素材',
      '连接计算摄影与链上数字藏品',
    ],
    techStack: ['Blockchain', 'NFT', 'Computational Photography', '3D Reconstruction', 'Web3'],
    features: [
      { title: 'Real-scene Digital Art', desc: 'Generate collectible digital art from real-world multiview captures.' },
      { title: 'On-chain Minting', desc: 'Mint photo-realistic 3D / multiview assets as blockchain NFTs.' },
    ],
    featuresZh: [
      { title: '真实场景数字艺术', desc: '从真实多视角采集生成可收藏的数字艺术。' },
      { title: '链上铸造', desc: '将照片级真实 3D / 多视角资产铸造为区块链 NFT。' },
    ],
    metrics: [
      { label: '成立', labelEn: 'Founded', value: '2021', valueEn: '2021' },
      { label: '状态', labelEn: 'Status', value: '已归档', valueEn: 'Archived' },
      { label: '方向', labelEn: 'Focus', value: 'Web3 × 数字艺术', valueEn: 'Web3 × Digital Art' },
    ],
    accent: 'bg-amber-50 text-amber-700',
    icon: 'palette',
  },
  {
    id: 'paper-studio',
    name: 'Paper Studio',
    role: 'Creator',
    founded: '2024-06',
    status: 'active',
    parentId: 'aigc-studio',
    tagline: 'Interactive visualization and presentation toolkit for academic papers',
    taglineZh: '学术论文交互式可视化与展示工具',
    description:
      'Paper Studio transforms academic papers into interactive, visual experiences — embedding 3D reconstructions, differentiable rendering demos, and animated figures directly into publication pages, making complex computational imaging research accessible and engaging.',
    descriptionZh:
      'Paper Studio 将学术论文转化为交互式可视化体验——将三维重建、可微渲染演示与动画插图直接嵌入论文页面，让复杂的计算成像研究变得直观易懂。',
    highlights: [
      'Interactive 3D figures embedded in publication pages',
      'Animated visualization of rendering pipelines',
      'One-click paper-to-web presentation export',
    ],
    highlightsZh: [
      '论文页面内嵌交互式三维图形',
      '渲染管线的动画可视化',
      '一键将论文导出为网页演示',
    ],
    techStack: ['Three.js', 'WebGL', 'React', 'Neural Rendering', 'Data Visualization'],
    features: [
      { title: 'Interactive 3D Figures', desc: 'Embed rotatable, zoomable 3D reconstructions directly in paper pages.' },
      { title: 'Animated Pipelines', desc: 'Step-through animations of differentiable rendering and reconstruction pipelines.' },
      { title: 'Web Export', desc: 'Convert LaTeX papers into interactive web presentations with embedded demos.' },
    ],
    featuresZh: [
      { title: '交互式三维图形', desc: '在论文页面中嵌入可旋转、可缩放的三维重建结果。' },
      { title: '管线动画', desc: '分步动画展示可微渲染与重建管线。' },
      { title: '网页导出', desc: '将 LaTeX 论文转换为带内嵌演示的交互式网页。' },
    ],
    metrics: [
      { label: '启动', labelEn: 'Launched', value: '2024', valueEn: '2024' },
      { label: '状态', labelEn: 'Status', value: '运营中', valueEn: 'Active' },
      { label: '方向', labelEn: 'Focus', value: '论文 × 可视化', valueEn: 'Paper × Visualization' },
    ],
    accent: 'bg-accent-subtle text-accent',
    icon: 'file-text',
  },
  {
    id: 'story-studio',
    name: 'Story Studio',
    role: 'Creator',
    founded: '2024-09',
    status: 'active',
    parentId: 'aigc-studio',
    tagline: 'AI-assisted narrative and storytelling creation platform',
    taglineZh: 'AI 辅助叙事与故事创作平台',
    description:
      'Story Studio leverages large language models to help researchers and creators turn technical ideas into compelling narratives — from research highlights to science communication, generating structured storylines, visual scripts, and interactive storytelling experiences.',
    descriptionZh:
      'Story Studio 利用大语言模型帮助研究者与创作者将技术想法转化为引人入胜的叙事——从研究亮点到科普传播，生成结构化故事线、视觉脚本与交互式叙事体验。',
    highlights: [
      'LLM-powered storyline generation from research inputs',
      'Visual script and storyboard creation',
      'Interactive storytelling with branching narratives',
    ],
    highlightsZh: [
      '基于大模型的研究素材故事线生成',
      '视觉脚本与分镜创作',
      '支持分支叙事的交互式故事体验',
    ],
    techStack: ['LLM', 'GLM', 'DeepSeek', 'React', 'Interactive Narrative'],
    features: [
      { title: 'AI Storyline', desc: 'Generate structured storylines from research papers and technical notes.' },
      { title: 'Visual Storyboards', desc: 'Create visual scripts and storyboards with AI-suggested scenes.' },
      { title: 'Branching Narratives', desc: 'Build interactive stories with reader-driven branching paths.' },
    ],
    featuresZh: [
      { title: 'AI 故事线', desc: '从论文与技术笔记生成结构化故事线。' },
      { title: '视觉分镜', desc: 'AI 辅助生成视觉脚本与分镜。' },
      { title: '分支叙事', desc: '构建读者驱动的分支交互式故事。' },
    ],
    metrics: [
      { label: '启动', labelEn: 'Launched', value: '2024', valueEn: '2024' },
      { label: '状态', labelEn: 'Status', value: '运营中', valueEn: 'Active' },
      { label: '方向', labelEn: 'Focus', value: 'AI × 叙事', valueEn: 'AI × Narrative' },
    ],
    accent: 'bg-violet-50 text-violet-700',
    icon: 'book-open',
  },
  {
    id: 'cosmic-studio',
    name: 'Cosmic Studio',
    role: 'Creator',
    founded: '2025-01',
    status: 'active',
    parentId: 'aigc-studio',
    tagline: 'AI-powered manga and comic generation platform',
    taglineZh: 'AI 驱动的漫画生成平台',
    description:
      'Cosmic Studio is an AI-powered platform for generating manga and comics — from character design and panel layout to full-page illustration. It combines large-scale image generation models with comic-specific composition techniques, enabling creators to produce high-quality manga-style visual stories efficiently.',
    descriptionZh:
      'Cosmic Studio 是一个 AI 驱动的漫画生成平台——从角色设计、分镜排版到整页插画。结合大规模图像生成模型与漫画专属构图技术，帮助创作者高效产出高质量漫画风格视觉故事。',
    highlights: [
      'AI-generated manga panels with consistent character design',
      'Automatic panel layout and comic page composition',
      'Style-controllable illustration from text prompts',
    ],
    highlightsZh: [
      'AI 生成漫画分镜，保持角色设计一致性',
      '自动分镜排版与漫画页面构图',
      '从文本提示生成风格可控的插画',
    ],
    techStack: ['Diffusion Models', 'Image Generation', 'Comic Layout', 'Character Consistency', 'React'],
    features: [
      { title: 'Manga Generation', desc: 'Generate manga-style panels and pages from text or storyboard prompts.' },
      { title: 'Character Consistency', desc: 'Maintain consistent character appearance across panels and chapters.' },
      { title: 'Panel Composition', desc: 'Automatic panel layout, speech bubble placement, and page flow design.' },
    ],
    featuresZh: [
      { title: '漫画生成', desc: '从文本或分镜提示生成漫画风格的分镜与页面。' },
      { title: '角色一致性', desc: '在跨分镜、跨章节中保持角色外观一致。' },
      { title: '分镜构图', desc: '自动分镜排版、对话框布局与页面流设计。' },
    ],
    metrics: [
      { label: '启动', labelEn: 'Launched', value: '2025', valueEn: '2025' },
      { label: '状态', labelEn: 'Status', value: '运营中', valueEn: 'Active' },
      { label: '方向', labelEn: 'Focus', value: 'AI × 漫画', valueEn: 'AI × Manga' },
    ],
    accent: 'bg-indigo-50 text-indigo-700',
    icon: 'sparkles',
  },
  {
    id: 'aigc-studio',
    name: 'AIGC Studio',
    role: 'Creator',
    founded: '2024-06',
    status: 'active',
    tagline: 'Umbrella platform for AI-generated content, encompassing Paper Studio, Story Studio, and Cosmic Studio',
    taglineZh: 'AI 生成内容总平台，下辖 Paper Studio、Story Studio 与 Cosmic Studio',
    description:
      'AIGC Studio is the umbrella platform for AI-generated content across modalities — image synthesis, 3D asset generation, video creation, interactive storytelling, and manga generation. It encompasses three sub-studios: Paper Studio (academic paper visualization), Story Studio (AI-assisted narrative creation), and Cosmic Studio (AI-powered manga generation). Leveraging large-scale generative models and the lab\'s near-unlimited compute, it bridges research-grade neural rendering with practical creative workflows.',
    descriptionZh:
      'AIGC Studio 是覆盖多模态 AI 生成内容的总平台——图像合成、三维资产生成、视频创作、交互叙事与漫画生成。下辖三个子工作室：Paper Studio（学术论文可视化）、Story Studio（AI 辅助叙事创作）与 Cosmic Studio（AI 漫画生成）。依托大规模生成模型与实验室近乎无限的算力，打通科研级神经渲染与实际创作工作流。',
    highlights: [
      'Umbrella platform unifying Paper Studio, Story Studio, and Cosmic Studio',
      'Multi-modal AIGC: image, 3D, video, narrative, and manga in one ecosystem',
      'Research-grade neural rendering for production creative workflows',
    ],
    highlightsZh: [
      '统一总平台，整合 Paper Studio、Story Studio 与 Cosmic Studio',
      '多模态 AIGC：图像、三维、视频、叙事与漫画一站式生态',
      '科研级神经渲染用于生产级创作工作流',
    ],
    techStack: ['Diffusion Models', 'NeRF', '3D Generation', 'Video Synthesis', 'GLM', 'DeepSeek'],
    features: [
      { title: 'Image Synthesis', desc: 'High-fidelity image generation with controllable diffusion models.' },
      { title: '3D Asset Generation', desc: 'Generate photo-realistic 3D assets from text or image prompts via neural rendering.' },
      { title: 'Video Creation', desc: 'AI-driven video synthesis with neural rendering pipelines.' },
    ],
    featuresZh: [
      { title: '图像合成', desc: '可控扩散模型的高保真图像生成。' },
      { title: '三维资产生成', desc: '从文本或图像提示生成照片级真实三维资产。' },
      { title: '视频创作', desc: '基于神经渲染管线的 AI 视频合成。' },
    ],
    metrics: [
      { label: '启动', labelEn: 'Launched', value: '2024', valueEn: '2024' },
      { label: '状态', labelEn: 'Status', value: '运营中', valueEn: 'Active' },
      { label: '子项目', labelEn: 'Sub-studios', value: '3 个', valueEn: '3' },
    ],
    accent: 'bg-emerald-50 text-emerald-700',
    icon: 'sparkles',
  },
]
