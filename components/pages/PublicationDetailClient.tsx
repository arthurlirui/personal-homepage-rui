'use client'

import Link from 'next/link'
import { useLang } from '@/components/context/LanguageContext'
import { ui } from '@/data/i18n'
import { Badge, LevelBadge, LinkButton } from '@/components/ui'
import { ArrowLeft, ExternalLink, FileText, Code2, BookOpen, ArrowRight } from 'lucide-react'
import type { Publication } from '@/data/publications'
import { pubLevels } from '@/data/publications'

const typeLabelKey: Record<Publication['type'], 'typeJournal' | 'typeConference' | 'typePreprint'> = {
  journal: 'typeJournal',
  conference: 'typeConference',
  preprint: 'typePreprint',
}

export default function PublicationDetailClient({ pub }: { pub: Publication }) {
  const { lang } = useLang()
  const t = ui(lang)
  const levels = pubLevels(pub)

  return (
    <div>
      {/* Hero */}
      <section className="relative pt-28 pb-10 md:pt-32 md:pb-12 overflow-hidden border-b border-slate-100">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-16 left-1/3 w-80 h-80 bg-accent-subtle/40 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-sky-50 rounded-full blur-3xl" />
        </div>
        <div className="max-w-[880px] mx-auto px-6">
          <Link
            href="/publications"
            className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-accent transition-colors"
          >
            <ArrowLeft size={15} />
            {t.publicationDetail.backToPubs}
          </Link>

          <div className="mt-5 flex items-start gap-4">
            <div className="w-12 h-12 shrink-0 rounded-xl bg-accent-subtle text-accent flex items-center justify-center">
              <FileText size={24} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <Badge variant="accent">
                  <span className="inline-flex items-center gap-1">
                    <BookOpen size={12} />
                    {t.publicationsPage[typeLabelKey[pub.type]]}
                  </span>
                </Badge>
                <span className="text-xs text-slate-500">{pub.year}</span>
              </div>
            </div>
          </div>

          <h1 className="mt-4 text-2xl md:text-3xl font-serif font-semibold text-slate-900 leading-snug">
            {pub.title}
          </h1>
          <p className="mt-3 text-sm text-slate-600 leading-relaxed">{pub.authors.join(', ')}</p>

          <div className="mt-4 flex flex-wrap items-center gap-2">
            <Badge variant="accent">{pub.venueShort}</Badge>
            {levels.map((lv) => (
              <LevelBadge key={lv.label} kind={lv.kind} label={lv.label} />
            ))}
            {pub.featured && <Badge variant="outline">{t.publicationsPage.featured}</Badge>}
          </div>
        </div>
      </section>

      {/* Body */}
      <section className="section-container">
        {/* Teaser */}
        {pub.teaser && (
          <figure className="mb-8 rounded-xl overflow-hidden border border-slate-100 shadow-sm">
            <img src={pub.teaser} alt={pub.title} className="w-full object-cover" />
          </figure>
        )}

        {/* Abstract */}
        {pub.abstract ? (
          <div>
            <h2 className="font-serif text-lg font-semibold text-slate-900 mb-3">
              {t.publicationDetail.abstract}
            </h2>
            <p className="text-slate-700 leading-relaxed">{pub.abstract}</p>
          </div>
        ) : (
          <p className="text-slate-500 italic">{t.publicationDetail.noAbstract}</p>
        )}

        {/* Links */}
        <div className="mt-8 flex flex-wrap items-center gap-4">
          {pub.pdf && (
            <Link
              href={pub.pdf}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:text-accent-light transition-colors"
            >
              <FileText size={15} /> PDF
            </Link>
          )}
          {pub.code && (
            <a
              href={pub.code}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:text-accent-light transition-colors"
            >
              <Code2 size={15} /> {t.publicationDetail.code}
            </a>
          )}
          {pub.doi && (
            <a
              href={pub.doi}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:text-accent-light transition-colors"
            >
              DOI <ExternalLink size={13} />
            </a>
          )}
        </div>

        {/* Related project */}
        {pub.projectSlug && (
          <div className="mt-8 p-4 rounded-lg bg-surface-muted/50 border border-slate-100">
            <Link
              href={`/projects/${pub.projectSlug}`}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:text-accent-light transition-colors group"
            >
              {t.publicationDetail.viewProject}
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        )}

        {/* Footer back link */}
        <div className="mt-12 pt-6 border-t border-slate-100">
          <LinkButton href="/publications">{t.publicationDetail.backToPubs}</LinkButton>
        </div>
      </section>
    </div>
  )
}
