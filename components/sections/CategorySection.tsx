import Link from 'next/link'
import Image from 'next/image'
import { Clock, Eye, MessageCircle } from 'lucide-react'
import { Article } from '@/types'
import { formatTimeAgo } from '@/lib/data'

interface CategorySectionProps {
  title: string
  articles: Article[]
  categorySlug?: string
}

export default function CategorySection({ title, articles, categorySlug }: CategorySectionProps) {
  const featuredArticle = articles[0]
  const otherArticles = articles.slice(1, 4)

  return (
    <section className="py-12 bg-white dark:bg-black">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 dark:text-white">{title}</h2>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Featured Article */}
          {featuredArticle && (
            <div className="lg:col-span-2">
              <Link href={`/article/${featuredArticle.id}`} className="group block">
                <div className="bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-professional hover:shadow-professional-lg border border-gray-100 dark:border-gray-800 card-hover">
                  <div className="relative h-80 overflow-hidden">
                    <Image
                      src={featuredArticle.image}
                      alt={featuredArticle.title}
                      fill
                      className="object-cover image-zoom"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1.5 bg-primary text-white text-xs font-bold rounded-full shadow-lg backdrop-blur-sm">
                        {featuredArticle.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-6 md:p-8">
                    <h3 className="text-2xl md:text-3xl font-extrabold mb-4 group-hover:text-primary transition-colors duration-200 line-clamp-2 dark:text-white leading-tight">
                      {featuredArticle.title}
                    </h3>
                    <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                      <div className="flex items-center gap-2">
                        <Image
                          src={featuredArticle.author.avatar}
                          alt={featuredArticle.author.name}
                          width={24}
                          height={24}
                          className="rounded-full"
                        />
                        <span className="dark:text-gray-300">{featuredArticle.author.name}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{formatTimeAgo(featuredArticle.publishedAt)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye className="w-4 h-4" />
                        <span>{featuredArticle.views}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          )}

          {/* Other Articles */}
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
            {otherArticles.map((article) => (
              <Link key={article.id} href={`/article/${article.id}`} className="group block">
                <div className="bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-professional hover:shadow-professional-lg border border-gray-100 dark:border-gray-800 card-hover">
                  <div className="relative h-48 overflow-hidden">
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
                  <div className="p-5">
                    <h3 className="text-lg font-extrabold mb-3 group-hover:text-primary transition-colors duration-200 line-clamp-2 dark:text-white leading-tight">
                      {article.title}
                    </h3>
                    <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>{formatTimeAgo(article.publishedAt)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        <span>{article.views}</span>
                      </div>
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
