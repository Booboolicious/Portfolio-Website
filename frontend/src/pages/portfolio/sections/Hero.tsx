import { motion } from 'framer-motion'
import { ArrowRight, Download, Github, Monitor, Globe } from 'lucide-react'
import type { Personal } from '../../../types'
import MockTerminal from '../components/MockTerminal'
import './Hero.css'

interface Props { personal: Personal }

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 32 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.4, 0, 0.2, 1] as any },
})

export default function Hero({ personal }: Props) {
  return (
    <section id="hero" className="hero">
      <div className="grid-bg" />
      
      <div className="container hero__inner">
        <div className="hero__content">
          <motion.div {...fadeUp(0.1)}>
            <span className="hero__badge">
              <span className="glow-dot" />
              {personal.availability}
            </span>
          </motion.div>

          <motion.h1 className="hero__title mono" {...fadeUp(0.2)}>
            Building Scalable <br />
            <span className="text-gradient">Solutions</span> through <br />
            Elegant Code.
          </motion.h1>

          <motion.p className="hero__bio" {...fadeUp(0.3)}>
            {personal.title} specializing in high-performance web applications and distributed systems. 
            Crafting digital experiences that matter.
          </motion.p>

          <motion.div className="hero__ctas" {...fadeUp(0.4)}>
            <a href="/projects" className="btn btn-primary">
              View My Work <ArrowRight size={15} />
            </a>
            <a href="#" className="btn btn-secondary">
              Download Resume <Download size={15} />
            </a>
          </motion.div>

          <motion.div className="hero__social-row" {...fadeUp(0.5)}>
            <a href="#" className="hero__social-mini"><Github size={18} /></a>
            <a href="#" className="hero__social-mini"><Monitor size={18} /></a>
            <a href="#" className="hero__social-mini"><Globe size={18} /></a>
          </motion.div>
        </div>

        <div className="hero__visual">
          <MockTerminal personal={personal} />
        </div>
      </div>
    </section>
  )
}
