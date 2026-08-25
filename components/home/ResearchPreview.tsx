'use client'

import { researchAreas } from '@/data/research'
import { useLang, pick } from '@/components/context/LanguageContext'
import { ui } from '@/data/i18n'
import { SectionTitle, LinkButton, Badge } from '@/components/ui'
import ScrollReveal from '@/components/layout/ScrollReveal'
import { Box, Camera, Waves, Sparkles } from 'lucide-react'
import Link from 'next/link'

const iconMap = { box: Box, camera: Camera, waves: Waves, sparkles: Sparkles }

export default function ResearchPreview() {
  const { lang } = useLang()
  const t = ui(lang)

  return (
    <section className="section-container">
      <SectionTitle subtitle={t.researchPreview.subtitle}>{t.researchPreview.title}</SectionTitle>
      <div className="grid md:grid-cols-3 gap-5">
        {researchAreas.map((area, i) => {
          const Icon = iconMap[area.icon] ?? Box
          const title = pick(area.title, area.titleZh, lang)
          const summary = pick(area.summary, area.summaryZh, lang)
          return (
            <ScrollReveal key={area.id} delay={i * 0.1}>
              <Link href="/research" className="card p-6 block h-full">
                <div className="w-10 h-10 rounded-lg bg-accent-subtle text-accent flex items-center justify-center mb-4">
                  <Icon size={20} />
                </div>
                <h3 className="font-serif font-semibold text-slate-900 text-lg">{title}</h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">{summary}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {area.keywords.slice(0, 3).map((k) => (
                    <Badge key={k} variant="accent">
                      {k}
                    </Badge>
                  ))}
                </div>
              </Link>
            </ScrollReveal>
          )
        })}
      </div>
      <div className="mt-8">
        <LinkButton href="/research">{t.researchPreview.viewAll}</LinkButton>
      </div>
    </section>
  )
}
