import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const leads = await prisma.lead.findMany({
      take: 10,
      orderBy: {
        createdAt: 'desc',
      },
      select: {
        id: true,
        name: true,
        phone: true,
        city: true,
        requirement: true,
        sourcePage: true,
        status: true,
        createdAt: true,
      },
    })

    return NextResponse.json(leads)
  } catch (error) {
    console.error('Error fetching recent leads:', error)
    return NextResponse.json(
      { error: 'Failed to fetch leads' },
      { status: 500 }
    )
  }
}
