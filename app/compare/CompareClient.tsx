'use client'

import { useState, useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Star, Check, X, SlidersHorizontal, ExternalLink } from 'lucide-react'
import { providers, getAllPlans, getCoverageTypeLabel, type CoverageType } from '@/lib/providers'
import { getBreedsByPetType, type PetType } from '@/lib/breeds'
import { formatCurrency, cn } from '@/lib/utils'
import { trackFilterApplied, trackAffiliateClick, trackComparisonStarted } from '@/lib/analytics'
import { Breadcrumbs } from '@/components/layout/Breadcrumbs'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { LeadCaptureForm } from '@/components/forms/LeadCaptureForm'
import { Modal } from '@/components/ui/Modal'

type SortOption = 'price_asc' | 'price_desc' | 'coverage' | 'rating'

export function CompareClient() {
  const searchParams = useSearchParams()

  const [petType, setPetType] = useState<PetType | ''>(
    (searchParams.get('petType') as PetType) || ''
  )
  const [coverageType, setCoverageType] = useState<CoverageType | ''>('')
  const [maxBudget, setMaxBudget] = useState(800)
  const [sortBy, setSortBy] = useState<SortOption>('price_asc')
  const [selectedPlans, setSelectedPlans] = useState<string[]>([])
  const [showSideBySide, setShowSideBySide] = useState(false)
  const [showLeadForm, setShowLeadForm] = useState(false)
  const [leadProvider, setLeadProvider] = useState('')
  const [showFilters, setShowFilters] = useState(false)

  const breeds = petType ? getBreedsByPetType(petType) : []
  const allPlans = getAllPlans()

  const filteredPlans = useMemo(() => {
    let plans = allPlans

    if (coverageType) {
      plans = plans.filter(p => p.coverageType === coverageType)
    }

    plans = plans.filter(p => p.monthlyPremiumFrom <= maxBudget)

    switch (sortBy) {
      case 'price_asc':
        plans.sort((a, b) => a.monthlyPremiumFrom - b.monthlyPremiumFrom)
        break
      case 'price_desc':
        plans.sort((a, b) => b.monthlyPremiumFrom - a.monthlyPremiumFrom)
        break
      case 'coverage':
        plans.sort((a, b) => b.annualLimit - a.annualLimit)
        break
      case 'rating':
        plans.sort((a, b) => {
          const ratingA = providers.find(p => p.slug === a.providerSlug)?.trustRating || 0
          const ratingB = providers.find(p => p.slug === b.providerSlug)?.trustRating || 0
          return ratingB - ratingA
        })
        break
    }

    return plans
  }, [allPlans, coverageType, maxBudget, sortBy])

  const selectedPlanData = allPlans.filter(p => selectedPlans.includes(p.id))

  function togglePlanSelection(planId: string) {
    setSelectedPlans(prev => {
      const newSelection = prev.includes(planId)
        ? prev.filter(id => id !== planId)
        : prev.length < 3
          ? [...prev, planId]
          : prev
      if (newSelection.length > prev.length) {
        trackComparisonStarted(newSelection)
      }
      return newSelection
    })
  }

  function handleCallbackRequest(providerName: string) {
    setLeadProvider(providerName)
    setShowLeadForm(true)
  }

  return (
    <>
      <div className="container-custom py-4">
        <Breadcrumbs items={[{ label: 'Compare Plans', href: '/compare' }]} />
      </div>

      <section className="container-custom pb-12">
        <div className="mb-8">
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-neutral-800 mb-2">
            Compare Pet Insurance Plans
          </h1>
          <p className="text-neutral-600">
            Compare {allPlans.length} plans from {providers.length} providers. Filter by your needs and find the perfect cover.
          </p>
        </div>

        {/* Mobile Filter Toggle */}
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="lg:hidden flex items-center gap-2 mb-4 px-4 py-2 bg-neutral-100 rounded-xl text-sm font-medium"
        >
          <SlidersHorizontal className="w-4 h-4" />
          Filters
        </button>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters */}
          <aside className={cn(
            'lg:w-64 flex-shrink-0 space-y-6',
            showFilters ? 'block' : 'hidden lg:block'
          )}>
            <div className="card">
              <h3 className="font-heading font-bold mb-4">Filters</h3>

              {/* Pet Type */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-neutral-700 mb-2">Pet Type</label>
                <select
                  value={petType}
                  onChange={(e) => {
                    setPetType(e.target.value as PetType | '')
                    trackFilterApplied('petType', e.target.value)
                  }}
                  className="w-full px-3 py-2 rounded-lg border border-neutral-300 text-sm bg-white"
                >
                  <option value="">All</option>
                  <option value="dog">Dog</option>
                  <option value="cat">Cat</option>
                </select>
              </div>

              {/* Breed */}
              {petType && breeds.length > 0 && (
                <div className="mb-4">
                  <label className="block text-sm font-medium text-neutral-700 mb-2">Breed</label>
                  <select
                    className="w-full px-3 py-2 rounded-lg border border-neutral-300 text-sm bg-white"
                    onChange={(e) => trackFilterApplied('breed', e.target.value)}
                  >
                    <option value="">All breeds</option>
                    {breeds.map(b => (
                      <option key={b.name} value={b.name}>{b.name}</option>
                    ))}
                  </select>
                </div>
              )}

              {/* Coverage Type */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-neutral-700 mb-2">Cover Type</label>
                <select
                  value={coverageType}
                  onChange={(e) => {
                    setCoverageType(e.target.value as CoverageType | '')
                    trackFilterApplied('coverageType', e.target.value)
                  }}
                  className="w-full px-3 py-2 rounded-lg border border-neutral-300 text-sm bg-white"
                >
                  <option value="">All types</option>
                  <option value="accident_only">Accident Only</option>
                  <option value="illness_accident">Illness + Accident</option>
                  <option value="comprehensive">Comprehensive</option>
                </select>
              </div>

              {/* Budget Slider */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Max Budget: {formatCurrency(maxBudget)}/month
                </label>
                <input
                  type="range"
                  min={50}
                  max={800}
                  step={50}
                  value={maxBudget}
                  onChange={(e) => setMaxBudget(Number(e.target.value))}
                  className="w-full accent-primary-500"
                />
                <div className="flex justify-between text-xs text-neutral-400 mt-1">
                  <span>R50</span>
                  <span>R800</span>
                </div>
              </div>

              {/* Sort */}
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">Sort By</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="w-full px-3 py-2 rounded-lg border border-neutral-300 text-sm bg-white"
                >
                  <option value="price_asc">Price: Low to High</option>
                  <option value="price_desc">Price: High to Low</option>
                  <option value="coverage">Coverage: High to Low</option>
                  <option value="rating">Rating: High to Low</option>
                </select>
              </div>
            </div>

            {/* Side-by-Side CTA */}
            {selectedPlans.length >= 2 && (
              <Button
                onClick={() => setShowSideBySide(true)}
                className="w-full"
                variant="accent"
              >
                Compare {selectedPlans.length} Plans Side by Side
              </Button>
            )}
          </aside>

          {/* Results */}
          <div className="flex-1">
            <p className="text-sm text-neutral-500 mb-4">
              Showing {filteredPlans.length} plans
              {selectedPlans.length > 0 && ` (${selectedPlans.length} selected)`}
            </p>

            <div className="space-y-4">
              {filteredPlans.map((plan) => {
                const provider = providers.find(p => p.slug === plan.providerSlug)
                if (!provider) return null

                return (
                  <div
                    key={plan.id}
                    className={cn(
                      'card flex flex-col md:flex-row md:items-center gap-4 md:gap-6',
                      selectedPlans.includes(plan.id) && 'ring-2 ring-primary-500'
                    )}
                  >
                    {/* Checkbox */}
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedPlans.includes(plan.id)}
                        onChange={() => togglePlanSelection(plan.id)}
                        className="w-5 h-5 rounded border-neutral-300 text-primary-500 focus:ring-primary-500"
                        aria-label={`Select ${provider.name} ${plan.name} for comparison`}
                        disabled={!selectedPlans.includes(plan.id) && selectedPlans.length >= 3}
                      />
                    </div>

                    {/* Provider Info */}
                    <div className="flex items-center gap-3 md:w-48">
                      <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <span className="font-heading font-bold text-primary-500 text-xs">
                          {provider.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <Link
                          href={`/providers/${provider.slug}`}
                          className="font-heading font-bold text-sm hover:text-primary-500 transition-colors"
                        >
                          {provider.name}
                        </Link>
                        <p className="text-xs text-neutral-500">{plan.name}</p>
                      </div>
                    </div>

                    {/* Plan Details */}
                    <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                      <div>
                        <span className="text-neutral-500 text-xs block">Type</span>
                        <Badge variant="primary">{getCoverageTypeLabel(plan.coverageType)}</Badge>
                      </div>
                      <div>
                        <span className="text-neutral-500 text-xs block">Premium</span>
                        <span className="font-semibold">{formatCurrency(plan.monthlyPremiumFrom)}-{formatCurrency(plan.monthlyPremiumTo)}/mo</span>
                      </div>
                      <div>
                        <span className="text-neutral-500 text-xs block">Annual Limit</span>
                        <span className="font-semibold">{formatCurrency(plan.annualLimit)}</span>
                      </div>
                      <div>
                        <span className="text-neutral-500 text-xs block">Excess</span>
                        <span className="font-semibold">
                          {plan.excessPercentage > 0 ? `${plan.excessPercentage}%` : ''}{' '}
                          {plan.excessMinimum > 0 ? `(min ${formatCurrency(plan.excessMinimum)})` : ''}
                        </span>
                      </div>
                    </div>

                    {/* Feature icons */}
                    <div className="flex gap-2 flex-wrap">
                      {[
                        { label: 'Pre-existing', value: plan.coversPreExisting },
                        { label: 'Hereditary', value: plan.coversHereditary },
                        { label: 'Dental', value: plan.coversDental },
                        { label: 'Chronic', value: plan.coversChronic },
                      ].map(feature => (
                        <div
                          key={feature.label}
                          className="flex items-center gap-1 text-xs"
                          title={feature.label}
                        >
                          {feature.value ? (
                            <Check className="w-4 h-4 text-green-500" />
                          ) : (
                            <X className="w-4 h-4 text-neutral-300" />
                          )}
                          <span className="hidden xl:inline text-neutral-500">{feature.label}</span>
                        </div>
                      ))}
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 md:flex-col md:w-36">
                      <a
                        href={provider.affiliateLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => trackAffiliateClick(provider.name, plan.name)}
                        className="btn-primary text-xs flex-1 text-center flex items-center justify-center gap-1"
                      >
                        Get Quote <ExternalLink className="w-3 h-3" />
                      </a>
                      <button
                        onClick={() => handleCallbackRequest(provider.name)}
                        className="btn-outline text-xs flex-1"
                      >
                        Callback
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>

            {filteredPlans.length === 0 && (
              <div className="text-center py-12">
                <p className="text-neutral-500 mb-4">No plans match your filters.</p>
                <Button onClick={() => { setCoverageType(''); setMaxBudget(800) }} variant="outline">
                  Reset Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Side-by-Side Modal */}
      <Modal
        isOpen={showSideBySide}
        onClose={() => setShowSideBySide(false)}
        title="Side-by-Side Comparison"
      >
        <div className="overflow-x-auto -mx-6 px-6">
          <table className="w-full text-sm">
            <thead>
              <tr>
                <th className="text-left py-2 pr-4 text-neutral-500 font-medium">Feature</th>
                {selectedPlanData.map(plan => (
                  <th key={plan.id} className="text-left py-2 px-2 font-heading font-bold">
                    {plan.providerName}<br />
                    <span className="text-xs font-normal text-neutral-500">{plan.name}</span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {[
                { label: 'Monthly Premium', render: (p: typeof selectedPlanData[0]) => `${formatCurrency(p.monthlyPremiumFrom)}-${formatCurrency(p.monthlyPremiumTo)}` },
                { label: 'Annual Limit', render: (p: typeof selectedPlanData[0]) => formatCurrency(p.annualLimit) },
                { label: 'Excess', render: (p: typeof selectedPlanData[0]) => `${p.excessPercentage}%${p.excessMinimum ? ` (min ${formatCurrency(p.excessMinimum)})` : ''}` },
                { label: 'Waiting Period', render: (p: typeof selectedPlanData[0]) => `${p.waitingPeriodDays} days` },
                { label: 'Pre-existing', render: (p: typeof selectedPlanData[0]) => p.coversPreExisting ? 'Yes' : 'No' },
                { label: 'Hereditary', render: (p: typeof selectedPlanData[0]) => p.coversHereditary ? 'Yes' : 'No' },
                { label: 'Dental', render: (p: typeof selectedPlanData[0]) => p.coversDental ? 'Yes' : 'No' },
                { label: 'Chronic', render: (p: typeof selectedPlanData[0]) => p.coversChronic ? 'Yes' : 'No' },
                { label: 'Routine Care', render: (p: typeof selectedPlanData[0]) => p.coversRoutineCare ? 'Yes' : 'No' },
              ].map(row => (
                <tr key={row.label}>
                  <td className="py-2 pr-4 text-neutral-500">{row.label}</td>
                  {selectedPlanData.map(plan => (
                    <td key={plan.id} className="py-2 px-2 font-medium">
                      {row.render(plan)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Modal>

      {/* Lead Form Modal */}
      <Modal
        isOpen={showLeadForm}
        onClose={() => setShowLeadForm(false)}
        title="Request a Callback"
      >
        <LeadCaptureForm
          preselectedProvider={leadProvider}
          onSuccess={() => setTimeout(() => setShowLeadForm(false), 2000)}
        />
      </Modal>

      {/* Sticky mobile compare button */}
      {selectedPlans.length >= 2 && (
        <div className="fixed bottom-4 left-4 right-4 lg:hidden z-30">
          <Button
            onClick={() => setShowSideBySide(true)}
            className="w-full shadow-lg"
            variant="accent"
            size="lg"
          >
            Compare {selectedPlans.length} Plans
          </Button>
        </div>
      )}
    </>
  )
}
