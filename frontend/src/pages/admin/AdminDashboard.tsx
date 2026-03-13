import { useState, useEffect } from 'react'
import { getPortfolio, getMessages } from '../../api/client'
import type { Portfolio } from '../../types'
import { 
  FolderKanban, Star, Activity, 
  ArrowUpRight, AlertCircle, Loader2,
  Mail, MessageSquare, Clock, ShieldCheck,
  Plus, Edit3, Globe
} from 'lucide-react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

export default function AdminDashboard() {
  const [data, setData] = useState<Portfolio | null>(null)
  const [messages, setMessages] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([getPortfolio(), getMessages()])
      .then(([p, m]) => {
        setData(p)
        setMessages(m || [])
      })
      .finally(() => setLoading(false))
  }, [])

  if (loading) return (
    <div className="flex-center" style={{ height: '400px' }}>
      <Loader2 className="animate-spin text-gradient" size={40} />
    </div>
  )

  if (!data) return (
    <div className="card" style={{ padding: '60px', textAlign: 'center' }}>
      <AlertCircle size={64} style={{ color: 'var(--danger)', margin: '0 auto 24px', opacity: 0.5 }} />
      <h3 style={{ fontSize: '1.5rem', fontWeight: '700' }}>System Offline</h3>
      <p style={{ color: 'var(--text-secondary)', marginTop: '8px' }}>Unable to establish connection with the Portfolio Engine.</p>
    </div>
  )

  const stats = [
    { label: 'Projects', value: data.projects.length, icon: FolderKanban, color: '#6366f1', trend: '+2 this month' },
    { label: 'Milestones', value: data.timeline.length, icon: Activity, color: '#8b5cf6', trend: 'Career archive' },
    { label: 'Messages', value: messages.length, icon: Mail, color: '#f59e0b', trend: 'Latest inquiries' },
    { label: 'Total Skills', value: data.skills.frontend.length + data.skills.backend.length + data.skills.languages.length, icon: Star, color: '#10b981', trend: 'Highly skilled' },
  ]

  return (
    <div className="animate-fade-in">
      {/* Header Section */}
      <div style={{ marginBottom: '48px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <h1 style={{ fontSize: '2.5rem', fontWeight: '900', letterSpacing: '-0.02em', marginBottom: '8px' }}>
            Welcome back, <span className="text-gradient">{data.personal.name.split(' ')[0]}</span>
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>
            Everything is running smoothly. Your portfolio is currently live and active.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <div className="badge badge-green" style={{ padding: '8px 16px', borderRadius: '100px', fontSize: '0.85rem' }}>
            <span style={{ width: '8px', height: '8px', background: '#10b981', borderRadius: '50%', marginRight: '8px', display: 'inline-block' }} />
            Engine Online
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid-4" style={{ marginBottom: '40px' }}>
        {stats.map((s, i) => (
          <motion.div 
            key={s.label} 
            className="card card-elevated" 
            style={{ padding: '24px', position: 'relative', overflow: 'hidden' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <div style={{ position: 'absolute', top: '-10px', right: '-10px', width: '80px', height: '80px', background: s.color, opacity: 0.05, borderRadius: '50%' }} />
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
              <div style={{ padding: '12px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', color: s.color }}>
                <s.icon size={22} strokeWidth={2.5} />
              </div>
              <ArrowUpRight size={16} style={{ color: 'var(--text-muted)' }} />
            </div>
            
            <h3 style={{ fontSize: '2.25rem', fontWeight: '900', marginBottom: '4px' }}>{s.value}</h3>
            <p style={{ color: 'var(--text-primary)', fontSize: '0.9rem', fontWeight: '700', marginBottom: '12px' }}>{s.label}</p>
            <div style={{ fontSize: '0.75rem', color: s.color, fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              {s.trend}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid-2">
        {/* Recent Messages */}
        <div className="card card-elevated" style={{ padding: '0', display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: '24px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <MessageSquare size={20} className="text-gradient" />
              <h3 style={{ fontWeight: '800' }}>Recent Messages</h3>
            </div>
            <Link to="/admin/messages" className="btn btn-secondary btn-sm" style={{ padding: '6px 12px', fontSize: '0.8rem' }}>View All</Link>
          </div>
          <div style={{ padding: '12px' }}>
            {messages.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--text-muted)' }}>
                <Clock size={32} style={{ marginBottom: '12px', opacity: 0.3 }} />
                <p>No messages yet.</p>
              </div>
            ) : (
              [...messages].reverse().slice(0, 3).map((msg, i) => (
                <div key={i} style={{ 
                  padding: '16px', 
                  borderRadius: '12px', 
                  marginBottom: '8px', 
                  background: 'rgba(255,255,255,0.02)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <div>
                    <h4 style={{ fontSize: '0.95rem', fontWeight: '700', marginBottom: '4px' }}>{msg.name}</h4>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', maxWidth: '280px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {msg.message}
                    </p>
                  </div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{msg.date.split('T')[0]}</span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* System & Quick Actions */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div className="card card-elevated" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
              <ShieldCheck size={20} style={{ color: '#10b981' }} />
              <h3 style={{ fontWeight: '800' }}>Security & Status</h3>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Environment</span>
                <span className="badge badge-blue">Production</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Uptime</span>
                <span style={{ fontSize: '0.9rem', fontWeight: '700' }}>99.9%</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Data Encryption</span>
                <span style={{ fontSize: '0.9rem', color: '#10b981', fontWeight: '700' }}>Active</span>
              </div>
            </div>
          </div>

          <div className="card card-elevated" style={{ padding: '24px' }}>
            <h3 style={{ fontWeight: '800', marginBottom: '24px' }}>Quick Actions</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <Link to="/admin/projects" className="btn btn-secondary" style={{ justifyContent: 'flex-start', padding: '12px' }}>
                <Plus size={16} style={{ marginRight: '8px' }} /> Project
              </Link>
              <Link to="/admin/skills" className="btn btn-secondary" style={{ justifyContent: 'flex-start', padding: '12px' }}>
                <Star size={16} style={{ marginRight: '8px' }} /> Skill
              </Link>
              <Link to="/admin/personal" className="btn btn-secondary" style={{ justifyContent: 'flex-start', padding: '12px' }}>
                <Edit3 size={16} style={{ marginRight: '8px' }} /> Bio
              </Link>
              <a href="/" target="_blank" className="btn btn-primary" style={{ justifyContent: 'flex-start', padding: '12px' }}>
                <Globe size={16} style={{ marginRight: '8px' }} /> Live Site
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
