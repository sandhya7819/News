import { notFound } from 'next/navigation'
import { fetchWordPressPosts, fetchWordPressCategories } from '@/lib/wordpress'
import ArticleList from '@/components/articles/ArticleList'
import { Metadata } from 'next'

// ISR: Static page regenerated every hour, or immediately via webhook
export const revalidate = 3600 // Revalidate every hour (3600 seconds)

interface CategoryPageProps {
  params: { slug: string }
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const wpCategories = await fetchWordPressCategories()
  const category = wpCategories.find(c => c.slug === params.slug)
  
  return {
    title: category ? `${category.name} - TNF News` : 'Category - TNF News',
    description: category?.description || `Articles in ${params.slug} category`,
  }
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  // Fetch WordPress categories and find matching category
  const wpCategories = await fetchWordPressCategories()
  const wpCategory = wpCategories.find(c => c.slug === params.slug)

  if (!wpCategory) {
    notFound()
  }

  // Fetch WordPress posts for this category with ISR caching
  const wpArticles = await fetchWordPressPosts({ 
    per_page: 50,
    categories: [parseInt(wpCategory.id)],
    revalidate: 3600
  })

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8">{wpCategory.name}</h1>
        {wpCategory.description && (
          <p className="text-gray-600 dark:text-gray-400 mb-8">{wpCategory.description}</p>
        )}
        {wpArticles.length > 0 ? (
          <ArticleList articles={wpArticles} />
        ) : (
          <p className="text-gray-600 dark:text-gray-400">No articles found in this category.</p>
        )}
      </div>
    </div>
  )
}
