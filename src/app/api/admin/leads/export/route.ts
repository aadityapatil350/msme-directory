import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

function csvEscape(v: unknown): string {
  if (v === null || v === undefined) return ''
  const s = String(v)
  if (/[",\n]/.test(s)) return `"${s.replace(/"/g, '""')}"`
  return s
}

export async function GET() {
  const leads = await prisma.lead.findMany({ orderBy: { createdAt: 'desc' } })
  const cols = [
    'id', 'createdAt', 'leadType', 'fullName', 'phone', 'email', 'city', 'state',
    'schemeSlug', 'loanSlug', 'loanAmountNeeded', 'sector', 'turnoverBand',
    'landingPage', 'referrer', 'utmSource', 'utmMedium', 'utmCampaign',
    'consentGiven', 'consentTextVersion', 'consentTimestamp', 'consentIp',
    'marketingConsent', 'status',
  ] as const

  const header = cols.join(',')
  const rows = leads.map((l) =>
    cols.map((c) => csvEscape((l as unknown as Record<string, unknown>)[c])).join(',')
  )
  const body = [header, ...rows].join('\n')

  return new NextResponse(body, {
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="leads-${new Date().toISOString().slice(0, 10)}.csv"`,
    },
  })
}
