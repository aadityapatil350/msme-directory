import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, CheckCircle2, MapPin } from 'lucide-react'

const CITIES = [
  'mumbai', 'delhi', 'bangalore', 'pune', 'ahmedabad',
  'chennai', 'hyderabad', 'jaipur', 'kolkata', 'surat'
]

// Only the known city list is valid; other cities return a clean 404.
export const dynamicParams = false

export async function generateStaticParams() {
  return CITIES.map((city) => ({
    city,
  }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string }>
}): Promise<Metadata> {
  const { city } = await params
  const cityName = city.charAt(0).toUpperCase() + city.slice(1)

  return {
    title: `MSME Consultants & Chartered Accountants in ${cityName} (Beta) | MSMEVault.in`,
    description: `We are building a verified directory of Chartered Accountants and MSME advisors in ${cityName}. Apply for free founding cohort listing.`,
    alternates: {
      canonical: `/consultants/${city}`,
    },
  }
}

export default async function CityConsultantsPage({
  params,
}: {
  params: Promise<{ city: string }>
}) {
  const { city } = await params
  const cityName = city.charAt(0).toUpperCase() + city.slice(1)

  return (
    <div className="min-h-screen bg-[#FAFAFA] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Breadcrumb */}
        <nav className="text-xs text-zinc-500 mb-4 flex items-center gap-1.5 font-mono">
          <Link href="/" className="hover:text-zinc-950">Home</Link>
          <span>/</span>
          <Link href="/consultants" className="hover:text-zinc-950">Consultants</Link>
          <span>/</span>
          <span className="text-zinc-950 capitalize">{cityName}</span>
        </nav>

        {/* Hero Holding Box */}
        <div className="bg-white border border-zinc-200 rounded-xl p-8 sm:p-12 mb-8 shadow-2xs text-center">
          <div className="inline-flex items-center gap-2 bg-zinc-100 text-zinc-700 text-[10px] font-mono font-medium px-2.5 py-0.5 rounded mb-4">
            <MapPin className="w-3.5 h-3.5 text-zinc-500" />
            <span>{cityName} Regional Directory &bull; Beta Launch</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-zinc-950 tracking-tight mb-3">
            MSME Consultants &amp; CA Directory in {cityName}
          </h1>

          <p className="text-xs sm:text-sm text-zinc-600 max-w-xl mx-auto leading-relaxed mb-8">
            We are actively onboarding verified Chartered Accountants, CS practitioners, and certified MSME project advisors based in {cityName}. We currently have no paid listings.
          </p>

          <div className="bg-zinc-50 border border-zinc-200 rounded-lg p-5 max-w-md mx-auto text-left mb-8 space-y-2">
            <div className="font-semibold text-xs text-zinc-950 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Are you a practicing CA or MSME advisor in {cityName}?</span>
            </div>
            <p className="text-[11px] text-zinc-500 leading-relaxed">
              Join the MSMEVault Founding Cohort. All verified professional listings are 100% free during the initial beta rollout.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/list-your-firm"
              className="bg-zinc-950 hover:bg-zinc-800 text-white text-xs font-medium px-5 py-2.5 rounded-lg shadow-2xs transition-all inline-flex items-center gap-1.5"
            >
              <span>Apply for {cityName} Founding Cohort (Free)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            <Link
              href="/consultants"
              className="bg-white hover:bg-zinc-50 text-zinc-800 text-xs font-medium px-4 py-2.5 rounded-lg border border-zinc-200 transition-all"
            >
              View All Cities
            </Link>
          </div>
        </div>

        {/* Other Cities */}
        <div className="bg-white border border-zinc-200 rounded-xl p-6 shadow-2xs">
          <h2 className="text-xs font-mono uppercase text-zinc-400 tracking-wider mb-4">
            Other Target Cities
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            {CITIES.filter((c) => c !== city).map((c) => (
              <Link
                key={c}
                href={`/consultants/${c}`}
                className="bg-zinc-50 hover:bg-zinc-100 border border-zinc-200 p-2.5 rounded-md text-xs font-medium text-zinc-800 text-center capitalize transition-colors"
              >
                {c}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
