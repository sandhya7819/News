import { notFound } from 'next/navigation'
import { articles, categories } from '@/lib/data'
import ArticleList from '@/components/articles/ArticleList'

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const category = categories.find(c => c.slug === params.slug)

  if (!category) {
    notFound()
  }

  const categoryArticles = articles.filter(a => 
    a.category.toLowerCase() === category.name.toLowerCase()
  )

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8">{category.name}</h1>
        {categoryArticles.length > 0 ? (
          <ArticleList articles={categoryArticles} />
        ) : (
          <p className="text-gray-600 dark:text-gray-400">No articles found in this category.</p>
        )}
      </div>
    </div>
  )
}

