'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X, Search, ShoppingCart, Bookmark, User, Moon, Sun, ChevronDown, MoreHorizontal, Dot } from 'lucide-react'
import { useTheme } from '@/components/providers/ThemeProvider'
import SearchModal from '@/components/modals/SearchModal'
import MenuPanel from '@/components/modals/MenuPanel'
import CartPanel from '@/components/modals/CartPanel'
import FavoritesModal from '@/components/modals/FavoritesModal'
import AccountModal from '@/components/modals/AccountModal'
import { Article } from '@/types'
import { getArticleUrl } from '@/lib/utils'

// Format time ago helper
function formatTimeAgo(dateString: string): string {
  const date = new Date(dateString)
  const now = new Date()
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)
  
  if (diffInSeconds < 60) return 'Just now'
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`
  
  return date.toLocaleDateString()
}

export default function Header() {
  const [menuPanelOpen, setMenuPanelOpen] = useState(false)
  const [cartPanelOpen, setCartPanelOpen] = useState(false)
  const [searchModalOpen, setSearchModalOpen] = useState(false)
  const [favoritesModalOpen, setFavoritesModalOpen] = useState(false)
  const [accountModalOpen, setAccountModalOpen] = useState(false)
  const [categoriesOpen, setCategoriesOpen] = useState(false)
  const [latestOpen, setLatestOpen] = useState(false)
  const [politicsOpen, setPoliticsOpen] = useState(false)
  const [opinionsOpen, setOpinionsOpen] = useState(false)
  const [worldOpen, setWorldOpen] = useState(false)
  const [mediaOpen, setMediaOpen] = useState(false)
  const [overflowOpen, setOverflowOpen] = useState(false)
  const { theme, toggleTheme } = useTheme()

  // WordPress data state
  const [allArticles, setAllArticles] = useState<Article[]>([])
  const [allCategories, setAllCategories] = useState<{ id: string; name: string; slug: string }[]>([])
  const [latestArticles, setLatestArticles] = useState<Article[]>([])
  const [topNewsArticles, setTopNewsArticles] = useState<Article[]>([])

  // Fetch WordPress data
  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch posts
        const postsResponse = await fetch('/api/posts?per_page=50')
        const posts = await postsResponse.json()
        // Handle both { articles } and direct array response
        const articlesArray = Array.isArray(posts) ? posts : (posts.articles || [])
        setAllArticles(articlesArray)

        // Sort by date for latest
        const sortedByDate = [...(posts || [])].sort((a, b) => 
          new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
        )
        setLatestArticles(sortedByDate.slice(0, 10))
        setTopNewsArticles(sortedByDate.slice(0, 6))

        // Fetch categories
        const categoriesResponse = await fetch('/api/categories')
        const categories = await categoriesResponse.json()
        setAllCategories(categories || [])
      } catch (error) {
        console.error('Error fetching header data:', error)
      }
    }

    fetchData()
  }, [])

  // Filter articles by category
  const getArticlesByCategory = (categoryName: string, limit: number = 5): Article[] => {
    return allArticles
      .filter(article => article.category.toLowerCase() === categoryName.toLowerCase())
      .slice(0, limit)
  }

  // Get category slug by name
  const getCategorySlug = (categoryName: string): string => {
    const category = allCategories.find(cat => 
      cat.name.toLowerCase() === categoryName.toLowerCase()
    )
    return category?.slug || categoryName.toLowerCase()
  }

  return (
    <>
      <header className="sticky top-0 z-[999] w-full">
        {/* Top Red Navbar with Scrolling Ticker */}
        <div className="bg-primary-600 text-white py-2 overflow-hidden relative" style={{ height: '32px' }}>
          <div className="container max-w-7xl mx-auto px-4">
            <div className="flex items-center gap-8 overflow-hidden">
              <div className="flex items-center gap-8 animate-scroll whitespace-nowrap">
                {topNewsArticles.length > 0 ? (
                  topNewsArticles.map((article, index) => (
                    <span key={article.id} className="flex items-center gap-2">
                      <Link href={getArticleUrl(article)} className="text-xs text-white hover:underline">
                        {article.title}
                      </Link>
                      {index < topNewsArticles.length - 1 && <span className="text-white/70">·</span>}
                    </span>
                  ))
                ) : (
                  <span className="text-xs text-white">Loading latest news...</span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Center Navbar with Mega Menus */}
        <div className="hidden lg:block relative border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-black">
          <div className="container max-w-5xl mx-auto px-4">
            <div className="flex items-center justify-between flex-1 text-base font-bold" style={{ height: '48px' }}>
              <div className="relative">
                <button
                  className="dark:text-white hover:text-primary transition-colors"
                  onMouseEnter={() => setCategoriesOpen(true)}
                  onMouseLeave={() => setCategoriesOpen(false)}
                >
                  <span className="text-xl">🏢</span>
                </button>
                {categoriesOpen && (
                  <div
                    className="absolute top-full left-0 mt-0 w-96 bg-white dark:bg-gray-900 shadow-professional-lg border border-gray-200 dark:border-gray-800 rounded-lg p-6 z-[1000]"
                    onMouseEnter={() => setCategoriesOpen(true)}
                    onMouseLeave={() => setCategoriesOpen(false)}
                  >
                    <div className="grid grid-cols-2 gap-4">
                      {allCategories.length > 0 ? (
                        allCategories.map((cat) => (
                          <Link
                            key={cat.id}
                            href={`/category/${cat.slug}`}
                            className="text-sm hover:text-primary transition-colors dark:text-white py-1"
                          >
                            {cat.name}
                          </Link>
                        ))
                      ) : (
                        <span className="text-sm text-gray-500 dark:text-gray-400">Loading categories...</span>
                      )}
                    </div>
                  </div>
                )}
              </div>
              
              <div className="relative">
                <button
                  className="dark:text-white hover:text-primary transition-colors flex items-center gap-1"
                  onMouseEnter={() => setLatestOpen(true)}
                  onMouseLeave={() => setLatestOpen(false)}
                >
                  Latest <ChevronDown className="w-3 h-3" />
                </button>
                {latestOpen && (
                  <div
                    className="absolute top-full left-0 mt-0 w-[600px] bg-white dark:bg-gray-900 shadow-professional-lg border border-gray-200 dark:border-gray-800 rounded-lg p-6 z-[1000]"
                    onMouseEnter={() => setLatestOpen(true)}
                    onMouseLeave={() => setLatestOpen(false)}
                  >
                    <div className="flex gap-3 mb-4 border-b border-gray-200 dark:border-gray-700 pb-3">
                      <Link href="/latest" className="text-primary font-semibold border-b-2 border-primary pb-1">Latest</Link>
                      <Link href="/latest?filter=all" className="text-gray-600 dark:text-white hover:text-primary">All</Link>
                      <Link href="/latest?filter=politics" className="text-gray-600 dark:text-white hover:text-primary">Politics</Link>
                      <Link href="/latest?filter=opinions" className="text-gray-600 dark:text-white hover:text-primary">Opinions</Link>
                      <Link href="/latest?filter=world" className="text-gray-600 dark:text-white hover:text-primary">World</Link>
                      <Link href="/latest?filter=media" className="text-gray-600 dark:text-white hover:text-primary">Media</Link>
                    </div>
                    <div className="space-y-3">
                      {latestArticles.length > 0 ? (
                        latestArticles.slice(0, 5).map((article) => (
                          <Link key={article.id} href={getArticleUrl(article)} className="flex gap-3 group">
                            <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden">
                              <Image src={article.image} alt={article.title} fill className="object-cover" />
                            </div>
                            <div className="flex-1">
                              <h4 className="text-sm font-bold line-clamp-2 group-hover:text-primary transition-colors dark:text-white">
                                {article.title}
                              </h4>
                              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                {formatTimeAgo(article.publishedAt)} · {article.views} views
                              </div>
                            </div>
                          </Link>
                        ))
                      ) : (
                        <span className="text-sm text-gray-500 dark:text-gray-400">Loading latest articles...</span>
                      )}
                    </div>
                  </div>
                )}
              </div>

              <div className="relative">
                <button
                  className="dark:text-white hover:text-primary transition-colors flex items-center gap-1"
                  onMouseEnter={() => setPoliticsOpen(true)}
                  onMouseLeave={() => setPoliticsOpen(false)}
                >
                  Politics <ChevronDown className="w-3 h-3" />
                </button>
                {politicsOpen && (
                  <div
                    className="absolute top-full left-0 mt-0 w-[600px] bg-white dark:bg-gray-900 shadow-professional-lg border border-gray-200 dark:border-gray-800 rounded-lg p-6 z-[1000]"
                    onMouseEnter={() => setPoliticsOpen(true)}
                    onMouseLeave={() => setPoliticsOpen(false)}
                  >
                    <div className="space-y-3">
                      {getArticlesByCategory('Politics').length > 0 ? (
                        getArticlesByCategory('Politics').map((article) => (
                          <Link key={article.id} href={getArticleUrl(article)} className="flex gap-3 group">
                            <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden">
                              <Image src={article.image} alt={article.title} fill className="object-cover" />
                            </div>
                            <div className="flex-1">
                              <h4 className="text-sm font-bold line-clamp-2 group-hover:text-primary transition-colors dark:text-white">
                                {article.title}
                              </h4>
                              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                {formatTimeAgo(article.publishedAt)} · {article.views} views
                              </div>
                            </div>
                          </Link>
                        ))
                      ) : (
                        latestArticles.slice(0, 5).map((article) => (
                          <Link key={article.id} href={getArticleUrl(article)} className="flex gap-3 group">
                            <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden">
                              <Image src={article.image} alt={article.title} fill className="object-cover" />
                            </div>
                            <div className="flex-1">
                              <h4 className="text-sm font-bold line-clamp-2 group-hover:text-primary transition-colors dark:text-white">
                                {article.title}
                              </h4>
                              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                {formatTimeAgo(article.publishedAt)} · {article.views} views
                              </div>
                            </div>
                          </Link>
                        ))
                      )}
                    </div>
                  </div>
                )}
              </div>

              <div className="relative">
                <button
                  className="dark:text-white hover:text-primary transition-colors flex items-center gap-1"
                  onMouseEnter={() => setOpinionsOpen(true)}
                  onMouseLeave={() => setOpinionsOpen(false)}
                >
                  Opinions <ChevronDown className="w-3 h-3" />
                </button>
                {opinionsOpen && (
                  <div
                    className="absolute top-full left-0 mt-0 w-[600px] bg-white dark:bg-gray-900 shadow-professional-lg border border-gray-200 dark:border-gray-800 rounded-lg p-6 z-[1000]"
                    onMouseEnter={() => setOpinionsOpen(true)}
                    onMouseLeave={() => setOpinionsOpen(false)}
                  >
                    <div className="space-y-3">
                      {getArticlesByCategory('Opinions').length > 0 ? (
                        getArticlesByCategory('Opinions').map((article) => (
                          <Link key={article.id} href={getArticleUrl(article)} className="flex gap-3 group">
                            <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden">
                              <Image src={article.image} alt={article.title} fill className="object-cover" />
                            </div>
                            <div className="flex-1">
                              <h4 className="text-sm font-bold line-clamp-2 group-hover:text-primary transition-colors dark:text-white">
                                {article.title}
                              </h4>
                              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                {formatTimeAgo(article.publishedAt)} · {article.views} views
                              </div>
                            </div>
                          </Link>
                        ))
                      ) : (
                        latestArticles.slice(0, 5).map((article) => (
                          <Link key={article.id} href={getArticleUrl(article)} className="flex gap-3 group">
                            <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden">
                              <Image src={article.image} alt={article.title} fill className="object-cover" />
                            </div>
                            <div className="flex-1">
                              <h4 className="text-sm font-bold line-clamp-2 group-hover:text-primary transition-colors dark:text-white">
                                {article.title}
                              </h4>
                              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                {formatTimeAgo(article.publishedAt)} · {article.views} views
                              </div>
                            </div>
                          </Link>
                        ))
                      )}
                    </div>
                  </div>
                )}
              </div>

              <div className="relative">
                <button
                  className="dark:text-white hover:text-primary transition-colors flex items-center gap-1"
                  onMouseEnter={() => setWorldOpen(true)}
                  onMouseLeave={() => setWorldOpen(false)}
                >
                  World <ChevronDown className="w-3 h-3" />
                </button>
                {worldOpen && (
                  <div
                    className="absolute top-full left-0 mt-0 w-[600px] bg-white dark:bg-gray-900 shadow-professional-lg border border-gray-200 dark:border-gray-800 rounded-lg p-6 z-[1000]"
                    onMouseEnter={() => setWorldOpen(true)}
                    onMouseLeave={() => setWorldOpen(false)}
                  >
                    <div className="space-y-3">
                      {getArticlesByCategory('World').length > 0 || getArticlesByCategory('Arts').length > 0 ? (
                        [...getArticlesByCategory('World'), ...getArticlesByCategory('Arts')]
                          .slice(0, 5)
                          .map((article) => (
                            <Link key={article.id} href={getArticleUrl(article)} className="flex gap-3 group">
                              <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden">
                                <Image src={article.image} alt={article.title} fill className="object-cover" />
                              </div>
                              <div className="flex-1">
                                <h4 className="text-sm font-bold line-clamp-2 group-hover:text-primary transition-colors dark:text-white">
                                  {article.title}
                                </h4>
                                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                  {formatTimeAgo(article.publishedAt)} · {article.views} views
                                </div>
                              </div>
                            </Link>
                          ))
                      ) : (
                        latestArticles.slice(0, 5).map((article) => (
                          <Link key={article.id} href={getArticleUrl(article)} className="flex gap-3 group">
                            <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden">
                              <Image src={article.image} alt={article.title} fill className="object-cover" />
                            </div>
                            <div className="flex-1">
                              <h4 className="text-sm font-bold line-clamp-2 group-hover:text-primary transition-colors dark:text-white">
                                {article.title}
                              </h4>
                              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                {formatTimeAgo(article.publishedAt)} · {article.views} views
                              </div>
                            </div>
                          </Link>
                        ))
                      )}
                    </div>
                  </div>
                )}
              </div>

              <div className="relative">
                <button
                  className="dark:text-white hover:text-primary transition-colors flex items-center gap-1"
                  onMouseEnter={() => setMediaOpen(true)}
                  onMouseLeave={() => setMediaOpen(false)}
                >
                  Media <ChevronDown className="w-3 h-3" />
                </button>
                {mediaOpen && (
                  <div
                    className="absolute top-full left-0 mt-0 w-[600px] bg-white dark:bg-gray-900 shadow-professional-lg border border-gray-200 dark:border-gray-800 rounded-lg p-6 z-[1000]"
                    onMouseEnter={() => setMediaOpen(true)}
                    onMouseLeave={() => setMediaOpen(false)}
                  >
                    <div className="space-y-3">
                      {getArticlesByCategory('Media').length > 0 ? (
                        getArticlesByCategory('Media').map((article) => (
                          <Link key={article.id} href={getArticleUrl(article)} className="flex gap-3 group">
                            <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden">
                              <Image src={article.image} alt={article.title} fill className="object-cover" />
                            </div>
                            <div className="flex-1">
                              <h4 className="text-sm font-bold line-clamp-2 group-hover:text-primary transition-colors dark:text-white">
                                {article.title}
                              </h4>
                              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                {formatTimeAgo(article.publishedAt)} · {article.views} views
                              </div>
                            </div>
                          </Link>
                        ))
                      ) : (
                        latestArticles.slice(0, 5).map((article) => (
                          <Link key={article.id} href={getArticleUrl(article)} className="flex gap-3 group">
                            <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden">
                              <Image src={article.image} alt={article.title} fill className="object-cover" />
                            </div>
                            <div className="flex-1">
                              <h4 className="text-sm font-bold line-clamp-2 group-hover:text-primary transition-colors dark:text-white">
                                {article.title}
                              </h4>
                              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                {formatTimeAgo(article.publishedAt)} · {article.views} views
                              </div>
                            </div>
                          </Link>
                        ))
                      )}
                    </div>
                  </div>
                )}
              </div>

              {allCategories.filter(cat => 
                ['tech', 'business', 'fashion', 'arts', 'food', 'e-books'].includes(cat.slug.toLowerCase())
              ).slice(0, 6).map((cat) => (
                <Link 
                  key={cat.id} 
                  href={`/category/${cat.slug}`} 
                  className="dark:text-white hover:text-primary transition-colors"
                >
                  {cat.name}
                </Link>
              ))}
              
              <div className="relative">
                <button
                  className="dark:text-white hover:text-primary transition-colors"
                  onMouseEnter={() => setOverflowOpen(true)}
                  onMouseLeave={() => setOverflowOpen(false)}
                >
                  <MoreHorizontal className="w-5 h-5" />
                </button>
                {overflowOpen && (
                  <div
                    className="absolute top-full right-0 mt-0 w-64 bg-white dark:bg-gray-900 shadow-professional-lg border border-gray-200 dark:border-gray-800 rounded-lg p-4 z-[1000]"
                    onMouseEnter={() => setOverflowOpen(true)}
                    onMouseLeave={() => setOverflowOpen(false)}
                  >
                    <div className="space-y-2">
                      {allCategories.length > 0 ? (
                        allCategories.slice(6).map((cat) => (
                          <Link
                            key={cat.id}
                            href={`/category/${cat.slug}`}
                            className="block text-sm hover:text-primary transition-colors dark:text-white py-1"
                          >
                            {cat.name}
                          </Link>
                        ))
                      ) : (
                        <span className="text-sm text-gray-500 dark:text-gray-400">Loading...</span>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Navbar */}
        <nav className="bg-white dark:bg-black border-b border-gray-200 dark:border-gray-800">
          <div className="container max-w-5xl mx-auto px-4">
            <div className="flex items-center justify-between" style={{ minHeight: '72px' }}>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setMenuPanelOpen(true)}
                  className="p-2 dark:text-white hover:text-primary transition-colors"
                  aria-label="Menu"
                >
                  <Menu className="w-5 h-5" />
                </button>
                <Link
                  href="#live_now"
                  className="hidden lg:flex items-center gap-1 px-2 py-1 border border-gray-300 dark:border-gray-700 rounded-full text-xs font-bold hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <Dot className="w-3 h-3 text-red-500 animate-pulse" />
                  <span>Live</span>
                </Link>
                <Link href="/" className="block md:hidden relative">
                  <Image 
                    src="/tnf-logo.png" 
                    alt="TNF Logo" 
                    width={280} 
                    height={55}
                    unoptimized
                    priority
                    className="dark:hidden"
                  />
                  <Image 
                    src="/tnf-logo-dark.png" 
                    alt="TNF Logo" 
                    width={280} 
                    height={55}
                    unoptimized
                    priority
                    className="hidden dark:block"
                  />
                </Link>
              </div>

              <div className="hidden md:block relative">
                <Link href="/">
                  <Image 
                    src="/tnf-logo.png" 
                    alt="TNF Logo" 
                    width={280} 
                    height={55}
                    unoptimized
                    priority
                    className="dark:hidden"
                  />
                  <Image 
                    src="/tnf-logo-dark.png" 
                    alt="TNF Logo" 
                    width={280} 
                    height={55}
                    unoptimized
                    priority
                    className="hidden dark:block"
                  />
                </Link>
              </div>

              <div className="flex items-center gap-2 lg:gap-3">
                <Link
                  href="#live_now"
                  className="lg:hidden flex items-center gap-1 px-2 py-1 border border-gray-300 dark:border-gray-700 rounded-full text-xs font-bold hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <Dot className="w-3 h-3 text-red-500 animate-pulse" />
                  <span>Live</span>
                </Link>
                <button
                  onClick={() => setCartPanelOpen(true)}
                  className="relative p-2 hover:text-primary transition-colors dark:text-white"
                  aria-label="Cart"
                >
                  <ShoppingCart className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setAccountModalOpen(true)}
                  className="hidden lg:flex p-2 hover:text-primary transition-colors dark:text-white"
                  aria-label="Account"
                >
                  <User className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setSearchModalOpen(true)}
                  className="hidden lg:flex p-2 hover:text-primary transition-colors dark:text-white"
                  aria-label="Search"
                >
                  <Search className="w-5 h-5" />
                </button>
                <button
                  onClick={toggleTheme}
                  className="hidden lg:flex w-8 h-8 p-0 border border-gray-300 dark:border-gray-700 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors dark:text-white items-center justify-center"
                  aria-label="Toggle theme"
                >
                  {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>
        </nav>
      </header>

      {/* Modals */}
      <MenuPanel isOpen={menuPanelOpen} onClose={() => setMenuPanelOpen(false)} />
      <CartPanel isOpen={cartPanelOpen} onClose={() => setCartPanelOpen(false)} />
      <SearchModal isOpen={searchModalOpen} onClose={() => setSearchModalOpen(false)} />
      <FavoritesModal isOpen={favoritesModalOpen} onClose={() => setFavoritesModalOpen(false)} />
      <AccountModal isOpen={accountModalOpen} onClose={() => setAccountModalOpen(false)} />
    </>
  )
}
