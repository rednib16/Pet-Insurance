import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Star, Check, X, ExternalLink, Phone, ThumbsUp, ThumbsDown } from 'lucide-react'
import { providers, getProviderBySlug, getCoverageTypeLabel } from '@/lib/providers'
import { formatCurrency } from '@/lib/utils'
import { Breadcrumbs } from '@/components/layout/Breadcrumbs'
import { Badge } from '@/components/ui/Badge'
import { ProductJsonLd } from '@/components/seo/JsonLd'
import { ProviderLeadSection } from './ProviderLeadSection'

interface PageProps {
  params: { slug: string }
}

export function generateStaticParams() {
  return providers.map(p => ({ slug: p.slug }))
}

export function generateMetadata({ params }: PageProps): Metadata {
  const provider = getProviderBySlug(params.slug)
  if (!provider) return {}

  return {
    title: `${provider.name} Pet Insurance Review South Africa`,
    description: `${provider.name} pet insurance review: plans from ${formatCurrency(provider.plans[0]?.monthlyPremiumFrom || 0)}/month. Compare ${provider.plans.length} plans, read pros and cons, and get a quote.`,
    openGraph: {
      title: `${provider.name} Pet Insurance Review | PawCompare`,
      description: `Detailed review of ${provider.name} pet insurance in South Africa. ${provider.plans.length} plans compared.`,
    },
  }
}

export default function ProviderPage({ params }: PageProps) {
  const provider = getProviderBySlug(params.slug)
  if (!provider) notFound()

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.pawcompare.co.za'

  return (
    <>
      <ProductJsonLd
        name={`${provider.name} Pet Insurance`}
        description={provider.description}
        rating={provider.trustRating}
        url={`${siteUrl}/providers/${provider.slug}`}
      />

      <div className="container-custom py-4">
        <Breadcrumbs items={[
          { label: 'Providers', href: '/providers' },
          { label: provider.name, href: `/providers/${provider.slug}` },
        ]} />
      </div>

      <article className="container-custom pb-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center gap-6 mb-8">
          <div className="w-20 h-20 bg-primary-100 rounded-2xl flex items-center justify-center">
            <span className="font-heading font-bold text-primary-500 text-2xl">
              {provider.name.charAt(0)}
            </span>
          </div>
          <div className="flex-1">
            <h1 className="font-heading text-3xl md:text-4xl font-bold text-neutral-800 mb-2">
              {provider.name} Pet Insurance
            </h1>
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${i < Math.floor(provider.trustRating) ? 'text-accent-500 fill-accent-500' : 'text-neutral-300'}`}
                  />
                ))}
                <span className="text-neutral-500 ml-1">{provider.trustRating}/5</span>
              </div>
              <Badge variant="neutral">{provider.plans.length} plans</Badge>
              {provider.vet24Helpline && <Badge variant="success">24/7 Helpline</Badge>}
              {provider.hasExcessBuster && <Badge variant="accent">Excess Buster</Badge>}
            </div>
          </div>
          <div className="flex gap-3">
            <a
              href={provider.affiliateLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary flex items-center gap-2"
            >
              Get a Quote <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Overview */}
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2">
            <div className="card mb-6">
              <h2 className="font-heading font-bold text-xl mb-4">Overview</h2>
              <p className="text-neutral-600 leading-relaxed">{provider.description}</p>
            </div>

            {/* Plans Table */}
            <div className="card mb-6">
              <h2 className="font-heading font-bold text-xl mb-4">Plans & Pricing</h2>
              <div className="overflow-x-auto -mx-6 px-6">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-neutral-200">
                      <th className="text-left py-3 pr-4 font-medium text-neutral-500">Plan</th>
                      <th className="text-left py-3 px-3 font-medium text-neutral-500">Type</th>
                      <th className="text-left py-3 px-3 font-medium text-neutral-500">Premium</th>
                      <th className="text-left py-3 px-3 font-medium text-neutral-500">Annual Limit</th>
                      <th className="text-left py-3 px-3 font-medium text-neutral-500">Excess</th>
                      <th className="text-left py-3 px-3 font-medium text-neutral-500">Waiting</th>
                      <th className="text-center py-3 px-2 font-medium text-neutral-500">Pre-ex</th>
                      <th className="text-center py-3 px-2 font-medium text-neutral-500">Hered.</th>
                      <th className="text-center py-3 px-2 font-medium text-neutral-500">Dental</th>
                      <th className="text-center py-3 px-2 font-medium text-neutral-500">Chronic</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-100">
                    {provider.plans.map(plan => (
                      <tr key={plan.id} className="hover:bg-neutral-50">
                        <td className="py-3 pr-4 font-heading font-semibold">{plan.name}</td>
                        <td className="py-3 px-3">
                          <Badge variant="primary">{getCoverageTypeLabel(plan.coverageType)}</Badge>
                        </td>
                        <td className="py-3 px-3 font-medium">
                          {formatCurrency(plan.monthlyPremiumFrom)}-{formatCurrency(plan.monthlyPremiumTo)}
                        </td>
                        <td className="py-3 px-3 font-medium">{formatCurrency(plan.annualLimit)}</td>
                        <td className="py-3 px-3">
                          {plan.excessPercentage > 0 ? `${plan.excessPercentage}%` : 'Fixed'}
                          {plan.excessMinimum > 0 && ` (min ${formatCurrency(plan.excessMinimum)})`}
                        </td>
                        <td className="py-3 px-3">{plan.waitingPeriodDays} days</td>
                        <td className="py-3 px-2 text-center">
                          {plan.coversPreExisting ? <Check className="w-4 h-4 text-green-500 mx-auto" /> : <X className="w-4 h-4 text-neutral-300 mx-auto" />}
                        </td>
                        <td className="py-3 px-2 text-center">
                          {plan.coversHereditary ? <Check className="w-4 h-4 text-green-500 mx-auto" /> : <X className="w-4 h-4 text-neutral-300 mx-auto" />}
                        </td>
                        <td className="py-3 px-2 text-center">
                          {plan.coversDental ? <Check className="w-4 h-4 text-green-500 mx-auto" /> : <X className="w-4 h-4 text-neutral-300 mx-auto" />}
                        </td>
                        <td className="py-3 px-2 text-center">
                          {plan.coversChronic ? <Check className="w-4 h-4 text-green-500 mx-auto" /> : <X className="w-4 h-4 text-neutral-300 mx-auto" />}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-neutral-400 mt-4">
                * Premiums are indicative &quot;from&quot; prices and vary by breed, age, and location. Verify with the provider.
              </p>
            </div>

            {/* Key Features per Plan */}
            <div className="card mb-6">
              <h2 className="font-heading font-bold text-xl mb-4">Plan Features</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {provider.plans.map(plan => (
                  <div key={plan.id} className="bg-neutral-50 rounded-xl p-4">
                    <h3 className="font-heading font-bold mb-2">{plan.name}</h3>
                    <ul className="space-y-1">
                      {plan.keyFeatures.map((feature, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-neutral-600">
                          <Check className="w-4 h-4 text-primary-500 mt-0.5 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="card">
              <h3 className="font-heading font-bold mb-4">Quick Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-500">Payment Model</span>
                  <span className="font-medium capitalize">{provider.paymentModel.replace(/_/g, ' ')}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-500">Max Dog Age</span>
                  <span className="font-medium">{provider.maxPetAge.dog === 99 ? 'No limit' : `${provider.maxPetAge.dog} years`}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-500">Max Cat Age</span>
                  <span className="font-medium">{provider.maxPetAge.cat === 99 ? 'No limit' : `${provider.maxPetAge.cat} years`}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-500">24/7 Helpline</span>
                  <span className="font-medium">{provider.vet24Helpline ? 'Yes' : 'No'}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-500">Excess Buster</span>
                  <span className="font-medium">{provider.hasExcessBuster ? 'Available' : 'Not available'}</span>
                </div>
              </div>
            </div>

            {/* Pros & Cons */}
            <div className="card">
              <h3 className="font-heading font-bold mb-4 flex items-center gap-2">
                <ThumbsUp className="w-5 h-5 text-green-500" /> Pros
              </h3>
              <ul className="space-y-2 mb-6">
                {provider.pros.map((pro, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-neutral-600">
                    <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    {pro}
                  </li>
                ))}
              </ul>

              <h3 className="font-heading font-bold mb-4 flex items-center gap-2">
                <ThumbsDown className="w-5 h-5 text-red-400" /> Cons
              </h3>
              <ul className="space-y-2">
                {provider.cons.map((con, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-neutral-600">
                    <X className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                    {con}
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA Card */}
            <div className="card bg-primary-50 border-primary-100">
              <h3 className="font-heading font-bold mb-2">Interested in {provider.name}?</h3>
              <p className="text-sm text-neutral-600 mb-4">
                Get a quote directly or request a free callback from an advisor.
              </p>
              <div className="space-y-2">
                <a
                  href={provider.affiliateLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary w-full text-center flex items-center justify-center gap-2"
                >
                  Get a Quote <ExternalLink className="w-4 h-4" />
                </a>
                <Link
                  href="#callback-form"
                  className="btn-outline w-full text-center flex items-center justify-center gap-2"
                >
                  <Phone className="w-4 h-4" /> Request Callback
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Lead Form */}
        <ProviderLeadSection providerName={provider.name} />
      </article>
    </>
  )
}
