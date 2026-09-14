// 动态/新闻数据 — 由 resume-academic 内容归纳整理

export interface NewsItem {
  id: string
  date: string // ISO
  title: string
  titleZh: string
  type: 'award' | 'publication' | 'talk' | 'career' | 'project' | 'submission'
  pinned?: boolean
  url?: string
}

export const news: NewsItem[] = [
  {
    id: 'icassp-2027-submission',
    date: '2026-09-16',
    title: 'Submitted 2 papers to ICASSP 2027',
    titleZh: '投稿 2 篇论文至 ICASSP 2027',
    type: 'submission',
  },
  {
    id: 'icra-2027-submission',
    date: '2026-09-15',
    title: 'Submitted 2 papers to ICRA 2027',
    titleZh: '投稿 2 篇论文至 ICRA 2027',
    type: 'submission',
  },
  {
    id: 'point-ladder-tuning-accepted',
    date: '2026-09-09',
    title: 'Point Ladder Tuning accepted at ECCV 2026',
    titleZh: 'Point Ladder Tuning 被 ECCV 2026 录用',
    type: 'publication',
  },
  {
    id: 'geometry-adaptive-polyhedron-accepted',
    date: '2026-07-07',
    title: 'Geometry-Adaptive 3D Convex Polyhedron accepted at ICME 2026',
    titleZh: '几何自适应凸多面体论文被 ICME 2026 录用',
    type: 'publication',
  },
  {
    id: 'cwc-dnerf-accepted',
    date: '2025-10-25',
    title: 'CWC-DNERF accepted at ICIP 2025',
    titleZh: 'CWC-DNERF 被 ICIP 2025 录用',
    type: 'publication',
  },
  {
    id: 'pcl-scientist',
    date: '2023-09-01',
    title: 'Joined Peng Cheng Laboratory as Research Scientist',
    titleZh: '加入鹏城实验室，任研究科学家',
    type: 'career',
    pinned: true,
  },
  {
    id: 'phd-kaust',
    date: '2023-06-01',
    title: 'Received Ph.D. from KAUST Computational Imaging Group',
    titleZh: '于 KAUST 计算成像组获得博士学位',
    type: 'career',
  },
  {
    id: 'neat-siggraph',
    date: '2022-07-01',
    title: 'NeAT published at ACM SIGGRAPH (ACM Trans. on Graphics)',
    titleZh: 'NeAT 发表于 ACM SIGGRAPH（ACM Trans. on Graphics）',
    type: 'publication',
    url: 'https://scholar.google.com/citations?user=P6gAcSsAAAAJ',
  },
  {
    id: 'sony-intern',
    date: '2022-06-01',
    title: 'Computational Photography Research Intern at SONY R&D Tokyo',
    titleZh: '于 SONY 东京研发中心进行计算摄影研究实习',
    type: 'career',
  },
  {
    id: 'intratomo-iccv',
    date: '2021-09-01',
    title: 'IntraTomo published at ICCV 2021',
    titleZh: 'IntraTomo 发表于 ICCV 2021',
    type: 'publication',
  },
  {
    id: 'geo-winner',
    date: '2021-09-01',
    title: 'Won the 7th KAUST-NVIDIA Workshop AI Competition (Geo)',
    titleZh: '获第七届 KAUST-NVIDIA Workshop AI 竞赛冠军',
    type: 'award',
    url: 'https://github.com/arthurlirui/KAUST-Nvidia-Geo',
  },
  {
    id: 'eccv-2020',
    date: '2020-09-01',
    title: 'Reflection Separation paper published at ECCV 2020',
    titleZh: '反射分离论文发表于 ECCV 2020',
    type: 'publication',
    url: 'https://doi.org/10.1007/978-3-030-58601-0_46',
  },
  {
    id: 'siggraph-asia-2019',
    date: '2019-11-01',
    title: 'Light Field Segmentation published at SIGGRAPH Asia (ACM TOG)',
    titleZh: '光场分割论文发表于 SIGGRAPH Asia（ACM TOG）',
    type: 'publication',
    url: 'https://doi.org/10.1145/3355089.3356521',
  },
  {
    id: 'sigtrading-founded',
    date: '2018-05-01',
    title: 'Founded SigTrading — real-time AI trading system',
    titleZh: '创立 SigTrading — 实时 AI 交易系统',
    type: 'project',
    url: 'https://www.algotech.cc',
  },
]
