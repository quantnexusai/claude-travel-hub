import Link from 'next/link'
import { Plane, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <Plane className="h-8 w-8 text-primary-400" />
              <span className="text-xl font-bold">Claude Travel Hub</span>
            </Link>
            <p className="text-gray-400 text-sm mb-4">
              Discover amazing tours worldwide with AI-powered travel recommendations. Your adventure starts here.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/tours" className="text-gray-400 hover:text-white transition-colors">
                  All Tours
                </Link>
              </li>
              <li>
                <Link href="/news" className="text-gray-400 hover:text-white transition-colors">
                  Travel News
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Tour Types */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Tour Types</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/tours?type=beach" className="text-gray-400 hover:text-white transition-colors">
                  Beach & Resort
                </Link>
              </li>
              <li>
                <Link href="/tours?type=adventure" className="text-gray-400 hover:text-white transition-colors">
                  Adventure
                </Link>
              </li>
              <li>
                <Link href="/tours?type=cultural" className="text-gray-400 hover:text-white transition-colors">
                  Cultural
                </Link>
              </li>
              <li>
                <Link href="/tours?type=cruise" className="text-gray-400 hover:text-white transition-colors">
                  Cruise
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-3 text-gray-400">
                <MapPin className="h-5 w-5 flex-shrink-0" />
                <span>123 Travel Street, Adventure City</span>
              </li>
              <li className="flex items-center space-x-3 text-gray-400">
                <Phone className="h-5 w-5 flex-shrink-0" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center space-x-3 text-gray-400">
                <Mail className="h-5 w-5 flex-shrink-0" />
                <span>info@claudetravelhub.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} Claude Travel Hub. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-gray-400 hover:text-white text-sm transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
