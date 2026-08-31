import { prisma } from '@/lib/prisma'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

async function fetchLeads() {
  try {
    const leads = await prisma.lead.findMany({
      orderBy: { createdAt: 'desc' },
      take: 500,
    })
    return { leads, error: null as string | null }
  } catch (err) {
    return { leads: [], error: err instanceof Error ? err.message : 'DB unavailable' }
  }
}

export default async function AdminLeadsPage() {
  const { leads, error } = await fetchLeads()

  return (
    <div className="min-h-screen bg-[#FAFAFA] py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-xl font-bold text-zinc-950">Leads inbox</h1>
            <p className="text-xs text-zinc-500 mt-0.5">Latest 500 enquiries from all forms.</p>
          </div>
          <Link
            href="/api/admin/leads/export"
            className="bg-zinc-950 hover:bg-zinc-800 text-white text-xs font-medium px-3 py-2 rounded-lg"
          >
            Export CSV
          </Link>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-900 text-xs p-3 rounded-lg mb-4">
            DB error: {error}
          </div>
        )}

        <div className="bg-white border border-zinc-200 rounded-xl overflow-hidden shadow-2xs">
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead className="bg-zinc-50 text-[10px] font-mono uppercase text-zinc-500 border-b border-zinc-200">
                <tr>
                  <th className="text-left p-3">Received</th>
                  <th className="text-left p-3">Type</th>
                  <th className="text-left p-3">Name</th>
                  <th className="text-left p-3">Phone</th>
                  <th className="text-left p-3">Email</th>
                  <th className="text-left p-3">Location</th>
                  <th className="text-left p-3">Scheme / Loan</th>
                  <th className="text-left p-3">Amount</th>
                  <th className="text-left p-3">Source</th>
                  <th className="text-left p-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                {leads.length === 0 && (
                  <tr>
                    <td colSpan={10} className="p-8 text-center text-zinc-400 text-xs">
                      No leads yet.
                    </td>
                  </tr>
                )}
                {leads.map((l) => (
                  <tr key={l.id} className="hover:bg-zinc-50/50">
                    <td className="p-3 font-mono text-[11px] text-zinc-500 whitespace-nowrap">
                      {new Date(l.createdAt).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })}
                    </td>
                    <td className="p-3">
                      <span className="bg-zinc-100 text-zinc-700 text-[10px] font-mono px-1.5 py-0.5 rounded">
                        {l.leadType}
                      </span>
                    </td>
                    <td className="p-3 font-medium text-zinc-950">{l.fullName || '—'}</td>
                    <td className="p-3 font-mono text-zinc-700">{l.phone || '—'}</td>
                    <td className="p-3 text-zinc-600">{l.email || '—'}</td>
                    <td className="p-3 text-zinc-600">{[l.city, l.state].filter(Boolean).join(', ') || '—'}</td>
                    <td className="p-3 text-zinc-600">{l.schemeSlug || l.loanSlug || '—'}</td>
                    <td className="p-3 font-mono text-zinc-700">
                      {l.loanAmountNeeded ? `₹${l.loanAmountNeeded.toLocaleString('en-IN')}` : '—'}
                    </td>
                    <td className="p-3 text-[11px] text-zinc-500">{l.utmSource || l.landingPage || '—'}</td>
                    <td className="p-3">
                      <span className="text-[10px] font-mono uppercase text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
                        {l.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
