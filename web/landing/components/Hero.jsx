import { useNavigate } from 'react-router-dom'
import { ArrowRight, Sparkles } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

/* ─── A magazine-style typewriter that swaps italic accent words ──── */
const typewriterWords = ['Pull Requests', 'Code Quality', 'Security', 'Performance', 'Best Practices']

function useTypewriter(words, typingSpeed = 90, deletingSpeed = 50, pauseTime = 2200) {
  const [text, setText] = useState('')
  const [wordIndex, setWordIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const currentWord = words[wordIndex]
    let timeout
    if (!isDeleting && text === currentWord) {
      timeout = setTimeout(() => setIsDeleting(true), pauseTime)
    } else if (isDeleting && text === '') {
      setIsDeleting(false)
      setWordIndex((p) => (p + 1) % words.length)
    } else {
      timeout = setTimeout(
        () => setText(currentWord.substring(0, isDeleting ? text.length - 1 : text.length + 1)),
        isDeleting ? deletingSpeed : typingSpeed
      )
    }
    return () => clearTimeout(timeout)
  }, [text, isDeleting, wordIndex, words, typingSpeed, deletingSpeed, pauseTime])

  return text
}

/* ─── Animated stat counter, eases to target on mount ─────────────── */
function useAnimatedCounter(target, duration = 2200) {
  const [v, setV] = useState(0)
  useEffect(() => {
    const start = performance.now()
    let raf
    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      setV(Math.floor(target * eased))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [target, duration])
  return v
}

function Stat({ value, suffix = '', label }) {
  const n = useAnimatedCounter(value)
  return (
    <div>
      <div className="display text-[42px] md:text-[56px] leading-none tabular-nums">
        {n.toLocaleString()}
        <span className="display-italic text-[36px] md:text-[48px]" style={{ color: '#10b981' }}>
          {suffix}
        </span>
      </div>
      <div className="eyebrow mt-3">{label}</div>
    </div>
  )
}

export default function Hero() {
  const navigate = useNavigate()
  const typed = useTypewriter(typewriterWords)
  const heroRef = useRef(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  // Subtle parallax on serif heading
  useEffect(() => {
    const el = heroRef.current
    if (!el) return
    const onScroll = () => {
      const y = window.scrollY
      el.style.setProperty('--hero-y', `${y * 0.15}px`)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Warm cursor highlight
  const handleMouseMove = (e) => {
    const el = heroRef.current
    if (!el) return
    const r = el.getBoundingClientRect()
    el.style.setProperty('--mx', `${e.clientX - r.left}px`)
    el.style.setProperty('--my', `${e.clientY - r.top}px`)
  }

  return (
    <section
      id="hero"
      ref={heroRef}
      onMouseMove={handleMouseMove}
      className="relative pt-28 md:pt-36 pb-24 overflow-hidden"
    >
      {/* Warm cursor spotlight */}
      <div className="warm-spot show" />

      {/* Soft cream wash band on the right */}
      <div
        className="absolute top-0 right-0 w-1/2 h-full pointer-events-none"
        style={{ background: 'linear-gradient(180deg, transparent, rgba(244,242,236,0.6))' }}
      />

      <div className="container-editorial relative">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-14 items-start">
          {/* Left column — copy */}
          <div className="lg:col-span-6" style={{ transform: 'translateY(calc(-1 * var(--hero-y, 0px)))' }}>
            <div
              className={`flex items-center gap-3 mb-8 ${mounted ? 'ed-fade-up' : 'opacity-0'}`}
              style={{ animationDelay: '0.05s' }}
            >
              <span className="rule rule-grow" />
              <span className="eyebrow">A new chapter in code review</span>
            </div>

            <h1
              className={`display text-[48px] sm:text-[60px] md:text-[76px] lg:text-[88px] xl:text-[104px] leading-[0.98] tracking-tight ${
                mounted ? 'ed-fade-up' : 'opacity-0'
              }`}
              style={{ animationDelay: '0.15s' }}
            >
              AI&#8209;powered{' '}
              <span className="display-italic" style={{ color: '#10b981' }}>
                code reviews
              </span>
            </h1>

            <div
              className={`mt-8 display text-[28px] md:text-[36px] text-sand-700 ${
                mounted ? 'ed-fade-up' : 'opacity-0'
              }`}
              style={{ animationDelay: '0.3s', color: '#3b3833' }}
            >
              for <span className="display-italic" style={{ color: '#10b981' }}>{typed}</span>
              <span
                className="inline-block w-[2px] h-7 ml-1 align-middle"
                style={{ background: '#10b981', animation: 'blink 1s steps(2) infinite' }}
              />
            </div>

            <p
              className={`mt-10 max-w-xl text-[16px] md:text-[17px] leading-[1.75] ${
                mounted ? 'ed-fade-up' : 'opacity-0'
              }`}
              style={{ animationDelay: '0.45s', color: '#3b3833' }}
            >
              Automatically review pull requests, detect bugs, and ship better code with
              AI that understands your codebase.{' '}
              <span style={{ color: '#1a1612', fontWeight: 500 }}>Get started in 30 seconds.</span>
            </p>

            <div
              className={`mt-12 flex flex-wrap items-center gap-x-10 gap-y-6 ${
                mounted ? 'ed-fade-up' : 'opacity-0'
              }`}
              style={{ animationDelay: '0.55s' }}
            >
              <button onClick={() => navigate('/login')} className="btn-ed">
                Connect GitHub
                <ArrowRight size={14} />
              </button>
              <button onClick={() => navigate('/login')} className="btn-link-ed">
                View live demo
                <span className="arrow">→</span>
              </button>
            </div>

            {/* Stats row */}
            <div
              className={`mt-20 grid grid-cols-3 gap-10 max-w-2xl ${mounted ? 'ed-fade-up' : 'opacity-0'}`}
              style={{ animationDelay: '0.75s' }}
            >
              <Stat value={10000} suffix="+" label="Pull requests reviewed" />
              <Stat value={98} suffix="%" label="Accuracy" />
              <Stat value={500} suffix="+" label="Teams" />
            </div>
          </div>

          {/* Right column — editorial code card */}
          <div
            className={`lg:col-span-6 ${mounted ? 'ed-fade-up' : 'opacity-0'}`}
            style={{ animationDelay: '0.4s' }}
          >
            <div className="relative">
              {/* Floating accent */}
              <div
                className="absolute -top-6 -left-6 w-24 h-24 rounded-full opacity-30"
                style={{ background: 'radial-gradient(circle, #10b981 0%, transparent 70%)' }}
              />

              <div className="ed-card ed-reveal relative overflow-hidden" style={{ background: '#ffffff' }}>
                {/* Card chrome */}
                <div className="flex items-center justify-between px-6 py-4 border-b" style={{ borderColor: '#e8e4da' }}>
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ background: '#10b981' }} />
                    <span className="w-2.5 h-2.5 rounded-full" style={{ background: '#d4cfc1' }} />
                    <span className="w-2.5 h-2.5 rounded-full" style={{ background: '#d4cfc1' }} />
                  </div>
                  <span className="eyebrow text-[11px]">PR #234 · authenticate.ts</span>
                  <span className="inline-flex items-center gap-2 text-[11px]" style={{ color: '#10b981', letterSpacing: '0.18em', textTransform: 'uppercase' }}>
                    <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#10b981', animation: 'pulse 2s infinite' }} />
                    Reviewing
                  </span>
                </div>

                {/* Code diff */}
                <div className="font-mono text-[13.5px] leading-[1.85] p-7 reveal-target">
                  {[
                    { type: 'remove', n: 12, c: 'async function login(email, password) {' },
                    { type: 'add',    n: 12, c: 'async function authenticate(email: string, password: string) {' },
                    { type: 'context',n: 13, c: '  const user = await db.findUser(email)' },
                    { type: 'add',    n: 14, c: "  await logAuthAttempt(email, 'attempt')" },
                    { type: 'context',n: 15, c: "  if (!user) throw new AuthError('User not found')" },
                    { type: 'add',    n: 16, c: '  const ok = await verifyPassword(password, user.hash)' },
                    { type: 'context',n: 17, c: '  return generateToken(user)' },
                    { type: 'context',n: 18, c: '}' },
                  ].map((l, i) => (
                    <div
                      key={i}
                      className="flex gap-3 px-2 py-0.5 rounded-sm"
                      style={{
                        background:
                          l.type === 'add' ? 'rgba(16, 185, 129, 0.08)' :
                          l.type === 'remove' ? 'rgba(220, 38, 38, 0.08)' : 'transparent',
                        color:
                          l.type === 'add' ? '#047857' :
                          l.type === 'remove' ? '#dc2626' : '#3b3833',
                        textDecoration: l.type === 'remove' ? 'line-through' : 'none',
                        opacity: 0,
                        animation: `editorialFadeUp 0.6s cubic-bezier(0.22, 1, 0.36, 1) ${0.5 + i * 0.1}s forwards`,
                      }}
                    >
                      <span style={{ color: '#a39d8c', width: 22, textAlign: 'right' }}>{l.n}</span>
                      <span style={{ width: 14, color: '#a39d8c' }}>
                        {l.type === 'add' ? '+' : l.type === 'remove' ? '−' : ' '}
                      </span>
                      <span className="truncate">{l.c}</span>
                    </div>
                  ))}

                  {/* AI suggestion */}
                  <div
                    className="mt-5 pt-5 border-t flex gap-3"
                    style={{
                      borderColor: '#e8e4da',
                      opacity: 0,
                      animation: 'editorialFadeUp 0.6s cubic-bezier(0.22, 1, 0.36, 1) 1.3s forwards',
                    }}
                  >
                    <Sparkles size={16} style={{ color: '#10b981', marginTop: 3 }} />
                    <div>
                      <div className="eyebrow text-[11px]" style={{ color: '#10b981' }}>Security · suggestion</div>
                      <p className="display-italic text-[19px] mt-2 leading-snug" style={{ color: '#1a1612' }}>
                        Consider rate-limiting authentication attempts to prevent brute-force.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Footer meta strip */}
                <div
                  className="flex items-center justify-between px-6 py-4 border-t"
                  style={{ borderColor: '#e8e4da', background: '#faf8f3' }}
                >
                  <div className="flex items-center gap-4 text-[11px]" style={{ color: '#56524a', letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 600 }}>
                    <span className="inline-flex items-center gap-1.5">
                      <span style={{ color: '#10b981' }}>+3</span>
                      <span className="opacity-60">added</span>
                    </span>
                    <span className="opacity-30">·</span>
                    <span className="inline-flex items-center gap-1.5">
                      <span style={{ color: '#dc2626' }}>−1</span>
                      <span className="opacity-60">removed</span>
                    </span>
                  </div>
                  <div className="flex items-baseline gap-1.5">
                    <span
                      className="page-display tabular-nums"
                      style={{ fontSize: 32, color: '#10b981', lineHeight: 1 }}
                    >
                      92
                    </span>
                    <span
                      className="display-italic"
                      style={{ fontSize: 16, color: '#56524a' }}
                    >
                      / 100
                    </span>
                  </div>
                </div>
              </div>

              {/* Caption under the card, magazine-style */}
              <div className="mt-6 flex items-center gap-3">
                <span className="rule" />
                <span className="eyebrow">Live review · reviewed in 18 seconds</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
