import React, { useRef, useState, useEffect } from 'react'
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
  
  const outerRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)
  const [isOverflowing, setIsOverflowing] = useState(false)

  // Check if content is wider than container to enable marquee
  useEffect(() => {
    const checkOverflow = () => {
      if (!outerRef.current || !innerRef.current) return
      // We check if the natural width of items exceeds the wrapper
      setIsOverflowing(innerRef.current.scrollWidth > outerRef.current.clientWidth)
    }

    checkOverflow()
    window.addEventListener('resize', checkOverflow)
    return () => window.removeEventListener('resize', checkOverflow)
  }, [displayTech])

  // If overflowing, duplicate items to create the infinite loop
  const items = isOverflowing 
    ? [...displayTech, ...displayTech, ...displayTech] 
    : displayTech

  return (
    <section className="tech-bar">
      <p className="tech-bar__title">Trusted Technology Stack</p>
      <div 
        ref={outerRef}
        className={`tech-bar__wrapper ${isOverflowing ? 'tech-bar__marquee-wrapper' : ''}`}
      >
        <div 
          ref={innerRef}
          className={`tech-bar__track ${isOverflowing ? 'tech-bar__track--animating' : 'tech-bar__track--static'}`}
        >
          {items.map((name, i) => (
            <div key={`${name}-${i}`} className="tech-bar__item">
              <div className="tech-bar__icon">
                {ICON_MAP[name] || <Hash size={24} />}
              </div>
              <span className="tech-bar__name">{name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
