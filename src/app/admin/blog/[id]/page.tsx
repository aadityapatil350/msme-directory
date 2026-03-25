'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
import { Save, X } from 'lucide-react'

type BlogFormData = {
  title: string
  slug: string
  excerpt: string
  content: string
  category: string
  tags: string[]
  coverImage: string
  authorName: string
  authorAvatar: string
  isPublished: boolean
  publishedAt: string
  metaTitle: string
  metaDescription: string
}

const CATEGORIES = [
  'Policy Update', 'Loan Updates', 'Tax & Compliance', 'Success Stories',
  'Business Tips', 'Government Schemes', 'Industry News'
]

export default function BlogEditorPage() {
  const router = useRouter()
  const params = useParams()
  const isNew = params.id === 'new'

  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(!isNew)
  const [isSaving, setIsSaving] = useState(false)
  const [tagInput, setTagInput] = useState('')

  const [formData, setFormData] = useState<BlogFormData>({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    category: 'Policy Update',
    tags: [],
    coverImage: '',
    authorName: '',
    authorAvatar: '',
    isPublished: false,
    publishedAt: '',
    metaTitle: '',
    metaDescription: '',
  })

  useEffect(() => {
    const token = localStorage.getItem('admin_token')
    if (!token) {
      router.push('/admin/login')
      return
    }
    setIsAuthenticated(true)

    if (!isNew) {
      fetchPost()
    }
  }, [router, isNew, params.id])

  // Auto-generate slug from title
  useEffect(() => {
    if (isNew && formData.title) {
      const slug = formData.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '')
      setFormData(prev => ({ ...prev, slug }))
    }
  }, [formData.title, isNew])

  const fetchPost = async () => {
    try {
      const response = await fetch(`/api/admin/blog/${params.id}`)
      if (response.ok) {
        const data = await response.json()
        setFormData({
          ...data,
          tags: data.tags || [],
          publishedAt: data.publishedAt ? new Date(data.publishedAt).toISOString().slice(0, 16) : '',
        })
      }
    } catch (error) {
      console.error('Error fetching post:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSave = async (publish = false) => {
    if (!formData.title || !formData.slug || !formData.content) {
      alert('Please fill in required fields: Title, Slug, and Content')
      return
    }

    setIsSaving(true)

    try {
      const payload = {
        ...formData,
        isPublished: publish || formData.isPublished,
        publishedAt: publish && !formData.publishedAt ? new Date().toISOString() :
                    publish ? formData.publishedAt :
                    null,
        tags: formData.tags.filter(t => t.trim()),
      }

      const url = isNew ? '/api/admin/blog' : `/api/admin/blog/${params.id}`
      const method = isNew ? 'POST' : 'PATCH'

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (response.ok) {
        router.push('/admin/blog')
      } else {
        const error = await response.json()
        alert(error.error || 'Failed to save post')
      }
    } catch (error) {
      console.error('Error saving post:', error)
      alert('Failed to save post')
    } finally {
      setIsSaving(false)
    }
  }

  const addTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()]
      }))
      setTagInput('')
    }
  }

  const removeTag = (index: number) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter((_, i) => i !== index)
    }))
  }

  const handleLogout = () => {
    localStorage.removeItem('admin_token')
    router.push('/admin/login')
  }

  if (!isAuthenticated) {
    return null
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#f0f4ff] flex items-center justify-center">
        <p className="text-gray-600">Loading post...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#f0f4ff]">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#0f1f3d] to-[#1a3a6e] px-6 py-4 shadow-md">
        <div className="max-w-[1200px] mx-auto flex justify-between items-center">
          <div>
            <div className="flex items-center gap-3">
              <Link href="/admin/blog" className="text-white hover:text-gray-200">
                ← Back
              </Link>
              <h1 className="text-2xl font-bold text-white">
                {isNew ? 'New Blog Post' : 'Edit Blog Post'}
              </h1>
            </div>
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
        <div className="max-w-[1200px] mx-auto">
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
            <div className="space-y-6">
              {/* Title & Slug */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Title *
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-custom-blue"
                    placeholder="Enter post title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Slug * <span className="font-normal text-gray-500">(URL-friendly)</span>
                  </label>
                  <input
                    type="text"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-custom-blue"
                    placeholder="blog-post-slug"
                  />
                </div>
              </div>

              {/* Excerpt */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Excerpt * <span className="font-normal text-gray-500">(Short description shown in list view)</span>
                </label>
                <input
                  type="text"
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  maxLength={160}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-custom-blue"
                  placeholder="Brief summary of the post..."
                />
                <p className="text-xs text-gray-500 mt-1">{formData.excerpt.length}/160</p>
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Category
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-custom-blue"
                >
                  {CATEGORIES.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              {/* Tags */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Tags
                </label>
                <div className="flex gap-2 mb-3">
                  <input
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addTag()}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-custom-blue"
                    placeholder="Add tags (press Enter to add)"
                  />
                  <button
                    type="button"
                    onClick={addTag}
                    className="bg-custom-blue text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-custom-blue-dark"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.tags.map((tag, index) => (
                    <div key={index} className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-lg">
                      <span className="text-sm">{tag}</span>
                      <button
                        type="button"
                        onClick={() => removeTag(index)}
                        className="text-gray-500 hover:text-red-600"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Cover Image */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Cover Image URL
                </label>
                <input
                  type="url"
                  value={formData.coverImage}
                  onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-custom-blue"
                  placeholder="https://..."
                />
                {formData.coverImage && (
                  <div className="mt-3">
                    <img
                      src={formData.coverImage}
                      alt="Cover preview"
                      className="h-48 w-auto object-cover rounded-lg border border-gray-200"
                    />
                  </div>
                )}
              </div>

              {/* Author Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Author Name
                  </label>
                  <input
                    type="text"
                    value={formData.authorName}
                    onChange={(e) => setFormData({ ...formData, authorName: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-custom-blue"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Author Avatar URL
                  </label>
                  <input
                    type="url"
                    value={formData.authorAvatar}
                    onChange={(e) => setFormData({ ...formData, authorAvatar: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-custom-blue"
                    placeholder="https://..."
                  />
                </div>
              </div>

              {/* Content */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Content * <span className="font-normal text-gray-500">(HTML format)</span>
                </label>
                <textarea
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  rows={15}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-custom-blue font-mono"
                  placeholder="<h2>Heading</h2><p>Your content here...</p>"
                />
              </div>

              {/* SEO */}
              <div>
                <h2 className="text-lg font-bold text-navy mb-4">SEO Settings</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Meta Title
                    </label>
                    <input
                      type="text"
                      value={formData.metaTitle}
                      onChange={(e) => setFormData({ ...formData, metaTitle: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-custom-blue"
                      placeholder="SEO title for search engines"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Meta Description
                    </label>
                    <textarea
                      value={formData.metaDescription}
                      onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })}
                      rows={3}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-custom-blue"
                      placeholder="SEO description for search engines"
                    />
                  </div>
                </div>
              </div>

              {/* Publish Settings */}
              <div>
                <h2 className="text-lg font-bold text-navy mb-4">Publish Settings</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Published
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.isPublished}
                        onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
                        className="w-4 h-4 text-custom-blue rounded"
                      />
                      <span className="text-sm">Visible on website</span>
                    </label>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Published At
                    </label>
                    <input
                      type="datetime-local"
                      value={formData.publishedAt}
                      onChange={(e) => setFormData({ ...formData, publishedAt: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-custom-blue"
                    />
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-6 border-t border-gray-200">
                <button
                  onClick={() => handleSave(false)}
                  disabled={isSaving}
                  className="flex-1 bg-gray-600 text-white text-sm font-semibold px-6 py-3 rounded-lg hover:bg-custom-gray-dark transition-colors disabled:opacity-50"
                >
                  <Save className="h-4 w-4 mr-2 inline" />
                  {isSaving ? 'Saving...' : 'Save Draft'}
                </button>
                <button
                  onClick={() => handleSave(true)}
                  disabled={isSaving}
                  className="flex-1 bg-custom-orange text-white text-sm font-semibold px-6 py-3 rounded-lg hover:bg-custom-orange-dark transition-colors disabled:opacity-50"
                >
                  <Save className="h-4 w-4 mr-2 inline" />
                  {isSaving ? 'Publishing...' : 'Publish'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
