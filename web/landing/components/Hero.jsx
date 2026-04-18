import { useNavigate } from 'react-router-dom'
import { ArrowRight, Github, Sparkles, Shield, Zap, CheckCircle, Star } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'

const typewriterWords = ['Pull Requests', 'Code Quality', 'Security Bugs', 'Performance', 'Best Practices']

function useTypewriter(words, typingSpeed = 100, deletingSpeed = 60, pauseTime = 2000) {
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
      setWordIndex((prev) => (prev + 1) % words.length)
    } else {
      timeout = setTimeout(() => {
        setText(currentWord.substring(0, isDeleting ? text.length - 1 : text.length + 1))
      }, isDeleting ? deletingSpeed : typingSpeed)
    }

    return () => clearTimeout(timeout)
  }, [text, isDeleting, wordIndex, words, typingSpeed, deletingSpeed, pauseTime])

  return text
}

function useAnimatedCounter(target, duration = 2000, startOnMount = true) {
  const [value, setValue] = useState(0)
  const ref = useRef(null)

  useEffect(() => {
    if (!startOnMount) return
    const start = performance.now()
    const numericTarget = typeof target === 'number' ? target : parseFloat(target) || 0

    let frame
    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Math.floor(numericTarget * eased))
      if (progress < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [target, duration, startOnMount])

  return { value, ref }
}

function StatCard({ targetValue, suffix = '', label, delay = 0, startOnMount }) {
  const { value } = useAnimatedCounter(targetValue, 2200, startOnMount)
  return (
    <div
      className="relative p-5 rounded-2xl bg-gradient-to-br from-surface-800/40 to-surface-900/40 border border-surface-700/40 hover:border-brand-500/40 backdrop-blur-sm transition-all duration-500 group overflow-hidden"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="absolute -inset-1 bg-gradient-to-r from-brand-500/0 via-brand-500/10 to-cyan-500/0 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />
      <div className="relative">
        <div className="text-2xl md:text-3xl font-bold gradient-text mb-1 tabular-nums">
          {value.toLocaleString()}{suffix}
        </div>
        <p className="text-surface-500 text-xs md:text-sm font-medium">{label}</p>
      </div>
    </div>
  )
}

export default function Hero() {
  const navigate = useNavigate()
  const typedText = useTypewriter(typewriterWords)
  const [mounted, setMounted] = useState(false)
  const heroRef = useRef(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Mouse-tracking spotlight
  useEffect(() => {
    const hero = heroRef.current
    if (!hero) return
    const handleMove = (e) => {
      const rect = hero.getBoundingClientRect()
      const x = ((e.clientX - rect.left) / rect.width) * 100
      const y = ((e.clientY - rect.top) / rect.height) * 100
      hero.style.setProperty('--mouse-x', `${x}%`)
      hero.style.setProperty('--mouse-y', `${y}%`)
    }
    hero.addEventListener('mousemove', handleMove)
    return () => hero.removeEventListener('mousemove', handleMove)
  }, [])

  const handleGithubConnect = () => navigate('/login')

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative overflow-hidden pt-28 lg:pt-36 pb-20 lg:pb-32"
    >
      {/* Aurora gradient */}
      <div className="aurora" />

      {/* Mouse spotlight */}
      <div className="spotlight" />

      {/* Noise texture */}
      <div className="noise" />

      {/* Animated glow orbs */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[900px] h-[700px] bg-brand-500/[0.08] rounded-full blur-[140px] animate-pulse pointer-events-none"
        style={{ animationDuration: '4s' }}
      />
      <div
        className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-cyan-500/[0.05] rounded-full blur-[120px] animate-pulse pointer-events-none"
        style={{ animationDuration: '6s', animationDelay: '1s' }}
      />
      <div
        className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-violet-500/[0.05] rounded-full blur-[100px] animate-pulse pointer-events-none"
        style={{ animationDuration: '5s', animationDelay: '2s' }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Badge with glow ring */}
          <div
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-brand-500/10 border border-brand-500/30 mb-8 backdrop-blur-sm transition-all duration-700 ${
              mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-500" />
            </span>
            <span className="text-sm text-brand-300 font-medium">Now in Public Beta — Try for Free</span>
            <Sparkles size={12} className="text-brand-400" />
          </div>

          {/* Main heading */}
          <h1
            className={`text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-extrabold text-white mb-4 leading-[1.05] tracking-tight transition-all duration-700 delay-100 ${
              mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            AI-Powered{' '}
            <span className="gradient-flow inline-block">Code Reviews</span>
          </h1>

          {/* Typewriter */}
          <div
            className={`text-2xl sm:text-3xl md:text-4xl font-bold text-surface-400 mb-6 h-12 transition-all duration-700 delay-200 ${
              mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            <span>for </span>
            <span className="gradient-text">{typedText}</span>
            <span className="typewriter-cursor" />
          </div>

          {/* Subheading */}
          <p
            className={`text-base md:text-lg text-surface-400 max-w-2xl mx-auto mb-10 leading-relaxed transition-all duration-700 delay-300 ${
              mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            Automatically review pull requests, detect bugs, and ship better code
            with AI that understands your codebase.{' '}
            <span className="text-surface-200 font-medium">Get started in 30 seconds.</span>
          </p>

          {/* CTA Buttons */}
          <div
            className={`flex flex-col sm:flex-row gap-4 justify-center mb-10 transition-all duration-700 delay-[400ms] ${
              mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            <button
              onClick={handleGithubConnect}
              className="shimmer-btn group btn-primary text-base px-8 py-4 shadow-glow hover:shadow-glow-lg"
            >
              <Github size={20} />
              Connect GitHub
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={handleGithubConnect}
              className="btn-ghost text-base px-8 py-4 group backdrop-blur-sm"
            >
              <Sparkles size={18} className="group-hover:rotate-12 transition-transform" />
              View Live Demo
            </button>
          </div>

          {/* Social proof */}
          <div
            className={`flex items-center justify-center gap-3 mb-12 transition-all duration-700 delay-[500ms] ${
              mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            <div className="flex -space-x-2">
              {['from-brand-500 to-cyan-500', 'from-violet-500 to-pink-500', 'from-amber-500 to-red-500', 'from-blue-500 to-indigo-500', 'from-emerald-500 to-teal-500'].map((c, i) => (
                <div
                  key={i}
                  className={`w-8 h-8 rounded-full bg-gradient-to-br ${c} border-2 border-surface-950`}
                />
              ))}
            </div>
            <div className="text-left">
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={12} className="text-amber-400 fill-amber-400" />
                ))}
              </div>
              <p className="text-surface-400 text-xs mt-0.5">
                <span className="text-white font-semibold">500+ teams</span> trust CodeReview AI
              </p>
            </div>
          </div>

          {/* Stats with animated counters */}
          <div
            className={`grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto mb-16 transition-all duration-700 delay-[600ms] ${
              mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            <StatCard targetValue={10000} suffix="+" label="PRs Reviewed" startOnMount={mounted} />
            <StatCard targetValue={98} suffix="%" label="Accuracy Rate" startOnMount={mounted} />
            <StatCard targetValue={2000000} suffix="+" label="Issues Found" startOnMount={mounted} />
            <StatCard targetValue={500} suffix="+" label="Teams Active" startOnMount={mounted} />
          </div>

          {/* Code preview mockup */}
          <div
            className={`max-w-4xl mx-auto transition-all duration-1000 delay-[700ms] ${
              mounted ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'
            }`}
          >
            <div className="glow-border rounded-2xl">
              <div className="glass-card overflow-hidden rounded-2xl">
                {/* Window chrome */}
                <div className="flex items-center gap-2 px-4 py-3 bg-surface-900/90 border-b border-surface-700/50">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/80 hover:bg-red-500 transition-colors" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80 hover:bg-yellow-500 transition-colors" />
                    <div className="w-3 h-3 rounded-full bg-green-500/80 hover:bg-green-500 transition-colors" />
                  </div>
                  <div className="flex-1 text-center">
                    <span className="text-xs text-surface-500 font-mono">
                      PR #234 — auth-service / authenticate.ts
                    </span>
                  </div>
                  <span className="badge-success text-[10px] py-0.5 px-2">
                    <CheckCircle size={10} />
                    AI Reviewed
                  </span>
                </div>

                {/* Code content */}
                <div className="p-4 md:p-6 font-mono text-xs md:text-sm leading-relaxed text-left overflow-x-auto">
                  {[
                    { type: 'remove', line: 12, content: 'async function login(email, password) {' },
                    { type: 'add', line: 12, content: 'async function authenticate(email: string, password: string) {' },
                    { type: 'neutral', line: 13, content: '  const user = await db.findUser(email)' },
                    { type: 'add', line: 14, content: '  await logAuthAttempt(email, \'attempt\')' },
                    { type: 'neutral', line: 15, content: '  if (!user) throw new AuthError(\'User not found\')' },
                    { type: 'add', line: 16, content: '  const isValid = await verifyPassword(password, user.hash)' },
                    { type: 'neutral', line: 17, content: '  return generateToken(user)' },
                    { type: 'neutral', line: 18, content: '}' },
                  ].map((line, idx) => (
                    <div
                      key={idx}
                      className={`stagger-item px-3 py-0.5 rounded-sm ${
                        line.type === 'add' ? 'code-line-add' :
                        line.type === 'remove' ? 'code-line-remove' :
                        'code-line-neutral'
                      }`}
                      style={{ animationDelay: `${800 + idx * 100}ms` }}
                    >
                      <span className="text-surface-600 select-none inline-block w-8 text-right mr-3">{line.line}</span>
                      <span className="select-none mr-2 inline-block w-3 text-center">
                        {line.type === 'add' ? '+' : line.type === 'remove' ? '−' : ' '}
                      </span>
                      {line.content}
                    </div>
                  ))}

                  {/* AI comment */}
                  <div
                    className="stagger-item mt-4 p-3 rounded-xl bg-brand-500/10 border border-brand-500/20 relative overflow-hidden"
                    style={{ animationDelay: '1600ms' }}
                  >
                    <div className="absolute -inset-1 bg-gradient-to-r from-brand-500/20 to-cyan-500/20 blur-xl" />
                    <div className="relative">
                      <div className="flex items-center gap-2 mb-1.5">
                        <div className="w-5 h-5 bg-gradient-to-r from-brand-500 to-cyan-500 rounded-md flex items-center justify-center">
                          <Sparkles size={10} className="text-white" />
                        </div>
                        <span className="text-brand-400 text-xs font-semibold">AI Suggestion — Security</span>
                      </div>
                      <p className="text-surface-400 text-xs leading-relaxed">
                        Consider adding rate limiting on authentication attempts to prevent brute-force attacks.
                        Use <code className="text-brand-300 bg-brand-500/10 px-1 rounded">express-rate-limit</code> with a 5 request/min window.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Trust pill row */}
          <div
            className={`flex flex-wrap justify-center gap-x-8 gap-y-4 mt-14 transition-all duration-700 delay-[900ms] ${
              mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            {[
              { icon: Shield, text: 'SOC2 Compliant' },
              { icon: Zap, text: 'Reviews in <30s' },
              { icon: Github, text: 'GitHub Native' },
              { icon: CheckCircle, text: 'Free to Start' },
            ].map(({ icon: Icon, text }, i) => (
              <div
                key={i}
                className="flex items-center gap-2 text-surface-500 hover:text-surface-200 transition-colors cursor-default group"
              >
                <Icon
                  size={15}
                  className="text-brand-500 group-hover:scale-110 transition-transform"
                />
                <span className="text-xs sm:text-sm font-medium">{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
