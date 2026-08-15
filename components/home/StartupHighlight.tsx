import { startups } from '@/data/startups'
import { SectionTitle, LinkButton, Badge } from '@/components/ui'
import ScrollReveal from '@/components/layout/ScrollReveal'
import { TrendingUp, Palette, ExternalLink, ArrowRight } from 'lucide-react'
import Link from 'next/link'

const iconMap = {
  'trending-up': TrendingUp,
  palette: Palette,
  box: TrendingUp,
  cpu: TrendingUp,
}

export default function StartupHighlight() {
  return (
    <section className="section-container">
      <SectionTitle subtitle="科研到产品的转化 · AI 量化交易与区块链数字艺术">
        创业项目
      </SectionTitle>
      <div className="grid md:grid-cols-2 gap-5">
        {startups.map((s, i) => {
          const Icon = iconMap[s.icon] ?? TrendingUp
          const statusLabel = s.status === 'active' ? '运营中' : '已归档'
          return (
            <ScrollReveal key={s.id} delay={i * 0.1}>
              <div className="card p-6 h-full flex flex-col">
                <div className="flex items-center justify-between">
                  <div className={`w-12 h-12 rounded-xl ${s.accent} flex items-center justify-center`}>
                    <Icon size={24} />
                  </div>
                  <Badge variant={s.status === 'active' ? 'accent' : 'default'}>{statusLabel}</Badge>
                </div>
                <h3 className="mt-4 font-serif text-xl font-bold text-slate-900">{s.name}</h3>
                <p className="mt-1 text-sm text-accent font-medium">{s.role} · {s.founded}</p>
                <p className="mt-3 text-sm text-slate-600 leading-relaxed flex-1">{s.taglineZh}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {s.techStack.slice(0, 4).map((t) => (
                    <Badge key={t} variant="outline">
                      {t}
                    </Badge>
                  ))}
                </div>
                <div className="mt-5 flex items-center gap-4">
                  {s.website && (
                    <a
                      href={s.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:text-accent-light transition-colors"
                    >
                      官网 <ExternalLink size={14} />
                    </a>
                  )}
                  <Link
                    href="/startup"
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-600 hover:text-accent transition-colors group"
                  >
                    了解更多
                    <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </div>
              </div>
            </ScrollReveal>
          )
        })}
      </div>
      <div className="mt-8">
        <LinkButton href="/startup">查看创业详情</LinkButton>
      </div>
    </section>
  )
}
