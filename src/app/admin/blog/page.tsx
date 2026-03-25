'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Plus, Search, Edit, Trash2, Eye } from 'lucide-react'

type BlogPost = {
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

export default function AdminBlogPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([])
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
    fetchPosts()
  }, [router])

  useEffect(() => {
    filterPosts()
  }, [searchTerm, categoryFilter, statusFilter, posts])

  const fetchPosts = async () => {
    try {
      const response = await fetch('/api/admin/blog')
      if (response.ok) {
        const data = await response.json()
        setPosts(data)
        setFilteredPosts(data)
      }
    } catch (error) {
      console.error('Error fetching blog posts:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const filterPosts = () => {
    let filtered = posts

    if (searchTerm) {
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.slug.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (categoryFilter !== 'all') {
      filtered = filtered.filter(post => post.category === categoryFilter)
    }

    if (statusFilter !== 'all') {
      if (statusFilter === 'published') {
        filtered = filtered.filter(post => post.isPublished)
      } else if (statusFilter === 'draft') {
        filtered = filtered.filter(post => !post.isPublished)
      }
    }

    setFilteredPosts(filtered)
  }

  const togglePublish = async (id: string, isPublished: boolean) => {
    try {
      const response = await fetch(`/api/admin/blog/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isPublished: !isPublished }),
      })

      if (response.ok) {
        fetchPosts()
      }
    } catch (error) {
      console.error('Error toggling publish status:', error)
    }
  }

  const deletePost = async (id: string) => {
    if (!confirm('Are you sure you want to delete this blog post?')) return

    try {
      const response = await fetch(`/api/admin/blog/${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        fetchPosts()
      }
    } catch (error) {
      console.error('Error deleting blog post:', error)
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
    total: posts.length,
    published: posts.filter(p => p.isPublished).length,
    drafts: posts.filter(p => !p.isPublished).length,
  }

  const categories = [...new Set(posts.map(p => p.category))]

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
              <h1 className="text-2xl font-bold text-white">Blog Management</h1>
            </div>
            <p className="text-gray-300 text-sm">Create and manage blog posts</p>
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
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4">
              <p className="text-sm text-gray-600 mb-1">Total Posts</p>
              <p className="text-2xl font-bold text-navy">{stats.total}</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4">
              <p className="text-sm text-gray-600 mb-1">Published</p>
              <p className="text-2xl font-bold text-green-600">{stats.published}</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4">
              <p className="text-sm text-gray-600 mb-1">Drafts</p>
              <p className="text-2xl font-bold text-yellow-600">{stats.drafts}</p>
            </div>
          </div>

          {/* Filters & Actions */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search posts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-custom-blue"
                />
              </div>

              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-custom-blue"
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
                className="px-4 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-custom-blue"
              >
                <option value="all">All Status</option>
                <option value="published">Published</option>
                <option value="draft">Drafts</option>
              </select>

              <Link href="/admin/blog/new">
                <button className="flex items-center gap-2 bg-custom-orange text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-custom-orange-dark transition-colors whitespace-nowrap">
                  <Plus className="h-4 w-4" />
                  New Post
                </button>
              </Link>
            </div>
          </div>

          {/* Posts Table */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-bold text-navy">
                {filteredPosts.length} Post{filteredPosts.length !== 1 ? 's' : ''}
              </h2>
            </div>

            {isLoading ? (
              <div className="p-8 text-center text-gray-500">
                Loading posts...
              </div>
            ) : filteredPosts.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                No posts found
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-blue-50 border-b border-blue-200">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-navy-dark uppercase">
                        Title
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-navy-dark uppercase">
                        Category
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-navy-dark uppercase">
                        Status
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-navy-dark uppercase">
                        Views
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-navy-dark uppercase">
                        Published
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-navy-dark uppercase">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredPosts.map((post) => (
                      <tr key={post.id} className="hover:bg-blue-100">
                        <td className="px-4 py-3">
                          <div>
                            <div className="text-sm font-medium text-navy">{post.title}</div>
                            <div className="text-xs text-gray-500">/{post.slug}</div>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600">
                          {post.category}
                        </td>
                        <td className="px-4 py-3 text-sm">
                          <button
                            onClick={() => togglePublish(post.id, post.isPublished)}
                            className={`px-2 py-1 rounded text-xs font-semibold ${
                              post.isPublished
                                ? 'bg-green-100 text-green-700'
                                : 'bg-yellow-100 text-yellow-700'
                            }`}
                          >
                            {post.isPublished ? 'Published' : 'Draft'}
                          </button>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <Eye className="h-3 w-3" />
                            {post.viewCount}
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600">
                          {post.publishedAt
                            ? new Date(post.publishedAt).toLocaleDateString('en-IN')
                            : '-'}
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <Link href={`/blog/${post.slug}`} target="_blank" rel="noopener noreferrer">
                              <button className="text-gray-500 hover:text-gray-700" title="View on site">
                                <Eye className="h-4 w-4" />
                              </button>
                            </Link>
                            <Link href={`/admin/blog/${post.id}`}>
                              <button className="text-custom-blue hover:text-blue-700" title="Edit">
                                <Edit className="h-4 w-4" />
                              </button>
                            </Link>
                            <button
                              onClick={() => deletePost(post.id)}
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
