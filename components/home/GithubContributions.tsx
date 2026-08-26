'use client'

import { useState, useEffect } from 'react'
import { useLang } from '@/components/context/LanguageContext'
import { GitCommitHorizontal } from 'lucide-react'

const GITHUB_USER = 'arthurlirui'

// GitHub contribution heatmap color levels
const LEVEL_COLORS = [
  '#ebedf0', // 0 contributions
  '#9be9a8', // 1-2
  '#40c463', // 3-5
  '#30a14e', // 6-9
  '#216e39', // 10+
]

function getLevel(count: number): number {
  if (count === 0) return 0
  if (count <= 2) return 1
  if (count <= 5) return 2
  if (count <= 9) return 3
  return 4
}

interface DayData {
  date: string
  count: number
  level: number
}

interface WeekData {
  days: DayData[]
}

function buildGrid(counts: Record<string, number>): WeekData[] {
  const today = new Date()
  const weeks: WeekData[] = []
  // Start from 52 weeks ago, aligned to Sunday
  const start = new Date(today)
  start.setDate(today.getDate() - 364)
  start.setDate(start.getDate() - start.getDay()) // align to Sunday

  let current = new Date(start)
  while (current <= today) {
    const week: DayData[] = []
    for (let d = 0; d < 7; d++) {
      const dateStr = current.toISOString().slice(0, 10)
      const count = counts[dateStr] || 0
      week.push({ date: dateStr, count, level: getLevel(count) })
      current.setDate(current.getDate() + 1)
      if (current > today) break
    }
    weeks.push({ days: week })
  }
  return weeks
}

export default function GithubContributions() {
  const { lang } = useLang()
  const [weeks, setWeeks] = useState<WeekData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [totalContribs, setTotalContribs] = useState(0)
  const [activeDays, setActiveDays] = useState(0)

  useEffect(() => {
    async function fetchContributions() {
      try {
        // Fetch from our own API route (server-side proxy to GitHub)
        const res = await fetch('/api/github-contributions')
        if (!res.ok) {
          setError(true)
          setLoading(false)
          return
        }
        const data = await res.json()
        const counts: Record<string, number> = data.counts || {}

        if (Object.keys(counts).length === 0) {
          setError(true)
          setLoading(false)
          return
        }

        const grid = buildGrid(counts)
        setWeeks(grid)

        let total = 0
        let active = 0
        for (const week of grid) {
          for (const day of week.days) {
            total += day.count
            if (day.count > 0) active++
          }
        }
        setTotalContribs(total)
        setActiveDays(active)
        setLoading(false)
      } catch {
        setError(true)
        setLoading(false)
      }
    }

    fetchContributions()
  }, [])

  const monthLabels = lang === 'zh'
    ? ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
    : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

  const dayLabels = lang === 'zh'
    ? ['一', '三', '五']
    : ['Mon', 'Wed', 'Fri']

  // Build month labels for the grid header
  const monthLabelPositions: { label: string; col: number }[] = []
  if (weeks.length > 0) {
    let lastMonth = -1
    weeks.forEach((week, col) => {
      const firstDay = week.days[0]
      if (firstDay) {
        const month = new Date(firstDay.date).getMonth()
        if (month !== lastMonth) {
          monthLabelPositions.push({ label: monthLabels[month], col })
          lastMonth = month
        }
      }
    })
  }

  return (
    <section className="section-container bg-surface-muted/50">
      <div className="flex items-center gap-2 mb-6">
        <GitCommitHorizontal size={20} className="text-accent" />
        <h2 className="text-xl md:text-2xl font-serif font-semibold text-slate-900">
          {lang === 'zh' ? 'GitHub 活跃度' : 'GitHub Activity'}
        </h2>
        <a
          href={`https://github.com/${GITHUB_USER}`}
          target="_blank"
          rel="noopener noreferrer"
          className="ml-auto text-sm text-slate-500 hover:text-accent transition-colors"
        >
          @{GITHUB_USER}
        </a>
      </div>

      {loading && (
        <div className="card p-6">
          <div className="flex gap-[3px] overflow-hidden">
            {Array.from({ length: 52 }).map((_, i) => (
              <div key={i} className="flex flex-col gap-[3px]">
                {Array.from({ length: 7 }).map((__, j) => (
                  <div
                    key={j}
                    className="w-[11px] h-[11px] rounded-[2px] bg-slate-100 animate-pulse"
                    style={{ animationDelay: `${(i + j) * 8}ms` }}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      )}

      {error && (
        <div className="card p-6 text-center">
          <p className="text-sm text-slate-500">
            {lang === 'zh'
              ? 'GitHub 数据暂时无法加载，请稍后访问 '
              : 'Unable to load GitHub activity right now. Please visit '}
            <a
              href={`https://github.com/${GITHUB_USER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:text-accent-light font-medium"
            >
              GitHub
            </a>
          </p>
        </div>
      )}

      {!loading && !error && weeks.length > 0 && (
        <div className="card p-6">
          {/* Stats */}
          <div className="flex flex-wrap items-center gap-4 mb-4 text-sm">
            <span className="text-slate-700">
              <span className="font-bold text-accent">{totalContribs}</span>{' '}
              {lang === 'zh' ? '次贡献' : 'contributions'}
            </span>
            <span className="text-slate-400">·</span>
            <span className="text-slate-700">
              <span className="font-bold text-accent">{activeDays}</span>{' '}
              {lang === 'zh' ? '个活跃日' : 'active days'}
            </span>
            <span className="text-slate-400">·</span>
            <span className="text-slate-500 text-xs">
              {lang === 'zh' ? '过去 12 个月' : 'in the last year'}
            </span>
          </div>

          {/* Heatmap */}
          <div className="overflow-x-auto">
            <div className="inline-block min-w-full">
              {/* Month labels */}
              <div className="flex gap-[3px] mb-1 ml-8">
                {weeks.map((_, col) => {
                  const label = monthLabelPositions.find((m) => m.col === col)
                  return (
                    <div
                      key={col}
                      className="w-[11px] text-[10px] text-slate-400 leading-none h-3"
                    >
                      {label ? label.label : ''}
                    </div>
                  )
                })}
              </div>

              <div className="flex gap-1">
                {/* Day labels */}
                <div className="flex flex-col gap-[3px] w-8 shrink-0">
                  {Array.from({ length: 7 }).map((_, i) => (
                    <div key={i} className="h-[11px] text-[10px] text-slate-400 leading-[11px]">
                      {i === 1 || i === 3 || i === 5 ? dayLabels[Math.floor(i / 2)] : ''}
                    </div>
                  ))}
                </div>

                {/* Grid */}
                <div className="flex gap-[3px]">
                  {weeks.map((week, col) => (
                    <div key={col} className="flex flex-col gap-[3px]">
                      {week.days.map((day, row) => (
                        <div
                          key={row}
                          className="w-[11px] h-[11px] rounded-[2px] transition-colors hover:ring-1 hover:ring-slate-300 cursor-default"
                          style={{ backgroundColor: LEVEL_COLORS[day.level] }}
                          title={`${day.date}: ${day.count} ${lang === 'zh' ? '次贡献' : 'contributions'}`}
                        />
                      ))}
                    </div>
                  ))}
                </div>
              </div>

              {/* Legend */}
              <div className="flex items-center justify-end gap-1 mt-3 text-[10px] text-slate-400">
                <span className="mr-1">{lang === 'zh' ? '少' : 'Less'}</span>
                {LEVEL_COLORS.map((color, i) => (
                  <div
                    key={i}
                    className="w-[11px] h-[11px] rounded-[2px]"
                    style={{ backgroundColor: color }}
                  />
                ))}
                <span className="ml-1">{lang === 'zh' ? '多' : 'More'}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
