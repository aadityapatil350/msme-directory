'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
import { Save, X } from 'lucide-react'

type SchemeFormData = {
  name: string
  slug: string
  shortDescription: string
  description: string
  type: string
  state: string
  sector: string[]
  minAmount: string
  maxAmount: string
  eligibility: string
  documents: string[]
  applyUrl: string
  benefits: string
  isActive: boolean
  isFeatured: boolean
  isSponsored: boolean
  sponsoredUntil: string
}

const INDIAN_STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
  'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
  'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
  'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
  'Delhi'
]

const SECTORS = [
  'Manufacturing', 'Services', 'Trading', 'Agriculture', 'Technology',
  'Healthcare', 'Education', 'Tourism', 'Textiles', 'Food Processing'
]

export default function SchemeEditorPage() {
  const router = useRouter()
  const params = useParams()
  const isNew = params.id === 'new'

  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(!isNew)
  const [isSaving, setIsSaving] = useState(false)
  const [documentInput, setDocumentInput] = useState('')

  const [formData, setFormData] = useState<SchemeFormData>({
    name: '',
    slug: '',
    shortDescription: '',
    description: '',
    type: 'central',
    state: '',
    sector: [],
    minAmount: '',
    maxAmount: '',
    eligibility: '',
    documents: [],
    applyUrl: '',
    benefits: '',
    isActive: true,
    isFeatured: false,
    isSponsored: false,
    sponsoredUntil: '',
  })

  useEffect(() => {
    const token = localStorage.getItem('admin_token')
    if (!token) {
      router.push('/admin/login')
      return
    }
    setIsAuthenticated(true)

    if (!isNew) {
      fetchScheme()
    }
  }, [router, isNew, params.id])

  // Auto-generate slug from name
  useEffect(() => {
    if (isNew && formData.name) {
      const slug = formData.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '')
      setFormData(prev => ({ ...prev, slug }))
    }
  }, [formData.name, isNew])

  const fetchScheme = async () => {
    try {
      const response = await fetch(`/api/admin/schemes/${params.id}`)
      if (response.ok) {
        const data = await response.json()
        setFormData({
          ...data,
          minAmount: data.minAmount?.toString() || '',
          maxAmount: data.maxAmount?.toString() || '',
          state: data.state || '',
          sponsoredUntil: data.sponsoredUntil ? new Date(data.sponsoredUntil).toISOString().split('T')[0] : '',
        })
      }
    } catch (error) {
      console.error('Error fetching scheme:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSave = async () => {
    if (!formData.name || !formData.slug || !formData.shortDescription) {
      alert('Please fill in required fields: Name, Slug, and Short Description')
      return
    }

    setIsSaving(true)

    try {
      const payload = {
        ...formData,
        minAmount: formData.minAmount ? parseFloat(formData.minAmount) : null,
        maxAmount: formData.maxAmount ? parseFloat(formData.maxAmount) : null,
        state: formData.type === 'state' ? formData.state : null,
        sponsoredUntil: formData.isSponsored && formData.sponsoredUntil
          ? new Date(formData.sponsoredUntil).toISOString()
          : null,
      }

      const url = isNew ? '/api/admin/schemes' : `/api/admin/schemes/${params.id}`
      const method = isNew ? 'POST' : 'PATCH'

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (response.ok) {
        router.push('/admin/schemes')
      } else {
        const error = await response.json()
        alert(error.error || 'Failed to save scheme')
      }
    } catch (error) {
      console.error('Error saving scheme:', error)
      alert('Failed to save scheme')
    } finally {
      setIsSaving(false)
    }
  }

  const toggleSector = (sector: string) => {
    setFormData(prev => ({
      ...prev,
      sector: prev.sector.includes(sector)
        ? prev.sector.filter(s => s !== sector)
        : [...prev.sector, sector]
    }))
  }

  const addDocument = () => {
    if (documentInput.trim()) {
      setFormData(prev => ({
        ...prev,
        documents: [...prev.documents, documentInput.trim()]
      }))
      setDocumentInput('')
    }
  }

  const removeDocument = (index: number) => {
    setFormData(prev => ({
      ...prev,
      documents: prev.documents.filter((_, i) => i !== index)
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
        <p className="text-gray-600">Loading scheme...</p>
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
              <Link href="/admin/schemes" className="text-white hover:text-gray-200">
                ← Back
              </Link>
              <h1 className="text-2xl font-bold text-white">
                {isNew ? 'Create New Scheme' : 'Edit Scheme'}
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
              {/* Basic Information */}
              <div>
                <h2 className="text-lg font-bold text-navy mb-4">Basic Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Scheme Name *
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-custom-blue"
                      placeholder="PM Mudra Yojana"
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
                      placeholder="pm-mudra-yojana"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Short Description * <span className="font-normal text-gray-500">(Max 120 chars)</span>
                    </label>
                    <input
                      type="text"
                      value={formData.shortDescription}
                      onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                      maxLength={120}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-custom-blue"
                      placeholder="Collateral-free loans for micro and small enterprises"
                    />
                    <p className="text-xs text-gray-500 mt-1">{formData.shortDescription.length}/120</p>
                  </div>
                </div>
              </div>

              {/* Type & Location */}
              <div>
                <h2 className="text-lg font-bold text-navy mb-4">Type & Location</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Scheme Type
                    </label>
                    <select
                      value={formData.type}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-custom-blue"
                    >
                      <option value="central">Central</option>
                      <option value="state">State</option>
                      <option value="sector">Sector-Specific</option>
                    </select>
                  </div>

                  {formData.type === 'state' && (
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        State
                      </label>
                      <select
                        value={formData.state}
                        onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-custom-blue"
                      >
                        <option value="">Select State</option>
                        {INDIAN_STATES.map(state => (
                          <option key={state} value={state.toLowerCase().replace(/\s+/g, '-')}>
                            {state}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>
              </div>

              {/* Sectors */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Applicable Sectors (select multiple)
                </label>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                  {SECTORS.map(sector => (
                    <label key={sector} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.sector.includes(sector)}
                        onChange={() => toggleSector(sector)}
                        className="w-4 h-4 text-custom-blue rounded"
                      />
                      <span className="text-sm">{sector}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Amount Range */}
              <div>
                <h2 className="text-lg font-bold text-navy mb-4">Funding Amount</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Minimum Amount (₹)
                    </label>
                    <input
                      type="number"
                      value={formData.minAmount}
                      onChange={(e) => setFormData({ ...formData, minAmount: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-custom-blue"
                      placeholder="50000"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Maximum Amount (₹)
                    </label>
                    <input
                      type="number"
                      value={formData.maxAmount}
                      onChange={(e) => setFormData({ ...formData, maxAmount: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-custom-blue"
                      placeholder="1000000"
                    />
                  </div>
                </div>
              </div>

              {/* Description & Details */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Full Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={6}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-custom-blue"
                  placeholder="Detailed description of the scheme..."
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Eligibility Criteria
                </label>
                <textarea
                  value={formData.eligibility}
                  onChange={(e) => setFormData({ ...formData, eligibility: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-custom-blue"
                  placeholder="Who can apply for this scheme..."
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Key Benefits
                </label>
                <textarea
                  value={formData.benefits}
                  onChange={(e) => setFormData({ ...formData, benefits: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-custom-blue"
                  placeholder="Benefits of this scheme..."
                />
              </div>

              {/* Documents Required */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Required Documents
                </label>
                <div className="flex gap-2 mb-3">
                  <input
                    type="text"
                    value={documentInput}
                    onChange={(e) => setDocumentInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addDocument()}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-custom-blue"
                    placeholder="Aadhar Card, PAN Card, etc."
                  />
                  <button
                    type="button"
                    onClick={addDocument}
                    className="bg-custom-blue text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-custom-blue-dark"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.documents.map((doc, index) => (
                    <div key={index} className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-lg">
                      <span className="text-sm">{doc}</span>
                      <button
                        type="button"
                        onClick={() => removeDocument(index)}
                        className="text-gray-500 hover:text-red-600"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Apply URL */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Application URL
                </label>
                <input
                  type="url"
                  value={formData.applyUrl}
                  onChange={(e) => setFormData({ ...formData, applyUrl: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-custom-blue"
                  placeholder="https://..."
                />
              </div>

              {/* Status Toggles */}
              <div>
                <h2 className="text-lg font-bold text-navy mb-4">Status & Visibility</h2>
                <div className="space-y-3">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.isActive}
                      onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                      className="w-4 h-4 text-custom-blue rounded"
                    />
                    <span className="text-sm font-medium">Active (visible on website)</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.isFeatured}
                      onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                      className="w-4 h-4 text-custom-blue rounded"
                    />
                    <span className="text-sm font-medium">Featured (show on homepage)</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.isSponsored}
                      onChange={(e) => setFormData({ ...formData, isSponsored: e.target.checked })}
                      className="w-4 h-4 text-custom-blue rounded"
                    />
                    <span className="text-sm font-medium">Sponsored</span>
                  </label>

                  {formData.isSponsored && (
                    <div className="ml-6">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Sponsored Until
                      </label>
                      <input
                        type="date"
                        value={formData.sponsoredUntil}
                        onChange={(e) => setFormData({ ...formData, sponsoredUntil: e.target.value })}
                        className="px-4 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-custom-blue"
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-6 border-t border-gray-200">
                <button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="flex-1 flex items-center justify-center gap-2 bg-custom-orange text-white text-sm font-semibold px-6 py-3 rounded-lg hover:bg-custom-orange-dark transition-colors disabled:opacity-50"
                >
                  <Save className="h-4 w-4" />
                  {isSaving ? 'Saving...' : 'Save Scheme'}
                </button>
                <Link href="/admin/schemes" className="flex-1">
                  <button className="w-full bg-white border border-gray-300 text-gray-700 text-sm font-semibold px-6 py-3 rounded-lg hover:bg-blue-100 transition-colors">
                    Cancel
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
