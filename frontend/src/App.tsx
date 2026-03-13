import { Routes, Route } from 'react-router-dom'
import { PortfolioProvider } from './context/PortfolioContext'
import PortfolioLayout from './pages/portfolio/PortfolioLayout'
import Home from './pages/portfolio/Home'
import AboutPage from './pages/portfolio/AboutPage'
import ExperiencePage from './pages/portfolio/ExperiencePage'
import SkillsPage from './pages/portfolio/SkillsPage'
import ProjectsPage from './pages/portfolio/ProjectsPage'
import ContactPage from './pages/portfolio/ContactPage'

import AdminLayout from './pages/admin/AdminLayout'
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminPersonal from './pages/admin/sections/AdminPersonal'
import AdminStats from './pages/admin/sections/AdminStats'
import AdminAbout from './pages/admin/sections/AdminAbout'
import AdminProjects from './pages/admin/sections/AdminProjects'
import AdminExperience from './pages/admin/sections/AdminExperience'
import AdminTimeline from './pages/admin/sections/AdminTimeline'
import AdminSkills from './pages/admin/sections/AdminSkills'
import AdminContact from './pages/admin/sections/AdminContact'
import AdminMessages from './pages/admin/sections/AdminMessages'
import AdminEducation from './pages/admin/sections/AdminEducation'
import AdminCertifications from './pages/admin/sections/AdminCertifications'
import AdminHonors from './pages/admin/sections/AdminHonors'
import AdminSpokenLanguages from './pages/admin/sections/AdminSpokenLanguages'
import AdminTechStack from './pages/admin/sections/AdminTechStack'

export default function App() {
  return (
    <PortfolioProvider>
      <Routes>
        <Route path="/" element={<PortfolioLayout />}>
          <Route index element={<Home />} />
          <Route path="about"      element={<AboutPage />} />
          <Route path="experience" element={<ExperiencePage />} />
          <Route path="skills"     element={<SkillsPage />} />
          <Route path="projects"   element={<ProjectsPage />} />
          <Route path="contact"    element={<ContactPage />} />
        </Route>

        <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />
        <Route path="personal"   element={<AdminPersonal />} />
        <Route path="stats"      element={<AdminStats />} />
        <Route path="about"      element={<AdminAbout />} />
        <Route path="projects"   element={<AdminProjects />} />
        <Route path="experience" element={<AdminExperience />} />
        <Route path="timeline"   element={<AdminTimeline />} />
        <Route path="skills"     element={<AdminSkills />} />
        <Route path="contact"    element={<AdminContact />} />
        <Route path="messages"   element={<AdminMessages />} />
        <Route path="education"  element={<AdminEducation />} />
        <Route path="certs"      element={<AdminCertifications />} />
        <Route path="honors"     element={<AdminHonors />} />
        <Route path="languages"  element={<AdminSpokenLanguages />} />
        <Route path="techstack"  element={<AdminTechStack />} />
      </Route>
      </Routes>
    </PortfolioProvider>
  )
}
