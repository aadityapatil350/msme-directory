import Link from 'next/link'
import { Metadata } from 'next'
import { VERIFIED_SCHEMES } from '@/data/verified-schemes'
import { formatSchemeBenefit } from '@/lib/scheme-benefit'
import {
  ArrowRight,
  Calculator,
  Percent,
  FileCheck,
  ExternalLink,
  Search,
} from 'lucide-react'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://msmevault.in'

export const metadata: Metadata = {
  title: 'MSMEVault.in – Indian Government Schemes & MSME Loans Explained Simply (2026)',
  description:
    'Free, plain-language reference to Udyam registration, Mudra loans (Tarun Plus ₹20L), PMEGP subsidies (15%-35%), CGTMSE (₹10 Cr cover), and 60+ central and state schemes.',
  keywords: [
    'MSME schemes India 2026',
    'government loans for small business',
    'Mudra loan apply online',
    'CGTMSE scheme eligibility',
    'PMEGP margin money subsidy',
    'Udyam registration free',
    'PM Vishwakarma yojana',
    'MSME classification thresholds 2026',
  ],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'MSMEVault.in – Verified Government Schemes & MSME Loans',
    description:
      'Free, plain-language reference to Udyam registration, Mudra, PMEGP, CGTMSE and 60+ central and state schemes. Every figure sourced and dated.',
    url: siteUrl,
    type: 'website',
  },
}

export default function HomePage() {
  const topSchemes = VERIFIED_SCHEMES.slice(0, 6)
  const totalSchemesCount = VERIFIED_SCHEMES.length

  const states = [
    { name: 'Maharashtra', count: '14+' },
    { name: 'Gujarat', count: '12+' },
    { name: 'Tamil Nadu', count: '10+' },
    { name: 'Karnataka', count: '9+' },
    { name: 'Uttar Pradesh', count: '11+' },
    { name: 'Rajasthan', count: '8+' },
    { name: 'Telangana', count: '7+' },
    { name: 'Punjab', count: '6+' },
  ]

  return (
    <div className="flex flex-col min-h-screen bg-[#FAFAFA]">
      {/* 1. Minimalist Hero Section */}
      <section className="bg-white border-b border-zinc-200 pt-16 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          {/* Trust Pill */}
          <div className="inline-flex items-center gap-2 bg-zinc-100 border border-zinc-200/80 text-zinc-700 text-[11px] font-medium px-3.5 py-1 rounded-full mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 inline-block" />
            <span>Anchored to Primary Gazette Notifications &bull; Updated August 2026</span>
          </div>

          {/* Minimalist Heading */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-zinc-950 tracking-tight mb-5 leading-tight">
            Indian government schemes &amp; MSME loans, <span className="text-zinc-500 font-normal">explained simply.</span>
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base text-zinc-600 max-w-2xl mx-auto mb-8 leading-relaxed">
            Free, plain-language guides to Udyam registration, Mudra (Tarun Plus ₹20L), PMEGP subsidies (15%–35%), and CGTMSE guarantee cover. Every figure sourced and dated from official primary records.
          </p>

          {/* Search Bar with Quick Filter Pills */}
          <div className="max-w-xl mx-auto mb-8">
            <Link
              href="/schemes"
              className="flex items-center gap-3 w-full bg-zinc-50 hover:bg-white border border-zinc-200 hover:border-zinc-400 rounded-xl px-4 py-3 text-left text-xs text-zinc-400 transition-all shadow-2xs group"
            >
              <Search className="w-4 h-4 text-zinc-400 group-hover:text-zinc-900 transition-colors" />
              <span className="flex-1 text-zinc-500">Search 60+ central and state schemes (e.g. Mudra, PMEGP, CGTMSE)...</span>
              <kbd className="hidden sm:inline-block bg-white border border-zinc-200 text-[10px] text-zinc-400 px-2 py-0.5 rounded font-mono">
                Browse &rarr;
              </kbd>
            </Link>

            <div className="flex flex-wrap items-center justify-center gap-1.5 mt-3 text-[11px] text-zinc-500">
              <span className="text-zinc-400">Popular:</span>
              <Link href="/guides/udyam-registration" className="text-zinc-700 hover:text-zinc-950 underline underline-offset-2">
                Udyam Registration
              </Link>
              <span>&bull;</span>
              <Link href="/guides/mudra-loan" className="text-zinc-700 hover:text-zinc-950 underline underline-offset-2">
                Mudra ₹20L
              </Link>
              <span>&bull;</span>
              <Link href="/tools/subsidy-calculator" className="text-zinc-700 hover:text-zinc-950 underline underline-offset-2">
                PMEGP Subsidy
              </Link>
              <span>&bull;</span>
              <Link href="/guides/cgtmse" className="text-zinc-700 hover:text-zinc-950 underline underline-offset-2">
                CGTMSE Cover
              </Link>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
            <Link
              href="/eligibility-checker"
              className="bg-zinc-950 hover:bg-zinc-800 text-white text-xs font-medium px-5 py-2.5 rounded-lg shadow-2xs transition-all flex items-center gap-2"
            >
              <span>Check Scheme Fit</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            <Link
              href="/schemes"
              className="bg-white hover:bg-zinc-50 text-zinc-900 text-xs font-medium px-5 py-2.5 rounded-lg border border-zinc-200 hover:border-zinc-300 transition-all"
            >
              Browse All Schemes
            </Link>

            <Link
              href="/tools/emi-calculator"
              className="bg-zinc-100 hover:bg-zinc-200/80 text-zinc-700 text-xs font-medium px-4 py-2.5 rounded-lg transition-all flex items-center gap-1.5"
            >
              <Calculator className="w-3.5 h-3.5 text-zinc-500" />
              <span>EMI Calculator</span>
            </Link>
          </div>

          {/* Verifiable Macro Figures (Official Public Data) */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-3xl mx-auto text-left pt-6 border-t border-zinc-100">
            <div className="p-3 bg-zinc-50/70 border border-zinc-200/70 rounded-xl">
              <div className="text-lg sm:text-xl font-bold text-zinc-950">7.83 Cr+</div>
              <div className="text-[11px] text-zinc-500 mt-0.5 leading-tight">
                Enterprises on Udyam <span className="block text-[9px] text-zinc-400 font-mono">(MSME Min. 2026)</span>
              </div>
            </div>

            <div className="p-3 bg-zinc-50/70 border border-zinc-200/70 rounded-xl">
              <div className="text-lg sm:text-xl font-bold text-zinc-950">₹10 Crore</div>
              <div className="text-[11px] text-zinc-500 mt-0.5 leading-tight">
                CGTMSE Guarantee Cap <span className="block text-[9px] text-zinc-400 font-mono">(Circular 250/2024-25)</span>
              </div>
            </div>

            <div className="p-3 bg-zinc-50/70 border border-zinc-200/70 rounded-xl">
              <div className="text-lg sm:text-xl font-bold text-zinc-950">₹20 Lakh</div>
              <div className="text-[11px] text-zinc-500 mt-0.5 leading-tight">
                Mudra Tarun Plus Limit <span className="block text-[9px] text-zinc-400 font-mono">(DFS w.e.f. Oct 2024)</span>
              </div>
            </div>

            <div className="p-3 bg-zinc-50/70 border border-zinc-200/70 rounded-xl">
              <div className="text-lg sm:text-xl font-bold text-zinc-950">15%–35%</div>
              <div className="text-[11px] text-zinc-500 mt-0.5 leading-tight">
                PMEGP Margin Subsidy <span className="block text-[9px] text-zinc-400 font-mono">(KVIC Guidelines)</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Essential Government Schemes Directory */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-6 gap-2">
          <div>
            <h2 className="text-xl font-bold text-zinc-950">
              Essential Government Schemes &amp; Subsidies
            </h2>
            <p className="text-xs text-zinc-500 mt-0.5">
              Verified breakdowns of the most impactful credit, subsidy, and registration schemes.
            </p>
          </div>

          <Link
            href="/schemes"
            className="text-xs font-medium text-zinc-600 hover:text-zinc-950 flex items-center gap-1 group self-start sm:self-auto"
          >
            <span>View all {totalSchemesCount} schemes</span>
            <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {topSchemes.map((scheme) => {
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
                      {scheme.type === 'central' ? 'Central' : `State (${scheme.state || 'State'})`}
                    </span>
                    <span className="text-[10px] text-zinc-400 font-mono">
                      Verified {scheme.lastVerified}
                    </span>
                  </div>

                  <h3 className="font-semibold text-sm text-zinc-950 mb-1.5 leading-snug">
                    <Link href={`/schemes/${scheme.slug}`} className="hover:underline">
                      {scheme.name}
                    </Link>
                  </h3>

                  <p className="text-xs text-zinc-500 line-clamp-2 mb-4 leading-relaxed">
                    {scheme.shortDescription}
                  </p>
                </div>

                <div className="pt-3 border-t border-zinc-100">
                  <div className="mb-3">
                    <span className="text-[10px] uppercase font-mono tracking-wider text-zinc-400 block">
                      Benefit
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
                      <span>Official Source</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>

                    <Link
                      href={`/schemes/${scheme.slug}`}
                      className="bg-zinc-900 hover:bg-zinc-800 text-white text-[11px] font-medium px-2.5 py-1.5 rounded-md transition-colors inline-flex items-center gap-1"
                    >
                      <span>Read Guide</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* 3. Interactive Financial Calculators */}
      <section className="bg-white border-y border-zinc-200 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-2xl mb-8">
            <h2 className="text-xl font-bold text-zinc-950">
              Interactive Planning Calculators
            </h2>
            <p className="text-xs text-zinc-500 mt-0.5">
              Self-serve assessment tools with mathematical accuracy.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Tool 1 */}
            <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-5 hover:border-zinc-300 transition-all flex flex-col justify-between">
              <div>
                <div className="w-8 h-8 rounded-lg bg-white border border-zinc-200 text-zinc-900 flex items-center justify-center mb-3">
                  <Calculator className="w-4 h-4" />
                </div>
                <h3 className="font-semibold text-sm text-zinc-950 mb-1">
                  MSME Loan EMI Calculator
                </h3>
                <p className="text-xs text-zinc-500 mb-4 leading-relaxed">
                  Calculate monthly EMIs, total interest, and amortization schedules across Mudra, CGTMSE, and term loans.
                </p>
              </div>

              <Link
                href="/tools/emi-calculator"
                className="text-xs font-medium text-zinc-900 hover:underline inline-flex items-center gap-1 self-start"
              >
                <span>Calculate Loan EMI</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            {/* Tool 2 */}
            <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-5 hover:border-zinc-300 transition-all flex flex-col justify-between">
              <div>
                <div className="w-8 h-8 rounded-lg bg-white border border-zinc-200 text-zinc-900 flex items-center justify-center mb-3">
                  <Percent className="w-4 h-4" />
                </div>
                <h3 className="font-semibold text-sm text-zinc-950 mb-1">
                  PMEGP Subsidy Calculator
                </h3>
                <p className="text-xs text-zinc-500 mb-4 leading-relaxed">
                  Compute 15%–35% margin money subsidy with revised ₹50 Lakh (mfg) and ₹20 Lakh (service) ceilings.
                </p>
              </div>

              <Link
                href="/tools/subsidy-calculator"
                className="text-xs font-medium text-zinc-900 hover:underline inline-flex items-center gap-1 self-start"
              >
                <span>Calculate Margin Money</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            {/* Tool 3 */}
            <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-5 hover:border-zinc-300 transition-all flex flex-col justify-between">
              <div>
                <div className="w-8 h-8 rounded-lg bg-white border border-zinc-200 text-zinc-900 flex items-center justify-center mb-3">
                  <FileCheck className="w-4 h-4" />
                </div>
                <h3 className="font-semibold text-sm text-zinc-950 mb-1">
                  Scheme Eligibility Matcher
                </h3>
                <p className="text-xs text-zinc-500 mb-4 leading-relaxed">
                  Answer 4 quick questions about sector, turnover, and state to discover eligible subsidy schemes.
                </p>
              </div>

              <Link
                href="/eligibility-checker"
                className="text-xs font-medium text-zinc-900 hover:underline inline-flex items-center gap-1 self-start"
              >
                <span>Check Scheme Fit</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Browse by State Directory */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full">
        <div className="mb-5">
          <h2 className="text-lg font-bold text-zinc-950">
            Regional Schemes by State
          </h2>
          <p className="text-xs text-zinc-500">
            Browse state industrial promotion policies and local incentives.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
          {states.map((st) => (
            <Link
              key={st.name}
              href={`/schemes?state=${encodeURIComponent(st.name.toLowerCase())}`}
              className="bg-white border border-zinc-200 hover:border-zinc-400 p-3 rounded-lg text-center transition-all group"
            >
              <div className="font-medium text-xs text-zinc-900 group-hover:text-zinc-950">
                {st.name}
              </div>
              <div className="text-[10px] text-zinc-400 mt-0.5 font-mono">
                {st.count} schemes
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 5. Founding Cohort Directory Notice */}
      <section className="py-6 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full mb-12">
        <div className="bg-white border border-zinc-200 rounded-xl p-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 max-w-2xl">
            <span className="text-[10px] font-mono uppercase bg-zinc-100 text-zinc-600 px-2 py-0.5 rounded font-semibold inline-block">
              Founding Professional Cohort
            </span>
            <h3 className="text-base font-bold text-zinc-950">
              Verified CA &amp; MSME Consultant Directory
            </h3>
            <p className="text-xs text-zinc-500 leading-relaxed">
              We currently have no paid listings. If you are a practicing Chartered Accountant, CS, or certified MSME advisor, apply to join our founding cohort. Free during the initial rollout.
            </p>
          </div>

          <div className="flex-shrink-0">
            <Link
              href="/consultants"
              className="bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-medium px-4 py-2.5 rounded-lg transition-colors inline-block"
            >
              Join Founding Cohort &rarr;
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
