'use client'

import { useState } from 'react'
import Link from 'next/link'
import { CheckCircle, Search, Star, Shield, Zap, TrendingUp, Users, Phone } from 'lucide-react'

declare global {
  interface Window {
    Razorpay: any
  }
}

type Consultant = {
  id: string
  firmName: string
  name: string
  city: string
  state: string
  email: string
  phone: string
  tier: string
  isVerified: boolean
  paidUntil: string | null
}

export default function UpgradeListingPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<Consultant[]>([])
  const [selectedConsultant, setSelectedConsultant] = useState<Consultant | null>(null)
  const [isSearching, setIsSearching] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState('')
  const [verificationCode, setVerificationCode] = useState('')
  const [isVerifying, setIsVerifying] = useState(false)

  const handleSearch = async () => {
    if (!searchQuery.trim()) return

    setIsSearching(true)
    setError('')
    setSearchResults([])

    try {
      const res = await fetch(`/api/consultants/search?q=${encodeURIComponent(searchQuery)}`)
      if (res.ok) {
        const data = await res.json()
        setSearchResults(data.consultants || [])
        if (data.consultants?.length === 0) {
          setError('No listing found. Please check your details or create a new listing.')
        }
      }
    } catch (err) {
      setError('Search failed. Please try again.')
    } finally {
      setIsSearching(false)
    }
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

  const handleUpgrade = async () => {
    if (!selectedConsultant) return

    setIsProcessing(true)
    setError('')

    try {
      const loaded = await loadRazorpayScript()
      if (!loaded) {
        setError('Failed to load payment gateway. Please try again.')
        setIsProcessing(false)
        return
      }

      // Create order
      const orderRes = await fetch('/api/payments/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          consultantId: selectedConsultant.id,
          tier: 'featured',
        }),
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
        description: 'Featured Listing Upgrade - 30 Days',
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
              consultantId: selectedConsultant.id,
            }),
          })

          if (verifyRes.ok) {
            setIsSuccess(true)
          } else {
            setError('Payment verification failed. Please contact support.')
          }
        },
        prefill: {
          name: selectedConsultant.name,
          email: selectedConsultant.email,
          contact: selectedConsultant.phone,
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
    } finally {
      setIsProcessing(false)
    }
  }

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-[#f0f4ff] flex items-center justify-center px-6">
        <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center shadow-xl">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="font-['Syne'] text-2xl font-extrabold text-[var(--navy)] mb-3">
            Upgrade Successful!
          </h1>
          <p className="text-gray-600 mb-6">
            Your listing has been upgraded to Featured! You now have the verified badge,
            top placement, and WhatsApp button active on your listing.
          </p>
          <div className="space-y-3">
            <Link href="/consultant/login">
              <button className="w-full bg-[var(--orange)] text-white font-bold py-3 rounded-lg hover:bg-[#ea580c] transition-colors">
                Go to Dashboard →
              </button>
            </Link>
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
    <div className="min-h-screen bg-[#f0f4ff]">
      {/* Header */}
      <div className="bg-gradient-to-br from-[var(--navy)] via-[#1a3a6e] to-[#0f2d5a] px-4 md:px-6 py-12 text-white">
        <div className="max-w-[800px] mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-4">
            <Star className="w-4 h-4 text-[var(--orange)]" />
            <span className="text-sm font-medium">Upgrade Your Consultant Listing</span>
          </div>
          <h1 className="font-['Syne'] text-3xl md:text-4xl font-extrabold mb-3">
            Upgrade Your Consultant Listing
          </h1>
          <p className="text-blue-200 text-lg">
            Already listed on MSMEVault? Find your firm and upgrade to Featured for verified badge, top placement, and more leads
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 md:px-6 py-10">
        <div className="max-w-[600px] mx-auto">
          {/* Search Section */}
          <div className="bg-white rounded-2xl p-6 shadow-lg mb-6">
            <h2 className="font-semibold text-[var(--navy)] mb-4">Find Your Listing</h2>
            <p className="text-sm text-gray-600 mb-4">
              Enter your firm name, email, or phone number to find your existing listing
            </p>

            <div className="flex gap-3">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                  placeholder="Enter firm name, email, or phone..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg text-sm outline-none focus:border-[var(--blue)] focus:ring-2 focus:ring-blue-50"
                />
              </div>
              <button
                onClick={handleSearch}
                disabled={isSearching || !searchQuery.trim()}
                className="bg-[var(--blue)] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#1e40af] transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                {isSearching ? 'Searching...' : 'Search'}
              </button>
            </div>

            {error && (
              <div className="mt-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
                {error.includes('No listing found') && (
                  <Link href="/list-your-firm" className="block mt-2 text-[var(--blue)] font-semibold hover:underline">
                    Create a new listing instead →
                  </Link>
                )}
              </div>
            )}

            {/* Search Results */}
            {searchResults.length > 0 && (
              <div className="mt-6 space-y-3">
                <p className="text-sm font-medium text-gray-700">
                  Found {searchResults.length} listing(s):
                </p>
                {searchResults.map((consultant) => (
                  <div
                    key={consultant.id}
                    onClick={() => setSelectedConsultant(consultant)}
                    className={`border rounded-xl p-4 cursor-pointer transition-all ${
                      selectedConsultant?.id === consultant.id
                        ? 'border-[var(--blue)] bg-blue-50 ring-2 ring-blue-200'
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-[var(--navy)]">{consultant.firmName}</h3>
                        <p className="text-sm text-gray-600">{consultant.name}</p>
                        <p className="text-xs text-gray-500">{consultant.city}, {consultant.state}</p>
                      </div>
                      <div className="text-right">
                        {consultant.tier === 'featured' ? (
                          <span className="bg-[var(--orange)] text-white text-xs font-bold px-2 py-1 rounded-full">
                            Featured
                          </span>
                        ) : (
                          <span className="bg-gray-200 text-gray-700 text-xs font-bold px-2 py-1 rounded-full">
                            Free
                          </span>
                        )}
                        {consultant.isVerified && (
                          <span className="block mt-1 text-xs text-green-600">✓ Verified</span>
                        )}
                      </div>
                    </div>
                    {consultant.tier === 'featured' && consultant.paidUntil && (
                      <p className="text-xs text-gray-500 mt-2">
                        Featured until: {new Date(consultant.paidUntil).toLocaleDateString('en-IN')}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Upgrade Section */}
          {selectedConsultant && selectedConsultant.tier !== 'featured' && (
            <div className="bg-gradient-to-br from-[var(--navy)] to-[#1a3a6e] rounded-2xl p-6 text-white">
              <h2 className="font-['Syne'] text-xl font-extrabold mb-4 flex items-center gap-2">
                <Star className="w-5 h-5 text-[var(--orange)]" />
                Upgrade to Featured
              </h2>

              <div className="bg-white/10 rounded-xl p-4 mb-6">
                <p className="text-sm text-blue-200 mb-2">Upgrading listing for:</p>
                <p className="font-bold">{selectedConsultant.firmName}</p>
                <p className="text-sm text-blue-200">{selectedConsultant.city}, {selectedConsultant.state}</p>
              </div>

              <ul className="space-y-3 mb-6">
                <li className="flex items-center gap-3 text-sm">
                  <Shield className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <span>Verified badge on your listing</span>
                </li>
                <li className="flex items-center gap-3 text-sm">
                  <TrendingUp className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <span>Top placement in search results</span>
                </li>
                <li className="flex items-center gap-3 text-sm">
                  <Zap className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <span>Featured on homepage</span>
                </li>
                <li className="flex items-center gap-3 text-sm">
                  <Phone className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <span>WhatsApp quick contact button</span>
                </li>
                <li className="flex items-center gap-3 text-sm">
                  <Users className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <span>Unlimited leads access</span>
                </li>
              </ul>

              <div className="flex items-center justify-between mb-4 bg-white/10 rounded-xl p-4">
                <span className="font-semibold">Featured Listing</span>
                <div className="text-right">
                  <span className="text-2xl font-bold text-[var(--orange)]">₹2,999</span>
                  <span className="text-blue-200 text-sm">/month</span>
                </div>
              </div>

              <button
                onClick={handleUpgrade}
                disabled={isProcessing}
                className="w-full bg-[var(--orange)] text-white py-4 rounded-xl font-bold text-lg hover:bg-[#ea580c] transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {isProcessing ? 'Processing...' : 'Upgrade Now →'}
              </button>
            </div>
          )}

          {/* Already Featured */}
          {selectedConsultant && selectedConsultant.tier === 'featured' && (
            <div className="bg-green-50 border border-green-200 rounded-2xl p-6 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="font-semibold text-green-800 mb-2">Already Featured!</h2>
              <p className="text-sm text-green-700 mb-4">
                This listing is already on the Featured plan.
                {selectedConsultant.paidUntil && (
                  <span className="block mt-1">
                    Valid until: {new Date(selectedConsultant.paidUntil).toLocaleDateString('en-IN')}
                  </span>
                )}
              </p>
              <button
                onClick={handleUpgrade}
                className="bg-green-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors"
              >
                Extend for Another Month →
              </button>
            </div>
          )}

          {/* Not Listed CTA */}
          <div className="mt-8 bg-white rounded-2xl p-6 shadow-lg text-center">
            <h3 className="font-semibold text-[var(--navy)] mb-2">Don't have a listing yet?</h3>
            <p className="text-gray-600 text-sm mb-4">
              Create a new consultant listing on MSMEVault and start getting leads from MSME owners
            </p>
            <Link href="/list-your-firm">
              <button className="bg-[var(--blue)] text-white px-8 py-3 rounded-lg font-bold hover:bg-[#1e40af] transition-colors">
                Create New Listing →
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
