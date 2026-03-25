'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Search, SlidersHorizontal, Sparkles, TrendingUp, Award } from 'lucide-react'

// Note: Metadata is exported from layout.tsx for this route

type Scheme = {
  id: string
  slug: string
  name: string
  shortDescription: string
  type: string
  state: string | null
  sector: string[]
  minAmount: number | null
  maxAmount: number | null
  isSponsored: boolean
  viewCount: number
}

export default function SchemesPage() {
  const [schemes, setSchemes] = useState<Scheme[]>([])
  const [filteredSchemes, setFilteredSchemes] = useState<Scheme[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [typeFilter, setTypeFilter] = useState('all')
  const [sectorFilter, setSectorFilter] = useState('all')
  const [stateFilter, setStateFilter] = useState('all')
  const [amountFilter, setAmountFilter] = useState('all')
  const [showFilters, setShowFilters] = useState(false)
  const [totalSchemes, setTotalSchemes] = useState(0)

  const SECTORS = ['Manufacturing', 'Services', 'Trading', 'Agriculture', 'Technology', 'Healthcare', 'Education', 'Tourism', 'Textiles', 'Food Processing']
  const INDIAN_STATES = ['Maharashtra', 'Gujarat', 'Karnataka', 'Tamil Nadu', 'Uttar Pradesh', 'Rajasthan', 'Kerala', 'Punjab', 'Haryana', 'West Bengal', 'Andhra Pradesh', 'Telangana', 'Delhi']

  useEffect(() => {
    fetchSchemes()
  }, [])

  useEffect(() => {
    filterSchemes()
  }, [searchTerm, typeFilter, sectorFilter, stateFilter, amountFilter, schemes])

  const fetchSchemes = async () => {
    try {
      const response = await fetch('/api/schemes')
      if (response.ok) {
        const data = await response.json()
        setSchemes(data)
        setTotalSchemes(data.length)
      }
    } catch (error) {
      console.error('Error fetching schemes:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const filterSchemes = () => {
    let filtered = schemes

    if (searchTerm) {
      filtered = filtered.filter(scheme =>
        scheme.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        scheme.shortDescription.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (typeFilter !== 'all') {
      filtered = filtered.filter(scheme => scheme.type === typeFilter)
    }

    if (sectorFilter !== 'all') {
      filtered = filtered.filter(scheme => scheme.sector.includes(sectorFilter))
    }

    if (stateFilter !== 'all') {
      filtered = filtered.filter(scheme =>
        scheme.state?.toLowerCase() === stateFilter.toLowerCase()
      )
    }

    if (amountFilter !== 'all') {
      filtered = filtered.filter(scheme => {
        const max = scheme.maxAmount || 0
        if (amountFilter === 'upto-10l') return max <= 1000000
        if (amountFilter === '10l-1cr') return max > 1000000 && max <= 10000000
        if (amountFilter === 'above-1cr') return max > 10000000
        return true
      })
    }

    setFilteredSchemes(filtered)
  }

  const clearFilters = () => {
    setSearchTerm('')
    setTypeFilter('all')
    setSectorFilter('all')
    setStateFilter('all')
    setAmountFilter('all')
  }

  return (
    <div className="min-h-screen bg-[#f0f4ff]">
      {/* Hero Header with Gradient */}
      <div className="relative bg-gradient-to-br from-[var(--navy)] via-[#1a3a6e] to-[#0f2d5a] px-6 py-12 overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--orange)] opacity-5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[var(--blue)] opacity-5 rounded-full blur-3xl"></div>

        <div className="max-w-[1400px] mx-auto relative z-10">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-[#94a3b8] mb-4">
            <Link href="/" className="text-[var(--blue-light)] hover:underline transition-colors">Home</Link>
            <span>›</span>
            <span className="text-white font-medium">All Schemes</span>
          </div>

          {/* Main Heading */}
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-xl bg-[var(--orange)] flex items-center justify-center">
              <Award className="w-6 h-6 text-white" />
            </div>
            <h1 className="font-['Syne'] text-4xl md:text-5xl font-extrabold text-white">
              Government Schemes for MSME
            </h1>
          </div>

          <p className="text-[#94a3b8] text-base md:text-lg mb-6 max-w-2xl">
            Discover {totalSchemes}+ central & state schemes with loans from ₹10K to ₹50Cr.
            <span className="text-white font-semibold"> Updated weekly from official sources.</span>
          </p>

          {/* Quick Stats */}
          <div className="flex gap-6 flex-wrap">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-4 py-2">
              <Sparkles className="w-4 h-4 text-[var(--yellow)]" />
              <span className="text-sm text-white font-medium">{totalSchemes}+ Active Schemes</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-4 py-2">
              <TrendingUp className="w-4 h-4 text-[var(--green)]" />
              <span className="text-sm text-white font-medium">₹5-50 Lakh Range</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-4 py-2">
              <Award className="w-4 h-4 text-[var(--blue-light)]" />
              <span className="text-sm text-white font-medium">100% Verified</span>
            </div>
          </div>
        </div>
      </div>

      {/* Search & Filter Bar - Elevated Card */}
      <div className="sticky top-0 z-40 bg-white shadow-md border-b border-[var(--gray-light)]">
        <div className="px-6 py-4">
          <div className="max-w-[1400px] mx-auto">
            <div className="flex flex-col md:flex-row gap-3 items-center">
              {/* Search Input with Icon */}
              <div className="flex-1 relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[var(--blue)]" />
                <input
                  type="text"
                  placeholder="Search schemes by name, sector, or loan amount..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 border-2 border-[var(--gray-light)] rounded-xl text-sm outline-none focus:border-[var(--blue)] focus:ring-4 focus:ring-blue-100 transition-all bg-[#f8fafc]"
                />
              </div>

              {/* Filter Toggle Button */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 bg-gradient-to-r from-[var(--blue)] to-[#1e40af] text-white text-sm font-semibold px-5 py-3 rounded-xl hover:shadow-lg transition-all"
              >
                <SlidersHorizontal className="h-4 w-4" />
                Filters
                {(typeFilter !== 'all' || sectorFilter !== 'all' || stateFilter !== 'all' || amountFilter !== 'all') && (
                  <span className="bg-[var(--orange)] text-white text-xs px-2 py-0.5 rounded-full font-bold">
                    {[typeFilter, sectorFilter, stateFilter, amountFilter].filter(f => f !== 'all').length}
                  </span>
                )}
              </button>

              {(searchTerm || typeFilter !== 'all' || sectorFilter !== 'all' || stateFilter !== 'all' || amountFilter !== 'all') && (
                <button
                  onClick={clearFilters}
                  className="text-sm text-[var(--orange)] hover:underline font-semibold"
                >
                  Clear all
                </button>
              )}

              {/* Results Count */}
              <div className="text-sm font-semibold text-[var(--text)] bg-[#eff6ff] px-4 py-2 rounded-lg">
                {filteredSchemes.length} scheme{filteredSchemes.length !== 1 ? 's' : ''} found
              </div>
            </div>

            {/* Expandable Filters Section */}
            {showFilters && (
              <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3 pt-4 border-t border-[var(--gray-light)]">
                <div>
                  <label className="block text-xs font-bold text-[var(--text)] mb-2">Scheme Type</label>
                  <select
                    value={typeFilter}
                    onChange={(e) => setTypeFilter(e.target.value)}
                    className="w-full px-3 py-2.5 border-2 border-[var(--gray-light)] rounded-lg text-sm outline-none focus:border-[var(--blue)] bg-white"
                  >
                    <option value="all">All Types</option>
                    <option value="central">Central</option>
                    <option value="state">State</option>
                    <option value="sector">Sector-Specific</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[var(--text)] mb-2">Sector</label>
                  <select
                    value={sectorFilter}
                    onChange={(e) => setSectorFilter(e.target.value)}
                    className="w-full px-3 py-2.5 border-2 border-[var(--gray-light)] rounded-lg text-sm outline-none focus:border-[var(--blue)] bg-white"
                  >
                    <option value="all">All Sectors</option>
                    {SECTORS.map(sector => (
                      <option key={sector} value={sector}>{sector}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[var(--text)] mb-2">State</label>
                  <select
                    value={stateFilter}
                    onChange={(e) => setStateFilter(e.target.value)}
                    className="w-full px-3 py-2.5 border-2 border-[var(--gray-light)] rounded-lg text-sm outline-none focus:border-[var(--blue)] bg-white"
                  >
                    <option value="all">All States</option>
                    {INDIAN_STATES.map(state => (
                      <option key={state} value={state.toLowerCase()}>{state}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[var(--text)] mb-2">Loan Amount</label>
                  <select
                    value={amountFilter}
                    onChange={(e) => setAmountFilter(e.target.value)}
                    className="w-full px-3 py-2.5 border-2 border-[var(--gray-light)] rounded-lg text-sm outline-none focus:border-[var(--blue)] bg-white"
                  >
                    <option value="all">Any Amount</option>
                    <option value="upto-10l">Up to ₹10 Lakh</option>
                    <option value="10l-1cr">₹10 Lakh - ₹1 Crore</option>
                    <option value="above-1cr">Above ₹1 Crore</option>
                  </select>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="px-6 py-8">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid lg:grid-cols-[2fr_1fr] gap-6">
            {/* Schemes List - Left Column */}
            <div className="space-y-4">
              {isLoading ? (
                <div className="bg-white rounded-2xl p-12 text-center shadow-sm border border-[var(--gray-light)]">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--blue)] mx-auto mb-4"></div>
                  <p className="text-[var(--gray)] font-medium">Loading amazing schemes for you...</p>
                </div>
              ) : filteredSchemes.length === 0 ? (
                <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-12 text-center border-2 border-orange-200">
                  <div className="text-6xl mb-4">🔍</div>
                  <h3 className="text-xl font-bold text-[var(--text)] mb-2">No Schemes Found</h3>
                  <p className="text-[var(--gray)] mb-6">Try adjusting your filters or search criteria</p>
                  <button
                    onClick={clearFilters}
                    className="bg-[var(--orange)] text-white text-sm font-bold px-8 py-3 rounded-xl hover:bg-[#ea580c] hover:shadow-lg transition-all"
                  >
                    Clear All Filters
                  </button>
                </div>
              ) : (
                filteredSchemes.map((scheme) => (
                  <Link key={scheme.id} href={`/schemes/${scheme.slug}`}>
                    <div className={`group bg-white rounded-2xl p-5 hover:shadow-2xl transition-all duration-300 cursor-pointer border-2 ${
                      scheme.isSponsored
                        ? 'border-[var(--orange)] shadow-lg bg-gradient-to-br from-white to-orange-50'
                        : 'border-[var(--gray-light)] hover:border-[var(--blue-light)]'
                    }`}>
                      {/* Header Row */}
                      <div className="flex justify-between items-start mb-3">
                        <div className="inline-flex items-center gap-1.5 bg-gradient-to-r from-[#eff6ff] to-[#dbeafe] text-[var(--blue)] text-xs font-bold px-3 py-1.5 rounded-lg">
                          {scheme.type === 'central' ? '🏛️ Central Scheme' : `📍 ${scheme.state || 'State'}`}
                        </div>
                        {scheme.isSponsored && (
                          <div className="flex items-center gap-1.5 text-[10px] font-extrabold px-3 py-1.5 rounded-full bg-gradient-to-r from-[#fee2e2] to-[#fecaca] text-[#991b1b] shadow-sm">
                            <span className="w-1.5 h-1.5 bg-[#991b1b] rounded-full animate-pulse"></span>
                            FEATURED
                          </div>
                        )}
                      </div>

                      {/* Scheme Name */}
                      <h3 className="font-['Syne'] text-base font-extrabold mb-2 text-[var(--text)] group-hover:text-[var(--blue)] transition-colors">
                        {scheme.name}
                      </h3>

                      {/* Description */}
                      <p className="text-sm text-[var(--gray)] leading-relaxed mb-4 line-clamp-2">
                        {scheme.shortDescription}
                      </p>

                      {/* Key Stats Grid */}
                      <div className="grid grid-cols-3 gap-3 mb-4 p-3 bg-gradient-to-br from-[#f8fafc] to-[#eff6ff] rounded-xl border border-blue-100">
                        <div>
                          <div className="text-[10px] text-[var(--gray)] font-semibold uppercase tracking-wide mb-1">Loan Amount</div>
                          <div className="text-sm font-extrabold text-[var(--money)]">
                            ₹{((scheme.minAmount || 0) / 100000).toFixed(0)}L - ₹{((scheme.maxAmount || 0) / 100000).toFixed(0)}L
                          </div>
                        </div>
                        <div>
                          <div className="text-[10px] text-[var(--gray)] font-semibold uppercase tracking-wide mb-1">Sector</div>
                          <div className="text-sm font-bold text-[var(--text)]">{scheme.sector[0] || 'All'}</div>
                        </div>
                        <div>
                          <div className="text-[10px] text-[var(--gray)] font-semibold uppercase tracking-wide mb-1">Views</div>
                          <div className="text-sm font-bold text-gray-600">👁 {scheme.viewCount}</div>
                        </div>
                      </div>

                      {/* Footer Row */}
                      <div className="flex justify-between items-center pt-3 border-t border-[var(--gray-light)]">
                        <div className="flex gap-1.5 flex-wrap">
                          {scheme.sector.slice(0, 3).map((sector, idx) => (
                            <span key={idx} className="bg-[#eff6ff] text-[var(--blue)] text-[10px] font-semibold px-2 py-1 rounded-md">
                              {sector}
                            </span>
                          ))}
                        </div>
                        <button className="bg-gradient-to-r from-[var(--blue)] to-[#1e40af] text-white text-xs font-bold px-4 py-2 rounded-lg hover:shadow-lg transition-all group-hover:scale-105">
                          View Details →
                        </button>
                      </div>
                    </div>
                  </Link>
                ))
              )}
            </div>

            {/* Sidebar - Right Column */}
            <div className="space-y-5">
              {/* Eligibility Checker CTA - Primary */}
              <div className="bg-gradient-to-br from-[var(--orange)] to-[#ea580c] rounded-2xl p-6 text-white shadow-xl border-2 border-orange-300">
                <div className="text-center mb-4">
                  <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-3">
                    <span className="text-4xl">🎯</span>
                  </div>
                  <h4 className="font-['Syne'] text-lg font-extrabold mb-2">Find Your Perfect Scheme</h4>
                  <p className="text-sm text-orange-100">Answer 5 quick questions and get personalized scheme recommendations</p>
                </div>
                <Link href="/eligibility-checker">
                  <button className="w-full bg-white text-[var(--orange)] text-sm font-extrabold px-6 py-3.5 rounded-xl hover:bg-gray-50 hover:shadow-xl transition-all">
                    Check My Eligibility Now →
                  </button>
                </Link>
                <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs text-orange-100">
                  <div>
                    <div className="font-bold">✓</div>
                    <div>100% Free</div>
                  </div>
                  <div>
                    <div className="font-bold">⚡</div>
                    <div>2 Minutes</div>
                  </div>
                  <div>
                    <div className="font-bold">🔒</div>
                    <div>Secure</div>
                  </div>
                </div>
              </div>

              {/* Udyam Registration - Affiliate */}
              <div className="bg-gradient-to-br from-[var(--blue)] to-[var(--navy)] rounded-2xl px-6 py-6 text-white text-center shadow-xl border-2 border-blue-400">
                <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <span className="text-3xl">📋</span>
                </div>
                <h4 className="font-['Syne'] text-base font-extrabold mb-2">Udyam Registration</h4>
                <p className="text-sm text-blue-100 mb-4">Mandatory for accessing most government schemes</p>
                <button className="w-full bg-[var(--orange)] text-white text-sm font-extrabold px-5 py-3 rounded-xl hover:bg-[#ea580c] hover:shadow-xl transition-all">
                  Register Now — ₹999 →
                </button>
                <p className="text-xs text-blue-200 mt-3">✓ Trusted by 50,000+ MSMEs</p>
              </div>

              {/* Consultant Card */}
              <div className="bg-white rounded-2xl p-5 shadow-lg border-2 border-[var(--gray-light)]">
                <h4 className="font-['Syne'] text-sm font-extrabold mb-3 flex items-center gap-2">
                  <span className="text-xl">👨‍💼</span>
                  Need Expert Guidance?
                </h4>
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-100 rounded-xl p-4 mb-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[var(--blue)] to-[#1e40af] flex items-center justify-center text-white font-extrabold text-base shadow-md">
                      RS
                    </div>
                    <div>
                      <h5 className="text-sm font-extrabold text-[var(--text)]">Rajesh Sharma, CA</h5>
                      <p className="text-xs text-[var(--gray)]">Mumbai · ⭐ 4.9 (127)</p>
                    </div>
                  </div>
                  <p className="text-xs text-[var(--gray)] italic">"Helped 500+ MSMEs get loans"</p>
                </div>
                <Link href="/consultants">
                  <button className="w-full bg-transparent text-[var(--blue)] border-2 border-[var(--blue)] text-sm font-extrabold px-4 py-2.5 rounded-xl hover:bg-blue-50 hover:shadow-md transition-all">
                    Find Consultants →
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
