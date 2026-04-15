import { useNavigate } from 'react-router-dom'
import { Github, ArrowRight, Sparkles, Check } from 'lucide-react'
import AnimateIn from '../../shared/components/AnimateIn'

const benefits = [
  'No credit card required',
  'Set up in 30 seconds',
  'Cancel anytime',
]

export default function CTA() {
  const navigate = useNavigate()

  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimateIn>
          <div className="relative rounded-3xl overflow-hidden border border-brand-500/30 shadow-[0_0_80px_rgba(16,185,129,0.15)]">
            {/* Animated gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-surface-900 via-surface-950 to-surface-900" />
            <div className="absolute inset-0 bg-gradient-to-br from-brand-500/10 via-transparent to-cyan-500/10" />

            {/* Animated orbs */}
            <div
              className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-brand-500/20 rounded-full blur-[120px] animate-pulse"
              style={{ animationDuration: '4s' }}
            />
            <div
              className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-cyan-500/20 rounded-full blur-[100px] animate-pulse"
              style={{ animationDuration: '6s', animationDelay: '1s' }}
            />

            {/* Grid pattern */}
            <div className="absolute inset-0 bg-grid opacity-20" />

            {/* Content */}
            <div className="relative px-6 py-16 lg:px-16 lg:py-24 text-center">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-500/15 border border-brand-500/30 mb-6 backdrop-blur-sm">
                <Sparkles size={12} className="text-brand-400" />
                <span className="text-brand-300 font-semibold text-xs tracking-wider uppercase">
                  Ready to get started?
                </span>
              </div>

              <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight leading-tight">
                Ship better code,{' '}
                <span className="gradient-flow">faster</span>
              </h2>
              <p className="text-surface-400 text-base md:text-lg max-w-2xl mx-auto mb-8">
                Join hundreds of engineering teams automating their code reviews.
                <br className="hidden md:block" />
                Get started in under a minute — completely free.
              </p>

              {/* Benefits */}
              <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 mb-10">
                {benefits.map((benefit, i) => (
                  <div key={i} className="flex items-center gap-2 text-surface-300 text-sm">
                    <div className="w-5 h-5 rounded-full bg-brand-500/15 border border-brand-500/30 flex items-center justify-center">
                      <Check size={12} className="text-brand-400" strokeWidth={3} />
                    </div>
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => navigate('/login')}
                  className="shimmer-btn btn-primary text-base px-8 py-4 shadow-glow hover:shadow-glow-lg group"
                >
                  <Github size={20} />
                  Connect GitHub
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
                <button
                  onClick={() => navigate('/login')}
                  className="btn-ghost text-base px-8 py-4 backdrop-blur-sm group"
                >
                  <Sparkles size={18} className="group-hover:rotate-12 transition-transform" />
                  View Live Demo
                </button>
              </div>
            </div>
          </div>
        </AnimateIn>
      </div>
    </section>
  )
}
