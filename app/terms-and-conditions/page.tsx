import type { Metadata } from 'next'
import { Breadcrumbs } from '@/components/layout/Breadcrumbs'

export const metadata: Metadata = {
  title: 'Terms and Conditions',
  description: 'PawCompare terms and conditions of use. Read our terms before using our pet insurance comparison website.',
}

export default function TermsPage() {
  return (
    <>
      <div className="container-custom py-4">
        <Breadcrumbs items={[{ label: 'Terms and Conditions', href: '/terms-and-conditions' }]} />
      </div>

      <section className="container-custom pb-12">
        <div className="max-w-3xl mx-auto prose prose-neutral prose-headings:font-heading">
          <h1>Terms and Conditions</h1>
          <p className="text-sm text-neutral-400">Last updated: March 2026</p>

          <h2>1. Acceptance of Terms</h2>
          <p>
            By accessing and using PawCompare (pawcompare.co.za), you accept and agree to be bound by these Terms and Conditions. If you do not agree, please do not use our website.
          </p>

          <h2>2. About PawCompare</h2>
          <p>
            PawCompare is a pet insurance comparison website. We provide information about pet insurance products available in South Africa to help consumers make informed decisions. We are not an insurer, underwriter, or financial services provider.
          </p>

          <h2>3. No Financial Advice</h2>
          <p>
            The information on this website is for general informational purposes only. It does not constitute financial advice, insurance advice, or a recommendation to purchase any specific product. You should always consult with a qualified financial advisor before making insurance decisions.
          </p>

          <h2>4. Accuracy of Information</h2>
          <p>
            While we strive to ensure all information on our website is accurate and up to date, we cannot guarantee the completeness or accuracy of all content. Insurance products, pricing, and terms are subject to change by providers without notice. Always verify details directly with the insurance provider before purchasing.
          </p>

          <h2>5. Third-Party Links</h2>
          <p>
            Our website contains links to third-party insurance provider websites. We are not responsible for the content, privacy practices, or terms of these external sites. Clicking on affiliate links will take you to the provider&apos;s website where their own terms apply.
          </p>

          <h2>6. Affiliate Relationships</h2>
          <p>
            PawCompare may earn referral fees or commissions when you click through to a provider&apos;s website or purchase a product through our links. This does not affect the price you pay and does not influence our rankings or recommendations.
          </p>

          <h2>7. Lead Generation</h2>
          <p>
            When you submit your details through our callback or quote request forms, your information may be shared with relevant pet insurance providers or brokers for the purpose of providing you with a quote or callback. By submitting the form, you consent to this sharing.
          </p>

          <h2>8. Intellectual Property</h2>
          <p>
            All content on this website, including text, graphics, logos, and software, is the property of PawCompare and is protected by South African and international copyright laws.
          </p>

          <h2>9. Limitation of Liability</h2>
          <p>
            PawCompare shall not be liable for any direct, indirect, incidental, or consequential damages arising from your use of this website or reliance on any information provided herein.
          </p>

          <h2>10. Governing Law</h2>
          <p>
            These Terms and Conditions shall be governed by and construed in accordance with the laws of the Republic of South Africa.
          </p>

          <h2>11. Changes to Terms</h2>
          <p>
            We reserve the right to update these Terms at any time. Continued use of the website after changes constitutes acceptance of the new Terms.
          </p>

          <h2>12. Contact</h2>
          <p>
            For any questions regarding these Terms, please contact us at: hello@pawcompare.co.za
          </p>
        </div>
      </section>
    </>
  )
}
