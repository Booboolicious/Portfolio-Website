import { useState, useEffect } from 'react'
import { getContact, patchContact } from '../../../api/client'
import { usePortfolio } from '../../../context/PortfolioContext'
import type { Contact } from '../../../types'
import { Save, Loader2, Plus, Trash2 } from 'lucide-react'
import toast from 'react-hot-toast'

export default function AdminContact() {
  const { refreshData } = usePortfolio()
  const [data, setData] = useState<Contact | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [subjectInput, setSubjectInput] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getContact()
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
      await patchContact(data)
      await refreshData()
      toast.success('Contact info updated')
    } catch (err) {
      toast.error('Failed to update contact info')
    } finally {
      setSaving(false)
    }
  }

  const addSubject = () => {
    if (!data || !subjectInput.trim()) return
    setData({ ...data, form_subjects: [...data.form_subjects, subjectInput.trim()] })
    setSubjectInput('')
  }

  const removeSubject = (index: number) => {
    if (!data) return
    const next = [...data.form_subjects]
    next.splice(index, 1)
    setData({ ...data, form_subjects: next })
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
        <h2 className="section-title">Connectivity Hub</h2>
        <p className="section-subtitle">Manage your contact points and form options.</p>
      </div>

      <form onSubmit={handleSubmit} className="grid-2" style={{ alignItems: 'start' }}>
        <div className="card" style={{ padding: '32px' }}>
          <h3 style={{ marginBottom: '24px', fontSize: '1.2rem' }}>Direct Links</h3>
          <div className="form-group">
            <label className="form-label">Contact Email</label>
            <input 
              className="input" 
              value={data.email} 
              onChange={e => setData({...data, email: e.target.value})} 
            />
          </div>
          <div className="form-group" style={{ marginTop: '20px' }}>
            <label className="form-label">Location</label>
            <input 
              className="input" 
              value={data.location} 
              onChange={e => setData({...data, location: e.target.value})} 
            />
          </div>
          <div className="form-group" style={{ marginTop: '20px' }}>
            <label className="form-label">GitHub Username</label>
            <input 
              className="input" 
              value={data.github} 
              onChange={e => setData({...data, github: e.target.value})} 
            />
          </div>
          <div className="form-group" style={{ marginTop: '20px' }}>
            <label className="form-label">LinkedIn Slug</label>
            <input 
              className="input" 
              value={data.linkedin} 
              onChange={e => setData({...data, linkedin: e.target.value})} 
            />
          </div>
        </div>

        <div className="card" style={{ padding: '32px' }}>
          <h3 style={{ marginBottom: '24px', fontSize: '1.2rem' }}>Form Subjects</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '16px' }}>
            These appear in the dropdown menu of your contact form.
          </p>
          
          <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
            <input 
              className="input" 
              placeholder="Add new subject..."
              value={subjectInput}
              onChange={e => setSubjectInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addSubject())}
            />
            <button type="button" onClick={addSubject} className="btn btn-secondary btn-icon">
              <Plus size={20} />
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {data.form_subjects.map((s, i) => (
              <div key={i} className="flex-center" style={{ justifyContent: 'space-between', padding: '10px 16px', background: 'var(--bg-1)', borderRadius: '8px' }}>
                <span style={{ fontSize: '0.9rem' }}>{s}</span>
                <button type="button" className="btn btn-icon btn-danger btn-sm" onClick={() => removeSubject(i)}>
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div style={{ gridColumn: 'span 2', marginTop: '12px', display: 'flex', justifyContent: 'flex-end' }}>
          <button type="submit" className="btn btn-primary" disabled={saving}>
            {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
            {saving ? 'Saving...' : 'Update Connectivity'}
          </button>
        </div>
      </form>
    </div>
  )
}
