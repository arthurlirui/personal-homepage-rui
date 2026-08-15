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
