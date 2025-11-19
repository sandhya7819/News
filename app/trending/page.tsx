import { articles } from '@/lib/data'
import ArticleList from '@/components/articles/ArticleList'

export default function TrendingPage() {
  const trendingArticles = [...articles].sort((a, b) => b.views - a.views)

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8">Trending</h1>
        <ArticleList articles={trendingArticles} />
      </div>
    </div>
  )
}

