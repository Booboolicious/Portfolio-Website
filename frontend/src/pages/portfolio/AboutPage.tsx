import { motion } from 'framer-motion'
import { usePortfolio } from '../../context/PortfolioContext'
import { Code2, Cpu, Users, ArrowRight, FileText } from 'lucide-react'
import './AboutPage.css'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.6, delay, ease: "easeOut" }
})

export default function About() {
  const { data } = usePortfolio()
  if (!data) return null

  const { personal, about, timeline } = data

  const philosophyIcons = [<Code2 size={24} />, <Cpu size={24} />, <Users size={24} />]
  
  const hobbyImages = [
    { title: 'Hiking PNW', src: '/images/about/hiking.png' },
    { title: 'Custom Keyboards', src: '/images/about/keyboard.png' },
    { title: 'Specialty Coffee', src: '/images/about/coffee.png' },
    { title: 'Tech Setup', src: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800' }
  ]

  return (
    <div className="about-page container">
      {/* ─── Hero Section ─── */}
      <section className="about-hero">
        <motion.div className="about-hero__image-wrapper" {...fadeUp(0.1)}>
          <div className="about-hero__image-glow" />
          <img src="/images/about/profile.png" alt={personal.name} className="about-hero__image" />
        </motion.div>
        
        <motion.h1 className="about-hero__name" {...fadeUp(0.2)}>
          {personal.name}
        </motion.h1>
        <motion.p className="about-hero__title text-gradient" {...fadeUp(0.3)}>
          {personal.title}
        </motion.p>
        <motion.p className="about-hero__tagline" {...fadeUp(0.4)}>
          {personal.tagline}
        </motion.p>
      </section>

      {/* ─── Tech Bar ─── */}
      <div className="about-tech-bar">
        {(data.tech_stack || []).map((tech, i) => (
          <motion.span 
            key={tech} 
            className="about-tech-bar__item"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: i * 0.1 }}
          >
            {tech}
          </motion.span>
        ))}
      </div>

      {/* ─── The Journey ─── */}
      <section className="about-section">
        <motion.h2 className="about-section__title" {...fadeUp(0.1)}>
          The Journey
        </motion.h2>
        <motion.div className="about-journey__text" {...fadeUp(0.2)}>
          <p>{about.journey}</p>
        </motion.div>
      </section>

      {/* ─── Engineering Philosophy ─── */}
      <section className="about-section">
        <motion.h2 className="about-section__title about-section__title--centered" {...fadeUp(0.1)}>
          Engineering Philosophy
        </motion.h2>
        <div className="philosophy-grid">
          {about.philosophy.map((p, i) => (
            <motion.div 
              key={p.principle} 
              className="philosophy-card"
              {...fadeUp(0.1 + (i * 0.1))}
            >
              <div className="philosophy-card__icon">
                {philosophyIcons[i % philosophyIcons.length]}
              </div>
              <h3 className="philosophy-card__title">{p.principle}</h3>
              <p className="philosophy-card__desc">{p.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ─── Career Milestones ─── */}
      <section className="about-section">
        <motion.h2 className="about-section__title about-section__title--centered" {...fadeUp(0.1)}>
          Career Milestones
        </motion.h2>
        <div className="timeline">
          {timeline.map((item, i) => {
            const isLeft = i % 2 === 0
            return (
              <div key={i} className="timeline-item">
                <div className="timeline-dot" />
                
                {/* Visual arrangement based on index */}
                <motion.div 
                  className={`timeline-content ${isLeft ? 'timeline-content--left' : 'timeline-content--right'}`}
                  initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  style={{ order: isLeft ? 1 : 3 }}
                >
                  <span className="timeline-year">{item.year}</span>
                  <h3 className="timeline-role">{item.role}</h3>
                  <p className="timeline-org">{item.organization}</p>
                </motion.div>

                <div style={{ width: '45%', order: isLeft ? 3 : 1 }}>
                   <motion.div 
                    {...fadeUp(0.2)}
                    className="timeline-note"
                    style={{ textAlign: isLeft ? 'left' : 'right' }}
                   >
                     {item.note || "Spearheaded key initiatives and technical architectural decisions."}
                   </motion.div>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* ─── Beyond the Screen ─── */}
      <section className="about-section">
        <motion.h2 className="about-section__title about-section__title--centered" {...fadeUp(0.1)}>
          Beyond the Screen
        </motion.h2>
        <p className="about-beyond__desc">
          When I'm not architecting systems, you can find me exploring the outdoors or diving into my creative hobbies.
        </p>
        <div className="beyond-gallery">
          {hobbyImages.map((hobby, i) => (
            <motion.div 
              key={i} 
              className="beyond-card"
              {...fadeUp(0.1 + (i * 0.1))}
            >
              <img src={hobby.src} alt={hobby.title} className="beyond-card__img" />
              <div className="beyond-card__overlay">
                <span className="beyond-card__title">{hobby.title}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="about-cta">
        <motion.h2 className="about-cta__title" {...fadeUp(0.1)}>
          Let's build something together.
        </motion.h2>
        <motion.p className="about-cta__desc" {...fadeUp(0.2)}>
          Currently open to new opportunities and interesting collaborations. Feel free to reach out for a chat about your next project.
        </motion.p>
        <motion.div className="about-cta__buttons" {...fadeUp(0.3)}>
          <a href="/contact" className="btn btn-primary">
            Get in Touch <ArrowRight size={16} />
          </a>
          <a href="#" className="btn btn-secondary">
            View Full Resume <FileText size={16} />
          </a>
        </motion.div>
      </section>
    </div>
  )
}
