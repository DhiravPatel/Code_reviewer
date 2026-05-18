import AnimateIn from '../../shared/components/AnimateIn'

const testimonials = [
  {
    quote: 'CodeReview AI caught a critical SQL injection our team missed. The automated reviews have become indispensable for our workflow.',
    name: 'Sarah Chen',
    role: 'Staff Engineer',
    company: 'Stripe',
  },
  {
    quote: "We ship 40% faster since adopting this. The AI reviews are so good, they're basically a senior engineer reviewing every PR.",
    name: 'Marcus Johnson',
    role: 'Engineering Manager',
    company: 'Shopify',
  },
  {
    quote: 'The quality of feedback is incredible. Code quality across our team improved measurably within two weeks of deployment.',
    name: 'Priya Sharma',
    role: 'CTO',
    company: 'Linear',
  },
  {
    quote: "Best investment we've made in developer productivity this year. The security analysis alone is worth it.",
    name: 'David Kim',
    role: 'Tech Lead',
    company: 'Vercel',
  },
  {
    quote: "Catches edge cases I would have missed. It's like having an extra pair of eyes on every single commit.",
    name: 'Alex Rodriguez',
    role: 'Senior Engineer',
    company: 'Notion',
  },
  {
    quote: "Onboarding junior engineers is much smoother. They learn from the AI's suggestions in real-time.",
    name: 'Emma Wilson',
    role: 'VP Engineering',
    company: 'Figma',
  },
]

function Card({ t }) {
  return (
    <div
      className="ed-card flex flex-col gap-6 w-[400px] flex-shrink-0 p-8 mx-3 group"
      style={{ background: '#ffffff', whiteSpace: 'normal' }}
    >
      <span className="rule" />
      <p
        className="display text-[20px] md:text-[22px] leading-[1.4]"
        style={{ color: '#1a1612', whiteSpace: 'normal' }}
      >
        <span className="display-italic" style={{ color: '#10b981' }}>“</span>
        {t.quote}
        <span className="display-italic" style={{ color: '#10b981' }}>”</span>
      </p>
      <div className="mt-auto pt-4" style={{ borderTop: '1px solid #e8e4da' }}>
        <p className="text-[13.5px] font-medium" style={{ color: '#1a1612' }}>
          {t.name}
        </p>
        <p className="text-[11.5px] mt-1" style={{ color: '#56524a' }}>
          {t.role} <span style={{ color: '#10b981' }}>·</span> {t.company}
        </p>
      </div>
    </div>
  )
}

export default function Testimonials() {
  const doubled = [...testimonials, ...testimonials]
  return (
    <section id="testimonials" className="section relative overflow-hidden" style={{ background: '#f4f2ec' }}>
      <div className="container-editorial">
        <div className="mb-20 lg:mb-24 max-w-4xl">
          <AnimateIn duration={950}>
            <div className="flex items-center gap-3 mb-6">
              <span className="rule" />
              <span className="eyebrow">In their words</span>
            </div>
          </AnimateIn>
          <AnimateIn delay={120} duration={950}>
            <h2 className="display text-[44px] md:text-[72px] lg:text-[88px] leading-[1.02]">
              Loved by teams at{' '}
              <span className="display-italic" style={{ color: '#10b981' }}>
                world-class companies.
              </span>
            </h2>
          </AnimateIn>
          <AnimateIn delay={240} duration={950}>
            <p className="mt-8 max-w-xl text-[16px] md:text-[17px] leading-[1.75]" style={{ color: '#3b3833' }}>
              Join 500+ engineering teams shipping better code with AI reviews.
            </p>
          </AnimateIn>
        </div>
      </div>

      {/* Two marquee rows, opposite directions */}
      <div className="ed-marquee mb-6">
        <div className="ed-marquee__track" style={{ animationDuration: '52s' }}>
          {doubled.map((t, i) => <Card key={`r1-${i}`} t={t} />)}
        </div>
      </div>
      <div className="ed-marquee">
        <div
          className="ed-marquee__track"
          style={{ animationDuration: '60s', animationDirection: 'reverse' }}
        >
          {doubled.slice().reverse().map((t, i) => <Card key={`r2-${i}`} t={t} />)}
        </div>
      </div>
    </section>
  )
}
