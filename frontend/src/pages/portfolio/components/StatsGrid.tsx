import { motion } from 'framer-motion'
import type { Stats } from '../../../types'

export default function StatsGrid({ stats }: { stats: Stats }) {
  const items = [
    { label: 'Years of Experience', value: stats.years_of_experience },
    { label: 'Projects Completed',  value: stats.projects_completed },
    { label: 'Happy Clients',       value: stats.happy_clients },
    { label: 'Lines of Code',       value: stats.lines_of_code },
  ]

  return (
    <section className="section container">
      <div className="stats-grid">
        {items.map((item, i) => (
          <motion.div 
            key={item.label}
            className="stat-box"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
          >
            <span className="stat-box__value text-gradient">{item.value}</span>
            <span className="stat-box__label">{item.label}</span>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
