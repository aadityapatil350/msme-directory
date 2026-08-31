import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { rateLimit } from '@/lib/rate-limit'
import { sendLeadNotification } from '@/lib/email'

export async function POST(req: NextRequest) {
  try {
    const ip =
      req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      req.headers.get('x-real-ip') ||
      'unknown'

    // Rate limit: 5 requests / IP / 10 minutes (spec §5.2)
    const rl = rateLimit(`leads:${ip}`, 5, 10 * 60 * 1000)
    if (!rl.ok) {
      return NextResponse.json(
        { success: false, error: 'Too many requests. Please try again later.' },
        { status: 429 }
      )
    }

    const body = await req.json()

    // Honeypot
    if (body.websiteHp && body.websiteHp.trim() !== '') {
      return NextResponse.json({ success: true, message: 'Received' })
    }

    // DPDP mandatory consent
    if (!body.consentGiven) {
      return NextResponse.json(
        { success: false, error: 'DPDP consent is mandatory to process this enquiry.' },
        { status: 400 }
      )
    }

    if (!body.fullName || !body.phone) {
      return NextResponse.json(
        { success: false, error: 'Name and phone are required.' },
        { status: 400 }
      )
    }

    const leadType = body.leadType || 'scheme_enquiry'
    const loanAmountNeeded = body.loanAmount ? parseFloat(body.loanAmount) : null

    // Persist. DB failure is soft — still notify so the operator can act.
    let dbOk = false
    try {
      await prisma.lead.create({
        data: {
          leadType,
          schemeSlug: body.schemeSlug || null,
          loanSlug: body.loanSlug || null,
          fullName: body.fullName || null,
          phone: body.phone || null,
          email: body.email || null,
          city: body.city || null,
          state: body.state || null,
          businessName: body.businessName || null,
          sector: body.sector || null,
          turnoverBand: body.turnover || null,
          loanAmountNeeded,
          landingPage: body.landingPage || null,
          referrer: body.referrer || null,
          utmSource: body.utmSource || null,
          utmMedium: body.utmMedium || null,
          utmCampaign: body.utmCampaign || null,
          consentGiven: Boolean(body.consentGiven),
          consentTextVersion: body.consentTextVersion || 'v2026.1_dpdp',
          consentTimestamp: new Date(),
          consentIp: ip,
          marketingConsent: Boolean(body.marketingConsent),
          status: 'new',
        },
      })
      dbOk = true
    } catch (dbErr) {
      console.warn('[leads] DB insert failed:', dbErr)
    }

    // Fire-and-forget notification
    sendLeadNotification({
      leadType,
      fullName: body.fullName,
      phone: body.phone,
      email: body.email,
      city: body.city,
      state: body.state,
      schemeSlug: body.schemeSlug,
      loanSlug: body.loanSlug,
      loanAmountNeeded,
      sector: body.sector,
      turnoverBand: body.turnover,
      landingPage: body.landingPage,
      utmSource: body.utmSource,
    }).catch((err) => console.warn('[leads] notify failed:', err))

    return NextResponse.json({
      success: true,
      persisted: dbOk,
      message: 'Enquiry submitted successfully under DPDP Act 2023.',
    })
  } catch (error) {
    console.error('[leads] processing error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to process lead.' },
      { status: 500 }
    )
  }
}
