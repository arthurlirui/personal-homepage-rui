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
  readmePath?: string // local absolute path to a README.md rendered as a sub-page (for sub-projects)
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
    id: 'quant-trading',
    name: 'Quant Trading System',
    role: 'Core Engineer',
    founded: '2024-01',
    status: 'active',
    parentId: 'sigtrading',
    readmePath: 'data/readmes/quant-trading.md',
    tagline: 'Multi-strategy, multi-core, LLM-augmented Binance quantitative trading system (spot + USDⓈ-M futures)',
    taglineZh: '多策略 · 多核 · LLM 增强的 Binance 量化交易系统（现货 + USDⓈ-M 合约）',
    description:
      'Quant Trading System is the flagship trading engine under SigTrading: 8 parallel strategies, a multiprocessing + shared-memory zero-copy market ring buffer, LLM market-regime prediction with three-factor signal fusion, event-driven backtesting, grid/walk-forward parameter optimization, a multi-source news sentiment aggregator, and a React TradingView-style terminal. Default testnet-first, fully scriptable via a typer CLI.',
    descriptionZh:
      'Quant Trading System 是 SigTrading 旗下的旗舰交易引擎：8 大策略并行、基于 multiprocessing + shared-memory 的零拷贝行情环形缓冲、LLM 市场态势预测与三因子信号融合、事件驱动回测、网格搜索 + Walk-Forward 参数优化、多源新闻情绪聚合，以及 React TradingView 风格交易终端。默认测试网优先，完整可用 typer CLI 脚本化驱动。',
    highlights: [
      '8 parallel strategies (VolumeSurge / Grid / MACD+RSI / MeanReversion / Momentum / LLMMartingale / LLMChaseReversal / NewsSentiment)',
      'Lock-free SharedRingBuffer (seqlock) with per-strategy CPU pinning and zero-copy broadcast',
      'LLM market-regime prediction with three-factor signal fusion (base + LLM + news)',
    ],
    highlightsZh: [
      '8 大策略并行（VolumeSurge / Grid / MACD+RSI / MeanReversion / Momentum / LLMMartingale / LLMChaseReversal / NewsSentiment）',
      '无锁 SharedRingBuffer (seqlock)，按策略绑定物理核，零拷贝行情广播',
      'LLM 市场态势预测，三因子信号融合（base + LLM + news）',
    ],
    techStack: ['Python 3.12', 'FastAPI', 'React 19', 'multiprocessing', 'shared_memory', 'Binance WS', 'LLM', 'pytest'],
    features: [
      { title: 'Multi-core Engine', desc: 'Lock-free ring buffer (seqlock) + per-strategy CPU affinity; real Binance WS or synthetic walk.' },
      { title: '8 Strategies + Fusion', desc: 'Registry/factory pattern; three-factor fusion final = (1-w_llm-w_news)*base + w_llm*llm + w_news*news.' },
      { title: 'Event-driven Backtest', desc: 'Sharpe / MaxDD / Win-rate / Profit Factor; unified signal vocabulary {buy, sell, close_long, close_short, hold}.' },
      { title: 'Parameter Optimizer', desc: 'GridSearch + Walk-Forward anti-overfit validation with stability analysis (CV) and out-of-sample overfit ratio.' },
      { title: 'News Sentiment Aggregator', desc: 'RSS / Binance announcements / NewsAPI / CryptoPanic / Reddit / X API v2 / Fear&Greed / Whale Alert + CoinGlass funding.' },
      { title: 'typer CLI + React Terminal', desc: 'Offline CLI for backtest/optimizer/data; dark TradingView-style terminal with OrderBook, NewsFeed, SentimentPanel.' },
    ],
    featuresZh: [
      { title: '多核交易引擎', desc: '无锁环形缓冲 (seqlock) + 策略绑核；可接真实 Binance WS 或合成随机游走。' },
      { title: '8 策略 + 三因子融合', desc: '注册表/工厂模式；final = (1-w_llm-w_news)*base + w_llm*llm + w_news*news，权重 REST 实时可调。' },
      { title: '事件驱动回测', desc: 'Sharpe / MaxDD / 胜率 / Profit Factor；信号词汇统一 {buy, sell, close_long, close_short, hold}。' },
      { title: '参数优化器', desc: 'GridSearch + Walk-Forward 防过拟合，含稳定性分析 (变异系数) 与样本外过拟合比。' },
      { title: '新闻情绪聚合', desc: 'RSS / Binance 公告 / NewsAPI / CryptoPanic / Reddit / X API v2 / 恐慌贪婪 / Whale Alert + CoinGlass 资金费率。' },
      { title: 'typer CLI + React 终端', desc: '离线 CLI 直接驱动回测/优化/数据；深色 TradingView 风格终端，含 OrderBook、NewsFeed、SentimentPanel。' },
    ],
    metrics: [
      { label: '启动', labelEn: 'Launched', value: '2024', valueEn: '2024' },
      { label: '策略', labelEn: 'Strategies', value: '8 个', valueEn: '8' },
      { label: '方向', labelEn: 'Focus', value: '量化 × LLM', valueEn: 'Quant × LLM' },
    ],
    accent: 'bg-sky-50 text-sky-700',
    icon: 'cpu',
  },
  {
    id: 'ai-for-education',
    name: 'AI for Education',
    role: 'Creator',
    founded: '2025-06',
    status: 'active',
    tagline: 'Process-oriented AI coaching systems for skill education — starting with painting technique',
    taglineZh: '面向技能教育的“过程式”AI 教练系统 — 从绘画技法切入',
    description:
      'AI for Education is a research-driven initiative building process-oriented AI coaching systems for skill education. Unlike systems that evaluate only the final artifact, it analyzes the learner\'s process (hand dynamics, gesture, rhythm) and closes the feedback loop: expert technique representation → learner deviation diagnosis → actionable corrective feedback. The first application is GestureCoach for Painting, with future extensions to calligraphy, musical instruments, and surgical training.',
    descriptionZh:
      'AI for Education 是一个面向技能教育、以研究为导向的“过程式”AI 教练系统计划。与仅评价最终作品的方法不同，它分析学习者的创作过程（手部动力学、手势、节奏）并闭环反馈：专家技法表征 → 学习者偏差诊断 → 可执行的纠错建议。首个落地项目为面向绘画的 GestureCoach，未来将扩展至书法、乐器与外科训练等领域。',
    highlights: [
      'Process-oriented skill assessment — analyzes the creation process, not just the final artifact',
      'Closed-loop coaching: expert template → learner diagnosis → corrective feedback',
      'First application: painting technique (GestureCoach); extensible to calligraphy, instruments, surgery',
    ],
    highlightsZh: [
      '过程式技能评估 — 分析创作过程，而非仅评价最终作品',
      '闭环教练：专家模板 → 学习者诊断 → 纠错反馈',
      '首个落地：绘画技法（GestureCoach）；可扩展至书法、乐器、外科训练',
    ],
    techStack: ['MediaPipe', 'PyTorch', 'YOLOv5', 'U-Net', 'ST-GCN', 'Bi-GRU', 'Improved DTW', 'FastAPI'],
    features: [
      { title: 'Process Assessment', desc: 'Analyze hand dynamics and gesture during the creation process rather than scoring the final artwork.' },
      { title: 'Deviation Diagnosis', desc: 'Improved-DTW + Procrustes MPJPE across spatial / posture / direction / temporal axes against expert templates.' },
      { title: 'Closed-loop Feedback', desc: 'Rule engine + LLM generate rigid (posture risk) and elastic (style) feedback with language ethics.' },
    ],
    featuresZh: [
      { title: '过程式评估', desc: '分析创作过程中的手部动力学与手势，而非对最终作品打分。' },
      { title: '偏差诊断', desc: '改进 DTW + Procrustes MPJPE，在空间/姿态/方向/时序四轴上对比专家模板。' },
      { title: '闭环反馈', desc: '规则引擎 + LLM 生成刚性（姿态风险）与弹性（风格）反馈，遵循语言伦理。' },
    ],
    metrics: [
      { label: '启动', labelEn: 'Launched', value: '2025', valueEn: '2025' },
      { label: '状态', labelEn: 'Status', value: '研发中', valueEn: 'Active' },
      { label: '方向', labelEn: 'Focus', value: 'AI × 教育', valueEn: 'AI × Education' },
    ],
    accent: 'bg-emerald-50 text-emerald-700',
    icon: 'book-open',
  },
  {
    id: 'gesture-coach',
    name: 'GestureCoach for Painting',
    role: 'Core Engineer',
    founded: '2025-06',
    status: 'active',
    parentId: 'ai-for-education',
    readmePath: 'data/readmes/gesture-coach.md',
    tagline: 'Fine-grained gesture-recognition painting coach — process-oriented skill assessment with improved-DTW deviation diagnosis',
    taglineZh: '基于细粒度手势识别的绘画技法智能教练 — 过程式技能评估与改进 DTW 偏差诊断',
    description:
      'GestureCoach is the flagship system under AI for Education: a painting-technique coaching system that analyzes the painting process (hand dynamics) and closes the loop from artist technique representation to learner deviation diagnosis and actionable corrective feedback. The prototype implements hand tracking (MediaPipe), YOLOv5 brush detection, U-Net tool-hand segmentation, Bi-GRU + ST-GCN painting-stage recognition, improved-DTW deviation diagnosis across four axes, and rule-engine + LLM feedback generation, with a FastAPI service and a React + WebRTC real-time frontend.',
    descriptionZh:
      'GestureCoach 是 AI for Education 旗下的旗舰系统：面向绘画技法的智能教练，分析绘画过程（手部动力学），闭环完成从专家技法表征到学习者偏差诊断与可执行纠错反馈。原型实现了手部追踪（MediaPipe）、YOLOv5 画笔检测、U-Net 工具-手分割、Bi-GRU + ST-GCN 绘画阶段识别、改进 DTW 四轴偏差诊断，以及规则引擎 + LLM 反馈生成，并配备 FastAPI 服务与 React + WebRTC 实时前端。',
    highlights: [
      'Hand tracking (MediaPipe) + YOLOv5 brush detection + U-Net tool-hand segmentation',
      'Bi-GRU + ST-GCN painting-stage recognition (起稿/铺色/细节 auto-segmentation)',
      'Improved DTW (α·‖l−r‖ + β·(1−cos)) + Procrustes MPJPE across 4 deviation axes',
      'Rule engine + LLM feedback with rigid/elastic distinction and language ethics',
      'Real-time React + WebRTC frontend with skeleton overlay and feedback panel',
    ],
    highlightsZh: [
      '手部追踪（MediaPipe）+ YOLOv5 画笔检测 + U-Net 工具-手分割',
      'Bi-GRU + ST-GCN 绘画阶段识别（起稿/铺色/细节自动分段）',
      '改进 DTW (α·‖l−r‖ + β·(1−cos)) + Procrustes MPJPE 四轴偏差诊断',
      '规则引擎 + LLM 反馈，区分刚性/弹性并遵循语言伦理',
      'React + WebRTC 实时前端，含骨架叠加与反馈面板',
    ],
    techStack: ['MediaPipe', 'PyTorch', 'YOLOv5', 'U-Net', 'ST-GCN', 'Bi-GRU', 'Improved DTW', 'FastAPI', 'React', 'WebRTC'],
    features: [
      { title: 'Hand Tracking', desc: 'MediaPipe landmarks + occlusion interpolation + wrist-relative normalization.' },
      { title: 'Two-stage Tool-Hand', desc: 'YOLOv5 brush detection → U-Net 3-class segmentation; mask refines landmarks.' },
      { title: 'Stage Recognition', desc: 'ST-GCN skeleton graph + Bi-GRU auto-segments 起稿/铺色/细节 stages.' },
      { title: 'Deviation Diagnosis', desc: 'Improved DTW + Procrustes MPJPE across spatial / posture / direction / temporal axes.' },
      { title: 'Feedback Generation', desc: 'Rule engine + LLM; rigid (posture risk) vs elastic (style) with language ethics.' },
      { title: 'Real-time Frontend', desc: 'React + WebRTC webcam capture, client-side MediaPipe skeleton overlay, WS streaming.' },
    ],
    featuresZh: [
      { title: '手部追踪', desc: 'MediaPipe 关键点 + 遮挡插值 + 腕相对归一化。' },
      { title: '两阶段工具-手', desc: 'YOLOv5 画笔检测 → U-Net 三类分割；掩码修正关键点。' },
      { title: '阶段识别', desc: 'ST-GCN 骨架图 + Bi-GRU 自动分段 起稿/铺色/细节。' },
      { title: '偏差诊断', desc: '改进 DTW + Procrustes MPJPE，空间/姿态/方向/时序四轴。' },
      { title: '反馈生成', desc: '规则引擎 + LLM；刚性（姿态风险）与弹性（风格），遵循语言伦理。' },
      { title: '实时前端', desc: 'React + WebRTC 摄像头采集，客户端 MediaPipe 骨架叠加，WS 流式上传。' },
    ],
    metrics: [
      { label: '启动', labelEn: 'Launched', value: '2025', valueEn: '2025' },
      { label: '测试', labelEn: 'Tests', value: '62 个', valueEn: '62' },
      { label: '方向', labelEn: 'Focus', value: 'AI × 绘画教育', valueEn: 'AI × Painting' },
    ],
    accent: 'bg-teal-50 text-teal-700',
    icon: 'sparkles',
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
    readmePath: 'data/readmes/paper-studio.md',
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
    readmePath: 'data/readmes/story-studio.md',
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
