import { NextRequest, NextResponse } from 'next/server'

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  if (!pathname.startsWith('/admin') && !pathname.startsWith('/api/admin')) {
    return NextResponse.next()
  }

  const user = process.env.ADMIN_USERNAME
  const pass = process.env.ADMIN_PASSWORD
  if (!user || !pass) {
    return new NextResponse('Admin credentials not configured. Set ADMIN_USERNAME and ADMIN_PASSWORD.', { status: 503 })
  }

  const auth = req.headers.get('authorization')
  if (auth) {
    const [scheme, encoded] = auth.split(' ')
    if (scheme === 'Basic' && encoded) {
      const decoded = atob(encoded)
      const idx = decoded.indexOf(':')
      const u = decoded.slice(0, idx)
      const p = decoded.slice(idx + 1)
      if (u === user && p === pass) return NextResponse.next()
    }
  }

  return new NextResponse('Authentication required', {
    status: 401,
    headers: { 'WWW-Authenticate': 'Basic realm="MSMEVault Admin"' },
  })
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
}
