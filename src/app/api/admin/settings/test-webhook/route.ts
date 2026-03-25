import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST() {
  try {
    // Get webhook URL from settings
    const webhookSetting = await prisma.siteConfig.findUnique({
      where: { key: 'lendingkart_webhook_url' },
    })

    if (!webhookSetting || !webhookSetting.value) {
      return NextResponse.json(
        { error: 'Webhook URL not configured' },
        { status: 400 }
      )
    }

    // Send test lead
    const testLead = {
      name: 'Test User',
      mobile: '9876543210',
      city: 'Mumbai',
      loanAmount: '500000',
      businessType: 'manufacturing',
    }

    const response = await fetch(webhookSetting.value, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(testLead),
    })

    if (response.ok) {
      return NextResponse.json({ success: true, message: 'Test lead sent successfully' })
    } else {
      const errorText = await response.text()
      return NextResponse.json(
        { error: `Webhook failed: ${errorText}` },
        { status: 500 }
      )
    }
  } catch (error) {
    console.error('Error testing webhook:', error)
    return NextResponse.json(
      { error: 'Failed to test webhook' },
      { status: 500 }
    )
  }
}
