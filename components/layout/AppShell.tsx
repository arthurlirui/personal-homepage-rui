'use client'

import type { ReactNode } from 'react'
import { LanguageProvider } from '@/components/context/LanguageContext'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

// Client shell that provides the language context to the layout chrome
// (Header/Footer) and the page body alike.
export default function AppShell({ children }: { children: ReactNode }) {
  return (
    <LanguageProvider>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </LanguageProvider>
  )
}
