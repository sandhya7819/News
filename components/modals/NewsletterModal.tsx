'use client'

import { X } from 'lucide-react'
import Image from 'next/image'

interface NewsletterModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function NewsletterModal({ isOpen, onClose }: NewsletterModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50" onClick={onClose}>
      <div
        className="bg-white dark:bg-black dark:text-gray-200 rounded-lg overflow-hidden max-w-2xl w-full mx-4 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-0 border-0 dark:text-white dark:opacity-50 hover:text-primary hover:rotate-90 duration-150 transition-all z-10"
          type="button"
        >
          <X className="w-6 h-6" />
        </button>
        <div className="grid md:grid-cols-6 gap-0">
          <div className="hidden md:flex md:col-span-2">
            <div className="relative w-full aspect-square">
              <Image
                src="https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=400&h=400&fit=crop"
                alt="Newsletter"
                fill
                className="object-cover"
              />
            </div>
          </div>
          <div className="md:col-span-4">
            <div className="flex flex-col self-center p-4 md:py-8 text-center">
              <h3 className="text-2xl md:text-3xl mb-2">Subscribe to the Newsletter</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-2 lg:mb-4">Join 10k+ people to get notified about new posts, news and tips.</p>
              <div className="mt-2 lg:mt-4">
                <form className="flex flex-col gap-1">
                  <input
                    type="email"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-sm"
                    placeholder="Your email address.."
                  />
                  <button
                    type="submit"
                    className="w-full px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors text-sm font-semibold"
                  >
                    Sign up
                  </button>
                </form>
                <p className="text-xs mt-2">Do not worry we don&apos;t spam!</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

