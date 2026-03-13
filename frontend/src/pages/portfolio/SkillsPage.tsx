import { motion } from 'framer-motion'
import { usePortfolio } from '../../context/PortfolioContext'
import { 
  Zap, Code2, Globe, Database, Settings, ShieldCheck, 
  Terminal, Server, Box, Cloud, Network, CheckCircle2,
  ExternalLink, Users
} from 'lucide-react'
import './SkillsPage.css'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, delay, ease: "easeOut" }
})

export default function Skills() {
  const { data } = usePortfolio()
  if (!data) return null

  const { skills, certifications } = data

  const competencyIcons = [<Globe size={24} />, <Cloud size={24} />, <ShieldCheck size={24} />]
  const toolIcons = [
    <Box size={16} />, <Settings size={16} />, <Terminal size={16} />,
    <Cloud size={16} />, <Server size={16} />, <Network size={16} />, <Database size={16} />
  ]

  return (
    <div className="skills-page container">
      {/* ─── Header ─── */}
      <header className="skills-header">
        <motion.div className="skills-badge" {...fadeUp(0.1)}>
          <Zap size={14} fill="currentColor" /> My Technical Stack
        </motion.div>
        <motion.h1 className="skills-title" {...fadeUp(0.2)}>
          Skills & <span className="text-gradient">Expertise.</span>
        </motion.h1>
        <motion.p className="skills-desc" {...fadeUp(0.3)}>
          Over 8 years of experience building scalable web applications. Specialized in 
          full-stack architecture, distributed systems, and cloud-native infrastructure.
        </motion.p>
      </header>

      {/* ─── Core Competencies ─── */}
      <section className="skills-section">
        <h2 className="skills-section__header">
          <CheckCircle2 size={24} /> Core Competencies
        </h2>
        <div className="competency-grid">
          {skills.core_competencies.map((comp, i) => (
            <motion.div 
              key={comp.name} 
              className="competency-card"
              {...fadeUp(0.1 + (i * 0.1))}
            >
              <div className="competency-icon">
                {competencyIcons[i % competencyIcons.length]}
              </div>
              <h3 className="competency-title">{comp.name}</h3>
              <p className="competency-desc">{comp.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ─── Mastery Grid (Frontend & Backend) ─── */}
      <div className="skills-main-grid">
        {/* Frontend Mastery */}
        <section className="skills-section">
          <h2 className="skills-section__header">
            <Code2 size={24} /> Frontend Mastery
          </h2>
          {skills.frontend.map((item, i) => (
            <div key={item.name} className="progress-group">
              <div className="progress-header">
                <span>{item.name}</span>
                <span className="text-gradient">{item.proficiency}%</span>
              </div>
              <div className="progress-track">
                <motion.div 
                  className="progress-bar"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${item.proficiency}%` }}
                  transition={{ duration: 1, delay: i * 0.1 }}
                />
              </div>
            </div>
          ))}
        </section>

        {/* Backend Systems */}
        <section className="skills-section">
          <h2 className="skills-section__header">
            <Server size={24} /> Backend Systems
          </h2>
          {skills.backend.map((item, i) => (
            <div key={item.name} className="progress-group">
              <div className="progress-header">
                <span>{item.name}</span>
                <span className="text-gradient">{item.proficiency}%</span>
              </div>
              <div className="progress-track">
                <motion.div 
                  className="progress-bar"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${item.proficiency}%` }}
                  transition={{ duration: 1, delay: i * 0.1 }}
                />
              </div>
            </div>
          ))}
        </section>
      </div>

      <div className="skills-main-grid">
        {/* DevOps & Tooling */}
        <section className="skills-section">
          <h2 className="skills-section__header">
            <Settings size={24} /> DevOps & Tooling
          </h2>
          <div className="tool-grid">
            {skills.devops_tooling.map((tool, i) => (
              <motion.div 
                key={tool} 
                className="tool-tag"
                {...fadeUp(0.1 + (i * 0.05))}
              >
                {toolIcons[i % toolIcons.length]}
                {tool}
              </motion.div>
            ))}
          </div>
        </section>

        {/* Soft Skills */}
        <section className="skills-section">
          <h2 className="skills-section__header">
            <Users size={24} /> Processes & Soft Skills
          </h2>
          <div className="soft-skills-grid">
            {skills.soft_skills.map((skill, i) => (
              <motion.div 
                key={skill} 
                className="soft-skill-item"
                {...fadeUp(0.1 + (i * 0.05))}
              >
                <CheckCircle2 size={18} />
                {skill}
              </motion.div>
            ))}
          </div>
        </section>
      </div>

      {/* ─── Certifications ─── */}
      <section className="skills-section">
        <h2 className="skills-section__header">
          <ShieldCheck size={24} /> Verified Certifications
        </h2>
        <div className="cert-grid">
          {certifications.filter(c => c.year).map((cert, i) => (
            <motion.div 
              key={cert.name} 
              className="cert-card"
              {...fadeUp(0.1 + (i * 0.1))}
            >
              <div className="cert-icon">
                <ShieldCheck size={32} />
              </div>
              <h3 className="cert-title">{cert.name}</h3>
              <span className="cert-level">{cert.level} {cert.year && `, ${cert.year}`}</span>
              <a href="#" className="cert-link">
                View Certificate <ExternalLink size={14} />
              </a>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ─── CTA Box ─── */}
      <motion.section className="skills-cta" {...fadeUp(0.1)}>
        <h2>Interested in working together?</h2>
        <p>I me currently open for senior-level opportunities or complex freelance architectures. Let's build something exceptional.</p>
        <div className="skills-cta__buttons">
          <a href="/contact" className="btn btn-white btn-lg">Hire Me Now</a>
          <a href="#" className="btn btn-outline-white btn-lg">Download Resume</a>
        </div>
      </motion.section>
    </div>
  )
}
