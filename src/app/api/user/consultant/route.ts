import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { jwtVerify } from 'jose'

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'user-secret-key-change-in-production'
)

export async function PATCH(request: NextRequest) {
  try {
    const token = request.cookies.get('user_token')?.value

    if (!token) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
    }

    const { payload } = await jwtVerify(token, JWT_SECRET)
    const userId = payload.userId as string

    // Get user with consultant
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { consultant: true },
    })

    if (!user || !user.consultantId) {
      return NextResponse.json(
        { error: 'No consultant linked to this account' },
        { status: 400 }
      )
    }

    const body = await request.json()
    const {
      name,
      firmName,
      designation,
      city,
      state,
      services,
      phone,
      website,
      bio,
      experience,
    } = body

    // Update consultant
    const updated = await prisma.consultant.update({
      where: { id: user.consultantId },
      data: {
        ...(name && { name }),
        ...(firmName && { firmName }),
        ...(designation !== undefined && { designation }),
        ...(city && { city }),
        ...(state && { state }),
        ...(services && { services }),
        ...(phone && { phone }),
        ...(website !== undefined && { website }),
        ...(bio !== undefined && { bio }),
        ...(experience !== undefined && { experience: parseInt(experience) || null }),
      },
    })

    return NextResponse.json({ success: true, consultant: updated })
  } catch (error) {
    console.error('Update error:', error)
    return NextResponse.json({ error: 'Update failed' }, { status: 500 })
  }
}
