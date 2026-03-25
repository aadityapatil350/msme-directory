'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  Plus, Edit, Trash2, Search, DollarSign, TrendingUp,
  Building, ArrowLeft, X, Save, Loader2
} from 'lucide-react'

type Loan = {
  id: string
  slug: string
  name: string
  provider: string
  providerLogo: string | null
  type: string
  minAmount: number
  maxAmount: number
  interestRateMin: number
  interestRateMax: number
  tenure: string
  eligibility: string
  documents: string[]
  features: string[]
  affiliateUrl: string | null
  isSponsored: boolean
  viewCount: number
  createdAt: string
  updatedAt: string
}

type FormData = Omit<Loan, 'id' | 'createdAt' | 'updatedAt' | 'viewCount' | 'documents' | 'features'> & {
  documents: string
  features: string
}

export default function AdminLoansPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loans, setLoans] = useState<Loan[]>([])
  const [filteredLoans, setFilteredLoans] = useState<Loan[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingLoan, setEditingLoan] = useState<Loan | null>(null)
  const [isSaving, setIsSaving] = useState(false)
  const router = useRouter()

  const emptyForm: FormData = {
    slug: '',
    name: '',
    provider: '',
    providerLogo: null,
    type: 'business',
    minAmount: 50000,
    maxAmount: 5000000,
    interestRateMin: 10,
    interestRateMax: 20,
    tenure: '12-60 months',
    eligibility: '',
    documents: 'PAN Card\nAadhar Card\nBusiness Registration\nGST Returns\nBank Statements',
    features: 'Quick approval\nCollateral-free loans\nFlexible repayment',
    affiliateUrl: '',
    isSponsored: false,
  }

  const [formData, setFormData] = useState<FormData>(emptyForm)

  useEffect(() => {
    const token = localStorage.getItem('admin_token')
    if (!token) {
      router.push('/admin/login')
      return
    }
    setIsAuthenticated(true)
    fetchLoans()
  }, [router])

  useEffect(() => {
    if (searchQuery) {
      setFilteredLoans(
        loans.filter(
          (loan) =>
            loan.provider.toLowerCase().includes(searchQuery.toLowerCase()) ||
            loan.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            loan.type.toLowerCase().includes(searchQuery.toLowerCase())
        )
      )
    } else {
      setFilteredLoans(loans)
    }
  }, [searchQuery, loans])

  const fetchLoans = async () => {
    try {
      const res = await fetch('/api/admin/loans')
      if (res.ok) {
        const data = await res.json()
        setLoans(data)
        setFilteredLoans(data)
      }
    } catch (error) {
      console.error('Error fetching loans:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCreate = () => {
    setEditingLoan(null)
    setFormData(emptyForm)
    setShowModal(true)
  }

  const handleEdit = (loan: Loan) => {
    setEditingLoan(loan)
    setFormData({
      slug: loan.slug,
      name: loan.name,
      provider: loan.provider,
      providerLogo: loan.providerLogo,
      type: loan.type,
      minAmount: loan.minAmount,
      maxAmount: loan.maxAmount,
      interestRateMin: loan.interestRateMin,
      interestRateMax: loan.interestRateMax,
      tenure: loan.tenure,
      eligibility: loan.eligibility,
      documents: loan.documents.join('\n'),
      features: loan.features.join('\n'),
      affiliateUrl: loan.affiliateUrl,
      isSponsored: loan.isSponsored,
    })
    setShowModal(true)
  }

  const handleSave = async () => {
    setIsSaving(true)
    try {
      const payload = {
        ...formData,
        documents: formData.documents.split('\n').map(d => d.trim()).filter(Boolean),
        features: formData.features.split('\n').map(f => f.trim()).filter(Boolean),
      }

      const url = editingLoan
        ? `/api/admin/loans/${editingLoan.id}`
        : '/api/admin/loans'

      const method = editingLoan ? 'PUT' : 'POST'

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (res.ok) {
        await fetchLoans()
        setShowModal(false)
        setFormData(emptyForm)
      } else {
        const error = await res.json()
        alert(`Error: ${error.error || 'Failed to save'}`)
      }
    } catch (error) {
      console.error('Error saving loan:', error)
      alert('Failed to save loan')
    } finally {
      setIsSaving(false)
    }
  }

  const handleDelete = async (id: string, provider: string) => {
    if (!confirm(`Are you sure you want to delete ${provider}? This cannot be undone.`)) {
      return
    }

    try {
      const res = await fetch(`/api/admin/loans/${id}`, { method: 'DELETE' })
      if (res.ok) {
        await fetchLoans()
      } else {
        alert('Failed to delete loan')
      }
    } catch (error) {
      console.error('Error deleting loan:', error)
      alert('Failed to delete loan')
    }
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen bg-[#f0f4ff]">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#0f1f3d] to-[#1a3a6e] px-6 py-4 shadow-md">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex items-center gap-4 mb-3">
            <Link href="/admin/dashboard">
              <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                <ArrowLeft className="h-5 w-5 text-white" />
              </button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-white">Manage Loans</h1>
              <p className="text-gray-300 text-sm">Add, edit, and manage MSME loan providers</p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mt-4">
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-4 py-3">
              <div className="text-white/70 text-xs mb-1">Total Loans</div>
              <div className="text-white text-2xl font-bold">{loans.length}</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-4 py-3">
              <div className="text-white/70 text-xs mb-1">Sponsored</div>
              <div className="text-white text-2xl font-bold">
                {loans.filter(l => l.isSponsored).length}
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-4 py-3">
              <div className="text-white/70 text-xs mb-1">Avg Rate</div>
              <div className="text-white text-2xl font-bold">
                {loans.length > 0
                  ? (loans.reduce((acc, l) => acc + l.interestRateMin, 0) / loans.length).toFixed(1)
                  : 0}%
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-6 py-6">
        <div className="max-w-[1400px] mx-auto">
          {/* Toolbar */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 mb-6">
            <div className="flex justify-between items-center gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search loans by provider, name, or type..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>
              <button
                onClick={handleCreate}
                className="flex items-center gap-2 bg-[var(--navy)] text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                <Plus className="h-4 w-4" />
                Add Loan
              </button>
            </div>
          </div>

          {/* Loans Table */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
            {isLoading ? (
              <div className="p-12 text-center text-gray-500">
                <Loader2 className="h-8 w-8 animate-spin mx-auto mb-2 text-gray-400" />
                Loading loans...
              </div>
            ) : filteredLoans.length === 0 ? (
              <div className="p-12 text-center text-gray-500">
                <DollarSign className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                <p className="font-medium mb-1">No loans found</p>
                <p className="text-sm">
                  {searchQuery
                    ? 'Try adjusting your search query'
                    : 'Click "Add Loan" to create your first loan'}
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">
                        Provider
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">
                        Loan Amount
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">
                        Interest Rate
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">
                        Tenure
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">
                        Type
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">
                        Status
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredLoans.map((loan) => (
                      <tr key={loan.id} className="hover:bg-blue-50 transition-colors">
                        <td className="px-4 py-3">
                          <div>
                            <div className="font-semibold text-sm text-gray-900">
                              {loan.provider}
                            </div>
                            <div className="text-xs text-gray-500">{loan.name}</div>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm font-medium text-green-600">
                          ₹{(loan.minAmount / 100000).toFixed(1)}L - ₹
                          {loan.maxAmount >= 10000000
                            ? (loan.maxAmount / 10000000).toFixed(1) + 'Cr'
                            : (loan.maxAmount / 100000).toFixed(0) + 'L'}
                        </td>
                        <td className="px-4 py-3 text-sm">
                          {loan.interestRateMin}% - {loan.interestRateMax}%
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600">{loan.tenure}</td>
                        <td className="px-4 py-3">
                          <span className="inline-block px-2 py-1 rounded text-xs font-semibold bg-blue-100 text-blue-700">
                            {loan.type}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          {loan.isSponsored ? (
                            <span className="inline-block px-2 py-1 rounded text-xs font-semibold bg-yellow-100 text-yellow-700">
                              Sponsored
                            </span>
                          ) : (
                            <span className="inline-block px-2 py-1 rounded text-xs font-semibold bg-gray-100 text-gray-700">
                              Regular
                            </span>
                          )}
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleEdit(loan)}
                              className="p-1.5 hover:bg-blue-100 rounded transition-colors text-blue-600"
                              title="Edit"
                            >
                              <Edit className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(loan.id, loan.provider)}
                              className="p-1.5 hover:bg-red-100 rounded transition-colors text-red-600"
                              title="Delete"
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

      {/* Create/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-900">
                {editingLoan ? 'Edit Loan' : 'Add New Loan'}
              </h2>
              <button
                onClick={() => {
                  setShowModal(false)
                  setFormData(emptyForm)
                }}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-4">
              {/* Basic Info */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Provider Name *
                  </label>
                  <input
                    type="text"
                    value={formData.provider}
                    onChange={(e) => setFormData({ ...formData, provider: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none"
                    placeholder="e.g., HDFC Bank"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Slug *
                  </label>
                  <input
                    type="text"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value.toLowerCase().replace(/\s+/g, '-') })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none"
                    placeholder="hdfc-bank-msme-loan"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Loan Product Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none"
                  placeholder="e.g., HDFC Bank MSME Loan"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Loan Type
                  </label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none"
                  >
                    <option value="business">Business Loan</option>
                    <option value="mudra">Mudra Loan</option>
                    <option value="collateral-free">Collateral-Free</option>
                    <option value="govt">Government Scheme</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tenure
                  </label>
                  <input
                    type="text"
                    value={formData.tenure}
                    onChange={(e) => setFormData({ ...formData, tenure: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none"
                    placeholder="12-60 months"
                  />
                </div>
              </div>

              {/* Loan Amount */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Min Amount (₹)
                  </label>
                  <input
                    type="number"
                    value={formData.minAmount}
                    onChange={(e) => setFormData({ ...formData, minAmount: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none"
                    placeholder="50000"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Max Amount (₹)
                  </label>
                  <input
                    type="number"
                    value={formData.maxAmount}
                    onChange={(e) => setFormData({ ...formData, maxAmount: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none"
                    placeholder="5000000"
                  />
                </div>
              </div>

              {/* Interest Rate */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Min Interest Rate (%)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={formData.interestRateMin}
                    onChange={(e) => setFormData({ ...formData, interestRateMin: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none"
                    placeholder="10"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Max Interest Rate (%)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={formData.interestRateMax}
                    onChange={(e) => setFormData({ ...formData, interestRateMax: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none"
                    placeholder="20"
                  />
                </div>
              </div>

              {/* Eligibility */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Eligibility Criteria
                </label>
                <textarea
                  value={formData.eligibility}
                  onChange={(e) => setFormData({ ...formData, eligibility: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none"
                  placeholder="Age 21-65, Business 2+ years old, Minimum turnover..."
                />
              </div>

              {/* Documents */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Required Documents (one per line)
                </label>
                <textarea
                  value={formData.documents}
                  onChange={(e) => setFormData({ ...formData, documents: e.target.value })}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none font-mono"
                  placeholder="PAN Card&#10;Aadhar Card&#10;Business Registration"
                />
              </div>

              {/* Features */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Key Features (one per line)
                </label>
                <textarea
                  value={formData.features}
                  onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none font-mono"
                  placeholder="Collateral-free loans&#10;Quick approval&#10;Flexible repayment"
                />
              </div>

              {/* Affiliate URL */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Affiliate/Apply URL
                </label>
                <input
                  type="url"
                  value={formData.affiliateUrl || ''}
                  onChange={(e) => setFormData({ ...formData, affiliateUrl: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none"
                  placeholder="https://example.com/apply"
                />
              </div>

              {/* Sponsored */}
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="isSponsored"
                  checked={formData.isSponsored}
                  onChange={(e) => setFormData({ ...formData, isSponsored: e.target.checked })}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                />
                <label htmlFor="isSponsored" className="text-sm font-medium text-gray-700">
                  Mark as Sponsored/Featured
                </label>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 px-6 py-4 flex justify-end gap-3">
              <button
                onClick={() => {
                  setShowModal(false)
                  setFormData(emptyForm)
                }}
                className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={isSaving || !formData.provider || !formData.slug || !formData.name}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSaving ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4" />
                    Save Loan
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
