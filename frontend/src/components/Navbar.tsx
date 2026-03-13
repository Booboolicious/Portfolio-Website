import { useState, useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { Menu, X, ArrowUpRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import './Navbar.css'

const NAV_LINKS = [
  { to: '/',           label: 'Home' },
  { to: '/about',      label: 'About' },
  { to: '/experience', label: 'Experience' },
  { to: '/skills',     label: 'Skills' },
  { to: '/projects',   label: 'Projects' },
  { to: '/contact',    label: 'Contact' },
]

export default function Navbar({ name }: { name: string }) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const [hoveredPath, setHoveredPath] = useState<string | null>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setOpen(false)
  }, [location])

  return (
    <>
      <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
        <div className="navbar__inner">
          <NavLink to="/" className="navbar__logo">
            <div className="navbar__logo-box">{name.charAt(0)}</div>
            <span className="mono">
              {name.split(' ')[0]}Dev
            </span>
          </NavLink>

          <nav className="navbar__links" onMouseLeave={() => setHoveredPath(null)}>
            {NAV_LINKS.map(l => (
              <NavLink 
                key={l.to} 
                to={l.to} 
                className={({ isActive }) => `navbar__link ${isActive ? 'navbar__link--active' : ''}`}
                onMouseEnter={() => setHoveredPath(l.to)}
              >
                {l.label}
                {hoveredPath === l.to && (
                  <motion.div 
                    layoutId="nav-bg"
                    className="nav-hover-bg"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'rgba(255, 255, 255, 0.05)',
                      borderRadius: '99px',
                      zIndex: -1
                    }}
                  />
                )}
                {location.pathname === l.to && (
                  <motion.div 
                    layoutId="nav-dot"
                    style={{
                      position: 'absolute',
                      bottom: '2px',
                      left: '50%',
                      translateX: '-50%',
                      width: '4px',
                      height: '4px',
                      borderRadius: '50%',
                      background: 'var(--accent)'
                    }}
                  />
                )}
              </NavLink>
            ))}
          </nav>

          <button 
            className="navbar__burger" 
            onClick={() => setOpen(o => !o)}
            aria-label="Toggle menu"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div 
            className="mobile-overlay"
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
              {NAV_LINKS.map((l, i) => (
                <motion.div
                  key={l.to}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <NavLink 
                    to={l.to} 
                    className={({ isActive }) => `mobile-overlay__link ${isActive ? 'mobile-overlay__link--active' : ''}`}
                  >
                    {l.label}
                    <ArrowUpRight size={24} />
                  </NavLink>
                </motion.div>
              ))}
            </div>
            
            <div style={{ marginTop: 'auto', borderTop: '1px solid var(--border)', paddingTop: '32px' }}>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Social Connections</p>
              <div style={{ display: 'flex', gap: '20px', marginTop: '16px' }}>
                <a href="#" className="btn btn-secondary btn-icon"><ArrowUpRight size={18} /></a>
                <a href="#" className="btn btn-secondary btn-icon"><ArrowUpRight size={18} /></a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
