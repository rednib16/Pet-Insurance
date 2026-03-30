'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/Button'
import { providers } from '@/lib/providers'
import { getBreedsByPetType, type PetType } from '@/lib/breeds'
import { trackGenerateLead } from '@/lib/analytics'
import { cn } from '@/lib/utils'

interface LeadFormData {
  name: string
  email: string
  phone: string
  petType: string
  breed: string
  petAge: string
  interestedProvider: string
  consent: boolean
}

interface LeadCaptureFormProps {
  preselectedProvider?: string
  className?: string
  onSuccess?: () => void
}

export function LeadCaptureForm({ preselectedProvider, className, onSuccess }: LeadCaptureFormProps) {
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<LeadFormData>({
    defaultValues: {
      interestedProvider: preselectedProvider || '',
    },
  })

  const petType = watch('petType') as PetType | ''
  const breeds = petType ? getBreedsByPetType(petType as PetType) : []

  async function onSubmit(data: LeadFormData) {
    setSubmitting(true)
    setError('')

    try {
      // In production, this would submit to a backend API or service like Formspree/Netlify Forms
      // For the static demo, we simulate a successful submission
      console.log('Lead submitted:', data)
      await new Promise(resolve => setTimeout(resolve, 800))

      trackGenerateLead(data.interestedProvider)
      setSubmitted(true)
      onSuccess?.()
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className={cn('text-center py-8', className)}>
        <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="font-heading font-bold text-xl mb-2">Thank you!</h3>
        <p className="text-neutral-600">
          A pet insurance advisor will contact you within 24 hours.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={cn('space-y-4', className)}>
      {/* Name */}
      <div>
        <label htmlFor="lead-name" className="block text-sm font-medium text-neutral-700 mb-1">
          Full Name *
        </label>
        <input
          id="lead-name"
          type="text"
          {...register('name', { required: 'Name is required' })}
          className="w-full px-4 py-3 rounded-xl border border-neutral-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-colors"
          placeholder="Your full name"
        />
        {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>}
      </div>

      {/* Email */}
      <div>
        <label htmlFor="lead-email" className="block text-sm font-medium text-neutral-700 mb-1">
          Email *
        </label>
        <input
          id="lead-email"
          type="email"
          {...register('email', {
            required: 'Email is required',
            pattern: { value: /^\S+@\S+$/i, message: 'Invalid email address' },
          })}
          className="w-full px-4 py-3 rounded-xl border border-neutral-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-colors"
          placeholder="your@email.com"
        />
        {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>}
      </div>

      {/* Phone */}
      <div>
        <label htmlFor="lead-phone" className="block text-sm font-medium text-neutral-700 mb-1">
          Phone Number *
        </label>
        <input
          id="lead-phone"
          type="tel"
          {...register('phone', { required: 'Phone number is required' })}
          className="w-full px-4 py-3 rounded-xl border border-neutral-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-colors"
          placeholder="082 123 4567"
        />
        {errors.phone && <p className="mt-1 text-sm text-red-500">{errors.phone.message}</p>}
      </div>

      {/* Pet Type */}
      <div>
        <label htmlFor="lead-pettype" className="block text-sm font-medium text-neutral-700 mb-1">
          Pet Type *
        </label>
        <select
          id="lead-pettype"
          {...register('petType', { required: 'Please select pet type' })}
          className="w-full px-4 py-3 rounded-xl border border-neutral-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-colors bg-white"
        >
          <option value="">Select pet type</option>
          <option value="dog">Dog</option>
          <option value="cat">Cat</option>
        </select>
        {errors.petType && <p className="mt-1 text-sm text-red-500">{errors.petType.message}</p>}
      </div>

      {/* Breed */}
      {petType && (
        <div>
          <label htmlFor="lead-breed" className="block text-sm font-medium text-neutral-700 mb-1">
            Breed
          </label>
          <select
            id="lead-breed"
            {...register('breed')}
            className="w-full px-4 py-3 rounded-xl border border-neutral-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-colors bg-white"
          >
            <option value="">Select breed (optional)</option>
            {breeds.map(breed => (
              <option key={breed.name} value={breed.name}>{breed.name}</option>
            ))}
          </select>
        </div>
      )}

      {/* Pet Age */}
      <div>
        <label htmlFor="lead-age" className="block text-sm font-medium text-neutral-700 mb-1">
          Pet Age
        </label>
        <select
          id="lead-age"
          {...register('petAge')}
          className="w-full px-4 py-3 rounded-xl border border-neutral-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-colors bg-white"
        >
          <option value="">Select age (optional)</option>
          <option value="0-1">Under 1 year</option>
          <option value="1-3">1-3 years</option>
          <option value="3-5">3-5 years</option>
          <option value="5-8">5-8 years</option>
          <option value="8+">8+ years</option>
        </select>
      </div>

      {/* Interested Provider */}
      <div>
        <label htmlFor="lead-provider" className="block text-sm font-medium text-neutral-700 mb-1">
          Interested Provider
        </label>
        <select
          id="lead-provider"
          {...register('interestedProvider')}
          className="w-full px-4 py-3 rounded-xl border border-neutral-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-colors bg-white"
        >
          <option value="">No preference</option>
          {providers.map(p => (
            <option key={p.id} value={p.name}>{p.name}</option>
          ))}
        </select>
      </div>

      {/* Consent */}
      <div className="flex items-start gap-3">
        <input
          id="lead-consent"
          type="checkbox"
          {...register('consent', { required: 'You must agree to be contacted' })}
          className="mt-1 w-4 h-4 rounded border-neutral-300 text-primary-500 focus:ring-primary-500"
        />
        <label htmlFor="lead-consent" className="text-sm text-neutral-600">
          I agree to be contacted by a pet insurance advisor. By submitting this form, I consent to the processing of my personal information in accordance with the POPIA. *
        </label>
      </div>
      {errors.consent && <p className="text-sm text-red-500">{errors.consent.message}</p>}

      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600">
          {error}
        </div>
      )}

      <Button type="submit" size="lg" className="w-full" disabled={submitting}>
        {submitting ? 'Submitting...' : 'Get Free Quotes'}
      </Button>

      <p className="text-xs text-neutral-400 text-center">
        Free, no obligation. Your information is secure and will not be shared without your consent.
      </p>
    </form>
  )
}
