import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const days = parseInt(searchParams.get('days') || '7')

    const startDate = new Date()
    startDate.setDate(startDate.getDate() - days)

    // Get all clicks within date range
    const clicks = await prisma.affiliateClick.findMany({
      where: {
        createdAt: {
          gte: startDate,
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    // Calculate stats
    const urlStats: Record<string, { count: number; lastClick: Date }> = {}

    clicks.forEach(click => {
      if (!urlStats[click.url]) {
        urlStats[click.url] = { count: 0, lastClick: new Date(click.createdAt) }
      }
      urlStats[click.url].count++
      const clickDate = new Date(click.createdAt)
      if (clickDate > urlStats[click.url].lastClick) {
        urlStats[click.url].lastClick = clickDate
      }
    })

    const stats = Object.entries(urlStats)
      .map(([url, data]) => ({
        url,
        count: data.count,
        lastClick: data.lastClick.toISOString(),
      }))
      .sort((a, b) => b.count - a.count)

    return NextResponse.json({ clicks, stats })
  } catch (error) {
    console.error('Error fetching analytics:', error)
    return NextResponse.json(
      { error: 'Failed to fetch analytics' },
      { status: 500 }
    )
  }
}
