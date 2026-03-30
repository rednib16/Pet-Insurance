'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Dog, Cat } from 'lucide-react'
import { getBreedsByPetType, type PetType } from '@/lib/breeds'
import { trackCompareClick } from '@/lib/analytics'
import { cn } from '@/lib/utils'

export function QuickCompareForm() {
  const router = useRouter()
  const [petType, setPetType] = useState<PetType | ''>('')
  const [breed, setBreed] = useState('')
  const [age, setAge] = useState('')

  const breeds = petType ? getBreedsByPetType(petType) : []

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    trackCompareClick()
    const params = new URLSearchParams()
    if (petType) params.set('petType', petType)
    if (breed) params.set('breed', breed)
    if (age) params.set('age', age)
    router.push(`/compare?${params.toString()}`)
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
      {/* Pet Type Selection */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-neutral-700 mb-3">I have a...</label>
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => { setPetType('dog'); setBreed('') }}
            className={cn(
              'flex items-center justify-center gap-2 px-4 py-3 rounded-xl border-2 font-heading font-semibold transition-colors',
              petType === 'dog'
                ? 'border-primary-500 bg-primary-50 text-primary-700'
                : 'border-neutral-200 text-neutral-600 hover:border-neutral-300'
            )}
          >
            <Dog className="w-5 h-5" />
            Dog
          </button>
          <button
            type="button"
            onClick={() => { setPetType('cat'); setBreed('') }}
            className={cn(
              'flex items-center justify-center gap-2 px-4 py-3 rounded-xl border-2 font-heading font-semibold transition-colors',
              petType === 'cat'
                ? 'border-primary-500 bg-primary-50 text-primary-700'
                : 'border-neutral-200 text-neutral-600 hover:border-neutral-300'
            )}
          >
            <Cat className="w-5 h-5" />
            Cat
          </button>
        </div>
      </div>

      {/* Breed Select */}
      {petType && (
        <div className="mb-4">
          <label htmlFor="quick-breed" className="block text-sm font-medium text-neutral-700 mb-1">
            Breed
          </label>
          <select
            id="quick-breed"
            value={breed}
            onChange={(e) => setBreed(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-neutral-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-colors bg-white"
          >
            <option value="">Select breed</option>
            {breeds.map(b => (
              <option key={b.name} value={b.name}>{b.name}</option>
            ))}
          </select>
        </div>
      )}

      {/* Age */}
      <div className="mb-6">
        <label htmlFor="quick-age" className="block text-sm font-medium text-neutral-700 mb-1">
          Age
        </label>
        <select
          id="quick-age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          className="w-full px-4 py-3 rounded-xl border border-neutral-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-colors bg-white"
        >
          <option value="">Select age</option>
          <option value="0-1">Under 1 year</option>
          <option value="1-3">1-3 years</option>
          <option value="3-5">3-5 years</option>
          <option value="5-8">5-8 years</option>
          <option value="8+">8+ years</option>
        </select>
      </div>

      <button
        type="submit"
        className="w-full btn-accent text-lg py-4"
      >
        Compare Now
      </button>
    </form>
  )
}
