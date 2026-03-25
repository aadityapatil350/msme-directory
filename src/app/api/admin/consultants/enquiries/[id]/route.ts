import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const { action } = body

    const enquiry = await prisma.listingEnquiry.findUnique({
      where: { id },
    })

    if (!enquiry) {
      return NextResponse.json(
        { error: 'Enquiry not found' },
        { status: 404 }
      )
    }

    if (action === 'approve') {
      // Check if email already exists
      const existingConsultant = await prisma.consultant.findUnique({
        where: { email: enquiry.email.toLowerCase().trim() },
      })

      if (existingConsultant) {
        return NextResponse.json(
          { error: 'A consultant with this email already exists' },
          { status: 400 }
        )
      }

      // Create consultant from enquiry
      const slug = `${enquiry.firmName.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${Date.now().toString(36)}`

      await prisma.consultant.create({
        data: {
          name: enquiry.contactName,
          slug,
          firmName: enquiry.firmName,
          city: enquiry.city,
          state: enquiry.state,
          services: enquiry.services,
          phone: enquiry.phone,
          email: enquiry.email.toLowerCase().trim(),
          tier: 'free', // Admin will upgrade manually
          isPremium: false,
          isVerified: false, // Admin will verify manually
          paidUntil: null,
        },
      })

      // Update enquiry status
      await prisma.listingEnquiry.update({
        where: { id },
        data: {
          status: 'approved',
          notes: `Approved on ${new Date().toISOString()}`,
        },
      })

      return NextResponse.json({ success: true, message: 'Consultant created successfully' })
    } else if (action === 'reject') {
      await prisma.listingEnquiry.update({
        where: { id },
        data: {
          status: 'rejected',
          notes: `Rejected on ${new Date().toISOString()}`,
        },
      })

      return NextResponse.json({ success: true, message: 'Enquiry rejected' })
    } else {
      return NextResponse.json(
        { error: 'Invalid action' },
        { status: 400 }
      )
    }
  } catch (error) {
    console.error('Error processing enquiry:', error)
    return NextResponse.json(
      { error: 'Failed to process enquiry' },
      { status: 500 }
    )
  }
}
