import { articles } from '@/lib/data'
import ArticleList from '@/components/articles/ArticleList'

export default function LatestPage() {
  const latestArticles = [...articles].sort((a, b) => 
    new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  )

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8">Latest News</h1>
        <ArticleList articles={latestArticles} />
      </div>
    </div>
  )
}

