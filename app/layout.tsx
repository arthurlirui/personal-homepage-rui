import type { Metadata } from 'next'
import AppShell from '@/components/layout/AppShell'
import ClientLayout from '@/components/layout/ClientLayout'
import { profile } from '@/data/profile'
import './globals.css'

export const metadata: Metadata = {
  title: `${profile.name} · ${profile.nameZh} — ${profile.title}`,
  description: `${profile.name}, ${profile.affiliation}. Research: computational photography, 3D reconstruction, neural rendering.`,
  keywords: ['Rui Li', '李睿', 'Computational Photography', '3D Reconstruction', 'Neural Rendering', 'KAUST'],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-surface">
        <AppShell>
          <ClientLayout>{children}</ClientLayout>
        </AppShell>
      </body>
    </html>
  )
}
