'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { Calculator, ArrowRight, CheckCircle2, Copy, Check, RefreshCw, HelpCircle, FileText } from 'lucide-react'
import LeadForm from '@/components/LeadForm'

const GST_SLABS = [
  { label: '0.25%', value: 0.25, desc: 'Rough diamonds & precious stones' },
  { label: '3%', value: 3, desc: 'Gold, silver, jewelry & platinum' },
  { label: '5%', value: 5, desc: 'Essential groceries, solar panels, EV charging' },
  { label: '12%', value: 12, desc: 'Processed food, medical equipment, apparel > ₹1,000' },
  { label: '18%', value: 18, desc: 'IT services, software, restaurants, machinery, agencies' },
  { label: '28%', value: 28, desc: 'Luxury cars, commercial ACs, cement, aerated drinks' },
]

export default function GSTCalculatorClient() {
  const [calcMode, setCalcMode] = useState<'exclusive' | 'inclusive'>('exclusive')
  const [amount, setAmount] = useState<number>(10000)
  const [rate, setRate] = useState<number>(18)
  const [isInterState, setIsInterState] = useState<boolean>(false)
  const [copied, setCopied] = useState<boolean>(false)

  const result = useMemo(() => {
    const rawAmount = isNaN(amount) || amount < 0 ? 0 : amount

    if (calcMode === 'exclusive') {
      // Adding GST
      const gstAmount = (rawAmount * rate) / 100
      const totalAmount = rawAmount + gstAmount
      const cgst = isInterState ? 0 : gstAmount / 2
      const sgst = isInterState ? 0 : gstAmount / 2
      const igst = isInterState ? gstAmount : 0

      return {
        baseAmount: rawAmount,
        gstAmount,
        totalAmount,
        cgst,
        sgst,
        igst,
      }
    } else {
      // Removing GST (Inclusive)
      const baseAmount = rawAmount / (1 + rate / 100)
      const gstAmount = rawAmount - baseAmount
      const cgst = isInterState ? 0 : gstAmount / 2
      const sgst = isInterState ? 0 : gstAmount / 2
      const igst = isInterState ? gstAmount : 0

      return {
        baseAmount,
        gstAmount,
        totalAmount: rawAmount,
        cgst,
        sgst,
        igst,
      }
    }
  }, [calcMode, amount, rate, isInterState])

  const copyBreakdown = () => {
    const text = `GST Calculation Summary:
- Mode: ${calcMode === 'exclusive' ? 'Add GST (Exclusive)' : 'Remove GST (Inclusive)'}
- Base Amount: ₹${result.baseAmount.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
- GST Rate: ${rate}%
- Total GST: ₹${result.gstAmount.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
${isInterState ? `- IGST: ₹${result.igst.toLocaleString('en-IN', { maximumFractionDigits: 2 })}` : `- CGST: ₹${result.cgst.toLocaleString('en-IN', { maximumFractionDigits: 2 })}\n- SGST: ₹${result.sgst.toLocaleString('en-IN', { maximumFractionDigits: 2 })}`}
- Final Invoice Total: ₹${result.totalAmount.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
Generated on MSMEVault.in`

    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
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
          <span className="text-zinc-950">GST Calculator</span>
        </nav>

        {/* Header */}
        <header className="mb-8">
          <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-[11px] font-medium px-3 py-1 rounded-full mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 inline-block" />
            <span>Updated with 2026 CGST / SGST / IGST Tax Slabs</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-zinc-950 tracking-tight mb-2">
            Online GST Calculator
          </h1>
          <p className="text-sm text-zinc-600 max-w-2xl leading-relaxed">
            Calculate Goods and Services Tax instantly. Add GST to net prices, or remove GST from gross invoice amounts with automatic CGST, SGST, and IGST breakdowns.
          </p>
        </header>

        {/* Main Calculator Card */}
        <div className="bg-white border border-zinc-200 rounded-2xl p-6 sm:p-8 shadow-2xs mb-8">
          {/* Mode Switcher */}
          <div className="grid grid-cols-2 gap-2 p-1.5 bg-zinc-100 rounded-xl mb-6 max-w-md">
            <button
              onClick={() => setCalcMode('exclusive')}
              className={`py-2 px-3 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                calcMode === 'exclusive'
                  ? 'bg-white text-zinc-950 shadow-2xs'
                  : 'text-zinc-600 hover:text-zinc-950'
              }`}
            >
              Add GST (Exclusive)
            </button>
            <button
              onClick={() => setCalcMode('inclusive')}
              className={`py-2 px-3 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                calcMode === 'inclusive'
                  ? 'bg-white text-zinc-950 shadow-2xs'
                  : 'text-zinc-600 hover:text-zinc-950'
              }`}
            >
              Remove GST (Inclusive)
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Inputs Column */}
            <div className="space-y-5">
              <div>
                <label className="block text-xs font-semibold text-zinc-950 mb-1.5">
                  {calcMode === 'exclusive' ? 'Net Amount (Before Tax)' : 'Total Amount (Including GST)'}
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400 font-mono text-sm">₹</span>
                  <input
                    type="number"
                    value={amount || ''}
                    onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
                    placeholder="Enter amount"
                    className="w-full pl-8 pr-3 py-2.5 text-sm bg-white border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono text-zinc-950"
                  />
                </div>
              </div>

              {/* GST Slab Selector */}
              <div>
                <label className="block text-xs font-semibold text-zinc-950 mb-2">
                  Select Applicable GST Slab
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                  {GST_SLABS.map((s) => (
                    <button
                      key={s.value}
                      onClick={() => setRate(s.value)}
                      className={`py-2 text-xs font-mono font-semibold rounded-lg border transition-all cursor-pointer ${
                        rate === s.value
                          ? 'bg-emerald-600 border-emerald-600 text-white shadow-2xs'
                          : 'border-zinc-200 bg-zinc-50/50 text-zinc-700 hover:border-zinc-400'
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
                <p className="text-[11px] text-zinc-500 mt-2">
                  {GST_SLABS.find((s) => s.value === rate)?.desc || 'Custom rate applied'}
                </p>
              </div>

              {/* Transaction Type: Intra-state vs Inter-state */}
              <div className="pt-2 border-t border-zinc-100">
                <label className="block text-xs font-semibold text-zinc-950 mb-2">
                  Supply Location (CGST/SGST vs IGST)
                </label>
                <div className="flex items-center gap-3">
                  <label className="flex items-center gap-2 text-xs text-zinc-700 cursor-pointer">
                    <input
                      type="radio"
                      checked={!isInterState}
                      onChange={() => setIsInterState(false)}
                      className="text-emerald-600 focus:ring-emerald-500"
                    />
                    <span>Intra-State (Same State: CGST + SGST)</span>
                  </label>
                  <label className="flex items-center gap-2 text-xs text-zinc-700 cursor-pointer">
                    <input
                      type="radio"
                      checked={isInterState}
                      onChange={() => setIsInterState(true)}
                      className="text-emerald-600 focus:ring-emerald-500"
                    />
                    <span>Inter-State (IGST)</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Results Column */}
            <div className="bg-zinc-50/80 border border-zinc-200/80 rounded-xl p-5 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-zinc-200 mb-4">
                  <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider font-mono">Invoice Summary</span>
                  <button
                    onClick={copyBreakdown}
                    className="inline-flex items-center gap-1 text-[11px] font-mono text-zinc-600 hover:text-zinc-950 bg-white border border-zinc-200 px-2 py-1 rounded cursor-pointer transition-colors"
                  >
                    {copied ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                    <span>{copied ? 'Copied' : 'Copy Summary'}</span>
                  </button>
                </div>

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-zinc-600 text-xs">Net Base Price:</span>
                    <span className="font-mono font-medium text-zinc-950">
                      ₹{result.baseAmount.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                    </span>
                  </div>

                  {!isInterState ? (
                    <>
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-zinc-600">CGST ({rate / 2}%):</span>
                        <span className="font-mono text-zinc-800">
                          ₹{result.cgst.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                        </span>
                      </div>
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-zinc-600">SGST ({rate / 2}%):</span>
                        <span className="font-mono text-zinc-800">
                          ₹{result.sgst.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                        </span>
                      </div>
                    </>
                  ) : (
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-zinc-600">IGST ({rate}%):</span>
                      <span className="font-mono text-zinc-800">
                        ₹{result.igst.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                      </span>
                    </div>
                  )}

                  <div className="flex justify-between items-center text-xs pt-2 border-t border-zinc-200/60">
                    <span className="text-zinc-600 font-medium">Total Tax (GST):</span>
                    <span className="font-mono font-semibold text-emerald-700">
                      ₹{result.gstAmount.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t-2 border-dashed border-zinc-200">
                <div className="text-[11px] text-zinc-500 uppercase font-mono mb-1">Total Invoice Value</div>
                <div className="text-2xl sm:text-3xl font-extrabold text-zinc-950 font-mono tracking-tight">
                  ₹{result.totalAmount.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* GST Knowledge Section */}
        <div className="space-y-6 text-sm text-zinc-700">
          <div className="bg-white border border-zinc-200 rounded-xl p-6 shadow-2xs">
            <h2 className="text-lg font-bold text-zinc-950 mb-3 tracking-tight">
              How GST Calculation Works in India
            </h2>
            <p className="leading-relaxed mb-4">
              Goods and Services Tax (GST) is a destination-based, multi-stage tax levied on every value addition. Whether you are generating a client invoice or reconciling vendor purchase bills, you use one of two core mathematical formulas:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4 font-mono text-xs">
              <div className="bg-zinc-50 border border-zinc-200 p-4 rounded-lg">
                <strong className="block text-zinc-950 mb-1 font-sans text-sm">1. To Add GST (Exclusive):</strong>
                <code>GST Amount = (Net Price × GST Rate) ÷ 100</code>
                <div className="mt-2 text-zinc-600">Total Invoice = Net Price + GST Amount</div>
              </div>
              <div className="bg-zinc-50 border border-zinc-200 p-4 rounded-lg">
                <strong className="block text-zinc-950 mb-1 font-sans text-sm">2. To Remove GST (Inclusive):</strong>
                <code>Net Base Price = Total Invoice ÷ (1 + GST Rate ÷ 100)</code>
                <div className="mt-2 text-zinc-600">GST Component = Total Invoice - Net Base Price</div>
              </div>
            </div>
          </div>

          <div className="bg-white border border-zinc-200 rounded-xl p-6 shadow-2xs">
            <h2 className="text-lg font-bold text-zinc-950 mb-3 tracking-tight">
              Understanding the 4 Primary GST Slabs in India
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-xs border border-zinc-200 rounded-lg">
                <thead>
                  <tr className="bg-zinc-50 border-b border-zinc-200 font-semibold text-zinc-950 text-left">
                    <th className="p-3">GST Slab</th>
                    <th className="p-3">Key Goods Covered</th>
                    <th className="p-3">Key Services Covered</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100">
                  <tr>
                    <td className="p-3 font-mono font-bold text-emerald-700">5%</td>
                    <td className="p-3">Packaged spices, tea, edible oil, solar pumps, renewable devices, EV charging</td>
                    <td className="p-3">Rail travel (AC classes), economy air transport, small restaurant services</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-mono font-bold text-emerald-700">12%</td>
                    <td className="p-3">Processed fruit, butter, ghee, medical instruments, apparel valued above ₹1,000</td>
                    <td className="p-3">Business class air travel, hotel accommodations with room tariffs between ₹1,000 and ₹7,500</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-mono font-bold text-emerald-700">18%</td>
                    <td className="p-3">Capital machinery, electronics, iron & steel items, biscuits, FMCG personal care</td>
                    <td className="p-3">IT services, digital agencies, telecom, professional consulting, architecture, software licensing</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-mono font-bold text-emerald-700">28%</td>
                    <td className="p-3">Luxury automobiles, motor vehicles, aerated sugary drinks, cement, air conditioners</td>
                    <td className="p-3">Five-star luxury hotel services, casino & betting admissions, amusement racing</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Related Guides & Tools */}
          <div className="bg-white border border-zinc-200 rounded-xl p-6 shadow-2xs">
            <h3 className="text-sm font-bold text-zinc-950 mb-3">Related Tax & Compliance Resources</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <Link
                href="/blog/gst-for-freelancers-and-consultants"
                className="p-3 rounded-lg border border-zinc-200 hover:border-zinc-400 hover:bg-zinc-50 transition-all flex items-center justify-between group"
              >
                <span>GST for Freelancers & Consultants Guide</span>
                <ArrowRight className="w-3.5 h-3.5 text-zinc-400 group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <Link
                href="/blog/msme-45-days-payment-rule-section-43b-h"
                className="p-3 rounded-lg border border-zinc-200 hover:border-zinc-400 hover:bg-zinc-50 transition-all flex items-center justify-between group"
              >
                <span>Section 43B(h) MSME 45-Day Payment Rule</span>
                <ArrowRight className="w-3.5 h-3.5 text-zinc-400 group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <Link
                href="/tools/subsidy-calculator"
                className="p-3 rounded-lg border border-zinc-200 hover:border-zinc-400 hover:bg-zinc-50 transition-all flex items-center justify-between group"
              >
                <span>PMEGP Capital Subsidy Calculator</span>
                <ArrowRight className="w-3.5 h-3.5 text-zinc-400 group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <Link
                href="/tools/emi-calculator"
                className="p-3 rounded-lg border border-zinc-200 hover:border-zinc-400 hover:bg-zinc-50 transition-all flex items-center justify-between group"
              >
                <span>MSME & Mudra Loan EMI Calculator</span>
                <ArrowRight className="w-3.5 h-3.5 text-zinc-400 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </div>
        </div>

        {/* Lead Capture */}
        <div className="my-8">
          <LeadForm
            leadType="scheme_enquiry"
            title="Need help with GST registration or MSME compliance?"
            description="Our research desk guides Indian business owners through GST registration thresholds, Udyam linkage, and bank credit facilities. Free and unbiased."
          />
        </div>
      </div>
    </div>
  )
}
