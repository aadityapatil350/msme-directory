import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Privacy Policy (DPDP Act 2023 Compliant) | MSMEVault.in',
  description:
    'Our data privacy policy, itemized processing purposes, consent withdrawal rights, and Grievance Officer contact under the Digital Personal Data Protection Act 2023.',
  alternates: {
    canonical: '/privacy',
  },
}

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-[#FAFAFA] py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Breadcrumb */}
        <nav className="text-xs text-zinc-500 mb-4 flex items-center gap-1.5 font-mono">
          <Link href="/" className="hover:text-zinc-950">Home</Link>
          <span>/</span>
          <span className="text-zinc-950">Privacy Policy</span>
        </nav>

        <div className="bg-white border border-zinc-200 rounded-xl p-6 sm:p-10 mb-6 shadow-2xs space-y-6">
          <div className="inline-flex items-center gap-2 bg-zinc-100 text-zinc-700 text-[10px] font-mono font-medium px-2.5 py-0.5 rounded">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 inline-block" />
            <span>DPDP Act 2023 &bull; Version v2026.1_dpdp</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-zinc-950 tracking-tight">
            Privacy Policy &amp; Data Protection Notice
          </h1>

          <div className="text-xs sm:text-sm text-zinc-600 space-y-4 leading-relaxed">
            <p>
              MSMEVault is committed to protecting digital personal data in strict compliance with the <strong>Digital Personal Data Protection Act, 2023 (DPDP Act)</strong> and the <strong>DPDP Rules, 2025</strong>.
            </p>

            <h2 className="text-sm font-bold text-zinc-950 pt-2 border-t border-zinc-100">
              1. Itemized Data Collected
            </h2>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Contact Info:</strong> Name, mobile number, email, city, and state.</li>
              <li><strong>Business Criteria:</strong> Industry sector, turnover bracket, and loan requirement for eligibility matching.</li>
              <li><strong>Audit Logging:</strong> Timestamp of consent, IP address, and consent text version.</li>
            </ul>

            <h2 className="text-sm font-bold text-zinc-950 pt-2 border-t border-zinc-100">
              2. Lawful Basis &amp; Purpose of Processing
            </h2>
            <p>
              Data is collected solely with your affirmative consent for:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Providing calculated government scheme matches and calculator outputs.</li>
              <li>Responding to direct user inquiries regarding scheme eligibility and documentation.</li>
              <li>With separate, unbundled opt-in consent, sending policy notifications.</li>
            </ul>

            <h2 className="text-sm font-bold text-zinc-950 pt-2 border-t border-zinc-100">
              3. Data Retention &amp; Rights of Data Principal
            </h2>
            <p>
              Under the DPDP Act 2023, you have the right to access, correct, or request the immediate erasure of your personal data, as well as the right to withdraw consent at any time.
            </p>

            <h2 className="text-sm font-bold text-zinc-950 pt-2 border-t border-zinc-100">
              4. Grievance Redressal Officer
            </h2>
            <div className="bg-zinc-50 border border-zinc-200 rounded-lg p-3.5 space-y-1 text-xs font-mono">
              <div><strong>Grievance Desk:</strong> Data Privacy Officer, MSMEVault</div>
              <div><strong>Email:</strong> <a href="mailto:grievance@msmevault.in" className="text-zinc-950 underline">grievance@msmevault.in</a></div>
              <div><strong>SLA:</strong> Acknowledged within 48h; resolved within 7 working days.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
