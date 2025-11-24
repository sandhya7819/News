import { fetchWordPressPosts } from '@/lib/wordpress'
import ArticleList from '@/components/articles/ArticleList'
import { Metadata } from 'next'

// ISR: Static page regenerated every hour, or immediately via webhook
export const revalidate = 3600 // Revalidate every hour (3600 seconds)

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Blog - TNF News',
    description: 'Latest blog posts and articles from TNF News',
  }
}

export default async function BlogPage() {
  // Fetch WordPress posts with ISR caching
  const wpArticles = await fetchWordPressPosts({ per_page: 50, revalidate: 3600 })
  
  // Sort by published date (newest first)
  const sortedArticles = [...wpArticles].sort((a, b) => 
    new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  )

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8">Blog</h1>
        {sortedArticles.length > 0 ? (
          <ArticleList articles={sortedArticles} />
        ) : (
          <p className="text-gray-600 dark:text-gray-400">No blog posts found.</p>
        )}
      </div>
    </div>
  )
}
