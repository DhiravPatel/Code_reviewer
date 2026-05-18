import { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Shield, Github, Sparkles } from 'lucide-react'
import { useAuth } from '../../shared/context/AuthContext'
import GoogleSignInButton from '../components/GoogleSignInButton'

export default function LoginPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { isAuthenticated, loading } = useAuth()
  const [mounted, setMounted] = useState(false)

  const from = location.state?.from?.pathname || '/dashboard/integrations'

  useEffect(() => setMounted(true), [])
  useEffect(() => {
    if (!loading && isAuthenticated) navigate(from, { replace: true })
  }, [isAuthenticated, loading, navigate, from])

  return (
    <div
      className="editorial-shell flex relative"
      style={{
        background: '#faf8f3',
        color: '#1a1612',
        height: '100vh',
        overflow: 'hidden',
      }}
    >
      {/* ════ LEFT: dark animated green-gradient pane ════ */}
      <div className="hidden lg:block relative lg:w-1/2 overflow-hidden">
        {/* Animated dark aurora */}
        <div className="dark-aurora">
          <div className="da-orb" />
        </div>
        {/* Faint grid */}
        <div className="dark-grid" />
        {/* Sweeping scan line */}
        <div className="scan-line" />

        {/* Sparkle dots */}
        <div className="sparkle-dot" style={{ top: '18%', left: '22%', animationDelay: '0s' }} />
        <div className="sparkle-dot" style={{ top: '32%', right: '24%', animationDelay: '1.5s' }} />
        <div className="sparkle-dot" style={{ bottom: '28%', left: '34%', animationDelay: '3s' }} />
        <div className="sparkle-dot" style={{ bottom: '18%', right: '30%', animationDelay: '2s' }} />

        {/* Content */}
        <div className="relative h-full flex flex-col justify-between px-12 xl:px-20 py-14 z-10">
          {/* Top: wordmark */}
          <button
            onClick={() => navigate('/')}
            className="flex items-baseline gap-2 group"
          >
            <span
              className="display text-[24px] tracking-tight"
              style={{ color: '#faf8f3' }}
            >
              CodeReview
            </span>
            <span
              className="display-italic text-[20px]"
              style={{ color: '#34d399' }}
            >
              AI
            </span>
          </button>

          {/* Middle: editorial headline + code specimen */}
          <div
            className={`max-w-xl ${mounted ? 'ed-fade-up' : 'opacity-0'}`}
            style={{ animationDelay: '0.1s' }}
          >
            <div className="flex items-center gap-3 mb-6">
              <span
                className="rule rule-grow"
                style={{ background: '#34d399' }}
              />
              <span className="eyebrow" style={{ color: 'rgba(250,248,243,0.7)' }}>
                Sign in
              </span>
            </div>

            <h2
              className="display text-[44px] xl:text-[60px] leading-[1.02]"
              style={{ color: '#faf8f3' }}
            >
              Ship better code,{' '}
              <span className="display-italic" style={{ color: '#34d399' }}>
                faster.
              </span>
            </h2>

            <p
              className="mt-6 text-[14px] xl:text-[15px] leading-[1.7] max-w-md"
              style={{ color: 'rgba(250,248,243,0.7)' }}
            >
              Join thousands of developers who trust CodeReview AI to catch bugs,
              enforce standards, and accelerate their workflow.
            </p>

            {/* Compact code specimen */}
            <div
              className="mt-10 overflow-hidden"
              style={{
                background: 'rgba(255,255,255,0.03)',
                backdropFilter: 'blur(8px)',
                border: '1px solid rgba(52, 211, 153, 0.2)',
                boxShadow: '0 30px 60px -20px rgba(0,0,0,0.6), 0 0 40px -10px rgba(16,185,129,0.15)',
              }}
            >
              <div
                className="flex items-center justify-between px-4 py-2.5 border-b"
                style={{ borderColor: 'rgba(52,211,153,0.15)' }}
              >
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#34d399' }} />
                  <span className="w-1.5 h-1.5 rounded-full" style={{ background: 'rgba(250,248,243,0.25)' }} />
                  <span className="w-1.5 h-1.5 rounded-full" style={{ background: 'rgba(250,248,243,0.25)' }} />
                </div>
                <span
                  className="eyebrow text-[9px]"
                  style={{ color: 'rgba(250,248,243,0.55)' }}
                >
                  PR #234 · authenticate.ts
                </span>
              </div>
              <div className="font-mono text-[10.5px] leading-[1.85] p-4">
                {[
                  { t: 'remove', n: 12, c: 'async function login(email, password) {' },
                  { t: 'add',    n: 12, c: 'async function authenticate(email, password) {' },
                  { t: 'ctx',    n: 13, c: '  const user = await db.findUser(email)' },
                  { t: 'add',    n: 14, c: "  await logAuthAttempt(email)" },
                ].map((l, i) => (
                  <div
                    key={i}
                    className="flex gap-2 px-2 py-0.5"
                    style={{
                      background:
                        l.t === 'add' ? 'rgba(52, 211, 153, 0.10)' :
                        l.t === 'remove' ? 'rgba(248, 113, 113, 0.12)' : 'transparent',
                      color:
                        l.t === 'add' ? '#34d399' :
                        l.t === 'remove' ? '#f87171' : 'rgba(250,248,243,0.7)',
                      textDecoration: l.t === 'remove' ? 'line-through' : 'none',
                      opacity: 0,
                      animation: `editorialFadeUp 0.6s cubic-bezier(0.22, 1, 0.36, 1) ${0.4 + i * 0.1}s forwards`,
                    }}
                  >
                    <span style={{ color: 'rgba(250,248,243,0.3)', width: 12, textAlign: 'right' }}>{l.n}</span>
                    <span style={{ color: 'rgba(250,248,243,0.3)', width: 10 }}>
                      {l.t === 'add' ? '+' : l.t === 'remove' ? '−' : ' '}
                    </span>
                    <span className="truncate">{l.c}</span>
                  </div>
                ))}

                <div
                  className="mt-3 pt-3 flex gap-2"
                  style={{
                    borderTop: '1px solid rgba(52,211,153,0.15)',
                    opacity: 0,
                    animation: 'editorialFadeUp 0.6s cubic-bezier(0.22, 1, 0.36, 1) 0.9s forwards',
                  }}
                >
                  <Sparkles size={12} style={{ color: '#34d399', marginTop: 2, flexShrink: 0 }} />
                  <p
                    className="display-italic text-[13px] leading-snug"
                    style={{ color: '#faf8f3' }}
                  >
                    Add rate-limiting on authentication attempts.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom: stat strip */}
          <div className="flex items-center gap-8">
            {[
              { v: '10k+', l: 'PRs reviewed' },
              { v: '98%',  l: 'Accuracy' },
              { v: '500+', l: 'Teams' },
            ].map((s, i) => (
              <div
                key={i}
                className={`${mounted ? 'ed-fade-up' : 'opacity-0'}`}
                style={{ animationDelay: `${0.4 + i * 0.1}s` }}
              >
                <div
                  className="display text-[24px] leading-none"
                  style={{ color: '#faf8f3' }}
                >
                  {s.v}
                </div>
                <div
                  className="eyebrow text-[9.5px] mt-2"
                  style={{ color: 'rgba(250,248,243,0.5)' }}
                >
                  {s.l}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ════ RIGHT: cream editorial sign-in ════ */}
      <div className="flex-1 flex items-center justify-center px-6 sm:px-12 relative overflow-y-auto">
        <div
          className={`w-full max-w-md py-10 ${mounted ? 'ed-fade-up' : 'opacity-0'}`}
          style={{ animationDelay: '0.2s' }}
        >
          {/* Wordmark — shown only when left pane is hidden (mobile) */}
          <button
            onClick={() => navigate('/')}
            className="lg:hidden flex items-baseline gap-2 mb-10"
          >
            <span className="display text-[26px] tracking-tight">CodeReview</span>
            <span className="display-italic text-[20px]" style={{ color: '#10b981' }}>
              AI
            </span>
          </button>

          {/* Header */}
          <div className="flex items-center gap-3 mb-5">
            <span className="rule" />
            <span className="eyebrow">Welcome back</span>
          </div>

          <h1 className="display text-[40px] md:text-[48px] leading-[1.03]">
            Sign in to your{' '}
            <span className="display-italic" style={{ color: '#10b981' }}>
              account.
            </span>
          </h1>

          <p
            className="mt-5 text-[14px] leading-[1.7] max-w-sm"
            style={{ color: '#3b3833' }}
          >
            Continue reviewing code with AI. We'll match your account from your provider.
          </p>

          {/* Sign-in panel */}
          <div
            className="mt-8 p-7 ed-card"
            style={{ background: '#ffffff' }}
          >
            <GoogleSignInButton />

            <div className="flex items-center gap-4 my-6">
              <span className="flex-1 h-px" style={{ background: '#e8e4da' }} />
              <span className="eyebrow text-[9.5px]">Secure authentication</span>
              <span className="flex-1 h-px" style={{ background: '#e8e4da' }} />
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Shield size={14} style={{ color: '#10b981', marginTop: 3, flexShrink: 0 }} />
                <div>
                  <p className="text-[12.5px] font-medium" style={{ color: '#1a1612' }}>
                    End-to-end encrypted
                  </p>
                  <p className="text-[11.5px] mt-1 leading-[1.55]" style={{ color: '#56524a' }}>
                    Enterprise-grade encryption protects your code and data.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Github size={14} style={{ color: '#10b981', marginTop: 3, flexShrink: 0 }} />
                <div>
                  <p className="text-[12.5px] font-medium" style={{ color: '#1a1612' }}>
                    GitHub-ready
                  </p>
                  <p className="text-[11.5px] mt-1 leading-[1.55]" style={{ color: '#56524a' }}>
                    Connect your repositories instantly after signing in.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <p
            className="mt-6 text-[11px] leading-[1.7]"
            style={{ color: '#56524a' }}
          >
            By signing in, you agree to our{' '}
            <a
              href="#"
              style={{ color: '#10b981', borderBottom: '1px solid #10b981' }}
            >
              Terms
            </a>{' '}
            and{' '}
            <a
              href="#"
              style={{ color: '#10b981', borderBottom: '1px solid #10b981' }}
            >
              Privacy Policy
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  )
}
