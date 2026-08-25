'use client'

import { projects } from '@/data/projects'
import { useLang } from '@/components/context/LanguageContext'
import { ui } from '@/data/i18n'
import { SectionTitle, Badge, LinkButton } from '@/components/ui'
import ScrollReveal from '@/components/layout/ScrollReveal'
import { FolderKanban, ExternalLink } from 'lucide-react'

export default function ProjectsPageClient() {
  const { lang } = useLang()
  const t = ui(lang)
  const sorted = [...projects].sort((a, b) => b.date.localeCompare(a.date))
  return (
    <div className="section-container">
      <SectionTitle subtitle={t.projectsPage.subtitle(projects.length)}>
        {t.projectsPage.title}
      </SectionTitle>

      <div className="space-y-5">
        {sorted.map((p, i) => (
          <ScrollReveal key={p.id} delay={i * 0.06}>
            <article className="card p-6">
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 shrink-0 rounded-xl bg-accent-subtle text-accent flex items-center justify-center">
                  <FolderKanban size={22} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-3 flex-wrap">
                    <h3 className="font-serif text-lg font-bold text-slate-900">{p.title}</h3>
                    <span className="text-xs text-slate-400">{p.date}</span>
                  </div>
                  <p className="mt-1 text-sm text-accent font-medium">{p.summary}</p>
                  <p className="mt-3 text-sm text-slate-600 leading-relaxed">{p.description}</p>

                  {p.highlights && p.highlights.length > 0 && (
                    <ul className="mt-4 space-y-1.5">
                      {p.highlights.map((h) => (
                        <li key={h} className="text-sm text-slate-600 flex items-start gap-2">
                          <span className="text-accent mt-0.5">▸</span>
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {p.tags.map((tag) => (
                      <Badge key={tag} variant="outline">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  {p.externalUrl && (
                    <div className="mt-4">
                      <a
                        href={p.externalUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:text-accent-light transition-colors"
                      >
                        {t.projectsPage.visitProject} <ExternalLink size={14} />
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </article>
          </ScrollReveal>
        ))}
      </div>

      <div className="mt-10">
        <LinkButton href="/research">{t.projectsPage.viewResearch}</LinkButton>
      </div>
    </div>
  )
}
