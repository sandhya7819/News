import { fetchWordPressPosts, fetchWordPressCategories } from '@/lib/wordpress'
import FeaturedArticles from '@/components/sections/FeaturedArticles'
import TrendingSection from '@/components/sections/TrendingSection'
import LatestWithSidebar from '@/components/sections/LatestWithSidebar'
import CategorySection from '@/components/sections/CategorySection'
import LiveNowSection from '@/components/sections/LiveNowSection'
import { Metadata } from 'next'

// ISR: Static page regenerated every hour, or immediately via webhook
export const revalidate = 3600 // Revalidate every hour (3600 seconds)

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'TNF - Modern News Website',
    description: 'A modern news and magazine website built with Next.js',
  }
}

export default async function HomePage() {
  // Fetch WordPress posts with ISR caching
  const wpArticles = await fetchWordPressPosts({ per_page: 50, revalidate: 3600 })
  
  // Use WordPress articles only (no fallback to dummy data)
  const allArticles = wpArticles

  // Get featured articles (sticky posts), if less than 5, fill with regular articles
  const featuredFiltered = allArticles.filter((a) => a.featured)
  const featuredArticles = featuredFiltered.length >= 5 
    ? featuredFiltered.slice(0, 5)
    : [...featuredFiltered, ...allArticles.filter((a) => !a.featured)].slice(0, 5)
  
  const trendingArticles = [...allArticles].sort((a, b) => b.views - a.views).slice(0, 4)
  const latestArticles = allArticles.slice(0, 12)
  
  // Get categories from WordPress
  const wpCategories = await fetchWordPressCategories()
  
  // Filter articles by category slugs
  const techArticles = allArticles.filter((a) => 
    wpCategories.some(cat => cat.slug === 'tech' && a.category.toLowerCase() === cat.name.toLowerCase())
  ).slice(0, 5)
  
  const businessArticles = allArticles.filter((a) => 
    wpCategories.some(cat => cat.slug === 'business' && a.category.toLowerCase() === cat.name.toLowerCase())
  ).slice(0, 5)
  
  const worldArticles = allArticles.filter((a) => 
    wpCategories.some(cat => (cat.slug === 'world' || cat.slug === 'arts') && 
      (a.category.toLowerCase() === cat.name.toLowerCase()))
  ).slice(0, 5)
  
  const artsArticles = allArticles.filter((a) => 
    wpCategories.some(cat => cat.slug === 'arts' && a.category.toLowerCase() === cat.name.toLowerCase())
  ).slice(0, 5)
  
  const liveArticles = allArticles.slice(0, 4)

  return (
    <div className="bg-white dark:bg-black">
      {/* Featured Articles Section */}
      <FeaturedArticles articles={featuredArticles} />
      
      {/* Trending Section */}
      <TrendingSection articles={trendingArticles} />
      
      {/* Latest with Sidebar */}
      <LatestWithSidebar articles={latestArticles} />
      
      {/* Category Sections */}
      {techArticles.length > 0 && (
        <CategorySection title="Tech" articles={techArticles} categorySlug="tech" />
      )}
      {businessArticles.length > 0 && (
        <CategorySection title="Business" articles={businessArticles} categorySlug="business" />
      )}
      {worldArticles.length > 0 && (
        <CategorySection title="World" articles={worldArticles} categorySlug="world" />
      )}
      {artsArticles.length > 0 && (
        <CategorySection title="Arts & Entertainments" articles={artsArticles} categorySlug="arts" />
      )}
      
      {/* Live Now Section */}
      <LiveNowSection articles={liveArticles} />
    </div>
  )
}
