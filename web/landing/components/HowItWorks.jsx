import { useNavigate } from 'react-router-dom'
import AnimateIn from '../../shared/components/AnimateIn'

const steps = [
  {
    n: '01',
    title: 'Connect',
    italic: 'GitHub.',
    body: 'Link your GitHub repos in one click. We support GitHub, GitLab, and Bitbucket.',
  },
  {
    n: '02',
    title: 'Open',
    italic: 'a pull request.',
    body: 'Create or update a pull request as you normally would. No workflow changes needed.',
  },
  {
    n: '03',
    title: 'Read',
    italic: 'the review.',
    body: 'Receive intelligent code-review comments, security alerts, and suggestions in seconds.',
  },
]

export default function HowItWorks() {
  const navigate = useNavigate()

  return (
    <section id="how-it-works" className="section relative" style={{ background: '#faf8f3' }}>
      <div className="container-editorial">
        {/* Header */}
        <div className="mb-20 lg:mb-28 max-w-4xl">
          <AnimateIn duration={950}>
            <div className="flex items-center gap-3 mb-6">
              <span className="rule" />
              <span className="eyebrow">How it works</span>
            </div>
          </AnimateIn>
          <AnimateIn delay={120} duration={950}>
            <h2 className="display text-[44px] md:text-[72px] lg:text-[88px] leading-[1.02]">
              Up and running in{' '}
              <span className="display-italic" style={{ color: '#10b981' }}>three steps.</span>
            </h2>
          </AnimateIn>
          <AnimateIn delay={240} duration={950}>
            <p className="mt-8 max-w-xl text-[16px] md:text-[17px] leading-[1.75]" style={{ color: '#3b3833' }}>
              No configuration needed. Just connect and start reviewing.
            </p>
          </AnimateIn>
        </div>

        {/* Steps as editorial rows */}
        <div className="divide-y" style={{ borderColor: '#e8e4da' }}>
          {steps.map((s, i) => (
            <AnimateIn key={i} delay={i * 160} duration={950}>
              <div
                className="grid grid-cols-12 gap-6 md:gap-10 py-12 md:py-16 group cursor-default relative border-t"
                style={{ borderColor: '#e8e4da' }}
              >
                {/* Number */}
                <div className="col-span-2 md:col-span-2">
                  <span
                    className="display text-[48px] md:text-[88px] leading-none"
                    style={{ color: '#10b981' }}
                  >
                    {s.n}
                  </span>
                </div>

                {/* Title + body */}
                <div className="col-span-10 md:col-span-8">
                  <h3 className="display text-[32px] md:text-[56px] leading-[1.02]">
                    {s.title}{' '}
                    <span className="display-italic" style={{ color: '#1a1612' }}>{s.italic}</span>
                  </h3>
                  <p
                    className="mt-5 max-w-2xl text-[15.5px] md:text-[17px] leading-[1.75]"
                    style={{ color: '#3b3833' }}
                  >
                    {s.body}
                  </p>
                </div>

                {/* Decorative red rule on the right that grows on hover */}
                <div className="hidden md:flex col-span-2 items-center justify-end">
                  <span
                    className="h-px transition-all duration-700 ease-editorial"
                    style={{
                      background: '#10b981',
                      width: '24px',
                    }}
                  />
                </div>
              </div>
            </AnimateIn>
          ))}
        </div>

        {/* CTA */}
        <AnimateIn delay={400} duration={950}>
          <div className="mt-20 flex flex-wrap items-center gap-8">
            <button onClick={() => navigate('/login')} className="btn-ed">
              Start free trial
            </button>
            <button onClick={() => navigate('/login')} className="btn-link-ed">
              See it in action
              <span className="arrow">→</span>
            </button>
          </div>
        </AnimateIn>
      </div>
    </section>
  )
}
