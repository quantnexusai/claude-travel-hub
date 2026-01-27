'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import DemoBanner from '@/components/DemoBanner'
import { isDemoMode, demoNews } from '@/lib/demo-data'
import { supabase } from '@/lib/supabase'
import type { NewsArticle } from '@/lib/types'
import { Calendar, ArrowRight } from 'lucide-react'

export default function NewsPage() {
  const [articles, setArticles] = useState<NewsArticle[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (isDemoMode()) {
      setArticles(demoNews)
      setLoading(false)
      return
    }

    const fetchNews = async () => {
      const { data, error } = await supabase
        .from('news')
        .select('*')
        .eq('published', true)
        .order('created_at', { ascending: false })

      if (!error && data) {
        setArticles(data)
      }
      setLoading(false)
    }

    fetchNews()
  }, [])

  return (
    <div className="min-h-screen flex flex-col">
      <DemoBanner />
      <Header />

      <main className="flex-1 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Travel News & Tips</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Stay updated with the latest travel trends, destination guides, and expert tips.
            </p>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="card animate-pulse">
                  <div className="h-48 bg-gray-200" />
                  <div className="p-6 space-y-3">
                    <div className="h-4 bg-gray-200 rounded w-1/3" />
                    <div className="h-6 bg-gray-200 rounded w-3/4" />
                    <div className="h-4 bg-gray-200 rounded w-full" />
                  </div>
                </div>
              ))}
            </div>
          ) : articles.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No articles available yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {articles.map((article) => (
                <Link key={article.id} href={`/news/${article.id}`} className="card group hover:shadow-lg transition-shadow">
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={article.image_url}
                      alt={article.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center text-gray-500 text-sm mb-3">
                      <Calendar className="h-4 w-4 mr-2" />
                      {new Date(article.created_at).toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                      {article.title}
                    </h2>
                    <p className="text-gray-600 line-clamp-2 mb-4">{article.excerpt}</p>
                    <span className="text-primary-600 font-medium flex items-center">
                      Read More <ArrowRight className="h-4 w-4 ml-1" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
