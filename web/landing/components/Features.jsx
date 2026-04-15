import { Zap, AlertTriangle, Code2, BarChart3, GitBranch, Lock, Sparkles } from 'lucide-react'
import AnimateIn from '../../shared/components/AnimateIn'
import { useRef } from 'react'

const features = [
  {
    icon: Zap,
    title: 'Auto PR Review',
    description: 'Every pull request is automatically analyzed with our AI engine the moment it\'s opened.',
    gradient: 'from-brand-500 via-emerald-500 to-teal-500',
    iconBg: 'bg-brand-500/15',
    iconColor: 'text-brand-400',
    accent: 'group-hover:shadow-[0_0_30px_rgba(16,185,129,0.2)]',
  },
  {
    icon: Code2,
    title: 'Code Suggestions',
    description: 'Get actionable suggestions for performance improvements, patterns, and best practices.',
    gradient: 'from-cyan-500 via-blue-500 to-indigo-500',
    iconBg: 'bg-cyan-500/15',
    iconColor: 'text-cyan-400',
    accent: 'group-hover:shadow-[0_0_30px_rgba(6,182,212,0.2)]',
  },
  {
    icon: AlertTriangle,
    title: 'Security Warnings',
    description: 'Detect vulnerabilities, SQL injections, XSS risks, and insecure patterns before production.',
    gradient: 'from-amber-500 via-orange-500 to-red-500',
    iconBg: 'bg-amber-500/15',
    iconColor: 'text-amber-400',
    accent: 'group-hover:shadow-[0_0_30px_rgba(245,158,11,0.2)]',
  },
  {
    icon: BarChart3,
    title: 'Quality Metrics',
    description: 'Track code quality trends across your team with real-time dashboards and alerts.',
    gradient: 'from-purple-500 via-violet-500 to-pink-500',
    iconBg: 'bg-purple-500/15',
    iconColor: 'text-purple-400',
    accent: 'group-hover:shadow-[0_0_30px_rgba(168,85,247,0.2)]',
  },
  {
    icon: GitBranch,
    title: 'Smart Merging',
    description: 'AI-powered merge conflict detection and resolution suggestions to speed up delivery.',
    gradient: 'from-rose-500 via-pink-500 to-red-500',
    iconBg: 'bg-rose-500/15',
    iconColor: 'text-rose-400',
    accent: 'group-hover:shadow-[0_0_30px_rgba(244,63,94,0.2)]',
  },
  {
    icon: Lock,
    title: 'Enterprise Security',
    description: 'SOC2 compliant with end-to-end encryption. Your code never leaves your infrastructure.',
    gradient: 'from-indigo-500 via-violet-500 to-purple-500',
    iconBg: 'bg-indigo-500/15',
    iconColor: 'text-indigo-400',
    accent: 'group-hover:shadow-[0_0_30px_rgba(99,102,241,0.2)]',
  },
]

function FeatureCard({ feature, idx }) {
  const cardRef = useRef(null)
  const Icon = feature.icon

  const handleMouseMove = (e) => {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    card.style.setProperty('--x', `${x}%`)
    card.style.setProperty('--y', `${y}%`)
  }

  return (
    <AnimateIn delay={idx * 100}>
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        className={`tilt-card relative p-6 lg:p-8 rounded-2xl bg-gradient-to-br from-surface-800/40 to-surface-900/80 border border-surface-700/50 hover:border-surface-600/80 transition-all duration-500 h-full group overflow-hidden ${feature.accent}`}
      >
        {/* Gradient top border on hover */}
        <div className={`absolute top-0 left-0 right-0 h-px bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

        {/* Icon with glow */}
        <div className="relative mb-6 inline-block">
          <div className={`absolute inset-0 ${feature.iconBg} rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500 scale-100 group-hover:scale-125`} />
          <div className={`relative w-14 h-14 rounded-2xl ${feature.iconBg} border border-surface-700/50 flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
            <Icon className={`w-7 h-7 ${feature.iconColor}`} strokeWidth={2} />
          </div>
        </div>

        <h3 className="text-xl font-bold text-white mb-3 group-hover:translate-x-0.5 transition-transform duration-300">
          {feature.title}
        </h3>
        <p className="text-surface-400 text-sm leading-relaxed mb-5">
          {feature.description}
        </p>

        {/* Learn more link */}
        <div className={`inline-flex items-center gap-1.5 text-xs font-semibold bg-gradient-to-r ${feature.gradient} bg-clip-text text-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300`}>
          Learn more
          <span className={`w-3 h-0.5 bg-gradient-to-r ${feature.gradient} group-hover:w-5 transition-all duration-300`} />
        </div>
      </div>
    </AnimateIn>
  )
}

export default function Features() {
  return (
    <section id="features" className="relative py-24 lg:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-surface-900/20 to-transparent pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <AnimateIn className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/20 mb-5">
            <Sparkles size={12} className="text-brand-400" />
            <span className="text-brand-300 font-semibold text-xs tracking-wider uppercase">
              Features
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-6xl font-bold text-white mb-5 tracking-tight leading-tight">
            Everything you need to{' '}
            <br className="hidden md:block" />
            <span className="gradient-flow">ship better code</span>
          </h2>
          <p className="text-surface-400 text-lg max-w-2xl mx-auto">
            A comprehensive suite of AI-powered tools designed for modern engineering teams.
          </p>
        </AnimateIn>

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, idx) => (
            <FeatureCard key={idx} feature={feature} idx={idx} />
          ))}
        </div>
      </div>
    </section>
  )
}
