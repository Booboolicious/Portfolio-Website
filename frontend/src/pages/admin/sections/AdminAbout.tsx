import { useState, useEffect } from 'react'
import { getAbout, patchAbout } from '../../../api/client'
import type { About } from '../../../types'
import { Save, Loader2, Plus, Trash2 } from 'lucide-react'
import toast from 'react-hot-toast'

export default function AdminAbout() {
  const [data, setData] = useState<About | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    getAbout()
      .then(setData)
      .finally(() => setLoading(false))
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!data) return
    
    setSaving(true)
    try {
      await patchAbout(data)
      toast.success('About section updated')
    } catch (err) {
      toast.error('Failed to update About section')
    } finally {
      setSaving(false)
    }
  }

  const addPrinciple = () => {
    if (!data) return
    setData({
      ...data,
      philosophy: [...data.philosophy, { principle: 'New Principle', description: '' }]
    })
  }

  const removePrinciple = (index: number) => {
    if (!data) return
    const next = [...data.philosophy]
    next.splice(index, 1)
    setData({ ...data, philosophy: next })
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
        <h2 className="section-title">Story & Philosophy</h2>
        <p className="section-subtitle">Define your creative journey and core values.</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="card" style={{ padding: '32px', marginBottom: '32px' }}>
          <div className="form-group">
            <label className="form-label">The Journey (Markdown supported)</label>
            <textarea 
              className="textarea" 
              style={{ minHeight: '200px' }}
              value={data.journey} 
              onChange={e => setData({...data, journey: e.target.value})} 
            />
          </div>
        </div>

        <div className="section-header" style={{ marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div>
            <h3 style={{ fontSize: '1.25rem' }}>Core Philosophy</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Add or edit your guiding principles.</p>
          </div>
          <button type="button" onClick={addPrinciple} className="btn btn-secondary btn-sm">
            <Plus size={14} /> Add Principle
          </button>
        </div>

        <div className="grid-2">
          {data.philosophy.map((p, i) => (
            <div key={i} className="card card-elevated" style={{ padding: '24px', position: 'relative' }}>
              <button 
                type="button" 
                onClick={() => removePrinciple(i)}
                className="btn btn-icon btn-danger btn-sm"
                style={{ position: 'absolute', top: '12px', right: '12px' }}
              >
                <Trash2 size={14} />
              </button>
              
              <div className="form-group">
                <label className="form-label">Principle Name</label>
                <input 
                  className="input" 
                  value={p.principle} 
                  onChange={e => {
                    const next = [...data.philosophy]
                    next[i].principle = e.target.value
                    setData({...data, philosophy: next})
                  }} 
                />
              </div>
              <div className="form-group" style={{ marginTop: '12px' }}>
                <label className="form-label">Description</label>
                <textarea 
                  className="textarea" 
                  value={p.description} 
                  onChange={e => {
                    const next = [...data.philosophy]
                    next[i].description = e.target.value
                    setData({...data, philosophy: next})
                  }} 
                />
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: '32px', display: 'flex', justifyContent: 'flex-end' }}>
          <button type="submit" className="btn btn-primary" disabled={saving}>
            {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
            {saving ? 'Saving...' : 'Save Section'}
          </button>
        </div>
      </form>
    </div>
  )
}
