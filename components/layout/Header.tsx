'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X, Search, ShoppingCart, Bookmark, User, Moon, Sun, ChevronDown, MoreHorizontal, Dot } from 'lucide-react'
import { useTheme } from '@/components/providers/ThemeProvider'
import SearchModal from '@/components/modals/SearchModal'
import MenuPanel from '@/components/modals/MenuPanel'
import CartPanel from '@/components/modals/CartPanel'
import FavoritesModal from '@/components/modals/FavoritesModal'
import AccountModal from '@/components/modals/AccountModal'
import { articles } from '@/lib/data'
import { formatTimeAgo } from '@/lib/data'

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

  const allCategories = [
    'Politics', 'Opinions', 'World', 'Media', 'Tech', 'Business', 
    'Fashion', 'Arts', 'Food', 'Economy', 'Finance', 'Education', 
    'Health', 'National', 'E-Books', 'Press', 'Podcasts', 'Entertainments', 'Weather'
  ]

  return (
    <>
      <header className="sticky top-0 z-[999] w-full">
        {/* Top Red Navbar with Scrolling Ticker */}
        <div className="bg-primary-600 text-white py-2 overflow-hidden relative" style={{ height: '32px' }}>
          <div className="container max-w-7xl mx-auto px-4">
            <div className="flex items-center gap-8 overflow-hidden">
              <div className="flex items-center gap-8 animate-scroll whitespace-nowrap">
                <Link href="/blog/1" className="text-xs text-white hover:underline">The Importance of Sleep: Tips for Better Rest and Recovery</Link>
                <span className="text-white/70">·</span>
                <Link href="/blog/2" className="text-xs text-white hover:underline">The Future of Sustainable Living: Driving Eco-Friendly Lifestyles</Link>
                <span className="text-white/70">·</span>
                <Link href="/blog/3" className="text-xs text-white hover:underline">Business Agility the Digital Age: Leveraging AI and Automation</Link>
                <span className="text-white/70">·</span>
                <Link href="/blog/4" className="text-xs text-white hover:underline">The Rise of AI-Powered Personal Assistants: How They Manage</Link>
                <span className="text-white/70">·</span>
                <Link href="/blog/5" className="text-xs text-white hover:underline">Tech Innovations Reshaping the Retail Landscape: AI Payments</Link>
                <span className="text-white/70">·</span>
                <Link href="/blog/6" className="text-xs text-white hover:underline">Balancing Work and Wellness: Tech Solutions for Healthy</Link>
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
                      {allCategories.map((cat) => (
                        <Link
                          key={cat}
                          href={`/category/${cat.toLowerCase()}`}
                          className="text-sm hover:text-primary transition-colors dark:text-white py-1"
                        >
                          {cat}
                        </Link>
                      ))}
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
                      {articles.slice(0, 5).map((article) => (
                        <Link key={article.id} href={`/article/${article.id}`} className="flex gap-3 group">
                          <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden">
                            <Image src={article.image} alt={article.title} fill className="object-cover" />
                          </div>
                          <div className="flex-1">
                            <h4 className="text-sm font-bold line-clamp-2 group-hover:text-primary transition-colors dark:text-white">
                              {article.title}
                            </h4>
                            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                              {formatTimeAgo(article.publishedAt)} · {article.views}
                            </div>
                          </div>
                        </Link>
                      ))}
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
                      {articles.filter(a => a.category === 'Politics').slice(0, 5).length > 0 ? (
                        articles.filter(a => a.category === 'Politics').slice(0, 5).map((article) => (
                          <Link key={article.id} href={`/article/${article.id}`} className="flex gap-3 group">
                            <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden">
                              <Image src={article.image} alt={article.title} fill className="object-cover" />
                            </div>
                            <div className="flex-1">
                              <h4 className="text-sm font-bold line-clamp-2 group-hover:text-primary transition-colors dark:text-white">
                                {article.title}
                              </h4>
                              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                {formatTimeAgo(article.publishedAt)} · {article.views}
                              </div>
                            </div>
                          </Link>
                        ))
                      ) : (
                        articles.slice(0, 5).map((article) => (
                          <Link key={article.id} href={`/article/${article.id}`} className="flex gap-3 group">
                            <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden">
                              <Image src={article.image} alt={article.title} fill className="object-cover" />
                            </div>
                            <div className="flex-1">
                              <h4 className="text-sm font-bold line-clamp-2 group-hover:text-primary transition-colors dark:text-white">
                                {article.title}
                              </h4>
                              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                {formatTimeAgo(article.publishedAt)} · {article.views}
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
                      {articles.filter(a => a.category === 'Opinions').slice(0, 5).length > 0 ? (
                        articles.filter(a => a.category === 'Opinions').slice(0, 5).map((article) => (
                          <Link key={article.id} href={`/article/${article.id}`} className="flex gap-3 group">
                            <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden">
                              <Image src={article.image} alt={article.title} fill className="object-cover" />
                            </div>
                            <div className="flex-1">
                              <h4 className="text-sm font-bold line-clamp-2 group-hover:text-primary transition-colors dark:text-white">
                                {article.title}
                              </h4>
                              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                {formatTimeAgo(article.publishedAt)} · {article.views}
                              </div>
                            </div>
                          </Link>
                        ))
                      ) : (
                        articles.slice(0, 5).map((article) => (
                          <Link key={article.id} href={`/article/${article.id}`} className="flex gap-3 group">
                            <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden">
                              <Image src={article.image} alt={article.title} fill className="object-cover" />
                            </div>
                            <div className="flex-1">
                              <h4 className="text-sm font-bold line-clamp-2 group-hover:text-primary transition-colors dark:text-white">
                                {article.title}
                              </h4>
                              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                {formatTimeAgo(article.publishedAt)} · {article.views}
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
                      {articles.filter(a => a.category === 'World' || a.category === 'Arts').slice(0, 5).length > 0 ? (
                        articles.filter(a => a.category === 'World' || a.category === 'Arts').slice(0, 5).map((article) => (
                          <Link key={article.id} href={`/article/${article.id}`} className="flex gap-3 group">
                            <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden">
                              <Image src={article.image} alt={article.title} fill className="object-cover" />
                            </div>
                            <div className="flex-1">
                              <h4 className="text-sm font-bold line-clamp-2 group-hover:text-primary transition-colors dark:text-white">
                                {article.title}
                              </h4>
                              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                {formatTimeAgo(article.publishedAt)} · {article.views}
                              </div>
                            </div>
                          </Link>
                        ))
                      ) : (
                        articles.slice(0, 5).map((article) => (
                          <Link key={article.id} href={`/article/${article.id}`} className="flex gap-3 group">
                            <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden">
                              <Image src={article.image} alt={article.title} fill className="object-cover" />
                            </div>
                            <div className="flex-1">
                              <h4 className="text-sm font-bold line-clamp-2 group-hover:text-primary transition-colors dark:text-white">
                                {article.title}
                              </h4>
                              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                {formatTimeAgo(article.publishedAt)} · {article.views}
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
                      {articles.filter(a => a.category === 'Media').slice(0, 5).length > 0 ? (
                        articles.filter(a => a.category === 'Media').slice(0, 5).map((article) => (
                          <Link key={article.id} href={`/article/${article.id}`} className="flex gap-3 group">
                            <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden">
                              <Image src={article.image} alt={article.title} fill className="object-cover" />
                            </div>
                            <div className="flex-1">
                              <h4 className="text-sm font-bold line-clamp-2 group-hover:text-primary transition-colors dark:text-white">
                                {article.title}
                              </h4>
                              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                {formatTimeAgo(article.publishedAt)} · {article.views}
                              </div>
                            </div>
                          </Link>
                        ))
                      ) : (
                        articles.slice(0, 5).map((article) => (
                          <Link key={article.id} href={`/article/${article.id}`} className="flex gap-3 group">
                            <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden">
                              <Image src={article.image} alt={article.title} fill className="object-cover" />
                            </div>
                            <div className="flex-1">
                              <h4 className="text-sm font-bold line-clamp-2 group-hover:text-primary transition-colors dark:text-white">
                                {article.title}
                              </h4>
                              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                {formatTimeAgo(article.publishedAt)} · {article.views}
                              </div>
                            </div>
                          </Link>
                        ))
                      )}
                    </div>
                  </div>
                )}
              </div>

              <Link href="/category/tech" className="dark:text-white hover:text-primary transition-colors">Tech</Link>
              <Link href="/category/business" className="dark:text-white hover:text-primary transition-colors">Business</Link>
              <Link href="/category/fashion" className="dark:text-white hover:text-primary transition-colors">Fashion</Link>
              <Link href="/category/arts" className="dark:text-white hover:text-primary transition-colors">Arts & Entertainments</Link>
              <Link href="/category/food" className="dark:text-white hover:text-primary transition-colors">Food</Link>
              <Link href="/category/e-books" className="dark:text-white hover:text-primary transition-colors">E-Books</Link>
              
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
                      {['Economy', 'Finance', 'Education', 'Health', 'National', 'Press', 'Podcasts', 'Entertainments', 'Weather'].map((cat) => (
                        <Link
                          key={cat}
                          href={`/category/${cat.toLowerCase()}`}
                          className="block text-sm hover:text-primary transition-colors dark:text-white py-1"
                        >
                          {cat}
                        </Link>
                      ))}
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
                <Link href="/" className="block md:hidden text-xl font-bold text-gray-900 dark:text-white">
                  News5
                </Link>
              </div>

              <div className="hidden md:block">
                <Link href="/" className="text-xl font-bold text-gray-900 dark:text-white">
                  News5
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
