import { Navbar } from '@/components/navbar'
import { Hero } from '@/components/hero'
import { TrustSection } from '@/components/trust-section'
import { FeaturesSection } from '@/components/features-section'
import { HowItWorks } from '@/components/how-it-works'
import { LivePreview } from '@/components/live-preview'
import { PRScore } from '@/components/pr-score'
import { Pricing } from '@/components/pricing'
import { Testimonials } from '@/components/testimonials'
import { FinalCTA } from '@/components/final-cta'
import { Footer } from '@/components/footer'
import { Particles } from '@/components/particles'

export default function Home() {
  console.log('Hello')
  return (
    <main className="relative min-h-screen bg-background text-foreground overflow-hidden">
      <Particles />
      <Navbar />
      <Hero />
      <TrustSection />
      <FeaturesSection />
      <HowItWorks />
      <LivePreview />
      <PRScore />
      <Pricing />
      <Testimonials />
      <FinalCTA />
      <Footer />
    </main>
  )
}
