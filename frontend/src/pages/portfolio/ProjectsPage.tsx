import { useState, useMemo, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { usePortfolio } from '../../context/PortfolioContext'
import { ExternalLink, Search, ChevronDown, Rocket } from 'lucide-react'
import './ProjectsPage.css'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, delay, ease: "easeOut" as any }
})

export default function Projects() {
  const { data } = usePortfolio()
  const [activeCategory, setActiveCategory] = useState('All Projects')
  const [searchQuery, setSearchQuery] = useState('')
  const [visibleCount, setVisibleCount] = useState(4)

  useEffect(() => {
    setVisibleCount(4)
  }, [activeCategory, searchQuery])

  if (!data) return null

  const categories = ['All Projects', 'Full Stack', 'Distributed Systems', 'Mobile', 'AI/ML']

  const filteredProjects = useMemo(() => {
    return data.projects.filter(project => {
      const matchesCategory = activeCategory === 'All Projects' || project.category === activeCategory
      const matchesSearch = project.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           project.technologies.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
      return matchesCategory && matchesSearch
    })
  }, [data.projects, activeCategory, searchQuery])

  const displayedProjects = useMemo(() => {
    return filteredProjects.slice(0, visibleCount)
  }, [filteredProjects, visibleCount])

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 4)
  }

  return (
    <div className="projects-page container">
      {/* ─── Header ─── */}
      <header className="projects-header">
        <motion.h1 className="projects-title" {...fadeUp(0.1)}>
          Featured Engineering <span className="text-gradient">Projects</span>
        </motion.h1>
        <motion.p className="projects-desc" {...fadeUp(0.2)}>
          A selection of software architectures, full-stack applications, and open-source 
          contributions. I focus on building scalable, maintainable, and efficient solutions 
          for complex problems.
        </motion.p>
      </header>

      {/* ─── Controls ─── */}
      <motion.div className="projects-controls" {...fadeUp(0.3)}>
        <div className="filter-group">
          {categories.map(cat => (
            <button 
              key={cat}
              className={`filter-btn ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="search-wrapper">
          <Search className="search-icon" size={18} />
          <input 
            type="text" 
            placeholder="Search technologies..." 
            className="search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </motion.div>

      {/* ─── Grid ─── */}
      <motion.div className="projects-grid">
        <AnimatePresence mode="popLayout" initial={false}>
          {displayedProjects.map((project) => (
            <motion.div 
              key={project.name}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ 
                duration: 0.3,
                layout: { duration: 0.3, ease: "easeOut" }
              }}
              className="project-card"
            >
              <div className="project-img-wrapper">
                <img src={project.image} alt={project.name} className="project-img" />
              </div>
              <div className="project-content">
                <div className="project-header">
                  <h3 className="project-name">{project.name}</h3>
                  <a href="#" className="project-link">
                    <ExternalLink size={20} />
                  </a>
                </div>
                <p className="project-description">{project.description}</p>
                <div className="project-tags">
                  {project.technologies.map(tech => (
                    <span key={tech} className="project-tag">{tech}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* ─── Load More / Show Less ─── */}
      {filteredProjects.length > 4 && (
        <motion.div className="load-more-wrapper" {...fadeUp(0.1)}>
          {visibleCount < filteredProjects.length ? (
            <button className="btn-load-more" onClick={handleLoadMore}>
              Load More Projects <ChevronDown size={18} />
            </button>
          ) : (
            <button className="btn-load-more" onClick={() => setVisibleCount(4)}>
              Show Less Projects <ChevronDown size={18} style={{ transform: 'rotate(180deg)' }} />
            </button>
          )}
        </motion.div>
      )}

      {filteredProjects.length === 0 && (
        <div style={{ textAlign: 'center', padding: '100px 0', color: 'var(--text-muted)' }}>
          <Rocket size={48} style={{ marginBottom: '20px', opacity: 0.5 }} />
          <p>No projects found matching your criteria.</p>
        </div>
      )}
    </div>
  )
}
