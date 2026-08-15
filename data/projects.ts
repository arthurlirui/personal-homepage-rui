// 科研项目数据 — 来源: resume-academic/content/project/**

export interface Project {
  id: string
  title: string
  summary: string
  description: string
  tags: string[]
  date: string
  featured: boolean
  externalUrl?: string
  image?: string
  highlights?: string[]
}

export const projects: Project[] = [
  {
    id: 'neural-3d-reconstruction',
    title: 'Neural 3D Reconstruction and Rendering',
    summary: 'Neural / differentiable rendering toolkit for high-quality photorealistic 3D reconstruction and novel viewpoint synthesis.',
    description:
      'A neural and differentiable rendering toolkit for high-quality photorealistic 3D reconstruction and novel viewpoint synthesis. Addresses computational efficiency and scalability for large-scale, high-resolution scenes. Enables efficient large-scale photorealistic 3D reconstruction, urban reconstruction, and 3D intrinsic decomposition and editing.',
    tags: ['Neural Rendering', '3D Reconstruction', 'Differentiable Rendering'],
    date: '2021-10',
    featured: true,
    highlights: [
      'Efficient high-resolution depth rendering (4032×3024, <1 min, 1 GPU)',
      'Multi-GPU training and rendering',
      'Adaptive sampling: uniform, importance, random, selective (loss/density-guided)',
      'Supports COLMAP, 7-Scenes, ScanNet, FalconViz UAV datasets',
    ],
  },
  {
    id: 'reflection-separation',
    title: 'Reflection Separation and Removal',
    summary: 'ECCV 2020 — Reflection Separation via Multi-bounce Polarization State Tracing.',
    description:
      'Generalizes reflection removal to real-world complex light interactions. A polarization sensor captures 4 linearly polarized photos simultaneously; a polarization-guided image formation model plus supervised learning for the ray-tracing model yield unprecedented reconstruction quality on real and synthetic data.',
    tags: ['Computational Photography', 'Polarization', 'Reflection Removal'],
    date: '2016-04',
    featured: true,
  },
  {
    id: 'light-field-segmentation',
    title: 'Light Field Segmentation & Depth Refinement',
    summary: 'SIGGRAPH Asia 2019 — Hierarchical and View-invariant Light Field Segmentation on 4D Ray Graphs.',
    description:
      'A new light field segmentation method respecting texture appearance, depth consistency, and occlusion, producing well-shaped segments robust to viewpoint changes. Hierarchical — a single optimization yields a whole hierarchy of segmentations. Introduces a "disjoint tree" data structure for efficient submodular optimization on very large graphs.',
    tags: ['Light Field', 'Segmentation', 'Depth', 'Submodular Function'],
    date: '2016-04',
    featured: true,
  },
  {
    id: 'uav-tracking',
    title: 'UAVs Visual Tracking',
    summary: 'Monocular Long-term Target Following on UAVs — FAST algorithm on quadrotors.',
    description:
      'Long-term visual tracking on UAVs. Exploits correlation between a frequency tracker and a spatial detector; the novel FAST algorithm achieves robustness (temporal variance/invariance coverage) and efficiency (coarse-to-fine redetection without extra classifier or exhaustive search). Implemented on a quadrotor for indoor/outdoor real-time automatic smooth long-term target following.',
    tags: ['UAV', 'Visual Tracking'],
    date: '2016-04',
    featured: true,
    externalUrl: 'https://youtu.be/akBddFrw6Nk',
  },
  {
    id: 'cluster-sensing-superpixel',
    title: 'Efficient Superpixel and Grouping',
    summary: 'Cluster Sensing Superpixel (CSS) — ~5× faster than SOTA with comparable performance.',
    description:
      'Cluster Sensing Superpixel (CSS) method where cluster centers have representativeness (local max pixel density) and isolation. CSS identifies centers via pixel density, then integrates superpixel cues into a bipartite graph segmentation framework, applied to microscopy image segmentation. Roughly 5× faster than SOTA with comparable performance.',
    tags: ['Computer Vision', 'Segmentation', 'Grouping'],
    date: '2016-04',
    featured: true,
  },
  {
    id: 'xgboost-geo',
    title: 'XGBoost for Geo Data Prediction',
    summary: 'Winner code for the 7th KAUST-NVIDIA Workshop AI Competition.',
    description:
      'Solution and project code for the 7th KAUST-NVIDIA Workshop AI competition, using XGBoost for geospatial data prediction. Won the competition leaderboard.',
    tags: ['XGBoost', 'Geospatial', 'Machine Learning'],
    date: '2021-09',
    featured: true,
    externalUrl: 'https://github.com/arthurlirui/KAUST-Nvidia-Geo',
  },
]
