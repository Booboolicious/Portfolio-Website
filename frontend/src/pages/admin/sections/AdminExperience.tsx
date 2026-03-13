import { useState, useEffect } from 'react'
import { getExperience, postExperience, putExperience, deleteExperience } from '../../../api/client'
import type { Experience } from '../../../types'
import { Plus, Trash2, Briefcase, Loader2, X, Edit2, Save } from 'lucide-react'
import toast from 'react-hot-toast'
import ConfirmModal from '../../../components/ConfirmModal'

export default function AdminExperience() {
  const [experience, setExperience] = useState<Experience[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editIndex, setEditIndex] = useState<number | null>(null)
  
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [deleteIndex, setDeleteIndex] = useState<number | null>(null)

  const [formData, setFormData] = useState<Experience>({
    title: '',
    company: '',
    period: '',
    highlights: []
  })
  const [highlightInput, setHighlightInput] = useState('')

  useEffect(() => {
    loadExperience()
  }, [])

  const loadExperience = async () => {
    try {
      const res = await getExperience()
      setExperience(res)
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (index: number) => {
    setEditIndex(index)
    setFormData(experience[index])
    setShowForm(true)
  }

  const handleCancel = () => {
    setShowForm(false)
    setEditIndex(null)
    setFormData({ title: '', company: '', period: '', highlights: [] })
    setHighlightInput('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (editIndex !== null) {
        const res = await putExperience(editIndex, formData)
        setExperience(res)
        toast.success('Experience updated')
      } else {
        const res = await postExperience(formData)
        setExperience(res)
        toast.success('Experience added')
      }
      handleCancel()
    } catch (err) {
      toast.error('Failed to save experience')
    }
  }

  const confirmDelete = async () => {
    if (deleteIndex === null) return
    try {
      const res = await deleteExperience(deleteIndex)
      setExperience(res)
      toast.success('Experience deleted')
    } catch (err) {
      toast.error('Failed to delete experience')
    } finally {
      setDeleteIndex(null)
      setShowDeleteModal(false)
    }
  }

  const handleDelete = (index: number) => {
    setDeleteIndex(index)
    setShowDeleteModal(true)
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
          <h2 className="section-title">Experience Console</h2>
          <p className="section-subtitle">Manage your professional career history.</p>
        </div>
        {!showForm && (
          <button onClick={() => setShowForm(true)} className="btn btn-primary">
            <Plus size={16} /> New Experience
          </button>
        )}
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="card card-elevated animate-fade-up" style={{ padding: '32px', marginBottom: '40px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
            <h3 style={{ fontSize: '1.25rem' }}>{editIndex !== null ? 'Edit Experience' : 'New Experience'}</h3>
            <button type="button" onClick={handleCancel} className="btn btn-secondary btn-sm">
              <X size={16} /> Cancel
            </button>
          </div>

          <div className="grid-2">
            <div className="form-group">
              <label className="form-label">Job Title</label>
              <input 
                className="input" 
                required
                value={formData.title} 
                onChange={e => setFormData({...formData, title: e.target.value})} 
              />
            </div>
            <div className="form-group">
              <label className="form-label">Company</label>
              <input 
                className="input" 
                required
                value={formData.company} 
                onChange={e => setFormData({...formData, company: e.target.value})} 
              />
            </div>
          </div>

          <div className="grid-2" style={{ marginTop: '20px' }}>
            <div className="form-group">
              <label className="form-label">Period (e.g. 2021 — Present)</label>
              <input 
                className="input" 
                required
                value={formData.period} 
                onChange={e => setFormData({...formData, period: e.target.value})} 
              />
            </div>
            <div className="form-group">
              <label className="form-label">Highlights (Press Enter)</label>
              <input 
                className="input" 
                value={highlightInput}
                onChange={e => setHighlightInput(e.target.value)}
                onKeyDown={e => {
                  if (e.key === 'Enter') {
                    e.preventDefault()
                    if (highlightInput.trim()) {
                      setFormData({...formData, highlights: [...formData.highlights, highlightInput.trim()]})
                      setHighlightInput('')
                    }
                  }
                }}
              />
            </div>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '16px' }}>
            {formData.highlights.map((h, i) => (
              <div key={i} className="flex-center" style={{ justifyContent: 'space-between', padding: '8px 12px', background: 'var(--bg-1)', borderRadius: '8px' }}>
                <span style={{ fontSize: '0.875rem' }}>{h}</span>
                <button type="button" onClick={() => {
                  const next = [...formData.highlights]
                  next.splice(i, 1)
                  setFormData({...formData, highlights: next})
                }}>
                  <X size={14} />
                </button>
              </div>
            ))}
          </div>

          <div style={{ marginTop: '32px', display: 'flex', justifyContent: 'flex-end' }}>
            <button type="submit" className="btn btn-primary">
              {editIndex !== null ? <Save size={16} /> : <Plus size={16} />}
              {editIndex !== null ? 'Update Experience' : 'Save Experience'}
            </button>
          </div>
        </form>
      )}

      <div className="grid-2">
        {experience.map((exp, i) => (
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
            <div className="flex-center" style={{ justifyContent: 'flex-start', gap: '12px', marginBottom: '16px' }}>
              <div style={{ padding: '10px', background: 'var(--bg-1)', color: 'var(--accent)', borderRadius: '8px' }}>
                <Briefcase size={20} />
              </div>
              <div style={{ paddingRight: '60px' }}>
                <h3 style={{ fontSize: '1.1rem' }}>{exp.title}</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--accent-light)', fontWeight: '600' }}>{exp.company}</p>
              </div>
            </div>
            <span className="badge badge-accent" style={{ marginBottom: '16px', display: 'inline-block' }}>{exp.period}</span>
            <ul style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', paddingLeft: '16px' }}>
              {exp.highlights.slice(0, 3).map((h, j) => <li key={j} style={{ marginBottom: '4px' }}>{h}</li>)}
              {exp.highlights.length > 3 && <li>+ {exp.highlights.length - 3} more highlights</li>}
            </ul>
          </div>
        ))}
      </div>

      <ConfirmModal 
        isOpen={showDeleteModal}
        title="Delete Experience"
        message={`Are you sure you want to delete your experience as "${deleteIndex !== null ? experience[deleteIndex]?.title : ''}" at ${deleteIndex !== null ? experience[deleteIndex]?.company : ''}?`}
        onConfirm={confirmDelete}
        onCancel={() => setShowDeleteModal(false)}
        danger
        confirmText="Delete History"
      />
    </div>
  )
}
