import { NextRequest, NextResponse } from 'next/server'
import Razorpay from 'razorpay'
import { prisma } from '@/lib/prisma'

function getRazorpay() {
  if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
    throw new Error('Razorpay credentials not configured')
  }
  return new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  })
}

// Featured listing pricing
const FEATURED_PRICE = 299900 // ₹2,999 in paise
const FEATURED_DURATION = 30 // days

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { consultantId, tier } = body

    if (tier !== 'featured') {
      return NextResponse.json(
        { error: 'Invalid tier. Only featured tier requires payment.' },
        { status: 400 }
      )
    }

    // Verify consultant exists
    if (consultantId) {
      const consultant = await prisma.consultant.findUnique({
        where: { id: consultantId },
      })
      if (!consultant) {
        return NextResponse.json(
          { error: 'Consultant not found' },
          { status: 404 }
        )
      }
    }

    // Create Razorpay order
    const razorpay = getRazorpay()
    const order = await razorpay.orders.create({
      amount: FEATURED_PRICE,
      currency: 'INR',
      receipt: `receipt_${Date.now()}`,
      notes: {
        consultantId: consultantId || 'new',
        tier: 'featured',
        duration: FEATURED_DURATION.toString(),
      },
    })

    // Save order to database
    await prisma.payment.create({
      data: {
        consultantId: consultantId || null,
        razorpayOrderId: order.id,
        amount: FEATURED_PRICE / 100, // Store in rupees
        currency: 'INR',
        status: 'created',
        tier: 'featured',
        duration: FEATURED_DURATION,
      },
    })

    return NextResponse.json({
      orderId: order.id,
      amount: FEATURED_PRICE,
      currency: 'INR',
      keyId: process.env.RAZORPAY_KEY_ID,
    })
  } catch (error) {
    console.error('Error creating Razorpay order:', error)
    return NextResponse.json(
      { error: 'Failed to create payment order' },
      { status: 500 }
    )
  }
}
