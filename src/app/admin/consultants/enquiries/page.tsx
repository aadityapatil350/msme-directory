'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Check, X, Search } from 'lucide-react'

type ListingEnquiry = {
  id: string
  firmName: string
  contactName: string
  email: string
  phone: string
  city: string
  state: string
  services: string[]
  tier: string
  status: string
  notes: string | null
  createdAt: string
}

export default function AdminEnquiriesPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [enquiries, setEnquiries] = useState<ListingEnquiry[]>([])
  const [filteredEnquiries, setFilteredEnquiries] = useState<ListingEnquiry[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [selectedEnquiry, setSelectedEnquiry] = useState<ListingEnquiry | null>(null)
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('admin_token')
    if (!token) {
      router.push('/admin/login')
      return
    }
    setIsAuthenticated(true)
    fetchEnquiries()
  }, [router])

  useEffect(() => {
    filterEnquiries()
  }, [searchTerm, statusFilter, enquiries])

  const fetchEnquiries = async () => {
    try {
      const response = await fetch('/api/admin/consultants/enquiries')
      if (response.ok) {
        const data = await response.json()
        setEnquiries(data)
        setFilteredEnquiries(data)
      }
    } catch (error) {
      console.error('Error fetching enquiries:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const filterEnquiries = () => {
    let filtered = enquiries

    if (searchTerm) {
      filtered = filtered.filter(enquiry =>
        enquiry.firmName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        enquiry.contactName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        enquiry.city.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(enquiry => enquiry.status === statusFilter)
    }

    setFilteredEnquiries(filtered)
  }

  const handleEnquiry = async (id: string, action: 'approve' | 'reject') => {
    if (!confirm(`Are you sure you want to ${action} this enquiry?`)) return

    try {
      const response = await fetch(`/api/admin/consultants/enquiries/${id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action }),
      })

      if (response.ok) {
        fetchEnquiries()
        if (selectedEnquiry?.id === id) {
          setSelectedEnquiry(null)
        }
      } else {
        const error = await response.json()
        alert(error.error || 'Failed to process enquiry')
      }
    } catch (error) {
      console.error('Error processing enquiry:', error)
      alert('Failed to process enquiry')
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
    total: enquiries.length,
    pending: enquiries.filter(e => e.status === 'pending').length,
    approved: enquiries.filter(e => e.status === 'approved').length,
    rejected: enquiries.filter(e => e.status === 'rejected').length,
  }

  return (
    <div className="min-h-screen bg-[#f0f4ff]">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#0f1f3d] to-[#1a3a6e] px-6 py-4 shadow-md">
        <div className="max-w-[1400px] mx-auto flex justify-between items-center">
          <div>
            <div className="flex items-center gap-3">
              <Link href="/admin/consultants" className="text-white hover:text-gray-200">
                ← Back
              </Link>
              <h1 className="text-2xl font-bold text-white">Listing Enquiries</h1>
            </div>
            <p className="text-gray-300 text-sm">Review consultant applications</p>
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
              <p className="text-sm text-gray-600 mb-1">Total Enquiries</p>
              <p className="text-2xl font-bold text-navy">{stats.total}</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4">
              <p className="text-sm text-gray-600 mb-1">Pending</p>
              <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4">
              <p className="text-sm text-gray-600 mb-1">Approved</p>
              <p className="text-2xl font-bold text-green-600">{stats.approved}</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4">
              <p className="text-sm text-gray-600 mb-1">Rejected</p>
              <p className="text-2xl font-bold text-red-600">{stats.rejected}</p>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by firm name, contact person, or city..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-custom-blue"
                />
              </div>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-custom-blue"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          </div>

          {/* Enquiries Table */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-bold text-navy">
                {filteredEnquiries.length} Enquir{filteredEnquiries.length !== 1 ? 'ies' : 'y'}
              </h2>
            </div>

            {isLoading ? (
              <div className="p-8 text-center text-gray-500">
                Loading enquiries...
              </div>
            ) : filteredEnquiries.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                No enquiries found
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-blue-50 border-b border-blue-200">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-navy-dark uppercase">
                        Firm Name
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-navy-dark uppercase">
                        Contact Person
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-navy-dark uppercase">
                        Contact
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-navy-dark uppercase">
                        Location
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-navy-dark uppercase">
                        Tier Requested
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
                    {filteredEnquiries.map((enquiry) => (
                      <tr key={enquiry.id} className="hover:bg-blue-100">
                        <td className="px-4 py-3 text-sm font-medium text-navy">
                          {enquiry.firmName}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600">
                          {enquiry.contactName}
                        </td>
                        <td className="px-4 py-3 text-sm">
                          <div className="text-navy">{enquiry.phone}</div>
                          <div className="text-xs text-gray-500">{enquiry.email}</div>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600">
                          {enquiry.city}, {enquiry.state}
                        </td>
                        <td className="px-4 py-3 text-sm">
                          <span className={`inline-block px-2 py-1 rounded text-xs font-semibold bg-blue-100 text-blue-700`}>
                            {enquiry.tier}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm">
                          <span className={`inline-block px-2 py-1 rounded text-xs font-semibold ${
                            enquiry.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                            enquiry.status === 'approved' ? 'bg-green-100 text-green-700' :
                            'bg-red-100 text-red-700'
                          }`}>
                            {enquiry.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => setSelectedEnquiry(enquiry)}
                              className="text-custom-blue hover:underline"
                            >
                              View Details
                            </button>
                            {enquiry.status === 'pending' && (
                              <>
                                <button
                                  onClick={() => handleEnquiry(enquiry.id, 'approve')}
                                  className="text-green-600 hover:text-green-700 flex items-center gap-1"
                                >
                                  <Check className="h-4 w-4" />
                                  Approve
                                </button>
                                <button
                                  onClick={() => handleEnquiry(enquiry.id, 'reject')}
                                  className="text-red-600 hover:text-red-700 flex items-center gap-1"
                                >
                                  <X className="h-4 w-4" />
                                  Reject
                                </button>
                              </>
                            )}
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

      {/* Enquiry Detail Modal */}
      {selectedEnquiry && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-6 z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
              <h2 className="text-xl font-bold text-navy">Enquiry Details</h2>
              <button
                onClick={() => setSelectedEnquiry(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Firm Name</label>
                  <p className="text-navy">{selectedEnquiry.firmName}</p>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Contact Person</label>
                  <p className="text-navy">{selectedEnquiry.contactName}</p>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Email</label>
                  <p className="text-navy">{selectedEnquiry.email}</p>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Phone</label>
                  <p className="text-navy">{selectedEnquiry.phone}</p>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Location</label>
                  <p className="text-navy">{selectedEnquiry.city}, {selectedEnquiry.state}</p>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Tier Requested</label>
                  <span className="inline-block px-2 py-1 rounded text-xs font-semibold bg-blue-100 text-blue-700">
                    {selectedEnquiry.tier}
                  </span>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Current Status</label>
                  <span className={`inline-block px-2 py-1 rounded text-xs font-semibold ${
                    selectedEnquiry.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                    selectedEnquiry.status === 'approved' ? 'bg-green-100 text-green-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {selectedEnquiry.status}
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Services Offered</label>
                <div className="flex flex-wrap gap-2">
                  {selectedEnquiry.services.map((service, index) => (
                    <span key={index} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-lg text-sm">
                      {service}
                    </span>
                  ))}
                </div>
              </div>

              {selectedEnquiry.notes && (
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Notes</label>
                  <p className="text-navy whitespace-pre-wrap">{selectedEnquiry.notes}</p>
                </div>
              )}

              <div className="pt-4 border-t border-gray-200 space-y-3">
                {selectedEnquiry.status === 'pending' && (
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleEnquiry(selectedEnquiry.id, 'approve')}
                      className="flex-1 bg-green-600 text-white text-sm font-semibold px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
                    >
                      <Check className="h-4 w-4 mr-2 inline" />
                      Approve & Create Listing
                    </button>
                    <button
                      onClick={() => handleEnquiry(selectedEnquiry.id, 'reject')}
                      className="flex-1 bg-red-600 text-white text-sm font-semibold px-6 py-3 rounded-lg hover:bg-red-700 transition-colors"
                    >
                      <X className="h-4 w-4 mr-2 inline" />
                      Reject Enquiry
                    </button>
                  </div>
                )}
                <button
                  onClick={() => setSelectedEnquiry(null)}
                  className="w-full bg-gray-100 border border-gray-300 text-gray-700 text-sm font-semibold px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors mt-3"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
