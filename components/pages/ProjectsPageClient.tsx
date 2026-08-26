'use client'

import { projects } from '@/data/projects'
import { startups } from '@/data/startups'
import { useLang, pick } from '@/components/context/LanguageContext'
import { ui } from '@/data/i18n'
import { SectionTitle, Badge, LinkButton } from '@/components/ui'
import ScrollReveal from '@/components/layout/ScrollReveal'
import { FolderKanban, ExternalLink, TrendingUp, Palette, FileText, BookOpen, Globe, Sparkles, Check, CornerDownRight } from 'lucide-react'

const iconMap = {
  'trending-up': TrendingUp,
  palette: Palette,
  box: TrendingUp,
  cpu: TrendingUp,
  'file-text': FileText,
  'book-open': BookOpen,
  globe: Globe,
  sparkles: Sparkles,
}

export default function ProjectsPageClient() {
  const { lang } = useLang()
  const t = ui(lang)
  const sorted = [...projects].sort((a, b) => b.date.localeCompare(a.date))
  const topLevel = startups.filter((s) => !s.parentId)

  return (
    <div className="section-container">
      {/* Research Projects */}
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

      {/* Independent Projects */}
      <div className="mt-12">
        <SectionTitle subtitle={t.startupHighlight.subtitle}>
          {t.startupHighlight.title}
        </SectionTitle>

        <div className="space-y-5">
          {topLevel.map((s, i) => {
            const Icon = iconMap[s.icon] ?? TrendingUp
            const statusLabel = s.status === 'active' ? t.startupHighlight.statusActive : t.startupHighlight.statusArchived
            const tagline = pick(s.tagline, s.taglineZh, lang)
            const children = startups.filter((c) => c.parentId === s.id)

            return (
              <ScrollReveal key={s.id} delay={i * 0.1}>
                <div>
                  {/* Parent card */}
                  <div className="card p-6 flex flex-col">
                    <div className="flex items-center justify-between">
                      <div className={`w-12 h-12 rounded-xl ${s.accent} flex items-center justify-center`}>
                        <Icon size={24} />
                      </div>
                      <Badge variant={s.status === 'active' ? 'accent' : 'default'}>{statusLabel}</Badge>
                    </div>
                    <h3 className="mt-4 font-serif text-xl font-bold text-slate-900">{s.name}</h3>
                    <p className="mt-1 text-sm text-accent font-medium">{s.role} · {s.founded}</p>
                    <p className="mt-3 text-sm text-slate-600 leading-relaxed">{tagline}</p>
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {s.techStack.slice(0, 4).map((tk) => (
                        <Badge key={tk} variant="outline">
                          {tk}
                        </Badge>
                      ))}
                    </div>
                    {s.website && (
                      <div className="mt-5">
                        <a
                          href={s.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:text-accent-light transition-colors"
                        >
                          {t.startupHighlight.website} <ExternalLink size={14} />
                        </a>
                      </div>
                    )}
                  </div>

                  {/* Sub-studio cards */}
                  {children.length > 0 && (
                    <div className="mt-3 ml-6 grid md:grid-cols-3 gap-3">
                      {children.map((c) => {
                        const ChildIcon = iconMap[c.icon] ?? TrendingUp
                        const childTagline = pick(c.tagline, c.taglineZh, lang)
                        return (
                          <div key={c.id} className="card p-4 flex flex-col bg-surface-muted/40">
                            <div className="flex items-center gap-2">
                              <CornerDownRight size={14} className="text-slate-400 shrink-0" />
                              <div className={`w-8 h-8 rounded-lg ${c.accent} flex items-center justify-center shrink-0`}>
                                <ChildIcon size={16} />
                              </div>
                              <h4 className="font-serif font-semibold text-slate-900 text-sm">{c.name}</h4>
                            </div>
                            <p className="mt-2 text-xs text-slate-600 leading-relaxed flex-1">{childTagline}</p>
                          </div>
                        )
                      })}
                    </div>
                  )}
                </div>
              </ScrollReveal>
            )
          })}
        </div>
      </div>

      <div className="mt-10 flex gap-6">
        <LinkButton href="/publications">{t.experiencePage.viewPubs}</LinkButton>
        <LinkButton href="/experience">{t.startupPage.viewFullCv}</LinkButton>
      </div>
    </div>
  )
}
