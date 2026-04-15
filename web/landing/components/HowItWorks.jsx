import { useNavigate } from 'react-router-dom'
import { Github, ArrowRight, Link2, GitPullRequest, Sparkles } from 'lucide-react'
import AnimateIn from '../../shared/components/AnimateIn'

const steps = [
  {
    step: '01',
    icon: Link2,
    title: 'Connect GitHub',
    description: 'Link your GitHub repos in one click. We support GitHub, GitLab, and Bitbucket.',
    color: 'from-brand-500 to-emerald-500',
  },
  {
    step: '02',
    icon: GitPullRequest,
    title: 'Open a PR',
    description: 'Create or update a pull request as you normally would. No workflow changes needed.',
    color: 'from-cyan-500 to-blue-500',
  },
  {
    step: '03',
    icon: Sparkles,
    title: 'Get AI Review',
    description: 'Receive intelligent code review comments, security alerts, and suggestions in seconds.',
    color: 'from-violet-500 to-purple-500',
  },
]

export default function HowItWorks() {
  const navigate = useNavigate()

  return (
    <section id="how-it-works" className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-500/[0.03] to-transparent" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-brand-500/[0.04] rounded-full blur-[140px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimateIn className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/20 mb-5">
            <Sparkles size={12} className="text-brand-400" />
            <span className="text-brand-300 font-semibold text-xs tracking-wider uppercase">
              How it works
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-6xl font-bold text-white mb-5 tracking-tight leading-tight">
            Up and running in{' '}
            <span className="gradient-flow">3 simple steps</span>
          </h2>
          <p className="text-surface-400 text-lg max-w-2xl mx-auto">
            No configuration needed. Just connect and start reviewing.
          </p>
        </AnimateIn>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-6 mb-20 relative">
          {steps.map((item, idx) => {
            const Icon = item.icon
            return (
              <AnimateIn key={idx} delay={idx * 180}>
                <div className="relative text-center group">
                  {/* Dotted connector line (desktop only) */}
                  {idx < steps.length - 1 && (
                    <div
                      className="hidden md:block absolute top-[40px] left-[60%] w-[80%] h-[2px] dotted-flow opacity-40 group-hover:opacity-100 transition-opacity duration-500"
                    />
                  )}

                  {/* Step icon */}
                  <div className="relative inline-block mb-8">
                    <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${item.color} opacity-20 blur-2xl scale-150 group-hover:opacity-40 transition-opacity duration-700`} />
                    <div className="step-pulse relative w-20 h-20 rounded-3xl bg-gradient-to-br from-surface-800 to-surface-900 border border-surface-700/60 group-hover:border-brand-500/50 flex items-center justify-center transition-all duration-500">
                      <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                      <Icon className="w-8 h-8 text-brand-400 group-hover:scale-110 transition-transform" strokeWidth={2} />
                    </div>
                    <div className={`absolute -top-2 -right-2 px-2.5 py-0.5 rounded-full bg-gradient-to-r ${item.color} text-white text-[10px] font-bold shadow-lg`}>
                      {item.step}
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-brand-300 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-surface-400 text-sm leading-relaxed max-w-xs mx-auto">
                    {item.description}
                  </p>
                </div>
              </AnimateIn>
            )
          })}
        </div>

        {/* CTA */}
        <AnimateIn className="text-center">
          <button
            onClick={() => navigate('/login')}
            className="shimmer-btn btn-primary text-base px-8 py-4 shadow-glow hover:shadow-glow-lg group"
          >
            <Github size={20} />
            Start Free Trial
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </AnimateIn>
      </div>
    </section>
  )
}
