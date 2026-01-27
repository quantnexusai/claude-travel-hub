'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import DemoBanner from '@/components/DemoBanner'
import { useAuth } from '@/lib/auth-context'
import { User, Mail, Phone, Save, Loader2 } from 'lucide-react'

export default function ProfilePage() {
  const router = useRouter()
  const { user, profile, loading: authLoading, updateProfile, isDemo } = useAuth()
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    phone: '',
  })
  const [saving, setSaving] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (authLoading) return

    if (!user) {
      router.push('/')
      return
    }

    if (profile) {
      setFormData({
        first_name: profile.first_name || '',
        last_name: profile.last_name || '',
        phone: profile.phone || '',
      })
    }
  }, [user, profile, authLoading, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError(null)
    setSuccess(false)

    const { error: updateError } = await updateProfile(formData)

    setSaving(false)

    if (updateError) {
      setError(updateError.message)
    } else {
      setSuccess(true)
      setTimeout(() => setSuccess(false), 3000)
    }
  }

  if (authLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <DemoBanner />
      <Header />

      <main className="flex-1 py-12">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Profile Settings</h1>

          <div className="card p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Avatar Placeholder */}
              <div className="flex items-center space-x-4">
                <div className="w-20 h-20 rounded-full bg-primary-100 flex items-center justify-center">
                  <User className="h-10 w-10 text-primary-600" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">
                    {profile?.first_name} {profile?.last_name}
                  </h2>
                  <p className="text-gray-500">{profile?.email}</p>
                </div>
              </div>

              <hr />

              {/* Form Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    First Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      value={formData.first_name}
                      onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                      className="input pl-10"
                      placeholder="John"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      value={formData.last_name}
                      onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                      className="input pl-10"
                      placeholder="Doe"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="email"
                    value={profile?.email || ''}
                    className="input pl-10 bg-gray-50"
                    disabled
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="input pl-10"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
              </div>

              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
                  {error}
                </div>
              )}

              {success && (
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-sm text-green-700">
                  Profile updated successfully!
                </div>
              )}

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={saving}
                  className="btn-primary py-2 px-6 flex items-center space-x-2"
                >
                  {saving ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    <>
                      <Save className="h-5 w-5" />
                      <span>Save Changes</span>
                    </>
                  )}
                </button>
              </div>
            </form>

            {isDemo && (
              <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-700">
                  <strong>Demo Mode:</strong> Changes are saved locally and will reset when you refresh.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
