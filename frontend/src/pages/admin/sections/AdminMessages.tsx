import { useState, useEffect } from 'react'
import { getMessages } from '../../../api/client'
import { Clock, User, Loader2, Inbox } from 'lucide-react'

interface Message {
  name: string
  email: string
  subject: string
  message: string
  date: string
}

export default function AdminMessages() {
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getMessages()
      .then(setMessages)
      .finally(() => setLoading(false))
  }, [])

  if (loading) return (
    <div className="flex-center" style={{ height: '200px' }}>
      <Loader2 className="animate-spin text-gradient" size={32} />
    </div>
  )

  return (
    <div className="animate-fade-in">
      <div className="section-header" style={{ marginBottom: '40px' }}>
        <h2 className="section-title">Inquiry Inbox</h2>
        <p className="section-subtitle">Read and manage messages from your portfolio contact form.</p>
      </div>

      {messages.length === 0 ? (
        <div className="card flex-center" style={{ padding: '60px', flexDirection: 'column', gap: '16px' }}>
          <Inbox size={48} style={{ color: 'var(--text-muted)' }} />
          <p style={{ color: 'var(--text-secondary)' }}>Your inbox is currently empty.</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {[...messages].reverse().map((msg, i) => (
            <div key={i} className="card card-elevated" style={{ padding: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                  <div style={{ padding: '8px', background: 'var(--bg-1)', borderRadius: '8px', color: 'var(--accent)' }}>
                    <User size={18} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1rem', fontWeight: '700' }}>{msg.name}</h4>
                    <a href={`mailto:${msg.email}`} style={{ fontSize: '0.8rem', color: 'var(--accent-light)' }}>{msg.email}</a>
                  </div>
                </div>
                <div className="flex-center" style={{ gap: '6px', color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                  <Clock size={14} />
                  <span>{new Date(msg.date).toLocaleString()}</span>
                </div>
              </div>
              
              <div style={{ padding: '16px', background: 'var(--bg-1)', borderRadius: '8px', borderLeft: '3px solid var(--accent)' }}>
                <span className="badge badge-cyan" style={{ marginBottom: '8px' }}>{msg.subject}</span>
                <p style={{ fontSize: '0.95rem', lineHeight: '1.6', color: 'var(--text-primary)' }}>{msg.message}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
