import type { Metadata } from 'next'
import Link from 'next/link'
import { CheckCircle, ExternalLink } from 'lucide-react'
import { providers } from '@/lib/providers'

export const metadata: Metadata = {
  title: 'Thank You',
  description: 'Thank you for your enquiry. A pet insurance advisor will contact you within 24 hours.',
  robots: { index: false, follow: false },
}

export default function ThankYouPage() {
  return (
    <section className="container-custom py-12 lg:py-20">
      <div className="max-w-2xl mx-auto text-center">
        <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-10 h-10 text-primary-500" />
        </div>

        <h1 className="font-heading text-3xl md:text-4xl font-bold text-neutral-800 mb-4">
          Thank You!
        </h1>

        <p className="text-lg text-neutral-600 mb-8">
          Your details have been submitted successfully. A pet insurance advisor will contact you within 24 hours.
        </p>

        <div className="bg-neutral-50 rounded-2xl p-8 mb-8">
          <h2 className="font-heading font-bold text-xl mb-4">
            In the meantime, get a quote directly:
          </h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {providers.slice(0, 4).map(provider => (
              <a
                key={provider.id}
                href={provider.affiliateLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 bg-white rounded-xl border border-neutral-200 hover:border-primary-200 transition-colors"
              >
                <span className="font-heading font-semibold text-sm">{provider.name}</span>
                <ExternalLink className="w-4 h-4 text-neutral-400" />
              </a>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/compare" className="btn-primary">
            Continue Comparing
          </Link>
          <Link href="/blog" className="btn-outline">
            Read Our Guides
          </Link>
        </div>
      </div>
    </section>
  )
}
