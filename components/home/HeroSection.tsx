import { profile } from '@/data/profile'
import { Mail, GraduationCap, Code, Link2, FileText } from 'lucide-react'
import Link from 'next/link'

const iconMap = {
  mail: Mail,
  'graduation-cap': GraduationCap,
  github: Code,
  linkedin: Link2,
  orcid: Link2,
  'file-text': FileText,
}

export default function HeroSection() {
  return (
    <section className="relative pt-24 pb-16 md:pt-36 md:pb-24 overflow-hidden">
      {/* 背景装饰 */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-1/4 w-72 h-72 bg-accent-subtle/40 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-slate-100 rounded-full blur-3xl" />
      </div>

      <div className="max-w-[880px] mx-auto px-6 text-center">
        {/* 头像 */}
        <div className="w-28 h-28 md:w-32 md:h-32 mx-auto mb-6 rounded-full bg-accent-subtle border-4 border-white shadow-lg flex items-center justify-center overflow-hidden">
          <img src={profile.avatar} alt={profile.name} className="w-full h-full rounded-full object-cover" />
        </div>

        <h1 className="text-3xl md:text-4xl font-serif font-bold text-slate-900">
          {profile.name} <span className="text-accent">·</span> {profile.nameZh}
        </h1>
        <p className="mt-2 text-lg md:text-xl text-slate-600 font-medium">
          {profile.title} · {profile.titleZh}
        </p>
        <p className="mt-1 text-slate-500">{profile.affiliationZh}</p>

        {/* 社交链接 */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
          {profile.socials.map((s) => {
            const Icon = iconMap[s.icon] ?? Mail
            const isExternal = s.href.startsWith('http') || s.href.startsWith('mailto')
            return (
              <a
                key={s.label}
                href={s.href}
                {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-accent transition-colors"
              >
                <Icon size={16} /> {s.label}
              </a>
            )
          })}
        </div>

        {/* 研究兴趣 */}
        {profile.researchInterests.length > 0 && (
          <div className="mt-8 flex flex-wrap justify-center gap-2">
            {profile.researchInterests.map((interest) => (
              <span
                key={interest}
                className="px-3 py-1 bg-accent-subtle text-accent text-sm font-medium rounded-full"
              >
                {interest}
              </span>
            ))}
          </div>
        )}

        <div className="mt-8 flex justify-center gap-4">
          <Link
            href="/research"
            className="px-5 py-2.5 bg-accent text-white rounded-lg text-sm font-medium hover:bg-accent-light transition-colors"
          >
            研究方向
          </Link>
          <Link
            href="/startup"
            className="px-5 py-2.5 border border-slate-300 text-slate-700 rounded-lg text-sm font-medium hover:border-accent hover:text-accent transition-colors"
          >
            创业项目
          </Link>
        </div>
      </div>
    </section>
  )
}
