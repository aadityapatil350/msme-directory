import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const subscribers = await prisma.subscriber.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    })

    // Convert to CSV
    const headers = ['Email', 'Phone', 'Active', 'Source', 'Created At']

    const csvRows = [
      headers.join(','),
      ...subscribers.map(sub => [
        sub.email,
        sub.phone || '',
        sub.isActive ? 'Yes' : 'No',
        sub.source || '',
        new Date(sub.createdAt).toISOString(),
      ].map(field => `"${field}"`).join(','))
    ]

    const csvContent = csvRows.join('\n')

    return new NextResponse(csvContent, {
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': `attachment; filename="subscribers-${new Date().toISOString().split('T')[0]}.csv"`,
      },
    })
  } catch (error) {
    console.error('Error exporting subscribers:', error)
    return NextResponse.json(
      { error: 'Failed to export subscribers' },
      { status: 500 }
    )
  }
}
