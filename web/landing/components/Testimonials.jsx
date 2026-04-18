import { Star, Quote, Sparkles } from 'lucide-react'
import AnimateIn from '../../shared/components/AnimateIn'

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'Staff Engineer',
    company: 'Stripe',
    avatar: 'SC',
    gradient: 'from-brand-500 to-cyan-500',
    quote: 'CodeReview AI caught a critical SQL injection our team missed. The automated reviews have become indispensable for our workflow.',
    rating: 5,
  },
  {
    name: 'Marcus Johnson',
    role: 'Engineering Manager',
    company: 'Shopify',
    avatar: 'MJ',
    gradient: 'from-violet-500 to-pink-500',
    quote: 'We ship 40% faster since adopting this. The AI reviews are so good, they\'re basically a senior engineer reviewing every PR.',
    rating: 5,
  },
  {
    name: 'Priya Sharma',
    role: 'CTO',
    company: 'Linear',
    avatar: 'PS',
    gradient: 'from-amber-500 to-red-500',
    quote: 'The quality of feedback is incredible. Code quality across our team improved measurably within two weeks of deployment.',
    rating: 5,
  },
  {
    name: 'David Kim',
    role: 'Tech Lead',
    company: 'Vercel',
    avatar: 'DK',
    gradient: 'from-emerald-500 to-teal-500',
    quote: 'Best investment we\'ve made in developer productivity this year. The security analysis alone is worth it.',
    rating: 5,
  },
  {
    name: 'Alex Rodriguez',
    role: 'Senior Engineer',
    company: 'Notion',
    avatar: 'AR',
    gradient: 'from-blue-500 to-indigo-500',
    quote: 'Catches edge cases I would have missed. It\'s like having an extra pair of eyes on every single commit.',
    rating: 5,
  },
  {
    name: 'Emma Wilson',
    role: 'VP Engineering',
    company: 'Figma',
    avatar: 'EW',
    gradient: 'from-rose-500 to-pink-500',
    quote: 'Onboarding junior engineers is much smoother. They learn from the AI\'s suggestions in real-time.',
    rating: 5,
  },
]

function TestimonialCard({ testimonial }) {
  return (
    <div className="flex-shrink-0 w-[380px] p-6 rounded-2xl bg-gradient-to-br from-surface-800/60 to-surface-900/80 border border-surface-700/50 hover:border-brand-500/40 transition-all duration-500 group">
      <div className="flex items-start justify-between mb-4">
        <Quote className="text-brand-400/40 group-hover:text-brand-400/70 transition-colors" size={28} />
        <div className="flex items-center gap-0.5">
          {[...Array(testimonial.rating)].map((_, i) => (
            <Star key={i} size={12} className="text-amber-400 fill-amber-400" />
          ))}
        </div>
      </div>

      <p className="text-surface-300 text-sm leading-relaxed mb-5 min-h-[80px]">
        "{testimonial.quote}"
      </p>

      <div className="flex items-center gap-3 pt-4 border-t border-surface-700/50">
        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${testimonial.gradient} flex items-center justify-center text-white font-bold text-sm shadow-lg flex-shrink-0`}>
          {testimonial.avatar}
        </div>
        <div className="min-w-0">
          <p className="text-white font-semibold text-sm truncate">{testimonial.name}</p>
          <p className="text-surface-500 text-xs truncate">
            {testimonial.role} · <span className="text-brand-400">{testimonial.company}</span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default function Testimonials() {
  // Duplicate the array for seamless infinite scroll
  const doubled = [...testimonials, ...testimonials]

  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-surface-900/40 to-transparent pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimateIn className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/20 mb-5">
            <Sparkles size={12} className="text-brand-400" />
            <span className="text-brand-300 font-semibold text-xs tracking-wider uppercase">
              Loved by developers
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-6xl font-bold text-white mb-5 tracking-tight leading-tight">
            Trusted by teams at{' '}
            <span className="gradient-flow">world-class companies</span>
          </h2>
          <p className="text-surface-400 text-lg max-w-2xl mx-auto">
            Join 500+ engineering teams shipping better code with AI reviews.
          </p>
        </AnimateIn>
      </div>

      {/* Marquee (first row) */}
      <div className="marquee mb-6">
        <div className="marquee-track">
          {doubled.map((t, i) => (
            <TestimonialCard key={`row1-${i}`} testimonial={t} />
          ))}
        </div>
      </div>

      {/* Marquee (second row, reversed direction) */}
      <div className="marquee">
        <div
          className="marquee-track"
          style={{ animationDirection: 'reverse', animationDuration: '40s' }}
        >
          {doubled.slice().reverse().map((t, i) => (
            <TestimonialCard key={`row2-${i}`} testimonial={t} />
          ))}
        </div>
      </div>
    </section>
  )
}
