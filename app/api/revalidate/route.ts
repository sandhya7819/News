import { NextResponse } from 'next/server'
import { revalidatePath, revalidateTag } from 'next/cache'

export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}))
    const { searchParams } = new URL(request.url)
    
    const secret = searchParams.get('secret') || body.secret
    const path = searchParams.get('path') || body.path
    const tag = searchParams.get('tag') || body.tag
    const postId = body.post?.id || body.id
    const postSlug = body.post?.slug || body.slug
    const postType = body.post?.type || body.type || 'post'

    // Optional: Add secret key for security
    // if (secret !== process.env.REVALIDATE_SECRET) {
    //   return NextResponse.json({ error: 'Invalid secret' }, { status: 401 })
    // }

    // Handle WordPress webhook payloads
    if (postId && postType === 'post') {
      const pathsToRevalidate: string[] = []
      
      // Revalidate blog post pages
      if (postSlug) {
        revalidatePath(`/blog/${postSlug}`, 'page')
        pathsToRevalidate.push(`/blog/${postSlug}`)
      }
      revalidatePath(`/article/${postId}`, 'page')
      pathsToRevalidate.push(`/article/${postId}`)
      
      // Revalidate listing pages
      revalidatePath('/', 'page') // Homepage
      revalidatePath('/blog', 'page')
      revalidatePath('/latest', 'page')
      revalidatePath('/trending', 'page')
      pathsToRevalidate.push('/', '/blog', '/latest', '/trending')
      
      console.log(`✅ Revalidated post ${postId} (${postSlug || 'no slug'}) at ${new Date().toISOString()}`)
      
      return NextResponse.json({ 
        revalidated: true, 
        message: `Post ${postId} revalidated successfully`,
        postId,
        postSlug,
        paths: pathsToRevalidate,
        timestamp: new Date().toISOString()
      })
    }

    if (postId && postType === 'page') {
      // Revalidate WordPress pages
      if (postSlug) {
        revalidatePath(`/page/${postSlug}`, 'page')
      }
      revalidatePath('/', 'page')
      
      return NextResponse.json({ 
        revalidated: true, 
        message: `Page ${postId} revalidated`,
        paths: [`/page/${postSlug}`, '/']
      })
    }

    // Handle specific path revalidation
    if (path) {
      revalidatePath(path, 'page')
      return NextResponse.json({ 
        revalidated: true, 
        path,
        message: `Path ${path} revalidated successfully` 
      })
    }

    // Handle tag-based revalidation
    if (tag) {
      revalidateTag(tag)
      return NextResponse.json({ 
        revalidated: true, 
        tag,
        message: `Tag ${tag} revalidated successfully` 
      })
    }

    // Revalidate all common paths
    revalidatePath('/', 'page')
    revalidatePath('/latest', 'page')
    revalidatePath('/trending', 'page')
    revalidatePath('/blog', 'page')
    revalidatePath('/page', 'page') // WordPress pages route

    return NextResponse.json({ 
      revalidated: true, 
      message: 'All pages revalidated successfully',
      timestamp: new Date().toISOString(),
      paths: ['/', '/latest', '/trending', '/blog', '/page']
    })
  } catch (error) {
    console.error('Revalidation error:', error)
    return NextResponse.json(
      { error: 'Error revalidating', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}

// GET method for easy browser testing
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const path = searchParams.get('path')
    const secret = searchParams.get('secret')

    // Optional: Add secret key for security
    // if (secret !== process.env.REVALIDATE_SECRET) {
    //   return NextResponse.json({ error: 'Invalid secret' }, { status: 401 })
    // }

    if (path) {
      revalidatePath(path, 'page')
      return NextResponse.json({ 
        revalidated: true, 
        path,
        message: `Path ${path} revalidated successfully` 
      })
    }

    // Revalidate all common paths
    revalidatePath('/', 'page')
    revalidatePath('/latest', 'page')
    revalidatePath('/trending', 'page')
    revalidatePath('/blog', 'page')
    revalidatePath('/page', 'page') // WordPress pages route

    return NextResponse.json({ 
      revalidated: true, 
      message: 'All pages revalidated successfully',
      timestamp: new Date().toISOString(),
      paths: ['/', '/latest', '/trending', '/blog', '/page']
    })
  } catch (error) {
    console.error('Revalidation error:', error)
    return NextResponse.json(
      { error: 'Error revalidating', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}
