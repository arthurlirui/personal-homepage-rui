import HeroSection from '@/components/home/HeroSection'
import ResearchPreview from '@/components/home/ResearchPreview'
import PaperHighlights from '@/components/home/PaperHighlights'
import AboutSection from '@/components/home/AboutSection'
import LatestNews from '@/components/home/LatestNews'
import StartupHighlight from '@/components/home/StartupHighlight'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <ResearchPreview />
      <PaperHighlights />
      <LatestNews />
      <StartupHighlight />
    </>
  )
}
