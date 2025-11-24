import { Article, Author, YoastSEO } from '@/types'

// WordPress API Configuration
const WORDPRESS_API_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL || 'https://blog.thenewsfeed.in/wp-json/wp/v2'
const WORDPRESS_YOAST_API_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL || 'https://blog.thenewsfeed.in/wp-json/yoast/v1'

// WordPress REST API Interfaces
export interface WordPressPost {
  id: number
  date: string
  modified: string
  slug: string
  status: string
  type: string
  link: string
  title: {
    rendered: string
  }
  content: {
    rendered: string
    protected: boolean
  }
  excerpt: {
    rendered: string
    protected: boolean
  }
  author: number
  featured_media: number
  comment_status: string
  ping_status: string
  sticky: boolean
  template: string
  format: string
  meta: any
  categories: number[]
  tags: number[]
  acf?: Record<string, any> // ACF fields
  yoast_head?: string // Yoast SEO head
  yoast_head_json?: {
    title?: string
    description?: string
    robots?: {
      index?: string
      follow?: string
    }
    og_title?: string
    og_description?: string
    og_image?: Array<{ url: string }>
    twitter_card?: string
    twitter_title?: string
    twitter_description?: string
    canonical?: string
    schema?: any
  }
  _embedded?: {
    'wp:featuredmedia'?: WordPressMedia[]
    'wp:term'?: Array<Array<WordPressCategory | WordPressTag>>
    author?: WordPressAuthor[]
  }
  _links: any
}

export interface WordPressMedia {
  id: number
  source_url: string
  media_details: {
    width: number
    height: number
    sizes: {
      [key: string]: {
        source_url: string
        width: number
        height: number
      }
    }
    image_meta?: any
  }
  alt_text: string
  title: {
    rendered: string
  }
}

export interface WordPressAuthor {
  id: number
  name: string
  slug: string
  avatar_urls: {
    [key: string]: string
  }
  description?: string
}

export interface WordPressCategory {
  id: number
  name: string
  slug: string
  description?: string
  count?: number
}

export interface WordPressTag {
  id: number
  name: string
  slug: string
  description?: string
  count?: number
}

export interface WordPressPage {
  id: number
  date: string
  modified: string
  slug: string
  status: string
  type: string
  link: string
  title: {
    rendered: string
  }
  content: {
    rendered: string
    protected: boolean
  }
  excerpt: {
    rendered: string
    protected: boolean
  }
  author: number
  featured_media: number
  parent: number
  menu_order: number
  template: string
  acf?: Record<string, any>
  yoast_head_json?: {
    title?: string
    description?: string
    og_title?: string
    og_description?: string
    og_image?: Array<{ url: string }>
    canonical?: string
  }
  _embedded?: {
    'wp:featuredmedia'?: WordPressMedia[]
    author?: WordPressAuthor[]
  }
  _links: any
}

// Default author fallback
const defaultAuthor: Author = {
  id: '1',
  name: 'TNF Editor',
  avatar: 'https://i.pravatar.cc/150?img=1',
}

// Helper function to strip HTML and decode entities
function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, '')
    .replace(/&[^;]+;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

// Helper function to get featured image from embedded data or fetch it
async function getFeaturedImage(
  featuredMediaId: number | null,
  embeddedMedia?: WordPressMedia[]
): Promise<string> {
  const defaultImage = 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800'
  
  // Try embedded media first
  if (embeddedMedia && embeddedMedia.length > 0) {
    return embeddedMedia[0].source_url || defaultImage
  }
  
  // Fetch media if ID is provided
  if (featuredMediaId) {
    try {
      const mediaResponse = await fetch(`${WORDPRESS_API_URL}/media/${featuredMediaId}`, {
        next: { revalidate: 3600 }
      })
      if (mediaResponse.ok) {
        const media: WordPressMedia = await mediaResponse.json()
        return media.source_url || defaultImage
      }
    } catch (error) {
      console.error('Error fetching media:', error)
    }
  }
  
  return defaultImage
}

// Helper function to get author from embedded data or fetch it
async function getAuthor(
  authorId: number,
  embeddedAuthors?: WordPressAuthor[]
): Promise<Author> {
  // Try embedded author first
  if (embeddedAuthors && embeddedAuthors.length > 0) {
    const wpAuthor = embeddedAuthors[0]
    return {
      id: wpAuthor.id.toString(),
      name: wpAuthor.name,
      avatar: wpAuthor.avatar_urls?.['96'] || wpAuthor.avatar_urls?.['48'] || defaultAuthor.avatar,
      bio: wpAuthor.description,
    }
  }
  
  // Fetch author if not embedded
  try {
    const authorResponse = await fetch(`${WORDPRESS_API_URL}/users/${authorId}`, {
      next: { revalidate: 3600 }
    })
    if (authorResponse.ok) {
      const wpAuthor: WordPressAuthor = await authorResponse.json()
      return {
        id: wpAuthor.id.toString(),
        name: wpAuthor.name,
        avatar: wpAuthor.avatar_urls?.['96'] || wpAuthor.avatar_urls?.['48'] || defaultAuthor.avatar,
        bio: wpAuthor.description,
      }
    }
  } catch (error) {
    console.error('Error fetching author:', error)
  }
  
  return defaultAuthor
}

// Helper function to get category name from embedded data or fetch it
async function getCategoryName(
  categoryIds: number[],
  embeddedTerms?: Array<Array<WordPressCategory | WordPressTag>>
): Promise<string> {
  if (!categoryIds || categoryIds.length === 0) {
    return 'News'
  }
  
  // Try embedded terms first
  if (embeddedTerms && embeddedTerms.length > 0) {
    const categories = embeddedTerms[0] as WordPressCategory[]
    if (categories && categories.length > 0) {
      return categories[0].name
    }
  }
  
  // Fetch category if not embedded
  try {
    const categoryResponse = await fetch(`${WORDPRESS_API_URL}/categories/${categoryIds[0]}`, {
      next: { revalidate: 3600 }
    })
    if (categoryResponse.ok) {
      const wpCategory: WordPressCategory = await categoryResponse.json()
      return wpCategory.name
    }
  } catch (error) {
    console.error('Error fetching category:', error)
  }
  
  return 'News'
}

// Helper function to get tag names from embedded data
function getTagNames(embeddedTerms?: Array<Array<WordPressCategory | WordPressTag>>): string[] {
  if (!embeddedTerms || embeddedTerms.length < 2) {
    return []
  }
  
  const tags = embeddedTerms[1] as WordPressTag[]
  if (!tags || tags.length === 0) {
    return []
  }
  
  return tags.map(tag => tag.name)
}

// Convert WordPress post to Article format
async function convertPostToArticle(post: WordPressPost): Promise<Article> {
  const imageUrl = await getFeaturedImage(
    post.featured_media,
    post._embedded?.['wp:featuredmedia']
  )
  
  const author = await getAuthor(
    post.author,
    post._embedded?.author
  )
  
  const category = await getCategoryName(
    post.categories,
    post._embedded?.['wp:term']
  )
  
  const tags = getTagNames(post._embedded?.['wp:term'])
  
  const excerpt = stripHtml(post.excerpt.rendered).substring(0, 200)
  
  // Extract SEO data from Yoast
  const seo = post.yoast_head_json ? {
    title: post.yoast_head_json.title || post.title.rendered,
    description: post.yoast_head_json.description || excerpt,
    ogImage: post.yoast_head_json.og_image?.[0]?.url || imageUrl,
    canonical: post.yoast_head_json.canonical || post.link,
  } : undefined
  
  return {
    id: post.id.toString(),
    slug: post.slug,
    title: stripHtml(post.title.rendered),
    excerpt: excerpt || 'Read more...',
    content: post.content.rendered,
    image: imageUrl,
    category: category,
    author: author,
    publishedAt: post.date,
    modifiedAt: post.modified,
    views: Math.floor(Math.random() * 100), // TODO: Get from ACF or custom field
    comments: 0, // TODO: Get from WordPress comments API
    tags: tags,
    featured: post.sticky || false,
    seo: seo,
    acf: post.acf,
  }
}

// Fetch WordPress posts with enhanced features
export async function fetchWordPressPosts(params?: {
  per_page?: number
  page?: number
  categories?: number[]
  tags?: number[]
  search?: string
  slug?: string
  revalidate?: number | false
}): Promise<Article[]> {
  try {
    const queryParams = new URLSearchParams()
    if (params?.per_page) queryParams.append('per_page', params.per_page.toString())
    if (params?.page) queryParams.append('page', params.page.toString())
    if (params?.categories) queryParams.append('categories', params.categories.join(','))
    if (params?.tags) queryParams.append('tags', params.tags.join(','))
    if (params?.search) queryParams.append('search', params.search)
    if (params?.slug) queryParams.append('slug', params.slug)
    
    // Include embedded data (author, featured image, categories, tags)
    queryParams.append('_embed', 'true')
    
    // Cache options
    const cacheOptions = params?.revalidate === false 
      ? { cache: 'no-store' as const }
      : { next: { revalidate: params?.revalidate || 60 } }
    
    const response = await fetch(`${WORDPRESS_API_URL}/posts?${queryParams.toString()}`, cacheOptions)
    
    if (!response.ok) {
      console.error('WordPress API error:', response.status, response.statusText)
      return []
    }
    
    const posts: WordPressPost[] = await response.json()
    
    // Convert WordPress posts to Article format
    const articles = await Promise.all(
      posts.map(convertPostToArticle)
    )
    
    return articles
  } catch (error) {
    console.error('Error fetching WordPress posts:', error)
    return []
  }
}

// Fetch single WordPress post by slug
export async function fetchWordPressPostBySlug(slug: string): Promise<Article | null> {
  try {
    const posts = await fetchWordPressPosts({ slug, per_page: 1, revalidate: false })
    return posts.length > 0 ? posts[0] : null
  } catch (error) {
    console.error('Error fetching WordPress post by slug:', error)
    return null
  }
}

// Fetch single WordPress post by ID
export async function fetchWordPressPostById(id: string | number): Promise<Article | null> {
  try {
    const cacheOptions = { next: { revalidate: 60 } }
    const response = await fetch(`${WORDPRESS_API_URL}/posts/${id}?_embed=true`, cacheOptions)
    
    if (!response.ok) {
      return null
    }
    
    const post: WordPressPost = await response.json()
    return await convertPostToArticle(post)
  } catch (error) {
    console.error('Error fetching WordPress post by ID:', error)
    return null
  }
}

// Fetch WordPress pages
export async function fetchWordPressPages(params?: {
  per_page?: number
  page?: number
  slug?: string
  revalidate?: number | false
}): Promise<Article[]> {
  try {
    const queryParams = new URLSearchParams()
    if (params?.per_page) queryParams.append('per_page', params.per_page.toString())
    if (params?.page) queryParams.append('page', params.page.toString())
    if (params?.slug) queryParams.append('slug', params.slug)
    queryParams.append('_embed', 'true')
    
    const cacheOptions = params?.revalidate === false 
      ? { cache: 'no-store' as const }
      : { next: { revalidate: params?.revalidate || 60 } }
    
    const response = await fetch(`${WORDPRESS_API_URL}/pages?${queryParams.toString()}`, cacheOptions)
    
    if (!response.ok) {
      console.error('WordPress Pages API error:', response.status, response.statusText)
      return []
    }
    
    const pages: WordPressPage[] = await response.json()
    
    const articles = await Promise.all(
      pages.map(async (page) => {
        const imageUrl = await getFeaturedImage(
          page.featured_media,
          page._embedded?.['wp:featuredmedia']
        )
        
        const author = await getAuthor(
          page.author,
          page._embedded?.author
        )
        
        const excerpt = stripHtml(page.excerpt.rendered).substring(0, 200)
        
        const seo = page.yoast_head_json ? {
          title: page.yoast_head_json.title || page.title.rendered,
          description: page.yoast_head_json.description || excerpt,
          ogImage: page.yoast_head_json.og_image?.[0]?.url || imageUrl,
          canonical: page.yoast_head_json.canonical || page.link,
        } : undefined
        
        return {
          id: `page-${page.id}`,
          slug: page.slug,
          title: stripHtml(page.title.rendered),
          excerpt: excerpt || 'Read more...',
          content: page.content.rendered,
          image: imageUrl,
          category: 'Page',
          author: author,
          publishedAt: page.date,
          modifiedAt: page.modified,
          views: 0,
          comments: 0,
          tags: [],
          featured: false,
          seo: seo,
          acf: page.acf,
        } as Article
      })
    )
    
    return articles
  } catch (error) {
    console.error('Error fetching WordPress pages:', error)
    return []
  }
}

// Fetch single WordPress page by slug
export async function fetchWordPressPageBySlug(slug: string): Promise<Article | null> {
  try {
    const pages = await fetchWordPressPages({ slug, per_page: 1, revalidate: false })
    return pages.length > 0 ? pages[0] : null
  } catch (error) {
    console.error('Error fetching WordPress page by slug:', error)
    return null
  }
}

// Fetch WordPress categories
export async function fetchWordPressCategories(): Promise<{ id: string; name: string; slug: string; description?: string }[]> {
  try {
    const response = await fetch(`${WORDPRESS_API_URL}/categories?per_page=100`, {
      next: { revalidate: 3600 } // Revalidate every hour
    })
    
    if (!response.ok) {
      return []
    }
    
    const categories: WordPressCategory[] = await response.json()
    return categories
      .filter(cat => cat.id !== 1) // Exclude "Uncategorized"
      .map((cat) => ({
        id: cat.id.toString(),
        name: cat.name,
        slug: cat.slug,
        description: cat.description,
      }))
  } catch (error) {
    console.error('Error fetching WordPress categories:', error)
    return []
  }
}

// Fetch WordPress tags
export async function fetchWordPressTags(): Promise<{ id: string; name: string; slug: string }[]> {
  try {
    const response = await fetch(`${WORDPRESS_API_URL}/tags?per_page=100`, {
      next: { revalidate: 3600 }
    })
    
    if (!response.ok) {
      return []
    }
    
    const tags: WordPressTag[] = await response.json()
    return tags.map((tag) => ({
      id: tag.id.toString(),
      name: tag.name,
      slug: tag.slug,
    }))
  } catch (error) {
    console.error('Error fetching WordPress tags:', error)
    return []
  }
}

// Fetch WordPress media by ID
export async function fetchWordPressMedia(id: number): Promise<WordPressMedia | null> {
  try {
    const response = await fetch(`${WORDPRESS_API_URL}/media/${id}`, {
      next: { revalidate: 3600 }
    })
    
    if (!response.ok) {
      return null
    }
    
    return await response.json()
  } catch (error) {
    console.error('Error fetching WordPress media:', error)
    return null
  }
}

// Export aliases for convenience (shorter function names)
export const getPosts = fetchWordPressPosts
export const getPostBySlug = fetchWordPressPostBySlug
export const getPostById = fetchWordPressPostById
export const getPages = fetchWordPressPages
export const getPageBySlug = fetchWordPressPageBySlug
export const getCategories = fetchWordPressCategories
export const getTags = fetchWordPressTags
export const getMedia = fetchWordPressMedia
