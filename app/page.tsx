import Link from 'next/link'
import { Shield, Clock, Search, Star, ArrowRight, CheckCircle } from 'lucide-react'
import { QuickCompareForm } from '@/components/forms/QuickCompareForm'
import { LeadCaptureForm } from '@/components/forms/LeadCaptureForm'
import { Accordion } from '@/components/ui/Accordion'
import { OrganizationJsonLd, WebSiteJsonLd, FAQJsonLd } from '@/components/seo/JsonLd'
import { providers } from '@/lib/providers'
import { formatCurrency } from '@/lib/utils'

const faqs = [
  {
    question: 'What is pet insurance?',
    answer: 'Pet insurance is a health cover policy for your dog or cat that helps pay for veterinary treatment. You pay a monthly premium, and the insurer covers a percentage of your vet bills (minus an excess) up to an annual limit.',
  },
  {
    question: 'How much does pet insurance cost in South Africa?',
    answer: 'Pet insurance in SA costs between R80 and R800 per month, depending on your pet\'s breed, age, and the level of cover you choose. Accident-only plans start from around R80/month, while comprehensive plans with wellness cover can be R500+/month.',
  },
  {
    question: 'Is pet insurance worth it?',
    answer: 'For most pet owners, yes. A single emergency surgery can cost R15,000-R50,000. Pet insurance spreads this risk into manageable monthly payments and ensures your pet gets the best care regardless of the bill.',
  },
  {
    question: 'What does pet insurance cover?',
    answer: 'Depending on your plan, pet insurance can cover accidents, illnesses, chronic conditions, hereditary conditions, dental treatment, and even routine wellness care. Accident-only plans cover the least, while comprehensive plans cover the most.',
  },
  {
    question: 'Can I insure an older pet?',
    answer: 'Most providers have age limits for new sign-ups (typically 8-10 years for dogs). However, MediPet has no age limit, making them a great option for older pets.',
  },
  {
    question: 'Are pre-existing conditions covered?',
    answer: 'Most pet insurers in South Africa do not cover pre-existing conditions. The exception is MediPet\'s LitePlus plan, which is the only plan in SA that covers pre-existing conditions.',
  },
  {
    question: 'How do I claim?',
    answer: 'Most providers use a reimbursement model: you pay the vet, submit a claim, and get reimbursed. Oneplan and 1st for Women use a prepaid card system where money is loaded onto a card before your vet visit.',
  },
  {
    question: 'Is PawCompare free to use?',
    answer: 'Yes, PawCompare is completely free. We\'re an independent comparison site that helps you find the best pet insurance for your needs. We may earn a referral fee from providers, but this never affects our rankings or recommendations.',
  },
]

const topProviders = providers.slice(0, 3)

export default function HomePage() {
  return (
    <>
      <OrganizationJsonLd />
      <WebSiteJsonLd />
      <FAQJsonLd faqs={faqs} />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 via-white to-accent-50 py-12 lg:py-20">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-extrabold text-neutral-800 leading-tight mb-6">
                Compare Pet Insurance in South Africa in{' '}
                <span className="text-primary-500">60 Seconds</span>
              </h1>
              <p className="text-lg text-neutral-600 mb-8 max-w-lg">
                Find the best cover for your dog or cat. Compare plans from 7 top SA providers side by side — free, no obligation.
              </p>
              <div className="flex flex-wrap gap-4 mb-8">
                <div className="flex items-center gap-2 text-sm text-neutral-600">
                  <Shield className="w-5 h-5 text-primary-500" />
                  <span>7 providers compared</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-neutral-600">
                  <Clock className="w-5 h-5 text-primary-500" />
                  <span>Takes 60 seconds</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-neutral-600">
                  <CheckCircle className="w-5 h-5 text-primary-500" />
                  <span>Free, no obligation</span>
                </div>
              </div>
            </div>
            <div>
              <QuickCompareForm />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Providers */}
      <section className="py-12 lg:py-20">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-neutral-800 mb-4">
              Top Pet Insurance Providers
            </h2>
            <p className="text-neutral-600 max-w-2xl mx-auto">
              We&apos;ve compared the leading pet insurance providers in South Africa so you don&apos;t have to.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {topProviders.map((provider) => (
              <div key={provider.id} className="card flex flex-col">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center">
                    <span className="font-heading font-bold text-primary-500 text-sm">
                      {provider.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-lg">{provider.name}</h3>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${i < Math.floor(provider.trustRating) ? 'text-accent-500 fill-accent-500' : 'text-neutral-300'}`}
                        />
                      ))}
                      <span className="text-sm text-neutral-500 ml-1">{provider.trustRating}</span>
                    </div>
                  </div>
                </div>

                <p className="text-sm text-neutral-600 mb-4 flex-1 line-clamp-3">
                  {provider.description}
                </p>

                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-neutral-500">From</span>
                    <span className="font-semibold text-neutral-800">
                      {formatCurrency(provider.plans[0]?.monthlyPremiumFrom || 0)}/month
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-neutral-500">Plans</span>
                    <span className="font-semibold text-neutral-800">{provider.plans.length}</span>
                  </div>
                </div>

                <div className="flex gap-2 mt-auto">
                  <Link
                    href={`/providers/${provider.slug}`}
                    className="flex-1 btn-outline text-sm text-center"
                  >
                    Details
                  </Link>
                  <Link
                    href="/compare"
                    className="flex-1 btn-primary text-sm text-center"
                  >
                    Compare
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link
              href="/providers"
              className="inline-flex items-center gap-2 text-primary-500 hover:text-primary-600 font-semibold transition-colors"
            >
              View all 7 providers <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-12 lg:py-20 bg-neutral-100">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-neutral-800 mb-4">
              How It Works
            </h2>
            <p className="text-neutral-600">Three simple steps to find the perfect cover for your pet.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: '1',
                icon: Search,
                title: 'Choose Your Pet',
                description: 'Tell us about your pet — type, breed, and age. This helps us find the most relevant plans.',
              },
              {
                step: '2',
                icon: Shield,
                title: 'Compare Plans',
                description: 'See all available plans side by side. Filter by price, cover type, and features.',
              },
              {
                step: '3',
                icon: CheckCircle,
                title: 'Get Covered',
                description: 'Choose your plan and get a quote directly from the provider. Or request a callback from an advisor.',
              },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-16 h-16 bg-primary-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-8 h-8 text-white" />
                </div>
                <div className="inline-block bg-accent-500 text-neutral-800 text-xs font-bold px-2 py-1 rounded-full mb-3">
                  Step {item.step}
                </div>
                <h3 className="font-heading font-bold text-xl mb-2">{item.title}</h3>
                <p className="text-neutral-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 lg:py-20">
        <div className="container-custom max-w-3xl">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-neutral-800 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-neutral-600">Everything you need to know about pet insurance in South Africa.</p>
          </div>

          <Accordion items={faqs} />
        </div>
      </section>

      {/* Lead Capture CTA */}
      <section className="py-12 lg:py-20 bg-primary-500">
        <div className="container-custom max-w-4xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
                Not Sure Which Plan Is Right for You?
              </h2>
              <p className="text-primary-100 text-lg mb-6">
                Get free, personalised advice from a pet insurance expert. Fill in the form and we&apos;ll have an advisor contact you within 24 hours.
              </p>
              <ul className="space-y-3 text-primary-100">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-accent-500 flex-shrink-0" />
                  Free, no-obligation consultation
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-accent-500 flex-shrink-0" />
                  Personalised recommendation
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-accent-500 flex-shrink-0" />
                  Help with claims and paperwork
                </li>
              </ul>
            </div>
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-xl">
              <LeadCaptureForm />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
