'use client'

import { publications } from '@/data/publications'
import { useLang } from '@/components/context/LanguageContext'
import { ui } from '@/data/i18n'
import { SectionTitle, LinkButton, Badge } from '@/components/ui'
import ScrollReveal from '@/components/layout/ScrollReveal'
import { FileText, ExternalLink } from 'lucide-react'

// Flagship venues featured in the "Selected Papers" section, ordered newest-first.
const FLAGSHIP_VENUES = ['ECCV', 'SIGGRAPH', 'SIGGRAPH Asia', 'ICCV']

export default function PaperHighlights() {
  const { lang } = useLang()
  const t = ui(lang)
  const featured = publications
    .filter((p) => FLAGSHIP_VENUES.some((v) => p.venueShort.includes(v)))
    .sort((a, b) => b.year - a.year)
    .slice(0, 5)

  return (
    <section className="section-container bg-surface-muted/50">
      <SectionTitle subtitle={t.paperHighlights.subtitle}>{t.paperHighlights.title}</SectionTitle>
      <div className="space-y-4">
        {featured.map((p, i) => (
          <ScrollReveal key={p.id} delay={i * 0.06}>
            <article className="card overflow-hidden">
              <div className="flex flex-col sm:flex-row">
                {/* Teaser thumbnail */}
                {p.teaser && (
                  <div className="sm:w-48 shrink-0 bg-surface-muted border-b sm:border-b-0 sm:border-r border-slate-100">
                    <img
                      src={p.teaser}
                      alt={p.title}
                      className="w-full h-40 sm:h-full object-cover"
                    />
                  </div>
                )}
                <div className="flex-1 p-5">
                  <div className="flex items-start gap-3">
                    {!p.teaser && (
                      <div className="mt-0.5 w-9 h-9 shrink-0 rounded-lg bg-accent-subtle text-accent flex items-center justify-center">
                        <FileText size={18} />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-serif font-semibold text-slate-900 leading-snug">{p.title}</h3>
                      <p className="mt-1 text-sm text-slate-600">{p.authors.join(', ')}</p>
                      <div className="mt-2 flex flex-wrap items-center gap-2">
                        <Badge variant="accent">{p.venueShort}</Badge>
                        <span className="text-xs text-slate-400">{p.year}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          </ScrollReveal>
        ))}
      </div>
      <div className="mt-8 flex items-center gap-6">
        <LinkButton href="/publications">{t.paperHighlights.viewAll}</LinkButton>
        <a
          href="https://scholar.google.com/citations?user=P6gAcSsAAAAJ&hl=zh-CN"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-accent transition-colors"
        >
          Google Scholar <ExternalLink size={12} />
        </a>
      </div>
    </section>
  )
}
