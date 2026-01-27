'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import DemoBanner from '@/components/DemoBanner'
import TourCard from '@/components/TourCard'
import SearchForm from '@/components/SearchForm'
import { isDemoMode, demoTours, demoTourTypes } from '@/lib/demo-data'
import { supabase } from '@/lib/supabase'
import type { Tour, TourType } from '@/lib/types'
import { Filter, X } from 'lucide-react'

function ToursContent() {
  const searchParams = useSearchParams()
  const [tours, setTours] = useState<Tour[]>([])
  const [tourTypes, setTourTypes] = useState<TourType[]>([])
  const [loading, setLoading] = useState(true)
  const [showFilters, setShowFilters] = useState(false)

  const [filters, setFilters] = useState({
    type: searchParams.get('type') || '',
    minPrice: '',
    maxPrice: '',
    country: '',
    sortBy: 'featured',
  })

  useEffect(() => {
    if (isDemoMode()) {
      let filtered = [...demoTours]
      const query = searchParams.get('q')?.toLowerCase()

      if (query) {
        filtered = filtered.filter(
          t => t.name.toLowerCase().includes(query) || t.country.toLowerCase().includes(query)
        )
      }

      if (filters.type) {
        filtered = filtered.filter(t => t.tour_type_id === filters.type)
      }

      if (filters.minPrice) {
        filtered = filtered.filter(t => t.price >= Number(filters.minPrice))
      }

      if (filters.maxPrice) {
        filtered = filtered.filter(t => t.price <= Number(filters.maxPrice))
      }

      if (filters.country) {
        filtered = filtered.filter(t => t.country.toLowerCase().includes(filters.country.toLowerCase()))
      }

      if (filters.sortBy === 'price-low') {
        filtered.sort((a, b) => a.price - b.price)
      } else if (filters.sortBy === 'price-high') {
        filtered.sort((a, b) => b.price - a.price)
      } else if (filters.sortBy === 'rating') {
        filtered.sort((a, b) => b.rating - a.rating)
      } else {
        filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0))
      }

      setTours(filtered)
      setTourTypes(demoTourTypes)
      setLoading(false)
      return
    }

    const fetchData = async () => {
      setLoading(true)

      let query = supabase.from('tours').select('*')

      if (filters.type) {
        query = query.eq('tour_type_id', filters.type)
      }

      if (filters.minPrice) {
        query = query.gte('price', Number(filters.minPrice))
      }

      if (filters.maxPrice) {
        query = query.lte('price', Number(filters.maxPrice))
      }

      if (filters.country) {
        query = query.ilike('country', `%${filters.country}%`)
      }

      if (filters.sortBy === 'price-low') {
        query = query.order('price', { ascending: true })
      } else if (filters.sortBy === 'price-high') {
        query = query.order('price', { ascending: false })
      } else if (filters.sortBy === 'rating') {
        query = query.order('rating', { ascending: false })
      } else {
        query = query.order('featured', { ascending: false })
      }

      const [toursRes, typesRes] = await Promise.all([
        query,
        supabase.from('tour_types').select('*'),
      ])

      if (toursRes.data) setTours(toursRes.data)
      if (typesRes.data) setTourTypes(typesRes.data)
      setLoading(false)
    }

    fetchData()
  }, [searchParams, filters])

  const clearFilters = () => {
    setFilters({
      type: '',
      minPrice: '',
      maxPrice: '',
      country: '',
      sortBy: 'featured',
    })
  }

  const hasActiveFilters = filters.type || filters.minPrice || filters.maxPrice || filters.country

  return (
    <div className="min-h-screen flex flex-col">
      <DemoBanner />
      <Header />

      <main className="flex-1 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Search Bar */}
          <div className="mb-8">
            <SearchForm variant="compact" />
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters Sidebar - Desktop */}
            <aside className="hidden lg:block w-64 flex-shrink-0">
              <div className="card p-6 sticky top-24">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
                  {hasActiveFilters && (
                    <button onClick={clearFilters} className="text-sm text-primary-600 hover:text-primary-700">
                      Clear All
                    </button>
                  )}
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Tour Type</label>
                    <select
                      value={filters.type}
                      onChange={(e) => setFilters({ ...filters, type: e.target.value })}
                      className="input"
                    >
                      <option value="">All Types</option>
                      {tourTypes.map((type) => (
                        <option key={type.id} value={type.id}>{type.name}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
                    <div className="flex space-x-2">
                      <input
                        type="number"
                        value={filters.minPrice}
                        onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
                        placeholder="Min"
                        className="input"
                      />
                      <input
                        type="number"
                        value={filters.maxPrice}
                        onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
                        placeholder="Max"
                        className="input"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
                    <input
                      type="text"
                      value={filters.country}
                      onChange={(e) => setFilters({ ...filters, country: e.target.value })}
                      placeholder="Search country..."
                      className="input"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
                    <select
                      value={filters.sortBy}
                      onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}
                      className="input"
                    >
                      <option value="featured">Featured</option>
                      <option value="price-low">Price: Low to High</option>
                      <option value="price-high">Price: High to Low</option>
                      <option value="rating">Top Rated</option>
                    </select>
                  </div>
                </div>
              </div>
            </aside>

            {/* Mobile Filter Button */}
            <button
              onClick={() => setShowFilters(true)}
              className="lg:hidden flex items-center justify-center space-x-2 btn-secondary mb-4"
            >
              <Filter className="h-5 w-5" />
              <span>Filters</span>
              {hasActiveFilters && (
                <span className="bg-primary-600 text-white text-xs rounded-full px-2 py-0.5">
                  Active
                </span>
              )}
            </button>

            {/* Mobile Filters Modal */}
            {showFilters && (
              <div className="lg:hidden fixed inset-0 z-50 bg-black/50">
                <div className="absolute right-0 top-0 h-full w-80 bg-white p-6 overflow-y-auto">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
                    <button onClick={() => setShowFilters(false)}>
                      <X className="h-6 w-6 text-gray-500" />
                    </button>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Tour Type</label>
                      <select
                        value={filters.type}
                        onChange={(e) => setFilters({ ...filters, type: e.target.value })}
                        className="input"
                      >
                        <option value="">All Types</option>
                        {tourTypes.map((type) => (
                          <option key={type.id} value={type.id}>{type.name}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
                      <div className="flex space-x-2">
                        <input
                          type="number"
                          value={filters.minPrice}
                          onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
                          placeholder="Min"
                          className="input"
                        />
                        <input
                          type="number"
                          value={filters.maxPrice}
                          onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
                          placeholder="Max"
                          className="input"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
                      <input
                        type="text"
                        value={filters.country}
                        onChange={(e) => setFilters({ ...filters, country: e.target.value })}
                        placeholder="Search country..."
                        className="input"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
                      <select
                        value={filters.sortBy}
                        onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}
                        className="input"
                      >
                        <option value="featured">Featured</option>
                        <option value="price-low">Price: Low to High</option>
                        <option value="price-high">Price: High to Low</option>
                        <option value="rating">Top Rated</option>
                      </select>
                    </div>
                  </div>

                  <div className="mt-6 flex space-x-3">
                    {hasActiveFilters && (
                      <button onClick={clearFilters} className="flex-1 btn-secondary">
                        Clear
                      </button>
                    )}
                    <button onClick={() => setShowFilters(false)} className="flex-1 btn-primary">
                      Apply
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Tours Grid */}
            <div className="flex-1">
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-900">
                  {loading ? 'Loading...' : `${tours.length} Tours Found`}
                </h1>
              </div>

              {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="card animate-pulse">
                      <div className="h-48 bg-gray-200" />
                      <div className="p-4 space-y-3">
                        <div className="h-4 bg-gray-200 rounded w-1/3" />
                        <div className="h-6 bg-gray-200 rounded w-2/3" />
                        <div className="h-4 bg-gray-200 rounded w-full" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : tours.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-lg">No tours found matching your criteria.</p>
                  <button onClick={clearFilters} className="mt-4 btn-primary">
                    Clear Filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {tours.map((tour) => (
                    <TourCard key={tour.id} tour={tour} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default function ToursPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <ToursContent />
    </Suspense>
  )
}
