import Image from 'next/image'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import DemoBanner from '@/components/DemoBanner'
import { Users, Globe, Award, Heart, MessageSquare } from 'lucide-react'

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <DemoBanner />
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative h-[400px] flex items-center justify-center">
          <div className="absolute inset-0">
            <Image
              src="https://images.unsplash.com/photo-1522199710521-72d69614c702?w=1920"
              alt="About us hero"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gray-900/60" />
          </div>
          <div className="relative z-10 text-center max-w-3xl mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">About Claude Travel Hub</h1>
            <p className="text-xl text-gray-200">
              Your AI-powered travel companion for unforgettable adventures
            </p>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  At Claude Travel Hub, we believe that travel should be accessible, personalized, and
                  enriching for everyone. Our mission is to leverage cutting-edge AI technology to help
                  travelers discover their perfect destinations and create memories that last a lifetime.
                </p>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  We combine the power of Claude AI with human expertise to provide recommendations
                  that truly understand your preferences, budget, and travel style. Whether you are
                  seeking adventure, relaxation, or cultural immersion, we are here to guide you every
                  step of the way.
                </p>
                <Link href="/assistant" className="btn-primary inline-flex items-center">
                  <MessageSquare className="h-5 w-5 mr-2" />
                  Talk to Claude AI
                </Link>
              </div>
              <div className="relative h-[400px] rounded-xl overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=800"
                  alt="Travel experience"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-primary-600">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/20 flex items-center justify-center">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <p className="text-4xl font-bold text-white mb-2">50K+</p>
                <p className="text-primary-100">Happy Travelers</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/20 flex items-center justify-center">
                  <Globe className="h-8 w-8 text-white" />
                </div>
                <p className="text-4xl font-bold text-white mb-2">100+</p>
                <p className="text-primary-100">Destinations</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/20 flex items-center justify-center">
                  <Award className="h-8 w-8 text-white" />
                </div>
                <p className="text-4xl font-bold text-white mb-2">4.9</p>
                <p className="text-primary-100">Average Rating</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/20 flex items-center justify-center">
                  <Heart className="h-8 w-8 text-white" />
                </div>
                <p className="text-4xl font-bold text-white mb-2">95%</p>
                <p className="text-primary-100">Would Recommend</p>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="card p-8 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary-100 flex items-center justify-center">
                  <span className="text-3xl">🌍</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Sustainable Travel</h3>
                <p className="text-gray-600">
                  We promote responsible tourism that respects local communities and preserves
                  our planet for future generations.
                </p>
              </div>
              <div className="card p-8 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary-100 flex items-center justify-center">
                  <span className="text-3xl">🤝</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Customer First</h3>
                <p className="text-gray-600">
                  Your satisfaction is our priority. We go above and beyond to ensure every
                  trip exceeds your expectations.
                </p>
              </div>
              <div className="card p-8 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary-100 flex items-center justify-center">
                  <span className="text-3xl">💡</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Innovation</h3>
                <p className="text-gray-600">
                  We continuously improve our AI capabilities to provide smarter, more
                  personalized travel recommendations.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Ready to Explore?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Let our AI-powered platform help you find your next adventure.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/tours" className="btn-primary py-3 px-8">
                Browse Tours
              </Link>
              <Link href="/contact" className="btn-outline py-3 px-8">
                Contact Us
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
