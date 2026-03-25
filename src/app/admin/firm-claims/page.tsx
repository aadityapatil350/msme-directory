'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  ArrowLeft,
  CheckCircle,
  XCircle,
  Clock,
  Building2,
  User,
  Mail,
  Phone,
  MapPin,
  MessageSquare,
  Unlink,
} from 'lucide-react'

type Claim = {
  id: string
  status: string
  message: string | null
  adminNotes: string | null
  createdAt: string
  user: {
    id: string
    name: string
    email: string
    phone: string | null
  }
  consultant: {
    id: string
    firmName: string
    name: string
    city: string
    state: string
    email: string
    phone: string
  }
}

export default function AdminFirmClaimsPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [claims, setClaims] = useState<Claim[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [filter, setFilter] = useState<string>('pending')
  const [selectedClaim, setSelectedClaim] = useState<Claim | null>(null)
  const [adminNotes, setAdminNotes] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('admin_token')
    if (!token) {
      router.push('/admin/login')
      return
    }
    setIsAuthenticated(true)
  }, [router])

  useEffect(() => {
    if (isAuthenticated) {
      fetchClaims()
    }
  }, [filter, isAuthenticated])

  const fetchClaims = async () => {
    setIsLoading(true)
    try {
      const res = await fetch(`/api/admin/firm-claims${filter ? `?status=${filter}` : ''}`)
      if (!res.ok) {
        throw new Error('Failed to fetch')
      }
      const data = await res.json()
      setClaims(data.claims || [])
    } catch (error) {
      console.error('Error fetching claims:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleAction = async (action: 'approve' | 'reject') => {
    if (!selectedClaim) return

    setIsProcessing(true)
    try {
      const res = await fetch(`/api/admin/firm-claims/${selectedClaim.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action, adminNotes }),
      })

      if (res.ok) {
        setSelectedClaim(null)
        setAdminNotes('')
        fetchClaims()
      } else {
        const data = await res.json()
        alert(data.error || 'Action failed')
      }
    } catch {
      alert('Action failed')
    } finally {
      setIsProcessing(false)
    }
  }

  const handleUnlink = async () => {
    if (!selectedClaim) return

    if (!confirm(`Are you sure you want to remove this claim and unlink "${selectedClaim.user.name}" from "${selectedClaim.consultant.firmName}"? This action cannot be undone.`)) {
      return
    }

    setIsProcessing(true)
    try {
      const res = await fetch(`/api/admin/firm-claims/${selectedClaim.id}`, {
        method: 'DELETE',
      })

      if (res.ok) {
        setSelectedClaim(null)
        setAdminNotes('')
        fetchClaims()
      } else {
        const data = await res.json()
        alert(data.error || 'Failed to unlink')
      }
    } catch {
      alert('Failed to unlink')
    } finally {
      setIsProcessing(false)
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return (
          <span className="flex items-center gap-1 bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full text-xs font-medium">
            <Clock className="w-3 h-3" /> Pending
          </span>
        )
      case 'approved':
        return (
          <span className="flex items-center gap-1 bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium">
            <CheckCircle className="w-3 h-3" /> Approved
          </span>
        )
      case 'rejected':
        return (
          <span className="flex items-center gap-1 bg-red-100 text-red-700 px-2 py-1 rounded-full text-xs font-medium">
            <XCircle className="w-3 h-3" /> Rejected
          </span>
        )
      default:
        return null
    }
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-[1400px] mx-auto">
          <Link
            href="/admin/dashboard"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 text-sm mb-3"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Link>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Firm Claims</h1>
              <p className="text-gray-600 text-sm mt-1">
                Review and approve user requests to claim their firms
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border-b border-gray-200 px-6 py-3">
        <div className="max-w-[1400px] mx-auto flex gap-2">
          {['pending', 'approved', 'rejected', ''].map((status) => (
            <button
              key={status || 'all'}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === status
                  ? 'bg-[var(--navy)] text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {status === '' ? 'All' : status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="px-6 py-6">
        <div className="max-w-[1400px] mx-auto">
          {isLoading ? (
            <div className="text-center py-12">
              <div className="w-8 h-8 border-4 border-[var(--blue)] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-600">Loading claims...</p>
            </div>
          ) : claims.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
              <Building2 className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600">No {filter || ''} claims found</p>
            </div>
          ) : (
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                      User
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                      Firm
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                      Status
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                      Date
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {claims.map((claim) => (
                    <tr key={claim.id} className="hover:bg-gray-50">
                      <td className="px-4 py-4">
                        <div>
                          <p className="font-medium text-gray-900">{claim.user.name}</p>
                          <p className="text-sm text-gray-500">{claim.user.email}</p>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div>
                          <p className="font-medium text-gray-900">{claim.consultant.firmName}</p>
                          <p className="text-sm text-gray-500">
                            {claim.consultant.city}, {claim.consultant.state}
                          </p>
                        </div>
                      </td>
                      <td className="px-4 py-4">{getStatusBadge(claim.status)}</td>
                      <td className="px-4 py-4 text-sm text-gray-600">
                        {new Date(claim.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-4">
                        <button
                          onClick={() => {
                            setSelectedClaim(claim)
                            setAdminNotes(claim.adminNotes || '')
                          }}
                          className="text-[var(--blue)] text-sm font-medium hover:underline"
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Detail Modal */}
      {selectedClaim && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">Claim Details</h2>
                <button
                  onClick={() => setSelectedClaim(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XCircle className="w-6 h-6" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* User Info */}
              <div className="bg-blue-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <User className="w-4 h-4" /> Claimant (User)
                </h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Name:</span>
                    <p className="font-medium">{selectedClaim.user.name}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Email:</span>
                    <p className="font-medium flex items-center gap-1">
                      <Mail className="w-3 h-3" /> {selectedClaim.user.email}
                    </p>
                  </div>
                  {selectedClaim.user.phone && (
                    <div>
                      <span className="text-gray-500">Phone:</span>
                      <p className="font-medium flex items-center gap-1">
                        <Phone className="w-3 h-3" /> {selectedClaim.user.phone}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Firm Info */}
              <div className="bg-green-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Building2 className="w-4 h-4" /> Firm Being Claimed
                </h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Firm Name:</span>
                    <p className="font-medium">{selectedClaim.consultant.firmName}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Contact:</span>
                    <p className="font-medium">{selectedClaim.consultant.name}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Location:</span>
                    <p className="font-medium flex items-center gap-1">
                      <MapPin className="w-3 h-3" /> {selectedClaim.consultant.city},{' '}
                      {selectedClaim.consultant.state}
                    </p>
                  </div>
                  <div>
                    <span className="text-gray-500">Firm Email:</span>
                    <p className="font-medium">{selectedClaim.consultant.email}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Firm Phone:</span>
                    <p className="font-medium">{selectedClaim.consultant.phone}</p>
                  </div>
                </div>
              </div>

              {/* Claim Message */}
              {selectedClaim.message && (
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                    <MessageSquare className="w-4 h-4" /> Proof/Message from User
                  </h3>
                  <p className="text-sm text-gray-700 whitespace-pre-wrap">
                    {selectedClaim.message}
                  </p>
                </div>
              )}

              {/* Admin Notes */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Admin Notes
                </label>
                <textarea
                  value={adminNotes}
                  onChange={(e) => setAdminNotes(e.target.value)}
                  disabled={selectedClaim.status !== 'pending'}
                  placeholder="Add notes about this claim..."
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm outline-none focus:border-[var(--blue)] focus:ring-2 focus:ring-blue-50 disabled:bg-gray-100"
                />
              </div>

              {/* Actions */}
              {selectedClaim.status === 'pending' && (
                <div className="flex gap-3 pt-4 border-t border-gray-200">
                  <button
                    onClick={() => handleAction('reject')}
                    disabled={isProcessing}
                    className="flex-1 bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors disabled:bg-gray-300 flex items-center justify-center gap-2"
                  >
                    <XCircle className="w-4 h-4" />
                    Reject Claim
                  </button>
                  <button
                    onClick={() => handleAction('approve')}
                    disabled={isProcessing}
                    className="flex-1 bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors disabled:bg-gray-300 flex items-center justify-center gap-2"
                  >
                    <CheckCircle className="w-4 h-4" />
                    Approve & Link
                  </button>
                </div>
              )}

              {selectedClaim.status !== 'pending' && (
                <div className="pt-4 border-t border-gray-200 space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">Status:</span>
                    {getStatusBadge(selectedClaim.status)}
                  </div>

                  {selectedClaim.status === 'approved' && (
                    <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                      <p className="text-sm text-orange-800 mb-3">
                        This claim has been approved. The user is currently linked to this firm.
                        You can unlink and remove this claim if needed.
                      </p>
                      <button
                        onClick={handleUnlink}
                        disabled={isProcessing}
                        className="bg-orange-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-orange-700 transition-colors disabled:bg-gray-300 flex items-center gap-2"
                      >
                        <Unlink className="w-4 h-4" />
                        {isProcessing ? 'Processing...' : 'Unlink & Remove Claim'}
                      </button>
                    </div>
                  )}

                  {selectedClaim.status === 'rejected' && (
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                      <p className="text-sm text-gray-600 mb-3">
                        This claim was rejected. You can remove it from the system.
                      </p>
                      <button
                        onClick={handleUnlink}
                        disabled={isProcessing}
                        className="bg-gray-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-gray-700 transition-colors disabled:bg-gray-300 flex items-center gap-2"
                      >
                        <XCircle className="w-4 h-4" />
                        {isProcessing ? 'Processing...' : 'Remove Claim'}
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
