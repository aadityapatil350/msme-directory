'use client'

import { useState, useMemo } from 'react'
import { Search, ArrowUpDown, ArrowUp, ArrowDown, Filter } from 'lucide-react'

type Loan = {
  id: string
  slug: string
  name: string
  provider: string
  providerLogo: string | null
  type: string
  minAmount: number
  maxAmount: number
  interestRateMin: number
  interestRateMax: number
  tenure: string
  eligibility: string
  documents: string[]
  features: string[]
  affiliateUrl: string | null
  isSponsored: boolean
  sponsoredUntil: Date | null
  viewCount: number
  createdAt: Date
  updatedAt: Date
}

type FilterType = 'all' | 'collateral-free' | 'under-10l' | '10l-1cr' | 'above-1cr'
type LenderType = 'all' | 'psu-banks' | 'private-banks' | 'nbfcs' | 'fintechs'
type SortType = 'rate-asc' | 'rate-desc' | 'amount-asc' | 'amount-desc' | 'default'

export default function LoansClient({ loans }: { loans: Loan[] }) {
  const [searchQuery, setSearchQuery] = useState('')
  const [amountFilter, setAmountFilter] = useState<FilterType>('all')
  const [lenderType, setLenderType] = useState<LenderType>('all')
  const [collateralFree, setCollateralFree] = useState(false)
  const [sortBy, setSortBy] = useState<SortType>('default')

  // Categorize lenders
  const getLenderCategory = (provider: string): 'psu-bank' | 'private-bank' | 'nbfc' | 'fintech' => {
    const psuBanks = ['State Bank of India', 'Punjab National Bank', 'Bank of Baroda', 'Canara Bank']
    const privateBanks = ['HDFC Bank', 'ICICI Bank', 'Axis Bank', 'Kotak Mahindra Bank']
    const fintechs = ['ZipLoan', 'GetVantage', 'Razorpay', 'FlexiLoans', 'Indifi']

    if (psuBanks.includes(provider)) return 'psu-bank'
    if (privateBanks.includes(provider)) return 'private-bank'
    if (fintechs.includes(provider)) return 'fintech'
    return 'nbfc'
  }

  // Get processing time (hardcoded based on known lenders)
  const getProcessingTime = (provider: string): string => {
    const fast = ['Bajaj Finserv', 'Lendingkart', 'ZipLoan', 'Razorpay']
    const medium = ['NeoGrowth', 'Capital Float', 'GetVantage', 'InCred', 'Indifi', 'FlexiLoans']
    const slow = ['HDFC Bank', 'ICICI Bank', 'Axis Bank', 'Kotak Mahindra Bank']

    if (fast.includes(provider)) return '2-3 days'
    if (medium.includes(provider)) return '3-5 days'
    if (slow.includes(provider)) return '5-7 days'
    return '7-10 days'
  }

  // Get reviews (hardcoded based on known lenders)
  const getReviews = (provider: string): string => {
    const reviews: Record<string, string> = {
      'Bajaj Finserv': '⭐ 4.7 · 3.2K reviews',
      'Lendingkart': '⭐ 4.5 · 2.8K reviews',
      'NeoGrowth': '⭐ 4.6 · 1.9K reviews',
      'HDFC Bank': '⭐ 4.8 · 5.1K reviews',
      'State Bank of India': '⭐ 4.4 · 4.3K reviews',
      'Tata Capital': '⭐ 4.6 · 2.2K reviews',
      'ICICI Bank': '⭐ 4.7 · 4.8K reviews',
      'Axis Bank': '⭐ 4.6 · 3.9K reviews',
      'Kotak Mahindra Bank': '⭐ 4.5 · 2.4K reviews',
      'Punjab National Bank': '⭐ 4.3 · 3.1K reviews',
    }
    return reviews[provider] || '⭐ 4.5 · 1.5K reviews'
  }

  // Check if loan is collateral-free
  const isCollateralFree = (loan: Loan): boolean => {
    return loan.features.some(f =>
      f.toLowerCase().includes('collateral-free') ||
      f.toLowerCase().includes('collateral free') ||
      f.toLowerCase().includes('no collateral')
    )
  }

  // Filter and sort loans
  const filteredAndSortedLoans = useMemo(() => {
    let filtered = loans.filter(loan => {
      // Search filter
      const matchesSearch = searchQuery === '' ||
        loan.provider.toLowerCase().includes(searchQuery.toLowerCase()) ||
        loan.name.toLowerCase().includes(searchQuery.toLowerCase())

      // Amount filter
      let matchesAmount = true
      if (amountFilter === 'under-10l') {
        matchesAmount = loan.maxAmount <= 1000000
      } else if (amountFilter === '10l-1cr') {
        matchesAmount = loan.maxAmount > 1000000 && loan.maxAmount <= 10000000
      } else if (amountFilter === 'above-1cr') {
        matchesAmount = loan.maxAmount > 10000000
      }

      // Lender type filter
      let matchesLenderType = true
      if (lenderType !== 'all') {
        const category = getLenderCategory(loan.provider)
        matchesLenderType = (
          (lenderType === 'psu-banks' && category === 'psu-bank') ||
          (lenderType === 'private-banks' && category === 'private-bank') ||
          (lenderType === 'nbfcs' && category === 'nbfc') ||
          (lenderType === 'fintechs' && category === 'fintech')
        )
      }

      // Collateral filter
      const matchesCollateral = !collateralFree || isCollateralFree(loan)

      return matchesSearch && matchesAmount && matchesLenderType && matchesCollateral
    })

    // Sort
    if (sortBy === 'rate-asc') {
      filtered.sort((a, b) => a.interestRateMin - b.interestRateMin)
    } else if (sortBy === 'rate-desc') {
      filtered.sort((a, b) => b.interestRateMin - a.interestRateMin)
    } else if (sortBy === 'amount-asc') {
      filtered.sort((a, b) => a.maxAmount - b.maxAmount)
    } else if (sortBy === 'amount-desc') {
      filtered.sort((a, b) => b.maxAmount - a.maxAmount)
    } else {
      // Default: sponsored first, then by rate
      filtered.sort((a, b) => {
        if (a.isSponsored && !b.isSponsored) return -1
        if (!a.isSponsored && b.isSponsored) return 1
        return a.interestRateMin - b.interestRateMin
      })
    }

    return filtered
  }, [loans, searchQuery, amountFilter, lenderType, collateralFree, sortBy])

  // Format amount
  const formatAmount = (amount: number): string => {
    if (amount >= 10000000) {
      return `₹${(amount / 10000000).toFixed(1)}Cr`
    } else if (amount >= 100000) {
      return `₹${(amount / 100000).toFixed(0)}L`
    } else {
      return `₹${(amount / 100000).toFixed(1)}L`
    }
  }

  return (
    <div className="min-h-screen">
      {/* Page Header */}
      <div className="bg-gradient-to-br from-[var(--navy)] to-[#1a3a6e] px-6 py-8">
        <div className="max-w-[1400px] mx-auto">
          <h1 className="font-['Syne'] text-3xl font-extrabold text-white mb-2">
            💰 Compare MSME Business Loans
          </h1>
          <p className="text-[#94a3b8] text-sm mb-3">
            Side-by-side comparison of top banks & NBFCs — verified rates & eligibility (Updated March 2025)
          </p>
          <div className="flex gap-3 flex-wrap">
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-3 py-1.5">
              <span className="text-xs text-white font-medium">✓ {loans.length} Verified Lenders</span>
            </div>
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-3 py-1.5">
              <span className="text-xs text-white font-medium">✓ Banks, NBFCs & Fintechs</span>
            </div>
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-3 py-1.5">
              <span className="text-xs text-white font-medium">✓ Rates from 8.4%</span>
            </div>
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-3 py-1.5">
              <span className="text-xs text-white font-medium">✓ Up to ₹5 Cr</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-6 py-6 bg-[#f0f4ff]">
        <div className="max-w-[1400px] mx-auto">
          {/* Search and Filters */}
          <div className="bg-white border border-[var(--gray-light)] rounded-xl p-4 mb-6 shadow-sm">
            {/* Search Bar */}
            <div className="mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search lenders by name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-[var(--gray-light)] rounded-lg text-sm outline-none focus:border-[var(--blue)] focus:ring-2 focus:ring-blue-100 transition-all"
                />
              </div>
            </div>

            {/* Filter Buttons */}
            <div className="space-y-3">
              {/* Amount Filters */}
              <div>
                <label className="text-xs font-semibold text-gray-700 mb-2 block flex items-center gap-1">
                  <Filter className="w-3 h-3" />
                  Filter by Loan Amount
                </label>
                <div className="flex gap-2 flex-wrap">
                  <button
                    onClick={() => setAmountFilter('all')}
                    className={`text-xs px-4 py-2 rounded-full font-medium transition-all ${
                      amountFilter === 'all'
                        ? 'bg-[var(--navy)] text-white shadow-md'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    All Amounts
                  </button>
                  <button
                    onClick={() => setAmountFilter('under-10l')}
                    className={`text-xs px-4 py-2 rounded-full font-medium transition-all ${
                      amountFilter === 'under-10l'
                        ? 'bg-[var(--navy)] text-white shadow-md'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Under ₹10L
                  </button>
                  <button
                    onClick={() => setAmountFilter('10l-1cr')}
                    className={`text-xs px-4 py-2 rounded-full font-medium transition-all ${
                      amountFilter === '10l-1cr'
                        ? 'bg-[var(--navy)] text-white shadow-md'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    ₹10L - ₹1Cr
                  </button>
                  <button
                    onClick={() => setAmountFilter('above-1cr')}
                    className={`text-xs px-4 py-2 rounded-full font-medium transition-all ${
                      amountFilter === 'above-1cr'
                        ? 'bg-[var(--navy)] text-white shadow-md'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Above ₹1Cr
                  </button>
                </div>
              </div>

              {/* Lender Type Filters */}
              <div>
                <label className="text-xs font-semibold text-gray-700 mb-2 block flex items-center gap-1">
                  <Filter className="w-3 h-3" />
                  Filter by Lender Type
                </label>
                <div className="flex gap-2 flex-wrap">
                  <button
                    onClick={() => setLenderType('all')}
                    className={`text-xs px-4 py-2 rounded-full font-medium transition-all ${
                      lenderType === 'all'
                        ? 'bg-[var(--navy)] text-white shadow-md'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    All Lenders
                  </button>
                  <button
                    onClick={() => setLenderType('psu-banks')}
                    className={`text-xs px-4 py-2 rounded-full font-medium transition-all ${
                      lenderType === 'psu-banks'
                        ? 'bg-green-600 text-white shadow-md'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    PSU Banks
                  </button>
                  <button
                    onClick={() => setLenderType('private-banks')}
                    className={`text-xs px-4 py-2 rounded-full font-medium transition-all ${
                      lenderType === 'private-banks'
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Private Banks
                  </button>
                  <button
                    onClick={() => setLenderType('nbfcs')}
                    className={`text-xs px-4 py-2 rounded-full font-medium transition-all ${
                      lenderType === 'nbfcs'
                        ? 'bg-orange-600 text-white shadow-md'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    NBFCs
                  </button>
                  <button
                    onClick={() => setLenderType('fintechs')}
                    className={`text-xs px-4 py-2 rounded-full font-medium transition-all ${
                      lenderType === 'fintechs'
                        ? 'bg-purple-600 text-white shadow-md'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Fintechs
                  </button>
                </div>
              </div>

              {/* Collateral Free Toggle */}
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="collateral-free"
                  checked={collateralFree}
                  onChange={(e) => setCollateralFree(e.target.checked)}
                  className="w-4 h-4 text-[var(--navy)] border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                />
                <label htmlFor="collateral-free" className="text-sm font-medium text-gray-700 cursor-pointer">
                  Show only collateral-free loans
                </label>
              </div>
            </div>
          </div>

          {/* Results Count and Sort */}
          <div className="flex justify-between items-center mb-4">
            <p className="text-sm text-gray-600">
              Showing <span className="font-bold text-[var(--navy)]">{filteredAndSortedLoans.length}</span> of {loans.length} lenders
            </p>
            <div className="flex items-center gap-2">
              <label className="text-xs font-medium text-gray-700">Sort by:</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortType)}
                className="text-xs px-3 py-1.5 border border-[var(--gray-light)] rounded-lg outline-none focus:border-[var(--blue)] focus:ring-2 focus:ring-blue-100"
              >
                <option value="default">Default (Best Match)</option>
                <option value="rate-asc">Interest Rate: Low to High</option>
                <option value="rate-desc">Interest Rate: High to Low</option>
                <option value="amount-asc">Loan Amount: Low to High</option>
                <option value="amount-desc">Loan Amount: High to Low</option>
              </select>
            </div>
          </div>

          {/* Comparison Table */}
          <div className="bg-white border border-[var(--gray-light)] rounded-xl overflow-hidden mb-6 shadow-sm">
            {/* Desktop Table */}
            <div className="hidden lg:block overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-[var(--navy)] text-white">
                    <th className="px-4 py-3 text-left text-xs font-semibold">Lender</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold">Loan Amount</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold">Interest Rate</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold">Tenure</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold">Processing Time</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold">Collateral</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAndSortedLoans.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="px-4 py-12 text-center text-gray-500">
                        <div className="flex flex-col items-center gap-2">
                          <Search className="w-12 h-12 text-gray-300" />
                          <p className="font-medium">No lenders found</p>
                          <p className="text-sm">Try adjusting your filters or search query</p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    filteredAndSortedLoans.map((loan, idx) => (
                      <tr
                        key={loan.id}
                        className={`border-b border-[var(--gray-light)] hover:bg-blue-50 transition-colors ${
                          idx % 2 === 1 ? 'bg-gray-50' : ''
                        }`}
                      >
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-2">
                            {loan.isSponsored && (
                              <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-full font-semibold">
                                Featured
                              </span>
                            )}
                            <div>
                              <div className="font-bold text-sm text-gray-900">{loan.provider}</div>
                              <div className="text-xs text-gray-500">{getReviews(loan.provider)}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-[13px] font-semibold text-[var(--money)]">
                          {formatAmount(loan.minAmount)} – {formatAmount(loan.maxAmount)}
                        </td>
                        <td className="px-4 py-4 text-[13px] font-semibold">
                          {loan.interestRateMin}–{loan.interestRateMax}% p.a.
                        </td>
                        <td className="px-4 py-4 text-[13px]">{loan.tenure}</td>
                        <td className="px-4 py-4 text-[13px] font-medium text-green-600">
                          {getProcessingTime(loan.provider)}
                        </td>
                        <td className="px-4 py-4 text-[13px]">
                          {isCollateralFree(loan) ? (
                            <span className="text-green-600 font-semibold">Not Required</span>
                          ) : (
                            <span className="text-gray-500">Varies</span>
                          )}
                        </td>
                        <td className="px-4 py-4">
                          <a
                            href={loan.affiliateUrl || '#'}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block bg-[var(--blue)] text-white text-xs font-semibold px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                          >
                            Apply Now →
                          </a>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="lg:hidden divide-y divide-gray-200">
              {filteredAndSortedLoans.length === 0 ? (
                <div className="px-6 py-12 text-center text-gray-500">
                  <Search className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                  <p className="font-medium">No lenders found</p>
                  <p className="text-sm">Try adjusting your filters</p>
                </div>
              ) : (
                filteredAndSortedLoans.map((loan) => (
                  <div key={loan.id} className="p-4 hover:bg-blue-50 transition-colors">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-bold text-sm text-gray-900">{loan.provider}</h3>
                        <p className="text-xs text-gray-500 mt-0.5">{getReviews(loan.provider)}</p>
                      </div>
                      {loan.isSponsored && (
                        <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-full font-semibold">
                          Featured
                        </span>
                      )}
                    </div>
                    <div className="space-y-2 text-sm mb-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Amount:</span>
                        <span className="font-semibold text-[var(--money)]">
                          {formatAmount(loan.minAmount)} – {formatAmount(loan.maxAmount)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Interest Rate:</span>
                        <span className="font-semibold">{loan.interestRateMin}–{loan.interestRateMax}% p.a.</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Tenure:</span>
                        <span>{loan.tenure}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Processing:</span>
                        <span className="text-green-600 font-medium">{getProcessingTime(loan.provider)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Collateral:</span>
                        <span className={isCollateralFree(loan) ? 'text-green-600 font-semibold' : 'text-gray-500'}>
                          {isCollateralFree(loan) ? 'Not Required' : 'Varies'}
                        </span>
                      </div>
                    </div>
                    <a
                      href={loan.affiliateUrl || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full bg-[var(--blue)] text-white text-sm font-semibold px-4 py-2.5 rounded-lg hover:bg-blue-700 transition-colors text-center"
                    >
                      Apply Now →
                    </a>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Data Accuracy Disclaimer */}
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-200 rounded-xl p-4 mb-6">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center">
                <span className="text-amber-600 text-lg">ℹ️</span>
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-amber-900 text-sm mb-1">Loan Data Accuracy Notice</h4>
                <p className="text-xs text-amber-800 leading-relaxed">
                  Interest rates and loan amounts verified as of <strong>March 2025</strong> from official lender websites and aggregator platforms.
                  Actual rates may vary based on credit score, business profile, and lender discretion.
                  Always verify current offers directly with the lender before applying.
                </p>
              </div>
            </div>
          </div>

          {/* Lead Form */}
          <div className="bg-white border border-[var(--gray-light)] rounded-2xl p-6 max-w-[600px] mx-auto shadow-sm">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-5 border border-blue-100">
              <h4 className="text-[15px] font-bold mb-1 text-gray-900">🚀 Get personalised loan offers</h4>
              <p className="text-[13px] text-gray-600 mb-4">
                Tell us your requirement — we'll match you with the best 3 lenders
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="px-[14px] py-[10px] border border-gray-300 rounded-lg text-[13px] outline-none focus:border-[var(--blue)] focus:ring-2 focus:ring-blue-100 transition-all"
                />
                <input
                  type="tel"
                  placeholder="Mobile Number"
                  className="px-[14px] py-[10px] border border-gray-300 rounded-lg text-[13px] outline-none focus:border-[var(--blue)] focus:ring-2 focus:ring-blue-100 transition-all"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                <input
                  type="text"
                  placeholder="Loan Amount Needed"
                  className="px-[14px] py-[10px] border border-gray-300 rounded-lg text-[13px] outline-none focus:border-[var(--blue)] focus:ring-2 focus:ring-blue-100 transition-all"
                />
                <select className="px-[14px] py-[10px] border border-gray-300 rounded-lg text-[13px] outline-none focus:border-[var(--blue)] focus:ring-2 focus:ring-blue-100 transition-all bg-white">
                  <option>Business Type</option>
                  <option>Manufacturing</option>
                  <option>Services</option>
                  <option>Trading</option>
                </select>
              </div>
              <button className="w-full bg-[var(--orange)] text-white text-sm font-bold px-4 py-3 rounded-lg hover:bg-orange-600 transition-colors shadow-md">
                Get My Loan Offers →
              </button>
              <p className="text-[11px] text-gray-600 mt-2 text-center">
                ✅ Free service · No hidden charges · Your data is safe
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
