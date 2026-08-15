// 研究方向数据 — 由 profile.researchInterests + publications/projects 归纳

export interface ResearchArea {
  id: string
  title: string
  titleZh: string
  icon: 'box' | 'sparkles' | 'camera' | 'waves'
  summary: string
  summaryZh: string
  description: string
  descriptionZh: string
  keywords: string[]
  relatedPubIds: string[]
  relatedProjectIds: string[]
}

export const researchAreas: ResearchArea[] = [
  {
    id: 'neural-rendering-3d',
    title: 'Neural Rendering & 3D Reconstruction',
    titleZh: '神经渲染与 3D 重建',
    icon: 'box',
    summary: 'Photo-realistic 3D scene reconstruction, novel view synthesis, and differentiable rendering.',
    summaryZh: '照片级真实 3D 场景重建、新视角合成与可微渲染。',
    description:
      'Building neural and differentiable rendering systems for high-quality, scalable 3D reconstruction and novel view synthesis from multi-view imagery. Exploring adaptive sampling, multi-GPU training, and efficient high-resolution rendering.',
    descriptionZh:
      '构建神经与可微渲染系统，从多视角图像实现高质量、可扩展的 3D 重建与新视角合成。探索自适应采样、多 GPU 训练与高效高分辨率渲染。',
    keywords: ['NeRF', 'Differentiable Rendering', 'Novel View Synthesis', 'Multi-GPU', 'Inverse Rendering'],
    relatedPubIds: ['neat', 'neural-adaptive-scene-tracing', 'shape-reflectance-diff-rendering'],
    relatedProjectIds: ['neural-3d-reconstruction'],
  },
  {
    id: 'computational-photography',
    title: 'Computational Photography',
    titleZh: '计算摄影',
    icon: 'camera',
    summary: 'Polarization, light field, and hyperspectral imaging for inverse imaging problems.',
    summaryZh: '偏振、光场与高光谱成像用于反问题求解。',
    description:
      'Using polarization sensors, light fields, and hyperspectral capture to solve real-world inverse problems: reflection separation, depth estimation, segmentation, and scene understanding beyond a single RGB photo.',
    descriptionZh:
      '利用偏振传感器、光场与高光谱采集解决真实世界反问题：反射分离、深度估计、分割，以及超越单张 RGB 照片的场景理解。',
    keywords: ['Polarization', 'Light Field', 'Hyperspectral', 'Reflection Separation', 'Image Formation'],
    relatedPubIds: ['reflection-separation', 'light-field-segmentation'],
    relatedProjectIds: ['reflection-separation', 'light-field-segmentation'],
  },
  {
    id: 'tomography-inversion',
    title: 'Tomography & Inverse Problems',
    titleZh: '层析成像与反问题',
    icon: 'waves',
    summary: 'Self-supervised, learning-based CT reconstruction from sparse and degraded sinograms.',
    summaryZh: '从稀疏与退化正弦图的自监督、学习型 CT 重建。',
    description:
      'Combining learning-based and model-based methods for ill-posed CT inverse problems: limited-angle, sparse-view, and super-resolution tomography via self-supervised sinogram synthesis and geometric refinement.',
    descriptionZh:
      '结合学习与模型方法求解病态 CT 反问题：通过自监督正弦图合成与几何细化，处理有限角、稀疏视图与超分辨率层析成像。',
    keywords: ['CT Reconstruction', 'Sinogram', 'Self-supervised', 'Limited-angle', 'Sparse-view'],
    relatedPubIds: ['intratomo', 'neat'],
    relatedProjectIds: [],
  },
]
