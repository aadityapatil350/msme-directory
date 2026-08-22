import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    // 1. Honeypot check for spam bots
    if (body.websiteHp && body.websiteHp.trim() !== '') {
      return NextResponse.json({ success: true, message: 'Received' }, { status: 200 })
    }

    // 2. DPDP Mandatory Consent Check
    if (!body.consentGiven) {
      return NextResponse.json(
        { success: false, error: 'DPDP consent is mandatory to process this enquiry.' },
        { status: 400 }
      )
    }

    // 3. Extract IP and Client Info
    const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown'

    // 4. Save to Database (if DB available)
    try {
      await prisma.lead.create({
        data: {
          leadType: body.leadType || 'scheme_enquiry',
          schemeSlug: body.schemeSlug || null,
          loanSlug: body.loanSlug || null,
          fullName: body.fullName || null,
          phone: body.phone || null,
          email: body.email || null,
          city: body.city || null,
          state: body.state || null,
          businessName: body.businessType || null,
          sector: body.sector || null,
          turnoverBand: body.turnover || null,
          loanAmountNeeded: body.loanAmount ? parseFloat(body.loanAmount) : null,
          consentGiven: Boolean(body.consentGiven),
          consentTextVersion: body.consentTextVersion || 'v2026.1_dpdp',
          consentTimestamp: new Date(),
          consentIp: ip,
          marketingConsent: Boolean(body.marketingConsent),
          status: 'new',
        },
      })
    } catch (dbErr) {
      console.warn('DB Lead insert deferred:', dbErr)
    }

    return NextResponse.json({
      success: true,
      message: 'Enquiry submitted successfully under DPDP Act 2023.',
    })
  } catch (error) {
    console.error('Lead processing error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to process lead.' },
      { status: 500 }
    )
  }
}
