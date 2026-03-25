'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Save, CheckCircle } from 'lucide-react'

const INDIAN_STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
  'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
  'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
  'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
  'Delhi', 'Chandigarh', 'Puducherry'
]

const SERVICES = [
  'MSME Loans', 'Mudra Loans', 'GST Registration', 'GST Filing',
  'Udyam Registration', 'ITR Filing', 'Company Registration',
  'Trademark Registration', 'FSSAI License', 'Import Export Code',
  'Compliance & Audit', 'Business Advisory', 'Tax Planning', 'Bookkeeping'
]

type Consultant = {
  id: string
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
}

export default function UserEditPage() {
  const [consultant, setConsultant] = useState<Consultant | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [isSaved, setIsSaved] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const [formData, setFormData] = useState({
    name: '',
    firmName: '',
    designation: '',
    city: '',
    state: '',
    services: [] as string[],
    phone: '',
    website: '',
    bio: '',
    experience: '',
  })

  useEffect(() => {
    fetchConsultant()
  }, [])

  const fetchConsultant = async () => {
    try {
      const res = await fetch('/api/user/me')
      if (!res.ok) {
        router.push('/user/login')
        return
      }
      const data = await res.json()
      if (!data.consultant) {
        router.push('/user/dashboard')
        return
      }
      const c = data.consultant
      setConsultant(c)
      setFormData({
        name: c.name || '',
        firmName: c.firmName || '',
        designation: c.designation || '',
        city: c.city || '',
        state: c.state || '',
        services: c.services || [],
        phone: c.phone || '',
        website: c.website || '',
        bio: c.bio || '',
        experience: c.experience?.toString() || '',
      })
    } catch (error) {
      router.push('/user/login')
    } finally {
      setIsLoading(false)
    }
  }

  const handleServiceToggle = (service: string) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter(s => s !== service)
        : [...prev.services, service]
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    setError('')
    setIsSaved(false)

    try {
      const res = await fetch('/api/user/consultant', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!res.ok) {
        throw new Error('Failed to save changes')
      }

      setIsSaved(true)
      setTimeout(() => setIsSaved(false), 3000)
    } catch (err) {
      setError('Failed to save changes. Please try again.')
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#f0f4ff] flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-[var(--blue)] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (!consultant) {
    return null
  }

  return (
    <div className="min-h-screen bg-[#f0f4ff]">
      {/* Header */}
      <div className="bg-gradient-to-br from-[var(--navy)] via-[#1a3a6e] to-[#0f2d5a] px-4 md:px-6 py-6">
        <div className="max-w-[800px] mx-auto">
          <Link
            href="/user/dashboard"
            className="inline-flex items-center gap-2 text-white/80 hover:text-white text-sm mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Link>
          <h1 className="font-['Syne'] text-2xl font-extrabold text-white">
            Edit Your Listing
          </h1>
          <p className="text-blue-200 text-sm mt-1">
            Update your firm details and services
          </p>
        </div>
      </div>

      {/* Form */}
      <div className="px-4 md:px-6 py-8">
        <div className="max-w-[800px] mx-auto">
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            {/* Success/Error Messages */}
            {isSaved && (
              <div className="bg-green-50 border-b border-green-200 px-6 py-4 flex items-center gap-3 text-green-700">
                <CheckCircle className="w-5 h-5" />
                <span className="font-medium">Changes saved successfully!</span>
              </div>
            )}
            {error && (
              <div className="bg-red-50 border-b border-red-200 px-6 py-4 text-red-700">
                {error}
              </div>
            )}

            <div className="p-6 space-y-6">
              {/* Firm Details */}
              <div>
                <h3 className="font-semibold text-[var(--navy)] mb-4 flex items-center gap-2">
                  <span className="w-6 h-6 bg-[var(--blue)] text-white rounded-full text-xs flex items-center justify-center">1</span>
                  Firm Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Firm Name *</label>
                    <input
                      type="text"
                      value={formData.firmName}
                      onChange={(e) => setFormData({ ...formData, firmName: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm outline-none focus:border-[var(--blue)] focus:ring-2 focus:ring-blue-50"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
                    <input
                      type="url"
                      value={formData.website}
                      onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm outline-none focus:border-[var(--blue)] focus:ring-2 focus:ring-blue-50"
                      placeholder="https://example.com"
                    />
                  </div>
                </div>
              </div>

              {/* Contact Person */}
              <div>
                <h3 className="font-semibold text-[var(--navy)] mb-4 flex items-center gap-2">
                  <span className="w-6 h-6 bg-[var(--blue)] text-white rounded-full text-xs flex items-center justify-center">2</span>
                  Contact Person
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm outline-none focus:border-[var(--blue)] focus:ring-2 focus:ring-blue-50"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Designation</label>
                    <input
                      type="text"
                      value={formData.designation}
                      onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm outline-none focus:border-[var(--blue)] focus:ring-2 focus:ring-blue-50"
                      placeholder="Chartered Accountant"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm outline-none focus:border-[var(--blue)] focus:ring-2 focus:ring-blue-50"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      value={consultant.email}
                      disabled
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm bg-gray-50 text-gray-500"
                    />
                    <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
                  </div>
                </div>
              </div>

              {/* Location */}
              <div>
                <h3 className="font-semibold text-[var(--navy)] mb-4 flex items-center gap-2">
                  <span className="w-6 h-6 bg-[var(--blue)] text-white rounded-full text-xs flex items-center justify-center">3</span>
                  Location
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">City *</label>
                    <input
                      type="text"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm outline-none focus:border-[var(--blue)] focus:ring-2 focus:ring-blue-50"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">State *</label>
                    <select
                      value={formData.state}
                      onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm outline-none focus:border-[var(--blue)] focus:ring-2 focus:ring-blue-50 bg-white"
                      required
                    >
                      <option value="">Select State</option>
                      {INDIAN_STATES.map(state => (
                        <option key={state} value={state}>{state}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Experience & Services */}
              <div>
                <h3 className="font-semibold text-[var(--navy)] mb-4 flex items-center gap-2">
                  <span className="w-6 h-6 bg-[var(--blue)] text-white rounded-full text-xs flex items-center justify-center">4</span>
                  Experience & Services
                </h3>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Years of Experience</label>
                  <input
                    type="number"
                    value={formData.experience}
                    onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                    className="w-full md:w-1/2 px-4 py-3 border border-gray-200 rounded-lg text-sm outline-none focus:border-[var(--blue)] focus:ring-2 focus:ring-blue-50"
                    placeholder="10"
                    min="0"
                    max="50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Services Offered * <span className="text-gray-400 font-normal">(Select at least 1)</span>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {SERVICES.map(service => (
                      <button
                        key={service}
                        type="button"
                        onClick={() => handleServiceToggle(service)}
                        className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                          formData.services.includes(service)
                            ? 'bg-[var(--blue)] text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {service}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bio */}
              <div>
                <h3 className="font-semibold text-[var(--navy)] mb-4 flex items-center gap-2">
                  <span className="w-6 h-6 bg-[var(--blue)] text-white rounded-full text-xs flex items-center justify-center">5</span>
                  About Your Firm
                </h3>
                <textarea
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm outline-none focus:border-[var(--blue)] focus:ring-2 focus:ring-blue-50"
                  rows={5}
                  placeholder="Tell potential clients about your firm, specializations, achievements, and why they should choose you..."
                />
              </div>
            </div>

            {/* Submit */}
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-between items-center">
              <Link
                href="/user/dashboard"
                className="text-gray-600 hover:text-gray-800 text-sm"
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={isSaving || formData.services.length === 0}
                className="flex items-center gap-2 bg-[var(--blue)] text-white px-6 py-2.5 rounded-lg font-semibold text-sm hover:bg-[#1e40af] transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                {isSaving ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    Save Changes
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
