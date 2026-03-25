import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const {
      name,
      email,
      phone,
      businessType,
      sector,
      state,
      annualTurnover,
      employeeCount,
      loanAmount,
      city = 'Not specified',
      businessAge = 'Not specified',
      monthlyTurnover = 'Not specified',
      requirement = 'loan',
      sourcePage = 'eligibility_checker',
      status = 'new',
    } = body

    // Validate required fields
    if (!name || !email || !phone) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Create lead in database
    const lead = await prisma.lead.create({
      data: {
        name,
        email,
        phone,
        businessType: businessType || 'Not specified',
        city,
        state: state || 'Not specified',
        businessAge,
        monthlyTurnover: annualTurnover || monthlyTurnover,
        loanAmount: loanAmount ? parseFloat(loanAmount) : 0,
        requirement,
        sourcePage,
        status,
        notes: sector ? `Sectors: ${sector}. Employee Count: ${employeeCount}` : undefined,
      },
    })

    // TODO: Send email notification to admin
    // TODO: Send confirmation email to user
    // TODO: Trigger CRM integration

    return NextResponse.json(
      {
        success: true,
        leadId: lead.id,
        message: 'Lead submitted successfully',
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error creating lead:', error)
    return NextResponse.json(
      { error: 'Failed to submit lead' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    // Admin endpoint to fetch leads (add auth in production)
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')

    const leads = await prisma.lead.findMany({
      where: status ? { status } : {},
      orderBy: { createdAt: 'desc' },
      take: 50,
    })

    return NextResponse.json({ leads })
  } catch (error) {
    console.error('Error fetching leads:', error)
    return NextResponse.json(
      { error: 'Failed to fetch leads' },
      { status: 500 }
    )
  }
}
