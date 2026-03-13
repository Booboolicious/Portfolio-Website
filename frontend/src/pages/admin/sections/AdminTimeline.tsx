import { useState, useEffect } from 'react'
import { getTimeline, postTimeline, putTimeline, deleteTimeline } from '../../../api/client'
import type { Timeline } from '../../../types'
import { Plus, Trash2, Clock, Loader2, X, Edit2, Save } from 'lucide-react'
import toast from 'react-hot-toast'

export default function AdminTimeline() {
  const [timeline, setTimeline] = useState<Timeline[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editIndex, setEditIndex] = useState<number | null>(null)
  
  const [formData, setFormData] = useState<Timeline>({
    year: '',
    role: '',
    organization: '',
    note: ''
  })

  useEffect(() => {
    loadTimeline()
  }, [])

  const loadTimeline = () => {
    getTimeline()
      .then(setTimeline)
      .finally(() => setLoading(false))
  }

  const handleEdit = (index: number) => {
    setEditIndex(index)
    setFormData(timeline[index])
    setShowForm(true)
  }

  const handleCancel = () => {
    setShowForm(false)
    setEditIndex(null)
    setFormData({ year: '', role: '', organization: '', note: '' })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (editIndex !== null) {
        const res = await putTimeline(editIndex, formData)
        setTimeline(res)
        toast.success('Milestone updated')
      } else {
        const res = await postTimeline(formData)
        setTimeline(res)
        toast.success('Milestone added')
      }
      handleCancel()
    } catch (err) {
      toast.error('Failed to save milestone')
    }
  }

  const handleDelete = async (index: number) => {
    if (!confirm('Are you sure you want to delete this milestone?')) return
    try {
      const res = await deleteTimeline(index)
      setTimeline(res)
      toast.success('Milestone deleted')
    } catch (err) {
      toast.error('Failed to delete milestone')
    }
  }

  if (loading) return (
    <div className="flex-center" style={{ height: '200px' }}>
      <Loader2 className="animate-spin text-gradient" size={32} />
    </div>
  )

  return (
    <div className="animate-fade-in">
      <div className="section-header" style={{ marginBottom: '40px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <h2 className="section-title">Milestone Tracker</h2>
          <p className="section-subtitle">Keep track of your education and significant career events.</p>
        </div>
        {!showForm && (
          <button onClick={() => setShowForm(true)} className="btn btn-primary">
            <Plus size={16} /> New Milestone
          </button>
        )}
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="card card-elevated animate-fade-up" style={{ padding: '32px', marginBottom: '40px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
            <h3 style={{ fontSize: '1.25rem' }}>{editIndex !== null ? 'Edit Milestone' : 'New Milestone'}</h3>
            <button type="button" onClick={handleCancel} className="btn btn-secondary btn-sm">
              <X size={16} /> Cancel
            </button>
          </div>

          <div className="grid-2">
            <div className="form-group">
              <label className="form-label">Year / Period</label>
              <input 
                className="input" 
                required
                placeholder="e.g. 2018 — 2022"
                value={formData.year} 
                onChange={e => setFormData({...formData, year: e.target.value})} 
              />
            </div>
            <div className="form-group">
              <label className="form-label">Role / Achievement</label>
              <input 
                className="input" 
                required
                value={formData.role} 
                onChange={e => setFormData({...formData, role: e.target.value})} 
              />
            </div>
          </div>

          <div className="form-group" style={{ marginTop: '20px' }}>
            <label className="form-label">Organization / University</label>
            <input 
              className="input" 
              required
              value={formData.organization} 
              onChange={e => setFormData({...formData, organization: e.target.value})} 
            />
          </div>

          <div className="form-group" style={{ marginTop: '20px' }}>
            <label className="form-label">Optional Note</label>
            <input 
              className="input" 
              value={formData.note || ''} 
              onChange={e => setFormData({...formData, note: e.target.value})} 
            />
          </div>

          <div style={{ marginTop: '32px', display: 'flex', justifyContent: 'flex-end' }}>
            <button type="submit" className="btn btn-primary">
              {editIndex !== null ? <Save size={16} /> : <Plus size={16} />}
              {editIndex !== null ? 'Update Milestone' : 'Add Milestone'}
            </button>
          </div>
        </form>
      )}

      <div className="grid-2">
        {timeline.map((item, i) => (
          <div key={i} className="card card-elevated" style={{ padding: '24px', position: 'relative' }}>
            <div style={{ position: 'absolute', top: '12px', right: '12px', display: 'flex', gap: '8px' }}>
              <button 
                onClick={() => handleEdit(i)}
                className="btn btn-icon btn-secondary btn-sm"
              >
                <Edit2 size={14} />
              </button>
              <button 
                onClick={() => handleDelete(i)}
                className="btn btn-icon btn-danger btn-sm"
              >
                <Trash2 size={14} />
              </button>
            </div>
            <div className="flex-center" style={{ justifyContent: 'flex-start', gap: '12px' }}>
              <div style={{ padding: '10px', background: 'var(--bg-1)', color: 'var(--accent-2)', borderRadius: '8px' }}>
                <Clock size={20} />
              </div>
              <div style={{ paddingRight: '60px' }}>
                <span className="mono" style={{ fontSize: '0.75rem', color: 'var(--accent-light)' }}>{item.year}</span>
                <h3 style={{ fontSize: '1rem' }}>{item.role}</h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>{item.organization}</p>
                {item.note && <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontStyle: 'italic', marginTop: '4px' }}>{item.note}</p>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
