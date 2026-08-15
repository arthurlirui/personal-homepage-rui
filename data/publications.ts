// 论文数据 — 来源: resume-academic/content/publication/**

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
  projectSlug?: string
  image?: string
}

// 作者列表中 "admin" 代表本人 Rui Li
const me = 'Rui Li'

export const publications: Publication[] = [
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
  },
  {
    id: 'neural-adaptive-scene-tracing',
    title: 'Neural Adaptive Scene Tracing',
    authors: [me, 'Darius Rückert', 'Yuanhao Wang', 'Ramzi Idoughi', 'Wolfgang Heidrich'],
    venue: 'Symposium on Vision, Modeling, and Visualization (VMV)',
    venueShort: 'VMV 2022',
    year: 2022,
    type: 'conference',
    featured: true,
  },
  {
    id: 'shape-reflectance-diff-rendering',
    title: 'Shape and Reflectance Reconstruction in Uncontrolled Environments by Differentiable Rendering',
    authors: [me, 'Guangmin Zang', 'Miao Qi', 'Wolfgang Heidrich'],
    venue: 'arXiv:2110.12975',
    venueShort: 'Preprint 2022',
    year: 2022,
    type: 'preprint',
    featured: true,
    doi: 'https://arxiv.org/abs/2110.12975',
    abstract:
      'Simultaneous reconstruction of geometry and reflectance in uncontrolled environments from multi-view photography using hand-held cameras. Builds a virtual scene in a differentiable rendering system, optimized by alternating and stochastic photometric objectives, generating photo-realistic novel views. Superior to SOTA in novel view synthesis.',
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
  },
  {
    id: 'reflection-separation',
    title: 'Reflection Separation via Multi-bounce Polarization State Tracing',
    authors: [me + '†', 'Simeng Qiu†', 'Guangming Zang', 'Wolfgang Heidrich'],
    venue: 'European Conference on Computer Vision (ECCV)',
    venueShort: 'ECCV 2020',
    year: 2020,
    type: 'conference',
    featured: true,
    doi: 'https://doi.org/10.1007/978-3-030-58601-0_46',
    abstract:
      'Generalizes reflection removal to real-world complex light interactions. Learning framework for supervised reflection separation with a polarization-guided ray-tracing model. Uses a polarization sensor capturing 4 linearly polarized photos simultaneously. A new polarization-guided image formation model plus supervised learning for the ray-tracing model yields unprecedented reconstruction quality on real and synthetic data. († equal contribution)',
  },
  {
    id: 'light-field-segmentation',
    title: 'Hierarchical and View-invariant Light Field Segmentation by Maximizing Entropy Rate on 4D Ray Graphs',
    authors: [me, 'Wolfgang Heidrich'],
    venue: 'ACM Transactions on Graphics (SIGGRAPH Asia)',
    venueShort: 'SIGGRAPH Asia 2019',
    year: 2019,
    type: 'journal',
    featured: true,
    doi: 'https://doi.org/10.1145/3355089.3356521',
    abstract:
      'A new light field segmentation method respecting texture appearance, depth consistency, and occlusion. Creates well-shaped segments robust to viewpoint changes; hierarchical — a single optimization yields a whole hierarchy of segmentations. Uses a submodular objective function optimized greedily; introduces a "disjoint tree" data structure for efficient submodular optimization on very large graphs.',
  },
  {
    id: 'uav-tracking',
    title: 'Monocular Long-term Target Following on UAVs',
    authors: [me, 'Minjian Pang', 'Cong Zhao', 'Guyue Zhou', 'Lu Fang'],
    venue: 'CVPR Workshop on Embedded Vision',
    venueShort: 'CVPRW 2016',
    year: 2016,
    type: 'conference',
    featured: true,
    doi: 'https://10.1109/CVPRW.2016.11',
    abstract:
      'Long-term visual tracking on UAVs. Exploits correlation between a frequency tracker and a spatial detector; novel FAST algorithm. Robustness (frequency tracker → spatial detector covers temporal variance/invariance) plus efficiency (coarse-to-fine redetection, no extra classifier / exhaustive search). Implemented on a quadrotor for indoor/outdoor real-time automatic smooth long-term target following.',
  },
  {
    id: 'cluster-sensing-superpixel',
    title: 'Cluster Sensing Superpixel and Grouping',
    authors: [me, 'Lu Fang'],
    venue: 'CVPR Workshop',
    venueShort: 'CVPRW 2016',
    year: 2016,
    type: 'conference',
    featured: true,
    abstract:
      'Cluster Sensing Superpixel (CSS) method. Cluster centers have representativeness (local max pixel density) and isolation; CSS identifies centers via pixel density. Integrates superpixel cues into a bipartite graph segmentation framework, applied to microscopy image segmentation. ~5× faster than SOTA with comparable performance.',
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
