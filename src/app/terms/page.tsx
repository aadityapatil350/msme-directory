import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Terms of Service | MSMEVault.in',
  description: 'Terms of service and user conditions for accessing MSMEVault.in.',
  alternates: {
    canonical: '/terms',
  },
}

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#FAFAFA] py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Breadcrumb */}
        <nav className="text-xs text-zinc-500 mb-4 flex items-center gap-1.5 font-mono">
          <Link href="/" className="hover:text-zinc-950">Home</Link>
          <span>/</span>
          <span className="text-zinc-950">Terms of Service</span>
        </nav>

        <div className="bg-white border border-zinc-200 rounded-xl p-6 sm:p-10 mb-6 shadow-2xs space-y-6">
          <div className="inline-flex items-center gap-2 bg-zinc-100 text-zinc-700 text-[10px] font-mono font-medium px-2.5 py-0.5 rounded">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 inline-block" />
            <span>Legal Terms &bull; Version 2026.1</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-zinc-950 tracking-tight">
            Terms of Service
          </h1>

          <div className="text-xs sm:text-sm text-zinc-600 space-y-4 leading-relaxed">
            <h2 className="text-sm font-bold text-zinc-950">
              1. Acceptance of Terms
            </h2>
            <p>
              By accessing and using MSMEVault.in, you agree to comply with and be bound by these Terms of Service. If you do not agree with any part of these terms, please do not use the website.
            </p>

            <h2 className="text-sm font-bold text-zinc-950 pt-2 border-t border-zinc-100">
              2. Informational &amp; Educational Purpose Only
            </h2>
            <p>
              All materials, calculators, and articles on MSMEVault are provided for educational and informational reference only. They do not constitute financial, legal, tax, or investment advisory. Users must verify scheme rules and loan interest rates directly with official government portals and authorized lending institutions.
            </p>

            <h2 className="text-sm font-bold text-zinc-950 pt-2 border-t border-zinc-100">
              3. Limitation of Liability
            </h2>
            <p>
              MSMEVault and its operators shall not be liable for any financial decisions, loan rejections, subsidy delays, or damages arising from the use of content or calculators provided on this site.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
