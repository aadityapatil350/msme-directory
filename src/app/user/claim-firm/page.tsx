'use client'

import { useEffect, useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Search, Building2, MapPin, CheckCircle, AlertCircle, Clock, Filter, BadgeCheck } from 'lucide-react'

type Consultant = {
  id: string
  firmName: string
  name: string
  city: string
  state: string
  email: string
  services: string[]
  tier: string
  isVerified: boolean
  user?: { id: string } | null
}

type Claim = {
  id: string
  status: string
  consultant: {
    id: string
    firmName: string
    city: string
    state: string
  }
}

function ClaimFirmContent() {
  const [searchQuery, setSearchQuery] = useState('')
  const [allConsultants, setAllConsultants] = useState<Consultant[]>([])
  const [filteredConsultants, setFilteredConsultants] = useState<Consultant[]>([])
  const [cities, setCities] = useState<string[]>([])
  const [selectedCity, setSelectedCity] = useState<string>('')
  const [selectedConsultant, setSelectedConsultant] = useState<Consultant | null>(null)
  const [claimMessage, setClaimMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [existingClaims, setExistingClaims] = useState<Claim[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isLoadingFirms, setIsLoadingFirms] = useState(true)
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    checkAuth()
    fetchExistingClaims()
    fetchAllConsultants()

    // Check if consultantId is in URL
    const consultantId = searchParams.get('consultantId')
    if (consultantId) {
      fetchConsultantById(consultantId)
    }
  }, [searchParams])

  // Filter consultants when search or city changes
  useEffect(() => {
    let filtered = allConsultants

    // Filter by city
    if (selectedCity) {
      filtered = filtered.filter(c => c.city.toLowerCase() === selectedCity.toLowerCase())
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(c =>
        c.firmName.toLowerCase().includes(query) ||
        c.name.toLowerCase().includes(query) ||
        c.city.toLowerCase().includes(query) ||
        c.email.toLowerCase().includes(query) ||
        c.services.some(s => s.toLowerCase().includes(query))
      )
    }

    setFilteredConsultants(filtered)
  }, [searchQuery, selectedCity, allConsultants])

  const checkAuth = async () => {
    try {
      const res = await fetch('/api/user/me')
      if (!res.ok) {
        router.push('/user/login')
        return
      }
      const data = await res.json()
      if (data.consultant) {
        // User already has a firm linked
        router.push('/user/dashboard')
      }
    } catch {
      router.push('/user/login')
    } finally {
      setIsLoading(false)
    }
  }

  const fetchExistingClaims = async () => {
    try {
      const res = await fetch('/api/user/claim-firm')
      if (res.ok) {
        const data = await res.json()
        setExistingClaims(data.claims || [])
      }
    } catch (error) {
      console.error('Error fetching claims:', error)
    }
  }

  const fetchAllConsultants = async () => {
    setIsLoadingFirms(true)
    try {
      const res = await fetch('/api/consultants/search?all=true')
      if (res.ok) {
        const data = await res.json()
        setAllConsultants(data.consultants || [])
        setFilteredConsultants(data.consultants || [])
        setCities(data.cities || [])
      }
    } catch (error) {
      console.error('Error fetching consultants:', error)
    } finally {
      setIsLoadingFirms(false)
    }
  }

  const fetchConsultantById = async (id: string) => {
    try {
      const res = await fetch(`/api/consultants/search?id=${id}`)
      if (res.ok) {
        const data = await res.json()
        if (data.consultant) {
          setSelectedConsultant(data.consultant)
        }
      }
    } catch (error) {
      console.error('Error fetching consultant:', error)
    }
  }

  const handleSubmitClaim = async () => {
    if (!selectedConsultant) return

    setIsSubmitting(true)
    setError('')
    setSuccess('')

    try {
      const res = await fetch('/api/user/claim-firm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          consultantId: selectedConsultant.id,
          message: claimMessage,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Failed to submit claim')
        return
      }

      setSuccess('Claim submitted successfully! The admin will review your request.')
      setSelectedConsultant(null)
      setClaimMessage('')
      fetchExistingClaims()
    } catch {
      setError('Failed to submit claim. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const isAlreadyClaimed = (consultant: Consultant) => {
    return existingClaims.some(claim => claim.consultant.id === consultant.id)
  }

  const isLinkedToUser = (consultant: Consultant) => {
    return consultant.user !== null && consultant.user !== undefined
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#f0f4ff] flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-[var(--blue)] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#f0f4ff]">
      {/* Header */}
      <div className="bg-gradient-to-br from-[var(--navy)] via-[#1a3a6e] to-[#0f2d5a] px-4 md:px-6 py-6">
        <div className="max-w-[1000px] mx-auto">
          <Link
            href="/user/dashboard"
            className="inline-flex items-center gap-2 text-white/80 hover:text-white text-sm mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Link>
          <h1 className="font-['Syne'] text-2xl font-extrabold text-white">
            Claim Your Firm
          </h1>
          <p className="text-blue-200 text-sm mt-1">
            Find your firm from our directory and submit a claim request
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 md:px-6 py-8">
        <div className="max-w-[1000px] mx-auto">
          {/* Existing Claims */}
          {existingClaims.length > 0 && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
              <h2 className="font-semibold text-[var(--navy)] mb-4">Your Claim Requests</h2>
              <div className="space-y-3">
                {existingClaims.map((claim) => (
                  <div
                    key={claim.id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                  >
                    <div>
                      <p className="font-medium text-[var(--navy)]">{claim.consultant.firmName}</p>
                      <p className="text-sm text-gray-600">
                        {claim.consultant.city}, {claim.consultant.state}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      {claim.status === 'pending' && (
                        <span className="flex items-center gap-1 bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs font-medium">
                          <Clock className="w-3 h-3" />
                          Pending Review
                        </span>
                      )}
                      {claim.status === 'approved' && (
                        <span className="flex items-center gap-1 bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium">
                          <CheckCircle className="w-3 h-3" />
                          Approved
                        </span>
                      )}
                      {claim.status === 'rejected' && (
                        <span className="flex items-center gap-1 bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-medium">
                          <AlertCircle className="w-3 h-3" />
                          Rejected
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Success Message */}
          {success && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6 flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
              <p className="text-green-700">{success}</p>
            </div>
          )}

          {/* Firms List Section */}
          {!selectedConsultant && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
              <h2 className="font-semibold text-[var(--navy)] mb-4">
                Select Your Firm ({filteredConsultants.length} firms available)
              </h2>

              {/* Search and Filter */}
              <div className="flex flex-col md:flex-row gap-3 mb-6">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by firm name, contact person, city, or service..."
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg text-sm outline-none focus:border-[var(--blue)] focus:ring-2 focus:ring-blue-50"
                  />
                </div>
                <div className="relative">
                  <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <select
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    className="pl-9 pr-8 py-3 border border-gray-200 rounded-lg text-sm outline-none focus:border-[var(--blue)] focus:ring-2 focus:ring-blue-50 appearance-none bg-white min-w-[180px]"
                  >
                    <option value="">All Cities</option>
                    {cities.map((city) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {error && !selectedConsultant && (
                <p className="text-red-600 text-sm mb-4">{error}</p>
              )}

              {/* Firms List */}
              {isLoadingFirms ? (
                <div className="text-center py-12">
                  <div className="w-8 h-8 border-4 border-[var(--blue)] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                  <p className="text-gray-600">Loading firms...</p>
                </div>
              ) : filteredConsultants.length === 0 ? (
                <div className="text-center py-12">
                  <Building2 className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-600">No firms found matching your criteria</p>
                  <button
                    onClick={() => {
                      setSearchQuery('')
                      setSelectedCity('')
                    }}
                    className="mt-2 text-[var(--blue)] text-sm hover:underline"
                  >
                    Clear filters
                  </button>
                </div>
              ) : (
                <div className="grid gap-3 max-h-[600px] overflow-y-auto pr-2">
                  {filteredConsultants.map((consultant) => {
                    const claimed = isAlreadyClaimed(consultant)
                    const linked = isLinkedToUser(consultant)

                    return (
                      <div
                        key={consultant.id}
                        className={`border rounded-lg p-4 transition-colors ${
                          claimed || linked
                            ? 'border-gray-200 bg-gray-50 opacity-60'
                            : 'border-gray-200 hover:border-[var(--blue)] cursor-pointer'
                        }`}
                        onClick={() => {
                          if (!claimed && !linked) {
                            setSelectedConsultant(consultant)
                          }
                        }}
                      >
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <Building2 className="w-5 h-5 text-[var(--blue)]" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <h3 className="font-semibold text-[var(--navy)]">{consultant.firmName}</h3>
                              {consultant.isVerified && (
                                <BadgeCheck className="w-4 h-4 text-green-600" />
                              )}
                              {consultant.tier === 'premium' && (
                                <span className="bg-amber-100 text-amber-700 px-2 py-0.5 rounded text-xs font-medium">
                                  Premium
                                </span>
                              )}
                              {consultant.tier === 'featured' && (
                                <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-xs font-medium">
                                  Featured
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-gray-600">{consultant.name}</p>
                            <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                              <MapPin className="w-3 h-3" />
                              {consultant.city}, {consultant.state}
                            </p>
                            <div className="flex flex-wrap gap-1 mt-2">
                              {consultant.services.slice(0, 3).map((service, idx) => (
                                <span
                                  key={idx}
                                  className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded text-xs"
                                >
                                  {service}
                                </span>
                              ))}
                              {consultant.services.length > 3 && (
                                <span className="text-gray-400 text-xs">
                                  +{consultant.services.length - 3} more
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="flex-shrink-0">
                            {claimed ? (
                              <span className="text-yellow-600 text-xs font-medium bg-yellow-50 px-2 py-1 rounded">
                                Claim Pending
                              </span>
                            ) : linked ? (
                              <span className="text-gray-500 text-xs font-medium bg-gray-100 px-2 py-1 rounded">
                                Already Claimed
                              </span>
                            ) : (
                              <span className="text-[var(--blue)] text-sm font-semibold">
                                Select →
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          )}

          {/* Claim Form */}
          {selectedConsultant && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h2 className="font-semibold text-[var(--navy)] mb-4">Submit Claim Request</h2>

              {/* Selected Firm */}
              <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-6">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-[var(--blue)] rounded-full flex items-center justify-center flex-shrink-0">
                    <Building2 className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-[var(--navy)]">{selectedConsultant.firmName}</h3>
                    <p className="text-sm text-gray-600">{selectedConsultant.name}</p>
                    <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                      <MapPin className="w-3 h-3" />
                      {selectedConsultant.city}, {selectedConsultant.state}
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedConsultant(null)}
                    className="text-gray-500 text-sm hover:text-gray-700"
                  >
                    Change
                  </button>
                </div>
              </div>

              {/* Claim Message */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Proof of Ownership / Message (Optional)
                </label>
                <textarea
                  value={claimMessage}
                  onChange={(e) => setClaimMessage(e.target.value)}
                  placeholder="Provide any information that proves you are the owner of this firm (e.g., your role, business registration number, or contact details that match the listing)..."
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm outline-none focus:border-[var(--blue)] focus:ring-2 focus:ring-blue-50"
                />
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm mb-4">
                  {error}
                </div>
              )}

              <div className="flex gap-3">
                <button
                  onClick={() => setSelectedConsultant(null)}
                  className="px-6 py-3 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmitClaim}
                  disabled={isSubmitting}
                  className="flex-1 bg-[var(--blue)] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#1e40af] transition-colors disabled:bg-gray-300"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Claim Request'}
                </button>
              </div>
            </div>
          )}

          {/* Info Box */}
          <div className="bg-yellow-50 border border-yellow-100 rounded-lg p-4 mt-6">
            <h3 className="font-semibold text-yellow-800 mb-2">How does claiming work?</h3>
            <ul className="text-sm text-yellow-700 space-y-1">
              <li>1. Find your firm from our directory above</li>
              <li>2. Submit a claim request with proof of ownership</li>
              <li>3. Our admin will verify and approve your claim</li>
              <li>4. Once approved, you can manage your firm's listing</li>
            </ul>
          </div>

          {/* Can't find your firm? */}
          <div className="bg-white border border-gray-200 rounded-lg p-4 mt-4">
            <h3 className="font-semibold text-[var(--navy)] mb-2">Can't find your firm?</h3>
            <p className="text-sm text-gray-600 mb-3">
              If your firm is not listed in our directory, you can submit a new listing request.
            </p>
            <Link
              href="/list-your-firm"
              className="text-[var(--blue)] text-sm font-medium hover:underline"
            >
              List Your Firm →
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ClaimFirmPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#f0f4ff] flex items-center justify-center">
          <div className="text-center">
            <div className="w-8 h-8 border-4 border-[var(--blue)] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Loading...</p>
          </div>
        </div>
      }
    >
      <ClaimFirmContent />
    </Suspense>
  )
}
