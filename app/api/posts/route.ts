import { NextResponse } from 'next/server'
import { fetchWordPressPosts } from '@/lib/wordpress'

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const perPage = parseInt(searchParams.get('per_page') || '50')
    const page = parseInt(searchParams.get('page') || '1')
    const categories = searchParams.get('categories')?.split(',').map(Number)
    const search = searchParams.get('search') || undefined

    const articles = await fetchWordPressPosts({
      per_page: perPage,
      page,
      categories,
      search,
      revalidate: false, // No cache for API routes - always fresh
    })

    return NextResponse.json(articles)
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch posts' },
      { status: 500 }
    )
  }
}

