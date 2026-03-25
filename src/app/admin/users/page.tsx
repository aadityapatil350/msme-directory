'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Plus, Search, Edit, Trash2, UserCheck, UserX, Link as LinkIcon } from 'lucide-react'

type User = {
  id: string
  email: string
  name: string
  phone: string | null
  isActive: boolean
  lastLoginAt: string | null
  consultantId: string | null
  consultant: {
    id: string
    firmName: string
    city: string
    state: string
    tier: string
    isVerified: boolean
  } | null
  createdAt: string
}

type Consultant = {
  id: string
  firmName: string
  city: string
  state: string
}

export default function AdminUsersPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [users, setUsers] = useState<User[]>([])
  const [consultants, setConsultants] = useState<Consultant[]>([])
  const [filteredUsers, setFilteredUsers] = useState<User[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [editingUser, setEditingUser] = useState<User | null>(null)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    phone: '',
    consultantId: '',
  })
  const [formError, setFormError] = useState('')
  const [isSaving, setIsSaving] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('admin_token')
    if (!token) {
      router.push('/admin/login')
      return
    }
    setIsAuthenticated(true)
    fetchUsers()
    fetchConsultants()
  }, [router])

  useEffect(() => {
    filterUsers()
  }, [searchTerm, users])

  const fetchUsers = async () => {
    try {
      const response = await fetch('/api/admin/users')
      if (response.ok) {
        const data = await response.json()
        setUsers(data)
        setFilteredUsers(data)
      }
    } catch (error) {
      console.error('Error fetching users:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const fetchConsultants = async () => {
    try {
      const response = await fetch('/api/admin/consultants')
      if (response.ok) {
        const data = await response.json()
        setConsultants(data)
      }
    } catch (error) {
      console.error('Error fetching consultants:', error)
    }
  }

  const filterUsers = () => {
    if (!searchTerm) {
      setFilteredUsers(users)
      return
    }

    const filtered = users.filter(user =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.consultant?.firmName.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setFilteredUsers(filtered)
  }

  const openCreateModal = () => {
    setEditingUser(null)
    setFormData({
      email: '',
      password: '',
      name: '',
      phone: '',
      consultantId: '',
    })
    setFormError('')
    setShowModal(true)
  }

  const openEditModal = (user: User) => {
    setEditingUser(user)
    setFormData({
      email: user.email,
      password: '',
      name: user.name,
      phone: user.phone || '',
      consultantId: user.consultantId || '',
    })
    setFormError('')
    setShowModal(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    setFormError('')

    try {
      const url = editingUser
        ? `/api/admin/users/${editingUser.id}`
        : '/api/admin/users'

      const method = editingUser ? 'PATCH' : 'POST'

      const body: any = {
        name: formData.name,
        phone: formData.phone || null,
        consultantId: formData.consultantId || null,
      }

      if (!editingUser) {
        body.email = formData.email
        body.password = formData.password
      } else if (formData.password) {
        body.password = formData.password
      }

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })

      const data = await response.json()

      if (!response.ok) {
        setFormError(data.error || 'Failed to save user')
        return
      }

      setShowModal(false)
      fetchUsers()
    } catch (error) {
      setFormError('Failed to save user')
    } finally {
      setIsSaving(false)
    }
  }

  const toggleUserStatus = async (user: User) => {
    try {
      await fetch(`/api/admin/users/${user.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive: !user.isActive }),
      })
      fetchUsers()
    } catch (error) {
      console.error('Error toggling user status:', error)
    }
  }

  const deleteUser = async (id: string) => {
    if (!confirm('Are you sure you want to delete this user?')) return

    try {
      await fetch(`/api/admin/users/${id}`, { method: 'DELETE' })
      fetchUsers()
    } catch (error) {
      console.error('Error deleting user:', error)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('admin_token')
    router.push('/admin/login')
  }

  if (!isAuthenticated) {
    return null
  }

  // Get unlinked consultants for dropdown
  const unlinkedConsultants = consultants.filter(c =>
    !users.some(u => u.consultantId === c.id) ||
    (editingUser && editingUser.consultantId === c.id)
  )

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
              <h1 className="text-2xl font-bold text-white">User Management</h1>
            </div>
            <p className="text-gray-300 text-sm">Manage users who can access consultant dashboards</p>
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
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4">
              <p className="text-sm text-gray-600 mb-1">Total Users</p>
              <p className="text-2xl font-bold text-navy">{users.length}</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4">
              <p className="text-sm text-gray-600 mb-1">Active Users</p>
              <p className="text-2xl font-bold text-green-600">{users.filter(u => u.isActive).length}</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4">
              <p className="text-sm text-gray-600 mb-1">Linked to Consultant</p>
              <p className="text-2xl font-bold text-blue-600">{users.filter(u => u.consultantId).length}</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4">
              <p className="text-sm text-gray-600 mb-1">Unlinked</p>
              <p className="text-2xl font-bold text-yellow-600">{users.filter(u => !u.consultantId).length}</p>
            </div>
          </div>

          {/* Filters & Actions */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by name, email, or firm..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-blue-500"
                />
              </div>
              <button
                onClick={openCreateModal}
                className="flex items-center gap-2 bg-[var(--orange)] text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors whitespace-nowrap"
              >
                <Plus className="h-4 w-4" />
                Add User
              </button>
            </div>
          </div>

          {/* Users Table */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-bold text-navy">
                {filteredUsers.length} User{filteredUsers.length !== 1 ? 's' : ''}
              </h2>
            </div>

            {isLoading ? (
              <div className="p-8 text-center text-gray-500">Loading users...</div>
            ) : filteredUsers.length === 0 ? (
              <div className="p-8 text-center text-gray-500">No users found</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-blue-50 border-b border-blue-200">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-navy uppercase">User</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-navy uppercase">Contact</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-navy uppercase">Linked Consultant</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-navy uppercase">Status</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-navy uppercase">Last Login</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-navy uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredUsers.map((user) => (
                      <tr key={user.id} className="hover:bg-blue-50">
                        <td className="px-4 py-3">
                          <div className="font-medium text-navy">{user.name}</div>
                          <div className="text-xs text-gray-500">{user.email}</div>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600">
                          {user.phone || '-'}
                        </td>
                        <td className="px-4 py-3">
                          {user.consultant ? (
                            <div>
                              <div className="text-sm font-medium text-navy flex items-center gap-1">
                                <LinkIcon className="h-3 w-3" />
                                {user.consultant.firmName}
                              </div>
                              <div className="text-xs text-gray-500">
                                {user.consultant.city}, {user.consultant.state}
                              </div>
                            </div>
                          ) : (
                            <span className="text-xs text-yellow-600 bg-yellow-50 px-2 py-1 rounded">
                              Not linked
                            </span>
                          )}
                        </td>
                        <td className="px-4 py-3">
                          <span className={`inline-block px-2 py-1 rounded text-xs font-semibold ${
                            user.isActive
                              ? 'bg-green-100 text-green-700'
                              : 'bg-red-100 text-red-700'
                          }`}>
                            {user.isActive ? 'Active' : 'Inactive'}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600">
                          {user.lastLoginAt
                            ? new Date(user.lastLoginAt).toLocaleDateString('en-IN')
                            : 'Never'}
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => openEditModal(user)}
                              className="text-blue-600 hover:text-blue-700"
                              title="Edit"
                            >
                              <Edit className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => toggleUserStatus(user)}
                              className={user.isActive ? 'text-yellow-600 hover:text-yellow-700' : 'text-green-600 hover:text-green-700'}
                              title={user.isActive ? 'Deactivate' : 'Activate'}
                            >
                              {user.isActive ? <UserX className="h-4 w-4" /> : <UserCheck className="h-4 w-4" />}
                            </button>
                            <button
                              onClick={() => deleteUser(user.id)}
                              className="text-red-600 hover:text-red-700"
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-6 z-50">
          <div className="bg-white rounded-xl max-w-lg w-full">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-bold text-navy">
                {editingUser ? 'Edit User' : 'Create User'}
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {formError && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                  {formError}
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-blue-500"
                  required
                  disabled={!!editingUser}
                />
                {editingUser && (
                  <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password {editingUser ? '(leave blank to keep current)' : '*'}
                </label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-blue-500"
                  required={!editingUser}
                  minLength={6}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Link to Consultant</label>
                <select
                  value={formData.consultantId}
                  onChange={(e) => setFormData({ ...formData, consultantId: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-blue-500 bg-white"
                >
                  <option value="">-- No consultant linked --</option>
                  {unlinkedConsultants.map((consultant) => (
                    <option key={consultant.id} value={consultant.id}>
                      {consultant.firmName} ({consultant.city}, {consultant.state})
                    </option>
                  ))}
                </select>
                <p className="text-xs text-gray-500 mt-1">
                  Link this user to a consultant firm they can manage
                </p>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="flex-1 px-4 py-2 bg-[var(--blue)] text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300"
                >
                  {isSaving ? 'Saving...' : (editingUser ? 'Update User' : 'Create User')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
