'use client'

import PageTransition from '@/components/layout/PageTransition'

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return <PageTransition>{children}</PageTransition>
}
