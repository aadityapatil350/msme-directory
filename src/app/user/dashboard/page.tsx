'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  Edit,
  Eye,
  Star,
  Shield,
  Phone,
  Mail,
  Globe,
  MapPin,
  Briefcase,
  LogOut,
  Crown,
  CheckCircle,
  AlertCircle,
  ExternalLink,
  Building2,
  Clock,
} from 'lucide-react'

type User = {
  id: string
  name: string
  email: string
  phone: string | null
}

type Consultant = {
  id: string
  slug: string
  name: string
  firmName: string
  designation: string | null
  city: string
  state: string
  services: string[]
  phone: string
  email: string
  website: string | null
  bio: string | null
  experience: number | null
  reviewCount: number
  rating: number
  viewCount: number
  tier: string
  isPremium: boolean
  paidUntil: string | null
  isVerified: boolean
}

type Claim = {
  id: string
  status: string
  consultant: {
    firmName: string
    city: string
    state: string
  }
}

export default function UserDashboardPage() {
  const [user, setUser] = useState<User | null>(null)
  const [consultant, setConsultant] = useState<Consultant | null>(null)
  const [claims, setClaims] = useState<Claim[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const res = await fetch('/api/user/me')
      if (!res.ok) {
        router.push('/user/login')
        return
      }
      const data = await res.json()
      setUser(data.user)
      setConsultant(data.consultant)

      // Fetch claims if no consultant linked
      if (!data.consultant) {
        const claimsRes = await fetch('/api/user/claim-firm')
        if (claimsRes.ok) {
          const claimsData = await claimsRes.json()
          setClaims(claimsData.claims || [])
        }
      }
    } catch (error) {
      router.push('/user/login')
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogout = async () => {
    await fetch('/api/user/logout', { method: 'POST' })
    router.push('/user/login')
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#f0f4ff] flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-[var(--blue)] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-[#f0f4ff]">
      {/* Header */}
      <div className="bg-gradient-to-br from-[var(--navy)] via-[#1a3a6e] to-[#0f2d5a] px-4 md:px-6 py-6">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex items-center gap-4">
              <Link href="/" className="font-['Syne'] text-xl font-extrabold text-white">
                MSME<span className="text-[var(--orange)]">Vault</span>
              </Link>
              <span className="text-white/50">|</span>
              <span className="text-white font-medium">My Dashboard</span>
            </div>
            <div className="flex items-center gap-3">
              {consultant && (
                <Link
                  href={`/consultants/${consultant.slug}`}
                  target="_blank"
                  className="flex items-center gap-2 bg-white/10 text-white px-4 py-2 rounded-lg text-sm hover:bg-white/20 transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  View Public Profile
                </Link>
              )}
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 bg-white text-[var(--navy)] px-4 py-2 rounded-lg text-sm font-semibold hover:bg-gray-100 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 md:px-6 py-8">
        <div className="max-w-[1200px] mx-auto">
          {/* Welcome */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
            <h1 className="font-['Syne'] text-2xl font-extrabold text-[var(--navy)] mb-1">
              Welcome, {user.name}!
            </h1>
            <p className="text-gray-600">Logged in as {user.email}</p>
          </div>

          {/* No Consultant Linked */}
          {!consultant && (
            <div className="space-y-6">
              {/* Pending Claims */}
              {claims.length > 0 && (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                  <h2 className="font-semibold text-[var(--navy)] mb-4 flex items-center gap-2">
                    <Building2 className="w-5 h-5" />
                    Your Claim Requests
                  </h2>
                  <div className="space-y-3">
                    {claims.map((claim) => (
                      <div
                        key={claim.id}
                        className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                      >
                        <div>
                          <p className="font-medium text-[var(--navy)]">{claim.consultant.firmName}</p>
                          <p className="text-sm text-gray-600">
                            {claim.consultant.city}, {claim.consultant.state}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          {claim.status === 'pending' && (
                            <span className="flex items-center gap-1 bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs font-medium">
                              <Clock className="w-3 h-3" />
                              Pending Review
                            </span>
                          )}
                          {claim.status === 'approved' && (
                            <span className="flex items-center gap-1 bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium">
                              <CheckCircle className="w-3 h-3" />
                              Approved
                            </span>
                          )}
                          {claim.status === 'rejected' && (
                            <span className="flex items-center gap-1 bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-medium">
                              <AlertCircle className="w-3 h-3" />
                              Rejected
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Claim Your Firm CTA */}
              <div className="bg-gradient-to-br from-[var(--blue)] to-[#1e40af] rounded-2xl p-6 text-center text-white">
                <Building2 className="w-12 h-12 mx-auto mb-4 opacity-80" />
                <h2 className="font-semibold text-lg mb-2">
                  Claim Your Firm Listing
                </h2>
                <p className="text-blue-100 mb-4 text-sm">
                  If your firm is already listed on MSMEVault, you can claim it to manage your listing and connect with potential clients.
                </p>
                <Link href="/user/claim-firm">
                  <button className="bg-white text-[var(--blue)] px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                    Search & Claim Your Firm
                  </button>
                </Link>
              </div>

              {/* Or List New Firm */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 text-center">
                <h2 className="font-semibold text-[var(--navy)] mb-2">
                  Don't see your firm?
                </h2>
                <p className="text-gray-600 mb-4 text-sm">
                  If your firm is not listed yet, you can submit a listing request.
                </p>
                <Link href="/list-your-firm">
                  <button className="bg-[var(--orange)] text-white px-6 py-2 rounded-lg font-semibold hover:bg-[#ea580c] transition-colors">
                    List Your Firm
                  </button>
                </Link>
              </div>
            </div>
          )}

          {/* Consultant Dashboard */}
          {consultant && (
            <>
              {/* Stats & Status */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                {/* Stats Card */}
                <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                  <h2 className="font-semibold text-[var(--navy)] mb-4">{consultant.firmName}</h2>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-blue-50 rounded-xl p-4 text-center">
                      <Eye className="w-6 h-6 text-[var(--blue)] mx-auto mb-2" />
                      <p className="text-2xl font-bold text-[var(--navy)]">{consultant.viewCount}</p>
                      <p className="text-xs text-gray-600">Profile Views</p>
                    </div>
                    <div className="bg-yellow-50 rounded-xl p-4 text-center">
                      <Star className="w-6 h-6 text-yellow-500 mx-auto mb-2" />
                      <p className="text-2xl font-bold text-[var(--navy)]">
                        {consultant.rating > 0 ? consultant.rating.toFixed(1) : '-'}
                      </p>
                      <p className="text-xs text-gray-600">{consultant.reviewCount} Reviews</p>
                    </div>
                    <div className="bg-green-50 rounded-xl p-4 text-center">
                      {consultant.isVerified ? (
                        <>
                          <Shield className="w-6 h-6 text-green-500 mx-auto mb-2" />
                          <p className="text-sm font-bold text-green-700">Verified</p>
                        </>
                      ) : (
                        <>
                          <AlertCircle className="w-6 h-6 text-gray-400 mx-auto mb-2" />
                          <p className="text-sm font-bold text-gray-500">Not Verified</p>
                        </>
                      )}
                      <p className="text-xs text-gray-600">Status</p>
                    </div>
                  </div>
                </div>

                {/* Plan Status */}
                <div className={`rounded-2xl shadow-sm border p-6 ${
                  consultant.tier === 'featured'
                    ? 'bg-gradient-to-br from-[var(--orange)] to-[#ea580c] text-white border-orange-200'
                    : 'bg-white border-gray-100'
                }`}>
                  <div className="flex items-center gap-2 mb-4">
                    <Crown className={`w-5 h-5 ${consultant.tier === 'featured' ? 'text-white' : 'text-gray-400'}`} />
                    <h2 className={`font-semibold ${consultant.tier === 'featured' ? 'text-white' : 'text-[var(--navy)]'}`}>
                      {consultant.tier === 'featured' ? 'Featured Plan' : 'Free Plan'}
                    </h2>
                  </div>

                  {consultant.tier === 'featured' ? (
                    <p className="text-white/90 text-sm">
                      Your listing has premium visibility with verified badge and top placement.
                    </p>
                  ) : (
                    <>
                      <p className="text-gray-600 text-sm mb-4">
                        Upgrade to Featured for verified badge, top placement, and more visibility.
                      </p>
                      <p className="text-xs text-gray-500">
                        Contact admin to upgrade your plan.
                      </p>
                    </>
                  )}
                </div>
              </div>

              {/* Listing Details */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                  <h2 className="font-['Syne'] text-lg font-bold text-[var(--navy)]">
                    Your Listing Details
                  </h2>
                  <Link href="/user/edit">
                    <button className="flex items-center gap-2 bg-[var(--blue)] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#1e40af] transition-colors">
                      <Edit className="w-4 h-4" />
                      Edit Listing
                    </button>
                  </Link>
                </div>

                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Left Column */}
                    <div className="space-y-4">
                      <div>
                        <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">Firm Name</label>
                        <p className="text-[var(--navy)] font-semibold mt-1">{consultant.firmName}</p>
                      </div>
                      <div>
                        <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">Contact Person</label>
                        <p className="text-[var(--navy)] mt-1">{consultant.name}</p>
                        {consultant.designation && (
                          <p className="text-sm text-gray-600">{consultant.designation}</p>
                        )}
                      </div>
                      <div>
                        <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">Location</label>
                        <p className="text-[var(--navy)] mt-1 flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-gray-400" />
                          {consultant.city}, {consultant.state}
                        </p>
                      </div>
                      <div>
                        <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">Experience</label>
                        <p className="text-[var(--navy)] mt-1 flex items-center gap-2">
                          <Briefcase className="w-4 h-4 text-gray-400" />
                          {consultant.experience ? `${consultant.experience} years` : 'Not specified'}
                        </p>
                      </div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-4">
                      <div>
                        <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</label>
                        <p className="text-[var(--navy)] mt-1 flex items-center gap-2">
                          <Phone className="w-4 h-4 text-gray-400" />
                          {consultant.phone}
                        </p>
                        <p className="text-[var(--navy)] mt-1 flex items-center gap-2">
                          <Mail className="w-4 h-4 text-gray-400" />
                          {consultant.email}
                        </p>
                        {consultant.website && (
                          <p className="text-[var(--navy)] mt-1 flex items-center gap-2">
                            <Globe className="w-4 h-4 text-gray-400" />
                            <a href={consultant.website} target="_blank" rel="noopener noreferrer" className="text-[var(--blue)] hover:underline">
                              {consultant.website.replace(/^https?:\/\//, '')}
                            </a>
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">Services</label>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {consultant.services.map((service) => (
                            <span
                              key={service}
                              className="bg-blue-50 text-[var(--blue)] px-3 py-1 rounded-full text-xs font-medium"
                            >
                              {service}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Bio */}
                  {consultant.bio && (
                    <div className="mt-6 pt-6 border-t border-gray-100">
                      <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">About</label>
                      <p className="text-gray-700 mt-2 leading-relaxed">{consultant.bio}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Tips */}
              <div className="mt-6 bg-blue-50 border border-blue-100 rounded-2xl p-6">
                <h3 className="font-semibold text-[var(--navy)] mb-3">Tips to improve your listing</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Complete your bio with specializations and achievements</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Add all services you offer to appear in more searches</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Keep your contact information up to date</span>
                  </li>
                </ul>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
