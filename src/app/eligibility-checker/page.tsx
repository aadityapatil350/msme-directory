'use client'

import { useState } from 'react'
import Link from 'next/link'
import { CheckCircle2 } from 'lucide-react'

type FormData = {
  // Step 1: Business Info
  businessType: string
  sector: string[]
  state: string

  // Step 2: Business Details
  annualTurnover: string
  employeeCount: string
  yearsInBusiness: string

  // Step 3: Entrepreneur Profile
  gender: string
  category: string
  hasUdyamRegistration: string

  // Step 4: Funding Need
  loanAmount: string
  purpose: string

  // Step 5: Contact Info
  name: string
  email: string
  phone: string
  consent: boolean
}

const INITIAL_FORM_DATA: FormData = {
  businessType: '',
  sector: [],
  state: '',
  annualTurnover: '',
  employeeCount: '',
  yearsInBusiness: '',
  gender: '',
  category: '',
  hasUdyamRegistration: '',
  loanAmount: '',
  purpose: '',
  name: '',
  email: '',
  phone: '',
  consent: false,
}

export default function EligibilityCheckerPage() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM_DATA)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isComplete, setIsComplete] = useState(false)

  const totalSteps = 5
  const progress = (step / totalSteps) * 100

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1)
    }
  }

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  const handleSectorToggle = (sector: string) => {
    setFormData(prev => ({
      ...prev,
      sector: prev.sector.includes(sector)
        ? prev.sector.filter(s => s !== sector)
        : [...prev.sector, sector]
    }))
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)

    try {
      // Submit lead to API
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          businessType: formData.businessType,
          sector: formData.sector.join(', '),
          state: formData.state,
          annualTurnover: formData.annualTurnover,
          employeeCount: formData.employeeCount,
          loanAmount: formData.loanAmount,
          status: 'new',
          source: 'eligibility_checker',
        }),
      })

      if (response.ok) {
        setIsComplete(true)
      }
    } catch (error) {
      console.error('Error submitting lead:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isComplete) {
    return (
      <div className="min-h-screen bg-[#f0f4ff] py-12">
        <div className="max-w-[700px] mx-auto px-6">
          <div className="bg-white border border-gray-200 rounded-xl p-8 text-center">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <CheckCircle2 className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold mb-2">You're Eligible for Multiple Schemes!</h2>
            <p className="text-gray-600 mb-6">
              We found 12 schemes that match your profile
            </p>

            <p className="text-gray-700 mb-6">
              Our team of experts will analyze your profile and send you a personalized report within 24 hours.
            </p>

            <div className="bg-orange-50 p-6 rounded-lg border border-orange-200 mb-6">
              <h3 className="font-semibold text-gray-900 mb-3">What happens next?</h3>
              <ul className="space-y-2 text-sm text-gray-700 text-left">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-orange-500 flex-shrink-0 mt-0.5" />
                  <span>Personalized eligibility report sent to {formData.email}</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-orange-500 flex-shrink-0 mt-0.5" />
                  <span>Free 15-minute consultation with our expert</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-orange-500 flex-shrink-0 mt-0.5" />
                  <span>Step-by-step application guidance</span>
                </li>
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/schemes" className="flex-1">
                <button className="w-full bg-custom-orange text-white text-sm font-semibold px-6 py-3 rounded-lg hover:bg-[#ea580c] transition-colors">
                  Browse Matching Schemes
                </button>
              </Link>
              <Link href="/consultants" className="flex-1">
                <button className="w-full bg-white border border-gray-300 text-gray-700 text-sm font-semibold px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors">
                  Talk to Expert
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      {/* Page Header */}
      <div className="bg-gradient-to-br from-[#0f1f3d] to-[#1a3a6e] px-6 py-8">
        <div className="max-w-[700px] mx-auto text-center">
          <h1 className="text-3xl font-bold text-white mb-2">
            ✅ Check Your Eligibility
          </h1>
          <p className="text-gray-300 text-sm">
            Answer a few questions to discover schemes you qualify for
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-6 py-8 bg-[#f0f4ff]">
        <div className="max-w-[700px] mx-auto">
          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-semibold text-gray-700">
                Step {step} of {totalSteps}
              </span>
              <span className="text-sm text-gray-600">{Math.round(progress)}% Complete</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-custom-orange h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Form Card */}
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <div className="mb-6">
              <h2 className="text-xl font-bold mb-2">
                {step === 1 && 'Tell us about your business'}
                {step === 2 && 'Business Details'}
                {step === 3 && 'Entrepreneur Profile'}
                {step === 4 && 'Funding Requirements'}
                {step === 5 && 'Your Contact Information'}
              </h2>
              <p className="text-sm text-gray-600">
                {step === 1 && 'Basic information about your business type and sector'}
                {step === 2 && 'Financial and operational details'}
                {step === 3 && 'Information about you as an entrepreneur'}
                {step === 4 && 'How much funding do you need and why?'}
                {step === 5 && 'Get your personalized eligibility report'}
              </p>
            </div>

            {/* Step 1: Business Info */}
            {step === 1 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold mb-3">Business Type</label>
                  <div className="space-y-2">
                    {[
                      { value: 'micro', label: 'Micro Enterprise' },
                      { value: 'small', label: 'Small Enterprise' },
                      { value: 'medium', label: 'Medium Enterprise' },
                      { value: 'startup', label: 'Startup (Not yet registered)' },
                    ].map((option) => (
                      <label key={option.value} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="businessType"
                          value={option.value}
                          checked={formData.businessType === option.value}
                          onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
                          className="w-4 h-4 text-custom-blue"
                        />
                        <span className="text-sm">{option.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-3">Select Your Sector(s)</label>
                  <div className="grid grid-cols-2 gap-3">
                    {['Manufacturing', 'Services', 'Trading', 'Agriculture', 'Technology', 'Healthcare', 'Education', 'Tourism'].map((sector) => (
                      <label key={sector} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.sector.includes(sector)}
                          onChange={() => handleSectorToggle(sector)}
                          className="w-4 h-4 text-custom-blue rounded"
                        />
                        <span className="text-sm">{sector}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label htmlFor="state" className="block text-sm font-semibold mb-2">State</label>
                  <select
                    id="state"
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-custom-blue"
                  >
                    <option value="">Select your state</option>
                    <option value="maharashtra">Maharashtra</option>
                    <option value="gujarat">Gujarat</option>
                    <option value="karnataka">Karnataka</option>
                    <option value="tamil-nadu">Tamil Nadu</option>
                    <option value="rajasthan">Rajasthan</option>
                    <option value="uttar-pradesh">Uttar Pradesh</option>
                    <option value="west-bengal">West Bengal</option>
                    <option value="delhi">Delhi</option>
                    <option value="haryana">Haryana</option>
                    <option value="punjab">Punjab</option>
                  </select>
                </div>
              </div>
            )}

            {/* Step 2: Business Details */}
            {step === 2 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold mb-3">Annual Turnover</label>
                  <div className="space-y-2">
                    {[
                      { value: '0-25l', label: 'Less than ₹25 Lakhs' },
                      { value: '25l-5cr', label: '₹25 Lakhs - ₹5 Crores' },
                      { value: '5cr-50cr', label: '₹5 Crores - ₹50 Crores' },
                      { value: '50cr+', label: 'Above ₹50 Crores' },
                    ].map((option) => (
                      <label key={option.value} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="annualTurnover"
                          value={option.value}
                          checked={formData.annualTurnover === option.value}
                          onChange={(e) => setFormData({ ...formData, annualTurnover: e.target.value })}
                          className="w-4 h-4 text-custom-blue"
                        />
                        <span className="text-sm">{option.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-3">Number of Employees</label>
                  <div className="space-y-2">
                    {[
                      { value: '0-10', label: '1-10 employees' },
                      { value: '11-50', label: '11-50 employees' },
                      { value: '51-100', label: '51-100 employees' },
                      { value: '100+', label: '100+ employees' },
                    ].map((option) => (
                      <label key={option.value} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="employeeCount"
                          value={option.value}
                          checked={formData.employeeCount === option.value}
                          onChange={(e) => setFormData({ ...formData, employeeCount: e.target.value })}
                          className="w-4 h-4 text-custom-blue"
                        />
                        <span className="text-sm">{option.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-3">Years in Business</label>
                  <div className="space-y-2">
                    {[
                      { value: '0-1', label: 'Less than 1 year (Startup)' },
                      { value: '1-3', label: '1-3 years' },
                      { value: '3-5', label: '3-5 years' },
                      { value: '5+', label: 'More than 5 years' },
                    ].map((option) => (
                      <label key={option.value} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="yearsInBusiness"
                          value={option.value}
                          checked={formData.yearsInBusiness === option.value}
                          onChange={(e) => setFormData({ ...formData, yearsInBusiness: e.target.value })}
                          className="w-4 h-4 text-custom-blue"
                        />
                        <span className="text-sm">{option.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Entrepreneur Profile */}
            {step === 3 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold mb-3">Gender</label>
                  <div className="space-y-2">
                    {[
                      { value: 'male', label: 'Male' },
                      { value: 'female', label: 'Female' },
                      { value: 'other', label: 'Other' },
                    ].map((option) => (
                      <label key={option.value} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="gender"
                          value={option.value}
                          checked={formData.gender === option.value}
                          onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                          className="w-4 h-4 text-custom-blue"
                        />
                        <span className="text-sm">{option.label}</span>
                      </label>
                    ))}
                  </div>
                  <p className="text-xs text-gray-500 mt-2">Many schemes have special benefits for women entrepreneurs</p>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-3">Category</label>
                  <div className="space-y-2">
                    {[
                      { value: 'general', label: 'General' },
                      { value: 'sc', label: 'SC (Scheduled Caste)' },
                      { value: 'st', label: 'ST (Scheduled Tribe)' },
                      { value: 'obc', label: 'OBC (Other Backward Class)' },
                    ].map((option) => (
                      <label key={option.value} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="category"
                          value={option.value}
                          checked={formData.category === option.value}
                          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                          className="w-4 h-4 text-custom-blue"
                        />
                        <span className="text-sm">{option.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-3">Do you have Udyam Registration?</label>
                  <div className="space-y-2">
                    {[
                      { value: 'yes', label: 'Yes, I have Udyam Registration' },
                      { value: 'no', label: 'No, but planning to get it' },
                      { value: 'unsure', label: 'Not sure what this is' },
                    ].map((option) => (
                      <label key={option.value} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="hasUdyamRegistration"
                          value={option.value}
                          checked={formData.hasUdyamRegistration === option.value}
                          onChange={(e) => setFormData({ ...formData, hasUdyamRegistration: e.target.value })}
                          className="w-4 h-4 text-custom-blue"
                        />
                        <span className="text-sm">{option.label}</span>
                      </label>
                    ))}
                  </div>
                  <p className="text-xs text-gray-500 mt-2">Udyam Registration is mandatory for many government schemes</p>
                </div>
              </div>
            )}

            {/* Step 4: Funding Need */}
            {step === 4 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold mb-3">How much funding do you need?</label>
                  <div className="space-y-2">
                    {[
                      { value: '0-50k', label: 'Less than ₹50,000' },
                      { value: '50k-5l', label: '₹50,000 - ₹5 Lakhs' },
                      { value: '5l-25l', label: '₹5 Lakhs - ₹25 Lakhs' },
                      { value: '25l-1cr', label: '₹25 Lakhs - ₹1 Crore' },
                      { value: '1cr+', label: 'Above ₹1 Crore' },
                    ].map((option) => (
                      <label key={option.value} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="loanAmount"
                          value={option.value}
                          checked={formData.loanAmount === option.value}
                          onChange={(e) => setFormData({ ...formData, loanAmount: e.target.value })}
                          className="w-4 h-4 text-custom-blue"
                        />
                        <span className="text-sm">{option.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label htmlFor="purpose" className="block text-sm font-semibold mb-2">What will you use the funding for?</label>
                  <select
                    id="purpose"
                    value={formData.purpose}
                    onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-custom-blue"
                  >
                    <option value="">Select purpose</option>
                    <option value="working-capital">Working Capital</option>
                    <option value="machinery">Machinery Purchase</option>
                    <option value="expansion">Business Expansion</option>
                    <option value="new-business">Starting New Business</option>
                    <option value="technology">Technology Upgrade</option>
                    <option value="export">Export Development</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <p className="text-sm text-blue-900">
                    <strong>Good news!</strong> Based on your requirements, you may be eligible for collateral-free loans and subsidies.
                  </p>
                </div>
              </div>
            )}

            {/* Step 5: Contact Info */}
            {step === 5 && (
              <div className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold mb-2">Full Name *</label>
                  <input
                    id="name"
                    type="text"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-custom-blue"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-semibold mb-2">Email Address *</label>
                  <input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-custom-blue"
                  />
                  <p className="text-xs text-gray-500 mt-1">We'll send your eligibility report here</p>
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold mb-2">Phone Number *</label>
                  <input
                    id="phone"
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-custom-blue"
                  />
                  <p className="text-xs text-gray-500 mt-1">For free expert consultation</p>
                </div>

                <div className="flex items-start gap-2">
                  <input
                    id="consent"
                    type="checkbox"
                    checked={formData.consent}
                    onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                    className="w-4 h-4 mt-1 text-custom-blue rounded"
                  />
                  <label htmlFor="consent" className="text-sm leading-relaxed">
                    I agree to receive my eligibility report via email and consent to being contacted by MSMEVault.in and partner consultants for assistance with scheme applications.
                  </label>
                </div>

                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-green-900 mb-1">You're almost done!</p>
                      <p className="text-xs text-green-800">
                        Get instant access to matching schemes and a free consultation with our experts.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex gap-3 mt-8">
              {step > 1 && (
                <button
                  onClick={handleBack}
                  className="flex-1 bg-white border border-gray-300 text-gray-700 text-sm font-semibold px-6 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  ← Back
                </button>
              )}

              {step < totalSteps ? (
                <button
                  onClick={handleNext}
                  disabled={
                    (step === 1 && (!formData.businessType || formData.sector.length === 0 || !formData.state)) ||
                    (step === 2 && (!formData.annualTurnover || !formData.employeeCount || !formData.yearsInBusiness)) ||
                    (step === 3 && (!formData.gender || !formData.category || !formData.hasUdyamRegistration)) ||
                    (step === 4 && (!formData.loanAmount || !formData.purpose))
                  }
                  className="flex-1 bg-custom-orange text-white text-sm font-semibold px-6 py-2 rounded-lg hover:bg-[#ea580c] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Continue →
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={!formData.name || !formData.email || !formData.phone || !formData.consent || isSubmitting}
                  className="flex-1 bg-custom-orange text-white text-sm font-semibold px-6 py-2 rounded-lg hover:bg-[#ea580c] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Submitting...' : 'Get My Results ✓'}
                </button>
              )}
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="mt-6 text-center">
            <div className="flex items-center justify-center gap-6 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-600" />
                <span>100% Free</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-600" />
                <span>No Spam</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-600" />
                <span>Instant Results</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
