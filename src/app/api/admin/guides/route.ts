import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const guides = await prisma.guide.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    })

    return NextResponse.json(guides)
  } catch (error) {
    console.error('Error fetching guides:', error)
    return NextResponse.json(
      { error: 'Failed to fetch guides' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Check if slug already exists
    const existing = await prisma.guide.findUnique({
      where: { slug: body.slug },
    })

    if (existing) {
      return NextResponse.json(
        { error: 'A guide with this slug already exists' },
        { status: 400 }
      )
    }

    const guide = await prisma.guide.create({
      data: {
        title: body.title,
        slug: body.slug,
        excerpt: body.excerpt,
        content: body.content,
        category: body.category,
        schemeId: body.schemeId || null,
        loanId: body.loanId || null,
        isPublished: body.isPublished ?? false,
        publishedAt: body.publishedAt ? new Date(body.publishedAt) : null,
        metaTitle: body.metaTitle,
        metaDescription: body.metaDescription,
      },
    })

    return NextResponse.json(guide, { status: 201 })
  } catch (error) {
    console.error('Error creating guide:', error)
    return NextResponse.json(
      { error: 'Failed to create guide' },
      { status: 500 }
    )
  }
}
