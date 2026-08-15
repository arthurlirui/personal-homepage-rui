import { publications, publicationStats } from '@/data/publications'
import { SectionTitle, Badge, LinkButton } from '@/components/ui'
import ScrollReveal from '@/components/layout/ScrollReveal'
import { FileText, ExternalLink } from 'lucide-react'
import Link from 'next/link'

export const metadata = { title: '学术论文 · Rui Li' }

const typeLabel: Record<string, string> = {
  journal: '期刊',
  conference: '会议',
  preprint: '预印本',
}

export default function PublicationsPage() {
  const sorted = [...publications].sort((a, b) => b.year - a.year)
  const years = [...new Set(sorted.map((p) => p.year))].sort((a, b) => b - a)

  return (
    <div className="section-container">
      <SectionTitle subtitle={`共 ${publicationStats.total} 篇 · 期刊 ${publicationStats.byType.journal} · 会议 ${publicationStats.byType.conference} · 预印本 ${publicationStats.byType.preprint}`}>
        学术论文
      </SectionTitle>

      {/* 统计卡片 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
        {[
          { label: '总论文数', value: publicationStats.total },
          { label: '期刊', value: publicationStats.byType.journal },
          { label: '会议', value: publicationStats.byType.conference },
          { label: '顶会顶刊', value: publications.filter((p) => /SIGGRAPH|ICCV|ECCV|TOG/i.test(p.venue)).length },
        ].map((s) => (
          <div key={s.label} className="card p-4 text-center">
            <p className="text-2xl font-serif font-bold text-accent">{s.value}</p>
            <p className="text-xs text-slate-500 mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* 按年份分组 */}
      <div className="space-y-8">
        {years.map((year) => (
          <div key={year}>
            <h3 className="font-serif text-lg font-semibold text-slate-900 mb-4 flex items-center gap-3">
              {year}
              <span className="h-px flex-1 bg-slate-200" />
              <span className="text-sm text-slate-400 font-sans font-normal">
                {sorted.filter((p) => p.year === year).length} 篇
              </span>
            </h3>
            <div className="space-y-4">
              {sorted
                .filter((p) => p.year === year)
                .map((p, i) => (
                  <ScrollReveal key={p.id} delay={i * 0.05}>
                    <article className="card p-5">
                      <div className="flex items-start gap-3">
                        <div className="mt-0.5 w-9 h-9 shrink-0 rounded-lg bg-accent-subtle text-accent flex items-center justify-center">
                          <FileText size={18} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-serif font-semibold text-slate-900 leading-snug">{p.title}</h4>
                          <p className="mt-1 text-sm text-slate-600">{p.authors.join(', ')}</p>
                          <div className="mt-2 flex flex-wrap items-center gap-2">
                            <Badge variant="accent">{p.venueShort}</Badge>
                            <Badge variant="default">{typeLabel[p.type]}</Badge>
                            {p.featured && <Badge variant="outline">★ 代表作</Badge>}
                          </div>
                          {p.abstract && (
                            <p className="mt-3 text-sm text-slate-600 leading-relaxed line-clamp-3">{p.abstract}</p>
                          )}
                          <div className="mt-3 flex items-center gap-4">
                            {p.doi && (
                              <a href={p.doi} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs text-accent hover:text-accent-light">
                                DOI <ExternalLink size={11} />
                              </a>
                            )}
                            {p.pdf && (
                              <Link href={p.pdf} className="inline-flex items-center gap-1 text-xs text-accent hover:text-accent-light">
                                PDF <ExternalLink size={11} />
                              </Link>
                            )}
                          </div>
                        </div>
                      </div>
                    </article>
                  </ScrollReveal>
                ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10">
        <a
          href="https://scholar.google.com/citations?user=P6gAcSsAAAAJ&hl=zh-CN"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:text-accent-light transition-colors group"
        >
          在 Google Scholar 查看完整引用
          <span className="transition-transform group-hover:translate-x-0.5">→</span>
        </a>
      </div>
    </div>
  )
}
