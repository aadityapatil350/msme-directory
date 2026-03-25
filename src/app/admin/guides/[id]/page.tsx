'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
import { Save, BookOpen } from 'lucide-react'

type GuideFormData = {
  title: string
  slug: string
  excerpt: string
  content: string
  category: string
  schemeId: string
  loanId: string
  isPublished: boolean
  publishedAt: string
  metaTitle: string
  metaDescription: string
}

const CATEGORIES = [
  'Registration', 'Loans', 'Government Schemes', 'Compliance',
  'Certifications', 'Taxation', 'Export-Import', 'Technology'
]

export default function GuideEditorPage() {
  const router = useRouter()
  const params = useParams()
  const isNew = params.id === 'new'

  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(!isNew)
  const [isSaving, setIsSaving] = useState(false)

  const [formData, setFormData] = useState<GuideFormData>({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    category: 'Registration',
    schemeId: '',
    loanId: '',
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
      fetchGuide()
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

  const fetchGuide = async () => {
    try {
      const response = await fetch(`/api/admin/guides/${params.id}`)
      if (response.ok) {
        const data = await response.json()
        setFormData({
          ...data,
          schemeId: data.schemeId || '',
          loanId: data.loanId || '',
          publishedAt: data.publishedAt ? new Date(data.publishedAt).toISOString().slice(0, 16) : '',
        })
      }
    } catch (error) {
      console.error('Error fetching guide:', error)
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
        schemeId: formData.schemeId || null,
        loanId: formData.loanId || null,
      }

      const url = isNew ? '/api/admin/guides' : `/api/admin/guides/${params.id}`
      const method = isNew ? 'POST' : 'PATCH'

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (response.ok) {
        router.push('/admin/guides')
      } else {
        const error = await response.json()
        alert(error.error || 'Failed to save guide')
      }
    } catch (error) {
      console.error('Error saving guide:', error)
      alert('Failed to save guide')
    } finally {
      setIsSaving(false)
    }
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
        <p className="text-gray-600">Loading guide...</p>
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
              <Link href="/admin/guides" className="text-white hover:text-gray-200">
                <span className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Back
                </span>
              </Link>
              <div className="flex items-center gap-2">
                <BookOpen className="h-6 w-6 text-green-400" />
                <h1 className="text-2xl font-bold text-white">
                  {isNew ? 'New Guide' : 'Edit Guide'}
                </h1>
              </div>
            </div>
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
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-green-500"
                    placeholder="Enter guide title"
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
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-green-500"
                    placeholder="guide-slug"
                  />
                </div>
              </div>

              {/* Excerpt */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Excerpt * <span className="font-normal text-gray-500">(Short description)</span>
                </label>
                <textarea
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  rows={2}
                  maxLength={200}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-green-500"
                  placeholder="Brief summary of the guide..."
                />
                <p className="text-xs text-gray-500 mt-1">{formData.excerpt.length}/200</p>
              </div>

              {/* Category */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-green-500"
                  >
                    {CATEGORIES.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Related Scheme ID <span className="font-normal text-gray-500">(optional)</span>
                  </label>
                  <input
                    type="text"
                    value={formData.schemeId}
                    onChange={(e) => setFormData({ ...formData, schemeId: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-green-500"
                    placeholder="Scheme ID"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Related Loan ID <span className="font-normal text-gray-500">(optional)</span>
                  </label>
                  <input
                    type="text"
                    value={formData.loanId}
                    onChange={(e) => setFormData({ ...formData, loanId: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-green-500"
                    placeholder="Loan ID"
                  />
                </div>
              </div>

              {/* Content */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Content * <span className="font-normal text-gray-500">(Markdown-style formatting supported)</span>
                </label>
                <div className="text-xs text-gray-500 mb-2 bg-gray-50 p-2 rounded">
                  <strong>Formatting:</strong> Use # for H1, ## for H2, ### for H3, **text** for bold,
                  new lines for paragraphs
                </div>
                <textarea
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  rows={20}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-green-500 font-mono"
                  placeholder="# Guide Title

## Introduction
Start with an overview...

## Step 1: Getting Started
Explain the first step...

## Step 2: Documentation Required
- Document 1
- Document 2

## Conclusion
Wrap up the guide..."
                />
              </div>

              {/* SEO */}
              <div className="border-t border-gray-200 pt-6">
                <h2 className="text-lg font-bold text-[var(--navy)] mb-4 flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  SEO Settings
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Meta Title
                    </label>
                    <input
                      type="text"
                      value={formData.metaTitle}
                      onChange={(e) => setFormData({ ...formData, metaTitle: e.target.value })}
                      maxLength={60}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-green-500"
                      placeholder="SEO title for search engines"
                    />
                    <p className="text-xs text-gray-500 mt-1">{formData.metaTitle.length}/60</p>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Meta Description
                    </label>
                    <textarea
                      value={formData.metaDescription}
                      onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })}
                      rows={2}
                      maxLength={160}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-green-500"
                      placeholder="SEO description for search engines"
                    />
                    <p className="text-xs text-gray-500 mt-1">{formData.metaDescription.length}/160</p>
                  </div>
                </div>
              </div>

              {/* Publish Settings */}
              <div className="border-t border-gray-200 pt-6">
                <h2 className="text-lg font-bold text-[var(--navy)] mb-4">Publish Settings</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Status
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.isPublished}
                        onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
                        className="w-4 h-4 text-green-600 rounded"
                      />
                      <span className="text-sm">Published (visible on website)</span>
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
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-green-500"
                    />
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-6 border-t border-gray-200">
                <button
                  onClick={() => handleSave(false)}
                  disabled={isSaving}
                  className="flex-1 bg-gray-600 text-white text-sm font-semibold px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  <Save className="h-4 w-4" />
                  {isSaving ? 'Saving...' : 'Save Draft'}
                </button>
                <button
                  onClick={() => handleSave(true)}
                  disabled={isSaving}
                  className="flex-1 bg-green-600 text-white text-sm font-semibold px-6 py-3 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  <Save className="h-4 w-4" />
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
