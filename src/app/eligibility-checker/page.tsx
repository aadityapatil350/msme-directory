'use client'

import { useState } from 'react'
import Link from 'next/link'
import { VERIFIED_SCHEMES } from '@/data/verified-schemes'
import { formatSchemeBenefit } from '@/lib/scheme-benefit'
import {
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  Sparkles,
} from 'lucide-react'
import LeadForm from '@/components/LeadForm'

interface Answers {
  sector: string
  stage: string
  turnover: string
  loanAmount: string
  location: string
}

export default function EligibilityCheckerPage() {
  const [step, setStep] = useState(1)
  const [answers, setAnswers] = useState<Answers>({
    sector: '',
    stage: '',
    turnover: '',
    loanAmount: '',
    location: '',
  })
  const [showResults, setShowResults] = useState(false)

  const handleSelect = (key: keyof Answers, value: string) => {
    setAnswers((prev) => ({ ...prev, [key]: value }))
  }

  const handleNext = () => {
    if (step < 5) {
      setStep((s) => s + 1)
    } else {
      setShowResults(true)
    }
  }

  const handleBack = () => {
    if (step > 1) {
      setStep((s) => s - 1)
    }
  }

  const handleReset = () => {
    setStep(1)
    setAnswers({
      sector: '',
      stage: '',
      turnover: '',
      loanAmount: '',
      location: '',
    })
    setShowResults(false)
  }

  // Scheme Matching Engine
  const matchingSchemes = VERIFIED_SCHEMES.filter((scheme) => {
    // Stage check: PMEGP only for new
    if (answers.stage === 'existing' && scheme.slug === 'pmegp-scheme') {
      return false
    }
    // Location check: State schemes only for matching state
    if (scheme.type === 'state' && scheme.state && answers.location) {
      if (answers.location.toLowerCase() !== scheme.state.toLowerCase()) {
        return false
      }
    }
    return true
  })

  return (
    <div className="min-h-screen bg-[#FAFAFA] py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Breadcrumb */}
        <nav className="text-xs text-zinc-500 mb-4 flex items-center gap-1.5 font-mono">
          <Link href="/" className="hover:text-zinc-950">Home</Link>
          <span>/</span>
          <span className="text-zinc-950">Scheme Eligibility Matcher</span>
        </nav>

        {/* Header */}
        <div className="bg-white border border-zinc-200 rounded-xl p-6 sm:p-8 mb-6 shadow-2xs">
          <div className="inline-flex items-center gap-2 bg-zinc-100 text-zinc-700 text-[10px] font-mono font-medium px-2.5 py-0.5 rounded mb-3">
            <Sparkles className="w-3.5 h-3.5 text-zinc-500" />
            <span>Interactive Assessment</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-zinc-950 tracking-tight mb-2">
            MSME Scheme Eligibility Matcher
          </h1>
          <p className="text-xs sm:text-sm text-zinc-500 leading-relaxed">
            Answer 5 brief questions about your business to receive an instant list of matching Central and State schemes, loan brackets, and subsidies.
          </p>
        </div>

        {!showResults ? (
          <div className="bg-white border border-zinc-200 rounded-xl p-6 sm:p-8 shadow-2xs">
            {/* Step Progress */}
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-zinc-100 text-xs font-mono text-zinc-400">
              <span>Step {step} of 5</span>
              <div className="flex gap-1.5">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className={`w-6 h-1 rounded-full ${
                      i <= step ? 'bg-zinc-950' : 'bg-zinc-200'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Step 1: Sector */}
            {step === 1 && (
              <div className="space-y-4">
                <h2 className="text-base font-bold text-zinc-950">
                  What is your primary line of business?
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {[
                    { id: 'Manufacturing', desc: 'Making physical goods / industrial processing' },
                    { id: 'Services', desc: 'IT, consulting, logistics, healthcare, repairs' },
                    { id: 'Trading / Retail', desc: 'Wholesale, retail store, distributor' },
                    { id: 'Food Processing', desc: 'Agri-processing, packaged foods, bakeries' },
                    { id: 'Artisan / Traditional Crafts', desc: 'Carpentry, pottery, smithing, handloom' },
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => handleSelect('sector', opt.id)}
                      className={`p-3.5 rounded-lg border text-left text-xs transition-all ${
                        answers.sector === opt.id
                          ? 'border-zinc-950 bg-zinc-50 text-zinc-950 font-semibold'
                          : 'border-zinc-200 text-zinc-600 hover:bg-zinc-50'
                      }`}
                    >
                      <div className="font-semibold text-zinc-950 text-xs">{opt.id}</div>
                      <div className="text-[11px] text-zinc-400 mt-0.5">{opt.desc}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2: Stage */}
            {step === 2 && (
              <div className="space-y-4">
                <h2 className="text-base font-bold text-zinc-950">
                  What is your business operational stage?
                </h2>
                <div className="grid grid-cols-1 gap-2.5">
                  {[
                    { id: 'new', title: 'New Enterprise (Greenfield)', desc: 'Planning to launch a new unit or in setup stage (< 1 year)' },
                    { id: 'existing', title: 'Existing Enterprise (Expansion)', desc: 'Operational for over 1 year; seeking working capital or expansion loan' },
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => handleSelect('stage', opt.id)}
                      className={`p-4 rounded-lg border text-left text-xs transition-all ${
                        answers.stage === opt.id
                          ? 'border-zinc-950 bg-zinc-50 text-zinc-950 font-semibold'
                          : 'border-zinc-200 text-zinc-600 hover:bg-zinc-50'
                      }`}
                    >
                      <div className="font-semibold text-zinc-950 text-xs">{opt.title}</div>
                      <div className="text-[11px] text-zinc-400 mt-0.5">{opt.desc}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 3: Turnover Band */}
            {step === 3 && (
              <div className="space-y-4">
                <h2 className="text-base font-bold text-zinc-950">
                  What is your annual turnover?
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {[
                    { id: '< 10L', title: 'Under ₹10 Lakh', desc: 'Eligible for Shishu / Micro schemes' },
                    { id: '10L - 1Cr', title: '₹10 Lakh to ₹1 Crore', desc: 'Eligible for Kishor / Tarun / PMEGP' },
                    { id: '1Cr - 10Cr', title: '₹1 Crore to ₹10 Crore', desc: 'Micro MSME classification ceiling' },
                    { id: '10Cr - 100Cr', title: '₹10 Crore to ₹100 Crore', desc: 'Small MSME classification bracket' },
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => handleSelect('turnover', opt.id)}
                      className={`p-3.5 rounded-lg border text-left text-xs transition-all ${
                        answers.turnover === opt.id
                          ? 'border-zinc-950 bg-zinc-50 text-zinc-950 font-semibold'
                          : 'border-zinc-200 text-zinc-600 hover:bg-zinc-50'
                      }`}
                    >
                      <div className="font-semibold text-zinc-950 text-xs">{opt.title}</div>
                      <div className="text-[11px] text-zinc-400 mt-0.5">{opt.desc}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 4: Required Funding */}
            {step === 4 && (
              <div className="space-y-4">
                <h2 className="text-base font-bold text-zinc-950">
                  How much funding / loan do you require?
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {[
                    { id: '< 50K', title: 'Up to ₹50,000', desc: 'Mudra Shishu bracket' },
                    { id: '50K - 5L', title: '₹50,000 to ₹5 Lakh', desc: 'Mudra Kishor bracket' },
                    { id: '5L - 20L', title: '₹5 Lakh to ₹20 Lakh', desc: 'Mudra Tarun / Tarun Plus (₹20L)' },
                    { id: '20L - 50L', title: '₹20 Lakh to ₹50 Lakh', desc: 'PMEGP Manufacturing Max' },
                    { id: '50L - 10Cr', title: '₹50 Lakh to ₹10 Crore', desc: 'CGTMSE Collateral-Free Cover' },
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => handleSelect('loanAmount', opt.id)}
                      className={`p-3.5 rounded-lg border text-left text-xs transition-all ${
                        answers.loanAmount === opt.id
                          ? 'border-zinc-950 bg-zinc-50 text-zinc-950 font-semibold'
                          : 'border-zinc-200 text-zinc-600 hover:bg-zinc-50'
                      }`}
                    >
                      <div className="font-semibold text-zinc-950 text-xs">{opt.title}</div>
                      <div className="text-[11px] text-zinc-400 mt-0.5">{opt.desc}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 5: Location */}
            {step === 5 && (
              <div className="space-y-4">
                <h2 className="text-base font-bold text-zinc-950">
                  Select your state of operation
                </h2>
                <select
                  value={answers.location}
                  onChange={(e) => handleSelect('location', e.target.value)}
                  className="w-full p-3 bg-zinc-50 border border-zinc-200 rounded-lg text-xs text-zinc-900 outline-none focus:border-zinc-400"
                >
                  <option value="">Select State</option>
                  <option value="Maharashtra">Maharashtra</option>
                  <option value="Gujarat">Gujarat</option>
                  <option value="Tamil Nadu">Tamil Nadu</option>
                  <option value="Karnataka">Karnataka</option>
                  <option value="Uttar Pradesh">Uttar Pradesh</option>
                  <option value="Rajasthan">Rajasthan</option>
                  <option value="Telangana">Telangana</option>
                  <option value="Punjab">Punjab</option>
                  <option value="Delhi">Delhi</option>
                  <option value="Other">Other State / All India</option>
                </select>
              </div>
            )}

            {/* Step Navigation Buttons */}
            <div className="flex justify-between items-center pt-6 mt-6 border-t border-zinc-100">
              <button
                type="button"
                onClick={handleBack}
                disabled={step === 1}
                className="text-xs text-zinc-500 hover:text-zinc-950 disabled:opacity-30 disabled:hover:text-zinc-500 flex items-center gap-1 font-medium"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </button>

              <button
                type="button"
                onClick={handleNext}
                disabled={
                  (step === 1 && !answers.sector) ||
                  (step === 2 && !answers.stage) ||
                  (step === 3 && !answers.turnover) ||
                  (step === 4 && !answers.loanAmount) ||
                  (step === 5 && !answers.location)
                }
                className="bg-zinc-950 hover:bg-zinc-800 disabled:opacity-30 text-white text-xs font-medium px-4 py-2 rounded-lg transition-colors flex items-center gap-1.5"
              >
                <span>{step === 5 ? 'View Matching Schemes' : 'Continue'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ) : (
          /* Results View */
          <div className="space-y-6">
            <div className="bg-white border border-zinc-200 rounded-xl p-6 shadow-2xs">
              <div className="flex items-center justify-between gap-3 mb-4 pb-4 border-b border-zinc-100">
                <div>
                  <h2 className="text-base font-bold text-zinc-950">
                    We found {matchingSchemes.length} matching schemes for you
                  </h2>
                  <div className="text-xs text-zinc-500 mt-0.5 font-mono">
                    Sector: {answers.sector} &bull; Stage: {answers.stage} &bull; State: {answers.location}
                  </div>
                </div>

                <button
                  onClick={handleReset}
                  className="text-xs text-zinc-500 hover:text-zinc-950 flex items-center gap-1 font-mono"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Restart</span>
                </button>
              </div>

              <div className="space-y-3">
                {matchingSchemes.map((scheme) => {
                  const formatted = formatSchemeBenefit(scheme.benefit, {
                    minAmount: scheme.minAmount,
                    maxAmount: scheme.maxAmount,
                    name: scheme.name,
                    description: scheme.description,
                  })

                  return (
                    <div
                      key={scheme.id}
                      className="p-4 rounded-lg border border-zinc-200 hover:border-zinc-300 bg-zinc-50/50 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
                    >
                      <div className="space-y-1 max-w-lg">
                        <div className="flex items-center gap-2">
                          <span className="bg-zinc-100 text-zinc-700 text-[10px] font-mono px-1.5 py-0.5 rounded font-medium">
                            {scheme.type === 'central' ? 'Central' : 'State'}
                          </span>
                          <span className="font-semibold text-xs text-zinc-950">
                            {scheme.name}
                          </span>
                        </div>
                        <div className="text-xs text-emerald-700 font-medium">
                          {formatted.primaryText}
                        </div>
                        <div className="text-[11px] text-zinc-500 line-clamp-1">
                          {scheme.shortDescription}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 self-end sm:self-auto flex-shrink-0">
                        <Link
                          href={`/schemes/${scheme.slug}`}
                          className="bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-medium px-3 py-1.5 rounded-md transition-colors"
                        >
                          View Guide &rarr;
                        </Link>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            <LeadForm
              leadType="scheme_enquiry"
              title="Want personalised help applying to these schemes?"
              description="Share your details and our research team will walk you through eligibility, documents, and the official application process for your matched schemes. Free."
            />
          </div>
        )}
      </div>
    </div>
  )
}
