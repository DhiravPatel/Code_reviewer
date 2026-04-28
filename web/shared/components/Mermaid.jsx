import { useEffect, useRef, useState } from 'react'
import mermaid from 'mermaid'

let initialized = false

export default function Mermaid({ chart }) {
  const ref = useRef(null)
  const [svg, setSvg] = useState('')
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!initialized) {
      mermaid.initialize({
        startOnLoad: false,
        theme: 'dark',
        securityLevel: 'loose',
        themeVariables: {
          primaryColor: '#10b981',
          primaryTextColor: '#f1f5f9',
          primaryBorderColor: '#10b981',
          lineColor: '#64748b',
          secondaryColor: '#1e293b',
          tertiaryColor: '#0f172a',
          background: '#020617',
          mainBkg: '#1e293b',
          secondBkg: '#334155',
          tertiaryBkg: '#475569',
          fontFamily: 'Inter, system-ui, sans-serif',
        },
      })
      initialized = true
    }

    let cancelled = false

    const render = async () => {
      try {
        setError(null)
        const id = `mermaid-${Math.random().toString(36).slice(2, 9)}`
        const { svg } = await mermaid.render(id, chart)
        if (!cancelled) setSvg(svg)
      } catch (err) {
        if (!cancelled) {
          setError(err.message || 'Failed to render diagram')
          console.error('Mermaid render error:', err)
        }
      }
    }

    if (chart && chart.trim()) render()
    return () => { cancelled = true }
  }, [chart])

  if (error) {
    return (
      <div className="p-4 rounded-xl bg-red-500/5 border border-red-500/20 text-red-400 text-xs font-mono">
        Diagram render failed: {error}
      </div>
    )
  }

  return (
    <div
      ref={ref}
      className="mermaid-container overflow-x-auto p-6 rounded-2xl bg-surface-900/60 border t-border-subtle flex justify-center"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  )
}
