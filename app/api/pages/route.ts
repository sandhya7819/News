import { NextResponse } from 'next/server'
import { fetchWordPressPages, fetchWordPressPageBySlug } from '@/lib/wordpress'

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const perPage = parseInt(searchParams.get('per_page') || '50')
    const page = parseInt(searchParams.get('page') || '1')
    const slug = searchParams.get('slug') || undefined

    if (slug) {
      // Fetch single page by slug
      const pageData = await fetchWordPressPageBySlug(slug)
      if (!pageData) {
        return NextResponse.json({ error: 'Page not found' }, { status: 404 })
      }
      return NextResponse.json({ page: pageData })
    }

    // Fetch all pages
    const pages = await fetchWordPressPages({
      per_page: perPage,
      page,
      revalidate: false, // No cache for API routes - always fresh
    })

    return NextResponse.json({ pages })
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch pages' },
      { status: 500 }
    )
  }
}

