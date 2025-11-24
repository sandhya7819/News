import { NextResponse } from 'next/server'
import { fetchWordPressCategories } from '@/lib/wordpress'

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  try {
    const categories = await fetchWordPressCategories()

    return NextResponse.json(categories)
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch categories' },
      { status: 500 }
    )
  }
}

