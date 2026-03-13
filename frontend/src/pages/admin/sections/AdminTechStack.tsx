import { useState, useEffect } from 'react'
import { getTechStack, postTechStackItem, deleteTechStackItem } from '../../../api/client'
import { Plus, Loader2, X } from 'lucide-react'
import toast from 'react-hot-toast'

export default function AdminTechStack() {
  const [items, setItems] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [showAdd, setShowAdd] = useState(false)
  const [newItem, setNewItem] = useState('')

  useEffect(() => {
    getTechStack()
      .then(setItems)
      .finally(() => setLoading(false))
  }, [])

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newItem.trim()) return

    try {
      const updated = await postTechStackItem(newItem.trim())
      setItems(updated)
      setShowAdd(false)
      setNewItem('')
      toast.success('Tag added to Tech Stack')
    } catch (err) {
      toast.error('Failed to add tag')
    }
  }

  const handleDelete = async (index: number) => {
    try {
      const updated = await deleteTechStackItem(index)
      setItems(updated)
      toast.success('Tag removed')
    } catch (err) {
      toast.error('Failed to remove tag')
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
          <h2 className="section-title">Tech Stack Tags</h2>
          <p className="section-subtitle">Manage the tools and technologies featured in your headline tag cloud.</p>
        </div>
        <button onClick={() => setShowAdd(true)} className="btn btn-primary">
          <Plus size={18} /> Add Tag
        </button>
      </div>

      {showAdd && (
        <div className="card card-elevated animate-scale-in" style={{ marginBottom: '40px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: '700' }}>New Technology Tag</h3>
            <button onClick={() => setShowAdd(false)} className="btn btn-secondary" style={{ padding: '8px' }}>
              <X size={18} />
            </button>
          </div>
          <form onSubmit={handleAdd} style={{ display: 'flex', gap: '12px' }}>
            <div className="form-group" style={{ flex: 1 }}>
              <input 
                type="text" className="input" placeholder="e.g. Kubernetes, React, Go..."
                value={newItem} onChange={e => setNewItem(e.target.value)}
                autoFocus
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Add Tag
            </button>
          </form>
        </div>
      )}

      <div className="card" style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', padding: '32px' }}>
        {items.length === 0 && (
          <p style={{ color: 'var(--text-muted)', textAlign: 'center', width: '100%' }}>No tags added yet.</p>
        )}
        {items.map((item, i) => (
          <div 
            key={i} 
            className="flex-center" 
            style={{ 
              padding: '6px 12px 6px 16px', 
              background: 'var(--bg-1)', 
              borderRadius: '20px', 
              border: '1px solid var(--border)',
              gap: '10px'
            }}
          >
            <span style={{ fontSize: '0.9rem', fontWeight: '600' }}>{item}</span>
            <button 
              onClick={() => handleDelete(i)} 
              style={{ 
                background: 'none', 
                border: 'none', 
                padding: '4px', 
                color: 'var(--text-muted)', 
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center'
              }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--error)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}
            >
              <X size={14} />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
