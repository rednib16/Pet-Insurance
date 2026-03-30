export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-ZA', {
    style: 'currency',
    currency: 'ZAR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(' ')
}

export function buildUtmLink(baseUrl: string, provider: string, plan?: string): string {
  const url = new URL(baseUrl)
  url.searchParams.set('utm_source', 'pawcompare')
  url.searchParams.set('utm_medium', 'referral')
  url.searchParams.set('utm_campaign', 'comparison')
  url.searchParams.set('utm_content', provider.toLowerCase().replace(/\s+/g, '-'))
  if (plan) {
    url.searchParams.set('utm_term', plan.toLowerCase().replace(/\s+/g, '-'))
  }
  return url.toString()
}
