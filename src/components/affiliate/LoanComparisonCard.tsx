import Link from 'next/link'
import OutboundLink from '@/components/OutboundLink'
import { AFFILIATE_PARTNERS } from '@/lib/affiliates'
import { ArrowUpRight, ShieldCheck, Zap } from 'lucide-react'

interface Props {
  headline?: string
  subheadline?: string
}

export default function LoanComparisonCard({
  headline = 'Need Machinery or Working Capital Finance?',
  subheadline = 'Compare pre-approved business loan offers from RBI-regulated fintechs and NBFCs with collateral-free options up to ₹40 Lakh.',
}: Props) {
  return (
    <div className="bg-gradient-to-br from-emerald-950 to-zinc-950 text-white rounded-2xl p-6 sm:p-8 my-8 shadow-xl border border-emerald-800/40 relative overflow-hidden">
      {/* Background glow decoration */}
      <div className="absolute top-0 right-0 -mt-8 -mr-8 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10">
        <div className="inline-flex items-center gap-2 bg-emerald-900/60 border border-emerald-700/50 text-emerald-300 text-[11px] font-medium px-3 py-1 rounded-full mb-3">
          <Zap className="w-3 h-3 text-emerald-400" />
          <span>Fast-Track Financing</span>
        </div>

        <h3 className="text-xl sm:text-2xl font-bold tracking-tight mb-2 text-white">
          {headline}
        </h3>
        <p className="text-xs sm:text-sm text-zinc-300 mb-6 leading-relaxed max-w-2xl">
          {subheadline}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {AFFILIATE_PARTNERS.map((partner) => (
            <div
              key={partner.id}
              className="bg-white/5 border border-white/10 hover:border-emerald-500/50 rounded-xl p-4 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono uppercase tracking-wider bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded font-semibold">
                    {partner.badge}
                  </span>
                </div>
                <h4 className="font-bold text-sm text-white mb-1">
                  {partner.name}
                </h4>
                <div className="text-[11px] text-zinc-400 mb-3">
                  Limit: <span className="text-emerald-400 font-semibold">{partner.loanAmount}</span>
                </div>

                <ul className="space-y-1 mb-4 text-[11px] text-zinc-300">
                  <li className="flex items-center gap-1.5">
                    <ShieldCheck className="w-3 h-3 text-emerald-400 flex-shrink-0" />
                    <span>Rate: {partner.interestRate}</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <ShieldCheck className="w-3 h-3 text-emerald-400 flex-shrink-0" />
                    <span>Disbursal: {partner.disbursalTime}</span>
                  </li>
                </ul>
              </div>

              <OutboundLink
                href={partner.affiliateUrl}
                portal={partner.provider}
                eventName="affiliate_loan_click"
                className="w-full inline-flex items-center justify-center gap-1.5 bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-semibold text-xs py-2 px-3 rounded-lg transition-colors"
              >
                <span>Check Eligibility</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </OutboundLink>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-4 border-t border-white/10 text-[11px] text-zinc-400">
          <p>
            Prefer government schemes? Check{' '}
            <Link href="/schemes" className="text-emerald-300 underline underline-offset-2 hover:text-white">
              PMEGP 35% Subsidy
            </Link>{' '}
            or use our{' '}
            <Link href="/tools/emi-calculator" className="text-emerald-300 underline underline-offset-2 hover:text-white">
              Mudra EMI Calculator
            </Link>
            .
          </p>
          <span className="text-[10px] text-zinc-500">
            *Affiliate Partner Disclosure: MSMEVault may receive compensation from loan partners.
          </span>
        </div>
      </div>
    </div>
  )
}
