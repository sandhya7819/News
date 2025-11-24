import { getPosts } from '@/lib/wordpress'
import ArticleList from '@/components/articles/ArticleList'
import { Metadata } from 'next'

// ISR: Static page regenerated every hour, or immediately via webhook
export const revalidate = 3600 // Revalidate every hour (3600 seconds)

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Latest News - TNF News',
    description: 'Latest news articles and updates',
  }
}

export default async function LatestPage() {
  // Fetch WordPress posts with ISR caching
  const articles = await getPosts({ per_page: 50, revalidate: 3600 })
  
  // Sort by published date (newest first)
  const latestArticles = [...articles].sort((a, b) => 
    new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  )

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8">Latest News</h1>
        {latestArticles.length > 0 ? (
          <ArticleList articles={latestArticles} />
        ) : (
          <p className="text-gray-600 dark:text-gray-400">No articles found.</p>
        )}
      </div>
    </div>
  )
}
