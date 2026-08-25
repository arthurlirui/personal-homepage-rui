'use client'

import { useLang } from '@/components/context/LanguageContext'
import ScrollReveal from '@/components/layout/ScrollReveal'
import { User } from 'lucide-react'

const bioEn = `Dr. Rui Li's research spans computer graphics, computer vision, and wireless communication, with a focus on 3D reconstruction, differentiable rendering, and real-time systems. He received his Ph.D. in Electrical and Computer Engineering from King Abdullah University of Science and Technology (KAUST) at the end of 2023, advised by IEEE Fellow and computer graphics authority Prof. Wolfgang Heidrich; an M.S. in Information and Communication Engineering from the University of Science and Technology of China (USTC) in 2016; and a B.S. in Communication Engineering from Xidian University in 2013. He has conducted research collaborations with institutions including the Hong Kong University of Science and Technology (HKUST), DJI, and SONY, and holds three granted U.S. patents in UAV visual tracking and navigation. His onboard visual tracking technology has become the foundational architecture for DJI drone active tracking and has been productized. His work has been published in flagship venues and journals including SIGGRAPH, SIGGRAPH Asia, ACM Trans. on Graphics (TOG), CVPR, ECCV, ICCV, IOTJ, and ICIP, with over a dozen high-impact papers in total.

Dr. Li is currently an Assistant Researcher in the Mobile Communications Division of the Communications Department at Peng Cheng Laboratory (PCL), where he serves as a lab mentor advising 2 Ph.D. students and 1 Master's student from leading universities including Beihang University, Shenzhen University, and Southern University of Science and Technology. As a core research backbone of the lab, he is deeply involved in multiple national-level major research projects and has produced a series of results with significant academic value and application prospects. On the research side, Dr. Li participates as a key technical contributor in 3 major PCL research projects, leading the development of key technologies for holographic communication systems—including real-time 3D scene capture, reconstruction, transmission, and rendering—providing core technical support for building a new-generation communication testbed. The lab is equipped with 15 high-performance servers (RTX 5090, 5880, 4090, etc.), multi-camera event cameras, high-speed global-shutter cameras, RGBD cameras and other imaging devices, and—backed by the Peng Cheng Cloud Brain infrastructure—offers near-unlimited tokens for large models such as GLM and DeepSeek.`

const bioZh = `李睿博士，研究方向涵盖计算机图形学、计算机视觉和无线通信，专攻三维重建、可微渲染、实时系统领域。2023底年于阿卜杜拉国王科技大学（KAUST）电子与计算机工程系获博士学位，师从IEEE Fellow、计算机图形学权威专家Prof. Wolfgang Heidrich教授；2016年获中国科学技术大学信息与通信工程硕士学位，2013年获西安电子科技大学通信工程学士学位。曾赴香港科技大学、大疆创新（DJI）、索尼（SONY）等机构开展科研合作，并持有三项美国授权专利（无人机视觉跟踪与导航领域），其研发的机载视觉跟踪技术已成为大疆无人机主动跟踪的基础架构并实现产品化应用。他的学术成果发表在SIGGRAPH、SIGGRAPH Asia、Trans. on Graphics (TOG)、CVPR、ECCV、ICCV、IOTJ、ICIP等旗舰会议和期刊，总计发表高水平论文十余篇。

李睿博士现任鹏城国家实验室通信部移动所助理研究员，担任实验室导师，指导来自北航、深大和南科大等知名高校的2名博士生及1名硕士生。作为实验室核心科研骨干，他深度参与多项国家级重大科研项目攻关工作，取得了一系列具有重要学术价值和应用前景的研究成果。在科研项目方面，李博士作为技术骨干参与鹏城实验室重大科研项目3项，主导研发三维场景实时采集、重建、传输及渲染等全息通信体系关键技术，为构建新一代通信测试平台提供了核心技术支撑。实验室内配置高性能服务15台（5090、5880、4090等），并有多目事件相机、高速全局快门相机、RGBD相机等成像设备，以及依托鹏城云脑基础设施，拥有几乎无限的GLM、DeepSeek大模型token。`

export default function AboutSection() {
  const { lang } = useLang()
  const bio = lang === 'zh' ? bioZh : bioEn

  return (
    <section className="section-container">
      <ScrollReveal>
        <div className="card p-6 md:p-8">
          <div className="flex items-center gap-2 mb-4">
            <User size={20} className="text-accent" />
            <h2 className="text-xl md:text-2xl font-serif font-semibold text-slate-900">
              {lang === 'zh' ? '关于' : 'About'}
            </h2>
          </div>
          <div className="space-y-4 text-slate-700 leading-relaxed text-sm md:text-[15px]">
            {bio.split('\n\n').map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        </div>
      </ScrollReveal>
    </section>
  )
}
