import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const schemes = await prisma.scheme.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    })

    return NextResponse.json(schemes)
  } catch (error) {
    console.error('Error fetching schemes:', error)
    return NextResponse.json(
      { error: 'Failed to fetch schemes' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Check if slug already exists
    const existing = await prisma.scheme.findUnique({
      where: { slug: body.slug },
    })

    if (existing) {
      return NextResponse.json(
        { error: 'A scheme with this slug already exists' },
        { status: 400 }
      )
    }

    const scheme = await prisma.scheme.create({
      data: {
        name: body.name,
        slug: body.slug,
        shortDescription: body.shortDescription,
        description: body.description,
        type: body.type,
        state: body.state,
        sector: body.sector || [],
        minAmount: body.minAmount,
        maxAmount: body.maxAmount,
        eligibility: body.eligibility,
        documents: body.documents || [],
        applyUrl: body.applyUrl,
        benefits: body.benefits,
        isActive: body.isActive ?? true,
        isFeatured: body.isFeatured ?? false,
        isSponsored: body.isSponsored ?? false,
        sponsoredUntil: body.sponsoredUntil,
      },
    })

    return NextResponse.json(scheme, { status: 201 })
  } catch (error) {
    console.error('Error creating scheme:', error)
    return NextResponse.json(
      { error: 'Failed to create scheme' },
      { status: 500 }
    )
  }
}
