'use client'

import { LeadCaptureForm } from '@/components/forms/LeadCaptureForm'

export function ProviderLeadSection({ providerName }: { providerName: string }) {
  return (
    <section id="callback-form" className="max-w-xl mx-auto">
      <div className="card">
        <h2 className="font-heading font-bold text-xl mb-2 text-center">
          Get a Free Callback About {providerName}
        </h2>
        <p className="text-neutral-600 text-sm text-center mb-6">
          Fill in your details and an advisor will contact you within 24 hours.
        </p>
        <LeadCaptureForm preselectedProvider={providerName} />
      </div>
    </section>
  )
}
