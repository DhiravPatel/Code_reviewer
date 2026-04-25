import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Shield, Zap, Github, CheckCircle } from 'lucide-react'
import { useAuth } from '../../shared/context/AuthContext'
import GoogleSignInButton from '../components/GoogleSignInButton'
import loginHero from '../../assets/login-hero.png'

const features = [
  { icon: Shield, text: 'Enterprise-grade security' },
  { icon: Zap, text: 'Reviews in under 30 seconds' },
  { icon: Github, text: 'Seamless GitHub integration' },
  { icon: CheckCircle, text: 'SOC2 compliant platform' },
]

export default function LoginPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { isAuthenticated, loading } = useAuth()
  const [mounted, setMounted] = useState(false)

  const from = location.state?.from?.pathname || '/dashboard/integrations'

  useEffect(() => {
    setMounted(true)
  }, [])

  // Redirect if already authenticated
  useEffect(() => {
    if (!loading && isAuthenticated) {
      navigate(from, { replace: true })
    }
  }, [isAuthenticated, loading, navigate, from])

  return (
    <div className="min-h-screen flex bg-surface-950 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-mesh opacity-50" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-500/[0.04] rounded-full blur-[120px]" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-cyan-500/[0.04] rounded-full blur-[100px]" />

      {/* ─── LEFT PANEL: Hero Image ─── */}
      <div className="hidden lg:flex lg:w-1/2 relative items-center justify-center p-12">
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-brand-500/10 via-transparent to-cyan-500/10" />
        
        <div className={`relative z-10 flex flex-col items-center transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {/* Hero image */}
          <div className="relative mb-10">
            <div className="absolute -inset-4 bg-gradient-to-r from-brand-500/20 to-cyan-500/20 rounded-3xl blur-2xl" />
            <img
              src={loginHero}
              alt="AI-Powered Code Review"
              className="relative w-full max-w-md rounded-2xl shadow-2xl border border-surface-700/30"
            />
          </div>

          {/* Branding text */}
          <div className="text-center">
            <h2 className="text-2xl font-bold text-white mb-3">
              Ship Better Code, <span className="gradient-text">Faster</span>
            </h2>
            <p className="text-surface-400 text-sm max-w-sm leading-relaxed">
              Join thousands of developers who trust CodeReview AI to catch bugs, enforce standards, and accelerate their workflow.
            </p>
          </div>

          {/* Feature pills */}
          <div className="mt-8 grid grid-cols-2 gap-3">
            {features.map(({ icon: Icon, text }, idx) => (
              <div
                key={idx}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl bg-surface-800/40 border border-surface-700/30 backdrop-blur-sm transition-all duration-500 ${
                  mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
                style={{ transitionDelay: `${300 + idx * 100}ms` }}
              >
                <Icon size={14} className="text-brand-400 flex-shrink-0" />
                <span className="text-surface-300 text-xs font-medium">{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ─── RIGHT PANEL: Sign In Form ─── */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-12 relative z-10">
        <div className={`w-full max-w-md transition-all duration-700 delay-200 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {/* Logo */}
          <div className="flex items-center gap-2.5 mb-10">
            <div
              className="w-10 h-10 bg-gradient-to-br from-brand-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-glow cursor-pointer"
              onClick={() => navigate('/')}
            >
              <span className="text-white font-bold text-sm">CR</span>
            </div>
            <span
              className="font-bold text-xl text-white tracking-tight cursor-pointer"
              onClick={() => navigate('/')}
            >
              CodeReview <span className="gradient-text">AI</span>
            </span>
          </div>

          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">
              Welcome back
            </h1>
            <p className="text-surface-400 text-sm">
              Sign in to your account to continue reviewing code with AI
            </p>
          </div>

          {/* Sign-in card */}
          <div className="glass-card p-8 rounded-2xl">
            {/* Google Sign In */}
            <GoogleSignInButton />

            {/* Divider */}
            <div className="flex items-center gap-4 my-6">
              <div className="flex-1 h-px bg-surface-700/50" />
              <span className="text-surface-500 text-xs font-medium uppercase tracking-wider">
                Secure Authentication
              </span>
              <div className="flex-1 h-px bg-surface-700/50" />
            </div>

            {/* Info */}
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 rounded-xl bg-surface-800/30 border border-surface-700/20">
                <Shield size={16} className="text-brand-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-surface-300 text-xs font-medium">End-to-end encrypted</p>
                  <p className="text-surface-500 text-[11px] mt-0.5">Your code and data are always protected with enterprise-grade encryption.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 rounded-xl bg-surface-800/30 border border-surface-700/20">
                <Github size={16} className="text-brand-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-surface-300 text-xs font-medium">GitHub-ready</p>
                  <p className="text-surface-500 text-[11px] mt-0.5">Connect your repositories instantly after signing in.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <p className="mt-6 text-center text-surface-500 text-xs">
            By signing in, you agree to our{' '}
            <a href="#" className="text-brand-400 hover:text-brand-300 transition-colors">Terms of Service</a>
            {' '}and{' '}
            <a href="#" className="text-brand-400 hover:text-brand-300 transition-colors">Privacy Policy</a>
          </p>
        </div>
      </div>
    </div>
  )
}
