import Link from 'next/link'
import Image from 'next/image'
import { Article } from '@/types'
import { formatTimeAgo } from '@/lib/data'
import { getArticleUrl } from '@/lib/utils'

interface TrendingSectionProps {
  articles: Article[]
}

export default function TrendingSection({ articles }: TrendingSectionProps) {
  return (
    <section className="py-8 bg-white dark:bg-black border-b border-gray-200 dark:border-gray-700">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-4 mb-6">
          <h2 className="text-2xl font-bold dark:text-white">Trending</h2>
          <div className="flex gap-2 text-sm">
            <span className="text-gray-500 dark:text-gray-400">·</span>
            <Link href="/trending" className="text-gray-600 dark:text-white hover:text-primary transition-colors">
              Politics
            </Link>
            <Link href="/trending" className="text-gray-600 dark:text-white hover:text-primary transition-colors">
              Opinions
            </Link>
            <Link href="/trending" className="text-gray-600 dark:text-white hover:text-primary transition-colors">
              World
            </Link>
            <Link href="/trending" className="text-gray-600 dark:text-white hover:text-primary transition-colors">
              Media
            </Link>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {articles.map((article) => (
            <Link key={article.id} href={getArticleUrl(article)} className="group">
              <div className="flex gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-900 transition-all duration-200 card-hover">
                <div className="relative w-20 h-20 flex-shrink-0 rounded-xl overflow-hidden shadow-professional group-hover:shadow-professional-lg transition-shadow duration-300">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover image-zoom"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-bold line-clamp-2 group-hover:text-primary transition-colors duration-200 dark:text-white leading-snug">
                    {article.title}
                  </h3>
                  <div className="flex items-center gap-2 mt-2 text-xs text-gray-500 dark:text-gray-400">
                    <span>{formatTimeAgo(article.publishedAt)}</span>
                    <span>·</span>
                    <span>{article.views}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

