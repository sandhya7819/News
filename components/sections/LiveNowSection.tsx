import Link from 'next/link'
import Image from 'next/image'
import { Clock, Eye, Play } from 'lucide-react'
import { Article } from '@/types'
import { formatTimeAgo } from '@/lib/data'

interface LiveNowSectionProps {
  articles: Article[]
}

export default function LiveNowSection({ articles }: LiveNowSectionProps) {
  return (
    <section className="py-10 bg-white dark:bg-black border-t border-gray-200 dark:border-gray-700">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 dark:text-white">Live now</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {articles.map((article) => (
            <Link key={article.id} href={`/article/${article.id}`} className="group">
              <div className="relative h-72 rounded-xl overflow-hidden bg-gray-200 dark:bg-gray-900 shadow-professional-lg group-hover:shadow-professional-lg transition-all duration-300 card-hover">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover image-zoom"
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors duration-300" />
                
                {/* Video Play Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 bg-white/95 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-xl backdrop-blur-sm">
                    <Play className="w-7 h-7 text-primary ml-1" fill="currentColor" />
                  </div>
                </div>

                {/* Video Fallback Message */}
                <div className="absolute top-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                  Your browser does not support the video tag.
                </div>

                {/* Article Info */}
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                  <h3 className="text-white font-bold mb-2 line-clamp-2 group-hover:text-primary transition-colors text-sm">
                    {article.title}
                  </h3>
                  <div className="flex items-center gap-3 text-white/80 text-xs flex-wrap">
                    <div className="flex items-center gap-1.5">
                      <Image
                        src={article.author.avatar}
                        alt={article.author.name}
                        width={18}
                        height={18}
                        className="rounded-full border border-white/50"
                      />
                      <span>{article.author.name}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{formatTimeAgo(article.publishedAt)} ago</span>
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
    </section>
  )
}

