import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendOTPEmail(email: string, otp: string, firmName?: string) {
  try {
    const { data, error } = await resend.emails.send({
      from: 'MSMEVault <onboarding@resend.dev>',
      to: email,
      subject: `${otp} is your MSMEVault login code`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f0f4ff; margin: 0; padding: 20px;">
          <div style="max-width: 480px; margin: 0 auto; background: white; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
            <!-- Header -->
            <div style="background: linear-gradient(135deg, #0f1f3d 0%, #1a3a6e 100%); padding: 24px; text-align: center;">
              <h1 style="margin: 0; font-size: 24px; font-weight: 800; color: white;">
                MSME<span style="color: #f97316;">Vault</span>
              </h1>
              <p style="margin: 8px 0 0; color: #93c5fd; font-size: 14px;">Consultant Dashboard</p>
            </div>

            <!-- Content -->
            <div style="padding: 32px 24px;">
              <p style="margin: 0 0 16px; color: #374151; font-size: 16px;">
                Hi${firmName ? ` <strong>${firmName}</strong>` : ''},
              </p>
              <p style="margin: 0 0 24px; color: #374151; font-size: 16px;">
                Use this code to log in to your consultant dashboard:
              </p>

              <!-- OTP Box -->
              <div style="background: #f0f4ff; border: 2px dashed #3b82f6; border-radius: 12px; padding: 24px; text-align: center; margin: 0 0 24px;">
                <span style="font-size: 36px; font-weight: 700; letter-spacing: 8px; color: #0f1f3d; font-family: monospace;">
                  ${otp}
                </span>
              </div>

              <p style="margin: 0 0 8px; color: #6b7280; font-size: 14px;">
                This code expires in <strong>10 minutes</strong>.
              </p>
              <p style="margin: 0; color: #6b7280; font-size: 14px;">
                If you didn't request this code, you can safely ignore this email.
              </p>
            </div>

            <!-- Footer -->
            <div style="background: #f9fafb; padding: 16px 24px; border-top: 1px solid #e5e7eb;">
              <p style="margin: 0; color: #9ca3af; font-size: 12px; text-align: center;">
                © ${new Date().getFullYear()} MSMEVault.in · India's #1 MSME Consultants Directory
              </p>
            </div>
          </div>
        </body>
        </html>
      `,
    })

    if (error) {
      console.error('Failed to send email:', JSON.stringify(error, null, 2))
      return { success: false, error }
    }

    console.log('Email sent successfully:', data)

    return { success: true, data }
  } catch (error) {
    console.error('Email error:', error)
    return { success: false, error }
  }
}
