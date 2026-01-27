'use client'

import Link from 'next/link'
import { MapPin, Home, Search } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="text-center">
        <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-primary-100 flex items-center justify-center">
          <MapPin className="h-12 w-12 text-primary-600" />
        </div>
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Page Not Found</h2>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          Looks like you have wandered off the beaten path. The page you are looking for does not exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/" className="btn-primary py-3 px-6 flex items-center justify-center space-x-2">
            <Home className="h-5 w-5" />
            <span>Back to Home</span>
          </Link>
          <Link href="/tours" className="btn-outline py-3 px-6 flex items-center justify-center space-x-2">
            <Search className="h-5 w-5" />
            <span>Browse Tours</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
