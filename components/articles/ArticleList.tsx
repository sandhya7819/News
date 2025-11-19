import { Article } from '@/types'
import ArticleCard from './ArticleCard'

interface ArticleListProps {
  articles: Article[]
  variant?: 'default' | 'large' | 'small'
}

export default function ArticleList({ articles, variant = 'default' }: ArticleListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {articles.map((article) => (
        <ArticleCard key={article.id} article={article} variant={variant} />
      ))}
    </div>
  )
}

