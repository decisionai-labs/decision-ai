import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { HowItWorks } from '@/components/HowItWorks';
import { Features } from '@/components/Features';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#FAFAF8]">
      <Header />
      <Hero />
      <HowItWorks />
      <Features />

      {/* CTA Section */}
      <section className="py-24 px-6 bg-white border-t border-[#E5E7EB]">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-semibold text-[#1A1A1A] mb-4">
            Ready to Try It?
          </h2>
          <p className="text-lg text-[#6B7280] mb-8">
            Experience privacy-preserving AI firsthand. No signup required.
          </p>
          <Link href="/demo">
            <Button size="lg">
              Launch Interactive Demo
              <svg
                className="ml-2 w-4 h-4"
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
        </div>
      </section>

      <Footer />
    </main>
  );
}
