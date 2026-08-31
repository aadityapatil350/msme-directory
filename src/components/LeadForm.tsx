'use client'

import { useState, FormEvent } from 'react'
import { trackEvent } from '@/lib/gtag'
import { toast } from 'sonner'
import { CheckCircle2, Loader2 } from 'lucide-react'

interface Props {
  leadType: 'scheme_enquiry' | 'loan_enquiry' | 'consultant_enquiry' | 'newsletter'
  schemeSlug?: string
  loanSlug?: string
  title?: string
  description?: string
  compact?: boolean
}

const CONSENT_TEXT_VERSION = 'v2026.1_dpdp'

export default function LeadForm({
  leadType,
  schemeSlug,
  loanSlug,
  title = 'Need help with this? Get a free call-back',
  description = 'Share your details and our research team will help you understand eligibility, documents, and next steps. No fees, no obligation.',
  compact = false,
}: Props) {
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({
    fullName: '',
    phone: '',
    email: '',
    city: '',
    state: '',
    loanAmount: '',
    sector: '',
    consentGiven: false,
    marketingConsent: false,
    websiteHp: '', // honeypot
  })

  const handleChange = (k: string, v: string | boolean) => {
    setForm((prev) => ({ ...prev, [k]: v }))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (submitting) return

    if (!form.consentGiven) {
      toast.error('Please tick the consent box to proceed (DPDP Act).')
      return
    }
    if (!form.fullName || !form.phone) {
      toast.error('Name and phone are required.')
      return
    }

    setSubmitting(true)
    trackEvent('form_submit', { lead_type: leadType, scheme_slug: schemeSlug, loan_slug: loanSlug })

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          leadType,
          schemeSlug,
          loanSlug,
          consentTextVersion: CONSENT_TEXT_VERSION,
          landingPage: typeof window !== 'undefined' ? window.location.pathname : undefined,
          referrer: typeof document !== 'undefined' ? document.referrer : undefined,
        }),
      })
      const data = await res.json()
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Submission failed')
      }
      trackEvent('generate_lead', { lead_type: leadType, scheme_slug: schemeSlug, loan_slug: loanSlug, value: 1 })
      setSubmitted(true)
      toast.success('Received. We will reach out within 24 hours.')
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Something went wrong'
      toast.error(msg)
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6 text-center">
        <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
        <div className="font-semibold text-sm text-emerald-950 mb-1">Enquiry received</div>
        <p className="text-xs text-emerald-800">
          A member of our research desk will reach out within 24 hours to help with your enquiry.
        </p>
      </div>
    )
  }

  return (
    <div className="bg-white border border-zinc-200 rounded-xl p-5 sm:p-6 shadow-2xs">
      <div className="mb-4">
        <h3 className="font-bold text-sm text-zinc-950 mb-1">{title}</h3>
        <p className="text-xs text-zinc-500 leading-relaxed">{description}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={form.websiteHp}
          onChange={(e) => handleChange('websiteHp', e.target.value)}
          className="hidden"
          aria-hidden="true"
        />

        <div className={compact ? 'grid grid-cols-1 sm:grid-cols-2 gap-2.5' : 'space-y-2.5'}>
          <input
            type="text"
            required
            placeholder="Full name *"
            value={form.fullName}
            onChange={(e) => handleChange('fullName', e.target.value)}
            className="w-full text-xs bg-zinc-50 border border-zinc-200 focus:border-zinc-400 rounded-lg px-3 py-2.5 outline-none"
          />
          <input
            type="tel"
            required
            pattern="[0-9+\-\s]{10,15}"
            placeholder="Phone (WhatsApp) *"
            value={form.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
            className="w-full text-xs bg-zinc-50 border border-zinc-200 focus:border-zinc-400 rounded-lg px-3 py-2.5 outline-none"
          />
        </div>

        <div className={compact ? 'grid grid-cols-1 sm:grid-cols-2 gap-2.5' : 'space-y-2.5'}>
          <input
            type="email"
            placeholder="Email (optional)"
            value={form.email}
            onChange={(e) => handleChange('email', e.target.value)}
            className="w-full text-xs bg-zinc-50 border border-zinc-200 focus:border-zinc-400 rounded-lg px-3 py-2.5 outline-none"
          />
          <input
            type="text"
            placeholder="City"
            value={form.city}
            onChange={(e) => handleChange('city', e.target.value)}
            className="w-full text-xs bg-zinc-50 border border-zinc-200 focus:border-zinc-400 rounded-lg px-3 py-2.5 outline-none"
          />
        </div>

        {leadType === 'loan_enquiry' && (
          <input
            type="number"
            min={0}
            placeholder="Loan amount required (₹)"
            value={form.loanAmount}
            onChange={(e) => handleChange('loanAmount', e.target.value)}
            className="w-full text-xs bg-zinc-50 border border-zinc-200 focus:border-zinc-400 rounded-lg px-3 py-2.5 outline-none"
          />
        )}

        <label className="flex items-start gap-2 text-[11px] text-zinc-600 leading-snug cursor-pointer">
          <input
            type="checkbox"
            required
            checked={form.consentGiven}
            onChange={(e) => handleChange('consentGiven', e.target.checked)}
            className="mt-0.5 flex-shrink-0"
          />
          <span>
            I consent to MSMEVault collecting and using the details I provide to respond to my enquiry, in line with the{' '}
            <a href="/privacy" target="_blank" className="underline">Privacy Policy</a>. <span className="text-red-600">*</span>
          </span>
        </label>

        <label className="flex items-start gap-2 text-[11px] text-zinc-500 leading-snug cursor-pointer">
          <input
            type="checkbox"
            checked={form.marketingConsent}
            onChange={(e) => handleChange('marketingConsent', e.target.checked)}
            className="mt-0.5 flex-shrink-0"
          />
          <span>I agree to be contacted by phone, SMS, email or WhatsApp about relevant schemes and loans (optional).</span>
        </label>

        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-zinc-950 hover:bg-zinc-800 disabled:opacity-50 text-white text-xs font-medium px-4 py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2"
        >
          {submitting ? (
            <>
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
              <span>Submitting…</span>
            </>
          ) : (
            <span>Request Free Call-back</span>
          )}
        </button>

        <p className="text-[10px] text-zinc-400 text-center leading-snug">
          Free service. MSMEVault is an independent portal and is not affiliated with the Government of India.
        </p>
      </form>
    </div>
  )
}
