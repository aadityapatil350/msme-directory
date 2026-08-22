'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { Calculator } from 'lucide-react'

export default function EMICalculatorPage() {
  const [loanAmount, setLoanAmount] = useState<number>(1000000) // ₹10 Lakh
  const [interestRate, setInterestRate] = useState<number>(10.5) // 10.5%
  const [tenureYears, setTenureYears] = useState<number>(5) // 5 Years

  // Calculations
  const { monthlyEMI, totalInterest, totalPayment, amortization } = useMemo(() => {
    const principal = loanAmount
    const monthlyRate = interestRate / (12 * 100)
    const totalMonths = tenureYears * 12

    let emi = 0
    if (monthlyRate > 0) {
      emi =
        (principal * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
        (Math.pow(1 + monthlyRate, totalMonths) - 1)
    } else {
      emi = principal / totalMonths
    }

    const totalPayable = emi * totalMonths
    const totInterest = totalPayable - principal

    // Generate yearly amortization
    let balance = principal
    const yearlySchedule = []

    for (let y = 1; y <= tenureYears; y++) {
      let yearlyInterest = 0
      let yearlyPrincipal = 0

      for (let m = 1; m <= 12; m++) {
        const interestForMonth = balance * monthlyRate
        const principalForMonth = emi - interestForMonth
        yearlyInterest += interestForMonth
        yearlyPrincipal += principalForMonth
        balance -= principalForMonth
      }

      yearlySchedule.push({
        year: y,
        principalPaid: Math.round(yearlyPrincipal),
        interestPaid: Math.round(yearlyInterest),
        balance: Math.max(0, Math.round(balance)),
      })
    }

    return {
      monthlyEMI: Math.round(emi),
      totalInterest: Math.round(totInterest),
      totalPayment: Math.round(totalPayable),
      amortization: yearlySchedule,
    }
  }, [loanAmount, interestRate, tenureYears])

  const formatRupee = (val: number) => `₹${val.toLocaleString('en-IN')}`

  return (
    <div className="min-h-screen bg-[#FAFAFA] py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Breadcrumb */}
        <nav className="text-xs text-zinc-500 mb-4 flex items-center gap-1.5 font-mono">
          <Link href="/" className="hover:text-zinc-950">Home</Link>
          <span>/</span>
          <span className="text-zinc-950">MSME Loan EMI Calculator</span>
        </nav>

        {/* Header */}
        <div className="bg-white border border-zinc-200 rounded-xl p-6 sm:p-8 mb-6 shadow-2xs">
          <div className="inline-flex items-center gap-2 bg-zinc-100 text-zinc-700 text-[10px] font-mono font-medium px-2.5 py-0.5 rounded mb-3">
            <Calculator className="w-3.5 h-3.5 text-zinc-500" />
            <span>Interactive Tool</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-zinc-950 tracking-tight mb-2">
            MSME Business Loan EMI Calculator
          </h1>
          <p className="text-xs sm:text-sm text-zinc-500 max-w-2xl leading-relaxed">
            Estimate your monthly loan repayments, total interest burden, and full amortization schedule across Mudra loans, CGTMSE credit facilities, and term loans.
          </p>
        </div>

        {/* Calculator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
          {/* Controls Column */}
          <div className="lg:col-span-7 bg-white border border-zinc-200 rounded-xl p-6 shadow-2xs space-y-6">
            {/* Slider 1: Loan Amount */}
            <div>
              <div className="flex justify-between items-baseline mb-2">
                <label className="text-[11px] font-mono uppercase text-zinc-500">
                  Loan Principal
                </label>
                <span className="text-base font-bold text-zinc-950 bg-zinc-100 px-2.5 py-0.5 rounded-md font-mono">
                  {formatRupee(loanAmount)}
                </span>
              </div>
              <input
                type="range"
                min={50000}
                max={50000000}
                step={50000}
                value={loanAmount}
                onChange={(e) => setLoanAmount(Number(e.target.value))}
                className="w-full h-1.5 bg-zinc-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-zinc-400 font-mono mt-1">
                <span>₹50K (Shishu)</span>
                <span>₹20L (Tarun+)</span>
                <span>₹5 Cr (CGTMSE)</span>
              </div>
            </div>

            {/* Slider 2: Interest Rate */}
            <div>
              <div className="flex justify-between items-baseline mb-2">
                <label className="text-[11px] font-mono uppercase text-zinc-500">
                  Interest Rate (% p.a.)
                </label>
                <span className="text-base font-bold text-zinc-950 bg-zinc-100 px-2.5 py-0.5 rounded-md font-mono">
                  {interestRate}%
                </span>
              </div>
              <input
                type="range"
                min={5}
                max={30}
                step={0.1}
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                className="w-full h-1.5 bg-zinc-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-zinc-400 font-mono mt-1">
                <span>5% (Vishwakarma)</span>
                <span>9%–12% (PSU/Banks)</span>
                <span>15%+ (NBFCs)</span>
              </div>
            </div>

            {/* Slider 3: Loan Tenure */}
            <div>
              <div className="flex justify-between items-baseline mb-2">
                <label className="text-[11px] font-mono uppercase text-zinc-500">
                  Loan Tenure
                </label>
                <span className="text-base font-bold text-zinc-950 bg-zinc-100 px-2.5 py-0.5 rounded-md font-mono">
                  {tenureYears} Years ({tenureYears * 12} Mos)
                </span>
              </div>
              <input
                type="range"
                min={1}
                max={10}
                step={1}
                value={tenureYears}
                onChange={(e) => setTenureYears(Number(e.target.value))}
                className="w-full h-1.5 bg-zinc-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-zinc-400 font-mono mt-1">
                <span>1 Year</span>
                <span>5 Years (Standard)</span>
                <span>10 Years (Max)</span>
              </div>
            </div>

            {/* Presets */}
            <div className="pt-4 border-t border-zinc-100">
              <span className="text-[10px] font-mono uppercase text-zinc-400 block mb-2">
                Scheme Benchmarks:
              </span>
              <div className="flex flex-wrap gap-1.5">
                <button
                  onClick={() => { setLoanAmount(300000); setInterestRate(5.0); setTenureYears(3); }}
                  className="text-xs bg-zinc-50 hover:bg-zinc-100 border border-zinc-200 px-2 py-1 rounded text-zinc-700 font-medium"
                >
                  PM Vishwakarma (5%)
                </button>
                <button
                  onClick={() => { setLoanAmount(1000000); setInterestRate(9.5); setTenureYears(5); }}
                  className="text-xs bg-zinc-50 hover:bg-zinc-100 border border-zinc-200 px-2 py-1 rounded text-zinc-700 font-medium"
                >
                  Mudra Tarun (9.5%)
                </button>
                <button
                  onClick={() => { setLoanAmount(5000000); setInterestRate(10.5); setTenureYears(7); }}
                  className="text-xs bg-zinc-50 hover:bg-zinc-100 border border-zinc-200 px-2 py-1 rounded text-zinc-700 font-medium"
                >
                  CGTMSE ₹50L (10.5%)
                </button>
              </div>
            </div>
          </div>

          {/* Results Column */}
          <div className="lg:col-span-5 flex flex-col justify-between bg-zinc-950 text-white rounded-xl p-6 shadow-xs">
            <div>
              <div className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 mb-1">
                Estimated Monthly EMI
              </div>
              <div className="text-3xl font-extrabold text-white mb-6 font-mono">
                {formatRupee(monthlyEMI)}
                <span className="text-xs font-normal text-zinc-400 ml-1">/ mo</span>
              </div>

              <div className="space-y-2.5 border-t border-zinc-800 pt-4 text-xs font-mono">
                <div className="flex justify-between items-center text-zinc-300">
                  <span>Principal Amount:</span>
                  <span className="font-semibold text-white">{formatRupee(loanAmount)}</span>
                </div>
                <div className="flex justify-between items-center text-zinc-300">
                  <span>Total Interest:</span>
                  <span className="font-semibold text-emerald-400">{formatRupee(totalInterest)}</span>
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-zinc-800 text-sm">
                  <span className="font-semibold text-white">Total Repayment:</span>
                  <span className="font-bold text-white">{formatRupee(totalPayment)}</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-zinc-800 space-y-2">
              <Link
                href="/loans"
                className="w-full bg-white hover:bg-zinc-100 text-zinc-950 text-xs font-medium py-2 px-3 rounded-lg text-center block transition-colors"
              >
                Compare Lender Rates &rarr;
              </Link>
              <div className="text-[10px] text-zinc-500 text-center font-mono">
                *Final rates determined by individual lending institutions.
              </div>
            </div>
          </div>
        </div>

        {/* Amortization Table */}
        <div className="bg-white border border-zinc-200 rounded-xl p-5 shadow-2xs">
          <h3 className="text-sm font-bold text-zinc-950 mb-3">
            Year-by-Year Repayment Schedule
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left font-mono">
              <thead className="bg-zinc-50 text-zinc-500 border-y border-zinc-200 uppercase text-[10px]">
                <tr>
                  <th className="py-2.5 px-3">Year</th>
                  <th className="py-2.5 px-3">Principal Paid</th>
                  <th className="py-2.5 px-3">Interest Paid</th>
                  <th className="py-2.5 px-3">Total Paid</th>
                  <th className="py-2.5 px-3">Balance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                {amortization.map((row) => (
                  <tr key={row.year} className="hover:bg-zinc-50/70">
                    <td className="py-2.5 px-3 font-semibold text-zinc-950">Year {row.year}</td>
                    <td className="py-2.5 px-3 text-emerald-700">{formatRupee(row.principalPaid)}</td>
                    <td className="py-2.5 px-3 text-zinc-600">{formatRupee(row.interestPaid)}</td>
                    <td className="py-2.5 px-3 font-semibold text-zinc-950">
                      {formatRupee(row.principalPaid + row.interestPaid)}
                    </td>
                    <td className="py-2.5 px-3 text-zinc-400">{formatRupee(row.balance)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
