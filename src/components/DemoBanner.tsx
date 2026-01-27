'use client'

import { useAuth } from '@/lib/auth-context'
import { Info, X } from 'lucide-react'
import { useState } from 'react'

export default function DemoBanner() {
  const { isDemo } = useAuth()
  const [dismissed, setDismissed] = useState(false)

  if (!isDemo || dismissed) return null

  return (
    <div className="bg-gradient-to-r from-primary-600 to-accent-500 text-white px-4 py-2">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2 text-sm">
          <Info className="h-4 w-4 flex-shrink-0" />
          <span>
            <strong>Demo Mode:</strong> This is a preview with sample data. Deploy your own instance to connect real data.
          </span>
        </div>
        <button
          onClick={() => setDismissed(true)}
          className="text-white/80 hover:text-white transition-colors"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}
