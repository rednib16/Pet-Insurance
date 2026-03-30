import type { Metadata } from 'next'
import Link from 'next/link'
import { Shield, Eye, Heart } from 'lucide-react'
import { Breadcrumbs } from '@/components/layout/Breadcrumbs'

export const metadata: Metadata = {
  title: 'About PawCompare',
  description: 'PawCompare is South Africa\'s independent pet insurance comparison site. We help pet owners find the best cover for their dogs and cats.',
}

export default function AboutPage() {
  return (
    <>
      <div className="container-custom py-4">
        <Breadcrumbs items={[{ label: 'About', href: '/about' }]} />
      </div>

      <section className="container-custom pb-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-neutral-800 mb-6">
            About PawCompare
          </h1>

          <div className="prose prose-neutral max-w-none prose-headings:font-heading prose-p:text-neutral-600 prose-p:leading-relaxed mb-12">
            <p className="text-lg">
              PawCompare was created with a simple mission: help South African pet owners find the right pet insurance without the confusion.
            </p>

            <p>
              Less than 1% of South Africa&apos;s estimated 10 million pets are insured. That means millions of pet owners are one unexpected vet bill away from a financial crisis — or worse, having to choose between their pet&apos;s health and their finances.
            </p>

            <p>
              We believe that shouldn&apos;t be the case. Pet insurance is affordable, widely available, and can save you thousands. But comparing plans across different providers is confusing, time-consuming, and often frustrating.
            </p>

            <p>
              That&apos;s why we built PawCompare — a free, independent comparison tool that lets you see all your options side by side in 60 seconds.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {[
              {
                icon: Shield,
                title: 'Independent',
                description: 'We are not owned by or affiliated with any insurance provider. Our recommendations are unbiased.',
              },
              {
                icon: Eye,
                title: 'Transparent',
                description: 'We show you all the details — pricing, excess, exclusions, and fine print — so you can make an informed decision.',
              },
              {
                icon: Heart,
                title: 'For Pets',
                description: 'Everything we do is to help more South African pets get the protection they deserve.',
              },
            ].map(item => (
              <div key={item.title} className="card text-center">
                <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-6 h-6 text-primary-500" />
                </div>
                <h3 className="font-heading font-bold mb-2">{item.title}</h3>
                <p className="text-sm text-neutral-600">{item.description}</p>
              </div>
            ))}
          </div>

          <div className="bg-neutral-100 rounded-2xl p-8 mb-12">
            <h2 className="font-heading font-bold text-xl mb-4">How We Make Money</h2>
            <p className="text-neutral-600 leading-relaxed mb-4">
              PawCompare is free for you to use. We may earn a referral fee when you click through to a provider&apos;s website or when you request a callback through our site.
            </p>
            <p className="text-neutral-600 leading-relaxed">
              Importantly, this never affects our rankings, recommendations, or the information we show you. We always present all providers equally and let you decide what&apos;s best for your pet.
            </p>
          </div>

          <div className="text-center">
            <h2 className="font-heading font-bold text-2xl mb-4">Ready to Compare?</h2>
            <p className="text-neutral-600 mb-6">
              Find the best pet insurance for your furry friend in South Africa.
            </p>
            <Link href="/compare" className="btn-primary">
              Compare Plans Now
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
