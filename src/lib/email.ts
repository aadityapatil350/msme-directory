const RESEND_API_KEY = process.env.RESEND_API_KEY
const LEAD_NOTIFY_TO = process.env.LEAD_NOTIFY_TO || 'frosticebiz@gmail.com'
const LEAD_NOTIFY_FROM = process.env.LEAD_NOTIFY_FROM || 'MSMEVault Leads <onboarding@resend.dev>'

export interface LeadNotifyPayload {
  leadType: string
  fullName?: string | null
  phone?: string | null
  email?: string | null
  city?: string | null
  state?: string | null
  schemeSlug?: string | null
  loanSlug?: string | null
  loanAmountNeeded?: number | null
  sector?: string | null
  turnoverBand?: string | null
  landingPage?: string | null
  utmSource?: string | null
}

export async function sendLeadNotification(lead: LeadNotifyPayload): Promise<void> {
  if (!RESEND_API_KEY) {
    console.warn('[email] RESEND_API_KEY not set — skipping notification')
    return
  }

  const rows = Object.entries(lead)
    .filter(([, v]) => v !== null && v !== undefined && v !== '')
    .map(([k, v]) => `<tr><td style="padding:4px 12px 4px 0;color:#71717a;font-size:12px;">${k}</td><td style="padding:4px 0;color:#09090b;font-size:13px;"><strong>${v}</strong></td></tr>`)
    .join('')

  const html = `<div style="font-family:-apple-system,Segoe UI,Roboto,sans-serif;max-width:560px;">
    <h2 style="color:#09090b;margin:0 0 8px;">New lead — ${lead.leadType}</h2>
    <p style="color:#71717a;font-size:13px;margin:0 0 16px;">MSMEVault.in</p>
    <table style="border-collapse:collapse;">${rows}</table>
  </div>`

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: LEAD_NOTIFY_FROM,
        to: LEAD_NOTIFY_TO,
        subject: `New lead: ${lead.leadType}${lead.fullName ? ` — ${lead.fullName}` : ''}`,
        html,
      }),
    })
    if (!res.ok) {
      const body = await res.text()
      console.warn('[email] Resend responded non-2xx:', res.status, body)
    }
  } catch (err) {
    console.warn('[email] Resend send failed:', err)
  }
}
