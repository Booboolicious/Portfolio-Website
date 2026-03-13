import { useState, useEffect } from 'react'
import { Outlet, NavLink, Link, useLocation } from 'react-router-dom'
import { 
  BarChart3, User, BookOpen, Briefcase, 
  Layers, FolderKanban, Mail, ChevronRight,
  LogOut, Home, Settings, Clock, GraduationCap, Award, Star, Languages, Hash, Menu, X
} from 'lucide-react'
import './AdminLayout.css'

const MENU_GROUPS = [
  {
    title: 'General',
    items: [
      { icon: BarChart3, label: 'Dashboard',  path: '/admin', end: true },
      { icon: User,        label: 'Personal',   path: '/admin/personal', end: false },
      { icon: Clock,       label: 'Stats',      path: '/admin/stats',    end: false },
      { icon: BookOpen,    label: 'About',      path: '/admin/about',    end: false },
      { icon: Mail,        label: 'Contact',    path: '/admin/contact',  end: false },
      { icon: Mail,        label: 'Messages',   path: '/admin/messages', end: false },
    ]
  },
  {
    title: 'Content',
    items: [
      { icon: Briefcase,   label: 'Experience', path: '/admin/experience', end: false },
      { icon: GraduationCap, label: 'Education',  path: '/admin/education', end: false },
      { icon: Layers,      label: 'Timeline',   path: '/admin/timeline',   end: false },
      { icon: FolderKanban,label: 'Projects',   path: '/admin/projects',   end: false },
    ]
  },
  {
    title: 'Expertise',
    items: [
      { icon: Settings,    label: 'Skills',     path: '/admin/skills',    end: false },
      { icon: Award,       label: 'Certs',      path: '/admin/certs',     end: false },
      { icon: Star,        label: 'Honors',     path: '/admin/honors',    end: false },
      { icon: Languages,   label: 'Languages',  path: '/admin/languages', end: false },
      { icon: Hash,        label: 'Tech Stack', path: '/admin/techstack', end: false },
    ]
  }
]

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setSidebarOpen(false)
  }, [location.pathname])

  return (
    <div className={`admin-layout ${sidebarOpen ? 'admin-layout--sidebar-open' : ''}`}>
      {/* Sidebar Overlay for Mobile */}
      {sidebarOpen && (
        <div 
          className="admin-sidebar-overlay" 
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`admin-sidebar ${sidebarOpen ? 'admin-sidebar--mobile-open' : ''}`}>
        <div className="admin-sidebar__brand">
          <div className="admin-sidebar__logo">
            <Settings size={20} />
          </div>
          <div>
            <h1 className="admin-sidebar__title">Admin Panel</h1>
            <p className="admin-sidebar__subtitle">Portfolio Engine</p>
          </div>
          <button className="admin-sidebar__close" onClick={() => setSidebarOpen(false)}>
            <X size={20} />
          </button>
        </div>

        <nav className="admin-sidebar__nav">
          {MENU_GROUPS.map((group) => (
            <div key={group.title} style={{ marginBottom: '24px' }}>
              <p className="admin-sidebar__label">{group.title}</p>
              {group.items.map((item) => (
                <NavLink 
                  key={item.path} 
                  to={item.path} 
                  end={item.end}
                  className={({ isActive }) => `admin-sidebar__item ${isActive ? 'admin-sidebar__item--active' : ''}`}
                >
                  <item.icon size={18} />
                  <span>{item.label}</span>
                  <ChevronRight size={14} className="admin-sidebar__arrow" />
                </NavLink>
              ))}
            </div>
          ))}
        </nav>

        <div className="admin-sidebar__footer">
          <Link to="/" className="admin-sidebar__item">
            <Home size={18} />
            <span>View Site</span>
          </Link>
          <button className="admin-sidebar__item admin-sidebar__item--logout" style={{ width: '100%', textAlign: 'left' }}>
            <LogOut size={18} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="admin-main">
        <header className="admin-header">
          <div className="admin-header__left">
            <button 
              className="admin-header__burger" 
              onClick={() => setSidebarOpen(true)}
            >
              <Menu size={20} />
            </button>
            <div className="admin-header__breadcrumb">
              <span className="mono" style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                Management Console / {window.location.pathname.split('/').pop() || 'Dashboard'}
              </span>
            </div>
          </div>
          
          <div className="admin-header__actions">
            <div className="admin-header__user">
              <span className="admin-header__dot" />
              <span className="admin-header__status-text">Connected to API</span>
            </div>
          </div>
        </header>

        <section className="admin-content">
          <Outlet />
        </section>
      </main>
    </div>
  )
}
