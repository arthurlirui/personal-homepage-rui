import HeroSection from '@/components/home/HeroSection'
import ResearchPreview from '@/components/home/ResearchPreview'
import PaperHighlights from '@/components/home/PaperHighlights'
import StartupHighlight from '@/components/home/StartupHighlight'
import LatestNews from '@/components/home/LatestNews'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ResearchPreview />
      <PaperHighlights />
      <StartupHighlight />
      <LatestNews />
    </>
  )
}
