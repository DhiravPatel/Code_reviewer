import { Github, Twitter } from 'lucide-react'

export default function Footer() {
  return (
    <footer style={{ background: '#faf8f3', borderTop: '1px solid #e8e4da' }}>
      <div className="container-editorial py-16 md:py-20">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-10">
          {/* Wordmark + tagline */}
          <div>
            <div className="flex items-baseline gap-3">
              <span className="display text-[44px] md:text-[72px] leading-none">CodeReview</span>
              <span className="display-italic text-[32px] md:text-[56px]" style={{ color: '#10b981' }}>AI</span>
            </div>
            <p
              className="mt-5 max-w-md text-[14px] md:text-[15px] leading-[1.75]"
              style={{ color: '#3b3833' }}
            >
              AI-powered code reviews for modern engineering teams.
            </p>
          </div>

          {/* Social */}
          <div className="flex items-center gap-5">
            <a
              href="#"
              aria-label="GitHub"
              className="transition-colors duration-500 ease-editorial"
              style={{ color: '#1a1612' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#10b981')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#1a1612')}
            >
              <Github size={20} />
            </a>
            <a
              href="#"
              aria-label="Twitter"
              className="transition-colors duration-500 ease-editorial"
              style={{ color: '#1a1612' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#10b981')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#1a1612')}
            >
              <Twitter size={20} />
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="mt-12 pt-8 flex items-center justify-between"
          style={{ borderTop: '1px solid #e8e4da' }}
        >
          <p className="text-[12px]" style={{ color: '#56524a' }}>
            © {new Date().getFullYear()} CodeReview AI. All rights reserved.
          </p>
          <span className="rule" />
        </div>
      </div>
    </footer>
  )
}
