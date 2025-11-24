'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { X, Search, ChevronDown } from 'lucide-react'
import { useTheme } from '@/components/providers/ThemeProvider'

interface MenuPanelProps {
  isOpen: boolean
  onClose: () => void
}

export default function MenuPanel({ isOpen, onClose }: MenuPanelProps) {
  const [homepagesOpen, setHomepagesOpen] = useState(false)
  const [innerPagesOpen, setInnerPagesOpen] = useState(false)
  const [blogOpen, setBlogOpen] = useState(false)
  const [blogDetailOpen, setBlogDetailOpen] = useState(false)
  const [usefulPagesOpen, setUsefulPagesOpen] = useState(false)
  const [otherPagesOpen, setOtherPagesOpen] = useState(false)
  const [shopOpen, setShopOpen] = useState(false)
  const [shopLayoutsOpen, setShopLayoutsOpen] = useState(false)
  const { theme, toggleTheme } = useTheme()

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-start bg-black/50" onClick={onClose}>
      <div
        className="bg-white dark:bg-black dark:text-gray-200 h-full w-full max-w-sm overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="flex justify-between items-center pb-4 bg-white dark:bg-black sticky top-0 z-10 p-4 border-b border-gray-200 dark:border-gray-800">
          <Link href="/" className="relative">
            <Image 
              src="/tnf-logo.png" 
              alt="TNF Logo" 
              width={280} 
              height={55}
              unoptimized
              className="dark:hidden"
            />
            <Image 
              src="/tnf-logo-dark.png" 
              alt="TNF Logo" 
              width={280} 
              height={55}
              unoptimized
              className="hidden dark:block"
            />
          </Link>
          <button
            onClick={onClose}
            className="p-0 border-0 dark:text-white dark:opacity-50 hover:text-primary hover:rotate-90 duration-150 transition-all"
            type="button"
          >
            <X className="w-6 h-6" />
          </button>
        </header>

        <div className="p-4">
          <form className="relative mb-3 sticky top-0 bg-white dark:bg-black z-10 pb-2">
            <input
              type="email"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-sm"
              placeholder="Search.."
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
              <Search className="w-4 h-4" />
            </span>
          </form>

          <ul className="space-y-1 font-bold text-lg">
            <li>
              <button
                onClick={() => setHomepagesOpen(!homepagesOpen)}
                className="flex items-center justify-between w-full py-2 text-left hover:text-primary transition-colors"
              >
                Homepages
                <ChevronDown className={`w-4 h-4 transition-transform ${homepagesOpen ? 'rotate-180' : ''}`} />
              </button>
              {homepagesOpen && (
                <ul className="pl-4 space-y-1 mt-1">
                  <li><Link href="/" className="block py-1 hover:text-primary">Main</Link></li>
                  <li><Link href="/classic-news" className="block py-1 hover:text-primary">Classic News</Link></li>
                  <li><Link href="/tech" className="block py-1 hover:text-primary">Tech</Link></li>
                  <li><Link href="/classic-blog" className="block py-1 hover:text-primary">Classic Blog</Link></li>
                  <li><Link href="/gaming" className="block py-1 hover:text-primary">Gaming</Link></li>
                  <li><Link href="/sports" className="block py-1 hover:text-primary">Sports</Link></li>
                  <li><Link href="/newspaper" className="block py-1 hover:text-primary">Newspaper</Link></li>
                  <li><Link href="/magazine" className="block py-1 hover:text-primary">Magazine</Link></li>
                  <li><Link href="/travel" className="block py-1 hover:text-primary">Travel</Link></li>
                  <li><Link href="/food" className="block py-1 hover:text-primary">Food</Link></li>
                </ul>
              )}
            </li>
            <li><Link href="/latest" className="block py-2 hover:text-primary">Latest</Link></li>
            <li><Link href="/trending" className="block py-2 hover:text-primary">Trending</Link></li>
            <li>
              <button
                onClick={() => setInnerPagesOpen(!innerPagesOpen)}
                className="flex items-center justify-between w-full py-2 text-left hover:text-primary transition-colors"
              >
                Inner Pages
                <ChevronDown className={`w-4 h-4 transition-transform ${innerPagesOpen ? 'rotate-180' : ''}`} />
              </button>
              {innerPagesOpen && (
                <ul className="pl-4 space-y-2 mt-1">
                  <li>
                    <button
                      onClick={() => setBlogOpen(!blogOpen)}
                      className="flex items-center justify-between w-full py-1 text-left hover:text-primary"
                    >
                      Blog
                      <ChevronDown className={`w-3 h-3 transition-transform ${blogOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {blogOpen && (
                      <ul className="pl-4 space-y-1 mt-1">
                        <li><Link href="/blog" className="block py-1 hover:text-primary text-sm">Full Width</Link></li>
                        <li><Link href="/blog?layout=grid-2" className="block py-1 hover:text-primary text-sm">Grid 2 Cols</Link></li>
                        <li><Link href="/blog?layout=grid-3" className="block py-1 hover:text-primary text-sm">Grid 3 Cols</Link></li>
                        <li><Link href="/blog?layout=grid-4" className="block py-1 hover:text-primary text-sm">Grid 4 Cols</Link></li>
                      </ul>
                    )}
                  </li>
                  <li>
                    <button
                      onClick={() => setBlogDetailOpen(!blogDetailOpen)}
                      className="flex items-center justify-between w-full py-1 text-left hover:text-primary"
                    >
                      Blog - detail
                      <ChevronDown className={`w-3 h-3 transition-transform ${blogDetailOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {blogDetailOpen && (
                      <ul className="pl-4 space-y-1 mt-1">
                        <li><Link href="/blog/1" className="block py-1 hover:text-primary text-sm">Blog detail</Link></li>
                        <li><Link href="/blog/1?v=2" className="block py-1 hover:text-primary text-sm">Blog detail - v2</Link></li>
                      </ul>
                    )}
                  </li>
                  <li>
                    <button
                      onClick={() => setUsefulPagesOpen(!usefulPagesOpen)}
                      className="flex items-center justify-between w-full py-1 text-left hover:text-primary"
                    >
                      Useful pages
                      <ChevronDown className={`w-3 h-3 transition-transform ${usefulPagesOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {usefulPagesOpen && (
                      <ul className="pl-4 space-y-1 mt-1">
                        <li><Link href="/sign-up" className="block py-1 hover:text-primary text-sm">Sign up</Link></li>
                        <li><Link href="/sign-in" className="block py-1 hover:text-primary text-sm">Sign in</Link></li>
                        <li><Link href="/reset-password" className="block py-1 hover:text-primary text-sm">Reset password</Link></li>
                        <li><Link href="/404" className="block py-1 hover:text-primary text-sm">404 page</Link></li>
                        <li><Link href="/coming-soon" className="block py-1 hover:text-primary text-sm">Coming soon</Link></li>
                      </ul>
                    )}
                  </li>
                  <li>
                    <button
                      onClick={() => setOtherPagesOpen(!otherPagesOpen)}
                      className="flex items-center justify-between w-full py-1 text-left hover:text-primary"
                    >
                      Other pages
                      <ChevronDown className={`w-3 h-3 transition-transform ${otherPagesOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {otherPagesOpen && (
                      <ul className="pl-4 space-y-1 mt-1">
                        <li><Link href="/faq" className="block py-1 hover:text-primary text-sm">FAQ</Link></li>
                        <li><Link href="/terms" className="block py-1 hover:text-primary text-sm">Terms of use</Link></li>
                        <li><Link href="/privacy" className="block py-1 hover:text-primary text-sm">Privacy policy</Link></li>
                      </ul>
                    )}
                  </li>
                </ul>
              )}
            </li>
            <li>
              <button
                onClick={() => setShopOpen(!shopOpen)}
                className="flex items-center justify-between w-full py-2 text-left hover:text-primary transition-colors"
              >
                Shop
                <ChevronDown className={`w-4 h-4 transition-transform ${shopOpen ? 'rotate-180' : ''}`} />
              </button>
              {shopOpen && (
                <ul className="pl-4 space-y-1 mt-1">
                  <li>
                    <button
                      onClick={() => setShopLayoutsOpen(!shopLayoutsOpen)}
                      className="flex items-center justify-between w-full py-1 text-left hover:text-primary"
                    >
                      Shop layouts
                      <ChevronDown className={`w-3 h-3 transition-transform ${shopLayoutsOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {shopLayoutsOpen && (
                      <ul className="pl-4 space-y-1 mt-1">
                        <li><Link href="/shop?layout=4" className="block py-1 hover:text-primary text-sm">Shop 4 cols</Link></li>
                        <li><Link href="/shop?layout=3" className="block py-1 hover:text-primary text-sm">Shop 3 cols</Link></li>
                        <li><Link href="/shop?layout=2" className="block py-1 hover:text-primary text-sm">Shop 2 cols</Link></li>
                        <li><Link href="/shop?layout=sidebar" className="block py-1 hover:text-primary text-sm">Shop with sidebar</Link></li>
                      </ul>
                    )}
                  </li>
                  <li><Link href="/shop" className="block py-1 hover:text-primary text-sm">Archive category</Link></li>
                  <li><Link href="/shop/product/1" className="block py-1 hover:text-primary text-sm">Product detail</Link></li>
                  <li><Link href="/shop/product/1?v=2" className="block py-1 hover:text-primary text-sm">Product detail - v2</Link></li>
                  <li><Link href="/cart" className="block py-1 hover:text-primary text-sm">Cart</Link></li>
                  <li><Link href="/cart?v=2" className="block py-1 hover:text-primary text-sm">Cart - v2</Link></li>
                  <li><Link href="/checkout" className="block py-1 hover:text-primary text-sm">Checkout</Link></li>
                  <li><Link href="/checkout?v=2" className="block py-1 hover:text-primary text-sm">Checkout - v2</Link></li>
                  <li><Link href="/order-confirmation" className="block py-1 hover:text-primary text-sm">Order confirmation</Link></li>
                </ul>
              )}
            </li>
            <li className="border-t border-gray-200 dark:border-gray-700 my-2 opacity-10"></li>
            <li><Link href="/sign-in" className="block py-2 hover:text-primary">Sign in</Link></li>
            <li><Link href="/sign-up" className="block py-2 hover:text-primary">Create an account</Link></li>
          </ul>

          <ul className="flex gap-2 mt-4">
            <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-primary text-xl">M</a></li>
            <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-primary text-xl">X</a></li>
            <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-primary text-xl">IG</a></li>
            <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-primary text-xl">P</a></li>
          </ul>

            <div className="py-2 flex items-center gap-2 mt-4 bg-white dark:bg-black sticky bottom-0">
            <div className="flex flex-col gap-1">
              <span className="text-xs opacity-60">Select theme:</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={theme === 'dark'}
                  onChange={toggleTheme}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 dark:peer-focus:ring-primary/40 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

