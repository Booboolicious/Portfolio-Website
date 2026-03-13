import { useState } from 'react'
import { motion } from 'framer-motion'
import { usePortfolio } from '../../context/PortfolioContext'
import { postMessage } from '../../api/client'
import toast from 'react-hot-toast'
import { 
  Mail, Linkedin, Github, MapPin, 
  Send, ShieldCheck 
} from 'lucide-react'
import './ContactPage.css'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] as any }
})

export default function Contact() {
  const { data } = usePortfolio()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  if (!data) return null
  const { contact, personal } = data

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      await postMessage({
        ...formData,
        date: new Date().toISOString()
      })
      toast.success("Message sent successfully! I'll get back to you soon.")
      setFormData({ name: '', email: '', subject: '', message: '' })
    } catch (err) {
      toast.error("Failed to send message. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="contact-page container">
      <div className="contact-layout">
        
        {/* ─── Left Column: Hero & Info ─── */}
        <div className="contact-column">
          <header className="contact-hero">
            <motion.div className="contact-badge" {...fadeUp(0.1)}>
              <ShieldCheck size={14} fill="currentColor" /> {personal.availability}
            </motion.div>
            <motion.h1 className="contact-title" {...fadeUp(0.2)}>
              Let's build something <span className="text-gradient">extraordinary</span> together.
            </motion.h1>
            <motion.p className="contact-desc" {...fadeUp(0.3)}>
              I'm currently looking for new opportunities in software engineering. 
              Whether you have a question or just want to say hi, I'll try my best to get back to you!
            </motion.p>
          </header>

          <div className="contact-info-grid">
            <motion.div className="contact-card" {...fadeUp(0.4)}>
              <div className="contact-card__icon"><Mail size={20} /></div>
              <div className="contact-card__content">
                <span className="contact-card__label">Email Me</span>
                <span className="contact-card__value">{personal.email}</span>
              </div>
            </motion.div>

            <motion.div className="contact-card" {...fadeUp(0.5)}>
              <div className="contact-card__icon"><Linkedin size={20} /></div>
              <div className="contact-card__content">
                <span className="contact-card__label">LinkedIn</span>
                <span className="contact-card__value">{personal.linkedin}</span>
              </div>
            </motion.div>

            <motion.div className="contact-card" {...fadeUp(0.6)}>
              <div className="contact-card__icon"><Github size={20} /></div>
              <div className="contact-card__content">
                <span className="contact-card__label">GitHub</span>
                <span className="contact-card__value">{personal.github}</span>
              </div>
            </motion.div>

            <motion.div className="contact-card" {...fadeUp(0.7)}>
              <div className="contact-card__icon"><MapPin size={20} /></div>
              <div className="contact-card__content">
                <span className="contact-card__label">Location</span>
                <span className="contact-card__value">{personal.location}</span>
              </div>
            </motion.div>
          </div>

          <motion.div className="contact-map-mock" {...fadeUp(0.8)}>
            {/* Dark stylized map decorative element */}
          </motion.div>
        </div>

        {/* ─── Right Column: Contact Form ─── */}
        <motion.div 
          className="contact-form-container"
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <input 
                  type="text" placeholder="John Doe" className="form-input" required 
                  value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Email Address</label>
                <input 
                  type="email" placeholder="john@example.com" className="form-input" required 
                  value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})}
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Subject</label>
              <select 
                className="form-select" required
                value={formData.subject} onChange={e => setFormData({...formData, subject: e.target.value})}
              >
                <option value="">Select a subject</option>
                {contact.form_subjects.map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Message</label>
              <textarea 
                placeholder="Tell me about your project or what's on your mind..." 
                className="form-textarea"
                required
                value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})}
              ></textarea>
            </div>

            <button type="submit" className="btn-send" disabled={isSubmitting}>
              {isSubmitting ? "Sending..." : (
                <>
                  Send Message <Send size={18} />
                </>
              )}
            </button>

            <p className="form-footer-note">
              By submitting this form, you agree to our <a href="#">privacy policy</a>. 
              I usually respond within 24-48 hours.
            </p>
          </form>
        </motion.div>

      </div>
    </div>
  )
}
