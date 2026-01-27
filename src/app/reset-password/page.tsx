'use client'

import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { useAuth } from '@/lib/auth-context'
import { supabase } from '@/lib/supabase'
import { KeyRound, Loader2, CheckCircle, AlertCircle } from 'lucide-react'

function ResetPasswordContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { isDemo } = useAuth()
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Check if we have the required tokens in URL
    const accessToken = searchParams.get('access_token')
    const type = searchParams.get('type')

    if (accessToken && type === 'recovery') {
      supabase.auth.setSession({
        access_token: accessToken,
        refresh_token: searchParams.get('refresh_token') || '',
      })
    }
  }, [searchParams])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }

    setLoading(true)

    if (isDemo) {
      setTimeout(() => {
        setLoading(false)
        setSuccess(true)
      }, 1000)
      return
    }

    const { error: updateError } = await supabase.auth.updateUser({
      password,
    })

    setLoading(false)

    if (updateError) {
      setError(updateError.message)
    } else {
      setSuccess(true)
      setTimeout(() => router.push('/'), 3000)
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 flex items-center justify-center py-12">
        <div className="max-w-md w-full mx-auto px-4">
          <div className="card p-8">
            {success ? (
              <div className="text-center">
                <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Password Updated!</h1>
                <p className="text-gray-600 mb-6">
                  Your password has been successfully updated. You will be redirected to the home page.
                </p>
                <Link href="/" className="btn-primary">
                  Go to Home
                </Link>
              </div>
            ) : (
              <>
                <div className="text-center mb-6">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary-100 flex items-center justify-center">
                    <KeyRound className="h-8 w-8 text-primary-600" />
                  </div>
                  <h1 className="text-2xl font-bold text-gray-900">Reset Password</h1>
                  <p className="text-gray-600 mt-1">Enter your new password below</p>
                </div>

                {isDemo && (
                  <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-700">
                    Demo Mode: Password reset is simulated.
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      New Password
                    </label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="input"
                      placeholder="Enter new password"
                      required
                      minLength={6}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="input"
                      placeholder="Confirm new password"
                      required
                      minLength={6}
                    />
                  </div>

                  {error && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700 flex items-start">
                      <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0" />
                      {error}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full btn-primary py-3 flex items-center justify-center"
                  >
                    {loading ? (
                      <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                      'Update Password'
                    )}
                  </button>
                </form>

                <div className="mt-6 text-center">
                  <Link href="/" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                    Back to Home
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-primary-600" /></div>}>
      <ResetPasswordContent />
    </Suspense>
  )
}
