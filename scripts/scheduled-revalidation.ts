/**
 * Scheduled Revalidation Script
 * 
 * This script runs periodically to revalidate Next.js pages
 * Can be run via cron job or scheduled task
 * 
 * Usage:
 *   - Cron: Add to crontab: 0 * * * * node scripts/scheduled-revalidation.js
 *   - Or run manually: npm run revalidate:scheduled
 */

const NEXTJS_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
const REVALIDATE_SECRET = process.env.REVALIDATE_SECRET || ''

async function revalidatePath(path: string) {
  try {
    const url = `${NEXTJS_URL}/api/revalidate?path=${encodeURIComponent(path)}&secret=${REVALIDATE_SECRET}`
    const response = await fetch(url, { method: 'GET' })
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`)
    }
    
    const data = await response.json()
    console.log(`✅ Revalidated: ${path}`, data)
    return true
  } catch (error) {
    console.error(`❌ Error revalidating ${path}:`, error)
    return false
  }
}

async function scheduledRevalidation() {
  console.log('🔄 Starting scheduled revalidation...')
  console.log(`📍 Next.js URL: ${NEXTJS_URL}`)
  console.log(`⏰ Time: ${new Date().toISOString()}\n`)

  const paths = [
    '/',
    '/blog',
    '/latest',
    '/trending',
  ]

  let successCount = 0
  let failCount = 0

  for (const path of paths) {
    const success = await revalidatePath(path)
    if (success) {
      successCount++
    } else {
      failCount++
    }
    
    // Wait 1 second between requests to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 1000))
  }

  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
  console.log('✅ Scheduled Revalidation Complete!')
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
  console.log(`✅ Successful: ${successCount}`)
  console.log(`❌ Failed: ${failCount}`)
  console.log(`📊 Total: ${paths.length}`)
}

// Run if executed directly
if (require.main === module) {
  scheduledRevalidation()
    .then(() => {
      console.log('\n✨ Done!')
      process.exit(0)
    })
    .catch((error) => {
      console.error('\n💥 Fatal error:', error)
      process.exit(1)
    })
}

export { scheduledRevalidation }

