import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET all loans
export async function GET() {
  try {
    const loans = await prisma.loan.findMany({
      orderBy: [
        { isSponsored: 'desc' },
        { interestRateMin: 'asc' },
      ],
    })

    return NextResponse.json(loans)
  } catch (error) {
    console.error('Error fetching loans:', error)
    return NextResponse.json(
      { error: 'Failed to fetch loans' },
      { status: 500 }
    )
  }
}

// POST - Create new loan
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const {
      slug,
      name,
      provider,
      providerLogo,
      type,
      minAmount,
      maxAmount,
      interestRateMin,
      interestRateMax,
      tenure,
      eligibility,
      documents,
      features,
      affiliateUrl,
      isSponsored,
    } = body

    // Validate required fields
    if (!slug || !name || !provider) {
      return NextResponse.json(
        { error: 'Missing required fields: slug, name, provider' },
        { status: 400 }
      )
    }

    // Check if slug already exists
    const existing = await prisma.loan.findUnique({ where: { slug } })
    if (existing) {
      return NextResponse.json(
        { error: 'Loan with this slug already exists' },
        { status: 400 }
      )
    }

    const loan = await prisma.loan.create({
      data: {
        slug,
        name,
        provider,
        providerLogo: providerLogo || null,
        type: type || 'business',
        minAmount: Number(minAmount) || 50000,
        maxAmount: Number(maxAmount) || 5000000,
        interestRateMin: Number(interestRateMin) || 10,
        interestRateMax: Number(interestRateMax) || 20,
        tenure: tenure || '12-60 months',
        eligibility: eligibility || '',
        documents: Array.isArray(documents) ? documents : [],
        features: Array.isArray(features) ? features : [],
        affiliateUrl: affiliateUrl || null,
        isSponsored: Boolean(isSponsored),
      },
    })

    return NextResponse.json(loan, { status: 201 })
  } catch (error) {
    console.error('Error creating loan:', error)
    return NextResponse.json(
      { error: 'Failed to create loan' },
      { status: 500 }
    )
  }
}
