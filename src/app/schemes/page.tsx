'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { VERIFIED_SCHEMES } from '@/data/verified-schemes'
import { formatSchemeBenefit } from '@/lib/scheme-benefit'
import {
  Search,
  ExternalLink,
  ArrowRight,
} from 'lucide-react'

export default function SchemesPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedType, setSelectedType] = useState('all')
  const [selectedSector, setSelectedSector] = useState('all')
  const [selectedState, setSelectedState] = useState('all')

  const SECTORS = ['All Sectors', 'Manufacturing', 'Services', 'Trading', 'Food Processing', 'Traditional Crafts', 'Technology']
  const STATES = ['All States', 'Maharashtra', 'Gujarat', 'Tamil Nadu', 'Karnataka', 'Uttar Pradesh', 'Rajasthan', 'Telangana']

  const filteredSchemes = useMemo(() => {
    return VERIFIED_SCHEMES.filter((scheme) => {
      // Search
      const matchesSearch =
        searchTerm === '' ||
        scheme.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        scheme.shortDescription.toLowerCase().includes(searchTerm.toLowerCase()) ||
        scheme.sector.some((s) => s.toLowerCase().includes(searchTerm.toLowerCase()))

      // Type
      const matchesType = selectedType === 'all' || scheme.type === selectedType

      // Sector
      const matchesSector =
        selectedSector === 'all' ||
        selectedSector === 'All Sectors' ||
        scheme.sector.includes(selectedSector) ||
        scheme.sector.includes('All Sectors')

      // State
      const matchesState =
        selectedState === 'all' ||
        selectedState === 'All States' ||
        scheme.type === 'central' ||
        scheme.state?.toLowerCase() === selectedState.toLowerCase()

      return matchesSearch && matchesType && matchesSector && matchesState
    })
  }, [searchTerm, selectedType, selectedSector, selectedState])

  return (
    <div className="min-h-screen bg-[#FAFAFA] py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Breadcrumb */}
        <nav className="text-xs text-zinc-500 mb-4 flex items-center gap-1.5 font-mono">
          <Link href="/" className="hover:text-zinc-950">Home</Link>
          <span>/</span>
          <span className="text-zinc-950">Schemes Directory</span>
        </nav>

        {/* Header */}
        <div className="bg-white border border-zinc-200 rounded-xl p-6 sm:p-8 mb-6 shadow-2xs">
          <div className="inline-flex items-center gap-2 bg-zinc-100 text-zinc-700 text-[10px] font-mono font-medium px-2.5 py-0.5 rounded mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 inline-block" />
            <span>Verified Database &bull; August 2026</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-zinc-950 tracking-tight mb-2">
            Central &amp; State MSME Schemes Directory
          </h1>
          <p className="text-xs sm:text-sm text-zinc-500 max-w-2xl leading-relaxed">
            Browse verified Indian government schemes, Mudra brackets, credit guarantees, and capital subsidies. Every figure confirmed against official primary records.
          </p>
        </div>

        {/* Search & Filter Toolbar */}
        <div className="bg-white border border-zinc-200 rounded-xl p-4 mb-6 shadow-2xs space-y-3">
          {/* Search Input */}
          <div className="relative">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by scheme name, keyword, or sector (e.g., Mudra, Subsidy, CGTMSE, Food)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-zinc-50 border border-zinc-200 rounded-lg text-xs text-zinc-950 outline-none focus:border-zinc-400 focus:bg-white transition-all"
            />
          </div>

          {/* Facet Selectors */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
            {/* Jurisdiction */}
            <div>
              <label className="text-[10px] font-mono uppercase text-zinc-400 block mb-1">
                Jurisdiction
              </label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full p-2 bg-zinc-50 border border-zinc-200 rounded-md text-xs text-zinc-800 outline-none focus:border-zinc-400"
              >
                <option value="all">All (Central &amp; State)</option>
                <option value="central">Central Government Only</option>
                <option value="state">State Government Only</option>
              </select>
            </div>

            {/* Sector */}
            <div>
              <label className="text-[10px] font-mono uppercase text-zinc-400 block mb-1">
                Industry Sector
              </label>
              <select
                value={selectedSector}
                onChange={(e) => setSelectedSector(e.target.value)}
                className="w-full p-2 bg-zinc-50 border border-zinc-200 rounded-md text-xs text-zinc-800 outline-none focus:border-zinc-400"
              >
                {SECTORS.map((sec) => (
                  <option key={sec} value={sec}>{sec}</option>
                ))}
              </select>
            </div>

            {/* State Filter */}
            <div>
              <label className="text-[10px] font-mono uppercase text-zinc-400 block mb-1">
                State Location
              </label>
              <select
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                className="w-full p-2 bg-zinc-50 border border-zinc-200 rounded-md text-xs text-zinc-800 outline-none focus:border-zinc-400"
              >
                {STATES.map((st) => (
                  <option key={st} value={st}>{st}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Counter */}
        <div className="flex justify-between items-center mb-4 text-xs text-zinc-500 font-mono">
          <div>
            Showing <strong className="text-zinc-950 font-bold">{filteredSchemes.length}</strong> verified schemes
          </div>
          {(searchTerm || selectedType !== 'all' || selectedSector !== 'all' || selectedState !== 'all') && (
            <button
              onClick={() => {
                setSearchTerm('')
                setSelectedType('all')
                setSelectedSector('all')
                setSelectedState('all')
              }}
              className="text-zinc-600 hover:text-zinc-950 underline"
            >
              Reset Filters
            </button>
          )}
        </div>

        {/* Schemes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredSchemes.map((scheme) => {
            const formatted = formatSchemeBenefit(scheme.benefit, {
              minAmount: scheme.minAmount,
              maxAmount: scheme.maxAmount,
              name: scheme.name,
              description: scheme.description,
            })

            return (
              <div
                key={scheme.id}
                className="bg-white border border-zinc-200 hover:border-zinc-300 rounded-xl p-5 shadow-2xs hover:shadow-xs transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2.5">
                    <span className="inline-block bg-zinc-100 text-zinc-700 text-[10px] font-mono font-medium px-2 py-0.5 rounded">
                      {scheme.type === 'central' ? 'Central Scheme' : `State (${scheme.state || 'State'})`}
                    </span>
                    <span className="text-[10px] text-zinc-400 font-mono">
                      Verified {scheme.lastVerified}
                    </span>
                  </div>

                  <h2 className="font-semibold text-sm text-zinc-950 mb-1.5 leading-snug">
                    <Link href={`/schemes/${scheme.slug}`} className="hover:underline">
                      {scheme.name}
                    </Link>
                  </h2>

                  <p className="text-xs text-zinc-500 line-clamp-3 mb-4 leading-relaxed">
                    {scheme.shortDescription}
                  </p>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {scheme.sector.slice(0, 3).map((sec) => (
                      <span key={sec} className="bg-zinc-50 text-zinc-600 text-[10px] px-2 py-0.5 rounded border border-zinc-200">
                        {sec}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-zinc-100">
                  <div className="mb-3">
                    <span className="text-[10px] uppercase font-mono tracking-wider text-zinc-400 block">
                      Benefit Structure
                    </span>
                    <div className="text-xs font-semibold text-emerald-700 mt-0.5">
                      {formatted.primaryText}
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-2">
                    <a
                      href={scheme.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] text-zinc-400 hover:text-zinc-700 inline-flex items-center gap-1"
                    >
                      <span>Official Portal</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>

                    <Link
                      href={`/schemes/${scheme.slug}`}
                      className="bg-zinc-900 hover:bg-zinc-800 text-white text-[11px] font-medium px-2.5 py-1.5 rounded-md transition-colors inline-flex items-center gap-1"
                    >
                      <span>Full Details</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
