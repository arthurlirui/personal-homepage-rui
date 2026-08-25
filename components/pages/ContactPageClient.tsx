'use client'

import { profile } from '@/data/profile'
import { useLang, pick } from '@/components/context/LanguageContext'
import { ui } from '@/data/i18n'
import { SectionTitle, Badge } from '@/components/ui'
import { Mail, GraduationCap, Code, Link2, FileText, MapPin } from 'lucide-react'

const iconMap = {
  mail: Mail,
  'graduation-cap': GraduationCap,
  github: Code,
  linkedin: Link2,
  orcid: Link2,
  'file-text': FileText,
}

export default function ContactPageClient() {
  const { lang } = useLang()
  const t = ui(lang)
  const affiliation = pick(profile.affiliation, profile.affiliationZh, lang)
  const bio = pick(profile.bio, profile.bioZh, lang)
  const resumeHref = lang === 'zh' ? profile.resumeZh : profile.resumeEn

  return (
    <div className="section-container">
      <SectionTitle subtitle={t.contactPage.subtitle}>{t.contactPage.title}</SectionTitle>

      <div className="grid md:grid-cols-2 gap-5">
        {/* 主要联系 */}
        <div className="card p-6">
          <h3 className="font-serif text-lg font-semibold text-slate-900 mb-4">{t.contactPage.emails}</h3>
          <div className="space-y-3">
            <a href={`mailto:${profile.email}`} className="flex items-center gap-3 text-slate-700 hover:text-accent transition-colors">
              <Mail size={18} className="text-accent" />
              <span className="text-sm font-medium">{profile.email}</span>
            </a>
            <a href={`mailto:${profile.emailAlt}`} className="flex items-center gap-3 text-slate-700 hover:text-accent transition-colors">
              <Mail size={18} className="text-accent" />
              <span className="text-sm font-medium">{profile.emailAlt}</span>
              <Badge variant="default">PCL</Badge>
            </a>
          </div>

          <div className="mt-5 pt-5 border-t border-slate-100">
            <p className="text-sm text-slate-600 flex items-center gap-2">
              <MapPin size={16} className="text-accent" />
              {profile.location}
            </p>
            <p className="text-sm text-slate-500 mt-1">{affiliation}</p>
          </div>
        </div>

        {/* 学术平台 */}
        <div className="card p-6">
          <h3 className="font-serif text-lg font-semibold text-slate-900 mb-4">{t.contactPage.platforms}</h3>
          <div className="grid grid-cols-2 gap-3">
            {profile.socials
              .filter((s) => s.icon !== 'mail')
              .map((s) => {
                const Icon = iconMap[s.icon] ?? Mail
                const label = pick(s.labelEn, s.label, lang)
                const href = s.icon === 'file-text' ? resumeHref : s.href
                return (
                  <a
                    key={s.label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 p-3 rounded-lg bg-surface-muted hover:bg-accent-subtle transition-colors group"
                  >
                    <Icon size={18} className="text-accent shrink-0" />
                    <span className="text-sm font-medium text-slate-700 group-hover:text-accent">{label}</span>
                  </a>
                )
              })}
          </div>
        </div>
      </div>

      {/* 简介 */}
      <div className="mt-5 card p-6">
        <h3 className="font-serif text-lg font-semibold text-slate-900 mb-3">{t.contactPage.about}</h3>
        <p className="prose text-slate-700">{bio}</p>
      </div>

      {/* 招生信息 */}
      <div className="mt-5 card p-6 border-l-4 border-l-accent">
        <h3 className="font-serif text-lg font-semibold text-slate-900 mb-2 flex items-center gap-2">
          <GraduationCap size={20} className="text-accent" />
          {t.contactPage.admissionsTitle}
        </h3>
        <p className="text-sm text-slate-600 leading-relaxed">
          {t.contactPage.admissionsBody}{' '}
          <a href={`mailto:${profile.emailAlt}`} className="text-accent hover:text-accent-light font-medium">
            {profile.emailAlt}
          </a>
          {lang === 'zh' ? '（鹏城实验室宽带通信研究所）。' : ' (Peng Cheng Laboratory, Broadband Communication Research Institute).'}
        </p>
      </div>
    </div>
  )
}
