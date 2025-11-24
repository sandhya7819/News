/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'images.unsplash.com', 
      'via.placeholder.com', 
      'i.pravatar.cc',
      'blog.thenewsfeed.in', // WordPress media domain
      'secure.gravatar.com', // Gravatar avatars
      'www.gravatar.com', // Gravatar avatars (alternative)
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'i.pravatar.cc',
      },
      {
        protocol: 'https',
        hostname: 'blog.thenewsfeed.in', // WordPress media domain
        pathname: '/wp-content/uploads/**', // Allow all WordPress uploads
      },
      {
        protocol: 'https',
        hostname: 'secure.gravatar.com', // Gravatar avatars
        pathname: '/avatar/**',
      },
      {
        protocol: 'https',
        hostname: 'www.gravatar.com', // Gravatar avatars (alternative)
        pathname: '/avatar/**',
      },
    ],
  },
  // Fix for ChunkLoadError - ensure proper chunk loading
  onDemandEntries: {
    maxInactiveAge: 25 * 1000,
    pagesBufferLength: 2,
  },
}

module.exports = nextConfig

