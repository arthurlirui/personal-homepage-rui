// 博客数据 — 研究博客文章

export interface BlogPost {
  id: string
  title: string
  titleZh: string
  excerpt: string
  excerptZh: string
  date: string
  tags: string[]
  readTime: string
  status: 'published' | 'coming-soon'
  cover?: string
}

export const blogPosts: BlogPost[] = [
  {
    id: 'neural-rendering-explained',
    title: 'Neural Rendering: From NeRF to Compact Radiance Fields',
    titleZh: '神经渲染：从 NeRF 到紧凑辐射场',
    excerpt:
      'A practical overview of how neural radiance fields evolved from the original NeRF to compact representations using wavelet transforms and learnable codebooks, and what it means for real-time applications.',
    excerptZh:
      '实用综述：神经辐射场如何从原始 NeRF 演进到基于小波变换与可学习码本的紧凑表示，以及对实时应用的意义。',
    date: '2025-06',
    tags: ['Neural Rendering', 'NeRF', 'Differentiable Rendering'],
    readTime: '8 min',
    status: 'coming-soon',
  },
  {
    id: 'ct-reconstruction-inverse-problems',
    title: 'Solving Ill-posed CT Inverse Problems with Self-supervised Learning',
    titleZh: '用自监督学习求解病态 CT 反问题',
    excerpt:
      'How self-supervised sinogram synthesis and geometric refinement can reconstruct high-quality CT volumes from sparse and limited-angle projections — bridging model-based and learning-based approaches.',
    excerptZh:
      '如何通过自监督正弦图合成与几何细化，从稀疏和有限角投影重建高质量 CT 体数据——打通模型方法与学习方法。',
    date: '2025-04',
    tags: ['CT Reconstruction', 'Inverse Problems', 'Self-supervised'],
    readTime: '10 min',
    status: 'coming-soon',
  },
  {
    id: 'holographic-communication-vision',
    title: 'Holographic Communication: Building the Next-gen Communication Testbed',
    titleZh: '全息通信：构建新一代通信测试平台',
    excerpt:
      'From real-time 3D capture to reconstruction, transmission, and rendering — a technical deep-dive into the core technologies powering holographic communication systems at Peng Cheng Laboratory.',
    excerptZh:
      '从实时三维采集到重建、传输与渲染——深入解析鹏城实验室全息通信体系核心技术的技术博客。',
    date: '2025-02',
    tags: ['Holographic Communication', 'Real-time System', '3D Reconstruction'],
    readTime: '12 min',
    status: 'coming-soon',
  },
]
