import Link from 'next/link'
import Image from 'next/image'
import { Minus, Plus, Trash2 } from 'lucide-react'

export default function CartPage() {
  // In a real app, this would come from cart context/state
  const cartItems: any[] = []

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8">Shopping Cart</h1>
        
        {cartItems.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400 mb-4">Your cart is empty!</p>
            <Link
              href="/shop"
              className="inline-block px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="space-y-4">
                {/* Cart items would be rendered here */}
              </div>
            </div>
            <div className="lg:col-span-1">
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 sticky top-24">
                <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-semibold">$0.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span className="font-semibold">$0.00</span>
                  </div>
                  <div className="border-t border-gray-200 dark:border-gray-700 pt-4 flex justify-between text-xl font-bold">
                    <span>Total</span>
                    <span>$0.00</span>
                  </div>
                </div>
                <Link
                  href="/checkout"
                  className="block w-full px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors text-center font-semibold"
                >
                  Proceed to Checkout
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

