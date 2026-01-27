'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import DemoBanner from '@/components/DemoBanner'
import { isDemoMode, demoNews } from '@/lib/demo-data'
import { supabase } from '@/lib/supabase'
import type { NewsArticle } from '@/lib/types'
import { Calendar, ChevronLeft, Loader2 } from 'lucide-react'

export default function NewsArticlePage() {
  const params = useParams()
  const [article, setArticle] = useState<NewsArticle | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (isDemoMode()) {
      const found = demoNews.find(n => n.id === params.id)
      setArticle(found || null)
      setLoading(false)
      return
    }

    const fetchArticle = async () => {
      const { data, error } = await supabase
        .from('news')
        .select('*')
        .eq('id', params.id)
        .single()

      if (!error && data) {
        setArticle(data)
      }
      setLoading(false)
    }

    fetchArticle()
  }, [params.id])

  if (loading) {
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

  if (!article) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex flex-col items-center justify-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Article Not Found</h1>
          <Link href="/news" className="btn-primary">
            Browse News
          </Link>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <DemoBanner />
      <Header />

      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="bg-gray-50 py-4">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link href="/news" className="flex items-center text-primary-600 hover:text-primary-700">
              <ChevronLeft className="h-4 w-4 mr-1" />
              Back to News
            </Link>
          </div>
        </div>

        <article className="py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative h-[300px] md:h-[400px] rounded-xl overflow-hidden mb-8">
              <Image
                src={article.image_url}
                alt={article.title}
                fill
                className="object-cover"
                priority
              />
            </div>

            <div className="flex items-center text-gray-500 text-sm mb-4">
              <Calendar className="h-4 w-4 mr-2" />
              {new Date(article.created_at).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })}
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              {article.title}
            </h1>

            <div className="prose prose-lg max-w-none">
              <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                {article.content}
              </p>
            </div>

            <div className="mt-12 pt-8 border-t">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Related Tours</h3>
              <Link href="/tours" className="btn-primary">
                Browse All Tours
              </Link>
            </div>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  )
}
