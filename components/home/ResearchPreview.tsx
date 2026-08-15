import { researchAreas } from '@/data/research'
import { SectionTitle, LinkButton, Badge } from '@/components/ui'
import ScrollReveal from '@/components/layout/ScrollReveal'
import { Box, Camera, Waves, Sparkles } from 'lucide-react'
import Link from 'next/link'

const iconMap = { box: Box, camera: Camera, waves: Waves, sparkles: Sparkles }

export default function ResearchPreview() {
  return (
    <section className="section-container">
      <SectionTitle subtitle="三大核心方向：从理论到系统，从成像到重建">研究方向</SectionTitle>
      <div className="grid md:grid-cols-3 gap-5">
        {researchAreas.map((area, i) => {
          const Icon = iconMap[area.icon] ?? Box
          return (
            <ScrollReveal key={area.id} delay={i * 0.1}>
              <Link href="/research" className="card p-6 block h-full">
                <div className="w-10 h-10 rounded-lg bg-accent-subtle text-accent flex items-center justify-center mb-4">
                  <Icon size={20} />
                </div>
                <h3 className="font-serif font-semibold text-slate-900 text-lg">{area.titleZh}</h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">{area.summaryZh}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {area.keywords.slice(0, 3).map((k) => (
                    <Badge key={k} variant="accent">
                      {k}
                    </Badge>
                  ))}
                </div>
              </Link>
            </ScrollReveal>
          )
        })}
      </div>
      <div className="mt-8">
        <LinkButton href="/research">查看全部研究方向</LinkButton>
      </div>
    </section>
  )
}
