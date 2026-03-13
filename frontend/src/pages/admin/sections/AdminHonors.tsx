import { useState, useEffect } from 'react'
import { getHonors, postHonor, putHonor, deleteHonor } from '../../../api/client'
import type { Honor } from '../../../types'
import { Plus, Trash2, Star, Loader2, X, Edit2, Save } from 'lucide-react'
import toast from 'react-hot-toast'

export default function AdminHonors() {
  const [items, setItems] = useState<Honor[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editIndex, setEditIndex] = useState<number | null>(null)
  
  const [formData, setFormData] = useState<Honor>({
    title: '',
    detail: ''
  })

  useEffect(() => {
    getHonors()
      .then(setItems)
      .finally(() => setLoading(false))
  }, [])

  const handleEdit = (index: number) => {
    setEditIndex(index)
    setFormData(items[index])
    setShowForm(true)
  }

  const handleCancel = () => {
    setShowForm(false)
    setEditIndex(null)
    setFormData({ title: '', detail: '' })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.title) {
      toast.error('Title is required')
      return
    }

    try {
      if (editIndex !== null) {
        const res = await putHonor(editIndex, formData)
        setItems(res)
        toast.success('Honor updated')
      } else {
        const res = await postHonor(formData)
        setItems(res)
        toast.success('Honor added')
      }
      handleCancel()
    } catch (err) {
      toast.error('Failed to save honor')
    }
  }

  const handleDelete = async (index: number) => {
    if (!confirm('Are you sure?')) return
    try {
      const updated = await deleteHonor(index)
      setItems(updated)
      toast.success('Honor deleted')
    } catch (err) {
      toast.error('Failed to delete honor')
    }
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
          <h2 className="section-title">Honors & Awards</h2>
          <p className="section-subtitle">Recognition and achievements throughout your career.</p>
        </div>
        {!showForm && (
          <button onClick={() => setShowForm(true)} className="btn btn-primary">
            <Plus size={18} /> Add Honor
          </button>
        )}
      </div>

      {showForm && (
        <div className="card card-elevated animate-scale-in" style={{ padding: '32px', marginBottom: '40px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: '700' }}>{editIndex !== null ? 'Edit Achievement' : 'New Achievement'}</h3>
            <button onClick={handleCancel} className="btn btn-secondary btn-sm">
              <X size={18} /> Cancel
            </button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Honor Title</label>
              <input 
                type="text" className="input" placeholder="e.g. Employee of the Year"
                value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})}
              />
            </div>
            <div className="form-group" style={{ marginTop: '20px' }}>
              <label className="form-label">Details / Year</label>
              <input 
                type="text" className="input" placeholder="e.g. For outstanding performance in Q3 2022"
                value={formData.detail} onChange={e => setFormData({...formData, detail: e.target.value})}
              />
            </div>
            <div style={{ marginTop: '32px', display: 'flex', justifyContent: 'flex-end' }}>
              <button type="submit" className="btn btn-primary">
                {editIndex !== null ? <Save size={16} /> : <Plus size={16} />}
                {editIndex !== null ? 'Update Achievement' : 'Save Achievement'}
              </button>
            </div>
          </form>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
        {items.map((item, i) => (
          <div key={i} className="card card-elevated" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px' }}>
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
              <div style={{ padding: '10px', background: 'var(--bg-1)', borderRadius: '10px', color: 'var(--accent)' }}>
                <Star size={20} />
              </div>
              <div style={{ paddingRight: '40px' }}>
                <h4 style={{ fontSize: '1.1rem', fontWeight: '700' }}>{item.title}</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{item.detail}</p>
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
    </div>
  )
}
