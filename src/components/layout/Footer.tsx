import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-zinc-50 text-zinc-600 border-t border-zinc-200 pt-12 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Statutory Non-Affiliation Disclaimer Box */}
        <div className="bg-white border border-zinc-200 rounded-xl p-5 mb-10 text-xs leading-relaxed text-zinc-600 shadow-2xs">
          <div className="flex items-start gap-3">
            <span className="w-2 h-2 rounded-full bg-emerald-600 mt-1.5 flex-shrink-0" />
            <div className="space-y-1">
              <div className="font-semibold text-zinc-950 text-xs">
                Statutory Non-Affiliation &amp; Independent Portal Disclosure
              </div>
              <p className="text-zinc-500 leading-relaxed text-[11px]">
                <strong>MSMEVault is an independent private educational and informational portal.</strong> We are not affiliated with, authorized by, or endorsed by the Government of India, the Ministry of MSME, SIDBI, KVIC, or any state government department. Official scheme registrations (including Udyam Registration) are completely free on official government portals (e.g. udyamregistration.gov.in, kviconline.gov.in, mudra.org.in, cgtmse.in). Content on MSMEVault is for educational reference and does not constitute statutory financial, tax, or legal advice.
              </p>
            </div>
          </div>
        </div>

        {/* Footer Navigation Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-10">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-zinc-950 flex items-center justify-center text-white font-bold text-xs">
                V
              </div>
              <span className="font-bold text-sm text-zinc-950 tracking-tight">
                MSME<span className="font-normal text-zinc-500">Vault</span>.in
              </span>
            </div>
            <p className="text-xs text-zinc-500 leading-relaxed max-w-sm">
              Simplifying Indian government schemes, Mudra loans, capital subsidies, and regulatory compliance. Every parameter verified against primary gazette notifications.
            </p>
            <div className="text-[11px] text-zinc-400 pt-1 space-y-0.5">
              <div>Editorial Desk: <a href="mailto:editorial@msmevault.in" className="text-zinc-600 hover:text-zinc-950 underline">editorial@msmevault.in</a></div>
              <div>Grievance &amp; Privacy: <a href="mailto:grievance@msmevault.in" className="text-zinc-600 hover:text-zinc-950 underline">grievance@msmevault.in</a></div>
            </div>
          </div>

          {/* Column: Core Schemes */}
          <div>
            <h4 className="text-zinc-950 text-xs font-semibold uppercase tracking-wider mb-3">Top Schemes</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/guides/udyam-registration" className="text-zinc-600 hover:text-zinc-950 transition-colors">
                  Udyam Registration
                </Link>
              </li>
              <li>
                <Link href="/guides/mudra-loan" className="text-zinc-600 hover:text-zinc-950 transition-colors">
                  PM Mudra Yojana (₹20L)
                </Link>
              </li>
              <li>
                <Link href="/guides/pmegp-loan" className="text-zinc-600 hover:text-zinc-950 transition-colors">
                  PMEGP Subsidy (15%–35%)
                </Link>
              </li>
              <li>
                <Link href="/guides/cgtmse" className="text-zinc-600 hover:text-zinc-950 transition-colors">
                  CGTMSE Guarantee (₹10 Cr)
                </Link>
              </li>
              <li>
                <Link href="/schemes/pm-vishwakarma-yojana" className="text-zinc-600 hover:text-zinc-950 transition-colors">
                  PM Vishwakarma (5%)
                </Link>
              </li>
              <li>
                <Link href="/guides/msme-classification-2026" className="text-zinc-600 hover:text-zinc-950 transition-colors">
                  MSME Thresholds 2026
                </Link>
              </li>
            </ul>
          </div>

          {/* Column: Tools & Calculators */}
          <div>
            <h4 className="text-zinc-950 text-xs font-semibold uppercase tracking-wider mb-3">Calculators</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/tools/emi-calculator" className="text-zinc-600 hover:text-zinc-950 transition-colors">
                  MSME Loan EMI Calculator
                </Link>
              </li>
              <li>
                <Link href="/tools/subsidy-calculator" className="text-zinc-600 hover:text-zinc-950 transition-colors">
                  PMEGP Subsidy Calculator
                </Link>
              </li>
              <li>
                <Link href="/eligibility-checker" className="text-zinc-600 hover:text-zinc-950 transition-colors">
                  Scheme Eligibility Matcher
                </Link>
              </li>
              <li>
                <Link href="/loans" className="text-zinc-600 hover:text-zinc-950 transition-colors">
                  Lender Comparison Table
                </Link>
              </li>
              <li>
                <Link href="/schemes" className="text-zinc-600 hover:text-zinc-950 transition-colors">
                  Browse All 15+ Schemes
                </Link>
              </li>
            </ul>
          </div>

          {/* Column: Trust & Legal */}
          <div>
            <h4 className="text-zinc-950 text-xs font-semibold uppercase tracking-wider mb-3">Governance</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/about" className="text-zinc-600 hover:text-zinc-950 transition-colors">
                  About MSMEVault
                </Link>
              </li>
              <li>
                <Link href="/editorial-policy" className="text-zinc-600 hover:text-zinc-950 transition-colors">
                  Editorial Sourcing Policy
                </Link>
              </li>
              <li>
                <Link href="/disclaimer" className="text-zinc-600 hover:text-zinc-950 transition-colors">
                  Non-Affiliation Disclaimer
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-zinc-600 hover:text-zinc-950 transition-colors">
                  Privacy Policy (DPDP Act)
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-zinc-600 hover:text-zinc-950 transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-zinc-600 hover:text-zinc-950 transition-colors">
                  Contact &amp; Grievance Desk
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Minimalist Bar */}
        <div className="border-t border-zinc-200/80 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-zinc-400">
          <div>
            &copy; 2026 MSMEVault.in &middot; Sourced from official Gazette Notifications &amp; Ministry circulars.
          </div>
          <div className="flex items-center gap-4 text-zinc-500">
            <Link href="/privacy" className="hover:text-zinc-950">Privacy</Link>
            <span>&middot;</span>
            <Link href="/disclaimer" className="hover:text-zinc-950">Disclaimer</Link>
            <span>&middot;</span>
            <Link href="/editorial-policy" className="hover:text-zinc-950">Editorial Policy</Link>
            <span>&middot;</span>
            <Link href="/sitemap.xml" className="hover:text-zinc-950">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
