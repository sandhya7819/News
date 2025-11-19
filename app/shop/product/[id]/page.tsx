import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { ShoppingCart } from 'lucide-react'
import { products } from '@/lib/data'

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const product = products.find(p => p.id === params.id)

  if (!product) {
    notFound()
  }

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <nav className="text-sm mb-8 text-gray-600 dark:text-gray-400">
          <Link href="/" className="hover:text-primary">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/shop" className="hover:text-primary">Shop</Link>
          <span className="mx-2">/</span>
          <span>{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="relative h-96 lg:h-[600px] rounded-lg overflow-hidden">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
            />
          </div>

          {/* Product Info */}
          <div>
            <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
            <div className="text-4xl font-bold text-primary mb-6">
              ${product.price.toFixed(2)}
            </div>
            <p className="text-gray-700 dark:text-gray-300 mb-8 text-lg">
              {product.description}
            </p>

            <div className="space-y-4 mb-8">
              <div>
                <span className="font-semibold">Category: </span>
                <span className="text-gray-600 dark:text-gray-400">{product.category}</span>
              </div>
              <div>
                <span className="font-semibold">Availability: </span>
                <span className={product.inStock ? 'text-green-600' : 'text-red-600'}>
                  {product.inStock ? 'In Stock' : 'Out of Stock'}
                </span>
              </div>
            </div>

            <div className="flex gap-4">
              <input
                type="number"
                min="1"
                defaultValue="1"
                className="w-20 px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-center"
              />
              <button
                disabled={!product.inStock}
                className="flex-1 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 font-semibold"
              >
                <ShoppingCart className="w-5 h-5" />
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

