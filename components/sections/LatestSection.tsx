import Link from 'next/link'
import { Article } from '@/types'
import ArticleCard from '@/components/articles/ArticleCard'

interface LatestSectionProps {
  articles: Article[]
}

export default function LatestSection({ articles }: LatestSectionProps) {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold">Latest</h2>
          <Link href="/latest" className="text-primary hover:underline">
            View all
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      </div>
    </section>
  )
}

