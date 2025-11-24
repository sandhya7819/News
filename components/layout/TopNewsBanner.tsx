'use client'

import Link from 'next/link'
import { Article } from '@/types'
import { getArticleUrl } from '@/lib/utils'

interface TopNewsBannerProps {
  articles: Article[]
}

export default function TopNewsBanner({ articles }: TopNewsBannerProps) {
  const topArticles = articles.slice(0, 5)
  // Duplicate articles for seamless loop
  const duplicatedArticles = [...topArticles, ...topArticles]

  if (topArticles.length === 0) {
    return null
  }

  return (
    <div className="bg-red-600 text-white py-2 overflow-hidden relative">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold whitespace-nowrap flex-shrink-0 z-10 bg-red-600">BREAKING:</span>
          <div className="flex-1 overflow-hidden">
            <div className="flex items-center gap-3 animate-scroll">
              {duplicatedArticles.map((article, index) => (
                <div key={`${article.id}-${index}`} className="flex items-center gap-3 flex-shrink-0">
                  <Link 
                    href={getArticleUrl(article)}
                    className="text-xs hover:underline whitespace-nowrap"
                  >
                    {article.title}
                  </Link>
                  <span className="text-white/70">·</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
