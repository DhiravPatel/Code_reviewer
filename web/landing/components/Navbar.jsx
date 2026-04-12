import { useNavigate } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { useState, useEffect } from 'react'

export default function Navbar() {
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleLogin = () => {
    navigate('/login')
  }

  return (
    <nav
      id="landing-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-surface-950/90 backdrop-blur-xl border-b border-surface-800/80 shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 lg:h-20">
          {/* Logo */}
          <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => navigate('/')}>
            <div className="w-9 h-9 bg-gradient-to-br from-brand-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-glow">
              <span className="text-white font-bold text-sm">CR</span>
            </div>
            <span className="font-bold text-lg text-white tracking-tight">
              CodeReview <span className="gradient-text">AI</span>
            </span>
          </div>

          {/* Right side */}
          <div className="hidden md:flex items-center gap-3">
            <button
              id="login-btn"
              onClick={handleLogin}
              className="px-4 py-2 text-surface-300 hover:text-white transition-colors text-sm font-medium"
            >
              Sign In
            </button>
            <button
              id="get-started-btn"
              onClick={handleLogin}
              className="btn-primary text-sm px-5 py-2.5"
            >
              Get Started Free
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            id="mobile-menu-btn"
            className="md:hidden text-surface-400 hover:text-white transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-6 animate-fade-in-down">
            <button onClick={handleLogin} className="btn-primary w-full text-sm">
              Get Started Free
            </button>
          </div>
        )}
      </div>
    </nav>
  )
}
