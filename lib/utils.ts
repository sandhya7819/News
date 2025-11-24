import { Article } from '@/types'

/**
 * Get the URL for an article, preferring slug-based routing when available
 */
export function getArticleUrl(article: Article): string {
  if (article.slug) {
    return `/blog/${article.slug}`
  }
  return `/article/${article.id}`
}
