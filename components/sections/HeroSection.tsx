import Link from 'next/link'
import Image from 'next/image'
import { Clock, Eye, MessageCircle } from 'lucide-react'
import { Article } from '@/types'
import { formatTimeAgo } from '@/lib/data'

interface HeroSectionProps {
  featuredArticle: Article
}

export default function HeroSection({ featuredArticle }: HeroSectionProps) {
  return (
    <section className="relative h-[600px] md:h-[700px] overflow-hidden">
      <Image
        src={featuredArticle.image}
        alt={featuredArticle.title}
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
      <div className="absolute inset-0 container mx-auto px-4 flex items-end pb-12 md:pb-16">
        <div className="max-w-3xl">
          <span className="inline-block px-4 py-2 bg-primary text-white text-sm font-semibold rounded-full mb-4">
            {featuredArticle.category}
          </span>
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight">
            {featuredArticle.title}
          </h1>
          <p className="text-gray-200 mb-6 text-lg line-clamp-2">
            {featuredArticle.excerpt}
          </p>
          <div className="flex items-center gap-6 text-white/80 text-sm mb-6">
            <div className="flex items-center gap-2">
              <Image
                src={featuredArticle.author.avatar}
                alt={featuredArticle.author.name}
                width={32}
                height={32}
                className="rounded-full"
              />
              <span>{featuredArticle.author.name}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{formatTimeAgo(featuredArticle.publishedAt)}</span>
            </div>
            <div className="flex items-center gap-1">
              <Eye className="w-4 h-4" />
              <span>{featuredArticle.views}</span>
            </div>
            <div className="flex items-center gap-1">
              <MessageCircle className="w-4 h-4" />
              <span>{featuredArticle.comments}</span>
            </div>
          </div>
          <Link
            href={`/article/${featuredArticle.id}`}
            className="inline-block px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors font-semibold"
          >
            Read more
          </Link>
        </div>
      </div>
    </section>
  )
}

