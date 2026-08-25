// 研究方向数据 — 由 publications/projects + 自我介绍归纳

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
    id: '3d-reconstruction-rendering',
    title: '3D Reconstruction & Neural Rendering',
    titleZh: '三维重建与神经渲染',
    icon: 'box',
    summary: 'High-speed 3D reconstruction, differentiable rendering, and novel view synthesis from multi-view imagery.',
    summaryZh: '高速三维重建、可微渲染与多视角新视角合成。',
    description:
      'Building neural and differentiable rendering systems for high-quality, scalable 3D reconstruction and novel view synthesis. Exploring compact neural radiance fields with wavelet transforms and learnable codebooks, adaptive sampling, multi-GPU training, and efficient high-resolution rendering for real-time applications.',
    descriptionZh:
      '构建神经与可微渲染系统，实现高质量、可扩展的三维重建与新视角合成。探索基于小波变换与可学习码本的紧凑神经辐射场、自适应采样、多 GPU 训练与高效高分辨率渲染，面向实时应用场景。',
    keywords: ['NeRF', 'Differentiable Rendering', 'Novel View Synthesis', '3D Point Cloud', 'Inverse Rendering'],
    relatedPubIds: [
      'cwc-dnerf',
      'point-ladder-tuning',
      'neat',
      'neural-adaptive-scene-tracing',
      'shape-reflectance-diff-rendering',
    ],
    relatedProjectIds: ['neural-3d-reconstruction'],
  },
  {
    id: 'computational-imaging-tomography',
    title: 'Computational Imaging & Tomography',
    titleZh: '计算成像与层析重建',
    icon: 'waves',
    summary: 'Polarization, light field imaging, and learning-based CT / cryo-ET reconstruction for inverse problems.',
    summaryZh: '偏振、光场成像与基于学习的 CT / cryo-ET 重建，求解反问题。',
    description:
      'Solving real-world inverse problems using polarization sensors, light fields, and learning-based tomographic reconstruction. Combining model-based and self-supervised methods for ill-posed CT, limited-angle, sparse-view, and cryo-electron tomography, as well as reflection separation and depth estimation beyond a single RGB photo.',
    descriptionZh:
      '利用偏振传感器、光场与基于学习的层析重建求解真实世界反问题。结合模型方法与自监督方法处理病态 CT、有限角、稀疏视图与冷冻电子层析成像，以及反射分离与超越单张 RGB 照片的深度估计。',
    keywords: ['CT Reconstruction', 'Cryo-ET', 'Polarization', 'Light Field', 'Reflection Separation'],
    relatedPubIds: [
      'intratomo',
      'adaptive-diff-grids-cryo-et',
      'geometry-adaptive-polyhedron',
      'reflection-separation',
      'light-field-segmentation',
    ],
    relatedProjectIds: ['reflection-separation', 'light-field-segmentation'],
  },
  {
    id: 'holographic-communication-realtime',
    title: 'Holographic Communication & Real-time Systems',
    titleZh: '全息通信与实时系统',
    icon: 'camera',
    summary: 'Real-time 3D capture, reconstruction, transmission, and rendering for next-generation holographic communication.',
    summaryZh: '面向新一代全息通信的实时三维采集、重建、传输与渲染。',
    description:
      'Leading the development of core technologies for holographic communication systems — real-time 3D scene capture, reconstruction, transmission, and rendering — as key technical support for a next-generation communication testbed. Bridging computer graphics, computer vision, and wireless communication, with research extending to telecooperation, haptic twins, and the Internet of Robotic Things.',
    descriptionZh:
      '主导研发全息通信体系核心技术——三维场景实时采集、重建、传输与渲染——为新一代通信测试平台提供核心技术支撑。打通计算机图形学、计算机视觉与无线通信，研究延伸至远程协作、触觉孪生与机器人物联网。',
    keywords: ['Holographic Communication', 'Real-time System', 'Telecooperation', 'Haptic Twin', 'IoRT'],
    relatedPubIds: ['haptic-twin-telecooperation'],
    relatedProjectIds: [],
  },
]
