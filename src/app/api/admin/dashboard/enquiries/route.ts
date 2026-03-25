import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const enquiries = await prisma.listingEnquiry.findMany({
      where: {
        status: 'pending',
      },
      take: 10,
      orderBy: {
        createdAt: 'desc',
      },
      select: {
        id: true,
        firmName: true,
        city: true,
        tier: true,
        status: true,
        createdAt: true,
      },
    })

    return NextResponse.json(enquiries)
  } catch (error) {
    console.error('Error fetching enquiries:', error)
    return NextResponse.json(
      { error: 'Failed to fetch enquiries' },
      { status: 500 }
    )
  }
}
