'use client'

import { X } from 'lucide-react'
import Link from 'next/link'

interface CartDropdownProps {
  onClose: () => void
}

export default function CartDropdown({ onClose }: CartDropdownProps) {
  // This would come from a cart context/state in a real app
  const cartItems: any[] = []

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-end pt-16">
      <div className="fixed inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white dark:bg-gray-800 w-full max-w-md h-[calc(100vh-4rem)] shadow-xl overflow-y-auto">
        <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4 flex items-center justify-between">
          <h2 className="text-xl font-bold">Shopping cart</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            aria-label="Close cart"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4">
          {cartItems.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 dark:text-gray-400">Your cart empty!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Cart items would be rendered here */}
            </div>
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="sticky bottom-0 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4">
            <div className="flex items-center justify-between mb-4">
              <span className="font-semibold">Subtotal</span>
              <span className="text-xl font-bold">$0.00</span>
            </div>
            <div className="flex gap-2">
              <Link
                href="/cart"
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg text-center hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                onClick={onClose}
              >
                View cart
              </Link>
              <Link
                href="/checkout"
                className="flex-1 px-4 py-2 bg-primary text-white rounded-lg text-center hover:bg-primary-dark transition-colors"
                onClick={onClose}
              >
                Checkout
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

