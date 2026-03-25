import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const now = new Date()
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate())

    const [
      totalLeads,
      newLeadsToday,
      totalSchemes,
      activeSchemes,
      premiumListings,
      expiringListings,
      totalSubscribers,
      convertedLeads,
    ] = await Promise.all([
      prisma.lead.count(),
      prisma.lead.count({
        where: {
          createdAt: {
            gte: todayStart,
          },
        },
      }),
      prisma.scheme.count(),
      prisma.scheme.count({
        where: {
          isActive: true,
        },
      }),
      prisma.consultant.count({
        where: {
          isPremium: true,
        },
      }),
      prisma.consultant.count({
        where: {
          isPremium: true,
          paidUntil: {
            lte: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // Next 7 days
            gte: now,
          },
        },
      }),
      prisma.subscriber.count({
        where: {
          isActive: true,
        },
      }),
      prisma.lead.count({
        where: {
          status: 'converted',
        },
      }),
    ])

    const conversionRate = totalLeads > 0
      ? Math.round((convertedLeads / totalLeads) * 100)
      : 0

    return NextResponse.json({
      totalLeads,
      newLeadsToday,
      totalSchemes,
      activeSchemes,
      premiumListings,
      expiringListings,
      totalSubscribers,
      conversionRate,
    })
  } catch (error) {
    console.error('Error fetching dashboard stats:', error)
    return NextResponse.json(
      { error: 'Failed to fetch stats' },
      { status: 500 }
    )
  }
}
