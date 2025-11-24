import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Eye, MessageCircle, Share2, Bookmark } from 'lucide-react'
import { formatTimeAgo } from '@/lib/data'
import { fetchWordPressPageBySlug, fetchWordPressPosts } from '@/lib/wordpress'
import ArticleCard from '@/components/articles/ArticleCard'
import { Metadata } from 'next'

// ISR: Static page regenerated every hour, or immediately via webhook
export const revalidate = 3600 // Revalidate every hour (3600 seconds)

interface WordPressPageProps {
  params: { slug: string }
}

// Generate static params for all WordPress pages at build time
export async function generateStaticParams() {
  try {
    const { fetchWordPressPages } = await import('@/lib/wordpress')
    const pages = await fetchWordPressPages({ 
      per_page: 100,
      revalidate: 3600
    })
    
    return pages.map((page) => ({
      slug: page.slug || page.id.toString(),
    }))
  } catch (error) {
    console.error('Error generating static params for pages:', error)
    return []
  }
}

export async function generateMetadata({ params }: WordPressPageProps): Promise<Metadata> {
  const page = await fetchWordPressPageBySlug(params.slug)
  
  if (!page) {
    return {
      title: 'Page Not Found',
    }
  }
  
  return {
    title: page.seo?.title || page.title,
    description: page.seo?.description || page.excerpt,
    openGraph: {
      title: page.seo?.title || page.title,
      description: page.seo?.description || page.excerpt,
      images: page.seo?.ogImage ? [{ url: page.seo.ogImage }] : page.image ? [{ url: page.image }] : undefined,
      type: 'website',
    },
    alternates: {
      canonical: page.seo?.canonical,
    },
  }
}

export default async function WordPressPage({ params }: WordPressPageProps) {
  // Fetch WordPress page by slug with ISR caching
  const page = await fetchWordPressPageBySlug(params.slug)

  if (!page) {
    notFound()
  }

  // Get related posts with ISR caching
  const relatedPosts = await fetchWordPressPosts({ per_page: 3, revalidate: 3600 })

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumb */}
          <nav className="text-sm mb-8 text-gray-600 dark:text-gray-400">
            <Link href="/" className="hover:text-primary">Home</Link>
            <span className="mx-2">/</span>
            <span>{page.title}</span>
          </nav>

          {/* Page Header */}
          <div className="mb-8">
            <span className="inline-block px-4 py-2 bg-primary text-white text-sm font-semibold rounded-full mb-4">
              Page
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">{page.title}</h1>
            <div className="flex items-center gap-6 text-gray-600 dark:text-gray-400 mb-6">
              <div className="flex items-center gap-3">
                <Image
                  src={page.author.avatar}
                  alt={page.author.name}
                  width={48}
                  height={48}
                  className="rounded-full"
                />
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">{page.author.name}</p>
                  <p className="text-sm">{formatTimeAgo(page.publishedAt)}</p>
                </div>
              </div>
              <div className="flex items-center gap-6 ml-auto">
                <div className="flex items-center gap-2">
                  <Eye className="w-5 h-5" />
                  <span>{page.views}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MessageCircle className="w-5 h-5" />
                  <span>{page.comments}</span>
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
          {page.image && (
            <div className="relative h-96 md:h-[500px] mb-8 rounded-lg overflow-hidden">
              <Image
                src={page.image}
                alt={page.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          {/* Page Content */}
          <div className="prose prose-lg dark:prose-invert max-w-none mb-12">
            <p className="text-xl text-gray-700 dark:text-gray-300 mb-6">
              {page.excerpt}
            </p>
            <div 
              className="text-gray-700 dark:text-gray-300 space-y-4"
              dangerouslySetInnerHTML={{ __html: page.content || '<p>Content not available.</p>' }}
            />
          </div>

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <div className="mt-16 pt-16 border-t border-gray-200 dark:border-gray-700">
              <h2 className="text-3xl font-bold mb-8">Related Posts</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedPosts.map((post) => (
                  <ArticleCard key={post.id} article={post} variant="small" />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
