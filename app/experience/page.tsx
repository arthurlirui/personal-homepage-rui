import { experiences } from '@/data/experience'
import { profile } from '@/data/profile'
import { SectionTitle, Badge, LinkButton } from '@/components/ui'
import ScrollReveal from '@/components/layout/ScrollReveal'
import { Briefcase, GraduationCap, Rocket, ExternalLink } from 'lucide-react'

export const metadata = { title: '学术履历 · Rui Li' }

export default function ExperiencePage() {
  const sorted = [...experiences].sort((a, b) => b.start.localeCompare(a.start))
  return (
    <div className="section-container">
      <SectionTitle subtitle="教育背景与职业经历 · 从西安到深圳，跨越学术界与产业界">学术履历</SectionTitle>

      {/* 教育背景 */}
      <div className="mb-10">
        <h3 className="font-serif text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
          <GraduationCap size={20} className="text-accent" />
          教育背景
        </h3>
        <div className="space-y-3">
          {profile.education.map((e, i) => (
            <ScrollReveal key={e.institution} delay={i * 0.06}>
              <div className="card p-5 flex items-center justify-between gap-4 flex-wrap">
                <div>
                  <p className="font-serif font-semibold text-slate-900">
                    {e.degree} · {e.field}
                  </p>
                  <p className="text-sm text-slate-600 mt-0.5">{e.institution}</p>
                </div>
                <Badge variant="accent">{e.year}</Badge>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {/* 工作经历时间线 */}
      <div>
        <h3 className="font-serif text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
          <Briefcase size={20} className="text-accent" />
          工作经历
        </h3>
        <div className="relative pl-6 border-l-2 border-accent-subtle space-y-6">
          {sorted.map((x, i) => (
            <ScrollReveal key={x.role + x.organization} delay={i * 0.06}>
              <div className="relative">
                <div
                  className={`absolute -left-[31px] top-1 w-4 h-4 rounded-full border-4 border-white shadow ${
                    x.isStartup ? 'bg-amber-500' : 'bg-accent'
                  }`}
                />
                <div className="card p-5">
                  <div className="flex items-center justify-between gap-3 flex-wrap">
                    <div className="flex items-center gap-2">
                      {x.isStartup && <Rocket size={16} className="text-amber-500" />}
                      <h4 className="font-serif font-semibold text-slate-900">{x.role}</h4>
                    </div>
                    <span className="text-xs text-slate-400">{x.period}</span>
                  </div>
                  <p className="mt-1 text-sm text-accent font-medium">
                    {x.orgUrl ? (
                      <a href={x.orgUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 hover:text-accent-light">
                        {x.organization} <ExternalLink size={11} />
                      </a>
                    ) : (
                      x.organization
                    )}
                    <span className="text-slate-400"> · {x.location}</span>
                  </p>
                  <p className="mt-2 text-sm text-slate-600 leading-relaxed">{x.description}</p>
                  {x.isStartup && (
                    <div className="mt-3">
                      <Badge variant="accent">★ 创业经历</Badge>
                    </div>
                  )}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>

      <div className="mt-10 flex gap-6">
        <LinkButton href="/startup">查看创业详情</LinkButton>
        <LinkButton href="/publications">查看论文成果</LinkButton>
      </div>
    </div>
  )
}
