import { researchAreas } from '@/data/research'
import { publications } from '@/data/publications'
import { projects } from '@/data/projects'
import { SectionTitle, Badge, LinkButton } from '@/components/ui'
import ScrollReveal from '@/components/layout/ScrollReveal'
import { Box, Camera, Waves, ExternalLink } from 'lucide-react'

const iconMap = { box: Box, camera: Camera, waves: Waves, sparkles: Box }

export const metadata = { title: '研究方向 · Rui Li' }

export default function ResearchPage() {
  return (
    <div className="section-container">
      <SectionTitle subtitle="三大核心方向，连接成像、重建与反问题求解">研究方向</SectionTitle>

      <div className="space-y-12">
        {researchAreas.map((area, i) => {
          const Icon = iconMap[area.icon] ?? Box
          const pubs = publications.filter((p) => area.relatedPubIds.includes(p.id))
          const projs = projects.filter((p) => area.relatedProjectIds.includes(p.id))
          return (
            <ScrollReveal key={area.id} delay={i * 0.08}>
              <div className="card p-7">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 shrink-0 rounded-xl bg-accent-subtle text-accent flex items-center justify-center">
                    <Icon size={24} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-serif text-xl font-bold text-slate-900">{area.titleZh}</h3>
                    <p className="text-sm text-accent font-medium mt-0.5">{area.title}</p>
                    <p className="mt-3 text-slate-600 leading-relaxed">{area.descriptionZh}</p>
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {area.keywords.map((k) => (
                        <Badge key={k} variant="accent">
                          {k}
                        </Badge>
                      ))}
                    </div>

                    {pubs.length > 0 && (
                      <div className="mt-5">
                        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">相关论文</p>
                        <ul className="space-y-1.5">
                          {pubs.map((p) => (
                            <li key={p.id} className="text-sm text-slate-700 flex items-start gap-2">
                              <span className="text-accent mt-0.5">•</span>
                              <span>
                                {p.title} <span className="text-slate-400">({p.venueShort})</span>
                                {p.doi && (
                                  <a href={p.doi} target="_blank" rel="noopener noreferrer" className="ml-1.5 text-accent hover:text-accent-light">
                                    <ExternalLink size={11} className="inline" />
                                  </a>
                                )}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {projs.length > 0 && (
                      <div className="mt-4">
                        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">相关项目</p>
                        <div className="flex flex-wrap gap-2">
                          {projs.map((p) => (
                            <Badge key={p.id} variant="outline">
                              {p.title}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          )
        })}
      </div>

      <div className="mt-10 flex gap-6">
        <LinkButton href="/publications">查看全部论文</LinkButton>
        <LinkButton href="/projects">查看全部项目</LinkButton>
      </div>
    </div>
  )
}
