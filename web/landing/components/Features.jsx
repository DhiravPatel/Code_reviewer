import { Zap, AlertTriangle, Code2, BarChart3, GitBranch, Lock, Sparkles, ArrowRight } from 'lucide-react'
import AnimateIn from '../../shared/components/AnimateIn'
import { useRef } from 'react'

const features = [
  {
    icon: Zap,
    title: 'Auto PR Review',
    description: 'Every pull request is automatically analyzed with our AI engine the moment it\'s opened.',
    iconBg: 'bg-brand-500/10',
    iconColor: 'text-brand-400',
    glowColor: 'rgba(16, 185, 129, 0.35)',
    borderHover: 'hover:border-brand-500/50',
  },
  {
    icon: Code2,
    title: 'Code Suggestions',
    description: 'Get actionable suggestions for performance improvements, patterns, and best practices.',
    iconBg: 'bg-cyan-500/10',
    iconColor: 'text-cyan-400',
    glowColor: 'rgba(6, 182, 212, 0.35)',
    borderHover: 'hover:border-cyan-500/50',
  },
  {
    icon: AlertTriangle,
    title: 'Security Warnings',
    description: 'Detect vulnerabilities, SQL injections, XSS risks, and insecure patterns before production.',
    iconBg: 'bg-amber-500/10',
    iconColor: 'text-amber-400',
    glowColor: 'rgba(245, 158, 11, 0.35)',
    borderHover: 'hover:border-amber-500/50',
  },
  {
    icon: BarChart3,
    title: 'Quality Metrics',
    description: 'Track code quality trends across your team with real-time dashboards and alerts.',
    iconBg: 'bg-purple-500/10',
    iconColor: 'text-purple-400',
    glowColor: 'rgba(168, 85, 247, 0.35)',
    borderHover: 'hover:border-purple-500/50',
  },
  {
    icon: GitBranch,
    title: 'Smart Merging',
    description: 'AI-powered merge conflict detection and resolution suggestions to speed up delivery.',
    iconBg: 'bg-rose-500/10',
    iconColor: 'text-rose-400',
    glowColor: 'rgba(244, 63, 94, 0.35)',
    borderHover: 'hover:border-rose-500/50',
  },
  {
    icon: Lock,
    title: 'Enterprise Security',
    description: 'SOC2 compliant with end-to-end encryption. Your code never leaves your infrastructure.',
    iconBg: 'bg-indigo-500/10',
    iconColor: 'text-indigo-400',
    glowColor: 'rgba(99, 102, 241, 0.35)',
    borderHover: 'hover:border-indigo-500/50',
  },
]

function FeatureCard({ feature, idx }) {
  const cardRef = useRef(null)
  const Icon = feature.icon

  const handleMouseMove = (e) => {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    card.style.setProperty('--mx', `${x}px`)
    card.style.setProperty('--my', `${y}px`)
  }

  return (
    <AnimateIn delay={idx * 80} className="h-full">
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        className={`relative h-full p-7 rounded-2xl bg-gradient-to-br from-surface-800/40 to-surface-900/60 border border-surface-700/50 ${feature.borderHover} transition-all duration-500 group overflow-hidden hover:-translate-y-1`}
        style={{
          '--glow-color': feature.glowColor,
        }}
      >
        {/* Mouse-following spotlight */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: `radial-gradient(400px circle at var(--mx, 50%) var(--my, 50%), ${feature.glowColor}, transparent 40%)`,
          }}
        />

        {/* Content */}
        <div className="relative flex flex-col h-full">
          {/* Icon */}
          <div className="mb-5">
            <div
              className={`relative w-12 h-12 rounded-xl ${feature.iconBg} border border-surface-700/60 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
            >
              <Icon className={`w-6 h-6 ${feature.iconColor}`} strokeWidth={2} />
            </div>
          </div>

          {/* Title */}
          <h3 className="text-lg font-bold text-white mb-2.5">
            {feature.title}
          </h3>

          {/* Description */}
          <p className="text-surface-400 text-sm leading-relaxed mb-5 flex-1">
            {feature.description}
          </p>

          {/* Learn more */}
          <div
            className={`inline-flex items-center gap-1.5 text-xs font-semibold ${feature.iconColor} opacity-60 group-hover:opacity-100 transition-all duration-300`}
          >
            <span>Learn more</span>
            <ArrowRight
              size={12}
              className="group-hover:translate-x-1 transition-transform duration-300"
            />
          </div>
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((feature, idx) => (
            <FeatureCard key={idx} feature={feature} idx={idx} />
          ))}
        </div>
      </div>
    </section>
  )
}
