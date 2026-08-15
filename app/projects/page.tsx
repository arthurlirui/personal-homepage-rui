import { projects } from '@/data/projects'
import { SectionTitle, Badge, LinkButton } from '@/components/ui'
import ScrollReveal from '@/components/layout/ScrollReveal'
import { FolderKanban, ExternalLink } from 'lucide-react'

export const metadata = { title: '科研项目 · Rui Li' }

export default function ProjectsPage() {
  const sorted = [...projects].sort((a, b) => b.date.localeCompare(a.date))
  return (
    <div className="section-container">
      <SectionTitle subtitle={`共 ${projects.length} 个科研项目，涵盖神经渲染、计算摄影、视觉追踪与机器学习`}>
        科研项目
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
                    {p.tags.map((t) => (
                      <Badge key={t} variant="outline">
                        {t}
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
                        访问项目 <ExternalLink size={14} />
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </article>
          </ScrollReveal>
        ))}
      </div>

      <div className="mt-10">
        <LinkButton href="/research">查看研究方向</LinkButton>
      </div>
    </div>
  )
}
