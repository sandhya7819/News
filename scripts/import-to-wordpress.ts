/**
 * Import Data TO WordPress Script
 * 
 * This script imports posts, pages, categories from JSON files
 * TO a WordPress site via REST API (requires authentication).
 * 
 * Usage:
 *   WORDPRESS_URL=https://your-site.com \
 *   WORDPRESS_USERNAME=admin \
 *   WORDPRESS_PASSWORD=your-app-password \
 *   npx tsx scripts/import-to-wordpress.ts
 */

import { readFile } from 'fs/promises'
import path from 'path'

// Configuration
const WORDPRESS_URL = process.env.WORDPRESS_URL || 'https://xzectlabs.com'
const WORDPRESS_API_URL = `${WORDPRESS_URL}/wp-json/wp/v2`
const WORDPRESS_USERNAME = process.env.WORDPRESS_USERNAME || ''
const WORDPRESS_PASSWORD = process.env.WORDPRESS_PASSWORD || '' // Use Application Password
const INPUT_DIR = path.join(process.cwd(), 'data', 'wordpress-import')

// Create Basic Auth header
function getAuthHeader(): string {
  const credentials = Buffer.from(`${WORDPRESS_USERNAME}:${WORDPRESS_PASSWORD}`).toString('base64')
  return `Basic ${credentials}`
}

// Create category in WordPress
async function createCategory(category: { name: string; slug: string; description?: string }) {
  try {
    const response = await fetch(`${WORDPRESS_API_URL}/categories`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': getAuthHeader(),
      },
      body: JSON.stringify({
        name: category.name,
        slug: category.slug,
        description: category.description || '',
      }),
    })

    if (!response.ok) {
      const error = await response.text()
      throw new Error(`HTTP ${response.status}: ${error}`)
    }

    return await response.json()
  } catch (error) {
    console.error(`Error creating category "${category.name}":`, error)
    return null
  }
}

// Create tag in WordPress
async function createTag(tag: { name: string; slug: string; description?: string }) {
  try {
    const response = await fetch(`${WORDPRESS_API_URL}/tags`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': getAuthHeader(),
      },
      body: JSON.stringify({
        name: tag.name,
        slug: tag.slug,
        description: tag.description || '',
      }),
    })

    if (!response.ok) {
      const error = await response.text()
      throw new Error(`HTTP ${response.status}: ${error}`)
    }

    return await response.json()
  } catch (error) {
    console.error(`Error creating tag "${tag.name}":`, error)
    return null
  }
}

// Upload media to WordPress
async function uploadMedia(imageUrl: string, title: string): Promise<number | null> {
  try {
    // Download image
    const imageResponse = await fetch(imageUrl)
    if (!imageResponse.ok) {
      throw new Error(`Failed to download image: ${imageResponse.statusText}`)
    }

    const imageBuffer = await imageResponse.arrayBuffer()
    const filename = imageUrl.split('/').pop() || 'image.jpg'
    const contentType = imageResponse.headers.get('content-type') || 'image/jpeg'

    // Create FormData
    const formData = new FormData()
    const blob = new Blob([imageBuffer], { type: contentType })
    formData.append('file', blob, filename)
    formData.append('title', title)

    // Upload to WordPress
    const response = await fetch(`${WORDPRESS_API_URL}/media`, {
      method: 'POST',
      headers: {
        'Authorization': getAuthHeader(),
      },
      body: formData,
    })

    if (!response.ok) {
      const error = await response.text()
      throw new Error(`HTTP ${response.status}: ${error}`)
    }

    const media = await response.json()
    return media.id
  } catch (error) {
    console.error(`Error uploading media "${title}":`, error)
    return null
  }
}

// Create post in WordPress
async function createPost(post: any, categoryMap: Map<string, number>, tagMap: Map<string, number>) {
  try {
    const categories = post.categories
      ?.map((catId: number) => categoryMap.get(catId.toString()))
      .filter(Boolean) || []

    const tags = post.tags
      ?.map((tagId: number) => tagMap.get(tagId.toString()))
      .filter(Boolean) || []

    const postData: any = {
      title: post.title?.rendered || post.title,
      content: post.content?.rendered || post.content,
      excerpt: post.excerpt?.rendered || post.excerpt,
      status: 'publish',
      categories,
      tags,
    }

    if (post.slug) {
      postData.slug = post.slug
    }

    if (post.date) {
      postData.date = post.date
    }

    // Handle featured image
    if (post.featured_media && post._embedded?.['wp:featuredmedia']?.[0]) {
      const mediaUrl = post._embedded['wp:featuredmedia'][0].source_url
      const mediaId = await uploadMedia(mediaUrl, post.title?.rendered || 'Featured Image')
      if (mediaId) {
        postData.featured_media = mediaId
      }
    }

    const response = await fetch(`${WORDPRESS_API_URL}/posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': getAuthHeader(),
      },
      body: JSON.stringify(postData),
    })

    if (!response.ok) {
      const error = await response.text()
      throw new Error(`HTTP ${response.status}: ${error}`)
    }

    return await response.json()
  } catch (error) {
    console.error(`Error creating post "${post.title?.rendered || post.title}":`, error)
    return null
  }
}

// Main import function
async function importToWordPress() {
  console.log('🚀 Starting WordPress Import...\n')
  console.log(`📡 WordPress URL: ${WORDPRESS_URL}`)
  
  if (!WORDPRESS_USERNAME || !WORDPRESS_PASSWORD) {
    console.error('❌ Error: WORDPRESS_USERNAME and WORDPRESS_PASSWORD are required!')
    console.error('\n💡 Tip: Use WordPress Application Password (not regular password)')
    console.error('   Settings > Users > Your Profile > Application Passwords')
    process.exit(1)
  }

  try {
    // 1. Load categories
    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
    console.log('📂 STEP 1: Importing Categories')
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n')
    
    const categoriesData = await readFile(path.join(INPUT_DIR, 'categories.json'), 'utf-8')
    const categories = JSON.parse(categoriesData)
    
    const categoryMap = new Map<string, number>()
    
    for (const category of categories) {
      console.log(`  Creating category: ${category.name}...`)
      const created = await createCategory(category)
      if (created) {
        categoryMap.set(category.id.toString(), created.id)
        console.log(`  ✅ Created category "${category.name}" (ID: ${created.id})`)
      }
    }

    // 2. Load tags
    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
    console.log('🏷️  STEP 2: Importing Tags')
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n')
    
    const tagsData = await readFile(path.join(INPUT_DIR, 'tags.json'), 'utf-8')
    const tags = JSON.parse(tagsData)
    
    const tagMap = new Map<string, number>()
    
    for (const tag of tags) {
      console.log(`  Creating tag: ${tag.name}...`)
      const created = await createTag(tag)
      if (created) {
        tagMap.set(tag.id.toString(), created.id)
        console.log(`  ✅ Created tag "${tag.name}" (ID: ${created.id})`)
      }
    }

    // 3. Load and import posts
    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
    console.log('📝 STEP 3: Importing Posts')
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n')
    
    const postsData = await readFile(path.join(INPUT_DIR, 'posts.json'), 'utf-8')
    const posts = JSON.parse(postsData)
    
    let successCount = 0
    let failCount = 0
    
    for (let i = 0; i < posts.length; i++) {
      const post = posts[i]
      console.log(`  [${i + 1}/${posts.length}] Creating post: ${post.title?.rendered || post.title}...`)
      
      const created = await createPost(post, categoryMap, tagMap)
      if (created) {
        successCount++
        console.log(`  ✅ Created post "${post.title?.rendered || post.title}" (ID: ${created.id})`)
      } else {
        failCount++
        console.log(`  ❌ Failed to create post "${post.title?.rendered || post.title}"`)
      }
      
      // Rate limiting - wait 1 second between requests
      if (i < posts.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 1000))
      }
    }

    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
    console.log('✅ IMPORT COMPLETE!')
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n')
    console.log(`📊 Statistics:`)
    console.log(`   ✅ Successful: ${successCount}`)
    console.log(`   ❌ Failed: ${failCount}`)
    console.log(`   📝 Total: ${posts.length}`)

  } catch (error) {
    console.error('\n❌ Import failed:', error)
    throw error
  }
}

// Run import
if (require.main === module) {
  importToWordPress()
    .then(() => {
      console.log('\n✨ Done!')
      process.exit(0)
    })
    .catch((error) => {
      console.error('\n💥 Fatal error:', error)
      process.exit(1)
    })
}

export { importToWordPress }

