import Link from 'next/link'
import Image from 'next/image'
import { Clock, Eye, MessageCircle } from 'lucide-react'
import { Article } from '@/types'
import { formatTimeAgo } from '@/lib/data'
import { getArticleUrl } from '@/lib/utils'

interface FeaturedArticlesProps {
  articles: Article[]
}

export default function FeaturedArticles({ articles }: FeaturedArticlesProps) {
  const mainArticle = articles[0]
  let sideArticles = articles.slice(1, 5)
  
  // If we don't have enough side articles, duplicate existing ones to fill
  if (sideArticles.length < 4 && articles.length > 1) {
    const needed = 4 - sideArticles.length
    const additional = []
    for (let i = 0; i < needed; i++) {
      additional.push(articles[(i % (articles.length - 1)) + 1])
    }
    sideArticles = [...sideArticles, ...additional].slice(0, 4)
  }

  return (
    <section className="py-6 bg-white dark:bg-black border-b border-gray-200 dark:border-gray-700">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Featured Article */}
          {mainArticle && (
            <div className="lg:col-span-2">
              <Link href={getArticleUrl(mainArticle)} className="group block">
                <div className="relative h-[500px] md:h-[600px] rounded-xl overflow-hidden shadow-professional-lg group-hover:shadow-professional-lg transition-all duration-300">
                  <Image
                    src={mainArticle.image}
                    alt={mainArticle.title}
                    fill
                    className="object-cover image-zoom"
                    priority
                  />
                  <div className="absolute inset-0 image-overlay" />
                  <div className="absolute bottom-0 left-0 right-0 p-8 md:p-10">
                    <span className="inline-block px-4 py-2 bg-primary text-white text-sm font-bold rounded-full mb-4 shadow-lg backdrop-blur-sm">
                      {mainArticle.category}
                    </span>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-5 line-clamp-3 group-hover:text-primary transition-colors duration-200 leading-tight">
                      {mainArticle.title}
                    </h2>
                    <div className="flex items-center gap-6 text-white/90 text-sm flex-wrap">
                      <div className="flex items-center gap-2">
                        <Image
                          src={mainArticle.author.avatar}
                          alt={mainArticle.author.name}
                          width={28}
                          height={28}
                          className="rounded-full border-2 border-white/50"
                        />
                        <span className="font-medium">{mainArticle.author.name}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{formatTimeAgo(mainArticle.publishedAt)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye className="w-4 h-4" />
                        <span>{mainArticle.views}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MessageCircle className="w-4 h-4" />
                        <span>{mainArticle.comments}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          )}

          {/* Side Articles */}
          <div className="lg:col-span-1 space-y-5">
            {sideArticles.map((article) => (
              <Link key={article.id} href={getArticleUrl(article)} className="group block">
                <div className="flex gap-4 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors duration-200">
                  <div className="relative w-28 h-28 flex-shrink-0 rounded-xl overflow-hidden shadow-professional group-hover:shadow-professional-lg transition-shadow duration-300">
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      className="object-cover image-zoom"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="inline-block px-2.5 py-1 bg-primary text-white text-xs font-bold rounded-full mb-2 shadow-md">
                      {article.category}
                    </span>
                    <h3 className="text-sm font-bold line-clamp-3 group-hover:text-primary transition-colors duration-200 leading-snug dark:text-white">
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
      </div>
    </section>
  )
}
