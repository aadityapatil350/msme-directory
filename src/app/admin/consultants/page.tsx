'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Plus, Search, Edit, Trash2 } from 'lucide-react'

type Consultant = {
  id: string
  slug: string
  name: string
  firmName: string
  city: string
  state: string
  tier: string
  isPremium: boolean
  paidUntil: string | null
  isVerified: boolean
  reviewCount: number
  rating: number
  createdAt: string
}

export default function AdminConsultantsPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [consultants, setConsultants] = useState<Consultant[]>([])
  const [filteredConsultants, setFilteredConsultants] = useState<Consultant[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [tierFilter, setTierFilter] = useState('all')
  const [expiryFilter, setExpiryFilter] = useState('all')
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('admin_token')
    if (!token) {
      router.push('/admin/login')
      return
    }
    setIsAuthenticated(true)
    fetchConsultants()
  }, [router])

  useEffect(() => {
    filterConsultants()
  }, [searchTerm, tierFilter, expiryFilter, consultants])

  const fetchConsultants = async () => {
    try {
      const response = await fetch('/api/admin/consultants')
      if (response.ok) {
        const data = await response.json()
        setConsultants(data)
        setFilteredConsultants(data)
      }
    } catch (error) {
      console.error('Error fetching consultants:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const filterConsultants = () => {
    let filtered = consultants

    if (searchTerm) {
      filtered = filtered.filter(consultant =>
        consultant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        consultant.firmName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        consultant.city.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (tierFilter !== 'all') {
      filtered = filtered.filter(consultant => consultant.tier === tierFilter)
    }

    if (expiryFilter !== 'all') {
      const now = new Date()
      const sevenDaysFromNow = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)

      if (expiryFilter === 'expiring') {
        filtered = filtered.filter(consultant =>
          consultant.isPremium &&
          consultant.paidUntil &&
          new Date(consultant.paidUntil) <= sevenDaysFromNow
        )
      } else if (expiryFilter === 'expired') {
        filtered = filtered.filter(consultant =>
          consultant.isPremium &&
          consultant.paidUntil &&
          new Date(consultant.paidUntil) < now
        )
      } else if (expiryFilter === 'active') {
        filtered = filtered.filter(consultant =>
          !consultant.isPremium ||
          !consultant.paidUntil ||
          new Date(consultant.paidUntil) > now
        )
      }
    }

    setFilteredConsultants(filtered)
  }

  const deleteConsultant = async (id: string) => {
    if (!confirm('Are you sure you want to delete this consultant?')) return

    try {
      const response = await fetch(`/api/admin/consultants/${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        fetchConsultants()
      }
    } catch (error) {
      console.error('Error deleting consultant:', error)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('admin_token')
    router.push('/admin/login')
  }

  if (!isAuthenticated) {
    return null
  }

  const stats = {
    total: consultants.length,
    premium: consultants.filter(c => c.isPremium).length,
    verified: consultants.filter(c => c.isVerified).length,
    expiring: consultants.filter(c =>
      c.isPremium &&
      c.paidUntil &&
      new Date(c.paidUntil) <= new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    ).length,
  }

  return (
    <div className="min-h-screen bg-[#f0f4ff]">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#0f1f3d] to-[#1a3a6e] px-6 py-4 shadow-md">
        <div className="max-w-[1400px] mx-auto flex justify-between items-center">
          <div>
            <div className="flex items-center gap-3">
              <Link href="/admin/dashboard" className="text-white hover:text-gray-200">
                ← Back
              </Link>
              <h1 className="text-2xl font-bold text-white">Consultants Management</h1>
            </div>
            <p className="text-gray-300 text-sm">Manage CA/consultant listings</p>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/admin/consultants/enquiries">
              <button className="bg-white text-navy text-sm font-semibold px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors">
                Pending Enquiries
              </button>
            </Link>
            <button
              onClick={handleLogout}
              className="bg-white text-navy text-sm font-semibold px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-6 py-8">
        <div className="max-w-[1400px] mx-auto">
          {/* Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4">
              <p className="text-sm text-gray-600 mb-1">Total Consultants</p>
              <p className="text-2xl font-bold text-navy">{stats.total}</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4">
              <p className="text-sm text-gray-600 mb-1">Featured Listings</p>
              <p className="text-2xl font-bold text-orange-600">{stats.premium}</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4">
              <p className="text-sm text-gray-600 mb-1">Verified</p>
              <p className="text-2xl font-bold text-green-600">{stats.verified}</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4">
              <p className="text-sm text-gray-600 mb-1">Expiring Soon</p>
              <p className="text-2xl font-bold text-yellow-600">{stats.expiring}</p>
            </div>
          </div>

          {/* Filters & Actions */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by name, firm, or city..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-custom-blue"
                />
              </div>

              <select
                value={tierFilter}
                onChange={(e) => setTierFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-custom-blue"
              >
                <option value="all">All Tiers</option>
                <option value="free">Free</option>
                <option value="featured">Featured</option>
              </select>

              <select
                value={expiryFilter}
                onChange={(e) => setExpiryFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-custom-blue"
              >
                <option value="all">All Status</option>
                <option value="active">Active Premium</option>
                <option value="expiring">Expiring Soon</option>
                <option value="expired">Expired</option>
              </select>

              <Link href="/admin/consultants/new">
                <button className="flex items-center gap-2 bg-custom-orange text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-custom-orange-dark transition-colors whitespace-nowrap">
                  <Plus className="h-4 w-4" />
                  Add Consultant
                </button>
              </Link>
            </div>
          </div>

          {/* Consultants Table */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-bold text-navy">
                {filteredConsultants.length} Consultant{filteredConsultants.length !== 1 ? 's' : ''}
              </h2>
            </div>

            {isLoading ? (
              <div className="p-8 text-center text-gray-500">
                Loading consultants...
              </div>
            ) : filteredConsultants.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                No consultants found
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-blue-50 border-b border-blue-200">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-navy-dark uppercase">
                        Name
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-navy-dark uppercase">
                        Firm
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-navy-dark uppercase">
                        Location
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-navy-dark uppercase">
                        Tier
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-navy-dark uppercase">
                        Status
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-navy-dark uppercase">
                        Rating
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-navy-dark uppercase">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredConsultants.map((consultant) => (
                      <tr key={consultant.id} className="hover:bg-blue-100">
                        <td className="px-4 py-3">
                          <div>
                            <div className="text-sm font-medium text-navy">{consultant.name}</div>
                            {consultant.isVerified && (
                              <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded">
                                ✓ Verified
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600">
                          {consultant.firmName}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600">
                          {consultant.city}, {consultant.state}
                        </td>
                        <td className="px-4 py-3 text-sm">
                          <span className={`inline-block px-2 py-1 rounded text-xs font-semibold ${
                            consultant.tier === 'featured' ? 'bg-purple-100 text-purple-700' :
                            consultant.tier === 'premium' ? 'bg-orange-100 text-orange-700' :
                            consultant.tier === 'standard' ? 'bg-blue-100 text-blue-700' :
                            'bg-gray-100 text-gray-700'
                          }`}>
                            {consultant.tier}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm">
                          {consultant.isPremium && consultant.paidUntil ? (
                            <div>
                              <div className={`text-xs font-semibold ${
                                new Date(consultant.paidUntil) < new Date() ? 'text-red-700' :
                                new Date(consultant.paidUntil) <= new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) ? 'text-yellow-700' :
                                'text-green-700'
                              }`}>
                                {new Date(consultant.paidUntil) < new Date() ? 'Expired' :
                                 new Date(consultant.paidUntil) <= new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) ? 'Expiring' :
                                 'Active'}
                              </div>
                              <div className="text-xs text-gray-500">
                                Until {new Date(consultant.paidUntil).toLocaleDateString('en-IN')}
                              </div>
                            </div>
                          ) : (
                            <span className="text-xs text-gray-500">Free</span>
                          )}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600">
                          {consultant.rating > 0 ? (
                            <div className="flex items-center gap-1">
                              <span>★</span>
                              <span className="font-medium">{consultant.rating}</span>
                              <span className="text-xs text-gray-500">({consultant.reviewCount})</span>
                            </div>
                          ) : (
                            <span className="text-xs text-gray-500">No ratings</span>
                          )}
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <Link href={`/admin/consultants/${consultant.id}`}>
                              <button className="text-custom-blue hover:text-blue-700">
                                <Edit className="h-4 w-4" />
                              </button>
                            </Link>
                            <button
                              onClick={() => deleteConsultant(consultant.id)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
