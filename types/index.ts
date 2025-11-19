export interface Article {
  id: string
  title: string
  excerpt: string
  content: string
  image: string
  category: string
  author: Author
  publishedAt: string
  views: number
  comments: number
  tags?: string[]
  featured?: boolean
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

