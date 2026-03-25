import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const consultant = await prisma.consultant.findUnique({
      where: { id },
    })

    if (!consultant) {
      return NextResponse.json(
        { error: 'Consultant not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(consultant)
  } catch (error) {
    console.error('Error fetching consultant:', error)
    return NextResponse.json(
      { error: 'Failed to fetch consultant' },
      { status: 500 }
    )
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()

    // If slug is being changed, check if it's already taken
    if (body.slug) {
      const existing = await prisma.consultant.findFirst({
        where: {
          slug: body.slug,
          NOT: { id },
        },
      })

      if (existing) {
        return NextResponse.json(
          { error: 'A consultant with this slug already exists' },
          { status: 400 }
        )
      }
    }

    const consultant = await prisma.consultant.update({
      where: { id },
      data: {
        ...(body.name !== undefined && { name: body.name }),
        ...(body.slug !== undefined && { slug: body.slug }),
        ...(body.firmName !== undefined && { firmName: body.firmName }),
        ...(body.designation !== undefined && { designation: body.designation }),
        ...(body.city !== undefined && { city: body.city }),
        ...(body.state !== undefined && { state: body.state }),
        ...(body.services !== undefined && { services: body.services }),
        ...(body.phone !== undefined && { phone: body.phone }),
        ...(body.email !== undefined && { email: body.email }),
        ...(body.website !== undefined && { website: body.website }),
        ...(body.bio !== undefined && { bio: body.bio }),
        ...(body.experience !== undefined && { experience: parseInt(body.experience) }),
        ...(body.isPremium !== undefined && { isPremium: body.isPremium }),
        ...(body.tier !== undefined && { tier: body.tier }),
        ...(body.paidUntil !== undefined && { paidUntil: body.paidUntil ? new Date(body.paidUntil) : null }),
        ...(body.isVerified !== undefined && { isVerified: body.isVerified }),
      },
    })

    return NextResponse.json(consultant)
  } catch (error) {
    console.error('Error updating consultant:', error)
    return NextResponse.json(
      { error: 'Failed to update consultant' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    await prisma.consultant.delete({
      where: { id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting consultant:', error)
    return NextResponse.json(
      { error: 'Failed to delete consultant' },
      { status: 500 }
    )
  }
}
