import Link from 'next/link'
import Image from 'next/image'
import { MapPin, Star, Calendar } from 'lucide-react'
import type { Tour } from '@/lib/types'

interface TourCardProps {
  tour: Tour
}

export default function TourCard({ tour }: TourCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    })
  }

  return (
    <Link href={`/tours/${tour.id}`} className="card group hover:shadow-lg transition-shadow duration-300">
      <div className="relative h-48 overflow-hidden">
        <Image
          src={tour.image_url}
          alt={tour.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {tour.featured && (
          <div className="absolute top-3 left-3 bg-accent-500 text-white text-xs font-medium px-2 py-1 rounded">
            Featured
          </div>
        )}
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-gray-900 text-sm font-semibold px-2 py-1 rounded">
          ${tour.price.toLocaleString()}
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center text-gray-500 text-sm">
            <MapPin className="h-4 w-4 mr-1" />
            {tour.country}
          </div>
          <div className="flex items-center text-yellow-500 text-sm">
            <Star className="h-4 w-4 mr-1 fill-current" />
            {tour.rating.toFixed(1)}
          </div>
        </div>

        <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
          {tour.name}
        </h3>

        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {tour.description}
        </p>

        <div className="flex items-center text-gray-500 text-sm">
          <Calendar className="h-4 w-4 mr-1" />
          {formatDate(tour.start_date)} - {formatDate(tour.end_date)}
        </div>
      </div>
    </Link>
  )
}
