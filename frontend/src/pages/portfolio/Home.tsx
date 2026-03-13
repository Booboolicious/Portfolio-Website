import { usePortfolio } from '../../context/PortfolioContext'
import Hero from './sections/Hero'
import TechBar from './components/TechBar'
import StatsGrid from './components/StatsGrid'

export default function Home() {
  const { data } = usePortfolio()
  if (!data) return null
  return (
    <>
      <Hero personal={data.personal} />
      <TechBar tech={data.tech_stack} />
      <StatsGrid stats={data.stats} />
    </>
  )
}
