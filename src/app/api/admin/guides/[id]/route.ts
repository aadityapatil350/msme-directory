import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const guide = await prisma.guide.findUnique({
      where: { id },
    })

    if (!guide) {
      return NextResponse.json(
        { error: 'Guide not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(guide)
  } catch (error) {
    console.error('Error fetching guide:', error)
    return NextResponse.json(
      { error: 'Failed to fetch guide' },
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

    // Check if slug conflicts with another guide
    if (body.slug) {
      const existing = await prisma.guide.findFirst({
        where: {
          slug: body.slug,
          id: { not: id },
        },
      })

      if (existing) {
        return NextResponse.json(
          { error: 'A guide with this slug already exists' },
          { status: 400 }
        )
      }
    }

    const guide = await prisma.guide.update({
      where: { id },
      data: {
        ...(body.title && { title: body.title }),
        ...(body.slug && { slug: body.slug }),
        ...(body.excerpt && { excerpt: body.excerpt }),
        ...(body.content && { content: body.content }),
        ...(body.category && { category: body.category }),
        ...(body.schemeId !== undefined && { schemeId: body.schemeId || null }),
        ...(body.loanId !== undefined && { loanId: body.loanId || null }),
        ...(body.isPublished !== undefined && { isPublished: body.isPublished }),
        ...(body.publishedAt !== undefined && {
          publishedAt: body.publishedAt ? new Date(body.publishedAt) : null,
        }),
        ...(body.metaTitle !== undefined && { metaTitle: body.metaTitle }),
        ...(body.metaDescription !== undefined && { metaDescription: body.metaDescription }),
      },
    })

    return NextResponse.json(guide)
  } catch (error) {
    console.error('Error updating guide:', error)
    return NextResponse.json(
      { error: 'Failed to update guide' },
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
    await prisma.guide.delete({
      where: { id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting guide:', error)
    return NextResponse.json(
      { error: 'Failed to delete guide' },
      { status: 500 }
    )
  }
}
