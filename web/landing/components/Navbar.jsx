import { useNavigate } from 'react-router-dom'
import { Menu, X, Sparkles, ArrowRight } from 'lucide-react'
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

  const handleLogin = () => navigate('/login')

  return (
    <nav
      id="landing-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-surface-950/80 backdrop-blur-xl border-b border-surface-800/60 shadow-lg'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-500 ${scrolled ? 'py-0' : 'py-2'}`}>
        <div className="flex justify-between items-center h-16 lg:h-20">
          {/* Logo */}
          <div
            className="flex items-center gap-2.5 cursor-pointer group"
            onClick={() => navigate('/')}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-brand-500 to-cyan-500 rounded-xl blur-md opacity-50 group-hover:opacity-80 transition-opacity" />
              <div className="relative w-9 h-9 bg-gradient-to-br from-brand-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-glow group-hover:scale-105 transition-transform">
                <Sparkles size={16} className="text-white" />
              </div>
            </div>
            <span className="font-bold text-lg text-white tracking-tight">
              CodeReview <span className="gradient-flow">AI</span>
            </span>
          </div>

          {/* Right side */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={handleLogin}
              className="animated-link px-4 py-2 text-surface-300 hover:text-white transition-colors text-sm font-medium"
            >
              Sign In
            </button>
            <button
              onClick={handleLogin}
              className="shimmer-btn btn-primary text-sm px-5 py-2.5 group"
            >
              Get Started Free
              <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
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
              <ArrowRight size={14} />
            </button>
          </div>
        )}
      </div>
    </nav>
  )
}
