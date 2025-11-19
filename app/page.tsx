import { articles } from '@/lib/data'
import FeaturedArticles from '@/components/sections/FeaturedArticles'
import TrendingSection from '@/components/sections/TrendingSection'
import LatestWithSidebar from '@/components/sections/LatestWithSidebar'
import CategorySection from '@/components/sections/CategorySection'
import LiveNowSection from '@/components/sections/LiveNowSection'

export default function HomePage() {
  const featuredArticles = articles.filter(a => a.featured).slice(0, 5) || articles.slice(0, 5)
  const trendingArticles = [...articles].sort((a, b) => b.views - a.views).slice(0, 4)
  const latestArticles = articles.slice(0, 12)
  const techArticles = articles.filter(a => a.category === 'Tech').slice(0, 4)
  const businessArticles = articles.filter(a => a.category === 'Business').slice(0, 4)
  const worldArticles = articles.filter(a => a.category === 'World' || a.category === 'Arts').slice(0, 4)
  const artsArticles = articles.filter(a => a.category === 'Arts').slice(0, 4)
  const liveArticles = articles.slice(0, 4)

  return (
    <div className="bg-white dark:bg-black">
      {/* Featured Articles Section */}
      <FeaturedArticles articles={featuredArticles} />
      
      {/* Trending Section */}
      <TrendingSection articles={trendingArticles} />
      
      {/* Latest with Sidebar */}
      <LatestWithSidebar articles={latestArticles} />
      
      {/* Category Sections */}
      <CategorySection title="Tech" articles={techArticles} categorySlug="tech" />
      <CategorySection title="Business" articles={businessArticles} categorySlug="business" />
      <CategorySection title="World" articles={worldArticles} categorySlug="world" />
      <CategorySection title="Arts & Entertainments" articles={artsArticles} categorySlug="arts" />
      
      {/* Live Now Section */}
      <LiveNowSection articles={liveArticles} />
    </div>
  )
}
