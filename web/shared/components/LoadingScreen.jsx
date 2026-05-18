import { useEffect, useState } from 'react'

export default function LoadingScreen() {
  const [pct, setPct] = useState(8)

  useEffect(() => {
    const t = setInterval(() => {
      setPct((p) => {
        if (p >= 96) return 96
        return p + Math.random() * 12
      })
    }, 180)
    return () => clearInterval(t)
  }, [])

  return (
    <div
      className="fixed inset-0 flex flex-col items-center justify-center z-50"
      style={{ background: '#faf8f3', color: '#1a1612' }}
    >
      {/* Soft warm radial backdrop */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 50% 40%, rgba(16,185,129,0.08), transparent 55%)',
        }}
      />

      {/* Content */}
      <div className="relative flex flex-col items-center max-w-md text-center px-6">
        {/* Eyebrow */}
        <div
          className="flex items-center gap-3 mb-10 opacity-0"
          style={{ animation: 'editorialFadeUp 0.7s cubic-bezier(0.22, 1, 0.36, 1) 0.05s forwards' }}
        >
          <span className="rule rule-grow" />
          <span className="eyebrow">A moment please</span>
        </div>

        {/* Serif wordmark */}
        <h1
          className="opacity-0"
          style={{
            fontFamily: '"Cormorant Garamond", Georgia, serif',
            fontWeight: 500,
            fontSize: 64,
            letterSpacing: '-0.01em',
            lineHeight: 1,
            animation: 'editorialFadeUp 0.7s cubic-bezier(0.22, 1, 0.36, 1) 0.15s forwards',
          }}
        >
          CodeReview{' '}
          <span
            style={{
              fontStyle: 'italic',
              fontWeight: 400,
              color: '#10b981',
            }}
          >
            AI
          </span>
        </h1>

        {/* Italic subhead */}
        <p
          className="opacity-0 mt-6 text-[16px] leading-[1.6]"
          style={{
            color: '#56524a',
            animation: 'editorialFadeUp 0.7s cubic-bezier(0.22, 1, 0.36, 1) 0.3s forwards',
          }}
        >
          Loading your <em style={{ color: '#10b981', fontFamily: '"Cormorant Garamond", Georgia, serif', fontStyle: 'italic', fontWeight: 500, fontSize: 18 }}>workspace</em>
        </p>

        {/* Slow filling progress rule */}
        <div
          className="opacity-0 mt-10 relative"
          style={{
            width: 220,
            height: 1,
            background: '#e8e4da',
            animation: 'editorialFadeUp 0.7s cubic-bezier(0.22, 1, 0.36, 1) 0.45s forwards',
          }}
        >
          <div
            className="absolute left-0 top-0 h-full"
            style={{
              width: `${Math.min(pct, 96)}%`,
              background: '#10b981',
              transition: 'width 600ms cubic-bezier(0.22, 1, 0.36, 1)',
            }}
          />
        </div>

        {/* Animated 3-dot indicator */}
        <div
          className="opacity-0 mt-8 flex items-center gap-2"
          style={{ animation: 'editorialFadeUp 0.7s cubic-bezier(0.22, 1, 0.36, 1) 0.6s forwards' }}
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="block rounded-full"
              style={{
                width: 4,
                height: 4,
                background: '#10b981',
                opacity: 0.4,
                animation: `dotBlink 1.4s ease-in-out ${i * 0.2}s infinite`,
              }}
            />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes dotBlink {
          0%, 100% { opacity: 0.25; transform: scale(0.8); }
          50%      { opacity: 1;    transform: scale(1.1); }
        }
      `}</style>
    </div>
  )
}
