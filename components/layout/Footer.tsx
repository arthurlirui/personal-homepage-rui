'use client'

import { profile } from '@/data/profile'
import { useLang, pick } from '@/components/context/LanguageContext'
import { ui } from '@/data/i18n'
import { Code, GraduationCap, Mail, Link as LinkIcon } from 'lucide-react'

export default function Footer() {
  const { lang } = useLang()
  const t = ui(lang)
  const name = lang === 'zh' ? profile.nameZh : profile.name
  const affiliation = pick(profile.affiliation, profile.affiliationZh, lang)

  return (
    <footer className="border-t border-slate-200 bg-surface-muted">
      <div className="max-w-[880px] mx-auto px-6 py-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <p className="font-serif font-semibold text-slate-800">{name}</p>
            <p className="text-sm text-slate-500 mt-1">{affiliation}</p>
          </div>
          <div className="flex items-center gap-4">
            <a href={`mailto:${profile.email}`} className="text-slate-400 hover:text-accent transition-colors" aria-label="Email">
              <Mail size={18} />
            </a>
            <a href={profile.socials[1].href} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-accent transition-colors" aria-label="Google Scholar">
              <GraduationCap size={18} />
            </a>
            <a href="https://github.com/arthurlirui" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-accent transition-colors" aria-label="GitHub">
              <Code size={18} />
            </a>
            <a href="https://www.linkedin.com/in/arthurlirui/" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-accent transition-colors" aria-label="LinkedIn">
              <LinkIcon size={18} />
            </a>
          </div>
        </div>
        <p className="mt-6 text-xs text-slate-400 text-center">
          © {new Date().getFullYear()} {profile.name}. {t.footer.builtWith}
        </p>
      </div>
    </footer>
  )
}
