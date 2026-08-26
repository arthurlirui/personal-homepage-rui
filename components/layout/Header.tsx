'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { useLang } from '@/components/context/LanguageContext'
import { ui } from '@/data/i18n'
import { profile } from '@/data/profile'

export default function Header() {
  const pathname = usePathname()
  const { lang, toggle } = useLang()
  const t = ui(lang)
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navItems = [
    { href: '/', label: t.nav.home },
    { href: '/research', label: t.nav.research },
    { href: '/publications', label: t.nav.publications },
    { href: '/projects', label: t.nav.projects },
    { href: '/startup', label: t.nav.startup },
    { href: '/blog', label: t.nav.blog },
    { href: '/courses', label: t.nav.courses },
    { href: '/experience', label: t.nav.experience },
    { href: '/contact', label: t.nav.contact },
  ]

  const brand = lang === 'zh' ? profile.nameZh : profile.name

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/80 backdrop-blur-md shadow-sm' : 'bg-transparent'
      }`}
    >
      <nav className="max-w-[880px] mx-auto px-6 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="text-lg font-serif font-semibold text-accent hover:text-accent-light transition-colors"
        >
          {brand}
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                pathname === item.href
                  ? 'text-accent bg-accent-subtle'
                  : 'text-slate-600 hover:text-accent hover:bg-slate-100'
              }`}
            >
              {item.label}
            </Link>
          ))}
          <LangToggle lang={lang} onToggle={toggle} className="ml-2" />
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2 text-slate-600 hover:text-accent transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-slate-200 shadow-lg">
          <div className="px-6 py-3 flex flex-col gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`py-2.5 px-3 rounded-lg text-sm font-medium transition-colors ${
                  pathname === item.href
                    ? 'text-accent bg-accent-subtle'
                    : 'text-slate-600 hover:text-accent hover:bg-slate-100'
                }`}
              >
                {item.label}
              </Link>
            ))}
            <div className="py-2.5 px-3">
              <LangToggle lang={lang} onToggle={toggle} />
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

function LangToggle({
  lang,
  onToggle,
  className = '',
}: {
  lang: 'en' | 'zh'
  onToggle: () => void
  className?: string
}) {
  return (
    <button
      onClick={onToggle}
      className={`inline-flex items-center gap-1 text-sm font-medium select-none ${className}`}
      aria-label="Toggle language"
    >
      <span className={lang === 'en' ? 'text-accent font-semibold' : 'text-slate-400 hover:text-accent transition-colors'}>
        EN
      </span>
      <span className="text-slate-300">/</span>
      <span className={lang === 'zh' ? 'text-accent font-semibold' : 'text-slate-400 hover:text-accent transition-colors'}>
        中
      </span>
    </button>
  )
}
