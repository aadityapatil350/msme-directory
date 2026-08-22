import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, CheckCircle2 } from 'lucide-react'

export const metadata: Metadata = {
  title: 'MSME Consultants & CA Directory (Beta Launch) | MSMEVault.in',
  description:
    'We are building a verified directory of practicing Chartered Accountants and MSME advisors. Apply to join our founding cohort.',
  alternates: {
    canonical: '/consultants',
  },
}

export default function ConsultantsHoldingPage() {
  const cities = ['Mumbai', 'Delhi', 'Bangalore', 'Pune', 'Ahmedabad', 'Chennai', 'Hyderabad', 'Jaipur', 'Kolkata', 'Surat']

  return (
    <div className="min-h-screen bg-[#FAFAFA] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Breadcrumb */}
        <nav className="text-xs text-zinc-500 mb-4 flex items-center gap-1.5 font-mono">
          <Link href="/" className="hover:text-zinc-950">Home</Link>
          <span>/</span>
          <span className="text-zinc-950">Consultants Directory</span>
        </nav>

        {/* Hero Holding Box */}
        <div className="bg-white border border-zinc-200 rounded-xl p-8 sm:p-12 mb-8 shadow-2xs text-center">
          <div className="inline-flex items-center gap-2 bg-zinc-100 text-zinc-700 text-[10px] font-mono font-medium px-2.5 py-0.5 rounded mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 inline-block" />
            <span>Beta Launch &bull; Zero Paid Listings</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-zinc-950 tracking-tight mb-3">
            MSME Consultants &amp; CA Directory
          </h1>

          <p className="text-xs sm:text-sm text-zinc-600 max-w-xl mx-auto leading-relaxed mb-8">
            We are actively onboarding verified Chartered Accountants, CS practitioners, and certified MSME advisors across India. We currently have no paid listings.
          </p>

          <div className="bg-zinc-50 border border-zinc-200 rounded-lg p-5 max-w-md mx-auto text-left mb-8 space-y-2">
            <div className="font-semibold text-xs text-zinc-950 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Are you a practicing CA, CS, or Project Advisor?</span>
            </div>
            <p className="text-[11px] text-zinc-500 leading-relaxed">
              Join the MSMEVault Founding Cohort. All verified professional listings are 100% free during the initial rollout.
            </p>
          </div>

          <div>
            <Link
              href="/list-your-firm"
              className="bg-zinc-950 hover:bg-zinc-800 text-white text-xs font-medium px-5 py-2.5 rounded-lg shadow-2xs transition-all inline-flex items-center gap-1.5"
            >
              <span>Apply for Founding Cohort (Free)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Cities grid */}
        <div className="bg-white border border-zinc-200 rounded-xl p-6 shadow-2xs">
          <h2 className="text-xs font-mono uppercase text-zinc-400 tracking-wider mb-4">
            Browse by Target City
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            {cities.map((city) => (
              <Link
                key={city}
                href={`/consultants/${city.toLowerCase()}`}
                className="bg-zinc-50 hover:bg-zinc-100 border border-zinc-200 p-2.5 rounded-md text-xs font-medium text-zinc-800 text-center transition-colors"
              >
                {city}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
