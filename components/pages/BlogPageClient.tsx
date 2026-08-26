'use client'

import { blogPosts } from '@/data/blog'
import { useLang, pick } from '@/components/context/LanguageContext'
import { ui } from '@/data/i18n'
import { SectionTitle, Badge } from '@/components/ui'
import ScrollReveal from '@/components/layout/ScrollReveal'
import { FileText, Clock } from 'lucide-react'

export default function BlogPageClient() {
  const { lang } = useLang()
  const t = ui(lang)

  return (
    <div className="section-container">
      <SectionTitle subtitle={t.blogPage.subtitle}>{t.blogPage.title}</SectionTitle>

      <div className="space-y-5">
        {blogPosts.map((post, i) => {
          const title = pick(post.title, post.titleZh, lang)
          const excerpt = pick(post.excerpt, post.excerptZh, lang)
          return (
            <ScrollReveal key={post.id} delay={i * 0.06}>
              <article className="card p-6">
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 shrink-0 rounded-xl bg-accent-subtle text-accent flex items-center justify-center">
                    <FileText size={22} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-3 flex-wrap">
                      <h3 className="font-serif text-lg font-bold text-slate-900">{title}</h3>
                      {post.status === 'coming-soon' && (
                        <Badge variant="accent">{t.blogPage.comingSoon}</Badge>
                      )}
                    </div>
                    <div className="mt-1 flex items-center gap-3 text-xs text-slate-400">
                      <span>{post.date}</span>
                      <span className="flex items-center gap-1">
                        <Clock size={12} /> {post.readTime} {t.blogPage.readTime}
                      </span>
                    </div>
                    <p className="mt-3 text-sm text-slate-600 leading-relaxed">{excerpt}</p>
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {post.tags.map((tag) => (
                        <Badge key={tag} variant="outline">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </article>
            </ScrollReveal>
          )
        })}
      </div>
    </div>
  )
}
