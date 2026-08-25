'use client'

import { profile } from '@/data/profile'
import { useLang, pick } from '@/components/context/LanguageContext'
import { Mail, GraduationCap, Code, Link2, FileText, User } from 'lucide-react'
import Link from 'next/link'

const iconMap = {
  mail: Mail,
  'graduation-cap': GraduationCap,
  github: Code,
  linkedin: Link2,
  orcid: Link2,
  'file-text': FileText,
}

const bioEn = `Dr. Rui Li's research spans computer graphics, computer vision, and wireless communication, with a focus on high-speed 3D reconstruction, differentiable rendering, and real-time systems. He received his Ph.D. in Electrical and Computer Engineering from King Abdullah University of Science and Technology (KAUST) in late 2023, under Prof. Wolfgang Heidrich. He also holds a Master's degree from the University of Science and Technology of China (USTC) and a Bachelor's degree from Xidian University. He has collaborated with HKUST, DJI, and SONY. His work has been published in leading venues including SIGGRAPH, SIGGRAPH Asia, ACM Transactions on Graphics, CVPR, ECCV, and ICCV.

Dr. Li is currently an Assistant Researcher in the Mobile Communications Division at Peng Cheng Laboratory (PCL), where he also serves as a Ph.D. advisor. As a key technical contributor to three major PCL projects, he leads the development of core technologies for holographic communication systems, including real-time 3D capture, reconstruction, transmission, and rendering, providing essential support for a next-generation communication testbed. His lab is equipped with 15 high-performance servers, event cameras, high-speed global-shutter cameras, RGBD cameras, and other imaging systems, and benefits from near-unlimited large-model access via the Peng Cheng Cloud Brain.`

const bioZh = `李睿博士，研究方向涵盖计算机图形学、计算机视觉和无线通信，专攻高速三维重建、可微渲染、实时系统领域。2023底年于阿卜杜拉国王科技大学（KAUST）电子与计算机工程系获博士学位，师从Prof. Wolfgang Heidrich教授；在此之前，他在中国科学技术大学获工学硕士学位，在西安电子科技大学获得工学学士学位。曾赴香港科技大学、大疆创新（DJI）、索尼（SONY）等机构开展科研合作。他的学术成果发表在SIGGRAPH、SIGGRAPH Asia、Trans. on Graphics (TOG)、CVPR、ECCV、ICCV等旗舰会议和期刊，总计发表高水平论文十余篇。

李睿博士现任鹏城国家实验室通信部移动所助理研究员，担任实验室博士生导师。在科研项目方面，李博士作为技术骨干参与鹏城实验室重大科研项目3项，主导研发三维场景实时采集、重建、传输及渲染等全息通信体系关键技术，为构建新一代通信测试平台提供了核心技术支撑。实验室内配置高性能服务15台（5090、5880、4090等），并有多目事件相机、高速全局快门相机、RGBD相机等成像设备，以及依托鹏城云脑基础设施，拥有几乎无限的GLM、DeepSeek大模型token。`

export default function HeroSection() {
  const { lang } = useLang()
  const title = pick(profile.title, profile.titleZh, lang)
  const affiliation = pick(profile.affiliation, profile.affiliationZh, lang)
  const resumeHref = lang === 'zh' ? profile.resumeZh : profile.resumeEn
  const bio = lang === 'zh' ? bioZh : bioEn

  return (
    <section className="relative pt-24 pb-16 md:pt-32 md:pb-20 overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-1/4 w-72 h-72 bg-accent-subtle/40 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-slate-100 rounded-full blur-3xl" />
      </div>

      <div className="max-w-[1100px] mx-auto px-6">
        {/* Avatar + name + title */}
        <div className="text-center">
          <div className="w-28 h-28 md:w-32 md:h-32 mx-auto mb-6 rounded-full bg-accent-subtle border-4 border-white shadow-lg flex items-center justify-center overflow-hidden">
            <img src={profile.avatar} alt={profile.name} className="w-full h-full rounded-full object-cover" />
          </div>

          {/* Name always shows both Rui Li and 李睿 */}
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-slate-900">
            {profile.name} <span className="text-accent">·</span> {profile.nameZh}
          </h1>
          <p className="mt-2 text-lg md:text-xl text-slate-600 font-medium">
            {title}
          </p>
          <p className="mt-1 text-slate-500">{affiliation}</p>
        </div>

        {/* Social links */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
          {profile.socials.map((s) => {
            const Icon = iconMap[s.icon] ?? Mail
            const isExternal = s.href.startsWith('http') || s.href.startsWith('mailto')
            const label = pick(s.labelEn, s.label, lang)
            const href = s.icon === 'file-text' ? resumeHref : s.href
            return (
              <a
                key={s.label}
                href={href}
                {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-accent transition-colors"
              >
                <Icon size={16} /> {label}
              </a>
            )
          })}
        </div>

        {/* About / self-introduction card */}
        <div className="mt-8 card p-6 md:p-8 text-left">
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

          {/* CTA buttons inside the About card */}
          <div className="mt-6 flex justify-start gap-4">
            <Link
              href="/research"
              className="px-5 py-2.5 bg-accent text-white rounded-lg text-sm font-medium hover:bg-accent-light transition-colors"
            >
              {lang === 'zh' ? '研究方向' : 'Research'}
            </Link>
            <Link
              href="/startup"
              className="px-5 py-2.5 border border-slate-300 text-slate-700 rounded-lg text-sm font-medium hover:border-accent hover:text-accent transition-colors"
            >
              {lang === 'zh' ? '创业项目' : 'Startup'}
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
