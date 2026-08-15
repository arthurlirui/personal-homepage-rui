// 经历数据 — 来源: resume-academic/content/home/experience.md

export interface ExperienceItem {
  role: string
  organization: string
  orgUrl?: string
  location: string
  period: string
  start: string
  end: string | null // null = present
  description: string
  isStartup?: boolean
}

export const experiences: ExperienceItem[] = [
  {
    role: 'Research Scientist',
    organization: 'Peng Cheng Laboratory',
    orgUrl: 'https://www.pcl.ac.cn',
    location: 'Shenzhen, China',
    period: '2023 — Present',
    start: '2023-09',
    end: null,
    description:
      'Research in computational imaging, neural rendering, and 3D reconstruction at the Peng Cheng National Laboratory (PCNL).',
  },
  {
    role: 'Research Intern (Computational Photography)',
    organization: 'SONY R&D Center, Tokyo Laboratory 23',
    orgUrl: 'https://www.sony.com',
    location: 'Tokyo, Japan',
    period: '2022-06 — 2022-09',
    start: '2022-06',
    end: '2022-09',
    description:
      'Algorithm research & development in computational photography, including polarization, hyperspectral, light field, and compressive sensing. Realization of novel functionality combining unique sensor/sensing systems and signal processing.',
  },
  {
    role: 'Founder',
    organization: 'SigTrading',
    orgUrl: 'https://www.algotech.cc',
    location: 'Internet',
    period: '2018-05 — Present',
    start: '2018-05',
    end: null,
    description:
      'Founded SigTrading: (1) designed a real-time AI trading system supporting mainstream deep learning frameworks; (2) designed ticker-based trading algorithms running on crypto exchanges; (3) designed 3D NFT from real-world multiview data.',
    isStartup: true,
  },
  {
    role: 'Research Intern',
    organization: 'Sadeem',
    orgUrl: 'https://sadeemwss.com/',
    location: 'Jeddah, Saudi Arabia',
    period: '2017-05 — 2017-10',
    start: '2017-05',
    end: '2017-10',
    description: 'Firmware developer and algorithm developer for vehicle detection by ultrasonic sensors.',
  },
  {
    role: 'Research Assistant',
    organization: 'HKUST',
    orgUrl: 'https://hkust.edu.hk/',
    location: 'Hong Kong',
    period: '2016-02 — 2016-08',
    start: '2016-02',
    end: '2016-08',
    description:
      'Designed vision tracking and object detection algorithms for low-cost UAV systems; deployed first-generation active tracking for Phantom 4 and Mavic.',
  },
  {
    role: 'Research Intern',
    organization: 'DJI',
    orgUrl: 'https://www.dji.com/',
    location: 'Shenzhen, China',
    period: '2014-09 — 2015-08',
    start: '2014-09',
    end: '2015-08',
    description:
      'Designed vision tracking and object detection algorithms in low-cost UAV systems; deployed first-generation active tracking for Phantom 4 and Mavic.',
  },
  {
    role: 'Research Assistant',
    organization: 'State Key Laboratory of Integrated Services Networks',
    location: "Xi'an, China",
    period: '2013-03 — 2013-05',
    start: '2013-03',
    end: '2013-05',
    description: 'Front-end engineer; designed web pages for visualizing vehicle and transportation data.',
  },
]
