import { startups } from '@/data/startups'
import { SectionTitle, Badge, LinkButton } from '@/components/ui'
import ScrollReveal from '@/components/layout/ScrollReveal'
import { TrendingUp, Palette, ExternalLink, Check, Rocket, Cpu, Boxes, Link2 } from 'lucide-react'

export const metadata = { title: '创业项目 · Rui Li' }

const iconMap = {
  'trending-up': TrendingUp,
  palette: Palette,
  box: Boxes,
  cpu: Cpu,
}

// 技术能力矩阵
const capabilities = [
  { icon: Cpu, title: 'AI 系统工程', desc: '实时深度学习推理、低延迟信号管线、主流框架集成', tag: 'Real-time AI' },
  { icon: Boxes, title: '3D 重建与渲染', desc: '多视角采集、神经渲染、照片级真实 3D 资产生成', tag: 'Neural Rendering' },
  { icon: Link2, title: '区块链 / NFT', desc: '链上铸造、真实场景数据上链、数字藏品全流程', tag: 'Web3' },
  { icon: Rocket, title: '产品化落地', desc: '从科研原型到生产系统、加密货币交易所对接', tag: 'Product' },
]

// 创业时间线
const timeline = [
  { date: '2018-05', title: '创立 SigTrading', desc: '启动实时 AI 量化交易系统研发，面向加密货币交易所' },
  { date: '2021-03', title: '创立 Capmake', desc: '探索区块链数字艺术，将真实场景数据转化为链上藏品' },
  { date: '2021+', title: '3D NFT 产品线', desc: '在 SigTrading 中融合多视图重建能力，生成真实场景 3D NFT' },
  { date: '至今', title: '持续运营', desc: 'SigTrading 持续运营，连接 AI、金融与 3D 视觉' },
]

export default function StartupPage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative pt-28 pb-12 md:pt-36 md:pb-16 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-16 left-1/3 w-80 h-80 bg-accent-subtle/40 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-50 rounded-full blur-3xl" />
        </div>
        <div className="max-w-[880px] mx-auto px-6 text-center">
          <Badge variant="accent">创业 · Entrepreneurship</Badge>
          <h1 className="mt-4 text-3xl md:text-4xl font-serif font-bold text-slate-900">
            将计算成像与 AI 转化为产品
          </h1>
          <p className="mt-4 text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
            从科研走向创业 — 用神经渲染、实时 AI 系统与区块链技术，在量化交易与数字艺术领域构建产品。
          </p>
        </div>
      </section>

      {/* 产品详情 */}
      <section className="section-container! pt-0">
        <SectionTitle subtitle="两个创业项目，覆盖 AI 量化交易与区块链数字艺术">创业项目</SectionTitle>

        <div className="space-y-8">
          {startups.map((s, i) => {
            const Icon = iconMap[s.icon] ?? TrendingUp
            const statusLabel = s.status === 'active' ? '运营中' : '已归档'
            return (
              <ScrollReveal key={s.id} delay={i * 0.1}>
                <div className="card p-7">
                  {/* 头部 */}
                  <div className="flex items-start justify-between gap-4 flex-wrap">
                    <div className="flex items-center gap-4">
                      <div className={`w-14 h-14 rounded-2xl ${s.accent} flex items-center justify-center`}>
                        <Icon size={28} />
                      </div>
                      <div>
                        <h3 className="font-serif text-2xl font-bold text-slate-900">{s.name}</h3>
                        <p className="text-sm text-accent font-medium mt-0.5">
                          {s.role} · 创立于 {s.founded}
                        </p>
                      </div>
                    </div>
                    <Badge variant={s.status === 'active' ? 'accent' : 'default'}>{statusLabel}</Badge>
                  </div>

                  {/* 指标 */}
                  {s.metrics && (
                    <div className="mt-5 grid grid-cols-3 gap-3">
                      {s.metrics.map((m) => (
                        <div key={m.label} className="bg-surface-muted rounded-lg p-3 text-center">
                          <p className="text-sm font-serif font-bold text-slate-800">{m.value}</p>
                          <p className="text-xs text-slate-500 mt-0.5">{m.label}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* 描述 */}
                  <p className="mt-5 text-slate-600 leading-relaxed">{s.descriptionZh}</p>

                  {/* 核心特性 */}
                  <div className="mt-6">
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">核心特性</p>
                    <div className="grid sm:grid-cols-3 gap-3">
                      {s.featuresZh.map((f) => (
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

                  {/* 技术栈 */}
                  <div className="mt-6">
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">技术栈</p>
                    <div className="flex flex-wrap gap-1.5">
                      {s.techStack.map((t) => (
                        <Badge key={t} variant="outline">
                          {t}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* 链接 */}
                  {s.website && (
                    <div className="mt-6">
                      <a
                        href={s.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-accent text-white rounded-lg text-sm font-medium hover:bg-accent-light transition-colors"
                      >
                        访问官网 <ExternalLink size={15} />
                      </a>
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
        <SectionTitle subtitle="科研能力到产品能力的转化">技术能力</SectionTitle>
        <div className="grid sm:grid-cols-2 gap-4">
          {capabilities.map((c, i) => {
            const Icon = c.icon
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

      {/* 创业时间线 */}
      <section className="section-container">
        <SectionTitle subtitle="创业历程里程碑">创业历程</SectionTitle>
        <div className="relative pl-6 border-l-2 border-accent-subtle space-y-6">
          {timeline.map((t, i) => (
            <ScrollReveal key={t.title} delay={i * 0.08}>
              <div className="relative">
                <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-accent border-4 border-white shadow" />
                <p className="text-xs text-accent font-medium">{t.date}</p>
                <h3 className="mt-0.5 font-serif font-semibold text-slate-900">{t.title}</h3>
                <p className="mt-1 text-sm text-slate-600">{t.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <div className="mt-10 flex gap-6">
          <LinkButton href="/experience">查看完整履历</LinkButton>
          <LinkButton href="/contact">联系合作</LinkButton>
        </div>
      </section>
    </div>
  )
}
