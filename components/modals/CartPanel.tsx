'use client'

import { X } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

interface CartPanelProps {
  isOpen: boolean
  onClose: () => void
}

export default function CartPanel({ isOpen, onClose }: CartPanelProps) {
  // Sample cart items - in real app, this would come from context/state
  const cartItems = [
    { id: 1, name: 'Laptop Cover', price: 24.00, qty: 1, image: 'https://via.placeholder.com/80' },
    { id: 2, name: 'Disney Toys', price: 5.00, qty: 1, image: 'https://via.placeholder.com/80' },
    { id: 3, name: 'Screen Axe', price: 19.00, qty: 1, image: 'https://via.placeholder.com/80' },
    { id: 4, name: 'Airpods Pro', price: 49.00, qty: 1, image: 'https://via.placeholder.com/80' },
  ]

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0)

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-end bg-black/50" onClick={onClose}>
      <div
        className="bg-white dark:bg-black dark:text-gray-200 h-full w-full max-w-md overflow-y-auto flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 p-2 border-0 dark:text-white transition-transform duration-150 hover:rotate-90"
          type="button"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex flex-col justify-between h-full p-4">
          <div className="flex-1">
            <div className="mb-4">
              <h3 className="text-xl font-bold m-0 text-dark dark:text-white">Shopping cart</h3>
            </div>
            <div className="flex-1 overflow-y-auto my-4">
              {cartItems.length === 0 ? (
                <p className="text-yellow-600 dark:text-yellow-400" hidden>Your cart empty!</p>
              ) : (
                <div className="space-y-3">
                  {cartItems.map((item) => (
                    <article key={item.id} className="flex gap-2">
                      <figure className="relative w-20 h-20 flex-shrink-0 overflow-hidden bg-gray-100 dark:bg-gray-800 rounded">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                        <Link href={`/shop/product/${item.id}`} className="absolute inset-0" />
                      </figure>
                      <div className="flex-1 flex flex-col gap-1 text-sm">
                        <h5 className="text-sm font-semibold m-0">
                          <Link href={`/shop/product/${item.id}`} className="text-dark dark:text-white hover:text-primary">
                            {item.name}
                          </Link>
                        </h5>
                        <div className="flex gap-1 text-xs opacity-50 text-dark dark:text-white">
                          <span className="qty">{item.qty}</span> x <span className="price">${item.price.toFixed(2)}</span>
                        </div>
                        <a href="#remove_from_cart" className="text-xs text-dark dark:text-white hover:text-red-500">
                          Remove
                        </a>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
            <div className="flex flex-col gap-3">
              <div className="flex justify-between">
                <h5 className="text-xl font-bold m-0 text-dark dark:text-white">Subtotal</h5>
                <b className="text-lg">${subtotal.toFixed(2)}</b>
              </div>
              <div className="flex flex-col gap-1">
                <Link
                  href="/cart"
                  className="px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg text-center hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-dark dark:text-white"
                  onClick={onClose}
                >
                  View cart
                </Link>
                <Link
                  href="/checkout"
                  className="px-4 py-2 bg-primary text-white rounded-lg text-center hover:bg-primary-dark transition-colors font-semibold"
                  onClick={onClose}
                >
                  Checkout
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

