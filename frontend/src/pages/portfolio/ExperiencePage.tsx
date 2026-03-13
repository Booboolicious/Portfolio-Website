import { motion } from 'framer-motion'
import { usePortfolio } from '../../context/PortfolioContext'
import { 
  Briefcase, GraduationCap, Code2, Award, Languages as LangIcon, 
  Mail, Globe, MapPin, Github, Printer, Download, FileText 
} from 'lucide-react'
import './ExperiencePage.css'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }
})

export default function Experience() {
  const { data } = usePortfolio()
  if (!data) return null

  const { personal, experience, education, skills, honors, spoken_languages } = data

  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="experience-page container">
      {/* ─── Top Bar ─── */}
      <div className="resume-top-bar">
        <div className="resume-brand">
          <FileText size={20} />
          <span>Resume.json</span>
        </div>
        <div className="resume-actions">
          <button onClick={handlePrint} className="btn btn-secondary btn-sm">
            <Printer size={16} /> Print Page
          </button>
          <a href="#" className="btn btn-primary btn-sm">
            <Download size={16} /> Download PDF
          </a>
        </div>
      </div>

      <motion.div className="resume-layout" {...fadeUp(0.1)}>
        {/* ─── Main Content (Left) ─── */}
        <div className="resume-main">
          {/* Intro */}
          <section className="resume-intro">
            <motion.h1 className="resume-name" {...fadeUp(0.1)}>
              {personal.name}
            </motion.h1>
            <motion.p className="resume-title" {...fadeUp(0.2)}>
              {personal.title}
            </motion.p>
            <motion.p className="resume-bio" {...fadeUp(0.3)}>
              {personal.bio}
            </motion.p>
          </section>

          {/* Work Experience */}
          <section className="resume-section">
            <h2 className="resume-section__title">
              <Briefcase size={20} /> Work Experience
            </h2>
            <div className="experience-list">
              {experience.map((job, i) => (
                <motion.div 
                  key={i} 
                  className="experience-item"
                  {...fadeUp(0.1 + (i * 0.1))}
                >
                  <div className="experience-header">
                    <h3 className="experience-role">{job.title}</h3>
                    <span className="experience-period">{job.period}</span>
                  </div>
                  <span className="experience-company">{job.company}</span>
                  <ul className="experience-highlights">
                    {job.highlights.map((h, j) => (
                      <li key={j}>{h}</li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Education */}
          <section className="resume-section">
            <h2 className="resume-section__title">
              <GraduationCap size={20} /> Education
            </h2>
            <div className="education-list">
              {education.map((edu, i) => (
                <motion.div 
                  key={i} 
                  className="education-item"
                  {...fadeUp(0.1 + (i * 0.1))}
                >
                  <div className="education-header">
                    <h3 className="education-degree">{edu.degree}</h3>
                    <span className="education-period">{edu.period}</span>
                  </div>
                  <span className="education-inst">{edu.institution}</span>
                  {edu.note && <p className="education-note">{edu.note}</p>}
                </motion.div>
              ))}
            </div>
          </section>
        </div>

        {/* ─── Sidebar (Right) ─── */}
        <aside className="resume-sidebar">
          {/* Contact Info */}
          <ul className="sidebar-contact">
            <li><Mail size={16} /> {personal.email}</li>
            <li><Globe size={16} /> {personal.website}</li>
            <li><MapPin size={16} /> {personal.location}</li>
            <li><Github size={16} /> {personal.github}</li>
          </ul>

          {/* Core Skills */}
          <section className="resume-section">
            <h2 className="resume-section__title">
              <Code2 size={20} /> Core Skills
            </h2>
            
            <div className="skill-group">
              <span className="skill-group__label">Languages</span>
              <div className="skill-tags">
                {skills.languages.map(s => <span key={s} className="skill-tag skill-tag--accent">{s}</span>)}
              </div>
            </div>

            <div className="skill-group">
              <span className="skill-group__label">Frontend</span>
              <div className="skill-tags">
                {skills.frontend.map(s => <span key={s.name} className="skill-tag">{s.name}</span>)}
              </div>
            </div>

            <div className="skill-group">
              <span className="skill-group__label">Backend & Cloud</span>
              <div className="skill-tags">
                {skills.backend.map(s => <span key={s.name} className="skill-tag">{s.name}</span>)}
                {skills.devops_tooling.slice(0, 4).map(s => <span key={s} className="skill-tag">{s}</span>)}
              </div>
            </div>
          </section>

          {/* Honors */}
          <section className="resume-section">
            <h2 className="resume-section__title">
              <Award size={20} /> Honors
            </h2>
            {honors.map((h, i) => (
              <div key={i} className="honor-item">
                <span className="honor-title">{h.title}</span>
                <span className="honor-detail">{h.detail}</span>
              </div>
            ))}
          </section>

          {/* Spoken Languages */}
          <section className="resume-section">
            <h2 className="resume-section__title">
              <LangIcon size={20} /> Languages
            </h2>
            {spoken_languages.map((l, i) => (
              <div key={i} className="lang-item">
                <div className="lang-info">
                  <span className="lang-name">{l.language}</span>
                  <span className="lang-level">{l.level}</span>
                </div>
                <div className="lang-track">
                  <motion.div 
                    className="lang-progress" 
                    initial={{ width: 0 }}
                    whileInView={{ width: `${l.proficiency}%` }}
                    transition={{ duration: 1, delay: i * 0.1 }}
                  />
                </div>
              </div>
            ))}
          </section>
        </aside>
      </motion.div>

      {/* Footer Note */}
      <p style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: '40px' }}>
        Looking for a physical copy? Use the print button above or download the PDF.
      </p>
    </div>
  )
}
