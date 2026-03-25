'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Plus, Search, Eye, Trash2, Edit } from 'lucide-react'

type Scheme = {
  id: string
  slug: string
  name: string
  type: string
  state: string | null
  minAmount: number | null
  maxAmount: number | null
  isActive: boolean
  isFeatured: boolean
  isSponsored: boolean
  viewCount: number
  createdAt: string
}

export default function AdminSchemesPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [schemes, setSchemes] = useState<Scheme[]>([])
  const [filteredSchemes, setFilteredSchemes] = useState<Scheme[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [typeFilter, setTypeFilter] = useState('all')
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('admin_token')
    if (!token) {
      router.push('/admin/login')
      return
    }
    setIsAuthenticated(true)
    fetchSchemes()
  }, [router])

  useEffect(() => {
    filterSchemes()
  }, [searchTerm, typeFilter, schemes])

  const fetchSchemes = async () => {
    try {
      const response = await fetch('/api/admin/schemes')
      if (response.ok) {
        const data = await response.json()
        setSchemes(data)
        setFilteredSchemes(data)
      }
    } catch (error) {
      console.error('Error fetching schemes:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const filterSchemes = () => {
    let filtered = schemes

    if (searchTerm) {
      filtered = filtered.filter(scheme =>
        scheme.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        scheme.slug.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (typeFilter !== 'all') {
      filtered = filtered.filter(scheme => scheme.type === typeFilter)
    }

    setFilteredSchemes(filtered)
  }

  const toggleActive = async (id: string, isActive: boolean) => {
    try {
      const response = await fetch(`/api/admin/schemes/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive: !isActive }),
      })

      if (response.ok) {
        fetchSchemes()
      }
    } catch (error) {
      console.error('Error toggling scheme status:', error)
    }
  }

  const deleteScheme = async (id: string) => {
    if (!confirm('Are you sure you want to delete this scheme?')) return

    try {
      const response = await fetch(`/api/admin/schemes/${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        fetchSchemes()
      }
    } catch (error) {
      console.error('Error deleting scheme:', error)
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
    total: schemes.length,
    active: schemes.filter(s => s.isActive).length,
    central: schemes.filter(s => s.type === 'central').length,
    state: schemes.filter(s => s.type === 'state').length,
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
              <h1 className="text-2xl font-bold text-white">Schemes Management</h1>
            </div>
            <p className="text-gray-300 text-sm">Create and manage government schemes</p>
          </div>
          <button
            onClick={handleLogout}
            className="bg-white text-navy text-sm font-semibold px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-6 py-8">
        <div className="max-w-[1400px] mx-auto">
          {/* Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4">
              <p className="text-sm text-gray-600 mb-1">Total Schemes</p>
              <p className="text-2xl font-bold text-navy">{stats.total}</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4">
              <p className="text-sm text-gray-600 mb-1">Active</p>
              <p className="text-2xl font-bold text-green-600">{stats.active}</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4">
              <p className="text-sm text-gray-600 mb-1">Central</p>
              <p className="text-2xl font-bold text-blue-600">{stats.central}</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4">
              <p className="text-sm text-gray-600 mb-1">State</p>
              <p className="text-2xl font-bold text-orange-600">{stats.state}</p>
            </div>
          </div>

          {/* Filters & Actions */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 mb-6">
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <div className="flex-1 relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search schemes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-custom-blue"
                />
              </div>

              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-custom-blue"
              >
                <option value="all">All Types</option>
                <option value="central">Central</option>
                <option value="state">State</option>
                <option value="sector">Sector</option>
              </select>

              <Link href="/admin/schemes/new">
                <button className="flex items-center gap-2 bg-custom-orange text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-custom-orange-dark transition-colors whitespace-nowrap">
                  <Plus className="h-4 w-4" />
                  Add New Scheme
                </button>
              </Link>
            </div>
          </div>

          {/* Schemes Table */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-bold text-navy">
                {filteredSchemes.length} Scheme{filteredSchemes.length !== 1 ? 's' : ''}
              </h2>
            </div>

            {isLoading ? (
              <div className="p-8 text-center text-gray-500">
                Loading schemes...
              </div>
            ) : filteredSchemes.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                No schemes found
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
                        Type
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-navy-dark uppercase">
                        State
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-navy-dark uppercase">
                        Amount Range
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-navy-dark uppercase">
                        Views
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-navy-dark uppercase">
                        Status
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-navy-dark uppercase">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredSchemes.map((scheme) => (
                      <tr key={scheme.id} className="hover:bg-blue-100">
                        <td className="px-4 py-3">
                          <div>
                            <div className="text-sm font-medium text-navy">{scheme.name}</div>
                            <div className="text-xs text-gray-500">{scheme.slug}</div>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <span className={`inline-block px-2 py-1 rounded text-xs font-semibold ${
                            scheme.type === 'central' ? 'bg-blue-100 text-blue-700' :
                            scheme.type === 'state' ? 'bg-orange-100 text-orange-700' :
                            'bg-purple-100 text-purple-700'
                          }`}>
                            {scheme.type}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600">
                          {scheme.state || '-'}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600">
                          {scheme.minAmount && scheme.maxAmount
                            ? `₹${((scheme.minAmount || 0) / 100000).toFixed(1)}L - ₹${((scheme.maxAmount || 0) / 100000).toFixed(1)}L`
                            : '-'}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <Eye className="h-3 w-3" />
                            {scheme.viewCount}
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <button
                            onClick={() => toggleActive(scheme.id, scheme.isActive)}
                            className={`px-2 py-1 rounded text-xs font-semibold ${
                              scheme.isActive
                                ? 'bg-green-100 text-green-700'
                                : 'bg-gray-100 text-gray-700'
                            }`}
                          >
                            {scheme.isActive ? 'Active' : 'Inactive'}
                          </button>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <Link href={`/admin/schemes/${scheme.id}`}>
                              <button className="text-custom-blue hover:text-blue-700">
                                <Edit className="h-4 w-4" />
                              </button>
                            </Link>
                            <button
                              onClick={() => deleteScheme(scheme.id)}
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
