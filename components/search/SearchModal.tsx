'use client'

import { useState } from 'react'
import { X, Search } from 'lucide-react'
import Link from 'next/link'

interface SearchModalProps {
  onClose: () => void
}

export default function SearchModal({ onClose }: SearchModalProps) {
  const [query, setQuery] = useState('')

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20">
      <div className="fixed inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white dark:bg-gray-800 w-full max-w-2xl mx-4 rounded-lg shadow-xl">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center gap-4">
          <Search className="w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search articles..."
            className="flex-1 bg-transparent outline-none text-lg"
            autoFocus
          />
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            aria-label="Close search"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-4 max-h-96 overflow-y-auto">
          {query ? (
            <div className="text-center py-8 text-gray-600 dark:text-gray-400">
              Search results for &quot;{query}&quot;
            </div>
          ) : (
            <div className="text-center py-8 text-gray-600 dark:text-gray-400">
              Start typing to search...
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

