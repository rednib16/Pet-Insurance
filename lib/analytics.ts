declare global {
  interface Window {
    dataLayer: Record<string, unknown>[]
    gtag: (...args: unknown[]) => void
  }
}

export function trackEvent(eventName: string, parameters?: Record<string, string | number | boolean>) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, parameters)
  }
  if (typeof window !== 'undefined' && window.dataLayer) {
    window.dataLayer.push({
      event: eventName,
      ...parameters,
    })
  }
}

export function trackCompareClick() {
  trackEvent('compare_click')
}

export function trackFilterApplied(filterType: string, filterValue: string) {
  trackEvent('filter_applied', { filter_type: filterType, filter_value: filterValue })
}

export function trackProviderView(providerName: string) {
  trackEvent('provider_view', { provider_name: providerName })
}

export function trackAffiliateClick(providerName: string, planName: string) {
  trackEvent('affiliate_click', { provider_name: providerName, plan_name: planName })
}

export function trackGenerateLead(provider?: string) {
  trackEvent('generate_lead', { interested_provider: provider || 'none' })
}

export function trackCallbackRequest(providerName: string) {
  trackEvent('callback_request', { provider_name: providerName })
}

export function trackBlogRead(postTitle: string, category: string) {
  trackEvent('blog_read', { post_title: postTitle, category })
}

export function trackComparisonStarted(providers: string[]) {
  trackEvent('comparison_started', { providers: providers.join(',') })
}
