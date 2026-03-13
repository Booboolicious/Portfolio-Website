import { motion } from 'framer-motion'
import type { Personal } from '../../../types'

export default function MockTerminal({ personal }: { personal: Personal }) {
  return (
    <motion.div 
      className="mock-terminal"
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.4 }}
    >
      <div className="mock-terminal__header">
        <div className="mock-terminal__dot mock-terminal__dot--red" />
        <div className="mock-terminal__dot mock-terminal__dot--yellow" />
        <div className="mock-terminal__dot mock-terminal__dot--green" />
        <span className="mock-terminal__title">portfolio_v2.ts</span>
      </div>
      <div className="mock-terminal__body">
        <pre className="mono">
          <span className="code-keyword">const</span> <span className="code-variable">engineer</span> = {'{'}<br />
          {'  '}name: <span className="code-string">"{personal.name}"</span>,<br />
          {'  '}role: <span className="code-string">"{personal.title}"</span>,<br />
          {'  '}skills: [<span className="code-string">"React"</span>, <span className="code-string">"MySQL"</span>, <span className="code-string">"Go"</span>],<br />
          {'  '}passion: <span className="code-string">"Scalable Systems"</span><br />
          {'}'};<br /><br />
          <span className="code-comment">// Initiating great ideas...</span><br />
          <span className="code-variable">engineer</span>.<span className="code-function">buildFuture</span>();
        </pre>
      </div>
    </motion.div>
  )
}
