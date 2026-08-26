// 课程数据 — 设计的课程

export interface Course {
  id: string
  title: string
  titleZh: string
  description: string
  descriptionZh: string
  level: string
  levelZh: string
  duration: string
  topics: string[]
  status: 'available' | 'upcoming'
  date: string
}

export const courses: Course[] = [
  {
    id: 'computational-imaging-intro',
    title: 'Introduction to Computational Imaging',
    titleZh: '计算成像导论',
    description:
      'A foundational course covering the principles of computational photography, polarization imaging, light fields, and inverse problem solving — from theory to hands-on experiments.',
    descriptionZh:
      '基础课程，涵盖计算摄影原理、偏振成像、光场与反问题求解——从理论到动手实验。',
    level: 'Undergraduate',
    levelZh: '本科',
    duration: '16 weeks',
    topics: ['Computational Photography', 'Polarization', 'Light Field', 'Inverse Problems'],
    status: 'upcoming',
    date: '2025-09',
  },
  {
    id: 'neural-rendering-practice',
    title: 'Neural Rendering in Practice',
    titleZh: '神经渲染实战',
    description:
      'A hands-on course on neural radiance fields, differentiable rendering, and 3D reconstruction. Students build a complete pipeline from multi-view capture to photo-realistic novel view synthesis.',
    descriptionZh:
      '神经辐射场、可微渲染与三维重建的实战课程。学生从多视角采集到照片级真实新视角合成，搭建完整管线。',
    level: 'Graduate',
    levelZh: '研究生',
    duration: '12 weeks',
    topics: ['NeRF', 'Differentiable Rendering', '3D Reconstruction', 'Novel View Synthesis'],
    status: 'upcoming',
    date: '2026-02',
  },
  {
    id: '3d-reconstruction-rendering',
    title: '3D Reconstruction & Real-time Rendering',
    titleZh: '三维重建与实时渲染',
    description:
      'An advanced course on high-speed 3D reconstruction techniques, real-time rendering pipelines, and their applications in holographic communication and digital twins.',
    descriptionZh:
      '进阶课程，涵盖高速三维重建技术、实时渲染管线及其在全息通信与数字孪生中的应用。',
    level: 'Graduate',
    levelZh: '研究生',
    duration: '10 weeks',
    topics: ['3D Reconstruction', 'Real-time Rendering', 'Holographic Communication', 'Digital Twin'],
    status: 'upcoming',
    date: '2026-09',
  },
]
