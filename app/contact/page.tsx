import type { Metadata } from 'next'
import { Mail, MapPin } from 'lucide-react'
import { Breadcrumbs } from '@/components/layout/Breadcrumbs'
import { ContactForm } from '@/components/forms/ContactForm'

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with PawCompare. Have a question about pet insurance in South Africa? We\'re here to help.',
}

export default function ContactPage() {
  return (
    <>
      <div className="container-custom py-4">
        <Breadcrumbs items={[{ label: 'Contact', href: '/contact' }]} />
      </div>

      <section className="container-custom pb-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-neutral-800 mb-6">
            Contact Us
          </h1>

          <p className="text-neutral-600 text-lg mb-8">
            Have a question about pet insurance? Want to partner with us? Or just want to say hi? We&apos;d love to hear from you.
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <ContactForm />
            </div>

            <div className="space-y-6">
              <div className="card">
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-primary-500 mt-1" />
                  <div>
                    <h3 className="font-heading font-bold mb-1">Email</h3>
                    <p className="text-neutral-600 text-sm">hello@pawcompare.co.za</p>
                  </div>
                </div>
              </div>

              <div className="card">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-primary-500 mt-1" />
                  <div>
                    <h3 className="font-heading font-bold mb-1">Location</h3>
                    <p className="text-neutral-600 text-sm">South Africa (remote team)</p>
                  </div>
                </div>
              </div>

              <div className="bg-primary-50 rounded-2xl p-6">
                <h3 className="font-heading font-bold mb-2">Need pet insurance advice?</h3>
                <p className="text-sm text-neutral-600 mb-4">
                  If you&apos;re looking for help choosing a pet insurance plan, you might prefer to use our free comparison tool or request a callback from an advisor.
                </p>
                <div className="space-y-2">
                  <a href="/compare" className="btn-primary w-full text-center block text-sm">
                    Compare Plans
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
