import { Metadata } from 'next'
import Link from 'next/link'
import { CheckCircle2 } from 'lucide-react'

export const metadata: Metadata = {
  title: 'About MSMEVault.in – Independent Indian MSME Scheme Portal (2026)',
  description:
    'Learn about MSMEVault.in, our editorial mission, sourcing hierarchy, and commitment to verifiable government scheme intelligence for Indian enterprises.',
  alternates: {
    canonical: '/about',
  },
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#FAFAFA] py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Breadcrumb */}
        <nav className="text-xs text-zinc-500 mb-4 flex items-center gap-1.5 font-mono">
          <Link href="/" className="hover:text-zinc-950">Home</Link>
          <span>/</span>
          <span className="text-zinc-950">About MSMEVault</span>
        </nav>

        <div className="bg-white border border-zinc-200 rounded-xl p-6 sm:p-10 mb-6 shadow-2xs space-y-6">
          <div className="inline-flex items-center gap-2 bg-zinc-100 text-zinc-700 text-[10px] font-mono font-medium px-2.5 py-0.5 rounded">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 inline-block" />
            <span>Editorial Mission &bull; 2026</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-zinc-950 tracking-tight">
            About MSMEVault.in
          </h1>

          <div className="text-xs sm:text-sm text-zinc-600 space-y-4 leading-relaxed">
            <p>
              <strong>MSMEVault.in</strong> is an independent, private information portal created to bridge the information gap for India&apos;s 7.8+ crore micro, small, and medium enterprises.
            </p>
            <p>
              Government scheme circulars, gazette notifications, and bank lending guidelines are often fragmented across dozens of ministry websites and PDFs. MSMEVault standardizes this data into clean, plain-language reference guides, verified calculations, and transparent comparison tables.
            </p>

            <h2 className="text-base font-bold text-zinc-950 pt-2 border-t border-zinc-100">
              Our Core Principles
            </h2>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span><strong>Primary Sourcing:</strong> Every loan limit, subsidy rate, and eligibility rule is verified directly against official Gazette notifications, DFS circulars, KVIC guidelines, and CGTMSE circulars.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span><strong>Zero Registration Fees:</strong> Official registration for government schemes (including Udyam Registration) is 100% free. We never charge business owners for government registration forms.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span><strong>Transparent Governance:</strong> Complete statutory disclaimers, clear DPDP Act 2023 privacy compliance, and an active Grievance Officer desk.</span>
              </li>
            </ul>

            <h2 className="text-base font-bold text-zinc-950 pt-2 border-t border-zinc-100">
              Editorial &amp; Contact Desk
            </h2>
            <div className="bg-zinc-50 border border-zinc-200 rounded-lg p-3.5 space-y-1 text-xs">
              <div><strong>Editorial Lead:</strong> Research &amp; Policy Desk, MSMEVault.in</div>
              <div><strong>Contact Email:</strong> <a href="mailto:editorial@msmevault.in" className="text-zinc-950 underline">editorial@msmevault.in</a></div>
              <div><strong>Grievance Officer:</strong> <a href="mailto:grievance@msmevault.in" className="text-zinc-950 underline">grievance@msmevault.in</a></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
