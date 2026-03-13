import { Outlet } from 'react-router-dom'
import { usePortfolio } from '../../context/PortfolioContext'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import { Loader2 } from 'lucide-react'

export default function PortfolioLayout() {
  const { data, loading, error } = usePortfolio()

  if (loading) {
    return (
      <div className="flex-center" style={{ height: '100vh', flexDirection: 'column', gap: '20px' }}>
        <Loader2 className="animate-spin text-gradient" size={48} />
        <p className="mono" style={{ color: 'var(--text-secondary)' }}>Initializing Environment...</p>
      </div>
    )
  }

  if (error || !data) {
    return (
      <div className="flex-center" style={{ height: '100vh', textAlign: 'center', padding: '24px' }}>
        <div>
          <h2 className="text-gradient" style={{ fontSize: '2rem', marginBottom: '16px' }}>Connection Error</h2>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '500px' }}>{error}</p>
          <button onClick={() => window.location.reload()} className="btn btn-primary" style={{ marginTop: '24px' }}>
            Retry Connection
          </button>
        </div>
      </div>
    )
  }

  return (
    <main>
      <div className="grid-bg" />
      <Navbar name={data.personal.name} />
      <div className="page-content animate-fade-in">
        <Outlet />
      </div>
      <Footer 
        name={data.personal.name} 
        github={data.personal.github}
        linkedin={data.personal.linkedin}
        twitter={data.personal.twitter}
        dribbble={data.personal.dribbble}
      />
    </main>
  )
}
