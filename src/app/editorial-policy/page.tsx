import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Editorial & Sourcing Policy | MSMEVault.in',
  description:
    'Our verification methodology, primary sourcing hierarchy, and quarterly policy review calendar.',
  alternates: {
    canonical: '/editorial-policy',
  },
}

export default function EditorialPolicyPage() {
  return (
    <div className="min-h-screen bg-[#FAFAFA] py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Breadcrumb */}
        <nav className="text-xs text-zinc-500 mb-4 flex items-center gap-1.5 font-mono">
          <Link href="/" className="hover:text-zinc-950">Home</Link>
          <span>/</span>
          <span className="text-zinc-950">Editorial Policy</span>
        </nav>

        <div className="bg-white border border-zinc-200 rounded-xl p-6 sm:p-10 mb-6 shadow-2xs space-y-6">
          <div className="inline-flex items-center gap-2 bg-zinc-100 text-zinc-700 text-[10px] font-mono font-medium px-2.5 py-0.5 rounded">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 inline-block" />
            <span>Verification Standard &bull; Version 2026.1</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-zinc-950 tracking-tight">
            Editorial Sourcing &amp; Verification Policy
          </h1>

          <div className="text-xs sm:text-sm text-zinc-600 space-y-4 leading-relaxed">
            <p>
              At <strong>MSMEVault</strong>, accuracy and statutory integrity precede completeness. We adhere to a strict verification protocol before publishing any scheme parameter, subsidy rate, or loan guideline.
            </p>

            <h2 className="text-sm font-bold text-zinc-950 pt-2 border-t border-zinc-100">
              1. Sourcing Hierarchy
            </h2>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Tier 1 (Primary Gazette &amp; Circulars):</strong> Official Gazette of India notifications, RBI Master Directions, Department of Financial Services (DFS) circulars, CGTMSE circulars, and KVIC operational guidelines.</li>
              <li><strong>Tier 2 (Official Portals):</strong> udyamregistration.gov.in, jansamarth.in, kviconline.gov.in, mudra.org.in, and cgtmse.in.</li>
              <li><strong>Tier 3 (Public Press Releases):</strong> Press Information Bureau (PIB) official releases from the Ministry of MSME.</li>
            </ul>

            <h2 className="text-sm font-bold text-zinc-950 pt-2 border-t border-zinc-100">
              2. Mandatory On-Page Date Stamping
            </h2>
            <p>
              Every scheme and loan guide displays an explicit <strong>&quot;Last Verified: [DD Mon YYYY]&quot;</strong> date stamp along with direct hyperlinks to official government circulars and application portals.
            </p>

            <h2 className="text-sm font-bold text-zinc-950 pt-2 border-t border-zinc-100">
              3. Correction &amp; Grievance SLA
            </h2>
            <p>
              If a scheme guideline is updated or revised by the Government, our editorial desk updates the respective guide within 72 hours of the official notification. Report any discrepancy to <a href="mailto:editorial@msmevault.in" className="text-zinc-950 underline font-medium">editorial@msmevault.in</a>.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
