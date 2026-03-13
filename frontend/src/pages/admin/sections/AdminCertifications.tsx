import { useState, useEffect } from 'react'
import { getCertifications, postCertification, putCertification, deleteCertification } from '../../../api/client'
import type { Certification } from '../../../types'
import { Plus, Trash2, Award, Loader2, X, Edit2, Save } from 'lucide-react'
import toast from 'react-hot-toast'
import ConfirmModal from '../../../components/ConfirmModal'

export default function AdminCertifications() {
  const [items, setItems] = useState<Certification[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editIndex, setEditIndex] = useState<number | null>(null)
  
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [deleteIndex, setDeleteIndex] = useState<number | null>(null)

  const [formData, setFormData] = useState<Certification>({
    name: '',
    level: '',
    year: ''
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getCertifications()
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
    setFormData({ name: '', level: '', year: '' })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name) {
      toast.error('Certification name is required')
      return
    }

    try {
      if (editIndex !== null) {
        const res = await putCertification(editIndex, formData)
        setItems(res)
        toast.success('Certification updated')
      } else {
        const res = await postCertification(formData)
        setItems(res)
        toast.success('Certification added')
      }
      handleCancel()
    } catch (err) {
      toast.error('Failed to save certification')
    }
  }

  const confirmDelete = async () => {
    if (deleteIndex === null) return
    try {
      const updated = await deleteCertification(deleteIndex)
      setItems(updated)
      toast.success('Certification deleted')
    } catch (err) {
      toast.error('Failed to delete certification')
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
          <h2 className="section-title">Certifications</h2>
          <p className="section-subtitle">Professional certifications and credentials.</p>
        </div>
        {!showForm && (
          <button onClick={() => setShowForm(true)} className="btn btn-primary">
            <Plus size={18} /> Add Certification
          </button>
        )}
      </div>

      {showForm && (
        <div className="card card-elevated animate-scale-in" style={{ padding: '32px', marginBottom: '40px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: '700' }}>{editIndex !== null ? 'Edit Certification' : 'New Certification'}</h3>
            <button onClick={handleCancel} className="btn btn-secondary btn-sm">
              <X size={18} /> Cancel
            </button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Certification Name</label>
              <input 
                type="text" className="input" placeholder="e.g. AWS Solutions Architect"
                value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}
              />
            </div>
            <div className="grid-2" style={{ marginTop: '20px' }}>
              <div className="form-group">
                <label className="form-label">Level / Detail</label>
                <input 
                  type="text" className="input" placeholder="e.g. Associate / Professional"
                  value={formData.level} onChange={e => setFormData({...formData, level: e.target.value})}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Year</label>
                <input 
                  type="text" className="input" placeholder="e.g. 2023"
                  value={formData.year} onChange={e => setFormData({...formData, year: e.target.value})}
                />
              </div>
            </div>
            <div style={{ marginTop: '32px', display: 'flex', justifyContent: 'flex-end' }}>
              <button type="submit" className="btn btn-primary">
                {editIndex !== null ? <Save size={16} /> : <Plus size={16} />}
                {editIndex !== null ? 'Update Certification' : 'Save Certification'}
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
                <Award size={20} />
              </div>
              <div style={{ paddingRight: '40px' }}>
                <h4 style={{ fontSize: '1rem', fontWeight: '700' }}>{item.name}</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{item.level} {item.year && `(${item.year})`}</p>
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
        title="Delete Certification"
        message={`Are you sure you want to remove "${deleteIndex !== null ? items[deleteIndex]?.name : ''}" from your profile?`}
        onConfirm={confirmDelete}
        onCancel={() => setShowDeleteModal(false)}
        danger
        confirmText="Remove Certification"
      />
    </div>
  )
}
