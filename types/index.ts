// Yoast SEO Types
export interface YoastSEO {
  title?: string
  description?: string
  robots?: {
    index?: string
    follow?: string
    'max-snippet'?: string
    'max-image-preview'?: string
    'max-video-preview'?: string
  }
  canonical?: string
  og_title?: string
  og_description?: string
  og_image?: Array<{ url: string; width?: number; height?: number }>
  og_url?: string
  og_type?: string
  twitter_card?: string
  twitter_title?: string
  twitter_description?: string
  twitter_image?: string
  schema?: {
    '@context': string
    '@graph': any[]
  }
}

export interface Article {
  id: string
  slug?: string
  title: string
  excerpt: string
  content: string
  image: string
  category: string
  author: Author
  publishedAt: string
  modifiedAt?: string
  views: number
  comments: number
  tags?: string[]
  featured?: boolean
  yoast?: YoastSEO
  seo?: {
    title?: string
    description?: string
    ogImage?: string
    canonical?: string
  }
  acf?: Record<string, any>
}

export interface Author {
  id: string
  name: string
  avatar: string
  bio?: string
}

export interface Category {
  id: string
  name: string
  slug: string
  icon?: string
}

export interface Product {
  id: string
  name: string
  description: string
  price: number
  image: string
  images?: string[]
  category: string
  inStock: boolean
}

export interface CartItem {
  product: Product
  quantity: number
}

export interface User {
  id: string
  name: string
  email: string
  avatar?: string
}

