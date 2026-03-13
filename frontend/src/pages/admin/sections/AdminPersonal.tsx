import { useState, useEffect } from 'react'
import { getPersonal, patchPersonal } from '../../../api/client'
import type { Personal } from '../../../types'
import { Save, Loader2 } from 'lucide-react'
import toast from 'react-hot-toast'

export default function AdminPersonal() {
  const [data, setData] = useState<Personal | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    getPersonal()
      .then(setData)
      .finally(() => setLoading(false))
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!data) return
    
    setSaving(true)
    try {
      await patchPersonal(data)
      toast.success('Personal info updated successfully')
    } catch (err) {
      toast.error('Failed to update personal info')
      console.error(err)
    } finally {
      setSaving(false)
    }
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
        <h2 className="section-title">Personal Information</h2>
        <p className="section-subtitle">Manage your name, title, bio, and social links.</p>
      </div>

      <form onSubmit={handleSubmit} className="card" style={{ padding: '32px' }}>
        <div className="grid-2">
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input 
              className="input" 
              value={data.name} 
              onChange={e => setData({...data, name: e.target.value})} 
            />
          </div>
          <div className="form-group">
            <label className="form-label">Professional Title</label>
            <input 
              className="input" 
              value={data.title} 
              onChange={e => setData({...data, title: e.target.value})} 
            />
          </div>
        </div>

        <div className="form-group" style={{ marginTop: '20px' }}>
          <label className="form-label">Tagline</label>
          <input 
            className="input" 
            value={data.tagline} 
            onChange={e => setData({...data, tagline: e.target.value})} 
          />
        </div>

        <div className="form-group" style={{ marginTop: '20px' }}>
          <label className="form-label">Short Bio</label>
          <textarea 
            className="textarea" 
            value={data.bio} 
            onChange={e => setData({...data, bio: e.target.value})} 
          />
        </div>

        <div className="grid-2" style={{ marginTop: '20px' }}>
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input 
              className="input" 
              value={data.email} 
              onChange={e => setData({...data, email: e.target.value})} 
            />
          </div>
          <div className="form-group">
            <label className="form-label">Location</label>
            <input 
              className="input" 
              value={data.location} 
              onChange={e => setData({...data, location: e.target.value})} 
            />
          </div>
        </div>

        <div className="grid-2" style={{ marginTop: '20px' }}>
          <div className="form-group">
            <label className="form-label">GitHub URL</label>
            <input 
              className="input" 
              value={data.github} 
              onChange={e => setData({...data, github: e.target.value})} 
            />
          </div>
          <div className="form-group">
            <label className="form-label">LinkedIn URL</label>
            <input 
              className="input" 
              value={data.linkedin} 
              onChange={e => setData({...data, linkedin: e.target.value})} 
            />
          </div>
        </div>

        <div className="grid-2" style={{ marginTop: '20px' }}>
          <div className="form-group">
            <label className="form-label">Twitter URL</label>
            <input 
              className="input" 
              value={data.twitter} 
              onChange={e => setData({...data, twitter: e.target.value})} 
            />
          </div>
          <div className="form-group">
            <label className="form-label">Dribbble URL</label>
            <input 
              className="input" 
              value={data.dribbble} 
              onChange={e => setData({...data, dribbble: e.target.value})} 
            />
          </div>
        </div>

        <div className="form-group" style={{ marginTop: '20px' }}>
          <label className="form-label">Availability Status</label>
          <input 
            className="input" 
            value={data.availability} 
            onChange={e => setData({...data, availability: e.target.value})} 
            placeholder="e.g. Available for New Projects"
          />
        </div>

        <div className="form-group" style={{ marginTop: '20px' }}>
          <label className="form-label">Hobbies & Interests (One per line)</label>
          <textarea 
            className="textarea" 
            style={{ minHeight: '100px' }}
            value={data.hobbies.join('\n')} 
            onChange={e => setData({...data, hobbies: e.target.value.split('\n')})} 
            placeholder="Hiking, Keyboards, Coffee..."
          />
        </div>

        <div style={{ marginTop: '32px', display: 'flex', justifyContent: 'flex-end', borderTop: '1px solid var(--border)', paddingTop: '32px' }}>
          <button type="submit" className="btn btn-primary" disabled={saving}>
            {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
            {saving ? 'Saving Changes...' : 'Save Configuration'}
          </button>
        </div>
      </form>
    </div>
  )
}
