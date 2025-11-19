'use client'

import { useState, useEffect } from 'react'
import { ChevronUp, Moon, Sun } from 'lucide-react'
import { useTheme } from '@/components/providers/ThemeProvider'

export default function BottomActions() {
  const [showBackToTop, setShowBackToTop] = useState(false)
  const { theme, toggleTheme } = useTheme()

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="fixed bottom-0 right-0 z-[99] m-2 flex flex-col gap-2">
      <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 dark:text-gray-200 flex items-center justify-center cursor-pointer" onClick={toggleTheme}>
        <label className="relative inline-flex items-center cursor-pointer w-full h-full">
          <input
            type="checkbox"
            checked={theme === 'dark'}
            onChange={toggleTheme}
            className="sr-only peer"
          />
          <div className="w-full h-full flex items-center justify-center">
            {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
          </div>
        </label>
      </div>
      {showBackToTop && (
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault()
            scrollToTop()
          }}
          className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center hover:bg-primary-dark transition-colors"
        >
          <ChevronUp className="w-5 h-5" />
        </a>
      )}
    </div>
  )
}

