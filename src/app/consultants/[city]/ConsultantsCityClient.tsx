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

type City = {
  city: string
  state: string
}

export default function ConsultantsCityClient({
  consultants,
  cityName,
  allCities,
}: {
  consultants: Consultant[]
  cityName: string
  allCities: City[]
}) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedService, setSelectedService] = useState('all')

  // Get unique services from consultants
  const services = useMemo(() => {
    const allServices = consultants.flatMap(c => c.services)
    const uniqueServices = Array.from(new Set(allServices)).sort()
    return uniqueServices
  }, [consultants])

  // Filter consultants
  const filteredConsultants = useMemo(() => {
    return consultants.filter(consultant => {
      // Search filter
      const matchesSearch = searchQuery === '' ||
        consultant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        consultant.firmName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        consultant.services.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()))

      // Service filter
      const matchesService = selectedService === 'all' || consultant.services.includes(selectedService)

      return matchesSearch && matchesService
    })
  }, [consultants, searchQuery, selectedService])

  // Get state name
  const stateName = consultants[0]?.state || ''

  return (
    <div className="min-h-screen">
      {/* Page Header */}
      <div className="bg-gradient-to-br from-[var(--navy)] to-[#1a3a6e] px-6 py-8">
        <div className="max-w-[1400px] mx-auto">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-gray-300 mb-3">
            <Link href="/" className="hover:text-white">Home</Link>
            <span>→</span>
            <Link href="/consultants" className="hover:text-white">Consultants</Link>
            <span>→</span>
            <span className="text-white">{cityName}</span>
          </div>

          <h1 className="font-['Syne'] text-3xl font-extrabold text-white mb-2">
            👨‍💼 MSME Consultants & CA Firms in {cityName}
          </h1>
          <p className="text-[#94a3b8] text-sm mb-4">
            {consultants.length}+ verified experts in {cityName}, {stateName} for Udyam, GST, loan applications & compliance
          </p>

          {/* Search Bar */}
          <div className="relative">
            <input
              type="text"
              placeholder={`Search consultants in ${cityName}...`}
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
      <div className="bg-white px-6 py-[14px] border-b border-[var(--gray-light)]">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex gap-3 flex-wrap items-center">
            {/* Service Specialization Filter */}
            <select
              value={selectedService}
              onChange={(e) => setSelectedService(e.target.value)}
              className="border border-[var(--gray-light)] bg-white px-3 py-[7px] rounded-lg text-xs text-[var(--text)] outline-none cursor-pointer"
            >
              <option value="all">All Specialisations</option>
              {services.map(service => (
                <option key={service} value={service}>{service}</option>
              ))}
            </select>

            {/* View All Cities Link */}
            <Link
              href="/consultants"
              className="ml-auto bg-[#f1f5f9] border border-[var(--gray-light)] text-[var(--text)] text-xs px-[14px] py-[6px] rounded-full font-medium hover:bg-gray-200 transition-colors"
            >
              View All Cities →
            </Link>
          </div>

          {/* Results Counter */}
          <div className="mt-3 text-xs text-[var(--gray)]">
            Showing <strong>{filteredConsultants.length}</strong> of <strong>{consultants.length}</strong> consultants in {cityName}
            {selectedService !== 'all' && ` with ${selectedService}`}
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
                    No consultants match your search or filters.
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery('')
                      setSelectedService('all')
                    }}
                    className="bg-[var(--blue)] text-white text-sm font-semibold px-6 py-3 rounded-lg hover:bg-[#1e40af] transition-colors"
                  >
                    Clear Filters
                  </button>
                </div>
              ) : (
                <>
                  {filteredConsultants.map((consultant) => (
                    <div
                      key={consultant.id}
                      className="bg-white border border-[var(--gray-light)] rounded-xl p-4 flex gap-3 relative hover:shadow-lg transition-shadow"
                    >
                      {(consultant.tier === 'premium' || consultant.tier === 'featured') && (
                        <div className="absolute top-3 right-3 bg-[var(--yellow)] text-[#92400e] text-[10px] font-bold px-2 py-[2px] rounded-full">
                          ⭐ Featured
                        </div>
                      )}
                      <div className="w-14 h-14 rounded-full bg-[var(--blue)] flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                        {consultant.name.substring(0, 2).toUpperCase()}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <h3 className="text-sm font-bold mb-[3px]">
                            {consultant.firmName || consultant.name}
                          </h3>
                        </div>
                        <p className="text-xs text-[var(--gray)] mb-[6px]">
                          {consultant.designation || 'CA Firm'} · {consultant.city}, {consultant.state} · {consultant.experience} years experience
                        </p>
                        <div className="flex gap-1 flex-wrap mb-2">
                          {consultant.services.slice(0, 5).map((service, idx) => (
                            <span key={idx} className="bg-[#f1f5f9] text-[var(--gray)] text-[10px] px-2 py-[2px] rounded-full">
                              {service}
                            </span>
                          ))}
                          {consultant.services.length > 5 && (
                            <span className="bg-[#f1f5f9] text-[var(--gray)] text-[10px] px-2 py-[2px] rounded-full">
                              +{consultant.services.length - 5} more
                            </span>
                          )}
                        </div>
                        <div className="flex gap-4 items-center mb-3">
                          <div className="flex items-center gap-2">
                            <span className="text-[var(--yellow)] text-xs">★★★★★</span>
                            <span className="font-semibold text-xs">{consultant.rating.toFixed(1)}</span>
                            <span className="text-[var(--gray)] text-xs">({consultant.reviewCount} reviews)</span>
                          </div>
                          <div className="text-xs text-[var(--gray)]">
                            📞 Response: &lt;2 hours
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <a
                            href={`tel:${consultant.phone}`}
                            className="bg-[var(--blue)] text-white text-xs font-semibold px-[14px] py-[6px] rounded-md hover:bg-[#1e40af] transition-colors"
                          >
                            Contact Now →
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
                    <h3 className="font-['Syne'] text-base font-bold mb-2">Are you a CA or Consultant in {cityName}?</h3>
                    <p className="text-[13px] text-[var(--gray)] mb-4">
                      Get leads from 10,000+ MSME owners in {cityName}. Starting ₹999/month.
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
                <h4 className="font-['Syne'] text-[13px] font-bold mb-3">🤝 Need help in {cityName}?</h4>
                <p className="text-xs text-[var(--gray)] mb-3">
                  Tell us your requirement, we'll connect you with the right expert
                </p>
                <input
                  type="text"
                  placeholder="Your Name"
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

              {/* Nearby Cities */}
              <div className="bg-white border border-[var(--gray-light)] rounded-xl p-4">
                <h4 className="font-['Syne'] text-[13px] font-bold mb-3">🌍 Other Cities</h4>
                <p className="text-xs text-[var(--gray)] mb-3">Browse consultants in nearby cities</p>
                <div className="flex flex-wrap gap-2">
                  {allCities
                    .filter(c => c.city !== cityName)
                    .slice(0, 12)
                    .map(({ city }) => (
                      <Link
                        key={city}
                        href={`/consultants/${city.toLowerCase().replace(/\s+/g, '-')}`}
                        className="bg-[#f1f5f9] border border-[var(--gray-light)] text-[var(--text)] text-xs px-3 py-1.5 rounded-md hover:bg-gray-200 transition-colors"
                      >
                        {city}
                      </Link>
                    ))}
                </div>
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
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
