export interface Personal {
  name: string;
  title: string;
  tagline: string;
  bio: string;
  location: string;
  email: string;
  website: string;
  github: string;
  linkedin: string;
  twitter: string;
  dribbble: string;
  availability: string;
  hobbies: string[];
}

export interface Stats {
  years_of_experience: string;
  projects_completed: string;
  happy_clients: string;
  lines_of_code: string;
}

export interface Principle {
  principle: string;
  description: string;
}

export interface About {
  journey: string;
  philosophy: Principle[];
}

export interface Timeline {
  year: string;
  role: string;
  organization: string;
  note?: string;
}

export interface Experience {
  title: string;
  company: string;
  period: string;
  highlights: string[];
}

export interface Education {
  degree: string;
  institution: string;
  period: string;
  specialization?: string;
  note?: string;
}

export interface SkillItem {
  name: string;
  proficiency: number;
}

export interface Competency {
  name: string;
  description: string;
}

export interface Skills {
  core_competencies: Competency[];
  frontend: SkillItem[];
  backend: SkillItem[];
  devops_tooling: string[];
  languages: string[];
  soft_skills: string[];
}

export interface Certification {
  name: string;
  level: string;
  year: string;
}

export interface Honor {
  title: string;
  detail: string;
}

export interface SpokenLang {
  language: string;
  level: string;
  proficiency: number;
}

export interface Project {
  name: string;
  description: string;
  category: string;
  technologies: string[];
  image: string;
}

export interface Contact {
  email: string;
  linkedin: string;
  github: string;
  location: string;
  form_subjects: string[];
}

export interface Portfolio {
  personal: Personal;
  stats: Stats;
  about: About;
  timeline: Timeline[];
  experience: Experience[];
  education: Education[];
  skills: Skills;
  certifications: Certification[];
  honors: Honor[];
  spoken_languages: SpokenLang[];
  projects: Project[];
  tech_stack: string[];
  contact: Contact;
}
