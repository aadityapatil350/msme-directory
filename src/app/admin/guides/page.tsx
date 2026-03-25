'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Plus, Search, Edit, Trash2, Eye, BookOpen } from 'lucide-react'

type Guide = {
  id: string
  slug: string
  title: string
  excerpt: string
  category: string
  isPublished: boolean
  publishedAt: string | null
  viewCount: number
  createdAt: string
}

export default function AdminGuidesPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [guides, setGuides] = useState<Guide[]>([])
  const [filteredGuides, setFilteredGuides] = useState<Guide[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('admin_token')
    if (!token) {
      router.push('/admin/login')
      return
    }
    setIsAuthenticated(true)
    fetchGuides()
  }, [router])

  useEffect(() => {
    filterGuides()
  }, [searchTerm, categoryFilter, statusFilter, guides])

  const fetchGuides = async () => {
    try {
      const response = await fetch('/api/admin/guides')
      if (response.ok) {
        const data = await response.json()
        setGuides(data)
        setFilteredGuides(data)
      }
    } catch (error) {
      console.error('Error fetching guides:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const filterGuides = () => {
    let filtered = guides

    if (searchTerm) {
      filtered = filtered.filter(guide =>
        guide.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        guide.slug.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (categoryFilter !== 'all') {
      filtered = filtered.filter(guide => guide.category === categoryFilter)
    }

    if (statusFilter !== 'all') {
      if (statusFilter === 'published') {
        filtered = filtered.filter(guide => guide.isPublished)
      } else if (statusFilter === 'draft') {
        filtered = filtered.filter(guide => !guide.isPublished)
      }
    }

    setFilteredGuides(filtered)
  }

  const togglePublish = async (id: string, isPublished: boolean) => {
    try {
      const response = await fetch(`/api/admin/guides/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          isPublished: !isPublished,
          publishedAt: !isPublished ? new Date().toISOString() : null,
        }),
      })

      if (response.ok) {
        fetchGuides()
      }
    } catch (error) {
      console.error('Error toggling publish status:', error)
    }
  }

  const deleteGuide = async (id: string) => {
    if (!confirm('Are you sure you want to delete this guide?')) return

    try {
      const response = await fetch(`/api/admin/guides/${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        fetchGuides()
      }
    } catch (error) {
      console.error('Error deleting guide:', error)
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
    total: guides.length,
    published: guides.filter(g => g.isPublished).length,
    drafts: guides.filter(g => !g.isPublished).length,
    totalViews: guides.reduce((sum, g) => sum + g.viewCount, 0),
  }

  const categories = [...new Set(guides.map(g => g.category))]

  return (
    <div className="min-h-screen bg-[#f0f4ff]">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#0f1f3d] to-[#1a3a6e] px-6 py-4 shadow-md">
        <div className="max-w-[1400px] mx-auto flex justify-between items-center">
          <div>
            <div className="flex items-center gap-3">
              <Link href="/admin/dashboard" className="text-white hover:text-gray-200">
                <span className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Back
                </span>
              </Link>
              <div className="flex items-center gap-2">
                <BookOpen className="h-6 w-6 text-green-400" />
                <h1 className="text-2xl font-bold text-white">Guide Management</h1>
              </div>
            </div>
            <p className="text-gray-300 text-sm mt-1">Create and manage step-by-step guides</p>
          </div>
          <button
            onClick={handleLogout}
            className="bg-white text-[var(--navy)] text-sm font-semibold px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
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
              <p className="text-sm text-gray-600 mb-1">Total Guides</p>
              <p className="text-2xl font-bold text-[var(--navy)]">{stats.total}</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4">
              <p className="text-sm text-gray-600 mb-1">Published</p>
              <p className="text-2xl font-bold text-green-600">{stats.published}</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4">
              <p className="text-sm text-gray-600 mb-1">Drafts</p>
              <p className="text-2xl font-bold text-yellow-600">{stats.drafts}</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4">
              <p className="text-sm text-gray-600 mb-1">Total Views</p>
              <p className="text-2xl font-bold text-blue-600">{stats.totalViews.toLocaleString()}</p>
            </div>
          </div>

          {/* Filters & Actions */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search guides..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-[var(--blue)]"
                />
              </div>

              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-[var(--blue)]"
              >
                <option value="all">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-[var(--blue)]"
              >
                <option value="all">All Status</option>
                <option value="published">Published</option>
                <option value="draft">Drafts</option>
              </select>

              <Link href="/admin/guides/new">
                <button className="flex items-center gap-2 bg-green-600 text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-green-700 transition-colors whitespace-nowrap">
                  <Plus className="h-4 w-4" />
                  New Guide
                </button>
              </Link>
            </div>
          </div>

          {/* Guides Table */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-bold text-[var(--navy)]">
                {filteredGuides.length} Guide{filteredGuides.length !== 1 ? 's' : ''}
              </h2>
            </div>

            {isLoading ? (
              <div className="p-8 text-center text-gray-500">
                Loading guides...
              </div>
            ) : filteredGuides.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                No guides found
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-green-50 border-b border-green-200">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-green-800 uppercase">
                        Title
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-green-800 uppercase">
                        Category
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-green-800 uppercase">
                        Status
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-green-800 uppercase">
                        Views
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-green-800 uppercase">
                        Published
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-green-800 uppercase">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredGuides.map((guide) => (
                      <tr key={guide.id} className="hover:bg-green-50">
                        <td className="px-4 py-3">
                          <div>
                            <div className="text-sm font-medium text-[var(--navy)]">{guide.title}</div>
                            <div className="text-xs text-gray-500">/{guide.slug}</div>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <span className="bg-green-100 text-green-700 text-xs font-semibold px-2 py-1 rounded">
                            {guide.category}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm">
                          <button
                            onClick={() => togglePublish(guide.id, guide.isPublished)}
                            className={`px-2 py-1 rounded text-xs font-semibold ${
                              guide.isPublished
                                ? 'bg-green-100 text-green-700'
                                : 'bg-yellow-100 text-yellow-700'
                            }`}
                          >
                            {guide.isPublished ? 'Published' : 'Draft'}
                          </button>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <Eye className="h-3 w-3" />
                            {guide.viewCount}
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600">
                          {guide.publishedAt
                            ? new Date(guide.publishedAt).toLocaleDateString('en-IN')
                            : '-'}
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <Link href={`/guides/${guide.slug}`} target="_blank" rel="noopener noreferrer">
                              <button className="text-gray-500 hover:text-gray-700" title="View on site">
                                <Eye className="h-4 w-4" />
                              </button>
                            </Link>
                            <Link href={`/admin/guides/${guide.id}`}>
                              <button className="text-[var(--blue)] hover:text-blue-700" title="Edit">
                                <Edit className="h-4 w-4" />
                              </button>
                            </Link>
                            <button
                              onClick={() => deleteGuide(guide.id)}
                              className="text-red-600 hover:text-red-700" title="Delete"
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
