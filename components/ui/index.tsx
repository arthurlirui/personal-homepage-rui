//
// ─── 公共 UI 组件 ─────────────────────────────────────────
//
import type { ReactNode } from 'react'
import Link from 'next/link'
import { ExternalLink } from 'lucide-react'

export function SectionTitle({ children, subtitle }: { children: ReactNode; subtitle?: string }) {
  return (
    <div className="mb-10">
      <h2 className="text-2xl md:text-3xl font-serif font-semibold text-slate-900">{children}</h2>
      {subtitle && <p className="mt-2 text-slate-500">{subtitle}</p>}
      <div className="mt-3 h-0.5 w-12 bg-accent rounded-full" />
    </div>
  )
}

export function Badge({
  children,
  variant = 'default',
}: {
  children: ReactNode
  variant?: 'default' | 'accent' | 'outline'
}) {
  const variants = {
    default: 'bg-slate-100 text-slate-700',
    accent: 'bg-accent-subtle text-accent',
    outline: 'border border-slate-300 text-slate-600',
  }
  return (
    <span className={`inline-block px-2.5 py-0.5 rounded-md text-xs font-medium ${variants[variant]}`}>
      {children}
    </span>
  )
}

// 论文级别徽章：以金属奖牌呈现收录等级
//   CSRankings → 紫晶 (amethyst) — 国际顶级收录
//   CCF A      → 黄金 (gold)
//   CCF B      → 亮银 (silver) — 亮白色
//   CCF C      → 深铜 (dark bronze) — 低饱和度，不抢眼
// 每枚奖牌由「金属渐变环 + 深色内盘 + 高光反光」三层构成，
// 悬停时轻微上浮，给出真实奖牌的立体质感。
export function LevelBadge({ kind, label }: { kind: 'ccf' | 'csrankings'; label: string }) {
  // 根据级别选取奖牌配色：环 (ring) + 内盘 (disc) + 文字 (text) + 高光 (glint)
  //   ringText  = 外圈文字颜色（位于浅色金属环上，用深色）
  //   discText  = 内盘字母颜色（位于深色内盘上，用浅色）
  const medals = {
    amethyst: {
      ring: 'bg-gradient-to-br from-violet-100 via-purple-200 to-violet-300 ring-violet-300',
      disc: 'bg-gradient-to-br from-violet-600 via-purple-700 to-violet-900',
      ringText: 'text-violet-800',
      discText: 'text-violet-50',
      glint: 'from-white/40 to-transparent',
    },
    gold: {
      ring: 'bg-gradient-to-br from-amber-200 via-yellow-300 to-amber-500 ring-amber-300',
      disc: 'bg-gradient-to-br from-amber-600 via-yellow-700 to-amber-900',
      ringText: 'text-amber-800',
      discText: 'text-amber-50',
      glint: 'from-amber-100/50 to-transparent',
    },
    silver: {
      ring: 'bg-gradient-to-br from-white via-slate-100 to-slate-300 ring-slate-200',
      disc: 'bg-gradient-to-br from-slate-400 via-slate-500 to-slate-700',
      ringText: 'text-slate-600',
      discText: 'text-slate-50',
      glint: 'from-white/60 to-transparent',
    },
    darkBronze: {
      ring: 'bg-gradient-to-br from-stone-200 via-amber-700/60 to-stone-700 ring-stone-400',
      disc: 'bg-gradient-to-br from-stone-600 via-amber-900 to-stone-900',
      ringText: 'text-stone-600',
      discText: 'text-stone-100',
      glint: 'from-amber-200/30 to-transparent',
    },
  } as const

  const key =
    kind === 'csrankings'
      ? 'amethyst'
      : label.includes('A')
        ? 'gold'
        : label.includes('B')
          ? 'silver'
          : 'darkBronze'
  const m = medals[key]
  const title =
    kind === 'ccf' ? '中国计算机学会推荐目录' : 'CSRankings 收录 · 国际顶级会议/期刊'

  return (
    <span
      title={title}
      className={`group relative inline-flex items-center gap-1 pl-0.5 pr-2 py-0.5 rounded-full ring-1 ${m.ring} transition-transform duration-200 hover:scale-110 hover:-translate-y-0.5 cursor-default`}
    >
      {/* 奖牌本体 */}
      <span
        className={`relative inline-flex items-center justify-center w-4 h-4 rounded-full ${m.disc} shadow-inner overflow-hidden`}
      >
        {/* 高光反光 */}
        <span
          className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${m.glint} opacity-70`}
        />
        {/* 中心标记：A/B/C 字母或铂金菱形 */}
        {kind === 'csrankings' ? (
          <span className="relative w-1.5 h-1.5 rotate-45 bg-slate-50/90 shadow-sm" />
        ) : (
          <span className={`relative text-[8px] font-bold leading-none ${m.discText}`}>
            {label.replace('CCF ', '')}
          </span>
        )}
      </span>
      {/* 级别文字 */}
      <span className={`text-[10px] font-bold tracking-wide ${m.ringText} drop-shadow-sm`}>
        {kind === 'csrankings' ? 'CSRankings' : `CCF ${label.replace('CCF ', '')}`}
      </span>
    </span>
  )
}

export function IconLink({ href, icon, label }: { href: string; icon: ReactNode; label: string }) {
  const isExternal = href.startsWith('http') || href.startsWith('mailto')
  return (
    <a
      href={href}
      {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-accent transition-colors"
    >
      {icon}
      <span>{label}</span>
      {isExternal && <ExternalLink size={12} />}
    </a>
  )
}

export function LinkButton({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:text-accent-light transition-colors group"
    >
      {children}
      <span className="transition-transform group-hover:translate-x-0.5">→</span>
    </Link>
  )
}
