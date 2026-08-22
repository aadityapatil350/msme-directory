import { Metadata } from 'next'
import Link from 'next/link'
import { Mail, Clock, ShieldCheck } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Contact & Grievance Desk | MSMEVault.in',
  description: 'Reach our editorial research desk or grievance officer for corrections, inquiries, and DPDP rights.',
  alternates: {
    canonical: '/contact',
  },
}

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#FAFAFA] py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Breadcrumb */}
        <nav className="text-xs text-zinc-500 mb-4 flex items-center gap-1.5 font-mono">
          <Link href="/" className="hover:text-zinc-950">Home</Link>
          <span>/</span>
          <span className="text-zinc-950">Contact Us</span>
        </nav>

        <div className="bg-white border border-zinc-200 rounded-xl p-6 sm:p-10 mb-6 shadow-2xs space-y-6">
          <div className="inline-flex items-center gap-2 bg-zinc-100 text-zinc-700 text-[10px] font-mono font-medium px-2.5 py-0.5 rounded">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 inline-block" />
            <span>Support Desk &bull; 2026</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-zinc-950 tracking-tight">
            Contact &amp; Grievance Redressal Desk
          </h1>

          <div className="text-xs sm:text-sm text-zinc-600 space-y-4 leading-relaxed">
            <p>
              Have a question about a government scheme guideline, need a policy clarification, or want to report a data correction? Reach out to our dedicated desks below.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="bg-zinc-50 border border-zinc-200 rounded-lg p-4 space-y-1.5">
                <div className="font-semibold text-xs text-zinc-950 flex items-center gap-1.5">
                  <Mail className="w-4 h-4 text-zinc-500" />
                  <span>Editorial &amp; Research Inquiries</span>
                </div>
                <div className="text-xs text-zinc-600">
                  <a href="mailto:editorial@msmevault.in" className="text-zinc-950 underline font-medium">
                    editorial@msmevault.in
                  </a>
                </div>
                <div className="text-[11px] text-zinc-400">
                  For data updates, corrections, and research submissions.
                </div>
              </div>

              <div className="bg-zinc-50 border border-zinc-200 rounded-lg p-4 space-y-1.5">
                <div className="font-semibold text-xs text-zinc-950 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-zinc-500" />
                  <span>Grievance &amp; Privacy Officer</span>
                </div>
                <div className="text-xs text-zinc-600">
                  <a href="mailto:grievance@msmevault.in" className="text-zinc-950 underline font-medium">
                    grievance@msmevault.in
                  </a>
                </div>
                <div className="text-[11px] text-zinc-400">
                  DPDP Act 2023 compliance &amp; data principal erasure requests.
                </div>
              </div>
            </div>

            <div className="bg-zinc-50 border border-zinc-200 rounded-lg p-3.5 flex items-center gap-2 text-xs text-zinc-500 font-mono">
              <Clock className="w-4 h-4 text-zinc-400 flex-shrink-0" />
              <span>Standard Response SLA: Acknowledged within 24–48 hours.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
