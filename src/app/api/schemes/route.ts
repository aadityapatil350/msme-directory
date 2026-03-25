import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const schemes = await prisma.scheme.findMany({
      where: { isActive: true },
      orderBy: [
        { isSponsored: 'desc' },
        { viewCount: 'desc' },
        { isFeatured: 'desc' },
      ],
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
