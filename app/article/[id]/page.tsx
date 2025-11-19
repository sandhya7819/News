import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Clock, Eye, MessageCircle, Share2, Bookmark } from 'lucide-react'
import { articles, formatTimeAgo } from '@/lib/data'
import ArticleCard from '@/components/articles/ArticleCard'

export default function ArticleDetailPage({ params }: { params: { id: string } }) {
  const article = articles.find(a => a.id === params.id)

  if (!article) {
    notFound()
  }

  const relatedArticles = articles
    .filter(a => a.id !== article.id && (a.category === article.category || a.tags?.some(tag => article.tags?.includes(tag))))
    .slice(0, 3)

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumb */}
          <nav className="text-sm mb-8 text-gray-600 dark:text-gray-400">
            <Link href="/" className="hover:text-primary">Home</Link>
            <span className="mx-2">/</span>
            <Link href={`/category/${article.category.toLowerCase()}`} className="hover:text-primary">
              {article.category}
            </Link>
            <span className="mx-2">/</span>
            <span>{article.title}</span>
          </nav>

          {/* Article Header */}
          <div className="mb-8">
            <span className="inline-block px-4 py-2 bg-primary text-white text-sm font-semibold rounded-full mb-4">
              {article.category}
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">{article.title}</h1>
            <div className="flex items-center gap-6 text-gray-600 dark:text-gray-400 mb-6">
              <div className="flex items-center gap-3">
                <Image
                  src={article.author.avatar}
                  alt={article.author.name}
                  width={48}
                  height={48}
                  className="rounded-full"
                />
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">{article.author.name}</p>
                  <p className="text-sm">{formatTimeAgo(article.publishedAt)}</p>
                </div>
              </div>
              <div className="flex items-center gap-6 ml-auto">
                <div className="flex items-center gap-2">
                  <Eye className="w-5 h-5" />
                  <span>{article.views}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MessageCircle className="w-5 h-5" />
                  <span>{article.comments}</span>
                </div>
                <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
                  <Share2 className="w-5 h-5" />
                </button>
                <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
                  <Bookmark className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Featured Image */}
          <div className="relative h-96 md:h-[500px] mb-8 rounded-lg overflow-hidden">
            <Image
              src={article.image}
              alt={article.title}
              fill
              className="object-cover"
            />
          </div>

          {/* Article Content */}
          <div className="prose prose-lg dark:prose-invert max-w-none mb-12">
            <p className="text-xl text-gray-700 dark:text-gray-300 mb-6">
              {article.excerpt}
            </p>
            <div className="text-gray-700 dark:text-gray-300 space-y-4">
              <p>
                {article.content || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'}
              </p>
              <p>
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
              <p>
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
              </p>
            </div>

            {/* Tags */}
            {article.tags && article.tags.length > 0 && (
              <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
                <h3 className="text-sm font-semibold mb-4">Tags:</h3>
                <div className="flex flex-wrap gap-2">
                  {article.tags.map((tag) => (
                    <Link
                      key={tag}
                      href={`/tag/${tag.toLowerCase()}`}
                      className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-sm hover:bg-primary hover:text-white transition-colors"
                    >
                      #{tag}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Related Articles */}
          {relatedArticles.length > 0 && (
            <div className="mt-16 pt-16 border-t border-gray-200 dark:border-gray-700">
              <h2 className="text-3xl font-bold mb-8">Related Articles</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedArticles.map((relatedArticle) => (
                  <ArticleCard key={relatedArticle.id} article={relatedArticle} variant="small" />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

