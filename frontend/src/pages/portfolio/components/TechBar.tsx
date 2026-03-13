import { motion } from 'framer-motion'
import { 
  Hexagon, Layers, Code2, Terminal, 
  Settings, Box, Cloud, Database, 
  Server, Cpu, Infinity, Hash 
} from 'lucide-react'

const ICON_MAP: Record<string, React.ReactNode> = {
  'React': <Hexagon size={24} />,
  'Go': <Layers size={24} />,
  'TypeScript': <Code2 size={24} />,
  'Python': <Terminal size={24} />,
  'Rust': <Settings size={24} />,
  'Docker': <Box size={24} />,
  'AWS': <Cloud size={24} />,
  'Node.js': <Server size={24} />,
  'PostgreSQL': <Database size={24} />,
  'Kubernetes': <Infinity size={24} />,
  'Machine Learning': <Cpu size={24} />
}

export default function TechBar({ tech = [] }: { tech: string[] }) {
  const displayTech = tech.length > 0 ? tech : ['React', 'Go', 'TypeScript', 'Node.js', 'Docker', 'AWS', 'PostgreSQL']

  return (
    <section className="tech-bar container">
      <p className="tech-bar__title">Trusted Technology Stack</p>
      <div className="tech-bar__row">
        {displayTech.map((name, i) => (
          <motion.div 
            key={name}
            className="tech-bar__item"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
          >
            <div className="tech-bar__icon">
              {ICON_MAP[name] || <Hash size={24} />}
            </div>
            <span className="tech-bar__name">{name}</span>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
