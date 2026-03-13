import { useState, useEffect } from 'react'
import { getPortfolio, patchSkills } from '../../../api/client'
import { usePortfolio } from '../../../context/PortfolioContext'
import type { Skills } from '../../../types'
import { Code2, Database, Loader2, Save, Terminal, Users, Cpu, Plus, Trash2 } from 'lucide-react'
import toast from 'react-hot-toast'
import ConfirmModal from '../../../components/ConfirmModal'

export default function AdminSkills() {
  const { refreshData } = usePortfolio()
  const [skills, setSkills] = useState<Skills | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean, type: string, index: number | null }>({
    isOpen: false,
    type: '',
    index: null
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getPortfolio()
        setSkills(data.skills)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const handleSave = async () => {
    if (!skills) return
    setSaving(true)
    try {
      await patchSkills(skills)
      await refreshData()
      toast.success('Skills configuration saved')
    } catch (err) {
      toast.error('Failed to save skills')
    } finally {
      setSaving(false)
    }
  }

  const handleDeleteRequest = (type: string, index: number) => {
    setDeleteModal({ isOpen: true, type, index })
  }

  const confirmDelete = () => {
    if (!skills || deleteModal.index === null) return
    const next = { ...skills }
    const i = deleteModal.index
    
    if (deleteModal.type === 'core') next.core_competencies.splice(i, 1)
    if (deleteModal.type === 'frontend') next.frontend.splice(i, 1)
    if (deleteModal.type === 'backend') next.backend.splice(i, 1)
    
    setSkills(next)
    setDeleteModal({ isOpen: false, type: '', index: null })
  }

  if (loading) return (
    <div className="flex-center" style={{ height: '200px' }}>
      <Loader2 className="animate-spin text-gradient" size={32} />
    </div>
  )

  if (!skills) return <div>Error loading data...</div>

  return (
    <div className="animate-fade-in">
      <div className="section-header" style={{ marginBottom: '40px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <h2 className="section-title">Expertise & Skills</h2>
          <p className="section-subtitle">Manage your competencies, technical stack, and soft skills.</p>
        </div>
        <button onClick={handleSave} className="btn btn-primary" disabled={saving}>
          {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
          {saving ? 'Saving...' : 'Save All Changes'}
        </button>
      </div>

      {/* ─── Core Competencies ─── */}
      <div className="card" style={{ padding: '32px', marginBottom: '32px' }}>
        <h3 style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
          <Cpu size={20} className="text-gradient" /> Core Competencies
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px', marginBottom: '24px' }}>
          {skills.core_competencies.map((comp, i) => (
            <div key={i} className="card card-elevated" style={{ padding: '20px', position: 'relative' }}>
              <button 
                className="btn btn-icon btn-danger btn-sm" 
                style={{ position: 'absolute', top: '10px', right: '10px' }}
                onClick={() => handleDeleteRequest('core', i)}
              >
                <Trash2 size={14} />
              </button>
              <input 
                className="input" 
                style={{ marginBottom: '10px', fontWeight: '700' }}
                value={comp.name}
                onChange={e => {
                  const next = [...skills.core_competencies]
                  next[i].name = e.target.value
                  setSkills({...skills, core_competencies: next})
                }}
              />
              <textarea 
                className="textarea" 
                style={{ fontSize: '0.85rem' }}
                value={comp.description}
                onChange={e => {
                  const next = [...skills.core_competencies]
                  next[i].description = e.target.value
                  setSkills({...skills, core_competencies: next})
                }}
              />
            </div>
          ))}
          <div className="card card-elevated flex-center" style={{ border: '2px dashed var(--border)', background: 'transparent' }}>
             <button className="btn btn-secondary" onClick={() => setSkills({...skills, core_competencies: [...skills.core_competencies, {name: 'New Competency', description: ''}]})}>
               <Plus size={18} /> Add Competency
             </button>
          </div>
        </div>
      </div>

      {/* ─── Technical Mastery (Frontend/Backend) ─── */}
      <div className="grid-2" style={{ marginBottom: '32px' }}>
        <div className="card" style={{ padding: '32px' }}>
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
            <Code2 size={20} className="text-gradient" /> Frontend Proficiency
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {skills.frontend.map((s, i) => (
              <div key={i} className="flex-center" style={{ gap: '12px' }}>
                <input 
                  className="input" 
                  value={s.name}
                  style={{ flex: 1 }}
                  onChange={e => {
                    const next = [...skills.frontend]
                    next[i].name = e.target.value
                    setSkills({...skills, frontend: next})
                  }}
                />
                <input 
                  type="number" className="input" style={{ width: '70px' }}
                  value={s.proficiency}
                  onChange={e => {
                    const next = [...skills.frontend]
                    next[i].proficiency = parseInt(e.target.value)
                    setSkills({...skills, frontend: next})
                  }}
                />
                <button className="btn btn-icon btn-danger btn-sm" onClick={() => handleDeleteRequest('frontend', i)}>
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
            <button className="btn btn-secondary btn-sm" onClick={() => setSkills({...skills, frontend: [...skills.frontend, {name: '', proficiency: 90}]})}>
              <Plus size={14} /> Add Frontend Skill
            </button>
          </div>
        </div>

        <div className="card" style={{ padding: '32px' }}>
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
            <Database size={20} className="text-gradient" /> Backend Proficiency
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {skills.backend.map((s, i) => (
              <div key={i} className="flex-center" style={{ gap: '12px' }}>
                <input 
                  className="input" 
                  value={s.name}
                  style={{ flex: 1 }}
                  onChange={e => {
                    const next = [...skills.backend]
                    next[i].name = e.target.value
                    setSkills({...skills, backend: next})
                  }}
                />
                <input 
                  type="number" className="input" style={{ width: '70px' }}
                  value={s.proficiency}
                  onChange={e => {
                    const next = [...skills.backend]
                    next[i].proficiency = parseInt(e.target.value)
                    setSkills({...skills, backend: next})
                  }}
                />
                <button className="btn btn-icon btn-danger btn-sm" onClick={() => handleDeleteRequest('backend', i)}>
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
            <button className="btn btn-secondary btn-sm" onClick={() => setSkills({...skills, backend: [...skills.backend, {name: '', proficiency: 90}]})}>
              <Plus size={14} /> Add Backend Skill
            </button>
          </div>
        </div>
      </div>

      <div className="grid-2">
        {/* ─── Programming Languages ─── */}
        <div className="card" style={{ padding: '32px' }}>
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
            <Code2 size={20} className="text-gradient" /> Programming Languages
          </h3>
          <textarea 
            className="textarea"
            style={{ minHeight: '150px' }}
            value={skills.languages.join('\n')}
            onChange={e => setSkills({...skills, languages: e.target.value.split('\n')})}
            placeholder="TypeScript, Python, Go..."
          />
          <p style={{ marginTop: '12px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>Enter one language per line.</p>
        </div>

        {/* ─── DevOps & Tooling ─── */}
        <div className="card" style={{ padding: '32px' }}>
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
            <Terminal size={20} className="text-gradient" /> DevOps & Tooling
          </h3>
          <textarea 
            className="textarea"
            style={{ minHeight: '150px' }}
            value={skills.devops_tooling.join('\n')}
            onChange={e => setSkills({...skills, devops_tooling: e.target.value.split('\n')})}
            placeholder="Docker, Kubernetes, AWS..."
          />
          <p style={{ marginTop: '12px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>Enter one tool per line.</p>
        </div>
      </div>

      <div style={{ marginTop: '32px' }}>
        {/* ─── Soft Skills ─── */}
        <div className="card" style={{ padding: '32px' }}>
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
            <Users size={20} className="text-gradient" /> Soft Skills
          </h3>
          <textarea 
            className="textarea"
            style={{ minHeight: '150px' }}
            value={skills.soft_skills.join('\n')}
            onChange={e => setSkills({...skills, soft_skills: e.target.value.split('\n')})}
            placeholder="Agile, Leadership, Communication..."
          />
          <p style={{ marginTop: '12px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>Enter one skill per line.</p>
        </div>
      </div>

      <ConfirmModal 
        isOpen={deleteModal.isOpen}
        title="Remove Skill"
        message={`Are you sure you want to remove this ${deleteModal.type === 'core' ? 'competency' : 'technical skill'}? This will delete the entry immediately from your configuration.`}
        onConfirm={confirmDelete}
        onCancel={() => setDeleteModal({ ...deleteModal, isOpen: false })}
        danger
        confirmText="Remove Skill"
      />
    </div>
  )
}
