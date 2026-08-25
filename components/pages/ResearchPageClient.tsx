'use client'

import { researchAreas } from '@/data/research'
import { publications } from '@/data/publications'
import { projects } from '@/data/projects'
import { useLang, pick } from '@/components/context/LanguageContext'
import { ui } from '@/data/i18n'
import { SectionTitle, Badge, LinkButton } from '@/components/ui'
import ScrollReveal from '@/components/layout/ScrollReveal'
import { Box, Camera, Waves, ExternalLink } from 'lucide-react'

const iconMap = { box: Box, camera: Camera, waves: Waves, sparkles: Box }

export default function ResearchPageClient() {
  const { lang } = useLang()
  const t = ui(lang)

  return (
    <div className="section-container">
      <SectionTitle subtitle={t.researchPage.subtitle}>{t.researchPage.title}</SectionTitle>

      <div className="space-y-12">
        {researchAreas.map((area, i) => {
          const Icon = iconMap[area.icon] ?? Box
          const pubs = publications.filter((p) => area.relatedPubIds.includes(p.id))
          const projs = projects.filter((p) => area.relatedProjectIds.includes(p.id))
          const title = pick(area.title, area.titleZh, lang)
          const subtitleTitle = lang === 'zh' ? area.title : area.titleZh
          const description = pick(area.description, area.descriptionZh, lang)
          return (
            <ScrollReveal key={area.id} delay={i * 0.08}>
              <div className="card p-7">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 shrink-0 rounded-xl bg-accent-subtle text-accent flex items-center justify-center">
                    <Icon size={24} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-serif text-xl font-bold text-slate-900">{title}</h3>
                    <p className="text-sm text-accent font-medium mt-0.5">{subtitleTitle}</p>
                    <p className="mt-3 text-slate-600 leading-relaxed">{description}</p>
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {area.keywords.map((k) => (
                        <Badge key={k} variant="accent">
                          {k}
                        </Badge>
                      ))}
                    </div>

                    {pubs.length > 0 && (
                      <div className="mt-5">
                        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">{t.researchPage.relatedPubs}</p>
                        <ul className="space-y-1.5">
                          {pubs.map((p) => (
                            <li key={p.id} className="text-sm text-slate-700 flex items-start gap-2">
                              <span className="text-accent mt-0.5">•</span>
                              <span>
                                {p.title} <span className="text-slate-400">({p.venueShort})</span>
                                {p.doi && (
                                  <a href={p.doi} target="_blank" rel="noopener noreferrer" className="ml-1.5 text-accent hover:text-accent-light">
                                    <ExternalLink size={11} className="inline" />
                                  </a>
                                )}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {projs.length > 0 && (
                      <div className="mt-4">
                        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">{t.researchPage.relatedProjects}</p>
                        <div className="flex flex-wrap gap-2">
                          {projs.map((p) => (
                            <Badge key={p.id} variant="outline">
                              {p.title}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          )
        })}
      </div>

      <div className="mt-10 flex gap-6">
        <LinkButton href="/publications">{t.researchPage.viewAllPubs}</LinkButton>
        <LinkButton href="/projects">{t.researchPage.viewAllProjects}</LinkButton>
      </div>
    </div>
  )
}
