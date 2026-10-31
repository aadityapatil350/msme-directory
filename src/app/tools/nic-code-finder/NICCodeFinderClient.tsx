'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { Search, Copy, Check, Filter, ArrowRight, HelpCircle, Building2, Wrench, ShoppingBag } from 'lucide-react'
import { NIC_CODES_DATA, NICCodeItem } from '@/data/nic-codes'
import LeadForm from '@/components/LeadForm'

const QUICK_TAGS = [
  'Kirana Store',
  'Software Development',
  'Digital Marketing',
  'E-Commerce (Amazon/D2C)',
  'Garment Manufacturing',
  'Spices (Masala)',
  'Food Truck / Restaurant',
  'CCTV Installation',
  'Mobile Repair',
  'Beauty Salon',
]

export default function NICCodeFinderClient() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedSector, setSelectedSector] = useState<'All' | 'Manufacturing' | 'Services' | 'Trading'>('All')
  const [copiedCode, setCopiedCode] = useState<string | null>(null)

  const filteredCodes = useMemo(() => {
    const q = searchQuery.toLowerCase().trim()
    return NIC_CODES_DATA.filter((item) => {
      const matchSector = selectedSector === 'All' || item.sector === selectedSector
      const matchQuery =
        !q ||
        item.code.includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.searchTerms.toLowerCase().includes(q)
      return matchSector && matchQuery
    })
  }, [searchQuery, selectedSector])

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code)
    setCopiedCode(code)
    setTimeout(() => setCopiedCode(null), 2000)
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA] py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Breadcrumb */}
        <nav className="text-xs text-zinc-500 mb-6 flex items-center gap-1.5 font-mono">
          <Link href="/" className="hover:text-zinc-950">Home</Link>
          <span>/</span>
          <Link href="/tools" className="hover:text-zinc-950">Tools</Link>
          <span>/</span>
          <span className="text-zinc-950">NIC Code Finder</span>
        </nav>

        {/* Header */}
        <header className="mb-8">
          <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-[11px] font-medium px-3 py-1 rounded-full mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 inline-block" />
            <span>National Industrial Classification (NIC-2008) Search for Udyam Portal</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-zinc-950 tracking-tight mb-2">
            Udyam NIC Code Finder
          </h1>
          <p className="text-sm text-zinc-600 max-w-2xl leading-relaxed">
            Search 5-digit National Industrial Classification (NIC) codes for official Udyam MSME registration. Find the right activity code for manufacturing, services, or retail trading.
          </p>
        </header>

        {/* Search & Filter Card */}
        <div className="bg-white border border-zinc-200 rounded-2xl p-6 sm:p-8 shadow-2xs mb-8">
          {/* Main Search Input */}
          <div className="relative mb-4">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search your business activity (e.g. software, bakery, clothes, kirana, consulting)..."
              className="w-full pl-10 pr-4 py-3 text-sm bg-white border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 text-zinc-950 shadow-2xs"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-zinc-400 hover:text-zinc-700 font-mono cursor-pointer"
              >
                Clear
              </button>
            )}
          </div>

          {/* Quick Keyword Pills */}
          <div className="flex flex-wrap items-center gap-1.5 mb-6">
            <span className="text-[11px] text-zinc-400 font-mono mr-1">Popular:</span>
            {QUICK_TAGS.map((tag) => (
              <button
                key={tag}
                onClick={() => setSearchQuery(tag)}
                className="text-[11px] bg-zinc-100 hover:bg-zinc-200 text-zinc-700 px-2.5 py-1 rounded-md transition-colors cursor-pointer"
              >
                {tag}
              </button>
            ))}
          </div>

          {/* Sector Tabs */}
          <div className="flex flex-wrap gap-2 pt-4 border-t border-zinc-100">
            {(['All', 'Manufacturing', 'Services', 'Trading'] as const).map((sector) => (
              <button
                key={sector}
                onClick={() => setSelectedSector(sector)}
                className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                  selectedSector === sector
                    ? 'bg-zinc-950 text-white shadow-2xs'
                    : 'bg-zinc-50 border border-zinc-200 text-zinc-600 hover:border-zinc-400'
                }`}
              >
                {sector === 'Manufacturing' && <Building2 className="w-3.5 h-3.5" />}
                {sector === 'Services' && <Wrench className="w-3.5 h-3.5" />}
                {sector === 'Trading' && <ShoppingBag className="w-3.5 h-3.5" />}
                <span>{sector}</span>
              </button>
            ))}
            <span className="ml-auto text-xs text-zinc-400 font-mono self-center">
              Showing {filteredCodes.length} codes
            </span>
          </div>
        </div>

        {/* Results List */}
        <div className="space-y-3 mb-10">
          {filteredCodes.length > 0 ? (
            filteredCodes.map((item) => (
              <div
                key={item.code}
                className="bg-white border border-zinc-200 hover:border-zinc-300 rounded-xl p-5 shadow-2xs transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-mono font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-md">
                      {item.code}
                    </span>
                    <span className="text-[10px] font-mono text-zinc-500 bg-zinc-100 px-2 py-0.5 rounded">
                      Division {item.division}
                    </span>
                    <span
                      className={`text-[10px] font-medium px-2 py-0.5 rounded ${
                        item.sector === 'Manufacturing'
                          ? 'bg-blue-50 text-blue-700'
                          : item.sector === 'Services'
                          ? 'bg-amber-50 text-amber-700'
                          : 'bg-purple-50 text-purple-700'
                      }`}
                    >
                      {item.sector}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-zinc-800 font-medium leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <button
                  onClick={() => copyCode(item.code)}
                  className="inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-mono font-medium rounded-lg border border-zinc-200 hover:border-zinc-400 bg-zinc-50 hover:bg-white text-zinc-700 hover:text-zinc-950 transition-all cursor-pointer self-start sm:self-auto flex-shrink-0"
                >
                  {copiedCode === item.code ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-700 font-semibold">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-zinc-400" />
                      <span>Copy Code</span>
                    </>
                  )}
                </button>
              </div>
            ))
          ) : (
            <div className="bg-white border border-zinc-200 rounded-xl p-8 text-center">
              <p className="text-sm text-zinc-600 mb-2">No matching NIC code found for "{searchQuery}".</p>
              <p className="text-xs text-zinc-400">
                Try broader keywords like "food", "retail", "textile", or "services".
              </p>
            </div>
          )}
        </div>

        {/* Educational Content */}
        <div className="space-y-6 text-sm text-zinc-700">
          <div className="bg-white border border-zinc-200 rounded-xl p-6 shadow-2xs">
            <h2 className="text-lg font-bold text-zinc-950 mb-3 tracking-tight">
              What is an NIC Code in Udyam Registration?
            </h2>
            <p className="leading-relaxed mb-4">
              The <strong>National Industrial Classification (NIC-2008)</strong> is a standardized statistical system used by the Government of India to classify economic and business activities. When applying for Udyam Registration on <a href="https://udyamregistration.gov.in" target="_blank" rel="noopener noreferrer" className="text-emerald-700 underline">udyamregistration.gov.in</a>, entering the correct 5-digit NIC code is mandatory under Step 4.
            </p>

            <div className="bg-zinc-50 border border-zinc-200 rounded-lg p-4 font-mono text-xs space-y-1">
              <div className="font-sans font-semibold text-zinc-950 text-sm mb-2">How 5-Digit NIC Codes Are Structured:</div>
              <div>• <strong>2-Digit Division (e.g., 62):</strong> Broad Industry (Computer programming & consultancy)</div>
              <div>• <strong>3-Digit Group (e.g., 620):</strong> Specific Sub-sector (Computer programming activities)</div>
              <div>• <strong>4-Digit Class (e.g., 6201):</strong> Operation Scope (Software development)</div>
              <div>• <strong>5-Digit Sub-Class (e.g., 62011):</strong> Granular Activity (Writing & testing code)</div>
            </div>
          </div>

          <div className="bg-white border border-zinc-200 rounded-xl p-6 shadow-2xs">
            <h2 className="text-lg font-bold text-zinc-950 mb-3 tracking-tight">
              Can I Add Multiple NIC Codes to a Single Udyam Certificate?
            </h2>
            <p className="leading-relaxed mb-3">
              <strong>Yes.</strong> You do not need multiple Udyam certificates if you run different business lines under the same proprietorship or entity.
            </p>
            <p className="leading-relaxed mb-4">
              On the official portal, you can select and add multiple 5-digit codes under one URN. For example, a business can register both <strong>10712</strong> (Bakery manufacturing) and <strong>47110</strong> (Retail grocery trade) under different plant/unit addresses within the same enterprise profile.
            </p>

            <div className="p-3 bg-amber-50 border border-amber-200/80 rounded-lg text-xs text-amber-900 leading-relaxed">
              <strong>Important for Retailers:</strong> The Ministry of MSME officially included <strong>Retail and Wholesale Trade (Division 45, 46, and 47)</strong> under MSME Priority Sector Lending (PSL) via Office Memorandum dated 2 July 2021. Retailers who register on Udyam qualify for collateral-free Mudra and CGTMSE bank loans.
            </div>
          </div>

          {/* Related Guides */}
          <div className="bg-white border border-zinc-200 rounded-xl p-6 shadow-2xs">
            <h3 className="text-sm font-bold text-zinc-950 mb-3">Official Registration Guides</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <Link
                href="/guides/udyam-registration"
                className="p-3 rounded-lg border border-zinc-200 hover:border-zinc-400 hover:bg-zinc-50 transition-all flex items-center justify-between group"
              >
                <span>Complete Step-by-Step Udyam Registration Guide</span>
                <ArrowRight className="w-3.5 h-3.5 text-zinc-400 group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <Link
                href="/blog/udyam-registration-fees-truth"
                className="p-3 rounded-lg border border-zinc-200 hover:border-zinc-400 hover:bg-zinc-50 transition-all flex items-center justify-between group"
              >
                <span>Udyam Registration Fees: Is It Really Free?</span>
                <ArrowRight className="w-3.5 h-3.5 text-zinc-400 group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <Link
                href="/guides/msme-classification-2026"
                className="p-3 rounded-lg border border-zinc-200 hover:border-zinc-400 hover:bg-zinc-50 transition-all flex items-center justify-between group"
              >
                <span>New MSME Classification & Turnover Limits</span>
                <ArrowRight className="w-3.5 h-3.5 text-zinc-400 group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <Link
                href="/tools/gst-calculator"
                className="p-3 rounded-lg border border-zinc-200 hover:border-zinc-400 hover:bg-zinc-50 transition-all flex items-center justify-between group"
              >
                <span>Online GST Calculator (Reverse & Forward)</span>
                <ArrowRight className="w-3.5 h-3.5 text-zinc-400 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </div>
        </div>

        {/* Lead Capture */}
        <div className="my-8">
          <LeadForm
            leadType="scheme_enquiry"
            title="Need help choosing your NIC Code or applying for Udyam?"
            description="Our research desk assists entrepreneurs in identifying exact industrial codes, completing free Udyam filing, and securing MSME certificate benefits."
          />
        </div>
      </div>
    </div>
  )
}
