'use client'

import { startups } from '@/data/startups'
import { useLang, pick } from '@/components/context/LanguageContext'
import { ui } from '@/data/i18n'
import { SectionTitle, Badge, LinkButton } from '@/components/ui'
import ScrollReveal from '@/components/layout/ScrollReveal'
import { TrendingUp, Palette, ExternalLink, Check, Rocket, Cpu, Boxes, Link2, FileText, BookOpen, Globe, Sparkles, CornerDownRight } from 'lucide-react'

const iconMap = {
  'trending-up': TrendingUp,
  palette: Palette,
  box: Boxes,
  cpu: Cpu,
  'file-text': FileText,
  'book-open': BookOpen,
  globe: Globe,
  sparkles: Sparkles,
}

const capIconMap: Record<string, typeof Cpu> = {
  cpu: Cpu,
  box: Boxes,
  link: Link2,
  rocket: Rocket,
  sparkles: Sparkles,
}

export default function StartupPageClient() {
  const { lang } = useLang()
  const t = ui(lang)
  const capabilities = t.startupPage.capabilities
  const timeline = t.startupPage.timeline
  const topLevel = startups.filter((s) => !s.parentId)

  return (
    <div>
      {/* Hero */}
      <section className="relative pt-28 pb-12 md:pt-36 md:pb-16 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-16 left-1/3 w-80 h-80 bg-accent-subtle/40 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-50 rounded-full blur-3xl" />
        </div>
        <div className="max-w-[880px] mx-auto px-6 text-center">
          <Badge variant="accent">{t.startupPage.badge}</Badge>
          <h1 className="mt-4 text-3xl md:text-4xl font-serif font-bold text-slate-900">
            {t.startupPage.heroTitle}
          </h1>
          <p className="mt-4 text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
            {t.startupPage.heroDesc}
          </p>
        </div>
      </section>

      {/* 产品详情 */}
      <section className="section-container! pt-0">
        <SectionTitle subtitle={t.startupPage.productsSubtitle}>{t.startupPage.productsTitle}</SectionTitle>

        <div className="space-y-8">
          {topLevel.map((s, i) => {
            const Icon = iconMap[s.icon] ?? TrendingUp
            const statusLabel = s.status === 'active' ? t.startupHighlight.statusActive : t.startupHighlight.statusArchived
            const description = pick(s.description, s.descriptionZh, lang)
            const features = pick(s.features, s.featuresZh, lang)
            const children = startups.filter((c) => c.parentId === s.id)

            return (
              <ScrollReveal key={s.id} delay={i * 0.1}>
                <div className="card p-7">
                  <div className="flex items-start justify-between gap-4 flex-wrap">
                    <div className="flex items-center gap-4">
                      <div className={`w-14 h-14 rounded-2xl ${s.accent} flex items-center justify-center`}>
                        <Icon size={28} />
                      </div>
                      <div>
                        <h3 className="font-serif text-2xl font-bold text-slate-900">{s.name}</h3>
                        <p className="text-sm text-accent font-medium mt-0.5">
                          {s.role} · {t.startupPage.foundedIn} {s.founded}
                        </p>
                      </div>
                    </div>
                    <Badge variant={s.status === 'active' ? 'accent' : 'default'}>{statusLabel}</Badge>
                  </div>

                  {s.metrics && (
                    <div className="mt-5 grid grid-cols-3 gap-3">
                      {s.metrics.map((m) => (
                        <div key={m.labelEn} className="bg-surface-muted rounded-lg p-3 text-center">
                          <p className="text-sm font-serif font-bold text-slate-800">{pick(m.valueEn, m.value, lang)}</p>
                          <p className="text-xs text-slate-500 mt-0.5">{pick(m.labelEn, m.label, lang)}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  <p className="mt-5 text-slate-600 leading-relaxed">{description}</p>

                  <div className="mt-6">
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">{t.startupPage.coreFeatures}</p>
                    <div className="grid sm:grid-cols-3 gap-3">
                      {features.map((f) => (
                        <div key={f.title} className="bg-surface-muted/60 rounded-lg p-4">
                          <div className="flex items-center gap-2">
                            <Check size={15} className="text-accent shrink-0" />
                            <p className="text-sm font-semibold text-slate-800">{f.title}</p>
                          </div>
                          <p className="mt-1.5 text-xs text-slate-600 leading-relaxed">{f.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6">
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">{t.startupPage.techStack}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {s.techStack.map((tk) => (
                        <Badge key={tk} variant="outline">
                          {tk}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {s.website && (
                    <div className="mt-6">
                      <a
                        href={s.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-accent text-white rounded-lg text-sm font-medium hover:bg-accent-light transition-colors"
                      >
                        {t.startupPage.visitSite} <ExternalLink size={15} />
                      </a>
                    </div>
                  )}

                  {/* Sub-studios */}
                  {children.length > 0 && (
                    <div className="mt-7 pt-6 border-t border-slate-100">
                      <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">
                        {lang === 'zh' ? '子项目' : 'Sub-studios'}
                      </p>
                      <div className="grid sm:grid-cols-3 gap-3">
                        {children.map((c) => {
                          const ChildIcon = iconMap[c.icon] ?? TrendingUp
                          const childDesc = pick(c.description, c.descriptionZh, lang)
                          const childFeatures = pick(c.features, c.featuresZh, lang)
                          return (
                            <div key={c.id} className="bg-surface-muted/40 rounded-lg p-4 border border-slate-100">
                              <div className="flex items-center gap-2 mb-2">
                                <CornerDownRight size={14} className="text-slate-400 shrink-0" />
                                <div className={`w-8 h-8 rounded-lg ${c.accent} flex items-center justify-center shrink-0`}>
                                  <ChildIcon size={16} />
                                </div>
                                <h4 className="font-serif font-semibold text-slate-900 text-sm">{c.name}</h4>
                              </div>
                              <p className="text-xs text-slate-600 leading-relaxed mb-2">{childDesc}</p>
                              <ul className="space-y-1">
                                {childFeatures.map((f) => (
                                  <li key={f.title} className="text-xs text-slate-600 flex items-start gap-1.5">
                                    <Check size={11} className="text-accent mt-0.5 shrink-0" />
                                    <span><span className="font-semibold text-slate-700">{f.title}</span> — {f.desc}</span>
                                  </li>
                                ))}
                              </ul>
                              <div className="mt-3 flex flex-wrap gap-1">
                                {c.techStack.slice(0, 3).map((tk) => (
                                  <Badge key={tk} variant="outline">{tk}</Badge>
                                ))}
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </ScrollReveal>
            )
          })}
        </div>
      </section>

      {/* 技术能力矩阵 */}
      <section className="section-container bg-surface-muted/50!">
        <SectionTitle subtitle={t.startupPage.capabilitiesSubtitle}>{t.startupPage.capabilitiesTitle}</SectionTitle>
        <div className="grid sm:grid-cols-2 gap-4">
          {capabilities.map((c, i) => {
            const Icon = capIconMap[c.icon] ?? Rocket
            return (
              <ScrollReveal key={c.title} delay={i * 0.08}>
                <div className="card p-5 flex items-start gap-4">
                  <div className="w-10 h-10 shrink-0 rounded-lg bg-accent-subtle text-accent flex items-center justify-center">
                    <Icon size={20} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-serif font-semibold text-slate-900">{c.title}</h3>
                      <Badge variant="accent">{c.tag}</Badge>
                    </div>
                    <p className="mt-1.5 text-sm text-slate-600 leading-relaxed">{c.desc}</p>
                  </div>
                </div>
              </ScrollReveal>
            )
          })}
        </div>
      </section>

      {/* 独立项目时间线 */}
      <section className="section-container">
        <SectionTitle subtitle={t.startupPage.timelineSubtitle}>{t.startupPage.timelineTitle}</SectionTitle>
        <div className="relative pl-6 border-l-2 border-accent-subtle space-y-6">
          {timeline.map((tl, i) => (
            <ScrollReveal key={tl.title + i} delay={i * 0.08}>
              <div className="relative">
                <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-accent border-4 border-white shadow" />
                <p className="text-xs text-accent font-medium">{tl.date}</p>
                <h3 className="mt-0.5 font-serif font-semibold text-slate-900">{tl.title}</h3>
                <p className="mt-1 text-sm text-slate-600">{tl.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <div className="mt-10 flex gap-6">
          <LinkButton href="/experience">{t.startupPage.viewFullCv}</LinkButton>
          <LinkButton href="/contact">{t.startupPage.contactCollab}</LinkButton>
        </div>
      </section>
    </div>
  )
}
