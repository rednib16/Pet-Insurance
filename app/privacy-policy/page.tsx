import type { Metadata } from 'next'
import { Breadcrumbs } from '@/components/layout/Breadcrumbs'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'PawCompare privacy policy. Learn how we collect, use, and protect your personal information in compliance with POPIA.',
}

export default function PrivacyPolicyPage() {
  return (
    <>
      <div className="container-custom py-4">
        <Breadcrumbs items={[{ label: 'Privacy Policy', href: '/privacy-policy' }]} />
      </div>

      <section className="container-custom pb-12">
        <div className="max-w-3xl mx-auto prose prose-neutral prose-headings:font-heading">
          <h1>Privacy Policy</h1>
          <p className="text-sm text-neutral-400">Last updated: March 2026</p>

          <h2>1. Introduction</h2>
          <p>
            PawCompare (&quot;we&quot;, &quot;our&quot;, &quot;us&quot;) is committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website pawcompare.co.za.
          </p>
          <p>
            We comply with the Protection of Personal Information Act 4 of 2013 (POPIA) and all applicable South African data protection legislation.
          </p>

          <h2>2. Information We Collect</h2>
          <p>We collect personal information that you voluntarily provide to us when you:</p>
          <ul>
            <li>Fill in a lead capture or callback request form (name, email, phone number)</li>
            <li>Use our contact form</li>
            <li>Subscribe to our newsletter</li>
          </ul>
          <p>We also automatically collect certain information when you visit our site, including:</p>
          <ul>
            <li>Browser type and version</li>
            <li>Operating system</li>
            <li>Pages visited and time spent</li>
            <li>Referring website</li>
            <li>IP address (anonymised)</li>
          </ul>

          <h2>3. How We Use Your Information</h2>
          <p>We use the information we collect to:</p>
          <ul>
            <li>Connect you with pet insurance providers or advisors (when you request a callback)</li>
            <li>Respond to your enquiries</li>
            <li>Improve our website and comparison tools</li>
            <li>Send you relevant communications (only with your consent)</li>
            <li>Analyse website traffic and usage patterns</li>
          </ul>

          <h2>4. Sharing Your Information</h2>
          <p>
            We may share your information with pet insurance providers or brokers when you explicitly request a callback or quote. We will never sell your personal information to third parties.
          </p>
          <p>
            We use Google Analytics to analyse website traffic. Google Analytics may collect anonymised data about your visit. You can opt out of Google Analytics tracking by installing the Google Analytics opt-out browser add-on.
          </p>

          <h2>5. Your Rights Under POPIA</h2>
          <p>Under POPIA, you have the right to:</p>
          <ul>
            <li>Access the personal information we hold about you</li>
            <li>Request correction of inaccurate information</li>
            <li>Request deletion of your personal information</li>
            <li>Object to the processing of your information</li>
            <li>Withdraw consent at any time</li>
            <li>Lodge a complaint with the Information Regulator</li>
          </ul>

          <h2>6. Data Security</h2>
          <p>
            We implement appropriate technical and organisational measures to protect your personal information against unauthorised access, alteration, disclosure, or destruction.
          </p>

          <h2>7. Cookies</h2>
          <p>
            Our website uses cookies to enhance your browsing experience and analyse site traffic. You can control cookies through your browser settings.
          </p>

          <h2>8. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.
          </p>

          <h2>9. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy or wish to exercise your rights, please contact us at: hello@pawcompare.co.za
          </p>
        </div>
      </section>
    </>
  )
}
