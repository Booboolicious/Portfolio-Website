import { useState, useEffect } from 'react'
import { getProjects, postProject, putProject, deleteProject } from '../../../api/client'
import type { Project } from '../../../types'
import { Plus, Trash2, Loader2, Image as ImageIcon, X, Edit2, Save } from 'lucide-react'
import toast from 'react-hot-toast'

export default function AdminProjects() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editIndex, setEditIndex] = useState<number | null>(null)
  
  const [formData, setFormData] = useState<Project>({
    name: '',
    description: '',
    category: '',
    technologies: [],
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c'
  })
  const [techInput, setTechInput] = useState('')

  useEffect(() => {
    loadProjects()
  }, [])

  const loadProjects = () => {
    getProjects()
      .then(setProjects)
      .finally(() => setLoading(false))
  }

  const handleEdit = (index: number) => {
    setEditIndex(index)
    setFormData(projects[index])
    setShowForm(true)
  }

  const handleCancel = () => {
    setShowForm(false)
    setEditIndex(null)
    setFormData({ name: '', description: '', category: '', technologies: [], image: '' })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (editIndex !== null) {
        const res = await putProject(editIndex, formData)
        setProjects(res)
        toast.success('Project updated')
      } else {
        const res = await postProject(formData)
        setProjects(res)
        toast.success('Project added')
      }
      handleCancel()
    } catch (err) {
      toast.error('Failed to save project')
    }
  }

  const handleDelete = async (index: number) => {
    if (!confirm('Are you sure you want to delete this project?')) return
    try {
      const res = await deleteProject(index)
      setProjects(res)
      toast.success('Project deleted')
    } catch (err) {
      toast.error('Failed to delete project')
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
          <h2 className="section-title">Projects Console</h2>
          <p className="section-subtitle">Add, remove, or manage your portfolio projects.</p>
        </div>
        {!showForm && (
          <button onClick={() => setShowForm(true)} className="btn btn-primary">
            <Plus size={16} /> New Project
          </button>
        )}
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="card card-elevated animate-fade-up" style={{ padding: '32px', marginBottom: '40px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
            <h3 style={{ fontSize: '1.25rem' }}>{editIndex !== null ? 'Edit Project' : 'New Project'}</h3>
            <button type="button" onClick={handleCancel} className="btn btn-secondary btn-sm">
              <X size={16} /> Cancel
            </button>
          </div>
          
          <div className="grid-2">
            <div className="form-group">
              <label className="form-label">Project Name</label>
              <input 
                className="input" 
                required
                value={formData.name} 
                onChange={e => setFormData({...formData, name: e.target.value})} 
              />
            </div>
            <div className="form-group">
              <label className="form-label">Category</label>
              <input 
                className="input" 
                required
                placeholder="e.g. Full Stack, AI, Web App"
                value={formData.category} 
                onChange={e => setFormData({...formData, category: e.target.value})} 
              />
            </div>
          </div>

          <div className="form-group" style={{ marginTop: '20px' }}>
            <label className="form-label">Description</label>
            <textarea 
              className="textarea" 
              required
              style={{ minHeight: '120px' }}
              value={formData.description} 
              onChange={e => setFormData({...formData, description: e.target.value})} 
            />
          </div>

          <div className="grid-2" style={{ marginTop: '20px' }}>
            <div className="form-group">
              <label className="form-label">Image URL</label>
              <input 
                className="input" 
                value={formData.image} 
                onChange={e => setFormData({...formData, image: e.target.value})} 
              />
            </div>
            <div className="form-group">
              <label className="form-label">Technologies (Press Enter)</label>
              <div style={{ display: 'flex', gap: '8px' }}>
                <input 
                  className="input" 
                  value={techInput}
                  onChange={e => setTechInput(e.target.value)}
                  onKeyDown={e => {
                    if (e.key === 'Enter') {
                      e.preventDefault()
                      if (techInput.trim()) {
                        setFormData({...formData, technologies: [...formData.technologies, techInput.trim()]})
                        setTechInput('')
                      }
                    }
                  }}
                />
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '12px' }}>
                {formData.technologies.map((t, i) => (
                  <span key={i} className="badge badge-accent" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    {t}
                    <X size={12} className="pointer" onClick={() => {
                      const next = [...formData.technologies]
                      next.splice(i, 1)
                      setFormData({...formData, technologies: next})
                    }} />
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div style={{ marginTop: '32px', display: 'flex', justifyContent: 'flex-end' }}>
            <button type="submit" className="btn btn-primary">
              {editIndex !== null ? <Save size={16} /> : <Plus size={16} />}
              {editIndex !== null ? 'Update Project' : 'Create Project'}
            </button>
          </div>
        </form>
      )}

      <div className="grid-2">
        {projects.map((p, i) => (
          <div key={i} className="card card-elevated" style={{ display: 'flex', overflow: 'hidden' }}>
            <div style={{ width: '140px', minWidth: '140px', background: 'var(--bg-3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {p.image ? (
                <img src={p.image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                <ImageIcon size={32} style={{ color: 'var(--text-muted)' }} />
              )}
            </div>
            <div style={{ padding: '24px', flex: 1, position: 'relative' }}>
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
              <span className="badge badge-cyan" style={{ marginBottom: '8px' }}>{p.category}</span>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '8px', paddingRight: '60px' }}>{p.name}</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '16px', lineBreak: 'anywhere', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                {p.description}
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {p.technologies.slice(0, 4).map((t, i) => <span key={i} className="tag">{t}</span>)}
                {p.technologies.length > 4 && <span className="tag">+{p.technologies.length - 4}</span>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
