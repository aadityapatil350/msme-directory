'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'

type Consultant = {
  id: string
  slug: string
  name: string
  firmName: string
  designation: string | null
  city: string
  state: string
  services: string[]
  phone: string
  email: string
  website: string | null
  bio: string | null
  experience: number | null
  reviewCount: number
  rating: number
  isPremium: boolean
  tier: string
  paidUntil: Date | null
  isVerified: boolean
  createdAt: Date
  updatedAt: Date
}

export default function ConsultantsClient({ consultants }: { consultants: Consultant[] }) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCity, setSelectedCity] = useState('all')
  const [selectedService, setSelectedService] = useState('all')
  const [selectedState, setSelectedState] = useState('all')
  const [selectedTier, setSelectedTier] = useState('all')
  const [minRating, setMinRating] = useState(0)
  const [minExperience, setMinExperience] = useState(0)
  const [sortBy, setSortBy] = useState('default')
  const [showFilters, setShowFilters] = useState(false)

  // Get unique cities from consultants
  const cities = useMemo(() => {
    const uniqueCities = Array.from(new Set(consultants.map(c => c.city))).sort()
    return uniqueCities
  }, [consultants])

  // Get unique states from consultants
  const states = useMemo(() => {
    const uniqueStates = Array.from(new Set(consultants.map(c => c.state))).sort()
    return uniqueStates
  }, [consultants])

  // Get unique services from consultants
  const services = useMemo(() => {
    const allServices = consultants.flatMap(c => c.services)
    const uniqueServices = Array.from(new Set(allServices)).sort()
    return uniqueServices
  }, [consultants])

  // Get unique tiers
  const tiers = useMemo(() => {
    const uniqueTiers = Array.from(new Set(consultants.map(c => c.tier))).sort()
    return uniqueTiers
  }, [consultants])

  // Filter and search consultants
  const filteredConsultants = useMemo(() => {
    let filtered = consultants.filter(consultant => {
      // Search filter (name, firm, city, services)
      const matchesSearch = searchQuery === '' ||
        consultant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        consultant.firmName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        consultant.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        consultant.services.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()))

      // City filter
      const matchesCity = selectedCity === 'all' || consultant.city === selectedCity

      // State filter
      const matchesState = selectedState === 'all' || consultant.state === selectedState

      // Service filter
      const matchesService = selectedService === 'all' || consultant.services.includes(selectedService)

      // Tier filter
      const matchesTier = selectedTier === 'all' || consultant.tier === selectedTier

      // Rating filter
      const matchesRating = consultant.rating >= minRating

      // Experience filter
      const matchesExperience = !consultant.experience || consultant.experience >= minExperience

      return matchesSearch && matchesCity && matchesState && matchesService && matchesTier && matchesRating && matchesExperience
    })

    // Sorting
    if (sortBy === 'rating-high') {
      filtered.sort((a, b) => b.rating - a.rating)
    } else if (sortBy === 'rating-low') {
      filtered.sort((a, b) => a.rating - b.rating)
    } else if (sortBy === 'experience-high') {
      filtered.sort((a, b) => (b.experience || 0) - (a.experience || 0))
    } else if (sortBy === 'experience-low') {
      filtered.sort((a, b) => (a.experience || 0) - (b.experience || 0))
    } else if (sortBy === 'reviews-high') {
      filtered.sort((a, b) => b.reviewCount - a.reviewCount)
    } else if (sortBy === 'name-az') {
      filtered.sort((a, b) => a.firmName.localeCompare(b.firmName))
    }
    // Default: tier desc, rating desc (already sorted from server)

    return filtered
  }, [consultants, searchQuery, selectedCity, selectedState, selectedService, selectedTier, minRating, minExperience, sortBy])

  // Clear all filters
  const clearAllFilters = () => {
    setSearchQuery('')
    setSelectedCity('all')
    setSelectedState('all')
    setSelectedService('all')
    setSelectedTier('all')
    setMinRating(0)
    setMinExperience(0)
    setSortBy('default')
  }

  // Count active filters
  const activeFiltersCount = [
    searchQuery !== '',
    selectedCity !== 'all',
    selectedState !== 'all',
    selectedService !== 'all',
    selectedTier !== 'all',
    minRating > 0,
    minExperience > 0,
  ].filter(Boolean).length

  return (
    <div className="min-h-screen">
      {/* Page Header */}
      <div className="bg-gradient-to-br from-[var(--navy)] to-[#1a3a6e] px-6 py-8">
        <div className="max-w-[1400px] mx-auto">
          <h1 className="font-['Syne'] text-3xl font-extrabold text-white mb-2">
            👨‍💼 Find MSME Consultants & CA Firms
          </h1>
          <p className="text-[#94a3b8] text-sm mb-4">
            Verified experts for Udyam, GST, loan applications & compliance
          </p>

          {/* Search Bar */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search by name, firm, city, or service..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 pr-12 rounded-lg border border-gray-300 outline-none focus:border-[var(--blue)] text-sm"
            />
            <svg className="absolute right-4 top-3.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white px-6 py-4 border-b border-[var(--gray-light)]">
        <div className="max-w-[1400px] mx-auto">
          {/* Quick Filters Row */}
          <div className="flex gap-3 flex-wrap items-center mb-3">
            {/* City Filter Buttons */}
            <button
              onClick={() => setSelectedCity('all')}
              className={`${
                selectedCity === 'all'
                  ? 'bg-[var(--navy)] text-white'
                  : 'bg-[#f1f5f9] border border-[var(--gray-light)] text-[var(--text)] hover:bg-gray-200'
              } text-xs px-[14px] py-[6px] rounded-full font-medium transition-colors`}
            >
              All Cities ({consultants.length})
            </button>
            {cities.slice(0, 6).map(city => (
              <button
                key={city}
                onClick={() => setSelectedCity(city)}
                className={`${
                  selectedCity === city
                    ? 'bg-[var(--navy)] text-white'
                    : 'bg-[#f1f5f9] border border-[var(--gray-light)] text-[var(--text)] hover:bg-gray-200'
                } text-xs px-[14px] py-[6px] rounded-full font-medium transition-colors`}
              >
                {city}
              </button>
            ))}

            {/* More Filters Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="ml-auto flex items-center gap-2 bg-[var(--blue)] text-white text-xs px-[14px] py-[6px] rounded-lg font-medium hover:bg-[#1e40af] transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
              </svg>
              {showFilters ? 'Hide Filters' : 'More Filters'}
              {activeFiltersCount > 0 && (
                <span className="bg-white text-[var(--blue)] text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                  {activeFiltersCount}
                </span>
              )}
            </button>
          </div>

          {/* Advanced Filters Panel */}
          {showFilters && (
            <div className="bg-[#f8fafc] border border-[var(--gray-light)] rounded-lg p-4 mb-3">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Service Filter */}
                <div>
                  <label className="block text-xs font-semibold text-[var(--text)] mb-1.5">
                    Specialization
                  </label>
                  <select
                    value={selectedService}
                    onChange={(e) => setSelectedService(e.target.value)}
                    className="w-full border border-[var(--gray-light)] bg-white px-3 py-2 rounded-lg text-xs text-[var(--text)] outline-none cursor-pointer focus:border-[var(--blue)]"
                  >
                    <option value="all">All Services</option>
                    {services.map(service => (
                      <option key={service} value={service}>{service}</option>
                    ))}
                  </select>
                </div>

                {/* State Filter */}
                <div>
                  <label className="block text-xs font-semibold text-[var(--text)] mb-1.5">
                    State
                  </label>
                  <select
                    value={selectedState}
                    onChange={(e) => setSelectedState(e.target.value)}
                    className="w-full border border-[var(--gray-light)] bg-white px-3 py-2 rounded-lg text-xs text-[var(--text)] outline-none cursor-pointer focus:border-[var(--blue)]"
                  >
                    <option value="all">All States</option>
                    {states.map(state => (
                      <option key={state} value={state}>{state}</option>
                    ))}
                  </select>
                </div>

                {/* Tier Filter */}
                <div>
                  <label className="block text-xs font-semibold text-[var(--text)] mb-1.5">
                    Listing Type
                  </label>
                  <select
                    value={selectedTier}
                    onChange={(e) => setSelectedTier(e.target.value)}
                    className="w-full border border-[var(--gray-light)] bg-white px-3 py-2 rounded-lg text-xs text-[var(--text)] outline-none cursor-pointer focus:border-[var(--blue)]"
                  >
                    <option value="all">All Types</option>
                    {tiers.map(tier => (
                      <option key={tier} value={tier}>
                        {tier.charAt(0).toUpperCase() + tier.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Sort By */}
                <div>
                  <label className="block text-xs font-semibold text-[var(--text)] mb-1.5">
                    Sort By
                  </label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full border border-[var(--gray-light)] bg-white px-3 py-2 rounded-lg text-xs text-[var(--text)] outline-none cursor-pointer focus:border-[var(--blue)]"
                  >
                    <option value="default">Default (Featured First)</option>
                    <option value="rating-high">Highest Rating</option>
                    <option value="rating-low">Lowest Rating</option>
                    <option value="experience-high">Most Experience</option>
                    <option value="experience-low">Least Experience</option>
                    <option value="reviews-high">Most Reviews</option>
                    <option value="name-az">Name (A-Z)</option>
                  </select>
                </div>

                {/* Min Rating */}
                <div>
                  <label className="block text-xs font-semibold text-[var(--text)] mb-1.5">
                    Minimum Rating: {minRating > 0 ? `${minRating}+ ⭐` : 'Any'}
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="5"
                    step="0.5"
                    value={minRating}
                    onChange={(e) => setMinRating(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[var(--blue)]"
                  />
                  <div className="flex justify-between text-[10px] text-gray-500 mt-1">
                    <span>0</span>
                    <span>2.5</span>
                    <span>5</span>
                  </div>
                </div>

                {/* Min Experience */}
                <div>
                  <label className="block text-xs font-semibold text-[var(--text)] mb-1.5">
                    Minimum Experience: {minExperience > 0 ? `${minExperience}+ years` : 'Any'}
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="20"
                    step="1"
                    value={minExperience}
                    onChange={(e) => setMinExperience(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[var(--blue)]"
                  />
                  <div className="flex justify-between text-[10px] text-gray-500 mt-1">
                    <span>0</span>
                    <span>10</span>
                    <span>20+</span>
                  </div>
                </div>

                {/* Clear Filters */}
                <div className="flex items-end">
                  <button
                    onClick={clearAllFilters}
                    className="w-full bg-red-50 text-red-600 border border-red-200 text-xs font-semibold px-4 py-2 rounded-lg hover:bg-red-100 transition-colors"
                  >
                    Clear All Filters
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Results Counter & Active Filters */}
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <div className="text-xs text-[var(--gray)]">
              Showing <strong className="text-[var(--navy)]">{filteredConsultants.length}</strong> of <strong>{consultants.length}</strong> consultants
              {selectedCity !== 'all' && ` in ${selectedCity}`}
              {selectedState !== 'all' && `, ${selectedState}`}
              {selectedService !== 'all' && ` • ${selectedService}`}
              {selectedTier !== 'all' && ` • ${selectedTier}`}
              {minRating > 0 && ` • ${minRating}+ rating`}
              {minExperience > 0 && ` • ${minExperience}+ years exp`}
            </div>

            {activeFiltersCount > 0 && (
              <button
                onClick={clearAllFilters}
                className="text-xs text-[var(--blue)] hover:text-[#1e40af] font-medium underline"
              >
                Clear all ({activeFiltersCount})
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-6 py-6 bg-[#f0f4ff]">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid lg:grid-cols-[2fr_1fr] gap-5">
            {/* Consultants List */}
            <div className="flex flex-col gap-3">
              {filteredConsultants.length === 0 ? (
                <div className="bg-white border border-[var(--gray-light)] rounded-xl p-8 text-center">
                  <p className="text-[var(--gray)] mb-4">
                    {consultants.length === 0
                      ? 'No consultants found. Database might not be seeded yet.'
                      : 'No consultants match your filters. Try adjusting your search or filters.'}
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery('')
                      setSelectedCity('all')
                      setSelectedService('all')
                    }}
                    className="bg-[var(--blue)] text-white text-sm font-semibold px-6 py-3 rounded-lg hover:bg-[#1e40af] transition-colors mr-2"
                  >
                    Clear Filters
                  </button>
                  <Link href="/list-your-firm">
                    <button className="bg-[var(--orange)] text-white text-sm font-semibold px-6 py-3 rounded-lg hover:bg-[#ea580c] transition-colors">
                      List Your Firm
                    </button>
                  </Link>
                </div>
              ) : (
                <>
                  {filteredConsultants.map((consultant) => (
                    <div
                      key={consultant.id}
                      className={`bg-white border rounded-xl p-4 flex gap-3 relative hover:shadow-lg transition-shadow ${
                        consultant.tier === 'featured'
                          ? 'border-[var(--orange)] border-2 shadow-md'
                          : 'border-[var(--gray-light)]'
                      }`}
                    >
                      {/* Featured Badge */}
                      {consultant.tier === 'featured' && (
                        <div className="absolute top-3 right-3 bg-gradient-to-r from-[var(--orange)] to-[#ea580c] text-white text-[10px] font-bold px-3 py-1 rounded-full flex items-center gap-1">
                          <span>⭐</span> Featured
                        </div>
                      )}

                      {/* Avatar */}
                      <div className={`w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0 ${
                        consultant.tier === 'featured' ? 'bg-gradient-to-br from-[var(--orange)] to-[#ea580c]' : 'bg-[var(--blue)]'
                      }`}>
                        {consultant.name.substring(0, 2).toUpperCase()}
                      </div>

                      <div className="flex-1">
                        <div className="flex items-start gap-2 mb-[3px]">
                          <h3 className="text-sm font-bold">
                            {consultant.firmName || consultant.name}
                          </h3>
                          {/* Verified Badge */}
                          {consultant.isVerified && (
                            <span className="bg-blue-100 text-[var(--blue)] text-[9px] font-bold px-1.5 py-0.5 rounded flex items-center gap-0.5">
                              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                              </svg>
                              Verified
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-[var(--gray)] mb-[6px]">
                          {consultant.designation || 'CA Firm'} · {consultant.city}, {consultant.state} {consultant.experience ? `· ${consultant.experience} years experience` : ''}
                        </p>
                        <div className="flex gap-1 flex-wrap mb-2">
                          {consultant.services.slice(0, consultant.tier === 'featured' ? 6 : 4).map((service, idx) => (
                            <span key={idx} className="bg-[#f1f5f9] text-[var(--gray)] text-[10px] px-2 py-[2px] rounded-full">
                              {service}
                            </span>
                          ))}
                          {consultant.services.length > (consultant.tier === 'featured' ? 6 : 4) && (
                            <span className="bg-[#f1f5f9] text-[var(--gray)] text-[10px] px-2 py-[2px] rounded-full">
                              +{consultant.services.length - (consultant.tier === 'featured' ? 6 : 4)} more
                            </span>
                          )}
                        </div>
                        <div className="flex gap-4 items-center mb-3">
                          <div className="flex items-center gap-2">
                            <span className="text-[var(--yellow)] text-xs">★★★★★</span>
                            <span className="font-semibold text-xs">{consultant.rating.toFixed(1)}</span>
                            <span className="text-[var(--gray)] text-xs">({consultant.reviewCount} reviews)</span>
                          </div>
                          {consultant.tier === 'featured' && (
                            <div className="text-xs text-green-600 font-medium">
                              📞 Response: &lt;2 hours
                            </div>
                          )}
                        </div>
                        <div className="flex gap-2 flex-wrap">
                          {/* WhatsApp Button - Featured Only */}
                          {consultant.tier === 'featured' && (
                            <a
                              href={`https://wa.me/${consultant.phone.replace(/[^0-9]/g, '')}?text=Hi, I found you on MSMEVault and would like to discuss my business requirements.`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="bg-[#25D366] text-white text-xs font-semibold px-3 py-[6px] rounded-md hover:bg-[#128C7E] transition-colors flex items-center gap-1"
                            >
                              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                              </svg>
                              WhatsApp
                            </a>
                          )}
                          <a
                            href={`tel:${consultant.phone}`}
                            className="bg-[var(--blue)] text-white text-xs font-semibold px-[14px] py-[6px] rounded-md hover:bg-[#1e40af] transition-colors"
                          >
                            {consultant.tier === 'featured' ? 'Call Now' : 'Contact Now →'}
                          </a>
                          <a
                            href={`mailto:${consultant.email}`}
                            className="bg-transparent text-[var(--blue)] border-2 border-[var(--blue)] text-xs font-semibold px-3 py-[6px] rounded-md hover:bg-blue-50 transition-colors"
                          >
                            Email
                          </a>
                          {consultant.website && (
                            <a
                              href={consultant.website}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="bg-transparent text-[var(--gray)] border border-[var(--gray-light)] text-xs font-semibold px-3 py-[6px] rounded-md hover:bg-gray-50 transition-colors"
                            >
                              Website
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* CTA to list firm */}
                  <div className="bg-gradient-to-br from-[#f0fdf4] to-[#dcfce7] border border-[var(--gray-light)] rounded-xl p-5 text-center">
                    <div className="text-3xl mb-2">🏢</div>
                    <h3 className="font-['Syne'] text-base font-bold mb-2">Are you a CA or Consultant?</h3>
                    <p className="text-[13px] text-[var(--gray)] mb-4">
                      Get leads from 10,000+ MSME owners in your city. Starting ₹999/month.
                    </p>
                    <Link href="/list-your-firm">
                      <button className="bg-[var(--money)] text-white text-sm font-bold px-6 py-3 rounded-lg hover:bg-green-700 transition-colors">
                        List Your Firm Today →
                      </button>
                    </Link>
                  </div>
                </>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-4">
              {/* Lead Form */}
              <div className="bg-white border border-[var(--gray-light)] rounded-xl p-4">
                <h4 className="font-['Syne'] text-[13px] font-bold mb-3">🤝 Need help fast?</h4>
                <p className="text-xs text-[var(--gray)] mb-3">
                  Tell us your requirement, we'll connect you with the right expert
                </p>
                <input
                  type="text"
                  placeholder="Your City"
                  className="w-full px-[14px] py-[10px] border border-[var(--gray-light)] rounded-lg text-[13px] outline-none focus:border-[var(--blue)] transition-colors mb-2"
                />
                <select className="w-full px-[14px] py-[10px] border border-[var(--gray-light)] rounded-lg text-[13px] outline-none focus:border-[var(--blue)] transition-colors mb-3 bg-white">
                  <option>I need help with...</option>
                  <option>Mudra Loan</option>
                  <option>GST</option>
                  <option>Udyam Registration</option>
                  <option>ITR Filing</option>
                </select>
                <button className="w-full bg-[var(--orange)] text-white text-[13px] font-bold px-4 py-[10px] rounded-lg hover:bg-[#ea580c] transition-colors">
                  Find My Expert →
                </button>
              </div>

              {/* Affiliate Tools */}
              <div className="bg-white border border-[var(--gray-light)] rounded-xl p-4">
                <h4 className="font-['Syne'] text-[13px] font-bold mb-3">📊 Tools for your CA</h4>
                <p className="text-xs text-[var(--gray)] mb-3">Recommend these to your consultant</p>
                <button className="w-full bg-[#eff6ff] text-[var(--blue)] border border-[#bfdbfe] text-xs font-semibold px-4 py-[9px] rounded-lg mb-2 hover:bg-blue-100 transition-colors">
                  Zoho Books — Accounting →
                </button>
                <button className="w-full bg-[#f0fdf4] text-[var(--money)] border border-[#bbf7d0] text-xs font-semibold px-4 py-[9px] rounded-lg hover:bg-green-100 transition-colors">
                  ClearTax — GST Filing →
                </button>
              </div>

              {/* Popular Cities */}
              {cities.length > 8 && (
                <div className="bg-white border border-[var(--gray-light)] rounded-xl p-4">
                  <h4 className="font-['Syne'] text-[13px] font-bold mb-3">🌍 More Cities</h4>
                  <div className="flex flex-wrap gap-2">
                    {cities.slice(8).map(city => (
                      <button
                        key={city}
                        onClick={() => setSelectedCity(city)}
                        className="bg-[#f1f5f9] border border-[var(--gray-light)] text-[var(--text)] text-xs px-3 py-1.5 rounded-md hover:bg-gray-200 transition-colors"
                      >
                        {city}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
