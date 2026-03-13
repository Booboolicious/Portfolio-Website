import { motion } from 'framer-motion'
import { Hexagon, Layers, Code2, Terminal, Settings, Box, Cloud } from 'lucide-react'

const TECH = [
  { name: 'React', icon: <Hexagon size={24} /> },
  { name: 'Go', icon: <Layers size={24} /> },
  { name: 'TypeScript', icon: <Code2 size={24} /> },
  { name: 'Python', icon: <Terminal size={24} /> },
  { name: 'Rust', icon: <Settings size={24} /> },
  { name: 'Docker', icon: <Box size={24} /> },
  { name: 'AWS', icon: <Cloud size={24} /> },
]

export default function TechBar() {
  return (
    <section className="tech-bar container">
      <p className="tech-bar__title">Trusted Technology Stack</p>
      <div className="tech-bar__row">
        {TECH.map((t, i) => (
          <motion.div 
            key={t.name}
            className="tech-bar__item"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
          >
            <div className="tech-bar__icon">{t.icon}</div>
            <span className="tech-bar__name">{t.name}</span>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
