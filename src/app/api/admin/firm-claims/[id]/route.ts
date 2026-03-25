import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// Delete a claim and unlink user from consultant if approved
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    const claim = await prisma.firmClaim.findUnique({
      where: { id },
      include: {
        user: true,
      },
    })

    if (!claim) {
      return NextResponse.json({ error: 'Claim not found' }, { status: 404 })
    }

    // If claim was approved, unlink the user from consultant
    if (claim.status === 'approved' && claim.user.consultantId === claim.consultantId) {
      await prisma.$transaction([
        // Unlink user from consultant
        prisma.user.update({
          where: { id: claim.userId },
          data: { consultantId: null },
        }),
        // Delete the claim
        prisma.firmClaim.delete({
          where: { id },
        }),
      ])
    } else {
      // Just delete the claim
      await prisma.firmClaim.delete({
        where: { id },
      })
    }

    return NextResponse.json({
      success: true,
      message: 'Claim removed and user unlinked from firm',
    })
  } catch (error) {
    console.error('Error deleting claim:', error)
    return NextResponse.json({ error: 'Failed to delete claim' }, { status: 500 })
  }
}

// Approve or reject a claim
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const { action, adminNotes } = body

    if (!['approve', 'reject'].includes(action)) {
      return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
    }

    const claim = await prisma.firmClaim.findUnique({
      where: { id },
      include: {
        user: true,
        consultant: {
          include: { user: true },
        },
      },
    })

    if (!claim) {
      return NextResponse.json({ error: 'Claim not found' }, { status: 404 })
    }

    if (claim.status !== 'pending') {
      return NextResponse.json(
        { error: 'This claim has already been processed' },
        { status: 400 }
      )
    }

    if (action === 'approve') {
      // Check if consultant is already linked to a user
      if (claim.consultant.user) {
        return NextResponse.json(
          { error: 'This firm is already linked to another user' },
          { status: 400 }
        )
      }

      // Check if user already has a consultant linked
      if (claim.user.consultantId) {
        return NextResponse.json(
          { error: 'This user already has a firm linked' },
          { status: 400 }
        )
      }

      // Approve: Link user to consultant
      await prisma.$transaction([
        prisma.firmClaim.update({
          where: { id },
          data: {
            status: 'approved',
            adminNotes,
          },
        }),
        prisma.user.update({
          where: { id: claim.userId },
          data: { consultantId: claim.consultantId },
        }),
        // Reject any other pending claims for this consultant
        prisma.firmClaim.updateMany({
          where: {
            consultantId: claim.consultantId,
            id: { not: id },
            status: 'pending',
          },
          data: {
            status: 'rejected',
            adminNotes: 'Another claim was approved for this firm',
          },
        }),
      ])

      return NextResponse.json({
        success: true,
        message: 'Claim approved and user linked to firm',
      })
    } else {
      // Reject claim
      await prisma.firmClaim.update({
        where: { id },
        data: {
          status: 'rejected',
          adminNotes,
        },
      })

      return NextResponse.json({
        success: true,
        message: 'Claim rejected',
      })
    }
  } catch (error) {
    console.error('Error processing claim:', error)
    return NextResponse.json({ error: 'Failed to process claim' }, { status: 500 })
  }
}
