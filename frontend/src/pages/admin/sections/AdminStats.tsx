import { useState, useEffect } from 'react'
import { getStats, patchStats } from '../../../api/client'
import { usePortfolio } from '../../../context/PortfolioContext'
import type { Stats } from '../../../types'
import { Save, Loader2 } from 'lucide-react'
import toast from 'react-hot-toast'

export default function AdminStats() {
  const { refreshData } = usePortfolio()
  const [data, setData] = useState<Stats | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getStats()
        setData(res)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!data) return
    
    setSaving(true)
    try {
      await patchStats(data)
      await refreshData()
      toast.success('Statistics updated successfully')
    } catch (err) {
      toast.error('Failed to update statistics')
      console.error(err)
    } finally {
      setSaving(false)
    }
  }

  if (loading) return (
    <div className="flex-center" style={{ height: '200px' }}>
      <Loader2 className="animate-spin text-gradient" size={32} />
    </div>
  )

  if (!data) return <div>Error loading data...</div>

  return (
    <div className="animate-fade-in">
      <div className="section-header" style={{ marginBottom: '40px' }}>
        <h2 className="section-title">Matrix Stats</h2>
        <p className="section-subtitle">Visual numbers displayed on your landing page.</p>
      </div>

      <form onSubmit={handleSubmit} className="card" style={{ padding: '32px', maxWidth: '600px' }}>
        <div className="grid-2">
          <div className="form-group">
            <label className="form-label">Years of Experience</label>
            <input 
              className="input" 
              value={data.years_of_experience} 
              onChange={e => setData({...data, years_of_experience: e.target.value})} 
            />
          </div>
          <div className="form-group">
            <label className="form-label">Projects Completed</label>
            <input 
              className="input" 
              value={data.projects_completed} 
              onChange={e => setData({...data, projects_completed: e.target.value})} 
            />
          </div>
        </div>

        <div className="grid-2" style={{ marginTop: '20px' }}>
          <div className="form-group">
            <label className="form-label">Happy Clients</label>
            <input 
              className="input" 
              value={data.happy_clients} 
              onChange={e => setData({...data, happy_clients: e.target.value})} 
            />
          </div>
          <div className="form-group">
            <label className="form-label">Lines of Code</label>
            <input 
              className="input" 
              value={data.lines_of_code} 
              onChange={e => setData({...data, lines_of_code: e.target.value})} 
            />
          </div>
        </div>

        <div style={{ marginTop: '32px', display: 'flex', justifyContent: 'flex-end', borderTop: '1px solid var(--border)', paddingTop: '32px' }}>
          <button type="submit" className="btn btn-primary" disabled={saving}>
            {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
            {saving ? 'Saving...' : 'Update Stats'}
          </button>
        </div>
      </form>
    </div>
  )
}
