'use client'

import Link from 'next/link'
import { useLang, pick } from '@/components/context/LanguageContext'
import { ui } from '@/data/i18n'
import { Badge, LinkButton } from '@/components/ui'
import { Markdown } from '@/components/ui/Markdown'
import { ArrowLeft, ExternalLink, FileText, Cpu, TrendingUp, Palette, FileText as FileTextIcon, BookOpen, Globe, Sparkles, Box } from 'lucide-react'
import type { Startup } from '@/data/startups'

const iconMap = {
  'trending-up': TrendingUp,
  palette: Palette,
  box: Box,
  cpu: Cpu,
  'file-text': FileTextIcon,
  'book-open': BookOpen,
  globe: Globe,
  sparkles: Sparkles,
}

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
  const Icon = iconMap[sub.icon] ?? Cpu

  return (
    <div>
      {/* Hero — matches StartupPageClient hero pattern: full-bleed section + constrained inner column */}
      <section className="relative pt-28 pb-10 md:pt-32 md:pb-12 overflow-hidden border-b border-slate-100">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-16 left-1/3 w-80 h-80 bg-accent-subtle/40 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-sky-50 rounded-full blur-3xl" />
        </div>
        <div className="max-w-[880px] mx-auto px-6">
          <Link
            href="/projects"
            className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-accent transition-colors"
          >
            <ArrowLeft size={15} />
            {t.subProjectReadme.backToProjects}
          </Link>

          <div className="mt-5 flex items-start gap-4">
            <div className={`w-12 h-12 shrink-0 rounded-xl ${sub.accent} flex items-center justify-center`}>
              <Icon size={24} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
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
              <p className="mt-2 text-sm text-accent font-medium">{tagline}</p>
            </div>
          </div>

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

      {/* README body — uses the site's standard section-container (880px) like other content pages */}
      <section className="section-container">
        {readme ? (
          <article className="readme-doc">
            <Markdown source={readme} />
          </article>
        ) : (
          <p className="text-slate-500 italic">{t.subProjectReadme.notAvailable}</p>
        )}

        <div className="mt-12 pt-6 border-t border-slate-100 flex gap-6 flex-wrap">
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
