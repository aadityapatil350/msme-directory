'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { TrendingUp, ExternalLink, Calendar } from 'lucide-react'

type AffiliateClick = {
  id: string
  url: string
  source: string
  type: string
  createdAt: string
}

type ClickStats = {
  url: string
  count: number
  lastClick: string
}

export default function AdminAnalyticsPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [clicks, setClicks] = useState<AffiliateClick[]>([])
  const [stats, setStats] = useState<ClickStats[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [dateRange, setDateRange] = useState('7')
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('admin_token')
    if (!token) {
      router.push('/admin/login')
      return
    }
    setIsAuthenticated(true)
    fetchAnalytics()
  }, [router, dateRange])

  const fetchAnalytics = async () => {
    try {
      const response = await fetch(`/api/admin/analytics?days=${dateRange}`)
      if (response.ok) {
        const data = await response.json()
        setClicks(data.clicks || [])
        setStats(data.stats || [])
      }
    } catch (error) {
      console.error('Error fetching analytics:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const getTotalClicks = () => clicks.length

  const getClicksByType = (type: string) => clicks.filter(c => c.type === type).length

  const getTopSources = () => {
    const sourceCounts: Record<string, number> = {}
    clicks.forEach(click => {
      sourceCounts[click.source] = (sourceCounts[click.source] || 0) + 1
    })
    return Object.entries(sourceCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
  }

  const handleLogout = () => {
    localStorage.removeItem('admin_token')
    router.push('/admin/login')
  }

  if (!isAuthenticated) {
    return null
  }

  const totalClicks = getTotalClicks()
  const affiliateClicks = getClicksByType('affiliate')
  const leadClicks = getClicksByType('lead')
  const topSources = getTopSources()

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
              <h1 className="text-2xl font-bold text-white">Analytics</h1>
            </div>
            <p className="text-gray-300 text-sm">Track affiliate clicks and revenue</p>
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
          {/* Date Range Filter */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 mb-6">
            <div className="flex items-center gap-3">
              <Calendar className="h-5 w-5 text-gray-600" />
              <label className="text-sm font-semibold text-gray-700">Time Period:</label>
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-custom-blue"
              >
                <option value="1">Last 24 Hours</option>
                <option value="7">Last 7 Days</option>
                <option value="30">Last 30 Days</option>
                <option value="90">Last 90 Days</option>
                <option value="365">Last Year</option>
              </select>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-5">
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm text-gray-600">Total Clicks</p>
                <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                  <TrendingUp className="h-5 w-5" />
                </div>
              </div>
              <p className="text-3xl font-bold text-navy">{totalClicks}</p>
              <p className="text-xs text-gray-500 mt-1">All tracked clicks</p>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-5">
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm text-gray-600">Affiliate Clicks</p>
                <div className="p-2 bg-green-100 text-green-600 rounded-lg">
                  <ExternalLink className="h-5 w-5" />
                </div>
              </div>
              <p className="text-3xl font-bold text-navy">{affiliateClicks}</p>
              <p className="text-xs text-gray-500 mt-1">Partner link clicks</p>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-5">
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm text-gray-600">Lead Clicks</p>
                <div className="p-2 bg-orange-100 text-orange-600 rounded-lg">
                  <TrendingUp className="h-5 w-5" />
                </div>
              </div>
              <p className="text-3xl font-bold text-navy">{leadClicks}</p>
              <p className="text-xs text-gray-500 mt-1">Lead gen clicks</p>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-6 mb-8">
            {/* Top Performing Links */}
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-bold text-navy">Top Performing Links</h2>
              </div>

              {isLoading ? (
                <div className="p-8 text-center text-gray-500">
                  Loading analytics...
                </div>
              ) : stats.length === 0 ? (
                <div className="p-8 text-center text-gray-500">
                  No click data yet
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-blue-50 border-b border-blue-200">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-navy-dark uppercase">
                          URL
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-navy-dark uppercase">
                          Clicks
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-navy-dark uppercase">
                          Last Click
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {stats.slice(0, 10).map((stat, index) => (
                        <tr key={index} className="hover:bg-blue-100">
                          <td className="px-4 py-3 text-sm text-navy">
                            <div className="flex items-center gap-2">
                              <ExternalLink className="h-3 w-3 text-gray-400" />
                              <span className="truncate max-w-[250px]">{stat.url}</span>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-sm font-semibold text-navy">
                            {stat.count}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-600">
                            {new Date(stat.lastClick).toLocaleDateString('en-IN', {
                              day: 'numeric',
                              month: 'short',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Top Traffic Sources */}
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-bold text-navy">Top Traffic Sources</h2>
              </div>

              {isLoading ? (
                <div className="p-8 text-center text-gray-500">
                  Loading sources...
                </div>
              ) : topSources.length === 0 ? (
                <div className="p-8 text-center text-gray-500">
                  No source data yet
                </div>
              ) : (
                <div className="p-6">
                  <div className="space-y-4">
                    {topSources.map(([source, count], index) => (
                      <div key={index}>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium text-navy">{source}</span>
                          <span className="text-sm text-gray-600">{count} clicks</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-custom-blue h-2 rounded-full"
                            style={{ width: `${(count / totalClicks) * 100}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Recent Clicks */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-bold text-navy">Recent Clicks</h2>
            </div>

            {isLoading ? (
              <div className="p-8 text-center text-gray-500">
                Loading recent clicks...
              </div>
            ) : clicks.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                No clicks recorded yet
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-blue-50 border-b border-blue-200">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-navy-dark uppercase">
                        URL
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-navy-dark uppercase">
                        Source Page
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-navy-dark uppercase">
                        Type
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-navy-dark uppercase">
                        Time
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {clicks.slice(0, 50).map((click) => (
                      <tr key={click.id} className="hover:bg-blue-100">
                        <td className="px-4 py-3 text-sm text-navy max-w-[300px] truncate">
                          {click.url}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600">
                          {click.source}
                        </td>
                        <td className="px-4 py-3 text-sm">
                          <span className={`inline-block px-2 py-1 rounded text-xs font-semibold ${
                            click.type === 'affiliate' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                          }`}>
                            {click.type}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600">
                          {new Date(click.createdAt).toLocaleString('en-IN', {
                            day: 'numeric',
                            month: 'short',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
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
    </div>
  )
}
