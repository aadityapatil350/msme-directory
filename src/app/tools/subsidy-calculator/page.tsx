'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { Percent, ExternalLink } from 'lucide-react'

export default function SubsidyCalculatorPage() {
  const [sector, setSector] = useState<'manufacturing' | 'service'>('manufacturing')
  const [projectCost, setProjectCost] = useState<number>(2500000) // ₹25 Lakh
  const [location, setLocation] = useState<'urban' | 'rural'>('rural')
  const [category, setCategory] = useState<'general' | 'special'>('special')

  const maxCeiling = sector === 'manufacturing' ? 5000000 : 2000000 // ₹50L vs ₹20L
  const effectiveProjectCost = Math.min(projectCost, maxCeiling)

  const {
    subsidyPercent,
    ownContributionPercent,
    subsidyAmount,
    ownContributionAmount,
    bankLoanAmount,
  } = useMemo(() => {
    let subPct = 15
    let ownPct = 10

    if (category === 'general') {
      ownPct = 10
      subPct = location === 'urban' ? 15 : 25
    } else {
      ownPct = 5
      subPct = location === 'urban' ? 25 : 35
    }

    const subAmount = (effectiveProjectCost * subPct) / 100
    const ownAmount = (effectiveProjectCost * ownPct) / 100
    const bankAmount = effectiveProjectCost - ownAmount

    return {
      subsidyPercent: subPct,
      ownContributionPercent: ownPct,
      subsidyAmount: Math.round(subAmount),
      ownContributionAmount: Math.round(ownAmount),
      bankLoanAmount: Math.round(bankAmount),
    }
  }, [category, location, effectiveProjectCost])

  const formatRupee = (val: number) => `₹${val.toLocaleString('en-IN')}`

  return (
    <div className="min-h-screen bg-[#FAFAFA] py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Breadcrumb */}
        <nav className="text-xs text-zinc-500 mb-4 flex items-center gap-1.5 font-mono">
          <Link href="/" className="hover:text-zinc-950">Home</Link>
          <span>/</span>
          <span className="text-zinc-950">PMEGP Subsidy Calculator</span>
        </nav>

        {/* Header */}
        <div className="bg-white border border-zinc-200 rounded-xl p-6 sm:p-8 mb-6 shadow-2xs">
          <div className="inline-flex items-center gap-2 bg-zinc-100 text-zinc-700 text-[10px] font-mono font-medium px-2.5 py-0.5 rounded mb-3">
            <Percent className="w-3.5 h-3.5 text-zinc-500" />
            <span>KVIC &bull; Ministry of MSME Matrix</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-zinc-950 tracking-tight mb-2">
            PMEGP Margin Money Subsidy Calculator
          </h1>
          <p className="text-xs sm:text-sm text-zinc-500 max-w-2xl leading-relaxed">
            Calculate your capital margin money grant (15% to 35%) under PMEGP. Updated with revised ₹50 Lakh (Manufacturing) and ₹20 Lakh (Service) project cost ceilings.
          </p>
        </div>

        {/* Calculator Body */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
          {/* Controls Column */}
          <div className="lg:col-span-7 bg-white border border-zinc-200 rounded-xl p-6 shadow-2xs space-y-5">
            {/* 1. Sector Selection */}
            <div>
              <label className="text-[11px] font-mono uppercase text-zinc-500 block mb-1.5">
                1. Industry Sector (Ceiling)
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setSector('manufacturing')
                    if (projectCost > 5000000) setProjectCost(5000000)
                  }}
                  className={`p-3 rounded-lg border text-left text-xs transition-all ${
                    sector === 'manufacturing'
                      ? 'border-zinc-950 bg-zinc-50 text-zinc-950 font-semibold'
                      : 'border-zinc-200 text-zinc-600 hover:bg-zinc-50'
                  }`}
                >
                  <div className="font-semibold text-xs text-zinc-950">Manufacturing</div>
                  <div className="text-[10px] text-zinc-400 font-mono mt-0.5">Cap: ₹50 Lakh</div>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setSector('service')
                    if (projectCost > 2000000) setProjectCost(2000000)
                  }}
                  className={`p-3 rounded-lg border text-left text-xs transition-all ${
                    sector === 'service'
                      ? 'border-zinc-950 bg-zinc-50 text-zinc-950 font-semibold'
                      : 'border-zinc-200 text-zinc-600 hover:bg-zinc-50'
                  }`}
                >
                  <div className="font-semibold text-xs text-zinc-950">Service / Business</div>
                  <div className="text-[10px] text-zinc-400 font-mono mt-0.5">Cap: ₹20 Lakh</div>
                </button>
              </div>
            </div>

            {/* 2. Total Project Cost */}
            <div>
              <div className="flex justify-between items-baseline mb-2">
                <label className="text-[11px] font-mono uppercase text-zinc-500">
                  2. Project Cost
                </label>
                <span className="text-base font-bold text-zinc-950 bg-zinc-100 px-2.5 py-0.5 rounded-md font-mono">
                  {formatRupee(projectCost)}
                </span>
              </div>
              <input
                type="range"
                min={100000}
                max={sector === 'manufacturing' ? 5000000 : 2000000}
                step={50000}
                value={projectCost}
                onChange={(e) => setProjectCost(Number(e.target.value))}
                className="w-full h-1.5 bg-zinc-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-zinc-400 font-mono mt-1">
                <span>₹1 Lakh</span>
                <span>Max: {formatRupee(maxCeiling)}</span>
              </div>
            </div>

            {/* 3. Location */}
            <div>
              <label className="text-[11px] font-mono uppercase text-zinc-500 block mb-1.5">
                3. Unit Location
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setLocation('rural')}
                  className={`p-3 rounded-lg border text-left text-xs transition-all ${
                    location === 'rural'
                      ? 'border-zinc-950 bg-zinc-50 text-zinc-950 font-semibold'
                      : 'border-zinc-200 text-zinc-600 hover:bg-zinc-50'
                  }`}
                >
                  <div className="font-semibold text-xs text-zinc-950">Rural Area</div>
                  <div className="text-[10px] text-emerald-700 font-mono mt-0.5">+10% Higher Subsidy</div>
                </button>

                <button
                  type="button"
                  onClick={() => setLocation('urban')}
                  className={`p-3 rounded-lg border text-left text-xs transition-all ${
                    location === 'urban'
                      ? 'border-zinc-950 bg-zinc-50 text-zinc-950 font-semibold'
                      : 'border-zinc-200 text-zinc-600 hover:bg-zinc-50'
                  }`}
                >
                  <div className="font-semibold text-xs text-zinc-950">Urban Area</div>
                  <div className="text-[10px] text-zinc-400 font-mono mt-0.5">Municipal Limits</div>
                </button>
              </div>
            </div>

            {/* 4. Social Category */}
            <div>
              <label className="text-[11px] font-mono uppercase text-zinc-500 block mb-1.5">
                4. Social Category
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setCategory('special')}
                  className={`p-3 rounded-lg border text-left text-xs transition-all ${
                    category === 'special'
                      ? 'border-zinc-950 bg-zinc-50 text-zinc-950 font-semibold'
                      : 'border-zinc-200 text-zinc-600 hover:bg-zinc-50'
                  }`}
                >
                  <div className="font-semibold text-xs text-zinc-950">Special Category</div>
                  <div className="text-[10px] text-zinc-400 mt-0.5 leading-tight">
                    Women / SC / ST / OBC / Minorities / PH
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setCategory('general')}
                  className={`p-3 rounded-lg border text-left text-xs transition-all ${
                    category === 'general'
                      ? 'border-zinc-950 bg-zinc-50 text-zinc-950 font-semibold'
                      : 'border-zinc-200 text-zinc-600 hover:bg-zinc-50'
                  }`}
                >
                  <div className="font-semibold text-xs text-zinc-950">General Category</div>
                  <div className="text-[10px] text-zinc-400 mt-0.5 leading-tight">
                    General Category Male
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* Results Summary Box */}
          <div className="lg:col-span-5 flex flex-col justify-between bg-zinc-950 text-white rounded-xl p-6 shadow-xs">
            <div>
              <div className="inline-block bg-emerald-950 border border-emerald-800 text-emerald-300 text-[10px] font-mono font-medium px-2 py-0.5 rounded mb-3">
                {subsidyPercent}% Government Subsidy
              </div>

              <div className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 mb-1">
                Estimated Subsidy Grant
              </div>
              <div className="text-3xl font-extrabold text-white mb-6 font-mono">
                {formatRupee(subsidyAmount)}
              </div>

              <div className="space-y-2.5 border-t border-zinc-800 pt-4 text-xs font-mono">
                <div className="flex justify-between items-center text-zinc-300">
                  <span>Project Cost:</span>
                  <span className="font-semibold text-white">{formatRupee(effectiveProjectCost)}</span>
                </div>
                <div className="flex justify-between items-center text-zinc-300">
                  <span>Own Equity ({ownContributionPercent}%):</span>
                  <span className="font-semibold text-white">{formatRupee(ownContributionAmount)}</span>
                </div>
                <div className="flex justify-between items-center text-zinc-300">
                  <span>Bank Loan:</span>
                  <span className="font-semibold text-white">{formatRupee(bankLoanAmount)}</span>
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-zinc-800 text-xs">
                  <span className="text-zinc-400">Net Debt after Subsidy:</span>
                  <span className="font-bold text-emerald-400">
                    {formatRupee(bankLoanAmount - subsidyAmount)}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-zinc-800 space-y-2">
              <a
                href="https://www.kviconline.gov.in/pmegpeportal/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-white hover:bg-zinc-100 text-zinc-950 text-xs font-medium py-2.5 px-3 rounded-lg text-center flex items-center justify-center gap-1.5 transition-colors"
              >
                <span>Apply on KVIC Portal</span>
                <ExternalLink className="w-3 h-3" />
              </a>
              <div className="text-[10px] text-zinc-500 text-center font-mono">
                *Subsidy kept in 3-yr TDR and adjusted post verification.
              </div>
            </div>
          </div>
        </div>

        {/* Reference Matrix */}
        <div className="bg-white border border-zinc-200 rounded-xl p-5 shadow-2xs">
          <h3 className="text-xs font-bold text-zinc-950 uppercase font-mono tracking-wider mb-2">
            PMEGP Subsidy Rates Matrix
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left font-mono">
              <thead className="bg-zinc-50 text-zinc-500 border-y border-zinc-200 uppercase text-[10px]">
                <tr>
                  <th className="py-2.5 px-3">Beneficiary Category</th>
                  <th className="py-2.5 px-3">Own Share</th>
                  <th className="py-2.5 px-3">Urban Subsidy</th>
                  <th className="py-2.5 px-3">Rural Subsidy</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                <tr className="hover:bg-zinc-50/70">
                  <td className="py-2.5 px-3 font-semibold text-zinc-950">General Category</td>
                  <td className="py-2.5 px-3 text-zinc-500">10%</td>
                  <td className="py-2.5 px-3 font-medium text-zinc-950">15%</td>
                  <td className="py-2.5 px-3 font-medium text-emerald-700">25%</td>
                </tr>
                <tr className="hover:bg-zinc-50/70">
                  <td className="py-2.5 px-3 font-semibold text-zinc-950">
                    Special Categories (Women/SC/ST/OBC/Minority/PH)
                  </td>
                  <td className="py-2.5 px-3 text-zinc-500">5%</td>
                  <td className="py-2.5 px-3 font-medium text-zinc-950">25%</td>
                  <td className="py-2.5 px-3 font-medium text-emerald-700">35%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
