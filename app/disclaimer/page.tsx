import type { Metadata } from 'next'
import { Breadcrumbs } from '@/components/layout/Breadcrumbs'

export const metadata: Metadata = {
  title: 'Disclaimer',
  description: 'PawCompare disclaimer. Important information about our pet insurance comparison service.',
}

export default function DisclaimerPage() {
  return (
    <>
      <div className="container-custom py-4">
        <Breadcrumbs items={[{ label: 'Disclaimer', href: '/disclaimer' }]} />
      </div>

      <section className="container-custom pb-12">
        <div className="max-w-3xl mx-auto prose prose-neutral prose-headings:font-heading">
          <h1>Disclaimer</h1>
          <p className="text-sm text-neutral-400">Last updated: March 2026</p>

          <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 not-prose mb-8">
            <p className="font-heading font-bold text-amber-800 mb-2">Important Notice</p>
            <p className="text-amber-700 text-sm">
              PawCompare is a comparison website. We are not an insurer, underwriter, broker, or financial services provider. We do not sell insurance products.
            </p>
          </div>

          <h2>Comparison Service</h2>
          <p>
            PawCompare provides a free comparison service to help South African pet owners compare pet insurance products. Our comparisons are based on publicly available information from insurance providers.
          </p>

          <h2>Not Financial Advice</h2>
          <p>
            Nothing on this website should be construed as financial advice, insurance advice, or a recommendation to purchase any product. The information provided is for general informational purposes only. We recommend consulting with a qualified financial advisor or insurance broker before making any insurance decisions.
          </p>

          <h2>Pricing Information</h2>
          <p>
            All pricing information shown on PawCompare is indicative only. Premiums shown are typically &quot;from&quot; prices and may vary based on your pet&apos;s breed, age, location, and other factors. Actual premiums will be determined by the insurance provider when you apply for a quote. We make every effort to keep pricing current but cannot guarantee real-time accuracy.
          </p>

          <h2>Provider Information</h2>
          <p>
            While we strive to ensure all provider and plan information is accurate, insurance products are updated by providers regularly. Features, terms, conditions, and exclusions may change without notice. Always confirm details directly with the provider before purchasing a policy.
          </p>

          <h2>Affiliate Disclosure</h2>
          <p>
            PawCompare may earn referral fees or commissions when you click on links to provider websites or submit your details for a callback. This commercial relationship does not influence our editorial content, rankings, or recommendations.
          </p>

          <h2>No Liability</h2>
          <p>
            PawCompare accepts no liability for any loss, damage, or inconvenience arising from the use of this website or reliance on any information provided. Your use of this website is entirely at your own risk.
          </p>

          <h2>FAIS Disclaimer</h2>
          <p>
            PawCompare is not a registered Financial Services Provider (FSP) and does not provide advice as defined by the Financial Advisory and Intermediary Services Act (FAIS). If you require personalised financial advice, please consult with a licensed financial advisor.
          </p>
        </div>
      </section>
    </>
  )
}
