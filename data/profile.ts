// 个人档案数据 — 来源: resume-academic/content/authors/admin/_index.md

export interface EducationItem {
  degree: string
  field: string
  institution: string
  year: string
}

export interface SocialLink {
  label: string
  labelEn: string
  href: string
  icon: 'mail' | 'graduation-cap' | 'github' | 'linkedin' | 'orcid' | 'file-text' | 'openreview'
}

export const profile = {
  name: 'Rui Li',
  nameZh: '李睿',
  courtesyName: '羽长',
  title: 'Research Scientist',
  titleZh: '研究科学家',
  affiliation: 'Peng Cheng Laboratory, Shenzhen',
  affiliationZh: '鹏城实验室 · 深圳',
  location: 'Shenzhen, China',
  email: 'rui.li@kaust.edu.sa',
  emailAlt: 'lir01@pcl.ac.cn',
  avatar: '/avatar.png',
  resumeEn: '/uploads/resume.pdf',
  resumeZh: '/uploads/resume_chinese.pdf',

  tagline: '将计算成像用于现实世界的问题求解',
  taglineZh: '用各类图像测量（光场、偏振、RGB、CT）解决反问题与应用驱动问题',

  bio: `Rui Li (李睿) received his Ph.D. from the Computational Imaging Group at King Abdullah University of Science and Technology (KAUST), advised by Prof. Wolfgang Heidrich. He received his Bachelor's degree from Xidian University and Master's from University of Science and Technology of China (USTC). He is currently a Research Scientist at Peng Cheng Laboratory.`,

  bioZh: `李睿，鹏城实验室研究科学家。于沙特阿卜杜拉国王科技大学（KAUST）计算成像组获得博士学位（导师 Wolfgang Heidrich 教授，2023），中国科学技术大学硕士（2016），西安电子科技大学本科（2013）。研究方向聚焦于利用光场、偏振图像、RGB 图像、CT 等各类成像测量解决反问题：照片级真实 3D 场景重建与表示、新视角合成、分割、深度估计、反射去除。`,

  researchInterests: [
    'Computational Photography',
    'Photo-realistic 3D Reconstruction',
    'Neural Rendering',
    'Differentiable Rendering',
    'Light Field Imaging',
    'Polarization Imaging',
  ],

  education: [
    { degree: 'Ph.D.', field: 'Electrical and Computer Engineering', institution: 'KAUST', year: '2023' },
    { degree: 'M.S.', field: 'Information and Communication Engineering', institution: 'University of Science and Technology of China', year: '2016' },
    { degree: 'B.Sc.', field: 'Communication Engineering', institution: 'Xidian University', year: '2013' },
  ] as EducationItem[],

  socials: [
    { label: '邮箱', labelEn: 'Email', href: 'mailto:rui.li@kaust.edu.sa', icon: 'mail' },
    { label: 'Scholar', labelEn: 'Scholar', href: 'https://scholar.google.com/citations?user=P6gAcSsAAAAJ&hl=zh-CN', icon: 'graduation-cap' },
    { label: 'GitHub', labelEn: 'GitHub', href: 'https://github.com/arthurlirui', icon: 'github' },
    { label: 'LinkedIn', labelEn: 'LinkedIn', href: 'https://www.linkedin.com/in/arthurlirui/', icon: 'linkedin' },
    { label: 'ORCID', labelEn: 'ORCID', href: 'https://orcid.org/0000-0001-5332-2167', icon: 'orcid' },
    { label: 'OpenReview', labelEn: 'OpenReview', href: 'https://openreview.net/profile?id=~Rui_Li8', icon: 'openreview' },
    { label: '简历 CV', labelEn: 'CV', href: '/uploads/resume.pdf', icon: 'file-text' },
  ] as SocialLink[],
}

export type Profile = typeof profile
