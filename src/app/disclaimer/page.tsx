import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Statutory Disclaimer & Non-Affiliation Notice | MSMEVault.in',
  description:
    'Official non-affiliation notice with Government of India, free government registration disclosure, and non-advisory terms.',
  alternates: {
    canonical: '/disclaimer',
  },
}

export default function DisclaimerPage() {
  return (
    <div className="min-h-screen bg-[#FAFAFA] py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Breadcrumb */}
        <nav className="text-xs text-zinc-500 mb-4 flex items-center gap-1.5 font-mono">
          <Link href="/" className="hover:text-zinc-950">Home</Link>
          <span>/</span>
          <span className="text-zinc-950">Disclaimer</span>
        </nav>

        <div className="bg-white border border-zinc-200 rounded-xl p-6 sm:p-10 mb-6 shadow-2xs space-y-6">
          <div className="inline-flex items-center gap-2 bg-zinc-100 text-zinc-700 text-[10px] font-mono font-medium px-2.5 py-0.5 rounded">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 inline-block" />
            <span>Statutory Disclosure &bull; 2026</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-zinc-950 tracking-tight">
            Statutory Non-Affiliation Disclaimer
          </h1>

          <div className="text-xs sm:text-sm text-zinc-600 space-y-4 leading-relaxed">
            <h2 className="text-sm font-bold text-zinc-950">
              1. Non-Affiliation with Government Entities
            </h2>
            <p>
              <strong>MSMEVault (&quot;MSMEVault.in&quot;) is an independent private informational portal.</strong> MSMEVault is NOT affiliated with, endorsed by, operated by, or connected to the Government of India, the Ministry of Micro, Small and Medium Enterprises (MSME), the Small Industries Development Bank of India (SIDBI), the Khadi and Village Industries Commission (KVIC), the Department of Financial Services (DFS), or any state government department.
            </p>

            <h2 className="text-sm font-bold text-zinc-950 pt-2 border-t border-zinc-100">
              2. Official Registration is 100% Free
            </h2>
            <p>
              Official registration for all Central Government MSME schemes — including <strong>Udyam Registration</strong> — is completely free on official government portals (such as <a href="https://udyamregistration.gov.in" target="_blank" rel="noopener noreferrer" className="text-zinc-950 underline font-medium">udyamregistration.gov.in</a>). MSMEVault does NOT charge any fee for government registration forms.
            </p>

            <h2 className="text-sm font-bold text-zinc-950 pt-2 border-t border-zinc-100">
              3. Non-Advisory Notice
            </h2>
            <p>
              Content, calculators, and articles on MSMEVault are published for general educational reference only. They do not constitute statutory legal, tax, or financial advisory. Before making business or borrowing decisions, verify current guidelines directly on the primary source links provided on each scheme page.
            </p>

            <h2 className="text-sm font-bold text-zinc-950 pt-2 border-t border-zinc-100">
              4. RBI Digital Lending Disclosure
            </h2>
            <p>
              MSMEVault is not a lender, broker, or financial institution and does not disburse loans. All credit facilities, interest rates, underwriting, and loan sanctions are executed solely by respective RBI-regulated Member Lending Institutions (Scheduled Commercial Banks &amp; NBFCs).
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
