'use client'

interface JsonLdProps {
  data: Record<string, unknown>
}

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

export function OrganizationJsonLd() {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'PawCompare',
        url: process.env.NEXT_PUBLIC_SITE_URL || 'https://www.pawcompare.co.za',
        logo: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://www.pawcompare.co.za'}/logo.svg`,
        description: 'Compare pet insurance plans from top South African providers. Find the best cover for your dog or cat.',
        sameAs: [],
      }}
    />
  )
}

export function WebSiteJsonLd() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.pawcompare.co.za'
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'PawCompare',
        url: siteUrl,
        potentialAction: {
          '@type': 'SearchAction',
          target: `${siteUrl}/compare?q={search_term_string}`,
          'query-input': 'required name=search_term_string',
        },
      }}
    />
  )
}

export function FAQJsonLd({ faqs }: { faqs: { question: string; answer: string }[] }) {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map(faq => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
        })),
      }}
    />
  )
}

export function ArticleJsonLd({
  title,
  description,
  publishedAt,
  author,
  url,
}: {
  title: string
  description: string
  publishedAt: string
  author: string
  url: string
}) {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: title,
        description,
        datePublished: publishedAt,
        dateModified: publishedAt,
        author: {
          '@type': 'Person',
          name: author,
        },
        publisher: {
          '@type': 'Organization',
          name: 'PawCompare',
          logo: {
            '@type': 'ImageObject',
            url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://www.pawcompare.co.za'}/logo.svg`,
          },
        },
        mainEntityOfPage: url,
      }}
    />
  )
}

export function BreadcrumbJsonLd({ items }: { items: { name: string; url: string }[] }) {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map((item, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: item.name,
          item: item.url,
        })),
      }}
    />
  )
}

export function ProductJsonLd({
  name,
  description,
  rating,
  url,
}: {
  name: string
  description: string
  rating: number
  url: string
}) {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'Product',
        name,
        description,
        url,
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: rating,
          bestRating: 5,
          worstRating: 1,
          ratingCount: 100,
        },
      }}
    />
  )
}
