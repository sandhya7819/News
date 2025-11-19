'use client'

import { X, Search } from 'lucide-react'

interface SearchModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50" onClick={onClose}>
      <div
        className="bg-white dark:bg-black dark:text-gray-200 w-full max-w-md px-2 py-10 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-0 border-0 dark:text-white dark:opacity-50 hover:text-primary hover:rotate-90 duration-150 transition-all"
          type="button"
        >
          <X className="w-6 h-6" />
        </button>
        <h3 className="text-3xl text-center mb-4">Search</h3>
        <form className="flex items-center gap-1 mt-4 border-b border-gray-300 dark:border-gray-700 pb-2">
          <span className="inline-flex justify-center items-center w-10 h-10 opacity-50">
            <Search className="w-5 h-5" />
          </span>
          <input
            type="search"
            name="q"
            className="flex-1 ms-1 text-lg w-full dark:text-white bg-transparent outline-none"
            placeholder="Type your keyword.."
            aria-label="Search"
            autoFocus
          />
        </form>
      </div>
    </div>
  )
}

