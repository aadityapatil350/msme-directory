import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { jwtVerify } from 'jose'

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'user-secret-key-change-in-production'
)

// Get user's claims
export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get('user_token')?.value

    if (!token) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
    }

    const { payload } = await jwtVerify(token, JWT_SECRET)
    const userId = payload.userId as string

    const claims = await prisma.firmClaim.findMany({
      where: { userId },
      include: {
        consultant: {
          select: {
            id: true,
            firmName: true,
            name: true,
            city: true,
            state: true,
            email: true,
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

// Submit a new claim
export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get('user_token')?.value

    if (!token) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
    }

    const { payload } = await jwtVerify(token, JWT_SECRET)
    const userId = payload.userId as string

    const body = await request.json()
    const { consultantId, message } = body

    if (!consultantId) {
      return NextResponse.json({ error: 'Consultant ID is required' }, { status: 400 })
    }

    // Check if consultant exists
    const consultant = await prisma.consultant.findUnique({
      where: { id: consultantId },
      include: { user: true },
    })

    if (!consultant) {
      return NextResponse.json({ error: 'Consultant not found' }, { status: 404 })
    }

    // Check if already claimed by another user
    if (consultant.user) {
      return NextResponse.json(
        { error: 'This firm is already claimed by another user' },
        { status: 400 }
      )
    }

    // Check if user already has a pending claim for this consultant
    const existingClaim = await prisma.firmClaim.findUnique({
      where: {
        userId_consultantId: { userId, consultantId },
      },
    })

    if (existingClaim) {
      if (existingClaim.status === 'pending') {
        return NextResponse.json(
          { error: 'You already have a pending claim for this firm' },
          { status: 400 }
        )
      }
      if (existingClaim.status === 'approved') {
        return NextResponse.json(
          { error: 'Your claim for this firm has already been approved' },
          { status: 400 }
        )
      }
      // If rejected, allow re-submission
      await prisma.firmClaim.update({
        where: { id: existingClaim.id },
        data: {
          status: 'pending',
          message,
          adminNotes: null,
        },
      })
      return NextResponse.json({ success: true, message: 'Claim re-submitted successfully' })
    }

    // Check if user already has a linked consultant
    const user = await prisma.user.findUnique({
      where: { id: userId },
    })

    if (user?.consultantId) {
      return NextResponse.json(
        { error: 'You already have a firm linked to your account' },
        { status: 400 }
      )
    }

    // Create new claim
    const claim = await prisma.firmClaim.create({
      data: {
        userId,
        consultantId,
        message,
      },
    })

    return NextResponse.json({ success: true, claim })
  } catch (error) {
    console.error('Error submitting claim:', error)
    return NextResponse.json({ error: 'Failed to submit claim' }, { status: 500 })
  }
}
