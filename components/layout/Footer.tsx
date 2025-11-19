import Link from 'next/link'
import Image from 'next/image'
import { Mail } from 'lucide-react'
import { categories } from '@/lib/data'

export default function Footer() {
  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <Link href="/" className="block mb-4">
              <Image 
                src="/tnf-logo.png" 
                alt="TNF Logo" 
                width={100} 
                height={35}
                className="h-7 w-auto dark:invert"
              />
            </Link>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              A modern news and magazine website bringing you the latest updates from around the world.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-500 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/latest" className="text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-500 transition-colors">
                  Latest News
                </Link>
              </li>
              <li>
                <Link href="/trending" className="text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-500 transition-colors">
                  Trending
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-500 transition-colors">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-semibold mb-4">Categories</h4>
            <ul className="space-y-2 text-sm">
              {categories.slice(0, 6).map((cat) => (
                <li key={cat.id}>
                  <Link
                    href={`/category/${cat.slug}`}
                    className="text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-500 transition-colors"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-semibold mb-4">Newsletter</h4>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
              Subscribe to get notified about new posts, news and tips.
            </p>
            <form className="flex gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-4 py-2.5 border-2 border-gray-300 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
              />
              <button
                type="submit"
                className="px-5 py-2.5 bg-primary text-white rounded-xl hover:bg-primary-dark transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-100"
              >
                <Mail className="w-4 h-4" />
              </button>
            </form>
            <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
              Do not worry we don't spam!
            </p>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
            <p>TNF © {new Date().getFullYear()}, All rights reserved.</p>
            <div className="flex gap-6">
              <Link href="/privacy" className="hover:text-red-600 dark:hover:text-red-500 transition-colors">
                Privacy notice
              </Link>
              <Link href="/terms" className="hover:text-red-600 dark:hover:text-red-500 transition-colors">
                Terms of condition
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

