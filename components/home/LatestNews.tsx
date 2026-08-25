'use client'

import { news } from '@/data/news'
import { useLang, pick } from '@/components/context/LanguageContext'
import { ui } from '@/data/i18n'
import { SectionTitle, LinkButton } from '@/components/ui'
import ScrollReveal from '@/components/layout/ScrollReveal'
import { Award, FileText, Briefcase, Rocket, Mic } from 'lucide-react'

const typeIcon = {
  award: Award,
  publication: FileText,
  talk: Mic,
  career: Briefcase,
  project: Rocket,
}

const typeColor = {
  award: 'text-amber-600 bg-amber-50',
  publication: 'text-accent bg-accent-subtle',
  talk: 'text-violet-600 bg-violet-50',
  career: 'text-slate-600 bg-slate-100',
  project: 'text-emerald-600 bg-emerald-50',
}

export default function LatestNews() {
  const { lang } = useLang()
  const t = ui(lang)
  const items = [...news]
    .sort((a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0) || b.date.localeCompare(a.date))
    .slice(0, 5)

  return (
    <section className="section-container bg-surface-muted/50">
      <SectionTitle subtitle={t.latestNews.subtitle}>{t.latestNews.title}</SectionTitle>
      <div className="space-y-3">
        {items.map((n, i) => {
          const Icon = typeIcon[n.type] ?? FileText
          const title = pick(n.title, n.titleZh, lang)
          return (
            <ScrollReveal key={n.id} delay={i * 0.05}>
              <div className="flex items-start gap-3 py-3 border-b border-slate-100 last:border-0">
                <div className={`w-9 h-9 shrink-0 rounded-lg flex items-center justify-center ${typeColor[n.type]}`}>
                  <Icon size={18} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-800">
                    {n.pinned && <span className="text-accent mr-1">★</span>}
                    {title}
                  </p>
                  <p className="text-xs text-slate-400 mt-0.5">{n.date}</p>
                </div>
              </div>
            </ScrollReveal>
          )
        })}
      </div>
      <div className="mt-8">
        <LinkButton href="/experience">{t.latestNews.viewAll}</LinkButton>
      </div>
    </section>
  )
}
