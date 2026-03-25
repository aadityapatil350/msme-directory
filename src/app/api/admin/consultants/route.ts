import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const consultants = await prisma.consultant.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    })

    return NextResponse.json(consultants)
  } catch (error) {
    console.error('Error fetching consultants:', error)
    return NextResponse.json(
      { error: 'Failed to fetch consultants' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Check if slug already exists
    const existing = await prisma.consultant.findUnique({
      where: { slug: body.slug },
    })

    if (existing) {
      return NextResponse.json(
        { error: 'A consultant with this slug already exists' },
        { status: 400 }
      )
    }

    const consultant = await prisma.consultant.create({
      data: {
        name: body.name,
        slug: body.slug,
        firmName: body.firmName,
        designation: body.designation,
        city: body.city,
        state: body.state,
        services: body.services || [],
        phone: body.phone,
        email: body.email,
        website: body.website,
        bio: body.bio,
        experience: body.experience ? parseInt(body.experience) : null,
        isPremium: body.isPremium ?? false,
        tier: body.tier || 'free',
        paidUntil: body.paidUntil ? new Date(body.paidUntil) : null,
        isVerified: body.isVerified ?? false,
      },
    })

    return NextResponse.json(consultant, { status: 201 })
  } catch (error) {
    console.error('Error creating consultant:', error)
    return NextResponse.json(
      { error: 'Failed to create consultant' },
      { status: 500 }
    )
  }
}
