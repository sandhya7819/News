/**
 * WordPress Bulk Import Script
 * 
 * This script imports all posts, pages, categories, tags, and media
 * from a WordPress site via REST API.
 * 
 * Usage:
 *   npx tsx scripts/bulk-import-wordpress.ts
 * 
 * Or with custom WordPress URL:
 *   WORDPRESS_URL=https://xzectlabs.com npx tsx scripts/bulk-import-wordpress.ts
 */

import { writeFile, mkdir } from 'fs/promises'
import { existsSync } from 'fs'
import path from 'path'

// Configuration
const WORDPRESS_URL = process.env.WORDPRESS_URL || 'https://xzectlabs.com'
const WORDPRESS_API_URL = `${WORDPRESS_URL}/wp-json/wp/v2`
const OUTPUT_DIR = path.join(process.cwd(), 'data', 'wordpress-import')
const BATCH_SIZE = 100 // Number of items to fetch per request

// Types
interface WordPressPost {
  id: number
  date: string
  modified: string
  slug: string
  status: string
  type: string
  link: string
  title: { rendered: string }
  content: { rendered: string }
  excerpt: { rendered: string }
  author: number
  featured_media: number
  categories: number[]
  tags: number[]
  sticky: boolean
  yoast_head_json?: any
  acf?: Record<string, any>
  _embedded?: {
    'wp:featuredmedia'?: any[]
    'wp:term'?: any[]
    author?: any[]
  }
}

interface WordPressCategory {
  id: number
  name: string
  slug: string
  description: string
  count: number
}

interface WordPressTag {
  id: number
  name: string
  slug: string
  description: string
  count: number
}

interface WordPressMedia {
  id: number
  source_url: string
  media_details: {
    width: number
    height: number
    sizes: Record<string, {
      source_url: string
      width: number
      height: number
    }>
  }
  title: { rendered: string }
  alt_text: string
  mime_type: string
}

interface ImportStats {
  posts: number
  pages: number
  categories: number
  tags: number
  media: number
  errors: string[]
  startTime: Date
  endTime?: Date
}

// Helper: Fetch all paginated data
async function fetchAllPages<T>(
  endpoint: string,
  params: Record<string, any> = {}
): Promise<T[]> {
  const allItems: T[] = []
  let page = 1
  let hasMore = true

  console.log(`📥 Fetching ${endpoint}...`)

  while (hasMore) {
    const queryParams = new URLSearchParams({
      per_page: BATCH_SIZE.toString(),
      page: page.toString(),
      ...Object.fromEntries(
        Object.entries(params).map(([k, v]) => [k, String(v)])
      ),
    })

    try {
      const response = await fetch(`${WORDPRESS_API_URL}/${endpoint}?${queryParams.toString()}&_embed=true`)
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }

      const items: T[] = await response.json()
      
      if (items.length === 0) {
        hasMore = false
      } else {
        allItems.push(...items)
        console.log(`  ✓ Fetched page ${page}: ${items.length} items (Total: ${allItems.length})`)
        page++
        
        // Check if we got fewer items than batch size (last page)
        if (items.length < BATCH_SIZE) {
          hasMore = false
        }
      }
    } catch (error) {
      console.error(`  ✗ Error fetching page ${page}:`, error)
      hasMore = false
    }
  }

  console.log(`  ✅ Total ${endpoint}: ${allItems.length} items\n`)
  return allItems
}

// Fetch single item by ID
async function fetchById<T>(endpoint: string, id: number): Promise<T | null> {
  try {
    const response = await fetch(`${WORDPRESS_API_URL}/${endpoint}/${id}?_embed=true`)
    if (!response.ok) return null
    return await response.json()
  } catch (error) {
    console.error(`Error fetching ${endpoint}/${id}:`, error)
    return null
  }
}

// Main import function
async function bulkImport() {
  const stats: ImportStats = {
    posts: 0,
    pages: 0,
    categories: 0,
    tags: 0,
    media: 0,
    errors: [],
    startTime: new Date(),
  }

  console.log('🚀 Starting WordPress Bulk Import...\n')
  console.log(`📡 WordPress URL: ${WORDPRESS_URL}`)
  console.log(`📡 API URL: ${WORDPRESS_API_URL}\n`)

  // Create output directory
  if (!existsSync(OUTPUT_DIR)) {
    await mkdir(OUTPUT_DIR, { recursive: true })
    console.log(`📁 Created output directory: ${OUTPUT_DIR}\n`)
  }

  try {
    // 1. Import Categories
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
    console.log('📂 STEP 1: Importing Categories')
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n')
    
    const categories = await fetchAllPages<WordPressCategory>('categories', {
      per_page: 100,
    })
    stats.categories = categories.length

    // Filter out "Uncategorized" (usually ID 1)
    const filteredCategories = categories.filter(cat => cat.id !== 1)
    
    await writeFile(
      path.join(OUTPUT_DIR, 'categories.json'),
      JSON.stringify(filteredCategories, null, 2),
      'utf-8'
    )
    console.log(`💾 Saved ${filteredCategories.length} categories to categories.json\n`)

    // 2. Import Tags
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
    console.log('🏷️  STEP 2: Importing Tags')
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n')
    
    const tags = await fetchAllPages<WordPressTag>('tags', {
      per_page: 100,
    })
    stats.tags = tags.length

    await writeFile(
      path.join(OUTPUT_DIR, 'tags.json'),
      JSON.stringify(tags, null, 2),
      'utf-8'
    )
    console.log(`💾 Saved ${tags.length} tags to tags.json\n`)

    // 3. Import Posts
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
    console.log('📝 STEP 3: Importing Posts')
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n')
    
    const posts = await fetchAllPages<WordPressPost>('posts', {
      status: 'publish',
    })
    stats.posts = posts.length

    await writeFile(
      path.join(OUTPUT_DIR, 'posts.json'),
      JSON.stringify(posts, null, 2),
      'utf-8'
    )
    console.log(`💾 Saved ${posts.length} posts to posts.json\n`)

    // 4. Import Pages
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
    console.log('📄 STEP 4: Importing Pages')
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n')
    
    const pages = await fetchAllPages<WordPressPost>('pages', {
      status: 'publish',
    })
    stats.pages = pages.length

    await writeFile(
      path.join(OUTPUT_DIR, 'pages.json'),
      JSON.stringify(pages, null, 2),
      'utf-8'
    )
    console.log(`💾 Saved ${pages.length} pages to pages.json\n`)

    // 5. Import Media (from featured images)
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
    console.log('🖼️  STEP 5: Importing Media')
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n')
    
    // Collect unique media IDs from posts and pages
    const mediaIds = new Set<number>()
    
    posts.forEach(post => {
      if (post.featured_media) mediaIds.add(post.featured_media)
      if (post._embedded?.['wp:featuredmedia']) {
        post._embedded['wp:featuredmedia'].forEach((media: any) => {
          if (media.id) mediaIds.add(media.id)
        })
      }
    })
    
    pages.forEach(page => {
      if (page.featured_media) mediaIds.add(page.featured_media)
      if (page._embedded?.['wp:featuredmedia']) {
        page._embedded['wp:featuredmedia'].forEach((media: any) => {
          if (media.id) mediaIds.add(media.id)
        })
      }
    })

    console.log(`  📥 Found ${mediaIds.size} unique media items to fetch...`)

    const mediaItems: WordPressMedia[] = []
    let mediaCount = 0
    
    for (const mediaId of Array.from(mediaIds)) {
      const media = await fetchById<WordPressMedia>('media', mediaId)
      if (media) {
        mediaItems.push(media)
        mediaCount++
        if (mediaCount % 10 === 0) {
          console.log(`  ✓ Fetched ${mediaCount}/${mediaIds.size} media items...`)
        }
      }
    }

    stats.media = mediaItems.length

    await writeFile(
      path.join(OUTPUT_DIR, 'media.json'),
      JSON.stringify(mediaItems, null, 2),
      'utf-8'
    )
    console.log(`  ✅ Total media: ${mediaItems.length} items`)
    console.log(`💾 Saved ${mediaItems.length} media items to media.json\n`)

    // 6. Create summary report
    stats.endTime = new Date()
    const duration = (stats.endTime.getTime() - stats.startTime.getTime()) / 1000

    const summary = {
      importDate: stats.startTime.toISOString(),
      duration: `${duration.toFixed(2)} seconds`,
      wordpressUrl: WORDPRESS_URL,
      statistics: {
        posts: stats.posts,
        pages: stats.pages,
        categories: stats.categories,
        tags: stats.tags,
        media: stats.media,
        total: stats.posts + stats.pages + stats.categories + stats.tags + stats.media,
      },
      files: {
        posts: 'posts.json',
        pages: 'pages.json',
        categories: 'categories.json',
        tags: 'tags.json',
        media: 'media.json',
      },
      errors: stats.errors,
    }

    await writeFile(
      path.join(OUTPUT_DIR, 'import-summary.json'),
      JSON.stringify(summary, null, 2),
      'utf-8'
    )

    // 7. Print final summary
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
    console.log('✅ IMPORT COMPLETE!')
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n')
    console.log('📊 Import Statistics:')
    console.log(`   📝 Posts:      ${stats.posts}`)
    console.log(`   📄 Pages:      ${stats.pages}`)
    console.log(`   📂 Categories: ${stats.categories}`)
    console.log(`   🏷️  Tags:       ${stats.tags}`)
    console.log(`   🖼️  Media:      ${stats.media}`)
    console.log(`   ⏱️  Duration:   ${duration.toFixed(2)}s`)
    console.log(`\n📁 Files saved to: ${OUTPUT_DIR}`)
    console.log(`\n📋 Summary: import-summary.json`)
    
    if (stats.errors.length > 0) {
      console.log(`\n⚠️  Errors: ${stats.errors.length}`)
      stats.errors.forEach(error => console.log(`   - ${error}`))
    }

  } catch (error) {
    stats.errors.push(String(error))
    console.error('\n❌ Import failed:', error)
    throw error
  }
}

// Run import
if (require.main === module) {
  bulkImport()
    .then(() => {
      console.log('\n✨ Done!')
      process.exit(0)
    })
    .catch((error) => {
      console.error('\n💥 Fatal error:', error)
      process.exit(1)
    })
}

export { bulkImport }

