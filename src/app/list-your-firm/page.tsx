'use client'

import { useState } from 'react'
import Link from 'next/link'
import { CheckCircle, X, Star, Zap, Shield, TrendingUp, Users, Phone } from 'lucide-react'

declare global {
  interface Window {
    Razorpay: any
  }
}

const INDIAN_STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
  'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
  'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
  'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
  'Delhi', 'Chandigarh', 'Puducherry'
]

const SERVICES = [
  'MSME Loans', 'Mudra Loans', 'GST Registration', 'GST Filing',
  'Udyam Registration', 'ITR Filing', 'Company Registration',
  'Trademark Registration', 'FSSAI License', 'Import Export Code',
  'Compliance & Audit', 'Business Advisory', 'Tax Planning', 'Bookkeeping'
]

export default function ListYourFirmPage() {
  const [selectedPlan, setSelectedPlan] = useState<'free' | 'featured'>('featured')
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    firmName: '',
    contactName: '',
    designation: '',
    city: '',
    state: '',
    phone: '',
    email: '',
    website: '',
    experience: '',
    services: [] as string[],
    bio: '',
  })

  const handleServiceToggle = (service: string) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter(s => s !== service)
        : [...prev.services, service]
    }))
  }

  const loadRazorpayScript = (): Promise<boolean> => {
    return new Promise((resolve) => {
      if (window.Razorpay) {
        resolve(true)
        return
      }
      const script = document.createElement('script')
      script.src = 'https://checkout.razorpay.com/v1/checkout.js'
      script.onload = () => resolve(true)
      script.onerror = () => resolve(false)
      document.body.appendChild(script)
    })
  }

  const handlePayment = async (consultantId?: string) => {
    const loaded = await loadRazorpayScript()
    if (!loaded) {
      setError('Failed to load payment gateway. Please try again.')
      return
    }

    try {
      // Create order
      const orderRes = await fetch('/api/payments/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ consultantId, tier: 'featured' }),
      })

      if (!orderRes.ok) {
        throw new Error('Failed to create payment order')
      }

      const orderData = await orderRes.json()

      // Open Razorpay checkout
      const options = {
        key: orderData.keyId,
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'MSMEVault',
        description: 'Featured Listing - 30 Days',
        order_id: orderData.orderId,
        handler: async function (response: any) {
          // Verify payment
          const verifyRes = await fetch('/api/payments/verify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              consultantId,
            }),
          })

          if (verifyRes.ok) {
            setIsSubmitted(true)
          } else {
            setError('Payment verification failed. Please contact support.')
          }
        },
        prefill: {
          name: formData.contactName,
          email: formData.email,
          contact: formData.phone,
        },
        theme: {
          color: '#0f1f3d',
        },
      }

      const razorpay = new window.Razorpay(options)
      razorpay.open()
    } catch (err) {
      console.error('Payment error:', err)
      setError('Payment failed. Please try again.')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      // Submit listing enquiry
      const res = await fetch('/api/listing-enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          tier: selectedPlan,
        }),
      })

      if (!res.ok) {
        throw new Error('Failed to submit listing')
      }

      const data = await res.json()

      if (!res.ok) {
        if (data.existingListing) {
          setError('A listing with this email already exists. Please login to manage your listing.')
          return
        }
        throw new Error(data.error || 'Failed to submit listing')
      }

      if (selectedPlan === 'featured') {
        // Redirect to payment
        await handlePayment(data.consultantId)
      } else {
        // Free plan - just show success
        setIsSubmitted(true)
      }
    } catch (err: any) {
      console.error('Submit error:', err)
      setError(err.message || 'Failed to submit listing. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-[#f0f4ff] flex items-center justify-center px-6">
        <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center shadow-xl">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="font-['Syne'] text-2xl font-extrabold text-[var(--navy)] mb-3">
            {selectedPlan === 'featured' ? 'Payment Successful!' : 'Listing Submitted!'}
          </h1>
          <p className="text-gray-600 mb-6">
            {selectedPlan === 'featured'
              ? 'Your Featured listing is now live! You can manage your listing from your dashboard.'
              : 'Your Free listing has been submitted. Once approved, you can login with your email to manage it.'}
          </p>
          <div className="space-y-3">
            {selectedPlan === 'featured' && (
              <Link href="/consultant/login">
                <button className="w-full bg-[var(--orange)] text-white font-bold py-3 rounded-lg hover:bg-[#ea580c] transition-colors">
                  Go to Dashboard →
                </button>
              </Link>
            )}
            <Link href="/consultants">
              <button className="w-full bg-[var(--blue)] text-white font-bold py-3 rounded-lg hover:bg-[#1e40af] transition-colors">
                View All Consultants
              </button>
            </Link>
            <Link href="/">
              <button className="w-full bg-gray-100 text-gray-700 font-bold py-3 rounded-lg hover:bg-gray-200 transition-colors">
                Go to Homepage
              </button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-[var(--navy)] via-[#1a3a6e] to-[#0f2d5a] px-4 md:px-6 py-12 text-white relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--orange)] opacity-5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[var(--blue)] opacity-5 rounded-full blur-3xl"></div>

        <div className="max-w-[1200px] mx-auto relative z-10">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-4">
              <Users className="w-4 h-4 text-[var(--orange)]" />
              <span className="text-sm font-medium">Join 500+ CA Firms & Consultants</span>
            </div>
            <h1 className="font-['Syne'] text-3xl md:text-4xl font-extrabold mb-3">
              List Your CA Firm / Consultancy
            </h1>
            <p className="text-blue-200 text-lg max-w-2xl mx-auto">
              Join India's #1 MSME consultants directory and get leads from 10,000+ MSME owners searching for help in your city
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-white">10,000+</div>
              <div className="text-sm text-blue-200">Monthly Visitors</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-white">500+</div>
              <div className="text-sm text-blue-200">Active Leads/Month</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-white">50+</div>
              <div className="text-sm text-blue-200">Cities Covered</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-white">4.8/5</div>
              <div className="text-sm text-blue-200">Consultant Rating</div>
            </div>
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-[900px] mx-auto">
            {/* Free Plan */}
            <div
              onClick={() => setSelectedPlan('free')}
              className={`bg-white rounded-2xl p-6 text-gray-900 cursor-pointer transition-all ${
                selectedPlan === 'free'
                  ? 'ring-4 ring-[var(--blue)] shadow-2xl scale-[1.02]'
                  : 'hover:shadow-xl'
              }`}
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-['Syne'] text-xl font-extrabold">Free</h3>
                  <p className="text-sm text-gray-500">Get started for free</p>
                </div>
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                  selectedPlan === 'free' ? 'border-[var(--blue)] bg-[var(--blue)]' : 'border-gray-300'
                }`}>
                  {selectedPlan === 'free' && <CheckCircle className="w-4 h-4 text-white" />}
                </div>
              </div>

              <div className="mb-6">
                <span className="font-['Syne'] text-4xl font-extrabold text-[var(--navy)]">₹0</span>
                <span className="text-gray-500 ml-2">forever</span>
              </div>

              <ul className="space-y-3 mb-6">
                <li className="flex items-center gap-3 text-sm">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span>Basic listing with firm name & city</span>
                </li>
                <li className="flex items-center gap-3 text-sm">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span>Up to 5 services listed</span>
                </li>
                <li className="flex items-center gap-3 text-sm">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span>Contact details visible</span>
                </li>
                <li className="flex items-center gap-3 text-sm text-gray-400">
                  <X className="w-5 h-5 flex-shrink-0" />
                  <span>No verified badge</span>
                </li>
                <li className="flex items-center gap-3 text-sm text-gray-400">
                  <X className="w-5 h-5 flex-shrink-0" />
                  <span>Listed below Featured consultants</span>
                </li>
                <li className="flex items-center gap-3 text-sm text-gray-400">
                  <X className="w-5 h-5 flex-shrink-0" />
                  <span>No homepage visibility</span>
                </li>
              </ul>

              <button
                type="button"
                className={`w-full py-3 rounded-xl font-bold transition-colors ${
                  selectedPlan === 'free'
                    ? 'bg-[var(--blue)] text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {selectedPlan === 'free' ? 'Selected' : 'Select Free Plan'}
              </button>
            </div>

            {/* Featured Plan */}
            <div
              onClick={() => setSelectedPlan('featured')}
              className={`bg-gradient-to-br from-[var(--navy)] to-[#1a3a6e] rounded-2xl p-6 text-white cursor-pointer transition-all relative overflow-hidden ${
                selectedPlan === 'featured'
                  ? 'ring-4 ring-[var(--orange)] shadow-2xl scale-[1.02]'
                  : 'hover:shadow-xl'
              }`}
            >
              {/* Popular badge */}
              <div className="absolute top-0 right-0 bg-[var(--orange)] text-white text-xs font-bold px-4 py-1.5 rounded-bl-xl">
                MOST POPULAR
              </div>

              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-['Syne'] text-xl font-extrabold flex items-center gap-2">
                    <Star className="w-5 h-5 text-[var(--orange)]" />
                    Featured
                  </h3>
                  <p className="text-sm text-blue-200">Maximum visibility & leads</p>
                </div>
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                  selectedPlan === 'featured' ? 'border-[var(--orange)] bg-[var(--orange)]' : 'border-white/50'
                }`}>
                  {selectedPlan === 'featured' && <CheckCircle className="w-4 h-4 text-white" />}
                </div>
              </div>

              <div className="mb-6">
                <span className="font-['Syne'] text-4xl font-extrabold text-[var(--orange)]">₹2,999</span>
                <span className="text-blue-200 ml-2">/month</span>
              </div>

              <ul className="space-y-3 mb-6">
                <li className="flex items-center gap-3 text-sm">
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <span>Everything in Free, plus:</span>
                </li>
                <li className="flex items-center gap-3 text-sm">
                  <Shield className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <span className="font-semibold">Verified badge on listing</span>
                </li>
                <li className="flex items-center gap-3 text-sm">
                  <TrendingUp className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <span className="font-semibold">Top placement in search results</span>
                </li>
                <li className="flex items-center gap-3 text-sm">
                  <Zap className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <span className="font-semibold">Featured on homepage</span>
                </li>
                <li className="flex items-center gap-3 text-sm">
                  <Phone className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <span className="font-semibold">WhatsApp quick contact button</span>
                </li>
                <li className="flex items-center gap-3 text-sm">
                  <Users className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <span className="font-semibold">Unlimited leads access</span>
                </li>
              </ul>

              <button
                type="button"
                className={`w-full py-3 rounded-xl font-bold transition-colors ${
                  selectedPlan === 'featured'
                    ? 'bg-[var(--orange)] text-white'
                    : 'bg-white/20 text-white hover:bg-white/30'
                }`}
              >
                {selectedPlan === 'featured' ? 'Selected - ₹2,999/month' : 'Select Featured Plan'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Already Listed CTA */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-4 md:px-6 py-6">
        <div className="max-w-[700px] mx-auto">
          <div className="bg-white border border-blue-200 rounded-xl p-5 flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="font-semibold text-[var(--navy)]">Already have a listing?</h3>
              <p className="text-sm text-gray-600">Find your existing listing and upgrade to Featured for better visibility</p>
            </div>
            <Link href="/upgrade-listing">
              <button className="whitespace-nowrap bg-[var(--blue)] text-white px-6 py-2.5 rounded-lg font-semibold text-sm hover:bg-[#1e40af] transition-colors">
                Upgrade Existing Listing →
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Form Section */}
      <div className="px-4 md:px-6 py-10 bg-[#f0f4ff]">
        <div className="max-w-[700px] mx-auto">
          <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-lg">
            <div className="bg-gradient-to-r from-gray-50 to-slate-50 px-6 py-5 border-b border-gray-200">
              <h2 className="font-['Syne'] text-xl font-extrabold text-[var(--navy)]">
                Submit Your Listing
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                {selectedPlan === 'featured'
                  ? 'Complete the form and proceed to payment. Your listing goes live instantly!'
                  : 'Complete the form. Our team will review and approve within 24 hours.'}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                  {error}
                  {error.includes('already exists') && (
                    <Link href="/consultant/login" className="block mt-2 text-[var(--blue)] font-semibold hover:underline">
                      Login to your dashboard →
                    </Link>
                  )}
                </div>
              )}

              {/* Firm Details */}
              <div>
                <h3 className="font-semibold text-[var(--navy)] mb-3 flex items-center gap-2">
                  <span className="w-6 h-6 bg-[var(--blue)] text-white rounded-full text-xs flex items-center justify-center">1</span>
                  Firm Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Firm Name *</label>
                    <input
                      type="text"
                      value={formData.firmName}
                      onChange={(e) => setFormData({ ...formData, firmName: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm outline-none focus:border-[var(--blue)] focus:ring-2 focus:ring-blue-50 transition-all"
                      placeholder="ABC & Associates"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
                    <input
                      type="url"
                      value={formData.website}
                      onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm outline-none focus:border-[var(--blue)] focus:ring-2 focus:ring-blue-50 transition-all"
                      placeholder="https://example.com"
                    />
                  </div>
                </div>
              </div>

              {/* Contact Person */}
              <div>
                <h3 className="font-semibold text-[var(--navy)] mb-3 flex items-center gap-2">
                  <span className="w-6 h-6 bg-[var(--blue)] text-white rounded-full text-xs flex items-center justify-center">2</span>
                  Contact Person
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                    <input
                      type="text"
                      value={formData.contactName}
                      onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm outline-none focus:border-[var(--blue)] focus:ring-2 focus:ring-blue-50 transition-all"
                      placeholder="Rajesh Sharma"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Designation</label>
                    <input
                      type="text"
                      value={formData.designation}
                      onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm outline-none focus:border-[var(--blue)] focus:ring-2 focus:ring-blue-50 transition-all"
                      placeholder="Chartered Accountant"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm outline-none focus:border-[var(--blue)] focus:ring-2 focus:ring-blue-50 transition-all"
                      placeholder="+91 98765 43210"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm outline-none focus:border-[var(--blue)] focus:ring-2 focus:ring-blue-50 transition-all"
                      placeholder="contact@example.com"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Location */}
              <div>
                <h3 className="font-semibold text-[var(--navy)] mb-3 flex items-center gap-2">
                  <span className="w-6 h-6 bg-[var(--blue)] text-white rounded-full text-xs flex items-center justify-center">3</span>
                  Location
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">City *</label>
                    <input
                      type="text"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm outline-none focus:border-[var(--blue)] focus:ring-2 focus:ring-blue-50 transition-all"
                      placeholder="Mumbai"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">State *</label>
                    <select
                      value={formData.state}
                      onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm outline-none focus:border-[var(--blue)] focus:ring-2 focus:ring-blue-50 transition-all bg-white"
                      required
                    >
                      <option value="">Select State</option>
                      {INDIAN_STATES.map(state => (
                        <option key={state} value={state}>{state}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Experience & Services */}
              <div>
                <h3 className="font-semibold text-[var(--navy)] mb-3 flex items-center gap-2">
                  <span className="w-6 h-6 bg-[var(--blue)] text-white rounded-full text-xs flex items-center justify-center">4</span>
                  Experience & Services
                </h3>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Years of Experience</label>
                  <input
                    type="number"
                    value={formData.experience}
                    onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                    className="w-full md:w-1/2 px-4 py-3 border border-gray-200 rounded-lg text-sm outline-none focus:border-[var(--blue)] focus:ring-2 focus:ring-blue-50 transition-all"
                    placeholder="10"
                    min="0"
                    max="50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Services Offered * <span className="text-gray-400 font-normal">(Select at least 1)</span>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {SERVICES.map(service => (
                      <button
                        key={service}
                        type="button"
                        onClick={() => handleServiceToggle(service)}
                        className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                          formData.services.includes(service)
                            ? 'bg-[var(--blue)] text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {formData.services.includes(service) && <span className="mr-1">✓</span>}
                        {service}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bio */}
              <div>
                <h3 className="font-semibold text-[var(--navy)] mb-3 flex items-center gap-2">
                  <span className="w-6 h-6 bg-[var(--blue)] text-white rounded-full text-xs flex items-center justify-center">5</span>
                  About Your Firm
                </h3>
                <textarea
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm outline-none focus:border-[var(--blue)] focus:ring-2 focus:ring-blue-50 transition-all"
                  rows={4}
                  placeholder="Tell potential clients about your firm, specializations, achievements, and why they should choose you..."
                />
              </div>

              {/* Submit */}
              <div className="pt-4 border-t border-gray-200">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-[var(--navy)]">
                        {selectedPlan === 'featured' ? 'Featured Listing' : 'Free Listing'}
                      </p>
                      <p className="text-sm text-gray-600">
                        {selectedPlan === 'featured'
                          ? 'Your listing goes live immediately after payment'
                          : 'Your listing will be reviewed within 24 hours'}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-[var(--navy)]">
                        {selectedPlan === 'featured' ? '₹2,999' : '₹0'}
                      </p>
                      {selectedPlan === 'featured' && (
                        <p className="text-xs text-gray-500">/month</p>
                      )}
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading || formData.services.length === 0}
                  className={`w-full py-4 rounded-xl font-bold text-lg transition-all ${
                    isLoading || formData.services.length === 0
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : selectedPlan === 'featured'
                      ? 'bg-[var(--orange)] text-white hover:bg-[#ea580c] shadow-lg hover:shadow-xl'
                      : 'bg-[var(--blue)] text-white hover:bg-[#1e40af] shadow-lg hover:shadow-xl'
                  }`}
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Processing...
                    </span>
                  ) : selectedPlan === 'featured' ? (
                    'Proceed to Payment →'
                  ) : (
                    'Submit Free Listing →'
                  )}
                </button>

                <p className="text-xs text-center text-gray-500 mt-4">
                  By submitting, you agree to our{' '}
                  <Link href="/terms" className="text-[var(--blue)] hover:underline">Terms of Service</Link>
                  {' '}and{' '}
                  <Link href="/privacy" className="text-[var(--blue)] hover:underline">Privacy Policy</Link>
                </p>
              </div>
            </form>
          </div>

          {/* Trust Badges */}
          <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-green-600" />
              <span>Secure Payment</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-[var(--orange)]" />
              <span>Instant Activation</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-[var(--blue)]" />
              <span>Cancel Anytime</span>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="px-4 md:px-6 py-12 bg-white">
        <div className="max-w-[800px] mx-auto">
          <h2 className="font-['Syne'] text-2xl font-extrabold text-center text-[var(--navy)] mb-8">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            <div className="border border-gray-200 rounded-xl p-5">
              <h3 className="font-semibold text-[var(--navy)] mb-2">How quickly will my listing go live?</h3>
              <p className="text-sm text-gray-600">
                Featured listings go live instantly after payment. Free listings are reviewed and approved within 24 hours.
              </p>
            </div>
            <div className="border border-gray-200 rounded-xl p-5">
              <h3 className="font-semibold text-[var(--navy)] mb-2">Can I upgrade from Free to Featured later?</h3>
              <p className="text-sm text-gray-600">
                Yes! You can upgrade anytime from your listing dashboard. Your existing listing details will be preserved.
              </p>
            </div>
            <div className="border border-gray-200 rounded-xl p-5">
              <h3 className="font-semibold text-[var(--navy)] mb-2">What payment methods do you accept?</h3>
              <p className="text-sm text-gray-600">
                We accept all major credit/debit cards, UPI, net banking, and wallets through our secure Razorpay payment gateway.
              </p>
            </div>
            <div className="border border-gray-200 rounded-xl p-5">
              <h3 className="font-semibold text-[var(--navy)] mb-2">Is there a refund policy?</h3>
              <p className="text-sm text-gray-600">
                Yes, we offer a 7-day money-back guarantee if you're not satisfied with your Featured listing.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
