import { useNavigate } from 'react-router-dom'
import AnimateIn from '../../shared/components/AnimateIn'

const benefits = [
  'No credit card required',
  'Set up in 30 seconds',
  'Cancel anytime',
]

export default function CTA() {
  const navigate = useNavigate()
  return (
    <section
      className="section relative overflow-hidden"
      style={{ background: '#1a1612', color: '#faf8f3' }}
    >
      {/* Faint red glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center, rgba(16,185,129,0.2), transparent 65%)' }}
      />

      <div className="container-editorial relative">
        <AnimateIn duration={950}>
          <div className="flex items-center gap-3 mb-8">
            <span className="rule rule-light" />
            <span className="eyebrow eyebrow-light">Ready to begin</span>
          </div>
        </AnimateIn>

        <AnimateIn delay={120} duration={950}>
          <h2
            className="display text-[56px] md:text-[96px] lg:text-[128px] leading-[0.98] max-w-5xl"
            style={{ color: '#faf8f3' }}
          >
            Ship better code,{' '}
            <span className="display-italic" style={{ color: '#10b981' }}>faster.</span>
          </h2>
        </AnimateIn>

        <AnimateIn delay={240} duration={950}>
          <p
            className="mt-10 max-w-xl text-[16px] md:text-[18px] leading-[1.75]"
            style={{ color: 'rgba(250,248,243,0.75)' }}
          >
            Join hundreds of engineering teams automating their code reviews.
            Get started in under a minute — completely free.
          </p>
        </AnimateIn>

        <AnimateIn delay={360} duration={950}>
          <div className="mt-12 flex flex-wrap items-center gap-x-10 gap-y-6">
            <button onClick={() => navigate('/login')} className="btn-ed btn-ed-invert">
              Connect GitHub
              <span style={{ marginLeft: 4 }}>→</span>
            </button>
            <button
              onClick={() => navigate('/login')}
              className="btn-link-ed"
              style={{ color: '#faf8f3' }}
            >
              View live demo
              <span className="arrow">→</span>
            </button>
          </div>
        </AnimateIn>

        <AnimateIn delay={500} duration={950}>
          <div className="mt-20 grid sm:grid-cols-3 gap-8 max-w-4xl">
            {benefits.map((b, i) => (
              <div key={i} className="flex items-start gap-4">
                <span className="display text-[28px] leading-none" style={{ color: '#10b981' }}>
                  0{i + 1}
                </span>
                <p
                  className="display text-[20px] md:text-[22px] leading-[1.3]"
                  style={{ color: '#faf8f3' }}
                >
                  {b}.
                </p>
              </div>
            ))}
          </div>
        </AnimateIn>
      </div>
    </section>
  )
}
