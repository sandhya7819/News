import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Clock, Eye, MessageCircle, Share2, Bookmark } from 'lucide-react'
import { fetchWordPressPostBySlug, fetchWordPressPosts, fetchWordPressCategories } from '@/lib/wordpress'
import { formatTimeAgo } from '@/lib/data'
import ArticleCard from '@/components/articles/ArticleCard'
import { Metadata } from 'next'

// ISR Configuration: Pages will be statically generated and revalidated every hour
// When new blog is added in WordPress, webhook will trigger immediate revalidation
export const revalidate = 3600 // Revalidate every hour (3600 seconds)

interface BlogPostPageProps {
  params: { slug: string }
}

// Generate static params for all blog posts at build time
// This pre-generates all blog post pages as static HTML
export async function generateStaticParams() {
  try {
    // Fetch all published posts to generate static pages
    const posts = await fetchWordPressPosts({ 
      per_page: 100, // Adjust based on your total posts
      revalidate: 3600 // Cache for 1 hour
    })
    
    // Return array of slugs for static generation
    return posts.map((post) => ({
      slug: post.slug || post.id.toString(),
    }))
  } catch (error) {
    console.error('Error generating static params:', error)
    return []
  }
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const article = await fetchWordPressPostBySlug(params.slug)
  
  if (!article) {
    return {
      title: 'Post Not Found',
    }
  }
  
  return {
    title: article.seo?.title || article.title,
    description: article.seo?.description || article.excerpt,
    openGraph: {
      title: article.seo?.title || article.title,
      description: article.seo?.description || article.excerpt,
      images: article.seo?.ogImage ? [{ url: article.seo.ogImage }] : [{ url: article.image }],
      type: 'article',
    },
    alternates: {
      canonical: article.seo?.canonical,
    },
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const article = await fetchWordPressPostBySlug(params.slug)

  if (!article) {
    notFound()
  }

  // Get WordPress categories for breadcrumb
  const wpCategories = await fetchWordPressCategories()
  const categorySlug = wpCategories.find(cat => 
    cat.name.toLowerCase() === article.category.toLowerCase()
  )?.slug || article.category.toLowerCase()

  // Get related articles from same category
  const wpCategory = wpCategories.find(cat => 
    cat.name.toLowerCase() === article.category.toLowerCase()
  )
  
  const relatedArticles = wpCategory 
    ? await fetchWordPressPosts({ 
        per_page: 4, 
        categories: [parseInt(wpCategory.id)],
        revalidate: 3600 // Cache for 1 hour
      })
    : await fetchWordPressPosts({ per_page: 4, revalidate: 3600 })
  
  const filteredRelated = relatedArticles
    .filter(a => a.id !== article.id)
    .slice(0, 3)

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumb */}
          <nav className="text-sm mb-8 text-gray-600 dark:text-gray-400">
            <Link href="/" className="hover:text-primary">Home</Link>
            <span className="mx-2">/</span>
            <Link href={`/category/${categorySlug}`} className="hover:text-primary">
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
              priority
            />
          </div>

          {/* Article Content */}
          <div className="prose prose-lg dark:prose-invert max-w-none mb-12">
            <p className="text-xl text-gray-700 dark:text-gray-300 mb-6">
              {article.excerpt}
            </p>
            <div 
              className="text-gray-700 dark:text-gray-300 space-y-4"
              dangerouslySetInnerHTML={{ __html: article.content || '<p>Content not available.</p>' }}
            />

            {/* Tags */}
            {article.tags && article.tags.length > 0 && (
              <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
                <h3 className="text-sm font-semibold mb-4">Tags:</h3>
                <div className="flex flex-wrap gap-2">
                  {article.tags.map((tag) => (
                    <Link
                      key={tag}
                      href={`/tag/${tag.toLowerCase().replace(/\s+/g, '-')}`}
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
          {filteredRelated.length > 0 && (
            <div className="mt-16 pt-16 border-t border-gray-200 dark:border-gray-700">
              <h2 className="text-3xl font-bold mb-8">Related Articles</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {filteredRelated.map((relatedArticle) => (
                  <ArticleCard 
                    key={relatedArticle.id} 
                    article={relatedArticle} 
                    variant="small"
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
