'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Download, Filter, Search, X } from 'lucide-react'

type Lead = {
  id: string
  name: string
  phone: string
  email: string | null
  city: string
  state: string
  businessType: string
  businessAge: string
  monthlyTurnover: string
  loanAmount: number | null
  requirement: string
  sourceUrl: string | null
  sourcePage: string | null
  status: string
  notes: string | null
  createdAt: string
  updatedAt: string
}

export default function AdminLeadsPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [leads, setLeads] = useState<Lead[]>([])
  const [filteredLeads, setFilteredLeads] = useState<Lead[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null)
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('admin_token')
    if (!token) {
      router.push('/admin/login')
      return
    }
    setIsAuthenticated(true)
    fetchLeads()
  }, [router])

  useEffect(() => {
    filterLeads()
  }, [searchTerm, statusFilter, leads])

  const fetchLeads = async () => {
    try {
      const response = await fetch('/api/admin/leads')
      if (response.ok) {
        const data = await response.json()
        setLeads(data)
        setFilteredLeads(data)
      }
    } catch (error) {
      console.error('Error fetching leads:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const filterLeads = () => {
    let filtered = leads

    if (searchTerm) {
      filtered = filtered.filter(lead =>
        lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.phone.includes(searchTerm) ||
        lead.city.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(lead => lead.status === statusFilter)
    }

    setFilteredLeads(filtered)
  }

  const updateLeadStatus = async (leadId: string, newStatus: string) => {
    try {
      const response = await fetch(`/api/admin/leads/${leadId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      })

      if (response.ok) {
        fetchLeads()
        if (selectedLead?.id === leadId) {
          setSelectedLead({ ...selectedLead, status: newStatus })
        }
      }
    } catch (error) {
      console.error('Error updating lead:', error)
    }
  }

  const exportToCSV = async () => {
    try {
      const response = await fetch('/api/admin/leads/export')
      if (response.ok) {
        const blob = await response.blob()
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `leads-${new Date().toISOString().split('T')[0]}.csv`
        a.click()
      }
    } catch (error) {
      console.error('Error exporting leads:', error)
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
    total: leads.length,
    new: leads.filter(l => l.status === 'new').length,
    contacted: leads.filter(l => l.status === 'contacted').length,
    converted: leads.filter(l => l.status === 'converted').length,
  }

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
              <h1 className="text-2xl font-bold text-white">Leads Management</h1>
            </div>
            <p className="text-gray-300 text-sm">View and manage all leads</p>
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
              <p className="text-sm text-gray-600 mb-1">Total Leads</p>
              <p className="text-2xl font-bold text-navy">{stats.total}</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4">
              <p className="text-sm text-gray-600 mb-1">New</p>
              <p className="text-2xl font-bold text-yellow-600">{stats.new}</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4">
              <p className="text-sm text-gray-600 mb-1">Contacted</p>
              <p className="text-2xl font-bold text-blue-600">{stats.contacted}</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4">
              <p className="text-sm text-gray-600 mb-1">Converted</p>
              <p className="text-2xl font-bold text-green-600">{stats.converted}</p>
            </div>
          </div>

          {/* Filters & Actions */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by name, phone, or city..."
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
                <option value="new">New</option>
                <option value="contacted">Contacted</option>
                <option value="qualified">Qualified</option>
                <option value="converted">Converted</option>
                <option value="rejected">Rejected</option>
              </select>

              <button
                onClick={exportToCSV}
                className="flex items-center gap-2 bg-custom-green text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-custom-green-dark transition-colors"
              >
                <Download className="h-4 w-4" />
                Export CSV
              </button>
            </div>
          </div>

          {/* Leads Table */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-bold text-navy">
                {filteredLeads.length} Lead{filteredLeads.length !== 1 ? 's' : ''}
              </h2>
            </div>

            {isLoading ? (
              <div className="p-8 text-center text-gray-500">
                Loading leads...
              </div>
            ) : filteredLeads.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                No leads found
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-blue-50 border-b border-blue-200">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-navy-dark uppercase">
                        Name
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-navy-dark uppercase">
                        Contact
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-navy-dark uppercase">
                        Location
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-navy-dark uppercase">
                        Business
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-navy-dark uppercase">
                        Requirement
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-navy-dark uppercase">
                        Status
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-navy-dark uppercase">
                        Date
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-navy-dark uppercase">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredLeads.map((lead) => (
                      <tr key={lead.id} className="hover:bg-blue-100">
                        <td className="px-4 py-3 text-sm font-medium text-navy">
                          {lead.name}
                        </td>
                        <td className="px-4 py-3 text-sm">
                          <div className="text-navy">{lead.phone}</div>
                          {lead.email && (
                            <div className="text-gray-500 text-xs">{lead.email}</div>
                          )}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600">
                          {lead.city}, {lead.state}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600">
                          {lead.businessType}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600">
                          {lead.requirement}
                        </td>
                        <td className="px-4 py-3 text-sm">
                          <select
                            value={lead.status}
                            onChange={(e) => updateLeadStatus(lead.id, e.target.value)}
                            className={`px-2 py-1 rounded text-xs font-semibold border-0 outline-none cursor-pointer ${
                              lead.status === 'new' ? 'bg-yellow-100 text-yellow-700' :
                              lead.status === 'contacted' ? 'bg-blue-100 text-blue-700' :
                              lead.status === 'qualified' ? 'bg-purple-100 text-purple-700' :
                              lead.status === 'converted' ? 'bg-green-100 text-green-700' :
                              'bg-red-100 text-red-700'
                            }`}
                          >
                            <option value="new">New</option>
                            <option value="contacted">Contacted</option>
                            <option value="qualified">Qualified</option>
                            <option value="converted">Converted</option>
                            <option value="rejected">Rejected</option>
                          </select>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600">
                          {new Date(lead.createdAt).toLocaleDateString('en-IN', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric'
                          })}
                        </td>
                        <td className="px-4 py-3 text-sm">
                          <button
                            onClick={() => setSelectedLead(lead)}
                            className="text-custom-blue hover:underline"
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
      </div>

      {/* Lead Detail Modal */}
      {selectedLead && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-6 z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
              <h2 className="text-xl font-bold text-navy">Lead Details</h2>
              <button
                onClick={() => setSelectedLead(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Name</label>
                  <p className="text-navy">{selectedLead.name}</p>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Phone</label>
                  <p className="text-navy">{selectedLead.phone}</p>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Email</label>
                  <p className="text-navy">{selectedLead.email || 'N/A'}</p>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Location</label>
                  <p className="text-navy">{selectedLead.city}, {selectedLead.state}</p>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Business Type</label>
                  <p className="text-navy">{selectedLead.businessType}</p>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Business Age</label>
                  <p className="text-navy">{selectedLead.businessAge}</p>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Monthly Turnover</label>
                  <p className="text-navy">{selectedLead.monthlyTurnover}</p>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Loan Amount</label>
                  <p className="text-navy">
                    {selectedLead.loanAmount ? `₹${selectedLead.loanAmount.toLocaleString()}` : 'N/A'}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Requirement</label>
                  <p className="text-navy">{selectedLead.requirement}</p>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Source Page</label>
                  <p className="text-navy">{selectedLead.sourcePage || 'N/A'}</p>
                </div>
              </div>

              {selectedLead.notes && (
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Notes</label>
                  <p className="text-navy whitespace-pre-wrap">{selectedLead.notes}</p>
                </div>
              )}

              <div className="flex gap-3 pt-4 border-t border-gray-200">
                <button
                  onClick={() => setSelectedLead(null)}
                  className="flex-1 bg-white border border-gray-300 text-gray-700 text-sm font-semibold px-6 py-2 rounded-lg hover:bg-blue-100 transition-colors"
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
