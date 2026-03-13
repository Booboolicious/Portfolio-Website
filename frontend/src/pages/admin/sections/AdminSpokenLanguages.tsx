import { useState, useEffect } from 'react'
import { getSpokenLanguages, postSpokenLanguage, putSpokenLanguage, deleteSpokenLanguage } from '../../../api/client'
import type { SpokenLang } from '../../../types'
import { Plus, Trash2, Languages, Loader2, X, Edit2, Save } from 'lucide-react'
import toast from 'react-hot-toast'
import ConfirmModal from '../../../components/ConfirmModal'

export default function AdminSpokenLanguages() {
  const [items, setItems] = useState<SpokenLang[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editIndex, setEditIndex] = useState<number | null>(null)
  
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [deleteIndex, setDeleteIndex] = useState<number | null>(null)

  const [formData, setFormData] = useState<SpokenLang>({
    language: '',
    level: '',
    proficiency: 100
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getSpokenLanguages()
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
    setFormData({ language: '', level: '', proficiency: 100 })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.language || !formData.level) {
      toast.error('Language and Level are required')
      return
    }

    try {
      if (editIndex !== null) {
        const res = await putSpokenLanguage(editIndex, formData)
        setItems(res)
        toast.success('Language updated')
      } else {
        const res = await postSpokenLanguage(formData)
        setItems(res)
        toast.success('Language added')
      }
      handleCancel()
    } catch (err) {
      toast.error('Failed to save language')
    }
  }

  const confirmDelete = async () => {
    if (deleteIndex === null) return
    try {
      const updated = await deleteSpokenLanguage(deleteIndex)
      setItems(updated)
      toast.success('Language deleted')
    } catch (err) {
      toast.error('Failed to delete language')
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
          <h2 className="section-title">Spoken Languages</h2>
          <p className="section-subtitle">Languages you speak and your proficiency levels.</p>
        </div>
        {!showForm && (
          <button onClick={() => setShowForm(true)} className="btn btn-primary">
            <Plus size={18} /> Add Language
          </button>
        )}
      </div>

      {showForm && (
        <div className="card card-elevated animate-scale-in" style={{ padding: '32px', marginBottom: '40px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: '700' }}>{editIndex !== null ? 'Edit Language' : 'New Language'}</h3>
            <button onClick={handleCancel} className="btn btn-secondary btn-sm">
              <X size={18} /> Cancel
            </button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="grid-2">
              <div className="form-group">
                <label className="form-label">Language</label>
                <input 
                  type="text" className="input" placeholder="e.g. English, Spanish"
                  value={formData.language} onChange={e => setFormData({...formData, language: e.target.value})}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Level</label>
                <input 
                  type="text" className="input" placeholder="e.g. Native, Fluent, Conversational"
                  value={formData.level} onChange={e => setFormData({...formData, level: e.target.value})}
                />
              </div>
            </div>
            <div className="form-group" style={{ marginTop: '20px' }}>
              <label className="form-label">Proficiency ({formData.proficiency}%)</label>
              <input 
                type="range" className="input" min="0" max="100" step="5"
                value={formData.proficiency} onChange={e => setFormData({...formData, proficiency: parseInt(e.target.value)})}
                style={{ height: '8px', padding: '0', cursor: 'pointer' }}
              />
            </div>
            <div style={{ marginTop: '32px', display: 'flex', justifyContent: 'flex-end' }}>
              <button type="submit" className="btn btn-primary">
                {editIndex !== null ? <Save size={16} /> : <Plus size={16} />}
                {editIndex !== null ? 'Update Language' : 'Save Language'}
              </button>
            </div>
          </form>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
        {items.map((item, i) => (
          <div key={i} className="card card-elevated" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px' }}>
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flex: 1 }}>
              <div style={{ padding: '10px', background: 'var(--bg-1)', borderRadius: '10px', color: 'var(--accent)' }}>
                <Languages size={20} />
              </div>
              <div style={{ flex: 1 }}>
                <h4 style={{ fontSize: '1.1rem', fontWeight: '700' }}>{item.language}</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '8px' }}>{item.level}</p>
                <div style={{ height: '4px', background: 'var(--bg-2)', borderRadius: '2px', overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${item.proficiency}%`, background: 'var(--accent)' }} />
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '8px', marginLeft: '12px' }}>
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
        title="Delete Language"
        message={`Are you sure you want to delete ${deleteIndex !== null ? items[deleteIndex]?.language : ''}? This action cannot be undone.`}
        onConfirm={confirmDelete}
        onCancel={() => setShowDeleteModal(false)}
        danger
        confirmText="Remove Language"
      />
    </div>
  )
}
