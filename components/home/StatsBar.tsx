'use client'

import { publications } from '@/data/publications'
import { startups } from '@/data/startups'
import { useLang } from '@/components/context/LanguageContext'
import CountUp from '@/components/ui/CountUp'
import ScrollReveal from '@/components/layout/ScrollReveal'

// Venues considered "flagship" for the highlight count — mirrors PaperHighlights.
const FLAGSHIP_VENUES = ['SIGGRAPH', 'SIGGRAPH Asia', 'ACM Transactions on Graphics', 'TOG', 'CVPR', 'ECCV', 'ICCV']

export default function StatsBar() {
  const { lang } = useLang()
  const zh = lang === 'zh'

  const totalPubs = publications.length
  const flagshipPubs = publications.filter((p) =>
    FLAGSHIP_VENUES.some((v) => p.venueShort.includes(v) || p.venue.includes(v)),
  ).length
  const ventureCount = startups.filter((s) => !s.parentId).length
  // Research years counted from the bachelor degree year (2013) to today.
  const researchYears = new Date().getFullYear() - 2013

  const stats: { value: number; label: string; suffix?: string }[] = [
    { value: totalPubs, label: zh ? '发表论文' : 'Publications' },
    { value: flagshipPubs, label: zh ? '顶会/顶刊' : 'Top-tier Papers' },
    { value: ventureCount, label: zh ? '创业项目' : 'Ventures' },
    { value: researchYears, label: zh ? '研究年限' : 'Research Years', suffix: '+' },
  ]

  return (
    <section className="section-container !py-10 md:!py-12">
      <ScrollReveal>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {stats.map((s) => (
            <div
              key={s.label}
              className="card p-5 text-center"
            >
              <div className="text-3xl md:text-4xl font-serif font-bold text-accent tabular-nums">
                <CountUp value={s.value} suffix={s.suffix} />
              </div>
              <div className="mt-1 text-xs md:text-sm text-slate-500">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </ScrollReveal>
    </section>
  )
}
