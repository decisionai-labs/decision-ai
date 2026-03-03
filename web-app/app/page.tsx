import { Header } from '@/components/Header';
import { ResendHero } from '@/components/ResendHero';
import { HowItWorks } from '@/components/HowItWorks';
import { Features } from '@/components/Features';
import { SecurityShowcase } from '@/components/SecurityShowcase';
import { CodePreview } from '@/components/CodePreview';
import { UseCases } from '@/components/UseCases';
import { Integrations } from '@/components/Integrations';
import { Testimonials } from '@/components/Testimonials';
import { Roadmap } from '@/components/Roadmap';
import { FAQ } from '@/components/FAQ';
import { Newsletter } from '@/components/Newsletter';
import { Credits } from '@/components/Credits';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/Button';
import { HomeDock } from '@/components/HomeDock';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Header />
      <ResendHero />
      <SecurityShowcase />
      <HowItWorks />
      <CodePreview />
      <UseCases />
      <Features />
      <Integrations />
      <Testimonials />
      <Roadmap />
      <FAQ />
      <Newsletter />

      {/* Enhanced CTA Section */}
      <section className="relative py-24 px-6 bg-black border-t border-white/10 overflow-hidden">
        {/* Floating decorative elements */}
        <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-gradient-to-br from-[#14B8A6]/10 to-transparent blur-3xl animate-float-slow" />
        <div className="absolute bottom-10 right-10 w-40 h-40 rounded-full bg-gradient-to-br from-[#8B5CF6]/10 to-transparent blur-3xl animate-float-delayed" />

        <div className="max-w-3xl mx-auto text-center relative z-10">
          {/* Glowing accent line */}
          <div className="w-24 h-1 bg-gradient-to-r from-[#14B8A6] to-[#0D9488] rounded-full mx-auto mb-8 glow-teal" />

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-white mb-4">
            Ready to <span className="text-gradient">Try It?</span>
          </h2>
          <p className="text-lg sm:text-xl text-zinc-400 mb-10 leading-relaxed">
            Experience privacy-preserving AI firsthand. No signup required.<br className="hidden sm:block" />
            Just connect your wallet and start querying.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/demo">
              <Button size="lg" className="btn-glow btn-ripple group shadow-lg shadow-[#14B8A6]/20">
                Launch Interactive Demo
                <svg
                  className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </Button>
            </Link>
            <Link
              href="https://github.com/NeuroSolanaAgents/neurosan"
              target="_blank"
            >
              <Button variant="secondary" size="lg" className="group">
                <svg className="mr-2 w-5 h-5 transition-transform group-hover:scale-110" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                </svg>
                Star on GitHub
              </Button>
            </Link>
          </div>

          {/* Trust indicators */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-zinc-400">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-[#14B8A6]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Open Source</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-[#14B8A6]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>MIT Licensed</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-[#14B8A6]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Production Ready</span>
            </div>
          </div>
        </div>
      </section>

      <Credits />
      <Footer />

      {/* Floating Dock Navigation */}
      <HomeDock />
    </main>
  );
}
