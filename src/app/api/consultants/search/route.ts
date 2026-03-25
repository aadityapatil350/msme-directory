import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get('q')
    const id = searchParams.get('id')
    const all = searchParams.get('all')
    const city = searchParams.get('city')

    // Fetch by ID
    if (id) {
      const consultant = await prisma.consultant.findUnique({
        where: { id },
        select: {
          id: true,
          firmName: true,
          name: true,
          city: true,
          state: true,
          email: true,
          phone: true,
          services: true,
          tier: true,
          isVerified: true,
          user: { select: { id: true } },
        },
      })
      return NextResponse.json({ consultant })
    }

    // Fetch all consultants (for claim page)
    if (all === 'true') {
      const whereClause = city
        ? { city: { equals: city, mode: 'insensitive' as const } }
        : {}

      const consultants = await prisma.consultant.findMany({
        where: whereClause,
        select: {
          id: true,
          firmName: true,
          name: true,
          city: true,
          state: true,
          email: true,
          phone: true,
          services: true,
          tier: true,
          isVerified: true,
          user: { select: { id: true } },
        },
        orderBy: [
          { tier: 'desc' },
          { city: 'asc' },
          { firmName: 'asc' },
        ],
      })

      // Get unique cities for filter dropdown
      const cities = await prisma.consultant.findMany({
        select: { city: true },
        distinct: ['city'],
        orderBy: { city: 'asc' },
      })

      return NextResponse.json({
        consultants,
        cities: cities.map(c => c.city),
      })
    }

    if (!query || query.trim().length < 2) {
      return NextResponse.json({ consultants: [] })
    }

    const searchTerm = query.trim().toLowerCase()

    const consultants = await prisma.consultant.findMany({
      where: {
        OR: [
          { firmName: { contains: searchTerm, mode: 'insensitive' } },
          { email: { contains: searchTerm, mode: 'insensitive' } },
          { phone: { contains: searchTerm } },
          { name: { contains: searchTerm, mode: 'insensitive' } },
          { city: { contains: searchTerm, mode: 'insensitive' } },
        ],
      },
      select: {
        id: true,
        firmName: true,
        name: true,
        city: true,
        state: true,
        email: true,
        phone: true,
        services: true,
        tier: true,
        isVerified: true,
        paidUntil: true,
        user: { select: { id: true } },
      },
      take: 20,
      orderBy: [
        { tier: 'desc' },
        { firmName: 'asc' },
      ],
    })

    return NextResponse.json({ consultants })
  } catch (error) {
    console.error('Error searching consultants:', error)
    return NextResponse.json(
      { error: 'Failed to search consultants' },
      { status: 500 }
    )
  }
}
