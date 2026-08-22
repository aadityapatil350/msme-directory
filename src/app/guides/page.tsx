import Link from 'next/link'
import { Metadata } from 'next'
import { VERIFIED_GUIDES } from '@/data/verified-guides'
import { ArrowRight } from 'lucide-react'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://msmevault.in'

export const metadata: Metadata = {
  title: 'MSME Policy & Scheme Pillar Guides (2026) | MSMEVault.in',
  description:
    'Comprehensive, verified, plain-language guides to Udyam Registration, Mudra Loans (Tarun Plus ₹20L), PMEGP Subsidies (15%-35%), and CGTMSE Guarantee cover.',
  alternates: {
    canonical: '/guides',
  },
  openGraph: {
    title: 'Verified MSME Scheme & Loan Guides (2026)',
    description: 'Plain-language guides to central and state MSME schemes. Every figure sourced and dated.',
    url: `${siteUrl}/guides`,
    type: 'website',
  },
}

export default function GuidesPage() {
  return (
    <div className="min-h-screen bg-[#FAFAFA] py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Breadcrumb */}
        <nav className="text-xs text-zinc-500 mb-4 flex items-center gap-1.5 font-mono">
          <Link href="/" className="hover:text-zinc-950">Home</Link>
          <span>/</span>
          <span className="text-zinc-950">Policy Guides</span>
        </nav>

        {/* Header */}
        <div className="bg-white border border-zinc-200 rounded-xl p-6 sm:p-8 mb-6 shadow-2xs">
          <div className="inline-flex items-center gap-2 bg-zinc-100 text-zinc-700 text-[10px] font-mono font-medium px-2.5 py-0.5 rounded mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 inline-block" />
            <span>Editorial Pillar Guides &bull; August 2026</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-zinc-950 tracking-tight mb-2">
            Indian MSME Policy &amp; Compliance Guides
          </h1>
          <p className="text-xs sm:text-sm text-zinc-500 max-w-2xl leading-relaxed">
            In-depth reference guides to statutory registrations, subsidy calculations, and institutional credit guarantees. All figures verified against official gazette notifications.
          </p>
        </div>

        {/* Guides Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
          {VERIFIED_GUIDES.map((guide) => (
            <div
              key={guide.slug}
              className="bg-white border border-zinc-200 hover:border-zinc-300 rounded-xl p-5 shadow-2xs hover:shadow-xs transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2.5">
                  <span className="inline-block bg-zinc-100 text-zinc-700 text-[10px] font-mono font-medium px-2 py-0.5 rounded">
                    {guide.category}
                  </span>
                  <span className="text-[10px] text-zinc-400 font-mono">
                    {guide.lastVerified}
                  </span>
                </div>

                <h2 className="font-semibold text-sm text-zinc-950 mb-1.5 leading-snug">
                  <Link href={`/guides/${guide.slug}`} className="hover:underline">
                    {guide.title}
                  </Link>
                </h2>

                <p className="text-xs text-zinc-500 line-clamp-3 mb-4 leading-relaxed">
                  {guide.excerpt}
                </p>

                {/* Key Takeaway preview */}
                <div className="bg-zinc-50 border border-zinc-100 rounded-lg p-2.5 mb-4">
                  <div className="text-[11px] text-zinc-600 line-clamp-2">
                    &bull; {guide.keyTakeaways[0]}
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-zinc-100 flex items-center justify-between">
                <div className="text-[11px] text-zinc-400">
                  {guide.author.name}
                </div>

                <Link
                  href={`/guides/${guide.slug}`}
                  className="bg-zinc-900 hover:bg-zinc-800 text-white text-[11px] font-medium px-2.5 py-1.5 rounded-md transition-colors inline-flex items-center gap-1"
                >
                  <span>Read Guide</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
