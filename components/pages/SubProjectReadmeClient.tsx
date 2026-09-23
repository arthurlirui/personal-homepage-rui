'use client'

import Link from 'next/link'
import { useLang, pick } from '@/components/context/LanguageContext'
import { ui } from '@/data/i18n'
import { Badge, LinkButton } from '@/components/ui'
import { Markdown } from '@/components/ui/Markdown'
import { ArrowLeft, ExternalLink, FileText } from 'lucide-react'
import type { Startup } from '@/data/startups'

export default function SubProjectReadmeClient({
  sub,
  parent,
  readme,
}: {
  sub: Startup
  parent?: Startup
  readme: string | null
}) {
  const { lang } = useLang()
  const t = ui(lang)
  const tagline = pick(sub.tagline, sub.taglineZh, lang)
  const description = pick(sub.description, sub.descriptionZh, lang)

  return (
    <div>
      {/* Hero */}
      <section className="relative pt-28 pb-10 md:pt-32 md:pb-12 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-16 left-1/3 w-80 h-80 bg-accent-subtle/40 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-sky-50 rounded-full blur-3xl" />
        </div>
        <div className="section-container! pt-0">
          <Link
            href="/projects"
            className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-accent transition-colors"
          >
            <ArrowLeft size={15} />
            {t.subProjectReadme.backToProjects}
          </Link>

          <div className="mt-5 flex items-center gap-2 flex-wrap">
            <Badge variant="accent">
              <span className="inline-flex items-center gap-1">
                <FileText size={12} />
                {t.subProjectReadme.readmeTitle}
              </span>
            </Badge>
            {parent && (
              <span className="text-xs text-slate-500">
                {t.subProjectReadme.parentLabel}:{' '}
                <Link href="/projects" className="text-accent hover:underline">
                  {parent.name}
                </Link>
              </span>
            )}
          </div>

          <h1 className="mt-3 text-3xl md:text-4xl font-serif font-bold text-slate-900">{sub.name}</h1>
          <p className="mt-3 text-lg text-slate-600 leading-relaxed max-w-2xl">{tagline}</p>
          <p className="mt-2 text-sm text-slate-500 leading-relaxed max-w-3xl">{description}</p>

          {sub.techStack && sub.techStack.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-1.5">
              {sub.techStack.slice(0, 8).map((tk) => (
                <Badge key={tk} variant="outline">
                  {tk}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* README body */}
      <section className="section-container! pt-0">
        <div className="card p-6 md:p-10">
          {readme ? (
            <Markdown source={readme} />
          ) : (
            <p className="text-slate-500 italic">{t.subProjectReadme.notAvailable}</p>
          )}
        </div>

        <div className="mt-8 flex gap-6 flex-wrap">
          <LinkButton href="/projects">{t.subProjectReadme.backToProjects}</LinkButton>
          {sub.website && (
            <a
              href={sub.website}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:text-accent-light transition-colors"
            >
              {t.subProjectReadme.viewSource} <ExternalLink size={14} />
            </a>
          )}
        </div>
      </section>
    </div>
  )
}
