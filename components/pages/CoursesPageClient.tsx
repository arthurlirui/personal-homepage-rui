'use client'

import { courses } from '@/data/courses'
import { useLang, pick } from '@/components/context/LanguageContext'
import { ui } from '@/data/i18n'
import { SectionTitle, Badge } from '@/components/ui'
import ScrollReveal from '@/components/layout/ScrollReveal'
import { GraduationCap, Clock, BarChart3 } from 'lucide-react'

export default function CoursesPageClient() {
  const { lang } = useLang()
  const t = ui(lang)

  return (
    <div className="section-container">
      <SectionTitle subtitle={t.coursesPage.subtitle}>{t.coursesPage.title}</SectionTitle>

      <div className="space-y-5">
        {courses.map((course, i) => {
          const title = pick(course.title, course.titleZh, lang)
          const description = pick(course.description, course.descriptionZh, lang)
          const level = pick(course.level, course.levelZh, lang)
          return (
            <ScrollReveal key={course.id} delay={i * 0.06}>
              <article className="card p-6">
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 shrink-0 rounded-xl bg-accent-subtle text-accent flex items-center justify-center">
                    <GraduationCap size={22} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-3 flex-wrap">
                      <h3 className="font-serif text-lg font-bold text-slate-900">{title}</h3>
                      {course.status === 'upcoming' && (
                        <Badge variant="accent">{t.coursesPage.comingSoon}</Badge>
                      )}
                    </div>
                    <div className="mt-1 flex items-center gap-4 text-xs text-slate-400">
                      <span className="flex items-center gap-1">
                        <BarChart3 size={12} /> {t.coursesPage.level}: {level}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={12} /> {t.coursesPage.duration}: {course.duration}
                      </span>
                      <span>{course.date}</span>
                    </div>
                    <p className="mt-3 text-sm text-slate-600 leading-relaxed">{description}</p>
                    <div className="mt-4">
                      <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">
                        {t.coursesPage.topics}
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {course.topics.map((topic) => (
                          <Badge key={topic} variant="outline">
                            {topic}
                          </Badge>
                        ))}
                      </div>
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
