import { useState, useEffect } from 'react'
import { getEducation, postEducation, putEducation, deleteEducation } from '../../../api/client'
import type { Education } from '../../../types'
import { Plus, Trash2, GraduationCap, Loader2, X, Edit2, Save } from 'lucide-react'
import toast from 'react-hot-toast'
import ConfirmModal from '../../../components/ConfirmModal'

export default function AdminEducation() {
  const [items, setItems] = useState<Education[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editIndex, setEditIndex] = useState<number | null>(null)
  
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [deleteIndex, setDeleteIndex] = useState<number | null>(null)

  const [formData, setFormData] = useState<Education>({
    degree: '',
    institution: '',
    period: '',
    specialization: '',
    note: ''
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getEducation()
        setItems(res)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const handleEdit = (index: number) => {
    setEditIndex(index)
    setFormData(items[index])
    setShowForm(true)
  }

  const handleCancel = () => {
    setShowForm(false)
    setEditIndex(null)
    setFormData({ degree: '', institution: '', period: '', specialization: '', note: '' })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.degree || !formData.institution) {
      toast.error('Degree and Institution are required')
      return
    }

    try {
      if (editIndex !== null) {
        const res = await putEducation(editIndex, formData)
        setItems(res)
        toast.success('Education entry updated')
      } else {
        const res = await postEducation(formData)
        setItems(res)
        toast.success('Education entry added')
      }
      handleCancel()
    } catch (err) {
      toast.error('Failed to save entry')
    }
  }

  const confirmDelete = async () => {
    if (deleteIndex === null) return
    try {
      const updated = await deleteEducation(deleteIndex)
      setItems(updated)
      toast.success('Entry deleted')
    } catch (err) {
      toast.error('Failed to delete entry')
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
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
        <div>
          <h2 className="section-title">Education</h2>
          <p className="section-subtitle">Manage your academic background and degrees.</p>
        </div>
        {!showForm && (
          <button onClick={() => setShowForm(true)} className="btn btn-primary">
            <Plus size={18} /> Add Degree
          </button>
        )}
      </div>

      {showForm && (
        <div className="card card-elevated animate-scale-in" style={{ padding: '32px', marginBottom: '40px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: '700' }}>{editIndex !== null ? 'Edit Education Entry' : 'New Education Entry'}</h3>
            <button onClick={handleCancel} className="btn btn-secondary btn-sm">
              <X size={18} /> Cancel
            </button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="grid-2">
              <div className="form-group">
                <label className="form-label">Degree</label>
                <input 
                  type="text" className="input" placeholder="e.g. B.S. in Computer Science"
                  value={formData.degree} onChange={e => setFormData({...formData, degree: e.target.value})}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Institution</label>
                <input 
                  type="text" className="input" placeholder="e.g. University of Example"
                  value={formData.institution} onChange={e => setFormData({...formData, institution: e.target.value})}
                />
              </div>
            </div>
            <div className="grid-2" style={{ marginTop: '20px' }}>
              <div className="form-group">
                <label className="form-label">Period</label>
                <input 
                  type="text" className="input" placeholder="e.g. 2018 — 2022"
                  value={formData.period} onChange={e => setFormData({...formData, period: e.target.value})}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Specialization (Optional)</label>
                <input 
                  type="text" className="input" placeholder="e.g. Artificial Intelligence"
                  value={formData.specialization} onChange={e => setFormData({...formData, specialization: e.target.value})}
                />
              </div>
            </div>
            <div className="form-group" style={{ marginTop: '20px' }}>
              <label className="form-label">Note (Optional)</label>
              <textarea 
                className="textarea" placeholder="e.g. GPA 3.9/4.0, Dean's List"
                value={formData.note} onChange={e => setFormData({...formData, note: e.target.value})}
              />
            </div>
            <div style={{ marginTop: '32px', display: 'flex', justifyContent: 'flex-end' }}>
              <button type="submit" className="btn btn-primary">
                {editIndex !== null ? <Save size={16} /> : <Plus size={16} />}
                {editIndex !== null ? 'Update Entry' : 'Save Entry'}
              </button>
            </div>
          </form>
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {items.map((item, i) => (
          <div key={i} className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', padding: '24px' }}>
            <div style={{ display: 'flex', gap: '20px' }}>
              <div style={{ padding: '12px', background: 'var(--bg-1)', borderRadius: '12px', color: 'var(--accent)' }}>
                <GraduationCap size={24} />
              </div>
              <div>
                <h4 style={{ fontSize: '1.2rem', fontWeight: '700' }}>{item.degree}</h4>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '4px' }}>{item.institution} • {item.period}</p>
                {item.specialization && (
                  <p style={{ fontSize: '0.9rem', color: 'var(--accent-light)', marginTop: '4px' }}>Specialization: {item.specialization}</p>
                )}
                {item.note && (
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '12px', fontStyle: 'italic', maxWidth: '600px' }}>{item.note}</p>
                )}
              </div>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button onClick={() => handleEdit(i)} className="btn btn-icon btn-secondary btn-sm">
                <Edit2 size={16} />
              </button>
              <button onClick={() => handleDelete(i)} className="btn btn-icon btn-danger btn-sm">
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <ConfirmModal 
        isOpen={showDeleteModal}
        title="Delete Education"
        message={`Are you sure you want to delete "${deleteIndex !== null ? items[deleteIndex]?.degree : ''}" from your profile?`}
        onConfirm={confirmDelete}
        onCancel={() => setShowDeleteModal(false)}
        danger
        confirmText="Remove Entry"
      />
    </div>
  )
}
