import { Github, Linkedin, Twitter, Dribbble } from 'lucide-react'

interface FooterProps {
  name: string;
  github: string;
  linkedin: string;
  twitter: string;
  dribbble: string;
}

export default function Footer({ name, github, linkedin, twitter, dribbble }: FooterProps) {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="container">

        <div className="footer__bottom">
          <p>© {year} {name}Dev. Built with passion and precision.</p>
          <div className="footer__bottom-socials">
            {github && <a href={github} target="_blank" rel="noopener noreferrer" className="footer__social-link"><Github size={18} /></a>}
            {linkedin && <a href={linkedin} target="_blank" rel="noopener noreferrer" className="footer__social-link"><Linkedin size={18} /></a>}
            {twitter && <a href={twitter} target="_blank" rel="noopener noreferrer" className="footer__social-link"><Twitter size={18} /></a>}
            {dribbble && <a href={dribbble} target="_blank" rel="noopener noreferrer" className="footer__social-link"><Dribbble size={18} /></a>}
          </div>
        </div>
      </div>
    </footer>
  )
}
