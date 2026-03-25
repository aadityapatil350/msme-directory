'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Save, ExternalLink, Download } from 'lucide-react'

type SiteConfig = {
  [key: string]: string
}

export default function AdminSettingsPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [config, setConfig] = useState<SiteConfig>({})
  const [isLoading, setIsLoading] = useState(true)
  const [savingKey, setSavingKey] = useState<string | null>(null)
  const router = useRouter()

  const configFields = [
    { key: 'site_name', label: 'Site Name', placeholder: 'MSMEVault.in' },
    { key: 'site_tagline', label: 'Site Tagline', placeholder: "India's #1 MSME Scheme Directory" },
    { key: 'contact_email', label: 'Contact Email', placeholder: 'aditybiz350@gmail.com' },
    { key: 'contact_phone', label: 'Contact Phone', placeholder: '+91 9373238164' },
    { key: 'whatsapp_number', label: 'WhatsApp Number', placeholder: '919373238164' },
  ]

  const affiliateLinks = [
    { key: 'lendingkart_affiliate_url', label: 'Lendingkart Affiliate URL', placeholder: 'https://lendingkart.com/...' },
    { key: 'neogrowth_affiliate_url', label: 'NeoGrowth Affiliate URL', placeholder: 'https://neogrowth.in/...' },
    { key: 'zoho_books_affiliate_url', label: 'Zoho Books Affiliate URL', placeholder: 'https://zoho.com/...' },
    { key: 'cleartax_affiliate_url', label: 'ClearTax Affiliate URL', placeholder: 'https://cleartax.in/...' },
    { key: 'razorpay_affiliate_url', label: 'Razorpay Affiliate URL', placeholder: 'https://razorpay.com/...' },
    { key: 'indiafilings_affiliate_url', label: 'IndiaFilings Affiliate URL', placeholder: 'https://indiafilings.com/...' },
  ]

  const businessSettings = [
    { key: 'lead_value_estimate', label: 'Lead Value Estimate (₹)', placeholder: '4000', type: 'number' },
    { key: 'lendingkart_webhook_url', label: 'Lendingkart Webhook URL', placeholder: 'https://...' },
  ]

  useEffect(() => {
    const token = localStorage.getItem('admin_token')
    if (!token) {
      router.push('/admin/login')
      return
    }
    setIsAuthenticated(true)
    fetchSettings()
  }, [router])

  const fetchSettings = async () => {
    try {
      const response = await fetch('/api/admin/settings')
      if (response.ok) {
        const data = await response.json()
        setConfig(data)
      }
    } catch (error) {
      console.error('Error fetching settings:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const saveSetting = async (key: string) => {
    setSavingKey(key)
    try {
      const response = await fetch('/api/admin/settings', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key, value: config[key] || '' }),
      })

      if (response.ok) {
        // Success feedback could be added here
      }
    } catch (error) {
      console.error('Error saving setting:', error)
    } finally {
      setSavingKey(null)
    }
  }

  const testWebhook = async () => {
    try {
      const response = await fetch('/api/admin/settings/test-webhook', {
        method: 'POST',
      })

      if (response.ok) {
        alert('Test lead sent successfully! Check your webhook endpoint.')
      } else {
        alert('Webhook test failed. Check console for details.')
      }
    } catch (error) {
      console.error('Error testing webhook:', error)
      alert('Webhook test failed.')
    }
  }

  const exportLeads = async () => {
    try {
      const response = await fetch('/api/admin/leads/export')
      if (response.ok) {
        const blob = await response.blob()
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `all-leads-${new Date().toISOString().split('T')[0]}.csv`
        a.click()
      }
    } catch (error) {
      console.error('Error exporting leads:', error)
    }
  }

  const exportSubscribers = async () => {
    try {
      const response = await fetch('/api/admin/subscribers/export')
      if (response.ok) {
        const blob = await response.blob()
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `subscribers-${new Date().toISOString().split('T')[0]}.csv`
        a.click()
      }
    } catch (error) {
      console.error('Error exporting subscribers:', error)
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
        <div className="max-w-[1200px] mx-auto flex justify-between items-center">
          <div>
            <div className="flex items-center gap-3">
              <Link href="/admin/dashboard" className="text-white hover:text-gray-200">
                ← Back
              </Link>
              <h1 className="text-2xl font-bold text-white">Settings</h1>
            </div>
            <p className="text-gray-300 text-sm">Manage site configuration and affiliate links</p>
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
        <div className="max-w-[1200px] mx-auto space-y-6">
          {/* Site Configuration */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-bold text-navy mb-4">Site Configuration</h2>
            <div className="space-y-4">
              {configFields.map(field => (
                <div key={field.key} className="flex gap-3 items-start">
                  <div className="flex-1">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      {field.label}
                    </label>
                    <input
                      type="text"
                      value={config[field.key] || ''}
                      onChange={(e) => setConfig({ ...config, [field.key]: e.target.value })}
                      placeholder={field.placeholder}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-custom-blue"
                    />
                  </div>
                  <button
                    onClick={() => saveSetting(field.key)}
                    disabled={savingKey === field.key}
                    className="mt-7 bg-custom-blue text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-custom-blue-dark transition-colors disabled:opacity-50"
                  >
                    {savingKey === field.key ? 'Saving...' : 'Save'}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Affiliate Links */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-bold text-navy mb-2">Affiliate Links</h2>
            <p className="text-sm text-gray-600 mb-4">
              Configure affiliate partner URLs for monetization tracking
            </p>
            <div className="space-y-4">
              {affiliateLinks.map(link => (
                <div key={link.key} className="flex gap-3 items-start">
                  <div className="flex-1">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      {link.label}
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="url"
                        value={config[link.key] || ''}
                        onChange={(e) => setConfig({ ...config, [link.key]: e.target.value })}
                        placeholder={link.placeholder}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-custom-blue"
                      />
                      {config[link.key] && (
                        <a
                          href={config[link.key]}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-custom-blue hover:underline text-sm px-3 py-2 border border-gray-300 rounded-lg"
                        >
                          <ExternalLink className="h-4 w-4" />
                          Test
                        </a>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => saveSetting(link.key)}
                    disabled={savingKey === link.key}
                    className="mt-7 bg-custom-blue text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-custom-blue-dark transition-colors disabled:opacity-50"
                  >
                    {savingKey === link.key ? 'Saving...' : 'Save'}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Business Settings */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-bold text-navy mb-4">Business Settings</h2>
            <div className="space-y-4">
              {businessSettings.map(setting => (
                <div key={setting.key} className="flex gap-3 items-start">
                  <div className="flex-1">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      {setting.label}
                    </label>
                    <input
                      type={setting.type || 'text'}
                      value={config[setting.key] || ''}
                      onChange={(e) => setConfig({ ...config, [setting.key]: e.target.value })}
                      placeholder={setting.placeholder}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-custom-blue"
                    />
                  </div>
                  <button
                    onClick={() => saveSetting(setting.key)}
                    disabled={savingKey === setting.key}
                    className="mt-7 bg-custom-blue text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-custom-blue-dark transition-colors disabled:opacity-50"
                  >
                    {savingKey === setting.key ? 'Saving...' : 'Save'}
                  </button>
                </div>
              ))}

              {config.lendingkart_webhook_url && (
                <div className="pt-2">
                  <button
                    onClick={testWebhook}
                    className="bg-green-600 text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Send Test Lead to Lendingkart
                  </button>
                  <p className="text-xs text-gray-500 mt-2">
                    This will send a dummy lead to verify your webhook is working
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Danger Zone */}
          <div className="bg-white border border-red-200 rounded-xl p-6">
            <h2 className="text-lg font-bold text-red-900 mb-2">Data Export</h2>
            <p className="text-sm text-gray-600 mb-4">
              Export all data from the database
            </p>
            <div className="flex gap-3">
              <button
                onClick={exportLeads}
                className="flex items-center gap-2 bg-custom-green text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
              >
                <Download className="h-4 w-4" />
                Export All Leads (CSV)
              </button>
              <button
                onClick={exportSubscribers}
                className="flex items-center gap-2 bg-custom-blue text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-custom-blue-dark transition-colors"
              >
                <Download className="h-4 w-4" />
                Export All Subscribers (CSV)
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
