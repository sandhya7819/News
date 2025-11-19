'use client'

import { X, Bookmark } from 'lucide-react'
import Link from 'next/link'

interface FavoritesModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function FavoritesModal({ isOpen, onClose }: FavoritesModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50" onClick={onClose}>
      <div
        className="bg-white dark:bg-black dark:text-gray-200 rounded-lg max-w-md w-full mx-4 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-0 border-0 dark:text-white dark:opacity-50 hover:text-primary hover:rotate-90 duration-150 transition-all"
          type="button"
        >
          <X className="w-6 h-6" />
        </button>
        <div className="flex flex-col justify-center items-center gap-2 text-center px-3 py-8">
          <Bookmark className="w-16 h-16 mb-2 text-primary dark:text-white" />
          <h2 className="text-2xl md:text-3xl m-0">Saved articles</h2>
          <p className="text-lg opacity-60">You have not yet added any article to your bookmarks!</p>
          <Link
            href="/"
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors mt-2 text-sm"
            onClick={onClose}
          >
            Browse articles
          </Link>
        </div>
      </div>
    </div>
  )
}

