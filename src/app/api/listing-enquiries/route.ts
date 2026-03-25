import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

function generateSlug(name: string, city: string): string {
  const slug = `${name}-${city}`
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
  return `${slug}-${Date.now().toString(36)}`
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const {
      firmName,
      contactName,
      designation,
      email,
      phone,
      city,
      state,
      website,
      experience,
      services,
      bio,
      tier = 'free',
    } = body

    // Validate required fields
    if (!firmName || !contactName || !email || !phone || !city || !state) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    if (!services || services.length === 0) {
      return NextResponse.json(
        { error: 'At least one service is required' },
        { status: 400 }
      )
    }

    // Check if email already exists
    const existingConsultant = await prisma.consultant.findUnique({
      where: { email: email.toLowerCase().trim() },
    })

    if (existingConsultant) {
      return NextResponse.json(
        {
          error: 'A listing with this email already exists. Please login to your dashboard to manage it.',
          existingListing: true,
          loginUrl: '/consultant/login'
        },
        { status: 400 }
      )
    }

    // For featured tier, create consultant directly (will be activated after payment)
    // For free tier, create enquiry for admin review
    if (tier === 'featured') {
      // Create consultant directly (pending payment verification)
      const consultant = await prisma.consultant.create({
        data: {
          slug: generateSlug(firmName, city),
          name: contactName,
          firmName,
          designation: designation || 'Consultant',
          city,
          state,
          services: Array.isArray(services) ? services : [],
          phone,
          email: email.toLowerCase().trim(),
          website: website || null,
          bio: bio || null,
          experience: experience ? parseInt(experience) : null,
          tier: 'free', // Will be upgraded to 'featured' after payment
          isPremium: false, // Will be set to true after payment
          isVerified: false, // Will be set to true after payment
          reviewCount: 0,
          rating: 0,
          viewCount: 0,
        },
      })

      return NextResponse.json(
        {
          success: true,
          consultantId: consultant.id,
          message: 'Consultant created. Proceed to payment.',
          paymentRequired: true,
          amount: 2999,
        },
        { status: 201 }
      )
    } else {
      // Create listing enquiry for admin review (free tier)
      const listingEnquiry = await prisma.listingEnquiry.create({
        data: {
          firmName,
          contactName,
          email,
          phone,
          city,
          state,
          services: Array.isArray(services) ? services : [],
          tier: 'free',
          status: 'pending',
          notes: bio ? `Experience: ${experience || 'N/A'} years. Designation: ${designation || 'N/A'}. Website: ${website || 'N/A'}. Bio: ${bio}` : `Experience: ${experience || 'N/A'} years. Designation: ${designation || 'N/A'}. Website: ${website || 'N/A'}`,
        },
      })

      return NextResponse.json(
        {
          success: true,
          enquiryId: listingEnquiry.id,
          message: 'Free listing enquiry submitted. Will be reviewed within 24 hours.',
          paymentRequired: false,
        },
        { status: 201 }
      )
    }
  } catch (error) {
    console.error('Error creating listing:', error)
    return NextResponse.json(
      { error: 'Failed to submit listing' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    // Admin endpoint to fetch listing enquiries (add auth in production)
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')

    const enquiries = await prisma.listingEnquiry.findMany({
      where: status ? { status } : {},
      orderBy: { createdAt: 'desc' },
      take: 50,
    })

    return NextResponse.json({ enquiries })
  } catch (error) {
    console.error('Error fetching listing enquiries:', error)
    return NextResponse.json(
      { error: 'Failed to fetch listing enquiries' },
      { status: 500 }
    )
  }
}
