import { fetchWordPressPosts } from '@/lib/wordpress'
import ArticleList from '@/components/articles/ArticleList'
import { Metadata } from 'next'

// ISR: Static page regenerated every hour, or immediately via webhook
export const revalidate = 3600 // Revalidate every hour (3600 seconds)

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Trending - TNF News',
    description: 'Trending articles and popular posts',
  }
}

export default async function TrendingPage() {
  // Fetch WordPress posts with ISR caching
  const wpArticles = await fetchWordPressPosts({ per_page: 50, revalidate: 3600 })
  
  // Sort by views (highest first)
  const trendingArticles = [...wpArticles].sort((a, b) => b.views - a.views)

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8">Trending</h1>
        {trendingArticles.length > 0 ? (
          <ArticleList articles={trendingArticles} />
        ) : (
          <p className="text-gray-600 dark:text-gray-400">No trending articles found.</p>
        )}
      </div>
    </div>
  )
}
