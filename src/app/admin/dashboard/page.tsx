'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  Users, FileText, Building, TrendingUp,
  DollarSign, AlertCircle, CheckCircle, Clock, BookOpen, Newspaper
} from 'lucide-react'

type DashboardStats = {
  totalLeads: number
  newLeadsToday: number
  totalSchemes: number
  activeSchemes: number
  premiumListings: number
  expiringListings: number
  totalSubscribers: number
  conversionRate: number
}

type Lead = {
  id: string
  name: string
  phone: string
  city: string
  requirement: string
  sourcePage: string | null
  status: string
  createdAt: string
}

type ListingEnquiry = {
  id: string
  firmName: string
  city: string
  tier: string
  status: string
  createdAt: string
}

type Consultant = {
  id: string
  name: string
  firmName: string
  city: string
  tier: string
  paidUntil: string | null
}

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [recentLeads, setRecentLeads] = useState<Lead[]>([])
  const [enquiries, setEnquiries] = useState<ListingEnquiry[]>([])
  const [expiringListings, setExpiringListings] = useState<Consultant[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('admin_token')
    if (!token) {
      router.push('/admin/login')
      return
    }
    setIsAuthenticated(true)
    fetchDashboardData()

    // Auto-refresh every 60 seconds
    const interval = setInterval(fetchDashboardData, 60000)
    return () => clearInterval(interval)
  }, [router])

  const fetchDashboardData = async () => {
    try {
      const [statsRes, leadsRes, enquiriesRes, expiringRes] = await Promise.all([
        fetch('/api/admin/dashboard/stats'),
        fetch('/api/admin/dashboard/recent-leads'),
        fetch('/api/admin/dashboard/enquiries'),
        fetch('/api/admin/dashboard/expiring-listings'),
      ])

      if (statsRes.ok) setStats(await statsRes.json())
      if (leadsRes.ok) setRecentLeads(await leadsRes.json())
      if (enquiriesRes.ok) setEnquiries(await enquiriesRes.json())
      if (expiringRes.ok) setExpiringListings(await expiringRes.json())
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('admin_token')
    router.push('/admin/login')
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen bg-[#f0f4ff]">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#0f1f3d] to-[#1a3a6e] px-6 py-4 shadow-md">
        <div className="max-w-[1400px] mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
            <p className="text-gray-300 text-sm">MSMEVault.in</p>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/" className="text-white text-sm hover:text-gray-200">
              View Site
            </Link>
            <button
              onClick={handleLogout}
              className="bg-white text-navy text-sm font-semibold px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-6 py-8">
        <div className="max-w-[1400px] mx-auto">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <StatCard
              title="Total Leads"
              value={stats?.totalLeads || 0}
              subtitle={`${stats?.newLeadsToday || 0} new today`}
              icon={<Users className="h-6 w-6" />}
              color="blue"
              isLoading={isLoading}
            />
            <StatCard
              title="Total Schemes"
              value={stats?.totalSchemes || 0}
              subtitle={`${stats?.activeSchemes || 0} active`}
              icon={<FileText className="h-6 w-6" />}
              color="green"
              isLoading={isLoading}
            />
            <StatCard
              title="Premium Listings"
              value={stats?.premiumListings || 0}
              subtitle={`${stats?.expiringListings || 0} expiring soon`}
              icon={<Building className="h-6 w-6" />}
              color="orange"
              isLoading={isLoading}
            />
            <StatCard
              title="Subscribers"
              value={stats?.totalSubscribers || 0}
              subtitle={`${stats?.conversionRate || 0}% conversion`}
              icon={<TrendingUp className="h-6 w-6" />}
              color="purple"
              isLoading={isLoading}
            />
          </div>

          {/* Alerts */}
          {expiringListings.length > 0 && (
            <div className="mb-8 bg-orange-50 border border-orange-200 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-orange-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-orange-900">
                    {expiringListings.length} Listings Expiring Soon
                  </h3>
                  <p className="text-sm text-orange-800 mt-1">
                    {expiringListings.map(l => l.firmName).join(', ')} - Contact for renewal
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="grid lg:grid-cols-2 gap-6 mb-8">
            {/* Recent Leads */}
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm">
              <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                <h2 className="text-lg font-bold text-navy">Recent Leads</h2>
                <Link
                  href="/admin/leads"
                  className="text-sm text-custom-blue hover:text-custom-blue-dark hover:underline"
                >
                  View All
                </Link>
              </div>

              {isLoading ? (
                <div className="p-8 text-center text-gray-500">
                  Loading...
                </div>
              ) : recentLeads.length === 0 ? (
                <div className="p-8 text-center text-gray-500">
                  No leads yet
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-blue-50 border-b border-blue-200">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">
                          Name
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">
                          City
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {recentLeads.slice(0, 5).map((lead) => (
                        <tr key={lead.id} className="hover:bg-blue-100">
                          <td className="px-4 py-3 text-sm">
                            <div>
                              <div className="font-medium text-navy">{lead.name}</div>
                              <div className="text-gray-500 text-xs">{lead.phone}</div>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-600">
                            {lead.city}
                          </td>
                          <td className="px-4 py-3 text-sm">
                            <StatusBadge status={lead.status} />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Listing Enquiries */}
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm">
              <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                <h2 className="text-lg font-bold text-navy">Listing Enquiries</h2>
                <Link
                  href="/admin/consultants/enquiries"
                  className="text-sm text-custom-blue hover:underline"
                >
                  View All
                </Link>
              </div>

              {isLoading ? (
                <div className="p-8 text-center text-gray-500">
                  Loading...
                </div>
              ) : enquiries.length === 0 ? (
                <div className="p-8 text-center text-gray-500">
                  No pending enquiries
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-blue-50 border-b border-blue-200">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">
                          Firm Name
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">
                          City
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">
                          Tier
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {enquiries.slice(0, 5).map((enquiry) => (
                        <tr key={enquiry.id} className="hover:bg-blue-100">
                          <td className="px-4 py-3 text-sm font-medium text-navy">
                            {enquiry.firmName}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-600">
                            {enquiry.city}
                          </td>
                          <td className="px-4 py-3 text-sm">
                            <span className="inline-block px-2 py-1 rounded text-xs font-semibold bg-blue-100 text-blue-700">
                              {enquiry.tier}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-sm">
                            <StatusBadge status={enquiry.status} />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-8 gap-4">
            <QuickActionCard
              title="Schemes"
              href="/admin/schemes"
              icon={<FileText className="h-5 w-5" />}
              description="Manage schemes"
            />
            <QuickActionCard
              title="Loans"
              href="/admin/loans"
              icon={<DollarSign className="h-5 w-5" />}
              description="Manage loans"
            />
            <QuickActionCard
              title="Leads"
              href="/admin/leads"
              icon={<Users className="h-5 w-5" />}
              description="View leads"
            />
            <QuickActionCard
              title="Consultants"
              href="/admin/consultants"
              icon={<Building className="h-5 w-5" />}
              description="Manage consultants"
            />
            <QuickActionCard
              title="Firm Claims"
              href="/admin/firm-claims"
              icon={<CheckCircle className="h-5 w-5" />}
              description="Review claims"
              color="orange"
            />
            <QuickActionCard
              title="Users"
              href="/admin/users"
              icon={<Users className="h-5 w-5" />}
              description="Manage users"
            />
            <QuickActionCard
              title="Guides"
              href="/admin/guides"
              icon={<BookOpen className="h-5 w-5" />}
              description="30+ guides"
              color="green"
            />
            <QuickActionCard
              title="Blog"
              href="/admin/blog"
              icon={<Newspaper className="h-5 w-5" />}
              description="30+ articles"
              color="blue"
            />
            <QuickActionCard
              title="Analytics"
              href="/admin/analytics"
              icon={<TrendingUp className="h-5 w-5" />}
              description="View stats"
            />
            <QuickActionCard
              title="Settings"
              href="/admin/settings"
              icon={<Clock className="h-5 w-5" />}
              description="Site settings"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

function StatCard({
  title,
  value,
  subtitle,
  icon,
  color,
  isLoading,
}: {
  title: string
  value: number
  subtitle: string
  icon: React.ReactNode
  color: 'blue' | 'green' | 'orange' | 'purple'
  isLoading: boolean
}) {
  const colorClasses = {
    blue: 'bg-blue-100 text-blue-600',
    green: 'bg-green-100 text-green-600',
    orange: 'bg-orange-100 text-orange-600',
    purple: 'bg-purple-100 text-purple-600',
  }

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-5">
      <div className="flex items-center justify-between mb-3">
        <p className="text-sm text-gray-600">{title}</p>
        <div className={`p-2 rounded-lg ${colorClasses[color]}`}>{icon}</div>
      </div>
      {isLoading ? (
        <div className="h-8 bg-gray-200 rounded animate-pulse mb-1" />
      ) : (
        <p className="text-3xl font-bold text-navy mb-1">{value}</p>
      )}
      <p className="text-xs text-gray-500">{subtitle}</p>
    </div>
  )
}

function StatusBadge({ status }: { status: string }) {
  const statusStyles: Record<string, string> = {
    new: 'bg-yellow-100 text-yellow-700',
    pending: 'bg-yellow-100 text-yellow-700',
    contacted: 'bg-blue-100 text-blue-700',
    qualified: 'bg-purple-100 text-purple-700',
    converted: 'bg-green-100 text-green-700',
    rejected: 'bg-red-100 text-red-700',
    approved: 'bg-green-100 text-green-700',
  }

  return (
    <span className={`inline-block px-2 py-1 rounded text-xs font-semibold ${statusStyles[status] || 'bg-gray-100 text-gray-700'}`}>
      {status}
    </span>
  )
}

function QuickActionCard({
  title,
  href,
  icon,
  description,
  color,
}: {
  title: string
  href: string
  icon: React.ReactNode
  description?: string
  color?: 'green' | 'blue' | 'orange' | 'purple'
}) {
  const colorClasses = {
    green: 'bg-green-100 text-green-600',
    blue: 'bg-blue-100 text-blue-600',
    orange: 'bg-orange-100 text-orange-600',
    purple: 'bg-purple-100 text-purple-600',
  }

  return (
    <Link href={href}>
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 hover:shadow-lg transition-shadow cursor-pointer">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg ${color ? colorClasses[color] : 'bg-gray-100 text-gray-600'}`}>{icon}</div>
          <div>
            <p className="font-semibold text-navy text-sm">{title}</p>
            <p className="text-xs text-gray-500">{description || 'Manage'}</p>
          </div>
        </div>
      </div>
    </Link>
  )
}
