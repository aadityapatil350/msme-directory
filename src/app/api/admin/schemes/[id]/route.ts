import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const scheme = await prisma.scheme.findUnique({
      where: { id },
    })

    if (!scheme) {
      return NextResponse.json(
        { error: 'Scheme not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(scheme)
  } catch (error) {
    console.error('Error fetching scheme:', error)
    return NextResponse.json(
      { error: 'Failed to fetch scheme' },
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
      const existing = await prisma.scheme.findFirst({
        where: {
          slug: body.slug,
          NOT: { id },
        },
      })

      if (existing) {
        return NextResponse.json(
          { error: 'A scheme with this slug already exists' },
          { status: 400 }
        )
      }
    }

    const scheme = await prisma.scheme.update({
      where: { id },
      data: {
        ...(body.name !== undefined && { name: body.name }),
        ...(body.slug !== undefined && { slug: body.slug }),
        ...(body.shortDescription !== undefined && { shortDescription: body.shortDescription }),
        ...(body.description !== undefined && { description: body.description }),
        ...(body.type !== undefined && { type: body.type }),
        ...(body.state !== undefined && { state: body.state }),
        ...(body.sector !== undefined && { sector: body.sector }),
        ...(body.minAmount !== undefined && { minAmount: body.minAmount }),
        ...(body.maxAmount !== undefined && { maxAmount: body.maxAmount }),
        ...(body.eligibility !== undefined && { eligibility: body.eligibility }),
        ...(body.documents !== undefined && { documents: body.documents }),
        ...(body.applyUrl !== undefined && { applyUrl: body.applyUrl }),
        ...(body.benefits !== undefined && { benefits: body.benefits }),
        ...(body.isActive !== undefined && { isActive: body.isActive }),
        ...(body.isFeatured !== undefined && { isFeatured: body.isFeatured }),
        ...(body.isSponsored !== undefined && { isSponsored: body.isSponsored }),
        ...(body.sponsoredUntil !== undefined && { sponsoredUntil: body.sponsoredUntil }),
      },
    })

    return NextResponse.json(scheme)
  } catch (error) {
    console.error('Error updating scheme:', error)
    return NextResponse.json(
      { error: 'Failed to update scheme' },
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
    // Soft delete by setting isActive to false
    await prisma.scheme.update({
      where: { id },
      data: { isActive: false },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting scheme:', error)
    return NextResponse.json(
      { error: 'Failed to delete scheme' },
      { status: 500 }
    )
  }
}
