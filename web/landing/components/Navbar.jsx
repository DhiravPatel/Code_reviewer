import { useNavigate } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { useState, useEffect } from 'react'

const navItems = [
  { label: 'Features', href: '#features' },
  { label: 'How it works', href: '#how-it-works' },
  { label: 'Testimonials', href: '#testimonials' },
]

const announcements = [
  'Now in Public Beta',
  'Trusted by 500+ engineering teams',
  'Inline AI suggestions on every pull request',
  'Free to start — no credit card required',
]

function LetterStagger({ text }) {
  return (
    <span className="nav-letter">
      {text.split('').map((c, i) => (
        <span key={i} data-char={c === ' ' ? ' ' : c}>
          {c === ' ' ? ' ' : c}
        </span>
      ))}
    </span>
  )
}

export default function Navbar() {
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 16)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleLogin = () => navigate('/login')

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Announcement marquee */}
      <div className="ed-marquee bg-ink text-cream py-2 text-[10.5px]"
           style={{ background: '#1a1612', color: '#faf8f3' }}>
        <div className="ed-marquee__track">
          {[...Array(2)].flatMap((_, dup) =>
            announcements.map((a, i) => (
              <span
                key={`${dup}-${i}`}
                className="inline-flex items-center px-8"
                style={{ letterSpacing: '0.22em', textTransform: 'uppercase', fontWeight: 500 }}
              >
                <span>{a}</span>
                <span className="mx-8 inline-block w-1 h-1 rounded-full bg-primary" style={{ background: '#10b981' }} />
              </span>
            ))
          )}
        </div>
      </div>

      {/* Main nav */}
      <nav
        className={`transition-all duration-500 ease-editorial border-b ${
          scrolled
            ? 'bg-cream/95 backdrop-blur-xl border-sand-200'
            : 'bg-cream/0 border-transparent'
        }`}
        style={scrolled ? { background: 'rgba(250, 248, 243, 0.95)', borderColor: '#e8e4da' } : {}}
      >
        <div className="container-editorial">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <button
              onClick={() => navigate('/')}
              className="flex items-baseline gap-2 group"
            >
              <span className="display text-[26px] tracking-tight">CodeReview</span>
              <span className="display-italic text-[22px] text-primary" style={{ color: '#10b981' }}>AI</span>
            </button>

            {/* Center nav (desktop) */}
            <div className="hidden md:flex items-center gap-10">
              {navItems.map((item) => (
                <a key={item.label} href={item.href}>
                  <LetterStagger text={item.label} />
                </a>
              ))}
            </div>

            {/* Right CTAs */}
            <div className="hidden md:flex items-center gap-6">
              <button onClick={handleLogin} className="nav-link-ed">
                Sign in
              </button>
              <button onClick={handleLogin} className="btn-ed">
                Get started
              </button>
            </div>

            {/* Mobile menu trigger */}
            <button
              className="md:hidden text-ink"
              style={{ color: '#1a1612' }}
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Menu"
            >
              {isOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>

          {/* Mobile menu */}
          {isOpen && (
            <div className="md:hidden pb-8 space-y-5">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="block nav-link-ed"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <button onClick={handleLogin} className="btn-ed w-full justify-center">
                Get started
              </button>
            </div>
          )}
        </div>
      </nav>
    </header>
  )
}
