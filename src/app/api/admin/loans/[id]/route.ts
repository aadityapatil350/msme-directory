import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET single loan
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const loan = await prisma.loan.findUnique({
      where: { id },
    })

    if (!loan) {
      return NextResponse.json(
        { error: 'Loan not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(loan)
  } catch (error) {
    console.error('Error fetching loan:', error)
    return NextResponse.json(
      { error: 'Failed to fetch loan' },
      { status: 500 }
    )
  }
}

// PUT - Update loan
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
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

    // Check if loan exists
    const existing = await prisma.loan.findUnique({
      where: { id },
    })

    if (!existing) {
      return NextResponse.json(
        { error: 'Loan not found' },
        { status: 404 }
      )
    }

    // If slug is being changed, check it's not already taken
    if (slug && slug !== existing.slug) {
      const slugExists = await prisma.loan.findUnique({ where: { slug } })
      if (slugExists) {
        return NextResponse.json(
          { error: 'Slug already in use' },
          { status: 400 }
        )
      }
    }

    const loan = await prisma.loan.update({
      where: { id },
      data: {
        slug: slug || existing.slug,
        name: name || existing.name,
        provider: provider || existing.provider,
        providerLogo: providerLogo !== undefined ? providerLogo : existing.providerLogo,
        type: type || existing.type,
        minAmount: minAmount !== undefined ? Number(minAmount) : existing.minAmount,
        maxAmount: maxAmount !== undefined ? Number(maxAmount) : existing.maxAmount,
        interestRateMin: interestRateMin !== undefined ? Number(interestRateMin) : existing.interestRateMin,
        interestRateMax: interestRateMax !== undefined ? Number(interestRateMax) : existing.interestRateMax,
        tenure: tenure || existing.tenure,
        eligibility: eligibility !== undefined ? eligibility : existing.eligibility,
        documents: Array.isArray(documents) ? documents : existing.documents,
        features: Array.isArray(features) ? features : existing.features,
        affiliateUrl: affiliateUrl !== undefined ? affiliateUrl : existing.affiliateUrl,
        isSponsored: isSponsored !== undefined ? Boolean(isSponsored) : existing.isSponsored,
      },
    })

    return NextResponse.json(loan)
  } catch (error) {
    console.error('Error updating loan:', error)
    return NextResponse.json(
      { error: 'Failed to update loan' },
      { status: 500 }
    )
  }
}

// DELETE loan
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    // Check if loan exists
    const existing = await prisma.loan.findUnique({
      where: { id },
    })

    if (!existing) {
      return NextResponse.json(
        { error: 'Loan not found' },
        { status: 404 }
      )
    }

    await prisma.loan.delete({
      where: { id },
    })

    return NextResponse.json({ success: true, message: 'Loan deleted successfully' })
  } catch (error) {
    console.error('Error deleting loan:', error)
    return NextResponse.json(
      { error: 'Failed to delete loan' },
      { status: 500 }
    )
  }
}
