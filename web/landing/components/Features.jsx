import {
  AlertTriangle, CheckCircle, X, Sparkles,
} from 'lucide-react'
import AnimateIn from '../../shared/components/AnimateIn'
import { useEffect, useRef, useState } from 'react'

const GREEN = '#10b981'
const GREEN_DARK = '#047857'

/* ───── Cell: col-span/row-span live on THIS element (no wrapper) ──── */

function Cell({ children, className = '', delay = 0, dark = false }) {
  const ref = useRef(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setShown(true); obs.disconnect() }
    }, { threshold: 0.1 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const handleMove = (e) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    el.style.setProperty('--mx', `${e.clientX - r.left}px`)
    el.style.setProperty('--my', `${e.clientY - r.top}px`)
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      className={`relative overflow-hidden group ${dark ? '' : 'ed-card'} ${className}`}
      style={{
        background: dark ? '#1a1612' : '#ffffff',
        color: dark ? '#faf8f3' : 'inherit',
        opacity: shown ? 1 : 0,
        transform: shown ? 'translateY(0)' : 'translateY(28px)',
        transition: 'opacity 950ms cubic-bezier(0.22, 1, 0.36, 1), transform 950ms cubic-bezier(0.22, 1, 0.36, 1), box-shadow 550ms cubic-bezier(0.22, 1, 0.36, 1)',
        transitionDelay: `${delay}ms`,
      }}
    >
      {!dark && (
        <div
          className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-editorial"
          style={{
            background: `radial-gradient(600px circle at var(--mx, 50%) var(--my, 50%), rgba(16, 185, 129, 0.06), transparent 50%)`,
          }}
        />
      )}
      {children}
    </div>
  )
}

/* ───── Serif title + body + eyebrow shared inside cells ────────── */

function Meta({ eyebrow, title, italic, body, dark = false }) {
  return (
    <div>
      <div className="flex items-center gap-3 mb-5">
        <span className="rule" />
        <span className="eyebrow" style={dark ? { color: 'rgba(255,255,255,0.7)' } : {}}>
          {eyebrow}
        </span>
      </div>
      <h3
        className="display text-[28px] md:text-[34px] leading-[1.05]"
        style={dark ? { color: '#faf8f3' } : {}}
      >
        {title}{' '}
        {italic && (
          <span className="display-italic" style={{ color: GREEN }}>
            {italic}
          </span>
        )}
      </h3>
      <p
        className="mt-4 text-[14.5px] leading-[1.75] max-w-[44ch]"
        style={{ color: dark ? 'rgba(255,255,255,0.7)' : '#3b3833' }}
      >
        {body}
      </p>
    </div>
  )
}

/* ───── Live diff demo (loops) ─────────────────────────────────── */

function DiffDemo() {
  const lines = [
    { type: 'remove', n: 12, c: 'async function login(email, password) {' },
    { type: 'add',    n: 12, c: 'async function authenticate(email: string, password: string) {' },
    { type: 'context',n: 13, c: '  const user = await db.findUser(email)' },
    { type: 'add',    n: 14, c: "  await logAuthAttempt(email)" },
    { type: 'context',n: 15, c: "  if (!user) throw new AuthError()" },
  ]
  return (
    <div style={{ background: '#ffffff', border: '1px solid #e8e4da' }}>
      <div className="flex items-center justify-between px-4 py-2.5 border-b" style={{ borderColor: '#e8e4da' }}>
        <span className="font-mono text-[10px] tracking-wider" style={{ color: '#797466' }}>authenticate.ts</span>
        <span className="inline-flex items-center gap-1.5 text-[9px]" style={{ color: GREEN, letterSpacing: '0.18em', textTransform: 'uppercase' }}>
          <span className="w-1 h-1 rounded-full" style={{ background: GREEN }} />
          live
        </span>
      </div>
      <div className="font-mono text-[11px] leading-[1.9] p-4">
        {lines.map((l, i) => (
          <div
            key={i}
            className="diff-cycle flex gap-2 px-2 py-0.5"
            style={{
              background:
                l.type === 'add' ? 'rgba(16, 185, 129, 0.08)' :
                l.type === 'remove' ? 'rgba(20, 16, 12, 0.04)' : 'transparent',
              color:
                l.type === 'add' ? GREEN_DARK :
                l.type === 'remove' ? '#797466' : '#3b3833',
              textDecoration: l.type === 'remove' ? 'line-through' : 'none',
              animationDelay: `${i * 0.4}s`,
            }}
          >
            <span style={{ color: '#a39d8c', width: 14, textAlign: 'right' }}>{l.n}</span>
            <span style={{ color: '#a39d8c', width: 10 }}>
              {l.type === 'add' ? '+' : l.type === 'remove' ? '−' : ' '}
            </span>
            <span className="truncate">{l.c}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ───── Security chips ─────────────────────────────────────────── */

function SecurityBadges() {
  const items = [
    { label: 'SQL Injection', state: 'blocked' },
    { label: 'XSS Vector',    state: 'blocked' },
    { label: 'Hardcoded Secret', state: 'detected' },
    { label: 'CSRF Token',    state: 'ok' },
  ]
  return (
    <div className="space-y-2.5">
      {items.map((b, i) => {
        const bad = b.state === 'detected'
        return (
          <div
            key={i}
            className="flex items-center justify-between gap-3 px-4 py-2.5 chip-pulse"
            style={{
              background: '#ffffff',
              border: '1px solid #e8e4da',
              animationDelay: `${i * 0.4}s`,
            }}
          >
            <span className="flex items-center gap-2.5 text-[12px]" style={{ color: '#1a1612' }}>
              {bad
                ? <AlertTriangle size={12} style={{ color: '#b45309' }} />
                : <CheckCircle size={12} style={{ color: GREEN }} />}
              {b.label}
            </span>
            <span
              className="eyebrow text-[9px]"
              style={{ color: bad ? '#b45309' : '#56524a' }}
            >
              {b.state}
            </span>
          </div>
        )
      })}
    </div>
  )
}

/* ───── Bar chart with scroll-trigger ──────────────────────────── */

function MetricsChart() {
  const [shown, setShown] = useState(false)
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setShown(true); obs.disconnect() }
    }, { threshold: 0.4 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  const bars = [0.34, 0.46, 0.55, 0.68, 0.79, 0.92]
  return (
    <div ref={ref}>
      <div className="flex items-end justify-between gap-2 h-28">
        {bars.map((h, i) => (
          <div
            key={i}
            className={`flex-1 ${shown ? 'bar-grow' : 'opacity-0'}`}
            style={{
              height: '100%',
              background: '#1a1612',
              '--bar-h': h,
              animationDelay: `${i * 90}ms`,
            }}
          />
        ))}
      </div>
      <div className="mt-3 flex items-center justify-between">
        <span className="eyebrow text-[10px]">Week 1</span>
        <span className="display-italic text-[16px]" style={{ color: GREEN }}>+127%</span>
        <span className="eyebrow text-[10px]">Week 6</span>
      </div>
    </div>
  )
}

/* ───── Suggestion snippet ─────────────────────────────────────── */

function SuggestionSnippet() {
  return (
    <div className="font-mono text-[11px] leading-[1.9] p-4" style={{ background: '#ffffff', border: '1px solid #e8e4da' }}>
      <div className="flex items-center gap-2" style={{ color: '#797466', textDecoration: 'line-through' }}>
        <X size={11} />
        <span>.filter(x =&gt; x.active === true)</span>
      </div>
      <div className="flex items-center gap-2 mt-1" style={{ color: GREEN_DARK }}>
        <CheckCircle size={11} style={{ color: GREEN }} />
        <span>.filter(x =&gt; x.active)</span>
      </div>
    </div>
  )
}

/* ───── Merge graph ────────────────────────────────────────────── */

function MergeGraph() {
  return (
    <svg viewBox="0 0 220 80" className="w-full h-24">
      <line x1="10" y1="50" x2="210" y2="50" stroke="#d4cfc1" strokeWidth="1.5" strokeDasharray="2 5" />
      <path d="M 30 50 Q 65 12, 110 12 T 190 50" fill="none" stroke={GREEN} strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="30" cy="50" r="4" fill="#1a1612" />
      <circle cx="110" cy="12" r="4" fill={GREEN} />
      <circle cx="190" cy="50" r="4" fill="#1a1612" />
    </svg>
  )
}

/* ───── Enterprise stamps ──────────────────────────────────────── */

function EnterpriseStamps() {
  const stamps = ['SOC 2', 'GDPR', 'E2EE']
  return (
    <div className="grid grid-cols-3 gap-3">
      {stamps.map((s, i) => (
        <div
          key={i}
          className="bob-soft text-center py-4 px-2"
          style={{
            border: '1px solid rgba(250,248,243,0.18)',
            color: '#faf8f3',
            animationDelay: `${i * 0.4}s`,
          }}
        >
          <div className="display text-[20px]">{s}</div>
        </div>
      ))}
    </div>
  )
}

/* ───── Section ────────────────────────────────────────────────── */

export default function Features() {
  return (
    <section id="features" className="section relative" style={{ background: '#f4f2ec' }}>
      <div className="container-editorial">
        {/* Section header */}
        <div className="mb-16 lg:mb-24 max-w-4xl">
          <AnimateIn duration={950}>
            <div className="flex items-center gap-3 mb-6">
              <span className="rule" />
              <span className="eyebrow">Features</span>
            </div>
          </AnimateIn>
          <AnimateIn delay={120} duration={950}>
            <h2 className="display text-[44px] md:text-[72px] lg:text-[88px] leading-[1.02]">
              Everything you need to{' '}
              <span className="display-italic" style={{ color: GREEN }}>
                ship better code
              </span>
            </h2>
          </AnimateIn>
          <AnimateIn delay={240} duration={950}>
            <p className="mt-8 max-w-xl text-[16px] md:text-[17px] leading-[1.75]" style={{ color: '#3b3833' }}>
              A comprehensive suite of AI-powered tools designed for modern engineering teams.
              Quiet, precise, and grounded in the actual diff.
            </p>
          </AnimateIn>
        </div>

        {/* Bento grid — 6 cols on lg with auto rows; col/row spans on outer Cell now */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 lg:auto-rows-[280px] gap-px"
          style={{ background: '#e8e4da' }}
        >
          {/* Auto PR Review — 3 cols × 2 rows (large hero cell) */}
          <Cell className="md:col-span-2 lg:col-span-3 lg:row-span-2 p-8 md:p-10 flex flex-col gap-8" delay={0}>
            <Meta
              eyebrow="Automated review"
              title="Reviewed the"
              italic="moment it opens."
              body="Every pull request is automatically analyzed with our AI engine the moment it's opened — no workflow changes required."
            />
            <div className="mt-auto">
              <DiffDemo />
            </div>
          </Cell>

          {/* Security Warnings — 3 cols */}
          <Cell className="md:col-span-2 lg:col-span-3 p-8 md:p-10 flex gap-8 items-stretch" delay={120}>
            <div className="flex-1 min-w-0">
              <Meta
                eyebrow="Vulnerabilities"
                title="Security"
                italic="warnings."
                body="Detect SQL injections, XSS, CSRF, secret exposure, and insecure patterns before they reach production."
              />
            </div>
            <div className="w-[220px] hidden lg:block self-center flex-shrink-0">
              <SecurityBadges />
            </div>
          </Cell>

          {/* Quality Metrics — 3 cols */}
          <Cell className="md:col-span-2 lg:col-span-3 p-8 md:p-10 flex gap-8 items-stretch" delay={200}>
            <div className="flex-1 min-w-0">
              <Meta
                eyebrow="Trends"
                title="Quality"
                italic="metrics."
                body="Track code quality across your team with real-time dashboards. See where the codebase is improving — and where it isn't."
              />
            </div>
            <div className="w-[220px] hidden lg:flex flex-col justify-end flex-shrink-0">
              <MetricsChart />
            </div>
          </Cell>

          {/* Code Suggestions — 2 cols */}
          <Cell className="md:col-span-1 lg:col-span-2 p-8 md:p-10 flex flex-col gap-6" delay={280}>
            <Meta
              eyebrow="Suggestions"
              title="Drop-in"
              italic="fixes."
              body="Actionable suggestions for performance, patterns, and best practices."
            />
            <div className="mt-auto"><SuggestionSnippet /></div>
          </Cell>

          {/* Smart Merging — 2 cols */}
          <Cell className="md:col-span-1 lg:col-span-2 p-8 md:p-10 flex flex-col gap-6" delay={360}>
            <Meta
              eyebrow="Conflict-free"
              title="Smart"
              italic="merging."
              body="AI-powered conflict detection and resolution to speed up delivery."
            />
            <div className="mt-auto"><MergeGraph /></div>
          </Cell>

          {/* Enterprise — 2 cols, INK CELL */}
          <Cell className="md:col-span-2 lg:col-span-2 p-8 md:p-10 flex flex-col gap-6" delay={440} dark>
            <Meta
              eyebrow="Compliance"
              title="Enterprise"
              italic="security."
              body="SOC 2 compliant with end-to-end encryption. Your code never leaves your infrastructure."
              dark
            />
            <div className="mt-auto"><EnterpriseStamps /></div>
          </Cell>
        </div>
      </div>
    </section>
  )
}
