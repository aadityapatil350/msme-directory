import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const { type, id } = await request.json()

    if (!type || !id) {
      return NextResponse.json(
        { error: 'Missing type or id' },
        { status: 400 }
      )
    }

    let updatedViewCount = 0

    switch (type) {
      case 'scheme':
        const scheme = await prisma.scheme.update({
          where: { id },
          data: { viewCount: { increment: 1 } },
          select: { viewCount: true },
        })
        updatedViewCount = scheme.viewCount
        break

      case 'blog':
        const blog = await prisma.blogPost.update({
          where: { id },
          data: { viewCount: { increment: 1 } },
          select: { viewCount: true },
        })
        updatedViewCount = blog.viewCount
        break

      case 'guide':
        const guide = await prisma.guide.update({
          where: { id },
          data: { viewCount: { increment: 1 } },
          select: { viewCount: true },
        })
        updatedViewCount = guide.viewCount
        break

      case 'loan':
        const loan = await prisma.loan.update({
          where: { id },
          data: { viewCount: { increment: 1 } },
          select: { viewCount: true },
        })
        updatedViewCount = loan.viewCount
        break

      case 'consultant':
        const consultant = await prisma.consultant.update({
          where: { id },
          data: { viewCount: { increment: 1 } },
          select: { viewCount: true },
        })
        updatedViewCount = consultant.viewCount
        break

      default:
        return NextResponse.json(
          { error: 'Invalid type' },
          { status: 400 }
        )
    }

    return NextResponse.json({ viewCount: updatedViewCount })
  } catch (error) {
    console.error('Error incrementing view count:', error)
    return NextResponse.json(
      { error: 'Failed to increment view count' },
      { status: 500 }
    )
  }
}
