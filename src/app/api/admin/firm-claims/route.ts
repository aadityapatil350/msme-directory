import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// Get all firm claims
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')

    const claims = await prisma.firmClaim.findMany({
      where: status ? { status } : undefined,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
          },
        },
        consultant: {
          select: {
            id: true,
            firmName: true,
            name: true,
            city: true,
            state: true,
            email: true,
            phone: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json({ claims })
  } catch (error) {
    console.error('Error fetching claims:', error)
    return NextResponse.json({ error: 'Failed to fetch claims' }, { status: 500 })
  }
}
