import Link from 'next/link'
import { ChevronRight, Home } from 'lucide-react'
import { BreadcrumbJsonLd } from '@/components/seo/JsonLd'

interface BreadcrumbItem {
  label: string
  href: string
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[]
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.pawcompare.co.za'
  const allItems = [{ label: 'Home', href: '/' }, ...items]

  return (
    <>
      <BreadcrumbJsonLd
        items={allItems.map(item => ({
          name: item.label,
          url: `${siteUrl}${item.href}`,
        }))}
      />
      <nav aria-label="Breadcrumb" className="py-3">
        <ol className="flex items-center flex-wrap gap-1 text-sm">
          {allItems.map((item, index) => (
            <li key={item.href} className="flex items-center gap-1">
              {index > 0 && (
                <ChevronRight className="w-4 h-4 text-neutral-400 flex-shrink-0" />
              )}
              {index === allItems.length - 1 ? (
                <span className="text-neutral-500" aria-current="page">
                  {index === 0 ? <Home className="w-4 h-4" /> : item.label}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="text-primary-500 hover:text-primary-600 transition-colors"
                >
                  {index === 0 ? <Home className="w-4 h-4" /> : item.label}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  )
}
