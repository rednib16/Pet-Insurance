import type { Metadata } from 'next'
import Link from 'next/link'
import { Star, ArrowRight } from 'lucide-react'
import { providers } from '@/lib/providers'
import { formatCurrency } from '@/lib/utils'
import { Breadcrumbs } from '@/components/layout/Breadcrumbs'
import { Badge } from '@/components/ui/Badge'

export const metadata: Metadata = {
  title: 'Pet Insurance Providers in South Africa',
  description: 'Compare all pet insurance providers in South Africa. Oneplan, Dotsure, MediPet, OUTsurance, Kido, 1st for Women, and PawPaw reviewed.',
}

export default function ProvidersPage() {
  return (
    <>
      <div className="container-custom py-4">
        <Breadcrumbs items={[{ label: 'Providers', href: '/providers' }]} />
      </div>

      <section className="container-custom pb-12">
        <div className="mb-8">
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-neutral-800 mb-2">
            Pet Insurance Providers in South Africa
          </h1>
          <p className="text-neutral-600 max-w-2xl">
            We&apos;ve reviewed all {providers.length} major pet insurance providers in South Africa. Click on any provider to see detailed plan information, pros and cons, and pricing.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {providers.map(provider => {
            const cheapest = Math.min(...provider.plans.map(p => p.monthlyPremiumFrom))
            const highest = Math.max(...provider.plans.map(p => p.annualLimit))

            return (
              <Link
                key={provider.id}
                href={`/providers/${provider.slug}`}
                className="card group hover:border-primary-200"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-14 h-14 bg-primary-100 rounded-xl flex items-center justify-center">
                    <span className="font-heading font-bold text-primary-500 text-lg">
                      {provider.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h2 className="font-heading font-bold text-lg group-hover:text-primary-500 transition-colors">
                      {provider.name}
                    </h2>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3.5 h-3.5 ${i < Math.floor(provider.trustRating) ? 'text-accent-500 fill-accent-500' : 'text-neutral-300'}`}
                        />
                      ))}
                      <span className="text-xs text-neutral-500 ml-1">{provider.trustRating}/5</span>
                    </div>
                  </div>
                </div>

                <p className="text-sm text-neutral-600 mb-4 line-clamp-2">
                  {provider.description}
                </p>

                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="bg-neutral-50 rounded-lg p-3">
                    <span className="text-xs text-neutral-500 block">From</span>
                    <span className="font-heading font-bold text-sm">{formatCurrency(cheapest)}/mo</span>
                  </div>
                  <div className="bg-neutral-50 rounded-lg p-3">
                    <span className="text-xs text-neutral-500 block">Max Cover</span>
                    <span className="font-heading font-bold text-sm">{formatCurrency(highest)}/yr</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="neutral">{provider.plans.length} plans</Badge>
                  {provider.vet24Helpline && <Badge variant="success">24/7 Helpline</Badge>}
                  {provider.hasExcessBuster && <Badge variant="accent">Excess Buster</Badge>}
                </div>

                <div className="flex items-center gap-1 text-primary-500 font-semibold text-sm group-hover:gap-2 transition-all">
                  View Details <ArrowRight className="w-4 h-4" />
                </div>
              </Link>
            )
          })}
        </div>
      </section>
    </>
  )
}
