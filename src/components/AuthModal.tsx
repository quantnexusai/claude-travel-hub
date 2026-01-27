'use client'

import { useState } from 'react'
import { X, Loader2 } from 'lucide-react'
import { useAuth } from '@/lib/auth-context'

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
  mode: 'signin' | 'signup'
  onModeChange: (mode: 'signin' | 'signup') => void
}

export default function AuthModal({ isOpen, onClose, mode, onModeChange }: AuthModalProps) {
  const { signIn, signUp, resetPassword, isDemo } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [showForgotPassword, setShowForgotPassword] = useState(false)

  if (!isOpen) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSuccess(null)

    try {
      if (showForgotPassword) {
        const { error } = await resetPassword(email)
        if (error) {
          setError(error.message)
        } else {
          setSuccess('Password reset email sent! Check your inbox.')
        }
      } else if (mode === 'signin') {
        const { error } = await signIn(email, password)
        if (error) {
          setError(error.message)
        } else {
          onClose()
        }
      } else {
        const { error } = await signUp(email, password, firstName, lastName)
        if (error) {
          setError(error.message)
        } else {
          if (isDemo) {
            onClose()
          } else {
            setSuccess('Account created! Please check your email to verify.')
          }
        }
      }
    } catch (err) {
      setError('An unexpected error occurred')
    } finally {
      setLoading(false)
    }
  }

  const resetForm = () => {
    setEmail('')
    setPassword('')
    setFirstName('')
    setLastName('')
    setError(null)
    setSuccess(null)
    setShowForgotPassword(false)
  }

  const handleModeChange = (newMode: 'signin' | 'signup') => {
    resetForm()
    onModeChange(newMode)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white rounded-xl shadow-xl w-full max-w-md mx-4 p-6 animate-fadeIn">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X className="h-5 w-5" />
        </button>

        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          {showForgotPassword ? 'Reset Password' : mode === 'signin' ? 'Welcome Back' : 'Create Account'}
        </h2>

        {isDemo && (
          <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-700">
            Demo Mode: Authentication is simulated. Any credentials will work.
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'signup' && !showForgotPassword && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  First Name
                </label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="input"
                  placeholder="John"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Last Name
                </label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="input"
                  placeholder="Doe"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input"
              placeholder="you@example.com"
              required
            />
          </div>

          {!showForgotPassword && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input"
                placeholder="Enter your password"
                required
                minLength={6}
              />
            </div>
          )}

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
              {error}
            </div>
          )}

          {success && (
            <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-sm text-green-700">
              {success}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full btn-primary flex items-center justify-center space-x-2 py-3"
          >
            {loading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <span>
                {showForgotPassword ? 'Send Reset Email' : mode === 'signin' ? 'Sign In' : 'Create Account'}
              </span>
            )}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
          {showForgotPassword ? (
            <button
              onClick={() => setShowForgotPassword(false)}
              className="text-primary-600 hover:text-primary-700 font-medium"
            >
              Back to Sign In
            </button>
          ) : mode === 'signin' ? (
            <>
              <button
                onClick={() => setShowForgotPassword(true)}
                className="text-primary-600 hover:text-primary-700 font-medium mb-2 block w-full"
              >
                Forgot your password?
              </button>
              <span>
                Do not have an account?{' '}
                <button
                  onClick={() => handleModeChange('signup')}
                  className="text-primary-600 hover:text-primary-700 font-medium"
                >
                  Sign Up
                </button>
              </span>
            </>
          ) : (
            <span>
              Already have an account?{' '}
              <button
                onClick={() => handleModeChange('signin')}
                className="text-primary-600 hover:text-primary-700 font-medium"
              >
                Sign In
              </button>
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
