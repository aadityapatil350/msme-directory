'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Mail, Lock, LogIn } from 'lucide-react'

export default function UserLoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const res = await fetch('/api/user/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Login failed')
        return
      }

      // Redirect to dashboard
      router.push('/user/dashboard')
    } catch (err) {
      setError('Something went wrong. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#f0f4ff] flex items-center justify-center px-4">
      <div className="w-full max-w-[420px]">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block font-['Syne'] text-2xl font-extrabold text-[var(--navy)] mb-2">
            MSME<span className="text-[var(--orange)]">Vault</span>
          </Link>
          <h1 className="font-['Syne'] text-xl font-bold text-[var(--navy)]">
            Consultant Login
          </h1>
          <p className="text-gray-600 text-sm mt-1">
            Login to manage your consultant listing
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-[var(--navy)] to-[#1a3a6e] px-6 py-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <LogIn className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-white font-semibold">Welcome Back</h2>
                <p className="text-blue-200 text-sm">Enter your credentials to login</p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg text-sm outline-none focus:border-[var(--blue)] focus:ring-2 focus:ring-blue-50"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg text-sm outline-none focus:border-[var(--blue)] focus:ring-2 focus:ring-blue-50"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading || !email || !password}
              className="w-full bg-[var(--blue)] text-white py-3 rounded-lg font-semibold hover:bg-[#1e40af] transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </button>
          </form>
        </div>

        {/* Footer */}
        <div className="mt-6 text-center">
          <p className="text-gray-600 text-sm">
            Don't have an account?{' '}
            <Link href="/user/register" className="text-[var(--blue)] font-semibold hover:underline">
              Register here
            </Link>
          </p>
          <Link href="/" className="text-[var(--blue)] text-sm font-semibold hover:underline mt-2 block">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}
