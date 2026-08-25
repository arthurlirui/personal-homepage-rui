// 创业项目数据 — 来源: resume-academic/content/home/experience.md (SigTrading) + 注释的 Capmake

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
  icon: 'trending-up' | 'palette' | 'box' | 'cpu'
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
]
