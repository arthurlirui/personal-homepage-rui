// 论文数据 — 来源: resume-academic/content/publication/**
//
// 编辑指南：
//   teaser: 论文配图/GIF 动图路径，放在 public/uploads/teasers/ 目录下，如 '/uploads/teasers/neat.gif'
//           留空则不显示图片
//   pdf:    论文 PDF 链接，可填本地路径 '/uploads/papers/xxx.pdf' 或外部链接
//   code:   GitHub 代码仓库链接，如 'https://github.com/arthurlirui/xxx'
//   doi:    DOI 链接
//
// 新增论文时复制一个条目，修改各字段即可。

export type PubType = 'journal' | 'conference' | 'preprint'

export interface Publication {
  id: string
  title: string
  authors: string[]
  venue: string
  venueShort: string
  year: number
  type: PubType
  featured: boolean
  abstract?: string
  doi?: string
  pdf?: string
  code?: string
  teaser?: string // teaser image or GIF path, e.g. '/uploads/teasers/neat.gif'
  projectSlug?: string
  image?: string
}

// 作者列表中 "admin" 代表本人 Rui Li
const me = 'Rui Li'

export const publications: Publication[] = [
  {
    id: 'adaptive-diff-grids-cryo-et',
    title: 'Adaptive differentiable grids for cryo-electron tomography reconstruction and denoising',
    authors: ['Y. Wang', 'R. Idoughi', 'D. Rückert', me, 'W. Heidrich'],
    venue: 'Bioinformatics Advances',
    venueShort: 'Bioinform. Adv. 2023',
    year: 2023,
    type: 'journal',
    featured: true,
    // teaser: '/uploads/teasers/adaptive-diff-grids-cryo-et.gif',
    // pdf: '/uploads/papers/adaptive-diff-grids-cryo-et.pdf',
    // code: 'https://github.com/arthurlirui/xxx',
  },
  {
    id: 'haptic-twin-telecooperation',
    title: 'Enhancing telecooperation through haptic twin for internet of robotic things: Implementation and challenges',
    authors: ['M. Huang', 'R. Feng', 'L. Zou', me, 'J. Xie'],
    venue: 'IEEE Internet of Things Journal',
    venueShort: 'IOTJ 2024',
    year: 2024,
    type: 'journal',
    featured: true,
    // teaser: '/uploads/teasers/haptic-twin-telecooperation.gif',
    // pdf: '/uploads/papers/haptic-twin-telecooperation.pdf',
    // code: 'https://github.com/arthurlirui/xxx',
  },
  {
    id: 'cwc-dnerf',
    title: 'CWC-DNERF: Compact Dynamic Neural Radiance Field VIA Discrete Wavelet Transform And Learnable Codebooks',
    authors: ['Yaojian Xu', me+'†', 'Q. Zhang', 'L. Zou', 'Q. Liu', 'Xu Wang'],
    venue: 'IEEE International Conference on Image Processing (ICIP)',
    venueShort: 'ICIP 2025',
    year: 2025,
    type: 'conference',
    featured: true,
    // teaser: '/uploads/teasers/cwc-dnerf.gif',
    // pdf: '/uploads/papers/cwc-dnerf.pdf',
    // code: 'https://github.com/arthurlirui/xxx',
  },
  {
    id: 'point-ladder-tuning',
    title: 'Point Ladder Tuning: Parameter-Efficient Hierarchical Adaptation for 3D Point Cloud Understanding',
    authors: ['Junlin Chang', 'Longhao Zou', me+'†'],
    venue: 'European Conference on Computer Vision (ECCV)',
    venueShort: 'ECCV 2026',
    year: 2026,
    type: 'conference',
    featured: true,
    // teaser: '/uploads/teasers/point-ladder-tuning.gif',
    // pdf: '/uploads/papers/point-ladder-tuning.pdf',
    // code: 'https://github.com/arthurlirui/xxx',
  },
  {
    id: 'geometry-adaptive-polyhedron',
    title: 'Geometry-Adaptive 3D Convex Polyhedron for Tomographic Reconstruction',
    authors: ['Yaojian Xu', me+'†', 'Zhiye Tang', 'Longhao Zou', 'Xu Wang'],
    venue: 'IEEE International Conference on Multimedia and Expo (ICME)',
    venueShort: 'ICME 2026',
    year: 2026,
    type: 'conference',
    featured: true,
    // teaser: '/uploads/teasers/geometry-adaptive-polyhedron.gif',
    // pdf: '/uploads/papers/geometry-adaptive-polyhedron.pdf',
    // code: 'https://github.com/arthurlirui/xxx',
  },
  {
    id: 'neat',
    title: 'NeAT: Neural Adaptive Tomography',
    authors: ['Darius Rückert', 'Yuanhao Wang', me, 'Ramzi Idoughi', 'Wolfgang Heidrich'],
    venue: 'ACM Transactions on Graphics (SIGGRAPH)',
    venueShort: 'SIGGRAPH 2022',
    year: 2022,
    type: 'journal',
    featured: true,
    abstract:
      'NeAT is a neural adaptive tomography method that reconstructs 3D volumes from sparse and limited-angle CT projections using a learned, adaptive sampling strategy within a differentiable rendering framework.',
    pdf: '/uploads/resume.pdf',
    image: '/avatar.png',
    // teaser: '/uploads/teasers/neat.gif',
    // code: 'https://github.com/arthurlirui/xxx',
  },
  {
    id: 'neural-adaptive-scene-tracing',
    title: 'Neural Adaptive Scene Tracing',
    authors: [me+'*', 'Darius Rückert', 'Yuanhao Wang', 'Ramzi Idoughi', 'Wolfgang Heidrich'],
    venue: 'Symposium on Vision, Modeling, and Visualization (VMV)',
    venueShort: 'VMV 2022',
    year: 2022,
    type: 'conference',
    featured: true,
    // teaser: '/uploads/teasers/neural-adaptive-scene-tracing.gif',
    // pdf: '/uploads/papers/neural-adaptive-scene-tracing.pdf',
    // code: 'https://github.com/arthurlirui/xxx',
  },
  {
    id: 'shape-reflectance-diff-rendering',
    title: 'Shape and Reflectance Reconstruction in Uncontrolled Environments by Differentiable Rendering',
    authors: [me+'*', 'Guangmin Zang', 'Miao Qi', 'Wolfgang Heidrich'],
    venue: 'arXiv:2110.12975',
    venueShort: 'Preprint 2022',
    year: 2022,
    type: 'preprint',
    featured: true,
    doi: 'https://arxiv.org/abs/2110.12975',
    abstract:
      'Simultaneous reconstruction of geometry and reflectance in uncontrolled environments from multi-view photography using hand-held cameras. Builds a virtual scene in a differentiable rendering system, optimized by alternating and stochastic photometric objectives, generating photo-realistic novel views. Superior to SOTA in novel view synthesis.',
    // teaser: '/uploads/teasers/shape-reflectance-diff-rendering.gif',
    // pdf: '/uploads/papers/shape-reflectance-diff-rendering.pdf',
    // code: 'https://github.com/arthurlirui/xxx',
  },
  {
    id: 'intratomo',
    title: 'IntraTomo: Self-supervised Learning-based Tomography via Sinogram Synthesis and Prediction',
    authors: ['Guangming Zang', 'Ramzi Idoughi', me, 'Peter Wonka', 'Wolfgang Heidrich'],
    venue: 'International Conference on Computer Vision (ICCV)',
    venueShort: 'ICCV 2021',
    year: 2021,
    type: 'conference',
    featured: true,
    abstract:
      'Combines learning-based and model-based approaches for ill-posed CT inverse problems. Two modules: sinogram prediction (density field as continuous differentiable NN function, self-supervised from incomplete/degraded sinogram) and geometry refinement (local & non-local geometrical priors), applied iteratively. Outperforms on limited-angle tomography (45°), sparse view (as few as 8 views), super-resolution (8×).',
    // teaser: '/uploads/teasers/intratomo.gif',
    // pdf: '/uploads/papers/intratomo.pdf',
    // code: 'https://github.com/arthurlirui/xxx',
  },
  {
    id: 'reflection-separation',
    title: 'Reflection Separation via Multi-bounce Polarization State Tracing',
    authors: [me+'*', 'Simeng Qiu*', 'Guangming Zang', 'Wolfgang Heidrich'],
    venue: 'European Conference on Computer Vision (ECCV)',
    venueShort: 'ECCV 2020',
    year: 2020,
    type: 'conference',
    featured: true,
    doi: 'https://doi.org/10.1007/978-3-030-58601-0_46',
    abstract:
      'Generalizes reflection removal to real-world complex light interactions. Learning framework for supervised reflection separation with a polarization-guided ray-tracing model. Uses a polarization sensor capturing 4 linearly polarized photos simultaneously. A new polarization-guided image formation model plus supervised learning for the ray-tracing model yields unprecedented reconstruction quality on real and synthetic data. († equal contribution)',
    // teaser: '/uploads/teasers/reflection-separation.gif',
    // pdf: '/uploads/papers/reflection-separation.pdf',
    // code: 'https://github.com/arthurlirui/xxx',
  },
  {
    id: 'light-field-segmentation',
    title: 'Hierarchical and View-invariant Light Field Segmentation by Maximizing Entropy Rate on 4D Ray Graphs',
    authors: [me+'*', 'Wolfgang Heidrich'],
    venue: 'ACM Transactions on Graphics (SIGGRAPH Asia)',
    venueShort: 'SIGGRAPH Asia 2019',
    year: 2019,
    type: 'journal',
    featured: true,
    doi: 'https://doi.org/10.1145/3355089.3356521',
    abstract:
      'A new light field segmentation method respecting texture appearance, depth consistency, and occlusion. Creates well-shaped segments robust to viewpoint changes; hierarchical — a single optimization yields a whole hierarchy of segmentations. Uses a submodular objective function optimized greedily; introduces a "disjoint tree" data structure for efficient submodular optimization on very large graphs.',
    // teaser: '/uploads/teasers/light-field-segmentation.gif',
    // pdf: '/uploads/papers/light-field-segmentation.pdf',
    // code: 'https://github.com/arthurlirui/xxx',
  },
  {
    id: 'uav-tracking',
    title: 'Monocular Long-term Target Following on UAVs',
    authors: [me+'*', 'Minjian Pang', 'Cong Zhao', 'Guyue Zhou', 'Lu Fang'],
    venue: 'CVPR Workshop on Embedded Vision',
    venueShort: 'CVPRW 2016',
    year: 2016,
    type: 'conference',
    featured: true,
    doi: 'https://10.1109/CVPRW.2016.11',
    abstract:
      'Long-term visual tracking on UAVs. Exploits correlation between a frequency tracker and a spatial detector; novel FAST algorithm. Robustness (frequency tracker → spatial detector covers temporal variance/invariance) plus efficiency (coarse-to-fine redetection, no extra classifier / exhaustive search). Implemented on a quadrotor for indoor/outdoor real-time automatic smooth long-term target following.',
    // teaser: '/uploads/teasers/uav-tracking.gif',
    // pdf: '/uploads/papers/uav-tracking.pdf',
    // code: 'https://github.com/arthurlirui/xxx',
  },
  {
    id: 'cluster-sensing-superpixel',
    title: 'Cluster Sensing Superpixel and Grouping',
    authors: [me+'*', 'Lu Fang'],
    venue: 'CVPR Workshop',
    venueShort: 'CVPRW 2016',
    year: 2016,
    type: 'conference',
    featured: true,
    abstract:
      'Cluster Sensing Superpixel (CSS) method. Cluster centers have representativeness (local max pixel density) and isolation; CSS identifies centers via pixel density. Integrates superpixel cues into a bipartite graph segmentation framework, applied to microscopy image segmentation. ~5× faster than SOTA with comparable performance.',
    // teaser: '/uploads/teasers/cluster-sensing-superpixel.gif',
    // pdf: '/uploads/papers/cluster-sensing-superpixel.pdf',
    // code: 'https://github.com/arthurlirui/xxx',
  },
]

export const publicationStats = {
  total: publications.length,
  byYear: publications.reduce<Record<number, number>>((acc, p) => {
    acc[p.year] = (acc[p.year] || 0) + 1
    return acc
  }, {}),
  byType: {
    journal: publications.filter((p) => p.type === 'journal').length,
    conference: publications.filter((p) => p.type === 'conference').length,
    preprint: publications.filter((p) => p.type === 'preprint').length,
  },
}
