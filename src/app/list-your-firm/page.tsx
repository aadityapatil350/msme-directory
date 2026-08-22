'use client'

import { useState } from 'react'
import Link from 'next/link'
import { CheckCircle2, ArrowRight, AlertCircle } from 'lucide-react'

const INDIAN_STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
  'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
  'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
  'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
  'Delhi', 'Chandigarh', 'Puducherry'
]

const SERVICES = [
  'MSME Loan DPR Preparation', 'PMEGP Subsidy Filing', 'CGTMSE Bank Coordination',
  'Udyam Registration', 'GST Registration & Return Filing', 'ITR & Tax Audit',
  'Company / LLP Incorporation', 'ZED Certification Handholding', 'Trademark Registration',
  'MSME Samadhaan Dispute Filing', 'Bookkeeping & Compliance'
]

export default function ListYourFirmPage() {
  const [formData, setFormData] = useState({
    firmName: '',
    contactPerson: '',
    professionalType: 'CA',
    membershipNumber: '',
    city: '',
    state: 'Maharashtra',
    phone: '',
    email: '',
    experienceYears: '5',
    services: [] as string[],
    websiteHp: '',
    consentGiven: false,
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  const handleServiceToggle = (service: string) => {
    setFormData((prev) => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter((s) => s !== service)
        : [...prev.services, service],
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMsg('')

    if (!formData.consentGiven) {
      setErrorMsg('Please accept the data processing consent to submit your application.')
      return
    }

    setIsSubmitting(true)

    try {
      const payload = {
        fullName: formData.contactPerson,
        email: formData.email,
        phone: formData.phone,
        city: formData.city,
        state: formData.state,
        businessType: `${formData.professionalType} - ${formData.firmName}`,
        requirement: `Founding Cohort: ${formData.services.join(', ')} (Reg: ${formData.membershipNumber})`,
        leadType: 'consultant_enquiry',
        consentGiven: formData.consentGiven,
        marketingConsent: false,
        consentTextVersion: 'v2026.1_dpdp',
        websiteHp: formData.websiteHp,
      }

      await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      setIsSubmitted(true)
    } catch (err) {
      console.error(err)
      setIsSubmitted(true)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA] py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Breadcrumb */}
        <nav className="text-xs text-zinc-500 mb-4 flex items-center gap-1.5 font-mono">
          <Link href="/" className="hover:text-zinc-950">Home</Link>
          <span>/</span>
          <Link href="/consultants" className="hover:text-zinc-950">Consultants</Link>
          <span>/</span>
          <span className="text-zinc-950">Founding Cohort</span>
        </nav>

        {/* Header */}
        <div className="bg-white border border-zinc-200 rounded-xl p-6 sm:p-8 mb-6 shadow-2xs">
          <div className="inline-flex items-center gap-2 bg-zinc-100 text-zinc-700 text-[10px] font-mono font-medium px-2.5 py-0.5 rounded mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 inline-block" />
            <span>Beta Enrollment &bull; 100% Free</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-zinc-950 tracking-tight mb-2">
            Apply for the Founding Consultant Cohort
          </h1>

          <p className="text-xs sm:text-sm text-zinc-500 leading-relaxed">
            We are onboarding qualified CA firms, CS practitioners, and certified MSME project advisors for our free founding directory cohort. No subscription fees during beta.
          </p>
        </div>

        {isSubmitted ? (
          <div className="bg-white border border-zinc-200 rounded-xl p-8 shadow-2xs text-center space-y-3">
            <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-bold text-zinc-950">
              Application Received
            </h2>
            <p className="text-xs text-zinc-500 max-w-sm mx-auto leading-relaxed">
              Thank you for applying. Our editorial desk will verify your credentials and notify you once your profile is live.
            </p>
            <Link
              href="/"
              className="inline-block bg-zinc-900 text-white text-xs font-medium px-4 py-2 rounded-lg hover:bg-zinc-800 transition-colors"
            >
              Return Home
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white border border-zinc-200 rounded-xl p-6 sm:p-8 shadow-2xs space-y-4">
            {errorMsg && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Honeypot */}
            <input
              type="text"
              name="website_hp"
              value={formData.websiteHp}
              onChange={(e) => setFormData({ ...formData, websiteHp: e.target.value })}
              className="hidden"
              tabIndex={-1}
              autoComplete="off"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="text-[11px] font-mono uppercase text-zinc-500 block mb-1">
                  Firm Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Mehta & Associates"
                  value={formData.firmName}
                  onChange={(e) => setFormData({ ...formData, firmName: e.target.value })}
                  className="w-full p-2 bg-zinc-50 border border-zinc-200 rounded-md text-xs text-zinc-900 outline-none focus:border-zinc-400 focus:bg-white"
                />
              </div>

              <div>
                <label className="text-[11px] font-mono uppercase text-zinc-500 block mb-1">
                  Contact Person *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. CA Rajesh Mehta"
                  value={formData.contactPerson}
                  onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                  className="w-full p-2 bg-zinc-50 border border-zinc-200 rounded-md text-xs text-zinc-900 outline-none focus:border-zinc-400 focus:bg-white"
                />
              </div>

              <div>
                <label className="text-[11px] font-mono uppercase text-zinc-500 block mb-1">
                  Qualification *
                </label>
                <select
                  value={formData.professionalType}
                  onChange={(e) => setFormData({ ...formData, professionalType: e.target.value })}
                  className="w-full p-2 bg-zinc-50 border border-zinc-200 rounded-md text-xs text-zinc-800 outline-none focus:border-zinc-400"
                >
                  <option value="CA">Chartered Accountant (ICAI)</option>
                  <option value="CS">Company Secretary (ICSI)</option>
                  <option value="CMA">Cost Accountant (ICMAI)</option>
                  <option value="MSME_Advisor">MSME Project Consultant</option>
                  <option value="Advocate">Corporate &amp; Tax Advocate</option>
                </select>
              </div>

              <div>
                <label className="text-[11px] font-mono uppercase text-zinc-500 block mb-1">
                  Membership No. *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. ICAI 123456"
                  value={formData.membershipNumber}
                  onChange={(e) => setFormData({ ...formData, membershipNumber: e.target.value })}
                  className="w-full p-2 bg-zinc-50 border border-zinc-200 rounded-md text-xs text-zinc-900 outline-none focus:border-zinc-400 focus:bg-white"
                />
              </div>

              <div>
                <label className="text-[11px] font-mono uppercase text-zinc-500 block mb-1">
                  City *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Pune"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full p-2 bg-zinc-50 border border-zinc-200 rounded-md text-xs text-zinc-900 outline-none focus:border-zinc-400 focus:bg-white"
                />
              </div>

              <div>
                <label className="text-[11px] font-mono uppercase text-zinc-500 block mb-1">
                  State *
                </label>
                <select
                  value={formData.state}
                  onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                  className="w-full p-2 bg-zinc-50 border border-zinc-200 rounded-md text-xs text-zinc-800 outline-none focus:border-zinc-400"
                >
                  {INDIAN_STATES.map((st) => (
                    <option key={st} value={st}>{st}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-[11px] font-mono uppercase text-zinc-500 block mb-1">
                  Mobile Number *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. 9876543210"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full p-2 bg-zinc-50 border border-zinc-200 rounded-md text-xs text-zinc-900 outline-none focus:border-zinc-400 focus:bg-white"
                />
              </div>

              <div>
                <label className="text-[11px] font-mono uppercase text-zinc-500 block mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  placeholder="e.g. partner@firm.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full p-2 bg-zinc-50 border border-zinc-200 rounded-md text-xs text-zinc-900 outline-none focus:border-zinc-400 focus:bg-white"
                />
              </div>
            </div>

            {/* Services */}
            <div>
              <label className="text-[11px] font-mono uppercase text-zinc-500 block mb-1.5">
                Practice Areas
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                {SERVICES.map((srv) => (
                  <label key={srv} className="flex items-center gap-2 p-1.5 border border-zinc-200 rounded text-xs cursor-pointer hover:bg-zinc-50">
                    <input
                      type="checkbox"
                      checked={formData.services.includes(srv)}
                      onChange={() => handleServiceToggle(srv)}
                      className="w-3.5 h-3.5 text-zinc-900 rounded accent-zinc-950"
                    />
                    <span className="text-zinc-700 text-[11px]">{srv}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Consent Box */}
            <div className="bg-zinc-50 border border-zinc-200 rounded-lg p-3">
              <label className="flex items-start gap-2 text-xs text-zinc-600 leading-relaxed cursor-pointer">
                <input
                  type="checkbox"
                  required
                  checked={formData.consentGiven}
                  onChange={(e) => setFormData({ ...formData, consentGiven: e.target.checked })}
                  className="w-3.5 h-3.5 text-zinc-900 rounded mt-0.5 accent-zinc-950 flex-shrink-0"
                />
                <span className="text-[11px]">
                  <strong>Required:</strong> I confirm that I am a practicing professional and consent to MSMEVault storing and verifying these credentials under the{' '}
                  <Link href="/privacy" target="_blank" className="text-zinc-900 underline font-medium">
                    Privacy Policy
                  </Link>.
                </span>
              </label>
            </div>

            <button
              type="submit"
              disabled={isSubmitting || !formData.consentGiven}
              className="w-full bg-zinc-950 hover:bg-zinc-800 disabled:opacity-40 text-white text-xs font-medium py-2.5 rounded-lg transition-colors flex items-center justify-center gap-1.5"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Founding Application (Free)'}
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
