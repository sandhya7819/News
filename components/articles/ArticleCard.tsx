import Link from 'next/link'
import Image from 'next/image'
import { Clock, Eye, MessageCircle } from 'lucide-react'
import { Article } from '@/types'
import { formatTimeAgo } from '@/lib/data'
import { getArticleUrl } from '@/lib/utils'

interface ArticleCardProps {
  article: Article
  variant?: 'default' | 'large' | 'small'
}

export default function ArticleCard({ article, variant = 'default' }: ArticleCardProps) {
  const isLarge = variant === 'large'
  const isSmall = variant === 'small'

  return (
    <Link href={getArticleUrl(article)} className="group">
      <article className={`bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 ${isLarge ? 'md:col-span-2' : ''}`}>
        <div className={`relative ${isLarge ? 'h-80' : isSmall ? 'h-40' : 'h-48'} overflow-hidden`}>
          <Image
            src={article.image}
            alt={article.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 bg-primary text-white text-xs font-semibold rounded-full">
              {article.category}
            </span>
          </div>
        </div>
        <div className="p-4 md:p-6">
          <h3 className={`font-bold mb-2 group-hover:text-primary transition-colors ${isLarge ? 'text-2xl md:text-3xl' : isSmall ? 'text-base' : 'text-xl'} line-clamp-2`}>
            {article.title}
          </h3>
          {!isSmall && (
            <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
              {article.excerpt}
            </p>
          )}
          <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Image
                  src={article.author.avatar}
                  alt={article.author.name}
                  width={24}
                  height={24}
                  className="rounded-full"
                />
                <span>{article.author.name}</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
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
  )
}

