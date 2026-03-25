import { NextRequest, NextResponse } from 'next/server'

const ADMIN_PASSWORD = 'qwer1234!@#$'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { password } = body

    if (!password) {
      return NextResponse.json(
        { error: 'Password is required' },
        { status: 400 }
      )
    }

    if (password === ADMIN_PASSWORD) {
      // Generate a simple token (in production, use JWT)
      const token = Buffer.from(`admin:${Date.now()}`).toString('base64')

      return NextResponse.json(
        {
          success: true,
          token,
          message: 'Login successful'
        },
        { status: 200 }
      )
    } else {
      return NextResponse.json(
        { error: 'Invalid password' },
        { status: 401 }
      )
    }
  } catch (error) {
    return NextResponse.json(
      { error: 'Login failed' },
      { status: 500 }
    )
  }
}
