import HeroSection from '@/components/home/HeroSection'
import StatsBar from '@/components/home/StatsBar'
import PaperHighlights from '@/components/home/PaperHighlights'
import LatestNews from '@/components/home/LatestNews'
import StartupHighlight from '@/components/home/StartupHighlight'
import GithubContributions from '@/components/home/GithubContributions'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsBar />
      <PaperHighlights />
      <LatestNews />
      <StartupHighlight />
      <GithubContributions />
    </>
  )
}
