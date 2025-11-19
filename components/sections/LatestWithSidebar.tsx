import Link from 'next/link'
import Image from 'next/image'
import { Clock, Eye, MessageCircle } from 'lucide-react'
import { Article } from '@/types'
import { formatTimeAgo } from '@/lib/data'

interface LatestWithSidebarProps {
  articles: Article[]
}

export default function LatestWithSidebar({ articles }: LatestWithSidebarProps) {
  const mainArticles = articles.slice(0, 10)
  const popularArticles = [...articles].sort((a, b) => b.views - a.views).slice(0, 4)

  return (
    <section className="py-8 bg-gray-50 dark:bg-black">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold dark:text-white">Latest</h2>
              <div className="hidden md:flex gap-3 text-sm">
                <Link href="/latest" className="text-primary dark:text-white font-semibold border-b-2 border-primary pb-1 dark:hover:text-primary transition-colors">
                  Latest
                </Link>
                <Link href="/latest?filter=all" className="text-gray-600 dark:text-white hover:text-primary transition-colors">
                  All
                </Link>
                <Link href="/latest?filter=politics" className="text-gray-600 dark:text-white hover:text-primary transition-colors">
                  Politics
                </Link>
                <Link href="/latest?filter=opinions" className="text-gray-600 dark:text-white hover:text-primary transition-colors">
                  Opinions
                </Link>
                <Link href="/latest?filter=world" className="text-gray-600 dark:text-white hover:text-primary transition-colors">
                  World
                </Link>
                <Link href="/latest?filter=media" className="text-gray-600 dark:text-white hover:text-primary transition-colors">
                  Media
                </Link>
              </div>
            </div>

            <div className="space-y-6">
              {mainArticles.map((article) => (
                <Link key={article.id} href={`/article/${article.id}`} className="group block">
                  <article className="bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-professional hover:shadow-professional-lg border border-gray-100 dark:border-gray-800 card-hover">
                    <div className="flex flex-col md:flex-row gap-5 p-5 md:p-6">
                      <div className="relative w-full md:w-72 h-52 md:h-40 flex-shrink-0 rounded-xl overflow-hidden shadow-professional group-hover:shadow-professional-lg transition-shadow duration-300">
                        <Image
                          src={article.image}
                          alt={article.title}
                          fill
                          className="object-cover image-zoom"
                        />
                        <div className="absolute top-4 left-4">
                          <span className="px-3 py-1.5 bg-primary text-white text-xs font-bold rounded-full shadow-lg backdrop-blur-sm">
                            {article.category}
                          </span>
                        </div>
                      </div>
                      <div className="flex-1 flex flex-col justify-center">
                        <h3 className="text-xl md:text-2xl font-extrabold mb-3 group-hover:text-primary transition-colors duration-200 line-clamp-2 dark:text-white leading-tight">
                          {article.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2 text-sm md:text-base leading-relaxed">
                          {article.excerpt}
                        </p>
                        <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 flex-wrap">
                          <div className="flex items-center gap-2">
                            <Image
                              src={article.author.avatar}
                              alt={article.author.name}
                              width={20}
                              height={20}
                              className="rounded-full"
                            />
                            <span className="font-medium">{article.author.name}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            <span>{formatTimeAgo(article.publishedAt)}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Eye className="w-4 h-4" />
                            <span>{article.views}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MessageCircle className="w-4 h-4" />
                            <span>{article.comments}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>

            <div className="mt-10 text-center">
              <button className="btn-secondary px-8 py-3.5 text-base">
                Load more posts
              </button>
            </div>

            {/* Ad Slot */}
            <div className="mt-8 bg-gray-100 dark:bg-gray-900 rounded-lg p-12 text-center">
              <p className="text-sm text-gray-500 dark:text-gray-400">Ad slot</p>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Popular Now */}
              <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-professional border border-gray-100 dark:border-gray-800">
                <h3 className="text-xl font-extrabold mb-6 pb-4 border-b-2 border-gray-200 dark:border-gray-700 dark:text-white">
                  Popular now
                </h3>
                <div className="space-y-5">
                  {popularArticles.map((article, index) => (
                    <Link key={article.id} href={`/article/${article.id}`} className="group block p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200">
                      <div className="flex gap-3">
                        <span className="text-2xl font-extrabold text-primary flex-shrink-0 min-w-[35px] leading-none">
                          {index + 1}
                        </span>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-bold line-clamp-2 group-hover:text-primary transition-colors duration-200 mb-2 leading-snug dark:text-white">
                            {article.title}
                          </h4>
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            <span>{formatTimeAgo(article.publishedAt)} ago</span>
                            <span className="mx-1">·</span>
                            <span>{article.views}</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Newsletter */}
              <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-professional border border-gray-100 dark:border-gray-800">
                <div className="text-center mb-5">
                  <h3 className="text-xl font-extrabold mb-2 dark:text-white">Newsletter</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                    Subscribe
                  </p>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-5 text-center">
                  Do not worry, we don't spam!
                </p>
                <form className="space-y-3">
                  <input
                    type="email"
                    placeholder="Your email"
                    className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm transition-all duration-200"
                  />
                  <button
                    type="submit"
                    className="btn-primary w-full text-sm py-3"
                  >
                    Sign up
                  </button>
                </form>
              </div>

              {/* Ad Slot */}
              <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-10 text-center">
                <p className="text-sm text-gray-500 dark:text-gray-400">Ad slot</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
