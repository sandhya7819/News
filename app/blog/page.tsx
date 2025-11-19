import { articles } from '@/lib/data'
import ArticleList from '@/components/articles/ArticleList'

export default function BlogPage() {
  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8">Blog</h1>
        <ArticleList articles={articles} />
      </div>
    </div>
  )
}

