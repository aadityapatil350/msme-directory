import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      consultantId,
    } = body

    // Verify signature
    const sign = razorpay_order_id + '|' + razorpay_payment_id
    const expectedSign = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!)
      .update(sign)
      .digest('hex')

    if (expectedSign !== razorpay_signature) {
      return NextResponse.json(
        { error: 'Invalid payment signature' },
        { status: 400 }
      )
    }

    // Get payment record
    const payment = await prisma.payment.findUnique({
      where: { razorpayOrderId: razorpay_order_id },
    })

    if (!payment) {
      return NextResponse.json(
        { error: 'Payment record not found' },
        { status: 404 }
      )
    }

    // Update payment status
    await prisma.payment.update({
      where: { razorpayOrderId: razorpay_order_id },
      data: {
        razorpayPaymentId: razorpay_payment_id,
        razorpaySignature: razorpay_signature,
        status: 'paid',
        consultantId: consultantId || payment.consultantId,
      },
    })

    // If consultant exists, upgrade to featured
    if (consultantId || payment.consultantId) {
      const targetConsultantId = consultantId || payment.consultantId

      // Calculate new paidUntil date
      const currentPaidUntil = await prisma.consultant.findUnique({
        where: { id: targetConsultantId },
        select: { paidUntil: true },
      })

      const startDate = currentPaidUntil?.paidUntil && new Date(currentPaidUntil.paidUntil) > new Date()
        ? new Date(currentPaidUntil.paidUntil)
        : new Date()

      const newPaidUntil = new Date(startDate)
      newPaidUntil.setDate(newPaidUntil.getDate() + payment.duration)

      await prisma.consultant.update({
        where: { id: targetConsultantId },
        data: {
          tier: 'featured',
          isPremium: true,
          isVerified: true,
          paidUntil: newPaidUntil,
          razorpayOrderId: razorpay_order_id,
          razorpayPaymentId: razorpay_payment_id,
        },
      })
    }

    return NextResponse.json({
      success: true,
      message: 'Payment verified and listing upgraded to Featured',
    })
  } catch (error) {
    console.error('Error verifying payment:', error)
    return NextResponse.json(
      { error: 'Failed to verify payment' },
      { status: 500 }
    )
  }
}
