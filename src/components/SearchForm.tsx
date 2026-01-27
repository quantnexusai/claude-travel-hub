'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Search, MapPin, Calendar, Users } from 'lucide-react'

interface SearchFormProps {
  variant?: 'hero' | 'compact'
}

export default function SearchForm({ variant = 'hero' }: SearchFormProps) {
  const router = useRouter()
  const [destination, setDestination] = useState('')
  const [date, setDate] = useState('')
  const [travelers, setTravelers] = useState('2')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams()
    if (destination) params.set('q', destination)
    if (date) params.set('date', date)
    if (travelers) params.set('travelers', travelers)
    router.push(`/tours?${params.toString()}`)
  }

  if (variant === 'compact') {
    return (
      <form onSubmit={handleSubmit} className="flex items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            placeholder="Search destinations..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>
        <button type="submit" className="btn-primary">
          Search
        </button>
      </form>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-xl p-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-1">Destination</label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder="Where to?"
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-1">When</label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-1">Travelers</label>
          <div className="relative">
            <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <select
              value={travelers}
              onChange={(e) => setTravelers(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent appearance-none"
            >
              <option value="1">1 Traveler</option>
              <option value="2">2 Travelers</option>
              <option value="3">3 Travelers</option>
              <option value="4">4 Travelers</option>
              <option value="5">5+ Travelers</option>
            </select>
          </div>
        </div>

        <div className="flex items-end">
          <button type="submit" className="w-full btn-primary py-3 flex items-center justify-center space-x-2">
            <Search className="h-5 w-5" />
            <span>Search Tours</span>
          </button>
        </div>
      </div>
    </form>
  )
}
