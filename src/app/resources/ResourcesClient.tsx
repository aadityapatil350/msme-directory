'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'

type Guide = {
  id: string
  slug: string
  title: string
  excerpt: string
  category: string
  publishedAt: Date | null
  viewCount: number
}

type BlogPost = {
  id: string
  slug: string
  title: string
  excerpt: string
  category: string
  tags: string[]
  authorName: string
  publishedAt: Date | null
  viewCount: number
}

export default function ResourcesClient({
  guides,
  blogs,
}: {
  guides: Guide[]
  blogs: BlogPost[]
}) {
  const [activeTab, setActiveTab] = useState<'all' | 'guides' | 'blogs'>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  // Combine guides and blogs for "All" view
  const allResources = useMemo(() => {
    const guidesWithType = guides.map(g => ({ ...g, type: 'guide' as const }))
    const blogsWithType = blogs.map(b => ({ ...b, type: 'blog' as const }))
    return [...guidesWithType, ...blogsWithType].sort((a, b) => {
      const dateA = a.publishedAt ? new Date(a.publishedAt).getTime() : 0
      const dateB = b.publishedAt ? new Date(b.publishedAt).getTime() : 0
      return dateB - dateA
    })
  }, [guides, blogs])

  // Get unique categories
  const categories = useMemo(() => {
    const guideCategories = guides.map(g => g.category)
    const blogCategories = blogs.map(b => b.category)
    return Array.from(new Set([...guideCategories, ...blogCategories])).sort()
  }, [guides, blogs])

  // Filter resources
  const filteredResources = useMemo(() => {
    let resources = activeTab === 'guides'
      ? guides.map(g => ({ ...g, type: 'guide' as const }))
      : activeTab === 'blogs'
      ? blogs.map(b => ({ ...b, type: 'blog' as const }))
      : allResources

    // Search filter
    if (searchQuery) {
      resources = resources.filter(r =>
        r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Category filter
    if (selectedCategory !== 'all') {
      resources = resources.filter(r => r.category === selectedCategory)
    }

    return resources
  }, [activeTab, searchQuery, selectedCategory, guides, blogs, allResources])

  const formatDate = (date: Date | null) => {
    if (!date) return ''
    return new Date(date).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    })
  }

  return (
    <div className="min-h-screen bg-[#f0f4ff]">
      {/* Header */}
      <div className="bg-gradient-to-br from-[var(--navy)] to-[#1a3a6e] px-4 md:px-6 py-12">
        <div className="max-w-[1400px] mx-auto">
          <h1 className="font-['Syne'] text-4xl font-extrabold text-white mb-3">
            📚 MSME Resources Hub
          </h1>
          <p className="text-[#94a3b8] text-lg mb-6">
            {guides.length} Expert Guides + {blogs.length} Insightful Blog Posts = Your Complete MSME Success Library
          </p>

          {/* Search Bar */}
          <div className="relative max-w-2xl">
            <input
              type="text"
              placeholder="Search guides, tutorials, blogs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-5 py-4 pr-14 rounded-lg border border-gray-300 outline-none focus:border-[var(--blue)] text-sm shadow-lg"
            />
            <svg className="absolute right-5 top-4.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Tabs & Filters */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-[1400px] mx-auto px-4 md:px-6 py-4">
          {/* Tabs */}
          <div className="flex gap-2 mb-4">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-6 py-2.5 rounded-lg font-semibold text-sm transition-colors ${
                activeTab === 'all'
                  ? 'bg-[var(--navy)] text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              All Resources ({guides.length + blogs.length})
            </button>
            <button
              onClick={() => setActiveTab('guides')}
              className={`px-6 py-2.5 rounded-lg font-semibold text-sm transition-colors ${
                activeTab === 'guides'
                  ? 'bg-[var(--navy)] text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              📖 Guides ({guides.length})
            </button>
            <button
              onClick={() => setActiveTab('blogs')}
              className={`px-6 py-2.5 rounded-lg font-semibold text-sm transition-colors ${
                activeTab === 'blogs'
                  ? 'bg-[var(--navy)] text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              ✍️ Blog Posts ({blogs.length})
            </button>
          </div>

          {/* Category Filter */}
          <div className="flex gap-2 items-center flex-wrap">
            <span className="text-sm font-semibold text-gray-600">Filter by Category:</span>
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-1.5 rounded-full text-xs font-medium transition-colors ${
                selectedCategory === 'all'
                  ? 'bg-[var(--blue)] text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              All
            </button>
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-1.5 rounded-full text-xs font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-[var(--blue)] text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Results Counter */}
          <div className="mt-3 text-sm text-gray-600">
            Showing <strong className="text-[var(--navy)]">{filteredResources.length}</strong> resources
            {searchQuery && ` for "${searchQuery}"`}
            {selectedCategory !== 'all' && ` in ${selectedCategory}`}
          </div>
        </div>
      </div>

      {/* Resources Grid */}
      <div className="max-w-[1400px] mx-auto px-4 md:px-6 py-8">
        {filteredResources.length === 0 ? (
          <div className="bg-white border border-gray-200 rounded-xl p-12 text-center">
            <p className="text-gray-500 text-lg mb-4">
              No resources found matching your criteria.
            </p>
            <button
              onClick={() => {
                setSearchQuery('')
                setSelectedCategory('all')
                setActiveTab('all')
              }}
              className="bg-[var(--blue)] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#1e40af] transition-colors"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.map((resource) => (
              <div key={resource.id} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-xl transition-shadow group">
                <Link
                  href={resource.type === 'guide' ? `/guides/${resource.slug}` : `/blog/${resource.slug}`}
                  className="block"
                >
                {/* Badge */}
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                    resource.type === 'guide'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-blue-100 text-blue-700'
                  }`}>
                    {resource.type === 'guide' ? '📖 Guide' : '✍️ Blog'}
                  </span>
                  <span className="text-xs text-gray-500">{resource.viewCount} views</span>
                </div>

                {/* Title */}
                <h3 className="font-['Syne'] text-lg font-bold text-[var(--navy)] mb-2 group-hover:text-[var(--blue)] transition-colors line-clamp-2">
                  {resource.title}
                </h3>

                {/* Excerpt */}
                <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                  {resource.excerpt}
                </p>

                {/* Meta */}
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span className="bg-gray-100 px-2 py-1 rounded">{resource.category}</span>
                  <span>{formatDate(resource.publishedAt)}</span>
                </div>

                  {/* Read More Arrow */}
                  <div className="mt-4 flex items-center text-[var(--blue)] text-sm font-semibold group-hover:translate-x-2 transition-transform">
                    Read more →
                  </div>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* CTA Section */}
      <div className="max-w-[1400px] mx-auto px-4 md:px-6 py-12">
        <div className="bg-gradient-to-br from-[#f0fdf4] to-[#dcfce7] border border-gray-200 rounded-2xl p-8 text-center">
          <h2 className="font-['Syne'] text-2xl font-bold text-[var(--navy)] mb-3">
            Can't Find What You're Looking For?
          </h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Connect with expert MSME consultants who can provide personalized guidance for your business needs.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/consultants">
              <button className="bg-[var(--money)] text-white px-8 py-3 rounded-lg font-bold hover:bg-green-700 transition-colors">
                Find Expert Consultants →
              </button>
            </Link>
            <Link href="/loans">
              <button className="bg-[var(--blue)] text-white px-8 py-3 rounded-lg font-bold hover:bg-[#1e40af] transition-colors">
                Explore Loan Options →
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
