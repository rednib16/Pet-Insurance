import type { Metadata } from 'next'
import { Suspense } from 'react'
import { CompareClient } from './CompareClient'

export const metadata: Metadata = {
  title: 'Compare Pet Insurance Plans South Africa',
  description: 'Compare pet insurance plans from 7 top SA providers side by side. Filter by breed, age, coverage type, and budget. Find the best deal in 60 seconds.',
}

export default function ComparePage() {
  return (
    <Suspense fallback={
      <div className="container-custom py-12 text-center">
        <p className="text-neutral-500">Loading comparison tool...</p>
      </div>
    }>
      <CompareClient />
    </Suspense>
  )
}
