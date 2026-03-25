import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const leads = await prisma.lead.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    })

    // Convert to CSV
    const headers = [
      'Name',
      'Phone',
      'Email',
      'City',
      'State',
      'Business Type',
      'Business Age',
      'Monthly Turnover',
      'Loan Amount',
      'Requirement',
      'Status',
      'Source Page',
      'Created At',
    ]

    const csvRows = [
      headers.join(','),
      ...leads.map(lead => [
        lead.name,
        lead.phone,
        lead.email || '',
        lead.city,
        lead.state,
        lead.businessType,
        lead.businessAge,
        lead.monthlyTurnover,
        lead.loanAmount || '',
        lead.requirement,
        lead.status,
        lead.sourcePage || '',
        new Date(lead.createdAt).toISOString(),
      ].map(field => `"${field}"`).join(','))
    ]

    const csvContent = csvRows.join('\n')

    return new NextResponse(csvContent, {
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': `attachment; filename="leads-${new Date().toISOString().split('T')[0]}.csv"`,
      },
    })
  } catch (error) {
    console.error('Error exporting leads:', error)
    return NextResponse.json(
      { error: 'Failed to export leads' },
      { status: 500 }
    )
  }
}
