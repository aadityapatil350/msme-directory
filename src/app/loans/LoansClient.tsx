'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { VerifiedLoan } from '@/data/verified-loans'
import {
  Search,
  ExternalLink,
  AlertCircle,
} from 'lucide-react'

export default function LoansClient({ loans }: { loans: VerifiedLoan[] }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [lenderType, setLenderType] = useState<string>('all')
  const [categoryFilter, setCategoryFilter] = useState<string>('all')
  const [collateralOnly, setCollateralOnly] = useState<boolean>(false)

  const filteredLoans = useMemo(() => {
    return loans.filter((loan) => {
      const matchesSearch =
        searchTerm === '' ||
        loan.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        loan.provider.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesLender = lenderType === 'all' || loan.providerType === lenderType
      const matchesCategory = categoryFilter === 'all' || loan.category === categoryFilter
      const matchesCollateral = !collateralOnly || !loan.collateralRequired

      return matchesSearch && matchesLender && matchesCategory && matchesCollateral
    })
  }, [loans, searchTerm, lenderType, categoryFilter, collateralOnly])

  const formatRupee = (val: number) => {
    if (val >= 10000000) return `₹${(val / 10000000).toFixed(1).replace(/\.0$/, '')} Cr`
    if (val >= 100000) return `₹${(val / 100000).toFixed(1).replace(/\.0$/, '')} Lakh`
    return `₹${val.toLocaleString('en-IN')}`
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA] py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Breadcrumb */}
        <nav className="text-xs text-zinc-500 mb-4 flex items-center gap-1.5 font-mono">
          <Link href="/" className="hover:text-zinc-950">Home</Link>
          <span>/</span>
          <span className="text-zinc-950">MSME Loans Comparison</span>
        </nav>

        {/* Header */}
        <div className="bg-white border border-zinc-200 rounded-xl p-6 sm:p-8 mb-6 shadow-2xs">
          <div className="inline-flex items-center gap-2 bg-zinc-100 text-zinc-700 text-[10px] font-mono font-medium px-2.5 py-0.5 rounded mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 inline-block" />
            <span>RBI Regulated Lending Institutions &bull; August 2026</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-zinc-950 tracking-tight mb-2">
            Compare MSME &amp; Business Loan Rates (2026)
          </h1>
          <p className="text-xs sm:text-sm text-zinc-500 max-w-2xl leading-relaxed">
            Compare borrowing limits, indicative rates, tenure, and security requirements across PSU banks, private banks, NBFCs, and fintech platforms.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="bg-white border border-zinc-200 rounded-xl p-4 mb-6 shadow-2xs space-y-3">
          <div className="relative">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by lender name or loan product (e.g. SBI, HDFC, Mudra, Lendingkart)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-zinc-50 border border-zinc-200 rounded-lg text-xs text-zinc-950 outline-none focus:border-zinc-400 focus:bg-white transition-all"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
            <div>
              <label className="text-[10px] font-mono uppercase text-zinc-400 block mb-1">
                Lender Type
              </label>
              <select
                value={lenderType}
                onChange={(e) => setLenderType(e.target.value)}
                className="w-full p-2 bg-zinc-50 border border-zinc-200 rounded-md text-xs text-zinc-800 outline-none focus:border-zinc-400"
              >
                <option value="all">All Lenders (PSU, Private, NBFC, Fintech)</option>
                <option value="psu-bank">Public Sector Banks (SBI, PNB, etc.)</option>
                <option value="private-bank">Private Sector Banks (HDFC, ICICI, etc.)</option>
                <option value="nbfc">NBFCs (Tata Capital, Lendingkart, etc.)</option>
                <option value="fintech">Fintech Platforms (FlexiLoans, Indifi)</option>
              </select>
            </div>

            <div>
              <label className="text-[10px] font-mono uppercase text-zinc-400 block mb-1">
                Loan Category
              </label>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="w-full p-2 bg-zinc-50 border border-zinc-200 rounded-md text-xs text-zinc-800 outline-none focus:border-zinc-400"
              >
                <option value="all">All Products</option>
                <option value="mudra">Mudra Loans (PMMY)</option>
                <option value="business">Term &amp; Growth Loans</option>
                <option value="working-capital">Working Capital &amp; Credit Lines</option>
                <option value="collateral-free">Collateral-Free MSME Loans</option>
              </select>
            </div>

            <div className="flex items-end">
              <label className="flex items-center gap-2 p-2 border border-zinc-200 rounded-md bg-zinc-50 w-full cursor-pointer hover:bg-zinc-100/70">
                <input
                  type="checkbox"
                  checked={collateralOnly}
                  onChange={(e) => setCollateralOnly(e.target.checked)}
                  className="w-3.5 h-3.5 text-zinc-900 rounded accent-zinc-950"
                />
                <span className="text-xs text-zinc-700 font-medium">
                  Collateral-Free Only
                </span>
              </label>
            </div>
          </div>
        </div>

        {/* Loan Table */}
        <div className="bg-white border border-zinc-200 rounded-xl shadow-2xs overflow-hidden mb-8">
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-zinc-50 text-zinc-500 border-b border-zinc-200 uppercase text-[10px] font-mono">
                <tr>
                  <th className="py-3 px-4">Lender &amp; Product</th>
                  <th className="py-3 px-4">Indicative Rate</th>
                  <th className="py-3 px-4">Borrowing Range</th>
                  <th className="py-3 px-4">Tenure</th>
                  <th className="py-3 px-4">Key Criteria</th>
                  <th className="py-3 px-4 text-right">Official Link</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                {filteredLoans.map((loan) => (
                  <tr key={loan.id} className="hover:bg-zinc-50/70 transition-colors">
                    {/* Lender */}
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-xs text-zinc-950">{loan.name}</div>
                      <div className="text-[11px] text-zinc-500 flex items-center gap-1 mt-0.5">
                        <span>{loan.provider}</span>
                        <span>&bull;</span>
                        <span className="capitalize">{loan.providerType.replace('-', ' ')}</span>
                      </div>
                    </td>

                    {/* Rate */}
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-xs text-zinc-950">
                        {loan.interestRateMin}% – {loan.interestRateMax}% p.a.
                      </div>
                      <div className="text-[10px] text-zinc-400 mt-0.5 leading-tight">
                        {loan.interestRateNote}
                      </div>
                    </td>

                    {/* Range */}
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-xs text-zinc-950">
                        {formatRupee(loan.minAmount)} – {formatRupee(loan.maxAmount)}
                      </div>
                      <div className="text-[10px] text-emerald-700 mt-0.5">
                        {loan.collateralRequired ? 'Security Required' : 'No Collateral'}
                      </div>
                    </td>

                    {/* Tenure */}
                    <td className="py-3.5 px-4 text-zinc-600 font-mono text-[11px]">
                      {loan.tenure}
                    </td>

                    {/* Features */}
                    <td className="py-3.5 px-4 max-w-xs">
                      <ul className="space-y-0.5 text-[11px] text-zinc-500">
                        {loan.features.slice(0, 2).map((feat, i) => (
                          <li key={i} className="flex items-start gap-1">
                            <span>&bull;</span>
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </td>

                    {/* Link */}
                    <td className="py-3.5 px-4 text-right">
                      <a
                        href={loan.applyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-zinc-900 hover:bg-zinc-800 text-white text-[11px] font-medium px-2.5 py-1.5 rounded-md inline-flex items-center gap-1 transition-colors"
                      >
                        <span>Official Portal</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* RBI Disclosure */}
        <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-4 text-xs text-zinc-500 space-y-1">
          <div className="font-semibold text-zinc-950 flex items-center gap-1.5">
            <AlertCircle className="w-3.5 h-3.5 text-zinc-500" />
            <span>RBI Digital Lending Disclosure</span>
          </div>
          <p className="text-[11px] leading-relaxed text-zinc-500">
            MSMEVault is an independent comparison portal and does not disburse loans. All loan appraisals, underwriting, interest rates, and disbursements are executed solely by respective RBI-regulated lending institutions (Banks &amp; NBFCs).
          </p>
        </div>
      </div>
    </div>
  )
}
