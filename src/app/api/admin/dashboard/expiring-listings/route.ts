import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const now = new Date()
    const sevenDaysFromNow = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)

    const expiringListings = await prisma.consultant.findMany({
      where: {
        isPremium: true,
        paidUntil: {
          lte: sevenDaysFromNow,
          gte: now,
        },
      },
      select: {
        id: true,
        name: true,
        firmName: true,
        city: true,
        tier: true,
        paidUntil: true,
      },
      orderBy: {
        paidUntil: 'asc',
      },
    })

    return NextResponse.json(expiringListings)
  } catch (error) {
    console.error('Error fetching expiring listings:', error)
    return NextResponse.json(
      { error: 'Failed to fetch expiring listings' },
      { status: 500 }
    )
  }
}
